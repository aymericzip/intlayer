---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migracja z i18next do Intlayer | Internacjonalizacja (i18n)"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji JavaScript/TypeScript z i18next do Intlayer krok po kroku, bez łamania istniejącego kodu. Użyj adaptera compat @intlayer/i18next do przejścia bez przerw."
keywords:
  - i18next
  - intlayer
  - migracja
  - internacjonalizacja
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migracja z i18next do Intlayer

## Dlaczego migrować z i18next do Intlayer?

<AccordionGroup>

<Accordion header="Rozmiar bundle">

Zamiast ładować ogromne pliki JSON do stron, ładuj tylko niezbędną zawartość. Intlayer pomaga **zmniejszyć bundle i rozmiary stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość utrzymania">

Ograniczanie zawartości aplikacji **ułatwia utrzymanie** dużych aplikacji. Możesz zduplikować lub usunąć jeden folder funkcji bez konieczności przeglądania całej bazy kodu zawartości. Ponadto Intlayer jest **w pełni wpisany** aby zapewnić dokładność zawartości.

Intlayer jest również rozwiązaniem z **najaktywniejszym rozwojem** w ekosystemie i18n — problemy są naprawiane szybko, nowe adaptery frameworku pojawiają się regularnie, a podstawowy API jest stale ulepsszany na podstawie opinii z produkcji.

</Accordion>

<Accordion header="Agent AI">

Umieszczanie zawartości razem **zmniejsza kontekst potrzebny** przez Duże Modele Języka (LLM). Intlayer zawiera również pakiet narzędzi, takich jak **CLI** do testowania brakujących tłumaczeń, **LSP**, **MCP** i **agent skills**, aby jeszcze bardziej gładka była doświadczenie dla programistów (DX) dla agentów AI.

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

Istnieją dwie komplementarne strategie migracji z `i18next` do Intlayer:

1. **Adapter compat (rekomendowany dla istniejących aplikacji)** — Zainstaluj `@intlayer/i18next`. Ten pakiet ujawnia **dokładnie ten sam API** co `i18next`, ale deleguje całą pracę tłumaczenia do Intlayer za kulisami. Zachowujesz istniejące `i18next.t()`, `i18next.changeLanguage()` i `createInstance()` — jedyną zmianą jest ścieżka importu i inicjalizacja.

2. **Pełna migracja** — Stopniowo zastępuj API `i18next` natywnymi narzędziami Intlayer i umieszczaj zawartość w plikach `.content.ts`.

Ten przewodnik obejmuje **Strategię 1** najpierw (adapter compat drop-in), a następnie przechodzi przez opcjonalną pełną migrację.

---

## Spis treści

<TOC/>

---

## Szybka migracja

Następujące kroki są minimalne wymagane aby uruchomić istniejącą aplikację `i18next` na Intlayer bez zmian kodu.

<Steps>

<Step number={1} title="Zainstaluj zależności">

Zainstaluj pakiety rdzenia Intlayer i adapter compat:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

> To polecenie wykryje Twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

> Możesz zachować zainstalowany `i18next` — adapter kompatybilności używa go jako `devDependency` / `peerDependency` dla typów TypeScript.

</Step>

<Step number={2} title="Skonfiguruj Intlayer">

Polecenie `intlayer init` tworzy starter `intlayer.config.ts`. Zaktualizuj go, aby odpowiadał Twoim istniejącym lokalizacjom i wskaż wtyczkę `syncJSON` na Twoje pliki komunikatów:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Dodaj tutaj wszystkie istniejące lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // pasuje do składni placeholdera i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** mapuje locale na ścieżkę pliku JSON. **`location`** informuje watcher Intlayera, który folder monitorować pod kątem zmian. Opcja `format: 'i18next'` zapewnia, że placeholdery takie jak `{{name}}` są poprawnie parsowane.

</Step>

<Step number={3} title="Zaktualizuj aliasy bundlera (opcjonalnie)">

Jeśli używasz bundlera (Vite, Webpack, esbuild), możesz wstrzyknąć alias modułu, aby `import ... from 'i18next'` automatycznie rozpoznawał `@intlayer/i18next`. To eliminuje potrzebę ręcznej zmiany jakichkolwiek importów w Twoim codebase.

