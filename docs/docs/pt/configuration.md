---
createdAt: 2024-08-13
updatedAt: 2025-06-29
title: Configuração
description: Aprenda como configurar o Intlayer para sua aplicação. Entenda as várias configurações e opções disponíveis para personalizar o Intlayer de acordo com suas necessidades.
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
---

# Documentação de Configuração do Intlayer

## Visão Geral

Os arquivos de configuração do Intlayer permitem a personalização de vários aspectos do plugin, como internacionalização, middleware e gerenciamento de conteúdo. Este documento fornece uma descrição detalhada de cada propriedade na configuração.

---

## Suporte a Arquivos de Configuração

O Intlayer aceita formatos de arquivo de configuração JSON, JS, MJS e TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Exemplo de arquivo de configuração

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "typesDir": "content/types",
  },
  "middleware": {
    "noPrefix": false,
  },
}
```

---

## Referência de Configuração

As seções a seguir descrevem as várias configurações disponíveis para o Intlayer.

---

### Configuração de Internacionalização

Define configurações relacionadas à internacionalização, incluindo os idiomas disponíveis e o idioma padrão para a aplicação.

#### Propriedades

- **locales**:

  - _Tipo_: `string[]`
  - _Padrão_: `['en']`
  - _Descrição_: A lista de idiomas suportados na aplicação.
  - _Exemplo_: `['en', 'fr', 'es']`

- **requiredLocales**:

  - _Tipo_: `string[]`
  - _Padrão_: `[]`
  - _Descrição_: A lista de idiomas obrigatórios na aplicação.
  - _Exemplo_: `[]`
  - _Nota_: Se estiver vazio, todos os idiomas serão obrigatórios no modo `strict`.
  - _Nota_: Certifique-se de que os idiomas obrigatórios também estejam definidos no campo `locales`.

- **strictMode**:

  - _Tipo_: `string`
  - _Padrão_: `inclusive`
  - _Descrição_: Garante implementações rigorosas de conteúdo internacionalizado usando TypeScript.
  - _Nota_: Se definido como "strict", a função de tradução `t` exigirá que cada idioma declarado seja definido. Se um idioma estiver ausente ou não for declarado na sua configuração, será lançado um erro.
  - _Nota_: Se definido como "inclusive", a função de tradução `t` exigirá que cada idioma declarado seja definido. Se um idioma estiver ausente, será exibido um aviso. Mas aceitará se um idioma não for declarado na sua configuração, mas existir.
  - _Nota_: Se definido como "loose", a função de tradução `t` aceitará qualquer idioma existente.

- **defaultLocale**:

  - _Tipo_: `string`
  - _Padrão_: `'en'`
  - _Descrição_: O idioma padrão usado como fallback se o idioma solicitado não for encontrado.
  - _Exemplo_: `'en'`
  - _Nota_: Isso é usado para determinar o idioma quando nenhum é especificado na URL, cookie ou cabeçalho.

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
  - _Nota_: A URL da aplicação. Usada para restringir a origem do editor por razões de segurança. Se definido como `'*'`, o editor estará acessível de qualquer origem.

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
  - _Nota_: A URL do servidor do editor para acessar a partir da aplicação. Usada para restringir as origens que podem interagir com a aplicação por razões de segurança. Se definido como `'*'`, o editor estará acessível de qualquer origem. Deve ser configurado se a porta for alterada ou se o editor estiver hospedado em um domínio diferente.

- **cmsURL**:

  - _Tipo_: `string`
  - _Padrão_: `'https://intlayer.org'`
  - _Descrição_: A URL do CMS do Intlayer.
  - _Exemplo_: `'https://intlayer.org'`
  - _Nota_: A URL do CMS do Intlayer.

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
  - _Descrição_: clientId e clientSecret permitem que os pacotes do Intlayer autentiquem com o backend usando autenticação oAuth2. Um token de acesso é usado para autenticar o usuário relacionado ao projeto. Para obter um token de acesso, acesse https://intlayer.org/dashboard/project e crie uma conta.
  - _Exemplo_: `true`
  - _Nota_: Importante: O clientId e o clientSecret devem ser mantidos em segredo e não compartilhados publicamente. Certifique-se de mantê-los em um local seguro, como variáveis de ambiente.

- **clientSecret**:

  - _Tipo_: `string` | `undefined`
  - _Padrão_: `undefined`
  - _Descrição_: clientId e clientSecret permitem que os pacotes do Intlayer autentiquem com o backend usando autenticação oAuth2. Um token de acesso é usado para autenticar o usuário relacionado ao projeto. Para obter um token de acesso, acesse https://intlayer.org/dashboard/project e crie uma conta.
  - _Exemplo_: `true`
  - _Nota_: Importante: O clientId e o clientSecret devem ser mantidos em segredo e não compartilhados publicamente. Certifique-se de mantê-los em um local seguro, como variáveis de ambiente.

- **hotReload**:

  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Indica se a aplicação deve recarregar automaticamente as configurações de idioma quando uma alteração for detectada.
  - _Exemplo_: `true`
  - _Nota_: Por exemplo, quando um novo dicionário é adicionado ou atualizado, a aplicação atualizará o conteúdo exibido na página.
  - _Nota_: Como o recarregamento automático requer uma conexão contínua com o servidor, ele está disponível apenas para clientes do plano `enterprise`.

- **dictionaryPriorityStrategy**:
  - _Tipo_: `string`
  - _Padrão_: `'local_first'`
  - _Descrição_: A estratégia para priorizar dicionários no caso de dicionários locais e remotos estarem presentes. Se definido como `'distant_first'`, a aplicação priorizará dicionários remotos sobre dicionários locais. Se definido como `'local_first'`, a aplicação priorizará dicionários locais sobre dicionários remotos.
  - _Exemplo_: `'distant_first'`

### Configuração de Middleware

Configurações que controlam o comportamento do middleware, incluindo como a aplicação lida com cookies, cabeçalhos e prefixos de URL para gerenciamento de idiomas.

#### Propriedades

- **headerName**:

  - _Tipo_: `string`
  - _Padrão_: `'x-intlayer-locale'`
  - _Descrição_: O nome do cabeçalho HTTP usado para determinar o idioma.
  - _Exemplo_: `'x-custom-locale'`
  - _Nota_: Isso é útil para determinação de idioma baseada em API.

- **cookieName**:

  - _Tipo_: `string`
  - _Padrão_: `'intlayer-locale'`
  - _Descrição_: O nome do cookie usado para armazenar o idioma.
  - _Exemplo_: `'custom-locale'`
  - _Nota_: Usado para persistir o idioma entre sessões.

- **prefixDefault**:

  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Indica se o idioma padrão deve ser incluído na URL.
  - _Exemplo_: `true`
  - _Nota_:
    - Se `true` e `defaultLocale = 'en'`: path = `/en/dashboard` ou `/fr/dashboard`
    - Se `false` e `defaultLocale = 'en'`: path = `/dashboard` ou `/fr/dashboard`

- **basePath**:

  - _Tipo_: `string`
  - _Padrão_: `''`
  - _Descrição_: O caminho base para as URLs da aplicação.
  - _Exemplo_: `'/my-app'`
  - _Nota_:
    - Se a aplicação está hospedada em `https://example.com/my-app`
    - O caminho base é `'/my-app'`
    - A URL será `https://example.com/my-app/en`
    - Se o caminho base não estiver definido, a URL será `https://example.com/en`

