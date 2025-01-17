# Começando a internacionalização (i18n) com Intlayer e Next.js 15 App Router

## O que é Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas. Intlayer se integra perfeitamente ao mais recente framework **Next.js 15**, incluindo seu poderoso **App Router**. Ele é otimizado para trabalhar com **Server Components** para renderização eficiente e é totalmente compatível com [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdos.
- **Acessar traduções em componentes tanto do lado do cliente quanto do lado do servidor**.
- **Garantir suporte ao TypeScript** com tipos gerados automaticamente, melhorando a autocompletação e a detecção de erros.
- **Beneficiar-se de funcionalidades avançadas**, como detecção e mudança dinâmica de locais.

> O Intlayer é compatível com Next.js 12, 13, 14 e 15. Se você estiver usando o Next.js Page Router, pode consultar este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_page_router.md). Para Next.js 12, 13, 14 com App Router, consulte este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_14.md).

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Next.js

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

- **next-intlayer**

  O pacote que integra o Intlayer com o Next.js. Ele fornece provedores de contexto e hooks para internacionalização no Next.js. Além disso, inclui o plugin Next.js para integrar o Intlayer com [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), assim como middleware para detectar o local preferido do usuário, gerenciar cookies e lidar com redirecionamento de URL.

### Passo 2: Configurar Seu Projeto

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão de suas declarações de conteúdo, desativar logs do Intlayer no console e mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integrar o Intlayer em Sua Configuração Next.js

Configure sua instalação do Next.js para usar o Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> O plugin `withIntlayer()` do Next.js é usado para integrar o Intlayer com o Next.js. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora em modo de desenvolvimento. Ele define variáveis de ambiente do Intlayer dentro dos ambientes [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Além disso, fornece aliases para otimizar o desempenho e garante compatibilidade com componentes de servidor.

### Passo 4: Configurar Middleware para Detecção de Locale

Configure middleware para detectar o local preferido do usuário:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> O `intlayerMiddleware` é usado para detectar o local preferido do usuário e redirecioná-lo para a URL apropriada, conforme especificado na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md). Além disso, ele permite salvar o local preferido do usuário em um cookie.

### Passo 5: Definir Rotas Dinâmicas de Locale

Remova tudo do `RootLayout` e substitua pelo seguinte código:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Manter o componente `RootLayout` vazio permite definir os atributos [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) e [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) na tag `<html>`.

Para implementar o roteamento dinâmico, forneça o caminho para o local adicionando um novo layout no seu diretório `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
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

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> O segmento de caminho `[locale]` é usado para definir o local. Exemplo: `/en-US/about` se referirá a `en-US` e `/fr/about` para `fr`.

Em seguida, implemente a função `generateStaticParams` no Layout de sua aplicação.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Linha a ser inserida

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Restante do código*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Linha a ser inserida

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Restante do código*/
};

// ... Restante do código
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Linha a ser inserida

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Restante do código*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` garante que sua aplicação pré-construa as páginas necessárias para todos os locais, reduzindo a computação em tempo de execução e melhorando a experiência do usuário. Para mais detalhes, consulte a [documentação do Next.js sobre generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### Passo 6: Declarar Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação assim que forem incluídas no diretório `contentDir` (por padrão, `./src`). E devem corresponder à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).

### Passo 7: Utilizar Conteúdo em Seu Código

Acesse seus dicionários de conteúdo em toda a sua aplicação:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
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
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />

        <IntlayerClientProvider locale={locale}>
          <ClientComponentExample />
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ locale }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

const Page = ({ locale }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

- **`IntlayerClientProvider`** é usado para fornecer o locale para componentes do lado do cliente. Ele pode ser colocado em qualquer componente pai, incluindo o layout. No entanto, recomenda-se colocá-lo em um layout, pois o Next.js compartilha o código do layout entre as páginas, tornando-o mais eficiente. Ao usar o `IntlayerClientProvider` no layout, você evita reinicializá-lo para cada página, melhorando o desempenho e mantendo um contexto de localização consistente em toda a sua aplicação.
- **`IntlayerServerProvider`** é usado para fornecer o locale para os filhos do servidor. Ele não pode ser definido no layout.

  > O layout e a página não podem compartilhar um contexto de servidor comum porque o sistema de contexto do servidor é baseado em um armazenamento de dados por solicitação (via [cache do React](https://react.dev/reference/react/cache)), fazendo com que cada “contexto” seja recriado para diferentes segmentos da aplicação. Colocar o provedor em um layout compartilhado quebraria essa isolação, impedindo a propagação correta dos valores do contexto do servidor para seus componentes de servidor.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Se você deseja usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., deve chamar o valor da função, como:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useIntlayer.md).

### (Opcional) Passo 8: Internacionalização de seus metadados

Caso você deseje internacionalizar seus metadados, como o título da sua página, pode usar a função `generateMetadata` fornecida pelo Next.js. Dentro da função, use a função `getTranslationContent` para traduzir seus metadados.

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params: { locale },
}: LocalPromiseParams): Metadata => {
  const { locale } = await params;

  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  /**
   * Gera um objeto contendo todas as URLs para cada locale.
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
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Restante do código
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslationContent, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslationContent(content, locale);

  /**
   * Gera um objeto contendo todas as URLs para cada locale.
   *
   * Exemplo:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Retorna
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t({
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
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Restante do código
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslationContent, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslationContent(content, locale);

  /**
   * Gera um objeto contendo todas as URLs para cada locale.
   *
   * Exemplo:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Retorna
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t({
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
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Restante do código
````

> Saibam mais sobre a otimização de metadados [na documentação oficial do Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opcional) Passo 9: Internacionalização do seu sitemap.xml e robots.txt

Para internacionalizar seu `sitemap.xml` e `robots.txt`, você pode usar a função `getMultilingualUrls` fornecida pelo Intlayer. Essa função permite gerar URLs multilíngues para o seu sitemap.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
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

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
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

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
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

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
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

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
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

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Saiba mais sobre a otimização do sitemap [na documentação oficial do Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Saiba mais sobre a otimização do robots.txt [na documentação oficial do Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Opcional) Passo 10: Mudar o idioma do seu conteúdo

Para mudar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Essa função permite que você defina o locale da aplicação e atualize o conteúdo de acordo.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma em seu próprio Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no Locale atual - e.g. Francés com o locale atual definido como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em inglês - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma em seu próprio Locale - e.g. FR */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma em seu próprio Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no Locale atual - e.g. Francés com o locale atual definido como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em inglês - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma em seu próprio Locale - e.g. FR */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma em seu próprio Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no Locale atual - e.g. Francés com o locale atual definido como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em inglês - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma em seu próprio Locale - e.g. FR */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> Referências da documentação:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Configurar TypeScript

O Intlayer usa a augmentação de módulos para obter benefícios do TypeScript e tornar seu código mais forte.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações de TypeScript existentes
  "include": [
    // ... Suas configurações de TypeScript existentes
    "types", // Incluir os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

É recomendável ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite a confirmação deles no seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```
