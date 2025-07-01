---
docName: intlayer_cli
url: https://intlayer.org/doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CLI
description: Descubra como usar o Intlayer CLI para gerenciar seu site multilíngue. Siga os passos nesta documentação online para configurar seu projeto em poucos minutos.
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

> Se o pacote `intlayer` já estiver instalado, o CLI será instalado automaticamente. Você pode pular esta etapa.

## Pacote intlayer-cli

O pacote `intlayer-cli` tem a finalidade de transpilar suas [declarações intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md) em dicionários.

Este pacote irá transpilar todos os arquivos intlayer, como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Veja como declarar seus arquivos de declaração Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar os dicionários intlayer, você pode usar interpretadores, como [react-intlayer](https://www.npmjs.com/package/react-intlayer) ou [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Suporte a Arquivo de Configuração

O Intlayer aceita múltiplos formatos de arquivo de configuração:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver como configurar os locais disponíveis, ou outros parâmetros, consulte a [documentação de configuração aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## SDK CLI

O SDK CLI é uma biblioteca que permite usar o Intlayer CLI no seu próprio código.

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
```

Exemplo de uso:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Executar comandos do intlayer

### Construir dicionários

Para construir seus dicionários, você pode executar os comandos:

```bash
npx intlayer build
```

ou no modo de observação

```bash
npx intlayer build --watch
```

Este comando irá localizar seus arquivos de conteúdo de declaração por padrão em `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E construir os dicionários no diretório `.intlayer`.

##### Apelidos:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Enviar dicionários

```bash
npx intlayer dictionary push
```

Se o [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) estiver instalado, você também pode enviar dicionários para o editor. Este comando permitirá tornar os dicionários disponíveis para [o editor](https://intlayer.org/dashboard). Dessa forma, você pode compartilhar seus dicionários com sua equipe e editar seu conteúdo sem precisar alterar o código da sua aplicação.

##### Apelidos:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argumentos:

- `-d`, `--dictionaries`: ids dos dicionários para enviar. Se não especificado, todos os dicionários serão enviados.
  > Exemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Ignorar a pergunta que solicita a exclusão dos diretórios de locais uma vez que os dicionários são enviados, e removê-los. Por padrão, se o dicionário estiver definido localmente, ele sobrescreverá o conteúdo dos dicionários remotos.
  > Exemplo: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Ignorar a pergunta que solicita a exclusão dos diretórios de locais uma vez que os dicionários são enviados, e mantê-los. Por padrão, se o dicionário estiver definido localmente, ele sobrescreverá o conteúdo dos dicionários remotos.
  > Exemplo: `npx intlayer dictionary push -k`
- `--env`: Especificar o ambiente (ex.: `development`, `production`).
- `--env-file`: Fornecer um arquivo de ambiente personalizado para carregar variáveis.
- `--base-dir`: Especificar o diretório base para o projeto.
- `--verbose`: Ativar logs detalhados para depuração.
- `--git-diff`: Executar apenas nos dicionários que incluem alterações da base (padrão `origin/main`) para o branch atual (padrão: `HEAD`).
- `--git-diff-base`: Especificar a referência base para o git diff (padrão `origin/main`).
- `--git-diff-current`: Especificar a referência atual para o git diff (padrão: `HEAD`).
- `--uncommitted`: Incluir alterações não comitadas.
- `--unpushed`: Incluir alterações não enviadas (unpushed).
- `--untracked`: Incluir arquivos não rastreados.

### Puxar dicionários remotos

```bash
npx intlayer pull
```

Se o [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) estiver instalado, você também pode puxar dicionários do editor. Dessa forma, você pode sobrescrever o conteúdo dos seus dicionários conforme a necessidade da sua aplicação.

##### Apelidos:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argumentos:

- `-d, --dictionaries`: IDs dos dicionários a serem puxados. Se não especificado, todos os dicionários serão puxados.
  > Exemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Caminho para o diretório onde os novos dicionários serão salvos. Se não especificado, os novos dicionários serão salvos no diretório `./intlayer-dictionaries` do projeto. Se um campo `filePath` for especificado no conteúdo do seu dicionário, os dicionários não considerarão este argumento e serão salvos no diretório `filePath` especificado.
- `--env`: Especifica o ambiente (por exemplo, `development`, `production`).
- `--env-file`: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- `--base-dir`: Especifica o diretório base do projeto.
- `--verbose`: Ativa o registro detalhado para depuração.

##### Exemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Preencher / auditar / traduzir dicionários

```bash
npx intlayer fill
```

Este comando analisa seus arquivos de declaração de conteúdo em busca de possíveis problemas, como traduções ausentes, inconsistências estruturais ou incompatibilidades de tipo. Se encontrar algum problema, o **intlayer fill** irá propor ou aplicar atualizações para manter seus dicionários consistentes e completos.

##### Apelidos:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argumentos:

- `-f, --file [files...]`
  Uma lista de arquivos específicos de declaração de conteúdo para auditar. Se não fornecido, todos os arquivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` descobertos serão auditados.

- `--exclude [excludedGlobs...]`
  Padrões glob para excluir da auditoria (exemplo: `--exclude "src/test/**"`).

- `--source-locale [sourceLocale]`

O local de origem para traduzir. Se não especificado, o local padrão da sua configuração será usado.

- `--output-locales [outputLocales...]`  
  Locais de destino para traduzir. Se não especificado, todos os locais da sua configuração serão usados, exceto o local de origem.

- `--mode [mode]`  
  Modo de tradução: 'complete', 'review' ou 'missing-only'. O padrão é 'missing-only'.

- `--git-diff`  
  Filtra dicionários que incluem alterações da base (padrão `origin/main`) para o branch atual (padrão: `HEAD`).

- `--git-diff-base`  
  Especifica a referência base para o git diff (padrão `origin/main`).

- `--git-diff-current`  
  Especifica a referência atual para o git diff (padrão: `HEAD`).

- `--uncommitted`  
  Filtra dicionários que incluem alterações não comitadas.

- `--unpushed`
- Filtra dicionários que incluem alterações não enviadas.

- `--untracked`  
  Filtra dicionários que incluem arquivos não rastreados.

- `--keys [keys...]`  
  Filtra dicionários com base nas chaves especificadas.

- `--excluded-keys [excludedKeys...]`  
  Exclui dicionários com base nas chaves especificadas.

- `--path-filter [pathFilters...]`  
  Filtra dicionários com base em um padrão glob para caminhos de arquivos.

- `--model [model]`  
  O modelo de IA a ser usado para a tradução (por exemplo, `gpt-3.5-turbo`).

- `--provider [provider]`  
  O provedor de IA a ser usado para a tradução.

- `--temperature [temperature]`  
  Configuração de temperatura para o modelo de IA.

- `--api-key [apiKey]`  
  Forneça sua própria chave API para o serviço de IA.

- `--custom-prompt [prompt]`  
  Forneça um prompt personalizado para suas instruções de tradução.
- `--application-context [applicationContext]`  
  Fornece contexto adicional para a tradução por IA.

- `--env`  
  Especifica o ambiente (por exemplo, `development`, `production`).

- `--env-file [envFile]`  
  Fornece um arquivo de ambiente personalizado para carregar variáveis.

- `--base-dir`  
  Especifica o diretório base do projeto.

- `--verbose`  
  Ativa o registro detalhado para depuração.

##### Exemplo:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Este comando irá traduzir o conteúdo do inglês para francês e espanhol para todos os arquivos de declaração de conteúdo no diretório `src/home/` usando o modelo GPT-3.5 Turbo.

### Gerenciar Configuração

#### Obter Configuração

O comando `configuration get` recupera a configuração atual do Intlayer, particularmente as configurações de localidade. Isso é útil para verificar sua configuração.

```bash
npx intlayer configuration get
```

##### Apelidos:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Argumentos:

- **`--env`**: Especifica o ambiente (por exemplo, `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base do projeto.
- **`--verbose`**: Ativa o registro detalhado para depuração.

#### Enviar Configuração

O comando `configuration push` envia sua configuração para o Intlayer CMS e editor. Esta etapa é necessária para habilitar o uso de dicionários remotos no Editor Visual do Intlayer.

```bash
npx intlayer configuration push
```

##### Apelidos:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Argumentos:

- **`--env`**: Especifica o ambiente (ex.: `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base do projeto.
- **`--verbose`**: Ativa o log detalhado para depuração.

Ao enviar a configuração, seu projeto fica totalmente integrado com o Intlayer CMS, permitindo um gerenciamento fluido de dicionários entre equipes.

### Gerenciamento de Documentação

Os comandos `doc` fornecem ferramentas para gerenciar e traduzir arquivos de documentação em múltiplos idiomas.

#### Traduzir Documentação

O comando `doc translate` traduz automaticamente arquivos de documentação de um locale base para locales alvo utilizando serviços de tradução por IA.

```bash
npx intlayer doc translate
```

##### Argumentos:

- **`--doc-pattern [docPattern...]`**: Padrões glob para corresponder aos arquivos de documentação a serem traduzidos.
  > Exemplo: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Padrões glob para excluir da tradução.
  > Exemplo: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Número de arquivos a serem processados simultaneamente para tradução.
  > Exemplo: `npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`**: Locais de destino para traduzir a documentação.
  > Exemplo: `npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`**: Local de origem para traduzir.
  > Exemplo: `npx intlayer doc translate --base-locale en`
- **`--model [model]`**: Modelo de IA a ser usado para tradução (ex.: `gpt-3.5-turbo`).
- **`--provider [provider]`**: Provedor de IA a ser usado para tradução.
- **`--temperature [temperature]`**: Configuração de temperatura para o modelo de IA.
- **`--api-key [apiKey]`**: Forneça sua própria chave de API para o serviço de IA.
- **`--custom-prompt [prompt]`**: Forneça um prompt personalizado para instruções de tradução.
- **`--application-context [applicationContext]`**: Forneça contexto adicional para a tradução pela IA.
- **`--env`**: Especifica o ambiente (por exemplo, `development`, `production`).
- **`--env-file [envFile]`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base do projeto.
- **`--verbose`**: Ativa o registro detalhado para depuração.
- **`--custom-instructions [customInstructions]`**: Instruções personalizadas adicionadas ao prompt. Útil para aplicar regras específicas relacionadas a formatação, tradução de URLs, etc.

##### Exemplo:

```bash
npx intlayer doc translate
  --doc-pattern "docs/en/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> Note que o caminho do arquivo de saída será determinado substituindo os seguintes padrões
>
> - `/{{baseLocale}}/` por `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` por `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` por `_{{locale}}.`
> - `{{baseLocale}}_` por `{{locale}}_`
> - `.{{baseLocaleName}}.` por `.{{localeName}}.`
>
> Se o padrão não for encontrado, o arquivo de saída adicionará `.{{locale}}` na extensão do arquivo. `./my/file.md` será traduzido para `./my/file.fr.md` para o idioma francês.

#### Revisar Documentação

O comando `doc review` analisa os arquivos de documentação quanto à qualidade, consistência e completude entre diferentes idiomas.

```bash
npx intlayer doc review
```

##### Argumentos:

O comando `doc review` aceita os mesmos argumentos que `doc translate`, permitindo revisar arquivos de documentação específicos e aplicar verificações de qualidade.

##### Exemplo:

```bash
npx intlayer doc review
 --doc-pattern "docs/pt/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

## Use os comandos intlayer no seu `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## Depurar comando intlayer

### 1. **Certifique-se de que está usando a versão mais recente**

Execute:

```bash
npx intlayer --version                  # versão atual do intlayer no locale
npx intlayer@latest --version           # versão mais recente atual do intlayer
```

### 2. **Verifique se o comando está registrado**

Você pode verificar com:

```bash
npx intlayer --help                     # Exibe a lista de comandos disponíveis e informações de uso
npx intlayer dictionary build --help    # Exibe a lista de opções disponíveis para um comando
```

### 3. **Reinicie seu terminal**

Às vezes, é necessário reiniciar o terminal para reconhecer novos comandos.

### 4. **Limpe o cache do npx (se estiver preso em uma versão antiga)**

```bash
npx clear-npx-cache
```

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
