---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 8
title: "CLI do Intlayer: todos os comandos para apps multilíngues"
description: Descubra como utilizar o CLI Intlayer para gerir o seu site multilíngue. Siga os passos nesta documentação online para configurar o seu projeto em poucos minutos.
keywords:
  - CLI
  - Interface de Linha de Comando
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Adicionar o comando upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Adicionar o comando init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Substituição do comando `ci` pelo flag `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Adicionar comando scan"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Adicionar comando standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Adicionar comando CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Adicionar comando list projects"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionar comando init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Adicionar comando extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Adicionar opção skipIfExists ao comando translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Adicionar aliases para argumentos e comandos do CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Adicionar opção build aos comandos"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Adicionar comando version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Definir opção verbose como padrão para true através do CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Adicionar comando watch e opção with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Adicionar comando editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Adicionar comandos content test e list"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Atualizar documentação dos parâmetros dos comandos do CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Início do histórico"
author: aymericzip
---

# CLI Intlayer - Todos os comandos do CLI Intlayer para o seu site multilíngue

## Índice

<TOC/>

## Instalar Pacote

Instale os pacotes necessários utilizando o npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Se o pacote `intlayer` já estiver instalado, o cli é instalado automaticamente. Pode saltar este passo.

## pacote intlayer-cli

O pacote `intlayer-cli` tem como objetivo transpilar as suas [declarações intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md) em dicionários.

- [declarações intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md)

Este pacote transpilará todos os ficheiros intlayer, tais como `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Veja como declarar os seus ficheiros de declaração Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar os dicionários intlayer pode utilizar interpretadores, como o [react-intlayer](https://www.npmjs.com/package/react-intlayer), ou o [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Suporte a Ficheiros de Configuração

O Intlayer aceita múltiplos formatos de ficheiros de configuração:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver como configurar os idiomas disponíveis ou outros parâmetros, consulte a [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

- [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

## Executar comandos intlayer

### Autenticação

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/login.md)** - Autentique-se no Intlayer CMS e obtenha credenciais de acesso

> `intlayer login` emite uma **chave de acesso** (`clientId` / `clientSecret`) que todo comando autenticado usa. O segredo é uma credencial do lado do servidor e nunca chega ao seu pacote cliente, veja [Mantendo a chave de acesso segura](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/login.md#mantendo-a-chave-de-acesso-segura).

- [Mantendo a chave de acesso segura](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/login.md#mantendo-a-chave-de-acesso-segura)

### Comandos Principais

- [Build de Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/build.md)
- [Watch de Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/watch.md)
- [Criar Bundle Standalone](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/standalone.md)
- [Verificar Versão do CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/version.md)
- [Listar Projetos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/list_projects.md)

### Gestão de Dicionários

- [Push de Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/push.md)
- [Pull de Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/pull.md)
- [Fill de Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md)
- [Testar Traduções em Falta](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/test.md)
- [Listar Ficheiros de Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/list.md)

### Gestão de Componentes

- **[Extrair Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md)** - Extraia strings de componentes para um ficheiro .content próximo do componente

### Configuração

- [Inicializar Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/init.md)
- [Configurar Infraestrutura](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/infra.md)
- [Atualizar Pacotes Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/upgrade.md)
- [Gerir Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/configuration.md)

### Gestão de Documentação

- [Traduzir Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-translate.md)
- [Rever Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-review.md)

### Editor & Sincronização ao Vivo

- [Comandos do Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/editor.md)
- [Comandos de Sincronização ao Vivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/live.md)

### Auditoria & Diagnósticos

- **[Escanear Website](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/scan.md)** - Meça o tamanho da página e audite a saúde de i18n/SEO de qualquer URL pública

### Ferramentas de Desenvolvimento

- [CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/sdk.md)
- [Comando de Debug do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/debug.md)

## Utilizar comandos intlayer no seu `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Nota**: Também pode utilizar os aliases mais curtos:
>
> - `npx intlayer list` em vez de `npx intlayer content list`
> - `npx intlayer test` em vez de `npx intlayer content test`
> - `npx intlayer projects-list` ou `npx intlayer pl` em vez de `npx intlayer projects list`
