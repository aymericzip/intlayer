# Documentação de Configuração do Intlayer

## Visão Geral

Os arquivos de configuração do Intlayer permitem a personalização de vários aspectos do plugin, como internacionalização, middleware e manipulação de conteúdo. Este documento fornece uma descrição detalhada de cada propriedade na configuração.

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
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
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
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
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
  - _Nota_: Se estiver vazio, todos os idiomas são obrigatórios no modo `strict`.
  - _Nota_: Certifique-se de que os idiomas obrigatórios também estejam definidos no campo `locales`.
- **strictMode**:

  - _Tipo_: `string`
  - _Padrão_: `inclusive`
  - _Descrição_: Garante implementações rigorosas de conteúdo internacionalizado usando TypeScript.
  - _Nota_: Se definido como "strict", a função de tradução `t` exigirá que cada idioma declarado seja definido. Se um idioma estiver ausente ou não for declarado na configuração, ocorrerá um erro.
  - _Nota_: Se definido como "inclusive", a função de tradução `t` exigirá que cada idioma declarado seja definido. Se um idioma estiver ausente, será exibido um aviso. Mas aceitará se um idioma não for declarado na configuração, mas existir.
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
  - _Padrão_: `'*'`
  - _Descrição_: A URL da aplicação. Usada para restringir a origem do editor por motivos de segurança.
  - _Exemplo_:
    - `'*'`
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: A URL da aplicação. Usada para restringir a origem do editor por motivos de segurança. Se definido como `'*'`, o editor é acessível de qualquer origem.

- **port**:

  - _Tipo_: `number`
  - _Padrão_: `8000`
  - _Descrição_: A porta usada pelo servidor do editor visual.

- **editorURL**:

  - _Tipo_: `string`
  - _Padrão_: `'http://localhost:8000'`
  - _Descrição_: A URL do servidor do editor. Usada para restringir a origem do editor por motivos de segurança.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
    - `''*'`
  - _Nota_: A URL do servidor do editor para acessar a aplicação. Usada para restringir as origens que podem interagir com a aplicação por motivos de segurança. Se definido como `'*'`, o editor é acessível de qualquer origem. Deve ser configurado se a porta for alterada ou se o editor estiver hospedado em um domínio diferente.

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
  - _Nota_: Como o recarregamento automático requer uma conexão contínua com o servidor, está disponível apenas para clientes do plano `enterprise`.

- **dictionaryPriorityStrategy**:
  - _Tipo_: `string`
  - _Padrão_: `'local_first'`
  - _Descrição_: A estratégia para priorizar dicionários no caso de dicionários locais e remotos estarem presentes. Se definido como `'distant_first'`, a aplicação priorizará dicionários remotos sobre locais. Se definido como `'local_first'`, a aplicação priorizará dicionários locais sobre remotos.
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
  - _Padrão_: `true`
  - _Descrição_: Se deve incluir o idioma padrão na URL.
  - _Exemplo_: `false`
  - _Nota_: Se `false`, URLs para o idioma padrão não terão um prefixo de idioma.
- **basePath**:
  - _Tipo_: `string`
  - _Padrão_: `''`
  - _Descrição_: O caminho base para as URLs da aplicação.
  - _Exemplo_: `'/my-app'`
  - _Nota_: Isso afeta como as URLs são construídas para a aplicação.
- **serverSetCookie**:
  - _Tipo_: `string`
  - _Padrão_: `'always'`
  - _Descrição_: Regra para definir o cookie de idioma no servidor.
  - _Opções_: `'always'`, `'never'`
  - _Exemplo_: `'never'`
  - _Nota_: Controla se o cookie de idioma é definido em cada solicitação ou nunca.
- **noPrefix**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Se deve omitir o prefixo de idioma nas URLs.
  - _Exemplo_: `true`
  - _Nota_: Se `true`, as URLs não conterão informações de idioma.

---

### Configuração de Conteúdo

Configurações relacionadas ao manuseio de conteúdo dentro da aplicação, incluindo nomes de diretórios, extensões de arquivos e configurações derivadas.

#### Propriedades

