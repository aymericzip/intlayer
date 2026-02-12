import {
  type ObjectLiteralExpression,
  Project,
  type SourceFile,
  SyntaxKind,
} from 'ts-morph';

/**
 * Checks if a module is already imported or required in the source file.
 */
const isModuleImported = (
  sourceFile: SourceFile,
  moduleName: string
): boolean => {
  const hasImport = sourceFile
    .getImportDeclarations()
    .some((i) => i.getModuleSpecifierValue() === moduleName);

  const hasRequire = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .some((c) => {
      const expression = c.getExpression();
      return (
        expression.getText() === 'require' &&
        c
          .getArguments()[0]
          ?.asKind(SyntaxKind.StringLiteral)
          ?.getLiteralValue() === moduleName
      );
    });

  return hasImport || hasRequire;
};

/**
 * Checks if the file should be treated as CommonJS.
 */
const isCJS = (content: string, extension: string): boolean => {
  if (extension === 'cjs') return true;
  if (['mjs', 'ts'].includes(extension)) return false;

  return (
    content.includes('module.exports') &&
    !content.includes('import ') &&
    !content.includes('export ')
  );
};

/**
 * Updates a Vite configuration file to include the Intlayer plugin.
 * @param content The content of the vite.config file
 * @param extension The file extension (ts, js, mjs, cjs)
 * @returns The updated content
 */
