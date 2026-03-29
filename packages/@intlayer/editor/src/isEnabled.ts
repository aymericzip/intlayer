import configuration from '@intlayer/config/built';
import { TREE_SHAKE_EDITOR } from '@intlayer/config/envVars';

export const isEnabled =
  !TREE_SHAKE_EDITOR && // Allow purging a build time using bundler + env var
  configuration.editor?.enabled && // Editor enabled in config
  typeof window !== 'undefined' && // Client side
  window.self !== window.top; // Is in iframe
