# Como o Intlayer Funciona

## Visão Geral

O papel do Intlayer é interpretar arquivos de declaração de conteúdo JavaScript em dicionários.

Para isso, o Intlayer passa por várias etapas:

1. Declaração de arquivos de conteúdo

   - Os arquivos de conteúdo podem ser definidos em vários formatos, como TypeScript, ECMAScript, CommonJS ou JSON.
   - Os arquivos de conteúdo podem ser definidos em qualquer lugar do projeto, o que permite melhor manutenção e escalabilidade. É importante respeitar as convenções de extensão de arquivo para arquivos de conteúdo. Esta extensão é por padrão `*.content.{js|cjs|mjs|ts|tsx|json}`, mas pode ser modificada no [arquivo de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

2. Geração de dicionários

   - Dicionários são gerados a partir de arquivos de conteúdo. Por padrão, os dicionários do intlayer são gerados no diretório `.intlayer/dictionary` do projeto.
   - Dois tipos de dicionários podem ser gerados: dicionários do intlayer e dicionários i18n (beta).

3. Geração de tipos de dicionário

   - Os tipos de dicionário são gerados a partir dos dicionários do intlayer. Por padrão, os tipos de dicionário do intlayer são gerados no diretório `types` do projeto.

4. Geração de aumento de módulo do Intlayer

   - O [aumento de módulo do Intlayer](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) é um recurso do TypeScript que permite definir tipos adicionais para o Intlayer. Isso torna a experiência de desenvolvimento mais fácil ao sugerir argumentos disponíveis ou argumentos obrigatórios.
     Entre os tipos gerados, os tipos de dicionário do intlayer ou até mesmo tipos de configuração de linguagem são adicionados ao arquivo `types/intlayer.d.ts`, e usados por outros pacotes. Para isso, é necessário que o arquivo `tsconfig.json` esteja configurado para incluir o diretório `types` do projeto.

5. Monitoramento de arquivos de conteúdo

   - Os arquivos de conteúdo são monitorados para serem regenerados cada vez que são modificados.

6. Interpretação de dicionário
   - Os dicionários são finalmente interpretados para serem usados em aplicações.

## Pacotes

O Intlayer é composto por vários pacotes, cada um com um papel específico no processo de tradução. Aqui está uma representação gráfica da estrutura deste pacote:

![pacotes do intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

O pacote `intlayer` é usado em aplicações para declarar conteúdo em arquivos de conteúdo.

### react-intlayer

O pacote `react-intlayer` é usado para interpretar dicionários do intlayer e torná-los utilizáveis em aplicações React.

### next-intlayer

O pacote `next-intlayer` é usado como uma camada sobre o `react-intlayer` para tornar os dicionários do intlayer utilizáveis em aplicações Next.js. Ele integra recursos essenciais para fazer o Intlayer funcionar em um ambiente Next.js, como middleware de tradução, roteamento ou configuração do arquivo `next.config.js`.

### vite-intlayer

Inclui o plugin Vite para integrar o Intlayer com o [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), bem como middleware para detectar a localização preferida do usuário, gerenciar cookies e lidar com redirecionamento de URL.

### react-scripts-intlayer

Inclui os comandos e plugins `react-scripts-intlayer` para integrar o Intlayer com a aplicação baseada em Create React App. Esses plugins são baseados no [craco](https://craco.js.org/) e incluem configuração adicional para o [Webpack](https://webpack.js.org/).

### intlayer-editor

O pacote `intlayer-editor` é usado para permitir o uso do editor visual. Este pacote, opcional, pode ser instalado em aplicações e será usado pelo pacote `react-intlayer`.
Consiste em duas partes: o servidor e o cliente.

O cliente contém elementos de UI que serão usados pelo `react-intlayer`.

O servidor, baseado no Express, é usado para receber as requisições visuais do editor e gerenciar ou modificar arquivos de conteúdo.

### intlayer-cli

O pacote `intlayer-cli` pode ser usado para gerar dicionários usando o comando `npx intlayer build`. Se `intlayer` já estiver instalado, o cli é instalado automaticamente e este pacote não é necessário.

### @intlayer/core

O pacote `@intlayer/core` é o pacote master do Intlayer. Ele contém funções de tradução e gerenciamento de dicionário. O `@intlayer/core` é multiplataforma e é usado por outros pacotes para realizar a interpretação de dicionários.

### @intlayer/config

O pacote `@intlayer/config` é usado para configurar as definições do Intlayer, como idiomas disponíveis, parâmetros do middleware do Next.js ou configurações do editor integrado.

### @intlayer/webpack

O pacote `@intlayer/webpack` é usado para fornecer uma configuração do Webpack para tornar o trabalho em uma aplicação baseada em Webpack com o Intlayer. O pacote também fornece um plugin para adicionar a uma aplicação Webpack existente.

### @intlayer/cli

O pacote `@intlayer/cli` é um pacote NPM que é usado para declarar o script relacionado às interfaces de linha de comando do intlayer. Ele garante a uniformidade de todos os comandos CLI do intlayer. Este pacote é notavelmente consumido pelo [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/pt/packages/intlayer-cli/index.md), e os pacotes [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/pt/packages/intlayer/index.md).

### @intlayer/dictionaries-entry

O pacote `@intlayer/dictionaries-entry` é um pacote que retorna apenas o caminho de entrada dos dicionários do intlayer. Como a busca no sistema de arquivos é impossível a partir do navegador, usar bundlers como Webpack ou Rollup para recuperar o caminho de entrada dos dicionários não é possível. Este pacote tem como objetivo ser associado.

### @intlayer/chokidar

O pacote `@intlayer/chokidar` é usado para monitorar arquivos de conteúdo e regenerar o dicionário modificado em cada modificação.

## Converse com nossa documentação inteligente

- [Faça suas perguntas à nossa documentação inteligente](https://intlayer.org/docs/chat)
