---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - Todos os comandos do CLI Intlayer para o seu site multilíngue
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
---

# CLI Intlayer - Todos os comandos do CLI Intlayer para o seu site multilíngue

---

## Índice

<TOC/>

---

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

Este pacote transpilará todos os ficheiros intlayer, tais como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Veja como declarar os seus ficheiros de declaração Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

## Executar comandos intlayer

### Autenticação

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/login.md)** - Autentique-se no Intlayer CMS e obtenha credenciais de acesso

### Comandos Principais

- **[Build de Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/build.md)** - Construa os seus dicionários a partir de ficheiros de declaração de conteúdo
- **[Watch de Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/watch.md)** - Monitorize alterações e construa dicionários automaticamente
- **[Criar Bundle Standalone](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/standalone.md)** - Crie um bundle JavaScript autónomo contendo o Intlayer e os pacotes especificados
- **[Verificar Versão do CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/version.md)** - Verifique a versão instalada do CLI do Intlayer
- **[Listar Projetos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/list_projects.md)** - Liste todos os projetos Intlayer num diretório ou repositório git

### Gestão de Dicionários

- **[Push de Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/push.md)** - Envie dicionários para o editor e CMS do Intlayer
- **[Pull de Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/pull.md)** - Obtenha dicionários do editor e CMS do Intlayer
- **[Fill de Dicionários](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md)** - Preencha, audite e traduza dicionários utilizando IA
- **[Testar Traduções em Falta](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/test.md)** - Teste e identifique traduções em falta
- **[Listar Ficheiros de Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/list.md)** - Liste todos os ficheiros de declaração de conteúdo no seu projeto

### Gestão de Componentes

- **[Extrair Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md)** - Extraia strings de componentes para um ficheiro .content próximo do componente

### Configuração

- **[Inicializar Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/init.md)** - Configure o Intlayer no seu projeto com configuração automática
- **[Gerir Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/configuration.md)** - Obtenha e envie a sua configuração do Intlayer para o CMS

### Gestão de Documentação

- **[Traduzir Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-translate.md)** - Traduza automaticamente ficheiros de documentação utilizando IA
- **[Rever Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-review.md)** - Reveja ficheiros de documentação para qualidade e consistência

### Editor & Sincronização ao Vivo

- **[Comandos do Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/editor.md)** - Utilize os comandos do editor do Intlayer
- **[Comandos de Sincronização ao Vivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/live.md)** - Utilize o Live Sync para refletir alterações de conteúdo do CMS em tempo de execução

### CI/CD & Automatização

- **[Comando CI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/ci.md)** - Execute comandos do Intlayer com credenciais auto-injetadas para pipelines CI/CD

### Ferramentas de Desenvolvimento

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/sdk.md)** - Utilize o SDK do CLI do Intlayer no seu próprio código
- **[Comando de Debug do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/debug.md)** - Faça debug e resolva problemas do CLI do Intlayer

## Utilizar comandos intlayer no seu `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
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
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Nota**: Também pode utilizar os aliases mais curtos:
>
> - `npx intlayer list` em vez de `npx intlayer content list`
> - `npx intlayer test` em vez de `npx intlayer content test`
> - `npx intlayer projects-list` ou `npx intlayer pl` em vez de `npx intlayer projects list`
