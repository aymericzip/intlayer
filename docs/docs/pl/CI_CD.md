---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: Integracja CI/CD
description: Dowiedz się, jak zintegrować Intlayer z Twoim pipeline CI/CD do automatycznego zarządzania treścią i wdrażania.
keywords:
  - CI/CD
  - Integracja ciągła
  - Wdrażanie ciągłe
  - Automatyzacja
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Automatyczne generowanie tłumaczeń w pipeline CI/CD

Intlayer umożliwia automatyczne generowanie tłumaczeń dla Twoich plików deklaracji treści. Istnieje wiele sposobów, aby to osiągnąć, w zależności od Twojego workflow.

## Spis treści

<TOC/>

## Korzystanie z CMS

Z Intlayer możesz przyjąć workflow, w którym lokalnie deklarowany jest tylko jeden język, podczas gdy wszystkie tłumaczenia są zarządzane zdalnie przez CMS. Pozwala to na całkowite oddzielenie treści i tłumaczeń od bazy kodu, oferując większą elastyczność dla edytorów treści oraz umożliwiając Live Sync (brak konieczności przebudowy aplikacji, aby zastosować zmiany).

### Przykładowa konfiguracja

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Opcjonalne języki będą zarządzane zdalnie
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    // Dane uwierzytelniające CMS, jeśli używasz CMS
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
  ai: {
    applicationContext: "To jest aplikacja testowa", // Pomaga zapewnić spójność generowania tłumaczeń
  },
};

export default config;
```

Aby dowiedzieć się więcej o CMS, zapoznaj się z [oficjalną dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

## Używanie Husky

Możesz zintegrować generowanie tłumaczeń z lokalnym workflow Git za pomocą [Husky](https://typicode.github.io/husky/).

### Przykładowa konfiguracja

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Opcjonalne lokalizacje są obsługiwane zdalnie
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Użyj własnego klucza API

    applicationContext: "To jest aplikacja testowa", // Pomaga zapewnić spójność generowania tłumaczeń
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Aby upewnić się, że słowniki są aktualne
npx intlayer fill --unpushed --mode fill    # Wypełnia tylko brakujące treści, nie aktualizuje istniejących
```

> Aby uzyskać więcej informacji na temat poleceń Intlayer CLI i ich użycia, zapoznaj się z [dokumentacją CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

> Jeśli masz wiele aplikacji w swoim repozytorium korzystających z osobnych instancji intlayer, możesz użyć argumentu `--base-dir` w następujący sposób:

```bash fileName=".husky/pre-push"
# Aplikacja 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# Aplikacja 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Używanie GitHub Actions

Intlayer udostępnia polecenie CLI do automatycznego wypełniania i przeglądu zawartości słowników. Można to zintegrować z Twoim workflow CI/CD za pomocą GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
# Warunki wyzwalające ten workflow
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
      # Krok 1: Pobierz najnowszy kod z repozytorium
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Zachowaj poświadczenia do tworzenia PR
          fetch-depth: 0 # Pobierz pełną historię git do analizy różnic

      # Krok 2: Skonfiguruj środowisko Node.js
      - name: 🟢 Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Użyj Node.js 20 LTS dla stabilności

      # Krok 3: Zainstaluj zależności projektu
      - name: 📦 Zainstaluj zależności
        run: npm install

      # Krok 4: Zainstaluj globalnie Intlayer CLI do zarządzania tłumaczeniami
      - name: 📦 Zainstaluj Intlayer
        run: npm install -g intlayer-cli

      # Krok 5: Zbuduj projekt Intlayer, aby wygenerować pliki tłumaczeń
      - name: ⚙️ Zbuduj projekt Intlayer
        run: npx intlayer build

      # Krok 6: Użyj AI do automatycznego uzupełniania brakujących tłumaczeń
      - name: 🤖 Automatyczne uzupełnianie brakujących tłumaczeń
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Krok 7: Sprawdź, czy są zmiany i zatwierdź je
      - name: � Sprawdź zmiany
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Krok 8: Zatwierdź i wypchnij zmiany, jeśli istnieją
      - name: 📤 Zatwierdź i wypchnij zmiany
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: auto-fill missing translations [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

Aby skonfigurować zmienne środowiskowe, przejdź do GitHub → Settings → Secrets and variables → Actions i dodaj sekret.

> Podobnie jak w przypadku Husky, w przypadku monorepo możesz użyć argumentu `--base-dir`, aby kolejno obsłużyć każdą aplikację.

> Domyślnie argument `--git-diff` filtruje słowniki, które zawierają zmiany od bazy (domyślnie `origin/main`) do bieżącej gałęzi (domyślnie: `HEAD`).

> Aby uzyskać więcej informacji o poleceniach Intlayer CLI i ich użyciu, zapoznaj się z [dokumentacją CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).
