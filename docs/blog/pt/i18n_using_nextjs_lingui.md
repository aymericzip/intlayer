---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n no Next.js 16 com Lingui: Guia de Configuração do App Router"
description: "Configure o Lingui no App Router do Next.js 16: Server Components, macros SWC, roteamento por proxy, generateMetadata, hreflang, sitemap e robots.txt, com dados de benchmark."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Internacionalização
  - i18n
  - SEO
  - Blog
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versão inicial"
author: aymericzip
---

# Como internacionalizar sua aplicação Next.js usando Lingui em 2026

## Sumário

<TOC/>

## O que é o Lingui?

O **Lingui** é uma biblioteca de i18n construída em torno de **macros** e **extração de mensagens**. Você escreve o texto de origem diretamente em seus componentes (`` t`Hello` ``, `<Trans>Hello</Trans>`), o comando `lingui extract` coleta todas as mensagens em catálogos (arquivos PO por padrão) e um loader os compila para JavaScript compacto. As mensagens utilizam o ICU MessageFormat, e o Lingui suporta **React Server Components** no App Router.

Este guia configura o Lingui em um projeto **Next.js 16 App Router**, com:

- **Macros compiladas por SWC**, para que o Turbopack mantenha sua velocidade.
- **Server e Client Components** compartilhando a mesma API `Trans` e `useLingui`.
- **Roteamento de localidade** através de `proxy.ts`: `/about` para a localidade padrão, `/fr/about` para as demais, além de detecção de idioma na primeira visita.
- **Renderização estática** de todas as localidades com `generateStaticParams`.
- **SEO multilíngue completo**: `generateMetadata` traduzido, canonical, `hreflang` com `x-default`, localidades Open Graph, JSON-LD, `sitemap.ts`, `robots.ts` e páginas 404 localizadas.

> Procurando outra biblioteca?

- [guia de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_next-intl.md)
- [guia de next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_next-i18next.md)
- [guia de Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)

> Usando TanStack Start?

- [guia de TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_lingui.md)

> Comparando bibliotecas?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md)

> Para entender de onde vêm essas bibliotecas, leia a história do i18n em JavaScript.

- [A história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md)

## O que o benchmark diz sobre o Lingui no Next.js

O [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md) executa a mesma aplicação Next.js de 10 páginas e 10 localidades com as principais bibliotecas e mede o que o navegador realmente baixa.

