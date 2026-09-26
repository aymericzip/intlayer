---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "Lingui vs Intlayer: Benchmark e Comparativo 2026"
description: "Duas bibliotecas de i18n baseadas em compilador avaliadas no Next.js e TanStack Start. Tamanho do bundle, vazamento de conteúdo, tamanho dos componentes, hidratação, reatividade na troca de idioma e experiência do desenvolvedor."
keywords:
  - Lingui
  - Intlayer
  - Internacionalização
  - i18n
  - Benchmark
  - Tamanho de bundle
  - Compilador
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | Benchmark de Internacionalização (i18n) para React e Next.js

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Lingui e Intlayer são as duas bibliotecas deste benchmark que utilizam um **compilador** em vez de operarem estritamente como um runtime. O Lingui extrai mensagens a partir de macros durante o build e compila catálogos por idioma. O Intlayer compila dicionários por componente e aplica tree-shaking por idioma. Na teoria, deveriam ser muito parecidos. Os números revelam onde eles se distanciam.

Os dados são provenientes do [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), uma suíte de código aberto que constrói a mesma aplicação com cada biblioteca e afere o que o navegador efetivamente baixa e executa.

<TOC/>

> **tl;dr**: O Lingui é a biblioteca mais próxima do Intlayer em volume bruto de JavaScript por página: **115-120 KB** contra **118,6 KB** no TanStack Start após a configuração de lazy loading, e **148,6 KB** contra **141,3 KB** no Next.js. A diferença real surge nos demais indicadores: um componente do Lingui compilado isoladamente pesa **58-153 KB** contra **6-8 KB** no Intlayer, a hidratação leva **28-34 ms** contra **11-14 ms**, o fallback do idioma original vaza entre **3% e 15%** de textos em inglês nas páginas em francês em qualquer configuração otimizada, e atingir essa otimização requer extrair, compilar e selecionar catálogos manualmente por rota. O Intlayer alcança esses números sem qualquer configuração complexa.

## Em resumo

- **Lingui** - Baseado em macros (`` t`...` ``, `<Trans>`, `msg`), formato ICU MessageFormat, catálogos em `.po` / JSON, fluxo de trabalho `lingui extract` + `lingui compile`. Compila IDs de mensagem em hashes compactos, suporta carregamento dinâmico de catálogos por idioma. Consolidado, agnóstico de framework e com excelente ecossistema de ferramentas de tradução em torno do formato `.po`.
- **Intlayer** - Modelo de conteúdo orientado a componentes. Dicionários `.content.ts` residem ao lado do componente ao qual atendem; um compilador de build realiza tree-shaking e carregamento sob demanda por componente e por idioma; tipos TypeScript rigorosos são gerados automaticamente a partir do conteúdo, e traduções ausentes geram erro de compilação. Inclui middleware, utilitários de SEO, um Editor Visual / CMS e tradução assistida por IA.

| Biblioteca            | Estrelas no GitHub                                                                                                                                                             | Commits Totais                                                                                                                                                                     | Último Commit                                                                                                                                       | Primeira Versão | Versão NPM                                                                                                          | Downloads no NPM                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Abril 2024      | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Dezembro 2016   | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Os badges são atualizados de forma automática. Instantâneos podem mudar ao longo do tempo.

## Comparação funcional lado a lado

