---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "i18next vs Intlayer: Benchmark e Comparativo 2026"
description: "react-i18next e next-i18next medidos contra o Intlayer no Next.js e TanStack Start. Tamanho do bundle, vazamento de conteúdo, reatividade na troca de idioma e experiência de desenvolvimento."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Internacionalização
  - i18n
  - Benchmark
  - Tamanho do bundle
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | Benchmark de internacionalização (i18n) para React e Next.js

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

O `i18next` é o framework de i18n mais utilizado no ecossistema JavaScript. Através do `react-i18next` e `next-i18next`, sustenta grande parte das aplicações React e Next.js. O Intlayer é uma alternativa baseada em compilador, com escopo por componente.

Este artigo compara ambas as soluções com base em medições reais e não em listas de recursos. Os números vêm do [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), uma suíte de código aberto que constrói a mesma aplicação com cada biblioteca e registra o que o navegador realmente baixa.

<TOC/>

> **tl;dr**: O `i18next` é o runtime mais pesado do benchmark: **+77 KB gzip por página** no Next.js na configuração padrão (naive), **+22 KB** após otimização completa de namespaces + lazy loading. O Intlayer adiciona apenas **+0.3 KB**. Todas as configurações do `i18next`, exceto a totalmente isolada (scoped), enviam **~90% de strings de outras páginas**; o Intlayer envia **0%** por padrão. A troca de idioma com backend carregado sob demanda levou **123-185 ms** com o `react-i18next` contra **3-4 ms** com o Intlayer. O adaptador `@intlayer/next-i18next` mantém a API do `i18next` e atingiu **150.7 KB** por página contra **218.5 KB** do original.

## Em resumo

- **i18next / react-i18next / next-i18next** - Maduro, com ecossistema rico de plugins e agnóstico de framework. Namespaces, detectores de idioma, backends, ICU via plugin, `<Trans>` para conteúdo rico. Conteúdo centralizado em `locales/{lng}/{ns}.json`. Poderoso, mas cada otimização (divisão de namespaces, carregamento por página, segurança de tipos) exige configurações manuais contínuas.
- **Intlayer** - Modelo de conteúdo centrado em componentes. Dicionários `.content.ts` ficam ao lado do componente que atendem, um compilador em tempo de build aplica tree-shaking e lazy loading por componente e por idioma, tipos TypeScript estritos são gerados a partir do seu conteúdo e traduções ausentes quebram o build. Oferece middleware, utilitários de SEO, Editor Visual / CMS e tradução assistida por IA.

| Biblioteca              | Estrelas no GitHub                                                                                                                                                                 | Commits Totais                                                                                                                                                                         | Último Commit                                                                                                                                           | Primeira Versão  | Versão no NPM                                                                                                         | Downloads no NPM                                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | Abril de 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Janeiro de 2012  | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Dezembro de 2015 | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Novembro de 2018 | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Os badges são atualizados automaticamente. As capturas variam ao longo do tempo.

## Comparativo direto de recursos

