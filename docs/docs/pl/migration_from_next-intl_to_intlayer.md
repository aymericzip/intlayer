---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migracja z next-intl do Intlayer | Internacjonalizacja (i18n)"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Next.js z next-intl do Intlayer krok po kroku, bez łamania istniejącego kodu. Użyj adaptera compat @intlayer/next-intl do przejścia bez przerw."
keywords:
  - next-intl
  - intlayer
  - migracja
  - internacjonalizacja
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migracja z next-intl do Intlayer

## Dlaczego migrować z next-intl do Intlayer?

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

## Strategia migracji

Rekomendowane podejście dla istniejących aplikacji to **adapter compat**: zainstaluj `@intlayer/next-intl`, który ujawnia **dokładnie ten sam API** co `next-intl`, ale deleguje całą pracę tłumaczenia do Intlayer za kulisami.

Zachowujesz istniejące `useTranslations`, `getTranslations`, `NextIntlClientProvider` i przyjaciół — **jedyną zmianą jest ścieżka importu**. Nie jest wymagane żadne refaktorowanie sygnatur Call, kształtów prop lub struktury komponentu.

Z biegiem czasu możesz opcjonalnie migrować poszczególne pliki do bogatszego formatu `.content.ts` Intlayer aby odblokować edytor wizualny, CMS i ograniczanie zawartości per-komponent — ale ten krok jest całkowicie opcjonalny i może być wykonywany przyrostowo.

---

## Spis treści

<TOC/>

---

## Szybka migracja

Poniższe kroki stanowią minimum wymagane do uruchomienia istniejącej aplikacji `next-intl` na Intlayer bez zmian w kodzie.

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj podstawowe pakiety Intlayer i adapter kompatybilności `@intlayer/next-intl`:

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
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

> Zachowaj `next-intl` zainstalowany — jest wciąż wymagany do **routingu URL** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). Adapter kompatybilności **nie** zastępuje warstwy routingu.

</Step>

<Step number={2} title="Konfiguracja Intlayer">

Polecenie `intlayer init` tworzy starter `intlayer.config.ts`. Zaktualizuj go, aby pasował do istniejących lokalizacji i wskaż plugin `syncJSON` na Twoje pliki wiadomości:

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
      // 'icu' pasuje do składni ICU placeholder next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** mapuje lokalizację na ścieżkę pliku JSON. **`location`** mówi obserwatorowi Intlayer, który folder monitorować pod kątem zmian. Opcja `format: 'icu'` zapewnia, że ICU placeholders takie jak `{name}` i `{count, plural, one {# item} other {# items}}` są poprawnie analizowane.

> Aby zobaczyć pełną listę opcji konfiguracji, zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={3} title="Dodaj plugin Intlayer do Next.js">

