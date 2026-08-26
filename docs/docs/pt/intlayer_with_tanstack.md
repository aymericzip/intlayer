---
createdAt: 2025-09-09
updatedAt: 2026-08-25
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

---

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

---

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

---

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

---

</Step>

<Step number={14} title="Gerenciar páginas não encontradas">

Quando um usuário visita uma página que não existe, você pode exibir uma página customizada de não encontrado e o prefixo de locale pode impactar a forma como a página não encontrado é acionada.

#### Página Inicial Localizada

> Se deseja usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você pode usar o valor da função, como:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md).

</Step>

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
              {/* Locale - ex. FR */}
              {localeEl}
            </span>
            <span>
              {/* Idioma na sua própria Localidade - ex. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Idioma na Localização atual - ex. Francés com a localização atual definida para Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - ex. French */}
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

<Step number={11} title="Gerenciamento de Atributos HTML">

return (
<html dir={getHTMLTextDir(locale)} lang={locale}>
{/* ... _/}
</html>
);
} {/_ ... */}
</html>
);
}

export const Route = createFileRoute("/{-$locale}/")({
component: RouteComponent,
head: async ({ params }) => {
const { locale = defaultLocale } = params;
const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

````

> Se um `head` lê vários dicionários, resolva-os com `Promise.all`: aguardar cada `getIntlayerAsync` em sua própria linha encadeia as requisições em vez de executá-las em paralelo.

O contraponto: o import dinâmico é resolvido enquanto o `head` executa, no caminho crítico da renderização do documento. Numa rota fria isso atrasa o `head` em alguns milissegundos e pode degradar levemente o **LCP**.

</Tab>

<Tab label="Resolução dinâmica em cache" value="cached">

Resolva o dicionário no `loader` da rota e leia-o de volta a partir de `loaderData` no `head`. Os loaders das rotas correspondentes rodam em paralelo, e `staleTime: Infinity` informa ao TanStack Router que o resultado nunca expira, então o chunk por localidade é resolvido uma única vez e depois servido do cache do router, mantendo o `head` síncrono.

```tsx fileName="src/routes/{-$locale}/index.tsx"

<Tabs>
 <Tab value='Extract command'>

  return { locale, content };
});
import { createFileRoute } from "@tanstack/react-router";

````

```tsx fileName="src/routes/{-$locale}/route.tsx"

```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { NotFoundComponent } from "./404";
```

</Step>

<Step number={15} title="Extrair o conteúdo dos seus componentes" isOptional={true}>

Se você tiver uma base de código existente, transformar milhares de arquivos pode ser demorado.

Para facilitar esse processo, o Intlayer propõe um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) / [extrator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) para transformar seus componentes e extrair o conteúdo.

Para configurá-lo, você pode adicionar uma seção `compiler` no seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

    /**
     * Define o caminho dos arquivos de saída
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Comando de extração'>

Execute o extrator para transformar seus componentes e extrair o conteúdo

```bash packageManager="npm"

```

```bash packageManager="pnpm"

```

```bash packageManager="yarn"

```

```bash packageManager="bun"

 </Tab>
</Tabs>

---

Could you please provide:

1. **BLOCK 3 of 4** (the English source content to reference)
2. **The current Portuguese (pt) translation** (to be audited and updated)

Once you share these blocks with the proper `` and `` delimiters, I'll perform the complete audit and return the fully updated Portuguese translation.---

bun run build # Or bun run dev
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

````typescript fileName="src/routes/sitemap[.]xml.ts"

---

</Step>

I'm ready to audit and update the Portuguese translation. However, I notice that both the reference English block and the current Portuguese block to review are empty (showing only "" and "").

Intlayer usa module augmentation para aproveitar os benefícios do TypeScript e tornar seu codebase mais robusto.

Could you please provide:

1. **BLOCK 4 of 4** - The English (en) source content to use as reference
2. **BLOCK 4 of 4** - The current Portuguese (pt) translation that needs to be audited and updated

Once you share the actual content, I'll perform the audit and return the fully updated Portuguese translation following all the guidelines you've outlined.---

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
{
  // ... suas configurações existentes
  include: [
    // ... seus includes existentes
    ".intlayer/**/*.ts", // Incluir os tipos gerados automaticamente
  ],
}

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite confirmá-los em seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
````

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
