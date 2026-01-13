---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Preencher Dicionários
description: Aprenda como preencher, auditar e traduzir seus dicionários usando IA.
keywords:
  - Preencher
  - Auditar
  - Traduzir
  - Dicionários
  - CLI
  - Intlayer
  - IA
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Preencher / auditar / traduzir dicionários

```bash
npx intlayer fill
```

Este comando analisa seus arquivos de declaração de conteúdo em busca de possíveis problemas, como traduções faltantes, inconsistências estruturais ou incompatibilidades de tipo. Se encontrar algum problema, o **intlayer fill** irá propor ou aplicar atualizações para manter seus dicionários consistentes e completos.

Pontos-chave:

- Divide arquivos JSON grandes em partes para permanecer dentro dos limites da janela de contexto do modelo de IA.
- Tenta novamente a tradução se o formato de saída estiver incorreto.
- Incorpora contexto específico da aplicação e do arquivo para melhorar a precisão da tradução.
- Preserva traduções existentes ao não sobrescrevê-las.
- Processa arquivos, partes e locales em paralelo usando um sistema de fila para aumentar a velocidade.

## Apelidos:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Exemplos de saída:

```bash
npx intlayer fill

Preparing Intlayer (v7.5.14)
Done 76ms
@intlayer/ai found - Run process locally
Provider: (default) - Model: (default) - API Key: ✓
Affected dictionary keys for processing: app, comp-test, hello-world, lang-switcher
 - [comp-test]      No locales to fill, Skipping comp-test.content.json
 - [app]            Processing app.content.tsx
 - [app]            Filling missing metadata for app.content.tsx
 - [hello-world]    Processing test.content.ts
 - [hello-world]   [French (fr)]      Preparing test.content.ts
 - [hello-world]   [Spanish (es)]     Preparing test.content.ts
 - [lang-switcher]  Processing langSwitcher.content.ts
 - [lang-switcher]  Filling missing metadata for langSwitcher.content.ts
 - [hello-world]    Translation completed successfully for test.content.ts
 - [lang-switcher] [Spanish (es)]     Preparing langSwitcher.content.ts
 - [app]           [French (fr)]      Preparing app.content.tsx
 - [app]           [Spanish (es)]     Preparing app.content.tsx
 - [hello-world]    Content declaration written to test.content.ts
 - [app]            Translation completed successfully for app.content.tsx
 - [app]            Content declaration written to app.content.tsx
 - [lang-switcher]  Translation completed successfully for langSwitcher.content.ts
 - [lang-switcher]  Content declaration written to langSwitcher.content.ts
```

## Argumentos:

**Opções de lista de arquivos:**

- **`-f, --file [files...]`**: Uma lista de arquivos específicos de declaração de conteúdo para auditar. Se não fornecido, todos os arquivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` descobertos com base na configuração do seu arquivo serão auditados.

  > Exemplo: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filtra dicionários com base em chaves. Se não fornecido, todos os dicionários serão auditados.

  > Exemplo: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Filtra dicionários com base em chaves (apelido para --keys).

  > Exemplo: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Exclui dicionários com base em chaves. Se não fornecido, todos os dicionários serão auditados.

  > Exemplo: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Exclui dicionários com base em chaves (apelido para --excluded-keys).

  > Exemplo: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Filtra dicionários com base em padrão glob para caminhos de arquivos.

  > Exemplo: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Opções de saída de entrada:**

- **`--source-locale [sourceLocale]`**: O locale de origem para traduzir. Se não especificado, o locale padrão da sua configuração será usado.

- **`--output-locales [outputLocales...]`**: Locales de destino para traduzir. Se não especificado, todos os locales da sua configuração serão usados, exceto o locale de origem.

- **`--mode [mode]`**: Modo de tradução: `complete`, `review`. O padrão é `complete`. `complete` preencherá todo o conteúdo faltante, `review` preencherá o conteúdo faltante e revisará as chaves existentes.

**Opções do Git:**

- **`--git-diff`**: Executa apenas nos dicionários que incluem alterações da base (padrão `origin/main`) para o branch atual (padrão: `HEAD`).
- **`--git-diff-base`**: Especifica a referência base para o git diff (padrão `origin/main`).
- **`--git-diff-current`**: Especifica a referência atual para o git diff (padrão: `HEAD`).
- **`--uncommitted`**: Inclui alterações não commitadas.
- **`--unpushed`**: Inclui alterações não enviadas (unpushed).
- **`--untracked`**: Inclui arquivos não rastreados.

  > Exemplo: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Exemplo: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Opções de IA:**

- **`--model [model]`**: O modelo de IA a ser usado para a tradução (exemplo: `gpt-3.5-turbo`).
- **`--provider [provider]`**: O provedor de IA a ser usado para a tradução.
- **`--temperature [temperature]`**: Configuração de temperatura para o modelo de IA.
- **`--api-key [apiKey]`**: Forneça sua própria chave de API para o serviço de IA.
- **`--custom-prompt [prompt]`**: Forneça um prompt personalizado para suas instruções de tradução.
- **`--application-context [applicationContext]`**: Forneça contexto adicional para a tradução pela IA.

  > Exemplo: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Minha aplicação é uma loja de gatos"`

  **Opções de variáveis de ambiente:**

- **`--env`**: Especifica o ambiente (exemplo: `development`, `production`).
- **`--env-file [envFile]`**: Fornece um arquivo de ambiente personalizado para carregar as variáveis.

  > Exemplo: `npx intlayer fill --env-file .env.production.local`

  > Exemplo: `npx intlayer fill --env production`

**Opções de configuração:**

- **`--base-dir`**: Especifica o diretório base do projeto.

  > Exemplo: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Desativa o cache.

  > Exemplo: `npx intlayer build --no-cache`

**Opções de preparação:**

- **`--build`**: Constrói os dicionários antes de enviar para garantir que o conteúdo esteja atualizado. True força a construção, false pula a construção, undefined permite usar o cache da construção.

- **`--skip-metadata`**: Ignorar o preenchimento de metadados ausentes (descrição, título, tags) para dicionários.

**Opções de log:**

- **`--verbose`**: Ativa o log detalhado para depuração. (padrão para true ao usar CLI)

## Exemplo:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Este comando irá traduzir o conteúdo do inglês para francês e espanhol para todos os arquivos de declaração de conteúdo no diretório `src/home/` usando o modelo GPT-3.5 Turbo.
