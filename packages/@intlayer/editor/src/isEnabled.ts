import configuration from '@intlayer/config/built';

export const isEnabled =
  process.env['INTLAYER_EDITOR_ENABLED'] !== 'false' && // Allow purging a build time using bundler + env var // Keep env['INTLAYER_EDITOR_ENABLED'] syntax for angular to treat it as
  configuration.editor?.enabled && // Editor enabled in config
  typeof window !== 'undefined' && // Client side
  window.self !== window.top; // Is in iframe
