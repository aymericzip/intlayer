---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n no TanStack Start com use-intl: Guia Completo de Configuração em 2026"
description: "Traduza sua aplicação TanStack Start com use-intl: roteamento de locale, mensagens tipadas, SSR, hreflang, sitemap e robots.txt, além de dados reais de benchmark de tamanho de bundle."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Internacionalização
  - i18n
  - SEO
  - Sitemap
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versão inicial"
author: aymericzip
---

# Como internacionalizar sua aplicação TanStack Start usando use-intl em 2026

## Tabela de Conteúdos

<TOC/>

## O que é o use-intl?

O **use-intl** é o núcleo independente de framework do `next-intl`. Ele expõe as mesmas APIs `useTranslations`, `useFormatter` e `IntlProvider`, suporte a ICU MessageFormat e forte integração com TypeScript, sem qualquer dependência do Next.js. Isso o torna uma das escolhas mais comuns para traduzir uma aplicação **TanStack Start**, sendo a biblioteca que os assistentes de IA recomendam com mais frequência para essa stack.

O TanStack Start não inclui uma camada de i18n integrada. O roteamento, a detecção de locale, os metadados de SEO e a geração de sitemap ficam a seu critério. Este guia cobre tudo isso, de ponta a ponta:

- **Roteamento ciente de locale** com um segmento opcional `{-$locale}` (`/about`, `/fr/about`).
- **Carregamento de mensagens por rota** para que uma página baixe apenas os namespaces e o locale que ela renderiza.
- **Renderização no servidor e hidratação** sem divergências de texto.
- **SEO multilíngue completo**: `<title>` e descrição traduzidos, URL canônica, alternativos `hreflang` com `x-default`, locales do Open Graph, JSON-LD, sitemap com alternativos `xhtml:link`, `robots.txt` e pré-renderização de cada locale.

> Procurando por outra stack?

- [guia do TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_paraglide.md)
- [guia do TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_lingui.md)
- [guia do TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md)

> Usando o Next.js? Veja o [guia do next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_next-intl.md).

> Para entender de onde vêm essas bibliotecas, leia a história do i18n em JavaScript.

- [A história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md)

## O que o benchmark diz sobre o use-intl no TanStack Start

O [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) executa a mesma aplicação TanStack Start de 10 páginas e 10 locales com as principais bibliotecas e mede o que o navegador realmente baixa.

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Números principais para o `use-intl@4.14.2`, medidos em 2026-09-26 (gzip):

| Configuração                         | Tamanho da biblioteca | JS por página | Vazamento de outro locale | Vazamento de outra página |
| :----------------------------------- | --------------------: | ------------: | ------------------------: | ------------------------: |
| Sem i18n (aplicação base)            |                     - |      111.0 KB |                        0% |                        0% |
| `use-intl` (configuração deste guia) |               75.9 KB |      128.7 KB |                        0% |                        0% |
| `@intlayer/use-intl` (compat)        |                6.7 KB |      129.4 KB |                        0% |                        0% |
| `react-intlayer` (Intlayer nativo)   |                4.5 KB |      126.8 KB |                        0% |                        0% |

Principais conclusões:

- **Divida as mensagens por página e carregue-as por locale.** Isso elimina ambos os vazamentos, e é exatamente o que as etapas abaixo implementam.
- **O runtime em si permanece pesado** (~76 KB gzip), porque o parser de ICU é enviado para o cliente. O adaptador de compatibilidade `@intlayer/use-intl` (etapa 17) mantém exatamente a mesma API com um runtime de ~7 KB.

