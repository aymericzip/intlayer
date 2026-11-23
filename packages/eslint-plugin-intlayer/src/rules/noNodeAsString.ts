import {
  findIntlayerNodeStringUsage,
  findRedundantIntlayerNodeValue,
  getIntlayerNodeBindingNames,
  getIntlayerNodeGetterNames,
  type IntlayerNodeAstNode,
  type IntlayerNodeStringContext,
  isIntlayerJsxNodePackage,
} from '@intlayer/config/extract';
import { type AstNodeWithParent, toAstNode } from '../utils/ast';
import { createRule } from '../utils/createRule';
import { combineVisitors, type TemplateVisitor } from '../utils/templates';

type MessageIds = 'nodeAsString' | 'redundantValue';

/** Wording of each consumer in the report. */
const CONTEXT_DESCRIPTIONS: Record<IntlayerNodeStringContext, string> = {
  'string-method': 'used with a string method',
  attribute: 'passed to a string attribute',
};

/** Svelte store auto-subscription prefix: `$content` reads the `content` store. */
const SVELTE_STORE_PREFIX = '$';

/**
 * Ancestors of a node, nearest first.
 *
 * @param node - Node linked to its parents.
 */
const getAncestors = (node: AstNodeWithParent): AstNodeWithParent[] => {
  const ancestors: AstNodeWithParent[] = [];

  for (let current = node.parent; current; current = current.parent) {
    ancestors.push(current);
  }

  return ancestors;
};

/** True when an identifier names a property rather than reading a variable. */
const isPropertyName = (identifier: AstNodeWithParent): boolean => {
  const parent = identifier.parent;

  if (!parent) return false;

  if (parent.type === 'MemberExpression') {
    return parent['property'] === identifier && parent['computed'] !== true;
  }

  if (parent.type === 'Property') {
    return parent['key'] === identifier && parent['shorthand'] !== true;
  }

  return false;
};

