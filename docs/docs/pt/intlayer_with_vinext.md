---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Guia completo para traduzir seu app Next.js no Vite"
description: "Configure o Intlayer com o vinext, a API do Next.js sobre o Vite: roteamento por idioma com proxy.ts, Server e Client Components, metadados localizados, sitemap e deploy no Cloudflare Workers."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "Histórico inicial"
author: aymericzip
---

# Traduza seu site vinext com o Intlayer

O [vinext](https://github.com/cloudflare/vinext) reimplementa a API do Next.js sobre o Vite. Seu diretório `app/`, os imports `next/*` e o `proxy.ts` continuam funcionando, mas o build passa pelo Vite em vez do Turbopack ou do webpack.

O Intlayer se integra a essa configuração com dois pacotes: `next-intlayer`, para os hooks, providers e o proxy que seus componentes já usam no Next.js, e `vite-intlayer`, para a parte de build (compilação dos dicionários, watch e otimização do bundle).

> Usa o Next.js com a toolchain própria dele? Siga o [guia do Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md).

- [Guia do Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)

## Índice

<TOC/>

## Por que o Intlayer em vez de outras alternativas?

Em comparação com soluções como `next-intl` ou `i18next`, o Intlayer vem com otimizações integradas:

<AccordionGroup>
<Accordion header="Feito para a API do Next.js, no Vite">

O mesmo código `next-intlayer` roda no Next.js e no vinext. Os Server Components resolvem o conteúdo no servidor, os Client Components o leem pelo provider, e o roteamento por idioma roda a partir do seu `proxy.ts`. Migrar entre as duas toolchains não toca nos seus componentes.

</Accordion>
<Accordion header="Tamanho do bundle">

Em vez de carregar arquivos JSON enormes nas suas páginas, carregue apenas o conteúdo necessário. O plugin do Vite substitui cada chamada a `useIntlayer` pelas entradas que o componente realmente usa, o que **reduz o tamanho do bundle e das páginas em até 50%**.

</Accordion>
<Accordion header="Manutenibilidade">

Organizar o conteúdo por componente **simplifica a manutenção** de aplicações grandes. Você pode duplicar ou excluir a pasta de uma funcionalidade sem revisar toda a base de código de conteúdo, e o Intlayer é **totalmente tipado** para manter seu conteúdo preciso.

</Accordion>
<Accordion header="Agente de IA">

Manter o conteúdo junto do componente **reduz o contexto necessário** para os LLMs. O Intlayer inclui uma **CLI** para detectar traduções ausentes, um **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, um **[servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)
- [Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)

</Accordion>
<Accordion header="Automação">

Traduza no seu pipeline de CI/CD com o LLM de sua escolha, com o custo no seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo e uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para **traduzir em segundo plano**.

- [Plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)

</Accordion>
<Accordion header="Escalando com quem não é desenvolvedor">

O Intlayer oferece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) auto-hospedado** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para gerenciar conteúdo multilíngue em **tempo real** com tradutores e redatores. O conteúdo pode ser armazenado localmente e/ou remotamente.