| Recurso                                          | Intlayer (`react-intlayer` / `next-intlayer`)                                             | Lingui (`@lingui/core` / `@lingui/react`)                                                    |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Traduções próximas aos componentes**           | ✅ Sim, `.content.ts` colocalizado com cada componente                                    | ⚠️ Strings originais no JSX via macros; traduções em catálogos `.po` centralizados           |
| **Integração com TypeScript**                    | ✅ Tipos estritos gerados automaticamente a partir do conteúdo                            | ⚠️ Macros tipadas; IDs de mensagem sem tipos, chaves ausentes não são apontadas              |
| **Detecção de traduções ausentes**               | ✅ Erro no TypeScript + erro/aviso no build                                               | ⚠️ `lingui extract` exibe estatísticas; no runtime recorre silenciosamente ao texto original |
| **Conteúdo rico (JSX / Markdown / componentes)** | ✅ Suporte nativo e direto                                                                | ✅ Elemento `<Trans>` com componentes aninhados                                              |
| **Suporte a ICU**                                | ⚠️ Em andamento                                                                           | ✅ Sim (macros `plural`, `select`, `selectOrdinal`)                                          |
| **Formatação (datas, números, moedas)**          | ✅ `useNumber`, `useDate`, ... (suportado por `Intl`)                                     | ✅ `i18n.date()`, `i18n.number()`                                                            |
| **Roteamento localizado e middleware**           | ✅ Proxy e middleware integrados, utilitário `getMultilingualUrls`                        | ❌ Não faz parte do núcleo                                                                   |
| **Auxiliares de SEO (hreflang, sitemap...)**     | ✅ Utilitários prontos para uso                                                           | ❌ Configuração manual                                                                       |
| **Componentes de servidor síncronos (RSC)**      | ✅ `useIntlayer` de `next-intlayer/server` funciona em qualquer subcomponente de servidor | ⚠️ Exige uma instância `I18n` por requisição, repassada manualmente ou via `setI18n`         |
| **Tree-shaking (entregar só o que for usado)**   | ✅ Por componente e por idioma, automatizado pelo compilador                              | ⚠️ Por idioma via `lingui compile`; por rota exige divisão manual de catálogos               |
| **Carregamento sob demanda (Lazy loading)**      | ✅ `importMode: 'dynamic'` (uma única linha de configuração)                              | ⚠️ Uso manual de `import()` de catálogos + `i18n.load()` / `i18n.activate()`                 |
| **Limpeza de conteúdo não utilizado**            | ✅ Dicionários órfãos são descartados no build                                            | ✅ `lingui extract --clean` remove mensagens obsoletas                                       |
| **Testar traduções ausentes (CLI / CI)**         | ✅ `npx intlayer content test`                                                            | ⚠️ Estatísticas de `lingui extract` (sem código de falha por padrão)                         |
| **Pipeline de compilação**                       | ✅ Um único plugin (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)                | ⚠️ Plugin de macro (Babel ou SWC) + etapas `extract` + `compile`                             |
| **Tradução assistida por IA**                    | ✅ Integrada, utiliza suas próprias chaves de API                                         | ❌ Não                                                                                       |
| **Editor Visual / CMS**                          | ✅ Editor Visual gratuito + CMS opcional                                                  | ❌ Não (`.po` integra com ferramentas TMS externas)                                          |
| **Servidor MCP e Agent Skills**                  | ✅ Sim                                                                                    | ❌ Não                                                                                       |
| **Ecossistema e comunidade**                     | ⚠️ Mais recente, porém em expansão acelerada                                              | ✅ Etabelecido, agnóstico de framework                                                       |

## O benchmark

### O que foi medido

