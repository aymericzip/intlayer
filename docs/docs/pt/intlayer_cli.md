---
docName: intlayer_cli
url: https://intlayer.org/doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: CLI
description: Descubra como usar o Intlayer CLI para gerenciar seu site multilíngue. Siga as etapas desta documentação online para configurar seu projeto em poucos minutos.
keywords:
  - CLI
  - Interface de Linha de Comando
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer CLI

## Instalar Pacote

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Se o pacote `intlayer` já estiver instalado, o CLI será automaticamente instalado. Você pode pular esta etapa.

## Pacote intlayer-cli

O pacote `intlayer-cli` tem como objetivo transpilar suas [declarações intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md) em dicionários.

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

Para ver como configurar os locais disponíveis ou outros parâmetros, consulte a [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

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

Se o [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) estiver instalado, você também pode enviar dicionários para o editor. Este comando permitirá tornar os dicionários disponíveis para [o editor](https://intlayer.org/dashboard). Dessa forma, você pode compartilhar seus dicionários com sua equipe e editar seu conteúdo sem editar o código de sua aplicação.

##### Argumentos:

- `-d`, `--dictionaries`: IDs dos dicionários a serem enviados. Se não especificado, todos os dicionários serão enviados.
  > Exemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Ignora a pergunta sobre excluir o diretório de localização após o envio do dicionário e exclui. Por padrão, se o dicionário estiver definido localmente, ele sobrescreve o conteúdo do dicionário remoto.
  > Exemplo: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Ignora a pergunta sobre excluir o diretório de localização após o envio do dicionário e mantém. Por padrão, se o dicionário estiver definido localmente, ele sobrescreve o conteúdo do dicionário remoto.
  > Exemplo: `npx intlayer dictionary push -k`
- `--env`: Especifica o ambiente (ex: `development`, `production`).
- `--env-file`: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- `--base-dir`: Especifica o diretório base do projeto.
- `--verbose`: Ativa o registro detalhado para depuração.
- `--git-diff`: Executa apenas dicionários com alterações não enviadas no repositório git.
- `--git-diff-base`: Especifica a referência base para o git diff.
- `--git-diff-current`: Especifica a referência atual para o git diff.
- `--uncommitted`: Inclui alterações não commitadas.
- `--unpushed`: Inclui alterações não enviadas.
- `--untracked`: Inclui arquivos não rastreados.

### Obter Dicionários Remotos

```bash
npx intlayer dictionary pull
```

Se você tiver o [Editor Visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) instalado, você também pode obter dicionários do editor. Isso permite sobrescrever o conteúdo dos dicionários de acordo com as necessidades da sua aplicação.

##### Argumentos:

- `-d, --dictionaries`: IDs dos dicionários a serem obtidos. Se não especificado, todos os dicionários serão obtidos.
  > Exemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Caminho do diretório onde os novos dicionários serão armazenados. Se não especificado, os novos dicionários serão armazenados no diretório `./intlayer-dictionaries` do projeto. Se o conteúdo do dicionário tiver um campo `filePath` especificado, o dicionário será armazenado no diretório `filePath` especificado, ignorando este argumento.
- `--env`: Especifica o ambiente (ex: `development`, `production`).
- `--env-file`: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- `--base-dir`: Especifica o diretório base do projeto.
- `--verbose`: Ativa o registro detalhado para depuração.

##### Exemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Auditoria de Dicionários

```bash
npx intlayer audit
```

Este comando analisa os arquivos de declaração de conteúdo para encontrar problemas potenciais, como traduções ausentes, inconsistências estruturais ou incompatibilidades de tipo. Se problemas forem encontrados, o **intlayer audit** sugere ou aplica atualizações para manter os dicionários consistentes e completos.

##### Argumentos:

- **`-f, --files [files...]`**  
  Lista de arquivos de declaração de conteúdo específicos para auditar. Se não fornecido, todos os arquivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` encontrados serão auditados.

- **`--exclude [excludedGlobs...]`**  
  Padrões glob para excluir da auditoria (ex: `--exclude "src/test/**"`).

- **`--source-locale [sourceLocale]`**  
  Local de origem para tradução. Se não especificado, o local padrão da configuração será usado.

- **`--output-locales [outputLocales...]`**  
  Locais de destino para tradução. Se não especificado, todos os locais da configuração, exceto o local de origem, serão usados.

- **`--mode [mode]`**  
  Modo de tradução: 'complete', 'review', ou 'missing-only'. O padrão é 'missing-only'.

- **`--git-diff`**  
  Executa apenas dicionários com alterações não enviadas no repositório git.

- **`--git-diff-base`**  
  Especifica a referência base para o git diff.

- **`--git-diff-current`**  
  Especifica a referência atual para o git diff.

- **`--uncommitted`**  
  Inclui alterações não commitadas.

- **`--unpushed`**  
  Inclui alterações não enviadas.

- **`--untracked`**  
  Inclui arquivos não rastreados.

- **`--keys [keys...]`**  
  Filtra dicionários com base em chaves específicas.

- **`--excluded-keys [excludedKeys...]`**  
  Exclui dicionários com base em chaves específicas.

- **`--path-filter [pathFilters...]`**  
  Filtra dicionários com base em padrões glob de caminho de arquivo.

- **`--model [model]`**  
  Modelo de IA a ser usado para tradução (ex: `gpt-3.5-turbo`).

- **`--provider [provider]`**  
  Provedor de IA a ser usado para tradução.

- **`--temperature [temperature]`**  
  Configuração de temperatura para o modelo de IA.

- **`--api-key [apiKey]`**  
  Fornece sua própria chave de API para o serviço de IA.

- **`--custom-prompt [prompt]`**  
  Fornece um prompt personalizado para instruções de tradução.

- **`--application-context [applicationContext]`**  
  Fornece contexto adicional para tradução de IA.

- **`--env`**  
  Especifica o ambiente (ex: `development`, `production`).

- **`--env-file [envFile]`**  
  Fornece um arquivo de ambiente personalizado para carregar variáveis.

- **`--base-dir`**  
  Especifica o diretório base do projeto.

- **`--verbose`**  
  Ativa o registro detalhado para depuração.

##### Exemplo:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Este comando traduz o conteúdo de todos os arquivos de declaração de conteúdo no diretório `src/home/` do inglês para francês e espanhol usando o modelo GPT-3.5 Turbo.

### Gerenciamento de Configuração

#### Obter Configuração

O comando `get configuration` obtém a configuração atual do Intlayer, especialmente as configurações de local. Isso é útil para verificar a configuração.

```bash
npx intlayer config get
```

##### Argumentos:

- **`--env`**: Especifica o ambiente (ex: `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base do projeto.
- **`--verbose`**: Ativa o registro detalhado para depuração.

#### Enviar Configuração

O comando `push configuration` faz upload da configuração para o CMS e Editor do Intlayer. Esta etapa é necessária para usar dicionários remotos no Editor Visual do Intlayer.

```bash
npx intlayer config push
```

##### Argumentos:

- **`--env`**: Especifica o ambiente (ex: `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base do projeto.
- **`--verbose`**: Ativa o registro detalhado para depuração.

Ao enviar a configuração, seu projeto fica totalmente integrado ao CMS do Intlayer, permitindo um gerenciamento perfeito de dicionários entre equipes.

## Usando Comandos intlayer no `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```

## Depurar o comando intlayer

### 1. **Certifique-se de usar a versão mais recente**

Execute:

```bash
npx intlayer --version                  # versão local atual do intlayer
npx intlayer@latest --version          # versão mais recente do intlayer
```

### 2. **Verifique se o comando está registrado**

Você pode verificar com:

```bash
npx intlayer --help      # Mostra uma lista de comandos disponíveis e informações de uso
```

### 3. **Reinicie seu terminal**

Às vezes, é necessário reiniciar o terminal para reconhecer novos comandos.

### 4. **Limpe o cache do npx (se estiver preso em uma versão anterior)**

```bash
npx clear-npx-cache
```
