import { type Dictionary, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    viteLogoAlt: t({
      en: 'Vite Logo',
      fr: 'Logo Vite',
      es: 'Logo de Vite',
    }),
    svelteLogoAlt: t({
      en: 'Svelte Logo',
      fr: 'Logo Svelte',
      es: 'Logo de Svelte',
    }),
    title: t({
      en: 'Vite + Svelte',
      fr: 'Vite + Svelte',
      es: 'Vite + Svelte',
    }),
    checkOut: [
      t({
        en: 'Check out ',
        fr: 'Découvrez ',
        es: 'Compruebe ',
      }),
      'SvelteKit',
      t({
        en: 'the official Svelte app framework powered by Vite!',
        fr: "le framework officiel d'applications Svelte propulsé par Vite !",
        es: 'el marco oficial de aplicaciones Svelte impulsado por Vite!',
      }),
    ],
    readTheDocs: t({
      en: 'Click on the Vite and Svelte logos to learn more',
      fr: 'Cliquez sur les logos Vite et Svelte pour en savoir plus',
      es: 'Haga clic en los logotipos de Vite y Svelte para obtener más información',
    }),
  },
} satisfies Dictionary;

export default appContent;