A suíte [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compila **a mesma aplicação** com cada biblioteca: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 idiomas** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idênticos e conteúdo idêntico. As páginas são avaliadas em `en` e `fr`. Cada biblioteca foi avaliada em até quatro **estratégias de carregamento**:

| Estratégia         | Descrição                                                                                  | Cenário de aplicação comum           |
| ------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------ |
| **static**         | Todos os catálogos compilados são importados e carregados no início                        | Protótipos rápidos, código de IA     |
| **dynamic**        | Apenas o catálogo do idioma ativo é importado via `import()`, mas engloba todas as páginas | Maioria dos projetos cotidianos      |
| **scoped-static**  | Um catálogo por rota, todos embutidos no pacote inicial                                    | Raro                                 |
| **scoped-dynamic** | Um catálogo por rota + `import()` dinâmico. Apenas a página atual e o idioma ativo         | Apps com orçamento rigoroso de bytes |

O Intlayer não tem variante "scoped" isolada: o compilador delimita o escopo de conteúdo **por componente** automaticamente, logo suas linhas `static` e `dynamic` já nascem perfeitamente segmentadas.

Para cada compilação, registram-se:

- **Lib size**: tamanho gzip de um componente vazio que importa unicamente a biblioteca de i18n (o custo fixo do runtime).
- **Page JS**: média de JavaScript gzip baixado por página, calculada sobre todas as páginas e idiomas.
- **Locale leak %**: proporção de strings traduzidas no JS baixado pertencentes a idiomas que o usuário **não** está visualizando.
- **Page leak %**: proporção de strings traduzidas no JS baixado pertencentes a páginas onde o usuário **não** está navegando.
- **Component avg**: tamanho gzip médio de cada componente compilado de forma isolada.
- **E2E reactivity**: intervalo de tempo real entre selecionar um novo idioma e o DOM atualizar a tag `html[lang]` (Playwright, 5 iterações).
- **Hydration**: duração da fase de hidratação do React.

> Os dados abaixo referem-se ao teste de **2026-09-12** com `@lingui/react` 6.6.0 e `intlayer` 9.5.1. A aplicação de testes é enxuta por design (poucas dezenas de strings por idioma), portanto os índices de vazamento expressam um **padrão estrutural** que se amplifica com o volume de dados.

### Resultados no Next.js

Escolha as métricas e bibliotecas do seu interesse:

<I18nBenchmark framework="nextjs" vertical/>

| Biblioteca          | Estratégia     | Lib size (gz) | Page JS méd (gz) | Vazamento idioma | Vazamento página | Componente méd (gz) | Reatividade E2E | Hidratação |
| ------------------- | -------------- | ------------: | ---------------: | ---------------: | ---------------: | ------------------: | --------------: | ---------: |
| **base** (sem i18n) | -              |        0,0 KB |         141,0 KB |             0,0% |             0,0% |              0,9 KB |         13,4 ms |    11,8 ms |
| Lingui              | static         |       11,9 KB |         207,4 KB |            50,0% |            90,0% |             73,3 KB |         15,3 ms |    15,2 ms |
| Lingui              | dynamic        |       11,9 KB |         145,4 KB |             2,8% |            89,9% |             19,9 KB |         15,7 ms |    12,7 ms |
| Lingui              | scoped-static  |       11,9 KB |         148,2 KB |             2,7% |            89,1% |             20,4 KB |         15,1 ms |    13,1 ms |
| Lingui              | scoped-dynamic |       11,9 KB |         148,6 KB |            14,8% |             0,0% |            152,6 KB |         16,1 ms |    14,8 ms |
| **`next-intlayer`** | static         |    **5,5 KB** |     **141,3 KB** |         **0,0%** |         **0,0%** |          **8,5 KB** |     **15,5 ms** |    16,9 ms |
| **`next-intlayer`** | dynamic        |    **5,5 KB** |     **141,3 KB** |         **0,0%** |         **0,0%** |          **6,9 KB** |     **15,3 ms** |    15,9 ms |

**Análise dos números**

- **Custo do runtime.** Um componente vazio pesa 11,9 KB gzip no Lingui contra 5,5 KB no Intlayer. Na página completa, o melhor arranjo do Lingui fica em **+7,3 KB** em relação ao Intlayer (148,6 contra 141,3 KB); o Intlayer situa-se em modestos **+0,3 KB** acima da aplicação base sem i18n.
- **A abordagem ingênua tem custo elevado.** Carregar todos os catálogos compilados no início resulta em **207,4 KB por página**, +66 KB sobre o app base. Metade das strings pertence ao idioma errado e 90% a páginas não visualizadas.
- **Carregamento dinâmico ajusta o idioma, mas não a página.** Com um catálogo por idioma, o vazamento de página permanece em ~90%: o catálogo completo de francês é entregue em cada página em francês. Para alcançar 0% de vazamento de página no Lingui é necessário recorrer a `scoped-dynamic`: um catálogo por rota, extraído e compilado individualmente, importado manualmente em cada página.
- **O fallback do idioma de origem vaza por construção.** Mesmo nas configurações mais bem planejadas, **entre 3% e 15% das strings em inglês são enviadas nas páginas em francês**. As macros do Lingui guardam o texto fonte como salvaguarda, de modo que ele aterrissa no bundle. O Intlayer resolve fallbacks no build e entrega exclusivamente o idioma ativo.
- **O tamanho dos componentes isolados dispara em `scoped-dynamic`.** Cada componente compilado isoladamente projeta uma média de **152,6 KB**, pois os catálogos das rotas permanecem alcançáveis pelos imports. O mesmo componente usando `useIntlayer()` registra uma média de **6,9 KB**.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabela completa, cada biblioteca e cada estratégia, no [relatório de benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md).

### Resultados no TanStack Start

| Biblioteca                  | Estratégia     | Lib size (gz) | Page JS méd (gz) | Vazamento idioma | Vazamento página | Componente méd (gz) | Reatividade E2E | Hidratação |
| --------------------------- | -------------- | ------------: | ---------------: | ---------------: | ---------------: | ------------------: | --------------: | ---------: |
| **base** (sem i18n)         | -              |        0,0 KB |         111,0 KB |             0,0% |             0,0% |              0,7 KB |          8,1 ms |    21,6 ms |
| Lingui                      | static         |       11,2 KB |         152,2 KB |            50,0% |            90,0% |             58,0 KB |          3,9 ms |    19,9 ms |
| Lingui                      | dynamic        |       11,2 KB |         115,2 KB |             9,3% |             0,0% |             85,5 KB |          5,9 ms |    28,0 ms |
| Lingui                      | scoped-static  |       11,2 KB |         120,8 KB |             4,0% |             0,0% |            147,9 KB |          7,1 ms |    33,9 ms |
| Lingui                      | scoped-dynamic |       11,2 KB |         120,2 KB |             8,6% |             0,0% |             83,7 KB |         42,1 ms |    32,9 ms |
| **`intlayer`**              | static         |    **5,0 KB** |     **125,8 KB** |            50,0% |         **0,0%** |          **8,1 KB** |      **3,2 ms** |    11,5 ms |
| **`intlayer`**              | dynamic        |    **5,0 KB** |     **118,6 KB** |         **0,0%** |         **0,0%** |          **6,3 KB** |      **3,6 ms** |    14,1 ms |
| `@intlayer/lingui` (compat) | dynamic        |       10,3 KB |         137,0 KB |             9,9% |             0,0% |             12,8 KB |          2,9 ms |    19,7 ms |

**Análise dos números**

- **No volume de JavaScript por página, o Lingui vence por margem mínima.** O Lingui em modo `dynamic` atinge **115,2 KB**, apenas 3,4 KB abaixo dos 118,6 KB do Intlayer. Seus catálogos compilados com hashes são extremamente densos, e o roteador do TanStack Start particiona as rotas tão bem que o vazamento de página é nulo logo na linha `dynamic`.
- **Todos os outros índices favorecem o Intlayer.** A hidratação toma **28-34 ms** no Lingui contra **11-14 ms** no Intlayer: `i18n.load()` + `i18n.activate()` rodam no cliente antes que o React possa hidratar. Os componentes isolados pesam **58-148 KB** em vez de **6-8 KB**. O vazamento de idioma nunca zera (fica entre 4% e 9%) por causa do fallback inglês.
- **A troca de idioma fica sensivelmente lenta no modo otimizado.** O Lingui em `scoped-dynamic` demanda **42 ms** para refletir a nova língua no `html[lang]`, já que o novo catálogo precisa ser baixado, inserido e ativado antes da renderização visual. O Intlayer alterna em **3-4 ms** em qualquer modo.
- **A linha `static` do Intlayer já apresenta 0% de vazamento de página**, pois inclui unicamente os dicionários consumidos pelos componentes daquela tela. Uma única linha de configuração (`importMode: 'dynamic'`) extingue igualmente o vazamento de idioma.
- **`@intlayer/lingui`** mantém a sintaxe das macros do Lingui consumindo dicionários do Intlayer. Ele cede um pouco no tamanho final da página (137 KB, devido à presença do runtime de macros) em troca de componentes muito mais leves (12,8 KB) e hidratação mais ágil. Uma excelente rota de transição.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabela completa no [relatório de benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md).

## Qual é a origem desse contraste? Dois compiladores, duas unidades de trabalho

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Ambas as soluções utilizam um compilador. O divisor de águas é **o que** elas compilam.

**O Lingui compila catálogos.** As macros espalhadas pelo seu código são recolhidas em um arquivo `.po` por idioma e compiladas em um módulo JS por idioma. A unidade central é o **idioma**. Dividir além disso, por rota ou por componente, pressupõe criar catálogos adicionais, configurar o `lingui.config.ts` para extrair cada pedaço separadamente e administrar o carregamento manualmente. A instância `I18n` é global; cada `useLingui()` subscreve o componente a ela.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # saída de lingui compile
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**O Intlayer compila dicionários.** Cada arquivo `.content.ts` é um dicionário atrelado a uma chave; o compilador identifica qual componente requisita qual chave e gera, por dicionário e por idioma, rigorosamente o JSON que aquele componente precisa. A unidade central é o **componente**. O escopo por rotas é uma consequência natural: uma tela apenas baixa os dicionários dos componentes que efetivamente renderiza.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

É por essa razão que o padrão `scoped-dynamic` é uma entrega nativa e automática do Intlayer, enquanto no Lingui constitui um projeto próprio de engenharia de configuração. O abismo aumenta em dois eixos ao mesmo tempo, páginas e idiomas:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> Para reproduzir as marcas da linha `dynamic`, defina `dictionary.importMode: 'dynamic'` no seu `intlayer.config.ts`. Acesse a [documentação sobre otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md).

## Experiência do desenvolvedor

### Configuração

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Depois é necessário incluir `@lingui/babel-plugin-lingui-macro` (ou `@lingui/swc-plugin`) ao bundler, rodar `lingui extract` após alterar textos, rodar `lingui compile` antes do build e encapsular a aplicação em `<I18nProvider i18n={i18n}>`.

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

Basta adicionar `intlayer()` ao seu `vite.config.ts` (ou `withIntlayer()` no `next.config.ts`) e envolver a árvore de renderização com `<IntlayerProvider>`. Sem etapas de extração ou compilação manuais: os dicionários são montados diretamente quando o empacotador roda.

</Tab>
</Tabs>
### Componente

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

O texto em inglês vive no próprio componente; a tradução em francês fica em `src/locales/fr/messages.po` sob um ID em hash após a execução de `lingui extract`. Esquecer de extrair ou compilar aciona silenciosamente a string em inglês como fallback.

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
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

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

Ambos os idiomas coexistem no mesmo arquivo ao lado do componente. Um valor de `fr` em falta gera erro no build; uma chave digitada de forma errada aciona o verificador de tipos do TypeScript na hora.

</Tab>
</Tabs>
### Fora dos componentes

Metadados, funções de carregamento (loaders), funções de servidor: em qualquer ponto fora da árvore do React.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

Gera-se uma nova instância `I18n` por execução, faz-se a importação manual do catálogo específico e emprega-se `msg` + `i18n._()` em vez de `t`. Conforme registrado nas [notas do benchmark](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md), saber a hora exata de recorrer a `t`, `` t` ` ``, `i18n.t()`, `msg` ou `<Trans>` é reconhecidamente confuso.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

</Tab>
</Tabs>

## Mantenha as macros do Lingui, adote dicionários do Intlayer

O `@intlayer/lingui` atua como um adaptador compatível para `@lingui/core` e `@lingui/react`. As macros continuam compilando normalmente; as chamadas resultantes para `i18n._()` passam a ser atendidas pelos dicionários do Intlayer, enquanto os plugins de sincronização `.po` sustentam seus catálogos originais como fonte da verdade. Plurais e condicionais ICU comportam-se com paridade absoluta.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Mantenha `@lingui/babel-plugin-lingui-macro` ou `@lingui/swc-plugin` no processo de build, executando antes do compilador do Intlayer. Verifique a [documentação de compatibilidade com Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md).

## Qual ferramenta escolher?

<AccordionGroup>
<Accordion header="Escolha o Lingui">

Você quer **ICU MessageFormat** com macros tipadas, seus tradutores trabalham em **`.po`** com um pipeline TMS existente, prefere strings de origem inline em JSX e sua equipe gerencia confortavelmente o fluxo de extração / compilação / divisão de catálogos. Seu JS por página é competitivo uma vez configurado o lazy loading.

</Accordion>
<Accordion header="Escolha o Intlayer">

Você quer **conteúdo com escopo por componente**, **TypeScript rigoroso**, **erros de chaves ausentes em tempo de build**, **tree-shaking e lazy loading sem esforço**, componentes leves, hidratação rápida, troca instantânea de idioma e ferramentas editoriais integradas ([Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), [tradução por IA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md), [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)). Especialmente relevante para bases de código modulares grandes e sistemas de design.

</Accordion>
<Accordion header="Escolha o @intlayer/lingui">

Você já está no Lingui e quer migrar para os dicionários Intlayer gradualmente sem tocar nas macros. Seus catálogos `.po` permanecem a fonte da verdade através do [plugin de sincronização PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md). Medido lado a lado em [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer-lingui.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="O Lingui também compila. Por que o resultado é tão diferente?">

Porque a unidade de compilação difere. O Lingui compila **um catálogo por idioma**: tudo abaixo disso (catálogos por rota, lazy loading, exclusão do fallback do bundle) depende de configuração. O Intlayer compila **um dicionário por componente**, de modo que a divisão por rotas é resultado direto do build. É por isso que um componente Lingui compilado isoladamente pesa 58-153 KB contra 6-8 KB no Intlayer.

</Question>

<Question title="Por que o vazamento de idioma nunca chega a 0% com o Lingui?">

As macros mantêm a mensagem de origem disponível como fallback em tempo de execução, então a string em inglês é enviada junto com a tradução. O benchmark mede **3-15% de strings `en` dentro de páginas `fr`** em cada configuração otimizada. O Intlayer resolve fallbacks no build e envia apenas o idioma ativo.

</Question>

<Question title="O JavaScript por página do Lingui é realmente competitivo?">

Sim, e no TanStack Start vence por muito pouco: 115.2 KB no modo `dynamic` contra 118.6 KB do Intlayer. Catálogos compilados com IDs hasheados são compactos. O custo aparece em outros pontos: hidratação em 28-34 ms contra 11-14 ms, e uma troca de idioma de **42 ms** na configuração `scoped-dynamic`.

</Question>

<Question title="Preciso abrir mão das macros para migrar?">

Não. O `@intlayer/lingui` mantém a compilação de `` t`...` ``, `<Trans>`, `msg`, `plural`, `select` e `selectOrdinal` como antes; apenas a resolução de `i18n._()` muda. Mantenha `@lingui/babel-plugin-lingui-macro` ou `@lingui/swc-plugin` no build. Veja a [documentação de compatibilidade do Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md).

</Question>

<Question title="E quanto às etapas de extração e compilação?">

Elas continuam para as macros e desaparecem para o conteúdo nativo do Intlayer. Dicionários `.content.ts` são gerados na execução do bundler, sem etapa separada de CLI, e [`intlayer test`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) falha no CI em caso de chave ausente em vez de usar silenciosamente a string de origem.

</Question>

</FAQ>

## Comparações correlatas

Mesmo benchmark, outras bibliotecas:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-intl_vs_intlayer.md)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18next_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/react-i18next_vs_react-intl_vs_intlayer.md)

