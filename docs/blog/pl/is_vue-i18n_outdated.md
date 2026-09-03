---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: Czy vue-i18n jest przestarzały w 2026 roku?
description: vue-i18n był standardem dla ekosystemu Vue i Nuxt przez dekadę. Jednak w naszych testach okazał się najcięższym runtime i18n w sieci. Wyjaśniamy dlaczego.
keywords:
  - vue-i18n
  - Intlayer
  - Internacjonalizacja
  - i18n
  - Vue
  - Nuxt
  - Rozmiar bundle
  - Blog
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# Czy vue-i18n jest przestarzały w 2026 roku?

W świecie Vue niewiele bibliotek cieszy się taką popularnością jak `vue-i18n`. Rozwijany przez Kazupona od czasów Vue 2, zasila `@nuxtjs/i18n` i stanowi domyślny wybór w niemal każdym wielojęzycznym projekcie Vue.

Mimo to nasze testy benchmarkowe w 2026 roku przyniosły zaskakujący rezultat: **`vue-i18n` okazał się najcięższym runtime lokalizacji spośród wszystkich sprawdzonych frameworków frontendowych.**

W czystej aplikacji Vite + Vue o wadze 31.5 KB wdrożenie `vue-i18n` zwiększyło średnią objętość JavaScriptu na stronę do **136.4 KB**, ponad czterokrotnie powiększając transfer.

Jak to możliwe, że technologia ceniona za zwinność i minimalizm zyskała tak wymagający pakiet i18n? Czy jej klasyczna architektura runtime ma jeszcze uzasadnienie?

<TOC/>

## Kluczowe wnioski

**Najcięższy zbadany runtime:**

Ważąc **24.3 KB gzipped (83.2 KB po minifikacji)** przed dołączeniem jakichkolwiek tłumaczeń, `vue-i18n` jest około **9 razy cięższy** od silnika `intlayer` (2.7 KB).

**Wzrost wagi strony o 330%:**

`vue-i18n` podniósł rozmiar strony startowej z 31.5 KB do 136.4 KB. Intlayer zamknął się w 59.3 KB, co daje **payload mniejszy o 56%**.

**Ukryty kompilator w przeglądarce:**

Domyślnie, o ile nie skonfiguruje się specjalnych aliasów w bundlerze, `vue-i18n` wysyła kompletny kompilator wiadomości do przeglądarki, by przetwarzać ciągi znaków w locie.

**Częstotliwość wydań:**

W minionym roku `vue-i18n` odnotował ~259 commitów, skupionych wokół eliminacji błędów i zgodności z nowymi wersjami Vue.

**Brak natywnych nowoczesnych narzędzi:**

Brak oficjalnego wsparcia dla Language Server (LSP), serwerów MCP dla sztucznej inteligencji czy zautomatyzowanych komend tłumaczeniowych w CLI.

## Utrzymanie vs. współczesne narzędzia

| Repozytorium          | Gwiazdki                                                                                                                                               | Wszystkie commity                                                                                                                                                   | Commity / rok                                                                                                                                                      | Ostatni commit                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Ostatnie 12 miesięcy:

- `intlify/vue-i18n`: **259 commitów** (bieżące wsparcie dla Vue 3 i Nuxt).
- `aymericzip/intlayer`: **4 343 commity** (prace nad optymalizacjami kompilatora, narzędziami LSP i integracjami AI).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

Sprawdzona biblioteka gwarantuje przewidywalność. Jednak nowoczesne technologie opierają się na modyfikacjach AST w trakcie budowania, czyszczeniu nieużywanego kodu i automatycznym tłumaczeniu przez AI. Rozwiązanie zakorzenione wyłącznie w runtime nie wykorzystuje łatwo tych możliwości.

## Pomiary w Vite + Vue

