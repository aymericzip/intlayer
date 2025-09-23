---
createdAt: 2024-08-13
updatedAt: 2025-09-16
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
---

# Documentação de Configuração do Intlayer

## Visão Geral

Os arquivos de configuração do Intlayer permitem a personalização de vários aspectos do plugin, como internacionalização, middleware e manipulação de conteúdo. Este documento fornece uma descrição detalhada de cada propriedade na configuração.

---

## Suporte a Arquivos de Configuração

O Intlayer aceita formatos de arquivos de configuração JSON, JS, MJS e TS:

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
    locales: [Locales.ENGLISH], // locais configurados para internacionalização
  },
  content: {
    autoFill: "./{{fileName}}.content.json", // preenchimento automático do conteúdo
    contentDir: ["src", "../ui-library"], // diretórios de conteúdo
  },
  middleware: {
    noPrefix: false, // configuração do middleware para prefixo
  },
  editor: {
    applicationURL: "https://example.com", // URL da aplicação para o editor
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // chave da API para AI
    applicationContext: "This is a test application", // contexto da aplicação para AI
  },
  build: {
    importMode: "dynamic", // modo de importação para build
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH], // locais configurados para internacionalização
  },
  content: {
    contentDir: ["src", "../ui-library"], // diretórios de conteúdo
  },
  middleware: {
    noPrefix: false, // configuração do middleware para prefixo
  },
  editor: {
    applicationURL: "https://example.com", // URL da aplicação para o editor
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // chave da API para AI
    applicationContext: "This is a test application", // contexto da aplicação para AI
  },
  build: {
    importMode: "dynamic", // modo de importação para build
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"], // locais configurados para internacionalização
  },
  "content": {
    "contentDir": ["src", "../ui-library"], // diretórios de conteúdo
  },
  "middleware": {
    "noPrefix": false, // configuração do middleware para prefixo
  },
  "editor": {
    "applicationURL": "https://example.com", // URL da aplicação para o editor
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "Esta é uma aplicação de teste",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

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
  - _Descrição_: clientId e clientSecret permitem que os pacotes intlayer autentiquem com o backend usando autenticação oAuth2. Um token de acesso é usado para autenticar o usuário relacionado ao projeto. Para obter um token de acesso, acesse https://intlayer.org/dashboard/project e crie uma conta.
  - _Exemplo_: `true`
  - _Nota_: Importante: O clientId e o clientSecret devem ser mantidos em segredo e não compartilhados publicamente. Por favor, certifique-se de mantê-los em um local seguro, como variáveis de ambiente.

- **clientSecret**:
  - _Tipo_: `string` | `undefined`
  - _Padrão_: `undefined`
  - _Descrição_: clientId e clientSecret permitem que os pacotes intlayer se autentiquem com o backend usando autenticação oAuth2. Um token de acesso é usado para autenticar o usuário relacionado ao projeto. Para obter um token de acesso, acesse https://intlayer.org/dashboard/project e crie uma conta.
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

- **liveSyncURL**:
  - _Tipo_: `string`
  - _Padrão_: `'http://localhost:{liveSyncPort}'`
  - _Descrição_: A URL do servidor de sincronização ao vivo.
  - _Exemplo_: `'https://example.com'`
  - _Nota_: Aponta para localhost por padrão, mas pode ser alterado para qualquer URL no caso de um servidor de sincronização ao vivo remoto.

### Configuração do Middleware

Configurações que controlam o comportamento do middleware, incluindo como a aplicação lida com cookies, cabeçalhos e prefixos de URL para gerenciamento de localidade.

#### Propriedades

- **headerName**:
  - _Tipo_: `string`
  - _Padrão_: `'x-intlayer-locale'`
  - _Descrição_: O nome do cabeçalho HTTP usado para determinar a localidade.
  - _Exemplo_: `'x-custom-locale'`
  - _Nota_: Útil para determinação de localidade baseada em API.

- **cookieName**:
  - _Tipo_: `string`
  - _Padrão_: `'intlayer-locale'`
  - _Descrição_: O nome do cookie usado para armazenar a localidade.
  - _Exemplo_: `'custom-locale'`
  - _Nota_: Usado para persistir a localidade entre sessões.

- **prefixDefault**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Se deve incluir a localidade padrão na URL.
  - _Exemplo_: `true`
  - _Nota_:
    - Se `true` e `defaultLocale = 'en'`: caminho = `/en/dashboard` ou `/fr/dashboard`
    - Se `false` e `defaultLocale = 'en'`: caminho = `/dashboard` ou `/fr/dashboard`

- **basePath**:
  - _Tipo_: `string`
  - _Padrão_: `''`
  - _Descrição_: O caminho base para as URLs da aplicação.
  - _Exemplo_: `'/my-app'`
  - _Nota_:
    - Se a aplicação estiver hospedada em `https://example.com/my-app`
    - O caminho base é `'/my-app'`
    - A URL será `https://example.com/my-app/en`
    - Se o caminho base não estiver definido, a URL será `https://example.com/en`

- **serverSetCookie**:
  - _Tipo_: `string`
  - _Padrão_: `'always'`
  - _Descrição_: Regra para definir o cookie de localidade no servidor.
  - _Opções_: `'always'`, `'never'`
  - _Exemplo_: `'never'`
  - _Nota_: Controla se o cookie de localidade é definido a cada requisição ou nunca.

- **noPrefix**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Se deve omitir o prefixo da localidade nas URLs.
  - _Exemplo_: `true`
  - _Nota_:
    - Se `true`: Sem prefixo na URL
    - Se `false`: Com prefixo na URL
    - Exemplo com `basePath = '/my-app'`:
      - Se `noPrefix = false`: a URL será `https://example.com/my-app/en`
      - Se `noPrefix = true`: a URL será `https://example.com`

- **detectLocaleOnPrefetchNoPrefix**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Controla se a detecção de local ocorre durante as requisições de prefetch do Next.js.
  - _Exemplo_: `true`
  - _Nota_: Esta configuração afeta como o Next.js lida com o prefetch de local:
    - **Cenário de exemplo:**
      - O idioma do navegador do usuário é `'fr'`
      - A página atual é `/fr/about`
      - O link faz prefetch de `/about`
    - **Com `detectLocaleOnPrefetchNoPrefix: true`:**
      - O prefetch detecta o local `'fr'` do navegador
      - Redireciona o prefetch para `/fr/about`
    - **Com `detectLocaleOnPrefetchNoPrefix: false` (padrão):**
      - O prefetch usa o local padrão
      - Redireciona o prefetch para `/en/about` (assumindo que `'en'` é o padrão)
    - **Quando usar `true`:**
      - Sua aplicação usa links internos não localizados (ex: `<a href="/about">`)
      - Você deseja um comportamento consistente de detecção de localidade entre requisições normais e prefetch
    - **Quando usar `false` (padrão):**
      - Sua aplicação usa links com prefixo de localidade (ex: `<a href="/fr/about">`)
      - Você deseja otimizar a performance do prefetch
      - Você deseja evitar possíveis loops de redirecionamento

---

### Configuração de Conteúdo

Configurações relacionadas ao manuseio de conteúdo dentro da aplicação, incluindo nomes de diretórios, extensões de arquivos e configurações derivadas.

#### Propriedades

- **autoFill**:
  - _Tipo_: `boolean | string | { [key in Locales]?: string }`
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
  - _Default_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descrição_: Extensões de arquivo a serem procuradas ao construir dicionários.
  - _Exemplo_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: Personalizar extensões de arquivo pode ajudar a evitar conflitos.

- **baseDir**:
  - _Tipo_: `string`
  - _Padrão_: `process.cwd()`
  - _Descrição_: O diretório base para o projeto.
  - _Exemplo_: `'/path/to/project'`
  - _Nota_: Isso é usado para resolver todos os diretórios relacionados ao Intlayer.

- **dictionaryOutput**:
  - _Tipo_: `string[]`
  - _Padrão_: `['intlayer']`
  - _Descrição_: O tipo de saída do dicionário a ser usado, por exemplo, `'intlayer'` ou `'i18next'`.

- **contentDir**:
  - _Tipo_: `string[]`
  - _Padrão_: `['.']`
  - _Exemplo_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Descrição_: O caminho do diretório onde o conteúdo é armazenado.

- **dictionariesDir**:
  - _Tipo_: `string`
  - _Padrão_: `'.intlayer/dictionaries'`
  - _Descrição_: O caminho do diretório para armazenar resultados intermediários ou de saída.

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
  - _Nota_: Certifique-se de que este diretório está configurado para o tipo de saída i18next.

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
  - _Nota_: Esta configuração ainda não é utilizada, mas está planejada para implementação futura.

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

Esta configuração é opcional se você estiver registrado no [Painel do Intlayer](https://intlayer.org/dashboard/project) usando uma chave de acesso. O Intlayer gerenciará automaticamente a solução de IA mais eficiente e econômica para suas necessidades. Usar as opções padrão garante melhor manutenção a longo prazo, pois o Intlayer atualiza continuamente para usar os modelos mais relevantes.

Se preferir usar sua própria chave de API ou modelo específico, você pode definir sua configuração personalizada de IA.
Esta configuração de IA será usada globalmente em todo o seu ambiente Intlayer. Os comandos CLI usarão essas configurações como padrão para os comandos (por exemplo, `fill`), assim como o SDK, Editor Visual e CMS. Você pode substituir esses valores padrão para casos de uso específicos usando parâmetros de comando.

O Intlayer suporta múltiplos provedores de IA para maior flexibilidade e escolha. Os provedores atualmente suportados são:

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
  - _Nota_: Diferentes provedores podem exigir diferentes chaves de API e possuir modelos de preços distintos.

- **model**:
  - _Tipo_: `string`
  - _Padrão_: Nenhum
  - _Descrição_: O modelo a ser usado para os recursos de IA do Intlayer.
  - _Exemplo_: `'gpt-4o-2024-11-20'`
  - _Nota_: O modelo específico a ser usado varia conforme o provedor.

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
  - _Nota_: Importante: As chaves de API devem ser mantidas em segredo e não compartilhadas publicamente. Por favor, certifique-se de mantê-las em um local seguro, como variáveis de ambiente.

- **applicationContext**:
  - _Tipo_: `string`
  - _Padrão_: Nenhum
  - _Descrição_: Fornece contexto adicional sobre sua aplicação para o modelo de IA, ajudando-o a gerar traduções mais precisas e contextualmente apropriadas. Isso pode incluir informações sobre o domínio do seu app, público-alvo, tom ou terminologia específica.

### Configuração de Build

Configurações que controlam como o Intlayer otimiza e constrói a internacionalização da sua aplicação.

As opções de build se aplicam aos plugins `@intlayer/babel` e `@intlayer/swc`.

> No modo de desenvolvimento, o Intlayer usa importações estáticas para dicionários para simplificar a experiência de desenvolvimento.

> Quando otimizado, o Intlayer substituirá as chamadas de dicionários para otimizar a divisão em chunks, de modo que o pacote final importe apenas os dicionários que são realmente usados.

#### Propriedades

- **optimize**:
  - _Tipo_: `boolean`
  - _Padrão_: `process.env.NODE_ENV === 'production'`
  - _Descrição_: Controla se a build deve ser otimizada.
  - _Exemplo_: `true`
  - _Nota_: Quando ativado, o Intlayer substituirá todas as chamadas de dicionários para otimizar a divisão em chunks. Dessa forma, o pacote final importará apenas os dicionários que são usados. Todas as importações permanecerão como importações estáticas para evitar processamento assíncrono ao carregar os dicionários.
  - _Nota_: O Intlayer substituirá todas as chamadas de `useIntlayer` pelo modo definido pela opção `importMode` e `getIntlayer` por `getDictionary`.
  - _Nota_: Esta opção depende dos plugins `@intlayer/babel` e `@intlayer/swc`.
  - _Nota_: Certifique-se de que todas as chaves sejam declaradas estaticamente nas chamadas de `useIntlayer`. Exemplo: `useIntlayer('navbar')`.

- **importMode**:
  - _Tipo_: `'static' | 'dynamic' | 'live'`
  - _Padrão_: `'static'`
  - _Descrição_: Controla como os dicionários são importados.
  - _Exemplo_: `'dynamic'`
  - _Nota_: Modos disponíveis:
    - "static": Os dicionários são importados estaticamente. Substitui `useIntlayer` por `useDictionary`.
    - "dynamic": Os dicionários são importados dinamicamente usando Suspense. Substitui `useIntlayer` por `useDictionaryDynamic`.
  - "live": Os dicionários são buscados dinamicamente usando a API de sincronização ao vivo. Substitui `useIntlayer` por `useDictionaryFetch`.
  - _Nota_: Importações dinâmicas dependem do Suspense e podem impactar levemente o desempenho da renderização.
  - _Nota_: Se desativado, todos os idiomas serão carregados de uma vez, mesmo que não sejam usados.
  - _Nota_: Esta opção depende dos plugins `@intlayer/babel` e `@intlayer/swc`.
  - _Nota_: Garanta que todas as chaves sejam declaradas estaticamente nas chamadas `useIntlayer`. Exemplo: `useIntlayer('navbar')`.
  - _Nota_: Esta opção será ignorada se `optimize` estiver desativado.
  - _Nota_: Se definido como "live", apenas os dicionários que incluem conteúdo remoto e estão marcados como "live" serão transformados no modo live. Os outros serão importados dinamicamente no modo "dynamic" para otimizar o número de consultas fetch e o desempenho de carregamento.
  - _Nota_: O modo live usará a API de sincronização ao vivo para buscar os dicionários. Se a chamada da API falhar, os dicionários serão importados dinamicamente no modo "dynamic".
  - _Nota_: Esta opção não impactará as funções `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` e `useDictionaryDynamic`.

- **traversePattern**:
  - _Tipo_: `string[]`
  - _Padrão_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Descrição_: Padrões que definem quais arquivos devem ser percorridos durante a otimização.
    - _Exemplo_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Nota_: Use isso para limitar a otimização aos arquivos de código relevantes e melhorar o desempenho da compilação.
  - _Nota_: Esta opção será ignorada se `optimize` estiver desativado.
  - _Nota_: Use padrão glob.

## Histórico da Documentação

| Versão | Data       | Alterações                           |
| ------ | ---------- | ------------------------------------ |
| 6.0.0  | 2025-09-16 | Adicionado modo de importação `live` |

- _Descrição_: Padrões que definem quais arquivos devem ser percorridos durante a otimização.
- _Exemplo_: `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']`
- _Nota_: Use isso para limitar a otimização aos arquivos de código relevantes e melhorar o desempenho da build.
- _Nota_: Esta opção será ignorada se `optimize` estiver desativado.
- _Nota_: Use padrão glob.

## Histórico da Documentação

| Versão | Data       | Alterações                                                                                            |
| ------ | ---------- | ----------------------------------------------------------------------------------------------------- |
| 6.0.0  | 2025-09-16 | Adicionado modo de importação `live`                                                                  |
| 6.0.0  | 2025-09-04 | Substituído o campo `hotReload` por `liveSync` e adicionados os campos `liveSyncPort` e `liveSyncURL` |
| 5.6.1  | 2025-07-25 | Substituído `activateDynamicImport` pela opção `importMode`                                           |
| 5.6.0  | 2025-07-13 | Alterado o valor padrão de contentDir de `['src']` para `['.']`                                       |
| 5.5.11 | 2025-06-29 | Adicionados comandos `docs`                                                                           |
