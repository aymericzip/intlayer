---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "Jak wybrać odpowiednią bibliotekę i18n dla Svelte w 2026 roku"
description: Przewodnik decyzyjny dotyczący internacjonalizacji Svelte i SvelteKit. Na jakie pytania odpowiedzieć przed porównaniem svelte-i18n, Paraglide, typesafe-i18n, wuchale i Intlayer oraz ile każdy wybór kosztuje pod względem rozmiaru bundle, typowania i bezpieczeństwa SSR.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte internationalization
  - svelte internacjonalizacja
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - porównanie bibliotek i18n
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Jak wybrać odpowiednią bibliotekę i18n dla Svelte

Svelte nie dostarcza żadnych wbudowanych narzędzi do i18n. Brak `$t`, brak prymitywu locale, brak formatu wiadomości. Każda opcja to rozwiązanie zewnętrzne, a ekosystem Svelte to miejsce, w którym i18n w czasie kompilacji poszło najdalej, dlatego poszczególni kandydaci różnią się od siebie bardziej niż w przypadku React czy Vue.

Ten przewodnik wymienia pytania, na które warto odpowiedzieć w pierwszej kolejności, a następnie przypisuje odpowiedzi do `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` i Intlayer, zarówno dla Vite + Svelte, jak i dla SvelteKit.

