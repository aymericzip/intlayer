<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { usePerformanceMeasure } from '../hooks/usePerformanceMeasure.ts';
import LocaleSwitcher from './LocaleSwitcher.vue';
import ThemeToggle from './ThemeToggle.vue';

usePerformanceMeasure('Header');

const { t } = useI18n();
const isMockPagesOpen = ref(false);
const route = useRoute();
const currentLocale = computed(() => (route.params.locale as string) || 'en');

const mockPages = computed(() => [
  { to: `/${currentLocale.value}/products`, label: t('header.products') },
  { to: `/${currentLocale.value}/pricing`, label: t('header.pricing') },
  { to: `/${currentLocale.value}/team`, label: t('header.team') },
  { to: `/${currentLocale.value}/blog`, label: t('header.blog') },
  { to: `/${currentLocale.value}/careers`, label: t('header.careers') },
  { to: `/${currentLocale.value}/faq`, label: t('header.faq') },
  { to: `/${currentLocale.value}/contact`, label: t('header.contact') },
  { to: `/${currentLocale.value}/settings`, label: t('header.settings') },
]);
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
    <nav class="container flex h-16 items-center justify-between">
      <div class="flex items-center gap-8">
        <router-link
          :to="`/${currentLocale}`"
          class="text-lg font-bold tracking-tight text-primary no-underline"
        >
          {{ t("shared.appName") }}
        </router-link>

        <div class="hidden items-center gap-6 text-sm font-medium md:flex">
          <router-link
            :to="`/${currentLocale}`"
            custom
            v-slot="{ href, navigate, isExactActive }"
          >
            <a
              :href="href"
              class="nav-link"
              :class="{ 'router-link-active': isExactActive }"
              @click="navigate"
            >
              {{ t("header.home") }}
            </a>
          </router-link>
          <router-link
            :to="`/${currentLocale}/about`"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <a
              :href="href"
              class="nav-link"
              :class="{ 'router-link-active': isActive }"
              @click="navigate"
            >
              {{ t("header.methodology") }}
            </a>
          </router-link>

          <div class="relative">
            <button
              type="button"
              class="flex items-center gap-1 nav-link bg-transparent border-none cursor-pointer"
              @mouseenter="isMockPagesOpen = true"
              @mouseleave="isMockPagesOpen = false"
              @click="isMockPagesOpen = !isMockPagesOpen"
            >
              {{ t("header.mockPages") }}
              <ChevronDown
                :size="14"
                :class="['transition-transform', isMockPagesOpen ? 'rotate-180' : '']"
              />
            </button>

            <div
              v-if="isMockPagesOpen"
              class="absolute left-0 top-full pt-2 w-48"
              @mouseenter="isMockPagesOpen = true"
              @mouseleave="isMockPagesOpen = false"
            >
              <div class="bg-card border border-border rounded-md shadow-lg overflow-hidden py-1">
                <router-link
                  v-for="page in mockPages"
                  :key="page.to"
                  :to="page.to"
                  class="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                  @click="isMockPagesOpen = false"
                >
                  {{ page.label }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <a
          href="https://github.com/intlayer-org/benchmark-i18n"
          target="_blank"
          rel="noreferrer"
          class="text-muted-foreground transition hover:text-foreground"
        >
          <span class="sr-only">{{ t("shared.goToGithub") }}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true" width="20" height="20">
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </a>
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  </header>
</template>
