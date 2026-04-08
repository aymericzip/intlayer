---
createdAt: 2024-08-13
updatedAt: 2026-04-08
title: Configuração (Configuration)
description: Saiba como configurar o Intlayer para a sua aplicação. Entenda as várias configurações e opções disponíveis para personalizar o Intlayer conforme as suas necessidades.
keywords:
  - Configuração
  - Definições
  - Personalização
  - Intlayer
  - Opções
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "Adicionadas as opções `prune` e `minify` à configuração de build"
  - version: 8.7.0
    date: 2026-04-03
    changes: "Adicionada a opção `currentDomain`"
  - version: 8.4.0
    date: 2026-03-20
    changes: "Adicionada notação de objeto por localidade para 'compiler.output' e 'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "Movido 'baseDir' da configuração 'content' para a configuração 'system'"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Atualizadas as opções do compilador, adicionado suporte para 'output' e 'noMetadata'"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Atualizadas as opções do compilador"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Adicionada opção do compilador 'build-only' e prefixo do dicionário"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Adicionado suporte para provedores Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face e Together.ai"
  - version: 8.0.5
    date: 2026-02-06
    changes: "Adicionado `dataSerialization` à configuração de IA"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Renomeado o modo de importação `live` para `fetch` para descrever melhor o mecanismo subjacente."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Movida a configuração de build `importMode` para a configuração `dictionary`."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Adicionada a opção `rewrite` à configuração de roteamento"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Separada a configuração do sistema da configuração de conteúdo. Movidos os caminhos internos para a propriedade `system`. Adicionado `codeDir` para separar os arquivos de conteúdo da transformação de código."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Adicionadas as opções de dicionário `location` e `schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Adicionado suporte para os formatos de arquivo JSON5 e JSONC"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Adicionada a opção `buildMode`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Adicionada a configuração `dictionary`"
  - version: 7.0.0
    date: 2025-10-21
    changes: "Substituído `middleware` pela configuração `routing`"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Adicionada a opção `formatCommand`"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Atualizada a opção `excludedPath`"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Adicionada a opção `outputFormat`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Removido o campo `dictionaryOutput` e o campo `i18nextResourcesDir`"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Adicionado o modo de importação `live`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Substituído o campo `hotReload` por `liveSync` e adicionados os campos `liveSyncPort` e `liveSyncURL`"
  - version: 5.6.1
    date: 2025-07-25
    changes: "Substituído `activateDynamicImport` pela opção `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Alterado o `contentDir` padrão de `['src']` para `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "Adicionados os comandos `docs`"
---

# Documentação de Configuração do Intlayer

## Visão Geral

Os arquivos de configuração do Intlayer permitem que você personalize vários aspetos do plugin, como internacionalização, middleware e gestão de conteúdo. Este documento fornece uma descrição detalhada de cada propriedade na configuração.

---

## Índice

<TOC/>

---

## Suporte de Ficheiros de Configuração

O Intlayer aceita os formatos de ficheiro de configuração JSON, JS, MJS e TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Exemplo de Ficheiro de Configuração

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Exemplo de ficheiro de configuração do Intlayer que mostra todas as opções disponíveis.
 */
const config: IntlayerConfig = {
  /**
   * Configuração para as definições de internacionalização.
   */
  internationalization: {
    /**
     * Lista de idiomas suportados na aplicação.
     * Padrão: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Lista de idiomas obrigatórios que devem ser definidos em cada dicionário.
     * Se vazio, todos os idiomas são obrigatórios no modo `strict`.
     * Padrão: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Nível de severidade para o conteúdo internacionalizado.
     * - "strict": Erro se faltar um idioma declarado ou se não estiver declarado.
     * - "inclusive": Aviso se faltar um idioma declarado.
     * - "loose": Aceita qualquer idioma existente.
     * Padrão: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Idioma padrão usado como fallback se o idioma solicitado não for encontrado.
     * Padrão: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Configurações que controlam as operações do dicionário e o comportamento de fallback.
   */
  dictionary: {
    /**
     * Controla como os dicionários são importados.
     * - "static": Importado estaticamente no momento da build.
     * - "dynamic": Importado dinamicamente usando Suspense.
     * - "fetch": Recuperado dinamicamente através da API Live Sync.
     * Padrão: "static"
     */
    importMode: "static",

    /**
     * Estratégia para o preenchimento automático de traduções em falta usando IA.
     * Pode ser um booleano ou um padrão de caminho para armazenar o conteúdo preenchido.
     * Padrão: true
     */
    fill: true,

    /**
     * Localização física dos ficheiros do dicionário.
     * - "local": Armazenado no sistema de ficheiros local.
     * - "remote": Armazenado no Intlayer CMS.
     * - "hybrid": Armazenado no sistema de ficheiros local e no Intlayer CMS.
     * - "plugin" (ou qualquer string personalizada): Fornecido por um plugin ou fonte personalizada.
     * Padrão: "local"
     */
    location: "local",

    /**
     * Se deve transformar automaticamente os conteúdos (ex: Markdown para HTML).
     * Padrão: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Configuração de roteamento e middleware.
   */
  routing: {
    /**
     * Estratégia de roteamento de idiomas.
     * - "prefix-no-default": Prefixo para todos exceto o idioma padrão (ex: /dashboard, /fr/dashboard).
     * - "prefix-all": Prefixo para todos os idiomas (ex: /en/dashboard, /fr/dashboard).
     * - "no-prefix": Sem idioma no URL.
     * - "search-params": Usa ?locale=...
     * Padrão: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Onde armazenar o idioma selecionado pelo utilizador.
     * Opções: 'cookie', 'localStorage', 'sessionStorage', 'header', ou um array destes.
     * Padrão: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Caminho base para os URLs da aplicação.
     * Padrão: ""
     */
    basePath: "",

    /**
     * Regras de reescrita de URL personalizadas para caminhos específicos de idioma.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * Mapeia idiomas para nomes de host de domínio para roteamento baseado em domínio.
     * URLs para estes idiomas serão absolutos (ex: https://intlayer.cn/).
     * O domínio implica le idioma, portanto não é adicionado prefixo de idioma ao caminho.
     * Padrão: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * Configurações para encontrar e processar ficheiros de conteúdo.
   */
  content: {
    /**
     * Extensões de ficheiro a analisar para dicionários.
     * Padrão: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Diretórios onde os ficheiros .content residem.
     * Padrão: ["."]
     */
    contentDir: ["src"],

    /**
     * Diretório onde o código fonte reside.
     * Usado para otimização de build e transformação de código.
     * Padrão: ["."]
     */
    codeDir: ["src"],

    /**
     * Padrões a excluir da análise.
     * Padrão: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Se deve monitorizar alterações e regenerar dicionários durante o desenvolvimento.
     * Padrão: true em desenvolvimento
     */
    watch: true,

    /**
     * Comando para formatar ficheiros .content recém-criados / atualizados.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Configuração do Visual Editor.
   */
  editor: {
    /**
     * Se o visual editor está ativado.
     * Padrão: false
     */
    enabled: true,

    /**
     * URL da sua aplicação para validação de origem.
     * Padrão: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Porta para o servidor local do editor.
     * Padrão: 8000
     */
    port: 8000,

    /**
     * URL pública para o editor.
     * Padrão: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL do Intlayer CMS.
     * Padrão: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL da API do backend.
     * Padrão: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Se deve ativar a sincronização de conteúdo em tempo real.
     * Padrão: false
     */
    liveSync: true,
  },

  /**
   * Definições de tradução e geração assistida por IA.
   */
  ai: {
    /**
     * Provedor de IA a utilizar.
     * Opções: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Padrão: 'openai'
     */
    provider: "openai",

    /**
     * Modelo a utilizar do provedor selecionado.
     */
    model: "gpt-4o",

    /**
     * Chave da API do provedor.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Contexto global para guiar a IA na geração de traduções.
     */
    applicationContext: "Esta é uma aplicação de reserva de viagens.",

    /**
     * URL base para a API de IA.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serialização de dados
     *
     * Opções:
     * - "json": Padrão, fiável; consome mais tokens.
     * - "toon": Menos tokens, menos consistente que JSON.
     *
     * Padrão: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Configurações de build e otimização.
   */
  build: {
    /**
     * Modo de execução da build.
     * - "auto": Build automática durante a build da app.
     * - "manual": Requer um comando de build explícito.
     * Padrão: "auto"
     */
    mode: "auto",

    /**
     * Se deve otimizar o bundle final removendo dicionários não utilizados.
     * Padrão: true em produção
     */
    optimize: true,

    /**
     * Minifica os dicionários para reduzir o tamanho do bundle.
     * Padrão: true
     *
     * Nota:
     * - Esta opção será ignorada se `optimize` estiver desativada.
     * - Esta opção será ignorada se `editor.enabled` for true.
     */
    minify: true,

    /**
     * Purga as chaves não utilizadas nos dicionários.
     * Padrão: true
     *
     * Nota:
     * - Esta opção será ignorada se `optimize` estiver desativada.
     */
    purge: true,

    /**
     * Formato de saída para os ficheiros de dicionário gerados.
     * Padrão: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Indica se a build deve verificar os tipos TypeScript.
     * Padrão: false
     */
    checkTypes: false,
  },

  /**
   * Configuração do Logger.
   */
  log: {
    /**
     * Nível de registo.
     * - "default": Registo padrão.
     * - "verbose": Registo de depuração detalhado.
     * - "disabled": Sem registo.
     * Padrão: "default"
     */
    mode: "default",

    /**
     * Prefixo para todas as mensagens de registo.
     * Padrão: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Configuração do Sistema (Casos de uso avançados)
   */
  system: {
    /**
     * Diretório para armazenar dicionários localizados.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Diretório para a "module augmentation".
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Diretório para armazenar dicionários não fundidos.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Diretório para armazenar tipos de dicionário.
     */
    typesDir: ".intlayer/types",

    /**
     * Diretório onde os ficheiros principais da aplicação estão armazenados.
     */
    mainDir: ".intlayer/main",

    /**
     * Diretório onde os ficheiros de configuração estão armazenados.
     */
    configDir: ".intlayer/config",

    /**
     * Diretório onde os ficheiros de cache estão armazenados.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Configuração do Compilador (Casos de uso avançados)
   */
  compiler: {
    /**
     * Indica se o compilador deve estar ativado.
     *
     * - false: Desativar compilador.
     * - true: Ativar compilador.
     * - "build-only": Ignorar o compilador durante o desenvolvimento para acelerar o arranque.
     *
     * Padrão: false
     */
    enabled: true,

    /**
     * Define o caminho para os ficheiros de saída. Substitui `outputDir`.
     *
     * - Caminhos `./` são resolvidos relativamente ao diretório da componente.
     * - Caminhos `/` são resolvidos relativamente à raiz do projeto (`baseDir`).
     *
     * - Incluir a variável `{{locale}}` no caminho irá ativar a geração de dicionários separados por idioma.
     *
     * Exemplo:
     * ```ts
     * {
     *   // Criar ficheiros .content.ts multi-idioma perto da componente
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Equivalente usando template string
     * }
     * ```
     *
     * ```ts
     * {
     *   // Criar JSONs centralizados por idioma na raiz do projeto
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalente usando template string
     * }
     * ```
     *
     * Lista de variáveis:
     *   - `fileName`: O nome do ficheiro.
     *   - `key`: A chave do conteúdo.
     *   - `locale`: O idioma do conteúdo.
     *   - `extension`: A extensão do ficheiro.
     *   - `componentFileName`: O nome do ficheiro da componente.
     *   - `componentExtension`: A extensão do ficheiro da componente.
     *   - `format`: O formato do dicionário.
     *   - `componentFormat`: O formato do dicionário da componente.
     *   - `componentDirPath`: O caminho do diretório da componente.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Se deve guardar as componentes após serem transformadas.
     *
     * - Se `true`, o compilador reescreverá o arquivo do componente no disco. Portanto, a transformação será permanente, e o compilador pulará a transformação para o próximo processo. Dessa forma, o compilador pode transformar o app, e então pode ser removido.
     *
     * - Se `false`, o compilador injetará a chamada da função `useIntlayer()` no código apenas na saída da build, e manterá a base de código original intacta. A transformação será feita apenas em memória.
     */
    saveComponents: false,

    /**
     * Inserir apenas o conteúdo no ficheiro gerado. Útil para saídas i18next ou ICU MessageFormat JSON por idioma.
     */
    noMetadata: false,

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "", // Adicionar prefixo opcional para as chaves de dicionário extraídas
  },

  /**
   * Esquemas personalizados para validar o conteúdo dos dicionários.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Configuração de plugins.
   */
  plugins: [],
};

export default config;
````

---

## Referência de Configuração

As secções seguintes descrevem as várias definições de configuração disponíveis para o Intlayer.

---

### Configuração de Internacionalização

Define as definições relacionadas com a internacionalização, incluindo os idiomas disponíveis e o idioma padrão para a aplicação.

| Campo             | Descrição                                                                           | Tipo       | Padrão              | Exemplo              | Nota                                                                                                                                                                                                                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | A lista de idiomas suportados na aplicação.                                         | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                     |
| `requiredLocales` | A lista de idiomas obrigatórios na aplicação.                                       | `string[]` | `[]`                | `[]`                 | • Se vazio, todos os idiomas são obrigatórios no modo `strict`.<br/>• Certifique-se de que os idiomas obrigatórios também estão definidos no campo `locales`.                                                                                                                                       |
| `strictMode`      | Garante implementações robustas de conteúdos internacionalizados usando TypeScript. | `string`   | `'inclusive'`       |                      | • Se `"strict"`: a função `t` exige que cada idioma declarado esteja definido — lança um erro se faltar algum ou se não estiver declarado.<br/>• Se `"inclusive"`: avisa sobre idiomas em falta mas aceita idiomas existentes não declarados.<br/>• Se `"loose"`: aceita qualquer idioma existente. |
| `defaultLocale`   | O idioma padrão usado como fallback se o idioma solicitado não for encontrado.      | `string`   | `Locales.ENGLISH`   | `'en'`               | Usado para determinar o idioma quando nenhum é especificado no URL, cookie ou cabeçalho.                                                                                                                                                                                                            |

---

### Configuração do Editor

Define as definições para o editor visual integrado, incluindo a porta do servidor e o estado de ativação.

| Campo                        | Descrição                                                                                                                                                              | Tipo                              | Padrão                              | Exemplo                                                                                         | Nota                                                                                                                                                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | O URL da aplicação.                                                                                                                                                    | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Usado para restringir a origem do editor por razões de segurança.<br/>• Se definido para `'*'`, o editor é acessível a partir de qualquer origem.                                                                                               |
| `port`                       | A porta usada pelo servidor do editor visual.                                                                                                                          | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                                   |
| `editorURL`                  | O URL do servidor do editor.                                                                                                                                           | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Usado para restringir as origens que podem interagir com a aplicação.<br/>• Se definido para `'*'`, acessível de qualquer origem.<br/>• Deve ser definido se a porta for alterada ou se o editor for alojado num domínio diferente.             |
| `cmsURL`                     | O URL do Intlayer CMS.                                                                                                                                                 | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                                   |
| `backendURL`                 | O URL do servidor backend.                                                                                                                                             | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                                   |
| `enabled`                    | Se a aplicação interage com o editor visual.                                                                                                                           | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • Se `false`, o editor não pode interagir com a aplicação.<br/>• Desativar para ambientes específicos aumenta a segurança.                                                                                                                        |
| `clientId`                   | Permite que pacotes intlayer se autentiquem com o backend usando oAuth2. Para obter um token de acesso, vá a [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Para ser mantido secreto; armazenar em variáveis de ambiente.                                                                                                                                                                                     |
| `clientSecret`               | Permite que pacotes intlayer se autentiquem com o backend usando oAuth2. Para obter um token de acesso, vá a [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Para ser mantido secreto; armazenar em variáveis de ambiente.                                                                                                                                                                                     |
| `dictionaryPriorityStrategy` | Estratégia para priorizar dicionários quando tanto locais como remotos estão presentes.                                                                                | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: dá prioridade aos remotos sobre os locais.<br/>• `'local_first'`: dá prioridade aos locais sobre os remotos.                                                                                                                 |
| `liveSync`                   | Se o servidor da app deve recarregar conteúdos dinamicamente quando uma alteração é detetada no CMS <br/> Visual Editor <br/> Backend.                                 | `boolean`                         | `true`                              | `true`                                                                                          | • Quando um dicionário é adicionado/atualizado, a app atualiza o conteúdo da página.<br/>• O Live Sync externaliza o conteúdo num outro servidor, o que pode afetar ligeiramente o desempenho.<br/>• Recomendado hospedar ambos na mesma máquina. |
| `liveSyncPort`               | A porta do servidor de live sync.                                                                                                                                      | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                                   |
| `liveSyncURL`                | O URL do servidor de live sync.                                                                                                                                        | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Aponta para o localhost por padrão; pode ser alterado para um servidor de live sync remoto.                                                                                                                                                       |

---

### Configuração de Roteamento

Definições que controlam o comportamento do roteamento, incluindo estrutura de URL, armazenamento de idiomas e gestão de middleware.

| Campo      | Descrição                                                                                                                                                                                                               | Tipo                                                                                                                                                                                                         | Padrão                 | Exemplo                                                                                                                                                                                     | Nota                                                                                                                                                                                                                                                                                                    |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | Modo de roteamento de URL para a gestão de idiomas.                                                                                                                                                                     | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) ou `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: idioma gerido por outros meios. `'search-params'`: `/dashboard?locale=fr` | Não afeta a gestão de cookies ou armazenamento de idiomas.                                                                                                                                                                                                                                              |
| `storage`  | Configuração para o armazenamento do idioma no cliente.                                                                                                                                                                 | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                          | Veja a tabela de Opções de Armazenamento abaixo.                                                                                                                                                                                                                                                        |
| `basePath` | O caminho base para os URLs da aplicação.                                                                                                                                                                               | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                 | Se a app está em `https://example.com/my-app`, basePath é `'/my-app'` e os URLs tornam-se `https://example.com/my-app/en`.                                                                                                                                                                              |
| `rewrite`  | Regras de reescrita de URL personalizadas que anulam o modo de roteamento padrão para caminhos específicos. Suporta parâmetros dinâmicos `[param]`.                                                                     | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Veja o exemplo abaixo                                                                                                                                                                       | • Regras de reescrita têm precedência sobre `mode`.<br/>• Funciona com Next.js e Vite.<br/>• `getLocalizedUrl()` aplica as regras correspondentes automaticamente.<br/>• Veja [Reescritas de URL Personalizadas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |
| `domains`  | Mapeia idiomas para nomes de host de domínio para roteamento baseado em domínio. Quando definido, as URLs para um idioma usam esse domínio como base (URL absoluta) e nenhum prefixo de idioma é adicionado ao caminho. | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                 | • O protocolo padrão é `https://` quando não incluído no nome do host.<br/>• O próprio domínio identifica o idioma, portanto nenhum prefixo `/zh/` é adicionado.<br/>• `getLocalizedUrl('/', 'zh')` retorna `https://intlayer.zh/`.                                                                     |

**Exemplo de `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Estratégia de fallback
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
}
```

#### Opções de Armazenamento

| Valor              | Nota                                                                                                                                                                                                             | Descrição                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `'cookie'`         | • Para conformidade com o RGPD, assegure-se do consentimento adequado do utilizador.<br/>• Personalizável via `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).  | Armazena o idioma em cookies — acessível tanto no cliente como no servidor.   |
| `'localStorage'`   | • Sem expiração a menos que seja explicitamente limpo.<br/>• O proxy do Intlayer não consegue aceder a isto.<br/>• Personalizzabile via `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`). | Armazena o idioma no browser sem expiração — apenas lado do cliente.          |
| `'sessionStorage'` | • Limpo quando o separador/janela é fechado.<br/>• O proxy do Intlayer não consegue aceder a isto.<br/>• Personalizzabile via `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).         | Armazena o idioma pela duração da sessão da página — apenas lado do cliente.  |
| `'header'`         | • Útil para chamadas de API.<br/>• Lado do cliente não consegue aceder.<br/>• Personalizzabile via `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                            | Armazena ou transmite o idioma via cabeçalhos HTTP — apenas lado do servidor. |

#### Atributos de Cookies

Ao usar armazenamento por cookies, pode configurar atributos adicionais:

| Campo      | Descrição                                      | Tipo                                                  |
| ---------- | ---------------------------------------------- | ----------------------------------------------------- |
| `name`     | Nome do cookie. Padrão: `'INTLAYER_LOCALE'`    | `string`                                              |
| `domain`   | Domínio do cookie. Padrão: `undefined`         | `string`                                              |
| `path`     | Caminho do cookie. Padrão: `undefined`         | `string`                                              |
| `secure`   | Requer HTTPS. Padrão: `undefined`              | `boolean`                                             |
| `httpOnly` | Flag HTTP-only. Padrão: `undefined`            | `boolean`                                             |
| `sameSite` | Política SameSite.                             | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | Data de expiração ou dias. Padrão: `undefined` | `Date` &#124; <br/> `number`                          |

#### Atributos de Armazenamento Local

Ao usar localStorage ou sessionStorage:

| Campo  | Descrição                                                   | Tipo                                             |
| ------ | ----------------------------------------------------------- | ------------------------------------------------ |
| `type` | Tipo de armazenamento.                                      | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | Nome da chave de armazenamento. Padrão: `'INTLAYER_LOCALE'` | `string`                                         |

#### Exemplos de Configuração

Aqui estão alguns exemplos de configuração comuns para a nova estrutura de roteamento v7:

**Configuração Básica (Padrão)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
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

**Configuração em Conformidade com o RGPD**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
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

**Modo de Parâmetros de Pesquisa**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
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
    locales: ["en", "fr", "es"],
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

**Reescrita de URL Personalizada com Caminhos Dinâmicos**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Fallback para caminhos não reescritos
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

Definições relacionadas à forma como o conteúdo é gerido dentro da aplicação, incluindo nomes de diretórios, extensões de ficheiro e configurações derivadas.

| Campo            | Descrição                                                                                                            | Tipo       | Padrão                                                                                                                                                                    | Exemplo                                                                                                                                                                               | Nota                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `watch`          | Indica se o Intlayer deve monitorizar alterações nos ficheiros de declaração de conteúdo para regenerar dicionários. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                  |
| `fileExtensions` | Extensões de ficheiro para analisar ao compilar dicionários.                                                         | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Personalizar pode ajudar a evitar conflitos.                                                                                                     |
| `contentDir`     | O caminho do diretório onde os ficheiros de definição de conteúdo (`.content.*`) estão armazenados.                  | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | Usado para monitorizar ficheiros de conteúdo e regenerar dicionários.                                                                            |
| `codeDir`        | O caminho do diretório onde o código está armazenado, relativo ao diretório base.                                    | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Usado para monitorizar ficheiros de código para transformação (pruning, otimização).<br/>• Separar de `contentDir` pode melhorar o desempenho. |
| `excludedPath`   | Diretórios excluídos da análise de conteúdo.                                                                         | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Ainda não utilizado; planeado para implementação futura.                                                                                         |
| `formatCommand`  | Comando para formatar ficheiros de conteúdo quando o Intlayer os escreve localmente.                                 | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` é substituído pelo caminho do ficheiro.<br/>• Se não definido, o Intlayer deteta automaticamente (testa prettier, biome, eslint).   |

