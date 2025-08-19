---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer e next-intl
description: Integre o Intlayer com o next-intl para a internacionalização (i18n) de um aplicativo React
keywords:
  - next-intl
  - Intlayer
  - Internacionalização
  - Blogumentação
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
---

# Next.js Internacionalização (i18n) com next-intl e Intlayer

Tanto o next-intl quanto o Intlayer são frameworks de internacionalização (i18n) de código aberto projetados para aplicações Next.js. Eles são amplamente utilizados para gerenciar traduções, localização e troca de idiomas em projetos de software.

Eles compartilham três noções principais:

1. **Declaração de Conteúdo**: O método para definir o conteúdo traduzível da sua aplicação.
   - Chamado de `arquivo de declaração de conteúdo` no Intlayer, que pode ser um arquivo JSON, JS ou TS exportando os dados estruturados. Veja [documentação do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/doc/concept/content) para mais informações.
   - Chamado de `messages` ou `locale messages` no next-intl, geralmente em arquivos JSON. Veja [documentação do next-intl](https://github.com/amannn/next-intl) para mais informações.

2. **Utilitários**: Ferramentas para construir e interpretar declarações de conteúdo na aplicação, como `useIntlayer()` ou `useLocale()` para Intlayer, e `useTranslations()` para next-intl.

3. **Plugins e Middlewares**: Recursos para gerenciar redirecionamento de URL, otimização de empacotamento, e mais, ex: `intlayerMiddleware` para Intlayer ou [`createMiddleware`](https://github.com/amannn/next-intl) para next-intl.

## Intlayer vs. next-intl: Principais Diferenças

Para uma análise mais profunda de como o Intlayer se compara a outras bibliotecas de i18n para Next.js (como o next-intl), confira o [post no blog next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18next_vs_next-intl_vs_intlayer.md).

## Como Gerar Mensagens next-intl com Intlayer

### Por que Usar Intlayer com next-intl?

Os arquivos de declaração de conteúdo do Intlayer geralmente oferecem uma melhor experiência para o desenvolvedor. Eles são mais flexíveis e manuteníveis devido a duas principais vantagens:

1. **Colocação Flexível**: Você pode colocar um arquivo de declaração de conteúdo do Intlayer em qualquer lugar na árvore de arquivos da sua aplicação. Isso facilita renomear ou deletar componentes sem deixar arquivos de mensagem não utilizados ou pendentes.

   Exemplos de estruturas de arquivos:

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

2. **Traduções Centralizadas**: O Intlayer armazena todas as traduções em uma única declaração de conteúdo, garantindo que nenhuma tradução esteja faltando. Em projetos TypeScript, traduções ausentes são sinalizadas automaticamente como erros de tipo, fornecendo feedback imediato aos desenvolvedores.

### Instalação

Para usar o Intlayer e o next-intl juntos, instale ambas as bibliotecas:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### Configurando o Intlayer para Exportar Mensagens next-intl

> **Nota:** Exportar mensagens do Intlayer para o next-intl pode introduzir pequenas diferenças na estrutura. Se possível, mantenha um fluxo apenas do Intlayer ou apenas do next-intl para simplificar a integração. Se você precisar gerar mensagens next-intl a partir do Intlayer, siga os passos abaixo.

Crie ou atualize um arquivo `intlayer.config.ts` (ou `.mjs` / `.cjs`) na raiz do seu projeto:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // Usar a saída do next-intl
    nextIntlMessagesDir: "./intl/messages", // Onde salvar mensagens next-intl
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
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
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
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### Declaração de Conteúdo

Abaixo estão exemplos de arquivos de declaração de conteúdo em múltiplos formatos. O Intlayer compilará isso em arquivos de mensagem que o next-intl pode consumir.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
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
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
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
  "key": "my-component",
  "content": {
    "helloWorld": {
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

### Construir as Mensagens next-intl

Para construir os arquivos de mensagem para o next-intl, execute:

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Isso irá gerar recursos no diretório `./intl/messages` (conforme configurado em `intlayer.config.*`). A saída esperada:

```bash
.
└── intl
    └── messages
       └── pt
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Cada arquivo inclui mensagens compiladas de todas as declarações de conteúdo do Intlayer. As chaves de nível superior normalmente correspondem aos seus campos `content.key`.

### Usando next-intl em Seu App Next.js

> Para mais detalhes, veja a [documentação oficial de uso do next-intl](https://github.com/amannn/next-intl#readme).

1. **Criar um Middleware (opcional):**  
   Se você quiser gerenciar a detecção automática de idioma ou redirecionamento, use o [createMiddleware do next-intl](https://github.com/amannn/next-intl#createMiddleware).

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **Criar um `layout.tsx` ou `_app.tsx` para Carregar Mensagens:**  
   Se você está usando o App Router (Next.js 13+), crie um layout:

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';


   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
   ```
