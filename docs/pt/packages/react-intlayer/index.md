# react-intlayer: Pacote NPM para internacionalizar (i18n) uma aplicação React

**Intlayer** é uma suíte de pacotes projetada especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

**O pacote `react-intlayer`** permite que você internacionalize sua aplicação React. Ele fornece provedores de contexto e hooks para a internacionalização do React.

## Por que Internacionalizar Sua Aplicação React?

A internacionalização da sua aplicação React é essencial para atender eficazmente a um público global. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

## Por que integrar o Intlayer?

- **Gerenciamento de Conteúdo Baseado em JavaScript**: Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de forma eficiente.
- **Ambiente Seguro para Tipos**: Aproveite o TypeScript para garantir que todas as suas definições de conteúdo sejam precisas e livres de erros.
- **Arquivos de Conteúdo Integrados**: Mantenha suas traduções próximas de seus respectivos componentes, melhorando a manutenibilidade e a clareza.

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

Por padrão, o Intlayer procura arquivos com a extensão `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Você pode modificar a extensão padrão definindo a propriedade `contentDir` no [arquivo de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

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

`react-intlayer` é feito para funcionar com o [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/index.md). `intlayer` é um pacote que permite declarar seu conteúdo em qualquer lugar do seu código. Ele converte declarações de conteúdo multilíngue em dicionários estruturados que se integram perfeitamente à sua aplicação.

Aqui está um exemplo de declaração de conteúdo:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos que menos um carro", // Comentário em Português
      "-1": "Menos um carro", // Comentário em Português
      "0": "Nenhum carro", // Comentário em Português
      "1": "Um carro", // Comentário em Português
      ">5": "Alguns carros", // Comentário em Português
      ">19": "Muitos carros", // Comentário em Português
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos que menos um carro", // Comentário em Português
      "-1": "Menos um carro", // Comentário em Português
      "0": "Nenhum carro", // Comentário em Português
      "1": "Um carro", // Comentário em Português
      ">5": "Alguns carros", // Comentário em Português
      ">19": "Muitos carros", // Comentário em Português
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos que menos um carro", // Comentário em Português
      "-1": "Menos um carro", // Comentário em Português
      "0": "Nenhum carro", // Comentário em Português
      "1": "Um carro", // Comentário em Português
      ">5": "Alguns carros", // Comentário em Português
      ">19": "Muitos carros", // Comentário em Português
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
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Menos que menos um carro", // Comentário em Português
        "-1": "Menos um carro", // Comentário em Português
        "0": "Nenhum carro", // Comentário em Português
        "1": "Um carro", // Comentário em Português
        ">5": "Alguns carros", // Comentário em Português
        ">19": "Muitos carros" // Comentário em Português
      }
    }
  }
}
```

### Utilize o Conteúdo em Seu Código

Depois de declarar seu conteúdo, você pode usá-lo em seu código. Aqui está um exemplo de como usar o conteúdo em um componente React:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Crie a declaração de conteúdo relacionada

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
  const { myTranslatedContent } = useIntlayer("component-1"); // Crie a declaração de conteúdo relacionada

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
  const { myTranslatedContent } = useIntlayer("component-1"); // Crie a declaração de conteúdo relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Dominando a internacionalização da sua aplicação React

O Intlayer fornece muitos recursos para ajudá-lo a internacionalizar sua aplicação React.

**Para saber mais sobre esses recursos, consulte o guia [Internacionalização do React (i18n) com Intlayer e Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md) para Vite e Aplicação React, ou o guia [Internacionalização do React (i18n) com Intlayer e React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md) para React Create App.**

## Funções fornecidas pelo pacote `react-intlayer`

O pacote `react-intlayer` também fornece algumas funções para ajudá-lo a internacionalizar sua aplicação.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useIntlayerAsync.md)
