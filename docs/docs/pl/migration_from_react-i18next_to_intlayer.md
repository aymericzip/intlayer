---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migracja z react-i18next / i18next do Intlayer | Internacjonalizacja (i18n)"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji React lub Next.js z react-i18next lub i18next do Intlayer krok po kroku, bez łamania istniejącego kodu. Użyj adapterów compat @intlayer/react-i18next i @intlayer/i18next do przejścia bez przerw."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migracja
  - internacjonalizacja
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migracja z react-i18next / i18next do Intlayer

## Dlaczego migrować z react-i18next / i18next do Intlayer?

<AccordionGroup>

<Accordion header="Rozmiar bundle">

Zamiast ładować ogromne pliki JSON do stron, ładuj tylko niezbędną zawartość. Intlayer pomaga **zmniejszyć bundle i rozmiary stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość utrzymania">

Ograniczanie zawartości aplikacji **ułatwia utrzymanie** dużych aplikacji. Możesz zduplikować lub usunąć jeden folder funkcji bez konieczności przeglądania całej bazy kodu zawartości. Ponadto Intlayer jest **w pełni wpisany** aby zapewnić dokładność zawartości.

Intlayer jest również rozwiązaniem z **najaktywniejszym rozwojem** w ekosystemie i18n — problemy są naprawiane szybko, nowe adaptery frameworku pojawiają się regularnie, a podstawowy API jest stale ulepsszany na podstawie opinii z produkcji.

</Accordion>

<Accordion header="Agent AI">

Umieszczanie zawartości razem **zmniejsza kontekst potrzebny** przez Duże Modele Języka (LLM). Intlayer zawiera również pakiet narzędzi, takich jak **CLI** do testowania brakujących tłumaczeń, **LSP**, **MCP** i **umiejętności agenta**, aby jeszcze bardziej gładka była doświadczenie dla programistów (DX) dla agentów AI.

</Accordion>

<Accordion header="Automatyzacja">

Użyj automatyzacji do tłumaczenia w pipeline CI/CD korzystając z wybranego LLM za koszt dostawcy AI. Intlayer oferuje również **kompilator** do automatycznego wyodrębniania zawartości, a także **platforma internetowa** aby pomóc **tłumaczyć w tle**.

</Accordion>

<Accordion header="Wydajność">

Łączenie dużych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Intlayer optymalizuje ładowanie zawartości w czasie budowania.

</Accordion>

<Accordion header="Skalowanie wraz z non-dev">

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia samodzielnie hostowany **edytor wizualny** i **pełny CMS** aby pomóc ci zarządzać multilingual zawartością w **rzeczywistym czasie**, czyniąc współpracę z tłumaczami, copywriterami i innymi członkami zespołu bezproblemową. Zawartość może być przechowywana lokalnie i/lub zdalnie.

</Accordion>

</AccordionGroup>

---

## Strategie migracji

Istnieją dwie komplementarne strategie migracji z `react-i18next` / `i18next` do Intlayer:

1. **Adapter compat (rekomendowany dla istniejących aplikacji)** — Zainstaluj `@intlayer/react-i18next` (dla komponentów React) i/lub `@intlayer/i18next` (dla instancji `i18n`). Te pakiety ujawniają **dokładnie ten sam API** co `react-i18next` / `i18next`, ale delegują całą pracę tłumaczenia do Intlayer za kulisami. Zachowujesz istniejące `useTranslation`, `Trans`, `withTranslation`, `i18next.t()` — jedyną zmianą jest ścieżka importu.

2. **Pełna migracja** — Stopniowo zastępuj API `react-i18next` natywnymi hakami Intlayer (`useIntlayer`, `IntlayerProvider`) i umieszczaj zawartość w plikach `.content.ts` obok komponentów.

Ten przewodnik obejmuje **Strategię 1** najpierw (adapter compat drop-in), a następnie przechodzi przez opcjonalną pełną migrację.

---

## Spis treści

