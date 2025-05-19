import { ComputedRef, computed, unref } from 'vue';

export const computedProxy = <T extends object>(src: ComputedRef<T>): T =>
  new Proxy({} as unknown as T, {
    get(_, key: string | symbol) {
      // Lazily make a computed() for the requested key
      const inner = computed(() => (src.value as any)[key as keyof T]);
      const current = unref(inner);

      // If the value looks like a component (has a render fn), expose it raw
      if (current && typeof current === 'object' && 'render' in current) {
        return current as any;
      }

      // Otherwise return a ref-like *callable* proxy
      return new Proxy(() => current, {
        // Mark as a Ref so Vue’s isRef()/unref() recognise it
        get(_, prop) {
          if (prop === 'value') return unref(inner); // normal .value
          if (prop === '__v_isRef') return true; // <-- the fix
          return (unref(inner) as any)[prop];
        },
        set(_, prop, value) {
          // Allow mutating the underlying value if it’s mutable
          (inner.value as any)[prop] = value;
          return true;
        },
        apply(_, thisArg, args) {
          // Make function-typed entries callable
          return (unref(inner) as any).apply(thisArg, args);
        },
        getPrototypeOf() {
          return Object.getPrototypeOf(unref(inner));
        },
      });
    },
  });
