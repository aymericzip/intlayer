export {
  type CompilerMode,
  createVueIntlayerCompiler,
  type HotUpdateContext,
  type TransformResult,
  VueIntlayerCompiler,
  type VueIntlayerCompilerOptions,
  type VueIntlayerVitePlugin,
  vueIntlayerCompiler,
} from './VueIntlayerCompiler';
// Export the Vue extraction plugin
export {
  ATTRIBUTES_TO_EXTRACT,
  defaultShouldExtract,
  type ExtractedContent,
  type ExtractPluginOptions,
  type ExtractResult,
  extractDictionaryKeyFromPath,
  intlayerVueExtract,
  processVueFile,
  shouldProcessFile,
} from './vue-intlayer-extract';
