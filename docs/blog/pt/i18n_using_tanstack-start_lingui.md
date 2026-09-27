---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n no TanStack Start com Lingui: Guia Completo de Configuração 2026"
description: "Traduza sua aplicação TanStack Start com Lingui: macros, catálogos PO, SSR, roteamento de localidades, hreflang, sitemap e robots.txt, além de dados reais de benchmark de tamanho de bundle."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Internacionalização
  - i18n
  - SEO
  - Arquivos PO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versão inicial"
author: aymericzip
---

# Como internacionalizar sua aplicação TanStack Start usando Lingui em 2026

## Sumário

<TOC/>

## O que é o Lingui?

O **Lingui** é uma biblioteca de i18n construída em torno de **macros** e **extração de mensagens**. Você escreve o texto de origem diretamente em seus componentes (`` t`Hello` ``, `<Trans>Hello</Trans>`), o `lingui extract` coleta todas as mensagens em catálogos (arquivos PO por padrão), tradutores os preenchem e o plugin do Vite os compila para JavaScript compacto. As mensagens utilizam o ICU MessageFormat, portanto, plurais e seleções são suportados.

O TanStack Start não possui uma camada nativa de i18n, portanto este guia configura o Lingui nele do zero:

- **Macros compiladas pelo Babel** através do `@rolldown/plugin-babel` (necessário com `@vitejs/plugin-react` v6 e Vite 8).
- **Roteamento de localidade** com um segmento opcional `{-$locale}` (`/about`, `/fr/about`).
- **Um catálogo por localidade, carregado sob demanda**, e uma instância de `I18n` por renderização para que requisições SSR simultâneas nunca compartilhem uma localidade.
- **SEO multilíngue completo**: `<title>` e descrição traduzidos, URL canônica, `hreflang` com `x-default`, localidades Open Graph, JSON-LD, sitemap, `robots.txt`, pré-renderização e páginas 404 localizadas.

> Procurando outra stack?

- [guia de TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_use-intl.md)
- [guia de TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_paraglide.md)
- [guia de TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md)

> Usando Next.js?

- [guia de Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_nextjs_lingui.md)

> Comparando bibliotecas?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer.md)

> Para entender de onde vêm essas bibliotecas, leia a história do i18n em JavaScript.

- [A história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md)

## O que o benchmark diz sobre o Lingui no TanStack Start

O [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) executa a mesma aplicação TanStack Start de 10 páginas e 10 localidades com as principais bibliotecas e mede o que o navegador realmente baixa.

