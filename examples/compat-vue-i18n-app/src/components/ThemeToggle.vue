<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

type ThemeMode = 'light' | 'dark' | 'auto';

const mode = ref<ThemeMode>('auto');

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored as ThemeMode;
  }

  return 'auto';
}

function applyThemeMode(m: ThemeMode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = m === 'auto' ? (prefersDark ? 'dark' : 'light') : m;

  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(resolved);

  if (m === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', m);
  }

  document.documentElement.style.colorScheme = resolved;
}

onMounted(() => {
  const initialMode = getInitialMode();
  mode.value = initialMode;
  applyThemeMode(initialMode);
});

let mediaQueryListener: (() => void) | null = null;

watch(
  mode,
  (newMode) => {
    if (newMode === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQueryListener = () => applyThemeMode('auto');
      media.addEventListener('change', mediaQueryListener);
    } else if (mediaQueryListener) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', mediaQueryListener);
      mediaQueryListener = null;
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (mediaQueryListener) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', mediaQueryListener);
  }
});

function toggleMode() {
  const nextMode: ThemeMode =
    mode.value === 'light' ? 'dark' : mode.value === 'dark' ? 'auto' : 'light';
  mode.value = nextMode;
  applyThemeMode(nextMode);
  window.localStorage.setItem('theme', nextMode);
}

const getLabel = () =>
  mode.value === 'auto'
    ? t('themeToggle.labelAuto')
    : t('themeToggle.labelOther', { mode: mode.value });
</script>

<template>
  <button
    type="button"
    @click="toggleMode"
    :aria-label="getLabel()"
    :title="getLabel()"
    class="rounded-md border border-border bg-accent px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent/80"
  >
    {{ mode === 'auto' ? t('themeToggle.auto') : mode === 'dark' ? t('themeToggle.dark') : t('themeToggle.light') }}
  </button>
</template>