- [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Principais números para `@lingui/core@6.6.0` no Next.js 16, medidos em 2026-09-26 (gzip):

| Configuração                       | Tamanho da biblioteca | JS por página | Vazamento de outras localidades | Vazamento de outras páginas |
| :--------------------------------- | --------------------: | ------------: | ------------------------------: | --------------------------: |
| Sem i18n (app base)                |                     - |      141.0 KB |                              0% |                          0% |
| Lingui, um catálogo por localidade |               72.1 KB |      145.4 KB |                            2.8% |                       89.9% |
| `@intlayer/lingui` (compat)        |               10.7 KB |      221.6 KB |                             50% |                         90% |
| `next-intlayer` (Intlayer nativo)  |                4.9 KB |      141.5 KB |                              0% |                          0% |

Principais conclusões:

- **Um único catálogo por localidade ainda vaza mensagens de outras páginas** para o provedor do cliente. Mantenha o máximo de texto possível em Server Components, que enviam HTML renderizado, não catálogos.
- **O runtime do Lingui pesa ~72 KB gzip.** O adaptador de compatibilidade `@intlayer/lingui` reduz o runtime para ~11 KB, mas neste benchmark a configuração de compatibilidade do Next.js ainda envia catálogos inteiros para a página. A API nativa `next-intlayer` é a configuração que permanece no tamanho da aplicação base.

> Veja os dados completos: [Relatório de benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md) e o [repositório do benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [Relatório de benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md)

## Comparação de recursos no Next.js

Como o Lingui se compara com `next-intl` e Intlayer nos recursos que um projeto Next.js App Router geralmente necessita:

| Recurso                                   | `next-intlayer` (Intlayer)                          | Lingui                                                            | `next-intl`                                 |
| ----------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------- |
| **Traduções próximas aos componentes**    | ✅ Conteúdo co-localizado com cada componente       | ⚠️ Texto fonte nos componentes, catálogos centralizados           | ❌ JSON centralizado                        |
| **Integração com TypeScript**             | ✅ Tipos estritos gerados automaticamente           | ⚠️ Macros tipadas, catálogos de mensagens não                     | ✅ Boa, via ampliação de `AppConfig`        |
| **Detecção de traduções ausentes**        | ✅ Erros de TypeScript e avisos no momento do build | ⚠️ Fallback em tempo de execução para o texto fonte               | ⚠️ Fallback em tempo de execução            |
| **Conteúdo rico (JSX, Markdown)**         | ✅ Suporte direto                                   | ✅ JSX dentro de `<Trans>`, sem Markdown                          | ⚠️ Tags via `t.rich`, sem Markdown          |
| **Tradução com IA**                       | ✅ Seu próprio provedor e chave de API com contexto | ❌ Não                                                            | ❌ Não                                      |
| **Editor visual / CMS**                   | ✅ Editor visual local + CMS opcional               | ❌ Via plataformas externas                                       | ❌ Via plataformas externas                 |
| **Roteamento localizado**                 | ✅ Integrado                                        | ❌ Escreva seu próprio `proxy.ts`                                 | ✅ Segmento `[locale]` integrado            |
| **Pluralização**                          | ✅ Baseada em enumeração                            | ✅ ICU, macro `<Plural>`                                          | ✅ ICU                                      |
| **Formatos de conteúdo**                  | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`    | ✅ PO, JSON, CSV                                                  | ✅ `.json`, `.js`, `.ts`                    |
| **ICU MessageFormat**                     | ✅ Via `format: "icu"`                              | ✅ Nativo                                                         | ✅ Nativo                                   |
| **Auxiliares de SEO (hreflang, sitemap)** | ✅ Auxiliares de metadados, sitemap e robots.txt    | ❌ Manual                                                         | ✅ Bom                                      |
| **Server Components**                     | ✅ Acesso direto em qualquer Server Component       | ⚠️ `setI18n` em cada layout e página                              | ⚠️ `await getTranslations()` por componente |
| **Tree-shaking por componente**           | ✅ No momento do build (Babel / SWC)                | ⚠️ Um catálogo por localidade, extrator por página é experimental | ⚠️ Manual, com `pick()` por rota            |
| **Tamanho do runtime (gzip, benchmark)**  | 4.9 KB                                              | 72.1 KB                                                           | 14.7 KB                                     |
| **Traduções ausentes no CI**              | ✅ `npx intlayer test`                              | ✅ `lingui compile --strict`                                      | ⚠️ Não integrado                            |
| **Ecossistema / comunidade**              | ⚠️ Menor, em rápido crescimento                     | ✅ Maduro                                                         | ✅ Grande                                   |

> Os tamanhos de runtime vêm do [benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md). Para uma discussão detalhada, leia [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer.md).

- [benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer.md)

> Outros guias de Next.js:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)

## Práticas recomendadas que você deve seguir

- **Defina `lang` e `dir` em `<html>`** no layout de `[locale]`.
- **Prefira Server Components** para texto: eles renderizam HTML no servidor e não precisam do catálogo no cliente.
- **Chame `initLingui(locale)` em cada layout e página.** Layouts não são renderizados novamente na navegação, portanto, uma página não pode depender do fato de seu layout ter definido a localidade.
- **Mantenha uma URL por localidade** e pré-renderize todas as localidades com `generateStaticParams`.
- **Traduza seus metadados** em `generateMetadata`, com `canonical`, `hreflang` e `x-default`.
- **Gere um sitemap e robots.txt multilíngues** com as convenções `sitemap.ts` e `robots.ts`.
- **Use links reais para o seletor de idiomas**, para que os rastreadores descubram todas as versões de idioma.
- **Execute `lingui extract` no CI** para que uma nova mensagem nunca seja lançada sem tradução.

- [internacionalização e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/internationalization_and_SEO.md)
- [guia de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/hreflang_guide_multilingual_seo.md)
- [comparação de SEO multilíngue no Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/nextjs-multilingual-seo-comparison.md)

## Guia passo a passo para configurar o Lingui em uma aplicação Next.js

Aqui está a estrutura do projeto que iremos criar:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Roteamento e detecção de localidade
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Gerado por `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Localidades, utilitários de URL
    │   ├── appRouterI18n.ts        # Catálogos e instâncias apenas para servidor
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # Construtor de generateMetadata
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # 404 localizado para rotas desconhecidas
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Instalar dependências">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider`, `setI18n` para Server Components e as macros (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: compila as macros dentro do pipeline SWC do Next.js.
- **@lingui/loader**: compila catálogos `.po` na importação, dispensando o uso de `lingui compile`.
- **@lingui/cli**: `lingui extract` para coletar mensagens em catálogos.

> `@lingui/swc-plugin` é um plugin WebAssembly vinculado à versão do SWC do Next.js. Se o build falhar após uma atualização do Next.js, atualize o plugin para a versão listada como compatível em seu README.

</Step>
<Step number={2} title="Centralizar a configuração de localidade">

Um único arquivo define localidades e utilitários de URL. Roteamento, metadados, sitemap e o Lingui leem a partir dele.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Configurar o Lingui e o Next.js">

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

O plugin SWC compila as macros e o loader compila os arquivos `.po`, tanto para o Turbopack (padrão no Next.js 16) quanto para o webpack:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
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

</Step>
<Step number={4} title="Carregar catálogos e criar instâncias no servidor">

Server Components não possuem contexto React, portanto o Lingui disponibiliza `setI18n` para registrar a instância na renderização atual. Este módulo carrega cada catálogo **uma vez por processo do servidor** e cria uma instância `I18n` por localidade. Ele é `server-only`: catálogos de outras localidades nunca chegam ao bundle do cliente.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Registers the instance for the current Server Component render.
 * Call it in every layout and page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

Para que o TypeScript reconheça a importação de `.po`, declare o módulo uma vez:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Criar o provedor de cliente">

Client Components leem traduções a partir de um contexto React. O provedor recebe o catálogo da localidade ativa a partir do layout do servidor e cria sua própria instância uma única vez.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="Definir rotas dinâmicas de localidade">

O segmento `[locale]` abriga o layout raiz. `generateStaticParams` pré-renderiza todas as localidades no momento do build, e `dynamicParams = false` retorna um 404 para qualquer outro prefixo.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unknown prefixes (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> O provedor do cliente recebe todo o catálogo da localidade ativa. Isso é o que o benchmark mede como "vazamento de outras páginas". Manter o texto em Server Components reduz o que o cliente realmente necessita. Para aplicações grandes, o extrator experimental por página do Lingui (`experimental.extractor` em `lingui.config.ts`) divide catálogos por ponto de entrada.

</Step>
<Step number={7} title="Utilizar traduções em Server Components">

Server Components utilizam as mesmas macros que os Client Components. `initLingui` também deve ser executado na página, pois um layout não é renderizado novamente ao navegar entre suas páginas.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Utilizar traduções em Client Components">

Client Components utilizam as mesmas importações. As macros leem a instância a partir do `LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="Extrair e traduzir suas mensagens">

Execute a extração. O Lingui grava cada mensagem encontrada em `src` nos catálogos de cada localidade:

```bash
npm run i18n:extract
```

Em seguida, traduza o `msgstr` de cada entrada:

<Tabs group="locale">
 <Tab value='fr' label='Francês'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Espanhol'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Os marcadores `<0>` mantêm os elementos JSX de um `<Trans>` no lugar, permitindo que os tradutores os reposicionem sem alterar a marcação.

</Step>
<Step number={10} title="Configurar o proxy para roteamento de localidade" isOptional={true}>

O Next.js 16 renomeou `middleware.ts` para `proxy.ts`. O proxy implementa a estratégia de prefixo conforme necessário ("as-needed"):

- `/fr/about` é servido como está;
- `/en/about` redireciona para `/about`, mantendo uma URL única para a localidade padrão;
- `/about` é reescrito internamente para `/en/about`, sem alterar a URL exibida;
- uma primeira visita em `/` redireciona para o idioma preferido (cookie primeiro, depois `Accept-Language`).

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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: uma URL para a localidade padrão
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // Primeira visita em "/": envia o visitante para o idioma dele
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → servido por /en/about, URL inalterada
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Ignora rotas de API, arquivos internos do Next.js e arquivos estáticos (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Alterar o idioma do seu conteúdo" isOptional={true}>

`usePathname` retorna a URL vista pelo navegador (`/about` ou `/fr/about`). Remova a localidade e construa o link para cada idioma. O seletor renderiza links reais, permitindo que os rastreadores acessem cada versão de idioma, e o cookie salva a escolha explícita.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
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
<Step number={12} title="Criar um componente de Link localizado" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Path without locale prefix, e.g. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

Ele também funciona a partir de Server Components, pois é renderizado dentro de `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Internacionalizar seus metadados" isOptional={true}>

Cada versão de idioma pode se posicionar individualmente, desde que cada página forneça:

- um `title` e `description` **traduzidos**;
- uma URL **canônica** apontando para si mesma;
- uma tag alternativa **`hreflang` por localidade**, além de **`x-default`**;
- `locale`, `alternateLocale` e `url` do **Open Graph**;
- **JSON-LD** com `inLanguage`.

`generateMetadata` é executado fora da árvore do React, utilizando a instância do servidor diretamente com a macro `msg`:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... componente de página da etapa 7
```

O JSON-LD é renderizado pela própria página. Como arquivos de página só devem exportar campos do Next.js, mantenha o componente em seu próprio arquivo:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// Em AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Internacionalizar seu sitemap" isOptional={true}>

A convenção `sitemap.ts` suporta `alternates.languages`, que o Next.js renderiza como alternativas `xhtml:link`. Liste todas as URLs de todas as localidades:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="Internacionalizar seu robots.txt" isOptional={true}>

Rotas privadas existem em todos os idiomas, portanto o `disallow` deve abranger todas as rotas localizadas:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="Lidar com páginas 404 localizadas" isOptional={true}>

`not-found.tsx` é renderizado dentro do layout de `[locale]`, tendo acesso ao provedor do cliente. A rota do tipo catch-all encaminha caminhos desconhecidos dentro de uma localidade para ele. O Next.js adiciona `noindex` automaticamente às respostas 404.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → not-found.tsx localizado
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Acessar a localidade em Server Actions" isOptional={true}>

Server Actions não recebem os parâmetros de rota diretamente. A abordagem mais confiável é enviar a localidade com o formulário, a partir da página que a conhece:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="Mantenha suas macros e reduza o runtime com o Intlayer" isOptional={true}>

O adaptador de compatibilidade [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md) mantém seu código-fonte intacto: as macros compilam como antes e as chamadas resultantes de `i18n._()`, `useLingui()` e `<Trans>` são atendidas por dicionários Intlayer. No benchmark do Next.js, o runtime cai de **~72.1 KB para ~10.7 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md)

No Next.js, o adaptador é configurado criando aliases de `@lingui/core` e `@lingui/react` para `@intlayer/lingui` em `next.config.ts` (webpack e Turbopack), e envolvendo a configuração com `withIntlayer` de `next-intlayer/server`. Mantenha o `@lingui/swc-plugin` para que as macros continuem sendo compiladas primeiro. A configuração completa está no [guia de compatibilidade do Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md).

- [guia de compatibilidade do Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md)

Como a tabela de benchmark demonstra, o adaptador reduz o tamanho do runtime, mas ainda não divide o catálogo enviado para cada página no Next.js. Ele é idealmente utilizado como uma ponte de migração: uma vez em execução, migre os componentes gradualmente para a API nativa `useIntlayer`, que envia apenas o conteúdo que cada componente renderiza. Veja o [guia de Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer-lingui.md) e todos os [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md).

- [guia de Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer-lingui.md)
- [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md)

</Step>
<Step number={19} title="Automatize suas traduções usando Intlayer" isOptional={true}>

O Lingui extrai mensagens, mas preencher dezenas de catálogos manualmente é onde a maior parte do tempo é gasta. O Intlayer é **gratuito** e de **código aberto**, e seu ferramental funciona perfeitamente ao lado do Lingui:

- **Traduza com IA** usando sua própria chave de API e provedor. Veja [preenchimento automático (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md) e a [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).
- **Mantenha seus arquivos PO** como fonte de verdade com o [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md).
- **Teste traduções ausentes** no CI. Veja [testando suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/testing.md).
- **Audite seu site publicado** para identificar `hreflang` ausentes, canonicals incorretos e vazamentos de localidade com o [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/scan.md).

</Step>
</Steps>

## Perguntas Frequentes

<FAQ>

<Question title="O Lingui suporta o App Router do Next.js e Server Components?">

Sim. O `@lingui/react` suporta React Server Components. Os Server Components registram a instância com `setI18n` de `@lingui/react/server`, os Client Components a leem a partir de `I18nProvider`, e ambos utilizam as mesmas macros `Trans` e `useLingui`.

</Question>
<Question title="Por que preciso chamar initLingui em cada página e layout?">

Server Components não possuem contexto, portanto a instância é registrada por renderização. Os layouts são preservados durante as navegações e não são renderizados novamente, logo uma página não pode depender do seu layout para definir a localidade. Chamar `initLingui(locale)` no topo de cada layout e página os mantém independentes.

</Question>
<Question title="Devo usar o plugin SWC ou Babel com o Next.js?">

Use `@lingui/swc-plugin`. Ele preserva o pipeline SWC e o Turbopack. Adicionar uma configuração do Babel desativa o SWC no Next.js e torna os builds mais lentos. A única restrição é manter a versão do plugin compatível com a versão do SWC do seu lançamento do Next.js.

</Question>
<Question title="Como traduzir o generateMetadata com o Lingui?">

Obtenha a instância do servidor com `getI18nInstance(locale)` e traduza os descritores declarados com a macro `msg`: ``i18n._(msg`About us`)``. Retorne `alternates.canonical`, `alternates.languages` com `x-default` e `openGraph.locale`. A etapa 13 disponibiliza um helper reutilizável.

</Question>
<Question title="Qual é o tamanho do Lingui em um bundle do Next.js?">

O [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md) mede ~72 KB gzip para o runtime. Com um catálogo por localidade, as páginas pesam ~145 KB em comparação com 141 KB sem i18n, mas cada página ainda recebe as mensagens de outras páginas por meio do provedor de cliente.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md)

</Question>
<Question title="Lingui, next-intl ou next-i18next: qual escolher para Next.js?">

O Lingui atende a equipes que preferem escrever o texto de origem nos componentes e trabalhar com arquivos PO e tradutores. O next-intl é indicado para equipes que preferem catálogos JSON e uma API `t("key")` fortemente integrada ao Next.js. O next-i18next oferece o ecossistema de plugins do i18next. Veja [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md) e o [benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md).

- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md)
- [benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md)

</Question>
<Question title="Posso migrar do Lingui para o Intlayer sem reescrever meus componentes?">

Sim. O adaptador [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md) mantém as macros e substitui o runtime, permitindo que você migre componentes para `useIntlayer` progressivamente. Veja os [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md)
- [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md)

</Question>

</FAQ>
