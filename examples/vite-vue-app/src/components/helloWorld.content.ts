import { t, type Dictionary } from 'intlayer';

const helloWorldContent = {
  key: 'app',
  content: {
    countIs: t({
      en: 'count is ',
      fr: 'le compte est ',
      es: 'el recuento es ',
    }),
    edit: [
      t({
        en: 'Edit ',
        fr: 'Éditez ',
        es: 'Edita ',
      }),
      t({
        en: 'components/HelloWorld.vue',
        fr: 'components/HelloWorld.vue',
        es: 'components/HelloWorld.vue',
      }),
      t({
        en: ' to test HMR',
        fr: ' pour tester HMR',
        es: ' para probar HMR',
      }),
    ],
    checkOutStarter: [
      t({
        en: 'Check out ',
        fr: 'Vérifiez ',
        es: 'Compruebe ',
      }),
      t({
        en: 'create-vue',
        fr: 'create-vue',
        es: 'create-vue',
      }),
      t({
        en: ', the official Vue + Vite starter',
        fr: ', le starter officiel Vue + Vite',
        es: ', el starter oficial Vue + Vite',
      }),
    ],
    learnMore: [
      t({
        en: 'Learn more about IDE Support for Vue in the ',
        fr: 'En savoir plus sur le support IDE pour Vue dans le ',
        es: 'Aprenda más sobre el soporte IDE para Vue en el ',
      }),
      t({
        en: 'Vue Docs Scaling up Guide',
        fr: 'Vue Docs Scaling up Guide',
        es: 'Vue Docs Scaling up Guide',
      }),
      t({
        en: ',',
        fr: ',',
        es: ',',
      }),
    ],
    clickOnLogos: [
      t({
        en: 'Click on the Vite and Vue logos to learn more',
        fr: 'Cliquez sur les logos Vite et Vue pour en savoir plus',
        es: 'Haga clic en los logotipos de Vite y Vue para obtener más información',
      }),
    ],
  },
} satisfies Dictionary;

export default helloWorldContent;
