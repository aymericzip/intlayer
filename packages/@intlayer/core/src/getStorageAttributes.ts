/**
 * Re-exported from `@intlayer/config/utils` where the implementation now lives.
 * Called at config-build time — the result is stored in `configuration.routing.storage`
 * as `ProcessedStorageAttributes` so consumers do not need to call this directly.
 */
export { getStorageAttributes } from '@intlayer/config/utils';
export type { ProcessedStorageAttributes } from '@intlayer/types/config';
