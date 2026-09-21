---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs @intlayer/vue-i18n: Ten sam API, Inny Bundle"
description: Co się zmienia, gdy aplikacja Vue 3 zachowuje swoje wywołania vue-i18n, ale obsługuje je za pośrednictwem adaptera kompatybilności @intlayer/vue-i18n. JavaScript na stronę, rozmiar runtime, rozmiar komponentu i wyciek zmierzony na tym samym kodzie Vite + Vue, plus to, co adapter zachowuje, ignoruje i nie może zastąpić.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | Ten sam API, Inny Bundle

`@intlayer/vue-i18n` to adapter kompatybilności: ujawnia API `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) i serwuje go ze słowników skompilowanych przez Intlayer. Twoje pliki `.vue` się nie zmieniają. Zmienia się to, do czego `t("footer.github")` jest związane.

Artykuł ten mierzy tę wymianę na tej samej aplikacji Vite + Vue 3, zbudowanej raz z `vue-i18n` i raz z adapterem. Liczby pochodzą z [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Aby porównać `vue-i18n` i Intlayer jako biblioteki, przeczytaj [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) i [porównanie wydajności vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark). Ten artykuł dotyczy tego, co adapter zmienia, gdy zachowujesz swoje komponenty takie, jakie są.

<TOC/>

> **tl;dr**: Na tej samej aplikacji Vite + Vue 3, zastąpienie `vue-i18n` przez `@intlayer/vue-i18n` zmniejszyło JavaScript na stronę z **134.9 KB na 47.0 KB** gzip (aplikacja bez i18n waży 41.3 KB), runtime z **24.3 KB na 7.9 KB**, średni komponent z **196 KB na 8.4 KB**, i wyciek stringów z obcych stron z **90% na 0%**, bez edycji któregokolwiek pliku `.vue`. `createI18n({ messages })` pozostaje funkcjonalne jako fallback; usuń importy JSON, aby uzyskać wymienione wyżej liczby. Bloki SFC `<i18n>` i runtime `setLocaleMessage()` to dwie funkcje, które się nie przenoszą.

## Co to jest `@intlayer/vue-i18n`

`vue-i18n` to runtime. `createI18n({ messages: { en, fr, ... } })` buduje globalną instancję zawierającą każdą wiadomość każdej lokalizacji; `useI18n()` wiąże każdy komponent z nią; `t("footer.github")` przechodzi po drzewie w czasie renderowania. Ten projekt sprawia, że bloki SFC `<i18n>` i `setLocaleMessage()` są możliwe, i jest to również powód, dla którego graf zależności każdego komponentu obejmuje całe drzewo.

`@intlayer/vue-i18n` zachowuje API i zastępuje drzewo:

1. **Import aliasing.** `vueI18nVitePlugin()` z `@intlayer/vue-i18n/plugin` opakowuje `vite-intlayer` i dodaje `resolve.alias`, aby `vue-i18n` rozwiązywał się do `@intlayer/vue-i18n`. Żaden import nie jest zmieniam.
2. **JSON jako źródło prawdy.** Plugin `syncJSON` odczytuje istniejący plik `locales/{locale}.json` z `format: "vue-i18n"` (dzięki czemu `{name}`, `{0}` interpolacja listy i `"car | cars"` plurale z pipe są prawidłowo parsowane) i zapisuje tłumaczenia z powrotem, gdy CLI lub CMS je aktualizuje.
3. **Call-site binding.** Passe optymalizacji Intlayer przepisuje miejsca wywołania `useI18n()` tak, aby komponent otrzymywał słowniki dla swoich kluczy w aktywnym ustawieniu regionalnym, jako imporyt, które bundler może śledzić i dzielić.

```vue fileName="src/components/Footer.vue"
<!-- Twój kod, bez zmian -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="Co emituje kompilator (uproszczone)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

