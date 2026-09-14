---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl vs Intlayer: Benchmark & Comparação 2026"
description: Tamanho do bundle, vazamento de conteúdo, reatividade de alternância de locale e experiência do desenvolvedor medidos no Next.js e TanStack Start. Qual biblioteca i18n você deve escolher em 2026?
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Benchmark de Internacionalização (i18n) do Next.js

`next-intl` é a biblioteca i18n mais popular para Next.js. Intlayer é uma alternativa baseada em compilador e com escopo de componente. Ambas localizam uma aplicação App Router. A questão é quanto cada uma custa uma vez que a aplicação está compilada.

Este artigo não é um tutorial. É uma comparação apoiada por números do [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), um conjunto de benchmark open-source que constrói a mesma aplicação com cada biblioteca e mede o que o navegador realmente faz download e executa.

<TOC/>

> **tl;dr**: Na mesma aplicação Next.js, `next-intl` adiciona **+12.6 KB gzip** de JavaScript em cada página, versus **+0.3 KB** para Intlayer. Sem trabalho extra, `next-intl` envia **~90% das strings de páginas estrangeiras** com cada página. Alcançar 0% de vazamento com `next-intl` requer escopo de namespace e `pick(messages, [...])` por página. Intlayer alcança 0% por padrão, porque seu compiler escopeia o conteúdo por componente. Se você quer a API `next-intl` com a saída do Intlayer, o adaptador `@intlayer/next-intl` mediu **147.5 KB** por página versus **153.6 KB** com o original.

## Em resumo

- **next-intl** - Leve, bem documentado, formato de mensagem ICU, suporte de primeira classe ao App Router com middleware, formatters e helpers de navegação. O conteúdo reside em catálogos JSON centralizados; otimizações de desempenho (namespaces, seleção de mensagens por página, lazy loading) são sua responsabilidade.
- **Intlayer** - Modelo de conteúdo centrado em componentes. Dicionários `.content.ts` ficam ao lado do componente que servem, um compilador em tempo de build faz tree-shake e lazy-loads deles por componente e por locale, tipos TypeScript rigorosos são gerados a partir do seu conteúdo, e traduções ausentes falham em tempo de build. Inclui middleware, helpers de SEO, um Visual Editor / CMS e tradução assistida por IA.

| Biblioteca            | Estrelas do GitHub                                                                                                                                                             | Total de Commits                                                                                                                                                                   | Último Commit                                                                                                                                       | Primeira Versão | Versão NPM                                                                                                    | Downloads NPM                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Abril 2024      | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Nov 2020        | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> Os emblemas são atualizados automaticamente. Os snapshots variarão ao longo do tempo.

## Comparação de recursos lado a lado

| Recurso                                           | `next-intlayer` (Intlayer)                                                                | `next-intl`                                                                                                             |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Traduções próximas aos componentes**            | ✅ Sim, `.content.ts` colocado junto com cada componente                                  | ❌ Não, centralizado em `messages/{locale}.json`                                                                        |
| **Integração TypeScript**                         | ✅ Tipos estritos gerados automaticamente a partir do conteúdo                            | ✅ Bom, chaves tipadas via augmentação `global.d.ts`                                                                    |
| **Detecção de tradução ausente**                  | ✅ Erro TypeScript + erro/aviso em tempo de build                                         | ⚠️ Fallback em tempo de execução + aviso no console                                                                     |
| **Conteúdo rico (JSX / Markdown / componentes)**  | ✅ Suporte direto                                                                         | ⚠️ `t.rich()` / `t.markup()` com placeholders de tag                                                                    |
| **Suporte ICU**                                   | ⚠️ Em desenvolvimento                                                                     | ✅ Sim                                                                                                                  |
| **Formatação (datas, números, moedas)**           | ✅ `useNumber`, `useDate`, ... (Intl sob o capô)                                          | ✅ `useFormatter()` (Intl sob o capô)                                                                                   |
| **Roteamento localizado e middleware**            | ✅ Proxy/middleware integrado, `getMultilingualUrls`                                      | ✅ Middleware integrado, `Link`, `redirect`, `usePathname`                                                              |
| **Auxiliares de SEO (hreflang, sitemap, robots)** | ✅ Auxiliares integrados                                                                  | ⚠️ Manual, baseado na configuração de roteamento                                                                        |
| **Componentes de servidor síncrono**              | ✅ `useIntlayer` de `next-intlayer/server` funciona em qualquer componente servidor filho | ⚠️ `getTranslations` é assíncrono; filhos síncronos precisam de `t` passado como props                                  |
| **Renderização estática**                         | ✅ Não bloqueia a renderização estática                                                   | ⚠️ Requer `setRequestLocale()`; catálogos nomeados ainda optaram páginas fora da renderização estática em nossos testes |
| **Tree-shaking (enviar apenas conteúdo usado)**   | ✅ Por componente, por locale, automatizado pelo compilador                               | ⚠️ Manual: namespaces + `pick(messages, [...])` por página                                                              |
| **Lazy loading**                                  | ✅ `importMode: 'dynamic'` (uma linha de config)                                          | ⚠️ Importações dinâmicas manuais em `getRequestConfig`                                                                  |
| **Purge unused content**                          | ✅ Dicionários não utilizados são removidos no momento da compilação                      | ❌ Não incluído                                                                                                         |
| **Testing missing translations (CLI / CI)**       | ✅ `npx intlayer content test`                                                            | ⚠️ Não incluído; docs sugerem `npx @lingual/i18n-check`                                                                 |
| **AI-powered translation**                        | ✅ Incluído, usa suas próprias chaves de provedor                                         | ❌ Não                                                                                                                  |
| **Editor Visual / CMS**                           | ✅ Editor Visual gratuito + CMS opcional                                                  | ❌ Não (plataformas de localização externas)                                                                            |
| **Servidor MCP & Agent Skills**                   | ✅ Sim                                                                                    | ❌ Não                                                                                                                  |
| **Ecossistema / comunidade**                      | ⚠️ Menor mas crescendo rapidamente                                                        | ✅ Grande, a referência do Next.js                                                                                      |

