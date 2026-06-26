import type { RoutingConfig } from '@intlayer/types/config';
import * as recast from 'recast';
import { isModuleScopeBinding } from './astImports';
import type {
  CompatSyncConfig,
  CompatVitePluginConfig,
} from './packageManager';

const { builders: b, namedTypes: n } = recast.types;

/** The locale routing strategies supported by the Intlayer configuration. */
export type RoutingMode = RoutingConfig['mode'];

/** Narrows an arbitrary recast node to an object expression. */
const isObjectExpression = (node: any): boolean =>
  Boolean(node) &&
  (node.type === 'ObjectExpression' || n.ObjectExpression.check(node));

/**
 * Finds a property by key name on an object expression, creating it with the
 * provided default value node when it is absent. Returns the property node so
 * callers can read or mutate its value while preserving any attached comments.
 */
const ensureObjectProperty = (
  objExpr: any,
  key: string,
  defaultValueNode: any
): any => {
  let property = (objExpr.properties as any[]).find((prop: any) => {
    if (!prop?.key) return false;
    return (prop.key.name ?? prop.key.value) === key;
  });

  if (!property) {
    property = b.property('init', b.identifier(key), defaultValueNode);
    (objExpr.properties as any[]).push(property);
  }

  return property;
};

/**
 * Sets (or replaces) a property's value on an object expression. When the
 * property already exists only its value node is swapped, which keeps the
 * leading documentation comment in place.
 */
const setObjectPropertyValue = (
  objExpr: any,
  key: string,
  valueNode: any
): void => {
  const property = (objExpr.properties as any[]).find((prop: any) => {
    if (!prop?.key) return false;
    return (prop.key.name ?? prop.key.value) === key;
  });

  if (property) {
    property.value = valueNode;
    return;
  }

  (objExpr.properties as any[]).push(
    b.property('init', b.identifier(key), valueNode)
  );
};

/**
 * Adds a `process.env.<envVar>` reference property to an object expression when
 * the property is not already present. Existing values are left untouched.
 */
const addEnvReferenceProperty = (
  objExpr: any,
  key: string,
  envVar: string
): void => {
  const hasProperty = (objExpr.properties as any[]).some((prop: any) => {
    if (!prop?.key) return false;
    return (prop.key.name ?? prop.key.value) === key;
  });

  if (hasProperty) return;

  (objExpr.properties as any[]).push(
    b.property(
      'init',
      b.identifier(key),
      b.memberExpression(
        b.memberExpression(b.identifier('process'), b.identifier('env')),
        b.identifier(envVar)
      )
    )
  );
};

/**
 * Sets `routing.mode` in an Intlayer configuration file to the requested
 * strategy. Idempotent: re-running with the same mode produces identical
 * output. Supports `.ts`, `.mjs`, `.js` and `.cjs` configs; JSON configs are
 * handled with a scoped string replacement since they cannot be parsed by the
 * TypeScript recast parser.
 */
export const setIntlayerConfigRoutingMode = (
  content: string,
  extension: string,
  mode: RoutingMode
): string => {
  if (extension === 'json') {
    return content.replace(
      /("mode"\s*:\s*)"(?:prefix-no-default|prefix-all|no-prefix|search-params)"/,
      `$1"${mode}"`
    );
  }

  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  genericRecastVisit(ast, (objExpr) => {
    if (!isObjectExpression(objExpr)) return;

    const routingProperty = ensureObjectProperty(
      objExpr,
      'routing',
      b.objectExpression([])
    );

    if (!isObjectExpression(routingProperty.value)) return;

    setObjectPropertyValue(
      routingProperty.value,
      'mode',
      b.stringLiteral(mode)
    );
  });

  return recast.print(ast).code;
};

/**
 * Enables the Intlayer visual editor in a configuration file: sets
 * `editor.enabled` to `true` and wires `clientId` / `clientSecret` to the
 * `INTLAYER_CLIENT_ID` / `INTLAYER_CLIENT_SECRET` environment variables.
 * Idempotent and non-destructive — existing `clientId` / `clientSecret` values
 * are preserved. Only `.ts`, `.mjs`, `.js` and `.cjs` configs are supported
 * (JSON cannot reference `process.env`).
 */
