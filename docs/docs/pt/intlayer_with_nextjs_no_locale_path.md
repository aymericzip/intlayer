---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js 16 i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Next.js 16 multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 8.0.0
    date: 2026-01-10
    changes: "Lançamento inicial"
author: aymericzip
---

# Traduza seu site Next.js 16 (sem [locale] no caminho da página) usando Intlayer | Internacionalização (i18n)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="A melhor solução de i18n para Next.js? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar sua aplicação usando o Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) no GitHub.

## Índice

<TOC/>

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `next-intl` ou `i18next`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>
<Accordion header="Cobertura completa do Next.js">

O Intlayer é otimizado para funcionar com **Componentes de servidor** para renderização eficiente e é totalmente compatível com [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Ele não bloqueia a renderização estática e oferece middleware, bem como todos os recursos necessários para dimensionar a internacionalização (i18n).

> Intlayer é compatível com Next.js 12, 13, 14, 15 e 16. Se você estiver usando o roteador de páginas Next.js, pode consultar este [guia] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_page_router.md).
> O roteamento por locale é útil para SEO, tamanho do bundle e desempenho. Se não precisar dele, você pode consultar este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_no_locale_path.md).
> Para Next.js 12, 13, 14 e 15 com o App Router, consulte este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Tamanho do bundle">

Em vez de carregar arquivos JSON enormes em suas páginas, carregue apenas o conteúdo necessário. O Intlayer ajuda a **reduzir o tamanho do bundle e das páginas em até 50%**.

</Accordion>

<Accordion header="Manutenção">

Definir o escopo do conteúdo do seu aplicativo **facilita a manutenção** de aplicativos de grande escala. Você pode duplicar ou excluir uma única pasta de recursos sem o fardo mental de revisar toda a base de código de seu conteúdo. Além disso, o Intlayer é **totalmente tipado (fully typed)** para garantir a precisão do seu conteúdo.

</Accordion>

<Accordion header="Agente de IA">

A co-localização de conteúdo **reduz o contexto necessário** pelos Large Language Models (LLMs). O Intlayer também vem com um conjunto de ferramentas, como uma **CLI** para testar traduções ausentes,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**, e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais tranquila para os agentes de IA.

</Accordion>

<Accordion header="Automação">

Use a automação para traduzir seu pipeline de CI/CD usando o LLM de sua escolha às custas de seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar arquivos JSON enormes a componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do seu conteúdo no momento da construção.

</Accordion>

<Accordion header="Escalonamento sem nenhum desenvolvedor">

Mais do que apenas uma solução i18n, o Intlayer fornece um **[editor visual] auto-hospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, facilitando a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>
</AccordionGroup>

---

## Guia passo a passo para configurar o Intlayer numa aplicação Next.js

<Steps>

<Step number={1} title="Instalar dependências">

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
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

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **next-intlayer**

O pacote que integra o Intlayer com o Next.js. Fornece providers de contexto e hooks para internacionalização no Next.js. Além disso, inclui o plugin do Next.js para integrar o Intlayer com o [Webpack](https://webpack.js.org/) ou o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), bem como um proxy para detectar a locale preferida do utilizador, gerir cookies e tratar redirecionamentos de URL.

</Step>

<Step number={2} title="Configure o seu projeto">

Aqui está a estrutura final que iremos criar:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Se não quiser roteamento por locale, o intlayer pode ser usado apenas como um provider / hook. Veja [este guia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_no_locale_path.md) para mais detalhes.

Crie um arquivo de configuração para definir os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Outros locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // ou `no-prefix` - Útil para detecção no middleware
  },
};

export default config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento por proxy, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desativar os logs do Intlayer no console e muito mais. Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={3} title="Integrar o Intlayer na sua configuração do Next.js">

Configure seu setup do Next.js para usar o Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* opções de configuração aqui */};