## O benchmark

### O que foi medido

O suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) constrói **a mesma aplicação** com cada biblioteca: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idênticos e conteúdo idêntico. As páginas são medidas em `en` e `fr`. Cada biblioteca é implementada em até quatro **estratégias de carregamento**, da configuração ingênua até a otimizada:

| Strategy           | Description                                                                         | Who does this                              |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------ |
| **static**         | Cada locale e cada página agrupadas juntas                                          | Protótipos rápidos, código gerado por IA   |
| **dynamic**        | Apenas a locale ativa é carregada, mas todas as páginas de uma vez                  | A maioria dos projetos                     |
| **scoped-static**  | Namespaces por rota, sem lazy loading                                               | Raro                                       |
| **scoped-dynamic** | Namespaces por rota + lazy loading. Apenas a página atual na locale atual é enviada | Apps com orçamento de performance rigoroso |

Intlayer não possui uma variante "scoped": o compilador agrupa conteúdo **por componente** automaticamente, então suas linhas `static` e `dynamic` já estão agrupadas.

Para cada build, a suite registra:

- **Lib size**: tamanho gzip da biblioteca i18n. O custo fixo do runtime.
- **Page JS**: JavaScript gzip baixado por página, calculado em média sobre todas as páginas e locales.
- **Locale leak %**: proporção de strings traduzidas encontradas no JS baixado que pertencem a um locale que o usuário **não** está visualizando (fingerprinted em `en` e `fr`, então 50% significa "o outro locale medido está totalmente presente"; com 10 locales agrupados, o desperdício real é maior).
- **Page leak %**: proporção de strings traduzidas encontradas no JS baixado que pertencem a uma página em que o usuário **não** está.
- **Component avg**: tamanho gzip médio de cada componente compilado isoladamente. Mostra quanto runtime i18n um único componente carrega.
- **E2E reactivity**: tempo real entre selecionar uma nova locale e `html[lang]` atualizar no DOM (Playwright, 5 iterações).
- **Hydration**: duração da fase de hidratação do React.

> Os números abaixo vêm da execução datada de **2026-09-12** com `next-intl` 4.14.2, `use-intl` 4.14.2 e `intlayer` 9.5.1. A aplicação de teste é deliberadamente pequena (algumas dezenas de strings por locale), portanto as porcentagens de vazamento descrevem um **padrão**: eles crescem com seu conteúdo enquanto o custo de runtime permanece fixo.

### Resultados no Next.js (App Router)

| Library                        | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (sem i18n)            | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| `next-intl`                    | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |   14.7 ms |
| `next-intl`                    | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |   14.8 ms |
| `next-intl`                    | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |   17.4 ms |
| `next-intl`                    | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |   16.8 ms |
| **`next-intlayer`**            | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**            | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |
| `@intlayer/next-intl` (compat) | static         |        8.0 KB |         147.5 KB |        0.0% |      0.0% |             8.1 KB |        14.5 ms |   12.8 ms |
| `@intlayer/next-intl` (compat) | dynamic        |        8.0 KB |         148.7 KB |        0.0% |      0.0% |             8.1 KB |        11.7 ms |   12.8 ms |

