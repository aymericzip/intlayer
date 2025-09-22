import type { LocalesValues } from '@intlayer/config/client';
import { DictionaryKeys, getIntlayer as getIntlayerCore, type Plugins } from '@intlayer/core';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { DeepTransformContent } from './plugins';
// import {
//   type DeepTransformContent,
//   intlayerNodePlugins,
//   markdownPlugin,
//   reactNodePlugins,
// } from './plugins';

/**
 * Get dictionary content by key for Svelte applications
 * @param key The dictionary key to retrieve
 * @param locale The target locale (optional)
 * @param additionalPlugins Additional transformation plugins
 * @returns Transformed dictionary content optimized for Svelte
 */
export const getIntlayer = <T extends DictionaryKeys, L extends LocalesValues>(
	key: T,
	locale?: L,
	additionalPlugins?: Plugins[]
) => {
	const plugins: Plugins[] = [
		// intlayerNodePlugins,
		// reactNodePlugins,
		// markdownPlugin,
		...(additionalPlugins ?? [])
	];

	return getIntlayerCore(key, locale, plugins) as any as DeepTransformContent<
		IntlayerDictionaryTypesConnector[T]['content']
	>;
	return getIntlayerCore(key, locale, plugins) as any;
	//as DeepTransformContent<
	//     IntlayerDictionaryTypesConnector[T]['content']
	//   >;
};
