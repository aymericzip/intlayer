---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer e next-i18next
description: Integre o Intlayer com o next-i18next para um aplicativo Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internacionalização
  - Blogumentação
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
---

# Next.js Internacionalização (i18n) com next-i18next e Intlayer

Tanto next-i18next quanto Intlayer são frameworks de internacionalização (i18n) de código aberto projetados para aplicações Next.js. Eles são amplamente utilizados para gerenciar traduções, localização e troca de idiomas em projetos de software.

Ambas as soluções incluem três noções principais:

1. **Declaração de Conteúdo**: O método para definir o conteúdo traduzível de sua aplicação.
   - Nomeado `resource` no caso do `i18next`, a declaração de conteúdo é um objeto JSON estruturado contendo pares chave-valor para traduções em um ou mais idiomas. Veja a [documentação do i18next](https://www.i18next.com/translation-function/essentials) para mais informações.
   - Nomeada `content declaration file` no caso do `Intlayer`, a declaração de conteúdo pode ser um arquivo JSON, JS ou TS exportando os dados estruturados. Veja a [documentação do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/doc/concept/content) para mais informações.

2. **Utilitários**: Ferramentas para construir e interpretar declarações de conteúdo na aplicação, como `getI18n()`, `useCurrentLocale()`, ou `useChangeLocale()` para next-i18next, e `useIntlayer()` ou `useLocale()` para Intlayer.

3. **Plugins e Middleware**: Recursos para gerenciar redirecionamento de URL, otimização de pacotes e mais, como `next-i18next/middleware` para next-i18next ou `intlayerMiddleware` para Intlayer.

## Intlayer vs. i18next: Principais Diferenças

Para explorar as diferenças entre i18next e Intlayer, confira nosso post de blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18next_vs_next-intl_vs_intlayer.md).

## Como Gerar Dicionários do next-i18next com Intlayer

### Por que Usar Intlayer com next-i18next?

Os arquivos de declaração de conteúdo do Intlayer geralmente oferecem uma melhor experiência de desenvolvedor. Eles são mais flexíveis e manuteníveis devido a duas principais vantagens:

1. **Colocação Flexível**: Um arquivo de declaração de conteúdo do Intlayer pode ser colocado em qualquer lugar na árvore de arquivos da aplicação, simplificando o gerenciamento de componentes duplicados ou excluídos sem deixar declarações de conteúdo não utilizadas.

   Estruturas de arquivos de exemplo:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Arquivo de declaração de conteúdo
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Arquivo de declaração de conteúdo
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Arquivo de declaração de conteúdo
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Arquivo de declaração de conteúdo
               └── index.jsx
   ```

2. **Traduções Centralizadas**: O Intlayer armazena todas as traduções em um único arquivo, garantindo que nenhuma tradução esteja ausente. Ao usar TypeScript, traduções faltantes são automaticamente detectadas e relatadas como erros.

### Instalação

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### Configurando o Intlayer para Exportar Dicionários do i18next

> Exportar recursos do i18next não garante compatibilidade 1:1 com outras estruturas. É recomendável aderir a uma configuração baseada no Intlayer para minimizar problemas.

Para exportar recursos do i18next, configure o Intlayer em um arquivo `intlayer.config.ts`. Configurações de exemplo:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
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
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

### Importando Dicionários na Sua Configuração do i18next

Para importar os recursos gerados em sua configuração do i18next, use `i18next-resources-to-backend`. Abaixo estão exemplos:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### Declaração de Conteúdo

Exemplos de arquivos de declaração de conteúdo em vários formatos:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Construindo os Recursos do next-i18next

Para construir os recursos do next-i18next, execute o seguinte comando:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Isso irá gerar recursos no diretório `./i18next/resources`. A saída esperada:

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Nota: O namespace do i18next corresponde à chave de declaração do Intlayer.

### Implementando o Plugin do Next.js

Uma vez configurado, implemente o plugin do Next.js para reconstruir seus recursos do i18next sempre que os arquivos de declaração de conteúdo do Intlayer forem atualizados.

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Usando Conteúdo nos Componentes do Next.js

Após implementar o plugin do Next.js, você pode usar o conteúdo em seus componentes:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```
