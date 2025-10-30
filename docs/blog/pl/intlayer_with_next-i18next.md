---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer i next-i18next
description: Integracja Intlayer z next-i18next dla kompleksowego rozwiązania internacjonalizacji w Next.js
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
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Zmiana na wtyczkę syncJSON i kompleksowy przepis
---

# Internacjonalizacja (i18n) w Next.js z next-i18next i Intlayer

## Spis treści

<TOC/>

## Czym jest next-i18next?

**next-i18next** jest jednym z najpopularniejszych frameworków do internacjonalizacji (i18n) dla aplikacji Next.js. Zbudowany na bazie potężnego ekosystemu **i18next**, zapewnia kompleksowe rozwiązanie do zarządzania tłumaczeniami, lokalizacją oraz przełączaniem języków w projektach Next.js.

Jednak next-i18next wiąże się z pewnymi wyzwaniami:

- **Złożona konfiguracja**: Konfiguracja next-i18next wymaga wielu plików konfiguracyjnych oraz starannego ustawienia instancji i18n po stronie serwera i klienta.
- **Rozproszone tłumaczenia**: Pliki tłumaczeń zazwyczaj przechowywane są w oddzielnych katalogach od komponentów, co utrudnia utrzymanie spójności.
- **Ręczne zarządzanie przestrzeniami nazw**: Programiści muszą ręcznie zarządzać przestrzeniami nazw i zapewnić prawidłowe ładowanie zasobów tłumaczeń.
- **Ograniczone bezpieczeństwo typów**: Wsparcie dla TypeScript wymaga dodatkowej konfiguracji i nie zapewnia automatycznego generowania typów dla tłumaczeń.

## Czym jest Intlayer?

**Intlayer** to innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji, zaprojektowana w celu rozwiązania niedoskonałości tradycyjnych rozwiązań i18n. Oferuje nowoczesne podejście do zarządzania treścią w aplikacjach Next.js.

Zobacz konkretne porównanie z next-intl w naszym wpisie na blogu [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md).

## Dlaczego łączyć Intlayer z next-i18next?

Chociaż Intlayer zapewnia doskonałe, samodzielne rozwiązanie i18n (zobacz nasz [przewodnik integracji z Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)), możesz chcieć połączyć go z next-i18next z kilku powodów:

1. **Istniejąca baza kodu**: Masz już wdrożoną implementację next-i18next i chcesz stopniowo przechodzić na ulepszone doświadczenie deweloperskie Intlayer.
2. **Wymagania dotyczące kompatybilności wstecznej**: Twój projekt wymaga zgodności z istniejącymi wtyczkami lub procesami i18next.
3. **Znajomość zespołu**: Twój zespół jest zaznajomiony z next-i18next, ale chce lepszego zarządzania treścią.

**W tym celu Intlayer może być zaimplementowany jako adapter dla next-i18next, aby pomóc w automatyzacji tłumaczeń JSON w CLI lub pipeline'ach CI/CD, testowaniu tłumaczeń i nie tylko.**

Ten przewodnik pokazuje, jak wykorzystać zaawansowany system deklaracji treści Intlayer, zachowując jednocześnie kompatybilność z next-i18next.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer z next-i18next

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

**Wyjaśnienie pakietów:**

- **intlayer**: Podstawowa biblioteka do deklaracji i zarządzania treścią
- **next-intlayer**: Warstwa integracyjna Next.js z wtyczkami build
- **i18next**: Podstawowy framework i18n
- **next-i18next**: Nakładka Next.js dla i18next
- **i18next-resources-to-backend**: Dynamiczne ładowanie zasobów dla i18next
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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Wtyczka `syncJSON` automatycznie opakuje JSON. Będzie odczytywać i zapisywać pliki JSON bez zmiany architektury zawartości.

Jeśli chcesz, aby JSON współistniał z plikami deklaracji zawartości intlayer (`.content`), Intlayer postąpi w następujący sposób:

    1. załaduje zarówno pliki JSON, jak i pliki deklaracji zawartości, a następnie przekształci je w słownik intlayer.
    2. jeśli wystąpią konflikty między plikami JSON a plikami deklaracji zawartości, Intlayer przeprowadzi scalanie wszystkich słowników. W zależności od priorytetu wtyczek oraz pliku deklaracji zawartości (wszystko jest konfigurowalne).

Jeśli zmiany zostaną wprowadzone za pomocą CLI do tłumaczenia JSON lub za pomocą CMS, Intlayer zaktualizuje plik JSON nowymi tłumaczeniami.

Aby zobaczyć więcej szczegółów na temat wtyczki `syncJSON`, prosimy zapoznać się z [dokumentacją wtyczki syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md).

---

## Konfiguracja Git

Wyklucz generowane pliki z kontroli wersji:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
intl
```

Te pliki są automatycznie generowane podczas procesu budowania i nie muszą być zatwierdzane do Twojego repozytorium.

### Rozszerzenie VS Code

Dla lepszego doświadczenia deweloperskiego zainstaluj oficjalne **Rozszerzenie Intlayer dla VS Code**:

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
