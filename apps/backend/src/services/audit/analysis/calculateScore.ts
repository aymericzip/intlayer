/**
 * Scoring logic lives in `@intlayer/chokidar/scan` so it can be shared between
 * the hosted SEO audit and the `intlayer scan` CLI command. This module simply
 * re-exports it to keep existing backend imports stable.
 */
export { mutateScore, type Score } from '@intlayer/chokidar/scan';
