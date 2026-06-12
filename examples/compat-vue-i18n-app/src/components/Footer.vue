<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const route = useRoute();
const currentLocale = computed(() => (route.params.locale as string) || "en");

const footerLinks = computed(() => [
  {
    label: t("footer.github"),
    href: "https://github.com/intlayer-org/benchmark-i18n",
    isInternal: false,
  },
  { label: t("footer.methodology"), to: `/${currentLocale.value}/about`, isInternal: true },
  {
    label: t("footer.contributing"),
    to: `/${currentLocale.value}/contact`,
    isInternal: true,
  },
]);
</script>

<template>
  <footer class="mt-20 border-t border-border bg-card">
    <div class="container py-8">
      <div class="grid gap-8 md:grid-cols-3">
        <div>
          <h3 class="mb-2 text-sm font-semibold text-foreground">
            {{ t("footer.title") }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t("footer.description") }}
          </p>
        </div>
        <div>
          <h3 class="mb-2 text-sm font-semibold text-foreground">
            {{ t("footer.resources") }}
          </h3>
          <ul class="space-y-1">
            <li v-for="linkEl in footerLinks" :key="linkEl.label">
              <router-link
                v-if="linkEl.isInternal"
                :to="linkEl.to!"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ linkEl.label }}
              </router-link>
              <a
                v-else
                :href="linkEl.href"
                target="_blank"
                rel="noreferrer"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ linkEl.label }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="mb-2 text-sm font-semibold text-foreground">
            {{ t("footer.contact") }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t("shared.contactEmail") }}
          </p>
        </div>
      </div>
      <div class="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
        {{ t("footer.builtWith") }}
      </div>
    </div>
  </footer>
</template>
