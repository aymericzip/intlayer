---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migracja z @nuxtjs/i18n do Intlayer | Internacjonalizacja (i18n)"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Nuxt z @nuxtjs/i18n do Intlayer krok po kroku, bez łamania istniejącego kodu. Użyj adaptera compat @intlayer/vue-i18n do przejścia bez przerw."
keywords:
  - "@nuxtjs/i18n"
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
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migracja z @nuxtjs/i18n do Intlayer

## Dlaczego migrować z @nuxtjs/i18n do Intlayer?

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

Ponieważ `@nuxtjs/i18n` jest zasilany przez `vue-i18n` za kulisami, istnieją dwie komplementarne strategie migracji do Intlayer:

1. **Adapter compat (rekomendowany dla istniejących aplikacji)** — Zainstaluj `@intlayer/vue-i18n` i `nuxt-intlayer`. To ujawnia **dokładnie ten sam API** co `vue-i18n`, ale deleguje całą pracę tłumaczenia do Intlayer za kulisami. Zachowujesz istniejące `$t`, `useI18n()` i routing Nuxt — jedyną zmianą jest inicjalizacja.

2. **Pełna migracja** — Stopniowo zastępuj API `@nuxtjs/i18n` natywnymi hakami Intlayer (`useIntlayer`) i umieszczaj zawartość w plikach `.content.ts` obok komponentów.

Ten przewodnik obejmuje **Strategię 1** najpierw (adapter compat drop-in), a następnie przechodzi przez opcjonalną pełną migrację.

---

## Spis treści

<TOC/>

---

## Szybka migracja

Poniższe kroki to minimum wymagane, aby uruchomić istniejącą aplikację Nuxt w Intlayer bez żadnych zmian kodu w komponentach.

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj główne pakiety Intlayer i adapter kompatybilności:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init` jeśli jesteś agentem AI.

> Ta komenda automatycznie wykryje Twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Możesz bezpiecznie utrzymać `@nuxtjs/i18n` zainstalowany podczas migracji, chociaż usuniemy go z konfiguracji Nuxt wkrótce.

</Step>

<Step number={2} title="Konfiguracja Intlayer">

Komenda `intlayer init` tworzy starter `intlayer.config.ts`. Zaktualizuj go, aby pasował do twoich istniejących lokalizacji i wskaż plugin `syncJSON` na pliki wiadomości:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Dodaj wszystkie istniejące lokalizacje tutaj
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // pasuje do składni placeholdera vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`** mapuje lokalizację na ścieżkę pliku JSON. **`location`** mówi obserwatorowi Intlayer, który folder monitorować pod kątem zmian. Opcja `format: 'icu'` zapewnia, że placeholdery są poprawnie analizowane dla `vue-i18n`.

</Step>

<Step number={3} title="Aktualizacja konfiguracji Nuxt">

Zastąp moduł `@nuxtjs/i18n` modułem `nuxt-intlayer` w pliku `nuxt.config.ts`. Plugin Intlayer automatycznie wstrzykuje aliasy modułów, co oznacza, że istniejące wywołania `import { useI18n } from 'vue-i18n'` są transparentnie przekierowywane do `@intlayer/vue-i18n`.

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // Usuń '@nuxtjs/i18n'
  modules: ["nuxt-intlayer"],
});
```

> **Nie musisz już definiować obiektów konfiguracji i18n Nuxt.** Intlayer kompiluje wszystkie słowniki w **czasie budowania**, obsługując wykrywanie lokalizacji, routing i ładowanie słownika bezproblemowo.

</Step>

</Steps>

To wszystko dla szybkiej migracji. Twoja aplikacja Nuxt działa teraz na Intlayer, zachowując każdy `$t` i `useI18n()` bez zmian.

---

## Pełna migracja

Poniższe kroki są opcjonalne i można je wykonywać przyrostowo. Odblokują one pełny zestaw funkcji Intlayer: edytor wizualny, CMS, typed content files, tłumaczenie wspierane sztuczną inteligencją i wiele więcej.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

Pluginy Intlayer już obsługują aliasing na poziomie bundlera. Jeśli wolisz uczynić zależność jawną w plikach źródłowych, możesz ręcznie zmienić nazwy importów:

| Before                               | After                                          |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

To są **drop-in replacements** — nie są wymagane żadne zmiany sygnatur funkcji, argumentów ani typów zwracanych.

</Step>

<Step number={5} title="Enable AI-Powered Translation Automation" isOptional={true}>

Gdy Intlayer jest już skonfigurowany, użyj jego CLI do automatycznego uzupełniania brakujących tłumaczeń:

```bash packageManager="npm"
# Test dla brakujących tłumaczeń (dodaj do CI)
npx intlayer test

# Uzupełnij brakujące tłumaczenia za pomocą AI
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
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
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

> Zobacz [dokumentację CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md) dla wszystkich dostępnych opcji.

</Step>

</Steps>

---

## Co możesz usunąć po migracji

Gdy adapter kompatybilności jest już na miejscu, poniższy boilerplate można usunąć:

| File / pattern                            | Why it's no longer needed                                                                                                              |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `i18n` configurations in `nuxt.config.ts` | Intlayer obsługuje routing, ładowanie słowników i domyślne lokalizacje wewnętrznie.                                                    |
| `@nuxtjs/i18n` from `package.json`        | Całkowicie zastąpione przez `nuxt-intlayer`.                                                                                           |
| JSON language bundles (`locales/*.json`)  | Pakiety JSON są potrzebne tylko jeśli nadal używasz pluginu `syncJSON`. Po migracji do plików `.content.ts` możesz usunąć folder JSON. |

Gdy będziesz gotowy do pójścia dalej, Intlayer **automatycznie odkrywa wszystkie pliki `.content.ts` i `.content.json` w dowolnym miejscu w Twoim codebase** (domyślnie w dowolnym miejscu wewnątrz `./src`). Możesz umieścić plik `my-component.content.ts` obok pliku `MyComponent.vue`, a Intlayer zarejestruje go w czasie budowania bez dodatkowej konfiguracji — bez importów, bez rejestracji, bez scentralizowanego pliku indeksu. To sprawia, że współlokalizacja tłumaczeń ze stronami i komponentami jest całkowicie bezproblemowa.

---

## Konfiguruj TypeScript

Intlayer używa module augmentation, aby zapewnić pełny TypeScript intellisense dla twoich kluczy tłumaczeń. Upewnij się, że twój `tsconfig.json` zawiera auto-generowane typy:

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

## Szybka migracja

Następujące kroki są minimalne wymagane aby uruchomić istniejącą aplikację Nuxt na Intlayer bez zmian kodu w komponentach.

<Steps>

<Step number={1} title="Zainstaluj zależności">
## Idź dalej

- **Visual Editor** — Zarządzaj tłumaczeniami wizualnie w przeglądarce: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- **CMS** — Eksternalizuj i zarządzaj zawartością zdalnie: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- **VS Code Extension** — Uzyskaj autouzupełnianie i detekcję błędów tłumaczenia w czasie rzeczywistym: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)
- **CLI Reference** — Pełna lista poleceń CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- **Intlayer with Nuxt** — Pełny przewodnik konfiguracji dla Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nuxt.md)
- **Intlayer with Vue** — Pełny przewodnik konfiguracji dla Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+vue.md)
