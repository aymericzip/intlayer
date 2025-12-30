---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Jak zautomatyzować tłumaczenia JSON react-intl za pomocą Intlayer
description: Automatyzuj tłumaczenia JSON za pomocą Intlayer i react-intl dla lepszej internacjonalizacji w aplikacjach React.
keywords:
  - react-intl
  - Intlayer
  - Internacjonalizacja
  - Blog
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Dodano wtyczkę loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Zmiana na wtyczkę syncJSON
---

# Jak zautomatyzować tłumaczenia JSON react-intl za pomocą Intlayer

<iframe title="Jak zautomatyzować tłumaczenia JSON react-intl za pomocą Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji, zaprojektowana w celu rozwiązania niedoskonałości tradycyjnych rozwiązań i18n. Oferuje nowoczesne podejście do zarządzania treścią w aplikacjach React.

Zobacz konkretne porównanie z react-intl w naszym wpisie na blogu [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/react-i18next_vs_react-intl_vs_intlayer.md).

## Dlaczego łączyć Intlayer z react-intl?

Chociaż Intlayer zapewnia doskonałe, samodzielne rozwiązanie i18n (zobacz nasz [przewodnik integracji z React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)), możesz chcieć połączyć je z react-intl z kilku powodów:

1. **Istniejąca baza kodu**: Masz już wdrożoną implementację react-intl i chcesz stopniowo przejść na ulepszone doświadczenie deweloperskie Intlayer.
2. **Wymagania dotyczące kompatybilności wstecznej**: Twój projekt wymaga zgodności z istniejącymi wtyczkami lub procesami react-intl.
3. **Znajomość zespołu**: Twój zespół dobrze zna react-intl, ale chce lepszego zarządzania treścią.
4. **Korzystanie z funkcji Intlayer**: Chcesz korzystać z funkcji Intlayer, takich jak deklaracja treści, automatyzacja tłumaczeń, testowanie tłumaczeń i inne.

**W tym celu Intlayer może być zaimplementowany jako adapter dla react-intl, aby pomóc w automatyzacji tłumaczeń JSON w CLI lub pipeline’ach CI/CD, testowaniu tłumaczeń i innych zadaniach.**

Ten przewodnik pokazuje, jak wykorzystać zaawansowany system deklaracji treści Intlayer, jednocześnie zachowując kompatybilność z react-intl.

## Przewodnik krok po kroku: Konfiguracja Intlayer z react-intl

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
- **@intlayer/sync-json-plugin**: Wtyczka do eksportowania deklaracji treści Intlayer do formatu JSON kompatybilnego z react-intl

### Krok 2: Implementacja wtyczki Intlayer do opakowania JSON

Utwórz plik konfiguracyjny Intlayer, aby zdefiniować obsługiwane lokalizacje:

**Jeśli chcesz również eksportować słowniki JSON dla react-intl**, dodaj wtyczkę `syncJSON`:

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
      format: "icu",
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Wtyczka `syncJSON` automatycznie opakuje JSON. Będzie odczytywać i zapisywać pliki JSON bez zmiany architektury zawartości.

Jeśli chcesz, aby JSON współistniał z plikami deklaracji zawartości Intlayer (`.content`), Intlayer postąpi w następujący sposób:

    1. załaduje zarówno pliki JSON, jak i pliki deklaracji zawartości, a następnie przekształci je w słownik Intlayer.
    2. jeśli wystąpią konflikty między plikami JSON a plikami deklaracji zawartości, Intlayer przeprowadzi scalanie wszystkich słowników. W zależności od priorytetu wtyczek oraz plików deklaracji zawartości (wszystko jest konfigurowalne).

Jeśli zmiany zostaną dokonane za pomocą CLI do tłumaczenia JSON lub przy użyciu CMS, Intlayer zaktualizuje plik JSON o nowe tłumaczenia.

Aby zobaczyć więcej szczegółów na temat wtyczki `syncJSON`, prosimy o zapoznanie się z [dokumentacją wtyczki syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md).

### (Opcjonalny) Krok 3: Implementacja tłumaczeń JSON per-komponent

Domyślnie Intlayer załaduje, scali i zsynchronizuje zarówno pliki JSON, jak i pliki deklaracji zawartości. Zobacz [dokumentację deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md) po więcej szczegółów. Jednak jeśli wolisz, używając wtyczki Intlayer, możesz również zaimplementować zarządzanie JSON per-komponent, zlokalizowanym w dowolnym miejscu w Twojej bazie kodu.

Do tego możesz użyć wtyczki `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Synchronizuj swoje aktualne pliki JSON ze słownikami Intlayer
  plugins: [
    /**
     * Załaduje wszystkie pliki JSON w katalogu src, które pasują do wzorca {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Zapewnia, że te pliki JSON mają pierwszeństwo przed plikami w `./locales/en/${key}.json`
    }),
    /**
     * Załaduje i zapisze wynik oraz tłumaczenia z powrotem do plików JSON w katalogu locales
     */
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

To spowoduje załadowanie wszystkich plików JSON w katalogu `src`, które pasują do wzorca `{key}.i18n.json` i załaduje je jako słowniki Intlayer.

## Konfiguracja Git

Zaleca się ignorowanie automatycznie generowanych plików Intlayer:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

Te pliki mogą być ponownie wygenerowane podczas procesu budowania i nie muszą być zatwierdzane do kontroli wersji.

### Rozszerzenie VS Code

Dla lepszego doświadczenia deweloperskiego zainstaluj oficjalne **rozszerzenie Intlayer dla VS Code**:

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
