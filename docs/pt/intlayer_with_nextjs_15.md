# Começando a internacionalizar (i18n) com Intlayer e Next.js 15 App Router

## O que é Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicativos web modernos. O Intlayer se integra perfeitamente ao mais recente framework **Next.js 15**, incluindo seu poderoso **App Router**. Ele é otimizado para trabalhar com **Server Components** para renderização eficiente e é totalmente compatível com [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos em nível de componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Acessar traduções tanto em componentes do lado do cliente quanto do servidor**.
- **Garantir suporte ao TypeScript** com tipos gerados automaticamente, melhorando a autocompletação e a detecção de erros.
- **Beneficiar-se de recursos avançados**, como detecção e troca de localidade dinâmica.

> Nota: O Intlayer é compatível com Next.js 12, 13, 14 e 15. Se você estiver usando o Next.js Page Router, consulte este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_page_router.md). Para Next.js 12, 13, 14 com App Router, consulte este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_14.md).

---

## Guia Passo a Passo para Configurar o Intlayer em um Aplicativo Next.js

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

### Passo 2: Configurar Seu Projeto

Crie um arquivo de configuração para configurar os idiomas de seu aplicativo:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Seus outros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integrar o Intlayer na Sua Configuração Next.js

Configure sua configuração Next.js para usar Intlayer:

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

### Passo 5: Definir Rotas de Localidade Dinâmica

Implemente roteamento dinâmico para conteúdo localizado:

Mude `src/app/page.ts` para `src/app/[locale]/page.ts`

Em seguida, implemente a função generateStaticParams em seu Layout do aplicativo.

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

Em seguida, adicione um novo layout em seu diretório `[locale]`:

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

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

Acesse seus dicionários de conteúdo em todo o seu aplicativo:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       *   IntlayerServerProvider é usado para fornecer a localidade aos filhos do servidor
       *   Não funciona se definido no layout
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider é usado para fornecer a localidade aos filhos do cliente
       *   Pode ser definido em qualquer componente pai, incluindo o layout
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

> Nota: Se você quiser usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você deve chamar o valor da função, como:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Para um uso mais detalhado do Intlayer em componentes Cliente ou Servidor, veja o [exemplo do Next.js aqui](https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app).

### (Opcional) Passo 8: Internacionalização de seus metadados

No caso de você querer internacionalizar seus metadados, como o título de sua página, você pode usar a função `generateMetadata` fornecida pelo Next.js. Dentro da função, use a função `getTranslationContent` para traduzir seus metadados.

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

  /**
   * Gera um objeto contendo todas as URLs para cada localidade.
   *
   * Exemplo:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Retorna
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

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
      url: multilingualUrls[locale],
    },
  };
};

// ... Restante do código
````

> Saiba mais sobre a otimização de metadados [na documentação oficial do Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opcional) Passo 9: Internacionalização de seu sitemap.xml e robots.txt

Para internacionalizar seu `sitemap.xml` e `robots.txt`, você pode usar a função `getMultilingualUrls` fornecida pelo Intlayer. Essa função permite gerar URLs multilíngues para seu sitemap.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```tsx
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Saiba mais sobre a otimização do sitemap [na documentação oficial do Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Saiba mais sobre a otimização do robots.txt [na documentação oficial do Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Opcional) Passo 10: Mudar o idioma do seu conteúdo

Para mudar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Essa função permite que você defina a localidade do aplicativo e atualize o conteúdo de acordo.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Alterar Idioma</button>
  );
};
```

### Configurar TypeScript

Intlayer usa aumento de módulo para obter benefícios do TypeScript e tornar seu código mais forte.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração TypeScript inclua os tipos gerados automaticamente.

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

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite evitar o comprometimento deles em seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```gitignore
# Ignore os arquivos gerados pelo Intlayer
.intlayer
```
