import { createContext } from 'react';
import type { IntlShape } from 'react-intl';

/**
 * React context holding the active intlayer-backed `IntlShape` instance.
 * Populated by {@link IntlProvider}; consumed by {@link useIntl}.
 */
export const IntlContext = createContext<IntlShape>(
  null as unknown as IntlShape
);

/** The raw `React.Provider<IntlShape>` — same as `IntlContext.Provider`. */
export const RawIntlProvider = IntlContext.Provider;
