import { nextAppRouterAdapter } from './nextAppRouter';
import { tanStackStartAdapter } from './tanstackStart';
import type { FrameworkAdapter, FrameworkSetupContext } from './types';

export type { FrameworkAdapter, FrameworkSetupContext } from './types';

/**
 * Registered framework adapters, tried in order. The first one whose `detect`
 * returns true handles the project. Add new adapters (Nuxt, Vite + React, …)
 * here as they are implemented.
 */
const adapters: FrameworkAdapter[] = [
  nextAppRouterAdapter,
  tanStackStartAdapter,
];

/**
 * Runs framework-specific scaffolding (middleware/proxy, providers in
 * layout/page, example content) for the first adapter that matches the project.
 * No-ops when no adapter recognizes the project. Each adapter is idempotent and
 * non-destructive, so this is safe to run on existing applications.
 */
export const setupFramework = async (
  context: FrameworkSetupContext
): Promise<void> => {
  for (const adapter of adapters) {
    if (await adapter.detect(context)) {
      await adapter.setup(context);
      return;
    }
  }
};
