---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "TanStack Start i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação TanStack Start multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Roteamento por Locale
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Comparar a resolução estática, dinâmica e dinâmica em cache dos dicionários de metadados nas funções head das rotas"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionar comando init"
  - version: 7.4.0
    date: 2025-12-11
    changes: "Introduz validatePrefix e adiciona o passo 14: Tratamento de páginas 404 com rotas localizadas."
  - version: 7.3.9
    date: 2025-12-05
    changes: "Adiciona o passo 13: Recuperar o locale em suas server actions (Opcional)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "Adiciona o passo 13: Adaptar Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "Fix prefix default ao adicionar a função getPrefix useLocalizedNavigate, LocaleSwitcher e LocalizedLink."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Atualizar doc"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Adicionado para Tanstack Start"
author: aymericzip
---

# Traduza seu Tanstack Start com Intlayer | Internacionalização (i18n)

## Índice

<TOC/>

Este guia demonstra como integrar o **Intlayer** para uma internacionalização perfeita em projetos Tanstack Start com roteamento sensível ao locale, suporte a TypeScript e práticas modernas de desenvolvimento.

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `react-i18next` ou `use-intl`, ou `paraglide`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>
<Accordion header="Cobertura total do TanStack Start">

O Intlayer é totalmente otimizado para TanStack Start, fornecendo **roteamento multilíngue**, **gerenciamento de cookies**, **geração de mapa de site**, **carregamento dinâmico de conteúdo** e todos os recursos necessários para escalar seus esforços de internacionalização (i18n).

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

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="A melhor solução i18n para Tanstack Start? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar sua aplicação usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja o [Template de aplicação](https://github.com/aymericzip/intlayer-tanstack-start-template) no GitHub.

<Steps>

<Step number={1} title="Criar o Projeto">

Comece criando um novo projeto TanStack Start seguindo o guia [Iniciar novo projeto](https://tanstack.com/start/latest/docs/framework/react/quick-start) no site do TanStack Start.

</Step>

<Step number={2} title="Instalar os Pacotes do Intlayer">

Instale os pacotes necessários usando seu gerenciador de pacotes preferido:

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpiração e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **react-intlayer**
  O pacote que integra o Intlayer com aplicações React. Ele fornece provedores de contexto e hooks para internacionalização em React.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), assim como middleware para detectar o locale preferido do usuário, gerenciar cookies e lidar com redirecionamento de URLs.

</Step>

<Step number={3} title="Configuração do seu projeto">

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desabilitar logs do Intlayer no console, e muito mais. Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={4} title="Integre o Intlayer na sua Configuração do Vite">

Adicione o plugin intlayer na sua configuração:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> O plugin `intlayer()` para Vite é usado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define as variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

</Step>

<Step number={5} title="Criar Layout Raiz">

Configure seu layout raiz para suportar internacionalização usando `useParams` para detectar o locale atual e configurando os atributos `lang` e `dir` na tag `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>

<Step number={6} title="Criar Layout de Localidade">

Crie um layout que lide com o prefixo de locale e realize a validação.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Validar o prefixo de locale
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> Aqui, `{-$locale}` é um parâmetro de rota dinâmica que é substituído pelo locale atual. Esta notação torna o slot opcional, permitindo que funcione com modos de roteamento como `'prefix-no-default'`, etc.

> Esteja ciente de que este slot pode causar problemas se você usar múltiplos segmentos dinâmicos na mesma rota (ex: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Para o modo `'prefix-all'`, você pode preferir mudar o slot para `$locale` em vez disso.
> Para o modo `'no-prefix'` ou `'search-params'`, você pode remover o slot inteiramente.

</Step>

<Step number={7} title="Declare Seu Conteúdo">

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un exemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemplo d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
export default appContent;
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação assim que forem incluídas no diretório `contentDir` (por padrão, `./app`). E devem corresponder à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>

<Step number={8} title="Crie Componentes e Hooks Sensíveis ao Locale">

Crie um componente `LocalizedLink` para navegação sensível ao locale:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

Este componente tem dois objetivos:

- Remover o prefixo `{-$locale}` desnecessário da URL.
- Injetar o parâmetro de locale na URL para garantir que o usuário seja redirecionado diretamente para a rota localizada.

Então, podemos criar um hook `useLocalizedNavigate` para navegação programática:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="Utilize o Intlayer em Suas Páginas">

> Use **`useIntlayer`** por padrão: é a forma recomendada de ler conteúdo dentro dos componentes, e o compilador o resolve para a localidade que está sendo renderizada. Recorra a `getIntlayer` / `getIntlayerAsync` apenas fora da árvore React: o `head` das rotas, os loaders e as server functions.

Acesse seus dicionários de conteúdo em toda a sua aplicação:

#### Página Inicial Localizada

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> Se você deseja usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você pode usar o valor da função, como:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={9} title="Criar um Componente de Alternador de Localidade">

Crie um componente para permitir que os usuários alterem idiomas:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* Localidade - ex. FR */}
              {localeEl}
            </span>
            <span>
              {/* Idioma em sua própria localidade - ex. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Idioma em localidade atual - ex. Francés com localidade atual definida como Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em inglês - ex. French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Para saber mais sobre o hook `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md).

