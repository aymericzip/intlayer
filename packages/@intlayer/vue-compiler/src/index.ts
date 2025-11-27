// Export the VueIntlayerCompiler for programmatic use
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
  generateKey,
  intlayerVueExtract,
  shouldProcessFile,
} from './vue-intlayer-extract';
