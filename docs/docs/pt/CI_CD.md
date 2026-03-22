---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: Integração CI/CD
description: Aprenda como integrar o Intlayer em seu pipeline CI/CD para gerenciamento e implantação automatizados de conteúdo.
keywords:
  - CI/CD
  - Integração Contínua
  - Implantação Contínua
  - Automação
  - Internacionalização
  - Documentação
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
---

# Geração Automática de Traduções em um Pipeline CI/CD

O Intlayer permite a geração automática de traduções para seus arquivos de declaração de conteúdo. Existem várias maneiras de realizar isso dependendo do seu fluxo de trabalho.

## Usando o CMS

Com o Intlayer, você pode adotar um fluxo de trabalho onde apenas um único idioma é declarado localmente, enquanto todas as traduções são gerenciadas remotamente através do CMS. Isso permite que o conteúdo e as traduções fiquem completamente desacoplados da base de código, oferecendo mais flexibilidade para os editores de conteúdo e possibilitando o recarregamento dinâmico do conteúdo (sem necessidade de reconstruir a aplicação para aplicar as alterações).

### Configuração de Exemplo

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Idiomas opcionais serão gerenciados remotamente
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // Conteúdo remoto tem prioridade

    applicationURL: process.env.APPLICATION_URL, // URL da aplicação usada pelo CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Credenciais do CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // Ajuda a garantir a geração consistente de traduções
  },
};

export default config;
```

Para saber mais sobre o CMS, consulte a [documentação oficial](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Usando Husky

Você pode integrar a geração de traduções no seu fluxo de trabalho local do Git usando o [Husky](https://typicode.github.io/husky/).

### Configuração de Exemplo

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Locais opcionais são gerenciados remotamente
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Use sua própria chave API

    applicationContext: "This is a test application", // Ajuda a garantir a geração consistente de traduções
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Para garantir que os dicionários estejam atualizados
npx intlayer fill --unpushed --mode fill    # Apenas preenche o conteúdo faltante, não atualiza os existentes
```

> Para mais informações sobre os comandos CLI do Intlayer e seu uso, consulte a [documentação CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

> Se você tiver múltiplos aplicativos no seu repositório usando instâncias separadas do Intlayer, você pode usar o argumento `--base-dir` assim:

```bash fileName=".husky/pre-push"
# App 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# App 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Usando GitHub Actions

O Intlayer fornece um comando CLI para preenchimento automático e revisão do conteúdo do dicionário. Isso pode ser integrado ao seu fluxo de trabalho CI/CD usando GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Preenchimento Automático Intlayer
# Condições de gatilho para este fluxo de trabalho
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # Passo 1: Obter o código mais recente do repositório
      - name: ⬇️ Checkout do repositório
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Manter credenciais para criação de PRs
          fetch-depth: 0 # Obter histórico completo do git para análise de diferenças

      # Passo 2: Configurar ambiente Node.js
      - name: 🟢 Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Usar Node.js 20 LTS para estabilidade

      # Passo 3: Instalar dependências do projeto
      - name: 📦 Instalar dependências
        run: npm install

      # Passo 4: Instalar Intlayer CLI globalmente para gerenciamento de traduções
      - name: 📦 Instalar Intlayer
        run: npm install -g intlayer-cli

      # Passo 5: Construir o projeto Intlayer para gerar arquivos de tradução
      - name: ⚙️ Construir projeto Intlayer
        run: npx intlayer build

      # Passo 6: Usar IA para preencher automaticamente traduções faltantes
      - name: 🤖 Preencher automaticamente traduções faltantes
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Passo 7: Verificar se há alterações e comitá-las
      - name: � Verificar alterações
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Passo 8: Comitar e enviar alterações se existirem
      - name: 📤 Comitar e enviar alterações
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: auto-fill missing translations [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

Para configurar as variáveis de ambiente, vá para GitHub → Configurações → Segredos e variáveis → Ações e adicione o segredo .

> Assim como para o Husky, no caso de um monorepo, você pode usar o argumento `--base-dir` para tratar sequencialmente cada app.

> Por padrão, o argumento `--git-diff` filtra os dicionários que incluem alterações da base (padrão `origin/main`) para o branch atual (padrão: `HEAD`).

> Para mais informações sobre os comandos do Intlayer CLI e seu uso, consulte a [documentação do CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).
