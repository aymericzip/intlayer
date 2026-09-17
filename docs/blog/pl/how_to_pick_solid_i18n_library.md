---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Jak wybrać odpowiednią bibliotekę i18n dla Solid w 2026 roku"
description: Przewodnik decyzyjny dotyczący internacjonalizacji w SolidJS i SolidStart. Na jakie pytania odpowiedzieć przed porównaniem @solid-primitives/i18n, solid-i18next, Paraglide, Lingui oraz Intlayer, i co każdy wybór kosztuje pod względem reaktywności, bundle size oraz typowania.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid internacjonalizacja
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - porównanie bibliotek i18n
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Jak wybrać odpowiednią bibliotekę i18n dla Solid

Model reaktywności Solid zmienia to, co biblioteka i18n musi robić. Komponenty uruchamiają się tylko raz, więc tłumaczenie zapisane w `const` na etapie setupu jest zamrożonym ciągiem znaków (frozen string), a biblioteka, która zwraca zwykłe stringi zamiast akcesorów (accessors), wygeneruje stronę zmieniającą język wszędzie z wyjątkiem trzech komponentów, w których ktoś tak zrobił. Wybór biblioteki dla Solid to częściowo kwestia API, a częściowo tego, która z nich utrudnia popełnienie tego błędu.

Ten przewodnik przedstawia pytania, na które należy odpowiedzieć w pierwszej kolejności, a następnie odnosi je do `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` oraz Intlayer, zarówno dla konfiguracji Vite + Solid, jak i SolidStart.

