---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Como traduzir seu Next.js 15 usando next-intl – guia i18n 2026
description: Descubra como tornar seu site Next.js 15 App Router multilíngue. Siga a documentação para internacionalizar (i18n) e traduzir.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Traduza seu site Next.js 15 usando next-intl com Intlayer | Internacionalização (i18n)

Este guia apresenta as melhores práticas do next-intl em um app Next.js 15 (App Router) e mostra como adicionar o Intlayer para um gerenciamento robusto de traduções e automação.

Veja a comparação em [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md).

- Para iniciantes: siga as seções passo a passo para obter um app multilíngue funcional.
- Para desenvolvedores intermediários: preste atenção na otimização do payload e na separação servidor/cliente.
- Para seniores: observe a geração estática, middleware, integração SEO e hooks de automação.

O que vamos cobrir:

- Configuração e estrutura de arquivos
- Otimização do carregamento das mensagens
- Uso de componentes cliente e servidor
- Metadados, sitemap, robots para SEO
- Middleware para roteamento de locale
- Adicionando Intlayer por cima (CLI e automação)

## Configure sua aplicação usando next-intl

Instale as dependências do next-intl -

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash packageManager="bun"
bun add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### Configuração e Carregamento de Conteúdo

Carregue apenas os namespaces que suas rotas precisam e valide os locales cedo. Mantenha os componentes do servidor síncronos quando possível e envie para o cliente apenas as mensagens necessárias.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Carregue apenas os namespaces que seu layout/páginas precisam
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Define o locale ativo da requisição para esta renderização no servidor (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // Mensagens são carregadas no servidor. Envie para o cliente apenas o que é necessário.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traduções/formatações estritamente do lado servidor
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Uso em um componente cliente

Vamos pegar um exemplo de um componente cliente que renderiza um contador.

**Traduções (formato reutilizado; carregue-as nas mensagens do next-intl como preferir)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Contador",
    "increment": "Incrementar"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Contador",
    "increment": "Incrementar"
  }
}
```

**Componente cliente**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Escopo diretamente para o objeto aninhado
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Não esqueça de adicionar a mensagem "about" nas mensagens do cliente da página
> (inclua apenas os namespaces que seu cliente realmente precisa).

### Uso em um componente server

Este componente de UI é um componente server e pode ser renderizado dentro de um componente client (página → client → server). Mantenha-o síncrono passando strings pré-calculadas.

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

Notas:

- Calcule `formattedCount` no lado do servidor (ex: `const initialFormattedCount = format.number(0)`).
- Evite passar funções ou objetos não serializáveis para componentes server.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Resto do código da página
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### Middleware para roteamento de locale

Adicione um middleware para lidar com a detecção e roteamento de locale:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Ignorar API, internos do Next e assets estáticos
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Melhores práticas

- **Defina `lang` e `dir` no html**: Em `src/app/[locale]/layout.tsx`, calcule `dir` via `getLocaleDirection(locale)` e defina `<html lang={locale} dir={dir}>`.
- **Separe mensagens por namespace**: Organize JSON por locale e namespace (ex: `common.json`, `about.json`).
- **Minimize o payload do cliente**: Nas páginas, envie apenas os namespaces necessários para o `NextIntlClientProvider` (por exemplo, `pick(messages, ['common', 'about'])`).
- **Prefira páginas estáticas**: Exporte `export const dynamic = 'force-static'` e gere parâmetros estáticos para todos os `locales`.
- **Componentes de servidor síncronos**: Passe strings pré-computadas (rótulos traduzidos, números formatados) em vez de chamadas assíncronas ou funções não serializáveis.

## Implemente o Intlayer sobre o next-intl

Instale as dependências do intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

Crie o arquivo de configuração do intlayer:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // Mantenha sua estrutura de pastas por namespace sincronizada com o Intlayer
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Adicione scripts no `package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Notas:

- `intlayer fill`: usa seu provedor de IA para preencher traduções ausentes com base nos seus locais configurados.
- `intlayer test`: verifica traduções ausentes/inválidas (use no CI).

Você pode configurar argumentos e provedores; veja [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).
