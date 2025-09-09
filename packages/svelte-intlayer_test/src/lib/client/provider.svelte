<script lang="ts">
  import type { Snippet } from 'svelte';
  //@ts-ignore
  import type { LocalesValues } from '@intlayer/config/client';
  import configuration from '@intlayer/config/built';
  import { setIntLayer } from './context.svelte.js';

  type Props = {
    children: Snippet;
    locale?: LocalesValues;
    defaultLocale?: LocalesValues;
  };
  const {
    default: { internationalization },
  } = configuration ?? {};
  let {
    children,
    locale,
    defaultLocale = internationalization.defaultLocale,
  }: Props = $props();

  const intlayer = setIntLayer({ locale, defaultLocale });
</script>

{@render children()}
