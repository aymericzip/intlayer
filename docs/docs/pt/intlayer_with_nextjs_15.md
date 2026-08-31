---
createdAt: 2024-12-06
updatedAt: 2026-08-30
title: "Next.js 15 i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Next.js 15 multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js 15
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 15
applicationTemplate: https://github.com/aymericzip/intlayer-next-15-template
applicationShowcase: https://next-15-intlayer-template-xt83.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionar comando init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Traduza seu site Next.js 15 usando Intlayer | Internacionalização (i18n)

## Tabela de Conteúdos

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

## Guia passo a passo para configurar o Intlayer em uma aplicação Next.js

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="A melhor solução i18n para Next.js? Descubra Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-15-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como Internacionalizar sua aplicação usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://next-15-intlayer-template-xt83.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-15-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja [Application Template](https://github.com/aymericzip/intlayer-next-15-template) no GitHub.

<Steps>

<Step number={1} title="Instalar dependências">

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
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

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpiração e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **next-intlayer**

  O pacote que integra o Intlayer com o Next.js. Ele fornece provedores de contexto e hooks para internacionalização no Next.js. Além disso, inclui o plugin do Next.js para integrar o Intlayer com [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), bem como middleware para detectar o idioma preferido do usuário, gerenciar cookies e lidar com redirecionamento de URL.

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

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_no_locale_path.md) for more details.

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

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desabilitar logs do Intlayer no console, e muito mais. Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={3} title="Integre o Intlayer na sua Configuração Next.js">

Configure seu setup Next.js para usar o Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* opções de configuração aqui */};

export default withIntlayer(nextConfig);
```

> O plugin `withIntlayer()` do Next.js é usado para integrar o Intlayer com o Next.js. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define variáveis de ambiente do Intlayer dentro dos ambientes [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Além disso, fornece aliases para otimizar o desempenho e assegura compatibilidade com componentes de servidor.

> A função `withIntlayer()` é uma função promise. Ela permite preparar os dicionários intlayer antes do início da build. Se você quiser usá-la com outros plugins, você pode fazer await dela. Exemplo:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Se você quiser usá-la de forma síncrona, você pode usar a função `withIntlayerSync()`. Exemplo:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

</Step>

<Step number={4} title="Definir Rotas Dinâmicas de Locale">

Remova tudo do `RootLayout` e substitua pelo seguinte código:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

> Manter o componente `RootLayout` vazio permite definir os atributos [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) e [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) na tag `<html>`.

Para implementar o roteamento dinâmico, forneça o caminho para o locale adicionando um novo layout no seu diretório `[locale]`:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Um único `IntlayerProvider` cobre ambas as metades da árvore: ele alimenta o contexto do servidor com escopo de requisição lido pelos hooks do servidor e monta o provedor do cliente para que os componentes do cliente recebam a mesma localidade.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

 </Tab>
</Tabs>

> O segmento de caminho `[locale]` é usado para definir o locale. Exemplo: `/en-US/about` se referirá a `en-US` e `/fr/about` a `fr`.

> Nesta etapa, você encontrará o erro: `Error: Missing <html> and <body> tags in the root layout.`. Isso é esperado porque o arquivo `/app/page.tsx` não está mais em uso e pode ser removido. Em vez disso, o segmento de caminho `[locale]` ativará a página `/app/[locale]/page.tsx`. Consequentemente, as páginas estarão acessíveis via caminhos como `/en`, `/fr`, `/es` no seu navegador. Para definir o locale padrão como a página raiz, consulte a configuração do `middleware` no passo 7.

Então, implemente a função `generateStaticParams` no Layout da sua aplicação.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Linha a inserir

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Resto do código*/
};

export default LocaleLayout;
```

