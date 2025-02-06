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

> Se o pacote `intlayer` já estiver instalado, o cli é instalado automaticamente. Você pode pular esta etapa.

## pacote intlayer-cli

O pacote `intlayer-cli` visa transpilar suas [declarações intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md) em dicionários.

Este pacote transpilará todos os arquivos intlayer, como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Veja como declarar seus arquivos de declaração Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar dicionários intlayer, você pode usar interpretadores, como [react-intlayer](https://www.npmjs.com/package/react-intlayer), ou [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Suporte a Arquivos de Configuração

Intlayer aceita múltiplos formatos de arquivos de configuração:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver como configurar locais disponíveis ou outros parâmetros, consulte a [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Executar comandos intlayer

### Construir dicionários

Para construir seus dicionários, você pode executar os comandos:

```bash
npx intlayer build
```

ou no modo de observação

```bash
npx intlayer build --watch
```

Este comando encontrará seus arquivos de conteúdo de declaração como padrão em `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E construirá os dicionários no diretório `.intlayer`.

### Enviar dicionários

```bash
npx intlayer dictionary push
```

Se o [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md) estiver instalado, você também pode enviar dicionários para o editor. Este comando permitirá disponibilizar os dicionários para [o editor](https://intlayer.org/dashboard). Dessa forma, você pode compartilhar seus dicionários com sua equipe e editar seu conteúdo sem editar o código de sua aplicação.

##### Argumentos:

- `-d`, `--dictionaries`: ids dos dicionários a serem enviados. Se não especificado, todos os dicionários serão enviados.
  > Exemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Ignorar a pergunta que pergunta se deseja excluir os diretórios de locais uma vez que os dicionários sejam enviados e removê-los. Por padrão, se o dicionário for definido localmente, ele substituirá o conteúdo dos dicionários remotos.
  > Exemplo: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Ignorar a pergunta que pergunta se deseja excluir os diretórios de locais uma vez que os dicionários sejam enviados e mantê-los. Por padrão, se o dicionário for definido localmente, ele substituirá o conteúdo dos dicionários remotos.
  > Exemplo: `npx intlayer dictionary push -k`

### Puxar dicionários remotos

```bash
npx intlayer dictionary pull
```

Se o [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md) estiver instalado, você também pode puxar dicionários do editor. Dessa forma, você pode substituir o conteúdo de seus dicionários para a necessidade de sua aplicação.

##### Argumentos:

- `-d, --dictionaries`: Ids dos dicionários a serem puxados. Se não especificado, todos os dicionários serão puxados.
  > Exemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Caminho para o diretório onde os novos dicionários serão salvos. Se não especificado, os novos dicionários serão salvos no diretório `./intlayer-dictionaries` do projeto. Se um campo `filePath` for especificado no conteúdo do seu dicionário, os dicionários não considerarão este argumento e serão salvos no diretório `filePath` especificado.

##### Exemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Auditar dicionários

```bash
npx intlayer audit
```

Este comando analisa seus arquivos de declaração de conteúdo para possíveis problemas, como traduções faltando, inconsistências estruturais ou incompatibilidades de tipo. Se encontrar algum problema, **intlayer audit** proporá ou aplicará atualizações para manter seus dicionários consistentes e completos.

##### Argumentos:

- **`-f, --files [files...]`**  
  Uma lista de arquivos de declaração de conteúdo específicos a serem auditados. Se não fornecido, todos os arquivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` descobertos serão auditados.

- **`--exclude [excludedGlobs...]`**  
  Padrão de globs a ser excluído da auditoria (por exemplo, `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  O modelo ChatGPT a ser usado para a auditoria (por exemplo, `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Fornecer um prompt personalizado para suas instruções de auditoria.

- **`-l, --async-limit [asyncLimit]`**  
  Número máximo de arquivos a serem processados simultaneamente.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Fornecer sua própria chave de API OpenAI para contornar a autenticação OAuth2.

##### Exemplo:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Este comando ignorará quaisquer arquivos sob `tests/**` e usará o modelo `gpt-3.5-turbo` para auditar os arquivos de declaração de conteúdo descobertos. Se algum problema for encontrado — como traduções faltando — eles serão corrigidos no local, preservando a estrutura do arquivo original.

## Usar comandos intlayer em seu `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
