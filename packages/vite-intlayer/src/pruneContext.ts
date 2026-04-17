// Re-export PruneContext types from @intlayer/babel so both the vite plugins
// and the babel plugins share the same type definitions.

import type { PruneContext } from '@intlayer/babel';

// createPruneContext is kept here as a local runtime value so that
// vite-intlayer does not depend on @intlayer/babel's dist being built
// with the new exports before this plugin can load.
export const createPruneContext = (): PruneContext => ({
  dictionaryKeyToFieldUsageMap: new Map(),
  dictionariesWithEdgeCases: new Set(),
  hasUnparsableSourceFiles: false,
  dictionaryKeysWithUntrackedBindings: new Map(),
  dictionaryKeyToFieldRenameMap: new Map(),
  dictionaryKeysWithOpaqueTopLevelFields: new Map(),
  dictionariesSkippingFieldRename: new Set(),
  pendingFrameworkAnalysis: new Map(),
});
