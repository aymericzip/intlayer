---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Como internacionalizar sua aplicação Next.js usando next-intl
description: Configure i18n com next-intl - melhores práticas e dicas de SEO para apps Next.js multilíngues, cobrindo internacionalização, organização de conteúdo e configuração técnica.
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: Versão inicial
---

# Como internacionalizar sua aplicação Next.js usando next-intl em 2025

## Índice

<TOC/>

## O que é next-intl?

**next-intl** é uma biblioteca popular de internacionalização (i18n) projetada especificamente para o Next.js App Router. Ela oferece uma forma integrada de construir aplicações Next.js multilíngues com excelente suporte a TypeScript e otimizações embutidas.

> Se preferir, você também pode consultar o [guia do next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_next-i18next.md), ou usar diretamente o [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_next-intl.md).

> Veja a comparação em [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md).

## Práticas que você deve seguir

Antes de mergulharmos na implementação, aqui estão algumas práticas que você deve seguir:

- **Defina os atributos HTML `lang` e `dir`**  
  No seu layout, calcule `dir` usando `getLocaleDirection(locale)` e defina `<html lang={locale} dir={dir}>` para garantir acessibilidade adequada e SEO.
- **Separe as mensagens por namespace**  
  Organize os arquivos JSON por locale e namespace (por exemplo, `common.json`, `about.json`) para carregar apenas o que você precisa.
- **Minimize o payload no cliente**  
  Nas páginas, envie apenas os namespaces necessários para o `NextIntlClientProvider` (por exemplo, `pick(messages, ['common', 'about'])`).
- **Prefira páginas estáticas**  
  Use páginas estáticas sempre que possível para melhor desempenho e SEO.
- **I18n em componentes de servidor**  
  Componentes de servidor, como páginas ou todos os componentes não marcados como `client`, são estáticos e podem ser pré-renderizados em tempo de build. Portanto, teremos que passar as funções de tradução para eles como props.
- **Configure os tipos TypeScript**  
  Para seus locales, a fim de garantir a segurança de tipos em toda a sua aplicação.
- **Proxy para redirecionamento**  
  Use um proxy para lidar com a detecção de locale e roteamento, redirecionando o usuário para a URL apropriada com prefixo de locale.
- **Internacionalização dos seus metadados, sitemap, robots.txt**  
  Internacionalize seus metadados, sitemap, robots.txt usando a função `generateMetadata` fornecida pelo Next.js para garantir uma melhor descoberta pelos motores de busca em todos os locales.
- **Localize os Links**

Localize os Links usando o componente `Link` para redirecionar o usuário para a URL apropriada com prefixo de locale. É importante garantir a descoberta das suas páginas em todos os locales.

- **Automatize testes e traduções**  
  Automatizar testes e traduções ajuda a economizar tempo na manutenção da sua aplicação multilíngue.

> Veja nossa documentação listando tudo que você precisa saber sobre internacionalização e SEO: [Internationalization (i18n) with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/internationalization_and_SEO.md).

---

## Guia Passo a Passo para Configurar o next-intl em uma Aplicação Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como Internacionalizar sua aplicação usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> Veja o [Template da Aplicação](https://github.com/aymericzip/next-intl-template) no GitHub.

Aqui está a estrutura do projeto que iremos criar:

