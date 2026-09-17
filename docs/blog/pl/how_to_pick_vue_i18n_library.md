---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Jak wybrać odpowiednią bibliotekę Vue i18n w 2026 roku"
description: Przewodnik decyzyjny dotyczący internacjonalizacji Vue i Nuxt. Na jakie pytania odpowiedzieć przed porównaniem vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide i Intlayer oraz ile każdy wybór kosztuje pod kątem bundle size, typowania i SSR payload.
keywords:
  - vue i18n
  - internacjonalizacja vue
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - porównanie bibliotek i18n
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# Jak wybrać odpowiednią bibliotekę Vue i18n

"Vue i18n" to zarówno termin ogólny, jak i nazwa biblioteki instalowanej przez niemal wszystkich. Jest to jednocześnie wygodne i mylące: `vue-i18n` to solidny domyślny wybór, ale nie jedyna opcja, a pytania, które powinny kierować tą decyzją (SSR czy bez SSR, ile stron, kto pisze tłumaczenia), rzadko padają przed uruchomieniem `npm install`.

Ten przewodnik zadaje je w pierwszej kolejności, a następnie dopasowuje odpowiedzi do odpowiednich bibliotek, zarówno dla czystego Vite + Vue, jak i dla Nuxt.

![Ekosystem bibliotek Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Spis treści

<TOC/>

## Sześć pytań, na które warto odpowiedzieć przed porównaniem bibliotek

1. **Vite SPA czy Nuxt?** W SPA koszt katalogu tłumaczeń to problem wielkości JS bundle. W Nuxt to także problem wielkości HTML payload, ponieważ komunikaty są serializowane w stanie SSR i hydratowane. Z tego powodu większość zgłoszeń "vue-i18n działa wolno" pochodzi z aplikacji Nuxt.
2. **Kto pisze tłumaczenia?** Programiści, system TMS, agencja dostarczająca ciągi ICU czy potok AI. `vue-i18n` używa własnej składni liczby mnogiej oddzielanej pionową kreską (pipe), a nie ICU. Ma to kluczowe znaczenie, jeśli teksty pochodzą z zewnątrz.
3. **Ile języków i stron?** Dwa języki i pięć stron mogą dostarczać wszystko na raz. Dziesięć języków i czterdzieści tras już nie, a strategia ładowania staje się głównym kosztem.
4. **Czy potrzebujesz typowania kluczy?** `t("cart.totl")` kompiluje się w `vue-i18n`, chyba że przekażesz schemat komunikatów w parametrze generic, a ten schemat koliduje z leniwie ładowanymi katalogami (lazy loading).
5. **Co zawiera treść?** Same etykiety UI, czy także markdown, linki wewnątrz zdań i bloki specyficzne dla danego języka? Rozbudowana treść sprawia, że wywołanie `t()` zwracające zwykły string staje się niewygodne.
6. **Czy CSP stanowi ograniczenie?** Domyślny build `vue-i18n` kompiluje komunikaty w przeglądarce za pomocą `new Function`. Wersje runtime-only wymagają `@intlify/unplugin-vue-i18n` do prekompilacji w czasie budowania (build time).

Zapisz odpowiedzi. Wszystko poniżej odnosi się bezpośrednio do nich.

## Krajobraz w skrócie

Ekosystem Vue ma mniej bibliotek i18n niż React i wywodzą się one z różnych fal architektonicznych.

![Historia bibliotek JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Słowniki runtime (2015 do 2019): vue-i18n, @nuxt/i18n">

`vue-i18n` pojawił się w 2015 roku i od tego czasu pozostaje domyślnym standardem. `@nuxt/i18n` opakowuje go, dodając routing językowy, tagi SEO i lazy loading dla poszczególnych wersji językowych. Komunikaty są kompilowane do render functions: w czasie budowania, jeśli dodasz unplugin, lub w przeglądarce w przeciwnym razie.

</Accordion>
<Accordion header="Alternatywne formaty (2020): fluent-vue">

Pliki `.ftl` z Mozilla Fluent wprowadziły bardziej przyjazną składnię komunikatów z wariantami uwzględniającymi gramatykę. Brak typowania kluczy, a wtyczka Vite ładuje wszystkie wersje językowe do każdej strony.

</Accordion>
<Accordion header="Kompilator i współdzielona treść (colocated content) (2024 do 2026): Paraglide, Intlayer">

Paraglide generuje jedną funkcję na każdy komunikat i pozwala bundlerowi na usunięcie reszty za pomocą tree-shakingu. Intlayer deklaruje treść dla poszczególnych komponentów w plikach `.content.ts`, generuje typy i dostarcza tylko to, co renderuje dana trasa.

</Accordion>
</AccordionGroup>

Artykuł [historia JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md) szczegółowo omawia każdą z tych fal.

## Najważniejsza decyzja: gdzie znajduje się treść i kiedy jest ładowana

Dwa wybory strukturalne tłumaczą większość różnic w wielkości bundle pomiędzy poszczególnymi konfiguracjami:

- **Treść scentralizowana czy scoped (zlokalizowana przy komponencie).** Jeden plik `locales/en.json` dla całej aplikacji lub pojedyncza deklaracja na komponent.
- **Import statyczny czy dynamiczny.** Wszystko przy starcie aplikacji lub aktywny język (a najlepiej aktywna trasa) pobierany na żądanie.

Wykres szacuje payload dla teoretycznej aplikacji o wielkości od 1 do 10 stron, przetłumaczonej na od 1 do 10 języków, z około 30 KB tekstu na stronę.

![Teoretyczny wyciek treści w zależności od architektury](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

`vue-i18n` obsługuje oś dynamiczną: wywołanie `setLocaleMessage` po `import()` oznacza, że przestajesz przesyłać dziewięć wersji językowych, których nikt nie czyta. Nie daje jednak kontroli nad osią podziału na strony. Katalog językowy jest jednym obiektem, a jego załadowanie powoduje wczytanie tekstów dla wszystkich stron. W SPA nikt tego nie zauważa. W Nuxt, z `@nuxtjs/i18n` i ponad dziesięcioma stronami, każda trasa niesie teksty wszystkich innych tras, podwójnie: w JS chunk oraz w SSR payload.

Dokument [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/vue.md) mierzy to jako "leakage z innych tras" oraz "leakage z innych języków". Jeśli Twoją odpowiedzią na pytanie 3 było "wiele stron", ta sekcja ma większą wagę niż jakiekolwiek preferencje dotyczące API. Wpis [per-component vs scentralizowane i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md) omawia kwestie utrzymania kodu dla tego samego kompromisu.

## Kandydaci

Rozmiary bibliotek pochodzą z dokumentu [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/vue.md): plugin plus composable w pustym komponencie, po bundle, tree-shakingu i minifikacji, w aplikacji z 10 stronami i 10 językami. Treść jest mierzona osobno.

| Biblioteka     | Model treści                                               | Typowanie kluczy               | Format komunikatów   | Podział na trasy (per-route) | Rozmiar biblioteki |
| :------------- | :--------------------------------------------------------- | :----------------------------- | :------------------- | :--------------------------- | :----------------- |
| `vue-i18n`     | Centralne katalogi na język, opcjonalne bloki SFC `<i18n>` | Opcjonalne przez generic       | Własny (pipe)        | Nie                          | ~24.3 kB           |
| `@nuxtjs/i18n` | Taki sam jak `vue-i18n`, plus routing i tagi SEO           | Taki sam                       | Taki sam             | Nie, tylko na język          | Dodatkowo          |
| `fluent-vue`   | Pliki `.ftl` (Mozilla Fluent)                              | Brak                           | Fluent               | Nie                          | ~29.7 kB           |
| Paraglide      | Projekt inlang, generowane funkcje                         | Generowane                     | Własny               | Przez tree-shaking           | Bliski zeru        |
| Intlayer       | Jeden plik `.content.ts` na komponent                      | Generowane, domyślnie włączone | Pomocniki (`plural`) | Tak, na komponent            | Linia bazowa       |

> Liczby stanowią zrzut stanu dla wersji z benchmarku. Uruchom go we własnej aplikacji przed podjęciem decyzji wyłącznie na podstawie rozmiaru.

Niemal zerowy rozmiar biblioteki Paraglide wynika z jej konstrukcji: środowisko uruchomieniowe jest generowane w Twoim repozytorium, co oznacza konieczność regeneracji przed każdym pushem i ryzyko konfliktów scalania (merge conflicts) w wygenerowanych plikach. Intlayer wymaga `vite-intlayer` (lub modułu Nuxt), więc nie może działać bez etapu budowania.

## Dopasuj swoje odpowiedzi do biblioteki

<AccordionGroup>
<Accordion header="Vite SPA, mały zespół, niewiele języków">

`vue-i18n` w trybie Composition (`legacy: false`), z `@intlify/unplugin-vue-i18n`, dzięki czemu wysyłasz build runtime-only. Ładuj języki leniwie za pomocą `import()`. To rozwiązanie pokrywa większość małych aplikacji, a odpowiedzi społeczności są łatwo dostępne. Bloki SFC `<i18n>` umieszczają komunikaty obok komponentu, co pomaga, ale narzędzia do ekstrakcji i integracji z TMS są wokół nich skromniejsze niż w przypadku katalogów JSON, więc zdecyduj wcześnie, z czego korzysta zespół.

</Accordion>
<Accordion header="Nuxt z routingiem językowym, sitemapą i hreflang">

`@nuxtjs/i18n` zapewnia strategię routingu, tagi `hreflang` i wykrywanie języka bez pisania dodatkowego kodu, co samo w sobie uzasadnia jego wybór dla stron contentowych z kilkoma podstronami. Jego ograniczeniem jest katalog przypisany do całego języka: powyżej kilkunastu stron payload SSR zawiera teksty każdej trasy. W takim przypadku warto ręcznie skonfigurować `vue-i18n` z komunikatami dzielonymi per-route lub przejść na scoped content. Wpis [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/list_i18n_technologies/frameworks/nuxt.md) w pierwszej kolejności omawia wybór strategii routingu.

</Accordion>
<Accordion header="Tłumaczenia pochodzą z TMS lub agencji dostarczającej ICU">

Składnia liczby mnogiej w `vue-i18n` (`"no item | one item | {count} items"`) nie jest standardem ICU i nie jest przenośna. Tłumacze muszą zostać o tym poinformowani, a eksport z TMS jej nie wygeneruje. Należy uzgodnić format przed utworzeniem pierwszego katalogu lub wybrać bibliotekę, której format odpowiada dostawcy. Obsługa ICU w Intlayer jest częściowa, więc jeśli otrzymujesz ciągi ICU już teraz, potraktuj to również jako ograniczenie.

</Accordion>
<Accordion header="Duża aplikacja, wiele tras, budżet bundle lub SSR payload">

Wybierz scoped content kompilowany w czasie budowania. Paraglide osiąga to dzięki tree-shakingowi, który działa zgodnie z oczekiwaniami w Vite. Intlayer osiąga to dzięki deklaracjom per-component i dostarcza tylko to, co renderuje dana trasa. W przypadku `vue-i18n` można ręcznie podzielić komunikaty na trasy, ale nic tego nie wymusza, a współdzielony komponent importujący globalną przestrzeń nazw po cichu niweczy ten podział.

</Accordion>
<Accordion header="Bezpieczeństwo typów (type safety) jest bezdyskusyjne">

`vue-i18n` można otypować, przekazując schemat w parametrze generic do `createI18n`. Działa to poprawnie do momentu, gdy katalogi są ładowane leniwie (lazy loading), ponieważ schemat opisuje komunikaty, które mogą nie być jeszcze dostępne. Jeśli nie chcesz tego ręcznie utrzymywać, wybierz bibliotekę, której typy są generowane z treści: Paraglide lub Intlayer. Wpis [wykrywanie brakujących tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/detecting_missing_translations.md) porównuje, co każde z rozwiązań wychwytuje w czasie budowania.

</Accordion>
<Accordion header="Treść to coś więcej niż etykiety UI">

Strony w markdownie, zdania z komponentem `<RouterLink>` w środku, komponenty specyficzne dla danego języka. `vue-i18n` posiada `<i18n-t>` do interpolacji komponentów, co działa, ale jest rozwlekłe. Węzły treści Intlayer akceptują bezpośrednio markdown, HTML i zagnieżdżone obiekty, co znacznie lepiej pasuje do aplikacji bogatych w treść.

</Accordion>
<Accordion header="Tłumaczenia będą generowane przez AI">

W takim wypadku scentralizowany JSON traci odbiorcę, który uzasadniałby jego istnienie. Współdzielona treść (colocated content) wraz z CLI uzupełniającym brakujące języki to krótsza droga. Polecenie `fill` w Intlayer działa z Twoim własnym kluczem API (OpenAI, Anthropic, Mistral, Gemini) i tłumaczy ponownie tylko to, co uległo zmianie.

</Accordion>
</AccordionGroup>

## Gdzie każda biblioteka ma swoje ograniczenia

- **`vue-i18n`**: najcięższa z zestawu, własny format liczby mnogiej, typy są opcjonalne i niestabilne przy lazy loadingu, brak podziału per-route, martwe klucze gromadzą się po cichu. Pozostawienie `legacy: true` w aplikacji Vue 3 zachowuje warstwę kompatybilności z Vue 2 i uniemożliwia typowanie `useI18n()`.
- **`@nuxtjs/i18n`**: dziedziczy wszystkie powyższe cechy, a payload SSR niesie teksty wszystkich stron po przekroczeniu kilkunastu tras.
- **`fluent-vue`**: przejrzysta składnia komunikatów, brak typowania kluczy, a wtyczka Vite ładuje całą treść we wszystkich językach do każdej strony. Najcięższa w benchmarku.
- **Paraglide**: wygenerowane pliki commitowane do repozytorium, konieczność regeneracji przed każdym pushem, a język jest odczytywany z ciasteczka lub storage przy każdym wywołaniu komunikatu zamiast z reaktywnego store'a, co generuje dodatkowy narzut przy zmianie języka.
- **Intlayer**: obowiązkowy plugin do budowania, mniejszy ekosystem, częściowa obsługa ICU oraz treść rozproszona po codebase z założenia architektonicznego, przez co wyeksportowanie jednego pliku JSON dla tłumacza wymaga dedykowanych narzędzi.

## Jak każda opcja wygląda w kodzie

Ten sam komponent, podsumowanie koszyka z tytułem i liczbą mnogą, napisany z użyciem każdego kandydata. Najciekawszą częścią nie jest szablon, lecz to, gdzie znajduje się treść i co `vue-tsc` o niej wie.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Formy liczby mnogiej oddzielane pionową kreską (pipe) to własny format vue-i18n, a nie ICU. Funkcja `t` akceptuje dowolny string, chyba że przekażesz schemat komunikatów w parametrze generic do `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Składnia Fluent dobrze radzi sobie z liczbami mnogimi i wariantami gramatycznymi. Identyfikatory komunikatów są nietypowanymi stringami, a wtyczka Vite dołącza wszystkie wersje językowe do każdej strony.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Każdy komunikat jest wygenerowaną, otypowaną funkcją, więc brakujący klucz oznacza błąd importu. Folder `paraglide/` jest generowany w Twoim repozytorium i odświeżany przy każdej zmianie.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Wszystkie wersje językowe w jednym pliku obok komponentu. Typy są generowane podczas budowania, więc `title` ma autouzupełnianie, a literówka powoduje błąd `vue-tsc`. `<title />` renderuje węzeł, który może być edytowany w edytorze wizualnym; `{{ items(props.count) }}` zwraca zwykły ciąg tekstowy.

  </Tab>
</Tabs>

Korzystasz już z `vue-i18n`? [Adapter kompatybilności `@intlayer/vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/vue-i18n.md) tworzy alias pakietu na poziomie bundlera, dzięki czemu `useI18n()`, `$t`, formy liczby mnogiej pipe i `v-t` działają nadal, podczas gdy Intlayer serwuje treść. [Przewodnik migracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_vue-i18n_to_intlayer.md) opisuje późniejsze odejście od adaptera, dostępny jest również [przewodnik dedykowany dla Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_nuxtjs_i18n_to_intlayer.md).

## Zanim podejmiesz decyzję

Tabela funkcji pokazuje, co biblioteka potrafi dzisiaj. Poniższe punkty pokazują, jak będzie wyglądać codzienna praca z nią.

**Sprawdź aktywność repozytorium.**

Commity, czas odpowiedzi na issues oraz to, czy ostatnie wydanie minor miało miejsce w tym roku. Dobra architektura bez aktywnego maintainera to odroczona w czasie migracja.

**Nie wybieraj na podstawie liczby pobrań z npm.**

Najczęściej instalowaną biblioteką jest ta, która pojawiła się jako pierwsza, a nie ta, która najlepiej pasuje do bazy kodu Vue w 2026 roku. Liczba pobrań mierzy historię, a nie dopasowanie do projektu.

![Lista rankingowa (tier list) bibliotek JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**Zapytaj, kto finansuje maintainera i co sprzedaje.**

`vue-i18n` jest wspierany przez Crowdin, podobnie jak `next-intl` i `svelte-i18n`. `i18next` jest wspierany przez Locize. Tolgee, Paraglide (inlang) i Intlayer prowadzą własne platformy. Dostawca, którego przychód zależy od hostowanego tłumaczenia, ma niewielki interes w tym, aby tłumaczenie było bezpłatne wewnątrz Twojego toolchaina. Intlayer jako jedyny w zestawieniu oferuje tłumaczenie AI przez CLI z Twoim własnym kluczem API oraz CMS, który możesz samodzielnie hostować (self-host).

**Czy jest gotowy na agentów AI?**

Agenci wciąż mają trudności z i18n: zapominają o wersjach językowych, wymyślają klucze i mieszają składnie komunikatów. Czy biblioteka dostarcza [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md) lub [serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md), aby agent mógł listować, uzupełniać i testować treść? Oraz czy ładowanie treści jest domyślnie zoptymalizowane, czy ktoś musi co kwartał weryfikować przestrzenie nazw i dynamiczne importy?

**Bezpieczeństwo typów (type safety) od razu po instalacji.**

Nie "możliwe do otypowania przy dodatkowej konfiguracji", ale "błędny klucz powoduje błąd `tsc` w czystej instalacji". Sprawdź, co dzieje się w przypadku nieistniejącego klucza oraz języka, w którym brakuje jednego tłumaczenia.

**Wykrywanie nieużywanej treści.**

Katalogi zazwyczaj tylko rosną. Build Intlayera usuwa nieużywane pola i rejestruje je w logach (`build.purge`). Paraglide osiąga to dzięki architekturze, ponieważ niewywołana funkcja komunikatu jest usuwana przez tree-shaking. Każde inne rozwiązanie pozostawia sprzątanie programiście.

**Wygoda programisty (Developer experience).**

Czas konfiguracji do pierwszego przetłumaczonego tekstu, [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md) lub [rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md) pokazujące tłumaczenie po najechaniu kursorem i przechodzące do deklaracji, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md) do uzupełniania, testowania i publikacji oraz możliwość edycji treści przez osoby nietechniczne ([edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)) bez konieczności tworzenia pull requesta.

## Najczęściej zadawane pytania

<FAQ>

<Question title="Czy vue-i18n to wciąż właściwy wybór domyślny w 2026 roku?">

Dla większości aplikacji Vue, tak. Ekosystem jest największy, dokumentacja obszerna, a koszty przewidywalne: ciężki runtime, niestandardowy format liczby mnogiej oraz konieczność samodzielnego projektowania i utrzymywania podziału per-route.

</Question>

<Question title="Czy powinienem użyć @nuxtjs/i18n, czy ręcznie konfigurować vue-i18n w Nuxt?">

Użyj modułu, chyba że Twój routing jest nietypowy lub aplikacja ma zaledwie kilka stron. Ręczna konfiguracja oznacza konieczność samodzielnego tworzenia routingu językowego, middleware, tagów `hreflang` oraz sitemapy, co bywa bardziej skomplikowane, niż się wydaje.

</Question>

<Question title="Czy potrzebuję biblioteki opartej na kompilatorze?">

Tylko jeśli rozmiar bundle, SSR payload, generowane typy lub sprawdzanie brakujących kluczy w czasie budowania są rzeczywistymi wymaganiami. Wpis [kompilator vs deklaratywne i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md) wyjaśnia zalety kompilatorów i sytuacje, w których mogą sprawiać trudności.

</Question>

<Question title="Czy wybór biblioteki wpływa na SEO?">

Pośrednio. Roboty wyszukiwarek zwracają uwagę na routing, `hreflang`, atrybut `<html lang>` oraz to, czy tekst znajduje się w kodzie HTML wyrenderowanym po stronie serwera. Zobacz [przewodnik po hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Dowiedz się więcej

- [Benchmark Vue i18n: rozmiar bundle, leakage i czasy przełączania języków](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/vue.md)
- [Vue i18n: jak działa vue-i18n i gdzie sprawia trudności](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/list_i18n_technologies/frameworks/vue.md) oraz [wpis o Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs Intlayer, funkcja po funkcji](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/vue-i18n_vs_intlayer.md) oraz [benchmark vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/vue-i18n_vs_intlayer_benchmark.md)
- [Czy vue-i18n jest przestarzałe?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/is_vue-i18n_outdated.md)
- [Historia JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md)
- [Kompilator vs deklaratywne i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md)
- [Per-component vs scentralizowane i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md)
- [Konfiguracja i18n w aplikacji Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+vue.md) oraz w [aplikacji Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nuxt.md)
- Ten sam przewodnik dla [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_svelte_i18n_library.md) oraz [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_solid_i18n_library.md)
