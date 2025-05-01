<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot></slot>
  </a>
</template>

<script setup>
import { computed } from 'vue';
import { getLocalizedUrl } from 'intlayer';
import { useLocale } from 'vue-intlayer';

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Check if the link is external
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ''));

// Create a localized href for internal links
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