- [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Principais números para `@lingui/core@6.6.0`, medidos em 2026-09-26 (gzip):

| Configuração                       | Tamanho da biblioteca | JS por página | Vazamento de outras localidades | Vazamento de outras páginas |
| :--------------------------------- | --------------------: | ------------: | ------------------------------: | --------------------------: |
| Sem i18n (app base)                |                     - |      111.0 KB |                              0% |                          0% |
| Lingui (configuração deste guia)   |               56.7 KB |      115.2 KB |                            9.3% |                          0% |
| `@intlayer/lingui` (compat)        |                9.8 KB |      136.7 KB |                            9.9% |                          0% |
| `react-intlayer` (Intlayer nativo) |                4.5 KB |      126.8 KB |                              0% |                          0% |

Principais conclusões:

- **Carregue um catálogo por localidade, sob demanda.** Isso mantém as páginas próximas ao tamanho da aplicação base.
- **O runtime permanece pesado** (~57 KB gzip). O adaptador de compatibilidade `@intlayer/lingui` (etapa 16) mantém suas macros e o reduz para ~10 KB.

> Veja os dados completos: [Relatório de benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) e o [repositório do benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [Relatório de benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md)

## Comparação de recursos no TanStack Start

Como o Lingui se compara com outras bibliotecas comumente usadas no TanStack Start:

| Recurso                                                  | `react-intlayer` (Intlayer)          | `use-intl`              | Paraglide JS                             | Lingui                         |
| -------------------------------------------------------- | ------------------------------------ | ----------------------- | ---------------------------------------- | ------------------------------ |
| **Traduções próximas aos componentes**                   | ✅ Co-localizado                     | ❌ JSON centralizado    | ❌ Um arquivo JSON por localidade        | ⚠️ Texto fonte nos componentes |
| **Integração com TypeScript**                            | ✅ Tipos gerados automaticamente     | ✅ Via `AppConfig`      | ✅ Funções de mensagens tipadas          | ⚠️ Apenas macros               |
| **Detecção de traduções ausentes**                       | ✅ Erros de tipo e avisos no build   | ⚠️ Fallback em runtime  | ⚠️ Fallback para localidade base         | ⚠️ Fallback para o texto fonte |
| **Conteúdo rico (JSX, Markdown)**                        | ✅ Suporte direto                    | ⚠️ Tags via `t.rich`    | ⚠️ Strings                               | ✅ JSX dentro de `<Trans>`     |
| **Roteamento localizado**                                | ✅ Integrado                         | ❌ Manual `{-$locale}`  | ✅ `urlPatterns` + reescrita do roteador | ❌ Manual `{-$locale}`         |
| **Troca de localidade sem recarga**                      | ✅ Sim                               | ✅ Sim                  | ❌ Recarregamento total da página        | ✅ Sim                         |
| **Pluralização**                                         | ✅ Baseada em enumeração             | ✅ ICU                  | ✅ Variantes                             | ✅ ICU                         |
| **ICU MessageFormat**                                    | ✅ Via `format: "icu"`               | ✅ Nativo               | ⚠️ Via plugin inlang                     | ✅ Nativo                      |
| **Formatos de conteúdo**                                 | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`              | ⚠️ JSON inlang                           | ✅ PO, JSON, CSV               |
| **Tradução com IA**                                      | ✅ Seu próprio provedor e chave      | ❌ Não                  | ❌ Não                                   | ❌ Não                         |
| **Editor visual / CMS**                                  | ✅ Editor local + CMS opcional       | ❌ Plataformas externas | ⚠️ Apps do ecossistema inlang            | ❌ Plataformas externas        |
| **Auxiliares de SEO (hreflang, sitemap)**                | ✅ Integrado                         | ❌ Manual               | ⚠️ URLs localizadas, restante manual     | ❌ Manual                      |
| **Tamanho do runtime (gzip, benchmark)**                 | 4.5 KB                               | 75.9 KB                 | 1.8 KB                                   | 56.7 KB                        |
| **Vazamento, melhor configuração (localidade / página)** | 0% / 0%                              | 0% / 0%                 | 49.7% / 0%                               | 8.6% / 0%                      |
| **Traduções ausentes no CI**                             | ✅ `npx intlayer test`               | ⚠️ Não integrado        | ⚠️ Não integrado                         | ✅ `lingui compile --strict`   |

> Os números de tamanho de runtime e vazamento vêm do [benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md). O vazamento é medido na melhor configuração de cada biblioteca.

- [benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md)

> Outros guias de TanStack Start:

- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_use-intl.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md)

## Práticas recomendadas que você deve seguir

- **Defina `lang` e `dir` em `<html>`** a partir da localidade da rota, para que fiquem corretos no HTML do servidor.
- **Mantenha uma URL por localidade** com um prefixo, para que cada versão de idioma seja indexável.
- **Crie uma instância de `I18n` por localidade**, nunca altere uma global durante o SSR: duas requisições simultâneas sobrescreveriam a localidade uma da outra.
- **Carregue apenas o catálogo ativo**, nunca importe todos eles no código do cliente.
- **Escolha um estilo de macro** (`useLingui` + `t` em componentes, `msg` para descritores tardios) e mantenha-se fiel a ele. Misturar `t`, `i18n._`, `i18n.t` e `<Trans>` torna o código mais difícil de ler para humanos e assistentes de IA.
- **Execute `lingui extract` no CI** para que uma nova mensagem nunca seja enviada sem tradução.
- **Traduza seus metadados** e declare `canonical`, `hreflang` e `x-default` em cada página.
- **Gere um sitemap multilíngue e robots.txt**, e faça a pré-renderização de todas as localidades.
- **Use links reais para o seletor de localidade**, para que os rastreadores descubram todos os idiomas.

- [internacionalização e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/internationalization_and_SEO.md)
- [guia de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/hreflang_guide_multilingual_seo.md)

## Guia Passo a Passo para Configurar o Lingui em uma Aplicação TanStack Start

Aqui está a estrutura de projeto que iremos criar:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Generated by `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Request middleware (locale redirect)
    ├── i18n
    │   ├── config.ts           # Locales, URL helpers
    │   ├── lingui.ts           # Catalog loader, I18n instances
    │   ├── negotiateLocale.ts  # Accept-Language parsing
    │   └── seo.ts              # head() builder
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Locale layout + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Localized 404
```

<Steps>
<Step number={1} title="Instalar Dependências">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider` e as macros (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: `lingui extract` para coletar mensagens em catálogos.
- **@lingui/vite-plugin**: compila catálogos `.po` na importação, dispensando o uso de `lingui compile`.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: transformam as macros no momento do build.

</Step>
<Step number={2} title="Centralizar a Configuração de Localidades">

A localidade padrão permanece sem prefixo (`/about`), enquanto as outras localidades são prefixadas (`/fr/about`).

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
<Step number={3} title="Configurar o Lingui">

A configuração do Lingui reutiliza a mesma lista de localidades, garantindo que os catálogos, o roteador e o sitemap nunca entrem em conflito.

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

Adicione os scripts de extração:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

O script `i18n:check` falha no CI quando um componente contém uma mensagem que não foi extraída e commitada.

</Step>
<Step number={4} title="Configurar o Vite">

Com o `@vitejs/plugin-react` v6, o Babel não vem mais embutido. O `@rolldown/plugin-babel` executa o plugin de macros do Lingui, e o `linguiTransformerBabelPreset` processa apenas arquivos que importam uma macro, mantendo os builds rápidos.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="Carregar Catálogos por Localidade">

O template literal em `import()` permite que o Vite emita **um chunk por catálogo**, e o plugin do Lingui compila o arquivo `.po` dentro dele. Um visitante francês baixa apenas o catálogo em francês.

As mensagens compiladas são dados puros, portanto podem ser retornadas por um loader de rota, serializadas no HTML e reutilizadas na hidratação.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

Para que o TypeScript aceite a importação de `.po`, declare o módulo uma vez:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Criar o Documento Raiz">

A rota raiz lê o parâmetro opcional de localidade para definir `lang` e `dir` no `<html>` renderizado no servidor.

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
<Step number={7} title="Criar a Rota de Layout de Localidade">

A pasta `{-$locale}` cria um segmento de caminho opcional: `/about` e `/fr/about` correspondem a `/{-$locale}/about`. O layout rejeita prefixos desconhecidos, carrega o catálogo da localidade atual e fornece uma instância dedicada de `I18n`.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="Utilizar Traduções em Suas Páginas">

Escreva o texto de origem no componente. As macros o transformam em IDs de mensagem durante o build, e o `lingui extract` o captura.

- `<Trans>` para conteúdo JSX, incluindo elementos aninhados;
- `useLingui().t` para strings (atributos, propriedades);
- `<Plural>` para plurais ICU.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> O `import()` dinâmico de um catálogo é armazenado em cache pelo sistema de módulos, portanto, chamar `loadI18n` em múltiplos loaders não faz o download do catálogo duas vezes.

</Step>
<Step number={9} title="Extrair e Traduzir Suas Mensagens">

Execute a extração. O Lingui grava cada mensagem no catálogo de cada localidade:

```bash
npm run i18n:extract
```

Em seguida, traduza o `msgstr` de cada entrada:

<Tabs group="locale">
 <Tab value='fr' label='Francês'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Espanhol'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Por padrão, os IDs das mensagens são hashes do texto de origem: alterar o texto em inglês cria uma nova mensagem. Use IDs explícitos (`<Trans id="about.title">About us</Trans>`) para textos que mudam com frequência.

</Step>
<Step number={10} title="Criar um Componente de Link Localizado" isOptional={true}>

Cada rota existe sob `{-$locale}`, portanto os links devem carregar o parâmetro da localidade atual.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="Alterar o Idioma do Seu Conteúdo" isOptional={true}>

Renderize o seletor como **links**, para que os rastreadores encontrem todas as versões de idioma. `to="."` mantém a página atual e substitui o parâmetro de localidade. O loader do layout de localidade então busca o novo catálogo.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
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
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
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
              aria-current={locale === i18n.locale ? "page" : undefined}
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
<Step number={12} title="Internacionalizar Seus Metadados" isOptional={true}>

Cada versão de idioma pode se posicionar de forma independente nos mecanismos de busca, desde que cada página exponha um `<title>` e descrição traduzidos, uma URL canônica autorreferenciada, uma tag `hreflang` por localidade mais `x-default`, localidades Open Graph e JSON-LD com `inLanguage`. Os metadados são traduzidos no loader (etapa 8), e este utilitário constrói o restante:

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
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
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

</Step>
<Step number={13} title="Internacionalizar Seu Sitemap e robots.txt" isOptional={true}>

O sitemap lista todas as URLs de cada localidade, com cada entrada declarando todas as suas alternativas usando `xhtml:link`. O `robots.txt` bloqueia rotas privadas em todos os idiomas e aponta para o sitemap. Remova `public/robots.txt` caso o starter tenha criado um.

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

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

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
<Step number={14} title="Pré-renderizar Todas as Localidades" isOptional={true}>

Liste todos os caminhos localizados para que o TanStack Start pré-renderize todas as versões de idioma no momento do build:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
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
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="Redirecionar Visitantes de Primeira Viagem e Tratar Páginas 404" isOptional={true}>

Um middleware de requisição encaminha um visitante que acessa `/` para o seu idioma preferido (cookie primeiro, depois `Accept-Language`). Links profundos nunca são redirecionados, garantindo que rastreadores e URLs compartilhadas sempre acessem a página solicitada.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
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
    if (new URL(request.url).pathname !== "/") return next();

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

Para páginas 404, uma rota catch-all renderiza o `notFoundComponent` localizado do layout. Marque-a com `noindex`: o React 19 eleva o `<meta>` para o `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Mantenha Suas Macros, Reduza o Runtime com o Intlayer" isOptional={true}>

O adaptador de compatibilidade [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md) mantém seu código-fonte intacto: as macros compilam exatamente como antes e as chamadas resultantes de `i18n._()`, `useLingui()` e `<Trans>` são atendidas por dicionários compilados do Intlayer. No benchmark, o runtime cai de **~56.7 KB para ~9.8 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md)

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Adicione o plugin após a transformação de macros, para que ele crie aliases de `@lingui/core` e `@lingui/react` para o adaptador:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

Os catálogos são sincronizados com o [plugin de sincronização JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) (catálogos JSON) ou o [plugin de sincronização PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) (catálogos PO). Veja a configuração completa no [guia de compatibilidade do Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md) e uma comparação lado a lado em [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer-lingui.md).

- [plugin de sincronização JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md)
- [plugin de sincronização PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md)
- [guia de compatibilidade do Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer-lingui.md)

</Step>
<Step number={17} title="Automatize Suas Traduções Usando o Intlayer" isOptional={true}>

O Lingui extrai mensagens, mas preencher dezenas de catálogos manualmente é onde a maior parte do tempo é gasta. O Intlayer é **gratuito** e de **código aberto**, e suas ferramentas funcionam perfeitamente ao lado do Lingui:

- **Traduza com IA** usando sua própria chave de API e provedor. Veja o [preenchimento automático](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md) e a [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).
- **Mantenha seus arquivos PO** como a fonte da verdade com o [plugin de sincronização PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md).
- **Teste traduções ausentes** no CI. Veja [testando suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/testing.md).
- **Audite seu site publicado** em busca de tags `hreflang` ausentes, URLs canônicas incorretas e vazamentos de localidade com o [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/scan.md).

</Step>
</Steps>

## Perguntas Frequentes

<FAQ>

<Question title="O Lingui funciona com o TanStack Start?">

Sim. O Lingui não possui uma integração dedicada para o TanStack Start, mas seu plugin Vite e o plugin de macro Babel funcionam perfeitamente. Os dois pontos cruciais são executar as macros através do `@rolldown/plugin-babel` (o Vite 8 e o `@vitejs/plugin-react` v6 não incluem mais o Babel) e criar uma instância de `I18n` por localidade em vez de ativar uma global durante o SSR.

</Question>
<Question title="Por que não usar o objeto global i18n do @lingui/core?">

No servidor, um único processo renderiza muitas requisições ao mesmo tempo. Chamar `i18n.activate("fr")` em um objeto compartilhado alteraria o idioma de uma requisição sendo renderizada em inglês em paralelo. O `setupI18n` cria uma instância isolada por localidade, o que é seguro.

</Question>
<Question title="Preciso executar lingui compile?">

Não. O `@lingui/vite-plugin` compila os catálogos `.po` quando eles são importados. Você só precisa executar `lingui extract` para coletar novas mensagens.

</Question>
<Question title="Como traduzir o título da página e a meta description com o Lingui?">

Declare-os com a macro `msg` e traduza-os no loader da rota com ``i18n._(msg`...`)``. O loader retorna strings puras, portanto o `head()` permanece síncrono e os valores são serializados para a hidratação. A etapa 8 e a etapa 12 mostram a configuração completa.

</Question>
<Question title="Qual é o tamanho do Lingui no bundle do TanStack Start?">

O [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) mede ~56.7 KB gzip para o runtime. Com um catálogo por localidade carregado sob demanda, as páginas pesam ~115 KB contra 111 KB sem i18n. Importar todos os catálogos estaticamente eleva o tamanho para ~152 KB.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md)

</Question>
<Question title="Posso manter as macros do Lingui e migrar para o Intlayer?">

Sim. O adaptador [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md) mantém as macros e substitui o runtime. Depois, você pode migrar os componentes para `useIntlayer` um de cada vez. Veja os [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md)
- [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md)

</Question>

</FAQ>