export const enableIntlayerEditorConfig = (content: string): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  genericRecastVisit(ast, (objExpr) => {
    if (!isObjectExpression(objExpr)) return;

    const editorProperty = ensureObjectProperty(
      objExpr,
      'editor',
      b.objectExpression([])
    );

    if (!isObjectExpression(editorProperty.value)) return;

    const editorObject = editorProperty.value;

    setObjectPropertyValue(editorObject, 'enabled', b.booleanLiteral(true));
    addEnvReferenceProperty(editorObject, 'clientId', 'INTLAYER_CLIENT_ID');
    addEnvReferenceProperty(
      editorObject,
      'clientSecret',
      'INTLAYER_CLIENT_SECRET'
    );
  });

  return recast.print(ast).code;
};

const injectImport = (
  ast: any,
  isCJS: boolean,
  importName: string,
  source: string
) => {
  // Never redeclare an identifier already bound at module scope (e.g. imported
  // from another source or declared locally) — that would be a parse error.
  if (!isCJS && isModuleScopeBinding(ast, importName)) return;

  const body = ast.program.body;
  const hasImport = body.some((stmt: any) => {
    if (isCJS) {
      return (
        n.VariableDeclaration.check(stmt) &&
        stmt.declarations.some(
          (decl: any) =>
            n.VariableDeclarator.check(decl) &&
            n.CallExpression.check(decl.init) &&
            n.Identifier.check(decl.init.callee) &&
            decl.init.callee.name === 'require' &&
            n.StringLiteral.check(decl.init.arguments[0]) &&
            decl.init.arguments[0].value === source
        )
      );
    }
    return (
      n.ImportDeclaration.check(stmt) &&
      (stmt.source.value === source ||
        stmt.specifiers?.some(
          (spec: any) =>
            (n.ImportSpecifier.check(spec) &&
              spec.imported.name === importName) ||
            (n.ImportDefaultSpecifier.check(spec) &&
              spec.local?.name === importName)
        ))
    );
  });

  if (hasImport) return;

  const declaration = isCJS
    ? b.variableDeclaration('const', [
        b.variableDeclarator(
          b.identifier(`{ ${importName} }`),
          b.callExpression(b.identifier('require'), [b.stringLiteral(source)])
        ),
      ])
    : b.importDeclaration(
        [b.importSpecifier(b.identifier(importName))],
        b.stringLiteral(source)
      );

  ast.program.body.unshift(declaration);
};

const updatePluginArray = (
  objExpr: any,
  propertyName: string,
  pluginName: string
) => {
  if (
    !objExpr ||
    (objExpr.type !== 'ObjectExpression' && !n.ObjectExpression.check(objExpr))
  )
    return;

  let prop = objExpr.properties.find((p: any) => {
    if (!p?.key) return false;
    const keyName = p.key.name || p.key.value;
    return keyName === propertyName;
  }) as any;

  if (!prop) {
    prop = b.property(
      'init',
      b.identifier(propertyName),
      b.arrayExpression([])
    );
    objExpr.properties.push(prop);
  }

  const arrayValue = prop.value;

  if (
    arrayValue &&
    (arrayValue.type === 'ArrayExpression' ||
      n.ArrayExpression.check(arrayValue))
  ) {
    const hasPlugin = arrayValue.elements.some((el: any) => {
      const callee = el?.callee;
      if (!callee) return false;
      const name = callee.name || callee.id?.name;
      return name === pluginName || name === 'il';
    });

    if (!hasPlugin) {
      arrayValue.elements.push(b.callExpression(b.identifier(pluginName), []));
    }
  }
};

