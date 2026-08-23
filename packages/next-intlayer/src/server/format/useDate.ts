import { date, presets } from '@intlayer/core/formatters';
import { resolveAmbientLocale } from '../ambientLocale';

/**
 * On the server side, hook returning a `date` formatter bound to the ambient
 * locale: the server context, falling back to the locale carried by the
 * request. A per-call `locale` option still wins.
 *
 * Reimplemented rather than re-exported from `react-intlayer/server/format`:
 * that one takes no locale argument, so there is no way to hand it the ambient
 * locale — it would read the server context alone and format with the default
 * locale on any render the provider did not reach.
 *
 * The options argument is either a preset name or an options object, so the
 * preset is resolved before the locale is merged in — spreading the string
 * itself would scatter its characters and drop the preset.
 */
export const useDate = () => {
  const locale = resolveAmbientLocale();

  return (...args: Parameters<typeof date>) =>
    date(
      args[0],
      typeof args[1] === 'string'
        ? { ...presets[args[1]], locale }
        : { ...args[1], locale: args[1]?.locale ?? locale }
    );
};