![Ekosystem bibliotek i18n dla Solid](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Spis treści

<TOC/>

## Sześć pytań, na które warto odpowiedzieć przed porównaniem bibliotek

1. **Vite SPA czy SolidStart?** W SPA locale może znajdować się w signale i nigdzie indziej. W SolidStart locale musi być resolwowane na serwerze z adresu URL, a wszystko, co crawler musi zobaczyć bez JavaScriptu (`<html lang>`, `hreflang`), należy umieścić w `entry-server.tsx`.
2. **Jak reaktywna musi być zmiana locale?** Pełne przeładowanie strony przy przełączeniu jest akceptowalne dla niektórych aplikacji. Jeśli nie, wartości dostarczane przez bibliotekę muszą być signalami lub akcesorami, a ich odczyt musi być śledzony (tracked), a nie kopiowany.
3. **Kto pisze tłumaczenia?** Deweloperzy, TMS, agencja dostarczająca ciągi ICU, czy pipeline AI. `solid-i18next` obsługuje format i18next. `@solid-primitives/i18n` bazuje na dowolnym obiekcie słownika. Dopasuj wybór do vendora.
4. **Ile jest locales i stron?** Dwa locales i pięć stron może dostarczyć wszystko na raz. Dziesięć locales i czterdzieści routów już nie, a lazy catalogs wraz ze scopingiem stają się głównym kosztem.
5. **Czy potrzebujesz typowania kluczy?** `@solid-primitives/i18n` wnioskuje je z obiektu źródłowego słownika. `solid-i18next` wymaga ręcznej deklaracji. Biblioteki działające w czasie kompilacji (compile-time) generują je automatycznie.
6. **Jak dużego zakresu funkcji potrzebujesz?** Obsługa cookies, routing z prefiksem locale, przekierowania, formatowania (formatters). Najlżejsza opcja nie ma niczego z tego, i jest to w porządku, dopóki nagle nie przestanie wystarczać.

Zapisz odpowiedzi. Wszystko poniżej odnosi się do nich.

## Krajobraz w jednym obrazie

Solid jest najmłodszym ekosystemem w tym zestawieniu i ma najmniej opcji, podzielonych na trzy fale.

![Historia bibliotek i18n w JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Słowniki runtime: solid-i18next">

i18next opakowany dla Solid. Namespaces, backendy, detektory i dekada ekosystemu pluginów. Najcięższa z opcji i te same koszty `t("a.b")` co w React.

</Accordion>
<Accordion header="Minimalistyczne prymitywy (2022): @solid-primitives/i18n">

Płaski słownik, który sam kontrolujesz, `translator()` zwracający akcesory, typy wnioskowane z obiektu źródłowego. Bardzo lekki, bez scopingu, bez routingu, bez formatters. Domyślny wybór społeczności.

</Accordion>
<Accordion header="Kompilator i kolokowany content (2024 do 2026): Paraglide, Intlayer, @lingui/solid">

Paraglide generuje jedną funkcję na każdy komunikat. Intlayer deklaruje content per komponent w plikach `.content.ts` i zwraca węzły oparte na signalach. Integracja Lingui z Solid pojawiła się w 2026 roku i przynosi ekstrakcję opartą na makrach.

</Accordion>
</AccordionGroup>

Post dotyczący [historii JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md) szczegółowo omawia każdą z tych fal.

## Najważniejsza decyzja: gdzie znajduje się content i kiedy się ładuje

Dwa wybory architektoniczne wyjaśniają większość różnic w bundle size pomiędzy rozwiązaniami:

- **Scentralizowany lub zescopowany content.** Jeden słownik dla całej aplikacji lub pojedyncza deklaracja na komponent.
- **Import statyczny lub dynamiczny.** Wszystko ładowane przy starcie lub aktywne locale (i optymalnie aktywny route) pobierane na żądanie.

Wykres przedstawia szacunkowy payload dla teoretycznej aplikacji posiadającej od 1 do 10 stron, przetłumaczonej na od 1 do 10 locales, z około 30 KB tekstu na stronę.

![Teoretyczny wyciek zawartości w zależności od architektury](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n` nie narzuca niczego w żadnej z tych osi: używasz `createResource` do załadowania słownika per locale, co daje dynamiczne ładowanie, a reszta leży po Twojej stronie. `solid-i18next` posiada namespaces i lazy backendy, ale nic nie wymusza odpowiedniego mapowania, więc współdzielony komponent importujący `common` sprawia, że staje się on zależnością każdego route'a. Paraglide obsługuje oś podziału na strony dzięki tree-shakingowi, chociaż nie zadziałało to w implementacji [benchmarku Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/solid.md). Intlayer realizuje to poprzez deklaracje per komponent.

Jeśli Twoją odpowiedzią na pytanie 4 było "wiele stron", potraktuj tę sekcję priorytetowo ponad preferencje dotyczące API. Artykuł [per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md) omawia kwestię utrzymania kodu przy tych samych kompromisach.

## Kandydaci

Rozmiary bibliotek pochodzą z [benchmarku Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/solid.md): provider plus akcesor w pustym komponencie, po bundlowaniu, tree-shakingu i minifikacji, dla aplikacji z 10 stronami i 10 locales. Content mierzony jest osobno.

| Biblioteka               | Model contentu                                 | Reaktywność przy zmianie locale                    | Bezpieczeństwo typów                   | Scoping i lazy loading      | Rozmiar biblioteki                                   |
| :----------------------- | :--------------------------------------------- | :------------------------------------------------- | :------------------------------------- | :-------------------------- | :--------------------------------------------------- |
| `@solid-primitives/i18n` | Płaski słownik pod Twoją kontrolą              | Signal, akcesory zwracane przez translator         | 3/5 — Wnioskowane z obiektu źródłowego | Brak wbudowanego            | ~0.6 kB                                              |
| `solid-i18next`          | Katalogi i namespaces i18next                  | Store, re-render przez provider                    | 2/5 — Ręczna deklaracja                | Namespaces, lazy backendy   | ~14.9 kB                                             |
| Paraglide                | Projekt inlang, wygenerowane funkcje           | Odczyt per call z cookie lub storage               | 3.5/5 — Wygenerowane                   | Tree-shaking (brak w bench) | Bliski zera (dzięki kodowi generowanemu w projekcie) |
| `@lingui/solid`          | Tekst źródłowy w kodzie, skompilowane katalogi | Oparte na signalach                                | 2/5 — Z kompilatora                    | Per katalog                 | ~11.8 kB                                             |
| Intlayer                 | Jeden `.content.ts` na komponent               | Węzły oparte na signalach, brak re-runu komponentu | 5/5 — Wygenerowane, domyślnie włączone | Tak, per komponent          | ~4.3 kB                                              |

> Liczby są migawką dla wersji z benchmarku. Rozmiar `@lingui/solid` pochodzi z benchmarku TanStack Start. Uruchom testy na własnej aplikacji przed podjęciem decyzji wyłącznie na podstawie rozmiaru.
> Bezpieczeństwo typów: 5/5 oznacza, że klucze, parametry i każda lokalizacja są sprawdzane bez ręcznej konfiguracji, w tym formatery URL i helpery.

Rozmiar biblioteki Paraglide bliski zeru wynika z jej konstrukcji: runtime jest generowany bezpośrednio w Twoim repozytorium. Intlayer wymaga `vite-intlayer`, więc nie może działać bez etapu budowania (build step).

## Dopasuj swoje odpowiedzi do biblioteki

<AccordionGroup>
<Accordion header="Vite SPA, mały katalog, chcesz prostoty bez zbędnego narzutu">

`@solid-primitives/i18n`. Płaski słownik, `translator()` zwracający akcesory, typy wnioskowane bez dodatkowej konfiguracji. To właściwy wybór dla małej aplikacji, a przeczytanie kodu źródłowego zajmuje dziesięć minut. Co musisz napisać samodzielnie: utrwalanie locale (persistence), routing, formatters i podział per route. Jeśli ta lista rośnie, to sygnał do zmiany rozwiązania.

</Accordion>
<Accordion header="Przejście z React z istniejącym codebase i18next">

`solid-i18next` pozwala na ponowne wykorzystanie katalogów, namespaces, backendów i detektorów w niezmienionej formie. Jest to najcięższa opcja niosąca te same koszty co `react-i18next`: ręczna deklaracja typów, optymalizacje, które są możliwe, ale czasochłonne, oraz `t()` zwracające string, przez co łatwo doprowadzić do błędu zamrożonego tłumaczenia (frozen translation). Opakuj odczyty w JSX lub memo i nigdy nie zapisuj ich bezpośrednio na etapie setupu.

</Accordion>
<Accordion header="SolidStart z trasami z prefiksem locale i SSR">

Locale musi pochodzić z adresu URL na serwerze, aby obie strony były zgodne; wykrywanie go na kliencie następuje zbyt późno. `@solid-primitives/i18n` oraz `solid-i18next` pozostawiają obsługę trasy `[[locale]]`, `matchFilters`, przekierowania i tagi w `entry-server.tsx` Tobie. Paraglide posiada plugin Vite obsługujący routing. Intlayer dostarcza middleware oraz helpery tras. Niezależnie od wyboru, umieść `<html lang>` i `hreflang` w `entry-server.tsx`; `@solidjs/meta` działa na kliencie dopiero po hydratacji w SolidStart v2. Artykuł o [Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/list_i18n_technologies/frameworks/solid.md) opisuje tę konfigurację krok po kroku.

</Accordion>
<Accordion header="Zmiana locale musi być natychmiastowa i precyzyjna (fine-grained)">

Wybierz bibliotekę, której wartości są signalami lub akcesorami i której odczyty są śledzone. Akcesory `@solid-primitives/i18n` oraz węzły Intlayer aktualizują wyłącznie te węzły DOM, które je odczytują, bez ponownego uruchamiania komponentu (re-run). `solid-i18next` wykonuje re-render poprzez provider. Paraglide odczytuje locale z cookie lub storage przy każdym wywołaniu komunikatu zamiast z signala, co działa, ale wykonuje więcej pracy per węzeł niż powinno.

</Accordion>
<Accordion header="Duża aplikacja, wiele tras, rygorystyczny budżet bundle size">

Zescopowany content kompilowany w czasie budowania. Intlayer dostarcza tylko to, co dany route faktycznie renderuje. Paraglide powinien osiągnąć to poprzez tree-shaking; zweryfikuj to w swojej konfiguracji, ponieważ w konfiguracji benchmarku to nie zadziałało. W przypadku `solid-i18next` zaplanuj strategię namespaces i lazy-loadingu już pierwszego dnia i egzekwuj ją podczas code review.

</Accordion>
<Accordion header="Bezpieczeństwo typów (type safety) to wymóg bezwzględny">

`@solid-primitives/i18n` zapewnia wnioskowane typy od ręki, co jest lepszym wynikiem niż oferuje większość bibliotek w ekosystemie React. W przypadku generowanych typów, które zachowują spójność przy lazy loadingu i podziale per route, Paraglide, `@lingui/solid` oraz Intlayer generują je bezpośrednio z contentu. Artykuł o [wykrywaniu brakujących tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/detecting_missing_translations.md) porównuje to, co każde rozwiązanie wyłapuje na etapie budowania.

</Accordion>
<Accordion header="Tłumaczenia będą generowane przez AI">

Wtedy scentralizowany słownik traci rację bytu. Kolokowany content wraz z CLI uzupełniającym brakujące locales to znacznie krótsza droga. Komenda `fill` w Intlayer działa z Twoim własnym kluczem API (OpenAI, Anthropic, Mistral, Gemini) i tłumaczy ponownie tylko to, co uległo zmianie.

</Accordion>
</AccordionGroup>

## Ograniczenia poszczególnych bibliotek

- **`@solid-primitives/i18n`**: brak lazy loadingu czy scopingu poza tym, co sam zbudujesz, brak routingu, brak obsługi cookies, brak formatters. Doskonałe dla małych aplikacji, szybko staje się niewystarczające w projektach profesjonalnych.
- **`solid-i18next`**: najcięższa z opcji, ręczne typowanie, własny format liczb mnogich (plurals), a `t()` zwraca string, przez co tłumaczenia ulegają zamrożeniu, jeśli zostaną zapisane w setupie.
- **Paraglide**: wygenerowane pliki commitowane do repozytorium i regenerowane przed każdym pushem, tree-shaking nie zadziałał w benchmarku Solid, a locale jest odczytywane ze storage per call zamiast z signala.
- **`@lingui/solid`**: nowość z 2026 roku, więc brak jeszcze szerszego feedbacku produkcyjnego. Dziedziczy etap budowania Lingui `extract` / `compile` oraz kilka nakładających się na siebie składni.
- **Intlayer**: wymagany plugin do buildera, mniejszy ekosystem, częściowe wsparcie dla ICU oraz content rozproszony po codebase z założenia, więc wyeksportowanie jednego pliku JSON dla tłumacza wymaga dedykowanych narzędzi.

## Jak każda opcja wygląda w kodzie

Ten sam komponent, podsumowanie koszyka z tytułem i liczbą mnogą, napisany przy użyciu każdego kandydata. Zwróć uwagę, gdzie odczytywane jest tłumaczenie: w JSX jest śledzone, w ciele setupu staje się zamrożonym ciągiem znaków.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";

export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export const dictionary = () => i18n.flatten(en);
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Klucze są typowane na podstawie obiektu angielskiego bez konieczności generowania kodu (codegen). Brak wbudowanej reguły liczb mnogich, lazy loadingu i routingu; każdy z tych elementów należy dodać we własnym zakresie.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

Katalogi, namespaces i pluginy i18next w standardowej postaci. `t` zwraca string, więc `const title = t("cart:title")` w setupie zamraża wartość; wywołanie należy zachować wewnątrz JSX.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Każdy komunikat to wygenerowana, typowana funkcja. Locale jest odczytywane z cookie lub storage przy każdym wywołaniu, a nie z signala, więc podpięcie reaktywności przy przełączaniu leży po Twojej stronie.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: plural({
      one: t({ en: "{{count}} item", fr: "{{count}} article" }),
      other: t({ en: "{{count}} items", fr: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Wszystkie locales w jednym pliku obok komponentu. `useIntlayer` zwraca węzły oparte na signalach, więc zmiana locale aktualizuje wyłącznie te węzły DOM, które je odczytują. `{content.title}` w JSX jest śledzone; `content.title.value` w ciele setupu nie jest.

  </Tab>
</Tabs>

W przypadku istniejącego codebase opartego na i18next, [adapter kompatybilności i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/i18next.md) tworzy alias pakietu na poziomie bundlera, dzięki czemu katalogi i `t()` nadal działają, podczas gdy Intlayer serwuje content, a [przewodnik migracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md) opisuje pozostałe kroki.

## Zanim podejmiesz decyzję

Tabela funkcji informuje o tym, co biblioteka potrafi dzisiaj. Poniższe punkty pokazują, jak będzie wyglądała codzienna praca z nią.

**Sprawdź aktywność w repozytorium.**

Commit'y, czas odpowiedzi na issues oraz to, czy ostatni minor release ukazał się w tym roku. Przemyślana architektura bez maintainera to po prostu odroczona migracja.

**Nie wybieraj na podstawie liczby pobrań z npm.**

Najczęściej instalowana biblioteka to ta, która pojawiła się jako pierwsza, a nie ta, która najlepiej pasuje do codebase Solid w 2026 roku. Liczba pobrań mierzy historię, a nie dopasowanie do potrzeb.

![Tier lista bibliotek i18n w JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Sprawdź, kto finansuje maintainera i co sprzedaje.**

`i18next` (stojący za `solid-i18next`) jest wspierany przez Locize. `next-intl`, `vue-i18n`, `svelte-i18n` oraz Lingui są wspierane przez Crowdin. Tolgee, Paraglide (inlang) i Intlayer prowadzą własne platformy. Vendor, którego przychód opiera się na hostowaniu tłumaczeń, nie ma interesu w tym, aby tłumaczenie wewnątrz Twojego toolchaina było bezpłatne. Intlayer jest jedynym rozwiązaniem w tym zestawieniu, które oferuje tłumaczenie AI przez CLI z Twoim własnym kluczem API oraz CMS, który możesz hostować samodzielnie (self-host).

**Czy biblioteka jest gotowa na współpracę z AI agentami?**

Agenci wciąż miewają trudności z i18n: pomijają locales, wymyślają klucze i mieszają składnie komunikatów. Czy biblioteka dostarcza [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md) lub [serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md), aby agent mógł listować, uzupełniać i testować content? I czy ładowanie contentu jest domyślnie zoptymalizowane, czy też ktoś musi co kwartał robić przegląd namespaces i lazy importów?

**Bezpieczeństwo typów (type safety) po wyjęciu z pudełka.**

Nie na zasadzie "można otypować po dodatkowej konfiguracji", ale "błędny klucz powoduje błąd `tsc` na świeżej instalacji". Sprawdź, co dzieje się w przypadku nieistniejącego klucza oraz w przypadku locale, w którym brakuje jednego tłumaczenia.

**Wykrywanie nieużywanego contentu.**

Katalogi z czasem tylko rosną. Build Intlayer usuwa nieużywane pola i loguje je (`build.purge`). Paraglide osiąga to dzięki swojej architekturze, ponieważ niewywołana funkcja komunikatu podlega tree-shakingowi. Pozostałe biblioteki pozostawiają to czyszczenie Tobie.

**Developer experience.**

Czas konfiguracji do pierwszego przetłumaczonego stringa, [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md) lub [rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md) wyświetlające tłumaczenie po najechaniu kursorem (hover) i przenoszące do deklaracji, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md) do operacji fill, test i push, [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) lub ekstraktor, który wyciąga zakodowane na stałe ciągi z komponentów, aby nie zarządzać każdym ciągiem klucz po kluczu, a także sposób na edycję contentu przez osoby nietechniczne ([edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)) bez konieczności tworzenia pull requesta.

## Najczęściej zadawane pytania

<FAQ>

<Question title="Czy @solid-primitives/i18n wystarczy dla aplikacji produkcyjnej?">

Dla małej aplikacji tak, i jest to najlżejsza dostępna opcja. Przestaje wystarczać, gdy potrzebujesz lazy catalogs per route, routingu locale w SolidStart, utrwalania w cookies lub formatters, ponieważ wszystko to musisz zbudować samodzielnie.

</Question>

<Question title="Dlaczego moje tłumaczenie nie aktualizuje się po zmianie locale?">

Ponieważ komponenty Solid uruchamiają się tylko raz. Tłumaczenie przypisane do `const` na etapie setupu to zwykły string, a nie subskrypcja. Odczytuj je wewnątrz JSX, effecta lub memo, albo wybierz bibliotekę, której wartości są akcesorami, co utrudnia napisanie błędnej wersji.

</Question>

<Question title="Czy potrzebuję biblioteki opartej na kompilatorze?">

Tylko wtedy, gdy budżet bundle size, wygenerowane typy lub weryfikacja brakujących kluczy na etapie budowania są rzeczywistymi wymaganiami. Artykuł [compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md) wyjaśnia, co dają kompilatory i gdzie mogą sprawiać problemy.

</Question>

<Question title="Czy wybór biblioteki wpływa na SEO?">

Pośrednio. Crawlery zwracają uwagę na routing, `hreflang`, `<html lang>` oraz na to, czy tekst znajduje się w kodzie HTML wyrenderowanym po stronie serwera, co w SolidStart oznacza konfigurację w `entry-server.tsx`. Zobacz [przewodnik po hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Dowiedz się więcej

- [Benchmark Solid i18n: bundle size, wycieki danych i czasy przełączania locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/solid.md)
- [Solid i18n: dlaczego tłumaczenia zamrażają się przy zmianie locale](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/list_i18n_technologies/frameworks/solid.md)
- [Adapter kompatybilności i18next (drop-in)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/i18next.md) oraz [przewodnik migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md)
- [Historia JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md)
- [Compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md)
- [Jak działa optymalizacja paczki (bundle optimization) na etapie budowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md)
- [Konfiguracja i18n w aplikacji Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+solid.md) oraz w [aplikacji SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_solid_start.md)
- Ten sam przewodnik dla [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_vue_i18n_library.md) oraz [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_svelte_i18n_library.md)
