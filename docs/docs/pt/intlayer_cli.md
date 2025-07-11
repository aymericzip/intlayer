---
createdAt: 2024-08-11
updatedAt: 2025-07-11
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
slugs:
  - doc
  - concept
  - cli
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

> Se o pacote `intlayer` já estiver instalado, o CLI é instalado automaticamente. Você pode pular esta etapa.

## Pacote intlayer-cli

O pacote `intlayer-cli` tem como objetivo transpilar suas [declarações intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md) em dicionários.

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

Este comando encontrará seus arquivos de conteúdo de declaração por padrão em `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E construirá os dicionários no diretório `.intlayer`.

##### Apelidos:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Enviar dicionários

```bash
npx intlayer dictionary push
```

Se o [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) estiver instalado, você também pode enviar os dicionários para o editor. Este comando permitirá tornar os dicionários disponíveis para [o editor](https://intlayer.org/dashboard). Dessa forma, você pode compartilhar seus dicionários com sua equipe e editar seu conteúdo sem precisar alterar o código da sua aplicação.

##### Apelidos:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argumentos:

**Opções do dicionário:**

- **`-d`, `--dictionaries`**: ids dos dicionários a serem enviados. Se não especificado, todos os dicionários serão enviados.

  > Exemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**Opções de configuração:**

- **`--base-dir`**: Especifica o diretório base do projeto. Para recuperar a configuração do intlayer, o comando procurará o arquivo `intlayer.config.{ts,js,json,cjs,mjs}` no diretório base.

  > Exemplo: `npx intlayer dictionary push --env-file .env.production.local`

**Opções de variáveis de ambiente:**

- **`--env`**: Especifica o ambiente (por exemplo, `development`, `production`). Útil no caso de você usar variáveis de ambiente no arquivo de configuração do intlayer.
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis. Útil no caso de você usar variáveis de ambiente no arquivo de configuração do intlayer.

  > Exemplo: `npx intlayer dictionary push --env-file .env.production.local`
  > Exemplo: `npx intlayer dictionary push --env production`

**Opções de saída:**

- **`-r`, `--delete-locale-dictionary`**: Pula a pergunta que solicita a exclusão dos diretórios de locais após os dicionários serem enviados, e os remove. Por padrão, se o dicionário estiver definido localmente, ele sobrescreverá o conteúdo dos dicionários remotos.

  > Exemplo: `npx intlayer dictionary push -r`
  > Exemplo: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Pula a pergunta que solicita a exclusão dos diretórios de locais após os dicionários serem enviados, e os mantém. Por padrão, se o dicionário estiver definido localmente, ele sobrescreverá o conteúdo dos dicionários remotos.

  > Exemplo: `npx intlayer dictionary push -k`
  > Exemplo: `npx intlayer dictionary push --keep-locale-dictionary`

**Opções de log:**

- **`--verbose`**: Ativa o log detalhado para depuração.

**Opções do Git:**

- **`--git-diff`**: Executa apenas nos dicionários que incluem alterações da base (padrão `origin/main`) para o branch atual (padrão: `HEAD`).
- **`--git-diff-base`**: Especifica a referência base para o git diff (padrão `origin/main`).
- **`--git-diff-current`**: Especifica a referência atual para o git diff (padrão: `HEAD`).
- **`--uncommitted`**: Inclui alterações não comitadas.
- **`--unpushed`**: Inclui alterações não enviadas.
- **`--untracked`**: Inclui arquivos não rastreados.

  > Exemplo: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > Exemplo: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Puxar dicionários remotos

```bash
npx intlayer pull
```

Se o [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) estiver instalado, você também pode puxar dicionários a partir do editor. Dessa forma, você pode sobrescrever o conteúdo dos seus dicionários conforme a necessidade da sua aplicação.

##### Apelidos:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argumentos:

**Opções de dicionário:**

- **`-d, --dictionaries`**: IDs dos dicionários para puxar. Se não especificado, todos os dicionários serão puxados.
  > Exemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**Opções de configuração:**

- **`--base-dir`**: Especifica o diretório base do projeto. Para recuperar a configuração do intlayer, o comando irá procurar pelo arquivo `intlayer.config.{ts,js,json,cjs,mjs}` no diretório base.

  > Exemplo: `npx intlayer dictionary push --env-file .env.production.local`

**Opções de variáveis de ambiente:**

- **`--env`**: Especifica o ambiente (ex.: `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar as variáveis.
- **`--base-dir`**: Especifica o diretório base do projeto. Para recuperar a configuração do intlayer, o comando irá procurar pelo arquivo `intlayer.config.{ts,js,json,cjs,mjs}` no diretório base.

  > Exemplo: `npx intlayer dictionary push --env-file .env.production.local`
  > Exemplo: `npx intlayer dictionary push --env production`

