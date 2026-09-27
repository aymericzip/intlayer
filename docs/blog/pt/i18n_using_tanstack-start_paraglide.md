---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "i18n do TanStack Start com Paraglide JS: Guia de Configuração 2026"
description: "Traduza sua aplicação TanStack Start com Paraglide JS: estratégia de URL, reescrita de roteador, middleware SSR, hreflang, sitemap e robots.txt, além de dados reais de benchmark."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Internacionalização
  - i18n
  - SEO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versão inicial"
author: aymericzip
---

# Como internacionalizar sua aplicação TanStack Start usando Paraglide JS em 2026

## Sumário

<TOC/>

## O que é o Paraglide JS?

O **Paraglide JS** (criado pela inlang) é uma biblioteca de i18n **baseada em compilador**. Em vez de enviar um runtime que busca chaves em um objeto JSON, ele compila cada mensagem em uma função JavaScript tipada (`m.about_title()`). Mensagens não utilizadas podem ser removidas pelo empacotador (bundler), e um erro de digitação em uma chave resulta em um erro de compilação.

O Paraglide é a abordagem de i18n utilizada nos exemplos oficiais do TanStack Router, integrando-se ao TanStack Start através de três partes:

- um **plugin Vite** que compila mensagens e o runtime em `src/paraglide`;
- um **middleware de servidor** que resolve o idioma (locale) de cada requisição;
- uma **reescrita de roteador (router rewrite)** que mapeia URLs localizadas (`/fr/about`) para sua árvore de rotas (`/about`), eliminando a necessidade de um segmento `$locale`.

Este guia configura todas essas três etapas e, em seguida, aborda tudo o que o Paraglide deixa a seu critério: `lang` e `dir`, seletor de idioma, metadados traduzidos, `canonical`, `hreflang` com `x-default`, Open Graph, JSON-LD, sitemap, `robots.txt`, pré-renderização e páginas 404 localizadas.

> Procurando por outra stack? Consulte o [guia TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_use-intl.md), o [guia TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_lingui.md) ou o [guia TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md).

> Comparando as duas abordagens baseadas em compilador? Leia [o Intlayer é mais leve que o Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/is_intlayer_lighter_than_paraglide.md).

## O que o benchmark diz sobre o Paraglide no TanStack Start

O [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) executa a mesma aplicação TanStack Start de 10 páginas e 10 idiomas com todas as principais bibliotecas e mede o que o navegador realmente baixa.

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Principais números para `@inlang/paraglide-js@2.15.1`, medidos em 26/09/2026 (gzip):

| Configuração        | Tamanho da biblioteca | JS por página | Vazamento de outros idiomas | Vazamento de outras páginas | Carregamento da página |
| :------------------ | --------------------: | ------------: | --------------------------: | --------------------------: | ---------------------: |
| Sem i18n (app base) |                     - |      111.0 KB |                          0% |                          0% |                15.7 ms |
| Paraglide JS        |                1.8 KB |      125.1 KB |                       49.7% |                          0% |                22.1 ms |
| `react-intlayer`    |                4.5 KB |      126.8 KB |                          0% |                          0% |                14.8 ms |
| `use-intl`          |               75.9 KB |      128.7 KB |                          0% |                          0% |                17.4 ms |
| Lingui              |               56.7 KB |      120.2 KB |                        8.6% |                          0% |                21.9 ms |

O que observar:

- **O runtime é minúsculo e não há vazamento de páginas.** O runtime é gerado para a sua configuração e as mensagens são importadas apenas onde são utilizadas.
- **Há vazamento de idiomas.** Cada função de mensagem contém todos os idiomas, de modo que cerca de metade das strings traduzidas enviadas para uma página pertencem a idiomas que o visitante não utiliza. Quanto mais idiomas você adicionar, maior se tornará essa proporção.
- **O carregamento da página é o mais lento do grupo**, em parte porque o idioma é resolvido por meio de estratégias a cada chamada, em vez de ser lido a partir de um contexto React.

