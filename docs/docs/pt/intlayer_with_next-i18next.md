---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Como traduzir seu Next.js 15 usando next-i18next – guia i18n 2025
description: Um guia prático e pronto para produção para internacionalizar um app Next.js 15 App Router com i18next/next-i18next e aprimorá-lo com Intlayer.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Traduza seu Next.js 15 usando next-i18next com Intlayer | Internacionalização (i18n)

### Para quem este guia é destinado

- **Júnior**: Siga os passos exatos e copie os blocos de código. Você terá um app multilíngue funcionando.
- **Pleno**: Use as listas de verificação e os destaques de melhores práticas para evitar armadilhas comuns.
- **Sênior**: Leia rapidamente a estrutura de alto nível, SEO e seções de automação; você encontrará padrões sensatos e pontos de extensão.

### O que você vai construir

- Projeto App Router com rotas localizadas (ex.: `/`, `/fr/...`)
- Configuração i18n com locais, local padrão, suporte RTL
- Inicialização i18n no servidor e um provider no cliente
- Traduções com namespaces carregadas sob demanda
- SEO com `hreflang`, `sitemap` localizado, `robots`
- Middleware para roteamento por localidade
- Integração Intlayer para automatizar fluxos de trabalho de tradução (testes, preenchimento por IA, sincronização JSON)

> Nota: next-i18next é construído sobre o i18next. Este guia utiliza as primitivas do i18next compatíveis com o next-i18next no App Router, mantendo a arquitetura simples e pronta para produção.
> Para uma comparação mais ampla, veja [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Estrutura do projeto

Instale as dependências do next-i18next -

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

Comece com uma estrutura clara. Mantenha as mensagens divididas por localidade e namespace.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

Checklist (nível médio/sênior):

- Mantenha um JSON por namespace por localidade
- Não centralize excessivamente as mensagens; use namespaces pequenos, escopados por página/feature
- Evite importar todas as localidades de uma vez; carregue apenas o que você precisa

---

## 2) Instalar dependências

```bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Se você planeja usar as APIs do next-i18next ou interoperabilidade de configuração, também:

```bash
pnpm add next-i18next
```

---

## 3) Configuração principal do i18n

Defina as localidades, localidade padrão, RTL e auxiliares para caminhos/URLs localizados.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

Nota importante: Se você usar `next-i18next.config.js`, mantenha-o alinhado com `i18n.config.ts` para evitar divergências.

---

## 4) Inicialização do i18n no lado do servidor

Inicialize o i18next no servidor com um backend dinâmico que importa apenas o JSON necessário para a localidade/namespace.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Carrega recursos JSON de src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

Nota intermediária: Mantenha a lista de namespaces curta por página para limitar o payload. Evite bundles globais “catch-all”.

---

## 5) Provedor cliente para componentes React

Envolva os componentes cliente com um provedor que espelha a configuração do servidor e carrega apenas os namespaces solicitados.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: pacote }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Dica para iniciantes: Você não precisa passar todas as mensagens para o cliente. Comece apenas com os namespaces da página.

---

## 6) Layout e rotas localizados

Defina o idioma e a direção, e pré-genere rotas por localidade para favorecer a renderização estática.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) Exemplo de página com uso no servidor + cliente

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Forçar renderização estática para a página
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

Traduções (um JSON por namespace em `src/locales/...`):

```json fileName="src/locales/pt/about.json"
{
  "title": "Sobre",
  "description": "Descrição da página Sobre",
  "counter": {
    "label": "Contador",
    "increment": "Incrementar"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

Componente cliente (carrega apenas o namespace necessário):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Garanta que a página/provider inclua apenas os namespaces que você precisa (ex: `about`).
> Se você usar React < 19, memorize formatadores pesados como `Intl.NumberFormat`.

Componente de servidor síncrono embutido sob uma fronteira de cliente:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: Metadados, Hreflang, Sitemap, Robots

Traduzir conteúdo é uma forma de ampliar o alcance. Configure o SEO multilíngue de forma completa.

Melhores práticas:

- Defina `lang` e `dir` na raiz
- Adicione `alternates.languages` para cada locale (+ `x-default`)
- Liste URLs traduzidas no `sitemap.xml` e use `hreflang`
- Exclua áreas privadas localizadas (ex.: `/fr/admin`) no `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importa o pacote JSON correto de src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Sobre</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) Middleware para roteamento de locale

Detecta o locale e redireciona para uma rota localizada caso esteja ausente.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // exclui arquivos com extensões

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Corresponder a todos os caminhos, exceto os que começam com estes e arquivos com uma extensão
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Melhores práticas de desempenho e DX

- **Definir `lang` e `dir` no html**: Feito em `src/app/[locale]/layout.tsx`.
- **Dividir mensagens por namespace**: Mantenha os bundles pequenos (`common.json`, `about.json`, etc.).
- **Minimizar payload no cliente**: Nas páginas, passe apenas os namespaces necessários para o provider.
- **Preferir páginas estáticas**: Use `export const dynamic = 'force-static'` e `generateStaticParams` por locale.
- **Sincronizar componentes do servidor**: Passe strings/formatações pré-computadas em vez de chamadas assíncronas na renderização.
- **Memoizar operações pesadas**: Especialmente no código cliente para versões antigas do React.
- **Cache e headers**: Prefira estático ou `revalidate` em vez de renderização dinâmica quando possível.

---

## 11) Testes e CI

- Adicione testes unitários para componentes que usam `t` para garantir que as chaves existam.
- Validar que cada namespace tenha as mesmas chaves em todas as localidades.
- Exibir chaves faltantes durante o CI antes do deploy.

O Intlayer automatizará grande parte disso (veja a próxima seção).

---

## 12) Adicionar Intlayer por cima (automação)

O Intlayer ajuda você a manter as traduções JSON sincronizadas, testar chaves faltantes e preencher com IA quando desejado.

Instale as dependências do intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Adicione scripts no package:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Fluxos comuns:

- `pnpm i18n:test` no CI para falhar builds em caso de chaves faltantes
- `pnpm i18n:fill` localmente para propor traduções com AI para chaves recém-adicionadas

> Você pode fornecer argumentos para a CLI; consulte a [documentação da CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

---

## 13) Solução de problemas

- **Chaves não encontradas**: Verifique se a página/provedor lista os namespaces corretos e se o arquivo JSON existe em `src/locales/<locale>/<namespace>.json`.
- **Idioma errado/piscar de inglês**: Verifique novamente a detecção de locale em `middleware.ts` e o `lng` do provedor.
- **Problemas de layout RTL**: Confirme que `dir` é derivado de `isRtl(locale)` e que seu CSS respeita `[dir="rtl"]`.
- **Alternativas de SEO ausentes**: Confirme que `alternates.languages` inclui todos os locales e `x-default`.
- **Bundles muito grandes**: Divida os namespaces ainda mais e evite importar árvores inteiras de `locales` no cliente.

---

## 14) O que vem a seguir

- Adicione mais locales e namespaces conforme as funcionalidades crescem
- Localize páginas de erro, emails e conteúdo gerado por API
- Estenda os workflows do Intlayer para abrir PRs automaticamente para atualizações de tradução

Se preferir um starter, experimente o template: `https://github.com/aymericzip/intlayer-next-i18next-template`.