**Opções de saída:**

- **`--new-dictionaries-path`**: Caminho para o diretório onde os novos dicionários serão salvos. Se não especificado, os novos dicionários serão salvos no diretório `./intlayer-dictionaries` do projeto. Se um campo `filePath` for especificado no conteúdo do seu dicionário, os dicionários não considerarão este argumento e serão salvos no diretório especificado pelo `filePath`.

**Opções de log:**

- **`--verbose`**: Ativa o log detalhado para depuração.

##### Exemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Preencher / auditar / traduzir dicionários

```bash
npx intlayer fill
```

Este comando analisa seus arquivos de declaração de conteúdo em busca de possíveis problemas, como traduções ausentes, inconsistências estruturais ou incompatibilidades de tipo. Se encontrar algum problema, o **intlayer fill** proporá ou aplicará atualizações para manter seus dicionários consistentes e completos.

##### Apelidos:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argumentos:

**Opções de lista de arquivos:**

- **`-f, --file [files...]`**: Uma lista de arquivos específicos de declaração de conteúdo para auditar. Se não for fornecido, todos os arquivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` descobertos com base na configuração do seu arquivo serão auditados.

  > Exemplo: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filtrar dicionários com base nas chaves. Se não for fornecido, todos os dicionários serão auditados.

  > Exemplo: `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Excluir dicionários com base nas chaves. Se não for fornecido, todos os dicionários serão auditados.

  > Exemplo: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**: Filtrar dicionários com base em padrão glob para caminhos de arquivos.

  > Exemplo: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Opções de saída de entrada:**

- **`--source-locale [sourceLocale]`**: O locale de origem para tradução. Se não especificado, o locale padrão da sua configuração será usado.

- **`--output-locales [outputLocales...]`**: Locais de destino para traduzir. Se não especificado, todos os locais da sua configuração serão usados, exceto o local de origem.

- **`--mode [mode]`**: Modo de tradução: 'complete', 'review' ou 'missing-only'. O padrão é 'missing-only'.

**Opções do Git:**

- **`--git-diff`**: Executar apenas em dicionários que incluem mudanças da base (padrão `origin/main`) para o branch atual (padrão: `HEAD`).
- **`--git-diff-base`**: Especificar a referência base para o git diff (padrão `origin/main`).
- **`--git-diff-current`**: Especificar a referência atual para o git diff (padrão: `HEAD`).
- **`--uncommitted`**: Incluir alterações não comitadas.
- **`--unpushed`**: Incluir alterações não enviadas.
- **`--untracked`**: Incluir arquivos não rastreados.

  > Exemplo: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > Exemplo: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Opções de IA:**

- **`--model [model]`**: O modelo de IA a ser usado para a tradução (por exemplo, `gpt-3.5-turbo`).
- **`--provider [provider]`**: O provedor de IA a ser usado para a tradução.
- **`--temperature [temperature]`**: Configuração de temperatura para o modelo de IA.
- **`--api-key [apiKey]`**: Forneça sua própria chave de API para o serviço de IA.
- **`--custom-prompt [prompt]`**: Forneça um prompt personalizado para suas instruções de tradução.
- **`--application-context [applicationContext]`**: Forneça contexto adicional para a tradução da IA.

  > Exemplo: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Minha aplicação é uma loja de gatos"`

**Opções de variáveis de ambiente:**

