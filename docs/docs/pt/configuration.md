---
createdAt: 2024-08-13
updatedAt: 2026-03-12
title: Configuração
description: Aprenda como configurar o Intlayer para sua aplicação. Entenda as várias configurações e opções disponíveis para personalizar o Intlayer conforme suas necessidades.
keywords:
  - Configuração
  - Ajustes
  - Personalização
  - Intlayer
  - Opções
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.3.0
    date: 2026-03-11
    changes: Mover 'baseDir' da configuração de 'content' para a configuração de 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Atualizar opções do compilador, adicionar suporte para 'output' e 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Atualizar opções do compilador
  - version: 8.1.5
    date: 2026-02-23
    changes: Adicionado a opção do compilador 'build-only' e o prefixo do dicionário
  - version: 8.0.6
    date: 2026-02-12
    changes: Adicionar suporte para os provedores Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face e Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Adicionar `dataSerialization` à configuração de IA
  - version: 8.0.0
    date: 2026-01-24
    changes: Renomear o modo de importação `live` para `fetch` para descrever melhor o mecanismo subjacente.
  - version: 8.0.0
    date: 2026-01-22
    changes: Mover a configuração de build para `importMode` na configuração do dicionário.
  - version: 8.0.0
    date: 2026-01-22
    changes: Adicionada a opção `rewrite` à configuração de roteamento
  - version: 8.0.0
    date: 2026-01-18
    changes: Separar a configuração do sistema da configuração do conteúdo. Mover os caminhos internos para a propriedade `system`. Adicionar `codeDir` para separar os arquivos de conteúdo da transformação do código.
  - version: 8.0.0
    date: 2026-01-18
    changes: Adicionar opções de dicionário `location` e `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Adicionar suporte para formatos de arquivo JSON5 e JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Adicionar opção `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Adicionada a configuração `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Substituído o `middleware` pela configuração `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Adicionada a opção `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Atualizada a opção `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Adicionada a opção `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Removido o campo `dictionaryOutput` e o campo `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Adicionado modo de importação `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Substituído o campo `hotReload` por `liveSync` e adicionados os campos `liveSyncPort` e `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Substituído `activateDynamicImport` pela opção `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Alterado o valor padrão de contentDir de `['src']` para `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Adicionados comandos `docs`
---

# Documentação de Configuração do Intlayer

## Visão Geral

Os arquivos de configuração do Intlayer permitem a personalização de vários aspectos do plugin, como internacionalização, middleware e manipulação de conteúdo. Este documento fornece uma descrição detalhada de cada propriedade na configuração.

---

## Índice

<TOC/>

---

## Suporte a Arquivos de Configuração

O Intlayer aceita formatos de arquivos de configuração JSON, JS, MJS e TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Exemplo de arquivo de configuração

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Example Intlayer configuration file showing all available options.
 */
