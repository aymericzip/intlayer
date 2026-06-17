---
createdAt: 2024-08-11
updatedAt: 2026-06-17
title: Revisar Documento
description: Aprenda como revisar arquivos de documentação para qualidade, consistência e completude em diferentes locais.
keywords:
  - Revisão
  - Documento
  - Documentação
  - IA
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
history:
  - version: 9.0.0
    date: 2026-06-17
    changes: "Adicionar opção --log"
author: aymericzip
---

# Revisar Documento

O comando `doc review` analisa arquivos de documentação para qualidade, consistência e completude em diferentes locais.

## Pontos-chave:

- Divide arquivos markdown grandes em partes para permanecer dentro dos limites da janela de contexto do modelo de IA.
- Otimiza as partes a revisar e omite as partes que já estão traduzidas e não foram alteradas.
- Processa arquivos, partes e locales em paralelo usando um sistema de fila para aumentar a velocidade.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

Ele pode ser usado para revisar arquivos que já estão traduzidos e para verificar se a tradução está correta.

Para a maioria dos casos de uso,

- prefira usar o `doc translate` quando a versão traduzida deste arquivo não estiver disponível.
- prefira usar o `doc review` quando a versão traduzida deste arquivo já existir.

> Note que o processo de revisão consome mais tokens de entrada do que o processo de tradução para revisar o mesmo arquivo completamente. No entanto, o processo de revisão irá otimizar os chunks a serem revisados e pulará as partes que não foram alteradas.

## Argumentos:

**Opções de lista de arquivos:**

- **`--doc-pattern [docPattern...]`**: Padrões glob para corresponder aos arquivos de documentação a serem revisados.

  > Exemplo: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Padrões glob para excluir da revisão.

  > Exemplo: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Pular o arquivo se ele foi modificado antes do tempo especificado.
  - Pode ser um tempo absoluto como "2025-12-05" (string ou Date)
  - Pode ser um tempo relativo em ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opção verifica o tempo de atualização do arquivo usando o método `fs.stat`. Portanto, pode ser impactada pelo Git ou outras ferramentas que modificam o arquivo.

  > Exemplo: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Pular o arquivo se ele foi modificado dentro do tempo especificado.
  - Pode ser um tempo absoluto como "2025-12-05" (string ou Date)
  - Pode ser um tempo relativo em ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opção verifica o tempo de atualização do arquivo usando o método `fs.stat`. Portanto, pode ser impactada pelo Git ou outras ferramentas que modificam o arquivo.

  > Exemplo: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Pular o arquivo se ele já existir.

  > Exemplo: `npx intlayer doc review --skip-if-exists`

**Opções de modo de revisão:**

- **`--log`**: Modo apenas de registro (log-only). Não traduz com IA; em vez disso, registra os blocos que precisam de atenção (com números de linha e conteúdo) para as localidades base e de destino, a fim de ajudar outro agente a gerar as traduções.

  > Exemplo: `npx intlayer doc review --log`

**Opções de saída da entrada:**

- **`--locales [locales...]`**: Locais de destino para revisar a documentação.

  > Exemplo: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: Local de origem (documento base) para comparar.

  > Exemplo: `npx intlayer doc review --base-locale en`

**Opções de processamento de arquivos:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Número de arquivos para processar simultaneamente para a revisão.

  > Exemplo: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**Opções de IA:**

- **`--model [model]`**: O modelo de IA a ser usado para a revisão (exemplo: `gpt-3.5-turbo`).
- **`--provider [provider]`**: O provedor de IA a ser usado para a revisão.
- **`--temperature [temperature]`**: Configuração de temperatura para o modelo de IA.
- **`--api-key [apiKey]`**: Forneça sua própria chave de API para o serviço de IA.
- **`--application-context [applicationContext]`**: Forneça contexto adicional para a revisão de IA.
- **`--data-serialization [dataSerialization]`**: O formato de serialização de dados a ser usado nas funcionalidades de IA do Intlayer. Opções: `json` (padrão, confiável), `toon` (menos tokens, menos consistente).
- **`--custom-prompt [prompt]`**: Personalize o prompt base usado para a revisão. (Nota: Para a maioria dos casos de uso, a opção `--custom-instructions` é recomendada, pois oferece melhor controle.)

  > Exemplo: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Minha aplicação é uma loja de gatos"`

**Opções de variáveis de ambiente:**

- **`--env`**: Especifica o ambiente (exemplo: `development`, `production`).
- **`--env-file [envFile]`**: Fornece um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especifica o diretório base do projeto.
- **`--no-cache`**: Desativa o cache.

  > Exemplo: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Opções de log:**

- **`--verbose`**: Ativa o log detalhado para depuração. (padrão para true usando CLI)

  > Exemplo: `npx intlayer doc review --verbose`

**Opções de instruções personalizadas:**

- **`--custom-instructions [customInstructions]`**: Instruções personalizadas adicionadas ao prompt. Útil para aplicar regras específicas relacionadas à formatação, tradução de URLs, etc.

  > Exemplo: `npx intlayer doc review --custom-instructions "Evite traduzir URLs e mantenha o formato markdown"`

  > Exemplo: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Opções do Git:**

- **`--git-diff`**: Executa apenas em arquivos que incluem alterações da base (padrão `origin/main`) para o branch atual (padrão: `HEAD`).
- **`--git-diff-base`**: Especifica a referência base para o git diff (padrão `origin/main`).
- **`--git-diff-current`**: Especifica a referência atual para o git diff (padrão: `HEAD`).
- **`--uncommitted`**: Inclui alterações não comitadas.
- **`--unpushed`**: Inclui alterações não enviadas.
- **`--untracked`**: Inclui arquivos não rastreados.

  > Exemplo: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Exemplo: `npx intlayer doc review --uncommitted --unpushed --untracked`

> Note que o caminho do arquivo de saída será determinado substituindo os seguintes padrões:
>
> - `/{{baseLocale}}/` por `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` por `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` por `_{{locale}}.`
> - `{{baseLocale}}_` por `{{locale}}_`
> - `.{{baseLocaleName}}.` por `.{{localeName}}.`
>
> Se o padrão não for encontrado, o arquivo de saída adicionará `.{{locale}}` na extensão do arquivo. `./my/file.md` será revisado e atualizado para `./my/file.fr.md` para o idioma francês.
