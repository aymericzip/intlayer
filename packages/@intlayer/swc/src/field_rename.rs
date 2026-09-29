//! Source-side counterpart of the `build.minify` pipeline.
//!
//! The JavaScript side renames every user-defined content field of a compiled
//! dictionary to a short alphabetic alias (`title` → `a`) and writes the
//! result back to the dictionary JSON. This module rewrites the matching
//! accesses in component source files so both sides keep agreeing:
//!
//! ```js
//! const { title } = useIntlayer('about');   →  const { a: title } = useIntlayer('about');
//! useIntlayer('about').title                →  useIntlayer('about').a
//! const about = useIntlayer('about');       →  const about = useIntlayer('about');
//! about.title                                  about.a
//! ```
//!
//! It mirrors `renameIntlayerFieldAccesses` in
//! `@intlayer/babel/babel-plugin-intlayer-field-rename`, and must run **before**
//! the optimize transform, which replaces `useIntlayer` with `useDictionary`
//! and so erases the dictionary key this pass keys off.
//!
//! Resolution is done in two passes because a rename target can be reached
//! through an arbitrarily long chain of intermediate bindings:
//!
//! 1. a read-only pass collects `local binding → rename table`, repeated until
//!    it reaches a fixed point so chains of re-bindings resolve;
//! 2. a mutating pass rewrites member chains and destructuring patterns.

#[cfg(swc_ast_unknown)]
use crate::ast::unsupported_ast_node;
use crate::{
    ast::{
        imported_specifier_name, is_numeric_index_prop, make_ident, make_str,
        read_member_prop_name, read_static_string, write_member_prop_name,
    },
    config::FieldRenameMap,
    packages::NATIVE_CALLER_NAMES,
};
use std::collections::{BTreeMap, HashMap, HashSet};
use swc_core::ecma::{
    ast::*,
    atoms::Atom,
    visit::{Visit, VisitMut, VisitMutWith, VisitWith},
};

/// Upper bound on binding-collection passes. Each pass can only add bindings,
/// and a chain longer than this is not something real source code produces —
/// the bound just guarantees termination.
const MAX_BINDING_PASSES: usize = 8;

// ─────────────────────────────────────────────────────────────────────────────
//  RESOLUTION CONTEXT
// ─────────────────────────────────────────────────────────────────────────────

/// Everything both passes need to decide which rename table applies to a value.
struct FieldRenameContext<'a> {
    /// Local names `useIntlayer` / `getIntlayer` were imported under.
    caller_local_names: HashSet<String>,
    /// Dictionary key → rename table of its content root.
    field_rename_map: &'a BTreeMap<String, FieldRenameMap>,
    /// Local binding → rename table of the value it holds. Tables are borrowed
    /// from `field_rename_map`, so resolving never copies a subtree.
    bindings: HashMap<Id, &'a FieldRenameMap>,
}

impl<'a> FieldRenameContext<'a> {
    fn new(
        caller_local_names: HashSet<String>,
        field_rename_map: &'a BTreeMap<String, FieldRenameMap>,
    ) -> Self {
        Self {
            caller_local_names,
            field_rename_map,
            bindings: HashMap::new(),
        }
    }

    /// Rename table of the dictionary a `useIntlayer('key')` / `getIntlayer('key')`
    /// call returns, or `None` when the callee is not a caller, the key is not
    /// static, or that dictionary was not minified.
    fn root_map_for_caller_call(&self, call: &CallExpr) -> Option<&'a FieldRenameMap> {
        let Callee::Expr(callee) = &call.callee else {
            return None;
        };

        // `useIntlayer(…)` and `intlayer.useIntlayer(…)` are both accepted, the
        // same way the Babel pass reads the callee.
        let local_caller_name = match &**callee {
            Expr::Ident(ident) => ident.sym.to_string(),
            Expr::Member(member) => read_member_prop_name(&member.prop)?,
            _ => return None,
        };

        if !self.caller_local_names.contains(&local_caller_name) {
            return None;
        }

