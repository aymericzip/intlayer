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
  type ExtractedContent,
  type ExtractPluginOptions,
  type ExtractResult,
  intlayerSvelteExtract,
  processSvelteFile,
  shouldProcessFile,
} from './svelte-intlayer-extract';