| Recurso                                      | Intlayer (`react-intlayer` / `next-intlayer`)                                      | i18next (`react-i18next` / `next-i18next`)                                      |
| -------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Traduções próximas aos componentes**       | ✅ Sim, `.content.ts` junto a cada componente                                      | ❌ Não, pastas centralizadas `locales/{lng}/{ns}.json`                          |
| **Integração com TypeScript**                | ✅ Tipos estritos gerados automaticamente do conteúdo                              | ⚠️ Básico; chaves estritas exigem ampliação de `CustomTypeOptions` e tipagem    |
| **Detecção de traduções ausentes**           | ✅ Erro TypeScript + erro/aviso no momento do build                                | ⚠️ Fallback em runtime (`saveMissing`, eco de chave)                            |
| **Conteúdo rico (JSX / Markdown)**           | ✅ Suporte nativo                                                                  | ⚠️ `<Trans>` com placeholders indexados                                         |
| **Suporte ICU**                              | ⚠️ Em andamento                                                                    | ⚠️ Via plugin (`i18next-icu`)                                                   |
| **Pluralização**                             | ✅ Padrões baseados em enumerações                                                 | ✅ Sufixos `_one` / `_other` (Intl.PluralRules)                                 |
| **Formatação (datas, números, moedas)**      | ✅ `useNumber`, `useDate`, ... (Intl nativo)                                       | ⚠️ Formatadores de interpolação ou chamadas diretas a `Intl.*`                  |
| **Roteamento localizado e middleware**       | ✅ Proxy/middleware integrado, `getMultilingualUrls`                               | ⚠️ Não é nativo; middleware manual ou de terceiros                              |
| **Utilitários de SEO (hreflang, sitemap)**   | ✅ Utilitários integrados                                                          | ❌ Manual                                                                       |
| **Componentes de servidor síncronos**        | ✅ `useIntlayer` de `next-intlayer/server` utilizável em qualquer Server Component | ⚠️ `getFixedT` na página e passar `t` via props                                 |
| **Tree-shaking (apenas conteúdo utilizado)** | ✅ Por componente, por idioma, automatizado pelo compilador                        | ⚠️ Manual: namespaces + lista `ns` por página + backend                         |
| **Lazy loading**                             | ✅ `importMode: 'dynamic'` (uma linha de configuração)                             | ✅ Via plugins backend (`i18next-resources-to-backend`, `i18next-http-backend`) |
| **Limpeza de conteúdo não utilizado**        | ✅ Dicionários órfãos são descartados no build                                     | ❌ Não integrado                                                                |
| **Testar traduções ausentes (CLI / CI)**     | ✅ `npx intlayer content test`                                                     | ⚠️ `i18next-parser` / ferramentas de terceiros                                  |
| **Tradução assistida por IA**                | ✅ Integrada, utiliza suas próprias chaves de API                                  | ❌ Não (Locize é um serviço pago à parte)                                       |
| **Editor Visual / CMS**                      | ✅ Editor Visual gratuito + CMS opcional                                           | ❌ Não (Locize / plataformas externas)                                          |
| **Servidor MCP e Agent Skills**              | ✅ Sim                                                                             | ❌ Não                                                                          |
| **Ecossistema e comunidade**                 | ⚠️ Mais recente, porém em rápido crescimento                                       | ✅ Maior e mais maduro                                                          |

## O benchmark

### O que foi medido

A suíte [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) constrói **a mesma aplicação** com cada biblioteca: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 idiomas** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes e conteúdos idênticos. As páginas são medidas em `en` e `fr`. Cada biblioteca é testada em até quatro **estratégias de carregamento**:

| Estratégia         | Descrição                                                                              | Quem costuma usar                              |
| ------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **static**         | Todos os idiomas e páginas empacotados juntos (`resources` embutidos em `init()`)      | Protótipos rápidos, código gerado por IA       |
| **dynamic**        | Apenas o idioma ativo é carregado via backend, mas todos os namespaces simultaneamente | A maioria dos projetos                         |
| **scoped-static**  | Um namespace por rota, todos embutidos antecipadamente                                 | Raro                                           |
| **scoped-dynamic** | Um namespace por rota + lazy loading via backend. Apenas a página e idioma atuais      | Aplicações com orçamento de performance rígido |

O Intlayer não possui variante "scoped": o compilador isola o conteúdo **por componente** automaticamente, logo suas linhas `static` e `dynamic` já são otimizadas.

Para cada build, a suíte registra:

- **Lib size**: tamanho gzip de um componente vazio que apenas importa a biblioteca i18n. O custo fixo do runtime.
- **Page JS**: JavaScript gzip baixado por página, com média calculada sobre todas as páginas e idiomas.
- **Locale leak %**: proporção de strings traduzidas no JS baixado que pertencem a um idioma que o usuário **não** está visualizando.
- **Page leak %**: proporção de strings traduzidas no JS baixado pertencentes a páginas nas quais o usuário **não** está.
- **Component avg**: tamanho médio gzip de cada componente compilado isoladamente.
- **E2E reactivity**: intervalo real entre a seleção de um novo idioma e a atualização de `html[lang]` no DOM (Playwright, 5 iterações).
- **Hydration**: duração da fase de hidratação do React.

> Os dados abaixo provêm da execução de **2026-09-12** com `next-i18next` 16.3.0, `react-i18next` 17.0.13 e `intlayer` 9.5.1. A aplicação de teste é deliberadamente enxuta (poucas dezenas de strings por idioma), portanto as porcentagens de vazamento expressam um **padrão**: crescem com o volume do conteúdo enquanto o custo do runtime permanece constante.

### Resultados no Next.js (`next-i18next`)

Escolha as métricas e as bibliotecas que importam para você:

<I18nBenchmark framework="nextjs" vertical/>

