---
createdAt: 2025-03-01
updatedAt: 2025-10-05
title: Testowanie Twoich treści
description: Odkryj, jak testować swoje treści za pomocą Intlayer.
keywords:
  - Testowanie
  - Intlayer
  - Internacjonalizacja
  - CMS
  - System Zarządzania Treścią
  - Edytor Wizualny
slugs:
  - doc
  - testing
history:
  - version: 6.0.1
    date: 2025-10-05
    changes: Uczynienie testu asynchronicznym i dodanie opcji build
  - version: 6.0.0
    date: 2025-09-20
    changes: Wprowadzenie testowania
---

# Testowanie Twoich treści

Ten przewodnik pokazuje, jak automatycznie weryfikować kompletność słowników, wykrywać brakujące tłumaczenia przed wdrożeniem oraz testować zlokalizowany interfejs użytkownika w Twojej aplikacji.

---

## Co możesz testować

- **Brakujące tłumaczenia**: przerwij CI, jeśli w którymkolwiek słowniku brakuje wymaganych lokalizacji.
- **Renderowanie zlokalizowanego UI**: renderuj komponenty z określonym dostawcą lokalizacji i sprawdzaj widoczny tekst/atrybuty.
- **Audyt w czasie budowania**: uruchom szybki audyt lokalnie za pomocą CLI.

---

## Szybki start: audyt przez CLI

Uruchom audyt z katalogu głównego projektu:

```bash
npx intlayer content test
```

Przydatne flagi:

- `--env-file [ścieżka]`: załaduj zmienne środowiskowe z pliku.
- `-e, --env [nazwa]`: wybierz profil środowiska.
- `--base-dir [ścieżka]`: ustaw katalog bazowy aplikacji do rozwiązywania ścieżek.
- `--verbose`: pokaż szczegółowe logi.
- `--prefix [etykieta]`: prefiksuj linie logów.
- `--build [build]`: zbuduj słowniki przed testowaniem, aby upewnić się, że zawartość jest aktualna. True wymusi budowanie, false pominie budowanie, undefined pozwoli użyć cache budowania.

Uwaga: CLI generuje szczegółowy raport, ale nie zwraca kodu błędu przy niepowodzeniach. Aby zabezpieczyć CI, dodaj test jednostkowy (poniżej), który sprawdza brak brakujących wymaganych lokalizacji.

---

## Test programowy (Vitest/Jest)

Użyj API Intlayer CLI, aby sprawdzić, czy nie brakuje tłumaczeń dla wymaganych lokalizacji.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("has no missing required locales", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Przydatne, gdy test nie przejdzie lokalnie lub w CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Odpowiednik w Jest:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("nie ma brakujących wymaganych lokalizacji", async () => {
  const result = await listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // Przydatne, gdy test nie przejdzie lokalnie lub w CI
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Jak to działa:

- Intlayer odczytuje Twoją konfigurację (locales, requiredLocales) oraz zadeklarowane słowniki, a następnie raportuje:
  - `missingTranslations`: dla każdego klucza, które lokalizacje są brakujące i z którego pliku.
  - `missingLocales`: zbiór wszystkich brakujących lokalizacji.
  - `missingRequiredLocales`: podzbiór ograniczony do `requiredLocales` (lub wszystkich lokalizacji, jeśli `requiredLocales` nie jest ustawione).

---

## Testowanie lokalizowanego UI (React / Next.js)

Renderuj komponenty w ramach providera Intlayer i sprawdzaj widoczną zawartość.

Przykład React (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renderuje lokalizowany tytuł w języku angielskim", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Expected English title")).toBeInTheDocument();
});
```

Przykład Next.js (App Router): użyj wrappera frameworka:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("renders localized heading in French", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

Wskazówki:

- Gdy potrzebujesz surowych wartości tekstowych dla atrybutów (np. `aria-label`), uzyskaj dostęp do pola `.value` zwracanego przez `useIntlayer` w React.
- Przechowuj słowniki razem z komponentami, aby ułatwić testy jednostkowe i sprzątanie.

---

## Continuous Integration

Dodaj test, który przerwie budowanie, gdy braknie wymaganych tłumaczeń.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

Przykład GitHub Actions:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

Opcjonalnie: uruchom audyt CLI, aby uzyskać czytelne podsumowanie wraz z testami:

```bash
npx intlayer content test --verbose
```

---

## Rozwiązywanie problemów

- Upewnij się, że Twoja konfiguracja Intlayer definiuje `locales` oraz (opcjonalnie) `requiredLocales`.
- Jeśli Twoja aplikacja korzysta z dynamicznych lub zdalnych słowników, uruchamiaj testy w środowisku, gdzie słowniki są dostępne.
- W przypadku mieszanych monorepo, użyj `--base-dir`, aby wskazać CLI właściwy katalog główny aplikacji.

---