- **serverSetCookie**:

  - _Tipo_: `string`
  - _Padrão_: `'always'`
  - _Descrição_: Regra para definir o cookie de idioma no servidor.
  - _Opções_: `'always'`, `'never'`
  - _Exemplo_: `'never'`
  - _Nota_: Controla se o cookie de idioma é definido em todas as requisições ou nunca.

- **noPrefix**:

  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Indica se o prefixo de idioma deve ser omitido das URLs.
  - _Exemplo_: `true`
  - _Nota_:
    - Se `true`: Sem prefixo na URL
    - Se `false`: Prefixo na URL
    - Exemplo com `basePath = '/my-app'`:
      - Se `noPrefix = false`: A URL será `https://example.com/my-app/en`
      - Se `noPrefix = true`: A URL será `https://example.com`

- **detectLocaleOnPrefetchNoPrefix**:

  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Controla se a detecção de idioma ocorre durante as requisições de prefetch do Next.js.
  - _Exemplo_: `true`
  - _Nota_: Esta configuração afeta como o Next.js gerencia o prefetch de idioma:
    - **Cenário de exemplo:**
      - O idioma do navegador do usuário é `'fr'`
      - A página atual é `/fr/about`
      - O link faz prefetch de `/about`
    - **Com `detectLocaleOnPrefetchNoPrefix: true`:**
      - O prefetch detecta o idioma `'fr'` do navegador
      - Redireciona o prefetch para `/fr/about`
    - **Com `detectLocaleOnPrefetchNoPrefix: false` (padrão):**
      - O prefetch usa o idioma padrão
      - Redireciona o prefetch para `/en/about` (assumindo que `'en'` é o padrão)
    - **Quando usar `true`:**
      - Sua aplicação usa links internos não localizados (ex. `<a href="/about">`)
      - Você quer comportamento consistente de detecção de idioma entre requisições normais e de prefetch
    - **Quando usar `false` (padrão):**
      - Sua aplicação usa links com prefixo de idioma (ex. `<a href="/fr/about">`)
      - Você quer otimizar a performance do prefetch
      - Você quer evitar loops de redirecionamento potenciais

