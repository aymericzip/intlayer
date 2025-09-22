import type { LocalesValues } from '@intlayer/config/client';
import type { DeepTransformContent } from '@intlayer/core';
// @ts-ignore
import { getDictionary } from '$lib/utils/getDictionary.js';
import type { Dictionary } from '@intlayer/core';
import { getProviderCtx } from './context.svelte.js';

export function useDictionary<T extends Dictionary>(
	dictionary: T,
	locale?: LocalesValues
): DeepTransformContent<T['content']> {
	const state = getProviderCtx();
	let currentLocale = locale ?? state.getLocale();
	return getDictionary<T, LocalesValues>(dictionary, currentLocale);
}
