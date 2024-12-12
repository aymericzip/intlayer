# Começando a internacionalização (i18n) com Intlayer e Next.js 14 com App Router

## O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto projetada para simplificar o suporte multilingue em aplicações web modernas. O Intlayer se integra perfeitamente ao mais recente framework **Next.js 14**, incluindo seu poderoso **App Router**. É otimizado para trabalhar com **Server Components** para renderização eficiente e é totalmente compatível com [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (a partir do Next.js >= 15).

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Acessar traduções em componentes do lado do cliente e do lado do servidor**.
- **Garantir suporte ao TypeScript** com tipos autogerados, melhorando a autocompletação e a detecção de erros.
- **Beneficiar-se de recursos avançados**, como detecção e troca dinâmica de localidade.

> Nota: O Intlayer é compatível com Next.js 12, 13, 14 e 15. Se você estiver usando o Next.js Page Router, pode consultar este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_page_router.md). Para Next.js 15 com ou sem turbopack, consulte este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).

---

## Guia passo a passo para configurar o Intlayer em uma aplicação Next.js

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Passo 2: Configurar seu Projeto

Crie um arquivo de configuração para configurar os idiomas de sua aplicação:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Seus outros locais
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integrar o Intlayer na sua Configuração do Next.js

Configure sua configuração do Next.js para usar o Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Passo 4: Configurar Middleware para Detecção de Localidade

Configure um middleware para detectar a localidade preferida do usuário:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Passo 5: Definir Rotas Dinâmicas de Localidade

Implemente o roteamento dinâmico para conteúdo localizado:

Mude `src/app/page.ts` para `src/app/[locale]/page.ts`

Em seguida, implemente a função generateStaticParams na sua Layout da aplicação.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Linha a inserir

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Em seguida, adicione um novo layout no seu diretório `[locale]`:

```tsx
// src/app/[locale]/layout.tsx

import { type Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

### Passo 6: Declarar Seu Conteúdo

Crie e gerencie seus dicionários de conteúdo:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

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
  },
} satisfies DeclarationContent;

export default pageContent;
```

[Veja como declarar seus arquivos de declaração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).

### Passo 7: Utilizar Conteúdo em Seu Código

Acesse seus dicionários de conteúdo em toda a sua aplicação:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   IntlayerServerProvider é usado para fornecer a localidade aos filhos do servidor
       *   Não funciona se configurado no layout
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider é usado para fornecer a localidade aos filhos do cliente
       *   Pode ser configurado em qualquer componente pai, incluindo o layout
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Crie a declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Crie a declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Nota: Se você quiser usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você deve chamar o valor da função, assim:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Para um uso mais detalhado do intlayer nos componentes Cliente ou Servidor, veja o [exemplo do nextJS aqui](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (Opcional) Passo 8: Internacionalização dos seus metadados

Caso você queira internacionalizar seus metadados, como o título da sua página, você pode usar a função `generateMetadata` fornecida pelo NextJS. Dentro da função, use a função `getTranslationContent` para traduzir seus metadados.

````typescript
// src/app/[locale]/layout.tsx ou src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const url = `/`;

  /**
   * Gera um objeto contendo todas as URLs para cada localidade.
   *
   * Exemplo:
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // Retorna
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * Obtém a URL localizada para a localidade atual
   *
   * Exemplo:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * Retorna:
   * '/fr/about' para a localidade francesa
   * ```
   */
  const localizedUrl = getLocalizedUrl(url, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: multilingualUrls,
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Restante do código
````

> Aprenda mais sobre a otimização de metadados [na documentação oficial do Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opcional) Passo 9: Internacionalização do seu sitemap

Para internacionalizar seu sitemap, você pode usar a função `getMultilingualUrls` fornecida pelo Intlayer. Esta função permite que você gere URLs multilíngues para seu sitemap.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> Aprenda mais sobre a otimização do sitemap [na documentação oficial do Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

### (Opcional) Passo 10: Mudar o idioma do seu conteúdo

Para mudar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Esta função permite que você defina a localidade da aplicação e atualize o conteúdo de acordo.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Mudar Idioma</button>
  );
};
```

### Configurar o TypeScript

O Intlayer usa a alteração de módulo para obter os benefícios do TypeScript e fortalecer sua base de código.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração TypeScript inclui os tipos autogerados.

```json5
// tsconfig.json

{
  // sua configuração personalizada
  include: [
    "src",
    "types", // <- Inclua os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite cometê-los ao seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```gitignore
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```
