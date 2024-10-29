import 'module';
export {};

/**
 * Module augmentation to add the `env` property to `import.meta`
 *
 * Simulate a vite environment
 */
declare global {
  interface ImportMeta {
    env: Record<string, string | undefined>;
  }
}
