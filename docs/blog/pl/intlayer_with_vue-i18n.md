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
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Dodanie wtyczki loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Zmiana na wtyczkę syncJSON oraz kompleksowa przebudowa
---

# Internacjonalizacja (i18n) Vue.js z vue-i18n i Intlayer

<iframe title="Jak zautomatyzować tłumaczenia JSON vue-i18n za pomocą Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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
      format: "vue-i18n",
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

## Konfiguracja Git

Wyklucz generowane pliki z kontroli wersji:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

Te pliki są automatycznie generowane podczas procesu budowania i nie muszą być zatwierdzane do Twojego repozytorium.

### Rozszerzenie VS Code

Dla lepszego doświadczenia programistycznego zainstaluj oficjalne **rozszerzenie Intlayer dla VS Code**:

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Zainstaluj z rynku VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
