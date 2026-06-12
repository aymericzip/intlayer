<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const SettingsHeader = defineAsyncComponent(
  () => import('../components/pages/settings/SettingsHeader.vue')
);
const ProfileSection = defineAsyncComponent(
  () => import('../components/pages/settings/ProfileSection.vue')
);
const PreferencesSection = defineAsyncComponent(
  () => import('../components/pages/settings/PreferencesSection.vue')
);
const ApiAccessSection = defineAsyncComponent(
  () => import('../components/pages/settings/ApiAccessSection.vue')
);
const SettingsFooter = defineAsyncComponent(
  () => import('../components/pages/settings/SettingsFooter.vue')
);
</script>

<template>
  <div class="container py-16">
    <Suspense>
      <SettingsHeader />
      <template #fallback>
        <div class="h-24 animate-pulse bg-muted/20" />
      </template>
    </Suspense>

    <div class="mx-auto max-w-2xl space-y-8">
      <form class="space-y-8" @submit.prevent>
        <Suspense>
          <ProfileSection />
          <template #fallback>
            <div class="h-48 animate-pulse bg-muted/20" />
          </template>
        </Suspense>

        <Suspense>
          <PreferencesSection />
          <template #fallback>
            <div class="h-64 animate-pulse bg-muted/20" />
          </template>
        </Suspense>

        <Suspense>
          <ApiAccessSection />
          <template #fallback>
            <div class="h-40 animate-pulse bg-muted/20" />
          </template>
        </Suspense>

        <Suspense>
          <SettingsFooter />
          <template #fallback>
            <div class="h-10 animate-pulse bg-muted/20" />
          </template>
        </Suspense>
      </form>
    </div>
  </div>
</template>