const config: IntlayerConfig = {
  /**
   * Configuration for internationalization settings.
   */
  internationalization: {
    /**
     * List of supported locales in the application.
     * Default: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * List of required locales that must be defined in every dictionary.
     * If empty, all locales are required in `strict` mode.
     * Default: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Strictness level for internationalized content.
     * - "strict": Errors if any declared locale is missing or undeclared.
     * - "inclusive": Warnings if a declared locale is missing.
     * - "loose": Accepts any existing locale.
     * Default: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Default locale used as a fallback if the requested locale is not found.
     * Default: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Settings that control dictionary operations and fallback behavior.
   */
  dictionary: {
    /**
     * Controls how dictionaries are imported.
     * - "static": Statically imported at build time.
     * - "dynamic": Dynamically imported using Suspense.
     * - "fetch": Fetched dynamically via the live sync API.
     * Default: "static"
     */
    importMode: "static",

    /**
     * Strategy for auto-filling missing translations using AI.
     * Can be a boolean or a path pattern to store filled content.
     * Default: true
     */
    fill: true,

    /**
     * Physical location of the dictionary files.
     * - "local": Stored in the local filesystem.
     * - "remote": Stored in the Intlayer CMS.
     * - "hybrid": Stored in the local filesystem and the Intlayer CMS.
     * - "plugin" (or any custom string): Provided by a plugin or a custom source.
     * Default: "local"
     */
    location: "local",

    /**
     * Whether to automatically transform content (e.g., Markdown to HTML).
     * Default: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Routing and middleware configuration.
   */
  routing: {
    /**
     * Locale routing strategy.
     * - "prefix-no-default": Prefix all except the default locale (e.g., /dashboard, /fr/dashboard).
     * - "prefix-all": Prefix all locales (e.g., /en/dashboard, /fr/dashboard).
     * - "no-prefix": No locale in the URL.
     * - "search-params": Use ?locale=...
     * Default: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Where to store the user's selected locale.
     * Options: 'cookie', 'localStorage', 'sessionStorage', 'header', or an array of these.
     * Default: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Base path for the application URLs.
     * Default: ""
     */
    basePath: "",

    /**
     * Custom URL rewriting rules for locale-specific paths.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Settings for finding and processing content files.
   */
  content: {
    /**
     * File extensions to scan for dictionaries.
     * Default: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Directories where .content files are located.
     * Default: ["."]
     */
    contentDir: ["src"],

    /**
     * Directories where source code is located.
     * Used for build optimization and code transformation.
     * Default: ["."]
     */
    codeDir: ["src"],

    /**
     * Patterns to exclude from scanning.
     * Default: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Whether to watch for changes and rebuild dictionaries in development.
     * Default: true in development
     */
    watch: true,

    /**
     * Command to format newly created / updated .content files.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Visual Editor configuration.
   */
  editor: {
    /**
     * Whether the visual editor is enabled.
     * Default: true
     */
    enabled: true,

    /**
     * URL of your application for origin validation.
     * Default: "*"
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port for the local editor server.
     * Default: 8000
     */
    port: 8000,

    /**
     * Public URL for the editor.
     * Default: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL.
     * Default: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * Backend API URL.
     * Default: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Whether to enable real-time content synchronization.
     * Default: false
     */
    liveSync: true,
  },

  /**
   * AI-powered translation and generation settings.
   */
  ai: {
    /**
     * AI provider to use.
     * Options: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Default: 'openai'
     */
    provider: "openai",

    /**
     * Model to use from the selected provider.
     */
    model: "gpt-4o",

    /**
     * Provider API key.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Global context to guide the AI in generating translations.
     */
    applicationContext: "Esta é uma aplicação de reserva de viagens.",

    /**
     * Base URL for the AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serialização de dados
     *
     * Opções:
     * - "json": Padrão, confiável; consome mais tokens.
     * - "toon": Menos tokens, menos consistente que o JSON.
     *
     * Padrão: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Build and optimization settings.
   */
  build: {
    /**
     * Build execution mode.
     * - "auto": Automatic build during app build.
     * - "manual": Requires explicit build command.
     * Default: "auto"
     */
    mode: "auto",

    /**
     * Whether to optimize the final bundle by pruning unused dictionaries.
     * Default: true in production
     */
    optimize: true,

    /**
     * Output format for generated dictionary files.
     * Default: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Indicates if the build should check TypeScript types.
     * Default: false
     */
    checkTypes: false,
  },

  /**
   * Logger configuration.
   */
  log: {
    /**
     * Logging level.
     * - "default": Standard logging.
     * - "verbose": Detailed debug logging.
     * - "disabled": No logging.
     * Default: "default"
     */
    mode: "default",

    /**
     * Prefix for all log messages.
     * Default: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * System configuration (Advanced use cases)
   */
  system: {
    /**
     * Directory for storing localization dictionaries.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Directory for module augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Directory for storing unmerged dictionaries.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Directory for storing dictionary types.
     */
    typesDir: ".intlayer/types",

    /**
     * Directory where main application files are stored.
     */
    mainDir: ".intlayer/main",

    /**
     * Directory where the configuration files are stored.
     */
    configDir: ".intlayer/config",

    /**
     * Directory where the cache files are stored.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Compiler configuration (Advanced use cases)
   */
  compiler: {
    /**
     * Indica se o compilador deve ser habilitado.
     *
     * - false : Desabilita o compilador.
     * - true : Habilita o compilador.
     * - "build-only" : Ignora o compilador durante o desenvolvimento para acelerar os tempos de inicialização.
     *
     * Valor padrão : false
     */
    enabled: true,

    /**
     * Define o caminho dos arquivos de saída. Substitui `outputDir`.
     *
     * - Os caminhos `./` são resolvidos em relação ao diretório do componente.
     * - Os caminhos `/` são resolvidos em relação à raiz do projeto (`baseDir`).
     *
     * - A inserção da variável `{{locale}}` no caminho ativará a geração de dicionários separados por idioma.
     *
     * Exemplo:
     * ```ts
     * {
     *   // Cria arquivos .content.ts multilíngues próximos ao componente
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Equivalente usando uma string template
     * }
     * ```
     *
     * ```ts
     * {
     *   // Cria arquivos JSON centralizados por idioma na raiz do projeto
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalente usando uma string template
     * }
     * ```
     *
     * Lista de variáveis:
     *   - `fileName`: O nome do arquivo.
     *   - `key`: A chave do conteúdo.
     *   - `locale`: O idioma do conteúdo.
     *   - `extension`: A extensão do arquivo.
     *   - `componentFileName`: O nome do arquivo do componente.
     *   - `componentExtension`: A extensão do arquivo do componente.
     *   - `format`: O formato do dicionário.
     *   - `componentFormat`: O formato do dicionário do componente.
     *   - `componentDirPath`: O caminho do diretório do componente.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Indica se os componentes devem ser salvos após serem transformados.
     * Dessa forma, o compilador pode ser executado apenas uma vez para transformar o app e depois removido.
     */
    saveComponents: false,

    /**
     * Inserir apenas o conteúdo no arquivo gerado. Útil para saídas JSON i18next ou ICU MessageFormat por localidade.
     */
    noMetadata: false,

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "", // Adicionar um prefixo opcional para as chaves do dicionário extraídas
  },

  /**
   * Custom schemas to validate the dictionaries content.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Plugins configuration.
   */
  plugins: [],
};

export default config;
````

## Referência de Configuração

As seções a seguir descrevem as várias configurações disponíveis para o Intlayer.

---

### Configuração de Internacionalização

Define as configurações relacionadas à internacionalização, incluindo os locais disponíveis e o local padrão para a aplicação.

#### Propriedades

- **locales**:
  - _Tipo_: `string[]`
  - _Padrão_: `['en']`
  - _Descrição_: A lista de locais suportados na aplicação.
  - _Exemplo_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Tipo_: `string[]`
  - _Padrão_: `[]`
  - _Descrição_: A lista de locais obrigatórios na aplicação.
  - _Exemplo_: `[]`
  - _Nota_: Se estiver vazio, todos os locais são obrigatórios no modo `strict`.
  - _Nota_: Certifique-se de que os locais obrigatórios também estejam definidos no campo `locales`.
- **strictMode**:
  - _Tipo_: `string`
  - _Padrão_: `inclusive`
  - _Descrição_: Garante implementações rigorosas de conteúdo internacionalizado usando typescript.
  - _Nota_: Se definido como "strict", a função de tradução `t` exigirá que cada local declarado esteja definido. Se algum local estiver faltando, ou se um local não estiver declarado na sua configuração, isso gerará um erro.
  - _Nota_: Se definido como "inclusive", a função de tradução `t` exigirá que cada local declarado esteja definido. Se algum local estiver faltando, isso gerará um aviso. Mas aceitará se um local não estiver declarado na sua configuração, mas existir.
  - _Nota_: Se definido como "loose", a função de tradução `t` aceitará qualquer localidade existente.

- **defaultLocale**:
  - _Tipo_: `string`
  - _Padrão_: `'en'`
  - _Descrição_: A localidade padrão usada como fallback caso a localidade solicitada não seja encontrada.
  - _Exemplo_: `'en'`
  - _Nota_: Isso é usado para determinar a localidade quando nenhuma é especificada na URL, cookie ou cabeçalho.

---

### Configuração do Editor

Define configurações relacionadas ao editor integrado, incluindo porta do servidor e status ativo.

#### Propriedades

- **applicationURL**:
  - _Tipo_: `string`
  - _Padrão_: `http://localhost:3000`
  - _Descrição_: A URL da aplicação. Usada para restringir a origem do editor por razões de segurança.
  - _Exemplo_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: A URL da aplicação. Usada para restringir a origem do editor por razões de segurança. Se definida como `'*'`, o editor fica acessível de qualquer origem.

- **port**:
  - _Tipo_: `number`
  - _Padrão_: `8000`
  - _Descrição_: A porta usada pelo servidor do editor visual.

- **editorURL**:
  - _Tipo_: `string`
  - _Padrão_: `'http://localhost:8000'`
  - _Descrição_: A URL do servidor do editor. Usada para restringir a origem do editor por razões de segurança.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: A URL do servidor do editor para acessar a partir da aplicação. Usada para restringir as origens que podem interagir com a aplicação por razões de segurança. Se definida como `'*'`, o editor é acessível de qualquer origem. Deve ser configurada se a porta for alterada ou se o editor estiver hospedado em um domínio diferente.

- **cmsURL**:
  - _Tipo_: `string`
  - _Padrão_: `'https://intlayer.org'`
  - _Descrição_: A URL do CMS Intlayer.
  - _Exemplo_: `'https://intlayer.org'`
  - _Nota_: A URL do CMS Intlayer.

- **backendURL**:
  - _Tipo_: `string`
  - _Padrão_: `https://back.intlayer.org`
  - _Descrição_: A URL do servidor backend.
  - _Exemplo_: `http://localhost:4000`

- **enabled**:
  - _Tipo_: `boolean`
  - _Padrão_: `true`
  - _Descrição_: Indica se a aplicação interage com o editor visual.
  - _Exemplo_: `process.env.NODE_ENV !== 'production'`
  - _Nota_: Se verdadeiro, o editor poderá interagir com a aplicação. Se falso, o editor não poderá interagir com a aplicação. Em qualquer caso, o editor só pode ser ativado pelo editor visual. Desativar o editor para ambientes específicos é uma forma de reforçar a segurança.

- **clientId**:
  - _Tipo_: `string` | `undefined`
  - _Padrão_: `undefined`
  - _Descrição_: clientId e clientSecret permitem que os pacotes intlayer autentiquem com o backend usando autenticação oAuth2. Um token de acesso é usado para autenticar o usuário relacionado ao projeto. Para obter um token de acesso, acesse https://app.intlayer.org/project e crie uma conta.
  - _Exemplo_: `true`
  - _Nota_: Importante: O clientId e o clientSecret devem ser mantidos em segredo e não compartilhados publicamente. Por favor, certifique-se de mantê-los em um local seguro, como variáveis de ambiente.

- **clientSecret**:
  - _Tipo_: `string` | `undefined`
  - _Padrão_: `undefined`
  - _Descrição_: clientId e clientSecret permitem que os pacotes intlayer se autentiquem com o backend usando autenticação oAuth2. Um token de acesso é usado para autenticar o usuário relacionado ao projeto. Para obter um token de acesso, acesse https://app.intlayer.org/project e crie uma conta.
  - _Exemplo_: `true`
  - _Nota_: Importante: O clientId e o clientSecret devem ser mantidos em sigilo e não compartilhados publicamente. Por favor, certifique-se de mantê-los em um local seguro, como variáveis de ambiente.

- **dictionaryPriorityStrategy**:
  - _Tipo_: `string`
  - _Padrão_: `'local_first'`
  - _Descrição_: A estratégia para priorizar dicionários no caso de ambos, dicionários locais e distantes, estarem presentes. Se definido como `'distant_first'`, a aplicação priorizará dicionários distantes sobre os locais. Se definido como `'local_first'`, a aplicação priorizará dicionários locais sobre os distantes.
  - _Exemplo_: `'distant_first'`

- **liveSync**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Indica se o servidor da aplicação deve recarregar o conteúdo da aplicação automaticamente quando uma alteração for detectada no CMS / Editor Visual / Backend.
  - _Exemplo_: `true`
  - _Nota_: Por exemplo, quando um novo dicionário é adicionado ou atualizado, a aplicação atualizará o conteúdo para exibição na página.
  - _Nota_: A sincronização ao vivo precisa externalizar o conteúdo da aplicação para outro servidor. Isso significa que pode impactar ligeiramente o desempenho da aplicação. Para limitar isso, recomendamos hospedar a aplicação e o servidor de sincronização ao vivo na mesma máquina. Além disso, a combinação de sincronização ao vivo e `optimize` pode gerar um número considerável de requisições ao servidor de sincronização ao vivo. Dependendo da sua infraestrutura, recomendamos testar ambas as opções e sua combinação.

- **liveSyncPort**:
  - _Tipo_: `number`
  - _Padrão_: `4000`
  - _Descrição_: A porta do servidor de sincronização ao vivo.
  - _Exemplo_: `4000`
  - _Nota_: A porta do servidor de sincronização ao vivo.

### Configuração de Roteamento

Configurações que controlam o comportamento do roteamento, incluindo estrutura de URL, armazenamento de localidade e como o middleware opera.

#### Propriedades

- **mode**:
  - _Tipo_: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
  - _Padrão_: `'prefix-no-default'`
  - _Descrição_: Modo de roteamento de URL para lidar com a localidade.
  - _Exemplos_:
    - `'prefix-no-default'`: `/dashboard` (pt) ou `/fr/dashboard` (fr)
    - `'prefix-all'`: `/pt/dashboard` (pt) ou `/fr/dashboard` (fr)
    - `'no-prefix'`: `/dashboard` (localidade tratada por outros meios)
    - `'search-params'`: `/dashboard?locale=fr`
  - _Nota_: Esta configuração não afeta a manipulação de cookies ou o armazenamento da localidade.

- **storage**:
  - _Tipo_: `false | 'cookie' | 'localStorage' | 'sessionStorage' | 'header' | CookiesAttributes | StorageAttributes | Array`
  - _Padrão_: `['cookie', 'header']`
  - _Descrição_: Configuração para armazenar a localidade no cliente.

  - **cookie**:
    - _Descrição_: Armazena os dados em cookies, pequenos pedaços de dados armazenados no navegador do cliente, acessíveis tanto do lado do cliente quanto do servidor.
    - _Nota_: Para armazenamento em conformidade com o GDPR, certifique-se do consentimento do usuário antes de usar.
    - _Nota_: Os parâmetros do cookie são personalizáveis se configurados como CookiesAttributes (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).

  - **localStorage**:
    - _Descrição_: Armazena dados no navegador sem datas de expiração, permitindo a persistência dos dados entre sessões; acessível apenas do lado do cliente.
    - _Nota_: Ideal para armazenamento de dados a longo prazo, mas esteja ciente das implicações de privacidade e segurança.
    - _Nota_: O local storage é acessível apenas do lado do cliente; o proxy do intlayer não poderá acessá-lo.
    - _Nota_: Os parâmetros do local storage são personalizáveis se configurados como StorageAttributes (`{ type: 'localStorage', name: 'custom-locale' }`).

  - **sessionStorage**:
    - _Descrição_: Armazena dados pela duração da sessão da página, o que significa que são limpos quando a aba ou janela é fechada; acessível apenas do lado do cliente.
    - _Nota_: Adequado para armazenamento temporário de dados por sessão.
    - _Nota_: O local storage é acessível apenas do lado do cliente; o proxy do intlayer não poderá acessá-lo.
    - _Nota_: Os parâmetros do local storage são personalizáveis se configurados como StorageAttributes (`{ type: 'sessionStorage', name: 'custom-locale' }`).

  - **header**:
    - _Descrição_: Utiliza cabeçalhos HTTP para armazenar ou transmitir dados de localidade, útil para determinar o idioma no lado do servidor.
    - _Nota_: Útil em chamadas de API para manter configurações de idioma consistentes entre solicitações.
    - _Nota_: O cabeçalho é acessível apenas do lado do servidor; o lado do cliente não poderá acessá-lo.
    - _Nota_: O nome do cabeçalho é personalizável se configurado como StorageAttributes (`{ type: 'header', name: 'custom-locale' }`).

- **basePath**:
  - _Tipo_: `string`
  - _Padrão_: `''`
  - _Descrição_: O caminho base para as URLs da aplicação.
  - _Exemplo_: `'/my-app'`
  - _Nota_:
    - Se a aplicação estiver hospedada em `https://example.com/my-app`,
    - o caminho base é `'/my-app'`.
    - A URL será `https://example.com/my-app/pt`.
    - Se o caminho base não estiver definido, a URL será `https://example.com/pt`.

- **noPrefix**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Indica se deve omitir o prefixo da localidade nas URLs.
  - _Exemplo_: `true`
  - _Nota_:
    - Se `true`: Sem prefixo na URL
    - Se `false`: Com prefixo na URL
    - Exemplo com `basePath = '/my-app'`:
      - Se `noPrefix = false`: a URL será `https://example.com/my-app/pt`
      - Se `noPrefix = true`: a URL será `https://example.com/my-app`
    - Esta opção só é válida se `mode` for `'prefix-no-default'` ou `'prefix-all'`.

- **rewrite**:
  - _Tipo_: `Record<string, StrictModeLocaleMap<string>>`
  - _Padrão_: `undefined`
  - _Descrição_: Regras personalizadas de reescrita de URL que substituem o modo de roteamento padrão para caminhos específicos. Permite definir caminhos específicos por idioma que diferem do comportamento de roteamento padrão. Suporta parâmetros de rota dinâmicos usando a sintaxe `[param]`.
  - _Exemplo_:
    ```typescript
    routing: {
      mode: "prefix-no-default", // Estratégia de fallback
      rewrite: nextjsRewrite({
        "/about": {
          pt: "/sobre-nos",
          en: "/about",
          fr: "/a-propos",
        },
        "/product/[slug]": {
          pt: "/produto/[slug]",
          en: "/product/[slug]",
          fr: "/produit/[slug]",
        },
        "/blog/[category]/[id]": {
          pt: "/blog/[category]/[id]",
          en: "/blog/[category]/[id]",
          fr: "/journal/[category]/[id]",
        },
      }),
    }
    ```
  - _Nota_: As regras de reescrita têm prioridade sobre o comportamento do `mode` padrão. Se um caminho corresponder a uma regra de reescrita, o caminho localizado da configuração de reescrita será usado em vez do prefixo de idioma padrão.
  - _Nota_: Parâmetros de rota dinâmicos são suportados usando a notação de colchetes (por exemplo, `[slug]`, `[id]`). Os valores dos parâmetros são extraídos automaticamente da URL e interpolados no caminho reescrito.
  - _Nota_: Funciona com aplicações Next.js e Vite. O middleware/proxy reescreverá automaticamente as solicitações recebidas para corresponder à estrutura de rota interna.
  - _Nota_: Ao gerar URLs com `getLocalizedUrl()`, as regras de reescrita são aplicadas automaticamente se corresponderem ao caminho fornecido.
  - _Referência_: Para mais informações, consulte [Reescrita de URL personalizada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/custom_url_rewrites.md).

#### Atributos de Cookie

Ao usar o armazenamento de cookie, você pode configurar atributos de cookie adicionais:

- **name**: Nome do cookie (padrão: `'INTLAYER_LOCALE'`)
- **domain**: Domínio do cookie (padrão: undefined)
- **path**: Caminho do cookie (padrão: undefined)
- **secure**: Requer HTTPS (padrão: undefined)
- **httpOnly**: Flag HTTP-only (padrão: undefined)
- **sameSite**: Política SameSite (`'strict' | 'lax' | 'none'`)
- **expires**: Data de expiração ou dias (padrão: undefined)

#### Atributos de Armazenamento Local

Ao usar localStorage ou sessionStorage:

- **type**: Tipo de armazenamento (`'localStorage' | 'sessionStorage'`)
- **name**: Nome da chave de armazenamento (padrão: `'INTLAYER_LOCALE'`)

#### Exemplos de Configuração

Aqui estão alguns exemplos comuns de configuração para a nova estrutura de roteamento v8:

**Configuração Básica (Padrão)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "pt"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Configuração em Conformidade com o GDPR**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "pt"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Modo de Parâmetros de Busca**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "pt"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Modo Sem Prefixo com Armazenamento Personalizado**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "pt"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Reescrita de URL Personalizada com Rotas Dinâmicas**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Estratégia de fallback para rotas não reescritas
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### Configuração de Conteúdo

Configurações relacionadas ao manuseio de conteúdo dentro da aplicação, incluindo nomes de diretórios, extensões de arquivos e configurações derivadas.

#### Propriedades

- **autoFill**:
  - _Tipo_: `boolean | string | FilePathPattern | { [key in Locales]?: string }`
  - _Padrão_: `undefined`
  - _Descrição_: Indica como o conteúdo deve ser preenchido automaticamente usando IA. Pode ser declarado globalmente no arquivo `intlayer.config.ts`.
  - _Exemplo_: true
  - _Exemplo_: `'./{{fileName}}.content.json'`
  - _Exemplo_: `{ fr: './{{fileName}}.fr.content.json', es: './{{fileName}}.es.content.json' }`
  - _Nota_: A configuração de preenchimento automático pode ser:
    - booleano: Ativa o preenchimento automático para todos os locais
    - string: Caminho para um único arquivo ou template com variáveis
    - objeto: Caminhos de arquivos por localidade

- **watch**:
  - _Tipo_: `boolean`
  - _Padrão_: `process.env.NODE_ENV === 'development'`
  - _Descrição_: Indica se o Intlayer deve monitorar alterações nos arquivos de declaração de conteúdo na aplicação para reconstruir os dicionários relacionados.

- **fileExtensions**:
  - _Tipo_: `string[]`
  - _Padrão_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descrição_: Extensões de arquivo a serem procuradas ao construir dicionários.
  - _Exemplo_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: Personalizar extensões de arquivo pode ajudar a evitar conflitos.

- **contentDir**:
  - _Tipo_: `string[]`
  - _Padrão_: `['.']`
  - _Exemplo_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Descrição_: O caminho do diretório onde os arquivos de definição de conteúdo (`.content.*`) são armazenados.
  - _Nota_: Isso é usado para monitorar arquivos de conteúdo para reconstruir os dicionários.

- **codeDir**:
  - _Tipo_: `string[]`
  - _Padrão_: `['.']`
  - _Exemplo_: `['src', '../../ui-library']`
  - _Descrição_: O caminho do diretório onde o código é armazenado, relativo ao diretório base.
  - _Nota_: Isso é usado para monitorar arquivos de código para transformar (podar, otimizar). Manter isso separado de `contentDir` pode melhorar o desempenho da compilação ao evitar varreduras desnecessárias de arquivos de conteúdo.

- **excludedPath**:
  - _Tipo_: `string[]`
  - _Padrão_: `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']`
  - _Descrição_: Diretórios excluídos da busca de conteúdo.
  - _Nota_: Esta configuração ainda não é utilizada, mas está planejada para implementação futura.

- **formatCommand**:
  - _Tipo_: `string`
  - _Padrão_: `undefined`
  - _Descrição_: O comando para formatar o conteúdo. Quando o Intlayer escreve seus arquivos .content localmente, este comando será usado para formatar o conteúdo.
  - _Exemplo_: `'npx prettier --write "{{file}}" --log-level silent'` Usando Prettier
  - _Exemplo_: `'npx biome format "{{file}}" --write --log-level none'` Usando Biome
  - _Exemplo_: `'npx eslint --fix "{{file}}"  --quiet'` Usando ESLint
  - _Nota_: O Intlayer substituirá {{file}} pelo caminho do arquivo a ser formatado.
  - _Nota_: Se não for definido, o Intlayer tentará detectar automaticamente o comando de formatação. Tentando resolver os seguintes comandos: prettier, biome, eslint.

---

### Configuração do Sistema

Configurações relacionadas aos caminhos internos e resultados de saída do Intlayer. Essas configurações são tipicamente internas e não devem precisar ser modificadas pelo usuário.

#### Propriedades

- **baseDir**:
  - _Tipo_: `string`
  - _Padrão_: `process.cwd()`
  - _Descrição_: O diretório base para o projeto.
  - _Exemplo_: `'/path/to/project'`
  - _Nota_: Isso é usado para resolver todos os diretórios relacionados ao Intlayer.

- **dictionariesDir**:
  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/dictionary'`
  - _Descrição_: O caminho do diretório para armazenar dicionários de localização.

- **moduleAugmentationDir**:
  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/types'`
  - _Descrição_: Diretório para a ampliação de módulos, permitindo melhores sugestões na IDE e verificação de tipos.
  - _Exemplo_: `'intlayer-types'`
  - _Nota_: Certifique-se de incluir isso no `tsconfig.json`.

- **unmergedDictionariesDir**:
  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/unmerged_dictionary'`
  - _Descrição_: O diretório para armazenar dicionários não mesclados.

- **typesDir**:
  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/types'`
  - _Descrição_: O diretório para armazenar tipos de dicionário.

- **mainDir**:
  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/main'`
  - _Descrição_: O diretório onde os arquivos principais da aplicação são armazenados.

- **configDir**:
  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/config'`
  - _Descrição_: O diretório onde os arquivos de configuração são armazenados.

- **cacheDir**:
  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/cache'`
  - _Descrição_: O diretório onde os arquivos de cache são armazenados.

- **outputFilesPatternWithPath**:
  - _Tipo_: `string`
  - _Padrão_: `'{{dictionariesDir}}/**/*.json'`
  - _Descrição_: Padrão para arquivos de saída incluindo o caminho relativo.

### Configuração do dicionário

Configurações que controlam as operações do dicionário, incluindo o comportamento de preenchimento automático e a geração de conteúdo.

Esta configuração de dicionário serve a dois propósitos principais:

1.  **Valores padrão**: Define valores padrão ao criar arquivos de declaração de conteúdo
2.  **Comportamento de fallback**: Fornece valores de fallback quando campos específicos não estão definidos, permitindo que você defina o comportamento das operações do dicionário globalmente

Para mais informações sobre arquivos de declaração de conteúdo e como os valores de configuração são aplicados, consulte a [Documentação do arquivo de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

#### Propriedades

- **fill**
- **description**
- **locale**
- **location**
- **priority**
- **live**
- **schema**
- **title**
- **tags**
- **version**

---

### Configuração do Logger

Configurações que controlam o logger, incluindo o prefixo a ser usado.

#### Propriedades

- **mode**:
  - _Tipo_: `string`
  - _Padrão_: `default`
  - _Descrição_: Indica o modo do logger.
  - _Opções_: `default`, `verbose`, `disabled`
  - _Exemplo_: `default`
  - _Nota_: O modo do logger. O modo verbose registrará mais informações, mas pode ser usado para fins de depuração. O modo disabled desabilitará o logger.

- **prefix**:
  - _Tipo_: `string`
  - _Padrão_: `'[intlayer] '`
  - _Descrição_: O prefixo do logger.
  - _Exemplo_: `'[meu prefixo personalizado] '`
  - _Nota_: O prefixo do logger.

### Configuração de IA

Configurações que controlam os recursos de IA do Intlayer, incluindo o provedor, modelo e chave de API.

Esta configuração é opcional se você estiver registrado no [Painel do Intlayer](https://app.intlayer.org/project) usando uma chave de acesso. O Intlayer gerenciará automaticamente a solução de IA mais eficiente e econômica para suas necessidades. Usar as opções padrão garante melhor manutenção a longo prazo, pois o Intlayer atualiza continuamente para usar os modelos mais relevantes.

Se preferir usar sua própria chave de API ou modelo específico, você pode definir sua configuração personalizada de IA.
Esta configuração de IA será usada globalmente em todo o seu ambiente Intlayer. Os comandos CLI usarão essas configurações como padrão para os comandos (por exemplo, `fill`), assim como o SDK, Editor Visual e CMS. Você pode substituir esses valores padrão para casos de uso específicos usando parâmetros de comando.

O Intlayer suporta múltiplos provedores de IA para maior flexibilidade e escolha. Os provedores atualmente suportados são:

- **OpenAI** (padrão)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Google AI Studio**
- **Google Vertex**
- **Together.ai**
- **ollama**

#### Propriedades

- **provider** :
  - _Tipo_ : `string`
  - _Padrão_ : `'openai'`
  - _Descrição_ : O provedor a ser usado para os recursos de IA do Intlayer.
  - _Opções_ : `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`, `'openrouter'`, `'alibaba'`, `'fireworks'`, `'groq'`, `'huggingface'`, `'bedrock'`, `'googleaistudio'`, `'googlevertex'`, `'togetherai'`
  - _Exemplo_ : `'anthropic'`
  - _Nota_: Diferentes provedores podem exigir diferentes chaves de API e possuir modelos de preços distintos.

- **model** :
  - _Tipo_ : `string`
  - _Padrão_ : Nenhum
  - _Descrição_ : O modelo a ser usado para os recursos de IA do Intlayer.
  - _Exemplo_ : `'gpt-4o-2024-11-20'`
  - _Nota_ : O modelo específico a ser usado varia conforme o provedor.

- **temperature** :
  - _Tipo_ : `number`
  - _Padrão_ : Nenhum
  - _Descrição_ : A temperatura controla a aleatoriedade das respostas da IA.
  - _Exemplo_ : `0.1`
  - _Nota_ : Uma temperatura mais alta tornará a IA mais criativa e menos previsível.

- **apiKey** :
  - _Tipo_ : `string`
  - _Padrão_ : Nenhum
  - _Descrição_ : Sua chave de API para o provedor selecionado.
  - _Exemplo_ : `process.env.OPENAI_API_KEY`
  - _Nota_ : Importante: As chaves de API devem ser mantidas em segredo e não compartilhadas publicamente. Por favor, certifique-se de mantê-las em um local seguro, como variáveis de ambiente.

- **applicationContext** :
  - _Tipo_ : `string`
  - _Padrão_ : Nenhum
  - _Descrição_ : Fornece contexto adicional sobre sua aplicação para o modelo de IA, ajudando-o a gerar traduções mais precisas e contextualmente apropriadas. Isso pode incluir informações sobre o domínio do seu app, público-alvo, tom ou terminologia específica.
  - _Nota_: Você pode usar isso para adicionar outras regras ao modelo de IA (por exemplo, "não transforme URLs").
  - _Exemplo_ : `'O contexto da minha aplicação'`

- **baseURL** :
  - _Tipo_ : `string`
  - _Padrão_ : Nenhum
  - _Descrição_ : A URL base para a API de IA.
  - _Exemplo_ : `'https://api.openai.com/v1'`
  - _Exemplo_ : `'http://localhost:5000'`
  - _Nota_ : Pode ser usado para apontar para um endpoint de API de IA local ou personalizado.

- **dataSerialization**:
  - _Tipo_: `'json' | 'toon'`
  - _Padrão_: `'json'`
  - _Descrição_: O formato de serialização de dados a ser usado nas funcionalidades de IA do Intlayer.
  - _Exemplo_: `'toon'`
  - _Nota_: `json`: Padrão, confiável; usa mais tokens. `toon`: Menos tokens, menos consistente que o JSON.
    > Se você fornecer parâmetros adicionais, o Intlayer os passará para o modelo de IA como contexto. Isso pode ser usado para ajustar o esforço de raciocínio, a verbosidade do texto, etc.

### Configuração de Build

Configurações que controlam como o Intlayer otimiza e constrói a internacionalização da sua aplicação.

As opções de build se aplicam aos plugins `@intlayer/babel` e `@intlayer/swc`.

> No modo de desenvolvimento, o Intlayer usa importações estáticas para dicionários para simplificar a experiência de desenvolvimento.

> Quando otimizado, o Intlayer substituirá as chamadas de dicionários para otimizar a divisão em chunks, de modo que o pacote final importe apenas os dicionários que são realmente usados.

#### Propriedades

- **mode** :
  - _Tipo_ : `'auto' | 'manual'`
  - _Padrão_ : `'auto'`
  - _Descrição_ : Controla o modo da build.
  - _Exemplo_ : `'manual'`
  - _Nota_ : Se 'auto', a build será habilitada automaticamente durante o build da app.
  - _Nota_ : Se 'manual', a build só será acionada quando o comando de build for executado.
  - _Nota_ : Pode ser usado para desabilitar a build de dicionários, por exemplo, quando se deseja evitar a execução em um ambiente Node.js.

- **optimize** :
  - _Tipo_ : `boolean`
  - _Padrão_ : `undefined`
  - _Descrição_ : Controla se a build deve ser otimizada.
  - _Exemplo_ : `process.env.NODE_ENV === 'production'`
  - _Nota_ : Por padrão, a otimização da build é indefinida. Se não definida, o Intlayer habilitará a otimização da build durante o build da sua aplicação (vite / nextjs / etc). Definir como `true` forçará a otimização da build, mesmo no modo de desenvolvimento. Definir como `false` desativará a otimização da build.
  - _Nota_ : Quando ativado, o Intlayer substituirá todas as chamadas de dicionários para otimizar a divisão em chunks. Dessa forma, o pacote final importará apenas os dicionários que são usados. Todas as importações permanecerão como importações estáticas para evitar processamento assíncrono ao carregar os dicionários.
  - _Nota_ : O Intlayer substituirá todas as chamadas de `useIntlayer` pelo modo definido pela opção `importMode` e `getIntlayer` por `getDictionary`.
  - _Nota_ : Esta opção depende dos plugins `@intlayer/babel` e `@intlayer/swc`.
  - _Nota_ : Certifique-se de que todas as chaves sejam declaradas estaticamente nas chamadas de `useIntlayer`. Exemplo: `useIntlayer('navbar')`.

- **importMode** :
  - _Tipo_ : `'static' | 'dynamic' | 'fetch'`
  - _Padrão_ : `'static'`
  - _Descrição_ : Controla como os dicionários são importados.
  - _Exemplo_ : `'dynamic'`
  - _Nota_ : Modos disponíveis:
    - "static": Os dicionários são importados estaticamente. Substitui `useIntlayer` por `useDictionary`.
    - "dynamic": Os dicionários são importados dinamicamente usando Suspense. Substitui `useIntlayer` por `useDictionaryDynamic`.
  - _Nota_: O formato de saída dos dicionários.

- **traversePattern**:
  - _Tipo_: `string[]`
  - _Padrão_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx}', '!**\/node_modules/**']`
  - _Descrição_: Padrões que definem quais arquivos devem ser percorridos durante a otimização.
    - _Exemplo_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Nota_: Use isso para limitar a otimização aos arquivos de código relevantes e melhorar o desempenho da compilação.
  - _Nota_: Esta opção será ignorada se `optimize` estiver desativado.
  - _Nota_: Use padrão glob.

---

### Configuração do Compilador

Configurações que controlan o compilador Intlayer, que extrai dicionários diretamente de seus componentes.

#### Propriedades

- **enabled**:
  - _Tipo_: `boolean | 'build-only'`
  - _Padrão_: `true`
  - _Descrição_: Indica se o compilador deve ser habilitado para extrair os dicionários.
  - _Exemplo_: `'build-only'`
  - _Nota_: Definir como `'build-only'` pulará o compilador durante o modo de desenvolvimento para acelerar os tempos de inicialização. Ele será executado apenas em comandos de build.

- **dictionaryKeyPrefix**:
  - _Tipo_: `string`
  - _Padrão_: `''`
  - _Descrição_: Prefixo para as chaves de dicionário extraídas.
  - _Exemplo_: `'my-key-'`
  - _Nota_: Quando os dicionários são extraídos, a chave é gerada com base no nome do arquivo. Este prefixo é adicionado à chave gerada para evitar conflitos.

- **saveComponents**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Indica se os componentes devem ser salvos após serem transformados.
  - _Nota_: Se verdadeiro, o compilador substituirá os arquivos originais pelos arquivos transformados. Dessa forma, o compilador pode ser executado apenas uma vez para transformar o app e depois pode ser removido.

- **transformPattern**:
  - _Tipo_: `string | string[]`
  - _Padrão_: `['**/*.{ts,tsx,jsx,js,cjs,mjs,svelte,vue}', '!**/node_modules/**']`
  - _Descrição_: Padrões que definem quais arquivos devem ser percorridos durante a otimização.
  - _Exemplo_: `['src/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _Nota_: Use isso para limitar a otimização aos arquivos de código relevantes e melhorar o desempenho da construção.

- **excludePattern**:
  - _Tipo_: `string | string[]`
  - _Padrão_: `['**/node_modules/**']`
  - _Descrição_: Padrões que definem quais arquivos devem ser excluídos durante a otimização.
  - _Exemplo_: `['**/node_modules/**', '!**/node_modules/react/**']`

- **output**:
  - _Tipo_: `FilePathPattern`
  - _Padrão_: `undefined`
  - _Descrição_: Define o caminho dos arquivos de saída. Substitui `outputDir`. Manipula variáveis dinâmicas por meio de strings de modelo ou uma função. Variáveis suportadas: `{{fileName}}`, `{{key}}`, `{{locale}}`, `{{extension}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{format}}`, `{{componentFormat}}` e `{{componentDirPath}}`.
  - _Nota_: Os caminhos `./` são resolvidos em relação ao diretório do componente. Os caminhos `/` são resolvidos em relação à raiz do projeto (`baseDir`).
  - _Nota_: A inserção da variável `{{locale}}` no caminho ativará a geração de dicionários separados por idioma.
  - _Exemplo_:
    - **Arquivo multilíngue próximo ao componente** :
    - String: `'./{{fileName}}{{extension}}'`
    - Função: `({ fileName, extension }) => \`./${fileName}${extension}\``

    - **Arquivos JSON centralizados por idioma** :
    - String: `'/locales/{{locale}}/{{key}}.content.json'`
    - Função: `({ key, locale }) => \`/locales/${locale}/${key}.content.json\``

- **noMetadata**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Indica se os metadados devem ser salvos no arquivo. Se verdadeiro, o compilador não salvará os metadados dos dicionários (chave, wrapper de conteúdo). Útil para saídas JSON i18next ou ICU MessageFormat por localidade.
  - _Nota_: Útil se usado com o plugin `loadJSON`.
  - _Exemplo_:
    Se `true` :
    ```json
    {
      "key": "value"
    }
    ```
    Se `false` :
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```
