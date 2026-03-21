---
createdAt: 2024-08-13
updatedAt: 2026-03-12
title: Configuração
description: Saiba como configurar o Intlayer para seu aplicativo. Entenda as várias configurações e opções disponíveis para personalizar o Intlayer de acordo com suas necessidades.
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
  - version: 8.4.0
    date: 2026-03-20
    changes: Adicionar notação de objeto por localidade para 'compiler.output' e 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Mover 'baseDir' da configuração 'content' para 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Atualizar opções do compilador, adicionar suporte para 'output' e 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Atualizar opções do compilador
  - version: 8.1.5
    date: 2026-02-23
    changes: Adicionar opção de compilador 'build-only' e prefixo de dicionário
  - version: 8.0.6
    date: 2026-02-12
    changes: Adicionar suporte para provedores Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face e Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Adicionar `dataSerialization` à configuração de IA
  - version: 8.0.0
    date: 2026-01-24
    changes: Renomear o modo de importação `live` para `fetch` para descrever melhor o mecanismo subjacente.
  - version: 8.0.0
    date: 2026-01-22
    changes: Mover o modo de importação `importMode` da configuração de build para a configuração de dicionário.
  - version: 8.0.0
    date: 2026-01-22
    changes: Adicionar a opção `rewrite` à configuração de roteamento.
  - version: 8.0.0
    date: 2026-01-18
    changes: Separar a configuração do sistema da configuração de conteúdo. Mover caminhos internos para a propriedade `system`. Adicionar `codeDir` para separar arquivos de conteúdo da transformação de código.
  - version: 8.0.0
    date: 2026-01-18
    changes: Adicionar as opções de dicionário `location` e `schema`.
  - version: 7.5.1
    date: 2026-01-10
    changes: Adicionar suporte para formatos de arquivo JSON5 e JSONC.
  - version: 7.5.0
    date: 2025-12-17
    changes: Adicionar a opção `buildMode`.
  - version: 7.0.0
    date: 2025-10-25
    changes: Adicionar a configuração `dictionary`.
  - version: 7.0.0
    date: 2025-10-21
    changes: Substituir `middleware` pela configuração de `routing`.
  - version: 7.0.0
    date: 2025-10-12
    changes: Adicionar a opção `formatCommand`.
  - version: 6.2.0
    date: 2025-10-12
    changes: Atualizar a opção `excludedPath`.
  - version: 6.0.2
    date: 2025-09-23
    changes: Adicionar a opção `outputFormat`.
  - version: 6.0.0
    date: 2025-09-21
    changes: Remover o campo `dictionaryOutput` e o campo `i18nextResourcesDir`.
  - version: 6.0.0
    date: 2025-09-16
    changes: Adicionar o modo de importação `live`.
  - version: 6.0.0
    date: 2025-09-04
    changes: Substituir o campo `hotReload` por `liveSync` e adicionar os campos `liveSyncPort` e `liveSyncURL`.
  - version: 5.6.1
    date: 2025-07-25
    changes: Substituir `activateDynamicImport` pela opção `importMode`.
  - version: 5.6.0
    date: 2025-07-13
    changes: Alterar o contentDir padrão de `['src']` para `['.']`.
  - version: 5.5.11
    date: 2025-06-29
    changes: Adicionar comandos `docs`.
---

# Documentação de Configuração do Intlayer

## Visão Geral

Os arquivos de configuração do Intlayer permitem a personalização de vários aspectos do plugin, como internacionalização, middleware e tratamento de conteúdo. Este documento fornece uma descrição detalhada de cada propriedade na configuração.

---

## Sumário

<TOC/>

---

## Suporte a Arquivos de Configuração

O Intlayer aceita os formatos de arquivo de configuração JSON, JS, MJS e TS:

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
 * Exemplo de arquivo de configuração do Intlayer exibindo todas as opções disponíveis.
 */
