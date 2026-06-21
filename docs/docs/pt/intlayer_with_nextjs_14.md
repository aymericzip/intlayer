---
createdAt: 2024-12-06
updatedAt: 2026-05-31
title: "Next.js 14 i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Next.js 14 multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js 14
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 14
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
applicationShowcase: https://intlayer-next-14-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
author: aymericzip
---

# Traduza seu Next.js 14 and App Router com Intlayer | Internacionalização (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja [Application Template](https://github.com/aymericzip/intlayer-next-14-template) no GitHub.

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `next-intl` ou `i18next`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>

<Accordion header="Cobertura completa do Next.js">

O Intlayer é otimizado para funcionar com **Componentes de servidor** para renderização eficiente e é totalmente compatível com [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Ele não bloqueia a renderização estática e oferece middleware, bem como todos os recursos necessários para dimensionar a internacionalização (i18n).

> Intlayer é compatível com Next.js 12, 13, 14, 15 e 16. Se você estiver usando o roteador de páginas Next.js, pode consultar este [guia] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> O roteamento por locale é útil para SEO, tamanho do bundle e desempenho. Se não precisar dele, você pode consultar este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> Para Next.js 12, 13, 14 e 15 com o App Router, consulte este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Tamanho do bundle">

Em vez de carregar arquivos JSON enormes em suas páginas, carregue apenas o conteúdo necessário. O Intlayer ajuda a **reduzir o tamanho do bundle e das páginas em até 50%**.

</Accordion>

<Accordion header="Manutenção">

Definir o escopo do conteúdo do seu aplicativo **facilita a manutenção** de aplicativos de grande escala. Você pode duplicar ou excluir uma única pasta de recursos sem o fardo mental de revisar toda a base de código de seu conteúdo. Além disso, o Intlayer é **totalmente tipado (fully typed)** para garantir a precisão do seu conteúdo.

</Accordion>

<Accordion header="Agente de IA">

A co-localização de conteúdo **reduz o contexto necessário** pelos Large Language Models (LLMs). O Intlayer também vem com um conjunto de ferramentas, como uma **CLI** para testar traduções ausentes,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, e **[habilidades do agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais tranquila para os agentes de IA.

</Accordion>

<Accordion header="Automação">

Use a automação para traduzir seu pipeline de CI/CD usando o LLM de sua escolha às custas de seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar arquivos JSON enormes a componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do seu conteúdo no momento da construção.

</Accordion>

<Accordion header="Escalonamento sem nenhum desenvolvedor">

Mais do que apenas uma solução i18n, o Intlayer fornece um **[editor visual] auto-hospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, facilitando a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>
</AccordionGroup>

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Next.js

<Steps>

<Step number={1} title="Instale as Dependências">

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> a flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

> Este comando detectará seu ambiente e instalará os pacotes necessários. Por exemplo:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilações e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **next-intlayer**

  O pacote que integra o Intlayer com o Next.js. Ele fornece provedores de contexto e hooks para internacionalização no Next.js. Além disso, inclui o plugin Next.js para integrar o Intlayer com [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), bem como middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URLs.

</Step>

<Step number={2} title="Configure Seu Projeto">

Here is the final structure that we will make:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── middleware.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Por meio deste arquivo de configuração, você pode configurar URLs localizados, redirecionamento de middleware, nomes de cookies, a localização e extensão de suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={3} title="Integre o Intlayer na Configuração do Next.js">

Configure seu Next.js para usar o Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> O plugin `withIntlayer()` do Next.js é usado para integrar o Intlayer com o Next.js. Ele garante a construção de arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define variáveis de ambiente do Intlayer nos ambientes [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Além disso, fornece aliases para otimizar o desempenho e garantir compatibilidade com componentes do servidor.

</Step>

<Step number={4} title="Configure o Middleware para Detecção de Localidade">

Configure o middleware para detectar a localidade preferida do usuário:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> O `intlayerMiddleware` é usado para detectar a localidade preferida do usuário e redirecioná-lo para a URL apropriada, conforme especificado na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md). Além disso, permite salvar a localidade preferida do usuário em um cookie.

> Adapte o parâmetro `matcher` para corresponder às rotas da sua aplicação. Para mais detalhes, consulte a [documentação do Next.js sobre configuração do matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

</Step>

<Step number={5} title="Defina Rotas Dinâmicas de Localidade">

Remova tudo do `RootLayout` e substitua pelo seguinte código:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

> Manter o componente `RootLayout` vazio permite definir os atributos [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) e [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) na tag `<html>`.

Para implementar o roteamento dinâmico, forneça o caminho para a localidade adicionando um novo layout no seu diretório `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import {
  type Next14LayoutIntlayer,
  IntlayerClientProvider,
} from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </body>
  </html>
);

export default LocaleLayout;
```

> O segmento de caminho `[locale]` é usado para definir a localidade. Exemplo: `/en-US/about` se referirá a `en-US` e `/fr/about` a `fr`.

> Nesta etapa, você encontrará o erro: `Erro: Faltam as tags <html> e <body> no layout raiz.`. Isso é esperado porque o arquivo `/app/page.tsx` não está mais em uso e pode ser removido. Em vez disso, o segmento de caminho `[locale]` ativará a página `/app/[locale]/page.tsx`. Consequentemente, as páginas estarão acessíveis por meio de caminhos como `/en`, `/fr`, `/es` no seu navegador. Para definir a localidade padrão como a página raiz, consulte a configuração do `middleware` no passo 4.

Depois, implemente a função `generateStaticParams` no Layout da sua aplicação.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Linha a ser inserida

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... Resto do código*/
};

export default LocaleLayout;
```

> `generateStaticParams` garante que sua aplicação pré-construa as páginas necessárias para todas as localidades, reduzindo a computação em tempo de execução e melhorando a experiência do usuário. Para mais detalhes, consulte a [documentação do Next.js sobre generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

</Step>

<Step number={6} title="Declare Seu Conteúdo">

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        pt: "Comece editando",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar",
        "pt": "Comece editando"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx",
        "pt": "src/app/page.tsx"
      }
    }
  }
}
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>

<Step number={7} title="Utilize o Conteúdo no Seu Código">

Acesse seus dicionários de conteúdo em toda a sua aplicação:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
        <ClientComponentExample />
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** é usado para fornecer a localidade para componentes do lado do cliente. Ele pode ser colocado em qualquer componente pai, incluindo o layout. No entanto, colocá-lo em um layout é recomendado porque o Next.js compartilha o código do layout entre as páginas, tornando-o mais eficiente. Usando `IntlayerClientProvider` no layout, você evita reinicializá-lo para cada página, melhorando o desempenho e mantendo um contexto de localização consistente em toda a sua aplicação.
- **`IntlayerServerProvider`** é usado para fornecer a localidade para os filhos do servidor. Ele não pode ser configurado no layout.

  > Layout e página não podem compartilhar um contexto de servidor comum porque o sistema de contexto do servidor é baseado em um armazenamento de dados por solicitação (via mecanismo de [cache do React](https://react.dev/reference/react/cache)), fazendo com que cada “contexto” seja recriado para diferentes segmentos da aplicação. Colocar o provedor em um layout compartilhado quebraria esse isolamento, impedindo a propagação correta dos valores do contexto do servidor para seus componentes do servidor.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Crie a declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Crie a declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Se você quiser usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você deve chamar o valor da função, como:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={8} title="Internacionalização dos seus metadados" isOptional={true}>

No caso de você querer internacionalizar seus metadados, como o título da sua página, você pode usar a função `generateMetadata` fornecida pelo Next.js. Dentro da função, use a função `getTranslation` para traduzir seus metadados.

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

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
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
      pt: "Meu título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      pt: "Minha descrição",
    }),
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Resto do código
````

````javascript fileName="src/app/[locale]/layout.msx or src/app/[locale]/page.msx" codeFormat="javascript"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

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
  const localizedUrl = multilingualUrls[locale];
  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
      pt: "Meu título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      pt: "Minha descrição",
    }),
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Resto do código
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="javascript"
const { getTranslation, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

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
  const localizedUrl = multilingualUrls[locale];

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
      pt: "Meu título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      pt: "Minha descrição",
    }),
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Resto do código
````

> Saiba mais sobre a otimização de metadados [na documentação oficial do Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Internacionalização do seu sitemap.xml e robots.txt" isOptional={true}>

Para internacionalizar seu `sitemap.xml` e `robots.txt`, você pode usar a função `getMultilingualUrls` fornecida pelo Intlayer. Esta função permite gerar URLs multilíngues para seu sitemap.

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

</Step>

<Step number={10} title="Alterar o idioma do seu conteúdo" isOptional={true}>

Para alterar o idioma do seu conteúdo no Next.js, a maneira recomendada é usar o componente `Link` para redirecionar os usuários para a página localizada apropriada. O componente `Link` permite o pré-carregamento da página, o que ajuda a evitar um recarregamento completo da página.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Localidade - ex.: FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma na sua própria Localidade - ex.: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma na Localidade atual - ex.: Francés com localidade atual definida como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - ex.: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Referências da documentação:
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useLocale.md)
> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocaleName.md)
> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md)
> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getHTMLTextDir.md)
> - [Atributo `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [Atributo `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [Atributo `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [Atributo `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Criando um Componente de Link Localizado" isOptional={true}>

Para garantir que a navegação da sua aplicação respeite a localidade atual, você pode criar um componente `Link` personalizado. Este componente automaticamente prefixa URLs internas com o idioma atual, de forma que, por exemplo, quando um usuário que fala francês clica em um link para a página "Sobre", ele é redirecionado para `/fr/about` em vez de `/about`.

Este comportamento é útil por várias razões:

- **SEO e Experiência do Usuário**: URLs localizadas ajudam os mecanismos de busca a indexar corretamente as páginas específicas de idioma e fornecem aos usuários conteúdo em seu idioma preferido.
- **Consistência**: Usando um link localizado em toda a sua aplicação, você garante que a navegação permaneça dentro da localidade atual, evitando mudanças inesperadas de idioma.
- **Manutenibilidade**: Centralizar a lógica de localização em um único componente simplifica o gerenciamento de URLs, tornando sua base de código mais fácil de manter e expandir à medida que sua aplicação cresce.

Abaixo está a implementação de um componente `Link` localizado em TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Função utilitária para verificar se uma URL é externa.
 * Se a URL começar com http:// ou https://, ela é considerada externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Um componente Link personalizado que adapta o atributo href com base na localidade atual.
 * Para links internos, ele usa `getLocalizedUrl` para prefixar a URL com a localidade (ex.: /fr/about).
 * Isso garante que a navegação permaneça dentro do mesmo contexto de localidade.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se o link for interno e um href válido for fornecido, obtenha a URL localizada.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

#### Como Funciona

- **Detectando Links Externos**:  
  A função auxiliar `checkIsExternalLink` determina se uma URL é externa. Links externos são deixados inalterados porque não precisam de localização.

- **Recuperando a Localidade Atual**:  
  O hook `useLocale` fornece a localidade atual (ex.: `fr` para francês).

- **Localizando a URL**:  
  Para links internos (ou seja, não externos), `getLocalizedUrl` é usado para prefixar automaticamente a URL com a localidade atual. Isso significa que, se seu usuário estiver em francês, passar `/about` como `href` transformará em `/fr/about`.

- **Retornando o Link**:  
  O componente retorna um elemento `<a>` com a URL localizada, garantindo que a navegação seja consistente com a localidade.

Ao integrar este componente `Link` em toda a sua aplicação, você mantém uma experiência de usuário coerente e consciente do idioma, além de se beneficiar de SEO e usabilidade aprimorados.

</Step>

<Step number={12} title="Otimize o tamanho do seu bundle" isOptional={true}>

Ao usar o `next-intlayer`, os dicionários são incluídos no bundle de cada página por padrão. Para otimizar o tamanho do bundle, o Intlayer fornece um plugin SWC opcional que substitui inteligentemente as chamadas `useIntlayer` usando macros. Isso garante que os dicionários sejam incluídos apenas nos bundles das páginas que realmente os utilizam.

Para habilitar essa otimização, instale o pacote `@intlayer/swc`. Uma vez instalado, o `next-intlayer` detectará automaticamente e usará o plugin:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Nota: Esta otimização só está disponível em Next.js 13 e superior.

> Nota: Este pacote não é instalado por padrão porque o plugin SWC ainda está em fase experimental no Next.js. Isso pode mudar no futuro.
> </Step>

</Steps>

### Configure o TypeScript

O Intlayer usa a ampliação de módulos para obter benefícios do TypeScript e tornar sua base de código mais robusta.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Certifique-se de que sua configuração do TypeScript inclua os tipos autogerados.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Inclua os tipos autogerados
  ],
}
```

### Configuração do Git

É recomendável ignorar os arquivos gerados pelo Intlayer. Isso permite evitar que eles sejam enviados para seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignore os arquivos gerados pelo Intlayer
.intlayer
```

### Vá Além

Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).