| Biblioteca                        | Estratégia     | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | Reatividade E2E | Hydration |
| --------------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | --------------: | --------: |
| **base** (sem i18n)               | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |         13.4 ms |   11.8 ms |
| `next-i18next`                    | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |         16.4 ms |   15.6 ms |
| `next-i18next`                    | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |         15.4 ms |   27.7 ms |
| `next-i18next`                    | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |         16.4 ms |   14.7 ms |
| `next-i18next`                    | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |         15.9 ms |   15.1 ms |
| **`next-intlayer`**               | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |     **15.5 ms** |   16.9 ms |
| **`next-intlayer`**               | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |     **15.3 ms** |   15.9 ms |
| `@intlayer/next-i18next` (compat) | static         |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |         10.7 ms |   11.3 ms |
| `@intlayer/next-i18next` (compat) | dynamic        |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |         11.9 ms |   10.6 ms |

**Como interpretar os dados**

- **Custo do runtime.** O core do `i18next` somado ao `react-i18next` representa o maior runtime medido: **19.7 KB gzip** para um componente vazio, contra 5.5 KB do `next-intlayer`.
- **A configuração inicial é onerosa.** Embutir `resources` em `init()` gera **218.5 KB por página**, +77.5 KB acima da aplicação base. Cada página carrega todos os namespaces.
- **Otimizar exige muito esforço.** Adotar um backend (`dynamic`) reduz 49 KB mas ainda vaza **90% de strings de outras páginas** e, nesta configuração, metade das strings pertence ao idioma errado. Dividir em namespaces por rota (`scoped-dynamic`) atinge 0% de vazamento com **163.4 KB**, permanecendo **+22.4 KB por página** acima do Intlayer (141.3 KB), que não exigiu configuração manual alguma.
- **Tamanho dos componentes.** Um componente invocando `useTranslation()` compila entre 26 e 79 KB; o mesmo componente com `useIntlayer()` compila em 6.9 KB.
- **A hidratação** sobe para 27.7 ms na configuração `dynamic`: a instância do i18next inicializa e resolve o backend no cliente antes de o React conseguir hidratar a página.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabela completa, cada biblioteca e cada estratégia, no [relatório de benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md).

### Resultados no TanStack Start (`react-i18next`)

A mesma aplicação no TanStack Start com `react-i18next` puro, isolando os efeitos específicos do Next.js.

| Biblioteca          | Estratégia     | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | Reatividade E2E | Hydration |
| ------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | --------------: | --------: |
| **base** (sem i18n) | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |          8.1 ms |   21.6 ms |
| `react-i18next`     | static         |       18.4 KB |         180.3 KB |       50.0% |     89.8% |            24.3 KB |         12.9 ms |   85.1 ms |
| `react-i18next`     | dynamic        |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |        123.1 ms |   32.9 ms |
| `react-i18next`     | scoped-static  |       18.4 KB |         184.2 KB |       50.7% |     89.8% |            25.3 KB |        185.1 ms |   25.2 ms |
| `react-i18next`     | scoped-dynamic |       18.4 KB |         127.2 KB |        0.0% |      0.0% |            26.7 KB |         17.6 ms |   11.3 ms |
| **`intlayer`**      | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |      **3.2 ms** |   11.5 ms |
| **`intlayer`**      | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |      **3.6 ms** |   14.1 ms |

**Como interpretar os dados**

- A aplicação `react-i18next` básica entrega **+69 KB por página** em relação à aplicação base, e a hidratação consome **85 ms** (4 vezes a base) porque toda a árvore de recursos é processada e registrada no cliente antes do primeiro render.
- **A troca de idioma evidencia o atraso do lazy loading.** Quando os recursos são carregados sob demanda, alternar de idioma exige uma viagem de rede antes da atualização do `html[lang]`: **123 ms** em `dynamic`, **185 ms** em `scoped-static`. O Intlayer atualiza o DOM em **3-4 ms** em ambos os modos: a troca é instantânea e não fica bloqueada em requisições de rede.
- A configuração totalmente otimizada `scoped-dynamic` atinge 0% de vazamento com 127.2 KB, ainda **+8.6 KB** acima da linha `dynamic` do Intlayer, e demandou mapeamento de rotas para namespaces, backend de recursos e limites Suspense por rota.
- A linha `static` do Intlayer já apresenta **0% de vazamento de página** porque somente os dicionários importados pelos componentes daquela página são empacotados. Ativar `importMode: 'dynamic'` elimina também o vazamento de idioma.
- **Tamanho por componente**: 24-27 KB com `react-i18next` contra 6-8 KB com Intlayer. O `useTranslation()` conecta cada componente à instância global do i18next.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabela completa no [relatório de benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md).

## De onde vem a diferença? Instância global vs. dicionários compilados

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

