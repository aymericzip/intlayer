import { analytics, editor } from '@intlayer/config/built';
import { isBotEnvironment } from './utils/isBot';

/**
 * Compile-time kill switch. Bundlers replace `process.env.INTLAYER_ANALYTICS_ENABLED`
 * (set to `'false'` by `@intlayer/config` unless `analytics.enabled` is `true`
 * — the default once this package is installed — AND an `editor.clientId` is
 * configured) so the whole analytics integration is dead-code-eliminated for
 * apps that opted out.
 */
const TREE_SHAKE_ANALYTICS = process.env.INTLAYER_ANALYTICS_ENABLED === 'false';

/**
 * Runtime guard mirroring `@intlayer/editor`'s `isEnabled`, but inverted with
 * respect to the iframe: analytics runs for real end users on the **top**
 * window and stays off inside the editor/CMS preview iframe so editor sessions
 * are never counted as traffic.
 *
 * Enabled when:
 * - the bundler did not tree-shake analytics away, and
 * - the user did not opt out (`analytics.enabled === true`, the default), and
 * - a project key is configured (`editor.clientId`), and
 * - we are on the client, and
 * - we are the top window (not embedded in the editor), and
 * - the visitor is not a bot, crawler or automation runtime.
 */
export const isEnabled =
  !TREE_SHAKE_ANALYTICS &&
  analytics?.enabled === true &&
  Boolean(editor?.clientId) &&
  typeof window !== 'undefined' &&
  window.self === window.top &&
  !isBotEnvironment();
