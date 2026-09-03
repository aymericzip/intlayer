---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: importy glob, chunki i wiadomości w czasie kompilacji"
description: Co w i18n jest naprawdę specyficzne dla Vite. Leniwe katalogi z import.meta.glob, dlaczego podział per-route rzadko działa, luki w HMR i wtyczki czasu kompilacji.
keywords:
  - vite i18n
  - import.meta.glob
  - vite podział kodu
  - leniwe ładowanie tłumaczeń
  - vite wtyczka i18n
  - rollup chunki
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: elementy dotyczące samego Vite, a nie Twojego frameworka

Większość samouczków "Vite i18n" to w rzeczywistości poradniki dotyczące Reacta lub Vue, które przypadkowo korzystają z Vite. Ten artykuł skupia się na warstwie poniżej: jak importowane są katalogi, co robi z nimi Rollup i dlaczego leniwe ładowanie (lazy loading), które napisałeś, w rzeczywistości najpewniej wcale nie jest leniwe.

## Spis treści

<TOC/>

## Import statyczny jest domyślny i synchroniczny (eager)

Najprostsza konfiguracja importuje każdy katalog na samej górze modułu:

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

Oznacza to obecność trzech katalogów w początkowym entry chunku, na każdej podstronie, dla każdego odwiedzającego. Przy dwóch językach i stu napisach nie jest to problemem. Przy dziesięciu językach staje się największym niepotrzebnym kosztem w całym bundle.

## `import.meta.glob` i flaga, którą niemal każdy źle ustawia

Import glob z Vite jest powszechnym rozwiązaniem tego problemu:

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

Leniwe ładowanie jest domyślne: każdy wpis to funkcja zwracająca dynamiczny import, a Rollup generuje jeden chunk na plik. Dodanie `{ eager: true }` powoduje jednak wstrzyknięcie wszystkich plików bezpośrednio do modułu importującego, czyli dokładnie to, czego chcieliśmy uniknąć:

```ts
// Wszystkie języki w początkowym chunku. Prawie nigdy to, o co chodzi:
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

Pułapka polega na tym, że obie wersje działają w trybie dev, ponieważ Vite serwuje moduły pojedynczo bez bundlowania. Różnica staje się widoczna dopiero w katalogu `dist`. Przetestuj to za pomocą `npx vite build && npx vite preview` i sprawdź, co naprawdę zawiera Twój entry chunk.

## Podział per-route rzadko dzieli katalogi w praktyce

To zachowanie często zaskakuje programistów. Dzielisz katalogi według podstron:

```
locales/en/home.json
locales/en/checkout.json
```

Następnie dwa różne adresy URL importują `checkout.json`, a Rollup przenosi ten plik do wspólnego chunka (shared chunk), pobieranego na obu podstronach. Dzielenie kodu w Rollupie wynika z grafu zależności modułów, a nie ze struktury Twoich folderów: moduł dostępny z więcej niż jednego punktu wejścia staje się wspólny. Dodanie trzeciej trasy niczego nie zmienia, a czwarta może całkowicie przemodelować strukturę chunków.

Podział katalogów per-route działa więc tylko wtedy, gdy graf importów jest ściśle rozłączny. Jeśli wielkość bundle ma znaczenie, weryfikuj to za pomocą narzędzi, a nie domysłów:

```bash
npx vite build && npx vite-bundle-visualizer
```

Jeśli musisz wymusić konkretne granice, opcja `build.rollupOptions.output.manualChunks` stanowi wyjście awaryjne, ale wiąże się z koniecznością ręcznego utrzymania konfiguracji.

## Katalogi nie odświeżają się automatycznie w HMR

Zmień komponent, a Vite zaktualizuje go natychmiast. Zmień `locales/fr.json`, a w zależności od sposobu importu nic się nie wydarzy. Dynamicznie importowany JSON nie posiada wbudowanej granicy HMR, więc graf modułów nie wie, w jaki sposób unieważnić zależne komponenty.

Wielu programistów radzi sobie z tym, restartując serwer dev przy każdej zmianie tekstu. Rozwiązanie leży po stronie wtyczki i18n: musi ona obsłużyć aktualizację HMR i przesłać nowe wiadomości do działającej aplikacji. Wybierając bibliotekę, sprawdź, czy jej wtyczka dla Vite to obsługuje.

## `define` trwale wpisuje język do kodu produkcyjnego

Kuszące może być ustalenie domyślnego języka w czasie kompilacji:

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` wykonuje dosłowne podstawienie tekstu w trakcie kompilacji. Wartość obecna podczas budowania staje się ostateczna, co zmusza do oddzielnego budowania aplikacji dla każdego języka. To pełnoprawna strategia, stosowana np. w oficjalnym i18n w Angularze, ale nie sprawdzi się, jeśli jedno wdrożenie ma obsługiwać wszystkie języki dynamicznie.