- **`--env`**: Especificar o ambiente (por exemplo, `development`, `production`).
- **`--env-file [envFile]`**: Fornecer um arquivo de ambiente personalizado para carregar variáveis.

  > Exemplo: `npx intlayer fill --env-file .env.production.local`
  > Exemplo: `npx intlayer fill --env production`

**Opções de configuração:**

- **`--base-dir`**: Especificar o diretório base do projeto.

  > Exemplo: `npx intlayer fill --base-dir ./src`

**Opções de log:**

- **`--verbose`**: Ativar logs detalhados para depuração.

##### Exemplo:

```bash
bash
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

- **`--env`**: Especificar o ambiente (por exemplo, `development`, `production`).
- **`--env-file`**: Fornecer um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base para o projeto.
- **`--verbose`**: Ativa o registro detalhado para depuração.

#### Enviar Configuração

O comando `configuration push` envia sua configuração para o CMS e editor do Intlayer. Esta etapa é necessária para habilitar o uso de dicionários remotos no Editor Visual do Intlayer.

```bash
npx intlayer configuration push
```

##### Apelidos:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Argumentos:

- **`--env`**: Especifica o ambiente (ex.: `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base para o projeto.
- **`--verbose`**: Ativa o registro detalhado para depuração.

Ao enviar a configuração, seu projeto fica totalmente integrado com o Intlayer CMS, permitindo um gerenciamento fluido de dicionários entre equipes.

### Gerenciamento de Documentação

Os comandos `doc` fornecem ferramentas para gerenciar e traduzir arquivos de documentação em múltiplos idiomas.

#### Traduzir Documentação

O comando `doc translate` traduz automaticamente arquivos de documentação de um idioma base para idiomas-alvo utilizando serviços de tradução por IA.

```bash
npx intlayer doc translate
```

##### Argumentos:

**Opções de lista de arquivos:**

- **`--doc-pattern [docPattern...]`**: Padrões glob para corresponder aos arquivos de documentação a serem traduzidos.

  > Exemplo: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Padrões glob para excluir da tradução.

  > Exemplo: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Pula o arquivo se ele foi modificado antes do tempo especificado.

  - Pode ser um tempo absoluto como "2025-12-05" (string ou Date)
  - Pode ser um tempo relativo em ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opção verifica o tempo de atualização do arquivo usando o método `fs.stat`. Portanto, pode ser impactada pelo Git ou outras ferramentas que modificam o arquivo.

  > Exemplo: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Pula o arquivo se ele foi modificado dentro do tempo especificado.

  - Pode ser um horário absoluto como "2025-12-05" (string ou Date)
  - Pode ser um horário relativo em ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opção verifica o horário de atualização do arquivo usando o método `fs.stat`. Portanto, pode ser impactada pelo Git ou outras ferramentas que modificam o arquivo.

  > Exemplo: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**Opções de saída da entrada:**

- **`--locales [locales...]`**: Locais de destino para traduzir a documentação.

  > Exemplo: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Local de origem para traduzir.

  > Exemplo: `npx intlayer doc translate --base-locale en`

**Opções de processamento de arquivo:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Número de arquivos para processar simultaneamente para tradução.

  > Exemplo: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Opções de IA:**

- **`--model [model]`**: O modelo de IA a ser usado para tradução (ex.: `gpt-3.5-turbo`).
- **`--provider [provider]`**: O provedor de IA a ser usado para tradução.
- **`--temperature [temperature]`**: Configuração de temperatura para o modelo de IA.
- **`--api-key [apiKey]`**: Forneça sua própria chave de API para o serviço de IA.
- **`--application-context [applicationContext]`**: Forneça contexto adicional para a tradução pela IA.
- **`--custom-prompt [prompt]`**: Personalize o prompt base usado para tradução. (Nota: Para a maioria dos casos de uso, a opção `--custom-instructions` é recomendada, pois oferece melhor controle sobre o comportamento da tradução.)

  > Exemplo: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Minha aplicação é uma loja de gatos"`

**Opções de variáveis de ambiente:**

