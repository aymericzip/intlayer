import * as recast from 'recast';
import type { CompatSyncConfig } from './packageManager';

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
 * Parses a syncJSON({ ... }) call expression from a source snippet so it can
 * be injected into a config AST without manually constructing template-literal
 * nodes via builders.
 */
const buildSyncJSONCallNode = (syncConfig: CompatSyncConfig): any => {
  const paramDestructuring =
    syncConfig.format === 'icu' ? '{ key, locale }' : '{ locale, key }';
  // The sourceTemplate contains ${locale} / ${key} as literal characters;
  // they become proper template expressions once the snippet is parsed by recast.
  const snippet = `syncJSON({ format: '${syncConfig.format}', source: (${paramDestructuring}) => \`${syncConfig.sourceTemplate}\` })`;
  const snippetAst = recast.parse(snippet, {
    parser: require('recast/parsers/typescript'),
  });
  return (snippetAst.program.body[0] as any).expression;
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