export default withIntlayer(nextConfig);
```

> O plugin Next.js `withIntlayer()` é usado para integrar o Intlayer com o Next.js. Ele garante a geração dos ficheiros de declaração de conteúdo e os monitora em modo de desenvolvimento. Define as variáveis de ambiente do Intlayer nos ambientes do [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Além disso, fornece aliases para otimizar o desempenho e assegura compatibilidade com server components.

> A função `withIntlayer()` é uma função promise. Ela permite preparar os dicionários do intlayer antes do início da build. Se você quiser usá-la com outros plugins, pode aguardá-la. Exemplo:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Se você quiser usá-la de forma síncrona, pode usar a função `withIntlayerSync()`. Exemplo:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> A função `withIntlayer()` é uma função que retorna uma promise. Permite preparar os dicionários do intlayer antes do início do build. Se quiser utilizá-la com outros plugins, pode fazer await. Exemplo:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Se você quiser usá-lo de forma síncrona, pode usar a função `withIntlayerSync()`. Exemplo:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> O Intlayer detecta automaticamente se o seu projeto está usando **webpack** ou **Turbopack** com base nas flags de linha de comando `--webpack`, `--turbo`, ou `--turbopack`, assim como na sua **versão do Next.js** atual.
>
> Desde `next>=16`, se você estiver usando **Rspack**, deve forçar explicitamente o Intlayer a usar a configuração do webpack desabilitando o Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Definir rotas de localidade dinâmicas">

Remova tudo de `RootLayout` e substitua pelo código a seguir:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

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

> Um único `IntlayerProvider` cobre ambas as metades da árvore: ele alimenta o contexto do servidor com escopo de requisição lido pelos hooks do servidor e monta o provedor do cliente para que os componentes do cliente recebam a mesma localidade.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

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
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>

<Step number={5} title="Declarar o seu conteúdo">

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      pt: "Meu Título do Projeto",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      pt: "Descubra a nossa plataforma inovadora projetada para simplificar o seu fluxo de trabalho e aumentar a sua produtividade.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      pt: ["inovação", "produtividade", "fluxo de trabalho", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      pt: ["inovação", "produtividade", "fluxo de trabalho", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "pt": "O Título do Meu Projeto",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "pt": "Descubra nossa plataforma inovadora projetada para otimizar seu fluxo de trabalho e aumentar sua produtividade.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "pt": ["inovação", "produtividade", "fluxo de trabalho", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        pt: "Comece por editar",
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "pt": "Comece por editar",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> As declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação desde que sejam incluídas no diretório `contentDir` (por padrão, `./src`). E que correspondam à extensão de ficheiro de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>

<Step number={6} title="Utilizar Conteúdo no Seu Código">

Aceda aos seus dicionários de conteúdo em toda a sua aplicação:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** é montado uma vez, no layout raiz. Ele fornece a locale para componentes de servidor e cliente, então as páginas não se envolvem mais.
- Sem um segmento de caminho `[locale]`, a locale sempre vem da requisição — o header `x-intlayer-locale` definido pelo proxy Intlayer, depois o cookie de locale — que os server hooks leem por conta própria quando o provider não foi executado.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** é usado para fornecer a locale aos componentes do lado do cliente. Pode ser colocado em qualquer componente pai, incluindo o layout. No entanto, recomenda-se colocá-lo no layout porque o Next.js compartilha o código do layout entre páginas, tornando-o mais eficiente. Ao usar o `IntlayerClientProvider` no layout, você evita reinicializá-lo para cada página, melhorando o desempenho e mantendo um contexto de localização consistente em toda a sua aplicação.
- **`IntlayerServerProvider`** é usado para fornecer o locale aos filhos do servidor. Não pode ser definido no layout.

  > Layout e página não podem compartilhar um contexto de servidor comum porque o sistema de contexto de servidor baseia-se num armazenamento de dados por requisição (via [cache do React](https://react.dev/reference/react/cache)), fazendo com que cada "context" seja recriado para diferentes segmentos da aplicação. Colocar o provider num layout partilhado quebraria esse isolamento, impedindo a propagação correta dos valores do contexto de servidor para os seus componentes de servidor.

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Cria a declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` é o caminho de importação isomórfico: a condição de exportação `react-server` fornece aos componentes de servidor a implementação de locale ambiente, enquanto os componentes de cliente obtêm a implementação baseada em contexto. A mesma chamada funciona em ambos os lados.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Criar declaração de conteúdo relacionada

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> Se quiser usar o seu conteúdo num atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., deve chamar o valor da função, por exemplo:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={7} title="Configurar Proxy para Detecção de Locale" isOptional={true}>

Configure o proxy para detetar a locale preferida do usuário:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> O `intlayerProxy` é usado para detectar a localidade preferida do usuário e redirecioná-lo para a URL apropriada conforme especificado na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md). Além disso, permite salvar a localidade preferida do usuário em um cookie.

> Desde Intlayer v9, este middleware respeita a opção `routing.enableProxy` (`true` por padrão). Defina `routing.enableProxy: false` na sua configuração para transformá-lo em um pass-through sem remover este arquivo. Veja as [notas de lançamento da v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/releases/v9.md).