**Dla Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()` opakowuje plugin `intlayer()` z `vite-intlayer` i dodaje
> alias `i18next` → `@intlayer/i18next` dla Ciebie. Użycie zwykłego pluginu `intlayer()`
> z `vite-intlayer` kompiluje słowniki, ale **nie** dodaje tego aliasu — musisz wtedy
> ręcznie zmienić nazwy importów na `@intlayer/i18next` (zobacz następny krok).

</Step>

</Steps>

To jest szybka migracja. Twoja aplikacja teraz działa na Intlayer, zachowując wszystkie `i18next` importy i API w niezmienionej formie.

---

## Pełna migracja

Poniższe kroki są opcjonalne i można je wykonywać stopniowo. Odblokowują one pełny zestaw funkcji Intlayer: edytor wizualny, CMS, pliki zawartości z typami, automatyczne tłumaczenie oparte na AI i wiele więcej.

<Steps>

<Step number={4} title="Jawne zmiana nazwy importu (opcjonalnie)" isOptional={true}>

Jeśli wolisz uczynić zależność jawną w swoich plikach źródłowych lub jeśli nie używasz wtyczki bundlera do aliasowania importów, możesz zmienić nazwy importów ręcznie:

| Przed                                      | Po                                                   |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

Są to **drop-in replacements** — nie wymagane są żadne zmiany w sygnaturach funkcji, argumentach ani typach zwracanych.

</Step>

<Step number={5} title="Włącz automatyzację tłumaczenia opartą na AI" isOptional={true}>

Gdy Intlayer jest już skonfigurowany, użyj jego CLI do automatycznego wypełnienia brakujących tłumaczeń:

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

> Zapoznaj się z [dokumentacją CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md), aby uzyskać wszystkie dostępne opcje.

</Step>

</Steps>

---

## Co możesz usunąć po migracji

Po umieszczeniu adaptera kompatybilności można usunąć poniższe boilerplate'y `i18next`:

| Plik / pattern                           | Dlaczego już nie jest potrzebny                                                                                                        |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` calls                   | Intlayer inicjuje wszystko automatycznie; nie ma kroku ładowania w czasie wykonania.                                                   |
| `i18next.use(...)`                       | Intlayer nie używa pluginów i18next, backendów ani detektorów języka.                                                                  |
| JSON language bundles (`locales/*.json`) | Pakiety JSON są potrzebne tylko jeśli nadal używasz pluginu `syncJSON`. Po migracji do plików `.content.ts` możesz usunąć folder JSON. |

Gdy będziesz gotów do dalszych kroków, Intlayer **automatycznie odkrywa wszystkie pliki `.content.ts` i `.content.json` znajdujące się wszędzie w twojej bazie kodu** (domyślnie wszędzie wewnątrz `./src`). Możesz umieścić plik `my-component.content.ts` obok swojej logiki, a Intlayer podejmie go podczas kompilacji bez dodatkowej konfiguracji — bez importów, rejestracji ani scentralizowanego pliku indeksu. To sprawia, że współlokowanie tłumaczeń jest całkowicie bezproblemowe.

---

## Konfiguracja TypeScript

Intlayer wykorzystuje module augmentation, aby zapewnić pełną intellisense TypeScript dla twoich kluczy tłumaczeń. Upewnij się, że twój plik `tsconfig.json` zawiera auto-generowane typy:

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Załącz auto-generowane typy
  ],
}
```

---

## Konfiguracja Git

Dodaj wygenerowany katalog Intlayer do `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki wygenerowane przez Intlayer
.intlayer
```

---

## Idź dalej

- **Visual Editor** — Zarządzaj tłumaczeniami wizualnie w przeglądarce: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- **CMS** — Externalizuj i zarządzaj zawartością zdalnie: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- **VS Code Extension** — Uzyskaj autouzupełnianie i wykrywanie błędów tłumaczenia w czasie rzeczywistym: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)
- **CLI Reference** — Pełna lista poleceń CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
