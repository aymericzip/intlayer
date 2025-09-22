import type { Locales, LocalesValues } from '@intlayer/config/client';
import {
	Dictionary,
	getDictionary as getDictionaryCore,
	Plugins,
	type DeepTransformContent
} from '@intlayer/core';

/**
 * Get dictionary content for a specific locale in Svelte applications
 * @param dictionary The dictionary object to transform
 * @param locale The target locale (optional, defaults to current locale)
 * @param additionalPlugins Additional transformation plugins
 * @returns Transformed dictionary content optimized for Svelte
 */
export const getDictionary = <T extends Dictionary, L extends LocalesValues = Locales>(
	dictionary: T,
	locale?: L,
	additionalPlugins?: Plugins[]
) => {
	const plugins: Plugins[] = [
		// intlayerNodePlugins,
		// svelteNodePlugins,
		// markdownPlugin,
		...(additionalPlugins ?? [])
	];

	return getDictionaryCore(dictionary, locale, plugins) as any as DeepTransformContent<
		T['content']
	>;
};
