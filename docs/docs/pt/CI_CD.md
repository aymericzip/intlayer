---
createdAt: 2025-05-20
updatedAt: 2025-06-29
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
---

# Geração Automática de Traduções em um Pipeline CI/CD

O Intlayer permite a geração automática de traduções para seus arquivos de declaração de conteúdo. Existem várias maneiras de alcançar isso dependendo do seu fluxo de trabalho.

## Usando o CMS

Com o Intlayer, você pode adotar um fluxo de trabalho onde apenas um único idioma é declarado localmente, enquanto todas as traduções são gerenciadas remotamente através do CMS. Isso permite que o conteúdo e as traduções fiquem completamente desacoplados da base de código, oferecendo mais flexibilidade para os editores de conteúdo e possibilitando recarregamento dinâmico do conteúdo (sem necessidade de reconstruir a aplicação para aplicar as mudanças).

### Exemplo de Configuração

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Idiomas opcionais serão gerenciados remotamente
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // O conteúdo remoto tem prioridade

    applicationURL: process.env.APPLICATION_URL, // URL da aplicação usada pelo CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Credenciais do CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "Esta é uma aplicação de teste", // Ajuda a garantir a geração consistente de traduções
  },
};

export default config;
```

Para saber mais sobre o CMS, consulte a [documentação oficial](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Usando Husky

Você pode integrar a geração de traduções ao seu fluxo de trabalho Git local usando o [Husky](https://typicode.github.io/husky/).

### Exemplo de Configuração

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

    applicationContext: "Esta é uma aplicação de teste", // Ajuda a garantir a geração consistente de traduções
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Para garantir que os dicionários estejam atualizados
npx intlayer fill --unpushed --mode fill    # Preenche apenas o conteúdo faltante, não atualiza os existentes
```

> Para mais informações sobre os comandos CLI do Intlayer e seu uso, consulte a [documentação CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

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

Intlayer fornece um comando CLI para preenchimento automático e revisão do conteúdo do dicionário. Isso pode ser integrado ao seu fluxo de trabalho CI/CD usando GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ Fazer checkout do repositório
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Configurar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Instalar dependências
        run: npm ci

      - name: ⚙️ Construir projeto Intlayer
        run: npx intlayer build

      - name: 🤖 Preencher automaticamente traduções faltantes
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Criar ou atualizar PR de tradução
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Assim como para o Husky, no caso de um monorepo, você pode usar o argumento `--base-dir` para tratar sequencialmente cada app.

> Por padrão, o argumento `--git-diff` filtra os dicionários que incluem alterações da base (padrão `origin/main`) para o branch atual (padrão: `HEAD`).

> Para mais informações sobre os comandos do Intlayer CLI e seu uso, consulte a [documentação do CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
