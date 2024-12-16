# Intlayer CLI

## Instalar Pacote

Instale os pacotes necessários usando npm:

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> Nota: se o pacote `intlayer` já estiver instalado, o cli será instalado automaticamente. Você pode pular esta etapa.

## pacotes intlayer-cli

O pacote `intlayer-cli` destina-se a transpilar suas declarações [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md) em dicionários.

Este pacote irá transpilar todos os arquivos intlayer, como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Veja como declarar seus arquivos de declaração Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar dicionários intlayer, você pode usar intérpretes, como [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/README.md) ou [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/README.md)

## Suporte a Arquivo de Configuração

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

ou em modo de vigilância

```bash
npx intlayer build --watch
```

Este comando encontrará seus arquivos de conteúdo de declaração como padrão como `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E construirá os dicionários no diretório `.intlayer`.

### Enviar dicionários

```bash
npx intlayer push
```

Se o [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md) estiver instalado, você também pode enviar dicionários para o editor. Este comando permitirá disponibilizar os dicionários para o editor em [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content). Dessa forma, você pode compartilhar seus dicionários com sua equipe e editar seu conteúdo sem editar o código de sua aplicação.

##### Argumentos:

- `-d`, `--dictionaries`: ids dos dicionários a serem puxados. Se não especificado, todos os dicionários serão enviados.
  > Exemplo: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Pule a pergunta que pergunta se deseja excluir os diretórios de locais uma vez que os dicionários sejam enviados, e remova-os. Por padrão, se o dicionário estiver definido localmente, ele sobrescreverá o conteúdo dos dicionários remotos.
  > Exemplo: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: Pule a pergunta que pergunta se deseja excluir os diretórios de locais uma vez que os dicionários sejam enviados, e os mantenha. Por padrão, se o dicionário estiver definido localmente, ele sobrescreverá o conteúdo dos dicionários remotos.
  > Exemplo: `npx intlayer push -k`

### Puxar dicionários remotos

```bash
npx intlayer pull
```

Se o [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md) estiver instalado, você também pode puxar dicionários do editor. Dessa forma, você pode sobrescrever o conteúdo dos seus dicionários para a necessidade de sua aplicação.

##### Argumentos:

- `-d, --dictionaries`: Ids dos dicionários a serem puxados. Se não especificado, todos os dicionários serão puxados.
  > Exemplo: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Caminho para o diretório onde os novos dicionários serão salvos. Se não especificado, os novos dicionários serão salvos no diretório `./intlayer-dictionaries` do projeto. Se um campo `filePath` for especificado no conteúdo do seu dicionário, os dicionários não considerarão este argumento e serão salvos no diretório `filePath` especificado.
  > Exemplo: `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## Use comandos intlayer em seu `package.json`:

```json
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