const genericRecastVisit = (
  ast: any,
  updateConfigObject: (obj: any) => void,
  callNames: string[] = ['defineConfig']
) => {
  /**
   * Resolves an identifier reference (e.g. `export default config` /
   * `module.exports = config`) back to the object expression it was declared
   * with, then runs the updater on it.
   */
  const resolveIdentifierConfig = (name: string) => {
    ast.program.body.forEach((stmt: any) => {
      if (n.VariableDeclaration.check(stmt)) {
        stmt.declarations.forEach((vdecl: any) => {
          if (
            n.VariableDeclarator.check(vdecl) &&
            n.Identifier.check(vdecl.id) &&
            vdecl.id.name === name &&
            n.ObjectExpression.check(vdecl.init)
          ) {
            updateConfigObject(vdecl.init);
          }
        });
      }
    });
  };

  recast.visit(ast, {
    visitExportDefaultDeclaration(path) {
      const decl = path.node.declaration;

      if (n.ObjectExpression.check(decl)) {
        updateConfigObject(decl);
      } else if (
        n.CallExpression.check(decl) &&
        n.Identifier.check(decl.callee) &&
        callNames.includes(decl.callee.name)
      ) {
        if (n.ObjectExpression.check(decl.arguments[0])) {
          updateConfigObject(decl.arguments[0]);
        }
      } else if (n.Identifier.check(decl)) {
        resolveIdentifierConfig(decl.name);
      }
      return false;
    },
    visitAssignmentExpression(path) {
      const { left, right } = path.node;

      if (
        n.MemberExpression.check(left) &&
        recast.print(left).code === 'module.exports'
      ) {
        if (n.ObjectExpression.check(right)) {
          updateConfigObject(right);
        } else if (
          n.CallExpression.check(right) &&
          n.Identifier.check(right.callee) &&
          callNames.includes(right.callee.name)
        ) {
          if (n.ObjectExpression.check(right.arguments[0])) {
            updateConfigObject(right.arguments[0]);
          }
        } else if (n.Identifier.check(right)) {
          resolveIdentifierConfig(right.name);
        }
      }
      return false;
    },
  });
};

export const updateViteConfig = (
  content: string,
  extension: string
): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const isCJSFile =
    extension === 'cjs' ||
    (content.includes('module.exports') && !content.includes('import '));

  injectImport(ast, isCJSFile, 'intlayer', 'vite-intlayer');

  genericRecastVisit(ast, (obj) =>
    updatePluginArray(obj, 'plugins', 'intlayer')
  );

  return recast.print(ast).code;
};

export const updateAstroConfig = (
  content: string,
  extension: string
): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const isCJSFile =
    extension === 'cjs' ||
    (content.includes('module.exports') && !content.includes('import '));

  injectImport(ast, isCJSFile, 'intlayer', 'astro-intlayer');

  genericRecastVisit(ast, (obj) =>
    updatePluginArray(obj, 'integrations', 'intlayer')
  );

  return recast.print(ast).code;
};

export const updateNextConfig = (
  content: string,
  extension: string
): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const isCJSFile = extension === 'cjs' || content.includes('module.exports');

  injectImport(ast, isCJSFile, 'withIntlayer', 'next-intlayer/server');

  recast.visit(ast, {
    visitExportDefaultDeclaration(path) {
      const declaration = path.node.declaration;
      if (
        n.Expression.check(declaration) &&
        !(
          n.CallExpression.check(declaration) &&
          n.Identifier.check(declaration.callee) &&
          declaration.callee.name === 'withIntlayer'
        )
      ) {
        path
          .get('declaration')
          .replace(
            b.callExpression(b.identifier('withIntlayer'), [declaration as any])
          );
      }
      return false;
    },
    visitAssignmentExpression(path) {
      const { left, right } = path.node;

      if (
        n.MemberExpression.check(left) &&
        recast.print(left).code === 'module.exports' &&
        !(
          n.CallExpression.check(right) &&
          n.Identifier.check(right.callee) &&
          right.callee.name === 'withIntlayer'
        )
      ) {
        path
          .get('right')
          .replace(b.callExpression(b.identifier('withIntlayer'), [right]));
      }
      return false;
    },
  });

  return recast.print(ast).code;
};

/**
 * Returns true when the expression looks like an Immediately Invoked Function
 * Expression (e.g. `(async () => { ... })()`). Such custom async exports cannot
 * be safely wrapped with the synchronous Metro helper, so they are skipped.
 */
const isImmediatelyInvokedFunction = (node: any): boolean =>
  n.CallExpression.check(node) &&
  (n.ArrowFunctionExpression.check(node.callee) ||
    n.FunctionExpression.check(node.callee));