```bash
.
├── global.ts
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
└── src # Src é opcional
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Grupo de Rotas para não poluir todas as páginas com recursos da home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: A biblioteca principal de internacionalização para o Next.js App Router que fornece hooks, funções no servidor e provedores no cliente para gerenciar traduções.

### Passo 2: Configure seu Projeto

Crie um arquivo de configuração que defina os seus locales suportados e configure a request do next-intl. Este arquivo serve como a fonte única de verdade para a sua configuração i18n e garante segurança de tipos em toda a sua aplicação.

Centralizar a configuração dos seus locales previne inconsistências e facilita a adição ou remoção de locales no futuro. A função `getRequestConfig` é executada em cada requisição e carrega apenas as traduções necessárias para cada página, permitindo code-splitting e reduzindo o tamanho do bundle.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Define os locales suportados com segurança de tipos
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  // Verifica se o locale é de um idioma que é escrito da direita para a esquerda
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Carrega mensagens dinamicamente por locale para permitir code-splitting
// Promise.all carrega namespaces em paralelo para melhor performance
async function loadMessages(locale: Locale) {
  // Carrega apenas os namespaces que seu layout/páginas precisam
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... Arquivos JSON futuros devem ser adicionados aqui
  ]);

  return { common, home, about } as const;
}

// Auxiliar para gerar URLs localizadas (exemplo: /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig é executado a cada requisição e fornece mensagens para componentes do servidor
// É aqui que o next-intl se conecta ao server-side rendering do Next.js
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 ano
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Altera rota /en/... para /...
  // Opcional: caminhos localizados
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // previne redirecionamentos de "/" para "/en" via cookie
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### Passo 3: Definir Rotas Dinâmicas por Locale

Configure o roteamento dinâmico para locais criando um diretório `[locale]` na sua pasta de app. Isso permite que o Next.js gerencie o roteamento baseado em localidade, onde cada localidade se torna um segmento da URL (por exemplo, `/en/about`, `/fr/about`).

Usar rotas dinâmicas permite que o Next.js gere páginas estáticas para todas as localidades no momento da build, melhorando o desempenho e SEO. O componente de layout define os atributos HTML `lang` e `dir` com base na localidade, o que é crucial para acessibilidade e compreensão pelos motores de busca.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Pré-gerar páginas estáticas para todas as localidades no momento da build (SSG)
// Isso melhora o desempenho e SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // No Next.js App Router, params é uma Promise (pode ser await'd)
  // Isso permite que segmentos de rota dinâmicos sejam resolvidos assincronamente
  const { locale } = await params;

  // Crítico: setRequestLocale informa ao next-intl qual locale usar para esta requisição
  // Sem isso, getTranslations() não saberá qual locale usar nos componentes do servidor
  setRequestLocale(locale);

  // Obtém a direção do texto (LTR/RTL) para renderização HTML correta
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
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // As mensagens são carregadas no lado do servidor. Envie apenas o que é necessário para o cliente.
  // Isso minimiza o pacote JavaScript enviado para o navegador
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traduções/formatações estritamente do lado do servidor
  // Estes são executados no servidor e podem ser passados como props para os componentes
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider torna as traduções disponíveis para os componentes cliente
    // Passe apenas os namespaces que seus componentes cliente realmente usam
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### Passo 4: Crie Seus Arquivos de Tradução

Crie arquivos JSON para cada locale e namespace. Essa estrutura permite organizar as traduções de forma lógica e carregar apenas o que você precisa para cada página.

Organizar as traduções por namespace (por exemplo, `common.json`, `about.json`) possibilita o code splitting e reduz o tamanho do bundle. Você carrega apenas as traduções necessárias para cada página, melhorando a performance.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Passo 5: Utilize as Traduções nas Suas Páginas

Crie um componente de página que carregue as traduções no servidor e as passe para componentes tanto do servidor quanto do cliente. Isso garante que as traduções sejam carregadas antes da renderização e evita o flashing de conteúdo.

O carregamento das traduções no lado do servidor melhora o SEO e previne o FOUC (Flash of Untranslated Content). Ao usar `pick` para enviar apenas os namespaces necessários para o provedor do cliente, minimizamos o bundle de JavaScript enviado para o navegador.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // As mensagens são carregadas no lado do servidor. Envie apenas o que é necessário para o cliente.
  // Isso minimiza o pacote JavaScript enviado para o navegador
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traduções/formatações estritamente do lado do servidor
  // Estas são executadas no servidor e podem ser passadas como props para os componentes
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider disponibiliza traduções para componentes client
    // Passe apenas os namespaces que seus componentes client realmente usam
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### Passo 6: Usar Traduções em Componentes Client

Componentes client podem usar os hooks `useTranslations` e `useFormatter` para acessar traduções e funções de formatação. Esses hooks leem do contexto `NextIntlClientProvider`.

Componentes client precisam de hooks do React para acessar traduções. Os hooks `useTranslations` e `useFormatter` se integram perfeitamente com o next-intl e fornecem atualizações reativas quando o locale muda.

> Não esqueça de adicionar os namespaces necessários às mensagens client da página (inclua apenas os namespaces que seus componentes client realmente precisam).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Escopo diretamente para o objeto aninhado
  // useTranslations/useFormatter são hooks que leem do contexto NextIntlClientProvider
  // Eles só funcionam se o componente estiver envolvido pelo NextIntlClientProvider
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

### Passo 7: Usar Traduções em Componentes de Servidor

Componentes de servidor não podem usar hooks do React, então eles recebem traduções e formatadores via props de seus componentes pai. Essa abordagem mantém os componentes de servidor síncronos e permite que eles sejam aninhados dentro de componentes cliente.

Componentes server que podem estar aninhados sob limites de componentes client precisam ser síncronos. Ao passar strings traduzidas e valores formatados como props, evitamos operações assíncronas e garantimos a renderização adequada. Pré-compute traduções e formatações no componente pai da página.

```tsx fileName="src/components/ServerComponent.tsx"
// Componentes server aninhados dentro de componentes client devem ser síncronos
// O React não consegue serializar funções assíncronas através da fronteira server/client
// Solução: pré-computar traduções/formatações no componente pai e passar como props
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

