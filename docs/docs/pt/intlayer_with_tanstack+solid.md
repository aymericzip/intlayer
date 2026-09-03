---
createdAt: 2025-03-25
updatedAt: 2026-08-30
title: "TanStack Start + Solid i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação TanStack Start + Solid multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Roteamento de Localidade
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Comparar a resolução estática, dinâmica e dinâmica em cache dos dicionários de metadados nas funções head das rotas"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 8.5.1
    date: 2026-03-25
    changes: "Adicionado para Tanstack Start Solid.js"
author: aymericzip
---

# Traduza seu site Tanstack Start com Solid.js usando Intlayer | Internacionalização (i18n)

## Índice

<TOC/>

Este guia demonstra como integrar o **Intlayer** para uma internacionalização perfeita em projetos Tanstack Start com Solid.js, roteamento ciente de localidade, suporte a TypeScript e práticas de desenvolvimento modernas.

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `react-i18next` ou `i18next`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>
<Accordion header="Cobertura total do TanStack Start">

O Intlayer é otimizado para funcionar perfeitamente com TanStack Start e Solid, oferecendo **roteamento multilíngue**, **mapa do site** e todos os recursos necessários para dimensionar a internacionalização (i18n).

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

## Guia Passo a Passo para Configurar o Intlayer numa Aplicação Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="A melhor solução i18n para Tanstack Start? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como Internacionalizar sua aplicação usando o Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) no GitHub.

<Steps>

<Step number={1} title="Criar o Projeto">

