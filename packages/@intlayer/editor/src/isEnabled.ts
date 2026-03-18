import configuration from '@intlayer/config/built';

export const isEnabled =
  configuration.editor?.enabled && // Editor enabled in config
  typeof window !== 'undefined' && // Client side
  window.self !== window.top; // Is in iframe