---

### Configuração de Conteúdo

Configurações relacionadas ao gerenciamento de conteúdo dentro da aplicação, incluindo nomes de diretórios, extensões de arquivos e configurações derivadas.

#### Propriedades

- **watch**:

  - _Tipo_: `boolean`
  - _Padrão_: `process.env.NODE_ENV === 'development'`
  - _Descrição_: Indica se o Intlayer deve monitorar alterações nos arquivos de declaração de conteúdo na aplicação para reconstruir os dicionários relacionados.

- **fileExtensions**:

  - _Tipo_: `string[]`
  - _Padrão_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descrição_: Extensões de arquivo a serem procuradas ao construir dicionários.
  - _Exemplo_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: Personalizar as extensões de arquivo pode ajudar a evitar conflitos.

- **baseDir**:

  - _Tipo_: `string`
  - _Padrão_: `process.cwd()`
  - _Descrição_: O diretório base para o projeto.
  - _Exemplo_: `'/path/to/project'`
  - _Nota_: Usado para resolver todos os diretórios relacionados ao Intlayer.

- **dictionaryOutput**:

  - _Tipo_: `string[]`
  - _Padrão_: `['intlayer']`
  - _Descrição_: O tipo de saída de dicionário a ser usado, por exemplo, `'intlayer'` ou `'i18next'`.

- **contentDir**:

  - _Tipo_: `string[]`
  - _Padrão_: `['src']`
  - _Exemplo_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Descrição_: O caminho do diretório onde o conteúdo é armazenado.

- **dictionariesDir**:

  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/dictionaries'`
  - _Descrição_: O caminho do diretório para armazenar resultados intermediários ou de saída.

- **moduleAugmentationDir**:

  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/types'`
  - _Descrição_: Diretório para aumento de módulo, permitindo melhores sugestões de IDE e verificação de tipos.
  - _Exemplo_: `'intlayer-types'`
  - _Nota_: Certifique-se de incluir isso no `tsconfig.json`.

- **unmergedDictionariesDir**:

  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/unmerged_dictionary'`
  - _Descrição_: O diretório para armazenar dicionários não mesclados.
  - _Exemplo_: `'translations'`

- **dictionariesDir**:

  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/dictionary'`
  - _Descrição_: O diretório para armazenar dicionários de localização.
  - _Exemplo_: `'translations'`

- **i18nextResourcesDir**:

  - _Tipo_: `string`
  - _Padrão_: `'i18next_dictionary'`
  - _Descrição_: O diretório para armazenar dicionários i18n.
  - _Exemplo_: `'translations'`
  - _Nota_: Certifique-se de que este diretório esteja configurado para o tipo de saída i18next.

