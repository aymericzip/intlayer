// Export the SvelteIntlayerCompiler for programmatic use
export {
  type CompilerMode,
  createSvelteIntlayerCompiler,
  type HotUpdateContext,
  SvelteIntlayerCompiler,
  type SvelteIntlayerCompilerOptions,
  type SvelteIntlayerVitePlugin,
  svelteIntlayerCompiler,
  type TransformResult,
} from './SvelteIntlayerCompiler';

// Export the Svelte extraction plugin
export {
  ATTRIBUTES_TO_EXTRACT,
  defaultShouldExtract,
  type ExtractedContent,
  type ExtractPluginOptions,
  type ExtractResult,
  extractDictionaryKeyFromPath,
  generateKey,
  intlayerSvelteExtract,
  shouldProcessFile,
} from './svelte-intlayer-extract';
