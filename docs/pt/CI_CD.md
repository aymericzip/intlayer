# Geração Automática de Traduções em um Pipeline CI/CD

O Intlayer permite a geração automática de traduções para seus arquivos de declaração de conteúdo. Existem várias maneiras de alcançar isso, dependendo do seu fluxo de trabalho.

## Usando o CMS

Com o Intlayer, você pode adotar um fluxo de trabalho onde apenas um único idioma é declarado localmente, enquanto todas as traduções são gerenciadas remotamente através do CMS. Isso permite que o conteúdo e as traduções sejam completamente desvinculados do código, oferecendo mais flexibilidade para os editores de conteúdo e permitindo recarregamento dinâmico de conteúdo (sem necessidade de reconstruir a aplicação para aplicar mudanças).

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
    dictionaryPriorityStrategy: "distant_first", // Conteúdo remoto tem prioridade

    applicationURL: process.env.APPLICATION_URL, // URL da aplicação usada pelo CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Credenciais do CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "Esta é uma aplicação de teste", // Ajuda a garantir consistência na geração de traduções
  },
};

export default config;
```

Para saber mais sobre o CMS, consulte a [documentação oficial](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md).

## Usando Husky

Você pode integrar a geração de traduções ao seu fluxo de trabalho local do Git usando [Husky](https://typicode.github.io/husky/).

### Exemplo de Configuração

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Idiomas opcionais são gerenciados remotamente
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Use sua própria chave de API

    applicationContext: "Esta é uma aplicação de teste", // Ajuda a garantir consistência na geração de traduções
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Para garantir que os dicionários estejam atualizados
npx intlayer fill --unpushed --mode fill    # Apenas preenche conteúdo ausente, não atualiza os existentes
```

> Para mais informações sobre os comandos CLI do Intlayer e seu uso, consulte a [documentação CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

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

O Intlayer fornece um comando CLI para preencher automaticamente e revisar o conteúdo do dicionário. Isso pode ser integrado ao seu fluxo de trabalho CI/CD usando GitHub Actions.

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
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Install dependencies
        run: npm ci

      - name: ⚙️ Build Intlayer project
        run: npx intlayer build

      - name: 🤖 Auto-fill missing translations
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Create or update translation PR
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Assim como no caso do Husky, em um monorepo, você pode usar o argumento `--base-dir` para tratar sequencialmente cada aplicativo.

> Por padrão, o argumento `--git-diff` filtra dicionários que incluem alterações da base (padrão `origin/main`) para o branch atual (padrão: `HEAD`).

> Para mais informações sobre os comandos CLI do Intlayer e seu uso, consulte a [documentação CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).
