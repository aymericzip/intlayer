import { t, type Dictionary } from 'intlayer';
import type { useSeoMeta } from 'nuxt/app';

const rootMetaContent = {
  key: 'root-meta',
  content: {
    title: t({
      en: 'Home',
      fr: 'Accueil',
      es: 'Inicio',
    }),
    description: t({
      en: 'Home description',
      fr: "Description de l'accueil",
      es: 'Descripción de inicio',
    }),
  },
} satisfies Dictionary<Parameters<typeof useSeoMeta>[0]>;

export default rootMetaContent;