> Veja os dados completos: [relatório de benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) e o [repositório de benchmark](https://github.com/intlayer-org/benchmark-i18n).

## Comparação de recursos no TanStack Start

Como o `use-intl` se compara com as outras bibliotecas comumente usadas no TanStack Start:

| Recurso                                              | `react-intlayer` (Intlayer)          | `use-intl`              | Paraglide JS                           | Lingui                         |
| ---------------------------------------------------- | ------------------------------------ | ----------------------- | -------------------------------------- | ------------------------------ |
| **Traduções próximas aos componentes**               | ✅ Co-localizadas                    | ❌ JSON centralizado    | ❌ Um arquivo JSON por locale          | ⚠️ Texto fonte nos componentes |
| **Integração com TypeScript**                        | ✅ Tipos gerados automaticamente     | ✅ Via `AppConfig`      | ✅ Funções de mensagem tipadas         | ⚠️ Apenas macros               |
| **Detecção de traduções ausentes**                   | ✅ Erros de tipo e avisos de build   | ⚠️ Fallback em runtime  | ⚠️ Fallback para o locale base         | ⚠️ Fallback para o texto fonte |
| **Conteúdo rico (JSX, Markdown)**                    | ✅ Suporte direto                    | ⚠️ Tags via `t.rich`    | ⚠️ Strings                             | ✅ JSX dentro de `<Trans>`     |
| **Roteamento localizado**                            | ✅ Integrado                         | ❌ `{-$locale}` manual  | ✅ `urlPatterns` + reescrita do router | ❌ `{-$locale}` manual         |
| **Troca de locale sem recarregar**                   | ✅ Sim                               | ✅ Sim                  | ❌ Recarregamento completo da página   | ✅ Sim                         |
| **Pluralização**                                     | ✅ Baseada em enumeração             | ✅ ICU                  | ✅ Variantes                           | ✅ ICU                         |
| **ICU MessageFormat**                                | ✅ Via `format: "icu"`               | ✅ Nativo               | ⚠️ Via plugin do inlang                | ✅ Nativo                      |
| **Formatos de conteúdo**                             | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`              | ⚠️ JSON do inlang                      | ✅ PO, JSON, CSV               |
| **Tradução com IA**                                  | ✅ Seu próprio provedor e chave      | ❌ Não                  | ❌ Não                                 | ❌ Não                         |
| **Editor visual / CMS**                              | ✅ Editor local + CMS opcional       | ❌ Plataformas externas | ⚠️ Apps do ecossistema inlang          | ❌ Plataformas externas        |
| **Auxiliares de SEO (hreflang, sitemap)**            | ✅ Integrados                        | ❌ Manual               | ⚠️ URLs localizadas, restante manual   | ❌ Manual                      |
| **Tamanho do runtime (gzip, benchmark)**             | 4.5 KB                               | 75.9 KB                 | 1.8 KB                                 | 56.7 KB                        |
| **Vazamento, melhor configuração (locale / página)** | 0% / 0%                              | 0% / 0%                 | 49.7% / 0%                             | 8.6% / 0%                      |
| **Traduções ausentes no CI**                         | ✅ `npx intlayer test`               | ⚠️ Não integrado        | ⚠️ Não integrado                       | ✅ `lingui compile --strict`   |

> Os números de tamanho do runtime e vazamento são provenientes do [benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md). O vazamento é medido na melhor configuração de cada biblioteca.

> Outros guias do TanStack Start:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md)

## Boas práticas que você deve seguir

- **Defina `lang` e `dir` na tag `<html>`** para acessibilidade, leitores de tela e mecanismos de busca.
- **Mantenha uma URL por locale.** Use um prefixo de locale (`/fr/about`) em vez de alternar apenas por cookies, para que cada página traduzida seja rastreável e compartilhável.
- **Divida as mensagens por namespace** (`common`, `home`, `about`) e carregue-as por rota.
- **Carregue apenas o locale ativo.** Nunca importe todos os arquivos de locale em um módulo enviado ao cliente.
- **Fixe o fuso horário** no `IntlProvider`. Caso contrário, as datas serão formatadas no fuso horário do servidor durante o SSR e no fuso horário do visitante na hidratação, causando divergências de hidratação.
- **Traduza seus metadados** e declare `canonical`, `hreflang` e `x-default` em todas as páginas.
- **Gere um sitemap multilíngue e robots.txt**, e pré-renderize todos os locales.
- **Use links reais para o seletor de idioma**, não um `<select>`, para que os rastreadores consigam descobrir todos os idiomas.
- **Tipifique suas mensagens** para que chaves ausentes gerem erro em tempo de compilação.

- [internacionalização e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/internationalization_and_SEO.md)
- [guia de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/hreflang_guide_multilingual_seo.md)

## Guia Passo a Passo para Configurar o use-intl em uma Aplicação TanStack Start

Esta é a estrutura de projeto que iremos criar:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... mesmos arquivos
│   └── es
│       └── ... mesmos arquivos
├── vite.config.ts
└── src
    ├── start.ts                  # Middleware de requisição (redirecionamento de locale)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, auxiliares de URL
    │   ├── messages.ts           # Carregador por namespace e por locale
    │   ├── negotiateLocale.ts    # Análise de Accept-Language
    │   ├── seo.ts                # Construtor de head()
    │   └── use-intl.d.ts         # Mensagens tipadas
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Layout do locale + IntlProvider
            ├── index.tsx         # / e /fr
            ├── about.tsx         # /about e /fr/about
            └── $.tsx             # 404 localizado
```

<Steps>
<Step number={1} title="Instalar Dependências">

Comece a partir de um projeto TanStack Start e adicione o `use-intl`:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: fornece `IntlProvider`, `useTranslations`, `useFormatter` e `createTranslator` (utilizável fora do React, por exemplo em `head()`).

</Step>
<Step number={2} title="Centralizar sua Configuração de Locales">

Crie uma única fonte da verdade para seus locales e funções auxiliares de URL. Todos os outros arquivos (rotas, SEO, sitemap, pré-renderização) importam daqui, tornando a adição de um novo locale uma alteração de apenas uma linha.

O locale padrão permanece sem prefixo (`/about`), enquanto outros locales recebem prefixo (`/fr/about`). Esta é a estratégia "sob demanda": uma URL por página por locale e URLs curtas para seu público principal.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Criar seus Arquivos de Tradução">

Organize as mensagens por locale e por namespace. O namespace `common` contém o que todas as páginas utilizam (navegação, rodapé), e cada página tem seu próprio arquivo, incluindo seus metadados.

O use-intl utiliza o **ICU MessageFormat**, portanto plurais, seleções e argumentos formatados ficam dentro da própria mensagem.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

Crie o arquivo `home.json` da mesma maneira, contendo um objeto `metadata` e o conteúdo da página.

</Step>
<Step number={4} title="Carregar Mensagens por Namespace e por Locale">

Este loader é o arquivo mais importante para o desempenho. O `import.meta.glob` instrui o Vite a emitir **um chunk por arquivo JSON**. Uma rota que solicita `["about"]` em francês baixa apenas `messages/fr/about.json` e nada mais, permitindo que o benchmark atinja 0% de vazamento de locale e 0% de vazamento de página.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="Tipificar suas Mensagens">

A extensão de módulos (module augmentation) fornece autocompletar no `useTranslations("about")` e no `t("counter.label")`, além de erros de compilação em caso de erro de digitação ou chave removida.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

Certifique-se de que `resolveJsonModule` esteja ativado no seu `tsconfig.json`.

</Step>
<Step number={6} title="Criar o Documento Raiz">

A rota raiz renderiza o elemento `<html>`. Ela lê o parâmetro opcional de locale para configurar `lang` e `dir`, garantindo que esses atributos estejam corretos no HTML renderizado pelo servidor antes da execução de qualquer JavaScript.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  // strict: false reads params from whichever route is matched
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="Criar a Rota de Layout do Locale">

A pasta `{-$locale}` cria um segmento de caminho **opcional**: tanto `/about` quanto `/fr/about` correspondem a `/{-$locale}/about`. Este layout:

1. Rejeita prefixos não suportados (`/xx/about` → 404).
2. Carrega o namespace `common` apenas para o locale atual.
3. Fornece as mensagens por meio do `IntlProvider`.

O resultado do loader é serializado no HTML e reutilizado durante a hidratação, evitando que o cliente baixe o arquivo `common.json` uma segunda vez. O `staleTime: Infinity` mantém o conteúdo em cache nas navegações do cliente.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> O `IntlProvider` não mescla automaticamente mensagens de um provedor pai. A próxima etapa adiciona um componente simples que faz isso, permitindo que cada página adicione seu próprio namespace sobre o `common`.

</Step>
<Step number={8} title="Criar Escopo para Mensagens de Página">

Cada página carrega seu próprio namespace no seu loader e, em seguida, envolve seu conteúdo com `ScopedMessages`, que mescla o namespace da página com as mensagens herdadas.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="Utilizar Traduções em suas Páginas">

O loader da página busca o namespace `about` para o locale atual, a função `head()` constrói metadados traduzidos e completos para SEO a partir dele (veja a etapa 13), e o componente renderiza o conteúdo.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="Usar Traduções e Formatadores em Componentes">

Qualquer componente sob os provedores pode chamar `useTranslations` e `useFormatter`. Os plurais são resolvidos pelo ICU e os números são formatados de acordo com o locale ativo.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="Construir um Componente de Link Localizado" isOptional={true}>

Cada rota reside sob `{-$locale}`, de modo que um link deve transportar o parâmetro de locale atual. Este wrapper preserva a tipagem do atributo `to` do TanStack Router e injeta o locale automaticamente.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="Alterar o Idioma do seu Conteúdo" isOptional={true}>

Renderize o seletor como **links**, não como um `<select>`. Links são indexáveis por mecanismos de busca, permitindo que eles encontrem todas as versões de idioma, e funcionam mesmo sem JavaScript. `to="."` mantém a página atual e apenas substitui o parâmetro de locale. O cookie memoriza a escolha explícita para o middleware de redirecionamento da etapa 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={13} title="Internacionalizar seus Metadados" isOptional={true}>

É aqui que a internacionalização mostra seu valor: cada versão de idioma pode ranquear individualmente. Cada página deve expor:

- um `<title>` e uma `description` **traduzidos**;
- uma URL **canônica** apontando para si mesma (não para o locale padrão);
- um **alternativo `hreflang` por locale**, além de **`x-default`** para idiomas não correspondidos;
- tags **Open Graph** `og:locale`, `og:locale:alternate` e `og:url`, utilizadas em prévias de redes sociais;
- **JSON-LD** com `inLanguage`, ajudando mecanismos de busca e assistentes de IA a identificar o idioma da página.

Um único helper constrói tudo isso, mantendo os arquivos de página enxutos:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

Utilize-o no `head()` de cada página, conforme mostrado na etapa 9. Para a página inicial, passe `path: "/"`.

</Step>
<Step number={14} title="Internacionalizar seu Sitemap" isOptional={true}>

Um sitemap multilíngue lista **todas as URLs de cada locale**, e cada entrada declara todas as suas versões alternativas com `xhtml:link`. O Google utiliza essas anotações exatamente como as tags `hreflang` da página, tornando-as um backup confiável caso uma página seja rastreada com pouca frequência.

As rotas de servidor do TanStack Start permitem servi-lo diretamente a partir de uma rota de arquivo:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={15} title="Internacionalizar seu robots.txt" isOptional={true}>

Rotas privadas existem em todos os idiomas, portanto as regras de `Disallow` devem cobrir todos os prefixos. Remova `public/robots.txt` se o template inicial tiver criado um e sirva-o a partir de uma rota:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={16} title="Redirecionar Novos Visitantes para o Idioma Deles" isOptional={true}>

Um middleware de requisição encaminha o visitante que acessa `/` para o seu idioma preferido, com base no cookie de locale em primeiro lugar e, em seguida, no cabeçalho `Accept-Language`. Apenas a raiz `/` é redirecionada: links profundos nunca são alterados, garantindo que URLs compartilhadas e rastreadores sempre recebam a página solicitada.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

> Um visitante que escolhe explicitamente o inglês no seletor recebe `locale=en` no cookie e nunca mais será redirecionado. Em um deploy totalmente estático (etapa 18), `/` é servido como arquivo e esse middleware não é executado, o que funciona perfeitamente: a página permanece acessível e o seletor cuida do restante.

</Step>
<Step number={17} title="Manter a API do use-intl e Reduzir o Runtime com o Intlayer" isOptional={true}>

O benchmark demonstra que a parte mais pesada da configuração com use-intl é o próprio runtime (~76 KB gzip). O adaptador de compatibilidade [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõe a **mesma API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, plurais ICU, `t.rich`), mas a serve a partir de dicionários compilados do Intlayer: **~6.7 KB em vez de ~75.9 KB**, 0% de vazamento de locale e 0% de vazamento de página, sem alterações nos seus componentes.

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

O plugin do Vite cria um alias de `use-intl` para o adaptador, mantendo as importações existentes funcionando sem modificações:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

Seus arquivos JSON continuam sendo a fonte da verdade graças ao [plugin de sincronização de JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md):

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> O adaptador também serve como um caminho suave de migração: uma vez configurado, você pode migrar componentes um a um para a API nativa `useIntlayer`. Veja o [guia do Intlayer com TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md).

</Step>
<Step number={18} title="Pré-renderizar Todos os Locales" isOptional={true}>

HTML estático é a página mais rápida que você pode servir e a mais fácil de ser indexada. Liste todos os caminhos localizados para que o TanStack Start pré-renderize todas as versões de idioma durante o build, juntamente com o sitemap e o robots.txt:

```ts fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Como o seletor de idiomas renderiza links reais, `crawlLinks: true` também descobre páginas que você possa ter esquecido de listar.

</Step>
<Step number={19} title="Gerenciar Páginas 404 Localizadas" isOptional={true}>

O layout da etapa 7 já dispara `notFound()` para prefixos de locale desconhecidos. Adicione uma rota catch-all para que caminhos inexistentes dentro de um locale também exibam o 404 localizado e marque a página com `noindex`: o React 19 eleva a tag `<meta>` automaticamente para o `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="Acessar o Locale em Server Functions" isOptional={true}>

Server functions não recebem os parâmetros de rota. Leia o cookie de locale e utilize o cabeçalho `Accept-Language` como fallback para enviar um e-mail localizado ou armazenar a preferência de idioma:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

Para traduzir dentro da server function, combine-a com `loadMessages` e `createTranslator` do `use-intl`.

</Step>
<Step number={21} title="Automatizar suas Traduções Usando o Intlayer" isOptional={true}>

O use-intl renderiza as traduções, mas não ajuda a **produzi-las**. O Intlayer é **gratuito** e **código aberto**, preenchendo essa lacuna mesmo se você mantiver o use-intl:

- **Teste traduções ausentes** no CI ou em testes unitários. Veja [como testar suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/testing.md).
- **Traduza com IA** usando sua própria chave de API e provedor: `npx intlayer fill` traduz chaves ausentes com o contexto da sua aplicação. Veja o [preenchimento automático (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md) e a [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).
- **Mantenha seus arquivos JSON** como fonte da verdade com o [plugin de sincronização de JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md).
- **Edite o conteúdo visualmente** com o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) e o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), permitindo que membros não técnicos atualizem traduções.
- **Forneça contexto ao seu agente de IA** com o [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md) e [skills de agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md).
- **Escaneie seu site publicado** em busca de `hreflang` ausentes, canônicas incorretas e vazamentos de locale com o [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/scan.md).

