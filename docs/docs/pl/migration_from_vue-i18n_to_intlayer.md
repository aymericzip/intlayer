---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migracja z vue-i18n do Intlayer | Internacjonalizacja (i18n)"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Vue lub Nuxt z vue-i18n do Intlayer krok po kroku, bez łamania istniejącego kodu. Użyj adaptera compat @intlayer/vue-i18n do przejścia bez przerw."
keywords:
  - vue-i18n
  - intlayer
  - migracja
  - internacjonalizacja
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migracja z vue-i18n do Intlayer

## Dlaczego migrować z vue-i18n do Intlayer?

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

Istnieją dwie komplementarne strategie migracji z `vue-i18n` do Intlayer:

1. **Adapter compat (rekomendowany dla istniejących aplikacji)** — Zainstaluj `@intlayer/vue-i18n` (dla komponentów Vue). Ten pakiet ujawnia **dokładnie ten sam API** co `vue-i18n`, ale deleguje całą pracę tłumaczenia do Intlayer za kulisami. Zachowujesz istniejące `$t`, `useI18n()` i `<i18n-t>` — jedyną zmianą jest ścieżka importu i inicjalizacja.

2. **Pełna migracja** — Stopniowo zastępuj API `vue-i18n` natywnymi hakami Intlayer (`useIntlayer`) i umieszczaj zawartość w plikach `.content.ts` obok komponentów.

Ten przewodnik obejmuje **Strategię 1** najpierw (adapter compat drop-in), a następnie przechodzi przez opcjonalną pełną migrację.

---

## Spis treści

<TOC/>

---

## Szybka migracja

Następujące kroki są minimalne wymagane aby uruchomić istniejącą aplikację `vue-i18n` na Intlayer bez zmian kodu w komponentach.

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
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Możesz zachować `vue-i18n` zainstalowany — adapter kompatybilności używa go jako `devDependency` / `peerDependency` dla typów TypeScript.

</Step>

<Step number={2} title="Konfiguruj Intlayer">

Polecenie `intlayer init` tworzy plik startowy `intlayer.config.ts`. Zaktualizuj go, aby pasował do twoich istniejących lokalizacji i wskaż wtyczkę `syncJSON` na twoje pliki wiadomości:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Dodaj wszystkie istniejące lokale tutaj
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // pasuje do składni placeholdera vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** mapuje ustawienie regionalne na ścieżkę pliku JSON. **`location`** informuje obserwatora Intlayer, które foldery monitorować w poszukiwaniu zmian. Opcja `format: 'icu'` zapewnia, że symbole zastępcze są analizowane poprawnie dla `vue-i18n`.

</Step>

<Step number={3} title="Dodaj wtyczkę Intlayer do swojego bundlera">

Zawiń istniejącą konfigurację bundlera za pomocą wtyczki compat. Komponuje core'owy plugin Intlayer, podłącza obserwację zawartości i — co krytyczne — **wstrzykuje alias modułu** tak aby istniejące wywołania `import … from 'vue-i18n'` były transparentnie przekierowywane do `@intlayer/vue-i18n` w czasie budowania. Nie są wymagane żadne zmiany plików źródłowych.

**Dla Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()` otacza plugin `intlayer()` z `vite-intlayer` i dodaje alias `vue-i18n`. Używając zwykłego pluginu `intlayer()` z `vite-intlayer`, kompiluje słowniki, ale **nie** dodaje aliasu — wtedy musisz ręcznie zmienić nazwy importów na `@intlayer/vue-i18n` (patrz Krok 4).

**Dla Nuxt:**

Jeśli używasz `@nuxtjs/i18n` (integracja Nuxt), zainstaluj `nuxt-intlayer` i dodaj go do swojego `nuxt.config.ts`:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // Możesz bezpiecznie usunąć @nuxtjs/i18n ze swoich modułów
});
```

> **Nie potrzebujesz już `createI18n()` ani ręcznego inicjowania providera.** Intlayer kompiluje wszystkie słowniki w **czasie buildowania**, więc nie ma kroku ładowania w runtime. Aliasowany provider obsługuje inicjalizację za Ciebie.

</Step>

</Steps>

To koniec szybkiej migracji. Twoja aplikacja działa teraz na Intlayer, zachowując każdy import `vue-i18n` i API bez zmian.

