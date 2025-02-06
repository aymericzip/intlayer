# intlayer: Pacote NPM para Gerenciar a Declaração de Conteúdo Multilíngue (i18n)

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, Next.js e Express.js.

**O pacote `intlayer`** permite que você declare seu conteúdo em qualquer lugar do seu código. Ele converte declarações de conteúdo multilíngue em dicionários estruturados que se integram perfeitamente ao seu aplicativo. Com o TypeScript, **Intlayer** aprimora seu desenvolvimento fornecendo ferramentas mais robustas e eficientes.

## Por que integrar o Intlayer?

- **Gerenciamento de Conteúdo com JavaScript**: Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de forma eficiente.
- **Ambiente Seguro em Tipo**: Aproveite o TypeScript para garantir que todas as suas definições de conteúdo sejam precisas e sem erros.
- **Arquivos de Conteúdo Integrados**: Mantenha suas traduções próximas a seus respectivos componentes, aprimorando a manutenibilidade e clareza.

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
    locales: [Locales.PORTUGUESE, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.PORTUGUESE,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.PORTUGUESE, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.PORTUGUESE,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.PORTUGUESE, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.PORTUGUESE,
  },
};

module.exports = config;
```

> Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Exemplo de uso

Com o Intlayer, você pode declarar seu conteúdo de forma estruturada em qualquer lugar da sua base de código.

Por padrão, o Intlayer procura por arquivos com a extensão `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Você pode modificar a extensão padrão definindo a propriedade `contentDir` no [arquivo de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

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

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      pt: "Olá Mundo",
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
      pt: "Olá Mundo",
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
      pt: "Olá Mundo",
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
        "pt": "Olá Mundo",
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

### Construa seus dicionários

Você pode construir seus dicionários usando o [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Este comando examina todos os arquivos `*.content.*`, compila-os e escreve os resultados no diretório especificado em sua **`intlayer.config.ts`** (por padrão, `./.intlayer`).

Uma saída típica pode parecer:

```bash
.
├── .intlayer
│   ├── dictionary  # Contém o dicionário do seu conteúdo
│   │   ├── client-component.json
│   │   └── server-component.json
│   ├── main  # Contém o ponto de entrada do seu dicionário a ser usado em seu aplicativo
│   │   ├── dictionary.cjs
│   │   └── dictionary.mjs
│   └── types  # Contém as definições de tipo geradas automaticamente do seu dicionário
│       ├── client-component.d.ts
│       └── server-component.d.ts
└── types
    └── intlayer.d.ts  # Contém as definições de tipo geradas automaticamente do Intlayer
```

### Construa recursos i18next

O Intlayer pode ser configurado para construir dicionários para [i18next](https://www.i18next.com/). Para isso, você precisa adicionar a seguinte configuração ao seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Informa ao Intlayer para gerar arquivos de mensagem para i18next
    dictionaryOutput: ["i18next"],

    // O diretório onde o Intlayer escreverá seus arquivos JSON de mensagem
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
    // Informa ao Intlayer para gerar arquivos de mensagem para i18next
    dictionaryOutput: ["i18next"],

    // O diretório onde o Intlayer escreverá seus arquivos JSON de mensagem
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
    // Informa ao Intlayer para gerar arquivos de mensagem para i18next
    dictionaryOutput: ["i18next"],

    // O diretório onde o Intlayer escreverá seus arquivos JSON de mensagem
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

Saída:

```bash
.
└── i18next
    └── resources
        ├── pt
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Por exemplo, o **pt/client-component.json** pode se parecer com:

```json filePath="intlayer/dictionary/pt/client-component.json"
{
  "myTranslatedContent": "Olá Mundo",
  "zero_numberOfCar": "Nenhum carro",
  "one_numberOfCar": "Um carro",
  "two_numberOfCar": "Dois carros",
  "other_numberOfCar": "Alguns carros"
}
```

### Construa dicionários i18next ou next-intl

O Intlayer pode ser configurado para construir dicionários para [i18next](https://www.i18next.com/) ou [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). Para isso, você precisa adicionar a seguinte configuração ao seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Informa ao Intlayer para gerar arquivos de mensagem para next-intl
    dictionaryOutput: ["next-intl"],

    // O diretório onde o Intlayer escreverá seus arquivos JSON de mensagem
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
    // Informa ao Intlayer para gerar arquivos de mensagem para next-intl
    dictionaryOutput: ["next-intl"],

    // O diretório onde o Intlayer escreverá seus arquivos JSON de mensagem
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
    // Informa ao Intlayer para gerar arquivos de mensagem para next-intl
    dictionaryOutput: ["next-intl"],

    // O diretório onde o Intlayer escreverá seus arquivos JSON de mensagem
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

Saída:

```bash
.
└── intl
    └── messages
        ├── pt
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Por exemplo, o **pt/client-component.json** pode se parecer com:

```json filePath="intlayer/dictionary/pt/client-component.json"
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
- enviar e receber dicionários distantes do seu CMS para seu projeto local

Consulte [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md) para mais informações.

## Use o Intlayer em seu aplicativo

Uma vez que seu conteúdo esteja declarado, você pode consumir seus dicionários Intlayer em seu aplicativo.

O Intlayer está disponível como um pacote para seu aplicativo.

### Aplicativo React

Para usar o Intlayer em seu aplicativo React, você pode usar [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/index.md).

### Aplicativo Next.js

Para usar o Intlayer em seu aplicativo Next.js, você pode usar [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/index.md).

### Aplicativo Express

Para usar o Intlayer em seu aplicativo Express, você pode usar [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/express-intlayer/index.md).

## Funções fornecidas pelo pacote `intlayer`

O pacote `intlayer` também fornece algumas funções para ajudar a internacionalizar seu aplicativo.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getConfiguration.md)
- [`getTranslationContent()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getTranslationContent.md)
- [`getEnumerationContent()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getEnumerationContent.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getPathWithoutLocale.md)
