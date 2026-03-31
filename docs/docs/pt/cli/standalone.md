---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Bundle Standalone
description: Aprenda a criar um bundle JavaScript autónomo do conteúdo da aplicação.
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Inicialização da documentação do comando standalone"
---

# Bundle Standalone

O comando `standalone` permite-lhe criar um bundle JavaScript autónomo contendo o Intlayer e quaisquer outros pacotes especificados. Isto é particularmente útil para utilizar o Intlayer em ambientes sem um gestor de pacotes ou bundler, como uma aplicação HTML/JS simples.

O bundle utiliza o [esbuild](https://esbuild.github.io/) para combinar os pacotes solicitados e as suas dependências num único ficheiro que pode ser facilmente importado em qualquer projeto web.

## Utilização

```bash
npx intlayer standalone --packages [pacotes...] [opções]
```

## Opções

- `-o, --outfile [outfile]` - Opcional. O nome do ficheiro de saída. O padrão é `intlayer-bundle.js`.
- `--packages [pacotes...]` - Obrigatório. Uma lista de pacotes a incluir no bundle (ex: `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Opcional. A versão dos pacotes a empacotar. Se não for especificada, o padrão é a versão do CLI do Intlayer.
- `--minify` - Opcional. Se deve minificar a saída. O padrão é `true`.
- `--platform [platform]` - Opcional. A plataforma de destino para o bundle (ex: `browser`, `node`). O padrão é `browser`.
- `--format [format]` - Opcional. O formato de saída para o bundle (ex: `esm`, `cjs`, `iife`). O padrão é `esm`.

## Opções Comuns

- `--env-file [envFile]` - Ficheiro de ambiente.
- `-e, --env [env]` - Ambiente.
- `--base-dir [baseDir]` - Diretório base.
- `--no-cache` - Desativar cache.
- `--verbose` - Saída detalhada.

## Exemplos:

### Criar um bundle para Vanilla JS:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Isto criará um ficheiro `intlayer.js` contendo os pacotes `intlayer` e `vanilla-intlayer`, minificado e em formato ESM, pronto para ser utilizado num navegador através de uma tag `<script>`.

### Empacotar uma versão específica:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Empacotar com um formato diferente:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## O que faz:

1. **Cria um ambiente temporário** - Configura um diretório temporário para gerir as dependências.
2. **Instala pacotes** - Utiliza o `npm` ou `bun` (se disponível) para instalar os pacotes solicitados e as suas dependências.
3. **Gera um ponto de entrada** - Cria um ficheiro de entrada temporário que exporta todos os pacotes solicitados e os expõe como variáveis globais ao ser executado num navegador.
4. **Empacota com o esbuild** - Utiliza o esbuild para empacotar tudo num único ficheiro, aplicando a minificação e formatação conforme solicitado.
5. **Gera o ficheiro** - Escreve o bundle resultante no caminho de saída especificado.

## Variáveis Globais

Quando o bundle é carregado num navegador, expõe os pacotes solicitados como variáveis globais no objeto `window`. Os nomes das variáveis são derivados dos nomes dos pacotes (ex: `intlayer` torna-se `Intlayer`, `vanilla-intlayer` torna-se `VanillaIntlayer`).

```javascript
// Aceder ao Intlayer a partir do bundle
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
