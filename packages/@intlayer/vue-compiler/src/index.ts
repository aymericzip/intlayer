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
  type ExtractedContent,
  type ExtractPluginOptions,
  type ExtractResult,
  intlayerVueExtract,
  processVueFile,
  shouldProcessFile,
} from './vue-intlayer-extract';
