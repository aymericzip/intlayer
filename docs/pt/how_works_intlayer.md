# Como Funciona o Intlayer

## Visão Geral

O papel do Intlayer é interpretar arquivos de declaração de conteúdo JavaScript em dicionários.

Para isso, o Intlayer passa por várias etapas:

1. Declaração de arquivos de conteúdo

   - Os arquivos de conteúdo podem ser definidos em vários formatos, como TypeScript, ECMAScript, CommonJS ou JSON.
   - Os arquivos de conteúdo podem ser definidos em qualquer lugar do projeto, o que permite melhor manutenção e escalabilidade. É importante respeitar as convenções de extensão de arquivos para arquivos de conteúdo. Essa extensão é, por padrão, `*.content.{js|cjs|mjs|ts|tsx|json}`, mas pode ser modificada no [arquivo de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

2. Geração de dicionários

   - Os dicionários são gerados a partir dos arquivos de conteúdo. Por padrão, os dicionários do Intlayer são gerados no diretório `.intlayer/dictionary` do projeto.
   - Dois tipos de dicionários podem ser gerados: dicionários do Intlayer e dicionários i18n (beta).

3. Geração de tipos de dicionários

   - Os tipos de dicionários são gerados a partir dos dicionários do Intlayer. Por padrão, os tipos de dicionários do Intlayer são gerados no diretório `types` do projeto.

4. Geração de aumento de módulo do Intlayer

   - O [aumento de módulo](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) do Intlayer é um recurso do TypeScript que permite definir tipos adicionais para o Intlayer. Isso facilita a experiência de desenvolvimento, sugerindo argumentos disponíveis ou argumentos necessários.
     Entre os tipos gerados, tipos de dicionários do Intlayer ou até mesmo tipos de configuração de idioma são adicionados ao arquivo `types/intlayer.d.ts` e usados por outros pacotes. Para isso, é necessário que o arquivo `tsconfig.json` esteja configurado para incluir o diretório `types` do projeto.

5. Monitoramento de arquivos de conteúdo

   - Os arquivos de conteúdo são monitorados para serem regenerados sempre que forem modificados.

6. Interpretação de dicionários
   - Os dicionários são finalmente interpretados para serem usados em aplicações.

## Pacotes

O Intlayer é composto por vários pacotes, cada um com um papel específico no processo de tradução. Aqui está uma representação gráfica da estrutura deste pacote:

![pacotes do intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

O pacote `intlayer` é usado em aplicações para declarar conteúdo em arquivos de conteúdo.

### react-intlayer

O pacote `react-intlayer` é usado para interpretar dicionários do Intlayer e torná-los utilizáveis em aplicações React.

### next-intlayer

O pacote `next-intlayer` é usado como uma camada sobre o `react-intlayer` para tornar os dicionários do Intlayer utilizáveis em aplicações Next.js. Ele integra recursos essenciais para fazer o Intlayer funcionar em um ambiente Next.js, como middleware de tradução, roteamento ou configuração do arquivo `next.config.js`.

### vite-intlayer

Inclui o plugin Vite para integrar o Intlayer com o [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como middleware para detectar o idioma preferido do usuário, gerenciar cookies e lidar com redirecionamento de URLs.

### react-scripts-intlayer

Inclui os comandos e plugins `react-scripts-intlayer` para integrar o Intlayer com a aplicação baseada em Create React App. Esses plugins são baseados no [craco](https://craco.js.org/) e incluem configuração adicional para o empacotador [Webpack](https://webpack.js.org/).

### intlayer-editor

O pacote `intlayer-editor` é usado para permitir o uso do editor visual. Este pacote, opcional, pode ser instalado em aplicações e será usado pelo pacote `react-intlayer`.
Consiste em duas partes: o servidor e o cliente.

O cliente contém elementos de interface que serão usados pelo `react-intlayer`.

O servidor, baseado no Express, é usado para receber solicitações visuais do editor e gerenciar ou modificar arquivos de conteúdo.

### intlayer-cli

O pacote `intlayer-cli` pode ser usado para gerar dicionários usando o comando `npx intlayer build`. Se o `intlayer` já estiver instalado, o cli é automaticamente instalado e este pacote não é necessário.

### @intlayer/core

O pacote `@intlayer/core` é o pacote mestre do Intlayer. Ele contém funções de tradução e gerenciamento de dicionários. O `@intlayer/core` é multiplataforma e é usado por outros pacotes para realizar a interpretação de dicionários.

### @intlayer/config

O pacote `@intlayer/config` é usado para configurar as definições do Intlayer, como idiomas disponíveis, parâmetros de middleware do Next.js ou as configurações do editor integrado.

### @intlayer/webpack

O pacote `@intlayer/webpack` é usado para fornecer uma configuração do Webpack para fazer uma aplicação baseada no Webpack funcionar com o Intlayer. O pacote também fornece um plugin para adicionar em uma aplicação Webpack existente.

### @intlayer/cli

O pacote `@intlayer/cli` é um pacote NPM usado para declarar o script relacionado às interfaces de linha de comando do Intlayer. Ele garante a uniformidade de todos os comandos CLI do Intlayer. Este pacote é notavelmente consumido pelos pacotes [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer-cli/index.md) e [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/index.md).

### @intlayer/dictionaries-entry

O pacote `@intlayer/dictionaries-entry` é um pacote que apenas retorna o caminho de entrada dos dicionários do Intlayer. Como a busca no sistema de arquivos é impossível a partir do navegador, usar empacotadores como Webpack ou Rollup para recuperar o caminho de entrada dos dicionários não é possível. Este pacote tem como objetivo ser aliased.

### @intlayer/chokidar

O pacote `@intlayer/chokidar` é usado para monitorar arquivos de conteúdo e regenerar o dicionário modificado a cada modificação.

### @intlayer/editor

O pacote `@intlayer/editor` fornece as utilidades relacionadas ao editor de dicionários. Ele inclui, notavelmente, a API para interfaciar uma aplicação com o editor do Intlayer e utilitários para manipular dicionários. Este pacote é multiplataforma.

### @intlayer/editor-react

O pacote `@intlayer/editor-react` fornece estados, contextos, hooks e componentes para interfaciar uma aplicação React com o editor do Intlayer.

## Converse com nossa documentação inteligente

- [Faça suas perguntas à nossa documentação inteligente](https://intlayer.org/pt/docs/chat)
