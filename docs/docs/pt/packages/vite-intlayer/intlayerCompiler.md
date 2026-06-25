---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentação do plugin Vite intlayerCompiler | vite-intlayer
description: Plugin do Vite que extrai declarações de conteúdo embutidas do Intlayer de arquivos de componentes e as grava em arquivos JSON de dicionário no momento da compilação/transformação.
keywords:
  - intlayerCompiler
  - vite
  - plugin
  - compilador
  - conteúdo
  - dicionário
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Integrado no intlayer(); inicialização da doc"
author: aymericzip
---

# intlayerCompiler

O `intlayerCompiler` é um plugin do Vite que varre os arquivos de código-fonte dos componentes em busca de **declarações de conteúdo embutidas do Intlayer** — conteúdo definido diretamente dentro de um componente, em vez de em um arquivo `.content.ts` separado — e as grava em arquivos JSON de dicionário durante a fase de transformação.

> **A partir do Intlayer v9**, o `intlayerCompiler` é incluído automaticamente dentro do plugin principal [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayer.md) quando `compiler.enabled` é `true` e `compiler.output` está configurado nas suas configurações do Intlayer. Você só precisa registrá-lo separadamente quando desejar controle total sobre as configurações específicas do compilador.

## Uso

### Como parte do `intlayer()` (recomendado, v9+)

Ative o compilador através das configurações do Intlayer:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // onde os dicionários extraídos são gravados
  },
});
```

Em seguida, use o plugin padrão sem nenhum registro adicional:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone (quando necessário)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Opções

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Opção            | Tipo                      | Descrição                                                                                                   |
| ---------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | Substituições de configuração do Intlayer encaminhadas para `getConfiguration()`.                           |
| `compilerConfig` | `Partial<CompilerConfig>` | Substituições para a seção de configuração específica do compilador (ex: `enabled`, `output`, `filesList`). |

### Exemplo

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Como funciona

### Fase de transformação

Para cada arquivo fonte que corresponda a `compiler.filesList`, o plugin do compilador:

1. Passa o conteúdo do arquivo através de `extractContent` do `@intlayer/babel`.
2. Chama `onExtract` para cada declaração encontrada, gravando o JSON do dicionário resultante em `compiler.output`.
3. Retorna o código-fonte transformado com as declarações embutidas substituídas por chamadas padrão `useIntlayer('key')` / `getIntlayer('key')`.

Tipos de arquivos suportados: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

Quando um arquivo de componente é salvo no modo de desenvolvimento, o compilador:

1. Detecta a alteração do arquivo por meio do gancho (hook) `handleHotUpdate` do Vite.
2. Extrai novamente o conteúdo do arquivo atualizado.
3. Grava o JSON do dicionário atualizado.
4. Dispara uma atualização completa da página (`server.ws.send({ type: 'full-reload' })`).

Um debounce de 500 ms impede que a gravação do dicionário em si (que também dispara um evento de alteração de arquivo) cause um loop infinito de extração.

### Eliminação de duplicatas (Deduplicação)

O `intlayerCompiler` usa o mesmo mecanismo de deduplicação `createPrimaryInstanceGuard` que os outros plugins integrados. Quando tanto `intlayer()` (que empacota o compilador) quanto uma chamada manual ao `intlayerCompiler()` estão presentes, apenas a primeira instância registrada é executada — nenhum dicionário é gravado duas vezes.
