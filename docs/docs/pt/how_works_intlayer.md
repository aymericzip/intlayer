---
createdAt: 2024-08-12
updatedAt: 2026-08-30
title: Como o Intlayer funciona
description: Aprenda como o Intlayer opera internamente. Compreenda a arquitetura e os componentes que tornam o Intlayer poderoso.
keywords:
  - Intlayer
  - Como funciona
  - Arquitetura
  - Componentes
  - Funcionamento interno
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Como Intlayer funciona

## Índice

<TOC/>

## Visão Geral

A ideia principal por trás do Intlayer é adotar um gerenciamento de conteúdo por componente. Assim, a ideia do Intlayer é permitir que você declare seu conteúdo em qualquer lugar no seu código, como no mesmo diretório do seu componente.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

Para isso, o papel do Intlayer é encontrar todos os seus `arquivos de declaração de conteúdo`, em todos os formatos diferentes presentes no seu projeto, e então ele gerará os `dicionários` a partir deles.

Portanto, existem duas etapas principais:

- Etapa de construção
- Etapa de interpretação

### Etapa de construção dos dicionários

A etapa de construção pode ser feita de três maneiras:

- usando a CLI com `npx intlayer build`
- usando a [extensão do vscode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)
- usando os plugins de aplicativos, como o pacote [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/index.md), ou seus equivalentes para [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/index.md). Quando você usa um desses plugins, o Intlayer construirá automaticamente seus dicionários ao iniciar (dev) ou construir (prod) sua aplicação.