/**
 * Wraps a React Native Metro config's exported value with
 * `configMetroIntlayerSync` from `react-native-intlayer/metro`, injecting the
 * import. The synchronous helper is used because it wraps a plain config object
 * and needs no IIFE, making it safe to inject into existing configs without
 * restructuring them.
 *
 * Non-destructive: returns the content unchanged when the export is already
 * wrapped, when the Intlayer Metro plugin is already present, or when the export
 * is a custom async IIFE that cannot be wrapped synchronously. Callers should
 * compare the result with the input to detect the skipped case.
 */
export const updateMetroConfig = (
  content: string,
  extension: string
): string => {
  if (content.includes('react-native-intlayer')) {
    return content;
  }

  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const isCJSFile =
    extension === 'cjs' ||
    (content.includes('module.exports') && !content.includes('import '));

  const wrapperName = 'configMetroIntlayerSync';

  const isWrappable = (node: any): boolean =>
    n.Expression.check(node) &&
    !isImmediatelyInvokedFunction(node) &&
    !(
      n.CallExpression.check(node) &&
      n.Identifier.check(node.callee) &&
      node.callee.name === wrapperName
    );

  let wrapped = false;

  recast.visit(ast, {
    visitExportDefaultDeclaration(path) {
      const declaration = path.node.declaration;
      if (isWrappable(declaration)) {
        path
          .get('declaration')
          .replace(
            b.callExpression(b.identifier(wrapperName), [declaration as any])
          );
        wrapped = true;
      }
      return false;
    },
    visitAssignmentExpression(path) {
      const { left, right } = path.node;

      if (
        n.MemberExpression.check(left) &&
        recast.print(left).code === 'module.exports' &&
        isWrappable(right)
      ) {
        path
          .get('right')
          .replace(b.callExpression(b.identifier(wrapperName), [right]));
        wrapped = true;
      }
      return false;
    },
  });

  // Only inject the import when an export was actually wrapped, so an
  // un-wrappable config is left completely untouched.
  if (!wrapped) {
    return content;
  }

  injectImport(ast, isCJSFile, wrapperName, 'react-native-intlayer/metro');

  return recast.print(ast).code;
};

/**
 * Builds the contents of a fresh `metro.config.js` wired with the Intlayer
 * Metro plugin. Uses the async `configMetroIntlayer` helper (which can build
 * dictionaries on server start) and picks the default-config source based on
 * whether the project is an Expo app.
 */
export const getMetroConfigTemplate = (isExpo: boolean): string => {
  const defaultConfigSource = isExpo
    ? 'expo/metro-config'
    : '@react-native/metro-config';

  return `const { getDefaultConfig } = require("${defaultConfigSource}");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
`;
};

export const updateNuxtConfig = (content: string): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const updateConfigObject = (objExpr: any) => {
    if (
      !objExpr ||
      (objExpr.type !== 'ObjectExpression' &&
        !n.ObjectExpression.check(objExpr))
    )
      return;

    let modulesProp = objExpr.properties.find((p: any) => {
      if (!p?.key) return false;
      const keyName = p.key.name || p.key.value;
      return keyName === 'modules';
    }) as any;

    if (!modulesProp) {
      modulesProp = b.property(
        'init',
        b.identifier('modules'),
        b.arrayExpression([])
      );
      objExpr.properties.push(modulesProp);
    }

    const modulesValue = modulesProp.value;

    if (
      modulesValue &&
      (modulesValue.type === 'ArrayExpression' ||
        n.ArrayExpression.check(modulesValue))
    ) {
      const hasModule = modulesValue.elements.some((el: any) => {
        if (
          n.StringLiteral.check(el) ||
          el.type === 'StringLiteral' ||
          el.type === 'Literal'
        ) {
          return (el.value || el.extra?.rawValue) === 'nuxt-intlayer';
        }
        return false;
      });

      if (!hasModule) {
        modulesValue.elements.push(b.stringLiteral('nuxt-intlayer'));
      }
    }
  };

  genericRecastVisit(ast, updateConfigObject, ['defineNuxtConfig']);

  return recast.print(ast).code;
};