export const noNodeAsString = createRule<[], MessageIds>('no-node-as-string', {
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description:
        'Require `.value` where an Intlayer node must be a string (native element attribute, string method), which does not type-check once the editor is enabled, and forbid it where the node itself renders as a JSX child',
    },
    messages: {
      nodeAsString:
        '`{{field}}` is an Intlayer node {{context}}. With `editor.enabled: true` it is not a string — read `{{field}}.value`.',
      redundantValue:
        '`{{field}}.value` renders a bare string. Render `{{field}}` so the visual editor can select it.',
    },
  },

  create: (context) => {
    const sourceCode = context.sourceCode;
    let getterNames = new Set<string>();
    /** Getters whose nodes render as JSX children. */
    let jsxGetterNames = new Set<string>();
    /** Variables bound to the whole dictionary. */
    const rootNames = new Set<string>();
    /** Variables bound to a destructured field. */
    const leafNames = new Set<string>();
    /** Source range of a node. */
    const getRange = (node: IntlayerNodeAstNode): [number, number] =>
      node['range'] as [number, number];

    /**
     * Report `<h1>{content.title.value}</h1>`: the node renders itself.
     *
     * @param identifier - Reference to a content variable.
     * @param isLeafBinding - Whether the variable may itself be a node.
     */
    const checkRedundantValue = (
      identifier: AstNodeWithParent,
      isLeafBinding: boolean
    ): void => {
      const redundantValue = findRedundantIntlayerNodeValue(
        identifier,
        getAncestors(identifier),
        isLeafBinding
      );

      if (!redundantValue) return;

      const chainEndRange = getRange(redundantValue.chainEnd);
      const valueAccessRange = getRange(redundantValue.valueAccess);

      context.report({
        node: redundantValue.valueAccess as never,
        messageId: 'redundantValue',
        data: {
          field: sourceCode.text.slice(chainEndRange[0], chainEndRange[1]),
        },
        fix: (fixer) =>
          fixer.removeRange([chainEndRange[1], valueAccessRange[1]]),
      });
    };

    /** Chain ends already reported, so a node read twice is reported once. */
    const reportedChainEnds = new Set<IntlayerNodeAstNode>();
    /** Template identifiers checked once every script binding is known. */
    const pendingTemplateIdentifiers: AstNodeWithParent[] = [];

    /**
     * Report the reference when it is consumed as a string.
     *
     * @param identifier - Reference to a content variable.
     * @param isLeafBinding - Whether the variable may itself be a node.
     */
    const checkReference = (
      identifier: AstNodeWithParent,
      isLeafBinding: boolean
    ): void => {
      const usage = findIntlayerNodeStringUsage(
        identifier,
        getAncestors(identifier),
        isLeafBinding
      );

      if (!usage || reportedChainEnds.has(usage.chainEnd)) return;

      reportedChainEnds.add(usage.chainEnd);

      const chainEnd = usage.chainEnd as unknown as Parameters<
        typeof sourceCode.getText
      >[0];

      context.report({
        node: chainEnd as never,
        messageId: 'nodeAsString',
        data: {
          field: sourceCode.getText(chainEnd),
          context: CONTEXT_DESCRIPTIONS[usage.context],
        },
        fix: (fixer) => fixer.insertTextAfter(chainEnd as never, '.value'),
      });
    };

    /**
     * Check an identifier that scope analysis does not resolve: Vue template
     * expressions and Svelte `$store` reads.
     */
    const checkUnresolvedIdentifier = (identifier: AstNodeWithParent): void => {
      if (isPropertyName(identifier)) return;

      const name = identifier['name'];

      if (typeof name !== 'string') return;

      const bindingName = name.startsWith(SVELTE_STORE_PREFIX)
        ? name.slice(SVELTE_STORE_PREFIX.length)
        : name;

      if (rootNames.has(bindingName)) checkReference(identifier, false);
      else if (leafNames.has(bindingName)) checkReference(identifier, true);
    };

    const scriptVisitor: TemplateVisitor = {
      Program: (node) => {
        const program = toAstNode(node as never);

        getterNames = getIntlayerNodeGetterNames(program);
        jsxGetterNames = getIntlayerNodeGetterNames(
          program,
          isIntlayerJsxNodePackage
        );
      },

      VariableDeclarator: (node) => {
        if (getterNames.size === 0) return;

        const bindingNames = getIntlayerNodeBindingNames(
          toAstNode(node as never),
          getterNames
        );

        if (!bindingNames) return;

        const isJsxNodeBinding =
          getIntlayerNodeBindingNames(
            toAstNode(node as never),
            jsxGetterNames
          ) !== null;
        const leafBindingNames = new Set(bindingNames.leafNames);

        for (const name of bindingNames.rootNames) rootNames.add(name);
        for (const name of bindingNames.leafNames) leafNames.add(name);

        for (const variable of sourceCode.getDeclaredVariables(node)) {
          const isLeafBinding = leafBindingNames.has(variable.name);

          for (const reference of variable.references) {
            if (reference.init) continue;

            const identifier =
              reference.identifier as unknown as AstNodeWithParent;

            checkReference(identifier, isLeafBinding);

            if (isJsxNodeBinding)
              checkRedundantValue(identifier, isLeafBinding);
          }
        }
      },

      // Svelte `$content.title`: the store read has no resolved variable.
      Identifier: (node) => {
        const identifier = toAstNode(node as never);
        const name = identifier['name'];

        if (typeof name === 'string' && name.startsWith(SVELTE_STORE_PREFIX)) {
          pendingTemplateIdentifiers.push(identifier);
        }
      },

      'Program:exit': () => {
        for (const identifier of pendingTemplateIdentifiers) {
          checkUnresolvedIdentifier(identifier);
        }
      },
    };

    // Vue template expressions: the visitor runs after the script is walked.
    const templateVisitor: TemplateVisitor = {
      Identifier: (node) => {
        checkUnresolvedIdentifier(toAstNode(node as never));
      },
    };

    const parserServices = sourceCode.parserServices as
      | { defineTemplateBodyVisitor?: unknown }
      | undefined;

    if (typeof parserServices?.defineTemplateBodyVisitor !== 'function') {
      return scriptVisitor;
    }

    return combineVisitors(parserServices, scriptVisitor, templateVisitor);
  },
});