Indo além:

- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer-lingui.md), o adaptador medido na mesma aplicação
- [Compiler-driven vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md)
- [ICU message format explained](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)

Documentação de referência:

- [Relatório de benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md) e [relatório de benchmark do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md)
- [Compat adapter: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md)
- [Otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e [o compilador Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md)

## Estrelas no GitHub

As estrelas no GitHub expressam a aprovação do público, a confiança técnica da comunidade e a sustentabilidade de uma iniciativa a longo prazo. Embora não sejam um aferidor estrito de qualidade de código, revelam o volume de desenvolvedores que confiam na solução.

[![Histórico de estrelas](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Conclusão

O Lingui desponta como a biblioteca híbrida de runtime e compilador mais robusta deste teste comparativo. Seus catálogos compactados com chaves hasheadas proporcionam uma contagem de JavaScript por página a escassos kilobytes do Intlayer, chegando a superá-lo por fração mínima no TanStack Start. Se o peso total por página fosse a única meta, teríamos um empate prático.

Contudo, não é. O compilador do Lingui encerra sua atuação no limite do idioma; qualquer subdivisão abaixo disso (catálogos por rota, carregamento sob demanda, supressão de textos de fallback) é responsabilidade manual do desenvolvedor. O benchmark explicita o custo dessa barreira: componentes **10 a 20 vezes maiores**, hidratação **2 a 3 vezes mais lenta**, **3-15% de vazamento perpétuo de textos de fallback** e um atraso de **42 ms** ao alternar idiomas no modo otimizado. O compilador do Intlayer atua no nível atômico do componente: essas marcas caem por padrão para **6-8 KB**, **11-14 ms**, **0%** e **3-4 ms**, sem qualquer esforço de configuração.

A totalidade dos dados brutos, dos projetos de teste e dos scripts analíticos está aberta no [repositório Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Fique à vontade para executar as medições em sua máquina.

Consulte a documentação ['Por que o Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) para aprofundar seu conhecimento.