> Se precisar encadear vários proxies juntos (por exemplo, `intlayerProxy` com autenticação ou proxies customizados), o Intlayer agora fornece um helper chamado `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Alterar o idioma do seu conteúdo" isOptional={true}>

Para alterar o idioma do seu conteúdo no Next.js, a forma recomendada é usar o componente `Link` para redirecionar os utilizadores para a página localizada apropriada. O componente `Link` permite o prefetch da página, o que ajuda a evitar um recarregamento completo.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Locale, ex.: FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma em seu próprio locale, ex.: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no locale atual, ex.: Francés com o locale atual definido para Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em inglês - ex.: Francês */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Uma forma alternativa é usar a função `setLocale` fornecida pelo hook `useLocale`. Essa função não permitirá o prefetch da página. Consulte a [documentação do hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useLocale.md) para mais detalhes.

> Referências da documentação:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` atributo](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` atributo](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` atributo](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` atributo](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Obter a locale atual em Server Actions" isOptional={true}>

Se precisar da locale ativa dentro de uma Server Action (por exemplo, para localizar e-mails ou executar lógica dependente da locale), chame `getLocale` de `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Faça algo com o locale
};
```

> A função `getLocale` segue uma estratégia em cascata para determinar a locale do utilizador:
>
> 1. Primeiro, verifica os cabeçalhos da requisição à procura de um valor de locale que pode ter sido definido pelo proxy
> 2. Se nenhum locale for encontrado nos cabeçalhos, procura um locale armazenado em cookies
> 3. Se nenhum cookie for encontrado, tenta detetar a língua preferida do utilizador a partir das definições do navegador
> 4. Como último recurso, recorre ao locale predefinido configurado na aplicação
>
> Isso garante que o idioma mais apropriado seja selecionado com base no contexto disponível.

</Step>

<Step number={10} title="Otimize o tamanho do bundle" isOptional={true}>

Quando usar o `next-intlayer`, os dicionários são incluídos no bundle de cada página por padrão. Para otimizar o tamanho do bundle, o Intlayer fornece um plugin SWC opcional que substitui inteligentemente chamadas a `useIntlayer` usando macros. Isso garante que os dicionários sejam incluídos apenas nos bundles das páginas que realmente os utilizam.

Para habilitar essa otimização, instale o pacote `@intlayer/swc`. Uma vez instalado, o `next-intlayer` detectará e usará automaticamente o plugin:

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

> Observação: Esta otimização está disponível apenas para Next.js 13 e versões superiores.

> Observação: Este pacote não é instalado por padrão porque plugins SWC ainda são experimentais no Next.js. Isso pode mudar no futuro.

> Observação: Se você definir a opção como `importMode: 'dynamic'` ou `importMode: 'fetch'` (in the `dictionary` configuration), ela dependerá de `Suspense`, portanto você terá que envolver suas chamadas `useIntlayer` em um limite `Suspense`. Isso significa que você não poderá usar `useIntlayer` diretamente no nível superior do seu componente Page/Layout.

</Step>

</Steps>

### Monitorar mudanças nos dicionários com Turbopack

Quando estiver a usar o Turbopack como servidor de desenvolvimento com o comando `next dev`, as alterações nos dicionários não serão detetadas automaticamente por padrão.

Esta limitação ocorre porque o Turbopack não consegue executar plugins do webpack em paralelo para monitorizar alterações nos seus ficheiros de conteúdo. Para contornar isto, terá de usar o comando `intlayer watch` para executar simultaneamente o servidor de desenvolvimento e o watcher de build do Intlayer.

```json5 fileName="package.json"
{
  // ... As suas configurações existentes do package.json
  "scripts": {
    // ... As suas configurações de scripts existentes
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Se você estiver usando next-intlayer@<=6.x.x, é necessário manter a flag `--turbopack` para que a aplicação Next.js 16 funcione corretamente com o Turbopack. Recomendamos usar next-intlayer@>=7.x.x para evitar essa limitação.

### Configurar TypeScript

O Intlayer usa module augmentation para tirar proveito do TypeScript e tornar sua codebase mais robusta.

![Autocompletação](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erro de tradução](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Certifique-se de que sua configuração do TypeScript inclua os tipos autogerados.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Incluir os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

Recomenda-se ignorar os ficheiros gerados pelo Intlayer. Isto permite evitar comitar estes ficheiros no seu repositório Git.

Para isso, pode adicionar as seguintes instruções ao ficheiro `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os ficheiros gerados pelo Intlayer
.intlayer
```

### Extensão do VS Code

Para melhorar a sua experiência de desenvolvimento com o Intlayer, pode instalar a extensão oficial **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletion** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções em falta.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Ir mais longe

Para ir mais longe, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um app Next.js?">

O campo `i18n` do `next.config.js` não se aplica ao App Router, portanto a camada de localização é sempre uma escolha de biblioteca:

- **`next-intl`**, **`next-i18next` / `i18next`** e **`react-intl`**: catálogos JSON ou ICU carregados por namespace.
- **`Lingui`**: orientado à extração, com mensagens ICU compiladas em tempo de build.
- **`Intlayer`**: a solução mais avançada. O conteúdo pode ser declarado em qualquer lugar da sua base de código ([ao lado de cada componente ou centralizado](https://intlayer.org/blog/per-component-vs-centralized-i18n)), compilado por componente, totalmente tipado, com tradução por IA, editor visual e CMS.

Este guia cobre a configuração sem locale no caminho da URL. Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) e o [benchmark de i18n do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle do Next.js?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. Os Server Components resolvem seu conteúdo no servidor, e o compilador de build substitui as chamadas `useIntlayer` pelas entradas exatas do dicionário usadas pelo componente, descartando chaves e idiomas não utilizados, enquanto os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas habituais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md).

</Question>

<Question title="Posso migrar do next-intl, next-i18next ou i18next sem reescrever meus componentes?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md) ou o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md). Ou pode manter sua API atual inteiramente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma API que `next-intl`, `react-i18next` e `react-intl`, mas servidos por dicionários Intlayer, de modo que apenas as importações mudam e o código dos componentes permanece idêntico.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus componentes, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma.

Para um fluxo de trabalho totalmente automatizado, o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) faz o mesmo em tempo de build: ele analisa seu código JSX, TSX, Vue e Svelte a cada alteração, gera os dicionários e os mantém sincronizados via hot module replacement, dispensando completamente a manutenção manual de chaves.

Dois limites são importantes considerar: o compilador opera por análise estática, de modo que strings criadas apenas em tempo de execução (como códigos de erro de API ou campos dinâmicos de CMS) ficam fora de alcance. Além disso, ele precisa distinguir texto visível de lógicas de aplicação como `className="active"` ou status codes, exigindo algumas anotações em bases de código extensas. O [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) evita ambos mantendo você no controle.

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="Por que eu disponibilizaria meu aplicativo sem locale na URL?">

Porque o locale nem sempre faz parte da identidade da página. Um painel autenticado, uma ferramenta interna ou um aplicativo protegido por login não tem motivo para exibir `/pt/` em cada URL: o idioma é uma preferência do usuário, não um documento diferente. Remover o prefixo também mantém suas rotas, links e análises em um conjunto unificado de caminhos.

</Question>

<Question title="Quais são as consequências para o SEO de não ter um locale na URL?">

Elas são reais, então decida conscientemente. Sem uma URL distinta por idioma, os mecanismos de busca não têm páginas separadas para indexar cada locale, as tags `hreflang` não têm para onde apontar e os rastreadores enxergam apenas o idioma servido pela sua detecção padrão. Isso funciona perfeitamente para áreas autenticadas (que não são indexadas de qualquer forma), mas não é recomendado para sites institucionais, blogs ou documentações públicas. Se o tráfego orgânico por idioma for essencial, utilize a configuração com prefixo descrita no [guia do Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md).

</Question>

<Question title="Qual é a diferença entre os modos no-prefix e search-params?">

O modo `"no-prefix"` remove o locale completamente da URL e o resolve a partir de cookies, cabeçalhos HTTP ou domínios, de modo que todos os idiomas compartilhem o mesmo endereço. O modo `"search-params"` adiciona o locale na query string como `/dashboard?locale=pt`, o que ainda fornece a cada idioma uma URL distinta, compartilhável e marcável como favorito sem alterar a árvore de rotas. Prefira `"search-params"` se você quiser links compartilháveis por idioma.

</Question>

<Question title="Como o locale é detectado então?">

A partir das fontes listadas em `routing.storage`: por padrão, primeiro em um cookie e depois no cabeçalho `Accept-Language`, com fallback para o locale padrão. O passo 7 adiciona o proxy que aplica essa resolução. A escolha explícita feita pelo usuário é salva, persistindo nas próximas visitas. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="Posso mapear cada idioma para seu próprio domínio?">

Sim, e é a opção ideal se você removeu o prefixo por estética mas ainda deseja otimização completa para SEO. O `routing.domains` mapeia cada locale a um hostname, de forma que o próprio domínio identifica o idioma, nenhum prefixo é adicionado ao caminho e cada idioma recebe uma URL indexável para onde o `hreflang` pode apontar.

</Question>

<Question title="Como traduzo o app automaticamente com IA?">

Execute `npx intlayer fill`. O comando preenche traduções ausentes com o LLM de sua preferência, usando seu próprio provedor e chave de API, e o parâmetro `--git-diff` restringe a execução ao conteúdo alterado na branch. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="O Intlayer suporta plurais, gênero e rich text?">

Sim: [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md) e [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Como tradutores podem editar o conteúdo sem tocar no código?">

Por meio do [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), que roda em sua própria infraestrutura e permite editar textos diretamente no app em execução, ou pelo [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), que externaliza o conteúdo para que ele possa ser alterado sem a necessidade de novos deploys.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O CMS hospedado é um serviço pago opcional que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
