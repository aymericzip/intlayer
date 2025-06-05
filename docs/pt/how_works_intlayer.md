# Como Intlayer funciona

## Visão Geral

A ideia principal por trás do Intlayer é adotar um gerenciamento de conteúdo por componente. Assim, a ideia do Intlayer é permitir que você declare seu conteúdo em qualquer lugar no seu código, como no mesmo diretório do seu componente.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

Para isso, o papel do Intlayer é encontrar todos os seus `arquivos de declaração de conteúdo`, em todos os formatos diferentes presentes no seu projeto, e então ele gerará os `dicionários` a partir deles.

Portanto, existem duas etapas principais:

- Etapa de construção
- Etapa de interpretação

### Etapa de construção dos dicionários

A etapa de construção pode ser feita de três maneiras:

- usando a CLI com `npx intlayer build`
- usando a [extensão do vscode](https://github.com/aymericzip/intlayer/blob/main/docs/pt/vs_code_extension.md)
- usando os plugins de aplicativos, como o pacote [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/vite-intlayer/index.md), ou seus equivalentes para [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/index.md). Quando você usa um desses plugins, o Intlayer construirá automaticamente seus dicionários ao iniciar (dev) ou construir (prod) sua aplicação.

1. Declaração de arquivos de conteúdo

   - Os arquivos de conteúdo podem ser definidos em vários formatos, como TypeScript, ECMAScript, CommonJS ou JSON.
   - Os arquivos de conteúdo podem ser definidos em qualquer lugar do projeto, o que permite uma melhor manutenção e escalabilidade. É importante respeitar as convenções de extensão de arquivo para arquivos de conteúdo. Essa extensão é por padrão `*.content.{js|cjs|mjs|ts|tsx|json}`, mas pode ser modificada no [arquivo de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

2. Geração de `dicionários`

   - Os dicionários são gerados a partir dos arquivos de conteúdo. Por padrão, os dicionários do Intlayer são gerados no diretório `.intlayer/dictionaries` do projeto.
   - Esses dicionários são gerados em diferentes formatos para atender a todas as necessidades e otimizar o desempenho da aplicação.

3. Geração de tipos de dicionários

Com base nos seus `dicionários`, o Intlayer gerará tipos para torná-los utilizáveis em sua aplicação.

- Os tipos de dicionários são gerados a partir dos `dicionários` do Intlayer. Por padrão, os tipos de dicionários do Intlayer são gerados no diretório `.intlayer/types` do projeto.

- A [ampliação de módulo](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) do Intlayer é um recurso do TypeScript que permite definir tipos adicionais para o Intlayer. Isso torna a experiência de desenvolvimento mais fácil, sugerindo argumentos disponíveis ou argumentos necessários. Entre os tipos gerados, os tipos de dicionários do Intlayer ou até mesmo os tipos de configuração de idioma são adicionados ao arquivo `types/intlayer.d.ts` e usados por outros pacotes. Para isso, é necessário que o arquivo `tsconfig.json` esteja configurado para incluir o diretório `types` do projeto.

### Etapa de interpretação dos dicionários

Usando o Intlayer, você acessará seu conteúdo em sua aplicação usando o hook `useIntlayer`.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

Esse hook gerenciará a detecção de localidade para você e retornará o conteúdo para a localidade atual. Usando esse hook, você também poderá interpretar markdown, gerenciar pluralização e muito mais.

> Para ver todos os recursos do Intlayer, você pode ler a [documentação de dicionário](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md).

## Conteúdo remoto

O Intlayer permite que você declare conteúdo localmente e, em seguida, exporte-o para o CMS para torná-lo editável por sua equipe não técnica.

Assim, você poderá enviar e buscar conteúdo do CMS para sua aplicação, de maneira semelhante ao que você faz com o Git para seu código.

Se configurado em seu projeto, o Intlayer gerenciará automaticamente para você a busca do conteúdo do CMS quando a aplicação iniciar (dev) / construir (prod).

## Editor visual

O Intlayer também fornece um editor visual para permitir que você edite seu conteúdo de forma visual. Este [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) está disponível no pacote externo `intlayer-editor`.

![editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

## Otimização da construção do aplicativo

Para otimizar o tamanho do pacote de sua aplicação, o Intlayer fornece dois plugins para otimizar a construção de sua aplicação: os plugins `@intlayer/babel` e `@intlayer/swc`.

No modo de desenvolvimento, o Intlayer usa uma importação estática centralizada para os dicionários, simplificando a experiência de desenvolvimento.

Ao otimizar a construção, o Intlayer substituirá todas as chamadas de dicionários para otimizar o particionamento. Dessa forma, o pacote final importará apenas os dicionários que são usados.

Ao ativar a opção `activateDynamicImport` na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md), o Intlayer usará a importação dinâmica para carregar os dicionários. Essa opção está desativada por padrão para evitar processamento assíncrono ao renderizar a aplicação.

> `@intlayer/babel` está disponível por padrão no pacote `vite-intlayer`,
> `@intlayer/swc` não está instalado por padrão no pacote `next-intlayer`, pois os plugins SWC ainda são experimentais no Next.js.

Para ver como configurar a construção de sua aplicação, você pode ler a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

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

### svelte-intlayer (WIP)

O pacote `svelte-intlayer` é usado para interpretar os dicionários do Intlayer e torná-los utilizáveis em aplicações Svelte.

### solid-intlayer (WIP)

O pacote `solid-intlayer` é usado para interpretar os dicionários do Intlayer e torná-los utilizáveis em aplicações Solid.js.

### preact-intlayer (WIP)

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

O pacote `@intlayer/webpack` é usado para fornecer uma configuração do Webpack para fazer uma aplicação baseada no Webpack funcionar com o Intlayer. O pacote também fornece um plugin para adicionar a uma aplicação Webpack existente.

### @intlayer/cli

O pacote `@intlayer/cli` é um pacote NPM usado para declarar os scripts relacionados às interfaces de linha de comando do Intlayer. Ele garante a uniformidade de todos os comandos CLI do Intlayer. Este pacote é notavelmente consumido pelos pacotes [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer-cli/index.md) e [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/index.md).

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

Os pacotes `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` e `@intlayer/dynamic-dictionaries-entry` retornam o caminho de entrada dos dicionários do Intlayer. Como buscar o sistema de arquivos a partir do navegador é impossível, usar empacotadores como Webpack ou Rollup para recuperar o caminho de entrada dos dicionários não é viável. Esses pacotes são projetados para serem aliased, permitindo a otimização de empacotamento em vários empacotadores como Vite, Webpack e Turbopack.

### @intlayer/chokidar

O pacote `@intlayer/chokidar` é usado para monitorar arquivos de conteúdo e regenerar o dicionário modificado a cada modificação.

### @intlayer/editor

O pacote `@intlayer/editor` fornece as utilidades relacionadas ao editor de dicionários. Ele inclui, notavelmente, a API para interligar uma aplicação com o editor Intlayer e utilitários para manipular dicionários. Este pacote é multiplataforma.

### @intlayer/editor-react

O pacote `@intlayer/editor-react` fornece estados, contextos, hooks e componentes para interligar uma aplicação React com o editor Intlayer.

### @intlayer/babel

O pacote `@intlayer/babel` fornece ferramentas que otimizam o empacotamento de dicionários para aplicações baseadas em Vite e Webpack.

### @intlayer/swc (WIP)

O pacote `@intlayer/swc` fornece ferramentas que otimizam o empacotamento de dicionários para aplicações Next.js.

### @intlayer/api

O pacote `@intlayer/api` é um SDK de API para interagir com o backend.

### @intlayer/design-system

O pacote `@intlayer/design-system` é usado para compartilhar elementos de design entre o CMS e o editor visual.

### @intlayer/backend

O pacote `@intlayer/backend` exporta tipos de backend e eventualmente oferecerá o backend como um pacote independente no futuro.

## Converse com nossa documentação inteligente

- [Faça suas perguntas à nossa documentação inteligente](https://intlayer.org/docs/chat)
