# Intlayer Documentation de Configuração

## Visão Geral

Os arquivos de configuração do Intlayer permitem a personalização de vários aspectos do plugin, como internacionalização, middleware e manipulação de conteúdo. Este documento fornece uma descrição detalhada de cada propriedade na configuração.

---

## Suporte ao Arquivo de Configuração

O Intlayer aceita formatos de arquivos de configuração JSON, JS, MJS e TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Exemplo de arquivo de configuração

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.PORTUGUESE], // Alterado para Português
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

export default config;
```

```javascript
// intlayer.config.cjs

const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.PORTUGUESE], // Alterado para Português
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

module.exports = config;
```

```json5
// .intlayerrc

{
  "internationalization": {
    "locales": ["pt"], // Alterado para Português
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

Define configurações relacionadas à internacionalização, incluindo locais disponíveis e o local padrão para a aplicação.

#### Propriedades

- **locales**:
  - _Tipo_: `string[]`
  - _Padrão_: `['pt']` // Alterado para Português
  - _Descrição_: A lista de locais suportados na aplicação.
  - _Exemplo_: `['pt', 'fr', 'es']`
- **strictMode**:

  - _Tipo_: `string`
  - _Padrão_: `required_only`
  - _Descrição_: Garantir implementações robustas de conteúdo internacionalizado usando typescript.
  - _Nota_: Se definido como "strict", a função de tradução `t` exigirá que cada local declarado seja definido. Se um local estiver faltando ou se um local não estiver declarado em sua config, lançará um erro.
  - _Nota_: Se definido como "required_only", a função de tradução `t` exigirá que cada local declarado seja definido. Se um local estiver faltando, lançará um aviso. Mas aceitará se um local não estiver declarado em sua config, mas existir.
  - _Nota_: Se definido como "loose", a função de tradução `t` aceitará qualquer local existente.

- **defaultLocale**:
  - _Tipo_: `string`
  - _Padrão_: `'pt'` // Alterado para Português
  - _Descrição_: O local padrão usado como fallback se o local solicitado não for encontrado.
  - _Exemplo_: `'pt'`
  - _Nota_: Isso é usado para determinar o local quando nenhum é especificado na URL, cookie ou cabeçalho.

---

### Configuração do Editor

Define as configurações relacionadas ao editor integrado, incluindo a porta do servidor e o status ativo.

#### Propriedades

- **backendURL**:

  - _Tipo_: `string`
  - _Padrão_: `https://back.intlayer.org`
  - _Descrição_: A URL do servidor backend.
  - _Exemplo_: `http://localhost:4000`

- **enabled**:

  - _Tipo_: `boolean`
  - _Padrão_: `true`
  - _Descrição_: Indica se o editor está ativo.
  - _Exemplo_: `true`
  - _Nota_: Pode ser definido usando NODE_ENV ou outra variável de ambiente dedicada.

- **clientId**:

  - _Tipo_: `string` | `undefined`
  - _Padrão_: `undefined`
  - _Descrição_: clientId e clientSecret permitem que os pacotes do intlayer se autenticam com o backend usando autenticação oAuth2. Um token de acesso é usado para autenticar o usuário relacionado ao projeto. Para obter um token de acesso, vá para https://back.intlayer.org/dashboard/project e crie uma conta.
  - _Exemplo_: `true`
  - _Nota_: Importante: O clientId e o clientSecret devem ser mantidos em segredo e não compartilhados publicamente. Certifique-se de mantê-los em um local seguro, como variáveis de ambiente.

- **clientSecret**:
  - _Tipo_: `string` | `undefined`
  - _Padrão_: `undefined`
  - _Descrição_: clientId e clientSecret permitem que os pacotes do intlayer se autenticam com o backend usando autenticação oAuth2. Um token de acesso é usado para autenticar o usuário relacionado ao projeto. Para obter um token de acesso, vá para https://back.intlayer.org/dashboard/project e crie uma conta.
  - _Exemplo_: `true`
  - _Nota_: Importante: O clientId e o clientSecret devem ser mantidos em segredo e não compartilhados publicamente. Certifique-se de mantê-los em um local seguro, como variáveis de ambiente.

### Configuração de Middleware

Configurações que controlam o comportamento do middleware, incluindo como a aplicação manipula cookies, cabeçalhos e prefixos de URL para gerenciamento de locais.

#### Propriedades

- **headerName**:
  - _Tipo_: `string`
  - _Padrão_: `'x-intlayer-locale'`
  - _Descrição_: O nome do cabeçalho HTTP usado para determinar o local.
  - _Exemplo_: `'x-custom-locale'`
  - _Nota_: Isso é útil para determinação de local baseada em API.
- **cookieName**:
  - _Tipo_: `string`
  - _Padrão_: `'intlayer-locale'`
  - _Descrição_: O nome do cookie usado para armazenar o local.
  - _Exemplo_: `'custom-locale'`
  - _Nota_: Usado para persistir o local entre sessões.
- **prefixDefault**:
  - _Tipo_: `boolean`
  - _Padrão_: `true`
  - _Descrição_: Se incluir ou não o local padrão na URL.
  - _Exemplo_: `false`
  - _Nota_: Se `false`, as URLs para o local padrão não terão um prefixo de local.
- **basePath**:
  - _Tipo_: `string`
  - _Padrão_: `''`
  - _Descrição_: O caminho base para as URLs da aplicação.
  - _Exemplo_: `'/my-app'`
  - _Nota_: Isso afeta como as URLs são construídas para a aplicação.
- **serverSetCookie**:
  - _Tipo_: `string`
  - _Padrão_: `'always'`
  - _Descrição_: Regra para definir o cookie de local no servidor.
  - _Opções_: `'always'`, `'never'`
  - _Exemplo_: `'never'`
  - _Nota_: Controla se o cookie de local é definido em cada solicitação ou nunca.
- **noPrefix**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Se omitir ou não o prefixo de local das URLs.
  - _Exemplo_: `true`
  - _Nota_: Se `true`, as URLs não conterão informações de local.

---

### Configuração de Conteúdo

Configurações relacionadas à manipulação de conteúdo dentro da aplicação, incluindo nomes de diretórios, extensões de arquivos e configurações derivadas.

#### Propriedades

- **watch**:
  - _Tipo_: `boolean`
  - _Padrão_: `process.env.NODE_ENV === 'development'`
  - _Descrição_: Indica se o Intlayer deve observar alterações nos arquivos de declaração de conteúdo na aplicação para reconstruir os dicionários relacionados.
- **fileExtensions**:
  - _Tipo_: `string[]`
  - _Padrão_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descrição_: Extensões de arquivo a serem procuradas ao construir dicionários.
  - _Exemplo_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: A personalização das extensões de arquivo pode ajudar a evitar conflitos.
- **baseDir**:
  - _Tipo_: `string`
  - _Padrão_: `process.cwd()`
  - _Descrição_: O diretório base para o projeto.
  - _Exemplo_: `'/path/to/project'`
  - _Nota_: Isso é usado para resolver todos os diretórios relacionados ao Intlayer.
- **dictionaryOutput**:
  - _Tipo_: `string[]`
  - _Padrão_: `['intlayer']`
  - _Descrição_: O tipo de saída do dicionário a ser usado, e.g., `'intlayer'` ou `'i18next'`.
- **contentDirName**:
  - _Tipo_: `string`
  - _Padrão_: `'src'`
  - _Descrição_: O nome do diretório onde o conteúdo é armazenado.
  - _Exemplo_: `'data'`, `'content'`, `'locales'`
  - _Nota_: Se não estiver no nível do diretório base, atualize o `contentDir`.
- **contentDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'baseDir'` / `'contentDirName'`
  - _Descrição_: O caminho do diretório onde o conteúdo é armazenado.

- **resultDirName**:
  - _Tipo_: `string`
  - _Padrão_: `'.intlayer'`
  - _Descrição_: O nome do diretório onde os resultados são armazenados.
  - _Exemplo_: `'outputOFIntlayer'`
  - _Nota_: Se este diretório não estiver no nível base, atualize o `resultDir`.
- **resultDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'baseDir'` / `'resultDirName'`
  - _Descrição_: O caminho do diretório para armazenar resultados intermediários ou de saída.

- **moduleAugmentationDirName**:

  - _Tipo_: `string`
  - _Padrão_: `'types'`
  - _Descrição_: Diretório para augmentação de módulo, permitindo melhores sugestões de IDE e verificação de tipos.
  - _Exemplo_: `'intlayer-types'`
  - _Nota_: Certifique-se de incluir isso em `tsconfig.json`.

- **moduleAugmentationDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Descrição_: O caminho para augmentação de módulo e definições de tipo adicionais.

- **dictionariesDirName**:
  - _Tipo_: `string`
  - _Padrão_: `'dictionary'`
  - _Descrição_: Diretório para armazenar dicionários.
  - _Exemplo_: `'translations'`
  - _Nota_: Se não estiver no nível do diretório de resultados, atualize o `dictionariesDir`.
- **dictionariesDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'resultDir'` / `'dictionariesDirName'`
  - _Descrição_: O diretório para armazenar dicionários de localização.

- **i18nDictionariesDirName**:
  - _Tipo_: `string`
  - _Padrão_: `'i18n_dictionary'`
  - _Descrição_: Diretório para armazenar dicionários i18n.
  - _Exemplo_: `'translations'`
  - _Nota_: Se não estiver no nível do diretório de resultados, atualize o `i18nDictionariesDir`.
  - _Nota_: Certifique-se de que a saída dos dicionários i18n inclua i18next para construir os dicionários para i18next.
- **i18nDictionariesDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _Descrição_: O diretório para armazenar dicionários i18n.
  - _Nota_: Certifique-se de que este diretório está configurado para o tipo de saída do i18next.

- **typeDirName**:

  - _Tipo_: `string`
  - _Padrão_: `'types'`
  - _Descrição_: Diretório para armazenar tipos de dicionário.
  - _Exemplo_: `'intlayer-types'`
  - _Nota_: Se não estiver no nível do diretório de resultados, atualize `typesDir`.

- **typesDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'resultDir'` / `'typeDirName'`
  - _Descrição_: O diretório para armazenar tipos de dicionário.

- **mainDirName**:
  - _Tipo_: `string`
  - _Padrão_: `'main'`
  - _Descrição_: Diretório para armazenar arquivos principais.
  - _Exemplo_: `'intlayer-main'`
  - _Nota_: Se não estiver no nível do diretório de resultados, atualize `mainDir`.
- **mainDir**:
  - _Tipo_: `string`
  - _DerivedFrom_: `'resultDir'` / `'mainDirName'`
  - _Descrição_: O diretório onde os arquivos principais da aplicação são armazenados.
- **excludedPath**:
  - _Tipo_: `string[]`
  - _Padrão_: `['node_modules']`
  - _Descrição_: Diretórios excluídos da pesquisa de conteúdo.
  - _Nota_: Esta configuração ainda não está em uso, mas está planejada para futuras implementações.
