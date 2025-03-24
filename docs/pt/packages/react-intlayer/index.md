# react-intlayer: Pacote NPM para internacionalizar (i18n) uma aplicação React

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

**O pacote `react-intlayer`** permite que você internacionalize sua aplicação React. Ele fornece provedores de contexto e hooks para internacionalização no React.

## Por que internacionalizar sua aplicação React?

Internacionalizar sua aplicação React é essencial para atender efetivamente um público global. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

## Por que integrar o Intlayer?

- **Gerenciamento de Conteúdo com JavaScript**: Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de forma eficiente.
- **Ambiente com Tipagem Segura**: Utilize TypeScript para garantir que todas as definições de conteúdo sejam precisas e livres de erros.
- **Arquivos de Conteúdo Integrados**: Mantenha suas traduções próximas aos seus respectivos componentes, melhorando a manutenção e clareza.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## Exemplo de uso

Com o Intlayer, você pode declarar seu conteúdo de forma estruturada em qualquer lugar do seu código.

Por padrão, o Intlayer procura por arquivos com a extensão `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Você pode modificar a extensão padrão configurando a propriedade `contentDir` no [arquivo de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### Declare seu conteúdo

O `react-intlayer` foi feito para funcionar com o pacote [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/index.md). O `intlayer` é um pacote que permite declarar seu conteúdo em qualquer lugar do seu código. Ele converte declarações de conteúdo multilíngue em dicionários estruturados que se integram perfeitamente à sua aplicação.

Aqui está um exemplo de declaração de conteúdo:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      pt: "Olá Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos de menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      pt: "Olá Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos de menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      pt: "Olá Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos de menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
  },
};

module.exports = component1Content;
```

```json filePath="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "pt": "Olá Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Menos de menos um carro",
        "-1": "Menos um carro",
        "0": "Nenhum carro",
        "1": "Um carro",
        ">5": "Alguns carros",
        ">19": "Muitos carros"
      }
    }
  }
}
```

### Utilize o conteúdo no seu código

Depois de declarar seu conteúdo, você pode usá-lo no seu código. Aqui está um exemplo de como usar o conteúdo em um componente React:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Dominando a internacionalização da sua aplicação React

O Intlayer oferece muitos recursos para ajudá-lo a internacionalizar sua aplicação React.

**Para saber mais sobre esses recursos, consulte o guia [Internacionalização (i18n) no React com Intlayer e Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md) para aplicações Vite e React, ou o guia [Internacionalização (i18n) no React com Intlayer e React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md) para aplicações criadas com Create React App.**

## Funções fornecidas pelo pacote `react-intlayer`

O pacote `react-intlayer` também fornece algumas funções para ajudá-lo a internacionalizar sua aplicação.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useIntlayerAsync.md)