export const updateViteConfig = (
  content: string,
  extension: string
): string => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(
    `vite.config.${extension}`,
    content
  );

  const isCJSFile = isCJS(content, extension);

  // Add import if missing
  const hasIntlayerImport = isModuleImported(sourceFile, 'vite-intlayer');

  if (!hasIntlayerImport) {
    if (isCJSFile) {
      sourceFile.insertVariableStatement(0, {
        declarationKind: 'const' as any,
        declarations: [
          {
            name: '{ intlayer }',
            initializer: 'require("vite-intlayer")',
          },
        ],
      });
    } else {
      sourceFile.addImportDeclaration({
        moduleSpecifier: 'vite-intlayer',
        namedImports: ['intlayer'],
      });
    }
  }

  // Find the configuration object
  let configObject: ObjectLiteralExpression | undefined;

  // Case: export default defineConfig({...})
  const exportDefault = sourceFile.getExportAssignment(
    (e) => !e.isExportEquals()
  );
  if (exportDefault) {
    const expression = exportDefault.getExpression();

    if (expression.getKind() === SyntaxKind.CallExpression) {
      const call = expression.asKind(SyntaxKind.CallExpression);

      if (call?.getExpression().getText() === 'defineConfig') {
        const arg = call.getArguments()[0];

        if (arg?.getKind() === SyntaxKind.ObjectLiteralExpression) {
          configObject = arg.asKind(SyntaxKind.ObjectLiteralExpression);
        }
      }
    } else if (expression.getKind() === SyntaxKind.ObjectLiteralExpression) {
      // Case: export default {...}
      configObject = expression.asKind(SyntaxKind.ObjectLiteralExpression);
    } else if (expression.getKind() === SyntaxKind.Identifier) {
      // Case: const config = {...}; export default config;
      const identifier = expression.asKind(SyntaxKind.Identifier);
      const definitions = identifier?.getDefinitions();

      if (definitions && definitions.length > 0) {
        const node = definitions[0].getDeclarationNode();

        if (node?.getKind() === SyntaxKind.VariableDeclaration) {
          const init = node
            .asKind(SyntaxKind.VariableDeclaration)
            ?.getInitializer();

          if (init?.getKind() === SyntaxKind.ObjectLiteralExpression) {
            configObject = init.asKind(SyntaxKind.ObjectLiteralExpression);
          }
        }
      }
    }
  }

  // Case: module.exports = {...}
  if (!configObject) {
    const expressionStatements = sourceFile.getStatements();
    for (const statement of expressionStatements) {
      if (statement.getKind() === SyntaxKind.ExpressionStatement) {
        const expr = statement
          .asKind(SyntaxKind.ExpressionStatement)
          ?.getExpression();

        if (expr?.getKind() === SyntaxKind.BinaryExpression) {
          const binary = expr.asKind(SyntaxKind.BinaryExpression);

          if (
            binary?.getLeft().getText() === 'module.exports' &&
            binary.getOperatorToken().getKind() === SyntaxKind.EqualsToken
          ) {
            const right = binary.getRight();

            if (right.getKind() === SyntaxKind.ObjectLiteralExpression) {
              configObject = right.asKind(SyntaxKind.ObjectLiteralExpression);
            } else if (right.getKind() === SyntaxKind.CallExpression) {
              // Case: module.exports = defineConfig({...})
              const call = right.asKind(SyntaxKind.CallExpression);

              if (call?.getExpression().getText() === 'defineConfig') {
                const arg = call.getArguments()[0];

                if (arg?.getKind() === SyntaxKind.ObjectLiteralExpression) {
                  configObject = arg.asKind(SyntaxKind.ObjectLiteralExpression);
                }
              }
            } else if (right.getKind() === SyntaxKind.Identifier) {
              // Case: const config = {...}; module.exports = config;
              const identifier = right.asKind(SyntaxKind.Identifier);
              const definitions = identifier?.getDefinitions();

              if (definitions && definitions.length > 0) {
                const node = definitions[0].getDeclarationNode();

                if (node?.getKind() === SyntaxKind.VariableDeclaration) {
                  const init = node
                    .asKind(SyntaxKind.VariableDeclaration)
                    ?.getInitializer();

                  if (init?.getKind() === SyntaxKind.ObjectLiteralExpression) {
                    configObject = init.asKind(
                      SyntaxKind.ObjectLiteralExpression
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // 3. Update plugins array
  if (configObject) {
    let pluginsProp = configObject.getProperty('plugins');

    if (!pluginsProp) {
      configObject.addPropertyAssignment({
        name: 'plugins',
        initializer: '[]',
      });
      pluginsProp = configObject.getProperty('plugins');
    }

    if (pluginsProp?.getKind() === SyntaxKind.PropertyAssignment) {
      const initializer = pluginsProp
        .asKind(SyntaxKind.PropertyAssignment)
        ?.getInitializer();

      if (initializer?.getKind() === SyntaxKind.ArrayLiteralExpression) {
        const array = initializer.asKind(SyntaxKind.ArrayLiteralExpression);
        const hasIntlayer = array
          ?.getElements()
          .some((el) => el.getText().includes('intlayer('));

        if (!hasIntlayer) {
          array?.addElement('intlayer()');
        }
      }
    }
  }

  return sourceFile.getFullText();
};

/**
 * Updates a Next.js configuration file to wrap the export with withIntlayer.
 * @param content The content of the next.config file
 * @param extension The file extension (ts, js, mjs, cjs)
 * @returns The updated content
 */
export const updateNextConfig = (
  content: string,
  extension: string
): string => {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(
    `next.config.${extension}`,
    content
  );

  const isCJSFile = isCJS(content, extension);

  // 1. Add import if missing
  const hasIntlayerImport = isModuleImported(
    sourceFile,
    'next-intlayer/server'
  );

  if (!hasIntlayerImport) {
    if (isCJSFile) {
      sourceFile.insertVariableStatement(0, {
        declarationKind: 'const' as any,
        declarations: [
          {
            name: '{ withIntlayer }',
            initializer: 'require("next-intlayer/server")',
          },
        ],
      });
    } else {
      sourceFile.addImportDeclaration({
        moduleSpecifier: 'next-intlayer/server',
        namedImports: ['withIntlayer'],
      });
    }
  }

  // 2. Wrap export
  let updated = false;

  // Case: export default ...
  const exportDefault = sourceFile.getExportAssignment(
    (e) => !e.isExportEquals()
  );
  if (exportDefault) {
    const expression = exportDefault.getExpression();

    if (!expression.getText().includes('withIntlayer')) {
      exportDefault.setExpression(`withIntlayer(${expression.getText()})`);
      updated = true;
    }
  }

  // Case: module.exports = ...
  if (!updated) {
    const expressionStatements = sourceFile.getStatements();
    for (const statement of expressionStatements) {
      if (statement.getKind() === SyntaxKind.ExpressionStatement) {
        const expr = statement
          .asKind(SyntaxKind.ExpressionStatement)
          ?.getExpression();

        if (expr?.getKind() === SyntaxKind.BinaryExpression) {
          const binary = expr.asKind(SyntaxKind.BinaryExpression);

          if (
            binary?.getLeft().getText() === 'module.exports' &&
            binary.getOperatorToken().getKind() === SyntaxKind.EqualsToken
          ) {
            const right = binary.getRight();

            if (!right.getText().includes('withIntlayer')) {
              right.replaceWithText(`withIntlayer(${right.getText()})`);
              updated = true;
            }
          }
        }
      }
    }
  }

  return sourceFile.getFullText();
};