// Komponent nie ma już dostępu do globalnego drzewa wiadomości. Dotyka tylko `footer`.
const { t } = useI18n(_dicHash_footer);
```

Komponent nie ma już dostępu do globalnego drzewa wiadomości. Dotyka tylko `footer`. Dlatego kolumna rozmiaru komponentu poniżej spada z 196 KB do 8 KB.

## Co adapter zachowuje, ignoruje i nie zastępuje

| API `vue-i18n`                                                      | Z `@intlayer/vue-i18n`                                                                                               |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Zachowane. Klucze `t` są typowane względem Twoich słowników                                                       |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Zachowane. `{name}`, `{0}` i plurale rozdzielone znakiem pipe rozpoznawane jak poprzednio                         |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Zachowane. `datetimeFormats` / `numberFormats` z `createI18n()` są honorowane, wspierane przez natywny `Intl`     |
| `i18n.global.locale.value = "fr"`                                   | ✅ Zachowane. Pisana `WritableComputedRef` wspierana przez klienta Intlayer; reaktywność zachowuje się jak wcześniej |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Zachowane. Zarejestrowane na `app.config.globalProperties` przez `app.use(i18n)`                                  |
| `v-t` directive                                                     | ✅ Zachowane                                                                                                         |
| `legacy: true`                                                      | ✅ Akceptowane                                                                                                       |
| `createI18n({ messages })`                                          | ⚠️ `messages` są używane jako **fallback w runtime** z ostrzeżeniem dev. Usuń importy JSON dla zmniejszenia bundla   |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Ostrzeżenie i nic się nie dzieje. Ładowanie wiadomości w runtime jest zastępowane słownikami w czasie budowania   |
| SFC `<i18n>` custom blocks                                          | ❌ Nie są czytane. Przenieś te wiadomości do lokalizacyjnego JSON-a (lub `.content.ts` obok komponentu)              |
| `@nuxtjs/i18n`                                                      | ⚠️ Osobny adapter, zobacz [dokumentację kompatybilności Nuxt](https://intlayer.org/doc/compatibility/nuxtjs-i18n)    |

## Benchmark

### Co zostało zmierzone

Zestawienie [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) buduje **tę samą aplikację Vite + Vue 3** z każdą konfiguracją: **10 stron** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 lokalizacji** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identyczne komponenty i identyczną treść. Strony są mierzone w `en` i `fr`.

Oba zostały zbudowane w konfiguracji **static**, takiej jaką wysyła większość projektów Vue: dla `vue-i18n`, każdy JSON lokalizacji importowany i przekazywany do `createI18n({ messages })`; dla adaptera, te same komponenty z zmienionymi `vite.config.ts` i `intlayer.config.ts` oraz usuniętym importem `messages`. Native `vue-intlayer` jest zawarty jako punkt odniesienia.

Dla każdego buildu, zestaw rejestruje:

- **Lib size**: rozmiar gzip (i zminifikowany) pustego komponentu, który tylko importuje bibliotekę i18n.
- **Page JS**: gzip JavaScript pobrany na stronę, uśredniony dla wszystkich stron i locales.
- **Locale leak %**: udział przetłumaczonych stringów w pobranym JS, które należą do locale'u, którego użytkownik **nie** przegląda.
- **Page leak %**: udział przetłumaczonych stringów w pobranym JS, które należą do strony, na której użytkownik **nie** jest.
- **Component avg**: średni rozmiar gzip każdego komponentu skompilowanego w izolacji.
- **E2E reactivity**: czas ścienno-zegarowy między wybraniem nowego locale a aktualizacją `html[lang]` w DOM (Playwright, 5 iteracji).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Liczby poniżej pochodzą z uruchomienia z dnia **2026-09-12** przy użyciu `vue-i18n` 11.4.0 i `@intlayer/vue-i18n` 9.5.1. Aplikacja testowa jest celowo mała (kilkadziesiąt stringów na locale), więc procenty wycieków opisują **wzorzec**: rosną wraz z Twoją zawartością, podczas gdy koszt runtime pozostaje stały.

### Wyniki na Vite + Vue 3

| Setup                    | Strategy | Rozmiar lib (gz) | Rozmiar lib (min) | Średni JS strony (gz) | Wyciek locale | Wyciek strony | Średnia lib komponentu (gz) | Reaktywność E2E | Ładowanie strony |
| ------------------------ | -------- | ---------------: | ----------------: | --------------------: | ------------: | ------------: | --------------------------: | --------------: | ---------------: |
| **base** (brak i18n)     | -        |           0.0 KB |            0.0 KB |               41.3 KB |          0.0% |             - |                      1.1 KB |          1.8 ms |          10.8 ms |
| `vue-i18n`               | static   |          24.3 KB |           83.2 KB |              134.9 KB |         50.0% |         90.0% |                    196.0 KB |          2.8 ms |          13.6 ms |
| **`@intlayer/vue-i18n`** | static   |       **7.9 KB** |       **23.2 KB** |           **47.0 KB** |     **15.0%** |      **0.0%** |                  **8.4 KB** |      **1.5 ms** |       **9.3 ms** |
| `vue-intlayer` (native)  | static   |           3.9 KB |           11.1 KB |               57.1 KB |         56.8% |          0.0% |                      7.7 KB |          4.5 ms |          13.8 ms |
| `vue-intlayer` (native)  | dynamic  |           3.9 KB |           11.1 KB |               59.8 KB |         50.0% |          0.0% |                      6.5 KB |          4.0 ms |          15.8 ms |

> Kolumna page-leak aplikacji bazowej jest pusta: bez biblioteki i18n fingerprinting wybiera zakodowane na stałe ciągi w udostępnianych fragmentach i liczba nie jest znacząca.

**Jak to czytać**

- **88 KB mniej na stronę, te same komponenty.** `vue-i18n` bierze aplikację 41.3 KB do **134.9 KB**. Build adaptera z tymi samymi komponentami ląduje na **47.0 KB**, 5.7 KB powyżej aplikacji bazowej. Większość różnicy to 74.9 KB `src/locales`, które `createI18n({ messages })` ściąga na każdą stronę, a adapter nigdy nie bundluje jako blok.
- **Runtime zmniejsza się 3x.** Pusty komponent, który importuje tylko `vue-i18n`, kosztuje **24.3 KB gzip / 83.2 KB minified**: `@intlify/core-base`, compiler wiadomości i runtime. Adapter kosztuje **7.9 KB / 23.2 KB**, większość z tego to core Intlayera plus powierzchnia API `vue-i18n`.
- **Komponenty: 23x mniejsze.** Komponent `useI18n()` skompilowany w izolacji średnio ważyć **196 KB**, ponieważ `t` jest powiązany z instancją, która przechowuje każdą wiadomość każdej lokalizacji. Z adapterem ten sam komponent ważyć średnio **8.4 KB**: osiąga własny słownik.
- **Wyciek danych.** `vue-i18n` wysyła każdą locale i stringi każdej strony na każdej stronie: 50% wyciek locale (na dwóch identyfikowanych locale; z dziesięcioma bundlowanymi locale rzeczywiste marnotrawstwo jest wyższe), 90% wyciek strony. Adapter zmniejsza wyciek strony do **0%**, ponieważ każdy komponent importuje tylko swoje słowniki. Wyciek locale wynosi 15% w tym przebiegu `static`; `importMode: 'dynamic'` to ustawienie, które go usuwa, a ta konfiguracja nie była częścią tego przebiegu Vue.
- **Reaktywność i ładowanie strony.** Przełączanie locale jest tanie dla obu (1,5-2,8 ms); system reaktywności Vue sprawia, że tak jest, gdy wiadomości są w pamięci. Ładowanie strony zmienia się z 13,6 ms na **9,3 ms**, zgodnie z 88 KB mniej JavaScriptu do analizy.
- **O natywnych wierszach.** `vue-intlayer` w tym uruchomieniu zawierał każdą lokalizację w trybie `static` i osiągnął 57,1 KB z runtimem 3,9 KB; zsynchronizowane słowniki adaptera zawierały mniej ciągów obcych lokalizacji, stąd niższa liczba na stronę. Natywny runtime pozostaje najlżejszy z trzech, a jego model `.content.ts` to miejsce, gdzie bloki SFC `<i18n>` znajdują swój odpowiednik.

## Dlaczego liczby się zmieniają

Nic w `src/components/` się nie zmieniło, więc zyski pochodzą z tego, do czego wiąże się `useI18n`.

**Za pomocą `vue-i18n`**, binding to instancja globalna. `createI18n({ messages: { en, fr, ... } })` to jeden import, który zawiera wszystko; każdy komponent, który wywołuje `useI18n()`, może uzyskać dostęp do całości, dlatego bundler nie może podzielić się poniżej instancji. Optymalizacja oznacza, że _ty_ dzielisz `en.json` po trasach, wywołujesz `setLocaleMessage()` w routerze guard, i utrzymujesz mapę trasy do pliku w miarę przenoszenia się komponentów.

```bash
.
├── locales
│   ├── en.json                    # ciągi znaków każdej strony
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**Z `@intlayer/vue-i18n`**, binding to słownik. `syncJSON` zamienia każdy klucz najwyższego poziomu w `en.json` na słownik; przebieg optymalizacji przekazuje komponentowi te, których klucze nosi, jako importy, które bundler śledzi i dzieli na stronę.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                     # generated: one dictionary per top-level key, per locale
└── src
    ├── i18n.ts                    # createI18n({})   ← messages import removed
    ├── main.ts                    # app.use(i18n)    ← unchanged
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← unchanged
```

Import `messages` w `i18n.ts` to jest jedyna linia do usunięcia. To daje 88 KB.

## Migracja w trzech krokach

<Steps>
<Step number={1} title="Instalacja">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Polecenie wykrywa `vue-i18n`, instaluje `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` i `@intlayer/sync-json-plugin`, oraz wstępnie wypełnia `intlayer.config.ts`. Zachowaj `vue-i18n` zainstalowany: jest to peer dependency i dostarcza typy.

</Step>
<Step number={2} title="Wskaż Intlayer na pliki lokalizacyjne">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" łączy każdą locale; "dynamic" ładuje aktywną na żądanie
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // dialekt vue-i18n: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` pozostaje w swoim miejscu. Każdy klucz na najwyższym poziomie (`footer`, `hero`...) staje się słownikiem.