O `i18next` foi projetado em 2012 como um runtime: uma instância global mantém os recursos, plugins a expandem e `t()` busca chaves em tempo de renderização. Isso proporciona grande flexibilidade (qualquer framework, backend ou formato), mas impõe custo de peso:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # precisa saber que depende de ["common", "about"]
```

A instância não tem como prever quais chaves um componente solicitará. Otimizar exige que **você** divida catálogos em namespaces, **você** liste os namespaces de cada página e **você** mantenha essa lista sincronizada ao mover componentes.

O custo cresce em dois eixos simultaneamente, páginas e idiomas:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Como destacam as [notas do benchmark](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md): "manter a segurança de tipos e saber com precisão qual namespace incluir em cada página é um pesadelo".

O Intlayer remove a instância global. O conteúdo é declarado ao lado do componente e o compilador resolve o grafo de dependências no momento do build:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

O `@intlayer/swc` / `@intlayer/babel` identifica qual componente importa qual dicionário, inclui apenas esses, apenas para o idioma ativo, e descarta o que não for utilizado. O padrão "scoped-dynamic" passa a ser o resultado natural do build, e não uma disciplina manual mantida pela equipe.

> Para reproduzir os números da linha `dynamic`, configure `dictionary.importMode: 'dynamic'` em `intlayer.config.ts`. Veja a [documentação de otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md).

## Experiência de desenvolvimento

### Configuração

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
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
};
```

Adiciona-se a isso um `I18nProvider` client-side que recria a instância com as mesmas configurações, `generateStaticParams` e uma lista de `namespaces` em cada página.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

</Tab>
</Tabs>

### Componente de cliente

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
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
import { useTranslation } from "react-i18next";

export const Counter = () => {
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
```

> A página que renderiza este componente precisa carregar o namespace `about`, e `t("counter.label")` é uma string simples a menos que você estenda `CustomTypeOptions`.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
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
  const { label, increment } = useIntlayer("counter");
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

`label` e `increment` são estritamente tipados; erros de digitação tornam-se erros de TypeScript e uma tradução ausente causa erro na compilação.

</Tab>
</Tabs>

### Componente de servidor síncrono

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

A página invoca `i18n.getFixedT(locale, "about")` e propaga `t` e `locale` via props.

</Tab>
<Tab label="Intlayer" value="intlayer">

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

</Tab>
</Tabs>

## Mantenha a API do i18next, aproveite o desempenho do Intlayer

Você não precisa reescrever componentes para obter os números do benchmark. `@intlayer/i18next`, `@intlayer/react-i18next` e `@intlayer/next-i18next` são adaptadores compatíveis: `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, plurais `_one` / `_other`, sufixos de contexto e `returnObjects` continuam operacionais, alimentados pelos dicionários compilados pelo Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

No benchmark, a versão adaptada da mesma aplicação Next.js caiu de **218.5 KB para 150.7 KB** por página, de **78.5 KB para 9.7 KB** por componente, de **~90% de vazamento para 0%**, e a hidratação passou de 15.6 ms para 11.3 ms, mantendo o código da aplicação intacto. Seus arquivos `locales/{lng}/{ns}.json` existentes podem continuar sendo a fonte da verdade via plugin de sincronização JSON.

Consulte os guias de migração: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-i18next_to_intlayer.md).

## Quando escolher cada um?

<AccordionGroup>
<Accordion header="Escolher o i18next">

Se você depende de seu ecossistema de plugins (detectores, backends, ICU, Locize), traduz também fora do React (serviços Node, vanilla JS, outros frameworks), seu time já possui domínio ou uma plataforma externa exige `locales/{lng}/{ns}.json`. Reserve tempo para separar catálogos em namespaces, conectar um backend e manter o mapa de rotas se a performance for prioritária.

</Accordion>
<Accordion header="Escolher o Intlayer">

Você valoriza **conteúdo no nível do componente**, **TypeScript estrito**, **erros em tempo de compilação para chaves ausentes**, **tree-shaking e lazy loading sem esforço**, troca instantânea de idioma, componentes de servidor síncronos e ferramentas editoriais integradas ([Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), [tradução por IA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md), [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)). Especialmente relevante para bases de código modulares e design systems.

</Accordion>
<Accordion header="Escolher os adaptadores @intlayer/*-i18next">