const config: IntlayerConfig = {
  /**
   * Configuração das definições de internacionalização.
   */
  internationalization: {
    /**
     * Lista de localidades (locales) suportadas no aplicativo.
     * Padrão: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Lista de localidades obrigatórias que devem ser definidas em cada dicionário.
     * Se vazio, todas as localidades são obrigatórias no modo `strict`.
     * Padrão: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Nível de rigor para conteúdo internacionalizado.
     * - "strict": Erro se alguma localidade declarada estiver ausente ou se não estiver declarada.
     * - "inclusive": Aviso se uma localidade declarada estiver ausente.
     * - "loose": Aceita qualquer localidade existente.
     * Padrão: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * A localidade padrão utilizada como recurso caso a localidade solicitada não seja encontrada.
     * Padrão: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Configurações que controlam as operações de dicionário e o comportamento de fallback.
   */
  dictionary: {
    /**
     * Controla como os dicionários são importados.
     * - "static": Importado estaticamente no momento da compilação.
     * - "dynamic": Importado dinamicamente usando Suspense.
     * - "fetch": Recuperado dinamicamente através da API Live Sync.
     * Padrão: "static"
     */
    importMode: "static",

    /**
     * Estratégia para preencher automaticamente as traduções ausentes usando IA.
     * Pode ser um valor booleano ou um padrão de caminho para salvar o conteúdo preenchido.
     * Padrão: true
     */
    fill: true,

    /**
     * Localização física dos arquivos de dicionário.
     * - "local": Armazenado no sistema de arquivos local.
     * - "remote": Armazenado no CMS do Intlayer.
     * - "hybrid": Armazenado localmente e no CMS do Intlayer.
     * - "plugin" (ou qualquer string personalizada): Fornecido por um plugin ou fonte personalizada.
     * Padrão: "local"
     */
    location: "local",

    /**
     * Se o conteúdo deve ser transformado automaticamente (ex: Markdown para HTML).
     * Padrão: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Configuração de roteamento e middleware.
   */
  routing: {
    /**
     * Estratégia de roteamento de localidade.
     * - "prefix-no-default": Prefixa todos, exceto a localidade padrão (ex: /dashboard, /fr/dashboard).
     * - "prefix-all": Prefixa todas as localidades (ex: /en/dashboard, /fr/dashboard).
     * - "no-prefix": Nenhuma localidade na URL.
     * - "search-params": Usa ?locale=...
     * Padrão: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Onde armazenar a localidade selecionada pelo usuário.
     * Opções: 'cookie', 'localStorage', 'sessionStorage', 'header' ou um array deles.
     * Padrão: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * O caminho base para as URLs do aplicativo.
     * Padrão: ""
     */
    basePath: "",

    /**
     * Regras de reescrita de URL personalizadas para caminhos específicos por localidade.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Configurações relacionadas à busca e processamento de arquivos de conteúdo.
   */
  content: {
    /**
     * Extensões de arquivo para escanear dicionários.
     * Padrão: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Diretórios onde os arquivos .content estão localizados.
     * Padrão: ["."]
     */
    contentDir: ["src"],

    /**
     * Onde o código-fonte está localizado.
     * Utilizado para otimização de compilação e transformação de código.
     * Padrão: ["."]
     */
    codeDir: ["src"],

    /**
     * Padrões excluídos do escaneamento.
     * Padrão: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Se deve monitorar alterações e reconstruir dicionários durante o desenvolvimento.
     * Padrão: true no ambiente de desenvolvimento
     */
    watch: true,

    /**
     * Comando utilizado para formatar arquivos .content recém-criados / atualizados.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Configuração do Editor Visual (Visual Editor).
   */
  editor: {
    /**
     * Se o editor visual está habilitado.
     * Padrão: false
     */
    enabled: true,

    /**
     * A URL do seu aplicativo para validação de origem (origin validation).
     * Padrão: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Porta para o servidor local do editor.
     * Padrão: 8000
     */
    port: 8000,

    /**
     * A URL pública do editor.
     * Padrão: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL do CMS do Intlayer.
     * Padrão: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL da API do Backend.
     * Padrão: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Se deve habilitar a sincronização de conteúdo em tempo real.
     * Padrão: false
     */
    liveSync: true,
  },

  /**
   * Configurações de tradução e construção baseadas em IA.
   */
  ai: {
    /**
     * Provedor de IA a ser utilizado.
     * Opções: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Padrão: 'openai'
     */
    provider: "openai",

    /**
     * Modelo do provedor selecionado para utilizar.
     */
    model: "gpt-4o",

    /**
     * Chave da API do provedor.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Contexto global para guiar a IA ao construir traduções.
     */
    applicationContext: "Este é um aplicativo de reserva de viagens.",

    /**
     * URL do caminho base para a API de IA.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serialização de Dados (Data Serialization)
     *
     * Opções:
     * - "json": Padrão, robusto; consome mais tokens.
     * - "toon": Consome menos tokens, pode não ser tão consistente quanto o JSON.
     *
     * Padrão: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Configurações de compilação e otimização.
   */
  build: {
    /**
     * Modo de execução da compilação.
     * - "auto": Serão compilados automaticamente durante a compilação do aplicativo.
     * - "manual": Requer um comando de compilação explícito.
     * Padrão: "auto"
     */
    mode: "auto",

    /**
     * Se deve otimizar o bundle final removendo dicionários não utilizados.
     * Padrão: true em produção
     */
    optimize: true,

    /**
     * Formato de saída para os arquivos de dicionário gerados.
     * Padrão: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Indica se a compilação deve verificar os tipos TypeScript.
     * Padrão: false
     */
    checkTypes: false,
  },

  /**
   * Configuração do registrador (Logger).
   */
  log: {
    /**
     * Nível de registro.
     * - "default": Registro padrão.
     * - "verbose": Registro de depuração detalhado.
     * - "disabled": Desativa o registro.
     * Padrão: "default"
     */
    mode: "default",

    /**
     * Prefixo para todas as mensagens de registro.
     * Padrão: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Configurações do sistema (Para uso avançado)
   */
  system: {
    /**
     * Diretório para armazenar dicionários localizados.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Diretório para o aumento de módulo TypeScript (module augmentation).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Diretório para armazenar dicionários não mesclados (unmerged).
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Diretório para armazenar tipos de dicionários.
     */
    typesDir: ".intlayer/types",

    /**
     * Diretório onde os arquivos principais do aplicativo são armazenados.
     */
    mainDir: ".intlayer/main",

    /**
     * Diretório onde os arquivos de configuração são armazenados.
     */
    configDir: ".intlayer/config",

    /**
     * Diretório onde os arquivos de cache são armazenados.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Configuração do Compilador (Para uso avançado)
   */
  compiler: {
    /**
     * Indica se o compilador deve estar habilitado.
     *
     * - false: Desabilita o compilador.
     * - true: Habilita o compilador.
     * - "build-only": Ignora o compilador durante o desenvolvimento e acelera o tempo de inicialização.
     *
     * Padrão: false
     */
    enabled: true,

    /**
     * Define o caminho para arquivos de saída. Substitui o `outputDir`.
     *
     * - Os caminhos com `./` são resolvidos em relação ao diretório do componente.
     * - Os caminhos com `/` são resolvidos em relação à raiz do projeto (`baseDir`).
     *
     * - A inclusão da variável `{{locale}}` no caminho ativará a criação de dicionários separados por idioma.
     *
     * Exemplo:
     * ```ts
     * {
     *   // Criar arquivos .content.ts multilíngues ao lado do componente
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
     *   - `fileName`: Nome do arquivo.
     *   - `key`: Chave de conteúdo.
     *   - `locale`: Localidade de conteúdo.
     *   - `extension`: Extensão do arquivo.
     *   - `componentFileName`: Nome do arquivo do componente.
     *   - `componentExtension`: Extensão do arquivo do componente.
     *   - `format`: Formato do dicionário.
     *   - `componentFormat`: Formato do dicionário do componente.
     *   - `componentDirPath`: Caminho do diretório do componente.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Indica se os componentes devem ser salvos após a transformação.
     * Dessa forma, o compilador pode ser executado apenas uma vez para transformar seu aplicativo e ser removido.
     */
    saveComponents: false,

    /**
     * Insere apenas o conteúdo no arquivo gerado. Útil para saída JSON por idioma para i18next ou ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "", // Adicione um prefixo opcional às chaves de dicionário extraídas
  },

  /**
   * Esquemas personalizados (Schemas) para validar o conteúdo dos dicionários.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Configuração de plugins (Plugins).
   */
  plugins: [],
};

export default config;
````

---

## Referência de Configuração (Configuration Reference)

As seções a seguir descrevem as várias opções de configuração disponíveis no Intlayer.

---

### Configuração de Internacionalização (Internationalization Configuration)

Define as configurações relacionadas à internacionalização, incluindo as localidades disponíveis e a localidade padrão para o aplicativo.

| Campo             | Tipo       | Descrição                                                                                                           | Exemplo              | Nota                                                                                                                                                                                                                                                                                                    |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | Lista de localidades suportadas no aplicativo. Padrão: `[Locales.ENGLISH]`                                          | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                         |
| `requiredLocales` | `string[]` | Lista de localidades obrigatórias no aplicativo. Padrão: `[]`                                                       | `[]`                 | Se vazio, todas as localidades são obrigatórias no modo `strict`. Certifique-se de que as localidades obrigatórias também estejam definidas no campo `locales`.                                                                                                                                         |
| `strictMode`      | `string`   | Garante uma implementação robusta de conteúdo internacionalizado por meio do uso de TypeScript. Padrão: `inclusive` |                      | Se `"strict"`: a função `t` requer que cada localidade declarada seja definida — lança um erro se alguma estiver ausente ou não declarada. Se `"inclusive"`: avisa sobre localidades ausentes, mas aceita as localidades não declaradas existentes. Se `"loose"`: aceita qualquer localidade existente. |
| `defaultLocale`   | `string`   | Localidade padrão usada como fallback se a localidade solicitada não for encontrada. Padrão: `Locales.ENGLISH`      | `'en'`               | Utilizado para determinar a localidade quando nenhuma é especificada na URL, cookie ou cabeçalho.                                                                                                                                                                                                       |

---

### Configuração do Editor (Editor Configuration)

Define as configurações relacionadas ao editor integrado, incluindo porta do servidor e estado de atividade.

| Campo                        | Tipo                      | Descrição                                                                                                                                                                                          | Exemplo                                                                               | Nota                                                                                                                                                                                                                                      |
| ---------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | A URL do seu aplicativo. Padrão: `''`                                                                                                                                                              | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Utilizado para restringir as origens (origins) do editor por motivos de segurança. Se definido como `'*'`, o editor pode ser acessado de qualquer origem.                                                                                 |
| `port`                       | `number`                  | Porta utilizada pelo servidor do Editor Visual. Padrão: `8000`                                                                                                                                     |                                                                                       |                                                                                                                                                                                                                                           |
| `editorURL`                  | `string`                  | URL do servidor do editor. Padrão: `'http://localhost:8000'`                                                                                                                                       | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Utilizado para restringir as origens que podem interagir com o aplicativo. Se definido como `'*'`, acessível de qualquer origem. Deve ser definido se você alterar a porta ou se o editor estiver hospedado em outro domínio.             |
| `cmsURL`                     | `string`                  | URL do CMS do Intlayer. Padrão: `'https://intlayer.org'`                                                                                                                                           | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                           |
| `backendURL`                 | `string`                  | URL do servidor backend. Padrão: `https://back.intlayer.org`                                                                                                                                       | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                           |
| `enabled`                    | `boolean`                 | Indica se o aplicativo irá interagir com o editor visual. Padrão: `true`                                                                                                                           | `process.env.NODE_ENV !== 'production'`                                               | Se `false`, o editor não pode interagir com o aplicativo. Desativá-lo para ambientes específicos aumenta a segurança.                                                                                                                     |
| `clientId`                   | `string &#124; undefined` | Permite que os pacotes intlayer se autentiquem com o backend usando oAuth2. Para receber um token de acesso, vá para [intlayer.org/project](https://app.intlayer.org/project). Padrão: `undefined` |                                                                                       | Mantenha em segredo; armazene em variáveis de ambiente.                                                                                                                                                                                   |
| `clientSecret`               | `string &#124; undefined` | Permite que os pacotes intlayer se autentiquem com o backend usando oAuth2. Para receber um token de acesso, vá para [intlayer.org/project](https://app.intlayer.org/project). Padrão: `undefined` |                                                                                       | Mantenha em segredo; armazene em variáveis de ambiente.                                                                                                                                                                                   |
| `dictionaryPriorityStrategy` | `string`                  | Estratégia para priorizar dicionários quando existem dicionários locais e remotos. Padrão: `'local_first'`                                                                                         | `'distant_first'`                                                                     | `'distant_first'`: Prioriza remotos sobre locais. `'local_first'`: Prioriza locais sobre remotos.                                                                                                                                         |
| `liveSync`                   | `boolean`                 | Indica se o servidor do aplicativo deve recarregar os conteúdos a quente quando uma alteração for detectada no CMS / Editor Visual / Backend. Padrão: `true`                                       | `true`                                                                                | Quando um dicionário é adicionado/atualizado, o aplicativo atualiza o conteúdo da página. O live sync externaliza o conteúdo para outro servidor, o que pode afetar levemente o desempenho. Recomenda-se hospedar ambos na mesma máquina. |
| `liveSyncPort`               | `number`                  | Porta do servidor Live Sync. Padrão: `4000`                                                                                                                                                        | `4000`                                                                                |                                                                                                                                                                                                                                           |
| `liveSyncURL`                | `string`                  | URL do servidor Live Sync. Padrão: `'http://localhost:{liveSyncPort}'`                                                                                                                             | `'https://example.com'`                                                               | Aponta para localhost por padrão; pode ser alterado para um servidor de sincronização ao vivo remoto.                                                                                                                                     |

### Configuração de Roteamento (Routing Configuration)

Configurações que controlam o comportamento do roteamento, incluindo estrutura de URL, armazenamento de localidade e tratamento de middleware.

| Campo      | Tipo                                                                                                                                                 | Descrição                                                                                                                                                                   | Exemplo                                                                                                                                                                                              | Nota                                                                                                                                                                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | Modo de roteamento de URL para tratamento de localidades. Padrão: `'prefix-no-default'`                                                                                     | `'prefix-no-default'`: `/dashboard` (en) ou `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: localidade tratada por outros meios. `'search-params'`: usa `/dashboard?locale=fr` | Não afeta o gerenciamento de cookies ou o armazenamento de localidade.                                                                                                                                                                                                                  |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Configuração para armazenar a localidade no cliente. Padrão: `['cookie', 'header']`                                                                                         | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                        | Consulte a tabela de Opções de Armazenamento abaixo.                                                                                                                                                                                                                                    |
| `basePath` | `string`                                                                                                                                             | O caminho base para as URLs do aplicativo. Padrão: `''`                                                                                                                     | `'/my-app'`                                                                                                                                                                                          | Se o aplicativo estiver em `https://example.com/my-app`, basePath é `'/my-app'` e as URLs tornam-se `https://example.com/my-app/en`.                                                                                                                                                    |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Regras de reescrita de URL personalizadas que substituem o modo de roteamento padrão para caminhos específicos. Suporta parâmetros dinâmicos `[param]`. Padrão: `undefined` | Ver exemplo abaixo                                                                                                                                                                                   | As regras de reescrita têm prioridade sobre o `mode`. Funciona com Next.js e Vite. `getLocalizedUrl()` aplica automaticamente as regras correspondentes. Veja [Reescritas de URL Personalizadas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/custom_url_rewrites.md). |

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

#### Opções de Armazenamento (Storage Options)

| Valor              | Descrição                                                                                   | Nota                                                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Salva a localidade nos cookies — acessível tanto pelo lado do cliente quanto pelo servidor. | Para conformidade com a GDPR, certifique-se de que o consentimento adequado do usuário foi obtido. Personalizável via `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Salva a localidade no navegador sem data de validade — apenas lado do cliente.              | Não expira a menos que seja explicitamente limpo. O proxy do Intlayer não pode acessá-lo. Personalizável via `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                                   |
| `'sessionStorage'` | Salva a localidade pela duração da sessão da página — apenas lado do cliente.               | Limpo quando a aba/janela é fechada. O proxy do Intlayer não pode acessá-lo. Personalizável via `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                                              |
| `'header'`         | Salva ou transmite a localidade via cabeçalhos HTTP — apenas lado do servidor.              | Útil para chamadas de API. O lado do cliente não pode acessar. Personalizável via `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                                                    |

#### Atributos de Cookie (Cookie Attributes)

Ao usar o armazenamento via cookie, você pode configurar atributos de cookie adicionais:

| Campo      | Tipo                                  | Descrição                                               |
| ---------- | ------------------------------------- | ------------------------------------------------------- |
| `name`     | `string`                              | Nome do cookie. Padrão: `'INTLAYER_LOCALE'`             |
| `domain`   | `string`                              | Domínio do cookie. Padrão: `undefined`                  |
| `path`     | `string`                              | Caminho do cookie. Padrão: `undefined`                  |
| `secure`   | `boolean`                             | Requer HTTPS. Padrão: `undefined`                       |
| `httpOnly` | `boolean`                             | Flag HTTP-only. Padrão: `undefined`                     |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | Política de SameSite.                                   |
| `expires`  | `Date &#124; number`                  | Data de validade ou número de dias. Padrão: `undefined` |

#### Atributos de Armazenamento de Localidade (Locale Storage Attributes)

Ao usar localStorage ou sessionStorage:

| Campo  | Tipo                                     | Descrição                                                   |
| ------ | ---------------------------------------- | ----------------------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Tipo de armazenamento.                                      |
| `name` | `string`                                 | Nome da chave de armazenamento. Padrão: `'INTLAYER_LOCALE'` |

#### Exemplos de Configuração

Aqui estão alguns exemplos comuns de configuração para a nova estrutura de roteamento v7:

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

**Configuração em conformidade com a GDPR**:

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

**Modo de Parâmetros de Pesquisa (Search Parameters Mode)**:

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

**Modo sem prefixo (No Prefix Mode) com armazenamento personalizado**:

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

**Reescrita de URL personalizada com caminhos dinâmicos**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Estratégia de fallback para caminhos não reescritos
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

### Configuração de Conteúdo (Content Configuration)

Configurações relacionadas ao processamento de conteúdo dentro do aplicativo (nomes de diretório, extensões de arquivo e configurações derivadas).

| Campo            | Tipo       | Descrição                                                                                                                                                                                                       | Exemplo                             | Nota                                                                                                                                           |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Indica se o Intlayer deve monitorar as alterações nos arquivos de declaração de conteúdo para reconstruir dicionários. Padrão: `process.env.NODE_ENV === 'development'`                                         |                                     |                                                                                                                                                |
| `fileExtensions` | `string[]` | Extensões de arquivo utilizadas para escanear arquivos de declaração de conteúdo. Padrão: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                                |
| `contentDir`     | `string[]` | Caminhos para diretórios onde os arquivos de declaração de conteúdo estão localizados. Padrão: `['.']`                                                                                                          | `['src/content']`                   |                                                                                                                                                |
| `codeDir`        | `string[]` | Caminhos para diretórios onde os arquivos de código-fonte de seu aplicativo estão localizados. Padrão: `['.']`                                                                                                  | `['src']`                           | Utilizado para otimizar a compilação e garantir que a transformação de código e o hot reload sejam aplicados somente aos arquivos necessários. |
| `excludedPath`   | `string[]` | Caminhos excluídos do escaneamento de conteúdo. Padrão: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                               | `['src/styles']`                    |                                                                                                                                                |
| `formatCommand`  | `string`   | Comando que será executado para formatar arquivos de conteúdo recém-criados ou atualizados. Padrão: `undefined`                                                                                                 | `'npx prettier --write "{{file}}"'` | Utilizado durante a extração de conteúdo ou através do editor visual.                                                                          |

---

### Configuração de Dicionário (Dictionary Configuration)

Configurações que controlam as operações de dicionários, incluindo o comportamento de preenchimento automático e a geração de conteúdo.

Esta configuração de dicionário tem dois propósitos principais:

1. **Valores padrão**: Definir valores padrão ao criar arquivos de declaração de conteúdo.
2. **Comportamento de fallback**: Fornecer valores de fallback quando campos específicos não são definidos, permitindo definir o comportamento das operações de dicionário globalmente.

Para mais informações sobre arquivos de declaração de conteúdo e como os valores de configuração são aplicados, consulte a [documentação de arquivos de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

| Campo                       | Tipo                                                                                            | Descrição                                                                                                    | Exemplo             | Nota                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Controla como os arquivos de saída do preenchimento automático (tradução por IA) são gerados. Padrão: `true` | Veja exemplo abaixo | `true`: Caminho padrão (mesmo arquivo que a fonte). `false`: Desativado. Templates de string/função geram arquivos por localidade. Objeto por localidade: cada localidade é mapeada para seu próprio padrão; `false` ignora essa localidade. A inclusão de `{{locale}}` ativa a geração por localidade. O `fill` no nível do dicionário sempre tem precedência sobre esta configuração global. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Controla como os dicionários são importados. Padrão: `'static'`                                              | `'dynamic'`         | `'static'`: Importado estaticamente. `'dynamic'`: Importado dinamicamente via Suspense. `'fetch'`: Recuperado dinamicamente via Live Sync API. Não afeta `getIntlayer`, `getDictionary`, `useDictionary`, etc.                                                                                                                                                                                 |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | Onde os dicionários são armazenados. Padrão: `'local'`                                                       | `'remote'`          | `'local'`: sistema de arquivos. `'remote'`: Intlayer CMS. `'hybrid'`: ambos.                                                                                                                                                                                                                                                                                                                   |
| `contentAutoTransformation` | `boolean`                                                                                       | Se arquivos de conteúdo devem ser transformados automaticamente (ex: de Markdown para HTML). Padrão: `false` | `true`              | Útil para processar campos Markdown via @intlayer/markdown.                                                                                                                                                                                                                                                                                                                                    |

**Exemplo de `fill`**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### Configuração de IA (AI Configuration)

Define configurações para os recursos baseados em IA do Intlayer, como a tradução build.

| Campo                | Tipo                   | Descrição                                                                       | Exemplo                                     | Nota                                                                                          |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | Provedor de IA a ser utilizado.                                                 | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                               |
| `model`              | `string`               | Modelo de IA a ser utilizado.                                                   | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                               |
| `apiKey`             | `string`               | Chave da API para o provedor selecionado.                                       | `process.env.OPENAI_API_KEY`                |                                                                                               |
| `applicationContext` | `string`               | Contexto extra sobre seu aplicativo para melhorar a precisão da tradução da IA. | `'Plataforma de estudo para crianças.'`     |                                                                                               |
| `baseURL`            | `string`               | URL base opcional para chamadas de API.                                         |                                             | Útil se você estiver usando um proxy ou uma implantação local de IA.                          |
| `dataSerialization`  | `'json' &#124; 'toon'` | Define como enviar os dados para a IA. Padrão: `'json'`                         | `'json'`                                    | `'json'`: mais robusto e preciso. `'toon'`: consome menos tokens, mas pode ser menos estável. |

---

### Configuração de Compilação (Build Configuration)

Configurações do processo de build e otimização do Intlayer.

| Campo          | Tipo                     | Descrição                                                                                                                   | Exemplo | Nota |
| -------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ------- | ---- |
| `mode`         | `'auto' &#124; 'manual'` | Indica se o Intlayer deve ser executado automaticamente durante as etapas de pré-compilação do aplicativo. Padrão: `'auto'` |         |      |
| `optimize`     | `boolean`                | Indica se dicionários compilados devem ser otimizados para o tempo de execução. Padrão: `true` em produção                  |         |      |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Formato de saída para os arquivos de dicionário gerados. Padrão: `['cjs', 'esm']`                                           |         |      |
| `checkTypes`   | `boolean`                | Indica se o Intlayer deve verificar os tipos nos arquivos gerados. Padrão: `false`                                          |         |      |

---

### Configurações de Sistema (System Configuration)

Essas configurações destinam-se a casos de uso avançados e para a configuração interna do Intlayer.

| Campo                     | Tipo     | Descrição                                         | Padrão                            |
| ------------------------- | -------- | ------------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Diretório de dicionários compilados.              | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | Diretório para o aumento de módulo TypeScript.    | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Diretório de dicionários não mesclados.           | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Diretório de tipos gerados.                       | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Diretório do arquivo Intlayer principal.          | `'.intlayer/main'`                |
| `configDir`               | `string` | Diretório de arquivos de configuração compilados. | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Diretório de arquivos de cache.                   | `'.intlayer/cache'`               |

---

### Configuração do Compilador (Compiler Configuration)

Configurações para o compilador do Intlayer (`intlayer compiler`).

| Campo                 | Tipo                     | Descrição                                                                                     | Padrão  |
| --------------------- | ------------------------ | --------------------------------------------------------------------------------------------- | ------- |
| `enabled`             | `boolean`                | Indica se o compilador está ativo.                                                            | `false` |
| `output`              | `string &#124; Function` | Caminho de saída para dicionários extraídos.                                                  |         |
| `saveComponents`      | `boolean`                | Indica se os arquivos de origem originais devem ser substituídos pelas versões transformadas. | `false` |
| `noMetadata`          | `boolean`                | Se `true`, o compilador não incluirá metadados nos arquivos gerados.                          | `false` |
| `dictionaryKeyPrefix` | `string`                 | Prefixo opcional da chave do dicionário.                                                      | `''`    |

---

### Configuração do Registrador (Logger Configuration)

Configurações para personalizar a saída de logs do Intlayer.

| Campo    | Tipo                                           | Descrição                           | Padrão         |
| -------- | ---------------------------------------------- | ----------------------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Modo de registro.                   | `'default'`    |
| `prefix` | `string`                                       | Prefixo para mensagens de registro. | `'[intlayer]'` |

---

### Esquemas Personalizados (Custom Schemas)

| Campo     | Tipo                        | Descrição                                                                          |
| --------- | --------------------------- | ---------------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Permite que você defina esquemas Zod para validar a estrutura de seus dicionários. |

---

### Plugins

| Campo     | Tipo               | Descrição                                      |
| --------- | ------------------ | ---------------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | Lista de plugins do Intlayer a serem ativados. |
