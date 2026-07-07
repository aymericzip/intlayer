import type { FilePathPatternContext } from '@intlayer/types/filePathPattern';

/**
 * Build the context handed to `parseFilePathPattern` from the only two
 * variables sync plugins resolve: the dictionary key and the locale.
 *
 * `FilePathPatternContext` declares extra fields (`fileName`, `extension`,
 * `format`…) that only apply to content-declaration paths; sync-plugin
 * patterns never reference them, so this single cast keeps the partial
 * context in one audited place instead of scattering `as any` at call sites.
 */
export const buildFilePathPatternContext = (
  key: string,
  locale?: string
): FilePathPatternContext =>
  ({
    key,
    locale,
  }) as Partial<FilePathPatternContext> as FilePathPatternContext;
