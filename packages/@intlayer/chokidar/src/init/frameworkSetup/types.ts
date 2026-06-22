import type { PackageManager } from '../utils/packageManager';

/**
 * Shared context passed to every framework adapter. Mirrors the data already
 * computed by `initIntlayer` so adapters don't re-detect it.
 */
export type FrameworkSetupContext = {
  /** Absolute project root directory. */
  rootDir: string;
  /** Merged prod + dev dependencies of the project's package.json. */
  allDeps: Record<string, string>;
  /** Detected package manager (unused today, kept for adapter parity). */
  packageManager: PackageManager;
  /** Whether the project is a TypeScript project (drives file extensions). */
  useTypeScript: boolean;
};

/**
 * A framework integration adapter. Each adapter knows how to recognize a
 * project shape and scaffold the matching Intlayer integration (middleware,
 * providers, example content) in a way that is safe to re-run.
 */
export type FrameworkAdapter = {
  /** Human-readable adapter name, used in logs. */
  name: string;
  /**
   * Returns true when this adapter applies to the project. Adapters are tried
   * in registration order and the first match wins.
   */
  detect: (context: FrameworkSetupContext) => boolean | Promise<boolean>;
  /**
   * Performs the (idempotent, non-destructive) scaffolding. Implementations
   * must never overwrite user code they cannot confidently transform — they
   * should skip and log guidance instead.
   */
  setup: (context: FrameworkSetupContext) => Promise<void>;
};