<TOC/>

---

## Szybka migracja

Poniższe kroki to minimum wymagane, aby uruchomić istniejącą aplikację `react-i18next` na Intlayer bez żadnych zmian w kodzie.

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj pakiety rdzenia Intlayer i adaptery kompatybilności:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init` jeśli jesteś agentem AI.

> Ta komenda wykryje twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Możesz zachować zainstalowane `react-i18next` i `i18next` — adaptery kompatybilności używają ich jako `devDependencies` / opcjonalne `peerDependencies` dla typów TypeScript. Nie musisz zmieniać żadnych peers w `package.json`.

</Step>

<Step number={2} title="Konfiguracja Intlayer">

Komenda `intlayer init` tworzy starter `intlayer.config.ts`. Zaktualizuj go, aby dopasować się do twoich istniejących lokalizacji i wskaż wtyczkę `syncJSON` na twoje pliki wiadomości:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Dodaj wszystkie twoje istniejące lokalizacje tutaj
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // pasuje do składni placeholderów react-i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** mapuje lokalizację na ścieżkę pliku JSON. **`location`** mówi obserwatorowi Intlayer, który folder monitorować pod kątem zmian. Opcja `format: 'i18next'` zapewnia, że placeholdery takie jak `{{name}}` są analizowane prawidłowo.

</Step>

<Step number={3} title="Dodaj wtyczkę Intlayer do twojego bundlera">

Opakuj istniejącą konfigurację bundlera wtyczką kompatybilności. Kompiluje rdzeń wtyczki Intlayer, podłącza obserwowanie treści i — co krityczne — **wstrzykuje aliasy modułów**, aby twoje istniejące wywołania `import … from 'react-i18next'` (i `'i18next'`) były przezroczyście przekierowywane do `@intlayer/react-i18next` / `@intlayer/i18next` w czasie budowania. Żadne zmiany pliku źródłowego nie są potrzebne.

**Dla Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` opakuje wtyczkę `intlayer()` z `vite-intlayer` i dodaje aliasy `react-i18next` / `i18next`. Użycie zwykłej wtyczki `intlayer()` z `vite-intlayer` kompiluje słowniki, ale **nie** dodaje tych aliasów — musiałbyś wtedy ręcznie zmienić nazwy importów na `@intlayer/*` (patrz Krok 4).

**Dla Next.js:**

Jeśli używasz `next-i18next` (integracja Pages Router), zainstaluj `@intlayer/next-i18next` i `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Następnie dodaj wtyczkę kompatybilności do twojego `next.config.ts` (wstrzykuje aliasy `next-i18next` / `react-i18next` / `i18next`):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  /* twoje opcje */
};

export default withIntlayer(nextConfig);
```

> **Nie potrzebujesz już `i18next.init()` ani ręcznego bootstrappingu providera.** Intlayer kompiluje wszystkie słowniki w **czasie budowania**, więc nie ma kroku ładowania w czasie wykonania. Aliasowany provider obsługuje inicjalizację za ciebie.

</Step>

</Steps>

To wszystko w kwestii szybkiej migracji. Twoja aplikacja teraz działa na Intlayer, zachowując każdy import i API `react-i18next`.

> **Wpisane klucze translacji — automatycznie.** Gdy Intlayer skompiluje twoje słowniki, `useTranslation` i `getFixedT` są wpisane względem twojej faktycznej treści. Klucze są auto-uzupełniane w twoim IDE, a nieprawidłowe ścieżki powodują błędy TypeScript w czasie budowania — żadna dodatkowa konfiguracja nie jest wymagana.
>
> ```tsx
> // 'about' to zarejestrowany klucz słownika → t() akceptuje tylko prawidłowe ścieżki z kropkami
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ auto-uzupełniane
> t("does.not.exist"); // ✗ błąd TypeScript
>
> // Po stronie serwera (instancja i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ wpisane
> ```

---

## Kompletna migracja