/**
 * Updates a Vite config for vue-i18n compat: injects `vueI18nVitePlugin` from
 * `@intlayer/vue-i18n/plugin` into the plugins array.
 */
export const updateViteConfigForVueI18n = (
  content: string,
  extension: string
): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const isCJSFile =
    extension === 'cjs' ||
    (content.includes('module.exports') && !content.includes('import '));

  injectImport(
    ast,
    isCJSFile,
    'vueI18nVitePlugin',
    '@intlayer/vue-i18n/plugin'
  );

  genericRecastVisit(ast, (obj) =>
    updatePluginArray(obj, 'plugins', 'vueI18nVitePlugin')
  );

  return recast.print(ast).code;
};

/**
 * Generic vite config updater for any compat plugin that uses alias injection.
 * Injects the named import from `pluginPackageSource` and appends the plugin
 * call to the `plugins` array.
 */
export const updateViteConfigForCompatPlugin = (
  content: string,
  extension: string,
  pluginConfig: CompatVitePluginConfig
): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const isCJSFile =
    extension === 'cjs' ||
    (content.includes('module.exports') && !content.includes('import '));

  injectImport(
    ast,
    isCJSFile,
    pluginConfig.pluginFunctionName,
    pluginConfig.pluginPackageSource
  );

  genericRecastVisit(ast, (obj) =>
    updatePluginArray(obj, 'plugins', pluginConfig.pluginFunctionName)
  );

  return recast.print(ast).code;
};

/**
 * Rewrites the module source of an existing named import in a vite config,
 * keeping the imported binding and its call site untouched. Used when a compat
 * plugin is a drop-in replacement for an i18n library's own vite plugin — e.g.
 * lingui: `import { lingui } from "@lingui/vite-plugin"` becomes
 * `import { lingui } from "@intlayer/lingui/plugin"`, leaving `lingui()` in the
 * `plugins` array as-is. Returns the content unchanged when no matching import
 * is found.
 */
export const replaceViteConfigPluginImportSource = (
  content: string,
  importName: string,
  fromPackageSource: string,
  toPackageSource: string
): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  let changed = false;

  recast.visit(ast, {
    visitImportDeclaration(path) {
      const { source, specifiers } = path.node;
      const importsBinding = (specifiers ?? []).some(
        (specifier) =>
          n.ImportSpecifier.check(specifier) &&
          specifier.imported.name === importName
      );

      if (
        n.StringLiteral.check(source) &&
        source.value === fromPackageSource &&
        importsBinding
      ) {
        source.value = toPackageSource;
        changed = true;
      }

      return false;
    },
  });

  if (!changed) return content;
  return recast.print(ast).code;
};

/**
 * Generic Next.js config wrapper for compat plugins. Injects the import and
 * wraps the default export / `module.exports` with a HOC call.
 */
const wrapNextConfigWithHoc = (
  content: string,
  extension: string,
  hocFunctionName: string,
  pluginPackageSource: string
): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const isCJSFile = extension === 'cjs' || content.includes('module.exports');

  injectImport(ast, isCJSFile, hocFunctionName, pluginPackageSource);

  recast.visit(ast, {
    visitExportDefaultDeclaration(path) {
      const declaration = path.node.declaration;
      if (
        n.Expression.check(declaration) &&
        !(
          n.CallExpression.check(declaration) &&
          n.Identifier.check(declaration.callee) &&
          declaration.callee.name === hocFunctionName
        )
      ) {
        path
          .get('declaration')
          .replace(
            b.callExpression(b.identifier(hocFunctionName), [
              declaration as any,
            ])
          );
      }
      return false;
    },
    visitAssignmentExpression(path) {
      const { left, right } = path.node;

      if (
        n.MemberExpression.check(left) &&
        recast.print(left).code === 'module.exports' &&
        !(
          n.CallExpression.check(right) &&
          n.Identifier.check(right.callee) &&
          right.callee.name === hocFunctionName
        )
      ) {
        path
          .get('right')
          .replace(b.callExpression(b.identifier(hocFunctionName), [right]));
      }
      return false;
    },
  });

  return recast.print(ast).code;
};

