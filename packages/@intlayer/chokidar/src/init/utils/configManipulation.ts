import * as recast from 'recast';
import type {
  CompatSyncConfig,
  CompatVitePluginConfig,
} from './packageManager';

const { builders: b, namedTypes: n } = recast.types;

const injectImport = (
  ast: any,
  isCJS: boolean,
  importName: string,
  source: string
) => {
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
        stmt.specifiers.some(
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
        const name = decl.name;
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

/**
 * Parses a syncJSON({ ... }) call expression from a source snippet so it can
 * be injected into a config AST without manually constructing template-literal
 * nodes via builders.
 *
 * The destructuring parameters adapt to whether the source template uses the
 * `key` placeholder (nested pattern) or only `locale` (flat pattern).
 */
const buildSyncJSONCallNode = (syncConfig: CompatSyncConfig): any => {
  const usesKey = syncConfig.sourceTemplate.includes('${key}');
  const paramDestructuring =
    syncConfig.format === 'icu'
      ? usesKey
        ? '{ key, locale }'
        : '{ locale }'
      : usesKey
        ? '{ locale, key }'
        : '{ locale }';

  // The sourceTemplate contains ${locale} / ${key} as literal characters;
  // they become proper template expressions once the snippet is parsed by recast.
  const snippet = `syncJSON({ format: '${syncConfig.format}', source: (${paramDestructuring}) => \`${syncConfig.sourceTemplate}\` })`;
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
 * Injects the syncJSON import and a configured syncJSON(...) call into the
 * plugins array of an intlayer config file. Idempotent: skips when
 * @intlayer/sync-json-plugin is already imported.
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

  injectImport(ast, isCJSFile, 'syncJSON', '@intlayer/sync-json-plugin');

  const callNode = buildSyncJSONCallNode(syncConfig);

  genericRecastVisit(ast, (objExpr) => {
    if (
      !objExpr ||
      (objExpr.type !== 'ObjectExpression' &&
        !n.ObjectExpression.check(objExpr))
    )
      return;

    // Inject dictionary.format alongside the plugin so intlayer knows how to
    // interpret dictionary content at runtime.
    injectDictionaryFormat(objExpr, syncConfig.format);

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
      const hasSyncJSON = (arrayValue.elements as any[]).some(
        (element: any) => {
          const callee = element?.callee;
          if (!callee) return false;
          const name: string = callee.name ?? callee.id?.name;
          return name === 'syncJSON';
        }
      );

      if (!hasSyncJSON) {
        (arrayValue.elements as any[]).push(callNode);
      }
    }
  });

  return recast.print(ast).code;
};