---

### Configuração do Dicionário

Parâmetros que controlam as operações do dicionário, incluindo o comportamento de preenchimento automático (auto-fill) e geração de conteúdo.

| Campo                       | Descrição                                                                                                                                              | Tipo                                                                                                            | Padrão      | Exemplo                                                                                     | Nota                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | Controla como os ficheiros de saída do preenchimento automático (tradução por IA) são gerados.                                                         | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`      | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: caminho padrão (mesmo ficheiro que a origem).<br/>• `false`: desativar.<br/>• Padrão string/função gera ficheiros por idioma.<br/>• Objeto por idioma: cada idioma corresponde ao seu próprio padrão; `false` ignora esse idioma.<br/>• Incluir `{{locale}}` ativa a geração por idioma.<br/>• `fill` ao nível do dicionário tem sempre precedência sobre esta definição global.              |
| `description`               | Ajuda o editor e o CMS a compreender o propósito do dicionário. Também usado como contexto para a geração de traduções assistida por IA.               | `string`                                                                                                        | `undefined` | `'Secção do perfil do utilizador'`                                                          |                                                                                                                                                                                                                                                                                                                                                                                                         |
| `locale`                    | Transforma o dicionário num formato por idioma. Cada campo declarado torna-se um nó de tradução. Se ausente, o dicionário é tratado como multi-idioma. | `LocalesValues`                                                                                                 | `undefined` | `'en'`                                                                                      | Use isto quando o dicionário for específico de um único idioma em vez de conter traduções para vários.                                                                                                                                                                                                                                                                                                  |
| `contentAutoTransformation` | Transforma automaticamente as strings de conteúdo em nós tipados (markdown, HTML ou inserção).                                                         | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`     | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')`.<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')`.<br/>• Inserção : `Olá {{name}}` → `insert('Olá {{name}}')`.                                                                                                                                                                                                                                 |
| `location`                  | Indica onde os ficheiros do dicionário estão armazenados e como são sincronizados com o CMS.                                                           | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`   | `'hybrid'`                                                                                  | • `'local'`: gerido apenas localmente.<br/>• `'remote'`: gerido apenas remotamente (CMS).<br/>• `'hybrid'`: gerido local e remotamente.<br/>• `'plugin'` ou string personalizada: gerido por um plugin ou fonte personalizada.                                                                                                                                                                          |
| `importMode`                | Controla como os dicionários são importados.                                                                                                           | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`  | `'dynamic'`                                                                                 | • `'static'`: importado estaticamente.<br/>• `'dynamic'`: importado dinamicamente usando Suspense.<br/>• `'fetch'`: recuperado via Live Sync API; fallback para `'dynamic'` se falhar.<br/>• Requer plugins `@intlayer/babel` e `@intlayer/swc`.<br/>• Chaves devem ser declaradas estaticamente.<br/>• Ignorado se `optimize` estiver desativado.<br/>• Não afeta `getIntlayer`, `getDictionary`, etc. |
| `priority`                  | Prioridade do dicionário. Valores mais altos vencem valores mais baixos na resolução de conflitos entre dicionários.                                   | `number`                                                                                                        | `undefined` | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                         |
| `live`                      | Depreciado — use `importMode: 'fetch'` em vez disso. Indicava se o conteúdo do dicionário devia ser recuperado dinamicamente via API Live Sync.        | `boolean`                                                                                                       | `undefined` |                                                                                             | Renomeado para `importMode: 'fetch'` na v8.0.0.                                                                                                                                                                                                                                                                                                                                                         |
| `schema`                    | Gerado automaticamente pelo Intlayer para validação de esquema JSON.                                                                                   | `'https://intlayer.org/schema.json'`                                                                            | auto-gerado |                                                                                             | Não editar manualmente.                                                                                                                                                                                                                                                                                                                                                                                 |
| `title`                     | Ajuda a identificar o dicionário no editor e CMS.                                                                                                      | `string`                                                                                                        | `undefined` | `'Perfil do Utilizador'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                         |
| `tags`                      | Categoriza dicionários e fornece contexto ou instruções para o editor e IA.                                                                            | `string[]`                                                                                                      | `undefined` | `['utilizador', 'perfil']`                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                         |
| `version`                   | Versão do dicionário remoto; ajuda a rastrear a versão atualmente em uso.                                                                              | `string`                                                                                                        | `undefined` | `'1.0.0'`                                                                                   | • Gestível no CMS.<br/>• Não editar localmente.                                                                                                                                                                                                                                                                                                                                                         |