- **typesDir**:

  - _Tipo_: `string`
  - _Padrão_: `'types'`
  - _Descrição_: O diretório para armazenar tipos de dicionário.
  - _Exemplo_: `'intlayer-types'`

- **mainDir**:

  - _Tipo_: `string`
  - _Padrão_: `'main'`
  - _Descrição_: O diretório onde os arquivos principais da aplicação são armazenados.
  - _Exemplo_: `'intlayer-main'`

- **excludedPath**:
  - _Tipo_: `string[]`
  - _Padrão_: `['node_modules']`
  - _Descrição_: Diretórios excluídos da busca de conteúdo.
  - _Nota_: Esta configuração ainda não é usada, mas está planejada para implementação futura.

### Configuração do Logger

Configurações que controlam o logger, incluindo o prefixo a ser usado.

#### Propriedades

- **mode**:

  - _Tipo_: `string`
  - _Padrão_: `default`
  - _Descrição_: Indica o modo do logger.
  - _Opções_: `default`, `verbose`, `disabled`
  - _Exemplo_: `default`
  - _Nota_: O modo do logger. O modo verbose registrará mais informações, mas pode ser usado para fins de depuração. O modo disabled desativará o logger.

- **prefix**:

  - _Tipo_: `string`
  - _Padrão_: `'[intlayer] '`
  - _Descrição_: O prefixo do logger.
  - _Exemplo_: `'[my custom prefix] '`
  - _Nota_: O prefixo do logger.

### Configuração de IA

