# Começando a declaração do seu conteúdo

## Configure o Intlayer para seu projeto

[Veja como usar o intlayer com NextJS](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)

[Veja como usar o intlayer com ReactJS](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)

[Veja como usar o intlayer com Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md)

## Instalar Pacote

Instale os pacotes necessários usando npm:

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

## Gerenciar Seu Conteúdo

Crie e gerencie seus dicionários de conteúdo:

### Usando typescript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent = {
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
    nestedContent: {
      id: "enumeration",
      numberOfCar: enu({
        "<-1": "Menos de um carro",
        "-1": "Menos um carro",
        "0": "Nenhum carro",
        "1": "Um carro",
        ">5": "Alguns carros",
        ">19": "Vários carros",
      }),
    },
  },
} satisfies DeclarationContent;

// O conteúdo deve ser exportado como padrão
export default pageContent;
```

### Usando módulos ECMAScript

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Menos de um carro",
      "-1": "Menos um carro",
      0: "Nenhum carro",
      1: "Um carro",
      ">5": "Alguns carros",
      ">19": "Vários carros",
    }),
  },
};

// O conteúdo deve ser exportado como padrão
export default pageContent;
```

### Usando módulos CommonJS

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Menos de um carro",
      "-1": "Menos um carro",
      0: "Nenhum carro",
      1: "Um carro",
      ">5": "Alguns carros",
      ">19": "Vários carros",
    }),
  },
};

// O conteúdo deve ser exportado como padrão
module.exports = pageContent;
```

### Usando JSON

```json5
// src/app/[locale]/page.content.json

{
  id: "page",
  getStarted: {
    main: {
      nodeType: "translation",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    },
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    nodeType: "enumeration",
    numberOfCar: {
      "<-1": "Menos de um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Vários carros",
    },
  },
}
```

Atenção, a declaração de conteúdo JSON impossibilita a implementação da [busca de função](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/function_fetching.md)
