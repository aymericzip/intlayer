<script setup lang="ts">
  import { getLocalizedUrl } from 'intlayer';
  import { useLocale } from 'vue-intlayer';
  
  interface Props {
    href: string;
    locale?: string;
  }
  
  const props = defineProps<Props>();
  
  const { locale: currentLocale } = useLocale();
  
  // Compute the final path
  const finalPath = computed(() => {
    // 1. Check if the link is external
    const isExternal = /^https?:\/\//.test(props.href || '');
    
    // 2. If external, return as is (NuxtLink handles the <a> tag generation)
    if (isExternal) return props.href;
  
    // 3. If internal, localize the URL
    const targetLocale = props.locale || currentLocale.value;
    return getLocalizedUrl(props.href, targetLocale);
  });
  </script>
  
  <template>
    <NuxtLink
      :to="finalPath"
      v-bind="$attrs"
    >
      <slot />
    </NuxtLink>
  </template>