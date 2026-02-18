/**
 * This export is deprecated, it should be changed by
 *
 * "exports": {
 *  "./markdown": {
 *      "types": "./dist/types/markdown/index.d.ts",
 *      "require": "./dist/cjs/markdown/index.cjs",
 *      "import": "./dist/esm/markdown/index.mjs"
 *  },
 *  "./utils": {
 *      "types": "./dist/types/utils/index.d.ts",
 *      "require": "./dist/cjs/utils/index.cjs",
 *      "import": "./dist/esm/utils/index.mjs"
 *  },
 *  "./interpreter": {
 *      "types": "./dist/types/interpreter/index.d.ts",
 *      "require": "./dist/cjs/interpreter/index.cjs",
 *      "import": "./dist/esm/interpreter/index.mjs"
 *  },
 *  "./formatters": {
 *      "types": "./dist/types/formatters/index.d.ts",
 *      "require": "./dist/cjs/formatters/index.cjs",
 *      "import": "./dist/esm/formatters/index.mjs"
 *  },
 *  "./localization": {
 *      "types": "./dist/types/localization/index.d.ts",
 *      "require": "./dist/cjs/localization/index.cjs",
 *      "import": "./dist/esm/localization/index.mjs"
 *  },
 *  "./dictionaryManipulator": {
 *      "types": "./dist/types/dictionaryManipulator/index.d.ts",
 *      "require": "./dist/cjs/dictionaryManipulator/index.cjs",
 *      "import": "./dist/esm/dictionaryManipulator/index.mjs"
 *  },
 *  "./plugins": {
 *      "types": "./dist/types/deepTransformPlugins/index.d.ts",
 *      "require": "./dist/cjs/deepTransformPlugins/index.cjs",
 *      "import": "./dist/esm/deepTransformPlugins/index.mjs"
 *  },
 *  "./transpiler": {
 *      "types": "./dist/types/transpiler/index.d.ts",
 *      "require": "./dist/cjs/transpiler/index.cjs",
 *      "import": "./dist/esm/transpiler/index.mjs"
 *  },
 *  "./messageFormat": {
 *      "types": "./dist/types/messageFormat/index.d.ts",
 *      "require": "./dist/cjs/messageFormat/index.cjs",
 *      "import": "./dist/esm/messageFormat/index.mjs"
 *  },
 *  "./file": {
 *      "types": "./dist/types/transpiler/file/file.d.ts",
 *      "node": {
 *        "require": "./dist/cjs/transpiler/file/file.cjs",
 *        "import": "./dist/esm/transpiler/file/file.mjs"
 *      },
 *      "browser": {
 *        "require": "./dist/cjs/transpiler/file/fileBrowser.cjs",
 *        "import": "./dist/esm/transpiler/file/fileBrowser.mjs"
 *      }
 *  },
 *  "./file/browser": {
 *      "require": "./dist/cjs/transpiler/file/fileBrowser.cjs",
 *      "import": "./dist/esm/transpiler/file/fileBrowser.mjs"
 *  },
 *  "./package.json": "./package.json"
 * }
 */

export * from './deepTransformPlugins';
export * from './dictionaryManipulator';
export * from './formatters';
export * from './interpreter';
export * from './localization';
export * from './markdown';
export * from './messageFormat';
export * from './transpiler';
export * from './utils';