</Step>

<Step number={10} title="Gerenciamento de Atributos HTML">

Como visto na Etapa 5, você pode gerenciar os atributos `lang` e `dir` da tag `html` usando `useParams` no seu componente raiz. Isso garante que os atributos corretos sejam definidos no servidor e no cliente.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

</Step>

<Step number={11} title="Adicionar middleware">

Você também pode usar `intlayerProxy` para adicionar roteamento no servidor à sua aplicação. Este plugin detectará automaticamente a localidade atual com base na URL e definirá o cookie de localidade apropriado. Se nenhuma localidade for especificada, o plugin determinará a localidade mais apropriada com base nas preferências de idioma do navegador do usuário. Se nenhuma localidade for detectada, ela será redirecionada para a localidade padrão.

> Observe que para usar `intlayerProxy` em produção, você precisa mudar o package `vite-intlayer` de `devDependencies` para `dependencies`.

> Desde o Intlayer v9, `intlayerProxy()` está agrupado diretamente no plugin `intlayer()` e ativado por padrão através da opção `routing.enableProxy` (`true` por padrão). Registrá-lo separadamente como mostrado abaixo é agora opcional: é mantido para compatibilidade com versões anteriores e para setups que precisam controlar a ordem dos plugins. Defina `routing.enableProxy: false` para desativar. Consulte as [notas de lançamento v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});
```

</Step>

<Step number={12} title="Internacionalizar seus Metadados">

<Tabs>

<Tab label="Resolução estática" value="static">

`getIntlayer` resolve de forma síncrona contra o dicionário **mesclado**, aquele que contém cada localidade declarada. `head` permanece síncrono e nada é aguardado, mas todo o dicionário multilíngue é incorporado ao chunk de rota enviado ao navegador.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // O caminho para esta rota

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Link canônico: aponta para a página localizada atual
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: informar ao Google sobre todas as versões localizadas
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: para usuários em idiomas não correspondidos
        // Define a localidade de fallback padrão (geralmente seu idioma principal)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

Melhor para pequenos dicionários de metadados, um punhado de localidades ou durante prototipagem.

</Tab>

<Tab label="Resolução dinâmica" value="dynamic">

`getIntlayerAsync` (disponível a partir de **v9.4**) se comporta como `getIntlayer`, mas o plugin de build a aponta para o chunk por localidade em `.intlayer/dynamic_dictionaries/` em vez do dicionário mesclado. Uma página, portanto, envia apenas a localidade que renderiza. Como esse chunk é carregado sob demanda, `head` se torna `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // O caminho para esta rota

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Link canônico: aponta para a página localizada atual
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: informar ao Google sobre todas as versões localizadas
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: para usuários em idiomas não correspondidos
        // Define a localidade de fallback padrão (geralmente seu idioma principal)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> Se um `head` lê vários dicionários, resolva-os com `Promise.all`: aguardar cada `getIntlayerAsync` em sua própria linha encadeia as solicitações em vez de executá-las em paralelo.