> Na sua página/layout, use `getTranslations` e `getFormatter` de `next-intl/server` para pré-calcular traduções e formatações, e então passe-os como props para os componentes de servidor.

---

### (Opcional) Passo 8: Mude o idioma do seu conteúdo

Para mudar o idioma do seu conteúdo com next-intl, renderize links sensíveis ao locale que apontam para o mesmo pathname enquanto troca o locale. O provider reescreve as URLs automaticamente, então você só precisa direcionar para a rota atual.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // Remove o prefixo do locale do pathname para obter o caminho base
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Seletor de idioma">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Construir o href baseado em se é o locale padrão
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (Opcional) Passo 9: Use o componente Link localizado

O `next-intl` fornece um subpacote `next-intl/navigation` que contém um componente Link localizado que aplica automaticamente a localidade ativa. Já o extraímos para você no arquivo `@/i18n`, então você pode usá-lo assim:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (Opcional) Passo 10: Acesse a localidade ativa dentro das Server Actions

As Server Actions podem ler a localidade atual usando `next-intl/server`. Isso é útil para enviar e-mails localizados ou armazenar preferências de idioma junto com os dados enviados.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Use o locale para selecionar templates, rótulos de analytics, etc.
  console.log(`Formulário de contato recebido do locale ${locale}`);
}
```

> `getLocale` lê o locale definido pelo proxy do `next-intl`, então funciona em qualquer lugar no servidor: Route Handlers, Server Actions e edge functions.

### (Opcional) Passo 11: Internacionalize seus Metadados

Traduzir conteúdo é importante, mas o objetivo principal da internacionalização é tornar seu site mais visível para o mundo. I18n é uma alavanca incrível para melhorar a visibilidade do seu site por meio de SEO adequado.

Metadados internacionalizados corretamente ajudam os mecanismos de busca a entender quais idiomas estão disponíveis em suas páginas. Isso inclui configurar meta tags hreflang, traduzir títulos e descrições, e garantir que URLs canônicas estejam corretamente definidas para cada localidade.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata é executado para cada localidade, gerando metadados amigáveis para SEO
// Isso ajuda os motores de busca a entender versões alternativas de idioma
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

### (Opcional) Passo 12: Internacionalize Seu Sitemap

Gere um sitemap que inclua todas as versões locais das suas páginas. Isso ajuda os motores de busca a descobrir e indexar todas as versões linguísticas do seu conteúdo.

Um sitemap devidamente internacionalizado garante que os motores de busca possam encontrar e indexar todas as versões linguísticas das suas páginas. Isso melhora a visibilidade nos resultados de busca internacionais.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Obter um mapa de todos os locais e seus caminhos localizados
 *
 * Exemplo de saída:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Gerar sitemap com todas as variantes de locale para melhor SEO
// O campo alternates informa aos motores de busca sobre as versões de idioma
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (Opcional) Passo 13: Internacionalize seu robots.txt

Crie um arquivo robots.txt que gerencie corretamente todas as versões de locale das suas rotas protegidas. Isso garante que os motores de busca não indexem páginas de administração ou dashboard em nenhum idioma.

Configurar corretamente o robots.txt para todos os locales impede que motores de busca indexem páginas sensíveis quando suas rotas são diferentes para cada locale.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Gera caminhos para todos os locales (ex: /admin, /fr/admin, /es/admin)
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

### (Opcional) Passo 14: Configurar Proxy para Roteamento de Locale

Crie um proxy para detectar automaticamente o locale preferido do usuário e redirecioná-lo para a URL apropriada com prefixo de locale. O next-intl fornece uma função proxy conveniente que faz isso automaticamente.

O proxy garante que os usuários sejam automaticamente redirecionados para o idioma preferido ao visitarem seu site. Ele também salva a preferência do usuário para visitas futuras, melhorando a experiência do usuário.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Middleware executa antes das rotas, lidando com a detecção e roteamento do locale
// localeDetection: true usa o cabeçalho Accept-Language para auto detectar o locale
export default proxy;

export const config = {
  // Ignorar API, internos do Next e assets estáticos
  // Regex: corresponde a todas as rotas exceto as que começam com api, _next, ou que contenham um ponto (arquivos)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (Opcional) Passo 15: Configurar Tipos TypeScript para o Locale

Configurar o TypeScript ajudará você a obter autocompletar e segurança de tipos para suas chaves.

Para isso, você pode criar um arquivo global.ts na raiz do seu projeto e adicionar o seguinte código:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... Arquivos JSON futuros também devem ser adicionados aqui
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Este código usará Module Augmentation para adicionar os locales e mensagens ao tipo AppConfig do next-intl.

### (Opcional) Passo 15: Automatize Suas Traduções Usando Intlayer

Intlayer é uma biblioteca **gratuita** e **open-source** projetada para auxiliar o processo de localização na sua aplicação. Enquanto o next-intl gerencia o carregamento e a gestão das traduções, o Intlayer ajuda a automatizar o fluxo de trabalho das traduções.

Gerenciar traduções manualmente pode ser demorado e sujeito a erros. O Intlayer automatiza os testes, a geração e a gestão das traduções, economizando seu tempo e garantindo consistência em toda a sua aplicação.

O Intlayer permite que você:

- **Declare seu conteúdo onde quiser na sua base de código**  
  O Intlayer permite declarar seu conteúdo onde quiser na sua base de código usando arquivos `.content.{ts|js|json}`. Isso possibilita uma melhor organização do seu conteúdo, garantindo melhor legibilidade e manutenção da sua base de código.

- **Teste traduções faltantes**
  Intlayer fornece funções de teste que podem ser integradas no seu pipeline CI/CD ou nos seus testes unitários. Saiba mais sobre [testar suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/testing.md).

- **Automatize suas traduções**,
  Intlayer fornece uma CLI e uma extensão para VSCode para automatizar suas traduções. Pode ser integrado no seu pipeline CI/CD. Saiba mais sobre [automatizar suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).
  Você pode usar sua **própria chave de API e o provedor de IA de sua escolha**. Também oferece traduções contextuais, veja [preencher conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md).

- **Conectar conteúdo externo**
  Intlayer permite que você conecte seu conteúdo a um sistema externo de gerenciamento de conteúdo (CMS). Para buscá-lo de forma otimizada e inseri-lo em seus recursos JSON. Saiba mais sobre [busca de conteúdo externo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/function_fetching.md).

- **Editor visual**  
  Intlayer oferece um editor visual gratuito para editar seu conteúdo usando um editor visual. Saiba mais sobre [edição visual das suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).

E mais. Para descobrir todos os recursos fornecidos pelo Intlayer, consulte a [documentação sobre o interesse do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md).