Você já está no i18next e quer os ganhos de bundle e reatividade sem reescrever seus componentes. Seus arquivos `locales/{lng}/{ns}.json` permanecem como a fonte da verdade. Medido lado a lado em [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18next_vs_intlayer-i18next.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Por que o i18next é muito mais pesado que outras bibliotecas?">

Ele foi projetado como um runtime agnóstico a frameworks: uma instância global, um pipeline de plugins, um repositório de recursos, um resolvedor de chaves. Essa flexibilidade é compilada em cada bundle. Um componente vazio que apenas importa a biblioteca custa **19.7 KB gzip** com `next-i18next` contra **5.5 KB** com `next-intlayer`, e esse custo é pago em todas as páginas, independentemente do peso do conteúdo.

</Question>

<Question title="O lazy loading com um backend resolve o problema?">

Ele resolve os bytes, não a latência. Mudar para `i18next-resources-to-backend` economiza ~49 KB por página, mas adiciona um ciclo de ida e volta na rede ao trocar de idioma: **123 ms** na configuração `dynamic` e **185 ms** em `scoped-static`, contra **3-4 ms** com o Intlayer. A hidratação também sobe para 27.7 ms porque a instância resolve o backend antes de o React poder hidratar.

</Question>

<Question title="Posso atingir 0% de vazamento com o i18next?">

Sim, com `scoped-dynamic`: um namespace por rota, um backend de recursos e um mapa de página para namespace mantido manualmente. Isso resulta em 163.4 KB por página no Next.js, ainda **+22 KB** sobre os 141.3 KB do Intlayer, que não precisou de nenhuma configuração. Veja a [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md).

</Question>

<Question title="Preciso reescrever meus componentes para migrar?">

Não. `@intlayer/i18next`, `@intlayer/react-i18next` e `@intlayer/next-i18next` mantêm `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, plurais `_one` / `_other`, sufixos de contexto e `returnObjects`. Apenas uma linha de plugin no `next.config.ts` ou `vite.config.ts`. Passo a passo no [guia de migração do next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-i18next_to_intlayer.md).

</Question>

<Question title="O que acontece com meus plugins do i18next?">

Backends e detectores de idioma são aceitos, mas ficam inertes: não há nada para carregar ou detectar em tempo de execução. A detecção de idioma passa a ser a configuração de roteamento do Intlayer (prefixo de URL, cookie, cabeçalho). Se seu aplicativo busca traduções de um CMS no momento da requisição, use o [CMS do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) ou `intlayer pull` / `push`.

</Question>

</FAQ>

## Comparações relacionadas

Mesmo benchmark, outras bibliotecas:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-intl_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/react-i18next_vs_react-intl_vs_intlayer.md)

Aprofundando no i18next:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18next_vs_intlayer-i18next.md), os adaptadores medidos na mesma aplicação
- [O i18next está desatualizado?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/is_i18next_outdated.md)
- [Usando o Intlayer com i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/intlayer_with_i18next.md) e [com react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/intlayer_with_react-i18next.md)
- [Como internacionalizar um app Next.js com next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_next-i18next.md)

Documentos de referência:

- [Relatório de benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md) e [relatório de benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md)
- Adaptadores de compatibilidade: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/next-i18next.md)
- Guias de migração: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-i18next_to_intlayer.md)
- [Otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e [o compilador Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md)
- [i18n por componente vs centralizada](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md)
- [i18n orientada a compilador vs declarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md)

## Estrelas no GitHub

As estrelas no GitHub são um indicador sólido da popularidade, confiança da comunidade e relevância de longo prazo de um projeto. Embora não meçam diretamente a qualidade técnica, refletem o engajamento dos desenvolvedores e o potencial de adoção.

[![Gráfico de histórico de estrelas](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Conclusão

O `i18next` conquistou sua posição de destaque: roda em qualquer lugar, conta com plugins para tudo e possui mais de dez anos de manutenção contínua. O benchmark demonstra o custo de um design centrado no runtime. A configuração padrão da maioria dos times adiciona **+70-77 KB gzip por página**, vaza **~90% do conteúdo de outras páginas** e leva **mais de 100 ms** para trocar de idioma com lazy loading. Chegar a 0% de vazamento é viável, mas requer backend, namespaces por rota e mapeamento manual, permanecendo ainda **+9-22 KB** acima do Intlayer.

O Intlayer transfere essa responsabilidade para o compilador. Dicionários por componente, lazy loading por idioma e eliminação de conteúdo inútil tornam-se saídas automáticas do build. Na mesma aplicação: **+0.3 KB por página**, **0% de vazamento**, componentes **3 a 10 vezes menores** e troca de idioma em **3-4 ms**.

Todos os dados brutos, aplicações de teste e scripts estão disponíveis no [repositório Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Execute e confira por conta própria.

Consulte a documentação ['Por que o Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) para obter mais detalhes.
