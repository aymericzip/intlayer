export const forceExtensionsPlugin = () => ({
  name: 'forceEsmExtensionsPlugin',
  setup: (build) => {
    const isEsm = build.initialOptions.format === 'esm';

    build.onEnd((result) => {
      if (result.errors.length > 0) {
        return;
      }

      for (const outputFile of result.outputFiles ?? []) {
        // Only target CJS/ESM files.
        // This ignores additional files emitted, like sourcemaps ("*.js.map").

        if (
          !(
            outputFile.path.endsWith('.cjs') || outputFile.path.endsWith('.mjs')
          )
        ) {
          continue;
        }

        const fileContents = outputFile.text;
        const nextFileContents = modifyRelativeImports(fileContents, isEsm);

        outputFile.contents = Buffer.from(nextFileContents);
      }
    });
  },
});

const CJS_RELATIVE_IMPORT_EXP = /require\(["'](\..+)["']\)(;)?/g;
const ESM_RELATIVE_IMPORT_EXP = /from ["'](\..+)["'](;)?/g;

const ESMExtension = '.mjs';
const CJSExtension = '.cjs';

// create a regex to detext if the file has an extension as .png or .zip or .svg etc
const hasExtensionRegex = /\.(?:png|svg|jpe?g)$/i;

const modifyRelativeImports = (contents, isEsm) =>
  isEsm ? modifyEsmImports(contents) : modifyCjsImports(contents);

const modifyEsmImports = (contents) => {
  return contents.replace(
    ESM_RELATIVE_IMPORT_EXP,
    (_, importPath, maybeSemicolon = '') => {
      if (importPath.endsWith('.') || importPath.endsWith('/')) {
        return `from '${importPath}/index${ESMExtension}'${maybeSemicolon}`;
      }

      if (importPath.endsWith(ESMExtension)) {
        return `from '${importPath}'${maybeSemicolon}`;
      }

      if (hasExtensionRegex.test(importPath)) {
        return `from '${importPath}'${maybeSemicolon}`;
      }

      return `from '${importPath}${ESMExtension}'${maybeSemicolon}`;
    }
  );
};

const modifyCjsImports = (contents) => {
  return contents.replace(
    CJS_RELATIVE_IMPORT_EXP,
    (_, importPath, maybeSemicolon = '') => {
      if (importPath.endsWith('.') || importPath.endsWith('/')) {
        return `require('${importPath}/index${CJSExtension}')${maybeSemicolon}`;
      }

      if (importPath.endsWith(CJSExtension)) {
        return `require('${importPath}')${maybeSemicolon}`;
      }

      if (hasExtensionRegex.test(importPath)) {
        return `require('${importPath}')${maybeSemicolon}`;
      }

      return `require('${importPath}${CJSExtension}')${maybeSemicolon}`;
    }
  );
};