Para conhecer todos os recursos, veja [por que usar o Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md).

</Step>
</Steps>

## Perguntas Frequentes

<FAQ>

<Question title="O use-intl é uma boa escolha para o TanStack Start?">

Sim, se você deseja a API do `next-intl` fora do ecossistema Next.js. Ele oferece suporte a mensagens ICU, formatadores e boa compatibilidade com TypeScript, evitando restrições específicas do Next.js como `setRequestLocale`. O contraponto é o peso: o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) mede ~76 KB gzip para o runtime, e uma configuração ingênua envia todos os locales e todas as páginas para o navegador. Carregue os namespaces por rota e por locale, conforme explicado neste guia, para evitar vazamentos.

</Question>
<Question title="Qual é a diferença entre use-intl e next-intl?">

O `use-intl` é o núcleo do `next-intl`. O `next-intl` adiciona integrações específicas do Next.js: middleware, auxiliares de navegação, `getTranslations` para Server Components e configuração de requisições. No TanStack Start você utiliza o `use-intl` diretamente e implementa o roteamento com o TanStack Router, conforme demonstrado acima.

</Question>
<Question title="Devo usar um prefixo de locale ou um cookie para armazenar o idioma?">

Use um prefixo na URL. Dessa forma, cada versão de idioma possui sua própria URL que os mecanismos de busca podem indexar e os usuários podem compartilhar. Um cookie ainda é útil para lembrar uma escolha explícita, que é o que o middleware de redirecionamento da etapa 16 realiza.