Wartości, które muszą różnić się w zależności od żądania użytkownika, nie powinny trafiać do `define` i muszą być rozwiązywane w czasie działania (runtime).

## Przenoszenie parsowania wiadomości do czasu kompilacji

Każde dojrzałe rozwiązanie w tym ekosystemie ostatecznie obiera ten sam kierunek: zaprzestanie parsowania wiadomości w przeglądarce.

| Wtyczka                      | Co przenosi do czasu kompilacji                                         |
| :--------------------------- | :---------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | Kompiluje wiadomości vue-i18n do funkcji renderujących (lekki runtime)  |
| Lingui (makro + wtyczka)     | Wyodrębnia i kompiluje katalogi, zamienia makra na identyfikatory       |
| Paraglide (inlang)           | Kompiluje każdą wiadomość do niezależnej funkcji tree-shakable          |
| `vite-intlayer`              | Buduje słowniki komponentów, usuwa (purge) i minifikuje nieużywane pola |

Korzyść jest podwójna: kompilator wiadomości nie trafia do bundle'a przeglądarki, a nieużywane wpisy mogą być statycznie usunięte. Związany z tym koszt: zarówno serwer dev, jak i CI muszą uruchamiać wtyczkę, a zwykłe `tsc` lub runner testów poza Vite wymagać będą dodatkowej konfiguracji.

## SSR: nigdy nie przechowuj języka w zmiennej modułu

Jeśli korzystasz z SSR (przez framework lub `vite-plugin-ssr`), bezwzględna reguła brzmi: zmienna na poziomie modułu przechowująca bieżący język jest współdzielona przez wszystkie równoległe żądania na tym procesie serwera.

```ts
// Bezpieczne w przeglądarce. Poważny wyciek danych między żądaniami na serwerze:
export let currentLocale = "en";
```

Dwóch użytkowników odpytujących serwer w tym samym ułamku sekundy wejdzie w wyścig (race condition), i jeden otrzyma stronę w języku drugiego. W środowisku lokalnym tego nie widać, bo jesteś jedynym użytkownikiem. Rozwiązuj język per żądanie i przekazuj go jawnie przez kontekst lub request-local storage frameworka.

## Wtyczka Vite dla Intlayer

Intlayer rejestruje pojedynczą wtyczkę, która zarządza kompilacją słowników, obserwowaniem zmian w trybie dev i potokiem optymalizacji:

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

Przepisywanie importów, oczyszczanie (purge) i minifikacja są domyślnie aktywne. Kluczowe opcje konfiguruje się w `intlayer.config.ts`:

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // usuwa pola zawartości, których żaden komponent nie odczytuje
    minify: true, // zamienia klucze treści na zwięzłe aliasy
  },
};

export default config;
```

Ponieważ treści są deklarowane per komponent, a nie w wielkich plikach globalnych, krok czyszczenia opiera się na rzeczywistym grafie modułów, co czyni usuwanie nieużywanych wpisów bezpiecznym. Szczegóły w [dokumentacji optymalizacji bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md).

## Częste błędy

- **`{ eager: true }` przy globie pomyślanym jako asynchroniczny.** Działa w dev, wysyła wszystkie języki w bundle produkcyjnym.
- **Wiara, że struktura katalogów automatycznie tworzy chunki.** Rollup śledzi importy, a nie foldery. Zmierz wynikowy build.
- **Restartowanie serwera dev, aby zobaczyć zmianę w tekście.** Oznacza brak obsługi HMR we wtyczce.
- **Umieszczanie języka w `define`.** Wymusza osobny build dla każdego języka.
- **Stan języka na poziomie modułu w SSR.** Prowadzi do wycieków danych między równoległymi żądaniami.
- **Mierzenie wydajności na serwerze dev.** Niezbundlowane moduły nie odzwierciedlają finalnego pakietu produkcyjnego.

## Warto przeczytać

- [Optymalizacja bundle: purge, minifikacja i zawartość przesyłana do przeglądarki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md)
- [Raporty wydajnościowe frameworków](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md)
- [Dokumentacja konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Konfiguracja Intlayer z Vite i React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)
- [Adapter kompatybilności i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/i18next.md)
- [React i18n: jak działa model dostawców (provider model)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: zasada działania i słabe punkty](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/list_i18n_technologies/frameworks/vue.md)
- [i18n na poziomie komponentów a podejście scentralizowane](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md)
