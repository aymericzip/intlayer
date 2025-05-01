import { t, type Dictionary } from 'intlayer';

const helloWorldContent = {
  key: 'helloworld',
  content: {
    count: t({ en: 'count is ', fr: 'le compte est ', es: 'el recuento es ' }),
    edit: t({
      en: 'Edit <code>components/HelloWorld.vue</code> and save to test HMR',
      fr: 'Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR',
      es: 'Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR',
    }),
    checkOut: t({ en: 'Check out ', fr: 'Vérifiez ', es: 'Compruebe ' }),
    officialStarter: t({
      en: 'the official Vue + Vite starter',
      fr: 'le starter officiel Vue + Vite',
      es: 'el starter oficial Vue + Vite',
    }),
    learnMore: t({
      en: 'Learn more about IDE Support for Vue in the ',
      fr: 'En savoir plus sur le support IDE pour Vue dans le ',
      es: 'Aprenda más sobre el soporte IDE para Vue en el ',
    }),
    vueDocs: t({
      en: 'Vue Docs Scaling up Guide',
      fr: 'Vue Docs Scaling up Guide',
      es: 'Vue Docs Scaling up Guide',
    }),
    readTheDocs: t({
      en: 'Click on the Vite and Vue logos to learn more',
      fr: 'Cliquez sur les logos Vite et Vue pour en savoir plus',
      es: 'Haga clic en los logotipos de Vite y Vue para obtener más información',
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