> **Wpisane klucze tłumaczeń — automatycznie.** Po skompilowaniu słowników przez Intlayer, `useI18n` jest typizowany względem rzeczywistej zawartości, gdy przekażesz opcję `namespace`. Klucze są autocompleted w twoim IDE, a nieprawidłowe ścieżki powodują błędy TypeScript w czasie budowania — nie jest wymagana żadna dodatkowa konfiguracja.
>
> ```ts
> // 'about' to zarejestrowany klucz słownika
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ autocompleted
> t("does.not.exist"); // ✗ TypeScript error
> ```

---

## Pełna migracja

Poniższe kroki są opcjonalne i mogą być wykonywane stopniowo. Odblokowują pełny zestaw funkcji Intlayer: edytor wizualny, CMS, pliki zawartości z typami, tłumaczenie wspierane przez AI i wiele więcej.

<Steps>

<Step number={4} title="Jawne zmianę nazwy importu (opcjonalnie)" isOptional={true}>

Wtyczki Intlayer już obsługują aliasing na poziomie bundlera. Jeśli wolisz uczynić zależność jawną w plikach źródłowych, możesz zmienić nazwy importów ręcznie:

| Przed                                   | Po                                                |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

Są to **zamiany plug-and-play** — nie są wymagane żadne zmiany w sygnaturach funkcji, argumentach ani typach zwracanych.

</Step>

<Step number={5} title="Włącz automatyczne tłumaczenie wspierane przez AI" isOptional={true}>

Po połączeniu Intlayer, użyj jego CLI, aby automatycznie uzupełnić brakujące tłumaczenia:

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
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
      format: "icu",
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

> Aby uzyskać wszystkie dostępne opcje, zapoznaj się z [dokumentacją CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

</Step>

</Steps>

---

## Co możesz usunąć po migracji

Gdy adaptery kompatybilności będą na miejscu, możesz usunąć następujący boilerplate `vue-i18n`:

| File / pattern                            | Dlaczego nie jest już potrzebny                                                                                                        |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `createI18n()` calls                      | Provider Intlayer inicjalizuje wszystko automatycznie; nie ma kroku ładowania w czasie wykonywania.                                    |
| Vue plugin registration (`app.use(i18n)`) | Plugin Intlayer obsługuje iniekcję i bootstrapping pod maską.                                                                          |
| JSON language bundles (`locales/*.json`)  | Pakiety JSON są potrzebne tylko jeśli nadal używasz pluginu `syncJSON`. Po migracji do plików `.content.ts` możesz usunąć folder JSON. |

Gdy będziesz gotowy pójść dalej, Intlayer **automatycznie odkrywa wszystkie pliki `.content.ts` i `.content.json` gdziekolwiek w twoim codebase** (domyślnie gdziekolwiek wewnątrz `./src`). Możesz umieścić plik `my-component.content.ts` bezpośrednio obok twojego `MyComponent.vue`, a Intlayer podejmie go w czasie budowania bez dodatkowej konfiguracji — bez importów, bez rejestracji, bez scentralizowanego pliku indeksu. To sprawia, że co-lokowanie tłumaczeń ze stronami i komponentami jest całkowicie bezproblemowe.

---

## Konfiguruj TypeScript

Intlayer używa module augmentation, aby zapewnić pełną intellisense TypeScript dla twoich kluczy tłumaczeń. Upewnij się, że twój `tsconfig.json` zawiera auto-generowane typy:

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Uwzględnij auto-generowane typy
  ],
}
```

---

## Konfiguracja Git

Dodaj wygenerowany przez Intlayer katalog do `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki wygenerowane przez Intlayer
.intlayer
```

---

## Przejdź dalej

- **Visual Editor** — Zarządzaj tłumaczeniami wizualnie w przeglądarce: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- **CMS** — Externalizuj i zarządzaj zawartością zdalnie: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- **VS Code Extension** — Uzyskaj autouzupełnianie i wykrywanie błędów tłumaczeń w czasie rzeczywistym: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)
- **CLI Reference** — Pełna lista poleceń CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- **Intlayer with Vue** — Pełny przewodnik konfiguracji dla Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+vue.md)
- **Intlayer with Nuxt** — Pełny przewodnik konfiguracji dla Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nuxt.md)
