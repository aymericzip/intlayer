<script setup lang="ts">
import { getLocalizedUrl } from 'intlayer';
import { computed } from 'vue';
import { useLocale } from 'vue-intlayer';

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Check if the link is external
const isExternalLink = computed(() => /^https?:\/\//.test(props.href ?? ''));

// Create a localized href for internal links
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>

<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>
