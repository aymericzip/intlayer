# Começando a declaração do seu conteúdo

## Extensões de arquivos

Por padrão, o Intlayer observa todos os arquivos com as seguintes extensões para declarações de conteúdo:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

O aplicativo buscará arquivos que correspondam ao padrão global `./src/**/*.content.{ts,tsx,js,mjs,cjs}` por padrão.

Essas extensões padrão são adequadas para a maioria dos aplicativos. No entanto, se você tiver requisitos específicos, consulte o guia de personalização de extensões de conteúdo para obter instruções sobre como gerenciá-las.

Para uma lista completa de opções de configuração, visite a documentação de configuração.

## Declare Seu Conteúdo

Crie e gerencie seus dicionários de conteúdo:

### Usando typescript

```typescript
// src/app/[locale]/page.content.ts
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
} satisfies DeclarationContent<Content>;
```

### Usando módulos ECMAScript

```javascript
// src/app/[locale]/page.content.mjs

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

### Usando módulos CommonJS

```javascript
// src/app/[locale]/page.content.cjs

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

### Usando JSON

```json5
// src/app/[locale]/page.content.json

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

Atenção, a declaração de conteúdo JSON impossibilita a implementação [fetching de função](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/function_fetching.md)
