---
createdAt: 2024-12-24
updatedAt: 2025-11-01
title: Jak zautomatyzować tłumaczenia JSON i18next za pomocą Intlayer
description: Automatyzuj swoje tłumaczenia JSON za pomocą Intlayer i i18next, aby poprawić internacjonalizację w aplikacjach JavaScript.
keywords:
  - Intlayer
  - i18next
  - Internacjonalizacja
  - i18n
  - Lokalizacja
  - Tłumaczenie
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Migracja
  - Integracja
slugs:
  - blog
  - intlayer-with-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Dodano wtyczkę loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Zmiana na wtyczkę syncJSON
---

# Jak zautomatyzować tłumaczenia JSON i18next za pomocą Intlayer

<iframe title="Jak zautomatyzować tłumaczenia JSON i18next za pomocą Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji, zaprojektowana, aby rozwiązać niedoskonałości tradycyjnych rozwiązań i18n. Oferuje nowoczesne podejście do zarządzania treścią w aplikacjach JavaScript.

Zobacz konkretne porównanie z i18next w naszym wpisie na blogu [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md).

## Dlaczego łączyć Intlayer z i18next?

Chociaż Intlayer zapewnia doskonałe, samodzielne rozwiązanie i18n (zobacz nasz [przewodnik integracji z Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)), możesz chcieć połączyć je z i18next z kilku powodów:

1. **Istniejąca baza kodu**: Masz już wdrożoną implementację i18next i chcesz stopniowo przejść na ulepszone doświadczenie deweloperskie Intlayer.
2. **Wymagania dotyczące kompatybilności wstecznej**: Twój projekt wymaga zgodności z istniejącymi wtyczkami lub procesami i18next.
3. **Znajomość zespołu**: Twój zespół dobrze zna i18next, ale chce lepszego zarządzania treścią.
4. **Korzystanie z funkcji Intlayer**: Chcesz używać funkcji Intlayer, takich jak deklaracja treści, zarządzanie kluczami tłumaczeń, status tłumaczeń i inne.

**W tym celu Intlayer może być zaimplementowany jako adapter dla i18next, aby pomóc w automatyzacji tłumaczeń JSON w CLI lub pipeline’ach CI/CD, testowaniu tłumaczeń i nie tylko.**

Ten przewodnik pokazuje, jak wykorzystać zaawansowany system deklaracji treści Intlayer, zachowując jednocześnie kompatybilność z i18next.

## Spis treści

<TOC/>

## Przewodnik krok po kroku: Konfiguracja Intlayer z i18next

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**Opis pakietów:**

- **intlayer**: Podstawowa biblioteka do zarządzania internacjonalizacją, deklaracji treści i budowania
- **@intlayer/sync-json-plugin**: Wtyczka do eksportowania deklaracji treści Intlayer do formatu JSON kompatybilnego z i18next

### Krok 2: Implementacja wtyczki Intlayer do opakowania JSON

Utwórz plik konfiguracyjny Intlayer, aby zdefiniować obsługiwane lokalizacje:

**Jeśli chcesz również eksportować słowniki JSON dla i18next**, dodaj wtyczkę `syncJSON`:

```typescript fileName="intlayer.config.ts"
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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Wtyczka `syncJSON` automatycznie opakuje JSON. Będzie odczytywać i zapisywać pliki JSON bez zmiany architektury zawartości.

Jeśli chcesz, aby JSON współistniał z plikami deklaracji treści Intlayer (`.content`), Intlayer postąpi w następujący sposób:

    1. załaduje zarówno pliki JSON, jak i pliki deklaracji treści, a następnie przekształci je w słownik Intlayer.
    2. jeśli wystąpią konflikty między plikami JSON a plikami deklaracji treści, Intlayer połączy wszystkie słowniki. W zależności od priorytetu wtyczek oraz pliku deklaracji treści (wszystko jest konfigurowalne).

Jeśli zmiany zostaną wprowadzone za pomocą CLI do tłumaczenia JSON lub za pomocą CMS, Intlayer zaktualizuje plik JSON o nowe tłumaczenia.

Aby zobaczyć więcej szczegółów dotyczących wtyczki `syncJSON`, proszę zapoznać się z [dokumentacją wtyczki syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md).

### (Opcjonalny) Krok 3: Implementacja tłumaczeń JSON na poziomie komponentów

Domyślnie Intlayer załaduje, połączy i zsynchronizuje zarówno pliki JSON, jak i pliki deklaracji treści. Zobacz [dokumentację deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md) po więcej szczegółów. Jednak jeśli wolisz, używając wtyczki Intlayer, możesz również zaimplementować zarządzanie tłumaczeniami JSON na poziomie poszczególnych komponentów, zlokalizowanych w dowolnym miejscu w Twojej bazie kodu.

Do tego możesz użyć wtyczki `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Synchronizuj swoje obecne pliki JSON ze słownikami Intlayer
  plugins: [
    /**
     * Załaduje wszystkie pliki JSON w katalogu src, które pasują do wzoru {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Zapewnia, że te pliki JSON mają wyższy priorytet niż pliki w `./locales/en/${key}.json`
    }),
    /**
     * Załaduje oraz zapisze wynik i tłumaczenia z powrotem do plików JSON w katalogu locales
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

To spowoduje załadowanie wszystkich plików JSON w katalogu `src`, które pasują do wzoru `{key}.i18n.json` i załaduje je jako słowniki Intlayer.

---

## Konfiguracja Git

Zaleca się ignorowanie automatycznie generowanych plików Intlayer:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

Te pliki mogą być ponownie wygenerowane podczas procesu budowania i nie muszą być zatwierdzane do kontroli wersji.

### Rozszerzenie VS Code

Dla lepszego doświadczenia programistycznego zainstaluj oficjalne **rozszerzenie Intlayer dla VS Code**:

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
