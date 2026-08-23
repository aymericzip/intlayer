import { percentage } from '@intlayer/core/formatters';
import { resolveAmbientLocale } from '../ambientLocale';

/**
 * On the server side, hook returning a `percentage` formatter bound to the ambient
 * locale: the server context, falling back to the locale carried by the
 * request. A per-call `locale` option still wins.
 *
 * Reimplemented rather than re-exported from `react-intlayer/server/format`:
 * that one takes no locale argument, so there is no way to hand it the ambient
 * locale — it would read the server context alone and format with the default
 * locale on any render the provider did not reach.
 */
export const usePercentage = () => {
  const locale = resolveAmbientLocale();

  return (...args: Parameters<typeof percentage>) =>
    percentage(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
