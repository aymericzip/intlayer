import { md, t, type Dictionary } from 'intlayer';

const helloWorldContent = {
  key: 'hello-world',
  content: {
    mdTest: md('Hello **World**!'),
    count: t({ en: 'count is ', es: 'el recuento es ' }),
    edit: t({
      en: 'Edit <code>components/HelloWorld.vue</code> and save to test HMR',
      es: 'Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR',
    }),
    checkOut: t({ en: 'Check out ', fr: 'Vérifiez ', es: 'Compruebe ' }),
    officialStarter: t({
      en: 'the official Vue + Vite starter',
      es: 'el starter oficial Vue + Vite',
    }),
    learnMore: t({
      en: 'Learn more about IDE Support for Vue in the ',
      es: 'Aprenda más sobre el soporte IDE para Vue en el ',
    }),
    vueDocs: t({
      en: 'Vue Docs Scaling up Guide',
      es: 'Vue Docs Scaling up Guide',
    }),
    readTheDocs: t({
      en: 'Click on the Vite and Vue logos to learn more',
      es: 'Haga clic en los logotipos de Vite y Vue para obtener más información',
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