- [Editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
- [CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Guia passo a passo para configurar o Intlayer em uma aplicação vinext

<Steps>
<Step number={1} title="Instale as dependências">

Comece com um projeto vinext funcionando. Para criar um, execute `npm create vinext-app@latest`. Para migrar um app Next.js existente, execute `npx vinext init`.

Depois, instale o Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  O pacote principal que fornece as ferramentas de internacionalização: gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos da CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **next-intlayer**

  Fornece os providers, hooks e o proxy para a API do Next.js. O vinext resolve `next/navigation`, `next/headers` e `next/server` para as suas próprias implementações, então o `next-intlayer` funciona sem alterações.

- **vite-intlayer**

  O plugin do Vite que compila suas declarações de conteúdo, as observa em desenvolvimento e otimiza os dicionários no bundle de produção. Ele substitui o plugin `withIntlayer()` do Next.js, que o vinext não executa.

</Step>
<Step number={2} title="Configure seu projeto">

Escolha se sua aplicação deve usar caminhos de URL localizados (por exemplo, `/en/about`, `/fr/about`) ou servir o conteúdo sem um segmento de idioma no caminho (por exemplo, `/about`, detectando o idioma por cookies, headers ou parâmetros de consulta).

<Tabs group="routing-mode">
<Tab label="Com caminho de idioma" value="with-locale-path">

### Arquitetura

Todas as páginas localizadas ficam aninhadas sob um segmento dinâmico `[locale]`. Isso é recomendado para SEO e renderização estática, porque cada idioma tem sua própria URL:

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
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Configuração

Crie um arquivo `intlayer.config.ts` para declarar os idiomas suportados:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Sem caminho de idioma" value="without-locale-path">

### Arquitetura

As rotas não incluem um segmento `[locale]`. Todas as páginas ficam diretamente em `src/app/`, e o idioma vem de cookies, headers ou parâmetros de consulta. Isso combina com dashboards e apps autenticados:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Configuração

Defina `routing.mode` como `"search-params"` (por exemplo, `/about?locale=fr`) ou `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> Esse arquivo também define o redirecionamento do proxy, os nomes dos cookies, a localização e a extensão das suas declarações de conteúdo, os logs e mais. Veja a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para a lista completa.

- [Documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

</Step>
<Step number={3} title="Integre o Intlayer na sua configuração do Vite">

Adicione o plugin `intlayer()` ao lado de `vinext()` em `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> O plugin `intlayer()` compila seus dicionários antes de o build começar, observa os arquivos de conteúdo em desenvolvimento e configura os aliases e otimizações que o `next-intlayer` usa nos ambientes RSC, SSR e cliente.

> O `intlayer()` também traz um middleware de roteamento por idioma para o servidor de desenvolvimento do Vite. No vinext, o `src/proxy.ts` já faz esse trabalho, em desenvolvimento e no runtime de produção, então a opção `ignore` desliga o do Vite para não rotear cada requisição duas vezes.

> Não use `withIntlayer()` no `next.config.ts`. O vinext lê o `next.config.ts` para opções como `redirects`, `rewrites` e `headers`, mas não executa plugins de webpack nem de Turbopack.

Se você faz deploy no Cloudflare Workers, mantenha o plugin `cloudflare()` gerado pelo `vinext init`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => false } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Defina as rotas dinâmicas de idioma">

<Tabs group="routing-mode">
<Tab label="Com caminho de idioma" value="with-locale-path">

Remova tudo de `RootLayout` e substitua pelo código a seguir:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> Manter o `RootLayout` vazio permite que o layout de idioma defina os atributos [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) e [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) na tag `<html>`.

Adicione um layout no seu diretório `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Um único `IntlayerProvider` cobre as duas metades da árvore: ele fornece o idioma aos Server Components e monta o provider de cliente para que os Client Components recebam o mesmo idioma.

> O segmento `[locale]` guarda o idioma: `/en-US/about` resolve para `en-US`, `/fr/about` para `fr`. O antigo `src/app/page.tsx` não é mais usado e pode ser removido. O proxy (passo 7) serve o idioma padrão na raiz.

> `generateStaticParams` faz o vinext pré-renderizar cada página para cada idioma. O vinext também aplica `dynamicParams`, então um idioma desconhecido retorna 404 quando você define `export const dynamicParams = false`.

</Tab>
<Tab label="Sem caminho de idioma" value="without-locale-path">

Não há diretório `[locale]`. Configure `src/app/layout.tsx` para ler o idioma da requisição e envolver sua aplicação com o `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="Declare seu conteúdo">

Crie declarações de conteúdo para armazenar suas traduções:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        pt: "Comece editando",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
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
      "main": {
        "nodeType": "translation",
        "translation": {
          "pt": "Comece editando",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> As declarações de conteúdo podem ficar em qualquer lugar dentro do diretório `contentDir` (por padrão, `./src`), desde que correspondam à extensão das declarações de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

- [Documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md)

</Step>
<Step number={6} title="Use o conteúdo no seu código">

Acesse seus dicionários de qualquer componente:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

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
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> O `next-intlayer` é isomórfico: a condição de exportação `react-server`, que o vinext aplica ao seu ambiente RSC, dá aos Server Components a implementação de servidor, enquanto os Client Components recebem a baseada em contexto. A mesma chamada funciona nos dois lados.

> Para usar seu conteúdo em um atributo do tipo `string`, como `alt`, `title`, `href` ou `aria-label`, leia o valor dele:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Saiba mais na [documentação do `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useIntlayer.md).

- [Documentação do `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useIntlayer.md)

> Se seu app já existe, o [compilador do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) e o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) transformam milhares de componentes em um segundo.

- [Compilador do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md)
- [Comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md)

</Step>
<Step number={7} title="Configure o proxy para a detecção de idioma">

O vinext executa `proxy.ts` (e `middleware.ts`) como o Next.js 16, em desenvolvimento e em produção, inclusive no Cloudflare Workers. Exporte o proxy do Intlayer:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> O `intlayerProxy` detecta o idioma preferido do usuário, redireciona para a URL correspondente conforme a [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) e armazena o idioma em um cookie. Ele também repassa o idioma para `getLocale()` e para os hooks de servidor, então mantenha-o mesmo com a arquitetura sem caminho de idioma.

- [Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

> Para encadear vários proxies (por exemplo, `intlayerProxy` com autenticação), use `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Internacionalização dos seus metadados" isOptional={true}>

O vinext suporta a API Metadata. Use `generateMetadata` com `getIntlayer` para traduzir os metadados das suas páginas:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      pt: "Meu app vinext",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      pt: "Um app Next.js rodando no Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
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
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of the code
````

> A função `getIntlayer` importada de `intlayer` retorna valores brutos, prontos para o objeto de metadados. A de `next-intlayer` os envolve para o editor visual.

</Step>
<Step number={9} title="Internacionalização do seu sitemap.xml e robots.txt" isOptional={true}>

`sitemap.ts` e `robots.ts` funcionam como no Next.js. Use `getMultilingualUrls` para listar cada URL localizada:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
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

</Step>
<Step number={10} title="Altere o idioma do seu conteúdo" isOptional={true}>

Use `next/link` para navegar até a página localizada. O vinext mantém a navegação no cliente e o prefetching, então a troca acontece sem recarregar a página inteira:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
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
> - [Função `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocaleName.md)
> - [Função `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md)
> - [Função `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Criando um componente de link localizado" isOptional={true}>

Um componente `Link` personalizado adiciona o idioma atual como prefixo nas URLs internas, de modo que um usuário francês que clica em `/about` chega a `/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Obtenha o idioma atual em Server Actions" isOptional={true}>

Chame `getLocale` de `next-intlayer/server` dentro de uma Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` lê o idioma definido pelo proxy nos headers da requisição, depois o cookie de idioma, depois o header `Accept-Language` do navegador, e recorre ao idioma padrão.

</Step>
<Step number={13} title="Faça deploy no Cloudflare Workers" isOptional={true}>

O Intlayer compila os dicionários no bundle em tempo de build, então nada lê o sistema de arquivos em tempo de execução e o app roda como está no workerd. Faça o build e o deploy com a CLI do vinext:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> Para fazer deploy em outro lugar (Vercel, Netlify, AWS, Node.js), adicione o plugin do Vite [Nitro](https://v3.nitro.build/) ao lado de `vinext()`, ou defina `output: "standalone"` em `next.config.ts`. A configuração do Intlayer não muda.

</Step>
<Step number={14} title="Extraia o conteúdo dos seus componentes" isOptional={true}>

Em uma base de código existente, o Intlayer oferece um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) e um [extrator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) para mover strings fixas no código para declarações de conteúdo.

- [Compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md)
- [Extrator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md)

Ative o compilador em `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Execute o extrator para transformar seus componentes e extrair o conteúdo:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Vite compiler'>

O plugin `intlayer()` do Vite inclui o compilador. Depois de definir `compiler.enabled`, rode o servidor de desenvolvimento ou o build normalmente:

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Configure o TypeScript

O Intlayer usa module augmentation para tipar as chaves e os valores do seu conteúdo.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Inclua os tipos gerados na sua configuração do TypeScript:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Configuração do Git

Ignore os arquivos gerados pelo Intlayer:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### Extensão do VS Code

Instale a **[extensão oficial do Intlayer para VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** para ter autocompletar de chaves, erros de tradução ausente, prévias inline e ações rápidas. Veja a [documentação da extensão](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md).

- [Documentação da extensão](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)

### Indo além

Adicione o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalize seu conteúdo com o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

- [Editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)

## Perguntas frequentes

<FAQ>

<Question title="O que é o vinext?">

O vinext é um plugin do Vite de código aberto, mantido pela Cloudflare, que reimplementa a API pública do Next.js: App Router e Pages Router, React Server Components, Server Actions, `proxy.ts`, route handlers e os módulos `next/*`. Seu código Next.js roda no Vite e faz deploy nativamente no Cloudflare Workers ou em outras plataformas via Nitro.

</Question>
<Question title="O que muda em comparação com a configuração do Next.js?">

Apenas a integração com o build. No Next.js, `withIntlayer()` envolve o `next.config.ts`. No vinext, o plugin `intlayer()` do `vite-intlayer` vai no `vite.config.ts`. Providers, hooks, `proxy.ts`, metadados e código do sitemap continuam idênticos, então você pode seguir o [guia do Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md) para tudo o que esta página não cobre.

- [Guia do Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)

</Question>
<Question title="Preciso da configuração i18n do Next.js ou do plugin SWC?">

Não. O campo `i18n` do `next.config.ts` cobre apenas os prefixos de idioma do Pages Router no vinext, e o Intlayer faz seu próprio roteamento pelo `proxy.ts`. O plugin `@intlayer/swc` também não é necessário: o plugin do Vite já substitui as chamadas a `useIntlayer`, de modo que cada página envia apenas os dicionários que usa. Veja a [otimização do bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md).

- [Otimização do bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)

</Question>
<Question title="Preciso do `intlayer watch` em desenvolvimento?">

Não. O plugin `intlayer()` do Vite inicia o watcher de conteúdo com `vite dev`, e uma edição de conteúdo atualiza a quente apenas os componentes que leem o dicionário alterado.

</Question>
<Question title="Posso migrar de `next-intl` ou `i18next` sem reescrever meus componentes?">

Sim. Siga o [guia de migração do next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md) ou o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md), ou mantenha sua API atual com os [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md), que expõem as APIs do `next-intl`, `react-i18next` e `react-intl` servidas por dicionários do Intlayer.

- [Guia de migração do next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md)
- [Guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md)
- [Adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md)

</Question>
<Question title="Preciso colocar o idioma na URL, como /fr/about?">

Não. `routing.mode` aceita:

- `"prefix-no-default"` (padrão): `/about` para o idioma padrão, `/fr/about` para os outros.
- `"prefix-all"`: todos os idiomas têm prefixo, `/en/about` e `/fr/about`.
- `"no-prefix"`: nenhum idioma no caminho, resolvido por cookie ou header.
- `"search-params"`: `/about?locale=fr`.

Veja a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) e a arquitetura sem caminho de idioma no passo 2.

- [Referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

</Question>
<Question title="Como traduzo meu app automaticamente com IA?">

Execute `npx intlayer fill`. A CLI detecta as traduções ausentes e as preenche com o LLM de sua escolha, usando seu próprio provedor e sua própria chave de API. Veja o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração com CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

- [Comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md)
- [Integração com CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md)

</Question>
<Question title="Como detecto traduções ausentes antes de publicar?">

Execute `npx intlayer test` na CI. Ele falha o build quando falta conteúdo em um idioma declarado. A [extensão do VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md) mostra os mesmos erros enquanto você digita, e o [plugin do ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md) sinaliza strings fixas no código.

- [Extensão do VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)
- [Plugin do ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)

</Question>
<Question title="O Intlayer é gratuito e de código aberto?">

Sim. O Intlayer é de código aberto sob a licença Apache 2.0, e a biblioteca, a CLI, o editor visual e o compilador são gratuitos, inclusive para uso comercial. O CMS hospedado é um serviço pago opcional e também pode ser [auto-hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

- [Auto-hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md)

</Question>

</FAQ>
