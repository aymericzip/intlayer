<script lang="ts">
import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type { Locale } from '@intlayer/types/allLocales';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { useLocale } from '../client/useLocale';

export const locale: Locale | undefined = undefined;
export let value: string;
export let metadataKeyPath: KeyPath[];

const { locale: contextLocale } = useLocale();

$: metadata = getMarkdownMetadata(value);
$: currentLocale = locale ?? $contextLocale;
$: metadataEl = getContentNodeByKeyPath(
  metadata as ContentNode,
  metadataKeyPath,
  currentLocale as Locale
);
</script>

{metadataEl}