        let dictionary_key = read_static_string(&call.args.first()?.expr)?;
        self.field_rename_map.get(&dictionary_key)
    }

    /// Rename table of the value `expr` evaluates to, resolved through caller
    /// calls, known bindings and member chains — without mutating anything.
    fn resolve_value_map(&self, expr: &Expr) -> Option<&'a FieldRenameMap> {
        match expr {
            Expr::Paren(paren) => self.resolve_value_map(&paren.expr),
            Expr::TsAs(ts_as) => self.resolve_value_map(&ts_as.expr),
            Expr::TsNonNull(ts_non_null) => self.resolve_value_map(&ts_non_null.expr),
            Expr::TsSatisfies(ts_satisfies) => self.resolve_value_map(&ts_satisfies.expr),
            Expr::TsTypeAssertion(ts_type_assertion) => {
                self.resolve_value_map(&ts_type_assertion.expr)
            }
            // `await getIntlayerAsync('key')` resolves to the content the call
            // returns, so the await is transparent to the rename walk.
            Expr::Await(await_expr) => self.resolve_value_map(&await_expr.arg),
            Expr::Ident(ident) => self.bindings.get(&ident.to_id()).copied(),
            Expr::Call(call) => self.resolve_call_map(call),
            Expr::Member(member) => self.resolve_member_map(member),
            Expr::OptChain(opt_chain) => match &*opt_chain.base {
                OptChainBase::Member(member) => self.resolve_member_map(member),
                OptChainBase::Call(opt_call) => self.resolve_accessor_call_map(&opt_call.callee),
                #[cfg(swc_ast_unknown)]
                _ => unsupported_ast_node("OptChainBase"),
            },
            _ => None,
        }
    }

    /// Rename table produced by a call: either a caller call, or a signal-style
    /// accessor over a known binding (`const t = useIntlayer('k'); t().title`).
    fn resolve_call_map(&self, call: &CallExpr) -> Option<&'a FieldRenameMap> {
        if let Some(root_map) = self.root_map_for_caller_call(call) {
            return Some(root_map);
        }
        match &call.callee {
            Callee::Expr(callee) => self.resolve_accessor_call_map(callee),
            _ => None,
        }
    }

    /// Rename table of `binding()` when `binding` itself holds a renamed value.
    fn resolve_accessor_call_map(&self, callee: &Expr) -> Option<&'a FieldRenameMap> {
        match callee {
            Expr::Ident(ident) => self.bindings.get(&ident.to_id()).copied(),
            _ => None,
        }
    }

    /// Rename table of a member access, using the **original** field names.
    fn resolve_member_map(&self, member: &MemberExpr) -> Option<&'a FieldRenameMap> {
        let object_map = self.resolve_value_map(&member.obj)?;

        // Numeric index accesses (`field[0]`) are transparent: the element
        // shares the rename table of the array itself.
        if is_numeric_index_prop(&member.prop) {
            return Some(object_map);
        }

        let field_name = read_member_prop_name(&member.prop)?;
        object_map.get(&field_name).map(|entry| &entry.children)
    }

    /// Pairs each element of `const [a, { b }] = await Promise.all([…])` with
    /// the rename table of the value at the same index: returns
    /// `(pattern element index, rename table)` for every element that resolves.
    ///
    /// Stops at the first spread (`...rest` / `...promises`): past it, pattern
    /// and array indices no longer line up.
    fn promise_all_element_maps(
        &self,
        pattern: &ArrayPat,
        init: &Expr,
    ) -> Vec<(usize, &'a FieldRenameMap)> {
        let mut element_maps = Vec::new();
        let Some(promise_elements) = promise_all_elements(init) else {
            return element_maps;
        };

        for (index, (promise_element, pattern_element)) in
            promise_elements.iter().zip(&pattern.elems).enumerate()
        {
            let (Some(promise_element), Some(pattern_element)) = (promise_element, pattern_element)
            else {
                continue;
            };
            if promise_element.spread.is_some() || matches!(pattern_element, Pat::Rest(_)) {
                break;
            }
            if let Some(rename_map) = self.resolve_value_map(&promise_element.expr) {
                element_maps.push((index, rename_map));
            }
        }

        element_maps
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  PASS 1 — BINDING COLLECTION (READ-ONLY)
// ─────────────────────────────────────────────────────────────────────────────

/// Collects `local binding → rename table` for every variable that holds a
/// renamed dictionary value, directly or through destructuring.
struct BindingCollector<'a, 'ctx> {
    context: &'ctx mut FieldRenameContext<'a>,
    /// Set when the pass registered at least one new binding, so the caller
    /// knows another round may discover more.
    registered_new_binding: bool,
}

impl<'a> BindingCollector<'a, '_> {
    /// Registers `binding_id → rename_map` unless it is already known.
    fn register(&mut self, binding_id: Id, rename_map: &'a FieldRenameMap) {
        if rename_map.is_empty() || self.context.bindings.contains_key(&binding_id) {
            return;
        }
        self.context.bindings.insert(binding_id, rename_map);
        self.registered_new_binding = true;
    }

    /// Registers the locals bound by an object pattern destructuring a value
    /// whose fields are described by `rename_map`.
    fn collect_object_pattern(&mut self, pattern: &ObjectPat, rename_map: &'a FieldRenameMap) {
        for property in &pattern.props {
            match property {
                // `{ field }` / `{ field = fallback }`
                ObjectPatProp::Assign(assign_prop) => {
                    let Some(entry) = rename_map.get(assign_prop.key.sym.as_ref()) else {
                        continue;
                    };
                    self.register(assign_prop.key.to_id(), &entry.children);
                }
                // `{ field: local }` / `{ field: { nested } }` / `{ field: local = fallback }`
                ObjectPatProp::KeyValue(key_value_prop) => {
                    let Some(field_name) = read_pattern_key_name(&key_value_prop.key) else {
                        continue;
                    };
                    let Some(entry) = rename_map.get(&field_name) else {
                        continue;
                    };
                    if entry.children.is_empty() {
                        continue;
                    }
                    self.collect_pattern_target(&key_value_prop.value, &entry.children);
                }
                ObjectPatProp::Rest(_) => {}
                #[cfg(swc_ast_unknown)]
                _ => unsupported_ast_node("ObjectPatProp"),
            }
        }
    }

    /// Registers the locals bound by a destructuring target, looking through a
    /// default value (`= fallback`) and recursing into nested patterns.
    fn collect_pattern_target(&mut self, pattern: &Pat, rename_map: &'a FieldRenameMap) {
        match pattern {
            Pat::Ident(binding) => self.register(binding.id.to_id(), rename_map),
            Pat::Object(nested_pattern) => self.collect_object_pattern(nested_pattern, rename_map),
            Pat::Assign(assign_pattern) => {
                self.collect_pattern_target(&assign_pattern.left, rename_map)
            }
            _ => {}
        }
    }
}

