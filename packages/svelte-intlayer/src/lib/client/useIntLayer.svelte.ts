import { getIntlayer } from '$lib/utils/getIntLayer.js';
import type { LocalesValues } from '@intlayer/config/client';
import type { DeepTransformContent, DictionaryKeys } from '@intlayer/core';
// @ts-ignore
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { getProviderCtx } from './context.svelte.js';

export function useIntLayer<T extends DictionaryKeys>(
	key: T,
	locale?: LocalesValues
): DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content']> {
	const state = getProviderCtx();
	let currentLocale = locale ?? state.getLocale();
	return getIntlayer(key, currentLocale);
}
