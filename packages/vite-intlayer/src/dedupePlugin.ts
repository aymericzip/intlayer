import type { Plugin } from 'vite';

/**
 * Minimal shape of the resolved Vite config needed to deduplicate plugins.
 * Only the `plugins` array (read during `configResolved`) is required.
 */
type ResolvedConfigWithPlugins = {
  plugins: readonly { name: string }[];
};

/**
 * Guard that ensures a named Intlayer Vite plugin runs its side effects at most
 * once, even when it is registered several times.
 *
 * Since `intlayer()` now bundles the compiler and proxy plugins, a user who
 * *also* registers `intlayerCompiler()` / `intlayerProxy()` manually would end
 * up with duplicate plugins. Rather than throwing, every instance stays in the
 * plugin array (so Vite stays happy) while only the first instance sharing a
 * given `name` is treated as "primary" and actually executes.
 */
export type PrimaryInstanceGuard = {
  /**
   * Records the plugin object so the guard can later find the first instance by
   * identity in the resolved config.
   */
  setPlugin: (plugin: Plugin) => void;

  /**
   * `configResolved` handler: decides whether this instance is the primary one
   * among all plugins sharing its name.
   */
  resolve: (config: ResolvedConfigWithPlugins) => void;

  /**
   * `true` when this instance is the first one with its name (and before
   * `configResolved` has run, so a lone instance always behaves as primary).
   */
  readonly isPrimary: boolean;
};

/**
 * Create a {@link PrimaryInstanceGuard} for a plugin identified by `pluginName`.
 *
 * @param pluginName - The `name` of the Vite plugin to deduplicate.
 */
export const createPrimaryInstanceGuard = (
  pluginName: string
): PrimaryInstanceGuard => {
  let plugin: Plugin | undefined;
  let isPrimary = true;

  return {
    setPlugin: (value) => {
      plugin = value;
    },
    resolve: (config) => {
      const firstMatching = config.plugins.find((p) => p.name === pluginName);
      // Identity comparison: only the first plugin object with this name runs.
      isPrimary = firstMatching === plugin;
    },
    get isPrimary() {
      return isPrimary;
    },
  };
};
