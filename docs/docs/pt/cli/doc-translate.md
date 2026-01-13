---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Traduzir Documento
description: Aprenda como traduzir automaticamente arquivos de documentação usando serviços de tradução por IA.
keywords:
  - Traduzir
  - Documento
  - Documentação
  - IA
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Traduzir Documento

O comando `doc translate` traduz automaticamente arquivos de documentação de uma localidade base para localidades alvo usando serviços de tradução por IA.

## Pontos-chave:

- Divide arquivos markdown grandes em partes para permanecer dentro dos limites da janela de contexto do modelo de IA.
- Tenta novamente a tradução se o formato de saída estiver incorreto.
- Incorpora contexto específico da aplicação e do arquivo para melhorar a precisão da tradução.
- Preserva traduções existentes ao não sobrescrevê-las.
- Processa arquivos, partes e locales em paralelo usando um sistema de fila para aumentar a velocidade.

```bash
npx intlayer doc translate
```

## Argumentos:

**Opções de lista de arquivos:**

- **`--doc-pattern [docPattern...]`**: Padrões glob para corresponder aos arquivos de documentação a serem traduzidos.

  > Exemplo: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Padrões glob para excluir da tradução.

  > Exemplo: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Pular o arquivo se ele foi modificado antes do tempo especificado.
  - Pode ser um tempo absoluto como "2025-12-05" (string ou Date)
  - Pode ser um tempo relativo em ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opção verifica o tempo de atualização do arquivo usando o método `fs.stat`. Portanto, pode ser impactada pelo Git ou outras ferramentas que modificam o arquivo.

  > Exemplo: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Pular o arquivo se ele foi modificado dentro do tempo especificado.
  - Pode ser um tempo absoluto como "2025-12-05" (string ou Date)
  - Pode ser um tempo relativo em ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opção verifica o tempo de atualização do arquivo usando o método `fs.stat`. Portanto, pode ser impactada pelo Git ou outras ferramentas que modificam o arquivo.

  > Exemplo: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Pular o arquivo se ele já existir.

  > Exemplo: `npx intlayer doc translate --skip-if-exists`

**Opções de saída da entrada:**

- **`--locales [locales...]`**: Locais de destino para traduzir a documentação.

  > Exemplo: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Local de origem para traduzir.

  > Exemplo: `npx intlayer doc translate --base-locale en`

**Opções de processamento de arquivos:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Número de arquivos para processar simultaneamente para tradução.

  > Exemplo: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Opções de IA:**

- **`--model [model]`**: O modelo de IA a ser usado para tradução (exemplo: `gpt-3.5-turbo`).
- **`--provider [provider]`**: O provedor de IA a ser usado para tradução.
- **`--temperature [temperature]`**: Configuração de temperatura para o modelo de IA.
- **`--api-key [apiKey]`**: Forneça sua própria chave de API para o serviço de IA.
- **`--application-context [applicationContext]`**: Forneça contexto adicional para a tradução de IA.
- **`--custom-prompt [prompt]`**: Personalize o prompt base usado para tradução. (Nota: Para a maioria dos casos de uso, a opção `--custom-instructions` é recomendada, pois oferece melhor controle sobre o comportamento da tradução.)

  > Exemplo: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Minha aplicação é uma loja de gatos"`

**Opções de variáveis de ambiente:**

- **`--env`**: Especifica o ambiente (exemplo: `development`, `production`).
- **`--env-file [envFile]`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base do projeto.
- **`--no-cache`**: Desativa o cache.

  > Exemplo: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Opções de log:**

- **`--verbose`**: Ativa o log detalhado para depuração. (padrão para true usando CLI)

  > Exemplo: `npx intlayer doc translate --verbose`

**Opções de instruções personalizadas:**

- **`--custom-instructions [customInstructions]`**: Instruções personalizadas adicionadas ao prompt. Útil para aplicar regras específicas relacionadas à formatação, tradução de URLs, etc.
  - Pode ser um tempo absoluto como "2025-12-05" (string ou Date)
  - Pode ser um tempo relativo em ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opção verifica o tempo de atualização do arquivo usando o método `fs.stat`. Portanto, pode ser impactada pelo Git ou outras ferramentas que modificam o arquivo.

  > Exemplo: `npx intlayer doc translate --custom-instructions "Evite traduzir URLs e mantenha o formato markdown"`

  > Exemplo: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Opções do Git:**

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
