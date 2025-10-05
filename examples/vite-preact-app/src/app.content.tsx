import { type Dictionary, md, t } from 'intlayer';
import type { ComponentChildren } from 'preact';

const appContent = {
  key: 'app',
  content: {
    viteLogo: t({
      en: 'Vite logo',
      fr: 'Logo Vite',
      es: 'Logo Vite',
    }),
    preactLogo: t({
      en: 'Preact logo',
      fr: 'Logo Preact',
      es: 'Logo Preact',
    }),

    title: 'Vite + Preact',

    count: t({
      en: 'count is ',
      fr: 'le compte est ',
      es: 'el recuento es ',
    }),

    edit: t<ComponentChildren>({
      en: md('Edit `src/app.tsx` and save to test HMR'),
      fr: md('Éditez `src/app.tsx` et enregistrez pour tester HMR'),
      es: md('Edita `src/app.tsx` y guarda para probar HMR'),
    }),

    readTheDocs: t({
      en: 'Click on the Vite and Preact logos to learn more',
      fr: 'Cliquez sur les logos Vite et Preact pour en savoir plus',
      es: 'Haga clic en los logotipos de Vite y Preact para obtener más información',
    }),
  },
} satisfies Dictionary;

export default appContent;
