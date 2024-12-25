# Como o Intlayer Funciona

## Visão Geral

O papel do Intlayer é interpretar arquivos de declaração de conteúdo JavaScript em dicionários.

Para isso, o Intlayer passa por várias etapas:

1. Declaração de arquivos de conteúdo

   - Arquivos de conteúdo podem ser definidos em vários formatos, como TypeScript, ECMAScript, CommonJS ou JSON.
   - Arquivos de conteúdo podem ser definidos em qualquer lugar do projeto, o que permite melhor manutenção e escalabilidade. É importante respeitar as convenções de extensão de arquivo para arquivos de conteúdo. Esta extensão é por padrão `*.content.{js|cjs|mjs|ts|tsx|json}`, mas pode ser modificada no [arquivo de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

2. Geração de dicionários

   - Dicionários são gerados a partir de arquivos de conteúdo. Por padrão, os dicionários do intlayer são gerados no diretório `.intlayer/dictionary` do projeto.
   - Dois tipos de dicionários podem ser gerados: dicionários intlayer e dicionários i18n (beta).

3. Geração de tipos de dicionário

   - Tipos de dicionário são gerados a partir de dicionários intlayer. Por padrão, os tipos de dicionário intlayer são gerados no diretório `.intlayer/types` do projeto.

4. Geração de aumento de módulo do Intlayer

   - O [aumento de módulo do Intlayer](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) é um recurso do TypeScript que permite definir tipos adicionais para o Intlayer. Isso facilita a experiência de desenvolvimento, sugerindo argumentos disponíveis ou argumentos necessários.
     Entre os tipos gerados, tipos de dicionário intlayer ou até mesmo tipos de configuração de idioma são adicionados ao arquivo `types/intlayer.d.ts` e utilizados por outros pacotes. Para isso, é necessário que o arquivo `tsconfig.json` esteja configurado para incluir o diretório `.intlayer/types` do projeto.

5. Monitoramento de arquivos de conteúdo

   - Arquivos de conteúdo são monitorados para serem regenerados cada vez que são modificados.

6. Interpretação de dicionário
   - Dicionários são finalmente interpretados para serem utilizados em aplicativos.

## Pacotes

O Intlayer é composto por vários pacotes, cada um com um papel específico no processo de tradução. Aqui está uma representação gráfica da estrutura deste pacote:

![pacotes do intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

O pacote `intlayer` é usado em aplicativos para declarar conteúdo em arquivos de conteúdo.

### react-intlayer

O pacote `react-intlayer` é usado para interpretar dicionários intlayer e torná-los utilizáveis em aplicativos React.

### next-intlayer

O pacote `next-intlayer` é usado como uma camada sobre o `react-intlayer` para tornar os dicionários intlayer utilizáveis em aplicativos Next.js. Ele integra recursos essenciais para fazer o Intlayer funcionar em um ambiente Next.js, como middleware de tradução, roteamento ou configuração do arquivo `next.config.js`.

### intlayer-editor

O pacote `intlayer-editor` é usado para permitir o uso do editor visual. Este pacote, opcional, pode ser instalado em aplicativos e será usado pelo pacote `react-intlayer`.
Consiste em duas partes: o servidor e o cliente.

O cliente contém elementos de UI que serão usados pelo `react-intlayer`.

O servidor, baseado no Express, é utilizado para receber as requisições visuais do editor e gerenciar ou modificar arquivos de conteúdo.

### intlayer-cli

O pacote `intlayer-cli` pode ser usado para gerar dicionários usando o comando `npx intlayer build`. Se o `intlayer` já estiver instalado, o cli é instalado automaticamente e este pacote não é necessário.

### @intlayer/core

O pacote `@intlayer/core` é o pacote mestre do Intlayer. Ele contém funções de gerenciamento de tradução e dicionários. `@intlayer/core` é multiplataforma e é usado por outros pacotes para realizar a interpretação de dicionários.

### @intlayer/config

O pacote `@intlayer/config` é usado para configurar as definições do Intlayer, como idiomas disponíveis, parâmetros de middleware do Next.js ou as configurações do editor integrado.

### @intlayer/webpack

O pacote `@intlayer/webpack` é usado para adicionar plugins de compilação ao Next.js e React.

### @intlayer/cli

O pacote `@intlayer/cli` é usado para garantir a uniformidade de todos os comandos CLI do intlayer.

### @intlayer/dictionaries-entry

O pacote `@intlayer/dictionaries-entry` é um pacote que apenas retorna o caminho de entrada dos dicionários intlayer. Como a busca no sistema de arquivos é impossível do navegador, usar empacotadores como Webpack ou Rollup para recuperar o caminho de entrada dos dicionários é impossível. Este pacote visa ser alias.

### @intlayer/chokidar

O pacote `@intlayer/chokidar` é usado para monitorar arquivos de conteúdo e regenerar o dicionário modificado em cada modificação.