Configurações que controlam os recursos de IA do Intlayer, incluindo o provedor, modelo e chave de API.
Esta configuração é opcional se você estiver registrado no [Painel do Intlayer](https://intlayer.org/dashboard/project) usando uma chave de acesso. O Intlayer gerenciará automaticamente a solução de IA mais eficiente e econômica para suas necessidades. Usar as opções padrão garante melhor manutenção a longo prazo, pois o Intlayer atualiza continuamente para usar os modelos mais relevantes.

Se preferir usar sua própria chave de API ou modelo específico, você pode definir sua configuração personalizada de IA. Esta configuração de IA será usada globalmente em todo o ambiente do Intlayer. Comandos CLI usarão essas configurações como padrão para os comandos (por exemplo, `fill`), bem como o SDK, Editor Visual e CMS. Você pode substituir esses valores padrão para casos de uso específicos usando parâmetros de comando.
O Intlayer suporta vários provedores de IA para maior flexibilidade e escolha. Os provedores atualmente suportados são:

- **OpenAI** (padrão)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Propriedades

- **provider**:

  - _Tipo_: `string`
  - _Padrão_: `'openai'`
  - _Descrição_: O provedor a ser usado para os recursos de IA do Intlayer.
  - _Opções_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _Exemplo_: `'anthropic'`
  - _Nota_: Diferentes provedores podem exigir diferentes chaves de API e ter diferentes modelos de preços.

- **model**:

  - _Tipo_: `string`
  - _Padrão_: Nenhum
  - _Descrição_: O modelo a ser usado para os recursos de IA do Intlayer.
  - _Exemplo_: `'gpt-4o-2024-11-20'`
  - _Nota_: O modelo específico a ser usado varia de acordo com o provedor.

- **temperature**:

  - _Tipo_: `number`
  - _Padrão_: Nenhum
  - _Descrição_: A temperatura controla a aleatoriedade das respostas da IA.
  - _Exemplo_: `0.1`
  - _Nota_: Uma temperatura mais alta tornará a IA mais criativa e menos previsível.

- **apiKey**:

  - _Tipo_: `string`
  - _Padrão_: Nenhum
  - _Descrição_: Sua chave de API para o provedor selecionado.
  - _Exemplo_: `process.env.OPENAI_API_KEY`
  - _Nota_: Importante: As chaves de API devem ser mantidas em segredo e não compartilhadas publicamente. Certifique-se de mantê-las em um local seguro, como variáveis de ambiente.

- **applicationContext**:
  - _Tipo_: `string`
  - _Padrão_: Nenhum
  - _Descrição_: Fornece contexto adicional sobre sua aplicação ao modelo de IA, ajudando-o a gerar traduções mais precisas e contextualmente apropriadas. Isso pode incluir informações sobre o domínio do seu aplicativo, público-alvo, tom ou terminologia específica.

### Configuração de Build

Configurações que controlam como o Intlayer otimiza e compila a internacionalização do seu aplicativo.

As opções de build se aplicam aos plugins `@intlayer/babel` e `@intlayer/swc`.

> No modo de desenvolvimento, o Intlayer usa importações estáticas para dicionários para simplificar a experiência de desenvolvimento.

> Durante a otimização, o Intlayer substituirá as chamadas aos dicionários para otimizar o chunking, de modo que o bundle final importe apenas os dicionários que são realmente utilizados.

#### Propriedades

- **optimize**:

  - _Tipo_: `boolean`
  - _Padrão_: `process.env.NODE_ENV === 'production'`
  - _Descrição_: Controla se o build deve ser otimizado.
  - _Exemplo_: `true`
  - _Nota_: Quando ativado, o Intlayer substituirá todas as chamadas de dicionários para otimizar o chunking. Dessa forma, o bundle final importará apenas os dicionários que são utilizados. Todas as importações permanecerão como importações estáticas para evitar processamento assíncrono ao carregar os dicionários.
  - _Nota_: O Intlayer substituirá todas as chamadas de `useIntlayer` com o modo definido pela opção `importMode` e `getIntlayer` por `getDictionary`.
  - _Nota_: Esta opção depende dos plugins `@intlayer/babel` e `@intlayer/swc`.
  - _Nota_: Certifique-se de que todas as chaves sejam declaradas estaticamente nas chamadas `useIntlayer`. por exemplo: `useIntlayer('navbar')`.

- **importMode**:

  - _Tipo_: `'static' | 'dynamic' | 'async'`
  - _Padrão_: `'static'`
  - _Descrição_: Controla como os dicionários são importados.
  - _Exemplo_: `'dynamic'`
  - _Nota_: Modos disponíveis:
    - "static": Os dicionários são importados estaticamente. Substitui `useIntlayer` por `useDictionary`.
    - "dynamic": Os dicionários são importados dinamicamente usando Suspense. Substitui `useIntlayer` por `useDictionaryDynamic`.
    - "async": Os dicionários são importados dinamicamente de forma assíncrona. Substitui `useIntlayer` por `await useDictionaryAsync`.
  - _Nota_: Importações dinâmicas dependem do Suspense e podem impactar levemente o desempenho de renderização.
  - _Nota_: Se desativado, todos os idiomas serão carregados de uma vez, mesmo que não sejam utilizados.
  - _Nota_: Esta opção depende dos plugins `@intlayer/babel` e `@intlayer/swc`.
  - _Nota_: Certifique-se de que todas as chaves sejam declaradas estaticamente nas chamadas `useIntlayer`. por exemplo: `useIntlayer('navbar')`.
  - _Nota_: Esta opção será ignorada se `optimize` estiver desativado.
  - _Nota_: Na maioria dos casos, `"dynamic"` será usado para aplicações React, `"async"` para aplicações Vue.js.
  - _Nota_: Esta opção não afetará as funções `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` e `useDictionaryDynamic`.

- **traversePattern**:
  - _Tipo_: `string[]`
  - _Padrão_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**/node_modules/**']`
  - _Descrição_: Padrões que definem quais arquivos devem ser percorridos durante a otimização.
    - _Exemplo_: `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _Nota_: Use isso para limitar a otimização a arquivos de código relevantes e melhorar o desempenho do build.
  - _Nota_: Esta opção será ignorada se `optimize` estiver desativado.
  - _Nota_: Use padrão glob.

## Histórico da Documentação

- 5.5.11 - 2025-06-29: Adicionado comandos `docs`