O trade-off: a importação dinâmica é resolvida enquanto `head` é executado, no caminho crítico da renderização do documento. Em uma rota fria isso atrasa o head por alguns milissegundos e pode degradar ligeiramente o **LCP**.

</Tab>

<Tab label="Resolução dinâmica em cache" value="cached">

Resolva o dicionário no `loader` da rota e leia-o de volta de `loaderData` em `head`. Os loaders das rotas correspondidas são executados em paralelo e `staleTime: Infinity` diz ao TanStack Router que o resultado nunca fica obsoleto, então o chunk por localidade é resolvido uma vez e servido do cache do roteador depois, deixando `head` síncrono.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Resolvido em paralelo com as outras rotas correspondidas, fora do caminho crítico do head
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // O dicionário nunca muda para uma determinada localidade: resolver o chunk uma vez
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // O caminho para esta rota

    return {
      links: [
        // Link canônico: aponta para a página localizada atual
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: informar ao Google sobre todas as versões localizadas
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: para usuários em idiomas não correspondidos
        // Define a localidade de fallback padrão (geralmente seu idioma principal)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` pode ser chamado antes do loader ser resolvido, então `loaderData` é digitado como possivelmente `undefined`. Mantenha o encadeamento opcional ou retorne um título de fallback.

Você mantém o chunk por localidade sem pagar seu custo no caminho crítico do head. O preço é a experiência do desenvolvedor: o conteúdo deve ser conectado explicitamente do loader ao `head` através de `loaderData`.

</Tab>

</Tabs>

### Qual resolução devo escolher?

|                      | Static resolution     | Dynamic resolution         | Cached dynamic resolution              |
| -------------------- | --------------------- | -------------------------- | -------------------------------------- |
| API                  | `getIntlayer`         | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` in `loader` (v9.4+) |
| `head` signature     | synchronous           | `async`                    | synchronous, reads `loaderData`        |
| Locales shipped      | every declared locale | requested locale only      | requested locale only                  |
| Client navigations   | nothing to resolve    | re-entered on every match  | served from the router cache           |
| Developer experience | simplest              | one `await`                | content threaded through `loaderData`  |

</Step>

<Step number={13} title="Recuperar a locale em suas server actions">

Você pode querer acessar a locale atual de dentro de suas server actions ou API endpoints.
Você pode fazer isso usando o helper `getLocale` de `intlayer`.

Aqui está um exemplo usando as funções de servidor do TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Obter o cookie da solicitação (padrão: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Obter o header da solicitação (padrão: 'x-intlayer-locale')
    // Fallback usando negociação Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Recuperar algum conteúdo usando getIntlayerAsync()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>

<Step number={14} title="Gerenciar páginas não encontradas">

Quando um usuário visita uma página inexistente, você pode exibir uma página personalizada de não encontrada e o prefixo de locale pode afetar a forma como a página de não encontrada é acionada.

#### Entendendo o tratamento de 404 do TanStack Router com prefixos de locale

No TanStack Router, lidar com páginas 404 com rotas localizadas requer uma abordagem multicamadas:

1. **Rota 404 dedicada**: Uma rota específica para exibir a interface 404
2. **Validação no nível da rota**: Valida os prefixos de locale e redireciona os inválidos para 404
3. **Rota catch-all**: Captura todos os caminhos não correspondentes dentro do segmento de locale

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Isso cria uma rota dedicada /[locale]/404
// É usada tanto como uma rota direta quanto importada como um componente em outros arquivos
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Exportado separadamente para que possa ser reutilizado em notFoundComponent e rotas catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad executa antes da rota ser renderizada (tanto no servidor quanto no cliente)
  // É o lugar ideal para validar o prefixo de locale
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix verifica se o locale é válido de acordo com sua configuração intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Prefixo de locale inválido - redirecionar para a página 404 com um prefixo de locale válido
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent é chamado quando uma rota filha não existe
  // por exemplo, /en/pagina-inexistente dispara isso dentro do layout /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// A rota $ (splat/catch-all) corresponde a qualquer caminho que não corresponda a outras rotas
// por exemplo, /en/algum/caminho/profundamente/aninhado/invalido
// Isso garante que TODOS os caminhos não correspondentes dentro de um locale mostrem a página 404
// Sem isso, caminhos profundos não correspondentes podem mostrar uma página em branco ou erro
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={15} title="Extrair o conteúdo dos seus componentes" isOptional={true}> isOptional={true}>

Se você tiver uma base de código existente, transformar milhares de arquivos pode ser demorado.

Para facilitar esse processo, o Intlayer propõe um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) / [extrator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) para transformar seus componentes e extrair o conteúdo.

Para configurá-lo, você pode adicionar uma seção `compiler` no seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto da sua configuração
  compiler: {
    /**
     * Indica se o compilador deve ser ativado.
     */
    enabled: true,

    /**
     * Define o caminho dos arquivos de saída
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica se os componentes devem ser salvos após serem transformados. Dessa forma, o compilador pode ser executado apenas uma vez para transformar o aplicativo e depois removido.
     */
    saveComponents: false,

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value="Comando de extração">

Execute o extrator para transformar seus componentes e extrair o conteúdo

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
 <Tab value="Compilador Babel">

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Atualize seu `vite.config.ts` para incluir o plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Ou npm run dev
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

<Step number={16} title="Gerar um Sitemap">

O Intlayer vem com um gerador de sitemap integrado para ajudá-lo a criar facilmente um sitemap para sua aplicação. Ele cuida das rotas localizadas e adiciona os metadados necessários para os mecanismos de busca.

> O sitemap gerado pelo Intlayer suporta o namespace `xhtml:link` (Hreflang XML Extensions). Ao contrário dos geradores de sitemap padrão que apenas listam URLs brutos, o Intlayer cria automaticamente os links bidirecionais necessários entre todas as versões de idioma de uma página (por exemplo, `/about`, `/about?lang=fr` e `/about?lang=es`). Isso garante que os mecanismos de busca indexem e sirvam corretamente a versão de idioma certa para o público certo.

Para usá-lo, você primeiro precisa configurar o seu `vite.config.ts` para habilitar a pré-renderização de suas rotas localizadas e desabilitar a geração de sitemap padrão do TanStack Start.

```typescript fileName="vite.config.ts"
import { localeFlatMap } from "intlayer";
// ... outras importações

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... outros plugins
    tanstackStart({
      // ... outras configurações
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Em seguida, crie uma rota `src/routes/sitemap[.]xml.ts` que use a função `generateSitemap`:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { generateSitemap } from "intlayer";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

</Step>

<Step number={17} title="Configurar TypeScript">

O Intlayer utiliza a ampliação de módulos para aproveitar os benefícios do TypeScript e fortalecer sua base de código.

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente:

```json5 fileName="tsconfig.json"
{
  // ... suas configurações existentes
  include: [
    // ... seus includes existentes
    ".intlayer/**/*.ts", // Incluir os tipos gerados automaticamente
  ],
}
```

</Step>

</Steps>

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite evitar que eles sejam comitados no seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

---

## Extensão VS Code

Para melhorar sua experiência de desenvolvimento com Intlayer, você pode instalar a extensão oficial **Intlayer VS Code Extension**.

[Instalar do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompleção** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** de conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

## Ir Além

Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

---

## Referências da Documentação

- [Documentação Intlayer](https://intlayer.org)
- [Documentação Tanstack Start](https://reactrouter.com/)
- [hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md)
- [hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md)
- [Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md)
- [Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um aplicativo TanStack Start?">

O TanStack Start não fornece uma camada própria de i18n, portanto a escolha recai sobre bibliotecas externas:

- **`i18next` / `react-i18next`** e **`react-intl`**: catálogos de mensagens agnósticos de framework, conectados manualmente ao roteador.
- **`Lingui`**: mensagens no formato ICU com etapa de compilação.
- **`Paraglide`**: mensagens compiladas, focado exclusivamente na camada de mensagens.
- **`Intlayer`**: a solução mais avançada. O conteúdo pode ser declarado em qualquer lugar da sua base de código ([ao lado de cada componente ou centralizado](https://intlayer.org/blog/per-component-vs-centralized-i18n)) e compilado em tempo de build, com chaves tipadas, roteamento ciente de locales, geração de sitemap, tradução por IA, editor visual e CMS.

A grande diferença no TanStack Start reside no roteamento e na renderização no servidor. O Intlayer integra-se nativamente com o roteador baseado em arquivos, a função `head` e a etapa de pré-renderização, evitando que você precise montar provedores, detectores de idioma e sitemaps manualmente. Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) e o [benchmark TanStack Start i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle do meu app TanStack Start?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O markup renderizado no servidor (SSR) resolve suas mensagens diretamente no servidor, e o compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas que o componente utiliza. Assim, chaves e idiomas não utilizados são descartados, e os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas habituais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md).

</Question>

<Question title="Posso migrar do react-i18next ou react-intl sem reescrever meus componentes?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_react-i18next_to_intlayer.md) ou o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md). Ou você pode manter sua API atual integralmente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma interface que `react-i18next`, `react-intl` e `i18next`, porém alimentados pelos dicionários do Intlayer, alterando apenas os imports sem tocar no código dos componentes.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus componentes, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma. O passo 15 deste guia detalha esse processo.

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

<Question title="O Intlayer suporta renderização no servidor e pré-renderização no TanStack Start?">

Sim. O conteúdo é resolvido durante o SSR, e este guia cobre a configuração de pré-renderização que gera um documento estático por rota localizada. O passo 16 mostra como habilitar o `prerender` no `vite.config.ts` e gerar um sitemap localizado a partir da mesma tabela de rotas.

</Question>

<Question title="Como adiciono tags hreflang e um sitemap localizado?">

Use a função integrada `generateSitemap` em uma rota `src/routes/sitemap[.]xml.ts`. Diferente de uma lista simples de URLs, ela emite o namespace `xhtml:link`, conectando cada versão de idioma bidirecionalmente às outras para que os mecanismos de busca indexem a versão correta para cada público. Os metadados de cabeçalho (`head`) localizados são abordados no passo 12.

</Question>

<Question title="Preciso colocar o locale na URL?">

Não. A opção `routing.mode` controla o esquema de URL: `"prefix-no-default"` (o padrão, `/about` e `/pt/about`), `"prefix-all"` (`/pt/about`), `"no-prefix"` (resolvido por cookie, cabeçalho ou domínio) ou `"search-params"` (`/about?locale=pt`). Locais também podem ser mapeados para domínios distintos usando `routing.domains`. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="Como construo um seletor de idiomas que mantém a rota atual?">

Utilize `useLocale` em conjunto com o componente de link localizado descrito no passo 9. O hook `useLocale` expõe o idioma ativo, os disponíveis e uma função para salvar a escolha, enquanto `getLocalizedUrl` reescreve o caminho atual para o idioma de destino, garantindo que o visitante permaneça na mesma página em vez de voltar para a página inicial.

</Question>

<Question title="Como lido com páginas 404 em rotas localizadas?">

O passo 14 aborda isso. A função `validatePrefix` indica se o segmento de idioma da URL corresponde a um locale declarado, permitindo retornar um 404 autêntico para `/xx/about` em vez de tratá-lo como um caminho válido. Sem isso, um prefixo desconhecido seria resolvido silenciosamente e os buscadores indexariam páginas duplicadas.

</Question>

<Question title="Como traduzo um aplicativo TanStack Start automaticamente com IA?">

Execute `npx intlayer fill`. A CLI identifica traduções ausentes e as preenche com o LLM de sua preferência, usando sua própria chave de API e provedor. Adicione `--git-diff` para traduzir apenas o conteúdo alterado na branch atual, mantendo as execuções de CI econômicas e rápidas. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="O Intlayer suporta plurais, gênero e rich text?">

Sim. As declarações de conteúdo suportam [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md) e [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md) para textos longos, com [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Como tradutores podem editar o conteúdo sem tocar no código?">

Por meio do [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), que roda em sua própria infraestrutura e permite editar textos diretamente no app em execução, ou pelo [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), que externaliza o conteúdo para que ele possa ser alterado sem novos deploys.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O CMS hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