/**
 * Updates a Next.js config for next-translate compat: wraps the default export
 * with `withNextTranslate` from `@intlayer/next-translate/plugin`.
 */
export const updateNextConfigForNextTranslate = (
  content: string,
  extension: string
): string =>
  wrapNextConfigWithHoc(
    content,
    extension,
    'withNextTranslate',
    '@intlayer/next-translate/plugin'
  );

/**
 * Updates a Nuxt config for nuxtjs-i18n compat: adds `@intlayer/nuxtjs-i18n`
 * to the `modules` array.
 */
export const updateNuxtConfigForNuxtjsI18n = (content: string): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const updateConfigObject = (objExpr: any) => {
    if (
      !objExpr ||
      (objExpr.type !== 'ObjectExpression' &&
        !n.ObjectExpression.check(objExpr))
    )
      return;

    let modulesProp = (objExpr.properties as any[]).find((p: any) => {
      if (!p?.key) return false;
      const keyName = p.key.name || p.key.value;
      return keyName === 'modules';
    }) as any;

    if (!modulesProp) {
      modulesProp = b.property(
        'init',
        b.identifier('modules'),
        b.arrayExpression([])
      );
      (objExpr.properties as any[]).push(modulesProp);
    }

    const modulesValue = modulesProp.value;

    if (
      modulesValue &&
      (modulesValue.type === 'ArrayExpression' ||
        n.ArrayExpression.check(modulesValue))
    ) {
      const hasModule = (modulesValue.elements as any[]).some((el: any) => {
        if (
          n.StringLiteral.check(el) ||
          el.type === 'StringLiteral' ||
          el.type === 'Literal'
        ) {
          return (el.value ?? el.extra?.rawValue) === '@intlayer/nuxtjs-i18n';
        }
        return false;
      });

      if (!hasModule) {
        (modulesValue.elements as any[]).push(
          b.stringLiteral('@intlayer/nuxtjs-i18n')
        );
      }
    }
  };

  genericRecastVisit(ast, updateConfigObject, ['defineNuxtConfig']);

  return recast.print(ast).code;
};

/**
 * Updates a Next.js config for next-i18next compat: wraps the default export
 * with `withI18next` from `@intlayer/next-i18next/plugin`.
 */
export const updateNextConfigForNextI18next = (
  content: string,
  extension: string
): string =>
  wrapNextConfigWithHoc(
    content,
    extension,
    'withI18next',
    '@intlayer/next-i18next/plugin'
  );

/**
 * Updates a Next.js config for next-intl compat: replaces any existing
 * `next-intl/plugin` import source with `@intlayer/next-intl/plugin`, or
 * injects `createNextIntlPlugin` with a factory-call wrapper when no such
 * import is present.
 */
