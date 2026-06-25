---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migracja z next-i18next do Intlayer | Internacjonalizacja (i18n)"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Next.js z next-i18next do Intlayer krok po kroku, bez łamania istniejącego kodu. Użyj adaptera compat @intlayer/next-i18next do przejścia bez przerw."
keywords:
  - next-i18next
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
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migracja z next-i18next do Intlayer

## Dlaczego migrować z next-i18next do Intlayer?

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

Ponieważ `next-i18next` opakuje `react-i18next` i `i18next` za kulisami, istnieją dwie komplementarne strategie migracji do Intlayer:

1. **Adapter compat (rekomendowany dla istniejących aplikacji)** — Zainstaluj `@intlayer/next-i18next`, `@intlayer/react-i18next` i `@intlayer/i18next`. Te pakiety ujawniają **dokładnie ten sam API** co ich odpowiedniki, ale delegują całą pracę tłumaczenia do Intlayer za kulisami. Zachowujesz istniejące `useTranslation`, `appWithTranslation`, `serverSideTranslations` i routing Next.js Pages — jedyną zmianą jest inicjalizacja.

2. **Pełna migracja** — Stopniowo zastępuj API `next-i18next` natywnymi hakami Intlayer (`useIntlayer`) i umieszczaj zawartość w plikach `.content.ts` obok komponentów.

Ten przewodnik obejmuje **Strategię 1** najpierw (adapter compat drop-in), a następnie przechodzi przez opcjonalną pełną migrację.

---

## Spis treści

<TOC/>

---

## Szybka migracja

Poniższe kroki są minimalne wymagane, aby uruchomić istniejącą aplikację Next.js Pages Router w Intlayer bez zmian kodu w stronach i komponentach.

<Steps>

<Step number={1} title="Zainstaluj zależności">

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

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

> Ta komenda wykryje twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Możesz bezpiecznie pozostawić `next-i18next`, `react-i18next` i `i18next` zainstalowane podczas migracji, chociaż usuniesz je po zastosowaniu aliasów.

</Step>

<Step number={2} title="Skonfiguruj Intlayer">

Komenda `intlayer init` tworzy starter `intlayer.config.ts`. Zaktualizuj go, aby pasował do twoich istniejących lokalizacji i skieruj plugin `syncJSON` do twoich plików wiadomości `next-i18next` (zwykle wewnątrz `public/locales`):

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
      // pasuje do składni placeholder i18next: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** mapuje lokalizację i namespace (`key`) do ścieżki pliku JSON. **`location`** mówi obserwatorowi Intlayer, który folder monitorować pod kątem zmian. Opcja `format: 'i18next'` zapewnia, że placeholdery są poprawnie parsowane dla `next-i18next`.

</Step>

<Step number={3} title="Zaktualizuj konfigurację Next.js">

Opatrz istniejący `next.config.ts` (lub `.js`) funkcją `createNextI18nPlugin` z `@intlayer/next-i18next/plugin`. Ten wrapper komponuje `withIntlayer` **i** wstrzykuje aliasy `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`, dzięki czemu istniejące wywołania `import { useTranslation } from 'next-i18next'` są transparentnie przekierowane podczas budowania. Nie są wymagane żadne zmiany w plikach źródłowych.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// Możesz usunąć konfigurację i18n importowaną z next-i18next.config.js
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer zarządza routingiem i18n Next.js pod maską,
  // więc nie musisz już tutaj przekazywać obiektu i18n.
};

