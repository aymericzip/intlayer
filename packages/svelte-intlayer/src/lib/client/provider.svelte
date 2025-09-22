<script lang="ts">
  import type { LocalesValues } from '@intlayer/config/client';
  import type { Snippet } from 'svelte';
  import { setIntLayer } from './context.svelte.js';
  type Props = {
    children: Snippet;
    locale?: LocalesValues;
    // defaultLocale?: LocalesValues;
  };
  let { children, locale }: Props = $props();
  setIntLayer({ locale });
  /**
   * - get default config
   * -
   */
</script>

{@render children()}