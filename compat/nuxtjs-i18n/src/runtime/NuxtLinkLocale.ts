import {
  type Component,
  defineComponent,
  h,
  type PropType,
  resolveComponent,
} from 'vue';
import type { RouteLocationGeneric } from '../types';
import { useLocalePath } from './routing';

/**
 * `<NuxtLinkLocale to="/about" locale="fr">` — a `<NuxtLink>` whose target
 * is localized for the active (or given) locale.
 */
export const NuxtLinkLocale = defineComponent({
  name: 'NuxtLinkLocale',
  inheritAttrs: false,
  props: {
    to: {
      type: [String, Object] as PropType<RouteLocationGeneric>,
      default: undefined,
    },
    href: {
      type: [String, Object] as PropType<RouteLocationGeneric>,
      default: undefined,
    },
    locale: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    const localePath = useLocalePath();
    const link = resolveComponent('NuxtLink');

    return () => {
      const target = props.to ?? props.href ?? '/';
      const isExternal =
        typeof target === 'string' && /^[a-z][a-z\d+\-.]*:/i.test(target);
      const localizedTarget = isExternal
        ? target
        : localePath(target, props.locale);

      if (typeof link === 'string') {
        return h(
          'a',
          { ...attrs, href: localizedTarget as string },
          slots.default?.()
        );
      }

      return h(
        link as Component,
        { ...attrs, to: localizedTarget },
        slots.default
      );
    };
  },
});
