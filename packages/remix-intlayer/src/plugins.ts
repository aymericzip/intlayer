import { internationalization } from '@intlayer/config/built';
import {
  type DeepTransformContent as DeepTransformContentCore,
  getBasePlugins,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type Plugins,
} from '@intlayer/core/interpreter';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { htmlPlugin, markdownPlugin } from 'vanilla-intlayer';

/**
 * Plugins applied by the hooks of this package.
 *
 * The base interpreter leaves `md()` and `html()` nodes untouched, so they are
 * handed to the string renderers of `vanilla-intlayer`: the node exposes the
 * rendered HTML as `.value` and `.use(components)` to override tags. Plain
 * strings stay primitives — a `remix/ui` child must be a string, not a wrapper.
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  vanillaMarkdown: true;
  vanillaHtml: true;
};

export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;

const pluginsCache = new Map<string, Plugins[]>();

/**
 * Returns the plugin array for a locale, memoized so the interpreter's
 * transform cache can key on its identity.
 */
export const getPlugins = (
  locale?: LocalesValues,
  fallback = true
): Plugins[] => {
  const cacheKey = `${locale ?? internationalization.defaultLocale}_${fallback}`;

  const cached = pluginsCache.get(cacheKey);
  if (cached) return cached;

  const plugins = [
    ...getBasePlugins(locale, fallback),
    markdownPlugin,
    htmlPlugin,
  ];

  pluginsCache.set(cacheKey, plugins);

  return plugins;
};
