---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Descubra como usar o Intlayer CLI para gerenciar seu site multilíngue. Siga os passos nesta documentação online para configurar seu projeto em poucos minutos.
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
  - version: 7.2.3
    date: 2025-11-22
    changes: Adicionado comando transform
  - version: 7.1.0
    date: 2025-11-05
    changes: Adicionada opção skipIfExists ao comando translate
  - version: 6.1.4
    date: 2025-01-27
    changes: Adicionados aliases para argumentos e comandos do CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Adicionada opção build aos comandos
  - version: 6.1.2
    date: 2025-09-26
    changes: Adicionado comando version
  - version: 6.1.0
    date: 2025-09-26
    changes: Definida a opção verbose como true por padrão usando o CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Adicionado comando watch e opção with
  - version: 6.0.1
    date: 2025-09-23
    changes: Adicionado comando editor
  - version: 6.0.0
    date: 2025-09-17
    changes: Adicionados comandos content test e list
  - version: 5.5.11
    date: 2025-07-11
    changes: Atualizada documentação dos parâmetros dos comandos CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Intlayer CLI

---

## Índice

<TOC/>

---

## Instalar Pacote

Instale os pacotes necessários usando npm:

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

> Se o pacote `intlayer` já estiver instalado, o CLI será instalado automaticamente. Você pode pular esta etapa.

## Pacote intlayer-cli

O pacote `intlayer-cli` tem como objetivo transpilar suas [declarações intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md) em dicionários.

Este pacote irá transpilar todos os arquivos intlayer, como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Veja como declarar seus arquivos de declaração Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar dicionários intlayer, você pode usar interpretadores, como [react-intlayer](https://www.npmjs.com/package/react-intlayer) ou [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Suporte a Arquivos de Configuração

O Intlayer aceita múltiplos formatos de arquivo de configuração:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver como configurar os locais disponíveis ou outros parâmetros, consulte a [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Executar comandos intlayer

### Autenticação

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/login.md)** - Autenticar-se com o CMS do Intlayer e obter credenciais de acesso

### Comandos Principais

- **[Construir Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/build.md)** - Construa seus dicionários a partir dos arquivos de declaração de conteúdo
- **[Observar Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/watch.md)** - Observe alterações e construa automaticamente os dicionários
- **[Verificar Versão do CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/version.md)** - Verifique a versão instalada do Intlayer CLI

### Gerenciamento de Dicionários

- **[Enviar Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/push.md)** - Envie dicionários para o editor e CMS do Intlayer
- **[Puxar Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/pull.md)** - Puxe dicionários do editor e CMS do Intlayer
- **[Preencher Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md)** - Preencha, audite e traduza dicionários usando IA
- **[Testar Traduções Faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/test.md)** - Teste e identifique traduções faltantes
- **[Listar Arquivos de Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/list.md)** - Liste todos os arquivos de declaração de conteúdo no seu projeto

### Gerenciamento de Componentes

- **[Transformar Componentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/transform.md)** - Transforme componentes existentes para usar o Intlayer

### Configuração

- **[Gerenciar Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/configuration.md)** - Obtenha e envie sua configuração do Intlayer para o CMS

### Gestão de Documentação

- **[Traduzir Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-translate.md)** - Traduza automaticamente arquivos de documentação usando IA
- **[Revisar Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-review.md)** - Revise arquivos de documentação para qualidade e consistência

### Editor & Sincronização ao Vivo

- **[Comandos do Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/editor.md)** - Use os comandos do editor Intlayer
- **[Comandos de Sincronização ao Vivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/live.md)** - Use a Sincronização ao Vivo para refletir mudanças de conteúdo do CMS em tempo de execução

### Ferramentas de Desenvolvimento

- **[SDK CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/sdk.md)** - Use o SDK CLI do Intlayer no seu próprio código
- **[Comando de Depuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/debug.md)** - Depure e resolva problemas do CLI do Intlayer

## Use os comandos do intlayer no seu `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Nota**: Você também pode usar os aliases mais curtos:
>
> - `npx intlayer list` ao invés de `npx intlayer content list`
> - `npx intlayer test` ao invés de `npx intlayer content test`
