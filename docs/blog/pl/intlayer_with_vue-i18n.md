---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer i vue-i18n
description: Integracja Intlayer z vue-i18n dla kompleksowego rozwiązania internacjonalizacji Vue.js
keywords:
  - vue-i18n
  - Intlayer
  - Internacjonalizacja
  - Blog
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Dodanie wtyczki loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Zmiana na wtyczkę syncJSON oraz kompleksowa przebudowa
---

# Internacjonalizacja (i18n) Vue.js z vue-i18n i Intlayer

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji, zaprojektowana w celu rozwiązania niedoskonałości tradycyjnych rozwiązań i18n. Oferuje nowoczesne podejście do zarządzania treścią w aplikacjach Vue.js i Nuxt.

Zobacz konkretne porównanie z vue-i18n w naszym wpisie na blogu [vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/vue-i18n_vs_intlayer.md).

## Dlaczego łączyć Intlayer z vue-i18n?

Chociaż Intlayer zapewnia doskonałe, samodzielne rozwiązanie i18n (zobacz nasz [przewodnik integracji z Vue.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+vue.md)), możesz chcieć połączyć je z vue-i18n z kilku powodów:

1. **Istniejąca baza kodu**: Masz już wdrożoną implementację vue-i18n i chcesz stopniowo przejść na ulepszone doświadczenie deweloperskie oferowane przez Intlayer.
2. **Wymagania dotyczące kompatybilności wstecznej**: Twój projekt wymaga zgodności z istniejącymi wtyczkami lub procesami vue-i18n.
3. **Znajomość zespołu**: Twój zespół dobrze zna vue-i18n, ale chce lepszego zarządzania treścią.
4. **Korzystanie z funkcji Intlayer**: Chcesz korzystać z funkcji Intlayer, takich jak deklaracja treści, automatyzacja tłumaczeń, testowanie tłumaczeń i inne.

**W tym celu Intlayer może być zaimplementowany jako adapter dla vue-i18n, aby pomóc w automatyzacji tłumaczeń JSON w CLI lub pipeline'ach CI/CD, testowaniu tłumaczeń i innych zadaniach.**

Ten przewodnik pokazuje, jak wykorzystać zaawansowany system deklaracji treści Intlayer, jednocześnie zachowując kompatybilność z vue-i18n.

---

## Przewodnik krok po kroku: Konfiguracja Intlayer z vue-i18n

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

- **intlayer**: Główna biblioteka do deklaracji i zarządzania treścią
- **@intlayer/sync-json-plugin**: Wtyczka do synchronizacji deklaracji treści Intlayer z formatem JSON vue-i18n

### Krok 2: Implementacja wtyczki Intlayer do opakowania JSON

Utwórz plik konfiguracyjny Intlayer, aby zdefiniować obsługiwane lokalizacje:

**Jeśli chcesz również eksportować słowniki JSON dla vue-i18n**, dodaj wtyczkę `syncJSON`:

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
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Wtyczka `syncJSON` automatycznie opakuje JSON. Będzie odczytywać i zapisywać pliki JSON bez zmiany architektury zawartości.

Jeśli chcesz, aby JSON współistniał z plikami deklaracji treści Intlayer (`.content`), Intlayer postąpi w następujący sposób:

    1. załaduje zarówno pliki JSON, jak i pliki deklaracji treści, a następnie przekształci je w słownik Intlayer.
    2. jeśli wystąpią konflikty między JSON a plikami deklaracji treści, Intlayer dokona scalania wszystkich słowników. W zależności od priorytetu wtyczek oraz pliku deklaracji treści (wszystko jest konfigurowalne).

Jeśli zmiany zostaną dokonane za pomocą CLI do tłumaczenia JSON lub za pomocą CMS, Intlayer zaktualizuje plik JSON o nowe tłumaczenia.

Aby zobaczyć więcej szczegółów dotyczących wtyczki `syncJSON`, proszę zapoznać się z [dokumentacją wtyczki syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md).

---

### (Opcjonalny) Krok 3: Implementacja tłumaczeń JSON per-komponent

Domyślnie Intlayer załaduje, scali i zsynchronizuje zarówno pliki JSON, jak i pliki deklaracji treści. Zobacz [dokumentację deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md) po więcej szczegółów. Jednak jeśli wolisz, używając wtyczki Intlayer, możesz również zaimplementować zarządzanie JSON per-komponent, zlokalizowanym w dowolnym miejscu w Twoim kodzie.

W tym celu możesz użyć wtyczki `loadJSON`.

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
      priority: 1, // Zapewnia, że te pliki JSON mają pierwszeństwo przed plikami w `./locales/en/${key}.json`
    }),
    /**
     * Załaduje oraz zapisze wynik i tłumaczenia z powrotem do plików JSON w katalogu locales
     */
    syncJSON({
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
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
intl
```

Te pliki są automatycznie generowane podczas procesu budowania i nie muszą być zatwierdzane do Twojego repozytorium.

### Rozszerzenie VS Code

Dla lepszego doświadczenia programistycznego zainstaluj oficjalne **rozszerzenie Intlayer dla VS Code**:

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Zainstaluj z rynku VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