Poniższe kroki są opcjonalne i mogą być wykonywane stopniowo. Odblokowują pełny zestaw funkcji Intlayer: edytor wizualny, CMS, pliki treści z typami, tłumaczenie wspomagane przez AI i wiele więcej.

<Steps>

<Step number={4} title="Jawne zmieniane nazw importów (opcjonalnie)" isOptional={true}>

Wtyczki Intlayer już obsługują aliasowanie na poziomie bundlera. Jeśli wolisz uczynić zależność jawną w plikach źródłowych, możesz ręcznie zmienić nazwy importów:

| Przed                                              | Po                                                           |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Dla Next.js (`next-i18next`):

| Przed                                                                          | Po                                                                |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

</Step>

<Step number={5} title="Włącz automatyzację tłumaczenia wspomaganą przez AI" isOptional={true}>

Gdy Intlayer jest podłączony, użyj jego CLI, aby automatycznie wypełnić brakujące tłumaczenia:

```bash packageManager="npm"
# Test brakujących tłumaczeń (dodaj do CI)
npx intlayer test

# Wypełnij brakujące tłumaczenia za pomocą AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Dodaj konfigurację AI do `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // domyślnie
    // model: "gpt-4o-mini",   // domyślnie
  },
};

export default config;
```

> Zapoznaj się z [dokumentacją CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md), aby zapoznać się ze wszystkimi dostępnymi opcjami.

</Step>

</Steps>

---

## Co możesz usunąć po migracji

Po umieszczeniu adapterów kompatybilności można usunąć następujący boilerplate `react-i18next` / `i18next`:

| Plik / pattern                           | Dlaczego już nie jest potrzebny                                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` calls                   | Provider Intlayer inicjalizuje wszystko automatycznie; nie ma kroku ładowania podczas wykonywania.                                      |
| `I18nextProvider` / `initReactI18next`   | Plugin Intlayer obsługuje wstrzyknięcie i bootstrap pod maską.                                                                          |
| JSON language bundles (`locales/*.json`) | Pakiety JSON są potrzebne tylko, jeśli nadal używasz pluginu `syncJSON`. Po migracji do plików `.content.ts` możesz usunąć folder JSON. |

Gdy będziesz gotowy do dalszych kroków, Intlayer **automatycznie odkrywa wszystkie pliki `.content.ts` i `.content.json` gdziekolwiek w twojej bazie kodu** (domyślnie gdziekolwiek wewnątrz `./src`). Możesz umieścić plik `my-component.content.ts` bezpośrednio obok `MyComponent.tsx` a Intlayer odbierze go podczas budowania bez dodatkowej konfiguracji — brak importów, rejestracji, brak scentralizowanego pliku indeksu. To sprawia, że współlokalizowanie tłumaczeń ze stronami i komponentami jest całkowicie bezproblemowe.

---

## Konfiguracja TypeScript

Intlayer używa module augmentation, aby zapewnić pełny intellisense TypeScript dla Twoich kluczy tłumaczenia. Upewnij się, że Twój plik `tsconfig.json` zawiera automatycznie wygenerowane typy:

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Dołącz automatycznie wygenerowane typy
  ],
}
```

---

## Szybka migracja

Następujące kroki są minimalne wymagane aby uruchomić istniejącą aplikację `react-i18next` na Intlayer bez zmian kodu.

<Steps>

<Step number={1} title="Zainstaluj zależności">
## Idź dalej

- **Visual Editor** — Zarządzaj tłumaczeniami wizualnie w przeglądarce: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- **CMS** — Externalizuj i zarządzaj treścią zdalnie: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- **VS Code Extension** — Uzyskaj autouzupełnianie i wykrywanie błędów tłumaczenia w czasie rzeczywistym: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)
- **CLI Reference** — Pełna lista poleceń CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- **Intlayer with React** — Pełny przewodnik konfiguracji dla React: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)
- **Intlayer with Next.js** — Pełny przewodnik konfiguracji dla Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)
