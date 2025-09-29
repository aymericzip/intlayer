---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO e i18n no Next.js
description: Aprenda como configurar SEO multilíngue no seu app Next.js usando next-intl, next-i18next e Intlayer.
keywords:
  - Intlayer
  - SEO
  - Internacionalização
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - seo
  - i18n
  - nextjs
---

# SEO e i18n no Next.js: Traduzir não é suficiente

Quando os desenvolvedores pensam em internacionalização (i18n), o primeiro reflexo é frequentemente: _traduzir o conteúdo_. Mas as pessoas geralmente esquecem que o principal objetivo da internacionalização é tornar seu site mais visível para o mundo.
Se o seu app Next.js multilíngue não informar aos motores de busca como rastrear e entender suas diferentes versões de idioma, a maior parte do seu esforço pode passar despercebida.

Neste blog, vamos explorar **por que a i18n é uma superpotência do SEO** e como implementá-la corretamente no Next.js com `next-intl`, `next-i18next` e `Intlayer`.

---

## Por que SEO e i18n

Adicionar idiomas não é apenas sobre UX. É também uma alavanca poderosa para a **visibilidade orgânica**. Eis o porquê:

1. **Melhor descobribilidade:** Os motores de busca indexam versões localizadas e as classificam para usuários que buscam em seu idioma nativo.
2. **Evitar conteúdo duplicado:** Tags canônicas e alternadas adequadas indicam aos rastreadores qual página pertence a qual localidade.
3. **Melhor UX:** Os visitantes chegam imediatamente à versão correta do seu site.
4. **Vantagem competitiva:** Poucos sites implementam SEO multilíngue corretamente, o que significa que você pode se destacar.

---

## Melhores práticas para SEO multilíngue no Next.js

Aqui está uma lista de verificação que todo app multilíngue deve implementar:

- **Defina as meta tags `hreflang` no `<head>`**  
  Ajuda o Google a entender quais versões existem para cada idioma.

- **Liste todas as páginas traduzidas no `sitemap.xml`**  
  Use o esquema `xhtml` para que os rastreadores encontrem facilmente as versões alternativas.

- **Exclua rotas privadas/localizadas no `robots.txt`**  
  Exemplo: não permita que `/dashboard`, `/fr/dashboard`, `/es/dashboard` sejam indexados.

- **Use links localizados**  
  Exemplo: `<a href="/fr/about">À propos</a>` em vez de linkar para o padrão `/about`.

Estes são passos simples — mas ignorá-los pode custar sua visibilidade.

---

## Exemplos de Implementação

Os desenvolvedores frequentemente esquecem de referenciar corretamente suas páginas entre os idiomas, então vamos ver como isso funciona na prática com diferentes bibliotecas.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// Função para gerar o caminho localizado conforme o idioma
function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
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
    locales.map((l) => [l, localizedPath(l, url)])
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
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

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
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Prefixa o caminho com o locale, a menos que seja o locale padrão */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Helper para URL absoluta */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importa dinamicamente o arquivo JSON correto
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
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
    locales.map((l) => [l, abs(l, "/about")])
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
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **Intlayer**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Gera um objeto contendo todas as URLs para cada localidade.
   *
   * Exemplo:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Retorna
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Resto do código da página
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

// Função para obter todas as URLs multilíngues a partir de uma lista de URLs
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // Bloqueia o acesso multilíngue à rota /dashboard
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer fornece uma função `getMultilingualUrls` para gerar URLs multilíngues para o seu sitemap.

  </TabItem>
</Tabs>

---

## Conclusão

Fazer a i18n corretamente no Next.js não é apenas sobre traduzir texto, mas sim garantir que os motores de busca e os usuários saibam exatamente qual versão do seu conteúdo deve ser exibida.
Configurar hreflang, sitemaps e regras de robots é o que transforma traduções em valor real para SEO.

Enquanto next-intl e next-i18next oferecem formas sólidas de configurar isso, geralmente exigem muita configuração manual para manter a consistência entre os locais.

É aqui que o Intlayer realmente se destaca:

Ele vem com helpers integrados como getMultilingualUrls, tornando a integração de hreflang, sitemap e robots quase sem esforço.

Os metadados permanecem centralizados em vez de dispersos em arquivos JSON ou utilitários personalizados.

Foi projetado para Next.js desde o início, para que você gaste menos tempo depurando configurações e mais tempo entregando.

Se o seu objetivo não é apenas traduzir, mas escalar o SEO multilíngue sem atritos, o Intlayer oferece a configuração mais limpa e preparada para o futuro.