impl Visit for BindingCollector<'_, '_> {
    fn visit_var_declarator(&mut self, declarator: &VarDeclarator) {
        declarator.visit_children_with(self);

        let Some(init) = &declarator.init else {
            return;
        };

        // `const [a, { b }] = await Promise.all([getIntlayerAsync('a'), …])`
        if let Pat::Array(pattern) = &declarator.name {
            for (index, rename_map) in self.context.promise_all_element_maps(pattern, init) {
                if let Some(Some(element)) = pattern.elems.get(index) {
                    self.collect_pattern_target(element, rename_map);
                }
            }
            return;
        }

        let Some(rename_map) = self.context.resolve_value_map(init) else {
            return;
        };

        match &declarator.name {
            // `const about = useIntlayer('about')` / `const section = about.section`
            Pat::Ident(binding) => self.register(binding.id.to_id(), rename_map),
            // `const { title } = useIntlayer('about')`
            Pat::Object(pattern) => self.collect_object_pattern(pattern, rename_map),
            _ => {}
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  PASS 2 — RENAMING (MUTATING)
// ─────────────────────────────────────────────────────────────────────────────

/// Rewrites member chains and destructuring patterns to the short aliases.
struct FieldRenameVisitor<'a> {
    context: FieldRenameContext<'a>,
    /// Number of field accesses actually rewritten, reported by the logger.
    renamed_fields: usize,
}

impl<'a> FieldRenameVisitor<'a> {
    /// Renames every level of the member chain rooted at `expr` and returns the
    /// rename table of the value the chain evaluates to.
    fn rename_chain(&mut self, expr: &mut Expr) -> Option<&'a FieldRenameMap> {
        match expr {
            Expr::Paren(paren) => self.rename_chain(&mut paren.expr),
            Expr::TsAs(ts_as) => self.rename_chain(&mut ts_as.expr),
            Expr::TsNonNull(ts_non_null) => self.rename_chain(&mut ts_non_null.expr),
            Expr::TsSatisfies(ts_satisfies) => self.rename_chain(&mut ts_satisfies.expr),
            Expr::TsTypeAssertion(ts_type_assertion) => {
                self.rename_chain(&mut ts_type_assertion.expr)
            }
            Expr::Member(member) => self.rename_member(member),
            Expr::OptChain(opt_chain) => match &mut *opt_chain.base {
                OptChainBase::Member(member) => self.rename_member(member),
                OptChainBase::Call(opt_call) => {
                    self.context.resolve_accessor_call_map(&opt_call.callee)
                }
                #[cfg(swc_ast_unknown)]
                _ => unsupported_ast_node("OptChainBase"),
            },
            other => self.context.resolve_value_map(other),
        }
    }

    /// Renames one member access after renaming everything it reads from.
    fn rename_member(&mut self, member: &mut MemberExpr) -> Option<&'a FieldRenameMap> {
        let object_map = self.rename_chain(&mut member.obj)?;

        if is_numeric_index_prop(&member.prop) {
            return Some(object_map);
        }

        let field_name = read_member_prop_name(&member.prop)?;
        let entry = object_map.get(&field_name)?;

        write_member_prop_name(&mut member.prop, &entry.short_name);
        self.renamed_fields += 1;

        Some(&entry.children)
    }

