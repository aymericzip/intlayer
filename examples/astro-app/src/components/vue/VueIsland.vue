<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useIntlayer, useLocale, installIntlayer } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

const props = defineProps<{ locale: LocalesValues }>();

const app = getCurrentInstance()?.appContext.app;

if (app) {
  installIntlayer(app, { locale: props.locale });
}

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

const count = ref(0);
const content = useIntlayer("vue-demo");
</script>

<template>
  <div class="demo-container">
    <h2 class="greeting">
      {{ content.greeting }}
    </h2>
    <p class="description">
      {{ content.description }}
    </p>
    <div class="counter-section">
      <p class="counter-text">{{ content.counter({ count }) }}</p>
      <button class="btn-primary" @click="count++">
        {{ content.increment }}
      </button>
    </div>
    <div class="locale-switcher">
      <span class="switcher-label">{{ content.switchLocale }}:</span>
      <div class="locale-buttons">
        <button
          v-for="localeItem in availableLocales"
          :key="localeItem"
          :class="['locale-btn', { active: localeItem === currentLocale }]"
          @click="setLocale(localeItem)"
        >
          <div class="ls-item-left">
            <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
            <span class="ls-current-name">{{
              getLocaleName(localeItem, currentLocale)
            }}</span>
          </div>
          <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