export const updateNextConfigForNextIntl = (
  content: string,
  extension: string
): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const isCJSFile = extension === 'cjs' || content.includes('module.exports');
  let replacedExistingSource = false;

  // Replace 'next-intl/plugin' import source with the compat package.
  recast.visit(ast, {
    visitImportDeclaration(path) {
      if (path.node.source.value === 'next-intl/plugin') {
        path.node.source = b.stringLiteral('@intlayer/next-intl/plugin');
        replacedExistingSource = true;
      }
      return false;
    },
  });

  if (replacedExistingSource) {
    return recast.print(ast).code;
  }

  // No existing next-intl/plugin import: check whether createNextIntlPlugin is
  // already present from any source before injecting the full factory pattern.
  const hasCreatePlugin = (ast.program.body as any[]).some((stmt: any) => {
    if (!n.ImportDeclaration.check(stmt)) return false;
    return (stmt.specifiers ?? []).some(
      (spec: any) =>
        (n.ImportSpecifier.check(spec) &&
          spec.imported.name === 'createNextIntlPlugin') ||
        (n.ImportDefaultSpecifier.check(spec) &&
          spec.local?.name === 'createNextIntlPlugin')
    );
  });

  if (hasCreatePlugin) {
    return recast.print(ast).code;
  }

  // Inject the import.
  injectImport(
    ast,
    isCJSFile,
    'createNextIntlPlugin',
    '@intlayer/next-intl/plugin'
  );

  // Insert a factory-call variable declaration after the last import.
  const lastImportIndex = (ast.program.body as any[]).reduce(
    (lastIndex: number, stmt: any, index: number) => {
      if (n.ImportDeclaration.check(stmt)) return index;
      return lastIndex;
    },
    -1
  );

  const factoryCallDeclaration = b.variableDeclaration('const', [
    b.variableDeclarator(
      b.identifier('_withNextIntlayer'),
      b.callExpression(b.identifier('createNextIntlPlugin'), [])
    ),
  ]);

  (ast.program.body as any[]).splice(
    lastImportIndex + 1,
    0,
    factoryCallDeclaration
  );

  // Wrap the default export with _withNextIntlayer(...).
  recast.visit(ast, {
    visitExportDefaultDeclaration(path) {
      const declaration = path.node.declaration;
      if (
        n.Expression.check(declaration) &&
        !(
          n.CallExpression.check(declaration) &&
          n.Identifier.check(declaration.callee) &&
          declaration.callee.name === '_withNextIntlayer'
        )
      ) {
        path
          .get('declaration')
          .replace(
            b.callExpression(b.identifier('_withNextIntlayer'), [
              declaration as any,
            ])
          );
      }
      return false;
    },
    visitAssignmentExpression(path) {
      const { left, right } = path.node;

      if (
        n.MemberExpression.check(left) &&
        recast.print(left).code === 'module.exports' &&
        !(
          n.CallExpression.check(right) &&
          n.Identifier.check(right.callee) &&
          right.callee.name === '_withNextIntlayer'
        )
      ) {
        path
          .get('right')
          .replace(
            b.callExpression(b.identifier('_withNextIntlayer'), [right])
          );
      }
      return false;
    },
  });

  return recast.print(ast).code;
};

/** The sync plugin used to ingest a compat library's catalogs. */
type SyncPluginInfo = {
  /** Called function name, e.g. `'syncJSON'`. */
  functionName: string;
  /** Package the function is imported from. */
  packageSource: string;
};

/** Resolves the sync plugin (function + package) for a compat sync config. */
const getSyncPluginInfo = (syncConfig: CompatSyncConfig): SyncPluginInfo =>
  syncConfig.plugin === 'po'
    ? { functionName: 'syncPO', packageSource: '@intlayer/sync-po-plugin' }
    : { functionName: 'syncJSON', packageSource: '@intlayer/sync-json-plugin' };

/**
 * Parses a `syncJSON({ ... })` / `syncPO({ ... })` call expression from a source
 * snippet so it can be injected into a config AST without manually constructing
 * template-literal nodes via builders.
 *
 * The destructuring parameters adapt to whether the source template uses the
 * `key` placeholder (nested pattern) or only `locale` (flat pattern).
 */
const buildSyncCallNode = (syncConfig: CompatSyncConfig): any => {
  const { functionName } = getSyncPluginInfo(syncConfig);
  const usesKey = syncConfig.sourceTemplate.includes('${key}');
  const paramDestructuring = !usesKey
    ? '{ locale }'
    : // `icu` (and PO, which is ICU-dialect) reads `{ key, locale }`; the
      // i18next/vue-i18n JSON dialects keep their established `{ locale, key }`.
      syncConfig.format === 'icu' || syncConfig.plugin === 'po'
      ? '{ key, locale }'
      : '{ locale, key }';

  // `syncPO` always serializes gettext, so it takes no `format`. `syncJSON`
  // needs the JSON dialect.
  const formatProperty =
    syncConfig.plugin === 'po' ? '' : `format: '${syncConfig.format}', `;

  // `splitKeys` is written explicitly only when forced on (next-intl / use-intl
  // single-file namespace model). When omitted, syncJSON auto-detects it from
  // the presence of a `${key}` segment in the source.
  const splitKeysProperty = syncConfig.splitKeys ? ', splitKeys: true' : '';

  // The sourceTemplate contains ${locale} / ${key} as literal characters;
  // they become proper template expressions once the snippet is parsed by recast.
  const snippet = `${functionName}({ ${formatProperty}source: (${paramDestructuring}) => \`${syncConfig.sourceTemplate}\`${splitKeysProperty} })`;
  const snippetAst = recast.parse(snippet, {
    parser: require('recast/parsers/typescript'),
  });
  return (snippetAst.program.body[0] as any).expression;
};