    /// Visits the sub-expressions a member chain contains without re-entering
    /// the chain itself, which [`Self::rename_chain`] has already handled.
    fn visit_chain_children(&mut self, expr: &mut Expr) {
        match expr {
            Expr::Paren(paren) => self.visit_chain_children(&mut paren.expr),
            Expr::TsAs(ts_as) => self.visit_chain_children(&mut ts_as.expr),
            Expr::TsNonNull(ts_non_null) => self.visit_chain_children(&mut ts_non_null.expr),
            Expr::TsSatisfies(ts_satisfies) => self.visit_chain_children(&mut ts_satisfies.expr),
            Expr::TsTypeAssertion(ts_type_assertion) => {
                self.visit_chain_children(&mut ts_type_assertion.expr)
            }
            Expr::Member(member) => {
                if let MemberProp::Computed(computed) = &mut member.prop {
                    computed.expr.visit_mut_with(self);
                }
                self.visit_chain_children(&mut member.obj);
            }
            Expr::OptChain(opt_chain) => match &mut *opt_chain.base {
                OptChainBase::Member(member) => {
                    if let MemberProp::Computed(computed) = &mut member.prop {
                        computed.expr.visit_mut_with(self);
                    }
                    self.visit_chain_children(&mut member.obj);
                }
                OptChainBase::Call(opt_call) => opt_call.visit_mut_children_with(self),
                #[cfg(swc_ast_unknown)]
                _ => unsupported_ast_node("OptChainBase"),
            },
            other => other.visit_mut_children_with(self),
        }
    }

    /// Renames the keys of a destructuring pattern, recursing into nested
    /// patterns. References to the locals it binds are renamed by the member
    /// chain walk, using the bindings collected in pass 1.
    fn rename_object_pattern(&mut self, pattern: &mut ObjectPat, rename_map: &FieldRenameMap) {
        for property in &mut pattern.props {
            match property {
                // `{ field }` → `{ a: field }`, `{ field = fb }` → `{ a: field = fb }`
                ObjectPatProp::Assign(assign_prop) => {
                    let Some(entry) = rename_map.get(assign_prop.key.sym.as_ref()) else {
                        continue;
                    };

                    let local_binding = assign_prop.key.clone();
                    let value_pattern = match assign_prop.value.take() {
                        Some(default_value) => Pat::Assign(AssignPat {
                            span: assign_prop.span,
                            left: Box::new(Pat::Ident(local_binding)),
                            right: default_value,
                        }),
                        None => Pat::Ident(local_binding),
                    };

                    *property = ObjectPatProp::KeyValue(KeyValuePatProp {
                        key: PropName::Ident(make_ident(&entry.short_name).into()),
                        value: Box::new(value_pattern),
                    });
                    self.renamed_fields += 1;
                }
                // `{ field: local }` → `{ a: local }`
                ObjectPatProp::KeyValue(key_value_prop) => {
                    let Some(field_name) = read_pattern_key_name(&key_value_prop.key) else {
                        continue;
                    };
                    let Some(entry) = rename_map.get(&field_name) else {
                        continue;
                    };

                    write_pattern_key_name(&mut key_value_prop.key, &entry.short_name);
                    self.renamed_fields += 1;

                    if entry.children.is_empty() {
                        continue;
                    }
                    // A default value wraps the actual binding target.
                    let nested_target = match &mut *key_value_prop.value {
                        Pat::Assign(assign_pattern) => &mut *assign_pattern.left,
                        other => other,
                    };
                    if let Pat::Object(nested_pattern) = nested_target {
                        self.rename_object_pattern(nested_pattern, &entry.children);
                    }
                }
                ObjectPatProp::Rest(_) => {}
                #[cfg(swc_ast_unknown)]
                _ => unsupported_ast_node("ObjectPatProp"),
            }
        }
    }
}

