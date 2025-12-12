---
createdAt: 2025-09-09
updatedAt: 2025-12-11
title: Como traduzir seu Tanstack Start – guia i18n 2025
description: Aprenda como adicionar internacionalização (i18n) à sua aplicação Tanstack Start usando Intlayer. Siga este guia completo para tornar seu app multilíngue com roteamento sensível ao locale.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Roteamento por Locale
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.4.0
    date: 2025-12-11
    changes: Introduz validatePrefix e adiciona o passo 14: Tratamento de páginas 404 com rotas localizadas.
  - version: 7.3.9
    date: 2025-12-05
    changes: Adiciona o passo 13: Recuperar o locale em suas server actions (Opcional)
  - version: 5.8.1
    date: 2025-09-09
    changes: Adicionado para Tanstack Start
---

# Traduza seu Tanstack Start com Intlayer | Internacionalização (i18n)

## Índice

<TOC/>

Este guia demonstra como integrar o **Intlayer** para uma internacionalização perfeita em projetos Tanstack Start com roteamento sensível ao locale, suporte a TypeScript e práticas modernas de desenvolvimento.

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e de código aberto para internacionalização (i18n) projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte a TypeScript** com tipos gerados automaticamente, melhorando o autocompletar e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de locale.
- **Ativar roteamento sensível ao locale** com o sistema de roteamento baseado em arquivos do Tanstack Start.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Tanstack Start

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="A melhor solução i18n para Tanstack Start? Descubra o Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar sua aplicação usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Veja o [Template de aplicação](https://github.com/aymericzip/intlayer-tanstack-start-template) no GitHub.

### Passo 1: Criar o Projeto

Comece criando um novo projeto TanStack Start seguindo o guia [Iniciar novo projeto](https://tanstack.com/start/latest/docs/framework/react/quick-start) no site do TanStack Start.

### Passo 2: Instalar os Pacotes do Intlayer

Instale os pacotes necessários usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md), transpiração e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

- **react-intlayer**
  O pacote que integra o Intlayer com aplicações React. Ele fornece provedores de contexto e hooks para internacionalização em React.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), assim como middleware para detectar o locale preferido do usuário, gerenciar cookies e lidar com redirecionamento de URLs.

### Passo 3: Configuração do seu projeto

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

### Passo 4: Integre o Intlayer na sua Configuração do Vite

Adicione o plugin intlayer na sua configuração:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    viteReact(),
    intlayer(), // To add
  ],
});

export default config;
```

> O plugin `intlayer()` para Vite é usado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define as variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

### Passo 5: Crie Componentes de Layout

Configure seu layout raiz e layouts específicos para cada localidade:

#### Layout Raiz

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Passo 6: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        pt: "Sobre",
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        pt: "Início",
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        pt: "Este é um exemplo de uso do Intlayer com TanStack Router",
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      pt: "Bem-vindo ao Intlayer + TanStack Router",
      en: "Welcome to Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação assim que forem incluídas no diretório `contentDir` (por padrão, `./app`). E devem corresponder à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

### Passo 7: Crie Componentes e Hooks Sensíveis ao Locale

Crie um componente `LocalizedLink` para navegação sensível ao locale:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Utilitário principal
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Auxiliares
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

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
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

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

### Passo 8: Utilize o Intlayer em Suas Páginas

Acesse seus dicionários de conteúdo em toda a sua aplicação:

#### Página Inicial Localizada

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
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

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md).

### Passo 9: Criar um Componente de Troca de Idioma

Crie um componente para permitir que os usuários mudem de idioma:

```tsx fileName="src/components/locale-switcher.tsx"
import type { FC } from "react";

import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import { useLocale } from "react-intlayer";

import { LocalizedLink, To } from "./localized-link";

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
          >
            <span>
              {/* Local - ex. FR */}
              {localeEl}
            </span>
            <span>
              {/* Idioma na sua própria Localização - ex. Français */}
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

### Passo 10: Adicionar Gerenciamento de Atributos HTML (Opcional)

Crie um hook para gerenciar os atributos lang e dir do HTML:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
// src/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Então use-o no seu componente raiz:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // importar o hook

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // adicionar esta linha

  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

---

### Passo 11: Adicionar middleware (Opcional)