> `generateStaticParams` garante que sua aplicação pré-construa as páginas necessárias para todos os locais, reduzindo o cálculo em tempo de execução e melhorando a experiência do usuário. Para mais detalhes, consulte a [documentação do Next.js sobre generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> O Intlayer funciona com `export const dynamic = 'force-static';` para garantir que as páginas sejam pré-construídas para todos os locales.

</Step>

<Step number={5} title="Declare Seu Conteúdo">

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

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
    "pageLink": "src/app/page.tsx"
  }
}
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>

<Step number={6} title="Utilize o Conteúdo no Seu Código">

Acesse seus dicionários de conteúdo em toda a sua aplicação:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** é montado uma vez, no layout da localidade. Fornece a localidade para componentes de servidor e cliente, portanto as páginas não se envolvem mais.
- Os hooks do servidor resolvem a localidade nesta ordem: a localidade passada no local da chamada, depois o contexto do servidor semeado pelo provedor, depois a localidade carregada pela requisição (o cabeçalho `x-intlayer-locale` definido pelo proxy do Intlayer, depois o cookie de localidade). Essa última etapa é o que mantém o conteúdo correto em uma navegação do lado do cliente que renderiza novamente apenas o segmento de página, onde o layout — e com ele o provedor — não é executado novamente.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

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
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** é usado para fornecer a localidade aos componentes do lado do cliente. Ele pode ser colocado em qualquer componente pai, incluindo o layout. No entanto, recomenda-se colocá-lo em um layout porque o Next.js compartilha o código do layout entre as páginas, tornando-o mais eficiente. Ao usar o `IntlayerClientProvider` no layout, você evita reinicializá-lo para cada página, melhorando o desempenho e mantendo um contexto de localização consistente em toda a sua aplicação.
- **`IntlayerServerProvider`** é usado para fornecer a localidade aos filhos do servidor. Ele não pode ser definido no layout.

  > Layout e página não podem compartilhar um contexto de servidor comum porque o sistema de contexto do servidor é baseado em um armazenamento de dados por requisição (via mecanismo de [cache do React](https://react.dev/reference/react/cache)), fazendo com que cada "contexto" seja recriado para diferentes segmentos da aplicação. Colocar o provider em um layout compartilhado quebraria esse isolamento, impedindo a propagação correta dos valores do contexto do servidor para seus componentes de servidor.

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Criar declaração de conteúdo relacionado

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

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Criar declaração de conteúdo relacionado

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` é o caminho de importação isomórfico: a condição de exportação `react-server` oferece aos componentes de servidor a implementação de locale ambiente, enquanto os componentes de cliente obtêm a baseada em contexto. A mesma chamada funciona em ambos os lados.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Criar declaração de conteúdo relacionado

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

> Se você quiser usar seu conteúdo em um atributo do tipo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você deve chamar o valor da função, assim:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={7} title="Configurar Middleware para Detecção de Localidade" isOptional={true}>

Configure o middleware para detectar a localidade preferida do usuário:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> O `intlayerMiddleware` é usado para detectar a localidade preferida do usuário e redirecioná-lo para a URL apropriada conforme especificado na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md). Além disso, permite salvar a localidade preferida do usuário em um cookie.

> Desde o Intlayer v9, este middleware respeita a opção `routing.enableProxy` (`true` por padrão). Defina `routing.enableProxy: false` em sua configuração para transformá-lo em um pass-through sem remover este arquivo. Consulte as [notas de lançamento da v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/releases/v9.md).

> Se precisar encadear vários middlewares juntos (por exemplo, `intlayerMiddleware` com autenticação ou middlewares personalizados), o Intlayer agora fornece um helper chamado `multipleMiddlewares`.

```ts
import {
  multipleMiddlewares,
  intlayerMiddleware,
} from "next-intlayer/middleware";
import { customMiddleware } from "@utils/customMiddleware";

export const middleware = multipleMiddlewares([
  intlayerMiddleware,
  customMiddleware,
]);
```

</Step>

<Step number={8} title="Internacionalização dos seus metadados" isOptional={true}>

No caso de você querer internacionalizar seus metadados, como o título da sua página, você pode usar a função `generateMetadata` fornecida pelo Next.js. Dentro dela, você pode recuperar o conteúdo da função `getIntlayer` para traduzir seus metadados.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
          "pt": "Logotipo Preact"
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "pt": "Gerado por create next app"
      },
    },
  },
};
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
   *  *   es: '/es/about',
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

// ... Resto do código
````

> Note que a função `getIntlayer` importada de `next-intlayer` retorna seu conteúdo encapsulado em um `IntlayerNode`, permitindo a integração com o editor visual. Em contraste, a função `getIntlayer` importada de `intlayer` retorna seu conteúdo diretamente, sem propriedades adicionais.

> Saiba mais sobre a otimização de metadados [na documentação oficial do Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Internacionalização do seu sitemap.xml e robots.txt" isOptional={true}>

Para internacionalizar seu `sitemap.xml` e `robots.txt`, você pode usar a função `getMultilingualUrls` fornecida pelo Intlayer. Essa função permite gerar URLs multilíngues para seu sitemap.

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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

// Obtém todas as URLs multilíngues a partir de uma lista de URLs
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Configuração do arquivo robots.txt com regras para rastreadores
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Bloqueia páginas de login e registro
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Saiba mais sobre a otimização do sitemap [na documentação oficial do Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Saiba mais sobre a otimização do robots.txt [na documentação oficial do Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Alterar o idioma do seu conteúdo" isOptional={true}>

Para alterar o idioma do seu conteúdo no Next.js, a forma recomendada é usar o componente `Link` para redirecionar os usuários para a página localizada apropriada. O componente `Link` permite o pré-carregamento da página, o que ajuda a evitar um recarregamento completo da página.

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
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Local - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma no seu próprio Local - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no Local atual - ex. Francés com o local atual definido para Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Uma forma alternativa é usar a função `setLocale` fornecida pelo hook `useLocale`. Essa função não permitirá o pré-carregamento da página e recarregará a página.

> Nesse caso, sem redirecionamento usando `router.push`, apenas o seu código do lado do servidor mudará o idioma do conteúdo.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Resto do código

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Mudar para Francês</button>
);
```

> Referências da documentação:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getHTMLTextDir.md)
> - [Atributo `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [Atributo `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [Atributo `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [Atributo `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Criando um Componente de Link Localizado" isOptional={true}>

Para garantir que a navegação da sua aplicação respeite o idioma atual, você pode criar um componente `Link` personalizado. Este componente adiciona automaticamente o prefixo do idioma atual às URLs internas. Por exemplo, quando um usuário que fala francês clica em um link para a página "Sobre", ele é redirecionado para `/fr/about` em vez de `/about`.

Esse comportamento é útil por várias razões:

- **SEO e Experiência do Usuário**: URLs localizadas ajudam os motores de busca a indexar corretamente páginas específicas por idioma e fornecem aos usuários conteúdo no idioma de sua preferência.
- **Consistência**: Ao usar um link localizado em toda a sua aplicação, você garante que a navegação permaneça dentro do idioma atual, evitando mudanças inesperadas de idioma.
- **Manutenção**: Centralizar a lógica de localização em um único componente simplifica o gerenciamento das URLs, tornando sua base de código mais fácil de manter e expandir conforme sua aplicação cresce.

Abaixo está a implementação de um componente `Link` localizado em TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Função utilitária para verificar se uma URL dada é externa.
 * Se a URL começar com http:// ou https://, é considerada externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Um componente Link personalizado que adapta o atributo href com base no idioma atual.
 * Para links internos, ele usa `getLocalizedUrl` para prefixar a URL com o idioma (ex: /fr/about).
 * Isso garante que a navegação permaneça dentro do mesmo contexto de idioma.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se o link for interno e um href válido for fornecido, obtenha a URL localizada.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Como Funciona

- **Detectando Links Externos**:  
  A função auxiliar `checkIsExternalLink` determina se uma URL é externa. Links externos são mantidos inalterados porque não precisam de localização.

- **Recuperando a Localização Atual**:  
  O hook `useLocale` fornece a localidade atual (por exemplo, `fr` para francês).

- **Localizando a URL**:  
  Para links internos (ou seja, não externos), `getLocalizedUrl` é usado para prefixar automaticamente a URL com a localidade atual. Isso significa que, se o usuário estiver em francês, passar `/about` como `href` será transformado em `/fr/about`.

- **Retornando o Link**:  
  O componente retorna um elemento `<a>` com a URL localizada, garantindo que a navegação seja consistente com a localidade.

Ao integrar este componente `Link` em toda a sua aplicação, você mantém uma experiência de usuário coerente e consciente do idioma, além de se beneficiar de uma melhor SEO e usabilidade.

</Step>

<Step number={12} title="Otimize o tamanho do seu bundle" isOptional={true}>

Se você precisar da locale ativa dentro de uma Server Action (por exemplo, para localizar emails ou executar lógica dependente da locale), chame `getLocale` de `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Fazer algo com o locale
};
```

> A função `getLocale` segue uma estratégia em cascata para determinar a localidade do usuário:
>
> 1. Primeiro, ela verifica os headers da requisição em busca de um valor de localidade que possa ter sido definido pelo middleware
> 2. Se nenhuma localidade for encontrada nos headers, procura por uma localidade armazenada em cookies
> 3. Se nenhum cookie for encontrado, tenta detectar o idioma preferido do usuário a partir das configurações do navegador
> 4. Como último recurso, volta à localidade padrão configurada da aplicação
>
> Isso garante que a localidade mais apropriada seja selecionada com base no contexto disponível.

</Step>

<Step number={13} title="Otimizar o tamanho do seu bundle" isOptional={true}>

Ao usar o `next-intlayer`, os dicionários são incluídos no bundle para cada página por padrão. Para otimizar o tamanho do bundle, o Intlayer fornece um plugin SWC opcional que substitui inteligentemente as chamadas `useIntlayer` usando macros. Isso garante que os dicionários sejam incluídos apenas nos bundles das páginas que realmente os utilizam.

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

> Nota: Esta otimização está disponível apenas para Next.js 13 e versões superiores.

> Nota: Este pacote não é instalado por padrão porque os plugins SWC ainda são experimentais no Next.js. Isso pode mudar no futuro.
> </Step>

> Nota: Se você definir a opção como `importMode: 'dynamic'` ou `importMode: 'fetch'` (na configuração `dictionary`), ela dependerá de Suspense, então você terá que envolver suas chamadas `useIntlayer` em um limite `Suspense`. Isso significa que você não poderá usar o `useIntlayer` diretamente no nível superior do seu componente Page / Layout.
> </Step>

</Steps>

### Monitorar alterações de dicionários no Turbopack

Ao usar o Turbopack como seu servidor de desenvolvimento com o comando `next dev --turbopack`, as alterações de dicionário não serão detectadas automaticamente por padrão.

Esta limitação ocorre porque o Turbopack não consegue executar plugins webpack em paralelo para monitorar alterações em seus arquivos de conteúdo. Para contornar isso, você precisará usar o comando `intlayer watch` para executar tanto o servidor de desenvolvimento quanto o observador de build do Intlayer simultaneamente.

```json5 fileName="package.json"
{
  // ... Suas configurações existentes de package.json
  "scripts": {
    // ... Suas configurações de scripts existentes
    "dev": "intlayer watch --with 'next dev --turbopack'",
  },
}
```

### Configurar TypeScript

O Intlayer utiliza a ampliação de módulos para aproveitar os benefícios do TypeScript e tornar sua base de código mais robusta.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

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

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite evitar que eles sejam commitados no seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

### Extensão VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial do Intlayer para VS Code**.

[Instalar no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Ir Além

Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um app Next.js 15?">

O campo `i18n` do `next.config.js` não se aplica ao App Router, portanto a escolha da biblioteca de localização é sempre necessária:

- **`next-intl`**, **`next-i18next` / `i18next`** e **`react-intl`**: as opções históricas, baseadas em catálogos de mensagens JSON ou ICU carregados por namespace.
- **`Lingui`**: orientado à extração, com mensagens ICU compiladas em tempo de build.
- **`Intlayer`**: a solução mais avançada. O conteúdo pode ser declarado em qualquer lugar da sua base de código ([ao lado de cada componente ou centralizado](https://intlayer.org/blog/per-component-vs-centralized-i18n)), compilado em tempo de build em dicionários por componente, totalmente tipado, com tradução por IA, editor visual e CMS incluídos.

A diferença prática está no que chega ao navegador. Bibliotecas baseadas em namespace enviam catálogos JSON inteiros para a página, enquanto o Intlayer envia apenas o conteúdo que os componentes renderizados utilizam, reduzindo o tamanho do bundle e da página em até 50%. Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) e o [benchmark de i18n do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md).

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

Não. Execute `npx intlayer extract` e o Intlayer lê seus arquivos de origem, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma. Consulte o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

Para um fluxo de trabalho totalmente automatizado, o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) faz o mesmo em tempo de build em arquivos JSX, TSX, Vue e Svelte, gerando os dicionários a cada alteração, sem manutenção manual de chaves. Ele funciona por análise estática, de modo que strings dinâmicas em tempo de execução permanecem fora de alcance, necessitando de algumas anotações para separar texto de interface de lógica da aplicação.

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="Quais versões do Next.js o Intlayer suporta?">

Next.js 12, 13, 14, 15 e 16. Este guia aborda o Next.js 15. Para o Next.js 16, siga o [guia do Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md). Para o Next.js 14, siga o [guia do Next.js 14](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_14.md). Para o Pages Router, siga o [guia do Pages Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_page_router.md).

</Question>

<Question title="O Intlayer funciona com React Server Components?">

Sim. O Next.js 15 torna `params` uma Promise em layouts e páginas, e este guia faz o `await` antes de passar o locale para o provedor. O conteúdo é resolvido no servidor dentro dos Server Components, portanto nenhum dicionário é enviado ao cliente para textos renderizados no servidor, e os Client Components leem os mesmos dicionários por meio do provedor.

</Question>

<Question title="Preciso colocar o locale na URL, como /pt/about?">

Não. O `routing.mode` aceita `"prefix-no-default"` (o padrão, `/about` para o locale padrão e `/pt/about` para os demais), `"prefix-all"`, `"no-prefix"` (resolvido a partir de cookie, header ou domínio) e `"search-params"` (`/about?locale=pt`). O `routing.domains` mapeia cada locale para seu próprio domínio. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) e o [guia sem caminho de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_no_locale_path.md).

</Question>

<Question title="Como adiciono tags hreflang e metadados localizados para SEO?">

O passo 8 cobre `generateMetadata`, e o passo 9 aborda `sitemap.xml` e `robots.txt`. O helper `getMultilingualUrls` constrói o mapa `alternates.languages` para cada locale declarado, incluindo a entrada `x-default`, para que os mecanismos de busca entreguem a versão de idioma correta.

</Question>

<Question title="Eu preciso do middleware?">

Ele é quem detecta o locale do visitante e o redireciona para o prefixo correspondente, sendo essencial a menos que você gerencie o roteamento de locales por conta própria. O passo 7 mostra a configuração, incluindo o matcher que ignora rotas de API, assets estáticos e `_next`.

</Question>

<Question title="Como construo um componente Link localizado?">

O passo 11 demonstra isso. O componente envolve o `Link` do Next.js e passa o `href` por meio de `getLocalizedUrl`, transformando um link interno escrito como `/about` em `/pt/about` para um visitante em português sem que você precise repetir o locale em cada chamada.

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
