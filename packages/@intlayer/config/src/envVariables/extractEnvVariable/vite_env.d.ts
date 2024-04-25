// eslint-disable-next-line @typescript-eslint/no-empty-interface
/**
 * Module augmentation to add the `env` property to `import.meta`
 *
 * Simulate a vite environment
 */
interface ImportMeta {
  env: Record<string, string | undefined>;
}