**Como ler isso**

- **Custo de runtime.** A aplicação base pesa 141.0 KB por página. `next-intl` a leva para 153.6 KB (**+12.6 KB gzip em cada página**), Intlayer para 141.3 KB (**+0.3 KB**). Esta diferença não depende de quantas strings você tem: é o runtime da biblioteca.
- **Vazamento.** Nos dois setups que a maioria das equipes realmente implementa (`static` e `dynamic`), `next-intl` entrega **~90% das strings de páginas estrangeiras** com cada página: todo o `en.json` vai para o provider do cliente. Para chegar a 0% é necessário os setups `scoped-*`: dividir catálogos em namespaces e depois fazer `pick()` dos corretos em cada página. Intlayer está em 0% em ambas as linhas sem nada disso.
- **O JS por página não se moveu para `next-intl` entre estratégias.** O conteúdo do teste é pequeno, então o vazamento de ~90% é apenas alguns KB aqui. Em uma app real com centenas de strings por página, essa proporção se torna o custo dominante. Enquanto isso, o runtime de +12.6 KB é pago em cada configuração.
- **Tamanho do componente.** Um componente que chama `useTranslations()` compila para 21.8 KB em média; o mesmo componente com `useIntlayer()` compila para 6.9 KB. Na configuração `scoped-static`, os componentes `next-intl` saltam para 80.1 KB porque cada um internaliza seu catálogo de namespace.
- **Reatividade e hidratação** estão no mesmo patamar para ambas as bibliotecas no Next.js (15-18 ms). Nenhuma delas é um gargalo aqui.

### Resultados no TanStack Start (`use-intl`)

`use-intl` é o núcleo agnóstico de framework do `next-intl`. Mesma API, mesmo formato de mensagem. Comparar isso contra `intlayer` no TanStack Start remove as partes específicas do Next.js da equação.

| Library                       | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |
| ----------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: |
| **base** (sem i18n)           | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |
| `use-intl`                    | static         |       14.1 KB |         179.8 KB |       50.0% |     89.8% |            76.0 KB |         6.7 ms |
| `use-intl`                    | dynamic        |       14.1 KB |         119.4 KB |        0.0% |     89.8% |            75.9 KB |         7.0 ms |
| `use-intl`                    | scoped-static  |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        20.9 ms |
| `use-intl`                    | scoped-dynamic |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        13.3 ms |
| **`intlayer`**                | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |
| **`intlayer`**                | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |
| `@intlayer/use-intl` (compat) | dynamic        |        7.3 KB |         129.7 KB |        0.0% |      0.0% |             9.3 KB |         8.7 ms |

**Como ler isso**

- A configuração ingênua `use-intl` envia **68.8 KB a mais de JS por página** do que a aplicação base, com metade das strings pertencendo à locale errada e 90% à página errada.
- `use-intl` em modo `dynamic` chega a 119.4 KB, próximo ao 118.6 KB do Intlayer, mas ainda carrega **89.8% de vazamento de página**: as strings de todas as páginas para a locale ativa são carregadas em cada página. Escopo-las por rota (`scoped-*`) remove o vazamento, mas custa outro ~9 KB de overhead de chunk.
- Intlayer's `static` já tem **0% de vazamento de página**: o compilador só agrupa os dicionários usados pelos componentes na página. Habilitando `importMode: 'dynamic'` (uma linha em `intlayer.config.ts`) remove também o vazamento de locale.
- **O tamanho do componente é onde a arquitetura se manifesta**: 76-87 KB por componente com `use-intl` versus 6-8 KB com Intlayer. `useTranslations()` vincula cada componente à árvore de mensagens global; `useIntlayer()` vincula-o ao seu próprio dicionário.
- **Mudança de locale** é 2x-4x mais rápida com Intlayer (3 ms vs 7-21 ms).

## Por que a diferença? Catálogos centralizados vs. dicionários compilados

