---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Otimizando o tamanho e desempenho do bundle i18n
description: Reduza o tamanho do bundle da sua aplicação otimizando o conteúdo de internacionalização (i18n). Aprenda a aproveitar o tree shaking e o lazy loading para dicionários com Intlayer.
keywords:
  - Otimização de bundle
  - Automação de conteúdo
  - Conteúdo dinâmico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "Adicionadas as opções `minify` e `purge` à configuração de build"
---

# Otimizando o tamanho e desempenho do bundle i18n

Um dos desafios mais comuns com as soluções i18n tradicionais que dependem de arquivos JSON é o gerenciamento do tamanho do conteúdo. Se os desenvolvedores não separarem manualmente o conteúdo em namespaces, os usuários muitas vezes acabam baixando traduções para cada página e potencialmente para cada idioma apenas para visualizar uma única página.

Por exemplo, uma aplicação com 10 páginas traduzidas em 10 idiomas pode resultar em um usuário baixando o conteúdo de 100 páginas, embora precise apenas de **uma** (a página atual no idioma atual). Isso leva a desperdício de largura de banda e tempos de carregamento mais lentos.

**O Intlayer resolve esse problema através da otimização em tempo de build.** Ele analisa seu código para detectar quais dicionários são realmente usados por componente e reinjeta apenas o conteúdo necessário no seu bundle.

## Índice

<TOC />

## Escaneie seu bundle

Analisar seu bundle é o primeiro passo para identificar arquivos JSON "pesados" e oportunidades de code-splitting. Essas ferramentas geram um mapa de árvore (treemap) visual do código compilado da sua aplicação, permitindo que você veja exatamente quais bibliotecas estão consumindo mais espaço.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

O Vite usa o Rollup por baixo do pano. O plugin `rollup-plugin-visualizer` gera um arquivo HTML interativo que mostra o tamanho de cada módulo no seu gráfico.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Abrir automaticamente o relatório no seu navegador
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Para projetos que usam o App Router e o Turbopack, o Next.js fornece um analisador experimental integrado que não requer dependências extras.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Se você estiver usando o bundler Webpack padrão no Next.js, use o analisador de bundle oficial. Ative-o definindo uma variável de ambiente durante o build.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Sua configuração do Next.js
});
```

**Uso:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Webpack Padrão

Para o Create React App (ejected), Angular ou configurações personalizadas do Webpack, use o padrão da indústria `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Como Funciona

O Intlayer usa uma **abordagem por componente**. Ao contrário dos arquivos JSON globais, seu conteúdo é definido ao lado ou dentro de seus componentes. Durante o processo de build, o Intlayer:

1.  **Analisa** seu código para encontrar chamadas `useIntlayer`.
2.  **Gera** o conteúdo do dicionário correspondente.
3.  **Substitui** a chamada `useIntlayer` por código otimizado com base na sua configuração.

Isso garante que:

- Se um componente não for importado, seu conteúdo não será incluído no bundle (Dead Code Elimination).
- Se um componente for carregado via lazy-loading, seu conteúdo também será carregado dessa forma.

## Configuração por Plataforma

<Tabs>
 <Tab value="nextjs">

### Next.js

O Next.js requer o plugin `@intlayer/swc` para lidar com a transformação, já que o Next.js usa SWC para builds.

> Este plugin não é instalado por padrão porque os plugins SWC ainda são experimentais para o Next.js. Isso pode mudar no futuro.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Uma vez instalado, o Intlayer detectará e usará automaticamente o plugin.

 </Tab>
 <Tab value="vite">

### Vite

O Vite usa o plugin `@intlayer/babel`, que está incluído como dependência do `vite-intlayer`. A otimização é habilitada por padrão. Nada mais precisa ser feito.

 </Tab>
 <Tab value="webpack">

### Webpack

Para habilitar a otimização de bundle com Intlayer no Webpack, você precisa instalar e configurar o plugin Babel (`@intlayer/babel`) ou SWC (`@intlayer/swc`) apropriado.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Configuração

Você pode controlar como o Intlayer otimiza seu bundle através da propriedade `build` no seu `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Minificar os dicionários para reduzir o tamanho do bundle.
     */
     minify: true;

    /**
     * Remover (purge) as chaves não utilizadas nos dicionários
     */
     purge: true;

    /**
     * Indica se o build deve verificar tipos TypeScript
     */
    checkTypes: false;
  },
};

export default config;
```

> Manter a opção padrão para `optimize` é recomendado na grande maioria dos casos.

