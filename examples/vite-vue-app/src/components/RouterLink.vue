<script setup lang="ts">
import { getLocalizedUrl } from 'intlayer';
import { computed } from 'vue';
import { useLocale } from 'vue-intlayer';

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// Create localized to-prop for router-link
const localizedTo = computed(() => {
  if (typeof props.to === 'string') {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // If 'to' is an object, localize the path property
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? '/', locale.value),
    };
  }
});
</script>

<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>