Comece criando um novo projeto TanStack Start seguindo o guia [Iniciar novo projeto](https://tanstack.com/start/latest/docs/framework/solid/quick-start) no site do TanStack Start.

</Step>

<Step number={2} title="Instalar os Pacotes Intlayer">

Instale os pacotes necessários usando o seu gerenciador de pacotes preferido:

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
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **solid-intlayer**
  O pacote que integra o Intlayer com a aplicação Solid. Ele fornece provedores de contexto e hooks para a internacionalização em Solid.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como o middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URL.

</Step>

<Step number={3} title="Configuração do seu projeto">

Crie um arquivo de configuração para configurar as línguas da sua aplicação:

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

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={4} title="Integrar o Intlayer na sua Configuração Vite">

Adicione o plugin intlayer na sua configuração:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> O plugin Vite `intlayer()` é usado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Ele define as variáveis de ambiente do Intlayer dentro da aplicação Vite. Adicionalmente, ele fornece aliases para otimizar a performance.

</Step>

<Step number={5} title="Criar o Layout Raiz">

Configure o seu layout raiz para suportar internacionalização usando `useParams` para detectar a localidade atual e definindo os atributos `lang` e `dir` na tag `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  getRouteApi,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>

<Step number={6} title="Criar o Layout de Localidade">

Crie um layout que lide com o prefixo de localidade e realize a validação. Este layout garantirá que apenas localidades válidas sejam processadas.

> Este passo é opcional se você não precisar validar o prefixo de localidade ao nível da rota.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Validar o prefixo de localidade
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Aqui, `{-$locale}` é um parâmetro de rota dinâmico que é substituído pela localidade atual. Esta notação torna o slot opcional, permitindo que funcione com modos de roteamento como `'prefix-no-default'` etc.

> Esteja ciente de que este slot pode causar problemas se você usar múltiplos segmentos dinâmicos na mesma rota (ex: `/{-$locale}/outro-caminho/$outroCaminhoDinamico/...`).
> Para o modo `'prefix-all'`, você pode preferir mudar o slot para `$locale`.
> Para o modo `'no-prefix'` ou `'search-params'`, você pode remover o slot inteiramente.

</Step>

<Step number={7} title="Declarar o Seu Conteúdo">

Crie e gerencie as suas declarações de conteúdo para armazenar traduções:

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
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> As suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que sejam incluídas no diretório `contentDir` (por padrão, `./app`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>

<Step number={8} title="Utilizar Componentes e Hooks Cientes de Localidade">

Crie um componente `LocalizedLink` para navegação ciente de localidade:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

Este componente tem dois objetivos:

- Remover o prefixo desnecessário `{-$locale}` da URL.
- Injetar o parâmetro de localidade na URL para garantir que o usuário seja diretamente redirecionado para a rota localizada.

Depois, podemos criar um hook `useLocalizedNavigate` para navegação programática:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="Utilizar o Intlayer em Suas Páginas">

> Use **`useIntlayer`** por padrão: é a forma recomendada de ler conteúdo dentro dos componentes, e o compilador o resolve para a localidade que está sendo renderizada. Recorra a `getIntlayer` / `getIntlayerAsync` apenas fora da árvore Solid: o `head` das rotas, os loaders e as server functions.

Acesse seus dicionários de conteúdo através da sua aplicação:

#### Página Inicial Localizada

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> No Solid, `useIntlayer` retorna conteúdo reativo (por exemplo, `content`). Você pode acessar suas propriedades diretamente.
>
> Para aprender mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/solid-intlayer/useIntlayer.md).

</Step>

<Step number={10} title="Criar um Componente Seletor de Localidade">

Crie um componente para permitir que os usuários mudem de língua:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> No Solid, `locale` de `useLocale` é um **signal accessor**. Use `locale()` (com parênteses) para ler o seu valor atual de forma reativa.
>
> Para aprender mais sobre o hook `useLocale`, consulte la [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Gerenciamento de Atributos HTML">

Como visto no Passo 5, você pode gerenciar os atributos `lang` e `dir` da tag `html` usando `useParams` no seu componente raiz. Isso garante que os atributos corretos sejam definidos no servidor e no cliente.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

</Step>

<Step number={12} title="Adicionar Middleware">

Você também pode usar o `intlayerProxy` para adicionar roteamento do lado do servidor à sua aplicação. Este plugin detectará automaticamente a localidade atual baseada na URL e definirá o cookie de localidade apropriado. Se nenhuma localidade for especificada, o plugin determinará a localidade mais apropriada baseada nas preferências de língua do navegador do usuário. Se nenhuma localidade for detectada, ele redirecionará para a localidade padrão.

> Note que para usar o `intlayerProxy` em produção, você precisa trocar o pacote `vite-intlayer` de `devDependencies` para `dependencies`.

> Desde Intlayer v9, `intlayerProxy()` é agrupado diretamente no plugin `intlayer()` e ativado por padrão através da opção `routing.enableProxy` (`true` por padrão). Registrá-lo separadamente conforme mostrado abaixo agora é opcional: é mantido para compatibilidade com versões anteriores e para configurações que precisam controlar a ordem dos plugins. Defina `routing.enableProxy: false` para recusar. Consulte as [notas de lançamento da v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
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
    solid(),
  ],
});
```

</Step>

<Step number={13} title="Internacionalizar Seus Metadados">

<Tabs>

<Tab label="Resolução estática" value="static">

`getIntlayer` resolve de forma síncrona contra o dicionário **mesclado**, aquele que contém todas as localidades declaradas. O `head` continua síncrono e nada é aguardado, mas todo o dicionário multilíngue é incluído no chunk da rota enviado ao navegador.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
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
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
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

Ideal para dicionários de metadados pequenos, poucas localidades ou durante a prototipagem.

</Tab>

<Tab label="Resolução dinâmica" value="dynamic">

`getIntlayerAsync` (disponível a partir da **v9.4**) se comporta como `getIntlayer`, mas o plugin de build o aponta para o chunk por localidade em `.intlayer/dynamic_dictionaries/` em vez do dicionário mesclado. Assim, uma página envia apenas a localidade que renderiza. Como esse chunk é carregado sob demanda, o `head` passa a ser `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
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
    const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
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

> Se um `head` lê vários dicionários, resolva-os com `Promise.all`: aguardar cada `getIntlayerAsync` em sua própria linha encadeia as requisições em vez de executá-las em paralelo.

O contraponto: o import dinâmico é resolvido enquanto o `head` executa, no caminho crítico da renderização do documento. Numa rota fria isso atrasa o `head` em alguns milissegundos e pode degradar levemente o **LCP**.

</Tab>

<Tab label="Resolução dinâmica em cache" value="cached">

Resolva o dicionário no `loader` da rota e leia-o de volta a partir de `loaderData` no `head`. Os loaders das rotas correspondentes rodam em paralelo, e `staleTime: Infinity` informa ao TanStack Router que o resultado nunca expira, então o chunk por localidade é resolvido uma única vez e depois servido do cache do router, mantendo o `head` síncrono.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Resolved in parallel with the other matched routes, off the head critical path
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // The dictionary never changes for a given locale: resolve the chunk once
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
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

> O `head` pode ser chamado antes de o loader resolver, então `loaderData` é tipado como possivelmente `undefined`. Mantenha o encadeamento opcional ou retorne um título de fallback.

Você mantém o chunk por localidade sem pagar seu custo no caminho crítico do `head`. O preço é a experiência de desenvolvimento: o conteúdo precisa ser repassado explicitamente do loader para o `head` via `loaderData`.

</Tab>

</Tabs>

### Qual resolução escolher?

|                                | Resolução estática              | Resolução dinâmica                 | Resolução dinâmica em cache            |
| ------------------------------ | ------------------------------- | ---------------------------------- | -------------------------------------- |
| API                            | `getIntlayer`                   | `getIntlayerAsync` (v9.4+)         | `getIntlayerAsync` no `loader` (v9.4+) |
| Assinatura do `head`           | síncrona                        | `async`                            | síncrona, lê `loaderData`              |
| Localidades enviadas           | todas as localidades declaradas | apenas a localidade solicitada     | apenas a localidade solicitada         |
| Navegações no cliente          | nada a resolver                 | reexecutado a cada correspondência | servido do cache do router             |
| Experiência de desenvolvimento | a mais simples                  | um único `await`                   | conteúdo repassado via `loaderData`    |

</Step>

<Step number={14} title="Recuperar a localidade nas suas server actions">

Você pode querer acessar a localidade atual de dentro das suas server actions ou endpoints de API.
Você pode fazer isso usando o helper `getLocale` do `intlayer`.

Aqui está um exemplo usando as server functions do TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Obter o cookie da requisição (padrão: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Obter o header da requisição (padrão: 'x-intlayer-locale')
    // Fallback usando negociação Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Recuperar algum conteúdo usando getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>

<Step number={15} title="Gerenciar páginas não encontradas">

Quando um usuário visita uma página inexistente, você pode exibir uma página personalizada de não encontrado e o prefixo de localidade pode impactar a maneira como a página de não encontrado é disparada.

#### Entendendo o Processamento de 404 do TanStack Router com Prefixos de Localidade

No TanStack Router, processar páginas 404 com rotas localizadas requer uma abordagem multicamada:

1. **Rota de 404 dedicada**: Uma rota específica para exibir a UI do 404
2. **Validação ao nível da rota**: Valida os prefixos de localidade e redireciona os inválidos para o 404
3. **Rota catch-all**: Captura quaisquer caminhos não correspondentes dentro do segmento de localidade

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Isso cria uma rota /[locale]/404 dedicada
// Ela é usada tanto como uma rota direta quanto importada como um componente em outros arquivos
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
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad executa antes da rota renderizar (tanto no servidor quanto no cliente)
  // É o lugar ideal para validar o prefixo de localidade
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix verifica se a localidade é válida de acordo com a sua configuração do intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Prefixo de localidade inválido - redireciona para a página 404 com um prefixo de localidade válido
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent é chamado quando uma rota filha não existe
  // ex: /en/pagina-nao-existente dispara isso dentro do layout /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// A rota $ (splat/catch-all) corresponde a qualquer caminho que não corresponda a outras rotas
// ex: /en/algum/caminho/profundamente/aninhado/invalido
// Isso garante que TODOS os caminhos não correspondentes dentro de uma localidade mostrem a página 404
// Sem isso, caminhos profundos não correspondentes poderiam mostrar uma página em branco ou erro
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={15} title="Extrair o conteúdo dos seus componentes" isOptional={true}>

Se você tem uma base de código existente, transformar milhares de arquivos pode ser demorado.

Para facilitar este processo, o Intlayer propõe um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) / [extrator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) para transformar os seus componentes e extrair o conteúdo.

Para configurá-lo, você pode adicionar uma seção `compiler` no seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto da sua configuração
  compiler: {
    /**
     * Indica se o compilador deve ser habilitado.
     */
    enabled: true,

    /**
     * Define o caminho dos arquivos de saída
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica se os componentes devem ser salvos após serem transformados.
     *
     * - Se `true`, o compilador reescreverá o arquivo do componente no disco. Assim, a transformação será permanente, e o compilador pulará a transformação para o próximo processo. Dessa forma, o compilador pode transformar a aplicação e depois pode ser removido.
     *
     * - Se `false`, o compilador injetará a chamada de função `useIntlayer()` no código apenas no output da build, mantendo a base de código intacta. A transformação será feita apenas em memória.
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
 <Tab value='Comando extract'>

Rode o extrator para transformar os seus componentes e extrair o conteúdo

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
 <Tab value='Compilador Babel'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Atualize o seu `vite.config.ts` para incluir o plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Ou rpm run dev
```

```bash packageManager="pnpm"
pnpm run build # Ou pnpm run dev
```

```bash packageManager="yarn"
yarn build # Ou yarn dev
```

```bash packageManager="bun"
bun run build # Ou bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Gerar um Sitemap">

O Intlayer vem com um gerador de sitemap integrado para ajudá-lo a criar facilmente um sitemap para sua aplicação. Ele cuida das rotas localizadas e adiciona os metadados necessários para os mecanismos de busca.

> O sitemap gerado pelo Intlayer suporta o namespace `xhtml:link` (Hreflang XML Extensions). Ao contrário dos geradores de sitemap padrão que apenas listam URLs brutos, o Intlayer cria automaticamente os links bidirecionais necessários entre todas as versões de idioma de uma página (por exemplo, `/about`, `/about?lang=fr` e `/about?lang=es`). Isso garante que os mecanismos de busca indexem e sirvam corretamente a versão de idioma certa para o público certo.

Para usá-lo, você primeiro precisa configurar o seu `vite.config.ts` para habilitar a pré-renderização de suas rotas localizadas e desabilitar a geração de sitemap padrão do TanStack Start.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
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
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

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

O Intlayer usa a ampliação de módulo para obter os benefícios do TypeScript e tornar a sua base de código mais forte.

Certifique-se de que a sua configuração do TypeScript inclua os tipos autogerados:

```json5 fileName="tsconfig.json"
{
  // ... as suas configurações existentes
  include: [
    // ... os seus includes existentes
    ".intlayer/**/*.ts", // Incluir os tipos autogerados
  ],
}
```

</Step>

</Steps>

### Configuração Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite que você evite committá-los no seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

---

## Extensão VS Code

Para melhorar a sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial do Intlayer VS Code**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Previsões inline** de conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ir Além

Para ir mais além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar o seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

---

## Referências de Documentação

- [Documentação do Intlayer](https://intlayer.org)
- [Documentação do Tanstack Start](https://tanstack.com/start/latest)
- [hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/solid-intlayer/useIntlayer.md)
- [hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/solid-intlayer/useLocale.md)
- [Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md)
- [Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um aplicativo TanStack Start e Solid?">

O TanStack Start não traz uma camada nativa de i18n, e as opções no ecossistema Solid são enxutas:

- **`@solid-primitives/i18n`**: um dicionário plano que você monta e conecta manualmente ao roteador.
- **`i18next`** com um wrapper para Solid: catálogos maduros, mas sem integração com o roteador do TanStack, com a função `head` ou com a etapa de pré-renderização.
- **`Paraglide`**: mensagens compiladas, focado exclusivamente na camada de mensagens.
- **`Intlayer`**: a solução mais avançada. O conteúdo pode ser declarado em qualquer lugar da sua base de código ([ao lado de cada componente ou centralizado](https://intlayer.org/blog/per-component-vs-centralized-i18n)) e compilado em tempo de build, com roteamento com reconhecimento de idioma, geração de sitemap, tradução por IA, editor visual e CMS.

Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) e o [benchmark TanStack Start i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle do meu app TanStack Start?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O markup renderizado no servidor (SSR) resolve suas mensagens diretamente no servidor, e o compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas que o componente utiliza. Assim, chaves e idiomas não utilizados são descartados, e os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às soluções tradicionais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md).

</Question>

<Question title="Posso migrar do @solid-primitives/i18n ou i18next sem reescrever meus componentes?">

Em grande parte, sim. Siga o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md) para migrar o conteúdo. Você também pode migrar gradualmente: o [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus catálogos JSON existentes como fonte de verdade e gera dicionários Intlayer a partir deles, mantendo ambas as camadas sincronizadas enquanto você migra componentes um a um.

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

<Question title="O Intlayer suporta renderização no servidor e pré-renderização aqui?">

Sim. O conteúdo é resolvido durante o SSR, e o passo 16 cobre a configuração de pré-renderização que gera um documento estático por rota localizada, além do sitemap localizado gerado a partir da mesma tabela de rotas.

</Question>

<Question title="Mudar o locale faz renderizar novamente todo o meu aplicativo?">

Não. O conteúdo é alimentado por signals do Solid, portanto a alteração do idioma atualiza apenas os nós do DOM que leem os valores modificados.

</Question>

<Question title="Como adiciono tags hreflang e um sitemap localizado?">

Use a função integrada `generateSitemap` em uma rota `src/routes/sitemap[.]xml.ts`. Ela emite o namespace `xhtml:link`, conectando cada versão de idioma bidirecionalmente com as outras. Os metadados de cabeçalho (`head`) localizados são abordados no passo 12.

</Question>

<Question title="Como lido com páginas 404 em rotas localizadas?">

O passo 14 aborda isso. A função `validatePrefix` informa se o segmento de idioma da URL é um locale declarado, permitindo que `/xx/about` retorne um 404 real em vez de ser indexado como uma página duplicada.

</Question>

<Question title="Preciso colocar o locale na URL?">

Não. A opção `routing.mode` aceita `"prefix-no-default"` (o padrão), `"prefix-all"`, `"no-prefix"` e `"search-params"`, e `routing.domains` mapeia cada idioma para seu respectivo domínio. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="Como construo um seletor de idiomas que mantém a rota atual?">

O passo 9 mostra a implementação do componente. O hook `useLocale` expõe o idioma ativo, os disponíveis e uma função para salvar a escolha, enquanto `getLocalizedUrl` reescreve o caminho atual para o novo idioma para que o visitante continue na mesma página.

</Question>

<Question title="Como traduzo o app automaticamente com IA?">

Execute `npx intlayer fill`. Ele preenche traduções faltantes com o LLM de sua preferência, usando sua própria chave de API e provedor, e `--git-diff` restringe a execução ao conteúdo modificado na branch atual. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="O Intlayer suporta plurais, gênero e rich text?">

Sim: [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md) e [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Como tradutores podem editar o conteúdo sem tocar no código?">

Por meio do [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), que roda em sua própria infraestrutura e permite editar textos diretamente no app em execução, ou pelo [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), que externaliza o conteúdo para que ele possa ser alterado sem novos deploys.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O CMS hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
