<script lang="ts">
  import type { LocalesValues } from '@intlayer/config/client';
  import type { Snippet } from 'svelte';
  import configuration from '@intlayer/config/built';
  import { setIntLayer } from './context.svelte.js';

  type Props = {
    children: Snippet;
    locale?: LocalesValues;
    // defaultLocale?: LocalesValues;
  };

  let { children, locale }: Props = $props();

  const ctx = setIntLayer({ locale });

  const {
    internationalization: { defaultLocale, locales },
  } = configuration.default;
  /**
   * - get default config
   * -
   */
</script>

{@render children()}