- **`--env`**: Especifica o ambiente (ex.: `development`, `production`).
- **`--env-file [envFile]`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base do projeto.

  > Exemplo: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Opções de log:**

- **`--verbose`**: Ativar logs detalhados para depuração.

  > Exemplo: `npx intlayer doc translate --verbose`

**Opções de instruções personalizadas:**

- **`--custom-instructions [customInstructions]`**: Instruções personalizadas adicionadas ao prompt. Útil para aplicar regras específicas relacionadas à formatação, tradução de URLs, etc.

  - Pode ser um tempo absoluto como "2025-12-05" (string ou Date)
  - Pode ser um tempo relativo em ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opção verifica o tempo de atualização do arquivo usando o método `fs.stat`. Portanto, pode ser impactada pelo Git ou outras ferramentas que modificam o arquivo.

  > Exemplo: `npx intlayer doc translate --custom-instructions "Evite traduzir URLs e mantenha o formato markdown"`
  > Exemplo: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Opções Git:**

- **`--git-diff`**: Executa apenas em dicionários que incluem alterações da base (padrão `origin/main`) para o branch atual (padrão: `HEAD`).
- **`--git-diff-base`**: Especifica a referência base para o git diff (padrão `origin/main`).
- **`--git-diff-current`**: Especifica a referência atual para o git diff (padrão: `HEAD`).
- **`--uncommitted`**: Inclui alterações não comitadas.
- **`--unpushed`**: Inclui alterações não enviadas (unpushed).
- **`--untracked`**: Inclui arquivos não rastreados.

  > Exemplo: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > Exemplo: `npx intlayer doc translate --uncommitted --unpushed --untracked`

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

O comando `doc review` analisa arquivos de documentação para qualidade, consistência e completude entre diferentes locais.

```bash
npx intlayer doc review
```

Pode ser usado para revisar arquivos que já foram traduzidos e para verificar se a tradução está correta.

Para a maioria dos casos de uso,

- prefira usar o `doc translate` quando a versão traduzida deste arquivo não estiver disponível.
- prefira usar o `doc review` quando a versão traduzida deste arquivo já existir.

> Note que o processo de revisão consome mais tokens de entrada do que o processo de tradução para revisar o mesmo arquivo completamente. No entanto, o processo de revisão otimizará os blocos para revisar e pulará as partes que não foram alteradas.

##### Argumentos:

O comando `doc review` aceita os mesmos argumentos que o `doc translate`, permitindo que você revise arquivos de documentação específicos e aplique verificações de qualidade.

Se você ativou uma das opções do git, o comando revisará apenas a parte dos arquivos que está sendo alterada. O script processará dividindo o arquivo em partes (chunks) e revisará cada parte. Se não houver alterações na parte, o script a ignorará para acelerar o processo de revisão e limitar o custo da API do Provedor de IA.

## Use os comandos do intlayer no seu `package.json`

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

## CLI SDK

O SDK CLI é uma biblioteca que permite usar o Intlayer CLI no seu próprio código.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
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
// ...
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

## Depurar comando intlayer

### 1. **Garanta que está usando a versão mais recente**

Execute:

```bash
npx intlayer --version                  # versão atual do intlayer no locale
npx intlayer@latest --version           # versão mais recente atual do intlayer
```

### 2. **Verifique se o comando está registrado**

Você pode verificar com:

```bash
npx intlayer --help                     # Mostra a lista de comandos disponíveis e informações de uso
npx intlayer dictionary build --help    # Mostra a lista de opções disponíveis para um comando
```

### 3. **Reinicie seu terminal**

Às vezes, é necessário reiniciar o terminal para reconhecer novos comandos.

### 4. **Limpe o cache do npx (se estiver preso em uma versão antiga)**

```bash
npx clear-npx-cache
```

## Histórico da Documentação

| Versão | Data       | Alterações                                                  |
| ------ | ---------- | ----------------------------------------------------------- |
| 5.5.11 | 2025-07-11 | Atualização da documentação dos parâmetros dos comandos CLI |
| 5.5.10 | 2025-06-29 | Histórico inicial                                           |