export default withIntlayer(nextConfig);
```

> **Nie potrzebujesz już `next-i18next.config.js`.** Intlayer kompiluje wszystkie słowniki w **czasie budowania**, obsługując detektowanie lokalizacji, routing i ładowanie słowników bezproblemowo.
>
> Wolisz zwykły `withIntlayer` z `next-intlayer/server`? Kompiluje twoje słowniki, ale **nie** dodaje aliasów `next-i18next` / `react-i18next` / `i18next` — musisz wówczas ręcznie zmienić importy na `@intlayer/*` (patrz krok 4).

</Step>

</Steps>

To wszystko dla szybkiej migracji. Twoja aplikacja Next.js teraz działa na Intlayer, zachowując każde wywołanie `useTranslation`, `serverSideTranslations` i `appWithTranslation`.

> **Klucze tłumaczeń typizowane — automatycznie.** Gdy Intlayer skompiluje twoje słowniki, `useTranslation` i `getFixedT` są typizowane względem twojej rzeczywistej zawartości. Klucze są autouzupełniane w twoim IDE, a nieprawidłowe ścieżki powodują błędy TypeScript w czasie budowania — nie jest wymagana żadna dodatkowa konfiguracja.
>
> ```tsx
> // Pages Router — 'about' to zarejestrowany klucz słownika
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autouzupełniane
> t("does.not.exist"); // ✗ błąd TypeScript
>
> // getStaticProps / getServerSideProps (instancja i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ typizowane
> ```

---

## Pełna migracja

Poniższe kroki są opcjonalne i można je wykonywać przyrostowo. Odblokowują one pełny zestaw funkcji Intlayer: edytor wizualny, CMS, typed content files, tłumaczenie zasilane sztuczną inteligencją i wiele więcej.

<Steps>

<Step number={4} title="Explicit import renaming (opcjonalnie)" isOptional={true}>

Plugin Intlayer już obsługuje aliasing na poziomie bundlera. Jeśli wolisz uczynić zależność jawną w swoich plikach źródłowych, możesz ręcznie zmienić nazwy importów:

| Przed                                                                          | Po                                                                |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

Są to **drop-in replacements** — nie są wymagane żadne zmiany w sygnaturach funkcji, argumentach ani zwracanych typach.

</Step>

<Step number={5} title="Enable AI-Powered Translation Automation" isOptional={true}>

Po podłączeniu Intlayer, użyj jego CLI, aby automatycznie uzupełnić brakujące tłumaczenia:

```bash packageManager="npm"
# Testuj brakujące tłumaczenia (dodaj do CI)
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
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
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

> Więcej informacji: [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md) zawiera wszystkie dostępne opcje.

</Step>

</Steps>

---

## Co możesz usunąć po migracji

Po wdrożeniu adaptera kompatybilności, poniższy boilerplate `next-i18next` można usunąć:

| Plik / pattern                         | Dlaczego już nie jest potrzebny                                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`               | Intlayer obsługuje routing, ładowanie słowników i ustawienia domyślnych lokalizacji wewnętrznie na podstawie `intlayer.config.ts`.     |
| `next-i18next` z `package.json`        | W całości zastąpione przez `@intlayer/next-i18next` i aliasing.                                                                        |
| Pakiety JSON (`public/locales/*.json`) | Pakiety JSON są potrzebne tylko jeśli nadal używasz wtyczki `syncJSON`. Po migracji do plików `.content.ts` możesz usunąć folder JSON. |

Gdy będziesz gotowy, aby pójść dalej, Intlayer **automatycznie odkrywa wszystkie pliki `.content.ts` i `.content.json` gdziekolwiek w twoim codebase** (domyślnie, gdziekolwiek wewnątrz `./src`). Możesz umieścić plik `my-component.content.ts` tuż obok `MyComponent.tsx` a Intlayer go włączy podczas budowania bez żadnej dodatkowej konfiguracji — bez importów, rejestracji, bez scentralizowanego pliku indeksu. To sprawia, że umieszczanie tłumaczeń razem ze stronami i komponentami jest całkowicie bezproblemowe.

---

## Konfigurowanie TypeScript

Intlayer uses module augmentation to provide full TypeScript intellisense for your translation keys. Make sure your `tsconfig.json` includes the auto-generated types:

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Dołącz auto-generowane typy
  ],
}
```

---

## Szybka migracja

Następujące kroki są minimalne wymagane aby uruchomić istniejącą aplikację Next.js Pages Router na Intlayer bez zmian kodu w stronach i komponentach.

<Steps>

<Step number={1} title="Zainstaluj zależności">
## Idź dalej

- **Visual Editor** — Zarządzaj tłumaczeniami wizualnie w przeglądarce: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- **CMS** — Externalizuj i zarządzaj treścią zdalnie: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- **VS Code Extension** — Uzyskaj autouzupełnianie i wykrywanie błędów tłumaczenia w czasie rzeczywistym: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)
- **CLI Reference** — Pełna lista poleceń CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- **Intlayer with Next.js (Pages Router)** — Kompletny przewodnik konfiguracji dla Next.js: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_page_router.md)
