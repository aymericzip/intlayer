---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Jak zautomatyzować tłumaczenia JSON next-intl za pomocą Intlayer
description: Automatyzuj tłumaczenia JSON za pomocą Intlayer i next-intl dla lepszej internacjonalizacji w aplikacjach Next.js.
slugs:
  - blog
  - intlayer-with-next-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Zmiana na wtyczkę syncJSON
---

# Jak zautomatyzować tłumaczenia JSON next-intl za pomocą Intlayer

## Czym jest Intlayer?

**Intlayer** to innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji, zaprojektowana, aby rozwiązać niedoskonałości tradycyjnych rozwiązań i18n. Oferuje nowoczesne podejście do zarządzania treścią w aplikacjach Next.js.

Zobacz konkretne porównanie z next-intl w naszym wpisie na blogu [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md).

## Dlaczego łączyć Intlayer z next-intl?

Chociaż Intlayer oferuje doskonałe, samodzielne rozwiązanie i18n (zobacz nasz [przewodnik integracji z Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)), możesz chcieć połączyć je z next-intl z kilku powodów:

1. **Istniejąca baza kodu**: Masz już wdrożoną implementację next-intl i chcesz stopniowo przejść na ulepszone doświadczenie deweloperskie Intlayer.
2. **Wymagania dotyczące kompatybilności wstecznej**: Twój projekt wymaga zgodności z istniejącymi wtyczkami lub procesami next-intl.
3. **Znajomość zespołu**: Twój zespół dobrze zna next-intl, ale chce lepszego zarządzania treścią.

**W tym celu Intlayer może być zaimplementowany jako adapter dla next-intl, aby pomóc w automatyzacji tłumaczeń JSON w CLI lub pipeline'ach CI/CD, testowaniu tłumaczeń i nie tylko.**

Ten przewodnik pokazuje, jak wykorzystać zaawansowany system deklaracji treści Intlayer, zachowując jednocześnie kompatybilność z next-intl.

## Spis treści

<TOC/>

## Przewodnik krok po kroku, jak skonfigurować Intlayer z next-intl

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**Opis pakietów:**

- **intlayer**: Podstawowa biblioteka do zarządzania internacjonalizacją, deklaracji treści i budowania
- **@intlayer/sync-json-plugin**: Wtyczka do eksportowania deklaracji treści Intlayer do formatu JSON kompatybilnego z next-intl

### Krok 2: Implementacja wtyczki Intlayer do opakowania JSON

Utwórz plik konfiguracyjny Intlayer, aby zdefiniować obsługiwane lokalizacje:

**Jeśli chcesz również eksportować słowniki JSON dla next-intl**, dodaj wtyczkę `syncJSON`:

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Wtyczka `syncJSON` automatycznie opakuje JSON. Będzie odczytywać i zapisywać pliki JSON bez zmiany architektury zawartości.

Jeśli chcesz, aby JSON współistniał z plikami deklaracji zawartości intlayer (`.content`), Intlayer postąpi w następujący sposób:

    1. załaduje zarówno pliki JSON, jak i pliki deklaracji zawartości, a następnie przekształci je w słownik intlayer.
    2. jeśli wystąpią konflikty między plikami JSON a plikami deklaracji zawartości, Intlayer przeprowadzi scalanie wszystkich tych słowników. W zależności od priorytetu wtyczek oraz pliku deklaracji zawartości (wszystko jest konfigurowalne).

Jeśli zmiany zostaną wprowadzone za pomocą CLI do tłumaczenia JSON lub przy użyciu CMS, Intlayer zaktualizuje plik JSON o nowe tłumaczenia.

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
