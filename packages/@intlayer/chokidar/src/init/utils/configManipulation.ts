import * as recast from 'recast';

const b = recast.types.builders;
const n = recast.types.namedTypes;

/**
 * Checks if a module is already imported or required.
 */
const isModuleImported = (ast: any, moduleName: string): boolean => {
  let found = false;
  recast.visit(ast, {
    visitImportDeclaration(path) {
      if (path.node.source.value === moduleName) {
        found = true;
      }
      return false;
    },
    visitCallExpression(path) {
      const { callee, arguments: args } = path.node;

      if (
        n.Identifier.check(callee) &&
        callee.name === 'require' &&
        args[0] &&
        n.StringLiteral.check(args[0]) &&
        args[0].value === moduleName
      ) {
        found = true;
      }
      return false;
    },
  });
  return found;
};

/**
 * Injects import/require at the top of the file.
 */
const injectImport = (
  ast: any,
  isCJS: boolean,
  importName: string,
  source: string
) => {
  if (isModuleImported(ast, source)) return;

  const declaration = isCJS
    ? b.variableDeclaration('const', [
        b.variableDeclarator(
          b.objectPattern([
            b.objectProperty.from({
              key: b.identifier(importName),
              value: b.identifier(importName),
              shorthand: true,
            }),
          ]),
          b.callExpression(b.identifier('require'), [b.stringLiteral(source)])
        ),
      ])
    : b.importDeclaration(
        [b.importSpecifier(b.identifier(importName))],
        b.stringLiteral(source)
      );

  ast.program.body.unshift(declaration);
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

  const updateConfigObject = (objExpr: any) => {
    if (
      !objExpr ||
      (objExpr.type !== 'ObjectExpression' &&
        !n.ObjectExpression.check(objExpr))
    )
      return;

    let pluginsProp = objExpr.properties.find((p: any) => {
      if (!p || !p.key) return false;
      const keyName = p.key.name || p.key.value;
      return keyName === 'plugins';
    }) as any;

    if (!pluginsProp) {
      pluginsProp = b.property(
        'init',
        b.identifier('plugins'),
        b.arrayExpression([])
      );
      objExpr.properties.push(pluginsProp);
    }

    const pluginsValue = pluginsProp.value;

    if (
      pluginsValue &&
      (pluginsValue.type === 'ArrayExpression' ||
        n.ArrayExpression.check(pluginsValue))
    ) {
      const hasPlugin = pluginsValue.elements.some((el: any) => {
        const callee = el?.callee;

        if (!callee) return false;
        const name = callee.name || callee.id?.name;
        return name === 'intlayer' || name === 'il';
      });

      if (!hasPlugin) {
        pluginsValue.elements.push(
          b.callExpression(b.identifier('intlayer'), [])
        );
      }
    }
  };

  recast.visit(ast, {
    visitExportDefaultDeclaration(path) {
      const decl = path.node.declaration;

      if (n.ObjectExpression.check(decl)) {
        updateConfigObject(decl);
      } else if (
        n.CallExpression.check(decl) &&
        n.Identifier.check(decl.callee) &&
        decl.callee.name === 'defineConfig'
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
          right.callee.name === 'defineConfig'
        ) {
          if (n.ObjectExpression.check(right.arguments[0])) {
            updateConfigObject(right.arguments[0]);
          }
        }
      }
      return false;
    },
  });

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
