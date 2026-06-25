---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "Documentação do pacote @intlayer/babel"
description: Plugins do Babel para o Intlayer para lidar com extração de conteúdo, otimização de importação, limpeza de campos não utilizados e ofuscação de nomes de campos durante a compilação.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - internacionalização
  - i18n
  - compilador
  - otimizar
  - limpar
  - minificar
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Documentação unificada de todas as exportações"
author: aymericzip
---

# Pacote @intlayer/babel

O pacote `@intlayer/babel` fornece um conjunto de plugins especializados do Babel para o Intlayer. Esses plugins cobrem todo o ciclo de build: extração de declarações de conteúdo, reescrita de chamadas `useIntlayer` / `getIntlayer` para importações de dicionário otimizadas, limpeza de campos não utilizados e minificação de nomes de campos.

## Instalação

```bash
npm install @intlayer/babel
```

## Exportações

Importar:

```ts
import { ... } from "@intlayer/babel";
```

---

### Plugins

| Função / Classe                | Descrição                                                                                                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayerExtractBabelPlugin`   | Plugin do Babel que extrai conteúdo traduzível de arquivos-fonte e injeta ganchos (hooks) `useIntlayer` / `getIntlayer` automaticamente. Projetado para uso com o Next.js e ferramentas de compilação baseadas em Babel. |
| `intlayerOptimizeBabelPlugin`  | Plugin do Babel que transforma chamadas `useIntlayer` e `getIntlayer` e reescreve suas importações para importações de dicionário JSON otimizadas (estáticas, dinâmicas ou via fetch).                                   |
| `intlayerPurgeBabelPlugin`     | Plugin do Babel que analisa arquivos-fonte e reescreve arquivos JSON de dicionário compilados para remover campos não utilizados (`build.purge`) ou renomeá-los para aliases curtos (`build.minify`).                    |
| `intlayerMinifyBabelPlugin`    | Plugin do Babel que reescreve arquivos-fonte para usar os aliases curtos de campo atribuídos durante a fase de minificação (por exemplo, `content.title` ← `content.a`). Depende do `intlayerPruneBabelPlugin`.          |
| `makeFieldRenameBabelPlugin`   | Função factory que produz um plugin do Babel para renomear acessos a campos de conteúdo de dicionário em arquivos-fonte de acordo com o `dictionaryKeyToFieldRenameMap` preenchido no `PruneContext`.                    |
| `makeUsageAnalyzerBabelPlugin` | Função factory que produz um plugin do Babel para analisar o uso de `useIntlayer` / `getIntlayer` no código-fonte e agregar dados de uso de campo no `PruneContext` compartilhado.                                       |
| `getSharedPruneContext`        | Função auxiliar que retorna o objeto `PruneContext` compartilhado para o diretório base especificado, ou `null` se ainda não tiver sido inicializado.                                                                    |

---

### Utilitários de Configuração de Plugins

| Função                     | Descrição                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getExtractPluginOptions`  | Carrega a configuração do Intlayer e retorna `ExtractPluginOptions` prontas para uso com o `intlayerExtractBabelPlugin`.                               |
| `getOptimizePluginOptions` | Carrega a configuração do Intlayer e os dicionários compilados e retorna `OptimizePluginOptions` prontas para uso com o `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | Carrega a configuração do Intlayer e retorna `PurgePluginOptions` prontas para uso com o `intlayerPurgeBabelPlugin`.                                   |
| `getMinifyPluginOptions`   | Carrega a configuração do Intlayer e retorna `MinifyPluginOptions` prontas para uso com o `intlayerMinifyBabelPlugin`.                                 |

---

### Tipos

| Tipo                    | Descrição                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | Modo do compilador: `'dev'` para desenvolvimento com suporte HMR, ou `'build'` para compilações de produção.                                 |
| `ExtractPluginOptions`  | Opções para o `intlayerExtractBabelPlugin`: lista de arquivos, configuração, callback `onExtract`, etc.                                      |
| `ExtractResult`         | Resultado da extração: chave do dicionário, caminho do arquivo, conteúdo e idioma.                                                           |
| `OptimizePluginOptions` | Opções para o `intlayerOptimizeBabelPlugin`: caminhos do dicionário, modo de importação, mapa de modos por dicionário, etc.                  |
| `PurgePluginOptions`    | Opções para o `intlayerPurgeBabelPlugin`: diretório base, sinalizadores de limpeza/minificação/otimização, lista de arquivos de componentes. |
| `MinifyPluginOptions`   | Opções para o `intlayerMinifyBabelPlugin`: diretório base, sinalizadores de minificação/otimização/editorEnabled.                            |
| `PruneContext`          | Estado compartilhado entre plugins de análise e limpeza: mapas de uso de campo, mapas de renomeação, etc.                                    |
| `DictionaryFieldUsage`  | Resultado do uso do campo para um único dicionário: `Set<string>` ou `'all'` quando a análise estática é inconclusiva.                       |
| `NestedRenameEntry`     | Nó na árvore de renomeação: o `shortName` e o mapa de filhos.                                                                                |
| `NestedRenameMap`       | Um nível na árvore de renomeação: `Map<string, NestedRenameEntry>`.                                                                          |
| `CompatCallerConfig`    | Configuração para um analisador de uso compatível para pacotes compat-adapter (nome do chamador e opções de processamento).                  |
| `ScriptBlock`           | Bloco de script extraído de um arquivo SFC (Vue ou Svelte): conteúdo, deslocamento de início e deslocamento de fim.                          |

---

### Funções Utilitárias

| Função                            | Descrição                                                                                                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | Converte um número inteiro (começando do zero) em um identificador alfabético curto: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, etc.                                                   |
| `buildNestedRenameMapFromContent` | Constrói recursivamente um `NestedRenameMap` a partir do valor do conteúdo de um dicionário compilado, respeitando as estruturas de nós do Intlayer (translation, enumeration, etc.). |
| `createPruneContext`              | Cria um novo objeto `PruneContext` vazio inicializado com valores padrão.                                                                                                             |
| `extractScriptBlocks`             | Extrai blocos `<script>` de arquivos SFC (Vue / Svelte) para análise subsequente do Babel.                                                                                            |
| `BABEL_PARSER_OPTIONS`            | Constante que representa as opções do analisador do Babel que cobrem os frameworks suportados (React/Vue/Svelte/Angular/...).                                                         |
| `INTLAYER_CALLER_NAMES`           | Lista constante de nomes de chamadores originais do Intlayer: `['useIntlayer', 'getIntlayer']`.                                                                                       |

---

## Exemplo de Uso

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Nota:** O plugin `intlayerPurgeBabelPlugin` deve ser declarado **antes** do `intlayerMinifyBabelPlugin`, porque o último lê o mapa de renomeação construído pelo primeiro. Além disso, ambos devem ser precedidos pelo `intlayerOptimizeBabelPlugin` para que ele possa ver as chaves do dicionário antes que as chamadas do `useIntlayer` sejam reescritas.
