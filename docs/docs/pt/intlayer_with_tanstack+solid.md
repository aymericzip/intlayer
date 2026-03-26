---
createdAt: 2025-03-25
updatedAt: 2026-03-25
title: i18n Tanstack Start - Como traduzir uma aplicação Tanstack Start usando Solid.js em 2026
description: Aprenda como adicionar internacionalização (i18n) à sua aplicação Tanstack Start usando Intlayer e Solid.js. Siga este guia completo para tornar sua aplicação multilíngue com roteamento ciente de localidade.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Roteamento de Localidade
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Adicionado para Tanstack Start Solid.js"
---

# Traduza seu site Tanstack Start com Solid.js usando Intlayer | Internacionalização (i18n)

## Índice

<TOC/>

Este guia demonstra como integrar o **Intlayer** para uma internacionalização perfeita em projetos Tanstack Start com Solid.js, roteamento ciente de localidade, suporte a TypeScript e práticas de desenvolvimento modernas.

## O que é o Intlayer?

O **Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos ao nível do componente.
- **Localizar metadados, rotas e conteúdo dinamicamente**.
- **Garantir o suporte a TypeScript** com tipos autogerados, melhorando o autocompletar e a detecção de erros.
- **Beneficiar-se de recursos avançados**, como detecção e troca dinâmica de localidade.
- **Habilitar roteamento ciente de localidade** com o sistema de roteamento baseado em arquivos do Tanstack Start.

---

## Guia Passo a Passo para Configurar o Intlayer numa Aplicação Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">
  
<iframe title="A melhor solução i18n para Tanstack Start? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como Internacionalizar sua aplicação usando o Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) no GitHub.

### Passo 1: Criar o Projeto

Comece criando um novo projeto TanStack Start seguindo o guia [Iniciar novo projeto](https://tanstack.com/start/latest/docs/framework/solid/quick-start) no site do TanStack Start.

### Passo 2: Instalar os Pacotes Intlayer

Instale os pacotes necessários usando o seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **solid-intlayer**
  O pacote que integra o Intlayer com a aplicação Solid. Ele fornece provedores de contexto e hooks para a internacionalização em Solid.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como o middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URL.

### Passo 3: Configuração do seu projeto

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

### Passo 4: Integrar o Intlayer na sua Configuração Vite

Adicione o plugin intlayer na sua configuração:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> O plugin Vite `intlayer()` é usado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Ele define as variáveis de ambiente do Intlayer dentro da aplicação Vite. Adicionalmente, ele fornece aliases para otimizar a performance.

### Passo 5: Criar o Layout Raiz (Root Layout)

Configure o seu layout raiz para suportar internacionalização usando `useMatches` para detectar a localidade atual e definindo os atributos `lang` e `dir` na tag `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir, type Locale } from "intlayer";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

type Params = {
  locale: Locale;
};

function RootComponent() {
  const matches = useMatches();

  // Tenta encontrar a localidade nos parâmetros de qualquer correspondência ativa
  // Isso assume que você usa o segmento dinâmico "/{-$locale}" na sua árvore de rotas
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <IntlayerProvider locale={locale}>
          <Suspense>
            <Outlet />
            <TanStackRouterDevtools />
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Passo 6: Criar o Layout de Localidade (Opcional)

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

### Passo 7: Declarar o Seu Conteúdo

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

> As suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que sejam incluídas no diretório `contentDir` (por padrão, `./app`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

### Passo 8: Utilizar Componentes e Hooks Cientes de Localidade

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

### Passo 9: Utilizar o Intlayer em Suas Páginas

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
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> No Solid, `useIntlayer` retorna uma função **accessor** (ex: `content()`). Você deve chamar esta função para acessar o conteúdo reativo.
>
> Para aprender mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/solid-intlayer/useIntlayer.md).

### Passo 10: Criar um Componente Seletor de Localidade (Locale Switcher)

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

### Passo 11: Gerenciamento de Atributos HTML

Como visto no Passo 5, você pode gerenciar os atributos `lang` e `dir` da tag `html` usando `useMatches` no seu componente raiz. Isso garante que os atributos corretos sejam definidos no servidor e no cliente.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const matches = useMatches();

  // Tentar encontrar a localidade nos parâmetros de qualquer correspondência ativa
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### Passo 12: Adicionar Middleware (Opcional)

Você também pode usar o `intlayerProxy` para adicionar roteamento do lado do servidor à sua aplicação. Este plugin detectará automaticamente a localidade atual baseada na URL e definirá o cookie de localidade apropriado. Se nenhuma localidade for especificada, o plugin determinará a localidade mais apropriada baseada nas preferências de língua do navegador do usuário. Se nenhuma localidade for detectada, ele redirecionará para a localidade padrão.

> Note que para usar o `intlayerProxy` em produção, você precisa trocar o pacote `vite-intlayer` de `devDependencies` para `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // O proxy deve ser colocado antes do servidor se você usar o Nitro
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### Passo 13: Internacionalizar Seus Metadados (Opcional)

Você também pode usar a função `getIntlayer` para acessar seus dicionários de conteúdo dentro do loader `head` para metadados cientes de localidade:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### Passo 14: Recuperar a localidade nas suas server actions (Opcional)

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

---

### Passo 15: Gerenciar páginas não encontradas (Opcional)

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

### (Opcional) Passo 16: Extrair o conteúdo dos seus componentes

Se você tem uma base de código existente, transformar milhares de arquivos pode ser demorado.

Para facilitar este processo, o Intlayer propõe um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) / [extrator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) para transformar os seus componentes e extrair o conteúdo.

Para configurá-lo, você pode adicionar uma seção `compiler` no seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
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

Atualize o seu `vite.config.ts` para incluir o plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
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

---

### Passo 17: Configurar TypeScript (Opcional)

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

---

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
