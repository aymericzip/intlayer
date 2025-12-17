---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer i next-i18next
description: Integracja Intlayer z next-i18next dla kompleksowego rozwiązania internacjonalizacji Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internacjonalizacja
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Dodanie wtyczki loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Zmiana na wtyczkę syncJSON i kompleksowy przepisanie
---

# Internacjonalizacja (i18n) w Next.js z next-i18next i Intlayer

<iframe title="Jak zautomatyzować tłumaczenia JSON next-i18next za pomocą Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Spis treści

<TOC/>

## Czym jest next-i18next?

**next-i18next** jest jednym z najpopularniejszych frameworków do internacjonalizacji (i18n) dla aplikacji Next.js. Zbudowany na bazie potężnego ekosystemu **i18next**, oferuje kompleksowe rozwiązanie do zarządzania tłumaczeniami, lokalizacją oraz przełączaniem języków w projektach Next.js.

Jednak next-i18next wiąże się z pewnymi wyzwaniami:

- **Złożona konfiguracja**: Konfiguracja next-i18next wymaga wielu plików konfiguracyjnych oraz starannego ustawienia instancji i18n po stronie serwera i klienta.
- **Rozproszone tłumaczenia**: Pliki tłumaczeń są zazwyczaj przechowywane w oddzielnych katalogach od komponentów, co utrudnia utrzymanie spójności.
- **Ręczne zarządzanie przestrzeniami nazw**: Programiści muszą ręcznie zarządzać przestrzeniami nazw i zapewniać poprawne ładowanie zasobów tłumaczeniowych.
- **Ograniczone bezpieczeństwo typów**: Wsparcie dla TypeScript wymaga dodatkowej konfiguracji i nie zapewnia automatycznego generowania typów dla tłumaczeń.

## Czym jest Intlayer?

**Intlayer** to innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji, zaprojektowana w celu rozwiązania niedoskonałości tradycyjnych rozwiązań i18n. Oferuje nowoczesne podejście do zarządzania treścią w aplikacjach Next.js.

Zobacz konkretne porównanie z next-intl w naszym wpisie na blogu [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md).

## Dlaczego łączyć Intlayer z next-i18next?

Chociaż Intlayer oferuje doskonałe, samodzielne rozwiązanie i18n (zobacz nasz [przewodnik integracji z Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)), możesz chcieć połączyć je z next-i18next z kilku powodów:

1. **Istniejąca baza kodu**: Masz już wdrożoną implementację next-i18next i chcesz stopniowo przechodzić na ulepszone doświadczenie deweloperskie Intlayer.
2. **Wymagania dotyczące kompatybilności wstecznej**: Twój projekt wymaga zgodności z istniejącymi wtyczkami lub procesami i18next.
3. **Znajomość zespołu**: Twój zespół jest zaznajomiony z next-i18next, ale chce lepszego zarządzania treścią.

**W tym celu Intlayer może być zaimplementowany jako adapter dla next-i18next, aby pomóc w automatyzacji tłumaczeń JSON w CLI lub pipeline'ach CI/CD, testowaniu tłumaczeń i nie tylko.**

Ten przewodnik pokazuje, jak wykorzystać zaawansowany system deklaracji treści Intlayer, zachowując jednocześnie kompatybilność z next-i18next.

---

## Przewodnik krok po kroku: konfiguracja Intlayer z next-i18next

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety, używając preferowanego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Wyjaśnienie pakietów:**

- **intlayer**: Podstawowa biblioteka do deklaracji i zarządzania treścią
- **@intlayer/sync-json-plugin**: Wtyczka do synchronizacji deklaracji treści Intlayer z formatem JSON i18next

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
typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: 'i18next',
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Wtyczka `syncJSON` automatycznie opakuje JSON. Będzie odczytywać i zapisywać pliki JSON bez zmiany architektury zawartości.

Jeśli chcesz, aby JSON współistniał z plikami deklaracji treści intlayer (`.content`), Intlayer postąpi w następujący sposób:

    1. załaduje zarówno pliki JSON, jak i pliki deklaracji treści, a następnie przekształci je w słownik intlayer.
    2. jeśli wystąpią konflikty między plikami JSON a plikami deklaracji treści, Intlayer połączy wszystkie słowniki. W zależności od priorytetu wtyczek oraz pliku deklaracji treści (wszystko jest konfigurowalne).

Jeśli zmiany zostaną wprowadzone za pomocą CLI do tłumaczenia JSON lub przy użyciu CMS, Intlayer zaktualizuje plik JSON o nowe tłumaczenia.

Aby zobaczyć więcej szczegółów na temat wtyczki `syncJSON`, prosimy zapoznać się z [dokumentacją wtyczki syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md).

---

### (Opcjonalny) Krok 3: Implementacja tłumaczeń JSON na poziomie komponentu

Domyślnie Intlayer załaduje, połączy i zsynchronizuje zarówno pliki JSON, jak i pliki deklaracji zawartości. Zobacz [dokumentację deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md) po więcej szczegółów. Jednak jeśli wolisz, używając wtyczki Intlayer, możesz również zaimplementować zarządzanie tłumaczeniami JSON na poziomie poszczególnych komponentów, zlokalizowanych w dowolnym miejscu w Twojej bazie kodu.

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
     * Załaduje wszystkie pliki JSON w katalogu src, które pasują do wzorca {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Zapewnia, że te pliki JSON mają pierwszeństwo przed plikami w `./public/locales/en/${key}.json`
    }),
    /**
     * Załaduje i zapisze wynik oraz tłumaczenia z powrotem do plików JSON w katalogu locales
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

To spowoduje załadowanie wszystkich plików JSON w katalogu `src`, które pasują do wzorca `{key}.i18n.json` i załaduje je jako słowniki Intlayer.

---

## Konfiguracja Git

Wyklucz generowane pliki z kontroli wersji:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

Te pliki są automatycznie generowane podczas procesu budowania i nie muszą być zatwierdzane do Twojego repozytorium.

### Rozszerzenie VS Code

Dla lepszego doświadczenia deweloperskiego zainstaluj oficjalne rozszerzenie **Intlayer VS Code Extension**:

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