> Veja os dados completos: [Relatório de benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) e o [repositório do benchmark](https://github.com/intlayer-org/benchmark-i18n).

## Comparação de recursos no TanStack Start

Como o Paraglide JS se compara com as outras bibliotecas comumente usadas no TanStack Start:

| Recurso                                     | `react-intlayer` (Intlayer)          | `use-intl`             | Paraglide JS                      | Lingui                           |
| ------------------------------------------- | ------------------------------------ | ---------------------- | --------------------------------- | -------------------------------- |
| **Traduções próximas aos componentes**      | ✅ Co-localizado                     | ❌ JSON centralizado   | ❌ Um arquivo JSON por idioma     | ⚠️ Texto de origem nos comp.     |
| **Integração com TypeScript**               | ✅ Tipos gerados automaticamente     | ✅ Via `AppConfig`     | ✅ Funções de mensagens tipadas   | ⚠️ Apenas macros                 |
| **Detecção de traduções ausentes**          | ✅ Erros de tipo e avisos de build   | ⚠️ Fallback em runtime | ⚠️ Fallback para o idioma base    | ⚠️ Fallback para texto de origem |
| **Conteúdo rico (JSX, Markdown)**           | ✅ Suporte direto                    | ⚠️ Tags via `t.rich`   | ⚠️ Strings                        | ✅ JSX dentro de `<Trans>`       |
| **Roteamento localizado**                   | ✅ Integrado                         | ❌ Manual `{-$locale}` | ✅ `urlPatterns` + router rewrite | ❌ Manual `{-$locale}`           |
| **Troca de idioma sem recarregamento**      | ✅ Sim                               | ✅ Sim                 | ❌ Recarregamento completo        | ✅ Sim                           |
| **Pluralização**                            | ✅ Baseada em enumeração             | ✅ ICU                 | ✅ Variantes                      | ✅ ICU                           |
| **ICU MessageFormat**                       | ✅ Via `format: "icu"`               | ✅ Nativo              | ⚠️ Via plugin inlang              | ✅ Nativo                        |
| **Formatos de conteúdo**                    | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`             | ⚠️ JSON inlang                    | ✅ PO, JSON, CSV                 |
| **Tradução com IA**                         | ✅ Seu próprio provedor e chave      | ❌ Não                 | ❌ Não                            | ❌ Não                           |
| **Editor visual / CMS**                     | ✅ Editor local + CMS opcional       | ❌ Plataformas ext.    | ⚠️ Apps do ecossistema inlang     | ❌ Plataformas ext.              |
| **Ajudantes de SEO (hreflang, sitemap)**    | ✅ Integrados                        | ❌ Manual              | ⚠️ URLs localizadas, resto manual | ❌ Manual                        |
| **Tamanho do runtime (gzip, benchmark)**    | 4.5 KB                               | 75.9 KB                | 1.8 KB                            | 56.7 KB                          |
| **Vazamento, melhor config (idioma / pág)** | 0% / 0%                              | 0% / 0%                | 49.7% / 0%                        | 8.6% / 0%                        |
| **Traduções ausentes no CI**                | ✅ `npx intlayer test`               | ⚠️ Não integrado       | ⚠️ Não integrado                  | ✅ `lingui compile --strict`     |

> Os números de tamanho de runtime e vazamento provêm do [benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md). O vazamento é medido na melhor configuração de cada biblioteca.

> Outros guias do TanStack Start: [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_lingui.md), [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_tanstack-start_use-intl.md) e [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md).

## Práticas que você deve seguir

- **Defina `lang` e `dir` na tag `<html>`** a partir do idioma resolvido no servidor.
- **Mantenha uma URL por idioma** com uma estratégia de prefixo (`/fr/about`), para que cada versão de idioma seja indexável.
- **Coloque `url` em primeiro lugar na sua estratégia de idioma**, para que a URL seja a fonte da verdade e os rastreadores recebam a página solicitada.
- **Use chaves de mensagem planas e descritivas** (`about_title`) que mapeiem de forma limpa para nomes de funções.
- **Faça o commit de `messages/*.json`, não da pasta gerada `src/paraglide`**, para evitar conflitos de mesclagem em arquivos gerados.
- **Traduza seus metadados** e declare `canonical`, `hreflang` e `x-default` em todas as páginas.
- **Gere um sitemap multilíngue e robots.txt**, e faça a pré-renderização de todos os idiomas.
- **Use links reais para o seletor de idiomas**, para que os rastreadores descubram todas as línguas disponíveis.

> Consulte nosso guia sobre [internacionalização e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/internationalization_and_SEO.md) e o [guia de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/hreflang_guide_multilingual_seo.md).

## Guia Passo a Passo para Configurar o Paraglide JS em uma Aplicação TanStack Start

Aqui está a estrutura de projeto que iremos criar:

```bash
.
├── project.inlang
│   └── settings.json          # Locales and message format
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Generated, git-ignored
    ├── server.ts              # Paraglide middleware
    ├── router.tsx             # URL rewrite
    ├── i18n
    │   ├── config.ts          # Site URL, helpers
    │   └── seo.ts             # head() builder
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / and /fr
        ├── about.tsx          # /about and /fr/about
        ├── $.tsx              # Localized 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Observe que não há pasta `$locale`: a reescrita do roteador remove o prefixo antes da correspondência da rota.

<Steps>
<Step number={1} title="Instalar Dependências">

Comece a partir de um projeto TanStack Start e, em seguida, inicialize o Paraglide. O comando init cria `project.inlang/settings.json`, um primeiro arquivo `messages/en.json` e instala o pacote.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: o compilador e seu plugin Vite. Não há pacote de runtime para instalar: o runtime é gerado dentro do seu próprio projeto.

</Step>
<Step number={2} title="Configurar Seus Idiomas">

`project.inlang/settings.json` é a única fonte da verdade para os idiomas. O plugin de formato de mensagem lê um arquivo JSON por idioma.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Configurar o Plugin Vite e a Estratégia de URL">

O plugin compila mensagens a cada alteração. Três opções são importantes para o TanStack Start:

- **`strategy`**: a lista ordenada de locais de onde obter o idioma. Colocar `url` em primeiro lugar torna a URL a fonte da verdade. `cookie` e `preferredLanguage` são utilizados pelo middleware quando a URL não decide.
- **`urlPatterns`**: como um idioma é mapeado para uma URL. Os idiomas que não são o padrão são listados primeiro, pois o primeiro padrão correspondente vence. Aqui, o idioma padrão permanece sem prefixo (`/about`), e os outros idiomas recebem prefixo (`/fr/about`).
- **`outputStructure: "message-modules"`**: um módulo por mensagem, o que permite que o empacotador descarte mensagens que uma página não importa.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Default locale last: it matches every remaining URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

Adicione a pasta gerada ao `.gitignore`. Ela é reconstruída durante `dev` e `build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Criar Seus Arquivos de Tradução">

Cada chave se torna uma função exportada de `src/paraglide/messages`. Chaves planas em snake_case produzem os nomes de função mais limpos. Variáveis usam marcadores `{name}`.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

Plurais usam a sintaxe de variantes do formato de mensagens inlang:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="Adicionar o Middleware de Servidor">

O middleware resolve o idioma de cada requisição com sua estratégia e o disponibiliza para `getLocale()` durante toda a renderização no servidor, por meio de um escopo `AsyncLocalStorage`. É isso que torna seguras as requisições concorrentes em idiomas diferentes.

No TanStack Start, envolva a entrada de servidor padrão:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="Reescrever URLs Localizadas no Roteador">

A opção `rewrite` do TanStack Router traduz URLs nas fronteiras do roteador:

- **entrada (input)**: `/fr/about` é deslocalizado para `/about` antes da correspondência, de modo que uma única rota `about.tsx` atenda a todos os idiomas;
- **saída (output)**: cada `href` gerado (links, redirecionamentos, navegação) é localizado para o idioma ativo, de forma que `<Link to="/about">` renderize `/fr/about` em uma página em francês.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> Como os links são localizados pela reescrita, você não precisa de um componente personalizado `LocalizedLink`: utilize o `Link` normal do TanStack Router.

</Step>
<Step number={7} title="Criar o Documento Raiz">

`getLocale()` retorna o idioma resolvido pelo middleware no servidor e o idioma da URL no navegador, garantindo que `lang` e `dir` sejam idênticos no HTML do servidor e após a hidratação.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

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

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="Utilizar Traduções nas Suas Páginas">

Mensagens são funções simples: importe `m`, chame a função e passe as variáveis como um objeto. Tudo é tipado, incluindo as variáveis.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> Uma função de mensagem também aceita um idioma explícito: `m.about_title({}, { locale: "fr" })`. Isso é útil em código no servidor que renderiza um idioma diferente daquele da requisição, como em e-mails.

</Step>
<Step number={9} title="Alterar o Idioma do Seu Conteúdo" isOptional={true}>

Renderize o seletor como **links** com `localizeHref`, para que os rastreadores descubram todos os idiomas. `setLocale` armazena a escolha no cookie e recarrega a página no novo idioma: o recarregamento completo é o comportamento esperado do Paraglide, pois as funções de mensagens leem o idioma a cada chamada em vez de se inscreverem em um estado do React.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Router pathname, already de-localized by the rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Sets the cookie and reloads on the localized URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="Internacionalizar Seus Metadados" isOptional={true}>

Cada versão de idioma pode ranquear por conta própria, desde que cada página exponha:

- um `<title>` e `description` **traduzidos**;
- uma URL **canônica (canonical)** apontando para si mesma;
- uma **tag alternate `hreflang` por idioma**, além do **`x-default`**;
- tags **Open Graph** `og:locale`, `og:locale:alternate` e `og:url`;
- **JSON-LD** com `inLanguage`.

A função `localizeUrl` do Paraglide constrói as URLs alternativas a partir de seus `urlPatterns`, para que nunca fiquem desalinhadas com o roteamento real:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** De-localized path, e.g. "/about" */
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
        href: getAbsoluteUrl(path, baseLocale),
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
<Step number={11} title="Internacionalizar Seu Sitemap" isOptional={true}>

Um sitemap multilíngue lista cada URL de cada idioma, e cada entrada declara todas as suas alternativas com `xhtml:link`:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
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
<Step number={12} title="Internacionalizar Seu robots.txt" isOptional={true}>

Rotas privadas existem em todos os idiomas, portanto as regras de `Disallow` devem cobrir cada caminho localizado. Remova `public/robots.txt` se o template inicial tiver criado um, e sirva-o a partir de uma rota:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
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
<Step number={13} title="Pré-renderizar Cada Idioma" isOptional={true}>

Liste o caminho localizado de cada página para que o TanStack Start faça a pré-renderização de todas as versões de idioma. `localizeHref` é código gerado sem dependência de navegador, portanto pode ser executado em `vite.config.ts`, mas o arquivo só existe após a primeira compilação. Listar os caminhos manualmente, como abaixo, evita esse problema de ordem de execução:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Default locale "en" is unprefixed
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... same options as step 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Como o seletor renderiza links reais, `crawlLinks: true` também descobre páginas que você possa ter esquecido de listar.

</Step>
<Step number={14} title="Gerenciar Páginas 404 Localizadas" isOptional={true}>

Com a reescrita, `/fr/does-not-exist` corresponde a `/does-not-exist`, e `getLocale()` ainda retorna `fr`, de modo que o `notFoundComponent` raiz da etapa 7 seja renderizado em francês. Uma rota catch-all garante que caminhos mais profundos também cheguem até ele. Marque a página como `noindex`: o React 19 eleva o `<meta>` para o `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="Acessar o Idioma em Funções de Servidor (Server Functions)" isOptional={true}>

Funções de servidor são executadas dentro do escopo do middleware do Paraglide, portanto `getLocale()` funciona lá também:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Comparar com o Intlayer" isOptional={true}>

Não existe um adaptador pronto do Paraglide para o Intlayer, porque ambos seguem a mesma ideia: compilar conteúdo no momento do build e enviar o mínimo possível de runtime. As diferenças residem no que chega ao navegador e em como o conteúdo é organizado:

- **Idiomas**: o Intlayer carrega [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) por idioma (0% de vazamento de idioma no benchmark), enquanto cada função de mensagem do Paraglide carrega todos os idiomas (49.7%).
- **Organização do conteúdo**: o conteúdo pode ficar em arquivos `.content.ts` próximos a cada componente ou em arquivos centralizados. Veja [i18n por componente vs centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md).
- **Troca de idioma**: o conteúdo é lido de um contexto React, permitindo que a troca de idioma ocorra com re-renderização sem recarregar a página.
- **Código gerado**: nada é gerado dentro de `src`, portanto não há nada para regenerar antes de um commit.

Se você estiver migrando de outra biblioteca em vez do Paraglide, os [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) mantêm a API do `use-intl`, `next-intl`, `react-i18next`, `react-intl` ou Lingui e apenas trocam o runtime.

Veja [o Intlayer é mais leve que o Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/is_intlayer_lighter_than_paraglide.md) e o [guia TanStack Start com Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md).

</Step>
<Step number={17} title="Automatizar Suas Traduções Usando o Intlayer" isOptional={true}>

O Paraglide renderiza traduções, mas não ajuda você a **produzi-las**. O Intlayer é **gratuito** e **código aberto**, e seu conjunto de ferramentas ajuda mesmo em um projeto com Paraglide:

- **Traduza com IA** usando sua própria chave e provedor de API. Veja [preenchimento automático (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md) e a [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).
- **Mantenha seus arquivos JSON** como fonte da verdade com o [plugin de sincronização JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md).
- **Teste traduções ausentes** no CI. Veja [testando suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/testing.md).
- **Analise seu site publicado** em busca de tags `hreflang` ausentes, canônicos incorretos e vazamentos de idioma com o [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/scan.md).

</Step>
</Steps>

## Perguntas Frequentes

<FAQ>

<Question title="O Paraglide JS é uma boa escolha para o TanStack Start?">

É uma opção sólida: é utilizado nos exemplos oficiais do TanStack Router, possui o menor runtime do [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) (~1.8 KB gzip) e as mensagens são totalmente tipadas. As desvantagens são que cada função de mensagem contém todos os idiomas, o que vaza cerca de metade das strings traduzidas para visitantes de outras línguas, e que trocar de idioma recarrega a página.

</Question>
<Question title="Eu preciso de um segmento de rota $locale com o Paraglide?">

Não. O recurso `rewrite` do roteador remove o prefixo do idioma antes da correspondência da rota e o adiciona novamente aos links gerados, permitindo que um único `about.tsx` atenda a `/about`, `/fr/about` e `/es/about`.

</Question>
<Question title="Por que alterar o idioma recarrega a página?">

As funções de mensagens leem o idioma no momento em que são chamadas e não estão inscritas em um estado do React. Portanto, `setLocale` recarrega a página por padrão para que todas as mensagens sejam re-renderizadas no novo idioma. Você pode passar `{ reload: false }`, mas nesse caso precisará re-renderizar a árvore de componentes manualmente.

</Question>
<Question title="Devo versionar no Git a pasta gerada src/paraglide?">

É preferível não versionar. A pasta é regenerada a cada execução de `dev` e `build`, e versioná-la causa conflitos de mesclagem em arquivos gerados. Em vez disso, faça commit de `messages/*.json` e `project.inlang/settings.json`.

</Question>
<Question title="Como adicionar tags hreflang com o Paraglide?">

Use `localizeUrl` para construir uma URL absoluta por idioma no método `head()` da rota e adicione uma tag `x-default` apontando para o idioma base. A etapa 10 fornece um utilitário reutilizável e a etapa 11 adiciona as mesmas alternativas ao sitemap.

</Question>
<Question title="O Paraglide faz tree-shaking de traduções não utilizadas?">

**Mensagens** não utilizadas são descartadas quando você usa `outputStructure: "message-modules"`, de modo que o conteúdo de outras páginas não vaze. **Idiomas** não utilizados não são descartados: cada função de mensagem contém todas as traduções, razão pela qual o benchmark registra um vazamento de idioma de 49.7%.

</Question>
<Question title="Posso migrar do Paraglide para o Intlayer?">

Sim. Ambos são baseados em compilador, portanto o modelo conceitual é muito semelhante. Mantenha seus arquivos JSON com o [plugin de sincronização JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) e, em seguida, substitua as chamadas `m.key()` por `useIntlayer`, página por página. Consulte o [guia TanStack Start com Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md).

</Question>

</FAQ>
