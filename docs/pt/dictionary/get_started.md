# Começando a declaração do seu conteúdo

## Extensões de arquivos

Por padrão, o Intlayer monitora todos os arquivos com as seguintes extensões para declarações de conteúdo:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

O aplicativo buscará arquivos que correspondam ao padrão glob `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` por padrão.

Essas extensões padrão são adequadas para a maioria dos aplicativos. No entanto, se você tiver requisitos específicos, consulte o [guia de personalização de extensões de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md#content-configuration) para instruções sobre como gerenciá-los.

Para uma lista completa de opções de configuração, visite a documentação de configuração.

## Declare Seu Conteúdo

Crie e gerencie seus dicionários de conteúdo:

```typescript fileName="src/app/[locale]/page.content.ts" codeFormat="typescript"
import { t, enu, type DeclarationContent } from "intlayer";

interface Content {
  getStarted: {
    main: string;
    pageLink: string;
  };
  numberOfCar: string;
}

export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Menos que menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
  },
} satisfies Dictionary<Content>;
```

```javascript fileName="src/app/[locale]/page.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Menos que menos um carro",
      "-1": "Menos um carro",
      0: "Nenhum carro",
      1: "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
  },
};
```

```javascript fileName="src/app/[locale]/page.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
module.exports = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Menos que menos um carro",
      "-1": "Menos um carro",
      0: "Nenhum carro",
      1: "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
  },
};
```

```json5 fileName="src/app/[locale]/page.content.json"  codeFormat="json"
{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Menos que menos um carro",
        "-1": "Menos um carro",
        "0": "Nenhum carro",
        "1": "Um carro",
        ">5": "Alguns carros",
        ">19": "Muitos carros",
      },
    },
  },
}
```
