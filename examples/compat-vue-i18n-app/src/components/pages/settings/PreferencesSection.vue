<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="rounded-lg border border-border bg-card p-6">
    <h2 class="mb-4 text-lg font-semibold text-foreground">
      {{ t("settings.preferences.title") }}
    </h2>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-foreground">
            {{ t("settings.preferences.emailNotifications") }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ t("settings.preferences.weeklyReports") }}
          </p>
        </div>
        <button
          type="button"
          class="h-6 w-11 rounded-full bg-primary transition-colors"
          :aria-label="t('settings.preferences.toggleNotifications')"
        >
          <span
            class="block h-5 w-5 translate-x-5 rounded-full bg-primary-foreground transition-transform"
          />
        </button>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-foreground">
            {{ t("settings.preferences.darkMode") }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ t("settings.preferences.darkColorScheme") }}
          </p>
        </div>
        <button
          type="button"
          class="h-6 w-11 rounded-full bg-muted transition-colors"
          :aria-label="t('settings.preferences.toggleDarkMode')"
        >
          <span
            class="block h-5 w-5 translate-x-0.5 rounded-full bg-foreground/20 transition-transform"
          />
        </button>
      </div>
      <div>
        <label
          for="language"
          class="mb-1 block text-sm font-medium text-foreground"
        >
          {{ t("settings.preferences.defaultLanguage") }}
        </label>
        <select
          id="language"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option>{{ t("settings.preferences.english") }}</option>
          <option>{{ t("settings.preferences.french") }}</option>
          <option>{{ t("settings.preferences.german") }}</option>
          <option>{{ t("settings.preferences.spanish") }}</option>
          <option>{{ t("settings.preferences.japanese") }}</option>
          <option>{{ t("settings.preferences.chinese") }}</option>
          <option>{{ t("settings.preferences.arabic") }}</option>
        </select>
      </div>
    </div>
  </section>
</template>
