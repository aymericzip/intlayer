---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Domínios personalizados
description: Aprenda como configurar o roteamento de locale baseado em domínio no Intlayer para servir diferentes locales a partir de hostnames dedicados.
keywords:
  - Domínios personalizados
  - Roteamento por domínio
  - Roteamento
  - Internacionalização
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Adição de roteamento de locale baseado em domínio via configuração routing.domains."
---

# Domínios personalizados

O Intlayer suporta roteamento de locale baseado em domínio, permitindo que você sirva locales específicos a partir de hostnames dedicados. Por exemplo, os visitantes chineses podem ser direcionados para `intlayer.zh` em vez de `intlayer.org/zh`.

## Como funciona

O mapa `domains` em `routing` associa cada locale a um hostname. O Intlayer usa esse mapa em dois lugares:

1. **Geração de URL** (`getLocalizedUrl`): quando o locale de destino vive em um domínio _diferente_ da página atual, uma URL absoluta é retornada (ex: `https://intlayer.zh/about`). Quando ambos os domínios coincidem, uma URL relativa é retornada (ex: `/fr/about`).
2. **Proxy do servidor** (Next.js & Vite): as solicitações recebidas são redirecionadas ou rescritas com base no domínio em que chegam.

### Domínios exclusivos vs. compartilhados

A distinção principal é a **exclusividade**:

- **Domínio exclusivo** — apenas um locale mapeia para esse hostname (ex: `zh → intlayer.zh`). O próprio domínio identifica o locale, portanto, nenhum prefixo de locale é adicionado ao caminho. `https://intlayer.zh/about` serve conteúdo em chinês.
- **Domínio compartilhado** — vários locales mapeiam para o mesmo hostname (ex: tanto `en` quanto `fr` mapeiam para `intlayer.org`). O roteamento padrão baseado em prefixo se aplica. `intlayer.org/fr/about` serve conteúdo em francês.

## Configuração

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // Domínio compartilhado — en e fr usam roteamento de prefixo em intlayer.org
      en: "intlayer.org",
      // Domínio exclusivo — zh tem seu próprio hostname, nenhum prefixo /zh/ é necessário
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Locales que não estão listados em `domains` continuam a usar o roteamento de prefixo padrão sem qualquer substituição de domínio.

## Geração de URL

`getLocalizedUrl` produz automaticamente o tipo de URL correto com base no contexto da chamada.

### Locale no mesmo domínio (URL relativa)

```ts
// Página atual: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (locale padrão, sem prefixo)
```

### Locale em um domínio diferente (URL absoluta)

```ts
// Página atual: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (domínio exclusivo, sem prefixo /zh/)
```

### Servindo a partir do domínio do próprio locale

```ts
// Página atual: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (já está no domínio correto — URL relativa)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (link entre domínios de volta para intlayer.org)
```

### Detecção automática do domínio atual

`currentDomain` é opcional. Quando omitido, `getLocalizedUrl` o resolve nesta ordem:

1. O hostname de uma URL de entrada absoluta (ex: `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` em ambientes de navegador.
3. Se nenhum estiver disponível (SSR sem opção explícita), uma URL relativa é retornada para locales do mesmo domínio e nenhuma URL absoluta é produzida — este é o fallback seguro.

```ts
// Navegador — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (detectado automaticamente a partir de window)

// A partir de uma URL absoluta — domínio detectado automaticamente
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` com domínios

`getMultilingualUrls` chama `getLocalizedUrl` para cada locale, por o que produz uma mistura de URLs relativas e absolutas dependendo do domínio do chamador:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

Essas URLs absolutas estão prontas para usar em tags `<link rel="alternate" hreflang="...">` para SEO.

## Comportamento do Proxy

### Next.js

O middleware `intlayerProxy` lida com o roteamento de domínio automaticamente. Adicione-o ao seu `middleware.ts`:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Redirecionamento** — a solicitação chega no domínio errado para um determinado prefixo de locale:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Reescrita** — a solicitação chega no domínio exclusivo do locale sem um prefixo:

```
GET intlayer.zh/about
→ reescrita para /zh/about  (apenas roteamento interno do Next.js, a URL permanece limpa)
```

### Vite

O plugin Vite `intlayerProxy` aplica a mesma lógica durante o desenvolvimento:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Nota**: no desenvolvimento local você está normalmente no `localhost`, então redirecionamentos entre domínios apontarão para os domínios reais em vez de outra porta local. Use uma substituição no arquivo hosts (ex: `127.0.0.1 intlayer.zh`) or um proxy reverso se precisar testar o roteamento multidomínio localmente.

## Seletor de locale (Locale Switcher)

O hook `useLocale` do `next-intlayer` lida com a navegação consciente do domínio automaticamente. Quando um usuário muda para um locale em um domínio diferente, o hook realiza uma navegação de página completa (`window.location.href`) em vez de um push do roteador no lado do cliente, porque o roteador do Next.js não pode cruzar origens.

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Nenhuma configuração extra é necessária — `useLocale` detecta `window.location.hostname` internamente e decide entre `router.replace` (mesmo domínio) e `window.location.href` (cross-domain).

## SEO: Links alternativos `hreflang`

O roteamento baseado em domínio é comumente usado junto com `hreflang` para informar aos mecanismos de pesquisa qual URL indexar para cada idioma. Use `getMultilingualUrls` para gerar o conjunto completo de URLs alternativas:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // ex: "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Isso produz:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Utilitários principais

| Utilitário                                        | Descrição                                                                                             |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Retorna uma URL relativa ou absoluta dependendo se o locale de destino está no domínio atual ou não.  |
| `getMultilingualUrls(url, { currentDomain })`     | Retorna um mapa de URLs localizadas por locale, misturando relativas e absolutas conforme necessário. |
| `getPrefix(locale, { domains })`                  | Retorna um prefixo vazio para locales de domínio exclusivo, caso contrário, o prefixo normal.         |