- **watch**:
  - _Tipo_: `boolean`
  - _Padrão_: `process.env.NODE_ENV === 'development'`
  - _Descrição_: Indica se o Intlayer deve observar alterações nos arquivos de declaração de conteúdo no aplicativo para reconstruir os dicionários relacionados.
- **fileExtensions**:
  - _Tipo_: `string[]`
  - _Padrão_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
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
  - _Descrição_: O tipo de saída de dicionário a ser usado, por exemplo, `'intlayer'` ou `'i18next'`.
- **contentDirName**:
  - _Tipo_: `string`
  - _Padrão_: `'src'`
  - _Descrição_: O nome do diretório onde o conteúdo é armazenado.
  - _Exemplo_: `'data'`, `'content'`, `'locales'`
  - _Nota_: Se não estiver no nível do diretório base, atualize o `contentDir`.
- **contentDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'baseDir'` / `'contentDirName'`
  - _Descrição_: O caminho do diretório onde o conteúdo é armazenado.

- **resultDirName**:
  - _Tipo_: `string`
  - _Padrão_: `'.intlayer'`
  - _Descrição_: O nome do diretório onde os resultados são armazenados.
  - _Exemplo_: `'outputOFIntlayer'`
  - _Nota_: Se este diretório não estiver no nível base, atualize `resultDir`.
- **resultDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'baseDir'` / `'resultDirName'`
  - _Descrição_: O caminho do diretório para armazenar resultados intermediários ou de saída.

- **moduleAugmentationDirName**:

  - _Tipo_: `string`
  - _Padrão_: `'types'`
  - _Descrição_: Diretório para aumento de módulo, permitindo melhores sugestões de IDE e verificação de tipos.
  - _Exemplo_: `'intlayer-types'`
  - _Nota_: Certifique-se de incluir isso no `tsconfig.json`.

- **moduleAugmentationDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Descrição_: O caminho para aumento de módulo e definições de tipos adicionais.

- **dictionariesDirName**:
  - _Tipo_: `string`
  - _Padrão_: `'dictionary'`
  - _Descrição_: Diretório para armazenar dicionários.
  - _Exemplo_: `'translations'`
  - _Nota_: Se não estiver no nível do diretório de resultados, atualize `dictionariesDir`.
- **dictionariesDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'resultDir'` / `'dictionariesDirName'`
  - _Descrição_: O diretório para armazenar dicionários de localização.

- **i18nextResourcesDirName**:
  - _Tipo_: `string`
  - _Padrão_: `'i18next_dictionary'`
  - _Descrição_: Diretório para armazenar dicionários i18n.
  - _Exemplo_: `'translations'`
  - _Nota_: Se não estiver no nível do diretório de resultados, atualize `i18nextResourcesDir`.
  - _Nota_: Certifique-se de que a saída dos dicionários i18n inclua i18next para construir os dicionários para i18next.
- **i18nextResourcesDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'resultDir'` / `'i18nextResourcesDirName'`
  - _Descrição_: O diretório para armazenar dicionários i18n.
  - _Nota_: Certifique-se de que este diretório esteja configurado para o tipo de saída i18next.

- **typeDirName**:

  - _Tipo_: `string`
  - _Padrão_: `'types'`
  - _Descrição_: Diretório para armazenar tipos de dicionário.
  - _Exemplo_: `'intlayer-types'`
  - _Nota_: Se não estiver no nível do diretório de resultados, atualize `typesDir`.

- **typesDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'resultDir'` / `'typeDirName'`
  - _Descrição_: O diretório para armazenar tipos de dicionário.

- **mainDirName**:
  - _Tipo_: `string`
  - _Padrão_: `'main'`
  - _Descrição_: Diretório para armazenar arquivos principais.
  - _Exemplo_: `'intlayer-main'`
  - _Nota_: Se não estiver no nível do diretório de resultados, atualize `mainDir`.
- **mainDir**:
  - _Tipo_: `string`
  - _Derivado de_: `'resultDir'` / `'mainDirName'`
  - _Descrição_: O diretório onde os arquivos principais da aplicação são armazenados.
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