/**
 * Injects or ensures `dictionary: { format: '<value>' }` exists in an object
 * expression.  Leaves any pre-existing `dictionary` properties untouched —
 * only the `format` sub-property is added when absent.
 */
const injectDictionaryFormat = (objExpr: any, format: string): void => {
  if (
    !objExpr ||
    (objExpr.type !== 'ObjectExpression' && !n.ObjectExpression.check(objExpr))
  )
    return;

  let dictionaryProp = (objExpr.properties as any[]).find((prop: any) => {
    if (!prop?.key) return false;
    return (prop.key.name ?? prop.key.value) === 'dictionary';
  });

  if (!dictionaryProp) {
    dictionaryProp = b.property(
      'init',
      b.identifier('dictionary'),
      b.objectExpression([])
    );
    (objExpr.properties as any[]).push(dictionaryProp);
  }

  const dictionaryObj = dictionaryProp.value;
  if (
    !dictionaryObj ||
    (dictionaryObj.type !== 'ObjectExpression' &&
      !n.ObjectExpression.check(dictionaryObj))
  )
    return;

  const hasFormat = (dictionaryObj.properties as any[]).some((prop: any) => {
    if (!prop?.key) return false;
    return (prop.key.name ?? prop.key.value) === 'format';
  });

  if (!hasFormat) {
    (dictionaryObj.properties as any[]).push(
      b.property('init', b.identifier('format'), b.stringLiteral(format))
    );
  }
};

/**
 * Injects the sync plugin import (`syncJSON` / `syncPO`) and a configured
 * `syncJSON(...)` / `syncPO(...)` call into the plugins array of an intlayer
 * config file. Idempotent: skips when the plugin call is already present.
 */
export const updateIntlayerConfigWithSyncPlugin = (
  content: string,
  extension: string,
  syncConfig: CompatSyncConfig
): string => {
  const ast = recast.parse(content, {
    parser: require('recast/parsers/typescript'),
  });

  const isCJSFile = extension === 'cjs' || content.includes('module.exports');

  const { functionName, packageSource } = getSyncPluginInfo(syncConfig);

  injectImport(ast, isCJSFile, functionName, packageSource);

  const callNode = buildSyncCallNode(syncConfig);

  // PO catalogs are serialized as gettext; JSON catalogs carry the dialect.
  const dictionaryFormat =
    syncConfig.plugin === 'po' ? 'po' : syncConfig.format;

  genericRecastVisit(ast, (objExpr) => {
    if (
      !objExpr ||
      (objExpr.type !== 'ObjectExpression' &&
        !n.ObjectExpression.check(objExpr))
    )
      return;

    // Inject dictionary.format alongside the plugin so intlayer knows how to
    // interpret dictionary content at runtime.
    injectDictionaryFormat(objExpr, dictionaryFormat);

    let pluginsProp = (objExpr.properties as any[]).find((prop: any) => {
      if (!prop?.key) return false;
      const keyName = prop.key.name ?? prop.key.value;
      return keyName === 'plugins';
    });

    if (!pluginsProp) {
      pluginsProp = b.property(
        'init',
        b.identifier('plugins'),
        b.arrayExpression([])
      );
      (objExpr.properties as any[]).push(pluginsProp);
    }

    const arrayValue = pluginsProp.value;

    if (
      arrayValue &&
      (arrayValue.type === 'ArrayExpression' ||
        n.ArrayExpression.check(arrayValue))
    ) {
      const hasSyncPlugin = (arrayValue.elements as any[]).some(
        (element: any) => {
          const callee = element?.callee;
          if (!callee) return false;
          const name: string = callee.name ?? callee.id?.name;
          return name === functionName;
        }
      );

      if (!hasSyncPlugin) {
        (arrayValue.elements as any[]).push(callNode);
      }
    }
  });

  return recast.print(ast).code;
};