Você também pode usar o `intlayerProxy` para adicionar roteamento do lado do servidor à sua aplicação. Este plugin detectará automaticamente o idioma atual com base na URL e definirá o cookie de idioma apropriado. Se nenhum idioma for especificado, o plugin determinará o idioma mais adequado com base nas preferências de idioma do navegador do usuário. Se nenhum idioma for detectado, ele redirecionará para o idioma padrão.

> Observe que, para usar o `intlayerProxy` em produção, você precisa mover o pacote `vite-intlayer` de `devDependencies` para `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // O proxy deve ser colocado antes do servidor se você usar Nitro
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
  ],
});
```

---

### Passo 12: Internacionalizar seus Metadados (Opcional)

Você também pode usar o hook `getIntlayer` para acessar seus dicionários de conteúdo em toda a sua aplicação:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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

### Passo 13: Recuperar a localidade em suas ações do servidor (Opcional)

Você pode querer acessar a localidade atual de dentro de suas ações do servidor ou endpoints de API.
Você pode fazer isso usando o auxiliar `getLocale` de `intlayer`.

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
    // Obtenha o cookie da solicitação (padrão: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Obtenha o cabeçalho da solicitação (padrão: 'x-intlayer-locale')
    getHeader: (name) => getRequestHeader(name),
    // Fallback usando negociação Accept-Language
    getAllHeaders: async () => {
      const headers = getRequestHeaders();
      const result: Record<string, string> = {};

      // Converta o TypedHeaders em um Record<string, string> simples
      for (const [key, value] of headers.entries()) {
        result[key] = value;
      }

      return result;
    },
  });

  // Recupere algum conteúdo usando getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Passo 14: Gerenciar páginas não encontradas (Opcional)

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
import { IntlayerProvider, useLocale } from "react-intlayer";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad executa antes da rota ser renderizada (tanto no servidor quanto no cliente)
  // É o lugar ideal para validar o prefixo de locale
  beforeLoad: ({ params }) => {
    // Obter locale dos parâmetros da rota (não dos cabeçalhos do servidor, pois beforeLoad executa tanto no cliente quanto no servidor)
    const localeParam = params.locale;

    // validatePrefix verifica se o locale é válido de acordo com sua configuração intlayer
    // Retorna: { isValid: boolean, localePrefix: string }
    // - isValid: true se o prefixo corresponder a um locale configurado (ou estiver vazio quando o prefixo for opcional)
    // - localePrefix: o prefixo validado ou o prefixo de locale padrão para redirecionamentos
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (isValid) {
      // Locale é válido, permitir que a rota seja renderizada normalmente
      return;
    }

    // Prefixo de locale inválido (por exemplo, /xyz/about onde "xyz" não é um locale válido)
    // Redirecionar para a página 404 com um prefixo de locale válido
    // Isso garante que a página 404 ainda esteja adequadamente localizada
    throw redirect({
      to: "/{-$locale}/404",
      params: { locale: localePrefix },
    });
  },
  component: RouteComponent,
  // notFoundComponent é chamado quando uma rota filha não existe
  // por exemplo, /en/pagina-inexistente dispara isso dentro do layout /en
  notFoundComponent: NotFoundLayout,
});

function RouteComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    // Envolver todo o segmento de locale com IntlayerProvider
    // Volta para defaultLocale quando o parâmetro locale é undefined (modo de prefixo opcional)
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}

// NotFoundLayout envolve o componente 404 com IntlayerProvider
// Isso garante que as traduções ainda funcionem na página 404
function NotFoundLayout() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <NotFoundComponent />
      {/* Incluir LocaleSwitcher para que os usuários possam alterar o idioma mesmo em 404 */}
      <LocaleSwitcher />
    </IntlayerProvider>
  );
}
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

---

### Passo 15: Configurar o TypeScript (Opcional)

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

---

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite evitar que eles sejam comitados no seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

---

## Extensão VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial Intlayer para VS Code**.

[Instalar no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ir Além

Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

---

## Referências da Documentação

- [Documentação do Intlayer](https://intlayer.org)
- [Documentação do Tanstack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md)
- [Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md)
- [Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

Este guia abrangente fornece tudo o que você precisa para integrar o Intlayer com o Tanstack Start para uma aplicação totalmente internacionalizada com roteamento sensível ao idioma e suporte a TypeScript.