impl VisitMut for FieldRenameVisitor<'_> {
    fn visit_mut_expr(&mut self, expr: &mut Expr) {
        if is_member_chain(expr) {
            self.rename_chain(expr);
            self.visit_chain_children(expr);
            return;
        }
        expr.visit_mut_children_with(self);
    }

    fn visit_mut_var_declarator(&mut self, declarator: &mut VarDeclarator) {
        // Resolve the rename table from the initialiser **before** the
        // initialiser itself is rewritten, since resolution keys off the
        // original field names.
        if let Some(init) = &declarator.init {
            match &mut declarator.name {
                Pat::Object(pattern) => {
                    if let Some(rename_map) = self.context.resolve_value_map(init) {
                        self.rename_object_pattern(pattern, rename_map);
                    }
                }
                // `const [a, { b }] = await Promise.all([getIntlayerAsync('a'), …])`
                Pat::Array(pattern) => {
                    for (index, rename_map) in self.context.promise_all_element_maps(pattern, init)
                    {
                        let Some(Some(element)) = pattern.elems.get_mut(index) else {
                            continue;
                        };
                        // A default value (`[a = fallback]`) wraps the target.
                        let target = match element {
                            Pat::Assign(assign_pattern) => &mut *assign_pattern.left,
                            other => other,
                        };
                        if let Pat::Object(object_pattern) = target {
                            self.rename_object_pattern(object_pattern, rename_map);
                        }
                    }
                }
                _ => {}
            }
        }

        declarator.visit_mut_children_with(self);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/// Elements of the array literal handed to `Promise.all(…)`, looking through
/// the `await`, parentheses and TypeScript casts around the call.
///
/// `Promise.allSettled` is excluded on purpose: it wraps each value in
/// `{ status, value }`.
fn promise_all_elements(expr: &Expr) -> Option<&Vec<Option<ExprOrSpread>>> {
    match expr {
        Expr::Paren(paren) => promise_all_elements(&paren.expr),
        Expr::Await(await_expr) => promise_all_elements(&await_expr.arg),
        Expr::TsAs(ts_as) => promise_all_elements(&ts_as.expr),
        Expr::TsNonNull(ts_non_null) => promise_all_elements(&ts_non_null.expr),
        Expr::TsSatisfies(ts_satisfies) => promise_all_elements(&ts_satisfies.expr),
        Expr::TsTypeAssertion(ts_type_assertion) => promise_all_elements(&ts_type_assertion.expr),
        Expr::Call(call) => {
            let Callee::Expr(callee) = &call.callee else {
                return None;
            };
            let Expr::Member(member) = &**callee else {
                return None;
            };
            let is_promise_all = matches!(&*member.obj, Expr::Ident(object) if &*object.sym == "Promise")
                && matches!(&member.prop, MemberProp::Ident(property) if &*property.sym == "all");
            if !is_promise_all {
                return None;
            }
            match call
                .args
                .first()
                .map(|argument| (&argument.spread, &*argument.expr))
            {
                Some((None, Expr::Array(array))) => Some(&array.elems),
                _ => None,
            }
        }
        _ => None,
    }
}

/// Whether the expression is a (possibly optional) member access chain that
/// [`FieldRenameVisitor::rename_chain`] handles as a whole.
fn is_member_chain(expr: &Expr) -> bool {
    match expr {
        Expr::Member(_) => true,
        Expr::OptChain(opt_chain) => matches!(&*opt_chain.base, OptChainBase::Member(_)),
        Expr::Paren(paren) => is_member_chain(&paren.expr),
        Expr::TsAs(ts_as) => is_member_chain(&ts_as.expr),
        Expr::TsNonNull(ts_non_null) => is_member_chain(&ts_non_null.expr),
        Expr::TsSatisfies(ts_satisfies) => is_member_chain(&ts_satisfies.expr),
        Expr::TsTypeAssertion(ts_type_assertion) => is_member_chain(&ts_type_assertion.expr),
        _ => false,
    }
}

/// Reads the statically-known key of a destructuring property, including the
/// `{ ['field']: local }` computed-string form. Dynamic computed keys return
/// `None` and are left untouched.
fn read_pattern_key_name(key: &PropName) -> Option<String> {
    match key {
        PropName::Ident(ident) => Some(ident.sym.to_string()),
        PropName::Str(string_key) => Some(string_key.value.to_string_lossy().into_owned()),
        PropName::Computed(computed) => match &*computed.expr {
            Expr::Lit(Lit::Str(Str { value, .. })) => Some(value.to_string_lossy().into_owned()),
            _ => None,
        },
        _ => None,
    }
}

/// Overwrites a destructuring property key, preserving its literal shape.
fn write_pattern_key_name(key: &mut PropName, name: &str) {
    match key {
        PropName::Ident(ident) => ident.sym = Atom::from(name),
        PropName::Str(string_key) => *string_key = make_str(name),
        PropName::Computed(computed) => {
            *computed.expr = Expr::Lit(Lit::Str(make_str(name)));
        }
        _ => {}
    }
}

/// Collects the local names `useIntlayer` / `getIntlayer` were imported under.
///
/// Import declarations only appear at the top level of a module, so the body is
/// scanned directly instead of traversing the whole AST. The import source is
/// deliberately not checked, mirroring the Babel pass: a project re-exporting
/// the caller through its own module must be renamed too, otherwise its
/// accesses would disagree with the already-renamed dictionary JSON.
fn collect_caller_local_names(program: &Program) -> HashSet<String> {
    let mut caller_local_names = HashSet::new();

    let Program::Module(module) = program else {
        return caller_local_names;
    };

    for item in &module.body {
        let ModuleItem::ModuleDecl(ModuleDecl::Import(import)) = item else {
            continue;
        };
        for specifier in &import.specifiers {
            let ImportSpecifier::Named(named) = specifier else {
                continue;
            };
            let imported_name = imported_specifier_name(named);
            if NATIVE_CALLER_NAMES.contains(&imported_name.as_str()) {
                caller_local_names.insert(named.local.sym.to_string());
            }
        }
    }

    caller_local_names
}

// ─────────────────────────────────────────────────────────────────────────────
//  ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/// Rewrites every dictionary content field access in `program` to the short
/// alias recorded in `field_rename_map`, and returns how many accesses were
/// rewritten.
///
/// A no-op when the map is empty or the file imports no intlayer caller.
pub fn rename_field_accesses(
    program: &mut Program,
    field_rename_map: &BTreeMap<String, FieldRenameMap>,
) -> usize {
    if field_rename_map.is_empty() {
        return 0;
    }

    let caller_local_names = collect_caller_local_names(program);
    if caller_local_names.is_empty() {
        return 0;
    }

    let mut context = FieldRenameContext::new(caller_local_names, field_rename_map);

    // Pass 1: resolve bindings to a fixed point so chains of intermediate
    // variables (`const a = useIntlayer('k'); const b = a.section;`) resolve
    // regardless of declaration order.
    for _ in 0..MAX_BINDING_PASSES {
        let mut collector = BindingCollector {
            context: &mut context,
            registered_new_binding: false,
        };
        program.visit_with(&mut collector);
        if !collector.registered_new_binding {
            break;
        }
    }

    // Pass 2: rewrite the accesses.
    let mut visitor = FieldRenameVisitor {
        context,
        renamed_fields: 0,
    };
    program.visit_mut_with(&mut visitor);

    visitor.renamed_fields
}