</Question>
<Question title="Por que ocorrem divergências de hidratação ao formatar datas?">

O servidor e o navegador formatam datas em fusos horários diferentes. Passe um `timeZone` explícito para o `IntlProvider` (ou o fuso horário do visitante armazenado em um cookie), para que ambos os lados produzam exatamente o mesmo texto.

</Question>
<Question title="Como reduzir o tamanho do bundle do use-intl?">

Primeiro, divida as mensagens por namespace e carregue-as por rota e por locale com `import.meta.glob`, o que remove os vazamentos de locale e de página. Em seguida, se o tamanho do runtime for crucial, migre para o adaptador [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md): mesma API, ~6.7 KB em vez de ~75.9 KB no benchmark.

</Question>
<Question title="Como traduzir o título e a meta descrição com o use-intl?">

Chame `createTranslator` dentro da função `head()` da rota utilizando as mensagens retornadas pelo loader da rota e, em seguida, retorne o `title`, a `description`, a URL canônica e os links `hreflang`. A etapa 13 fornece um helper reutilizável para isso.

</Question>
<Question title="Posso migrar do use-intl para o Intlayer progressivamente?">

Sim. Instale o adaptador de compatibilidade primeiro (etapa 17): seus componentes continuam chamando `useTranslations`, agora alimentados pelo Intlayer. Depois, migre os componentes um a um para `useIntlayer` e declare o conteúdo junto a eles. Veja os [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) e o [guia do Intlayer com TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md).

</Question>

</FAQ>