`next-intl` segue o modelo clássico: um JSON por locale, carregado em `getRequestConfig`, inserido em um `NextIntlClientProvider`, lido através de `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

O runtime não consegue saber quais keys uma página usará, então o padrão seguro é enviar o catálogo completo. Otimizar significa **você** dividir o catálogo em namespaces, **você** decidir quais namespaces cada página precisa, e **você** manter esse mapeamento sincronizado conforme os componentes se movem. A linha `scoped-dynamic` do benchmark é a recompensa por esse trabalho, e a maioria das equipes nunca chega lá.

Intlayer inverte a responsabilidade. O conteúdo é declarado ao lado do componente:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           ├── page.tsx
    │           └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

No momento da compilação, o compilador (`@intlayer/swc` / `@intlayer/babel`) vê qual componente importa qual dicionário. Ele agrupa apenas esses dicionários, apenas para o locale ativo, e descarta os que nada importa. O padrão "scoped-dynamic" torna-se a saída da compilação em vez de uma disciplina que o time tem que manter.

> Para obter os números da linha `dynamic`, defina `dictionary.importMode: 'dynamic'` em `intlayer.config.ts`. Veja a [documentação de otimização de bundle](https://intlayer.org/doc/concept/bundle-optimization).

## Experiência do desenvolvedor

### Componente cliente

**next-intl**

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> Lembrez-se de incluir o namespace `counter` nas mensagens passadas para `NextIntlClientProvider` em cada página que renderiza este componente.

**Intlayer**

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ pt: "Contador", en: "Counter", fr: "Compteur" }),
    increment: t({ pt: "Incrementar", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  // Obter o rótulo e o texto do incremento do conteúdo da internacionalização
  const { label, increment } = useIntlayer("counter");
  // Obter a função de formatação de números
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Nada para registrar na página: o componente traz seu próprio conteúdo.

### Componente de servidor síncrono

Peças de design-system (navbar, footer, cards) são frequentemente componentes server renderizados como children de componentes client, então não podem ser `async`.

**next-intl**

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

A página tem que `await getTranslations("counter")` e `await getFormatter()`, depois passar os resultados para baixo como props. O componente não é mais auto-contido.

**Intlayer**

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

### Metadados

**next-intl**

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

**Intlayer**

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

## Mantenha a API do next-intl, obtenha a saída do Intlayer

Você não precisa reescrever componentes para obter os números de benchmark acima. `@intlayer/next-intl` é um adaptador pronto para usar: mantém `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, plurais ICU e os auxiliares `next-intl/navigation`, e os fornece a partir dos dicionários compilados do Intlayer pelo compilador Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

Na benchmark, a build de compatibilidade da mesma aplicação passou de **153.6 KB para 147.5 KB** por página, de **21.8 KB para 8.1 KB** por componente, e de **~90% page leakage para 0%**, com o código da aplicação intacto. Seus arquivos `messages/{locale}.json` existentes podem continuar sendo a fonte de verdade através do [plugin JSON sync](https://intlayer.org/doc/compatibility/next-intl).

Veja o [guia de migração next-intl](https://intlayer.org/doc/migration/next-intl) para o passo a passo.

## Quando escolher qual?

- **Escolha next-intl** se você quer o padrão de ecossistema para Next.js, depende de ICU MessageFormat, sua aplicação é pequena a média, ou você se integra com uma plataforma de tradução (Crowdin, Phrase, Lokalise...) que espera JSON centralizado. Considere o tempo para namespace de catálogos e selecione mensagens por página se o desempenho importa.
- **Escolha Intlayer** se você quer **conteúdo com escopo de componente**, **TypeScript rigoroso**, **erros de chaves ausentes em tempo de build**, **tree-shaking e lazy loading sem esforço**, componentes de servidor síncronos, e ferramentas editoriais integradas (Visual Editor, CMS, tradução com IA, servidor MCP). Especialmente relevante para codebases grandes e modulares e design systems.
- **Escolha `@intlayer/next-intl`** se você já está usando `next-intl` e quer ganhos de bundle sem uma reescrita.

## Comparações relacionadas

- [i18next vs Intlayer](https://intlayer.org/blog/i18next-vs-intlayer) (mesmo benchmark)
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer) (mesmo benchmark)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (mesmo benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer)
- [next-intl está desatualizado?](https://intlayer.org/blog/is-next-intl-outdated)

## GitHub STARs

As estrelas do GitHub são um forte indicador de popularidade de um projeto, confiança da comunidade e relevância de longo prazo. Embora não sejam uma medida direta de qualidade técnica, elas refletem quantos desenvolvedores acham o projeto útil, acompanham seu progresso e provavelmente vão adotá-lo.

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Conclusão

`next-intl` é uma biblioteca sólida e bem mantida, e o benchmark confirma que está longe de ser a pior opção no Next.js. Mas seu modelo de catálogo centralizado coloca cada otimização nas mãos do desenvolvedor: a configuração ingênua vaza ~90% do conteúdo de páginas estrangeiras, e o runtime sozinho custa +12.6 KB gzip em cada página.