**Exemplo de `fill`**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### Configuração do Logger

Definições para personalizar a saída de logs do Intlayer.

| Campo    | Descrição                               | Tipo                                                           | Padrão          | Exemplo            | Nota                                                                                                         |
| -------- | --------------------------------------- | -------------------------------------------------------------- | --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `mode`   | Indica o modo do logger.                | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`        | • `'verbose'`: regista mais informações para depuração.<br/>• `'disabled'`: desativa o logger completamente. |
| `prefix` | O prefixo para as mensagens de registo. | `string`                                                       | `'[intlayer] '` | `'[meu prefixo] '` |                                                                                                              |

---

### Configuração de IA

Configurações que controlam as funcionalidades de IA do Intlayer, incluindo provedor, modelo e chave de API.

Esta configuração é opcional se estiver registado no [Dashboard do Intlayer](https://app.intlayer.org/project) com uma chave de acesso. O Intlayer gerirá automaticamente a solução de IA mais eficiente e económica para as suas necessidades. O uso das opções padrão garante uma melhor manutenibilidade a longo prazo, uma vez que o Intlayer é continuamente atualizado para utilizar os modelos mais relevantes.

Se preferir utilizar a sua própria chave de API ou um modelo específico, pode definir a sua configuração de IA personalizada.
Esta configuração de IA será utilizada globalmente no seu ambiente Intlayer. Os comandos da CLI utilizarão estas definições por defeito para comandos como `fill`, assim como o SDK, o Visual Editor e o CMS. Pode substituir estes valores predefinidos para casos de uso específicos através de parâmetros de comando.

O Intlayer suporta múltiplos provedores de IA para máxima flexibilidade. Os provedores atualmente suportados são:

- **OpenAI** (Padrão)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| Campo                | Descrição                                                                                                                             | Tipo                                                                                                                                                                                                                                                                                                                                                                                           | Padrão      | Exemplo                                                       | Nota                                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | O provedor a utilizar para as funcionalidades de IA do Intlayer.                                                                      | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | Diferentes provedores requerem diferentes chaves de API e têm preços diferentes.                                                                                                                      |
| `model`              | O modelo a utilizar para as funcionalidades de IA.                                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Nenhum      | `'gpt-4o-2024-11-20'`                                         | O modelo específico varia de acordo com o provedor.                                                                                                                                                   |
| `temperature`        | Controla a aleatoriedade das respostas da IA.                                                                                         | `number`                                                                                                                                                                                                                                                                                                                                                                                       | Nenhum      | `0.1`                                                         | Temperatura mais alta = mais criativo e menos previsível.                                                                                                                                             |
| `apiKey`             | A sua chave de API para o provedor selecionado.                                                                                       | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Nenhum      | `process.env.OPENAI_API_KEY`                                  | Para ser mantido secreto; armazenar em variáveis de ambiente.                                                                                                                                         |
| `applicationContext` | Contexto adicional sobre a sua aplicação para ajudar a IA a gerar traduções mais precisas (domínio, público-alvo, tom, terminologia). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Nenhum      | `'O meu contexto de aplicação'`                               | Pode ser usado para adicionar regras (ex: `"Não deves transformar os URLs"`).                                                                                                                         |
| `baseURL`            | O URL base para a API de IA.                                                                                                          | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Nenhum      | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Pode apontar para um endpoint de API de IA local ou personalizado.                                                                                                                                    |
| `dataSerialization`  | Formato de serialização de dados para as funcionalidades de IA.                                                                       | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: padrão, fiável; consome mais tokens.<br/>• `'toon'`: menos tokens, menos consistente.<br/>• Parâmetros adicionais são passados para o modelo como contexto (esforço de raciocínio, etc.). |

---

### Configuração de Build

Parâmetros que controlam como o Intlayer otimiza e compila a internacionalização da sua aplicação.

As opções de build aplicam-se aos plugins `@intlayer/babel` e `@intlayer/swc`.

> No modo de desenvolvimento, o Intlayer utiliza importações estáticas para os dicionários para simplificar a experiência de desenvolvimento.

> Durante a otimização, o Intlayer substituirá as chamadas aos dicionários para otimizar o chunking, de forma a que o bundle final importe apenas os dicionários efetivamente utilizados.

| Campo             | Descrição                                                              | Tipo                             | Padrão                                                                                                                                                                            | Exemplo                                                                       | Nota                                                                                                                                                                                                                                                                                               |
| ----------------- | ---------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Controla o modo de build.                                              | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: build acionada automaticamente durante a build da app.<br/>• `'manual'`: executada apenas quando o comando de build é explicitamente chamado.<br/>• Pode ser usado para desativar builds de dicionários (ex: para evitar a execução em ambientes Node.js).                             |
| `optimize`        | Controla se a build deve ser otimizada.                                | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Se não definido, a otimização é acionada na build da framework (Vite/Next.js).<br/>• `true` força a otimização mesmo no modo dev.<br/>• `false` desativa-a.<br/>• Se ativo, substitui chamadas a dicionários para otimizar o chunking.<br/>• Requer plugins `@intlayer/babel` e `@intlayer/swc`. |
| `minify`          | Minifica os dicionários para reduzir o tamanho do bundle.              | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • Indica se o bundle deve ser minificado.<br/>• Padrão: `true` em produção.<br/>• Esta opção será ignorada se `optimize` estiver desativada.<br/>• Esta opção será ignorada se `editor.enabled` for true.                                                                                          |
| `purge`           | Purga as chaves não utilizadas nos dicionários.                        | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • Indica se o bundle deve ser limpo.<br/>• Padrão: `true` em produção.<br/>• Esta opção será ignorada se `optimize` estiver desativada.                                                                                                                                                            |
| `checkTypes`      | Indica se a build deve verificar os tipos TypeScript e registar erros. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Pode tornar o processo de build mais lento.                                                                                                                                                                                                                                                        |
| `outputFormat`    | Controla o formato de saída dos dicionários.                           | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                    |
| `traversePattern` | Padrões que definem quais ficheiros percorrer durante a otimização.    | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Limite a otimização a ficheiros relevantes para melhorar o desempenho da build.<br/>• Ignorado se `optimize` estiver desativado.<br/>• Utiliza padrões glob.                                                                                                                                     |

---

### Configuração do Sistema

Estas definições são para casos de uso avançados e configuração interna do Intlayer.

| Campo                     | Descrição                                            | Tipo     | Padrão                            | Exemplo | Nota |
| ------------------------- | ---------------------------------------------------- | -------- | --------------------------------- | ------- | ---- |
| `dictionariesDir`         | Diretório para dicionários compilados.               | `string` | `'.intlayer/dictionary'`          |         |      |
| `moduleAugmentationDir`   | Diretório para a augmentation de módulos TypeScript. | `string` | `'.intlayer/types'`               |         |      |
| `unmergedDictionariesDir` | Diretório para dicionários não fundidos.             | `string` | `'.intlayer/unmerged_dictionary'` |         |      |
| `typesDir`                | Diretório para tipos gerados.                        | `string` | `'.intlayer/types'`               |         |      |
| `mainDir`                 | Diretório do ficheiro principal do Intlayer.         | `string` | `'.intlayer/main'`                |         |      |
| `configDir`               | Diretório dos ficheiros de configuração compilados.  | `string` | `'.intlayer/config'`              |         |      |
| `cacheDir`                | Diretório dos ficheiros de cache.                    | `string` | `'.intlayer/cache'`               |         |      |

---

### Configuração do Compilador

Configurações que controlam o compilador do Intlayer, que extrai dicionários diretamente das suas componentes.

| Campo                 | Descrição                                                                                                                                                                                                                                                                                                                    | Tipo                                                                                                            | Padrão      | Exemplo                                                                                                                                                  | Nota                                                                                                                                                                                                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Indica se o compilador deve estar ativado para a extração de dicionários.                                                                                                                                                                                                                                                    | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` ignora o compilador durante o desenvolvimento para acelerar as builds; executado apenas nos comandos de build.                                                                                                                                                                            |
| `dictionaryKeyPrefix` | Prefixo para as chaves de dicionário extraídas.                                                                                                                                                                                                                                                                              | `string`                                                                                                        | `''`        | `'meu-prefixo-'`                                                                                                                                         | Adicionado à chave gerada (baseada no nome do ficheiro) para evitar conflitos.                                                                                                                                                                                                                           |
| `saveComponents`      | Indica se os componentes devem ser salvos após serem transformados.                                                                                                                                                                                                                                                          | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • Se `true`, o compilador reescreverá o arquivo do componente no disco. A transformação será permanente, e o compilador poderá ser removido.<br/>• Se `false`, o compilador injetará a chamada da função `useIntlayer()` no código apenas na saída da build, mantendo a base de código original intacta. |
| `output`              | Define o caminho para os ficheiros de saída. Substitui `outputDir`. Suporta variáveis de template: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • Caminhos `./` são resolvidos em relação ao diretório da componente.<br/>• Caminhos `/` em relação à raiz.<br/>• `{{locale}}` ativa a geração por idioma.<br/>• Suporta notação de objeto por idioma.                                                                                                   |
| `noMetadata`          | Se `true`, o compilador omite os metadados do dicionário (chave, wrapper de conteúdo) da saída.                                                                                                                                                                                                                              | `boolean`                                                                                                       | `false`     | `false` → `{"key":"minha-chave","content":{"key":"valor"}}` <br/> `true` → `{"key":"valor"}`                                                             | • Útil para saídas i18next ou ICU MessageFormat JSON.<br/>• Funciona bem com o plugin `loadJSON`.                                                                                                                                                                                                        |

---

### Esquemas Personalizados

| Campo     | Descrizione                                                                 | Tipo                        |
| --------- | --------------------------------------------------------------------------- | --------------------------- |
| `schemas` | Permite definir esquemas Zod para validar a estrutura dos seus dicionários. | `Record<string, ZodSchema>` |

---

### Plugins

| Campo     | Descrição                              | Tipo               |
| --------- | -------------------------------------- | ------------------ |
| `plugins` | Lista de plugins do Intlayer a ativar. | `IntlayerPlugin[]` |
