<script lang="ts">
import { getContentNodeByKeyPath, getMarkdownMetadata } from '@intlayer/core';
import type { ContentNode, KeyPath, Locale } from '@intlayer/types';
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
  currentLocale
);
</script>

{metadataEl}
