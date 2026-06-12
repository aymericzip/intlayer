import type {
  defineMessage as _defineMessage,
  defineMessages as _defineMessages,
} from 'react-intl';

/**
 * Drop-in for react-intl's `defineMessages`.
 * Identity function — returns the map unchanged.
 * Exists so that IDEs and the intlayer analyzer can locate message ids
 * at source-analysis time.
 */
export const defineMessages: typeof _defineMessages = (messages) => messages;

/**
 * Drop-in for react-intl's `defineMessage`.
 * Identity function — returns the descriptor unchanged.
 */
export const defineMessage: typeof _defineMessage = (message) => message;
