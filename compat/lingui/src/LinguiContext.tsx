import type { I18nContext } from '@lingui/react';
import { createContext } from 'react';

/**
 * Drop-in for `@lingui/react`'s `LinguiContext`.
 *
 * Provides the active `I18n` instance and the `_` translation function
 * to all descendant components.
 *
 * @example
 * ```tsx
 * import { useContext } from 'react';
 * import { LinguiContext } from '@lingui/react';
 *
 * const { i18n } = useContext(LinguiContext)!;
 * ```
 */
export const LinguiContext = createContext<I18nContext | null>(null);
