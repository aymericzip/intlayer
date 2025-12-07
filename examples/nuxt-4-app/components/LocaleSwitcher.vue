<script setup lang="ts">
  import { getLocaleName, getLocalizedUrl } from "intlayer";
  import { useLocale } from "vue-intlayer";
  
  // Nuxt auto-imports useRoute, but explicit import is fine if you prefer strictness
  const route = useRoute();
  const { locale, availableLocales, setLocale } = useLocale();
  </script>
  
  <template>
    <nav class="locale-switcher">
      <NuxtLink
        v-for="localeEl in availableLocales"
        :key="localeEl"
        :to="getLocalizedUrl(route.fullPath, localeEl)"
        class="locale-link"
        :class="{ 'active-locale': localeEl === locale }"
        @click="setLocale(localeEl)"
      >
        {{ getLocaleName(localeEl) }}
      </NuxtLink>
    </nav>
  </template>
  
  <style scoped>
  .locale-switcher {
    display: flex;
    gap: 1rem;
  }
  
  .locale-link {
    /* Optional: Reset default link styles if needed */
    text-decoration: none; 
    color: inherit;
  }
  
  .active-locale {
    font-weight: bold;
    text-decoration: underline;
  }
  </style>