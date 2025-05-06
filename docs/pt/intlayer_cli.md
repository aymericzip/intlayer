# Intlayer CLI

## Instalar Pacote

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

> Se o pacote `intlayer` já estiver instalado, o CLI será automaticamente instalado. Você pode pular esta etapa.

## Pacote intlayer-cli

O pacote `intlayer-cli` tem como objetivo transpilar suas [declarações intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md) em dicionários.

Este pacote transpilará todos os arquivos intlayer, como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Veja como declarar seus arquivos de declaração Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar dicionários intlayer, você pode usar interpretadores, como [react-intlayer](https://www.npmjs.com/package/react-intlayer) ou [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Suporte a Arquivo de Configuração

O Intlayer aceita múltiplos formatos de arquivo de configuração:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver como configurar os locais disponíveis ou outros parâmetros, consulte a [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Executar comandos intlayer

### Construir dicionários

Para construir seus dicionários, você pode executar os comandos:

```bash
npx intlayer dictionaries build
```

ou no modo de observação

```bash
npx intlayer dictionaries build --watch
```

Este comando encontrará seus arquivos de conteúdo de declaração como padrão em `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E construirá os dicionários no diretório `.intlayer`.

### Enviar dicionários

```bash
npx intlayer dictionary push
```

Se o [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) estiver instalado, você também pode enviar dicionários para o editor. Este comando permitirá tornar os dicionários disponíveis para [o editor](https://intlayer.org/dashboard). Dessa forma, você pode compartilhar seus dicionários com sua equipe e editar seu conteúdo sem editar o código de sua aplicação.

##### Argumentos:

- `-d`, `--dictionaries`: ids dos dicionários a serem enviados. Se não especificado, todos os dicionários serão enviados.
  > Exemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Pula a pergunta que pergunta se deseja excluir os diretórios de locais uma vez que os dicionários são enviados, e os remove. Por padrão, se o dicionário estiver definido localmente, ele sobrescreverá o conteúdo dos dicionários distantes.
  > Exemplo: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Pula a pergunta que pergunta se deseja excluir os diretórios de locais uma vez que os dicionários são enviados, e os mantém. Por padrão, se o dicionário estiver definido localmente, ele sobrescreverá o conteúdo dos dicionários distantes.
  > Exemplo: `npx intlayer dictionary push -k`

### Buscar dicionários distantes

```bash
npx intlayer dictionary pull
```

Se o [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) estiver instalado, você também pode buscar dicionários do editor. Dessa forma, você pode sobrescrever o conteúdo de seus dicionários para atender às necessidades de sua aplicação.

##### Argumentos:

- `-d, --dictionaries`: Ids dos dicionários a serem buscados. Se não especificado, todos os dicionários serão buscados.
  > Exemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Caminho para o diretório onde os novos dicionários serão salvos. Se não especificado, os novos dicionários serão salvos no diretório `./intlayer-dictionaries` do projeto. Se um campo `filePath` for especificado no conteúdo do seu dicionário, os dicionários não considerarão este argumento e serão salvos no diretório especificado em `filePath`.

##### Exemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Auditar dicionários

```bash
npx intlayer audit
```

Este comando analisa seus arquivos de declaração de conteúdo em busca de possíveis problemas, como traduções ausentes, inconsistências estruturais ou incompatibilidades de tipo. Se encontrar algum problema, o **intlayer audit** proporá ou aplicará atualizações para manter seus dicionários consistentes e completos.

##### Argumentos:

- **`-f, --files [files...]`**  
  Uma lista de arquivos específicos de declaração de conteúdo a serem auditados. Se não fornecido, todos os arquivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` descobertos serão auditados.

- **`--exclude [excludedGlobs...]`**  
  Padrões glob para excluir da auditoria (ex.: `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  O modelo ChatGPT a ser usado para a auditoria (ex.: `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Forneça um prompt personalizado para suas instruções de auditoria.

- **`-l, --async-limit [asyncLimit]`**  
  Número máximo de arquivos a serem processados simultaneamente.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Forneça sua própria chave de API OpenAI para ignorar a autenticação OAuth2.

##### Exemplo:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Este comando ignorará quaisquer arquivos em `tests/**` e usará o modelo `gpt-3.5-turbo` para auditar os arquivos de declaração de conteúdo descobertos. Se forem encontrados problemas, como traduções ausentes, eles serão corrigidos no local, preservando a estrutura original do arquivo.

### Gerenciar Configuração

#### Obter Configuração

O comando `get configuration` recupera a configuração atual do Intlayer, particularmente as configurações de localidade. Isso é útil para verificar sua configuração.

```bash
npx intlayer config get
```

##### Argumentos:

- **`--env`**: Especifica o ambiente (ex.: `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--verbose`**: Habilita o registro detalhado para depuração.

#### Enviar Configuração

O comando `push configuration` carrega sua configuração para o CMS e editor do Intlayer. Esta etapa é necessária para habilitar o uso de dicionários distantes no Editor Visual do Intlayer.

```bash
npx intlayer config push
```

##### Argumentos:

- **`--env`**: Especifica o ambiente (ex.: `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--verbose`**: Habilita o registro detalhado para depuração.

Ao enviar a configuração, seu projeto é totalmente integrado ao CMS do Intlayer, permitindo um gerenciamento de dicionários contínuo entre equipes.

## Usar comandos intlayer no seu `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
