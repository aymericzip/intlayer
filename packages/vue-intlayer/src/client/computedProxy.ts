import { ComputedRef, computed, unref } from 'vue';

export const computedProxy = <T extends object>(src: ComputedRef<T>): T =>
  new Proxy({} as unknown as T, {
    get(_, key: string) {
      const inner = computed(() => src.value[key as keyof T]);

      // If the *current* value looks like a component (object w/ render),
      // expose it directly; otherwise expose the ComputedRef itself.
      return new Proxy(
        {},
        {
          get(_, prop) {
            const v = unref(inner);
            return prop === 'value' ? v : (v as any)[prop];
          },
          apply(_, thisArg, args) {
            return (unref(inner) as any).apply(thisArg, args);
          },
          getPrototypeOf() {
            return Object.getPrototypeOf(unref(inner));
          },
        }
      );
    },
  });
