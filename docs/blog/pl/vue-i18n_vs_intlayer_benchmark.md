---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: Benchmark 2026"
description: vue-i18n i Intlayer zmierzone na tej samej aplikacji Vite + Vue 3. Rozmiar biblioteki, JavaScript na stronę, wyciek treści, rozmiar komponentów i reaktywność przełączania locale, z objaśnieniem liczb.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Benchmark internacjonalizacji (i18n) dla Vue

`vue-i18n` to referencyjna biblioteka i18n dla Vue. Intlayer to alternatywa oparta na kompilatorze, z treścią ograniczoną do komponentu, z integracją z Vue (`vue-intlayer`). Porównaliśmy już ich [funkcje i doświadczenie programisty](https://intlayer.org/blog/vue-i18n-vs-intlayer). Ten artykuł przygląda się temu, ile każda z nich kosztuje po zbudowaniu aplikacji.

Dane pochodzą z [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), open-source'owego zestawu, który buduje tę samą aplikację z każdą biblioteką i rejestruje, co przeglądarka faktycznie pobiera i wykonuje.

<TOC/>

> **tl;dr**: Na tej samej aplikacji Vite + Vue 3 `vue-i18n` dostarcza **134,9 KB** gzipowanego JavaScriptu na stronę wobec **41,3 KB** dla aplikacji bez i18n. Intlayer dostarcza **57,1 KB**. Sam runtime `vue-i18n` waży **24,3 KB gzip** (6x więcej niż 3,9 KB Intlayera), każda strona niesie **90% ciągów z innych stron**, a komponent skompilowany w izolacji wciąga **196 KB**, ponieważ jest związany z globalnym drzewem komunikatów. Adapter `@intlayer/vue-i18n` zachowuje API `vue-i18n` i zmierzył **47,0 KB** na stronę.

## W skrócie

- **vue-i18n** - Faktyczny standard i18n dla Vue 2 / Vue 3 i rdzeń `@nuxtjs/i18n`. Komunikaty w stylu ICU, bloki `<i18n>` w SFC, dyrektywa `v-t`, formatery `d()` / `n()`, duży ekosystem. Komunikaty są rejestrowane na globalnej instancji w `createI18n()`; leniwe ładowanie per locale to ręczny wzorzec `setLocaleMessage()`, a podział per trasa jest do zbudowania samodzielnie.
- **Intlayer** - Model treści skoncentrowany na komponentach. Słowniki `.content.ts` leżą obok komponentu, któremu służą, kompilator w czasie budowania (`vite-intlayer`) wykonuje tree-shaking i leniwe ładowanie per komponent i per locale, ścisłe typy TypeScript są generowane z treści, a brakujące tłumaczenia powodują błąd w czasie budowania. Zawiera helpery routera / SEO, Visual Editor / CMS oraz tłumaczenie wspomagane AI.

| Biblioteka            | Gwiazdki GitHub                                                                                                                                                                | Łączna liczba commitów                                                                                                                                                             | Ostatni commit                                                                                                                                      | Pierwsza wersja | Wersja NPM                                                                                                  | Pobrania NPM                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Kwiecień 2024   | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Grudzień 2016   | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Odznaki aktualizują się automatycznie. Zrzuty będą się zmieniać w czasie.

## Porównanie funkcji obok siebie

| Funkcja                                               | `vue-intlayer` (Intlayer)                                      | `vue-i18n`                                                                              |
| ----------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Tłumaczenia blisko komponentów**                    | ✅ Tak, `.content.ts` obok każdego komponentu                  | ✅ Przez bloki SFC `<i18n>` (opcjonalne); globalne katalogi to typowa konfiguracja      |
| **Integracja z TypeScript**                           | ✅ Ścisłe typy generowane automatycznie z treści               | ✅ Dobre typowania; ścisłe bezpieczeństwo kluczy wymaga typowania schematu i dyscypliny |
| **Wykrywanie brakujących tłumaczeń**                  | ✅ Błąd TypeScript + błąd/ostrzeżenie w czasie budowania       | ⚠️ Fallback w runtime + ostrzeżenie w konsoli                                           |
| **Bogata treść (komponenty / Markdown)**              | ✅ Bezpośrednie wsparcie                                       | ⚠️ Interpolacja komponentów `<i18n-t>`; Markdown przez zewnętrzne wtyczki               |
| **Wsparcie ICU**                                      | ⚠️ W trakcie prac                                              | ✅ Tak                                                                                  |
| **Formatowanie (daty, liczby, waluty)**               | ✅ Formatery oparte na Intl                                    | ✅ `d()` / `n()` z `datetimeFormats` / `numberFormats`                                  |
| **Zlokalizowany routing**                             | ✅ Helpery dla Vue Router / Nuxt, `getMultilingualUrls`        | ⚠️ Nie w rdzeniu (`@nuxtjs/i18n` lub własna konfiguracja routera)                       |
| **Helpery SEO (hreflang, sitemap, robots)**           | ✅ Wbudowane helpery                                           | ❌ Nie w rdzeniu                                                                        |
| **Tree-shaking (dostarczanie tylko używanej treści)** | ✅ Per komponent, per locale, zautomatyzowane przez kompilator | ⚠️ Ręcznie: podział katalogów, `setLocaleMessage()` per trasa                           |
| **Leniwe ładowanie**                                  | ✅ `importMode: 'dynamic'` (jedna linia konfiguracji)          | ✅ Ręczny `import()` + `setLocaleMessage()`                                             |
| **Usuwanie nieużywanej treści**                       | ✅ Martwe słowniki są odrzucane w czasie budowania             | ❌ Nie wbudowane                                                                        |
| **Testowanie brakujących tłumaczeń (CLI / CI)**       | ✅ `npx intlayer content test`                                 | ⚠️ Zewnętrzne (`vue-i18n-extract`)                                                      |
| **Tłumaczenie wspomagane AI**                         | ✅ Wbudowane, używa własnych kluczy dostawcy                   | ❌ Nie                                                                                  |
| **Visual Editor / CMS**                               | ✅ Darmowy Visual Editor + opcjonalny CMS                      | ❌ Nie (zewnętrzne platformy lokalizacyjne)                                             |
| **Serwer MCP i Agent Skills**                         | ✅ Tak                                                         | ❌ Nie                                                                                  |
| **Ekosystem / społeczność**                           | ⚠️ Mniejszy, ale szybko rosnący                                | ✅ Duży i dojrzały w ekosystemie Vue                                                    |

## Benchmark

### Co zmierzono

Zestaw [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) buduje **tę samą aplikację Vite + Vue 3** z każdą biblioteką: **10 stron** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identyczne komponenty i identyczna treść. Strony są mierzone w `en` i `fr`.

Obie biblioteki testowano w konfiguracji **static**, tej, którą dostarcza większość projektów Vue: dla `vue-i18n` JSON każdego locale importowany i przekazany do `createI18n({ messages })`; dla Intlayera domyślny `importMode: 'static'`. W tym trybie Intlayer również pakuje wszystkie locale, ale kompilator nadal ogranicza treść **per komponent**, więc strona niesie tylko słowniki komponentów, które renderuje.

Dla każdego builda zestaw rejestruje:

- **Lib size**: rozmiar gzip pustego komponentu, który tylko importuje bibliotekę i18n. Stały koszt runtime'u.
- **Page JS**: gzipowany JavaScript pobierany na stronę, uśredniony po wszystkich stronach i locale.
- **Locale leak %**: udział przetłumaczonych ciągów znalezionych w pobranym JS, które należą do locale, którego użytkownik **nie** przegląda (fingerprint na `en` i `fr`, więc 50% oznacza „drugie mierzone locale jest w pełni obecne"; przy 10 spakowanych locale rzeczywista strata jest większa).
- **Page leak %**: udział przetłumaczonych ciągów znalezionych w pobranym JS, które należą do strony, na której użytkownik **nie** jest.
- **Component avg**: średni rozmiar gzip każdego komponentu skompilowanego w izolacji. Pokazuje, ile runtime'u i18n i katalogu wciąga pojedynczy komponent.
- **E2E reactivity**: rzeczywisty czas między wybraniem nowego locale a aktualizacją `html[lang]` w DOM (Playwright, 5 iteracji).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Poniższe liczby pochodzą z uruchomienia z dnia **2026-09-12** z `vue-i18n` 11.4.0 i `intlayer` 9.5.0 / 9.5.1. Aplikacja testowa jest celowo mała (kilkadziesiąt ciągów na locale), więc procenty wycieku opisują **wzorzec**: rosną wraz z treścią, podczas gdy koszt runtime'u pozostaje stały.

### Wyniki na Vite + Vue 3

| Biblioteka                    | Strategia | Lib size (gz) | Lib size (min) | Page JS śr. (gz) | Locale leak | Page leak | Component śr. (gz) | Reaktywność E2E | Page load |
| ----------------------------- | --------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | --------------: | --------: |
| **base** (bez i18n)           | -         |        0,0 KB |         0,0 KB |          41,3 KB |        0,0% |         - |             1,1 KB |          1,8 ms |   10,8 ms |
| `vue-i18n`                    | static    |       24,3 KB |        83,2 KB |         134,9 KB |       50,0% |     90,0% |           196,0 KB |          2,8 ms |   13,6 ms |
| **`vue-intlayer`**            | static    |    **3,9 KB** |    **11,1 KB** |      **57,1 KB** |       56,8% |  **0,0%** |         **7,7 KB** |      **4,5 ms** |   13,8 ms |
| `@intlayer/vue-i18n` (compat) | static    |        7,9 KB |        23,2 KB |          47,0 KB |       15,0% |      0,0% |             8,4 KB |          1,5 ms |    9,3 ms |

> Kolumna page-leak aplikacji bazowej jest pusta: bez biblioteki i18n fingerprinting wyłapuje zakodowane na sztywno ciągi w współdzielonych chunkach i liczba nie ma znaczenia.

**Jak to czytać**

- **Koszt runtime'u.** `vue-i18n` to jeden z najcięższych runtime'ów w całym benchmarku: **24,3 KB gzip / 83,2 KB po minifikacji** dla pustego komponentu, który tylko go importuje. `vue-intlayer` kosztuje 3,9 KB gzip. Tę różnicę płaci się na każdej stronie niezależnie od tego, ile masz ciągów.
- **JavaScript na stronę.** Aplikacja bez i18n waży 41,3 KB. `vue-i18n` ponad trzykrotnie ją zwiększa do **134,9 KB**; Intlayer ląduje na **57,1 KB**, +15,8 KB, z czego większość to dziesięć spakowanych locale (zobacz następny punkt).
- **Wyciek.** Z `createI18n({ messages: { en, fr, ... } })` każda strona dostarcza wszystkie locale i ciągi wszystkich stron: **50% wycieku locale** (na dwóch fingerprintowanych locale) i **90% wycieku stron**. Tryb `static` Intlayera również pakuje wszystkie locale (stąd porównywalna wartość wycieku locale), ale ma **0% wycieku stron**: strona pobiera tylko słowniki komponentów, które renderuje. Przełączenie na `importMode: 'dynamic'` usuwa również wyciek locale; ta konfiguracja nie była częścią tego uruchomienia Vue.
- **Rozmiar komponentu to miejsce, gdzie widać architekturę.** Komponent wywołujący `useI18n()` kompiluje się średnio do **196 KB**, ponieważ `t()` jest związane z globalną instancją, która przechowuje każdy komunikat każdego locale. Ten sam komponent z `useIntlayer()` kompiluje się do **7,7 KB**: sięga tylko po własny słownik.
- **Reaktywność** nie jest problemem dla żadnej z nich (2-5 ms). System reaktywności Vue sprawia, że przełączanie locale jest tanie, gdy komunikaty są już w pamięci.
- **`@intlayer/vue-i18n`**, adapter drop-in, zachowuje API `vue-i18n` i zmierzył **47,0 KB na stronę** oraz **8,4 KB na komponent**, bez zmian w kodzie aplikacji.

> Dla porównania, to samo uruchomienie zmierzyło `fluent-vue` na 171,8 KB na stronę, 29,7 KB runtime'u i 217 KB na komponent.

## Skąd ta różnica? Globalna instancja vs skompilowane słowniki

`vue-i18n` to runtime. `createI18n()` buduje globalną instancję przechowującą drzewo komunikatów per locale; `useI18n()` wiąże z nią każdy komponent; `t("footer.github")` wyszukuje klucz w czasie renderowania. To właśnie umożliwia bloki SFC `<i18n>`, `v-t` i ładowanie komunikatów w runtime, i to również dlatego graf zależności każdego komponentu zawiera całe drzewo:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # jeden plik per locale, wszystkie strony w środku
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Optymalizacja oznacza, że **ty** dzielisz `en.json` na pliki per trasa, **ty** wywołujesz `setLocaleMessage()` w strażniku routera i **ty** utrzymujesz poprawne mapowanie trasa-plik, gdy komponenty się przemieszczają. Runtime nie może tego zrobić za ciebie, ponieważ nie ma pojęcia, o jakie klucze komponent poprosi.

Intlayer przenosi tę wiedzę do builda. Treść jest deklarowana obok komponentu, a `vite-intlayer` ustala, który komponent importuje który słownik:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

Kompilator emituje, per słownik i per locale, dokładnie ten JSON, którego potrzebuje dany komponent, i odrzuca słowniki, których nic nie importuje. Ograniczenie per trasa jest konsekwencją ograniczenia per komponent, a nie zadaniem.

> Aby odrzucić również nieużywane locale, ustaw `dictionary.importMode: 'dynamic'` w `intlayer.config.ts`. Zobacz [dokumentację optymalizacji bundle'a](https://intlayer.org/doc/concept/bundle-optimization).

## Doświadczenie programisty

### Konfiguracja

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Komponent

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` jest stringiem, dopóki sam nie otypujesz schematu komunikatów; literówka renderuje klucz.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` i `increment` są otypowane; literówka to błąd TypeScript, brakująca wartość francuska to błąd builda.

### Leniwe ładowanie per locale

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Następnie wywołaj `loadLocaleMessages()` ze strażnika routera i samodzielnie podziel `locales/{locale}.json` per trasa, jeśli chcesz ograniczenia per strona.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Zachowaj API vue-i18n, uzyskaj wynik Intlayera

`@intlayer/vue-i18n` to adapter drop-in: `useI18n()`, `t()`, `d()`, `n()`, interpolacja `{name}` i `{0}`, liczba mnoga z pipe (`"car | cars"`), `v-t` i `i18n.global.locale` nadal działają, serwowane ze słowników Intlayera skompilowanych przez `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

W benchmarku build compat tej samej aplikacji zszedł ze **134,9 KB do 47,0 KB** na stronę i ze **196 KB do 8,4 KB** na komponent, bez zmian w komponentach. Twoje istniejące `locales/{locale}.json` mogą pozostać źródłem prawdy dzięki wtyczce synchronizacji JSON.

Zobacz [przewodnik migracji z vue-i18n](https://intlayer.org/doc/migration/vue-i18n) i [dokumentację kompatybilności](https://intlayer.org/doc/compatibility/vue-i18n). Użytkownicy Nuxt mają tę samą ścieżkę przez [kompatybilność `@nuxtjs/i18n`](https://intlayer.org/doc/compatibility/nuxtjs-i18n).

## Kiedy wybrać które?

- **Wybierz vue-i18n**, jeśli chcesz standardowego podejścia Vue, polegasz na komunikatach ICU lub blokach SFC `<i18n>`, używasz już `@nuxtjs/i18n` lub platforma tłumaczeniowa oczekuje scentralizowanego JSON-a. Zarezerwuj czas na podział katalogów i leniwe ładowanie per trasa, jeśli rozmiar bundle'a ma znaczenie.
- **Wybierz Intlayer**, jeśli chcesz **treści ograniczonej do komponentu**, **ścisłego TypeScriptu**, **błędów brakujących kluczy w czasie budowania**, **bezwysiłkowego tree-shakingu i leniwego ładowania** oraz wbudowanych narzędzi redakcyjnych (Visual Editor, CMS, tłumaczenie AI, serwer MCP). Szczególnie istotne dla dużych, modularnych baz kodu Vue / Nuxt i design systemów.
- **Wybierz `@intlayer/vue-i18n`**, jeśli jesteś już na `vue-i18n` i chcesz zysków w rozmiarze bundle'a bez przepisywania.

## Powiązane porównania

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer) (ten sam benchmark)
- [i18next vs Intlayer](https://intlayer.org/blog/i18next-vs-intlayer) (ten sam benchmark)
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer) (ten sam benchmark)
- [vue-i18n vs Intlayer (funkcje i DX)](https://intlayer.org/blog/vue-i18n-vs-intlayer)
- [Czy vue-i18n jest przestarzały?](https://intlayer.org/blog/is-vue-i18n-outdated)

## Gwiazdki GitHub

Gwiazdki GitHub są silnym wskaźnikiem popularności projektu, zaufania społeczności i długoterminowej istotności. Choć nie są bezpośrednią miarą jakości technicznej, odzwierciedlają, ilu programistów uważa projekt za użyteczny, śledzi jego postępy i prawdopodobnie go zaadoptuje.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Podsumowanie

`vue-i18n` jest dojrzały, elastyczny i głęboko zintegrowany z Vue. Benchmark pokazuje, ile kosztuje jego projekt runtime-first w buildzie Vite: **runtime 24 KB gzip**, **134,9 KB na stronę** dla aplikacji, która bez i18n waży 41 KB, **90% treści z innych stron** na każdej stronie oraz komponenty, z których każdy sięga **196 KB**, ponieważ wiszą na globalnym drzewie komunikatów.

Intlayer przenosi pracę do kompilatora. Słowniki per komponent i usuwanie martwej treści to wyniki builda, a nie konwencje. Na tej samej aplikacji: **runtime 3,9 KB**, **57,1 KB na stronę**, **0% wycieku stron**, komponenty **25x mniejsze**. A jeśli przepisanie nie wchodzi w grę, `@intlayer/vue-i18n` pokonuje większość tej drogi bez zmian w komponentach.

Wszystkie surowe dane, aplikacje testowe i skrypty są w [repozytorium Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Uruchom je sam.

Więcej szczegółów znajdziesz w [dokumencie „Dlaczego Intlayer?"](https://intlayer.org/doc/why).