> Veja a doc de configuração para mais detalhes: [Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

### Opções de Build

As seguintes opções estão disponíveis sob o objeto de configuração `build`:

| Propriedade    | Tipo      | Padrão      | Descrição                                                                                                                                                                                                               |
| :------------- | :-------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | Controla se a otimização de build está habilitada. Se `true`, o Intlayer substitui as chamadas de dicionário por injeções otimizadas. Se `false`, a otimização é desabilitada. Idealmente definido como `true` em prod. |
| **`minify`**   | `boolean` | `false`     | Se deve minificar os dicionários para reduzir o tamanho do bundle.                                                                                                                                                      |
| **`purge`**    | `boolean` | `false`     | Se deve remover as chaves não utilizadas nos dicionários.                                                                                                                                                               |

### Minificação

Minificar dicionários remove espaços em branco desnecessários, comentários e reduz o tamanho do conteúdo JSON. Isso é especialmente útil para dicionários grandes.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Nota: A minificação é ignorada se `optimize` estiver desabilitado ou se o Visual Editor estiver habilitado (pois o editor precisa do conteúdo completo para permitir a edição).

### Purging (Remoção)

O purging garante que apenas as chaves realmente usadas no seu código sejam incluídas no bundle final de dicionários. Isso pode reduzir significativamente o tamanho do seu bundle se você tiver dicionários grandes com muitas chaves que não são usadas em todas as partes da sua aplicação.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Nota: O purging é ignorado se `optimize` estiver desabilitado.

### Modo de Importação

Para grandes aplicações, incluindo várias páginas e locais, seus arquivos JSON podem representar uma parte significativa do tamanho do seu bundle. O Intlayer permite que você controle como os dicionários são carregados.

O modo de importação pode ser definido por padrão globalmente no seu arquivo `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Assim como para cada dicionário nos seus arquivos `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Sobrescrever o modo de importação padrão
  content: {
    // ...
  },
};

export default appContent;
```

| Propriedade      | Tipo                               | Padrão     | Descrição                                                                                                                   |
| :--------------- | :--------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Obsoleto**: Use `dictionary.importMode` em seu lugar. Determina como os dicionários são carregados (ver detalhes abaixo). |

A configuração `importMode` dita como o conteúdo do dicionário é injetado no seu componente.
Você pode defini-lo globalmente no arquivo `intlayer.config.ts` sob o objeto `dictionary`, ou pode sobrescrevê-lo para um dicionário específico em seu arquivo `.content.ts`.

### 1. Modo Estático (`default`)

No modo estático, o Intlayer substitui `useIntlayer` por `useDictionary` e injeta o dicionário diretamente no bundle JavaScript.

- **Prós:** Renderização instantânea (síncrona), zero solicitações de rede extras durante a hidratação.
- **Contras:** O bundle inclui traduções para **todos** os idiomas disponíveis para aquele componente específico.
- **Ideal para:** Single Page Applications (SPA).

**Exemplo de código transformado:**

```tsx
// Seu código
const content = useIntlayer("my-key");

// Código otimizado (Estático)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Modo Dinâmico

No modo dinâmico, o Intlayer substitui `useIntlayer` por `useDictionaryAsync`. Isso usa `import()` (mecanismo semelhante ao Suspense) para carregar de forma assíncrona (lazy-load) especificamente o JSON para o local atual.

- **Prós:** **Tree shaking a nível de local.** Um usuário visualizando a versão em inglês baixará _apenas_ o dicionário em inglês. O dicionário em francês nunca é carregado.
- **Contras:** Dispara uma solicitação de rede (busca de asset) por componente durante a hidratação.
- **Ideal para:** Grandes blocos de texto, artigos ou aplicações que suportam muitos idiomas onde o tamanho do bundle é crítico.

**Exemplo de código transformado:**

```tsx
// Seu código
const content = useIntlayer("my-key");

// Código otimizado (Dinâmico)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> Ao usar `importMode: 'dynamic'`, se você tiver 100 componentes usando `useIntlayer` em uma única página, o navegador tentará 100 buscas separadas. Para evitar essa "cascata" de solicitações, agrupe o conteúdo em menos arquivos `.content` (ex: um dicionário por seção da página) em vez de um por componente átomo.

### 3. Modo Fetch

Comporta-se de forma semelhante ao modo Dinâmico, mas tenta buscar dicionários da API Intlayer Live Sync primeiro. Se a chamada da API falhar ou o conteúdo não estiver marcado para atualizações ao vivo, ele recorre à importação dinâmica.

> Consulte a documentação do CMS para mais detalhes: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)

> No modo fetch, purge e minificação não podem ser usados.

## Resumo: Estático vs Dinâmico

| Recurso               | Modo Estático                                     | Modo Dinâmico                           |
| :-------------------- | :------------------------------------------------ | :-------------------------------------- |
| **Tamanho Bundle JS** | Maior (inclui todos os idiomas para o componente) | Menor (apenas código, sem conteúdo)     |
| **Carga Inicial**     | Instantânea (O conteúdo está no bundle)           | Pequeno atraso (Busca o JSON)           |
| **Solicitações Rede** | 0 solicitações extras                             | 1 solicitação por dicionário            |
| **Tree Shaking**      | Nível de componente                               | Nível de componente + Nível de local    |
| **Melhor Caso Uso**   | Componentes de UI, pequenas aplicações            | Páginas com muito texto, muitos idiomas |