</Step>
<Step number={3} title="Dodaj plugin i usuń import wiadomości">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Przed: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` opakowuje `vite-intlayer` (obserwacja zawartości, kompilacja słownika, przebieg optymalizacji) i aliasuje `vue-i18n` do adaptera. Usunięcie importu `messages` to to, co zmniejsza 88 KB; pozostawienie go sprawia, że aplikacja działa, ale wysyła oba.

</Step>
</Steps>

### Co można usunąć później

| Plik / wzorzec                                 | Powód                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| `import en from "./locales/en.json"` i podobne | Używane tylko jako fallback przez adapter. To jest miejsce, gdzie były 88 KB         |
| `setLocaleMessage()` w guardach routera        | No-op. Ładowanie per-route to teraz zadanie kompilatora                              |
| `@intlify/unplugin-vue-i18n`                   | Niepotrzebne: prekompiluje wiadomości i bloki SFC, których adapter nie czyta         |
| Bloki SFC `<i18n>`                             | Nie są odczytywane; przenieś je do JSON-a locale'a lub do `.content.ts` na komponent |

### Co zyskujesz poza zmniejszeniem rozmiaru

- **Wpisane klucze.** `t("footer.github")` jest wpisany względem skompilowanego słownika `footer`; błędna ścieżka to błąd TypeScript zamiast klucza renderowanego jako tekst.
- **`npx intlayer test`** powoduje niepowodzenie CI na brakującym kluczu w dowolnym locale'u. **`npx intlayer fill`** tłumaczy brakujące za pomocą twojego klucza providera (OpenAI, Anthropic, Mistral, Gemini...) i zapisuje je z powrotem do `locales/{locale}.json`.
- **Edytor wizualny i CMS** działają na tym samym JSON-ie, więc osoby niebędące programistami edytują przez interfejs użytkownika, a pliki są aktualizowane.
- **Stopniowe przejście do `.content.ts`.** Każdy komponent może przejść z `useI18n()` na `useIntlayer("footer")` ze współlokalizowanym plikiem content. Słowniki JSON i `.content.ts` współistnieją i się łączą.

## Limity, które warto znać przed rozpoczęciem

- **Bloki `<i18n>` SFC nie są czytane.** Jeśli Twoje wiadomości znajdują się wewnątrz komponentów, muszą przejść do plików locale (lub do `.content.ts`, co jest tym samym pomysłem z typami).
- **Dynamiczne ładowanie wiadomości nie istnieje.** `setLocaleMessage()` i `mergeLocaleMessage()` ostrzegają i zwracają. Tłumaczenia pobrane z CMS w czasie rzeczywistym wymagają CMS-u Intlayer lub poleceń `intlayer pull` / `push`.
- **`messages` to fallback, nie darmowy.** Utrzymywanie importów JSON w `createI18n()` utrzymuje 75 KB w bundle. Usuń je, gdy `intlayer test` przejdzie pomyślnie.
- **Adapter nie jest natywnym runtimem.** 7,9 KB wobec 3,9 KB dla `vue-intlayer`. Gdy każdy komponent przejdzie na `useIntlayer`, możesz go usunąć.

## Kiedy użyć którego?

- **Pozostań na `vue-i18n`** jeśli Twoja aplikacja zależy od bloków SFC `<i18n>`, od przepływów runtime `setLocaleMessage()`, lub jeśli 90 KB na stronę nie stanowi problemu dla Twojej audience.
- **Używaj `@intlayer/vue-i18n`** jeśli jesteś na `vue-i18n` i chcesz zaoszczędzić 88 KB, mieć komponenty 23x mniejsze, 0% wycieku strony, typed keys i CI checks bez edytowania pliku `.vue`. To jest punkt wejścia dla istniejącej codebase `vue-i18n`.
- **Idź natywnie (`vue-intlayer`)** dla nowych projektów, lub gdy adapter wykonał swoje zadanie. Ma najlżejszy runtime (3,9 KB) i model per-component `.content.ts`, który zastępuje bloki `<i18n>` typed content.

## Powiązane porównania

- [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) (funkcje i DX)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (biblioteki, ten sam benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/blog/next-intl-vs-intlayer-next-intl) (ta sama seria adapterów)
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (ta sama seria adapterów)
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (ta sama seria adapterów)
- [Przewodnik migracji: vue-i18n do Intlayer](https://intlayer.org/doc/migration/vue-i18n)
- [Compat adapter reference: vue-i18n](https://intlayer.org/doc/compatibility/vue-i18n), [Nuxt i18n](https://intlayer.org/doc/compatibility/nuxtjs-i18n)

## Podsumowanie

`@intlayer/vue-i18n` zmienia to, do czego `useI18n()` jest powiązane: z globalnej instancji zawierającej każdą wiadomość każdej lokalizacji na słownik skompilowany dla tego komponentu. W tej samej aplikacji Vite + Vue 3, która jest **88 KB mniejsza na stronę**, **3x mniejszy runtime**, **23x mniejsze komponenty** i **0% wycieków strony**, dla pliku konfiguracyjnego, linii pluginu i jednego usuniętego importu. Bloki SFC `<i18n>` i ładowanie wiadomości w runtime to dwie rzeczy, które nie są obsługiwane, a natywny runtime `vue-intlayer` pozostaje o połowę mniejszy.

Wszystkie surowe dane, aplikacje testowe i skrypty znajdują się w [repozytorium Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Uruchom je sam.

Więcej szczegółów znajdziesz w dokumentacji ['Why Intlayer?'](https://intlayer.org/doc/why).
