---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: Otimizando o Tamanho e Desempenho do Bundle i18n
description: Reduza o tamanho do bundle da aplicação otimizando o conteúdo de internacionalização (i18n). Aprenda a aproveitar tree shaking e lazy loading para dicionários com Intlayer.
keywords:
  - Otimização de Bundle
  - Automação de Conteúdo
  - Conteúdo Dinâmico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 6.0.0
    date: 2025-11-25
    changes: Histórico inicial
---

# Otimizando o Tamanho e Desempenho do Bundle i18n

Um dos desafios mais comuns com soluções tradicionais de i18n que dependem de arquivos JSON é gerenciar o tamanho do conteúdo. Se os desenvolvedores não separarem manualmente o conteúdo em namespaces, os usuários frequentemente acabam baixando traduções para todas as páginas e potencialmente para todos os idiomas apenas para visualizar uma única página.

Por exemplo, uma aplicação com 10 páginas traduzidas em 10 idiomas pode resultar em um usuário baixando o conteúdo de 100 páginas, mesmo que ele precise de **apenas uma** (a página atual no idioma atual). Isso leva a desperdício de largura de banda e tempos de carregamento mais lentos.

> Para detectar isso, você pode usar analisadores de bundle como `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js) ou `webpack-bundle-analyzer` (React CRA / Angular / etc).

**Intlayer resolve esse problema por meio da otimização em tempo de build.** Ele analisa seu código para detectar quais dicionários são realmente usados por componente e reinjeta apenas o conteúdo necessário no seu bundle.

## Índice

<TOC />

## Como Funciona

Intlayer utiliza uma **abordagem por componente**. Diferente dos arquivos JSON globais, seu conteúdo é definido junto ou dentro dos seus componentes. Durante o processo de build, o Intlayer:

1.  **Analisa** seu código para encontrar chamadas de `useIntlayer`.
2.  **Constrói** o conteúdo do dicionário correspondente.
3.  **Substitui** a chamada `useIntlayer` por código otimizado baseado na sua configuração.

Isso garante que:

- Se um componente não for importado, seu conteúdo não será incluído no bundle (Eliminação de Código Morto).
- Se um componente for carregado de forma lazy, seu conteúdo também será carregado de forma lazy.

## Configuração por Plataforma

### Next.js

Next.js requer o plugin `@intlayer/swc` para lidar com a transformação, pois o Next.js utiliza SWC para builds.

> Este plugin é instalado por padrão porque plugins SWC ainda são experimentais para Next.js. Isso pode mudar no futuro.

### Vite

O Vite utiliza o plugin `@intlayer/babel`, que está incluído como dependência do `vite-intlayer`. A otimização está habilitada por padrão.

### Webpack

Para habilitar a otimização do bundle com Intlayer no Webpack, você precisa instalar e configurar o plugin Babel (`@intlayer/babel`) ou SWC (`@intlayer/swc`) apropriado.

### Expo / Lynx

A otimização do bundle **ainda não está disponível** para esta plataforma. O suporte será adicionado em uma versão futura.

## Configuração

Você pode controlar como o Intlayer otimiza seu bundle através da propriedade `build` no seu arquivo `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // ou 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> Manter a opção padrão para `optimize` é recomendado na maioria dos casos.

> Veja a documentação de configuração para mais detalhes: [Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

### Opções de Build

As seguintes opções estão disponíveis no objeto de configuração `build`:

| Propriedade           | Tipo                            | Padrão                          | Descrição                                                                                                                                                                                                                 |
| :-------------------- | :------------------------------ | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`**        | `boolean`                       | `undefined`                     | Controla se a otimização da build está habilitada. Se `true`, o Intlayer substitui chamadas ao dicionário por injeções otimizadas. Se `false`, a otimização é desativada. Idealmente configurado como `true` em produção. |
| **`importMode`**      | `'static' , 'dynamic' , 'live'` | `'static'`                      | Determina como os dicionários são carregados (veja detalhes abaixo).                                                                                                                                                      |
| **`traversePattern`** | `string[]`                      | `['**/*.{js,ts,jsx,tsx}', ...]` | Padrões glob que definem quais arquivos o Intlayer deve escanear para otimização. Use isso para excluir arquivos não relacionados e acelerar as builds.                                                                   |
| **`outputFormat`**    | `'esm', 'cjs'`                  | `'esm', 'cjs'`                  | Controla o formato de saída dos dicionários construídos.                                                                                                                                                                  |

## Modos de Importação

A configuração `importMode` determina como o conteúdo do dicionário é injetado no seu componente.

### 1. Modo Estático (`default`)

No modo estático, o Intlayer substitui `useIntlayer` por `useDictionary` e injeta o dicionário diretamente no bundle JavaScript.

- **Prós:** Renderização instantânea (síncrona), zero requisições de rede adicionais durante a hidratação.
- **Contras:** O bundle inclui traduções para **todas** as línguas disponíveis para aquele componente específico.
- **Ideal para:** Aplicações Single Page (SPA).

**Exemplo de Código Transformado:**

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

No modo dinâmico, o Intlayer substitui `useIntlayer` por `useDictionaryAsync`. Isso utiliza `import()` (mecanismo semelhante ao Suspense) para carregar preguiçosamente especificamente o JSON para o locale atual.

- **Prós:** **Tree shaking ao nível do locale.** Um usuário visualizando a versão em inglês irá _apenas_ baixar o dicionário em inglês. O dicionário em francês nunca é carregado.
- **Contras:** Dispara uma requisição de rede (busca de asset) por componente durante a hidratação.
- **Melhor para:** Blocos grandes de texto, artigos, ou aplicações que suportam muitas línguas onde o tamanho do bundle é crítico.

**Exemplo de Código Transformado:**

```tsx
// Seu código
const content = useIntlayer("my-key");

// Código otimizado (Dinâmico)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> Ao usar `importMode: 'dynamic'`, se você tiver 100 componentes usando `useIntlayer` em uma única página, o navegador tentará fazer 100 requisições separadas. Para evitar essa "cascata" de requisições, agrupe o conteúdo em menos arquivos `.content` (por exemplo, um dicionário por seção da página) em vez de um por componente atômico.

> Atualmente, `importMode: 'dynamic'` não é totalmente suportado para Vue e Svelte. Recomenda-se usar `importMode: 'static'` para esses frameworks até atualizações futuras.

### 3. Modo Live

Comporta-se de forma semelhante ao modo Dinâmico, mas tenta buscar os dicionários da API Intlayer Live Sync primeiro. Se a chamada à API falhar ou o conteúdo não estiver marcado para atualizações ao vivo, ele recorre à importação dinâmica.

> Veja a documentação do CMS para mais detalhes: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)

## Resumo: Estático vs Dinâmico

| Recurso                  | Modo Estático                                     | Modo Dinâmico                             |
| :----------------------- | :------------------------------------------------ | :---------------------------------------- |
| **Tamanho do Bundle JS** | Maior (inclui todos os idiomas para o componente) | Menor (apenas código, sem conteúdo)       |
| **Carregamento Inicial** | Instantâneo (Conteúdo está no bundle)             | Pequeno atraso (Busca JSON)               |
| **Requisições de Rede**  | 0 requisições extras                              | 1 requisição por dicionário               |
| **Tree Shaking**         | Nível de componente                               | Nível de componente + Nível de localidade |
| **Melhor Caso de Uso**   | Componentes de UI, Aplicações pequenas            | Páginas com muito texto, Muitos idiomas   |
