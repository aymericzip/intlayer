import { getPathWithoutLocale } from '@intlayer/core/localization';
import { type ComputedRef, computed, onMounted, onUnmounted, ref } from 'vue';

/**
 * Vue composable that returns the current pathname with the locale segment removed.
 *
 * Reacts to browser back/forward navigation via the `popstate` event.
 * Falls back to an empty string during server-side rendering.
 *
 * @returns A computed ref containing the current pathname without the locale prefix.
 *
 * @example
 * ```vue
 * <script setup>
 * import { usePathname } from 'vue-intlayer';
 *
 * const pathname = usePathname();
 * </script>
 *
 * <template>
 *   <a :class="{ active: pathname === '/dashboard' }" href="/dashboard">
 *     Dashboard
 *   </a>
 * </template>
 * ```
 */
export const usePathname = (): ComputedRef<string> => {
  const rawPathname = ref<string>(
    typeof window !== 'undefined' ? window.location.pathname : ''
  );

  const handleLocationChange = (): void => {
    rawPathname.value = window.location.pathname;
  };

  onMounted(() => {
    window.addEventListener('popstate', handleLocationChange);
  });

  onUnmounted(() => {
    window.removeEventListener('popstate', handleLocationChange);
  });

  return computed(() => getPathWithoutLocale(rawPathname.value));
};