![Ekosystem bibliotek Svelte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Spis treści

<TOC/>

## Sześć pytań, na które należy odpowiedzieć przed porównaniem bibliotek

1. **Vite SPA czy SvelteKit?** W SPA store na poziomie modułu jest poprawny: jedna karta, jeden użytkownik, jedno locale. W SvelteKit ten sam singleton jest współdzielony między równoległymi żądaniami na serwerze, przez co żądanie B może wyrenderować się w języku żądania A. Biblioteka albo zapewnia strukturę dla każdego żądania (context, `locals`), albo pozostawia jej implementację Tobie.
2. **Kto pisze tłumaczenia?** Programiści, TMS, agencja dostarczająca ciągi ICU, czy pipeline AI. `svelte-i18n` obsługuje ICU. Paraglide i `typesafe-i18n` używają własnej składni. Dopasuj rozwiązanie do dostawcy treści.
3. **Ile masz wersji językowych (locales) i podstron?** Dwa języki i pięć podstron mogą wysłać wszystko do klienta. Dziesięć języków i czterdzieści tras już nie, a różnica między katalogami runtime a skompilowanymi wiadomościami staje się głównym kosztem.
4. **Czy potrzebujesz typowania kluczy?** `$_("cart.totl")` to błąd w runtime w `svelte-i18n`. Biblioteki czasu kompilacji czynią z tego błąd typowania już na etapie kompilacji.
5. **Store'y ze Svelte 4 czy runes ze Svelte 5?** Runes zmieniają składnię stanu locale, a nie problem współdzielenia stanu. Jednak `$state` w pliku `.ts` kompiluje się do zwykłej zmiennej, więc runtime biblioteki musi obsługiwać runes, jeśli korzystasz ze Svelte 5.
6. **Czy akceptujesz wygenerowane pliki w repozytorium?** Zarówno Paraglide, jak i `typesafe-i18n` generują kod JavaScript lub TypeScript bezpośrednio w Twoim drzewie źródłowym. Dla niektórych zespołów to żaden problem, inni mierzą się z konfliktami scalania (merge conflicts) na każdej równoległej gałęzi.

Zapisz swoje odpowiedzi. Wszystkie poniższe sekcje będą się do nich odnosić.

## Krajobraz w jednym ujęciu

i18n w Svelte pojawiło się później niż w React czy Vue i od razu przeszło do fal opartych na kompilacji.

![Historia bibliotek JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Słowniki w czasie wykonywania (2019 do 2020): svelte-i18n, sveltekit-i18n">

Katalogi JSON, ICU parsowane w przeglądarce za pomocą `intl-messageformat`, locale w store'ach na poziomie modułu (`$locale`, `$_`). Najbardziej popularne, dobrze udokumentowane, konfiguracja SSR leży po Twojej stronie.

</Accordion>
<Accordion header="Generowane typy (2020 do 2022): typesafe-i18n">

Generator obserwuje Twoje katalogi i generuje typowane akcesory (`$LL.cart.total()`). Solidny model, pliki generowane w repozytorium, a sam projekt nie był ostatnio zbyt aktywnie rozwijany.

</Accordion>
<Accordion header="Kompilator i współdzielona treść (2022 do 2026): Paraglide, wuchale, Intlayer">

Paraglide kompiluje każdą wiadomość do wyeksportowanej funkcji, dzięki czemu bundler eliminuje w procesie tree-shaking to, czego dana trasa nigdy nie wywołuje. `wuchale` wyodrębnia ciągi znaków ze znaczników podczas budowania. Intlayer deklaruje treść dla każdego komponentu oraz generuje typy i słowniki per komponent.

</Accordion>
</AccordionGroup>

Artykuł [historia JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md) szczegółowo opisuje każdą z tych fal.

## Decyzja, która ma największe znaczenie: gdzie znajduje się treść i kiedy jest ładowana

Dwa wybory strukturalne odpowiadają za większość różnic w rozmiarze bundle między konfiguracjami:

- **Treść scentralizowana lub per komponent (scoped).** Jeden plik `locales/en.json` dla całej aplikacji lub pojedyncza deklaracja obok każdego komponentu.
- **Import statyczny lub dynamiczny.** Wszystko ładowane przy starcie albo aktywne locale (oraz optymalnie aktywna trasa) pobierane na żądanie.

Wykres szacuje payload dla teoretycznej aplikacji mającej od 1 do 10 podstron, przetłumaczonej na 1 do 10 języków, z około 30 KB tekstu na stronę.

![Teoretyczny wyciek treści w zależności od architektury](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n` domyślnie znajduje się w lewym górnym rogu: `register("fr", () => import("./fr.json"))` zapewnia dynamiczne ładowanie dla każdego locale, ale katalog danego języka to jeden obiekt i załadowanie go powoduje wczytanie treści wszystkich podstron. Paraglide to interesujący przypadek: ponieważ każda wiadomość jest osobnym exportem, tree-shaking zapewnia podział na poziomie podstron bez dodatkowej pracy, a [benchmark Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/svelte.md) potwierdza, że działa to zgodnie z opisem w Vite + Svelte (w benchmarkach React i Next.js tak nie było). Intlayer osiąga ten sam rezultat dzięki deklaracjom na poziomie pojedynczych komponentów.

Jeśli Twoją odpowiedzią na pytanie 3 było "wiele podstron", potraktuj tę sekcję priorytetowo ponad preferencjami dotyczącymi API. Wpis [i18n per komponent a scentralizowane](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md) omawia kwestię utrzymania tego samego kompromisu.

## Kandydaci

Rozmiary bibliotek pochodzą z [benchmarku Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/svelte.md): store wraz z akcesorem w pustym komponencie, po bundle, tree-shakingu i minifikacji, w aplikacji z 10 podstronami i 10 wersjami językowymi. Sama treść jest mierzona osobno.

| Biblioteka      | Gdzie trafiają wiadomości              | Stan locale                                    | Bezpieczeństwo typów        | Format wiadomości             | Podział per trasa       | Rozmiar biblioteki                                   |
| :-------------- | :------------------------------------- | :--------------------------------------------- | :-------------------------- | :---------------------------- | :---------------------- | :--------------------------------------------------- |
| `svelte-i18n`   | Katalogi JSON per locale               | Svelte store na poziomie modułu                | 2/5 — Ręczna unia           | ICU                           | Nie                     | ~16.6 kB                                             |
| `typesafe-i18n` | Generowane moduły TS                   | Adapter store                                  | 4/5 — Generowane            | Własny                        | Częściowy               | Mały                                                 |
| Paraglide       | Projekt inlang, kompilowany do funkcji | Odczyt per wywołanie z cookie, URL lub storage | 3.5/5 — Generowane          | Własny                        | Tak, przez tree-shaking | Bliski zeru (dzięki kodowi generowanemu w projekcie) |
| `wuchale`       | Ekstrakcja z markup podczas budowania  | Store                                          | N/D (brak kluczy)           | Własny                        | Tak                     | ~30.7 kB                                             |
| Intlayer        | `.content.ts` obok komponentu          | Context plus store, obsługa runes              | 5/5 — Generowane, domyślnie | Intlayer (+ ICU, i18next, PO) | Tak, per komponent      | ~3.6 kB                                              |

> Liczby są migawką dla wersji z benchmarku. Uruchom go na własnej aplikacji przed podjęciem decyzji opartej wyłącznie na rozmiarze.
> Bezpieczeństwo typów: 5/5 oznacza, że klucze, parametry i każda lokalizacja są sprawdzane bez ręcznej konfiguracji, w tym formatery URL i helpery.

Rozmiar biblioteki Paraglide bliski zeru wynika z jej konstrukcji: runtime jest generowany bezpośrednio do Twojego repozytorium. Intlayer wymaga wtyczki `vite-intlayer`, więc nie działa bez kroku budowania.

## Dopasuj swoje odpowiedzi do biblioteki

<AccordionGroup>
<Accordion header="Vite SPA, mały zespół, niewiele języków">

`svelte-i18n`. To najbardziej udokumentowana opcja, `$_` czyta się naturalnie w markup, a `register` wraz z `waitLocale()` pokrywa lazy loading dla każdego locale. Zablokuj pierwsze renderowanie (first paint) za pomocą `isLoading`, w przeciwnym razie użytkownik zobaczy surowe klucze. Jeśli aplikacja może w przyszłości zyskać serwer, umieść locale w Svelte context od pierwszego dnia zamiast polegać na store modułu; teraz nic to nie kosztuje, a zapobiega trudnym do wykrycia błędom na produkcji.

</Accordion>
<Accordion header="SvelteKit z routingiem językowym i SSR">

Problem współdzielenia stanu jest tutaj decydujący. `svelte-i18n` działa w SvelteKit, ale konfiguracja per żądanie (`hooks.server.ts`, `locals`, `load`, a następnie `setContext`) leży po Twojej stronie i łatwo popełnić w niej subtelny błąd. Paraglide dostarcza integrację ze SvelteKit, która obsługuje routing i odczytuje locale przy każdym wywołaniu, co pozwala uniknąć problemu singletona. Intlayer ustawia locale z danych `load` do contextu. Artykuł o [SvelteKit i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/list_i18n_technologies/frameworks/sveltekit.md) wyjaśnia wybór między `[[lang]]` a `reroute`, który warto podjąć przed wyborem biblioteki.

</Accordion>
<Accordion header="Tłumaczenia pochodzą z TMS lub agencji dostarczającej ICU">

`svelte-i18n` natywnie obsługuje ICU dzięki `intl-messageformat`, więc integruje się bezpośrednio z większością dostawców. Paraglide i `typesafe-i18n` używają własnej składni i wymagają konwersji. Wsparcie dla ICU w Intlayer jest częściowe, więc jeśli otrzymujesz obecnie ciągi ICU, potraktuj to jako czynnik blokujący.

</Accordion>
<Accordion header="Rozmiar bundle to główny priorytet">

Rozwiązania czasu kompilacji. Tree-shaking w Paraglide działa w Vite + Svelte, a koszt biblioteki jest bliski zeru. Słowniki per komponent w Intlayer dają ten sam rezultat bez generowania plików w repozytorium. `svelte-i18n` dołącza parser ICU oraz cały katalog, osiągając w benchmarku około 4,5× rozmiar `svelte-intlayer` jeszcze przed dodaniem jakiejkolwiek treści.

</Accordion>
<Accordion header="Bezpieczeństwo typów jest bezdyskusyjne">

Wszystko poza podstawową konfiguracją `svelte-i18n`, gdzie jedynym typowaniem jest ręcznie pisana unia, która natychmiast rozjeżdża się z plikiem JSON. `typesafe-i18n`, Paraglide i Intlayer generują typy bezpośrednio z treści. Sprawdź aktywność repozytorium `typesafe-i18n` przed oparciem na nim swojej bazy kodu. Artykuł [wykrywanie brakujących tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/detecting_missing_translations.md) porównuje, co poszczególne narzędzia wyłapują w czasie budowania.

</Accordion>
<Accordion header="Nie chcesz wygenerowanych plików w repozytorium">

To eliminuje Paraglide oraz `typesafe-i18n`. `svelte-i18n` i Intlayer trzymają swoje pliki wyjściowe w `node_modules` lub w katalogu budowania. W przypadku Intlayer pliki `.content.ts` są ręcznie pisanym kodem źródłowym, a skompilowane słowniki i typy trafiają do `.intlayer/` i są ignorowane przez git.

</Accordion>
<Accordion header="Tłumaczenia będą generowane przez AI">

Wtedy scentralizowany JSON traci swoje uzasadnienie. Treść współdzielona z komponentem w połączeniu z CLI uzupełniającym brakujące wersje językowe to najprostsza droga. Polecenie `fill` w Intlayer działa z Twoim własnym kluczem API (OpenAI, Anthropic, Mistral, Gemini) i tłumaczy ponownie tylko to, co uległo zmianie. Ekosystem inlang w Paraglide oferuje hostowane odpowiedniki z osobnymi planami.

</Accordion>
</AccordionGroup>

## Gdzie każda biblioteka ma słabe punkty

- **`svelte-i18n`**: najcięższa z zestawu, brak typów dla kluczy, brak podziału per trasa, store na poziomie modułu, który wycieka między żądaniami w SvelteKit, chyba że samodzielnie skonfigurujesz context.
- **`typesafe-i18n`**: proces obserwatora (watcher), generowane pliki w repozytorium oraz repozytorium, które nie było ostatnio aktywnie rozwijane.
- **Paraglide**: generowane pliki commitowane do repozytorium i regenerowane przed każdym pushem, konflikty scalania na równoległych gałęziach oraz locale odczytywane z cookie lub storage przy każdym wywołaniu wiadomości zamiast ze store'a, co generuje narzut przy zmianie języka.
- **`wuchale`**: ciekawy pomysł na ekstrakcję, ale wciąż wczesny etap. Benchmark React napotkał problemy z reaktywnością, które wymagały wymuszania ponownego renderowania providera, a dokumentacja jest skromna.
- **Intlayer**: wymagana wtyczka do buildera, mniejszy ekosystem, częściowe wsparcie ICU oraz treść rozproszona po całej bazie kodu z założenia, więc wyeksportowanie pojedynczego pliku JSON dla tłumacza wymaga dodatkowych narzędzi.

## Jak każda opcja wygląda w kodzie

Ten sam komponent, podsumowanie koszyka z tytułem i liczbą mnogą, napisany przy użyciu każdego kandydata. Najciekawszą częścią nie jest sam markup, lecz to, gdzie znajduje się treść, jak przechowywane jest locale i co wie system typów.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

  <Tabs group="locale">
  <Tab value="en" label="Angielski">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="Francuski">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="Hiszpański">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU przez `intl-messageformat`, locale w store na poziomie modułu. `$_` przyjmuje dowolny ciąg znaków; jedynym typowaniem jest unia pisana ręcznie.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="Angielski">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Francuski">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Hiszpański">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Każda wiadomość jest wygenerowaną, typowaną funkcją, eliminowaną przez tree-shaking, jeśli nie zostanie wywołana. Folder `paraglide/` jest generowany w Twoim repozytorium, a locale jest odczytywane przy każdym wywołaniu zamiast ze store'a.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

  <Tabs group="locale">
  <Tab value="en" label="Angielski">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

  </Tab>
  <Tab value="fr" label="Francuski">

```ts fileName="src/i18n/fr/index.ts"
import type { Translation } from "../i18n-types";

const fr = {
  cart: {
    title: "Votre panier",
    items: "{count} article{{s}}",
  },
} satisfies Translation;

export default fr;
```

  </Tab>
  <Tab value="es" label="Hiszpański">

```ts fileName="src/i18n/es/index.ts"
import type { Translation } from "../i18n-types";

const es = {
  cart: {
    title: "Tu carrito",
    items: "{count} artículo{{s}}",
  },
} satisfies Translation;

export default es;
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Typowane akcesory generowane przez proces watcher. Model jest poprawny; wygenerowane pliki trafiają do repozytorium, a projekt nie notował ostatnio dużej aktywności.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      pl: "Twój koszyk",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      pl: plural({
        one: "{{count}} produkt",
        few: "{{count}} produkty",
        many: "{{count}} produktów",
        other: "{{count}} produktów",
      }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Wszystkie wersje językowe w jednym pliku obok komponentu. `useIntlayer` zwraca czytelny store, więc `$content` to automatyczna subskrypcja, którą już znasz, a locale jest przechowywane w context (bezpiecznym dla SSR), a nie w singletonie modułu.

  </Tab>
</Tabs>

Korzystasz już z `svelte-i18n`? [Adapter kompatybilności `@intlayer/svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/svelte-i18n.md) tworzy alias dla pakietu na poziomie bundlera, dzięki czemu `$_`, `$date`, `$number` oraz Twoje płaskie klucze nadal działają, podczas gdy Intlayer dostarcza treść.

## Zanim podejmiesz decyzję

Tabela funkcji mówi o tym, co biblioteka potrafi dzisiaj. Poniższe punkty pokazują, jak będzie wyglądać codzienna praca z nią.

**Sprawdź aktywność repozytorium.**

Commity, czas odpowiedzi na zgłoszenia (issues) oraz informacja, czy ostatnie wydanie minor miało miejsce w tym roku. Dobry projekt bez maintainera to odroczona w czasie migracja.

**Nie wybieraj na podstawie liczby pobrań z npm.**

Najczęściej instalowana biblioteka to ta, która powstała jako pierwsza, a nie ta, która najlepiej pasuje do bazy kodu Svelte w 2026 roku. Liczba pobrań mierzy historię, a nie dopasowanie.

![Ranking bibliotek JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Sprawdź, kto finansuje maintainera i co sprzedaje.**

`svelte-i18n` jest wspierane przez Crowdin, podobnie jak `next-intl` czy `vue-i18n`. `i18next` jest wspierane przez Locize. Tolgee, Paraglide (inlang) oraz Intlayer prowadzą własne platformy. Dostawca, którego przychód zależy od hostowanych tłumaczeń, nie ma motywacji, aby tłumaczenie wewnątrz Twojego toolchaina było bezpłatne. Intlayer jako jedyny z tego zestawu dostarcza tłumaczenie AI przez CLI z Twoim własnym kluczem API oraz CMS, który możesz samodzielnie hostować.

**Czy rozwiązanie jest gotowe na agentów AI?**

Agenci AI wciąż miewają trudności z i18n: zapominają o wersjach językowych, wymyślają klucze i mieszają składnie wiadomości. Czy biblioteka dostarcza [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md) lub [serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md), aby agent mógł listować, uzupełniać i testować treści? Oraz czy ładowanie treści jest domyślnie zoptymalizowane, czy też ktoś musi co kwartał robić przegląd przestrzeni nazw (namespaces) i dynamicznych importów?

**Bezpieczeństwo typów od pierwszego uruchomienia.**

Nie "możliwe do otypowania po dodatkowej konfiguracji", ale "błędny klucz powoduje błąd `tsc` zaraz po instalacji". Sprawdź, co się dzieje z kluczem, który nie istnieje, oraz z językiem, w którym brakuje jednego tłumaczenia.

**Wykrywanie nieużywanej treści.**

Katalogi mają tendencję wyłącznie do rozrastania się. Build Intlayer usuwa nieużywane pola i raportuje je (`build.purge`). Paraglide osiąga to dzięki swojej architekturze, ponieważ niewywołana funkcja wiadomości jest usuwana w procesie tree-shaking. Każda inna biblioteka pozostawia to zadanie Tobie.

**Doświadczenie programisty (Developer Experience).**

Czas od konfiguracji do pierwszego przetłumaczonego tekstu, [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md) lub [rozszerzenie do VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md), które wyświetla tłumaczenie po najechaniu kursorem i przenosi do deklaracji, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md) do uzupełniania, testowania i publikowania, [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) lub ekstraktor, który wyciąga zakodowane na stałe ciągi z komponentów, aby nie zarządzać każdym ciągiem klucz po kluczu oraz sposób na edycję treści dla osób nietechnicznych ([edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)) bez konieczności tworzenia pull requesta.

## Często zadawane pytania

<FAQ>

<Question title="Czy svelte-i18n to wciąż właściwy domyślny wybór w 2026 roku?">

W przypadku Vite SPA z małym katalogiem, tak. To najbardziej udokumentowana opcja, a kompatybilność z ICU ma znaczenie dla wielu zespołów. W SvelteKit lub przy kilkudziesięciu podstronach jej koszty (brak typów, brak podziału, współdzielony store) zaczynają przeważać.

</Question>

<Question title="Czy tree-shaking w Paraglide naprawdę działa?">

W Vite + Svelte tak, benchmark to potwierdza. W React z TanStack Start lub Next.js nie przyniosło to efektu w tym samym benchmarku. Zweryfikuj to we własnym stacku zamiast bezkrytycznie polegać na którymkolwiek z wyników.

</Question>

<Question title="Czy runes zmieniają to, którą bibliotekę wybrać?">

Zmieniają składnię Twojego własnego stanu locale, a nie problem współdzielenia stanu. Liczy się to, czy runtime biblioteki obsługuje runes w Svelte 5 i czy używa context zamiast store'a modułu. Sprawdź oba te aspekty.

</Question>

<Question title="Czy wybór biblioteki wpływa na SEO?">

Pośrednio. Roboty indeksujące zwracają uwagę na routing, `hreflang`, `<html lang>` oraz to, czy tekst znajduje się w kodzie HTML wyrenderowanym po stronie serwera. Zobacz [przewodnik po hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Idąc dalej

- [Benchmark Svelte i18n: rozmiar bundle, wycieki i czasy przełączania locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/svelte.md)
- [Svelte i18n: store'y, runes i pułapka na poziomie modułu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/list_i18n_technologies/frameworks/svelte.md) oraz [SvelteKit i18n: routing, SSR i współdzielony stan](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/list_i18n_technologies/frameworks/sveltekit.md)
- [Gotowy adapter kompatybilności `svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/svelte-i18n.md)
- [Historia JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md)
- [Kompilator a deklaratywne i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md)
- [i18n per komponent a scentralizowane](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md)
- [Jak działa optymalizacja bundle podczas budowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md)
- [Konfiguracja i18n w aplikacji Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+svelte.md) oraz w [aplikacji SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_svelte_kit.md)
- Ten sam przewodnik dla [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_vue_i18n_library.md) oraz [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_solid_i18n_library.md)
