---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: Como limitar o consumo de tokens do Claude Code para gerar traduções
description: Por que traduzir com o Claude Code gasta tokens em excesso, o que o Intlayer faz em vez disso (filtra chaves traduzidas, divide JSON em blocos, traduz markdown bloco a bloco) e como reutilizar sua assinatura do Claude com claude setup-token.
keywords:
  - claude code
  - tokens
  - consumo de tokens
  - setup-token
  - i18n
  - internacionalização
  - tradução
  - fill
  - mcp
  - agente
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# Como limitar o consumo de tokens do Claude Code para gerar traduções

## Descrição do problema

Pedir ao Claude Code (ou a qualquer agente de programação) para traduzir seu conteúdo é a forma mais cara de realizá-lo. Em cada execução, o agente precisa:

- Carregar todo o arquivo JSON ou de conteúdo no seu contexto, até mesmo as chaves já traduzidas.
- Buscar nos arquivos relacionados para identificar onde o conteúdo reside e como está estruturado.
- Descobrir quais locales estão ausentes e precisam ser gerados.
- Reler suas instruções personalizadas a cada execução ("transformar URLs desta maneira", "manter o nome da marca em inglês", "usar forma informal").
- Reescrever todo o arquivo, inclusive as partes que não foram alteradas.

Tudo isso é reenviado a cada interação, fazendo com que o custo cresça conforme `tamanho do conteúdo × número de locales × número de turnos`, e qualquer divergência de formatação ou de chaves precise ser corrigida manualmente.

## O que o Intlayer faz em vez disso

O diferencial do Intlayer é realizar esse trabalho fora do agente, através de um pipeline construído especificamente para tradução:

- **Filtra traduções existentes** para limitar o uso de tokens. As chaves já traduzidas no seu JSON são ignoradas, enviando apenas as pendentes ao modelo.
- **Traduz markdown bloco a bloco.** Para a documentação, [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-translate.md) e [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-review.md) comparam cada bloco com o documento base e ignoram blocos já traduzidos ou inalterados.
- **Divide o seu JSON em partes (chunking)** se for muito grande, garantindo operação na melhor faixa da janela de contexto.
- **Achata e reconstrói o seu JSON** para otimizar o consumo de tokens.
- **Insere prompts personalizados** para regras específicas da sua marca e terminologia (`applicationContext`, `--custom-instructions`), permitindo que você as defina uma única vez em vez de repeti-las em cada conversa.
- **Valida a estrutura** para assegurar consistência e evitar desvio de chaves, preservando a formatação (markdown, HTML, inserções, plurais).
- **Implementa gestão de novas tentativas (retry)** caso a saída apresente formato inválido.
- **Enfileira e paraleliza requisições** entre arquivos, blocos e locales para aumentar a velocidade.

Nada disso transita pelo contexto do agente. A regra prática: deixe o agente decidir **o que** internacionalizar, e deixe o Intlayer cuidar do trabalho repetitivo.

## Solução

### 1. Delegar a extração para `intlayer extract`

Em vez de pedir ao agente para reescrever cada componente manualmente, deixe-o executar o comando [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md). Ele move strings fixas para um arquivo `.content` ao lado do componente sem carregar o arquivo completo no contexto do agente.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. Delegar a tradução para `intlayer fill`

Nunca peça ao agente para traduzir. O comando [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) aplica o pipeline acima: envia apenas as chaves ausentes, as fragmenta, processa os locales em paralelo e grava o resultado de volta nos seus arquivos de conteúdo.

```bash
npx intlayer fill
```

Algumas flags mantêm a execução enxuta:

- `--git-diff` (ou `--uncommitted`) processa apenas os dicionários alterados no branch atual.
- `--file` ou `--keys` foca em arquivos de conteúdo específicos.
- `--output-locales fr es` restringe a execução aos locales realmente necessários no momento.
- `--skip-metadata` ignora a criação de título, descrição e tags.
- `--data-serialization toon` envia uma carga útil mais compacta para o modelo (menos tokens, saída ligeiramente menos previsível).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Traduzir markdown com `doc translate` e `doc review`

Pedir a um agente para traduzir um arquivo `.md` significa colar todo o documento, para cada locale, a cada alteração. Os comandos [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-translate.md) e [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-review.md) operam bloco a bloco.

Use `doc translate` quando o arquivo traduzido ainda não existir. Ele divide o markdown, traduz em paralelo e grava os arquivos de destino:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Use `doc review` quando o arquivo traduzido já existir. Ele compara cada bloco com o documento base, ignora os blocos já traduzidos ou inalterados e envia apenas os divergentes:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Ambos os comandos aceitam suas regras uma única vez, sem a necessidade de repeti-las em cada prompt:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Dois modos de `doc review` são úteis quando o agente precisa continuar no fluxo sem disparar chamadas de IA pelo Intlayer:

- `--mode report` lista os blocos que exigem atenção com números de linha, permitindo que o agente edite apenas esses blocos.
- `--mode synthesis` reporta apenas quais documentos estão em dia e quais contêm blocos pendentes de edição.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. Permitir que o agente chame a CLI através do servidor MCP

Com o [servidor MCP do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md), o agente responde com base na documentação atualizada e executa `intlayer fill` ou `intlayer doc review` por conta própria em vez de reimplementar a lógica na conversa.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

Instalar as [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md) com `npx intlayer init skills` também evita que o agente tente adivinhar a API do Intlayer e releia a documentação em cada tarefa.

### 5. Reutilizar sua assinatura do Claude com `claude setup-token`

Executar a configuração de i18n na sua sessão interativa do Claude Code mantém todo o histórico da conversa no contexto. Transfira esse trabalho pesado para uma sessão curta em modo headless.

Gere um token de longa duração a partir da sua assinatura do Claude:

```bash
claude setup-token
```

Armazene-o como `CLAUDE_CODE_OAUTH_TOKEN` (em um arquivo `.env` ou nas variáveis secretas do seu CI) e reutilize-o para uma sessão pontual que execute os comandos do Intlayer:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

A sessão carregará apenas esse prompt e a saída do comando, sem o histórico da sua conversa. O mesmo token funciona na [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) para rodar `intlayer fill` em cada pull request.

> O token gerado por `claude setup-token` autentica somente o Claude Code. Ele não pode ser usado como chave de API da Anthropic em `ai.apiKey`. Para a tradução em si, `intlayer fill` usa a sua [conta do Intlayer](https://app.intlayer.org) (plano gratuito incluso) ou a sua chave própria configurada em [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#ai-configuration).

## Resumo

| Tarefa                  | Quem executa                 | Tokens no contexto do agente |
| ----------------------- | ---------------------------- | ---------------------------- |
| Decidir o que localizar | Claude Code                  | Baixo                        |
| Extrair strings         | `intlayer extract`           | Nenhum                       |
| Traduzir conteúdo       | `intlayer fill`              | Nenhum                       |
| Traduzir documentação   | `intlayer doc translate`     | Nenhum                       |
| Atualizar documentação  | `intlayer doc review`        | Nenhum                       |
| Executar os comandos    | Claude Code em modo headless | Prompt + saída do comando    |
