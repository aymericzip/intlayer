import { editor } from '@intlayer/config/built';

const TREE_SHAKE_EDITOR = process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

export const isEnabled =
  !TREE_SHAKE_EDITOR && // Allow purging a build time using bundler + env var
  editor?.enabled && // Editor enabled in config
  typeof window !== 'undefined' && // Client side
  window.self !== window.top; // Is in iframe
