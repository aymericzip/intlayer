---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação do Pacote | intlayer
description: Veja como usar o pacote intlayer
keywords:
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
---

# intlayer: Pacote NPM para Gerenciar Dicionário Multilíngue (i18n)

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, Next.js e Express.js.

**O pacote `intlayer`** permite que você declare seu conteúdo em qualquer lugar do seu código. Ele converte declarações de conteúdo multilíngue em dicionários estruturados que se integram perfeitamente à sua aplicação. Com TypeScript, **Intlayer** aprimora seu desenvolvimento fornecendo ferramentas mais robustas e eficientes.

## Por que integrar o Intlayer?

- **Gerenciamento de Conteúdo com JavaScript**: Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de forma eficiente.
- **Ambiente com Tipagem Segura**: Utilize o TypeScript para garantir que todas as definições de conteúdo sejam precisas e livres de erros.
- **Arquivos de Conteúdo Integrados**: Mantenha suas traduções próximas aos seus respectivos componentes, melhorando a manutenção e a clareza.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Configurar o Intlayer

O Intlayer fornece um arquivo de configuração para configurar seu projeto. Coloque este arquivo na raiz do seu projeto.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Exemplo de uso

Com o Intlayer, você pode declarar seu conteúdo de forma estruturada em qualquer lugar do seu código.

Por padrão, o Intlayer procura arquivos com a extensão `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Você pode modificar a extensão padrão configurando a propriedade `contentDir` no [arquivo de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
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
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### Declare seu conteúdo

Aqui está um exemplo de declaração de conteúdo:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
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
      "<-1": "Menos que menos um carro",
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

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
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
      "<-1": "Menos que menos um carro",
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

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
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
        "<-1": "Menos que menos um carro",
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

### Construa seus dicionários

Você pode construir seus dicionários usando o [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Este comando escaneia todos os arquivos `*.content.*`, compila-os e grava os resultados no diretório especificado no seu **`intlayer.config.ts`** (por padrão, `./.intlayer`).

Uma saída típica pode ser:

```bash
.
└── .intlayer
    ├── dictionary  # Contém o dicionário do seu conteúdo
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Contém o ponto de entrada do seu dicionário para ser usado na sua aplicação
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Contém as definições de tipos geradas automaticamente do seu dicionário
        ├── intlayer.d.ts  # Contém as definições de tipos geradas automaticamente do Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

### Construir recursos i18next

Intlayer pode ser configurado para construir dicionários para [i18next](https://www.i18next.com/). Para isso, você precisa adicionar a seguinte configuração ao seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Informa ao Intlayer para gerar arquivos de mensagens para o i18next
    dictionaryOutput: ["i18next"],

    // O diretório onde o Intlayer irá gravar seus arquivos JSON de mensagens
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Informa ao Intlayer para gerar arquivos de mensagens para o i18next
    dictionaryOutput: ["i18next"],

    // O diretório onde o Intlayer irá gravar seus arquivos JSON de mensagens
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Informa ao Intlayer para gerar arquivos de mensagens para o i18next
    dictionaryOutput: ["i18next"],

    // O diretório onde o Intlayer irá gravar seus arquivos JSON de mensagens
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

Saída:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Por exemplo, o arquivo **en/client-component.json** pode ser assim:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Alguns carros"
}
```

### Construir dicionários next-intl

O Intlayer pode ser configurado para construir dicionários para [i18next](https://www.i18next.com/) ou [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). Para isso, você precisa adicionar a seguinte configuração ao seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Indica ao Intlayer para gerar arquivos de mensagens para i18next
    dictionaryOutput: ["next-intl"],

    // O diretório onde o Intlayer irá gravar seus arquivos JSON de mensagens
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indica ao Intlayer para gerar arquivos de mensagens para i18next
    dictionaryOutput: ["next-intl"],

    // O diretório onde o Intlayer irá gravar seus arquivos JSON de mensagens
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indica ao Intlayer para gerar arquivos de mensagens para i18next
    dictionaryOutput: ["next-intl"],

    // O diretório onde o Intlayer irá gravar seus arquivos JSON de mensagens
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

Saída:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Por exemplo, o arquivo **en/client-component.json** pode ser assim:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Olá Mundo",
  "zero_numberOfCar": "Nenhum carro",
  "one_numberOfCar": "Um carro",
  "two_numberOfCar": "Dois carros",
  "other_numberOfCar": "Alguns carros"
}
```

## Ferramentas CLI

O Intlayer fornece uma ferramenta CLI para:

- auditar suas declarações de conteúdo e completar traduções faltantes
- construir dicionários a partir de suas declarações de conteúdo
- enviar e puxar dicionários remotos do seu CMS para o seu projeto de localidade

Consulte [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md) para mais informações.

## Usar o Intlayer na sua aplicação

Uma vez que seu conteúdo esteja declarado, você pode consumir seus dicionários Intlayer na sua aplicação.

O Intlayer está disponível como um pacote para sua aplicação.

### Aplicação React

Para usar o Intlayer na sua aplicação React, você pode usar [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/index.md).

### Aplicação Next.js

Para usar o Intlayer na sua aplicação Next.js, você pode usar [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/index.md).

### Aplicação Express

Para usar o Intlayer na sua aplicação Express, você pode usar [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/express-intlayer/index.md).

## Funções fornecidas pelo pacote `intlayer`

O pacote `intlayer` também fornece algumas funções para ajudar você a internacionalizar sua aplicação.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md)

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
