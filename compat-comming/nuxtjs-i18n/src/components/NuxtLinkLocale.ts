import { defineComponent, h, resolveComponent } from 'vue';
import { useLocalePath } from '../routing';

export const NuxtLinkLocale = defineComponent({
  name: 'NuxtLinkLocale',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    href: {
      type: [String, Object],
      default: undefined,
    },
    locale: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    const localePath = useLocalePath();

    return () => {
      const target = props.to ?? props.href;
      const localized = localePath(target as any, props.locale);

      let component: any = 'a';
      try {
        const resolved = resolveComponent('NuxtLink');
        if (typeof resolved !== 'string') {
          component = resolved;
        }
      } catch {}

      return h(
        component,
        {
          ...attrs,
          to: localized,
          href: localized,
        },
        slots.default?.()
      );
    };
  },
});

export default NuxtLinkLocale;