Opakuj istniejącą konfigurację Next.js za pomocą `createNextIntlPlugin` z `@intlayer/next-intl/plugin`. To opakowanie komponuje `withIntlayer` **i** rejestruje aliasy `next-intl` → `@intlayer/next-intl` dla Ciebie:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {/* twoje istniejące opcje konfiguracji */};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` opakuje `withIntlayer`, automatycznie wykrywa **Webpack** lub **Turbopack**, konfiguruje obserwowanie zawartości, kompilację słowników i — co krytyczne — **wstrzykuje aliasy modułów** tak, aby istniejące wywołania `import … from 'next-intl'` były transparentnie przekierowywane do `@intlayer/next-intl` w czasie budowania. Wejście routingu `next-intl/routing` pozostaje wskazujące na rzeczywisty pakiet. Nie są wymagane żadne zmiany plików źródłowych.
>
> Wolisz zwykły `withIntlayer` z `next-intlayer/server`? Będzie kompilować Twoje słowniki, ale **nie** dodaje aliasów `next-intl` — musiałbyś wtedy ręcznie zmienić nazwy importów na `@intlayer/next-intl` (zobacz krok 4).

> **Nie potrzebujesz już `getRequestConfig` ani `loadMessages`.** Z `next-intl` musiałeś napisać plik `src/i18n.ts`, który ładował pakiety wiadomości JSON przy każdym żądaniu za pomocą `getRequestConfig`. Intlayer kompiluje wszystkie słowniki w **czasie budowania**, więc nie ma kroku ładowania w runtime. Możesz całkowicie usunąć ten plik (lub zachować tylko części routingu, jeśli nadal używasz `createNavigation`).

</Step>

</Steps>

To wszystko dla szybkiej migracji. Twoja aplikacja teraz działa na Intlayer, zachowując każdy import i API `next-intl`.

> **Typowane klucze tłumaczeń — automatycznie.** Po kompilacji słowników przez Intlayer, `useTranslations` i `getTranslations` są typowane względem Twojej rzeczywistej zawartości. Klucze są autouzupełniane w Twoim IDE, a nieznane ścieżki powodują błędy TypeScript w czasie budowania — bez dodatkowej konfiguracji.
>
> ```tsx
> // Komponent klienta — 'about' to zarejestrowany klucz słownika
> const t = useTranslations("about");
> t("counter.label"); // ✓ autouzupełnione
> t("does.not.exist"); // ✗ Błąd TypeScript
>
> // Komponent serwera
> const t = await getTranslations("about");
> t("counter.label"); // ✓ typowane
> ```

---

## Pełna migracja

Poniższe kroki są opcjonalne i można je wykonywać stopniowo. Odblokowują pełny zestaw funkcji Intlayer: edytor wizualny, CMS, typizowane pliki zawartości, automatyczne tłumaczenie oparte na AI i wiele innych.

<Steps>

<Step number={4} title="Jawne zmianę nazwy importu (opcjonalnie)" isOptional={true}>

Wrapper `createNextIntlPlugin()` już obsługuje aliasing `next-intl` → `@intlayer/next-intl` na poziomie bundlera. Jeśli wolisz uczynić zależność jawną w plikach źródłowych (i zamiast tego użyć zwykłego pluginu `withIntlayer`), możesz ręcznie zmienić nazwy importów:

| Przed                                                | Po                                                             |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Zawsze zachowuj importy routingu z rzeczywistego `next-intl` — adapter kompatybilności **nie** zastępuje warstwy routingu URL:
>
> ```ts
> // ✅ Zawsze zachowuj te z rzeczywistego 'next-intl'
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> Alternatywnie możesz użyć `defineRouting` z `@intlayer/next-intl/routing`, które automatycznie scala konfigurację lokalizacji z twojego `intlayer.config.ts`.

</Step>

<Step number={5} title="Włącz automatyzację tłumaczenia opartą na AI" isOptional={true}>

Po podłączeniu Intlayer, możesz użyć jego CLI, aby automatycznie wypełnić brakujące tłumaczenia, korzystając z wybranego przez siebie LLM:

```bash packageManager="npm"
# Test dla brakujących tłumaczeń (dodaj do CI)
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

Dodaj `OPENAI_API_KEY` (lub klucz preferowanego dostawcy) do pliku `.env`, a następnie rozszerz swój `intlayer.config.ts`:

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
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

> Zapoznaj się z [dokumentacją CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md), aby poznać wszystkie dostępne opcje.

</Step>

</Steps>

---

## Szybka migracja

Następujące kroki są minimalne wymagane aby uruchomić istniejącą aplikację `next-intl` na Intlayer bez zmian kodu.

<Steps>

<Step number={1} title="Zainstaluj zależności">

Zainstaluj pakiety rdzenia Intlayer i adapter compat `@intlayer/next-intl`:

## Konfiguracja TypeScript

Intlayer używa module augmentation aby zapewnić pełny TypeScript intellisense dla Twoich kluczy tłumaczeń. Upewnij się, że Twój `tsconfig.json` zawiera auto-generowane typy:

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

## Konfiguracja Git

Dodaj wygenerowany katalog Intlayer do swoją `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki wygenerowane przez Intlayer
.intlayer
```

---

## Idź dalej

- **Visual Editor** — Zarządzaj tłumaczeniami wizualnie w przeglądarce: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- **CMS** — Externalizuj i zarządzaj contentem zdalnie: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- **VS Code Extension** — Uzyskaj autouzupełnianie i wykrywanie błędów tłumaczeń w czasie rzeczywistym: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)
- **CLI Reference** — Pełna lista poleceń CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- **Intlayer with Next.js** — Pełny przewodnik konfiguracji dla Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)