1. Declaração de arquivos de conteúdo
   - Os arquivos de conteúdo podem ser definidos em vários formatos, como TypeScript, ECMAScript, CommonJS ou JSON.
   - Os arquivos de conteúdo podem ser definidos em qualquer lugar do projeto, o que permite uma melhor manutenção e escalabilidade. É importante respeitar as convenções de extensão de arquivo para arquivos de conteúdo. Essa extensão é por padrão `*.content.{js|cjs|mjs|ts|tsx|json}`, mas pode ser modificada no [arquivo de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

2. Geração de `dicionários`
   - Os dicionários são gerados a partir dos arquivos de conteúdo. Por padrão, os dicionários do Intlayer são gerados no diretório `.intlayer/dictionaries` do projeto.
   - Esses dicionários são gerados em diferentes formatos para atender a todas as necessidades e otimizar o desempenho da aplicação.

3. Geração de tipos de dicionários

Com base nos seus `dicionários`, o Intlayer gerará tipos para torná-los utilizáveis em sua aplicação.

- Os tipos de dicionários são gerados a partir dos `arquivos de declaração de conteúdo` do Intlayer. Por padrão, os tipos de dicionários do Intlayer são gerados no diretório `.intlayer/types` do projeto.

- A [ampliação de módulo](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) do Intlayer é um recurso do TypeScript que permite definir tipos adicionais para o Intlayer. Isso torna a experiência de desenvolvimento mais fácil, sugerindo argumentos disponíveis ou argumentos necessários.
  Entre os tipos gerados, os tipos de dicionários do Intlayer ou até mesmo os tipos de configuração de idioma são adicionados ao arquivo `types/intlayer.d.ts` e usados por outros pacotes. Para isso, é necessário que o arquivo `tsconfig.json` esteja configurado para incluir o diretório `types` do projeto.

### Etapa de interpretação dos dicionários

Usando o Intlayer, você acessará seu conteúdo em sua aplicação usando o hook `useIntlayer`.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

Esse hook gerenciará a detecção de localidade para você e retornará o conteúdo para a localidade atual. Usando esse hook, você também poderá interpretar markdown, gerenciar pluralização e muito mais.

> Para ver todos os recursos do Intlayer, você pode ler a [documentação de dicionário](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

## Conteúdo remoto

O Intlayer permite que você declare conteúdo localmente e, em seguida, exporte-o para o CMS para torná-lo editável por sua equipe não técnica.

Assim, você poderá enviar e buscar conteúdo do CMS para sua aplicação, de maneira semelhante ao que você faz com o Git para seu código.

Para dicionários externalizados usando o CMS, o Intlayer realiza uma operação básica de busca para recuperar dicionários remotos e os mescla com os seus locais. Se configurado em seu projeto, o Intlayer gerenciará automaticamente a busca do conteúdo do CMS quando a aplicação iniciar (dev) / construir (prod).

## Editor visual

O Intlayer também fornece um editor visual para permitir que você edite seu conteúdo de forma visual. Este [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) está disponível no pacote externo `intlayer-editor`.

![editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- O servidor é uma aplicação Express simples que escuta requisições do cliente e recupera o conteúdo da sua aplicação, como os `dictionaries` e a configuração para torná-lo acessível no lado do cliente.
- Por outro lado, o cliente é uma aplicação React que é usada para interagir com seu conteúdo usando uma interface visual.

- O servidor é uma aplicação simples em Express que escuta requisições do cliente e recupera o conteúdo da sua aplicação, como os `dictionaries` e a configuração para torná-los acessíveis no lado do cliente.
- Por outro lado, o cliente é uma aplicação React que é usada para interagir com seu conteúdo usando uma interface visual.
  Quando você chama seu conteúdo usando `useIntlayer` e o editor está ativado, ele automaticamente envolve suas strings com um objeto Proxy chamado `IntlayerNode`. Esse nó usa `window.postMessage` para se comunicar com um iframe encapsulado que contém a interface do editor visual.  
  No lado do editor, ele escuta essas mensagens e simula uma interação real com seu conteúdo, permitindo que você edite o texto diretamente no contexto da sua aplicação.

## Otimização da construção do aplicativo

Para otimizar o tamanho do bundle da sua aplicação, o Intlayer fornece dois plugins para otimizar a construção da sua aplicação: os plugins `@intlayer/babel` e `@intlayer/swc`.
Os plugins Babel e SWC funcionam analisando a Árvore de Sintaxe Abstrata (AST) da sua aplicação para substituir chamadas das funções do Intlayer por código otimizado. Esse processo torna o pacote final mais leve em produção, garantindo que apenas os dicionários realmente usados sejam importados, otimizando o particionamento e reduzindo o tamanho do bundle.

Os plugins Babel e SWC funcionam analisando a Abstract Syntax Tree (AST) da sua aplicação para substituir chamadas de funções Intlayer por código otimizado. Este processo torna seu bundle final mais leve em produção, garantindo que apenas os dicionários que são realmente usados sejam importados, otimizando o chunking e reduzindo o tamanho do bundle.

No modo de desenvolvimento, o Intlayer usa uma importação estática centralizada para os dicionários, simplificando a experiência de desenvolvimento.

Ao ativar a opção `importMode = "dynamic"` na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md), o Intlayer usará a importação dinâmica para carregar os dicionários. Essa opção está desativada por padrão para evitar processamento assíncrono ao renderizar a aplicação.

> `@intlayer/babel` está disponível por padrão no pacote `vite-intlayer`,

> `@intlayer/swc` não está instalado por padrão no pacote `next-intlayer`, pois os plugins SWC ainda são experimentais no Next.js.

Para ver como configurar a construção de sua aplicação, você pode ler a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Pacotes

O Intlayer é composto por vários pacotes, cada um com um papel específico no processo de tradução. Aqui está uma representação gráfica da estrutura deste pacote:

![pacotes do intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

O pacote `intlayer` é usado em aplicações para declarar conteúdo em arquivos de conteúdo.

### react-intlayer

O pacote `react-intlayer` é usado para interpretar os dicionários do Intlayer e torná-los utilizáveis em aplicações React.

### next-intlayer

O pacote `next-intlayer` é usado como uma camada sobre o `react-intlayer` para tornar os dicionários do Intlayer utilizáveis em aplicações Next.js. Ele integra recursos essenciais para fazer o Intlayer funcionar em um ambiente Next.js, como middleware de tradução, roteamento ou configuração do arquivo `next.config.js`.

### vue-intlayer

O pacote `vue-intlayer` é usado para interpretar os dicionários do Intlayer e torná-los utilizáveis em aplicações Vue.

### nuxt-intlayer

O pacote `nuxt-intlayer` é um módulo Nuxt para tornar os dicionários do Intlayer utilizáveis em aplicações Nuxt. Ele integra recursos essenciais para fazer o Intlayer funcionar em um ambiente Nuxt, como middleware de tradução, roteamento e a configuração do arquivo `nuxt.config.js`.

### svelte-intlayer

O pacote `svelte-intlayer` é usado para interpretar os dicionários do Intlayer e torná-los utilizáveis em aplicações Svelte.

### solid-intlayer (WIP)

O pacote `solid-intlayer` é usado para interpretar os dicionários do Intlayer e torná-los utilizáveis em aplicações Solid.js.

### preact-intlayer

O pacote `preact-intlayer` é usado para interpretar os dicionários do Intlayer e torná-los utilizáveis em aplicações Preact.

### angular-intlayer (WIP)

O pacote `angular-intlayer` é usado para interpretar os dicionários do Intlayer e torná-los utilizáveis em aplicações Angular.

### express-intlayer

O pacote `express-intlayer` é usado para utilizar o Intlayer em um backend Express.js.

### react-native-intlayer

O pacote `react-native-intlayer` fornece ferramentas que integram plugins para o Intlayer funcionar com o Metro bundler.

### lynx-intlayer

O pacote `lynx-intlayer` fornece ferramentas que integram plugins para o Intlayer funcionar com o Lynx bundler.

### vite-intlayer

Inclui o plugin Vite para integrar o Intlayer com o [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), bem como middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URL.

### react-scripts-intlayer

Inclui os comandos e plugins `react-scripts-intlayer` para integrar o Intlayer com aplicações baseadas no Create React App. Esses plugins são baseados no [craco](https://craco.js.org/) e incluem configurações adicionais para o empacotador [Webpack](https://webpack.js.org/).

### intlayer-editor

O pacote `intlayer-editor` é usado para permitir o uso do editor visual. Este pacote, opcional, pode ser instalado em aplicações e será utilizado pelo pacote `react-intlayer`.
Ele consiste em duas partes: o servidor e o cliente.

O cliente contém elementos de interface do usuário que serão usados pelo `react-intlayer`.

O servidor, baseado no Express, é usado para receber solicitações do editor visual e gerenciar ou modificar arquivos de conteúdo.

### intlayer-cli

O pacote `intlayer-cli` pode ser usado para gerar dicionários usando o comando `npx intlayer dictionaries build`. Se o `intlayer` já estiver instalado, o CLI é instalado automaticamente e este pacote não é necessário.

### @intlayer/core

O pacote `@intlayer/core` é o pacote principal do Intlayer. Ele contém funções de tradução e gerenciamento de dicionários. O `@intlayer/core` é multiplataforma e é usado por outros pacotes para realizar a interpretação de dicionários.

### @intlayer/config

O pacote `@intlayer/config` é usado para configurar as definições do Intlayer, como idiomas disponíveis, parâmetros de middleware do Next.js ou as configurações do editor integrado.

### @intlayer/webpack

O pacote `@intlayer/webpack` é usado para fornecer uma configuração do Webpack que permite que uma aplicação baseada em Webpack funcione com o Intlayer. O pacote também fornece um plugin para adicionar a uma aplicação Webpack existente.

### @intlayer/cli

O pacote `@intlayer/cli` é um pacote NPM usado para declarar os scripts relacionados às interfaces de linha de comando do Intlayer. Ele garante a uniformidade de todos os comandos CLI do Intlayer. Este pacote é notavelmente consumido pelos pacotes [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer-cli/index.md) e [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/index.md).

### @intlayer/mcp

O pacote `@intlayer/mcp` fornece um servidor MCP (Model Context Protocol) que oferece assistência para IDE com inteligência artificial, adaptada ao ecossistema Intlayer. Ele carrega automaticamente a documentação e integra-se com o Intlayer CLI.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

Os pacotes `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` e `@intlayer/dynamic-dictionaries-entry` retornam o caminho de entrada dos dicionários Intlayer. Como é impossível pesquisar o sistema de arquivos a partir do navegador, usar bundlers como Webpack ou Rollup para recuperar o caminho de entrada dos dicionários não é viável. Esses pacotes são projetados para serem aliasados, permitindo a otimização do empacotamento em vários bundlers, como Vite, Webpack e Turbopack.

### @intlayer/engine

O pacote `@intlayer/engine` é usado para monitorar arquivos de conteúdo e regenerar o dicionário modificado a cada alteração.

### @intlayer/editor

O pacote `@intlayer/editor` fornece as utilidades relacionadas ao editor de dicionários. Ele inclui notavelmente a API para interligar uma aplicação com o editor Intlayer, além de utilitários para manipular dicionários. Este pacote é multiplataforma.

### @intlayer/editor-react

O pacote `@intlayer/editor-react` fornece estados, contextos, hooks e componentes para interligar uma aplicação React com o editor Intlayer.

### @intlayer/babel

O pacote `@intlayer/babel` fornece ferramentas que otimizam o empacotamento de dicionários para aplicações baseadas em Vite e Webpack.

### @intlayer/swc

O pacote `@intlayer/swc` fornece ferramentas que otimizam o empacotamento de dicionários para aplicações Next.js.

### @intlayer/api

O pacote `@intlayer/api` é um SDK de API para interagir com o backend.

### @intlayer/design-system

O pacote `@intlayer/design-system` é usado para compartilhar elementos de design entre o CMS e o editor visual.

### @intlayer/backend

O pacote `@intlayer/backend` exporta tipos de backend e eventualmente oferecerá o backend como um pacote independente no futuro.

## Converse com nossa documentação inteligente

- [Faça suas perguntas à nossa documentação inteligente](https://intlayer.org/doc/chat)

## Perguntas Frequentes

<FAQ>

<Question title="Quando os dicionários são gerados, em tempo de build ou em tempo de execução?">

Em tempo de build. O plugin do empacotador (bundler) ou o comando `npx intlayer build` analisa seus arquivos `.content.ts`, compila-os em dicionários na pasta `.intlayer` e gera os tipos TypeScript correspondentes. Em tempo de execução, seus componentes apenas leem o resultado pronto, sem processamento ou leituras de arquivos no caminho das requisições.

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O markup renderizado no servidor resolve seu conteúdo no próprio servidor, e o compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas que o componente utiliza, descartando chaves e idiomas não utilizados. Os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas habituais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Posso migrar do i18next, next-intl ou react-i18next sem reescrever meus componentes?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md) ou o [guia de migração do next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md). Ou você pode manter sua API atual integralmente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma interface de `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` e `Lingui`, porém alimentados pelos dicionários do Intlayer, permitindo que apenas os imports mudem enquanto o código dos componentes permanece idêntico.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus arquivos fonte, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma. Consulte o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

Para um fluxo de trabalho totalmente automatizado, o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) faz o mesmo em tempo de build em código JSX, TSX, Vue e Svelte, gerando os dicionários a cada alteração para que não haja necessidade de manter chaves manualmente. Como opera por análise estática, strings criadas exclusivamente em tempo de execução ficam fora de alcance, necessitando de algumas anotações para diferenciar texto do usuário de lógica interna da aplicação.

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="O que é a pasta .intlayer e devo incluí-la no commit?">

Ela contém a saída gerada: os dicionários compilados e as definições de tipo TypeScript geradas. Como é um artefato derivado dos seus arquivos de conteúdo, ela deve ser incluída no `.gitignore` e recompilada na sua etapa de build, exatamente como uma pasta `dist`.

</Question>

<Question title="Como o locale ativo é determinado?">

A partir das fontes listadas em `routing.storage`, em ordem: o prefixo da URL quando `routing.mode` o utiliza, depois cookies, depois o cabeçalho `Accept-Language`, recorrendo por fim ao locale padrão. A escolha feita explicitamente pelo usuário é persistida para que permaneça na próxima visita. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="Qual a diferença entre dicionários locais e remotos?">

Um dicionário local é declarado diretamente na sua base de código e compilado com sua aplicação. Um dicionário remoto é gerenciado no [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) e resolvido em tempo de execução, permitindo alterações sem um novo deploy. Ambos são consumidos através dos mesmos hooks, e o conteúdo remoto faz fallback para a declaração local caso esteja indisponível.

</Question>

<Question title="O Intlayer funciona sem TypeScript?">

Sim. Os arquivos de conteúdo podem ser escritos em TypeScript, JavaScript, ESM, CommonJS ou JSON. O TypeScript é o que habilita as tipagens automáticas e o autocompletar completo no editor, tornando-o a configuração recomendada, mas não é obrigatório.

</Question>

<Question title="Como a renderização no servidor e no cliente compartilham o mesmo conteúdo?">

O servidor resolve o conteúdo dos componentes renderizados no servidor diretamente, evitando enviar qualquer dicionário ao cliente para aquele trecho de HTML. Componentes cliente leem os mesmos dicionários através do provider, que recebe o locale resolvido pelo servidor, garantindo que a primeira renderização do cliente corresponda ao HTML do servidor sem oscilação visual de idioma.

</Question>

<Question title="Como o Intlayer evita inconsistências de hidratação (hydration mismatch) em relação ao locale?">

O locale é resolvido uma única vez no servidor e repassado ao provider, em vez de ser recalculado no navegador. Como o cliente inicia com o mesmo locale com o qual o servidor renderizou, a árvore de nós coincide perfeitamente, eliminando as falhas comuns em soluções com detecção no lado do cliente.

</Question>

<Question title="Preciso recompilar a aplicação quando adiciono uma tradução?">

Em desenvolvimento, não: o plugin observa seus arquivos de conteúdo e recompila os dicionários afetados ao salvar. Em produção, os dicionários fazem parte do build compilado, a menos que o conteúdo seja remoto - nesse caso, o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) e a [sincronização ao vivo (live sync)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/live.md) aplicam as mudanças sem necessidade de novo deploy.

</Question>

</FAQ>
