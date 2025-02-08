# next-intlayer: Pacote NPM para internacionalizar (i18n) uma aplicação Next.js

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, Next.js e Express.js.

**O pacote `next-intlayer`** permite que você internacionalize sua aplicação Next.js. Ele fornece provedores de contexto e hooks para a internacionalização do Next.js. Além disso, inclui o plugin do Next.js para integrar o Intlayer com [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), bem como middleware para detectar o idioma preferido do usuário, gerenciar cookies e lidar com redirecionamento de URLs.

## Por que internacionalizar sua aplicação Next.js?

Internacionalizar sua aplicação Next.js é essencial para atender a um público global de forma eficaz. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

## Por que integrar o Intlayer?

- **Gerenciamento de Conteúdo com JavaScript**: Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de forma eficiente.
- **Ambiente Seguro em Tipos**: Aproveite o TypeScript para garantir que todas as suas definições de conteúdo sejam precisas e sem erros.
- **Arquivos de Conteúdo Integrados**: Mantenha suas traduções próximas aos respectivos componentes, melhorando a manutenibilidade e a clareza.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## Exemplo de uso

Com o Intlayer, você pode declarar seu conteúdo de forma estruturada em qualquer lugar no seu código.

Por padrão, o Intlayer procura arquivos com a extensão `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Você pode modificar a extensão padrão configurando a propriedade `contentDir` no [arquivo de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.ts
        │   └── index.tsx
        └── ServerComponent
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.mjs
        │   └── index.mjx
        └── ServerComponent
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### Declare seu conteúdo

`next-intlayer` é feito para funcionar com o [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/index.md).`intlayer` é um pacote que permite que você declare seu conteúdo em qualquer lugar do seu código. Ele converte declarações de conteúdo multilíngues em dicionários estruturados que se integram perfeitamente à sua aplicação.

Aqui está um exemplo de declaração de conteúdo:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

/** @type {Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos de um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos de um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
  },
};

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos de um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
    }),
  },
};

module.exports = clientComponentContent;
```

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
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
        "<-1": "Menos de um carro",
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

### Utilize o Conteúdo em Seu Código

Depois de declarar seu conteúdo, você pode usá-lo em seu código. Aqui está um exemplo de como usar o conteúdo em um componente React:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Crie a declaração de conteúdo relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Crie a declaração de conteúdo relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Crie a declaração de conteúdo relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Dominando a internacionalização da sua aplicação Next.js

Intlayer fornece muitos recursos para ajudá-lo a internacionalizar sua aplicação Next.js. Aqui estão algumas das principais características:

- **Internacionalização de componentes do servidor**: Intlayer permite que você internacionalize seus componentes de servidor da mesma forma que seus componentes de cliente. Isso significa que você pode usar as mesmas declarações de conteúdo para os componentes de cliente e servidor.
- **Middleware para Detecção de Locale**: Intlayer fornece middleware para detectar o idioma preferido do usuário. Este middleware é usado para detectar o idioma preferido do usuário e redirecioná-lo para a URL apropriada, conforme especificado na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).
- **Internacionalização de metadados**: Intlayer fornece uma maneira de internacionalizar seus metadados, como o título da sua página, usando a função `generateMetadata` fornecida pelo Next.js. Você pode usar a função `getTranslation` para traduzir seus metadados.
- **Internacionalização de sitemap.xml e robots.txt**: Intlayer permite que você internacionalize seus arquivos sitemap.xml e robots.txt. Você pode usar a função `getMultilingualUrls` para gerar URLs multilíngues para seu sitemap.
- **Internacionalização de URLs**: Intlayer permite que você internacionalize suas URLs usando a função `getMultilingualUrls`. Esta função gera URLs multilíngues para seu sitemap.

**Para saber mais sobre esses recursos, consulte o guia [Internacionalização (i18n) do Next.js com Intlayer e Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).**

## Funções fornecidas pelo pacote `next-intlayer`

O pacote `next-intlayer` também fornece algumas funções para ajudá-lo a internacionalizar sua aplicação.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useIntlayerAsync.md)