Testy przeprowadzone na aplikacji z 10 podstronami i 10 językami przy użyciu Vite i Vue 3:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Testy wykonane w przeglądarkach przy użyciu kompresji gzip. Kompletne zestawienie w [dokumentacji benchmarku Vue](https://intlayer.org/pl/doc/benchmark/vue).

### Wyjściowy narzut biblioteki

Rozmiar przed wprowadzeniem tekstów:

| Biblioteka        | Gzipped    | Zminifikowane |
| ----------------- | ---------- | ------------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB       |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB**    |

Sam runtime `vue-i18n` zabiera **24.3 KB gzipped**, czyli niemal tyle, ile cały rdzeń Vue. Intlayer dokłada zaledwie **2.7 KB**.

### Waga strony i wyciek tłumaczeń

| Konfiguracja    | Śr. JS / str. (gz) | Wyciek języków | Wyciek innych stron | Śr. komponent (gz) |
| --------------- | ------------------ | -------------- | ------------------- | ------------------ |
| Baza (bez i18n) | 31.5 KB            | 0.0%           | 90.0%               | 0.9 KB             |
| `vue-i18n`      | **136.4 KB**       | 50.2%          | 90.0%               | 196.0 KB           |
| Intlayer        | **59.3 KB**        | 51.1%          | **0.0%**            | **6.5 KB**         |

### Główne spostrzeżenia

**Duży przyrost proporcjonalny:**

Ponieważ szkielet Vue jest wybitnie lekki (~31 KB), zastosowanie `vue-i18n` ponad czterokrotnie zwiększa transfer strony.

**Wyciek do innych tras:**

W standardowym wariancie **90% pobieranych tekstów** dotyczy innych podstron. Intlayer zupełnie eliminuje te dane, sprowadzając wyciek do **0.0%**.

**Masa odrębnych komponentów:**

Komponenty z lokalnymi zakresami tłumaczeń osiągały w `vue-i18n` średnio 196 KB przez replikację słowników, podczas gdy w Intlayer było to **6.5 KB**.

## Dlaczego vue-i18n jest ciężki?

### Parser AST przesyłany do przeglądarki

`vue-i18n` zawiera dedykowany kompilator formatu wiadomości. Reguły pluralizacji i interpolacje są tłumaczone na drzewa AST bezpośrednio w trakcie działania programu.

Aby temu zapobiec, trzeba utworzyć aliasy w bundlerze wskazujące na `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` oraz wstępnie kompilować pliki z `@intlify/unplugin-vue-i18n`. Wiele projektów pomija ten krok.

### Monolityczny zestaw funkcji

`vue-i18n` integruje obsługę dat i liczb, połączone wiadomości, mostki dla Options API (`$t`, `v-t`) oraz reaktywne proxy. Nawet jeśli zależy Ci wyłącznie na prostych tekstach w `<script setup>`, wczytywany jest kompletny silnik.

### Dynamiczne klucze wykluczają tree-shaking

Rozwiązywanie `"home.hero.title"` w runtime uniemożliwia narzędziom budującym identyfikację potrzebnych fraz. W konsekwencji zbędne wpisy zostają w paczce.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

[Kompilator Intlayer](https://intlayer.org/pl/doc/compiler) śledzi bezpośrednie wywołania właściwości i usuwa nieużywaną treść przed przygotowaniem plików klienta. Zobacz [optymalizację bundle](https://intlayer.org/pl/doc/concept/bundle-optimization).

## Doświadczenie programisty

### Osobne foldery vs. ko-lokacja

W `vue-i18n` tłumaczenia leżą w oddzielnym folderze `locales/`. Intlayer umożliwia tworzenie plików treści tuż obok komponentów:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/pl.json"
{
  "hero": {
    "title": "Wdrażaj w każdym języku"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      pl: "Wdrażaj w każdym języku",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

Usunięcie lub przeniesienie `Hero.vue` automatycznie skutkuje usunięciem lub przeniesieniem pliku z treścią.

### Podpowiedzi w edytorze vs. rygorystyczna kompletność

`DefineLocaleMessage` oferuje autouzupełnianie na podstawie wzorcowego pliku. Nie chroni jednak przed lukami w innych językach. Brakujący klucz w `pl.json` nie przerwie procesu budowania TypeScriptem.

W Intlayer słowniki są walidowane restrykcyjnie. Tryb [`strictMode`](https://intlayer.org/pl/doc/concept/configuration) wywołuje błąd kompilacji, jeśli pominiesz jakiekolwiek tłumaczenie.

### Współczesne narzędzia dla programistów i AI

| Narzędzie                   | `vue-i18n`             | Intlayer                                                                   |
| --------------------------- | ---------------------- | -------------------------------------------------------------------------- |
| **Rozszerzenie VS Code**    | Zewnętrzne (i18n Ally) | ✅ [Oficjalne rozszerzenie](https://intlayer.org/pl/doc/vs-code-extension) |
| **Language Server (LSP)**   | ❌ Brak                | ✅ [Wbudowany LSP](https://intlayer.org/pl/doc/lsp)                        |
| **Serwer MCP dla AI**       | ❌ Brak                | ✅ [Dedykowany serwer MCP](https://intlayer.org/pl/doc/mcp-server)         |
| **Umiejętności agentów**    | ❌ Brak                | ✅ [Autonomiczne skille](https://intlayer.org/pl/doc/agent_skills)         |
| **Wizualny CMS in-context** | ❌ Brak                | ✅ [Darmowy CMS Open Source](https://intlayer.org/pl/doc/concept/editor)   |

## Potoki tłumaczeń

`vue-i18n` nie posiada wbudowanych komend translacyjnych. Wymaga to najczęściej ręcznego eksportu do serwisów pokroju Crowdin czy Phrase.

Intlayer udostępnia kompletny zestaw od razu:

**Lokalne auto-tłumaczenie AI (`intlayer fill`):**

Uzupełnia puste wpisy przy użyciu własnych kluczy API OpenAI, Anthropic, Mistral lub Gemini.

**Samodzielnie wdrażany CMS wizualny:**

Zainstaluj [Intlayer CMS](https://intlayer.org/pl/doc/concept/cms), aby dać zespołom redakcyjnym podgląd zmian z bezpośrednim zapisem w Git.

**Licencja open source:**

Całe oprogramowanie jest dostępne na licencji Apache 2.0.

## Kiedy vue-i18n wciąż ma sens?

<AccordionGroup>
<Accordion header="Działające projekty w Nuxt 2/3">

Jeśli routing aplikacji mocno polega na `@nuxtjs/i18n`, przepisywanie kodu może być nieopłacalne.

</Accordion>
<Accordion header="Specyficzne wymagania formatowania ICU">

Gdy projekt w dużym stopniu używa zagnieżdżonych komunikatów i złożonych reguł dat.

</Accordion>
<Accordion header="Drobne projekty hobbystyczne">

Jeśli rozmiar paczki nie wpływa negatywnie na odbiór strony.

</Accordion>
</AccordionGroup>

## Jak usprawnić istniejącą konfigurację vue-i18n?

Intlayer udostępnia bezpośrednie pakiety zgodności, które wiernie odwzorowują sygnatury funkcji `vue-i18n` oraz `@nuxtjs/i18n` (`useI18n`, `$t`, `<i18n-t>`). Nie musisz przepisywać szablonów ani kompozycji (composables), aby zacząć czerpać korzyści z lekkiej architektury opartej na kompilatorze.

Instalacja sprowadza się do jednego polecenia:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

To interaktywne CLI:

1. Instaluje pakiet zgodności `@intlayer/vue-i18n` lub `@intlayer/nuxt-i18n`.
2. Konfiguruje aliasy w bundlerze (Vite lub Nuxt), aby dotychczasowe importy i wywołania w szablonach wskazywały bezpośrednio na Intlayer, co pozwala usunąć `vue-i18n` z `package.json`.
3. Błyskawicznie włącza diagnostykę Language Server (LSP), usuwa 24-kilobajtowy parser AST z paczki klienta i odblokowuje lokalne procesy tłumaczeń AI bez czasochłonnego refaktoringu.

Dokładne kroki znajdziesz w naszych dedykowanych przewodnikach:

- **Łatwa adaptacja:** Zachowaj istniejący kod szablonów dzięki [warstwie zgodności z `vue-i18n`](https://intlayer.org/pl/doc/compatibility/vue-i18n) lub [`@nuxtjs/i18n`](https://intlayer.org/pl/doc/compatibility/nuxtjs-i18n).
- **Instrukcje krok po kroku:** Przenieś pliki JSON do zorganizowanych słowników z naszymi poradnikami: [z vue-i18n](https://intlayer.org/pl/doc/migration/vue-i18n) oraz [z @nuxtjs/i18n](https://intlayer.org/pl/doc/migration/nuxtjs-i18n).
- **Podejście mieszane:** Zostaw `vue-i18n` na etapie renderowania, [używając Intlayer z vue-i18n](https://intlayer.org/pl/blog/intlayer-with-vue-i18n) do ścisłej kontroli typów i lokalnych translacji AI.

Sprawdź swoją aplikację darmowym [skanerem SEO i18n](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Polecane lektury

- [Benchmark Vue & Vite i18n: pełna analiza](https://intlayer.org/pl/doc/benchmark/vue)
- [vue-i18n vs Intlayer: dokładne porównanie](https://intlayer.org/pl/blog/vue-i18n-vs-intlayer)
- [Czy next-intl jest przestarzały w 2026 roku?](https://intlayer.org/pl/blog/is-next-intl-outdated)
- [Kompilacja a deklaratywna internacjonalizacja](https://intlayer.org/pl/blog/compiler-vs-declarative-i18n)
