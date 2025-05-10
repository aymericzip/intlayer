import { Locales, type Dictionary } from 'intlayer';

const helloWorldContent = {
  key: 'hello-world',
  locale: Locales.FRENCH,
  content: {
    count: { test: 'xhage' },
    edit: 'Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR',
    checkOut: 'Vérifiez ',
    officialStarter: 'le starter officiel Vue + Vite',
    learnMore: 'En savoir plus sur le support IDE pour Vue dans le ',
    vueDocs: 'Vue Docs Scaling up Guide',
    readTheDocs: 'Cliquez sur les logos Vite et Vue pour en savoir plus',
  },
} satisfies Dictionary;

export default helloWorldContent;
