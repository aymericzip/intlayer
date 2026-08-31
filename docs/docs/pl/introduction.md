---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Wprowadzenie
description: Dowiedz się, jak działa Intlayer. Zobacz kroki, których używa Intlayer w Twojej aplikacji. Sprawdź, co robią poszczególne pakiety.
keywords:
  - Wprowadzenie
  - Jak zacząć
  - Intlayer
  - Aplikacja
  - Pakiety
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Dokumentacja Intlayer

Witamy w oficjalnej dokumentacji Intlayer! Tutaj znajdziesz wszystko, czego potrzebujesz, aby zintegrować, skonfigurować i opanować Intlayer dla wszystkich Twoich potrzeb związanych z internacjonalizacją (i18n), niezależnie od tego, czy pracujesz z Next.js, React, Vite, Express, czy w innym środowisku JavaScript.

## Wprowadzenie

### Czym jest Intlayer?

**Intlayer** to biblioteka internacjonalizacji zaprojektowana specjalnie dla programistów JavaScript. Pozwala ona na deklarowanie treści w dowolnym miejscu Twojego kodu. Przekształca deklaracje wielojęzycznych treści w ustrukturyzowane słowniki w celu ich łatwej integracji z Twoim kodem. Wykorzystując TypeScript, **Intlayer** sprawia, że Twoje tworzenie oprogramowania jest solidniejsze i bardziej wydajne.

Intlayer udostępnia również opcjonalny edytor wizualny, który pozwala w prosty sposób edytować i zarządzać treścią. Ten edytor jest szczególnie przydatny dla programistów, którzy preferują wizualny interfejs do zarządzania treścią, lub dla zespołów generujących treści bez konieczności przejmowania się kodem.

### Przykład użycia

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      pl: "Witaj świecie",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "pl": "Witaj świecie"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Dlaczego Intlayer, a nie alternatywy?

W porównaniu do wiodących rozwiązań takich jak `next-intl` lub `i18next`, Intlayer to rozwiązanie, które ma zintegrowane optymalizacje, takie jak:

<AccordionGroup>

<Accordion header="Rozmiar paczki (Bundle size)">

Zamiast pobierać ogromne pliki JSON do Twoich stron, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary Twojego kodu wynikowego oraz stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość w utrzymaniu (Maintainability)">

Ograniczanie zasięgu (scoping) treści Twojej aplikacji **ułatwia utrzymanie** dużych projektów. Możesz skopiować lub usunąć folder pojedynczej funkcjonalności bez obciążania umysłu koniecznością przeglądania całej bazy kodu treści. Ponadto, Intlayer jest **w pełni zadeklarowany statycznie (fully typed)**, co gwarantuje poprawność Twojej treści.

</Accordion>

<Accordion header="Agent AI">

Wspólne umiejscowienie (co-locating) kodu i treści **zmniejsza kontekst wymagany** przez duże modele językowe (LLM). Intlayer jest również dostarczany z pakietem narzędzi, takim jak **CLI** służącym do testowania pod kątem brakujących tłumaczeń, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)** oraz **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**, dzięki czemu środowisko programistyczne (DX) dla agentów AI staje się znacznie wygodniejsze.

</Accordion>

<Accordion header="Automatyzacja">

Skorzystaj z automatyzacji, by tłumaczyć w Twoim potoku CI/CD, używając wybranego modelu LLM zgodnie z kosztem Twojego dostawcy AI. Intlayer oferuje również **kompilator**, aby automatyzować wyciąganie treści, a także [platformę webową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), by pomóc **tłumaczyć w tle**.

</Accordion>

<Accordion header="Wydajność (Performance)">

Podłączanie ogromnych plików JSON do komponentów może prowadzić do problemów z wydajnością i reaktywnością. Intlayer optymalizuje proces ładowania Twojej treści w fazie budowania (build time).

</Accordion>

<Accordion header="Skalowanie bez angażowania programistów (Scaling with non-dev)">

Więcej niż rozwiązanie i18n — Intlayer dostarcza **samodzielnie hostowany [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)** oraz **[w pełni wyposażony system CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)**, który pomaga zarządzać Twoimi wielojęzycznymi treściami **w czasie rzeczywistym**, umożliwiając bezproblemową współpracę między tłumaczami, twórcami treści i pozostałymi członkami zespołu. Treść można przechowywać lokalnie i/lub zdalnie.

</Accordion>
</AccordionGroup>

## Główne funkcje

Intlayer oferuje szereg funkcji dostosowanych do potrzeb nowoczesnego tworzenia stron internetowych. Poniżej znajdują się kluczowe funkcje wraz z linkami do szczegółowej dokumentacji dla każdej z nich:

- **Wsparcie dla internacjonalizacji**: Zwiększ globalny zasięg swojej aplikacji dzięki wbudowanemu wsparciu dla internacjonalizacji.
- **Edytor Wizualny**: Usprawnij swój przepływ pracy za pomocą wtyczek edytora zaprojektowanych dla Intlayer. Sprawdź [Przewodnik po Edytorze Wizualnym](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).
- **Elastyczność Konfiguracji**: Dostosuj swoją konfigurację za pomocą rozbudowanych opcji konfiguracyjnych, wyszczególnonych w [Przewodniku po konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).
- **Zaawansowane Narzędzia CLI**: Zarządzaj efektywnie swoimi projektami przy użyciu interfejsu wiersza poleceń Intlayer. Odkryj możliwości w [Dokumentacji Narzędzi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

## Kluczowe Koncepcje

### Słownik (Dictionary)

Organizuj swoje wielojęzyczne treści w pobliżu kodu, aby zachować spójność i łatwość w utrzymaniu.

- **[Rozpocznij](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)**  
  Poznaj podstawy deklarowania treści w Intlayer.

- **[Tłumaczenie (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md)**  
  Zrozum, jak tłumaczenia są generowane, przechowywane i wykorzystywane w Twojej aplikacji.

- **[Wyliczenie (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/enumeration.md)**  
  Łatwo zarządzaj powtarzalnymi lub stałymi zestawami danych w różnych językach.

- **[Warunek (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/condition.md)**  
  Dowiedz się, jak stosować logikę warunkową w Intlayer, aby tworzyć dynamiczne treści.

- **[Wstawianie (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md)**  
  Odkryj, jak wstawiać wartości w łańcuch znaków przy użyciu znaczników (placeholders).

- **[Pobieranie przez Funkcje (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/function_fetching.md)**  
  Zobacz, jak dynamicznie pobierać treść za pomocą niestandardowej logiki, aby dopasować ją do przepływu pracy Twojego projektu.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md)**  
  Dowiedz się, jak używać Markdown w Intlayer, aby tworzyć wzbogacone teksty.

- **[Osadzanie Plików (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/file.md)**  
  Odkryj, jak osadzać zewnętrzne pliki w Intlayer, aby korzystać z nich w edytorze treści.

- **[Zagnieżdżanie (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/nesting.md)**  
  Zrozum, jak zagnieżdżać treści w Intlayer, aby budować złożone struktury.

### Środowiska i Integracje

Zbudowaliśmy Intlayer z myślą o elastyczności, oferując płynną integrację w obrębie popularnych frameworków i narzędzi do budowania:

- **[Intlayer z Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)**
- **[Intlayer z Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)**
- **[Intlayer z Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_14.md)**
- **[Intlayer z Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_page_router.md)**
- **[Intlayer z React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)**
- **[Intlayer z Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)**
- **[Intlayer z React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_react_router_v7.md)**
- **[Intlayer z Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)**
- **[Intlayer z React Native i Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_react_native+expo.md)**
- **[Intlayer z Lynx i React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_lynx+react.md)**
- **[Intlayer z Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+preact.md)**
- **[Intlayer z Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+vue.md)**
- **[Intlayer z Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nuxt.md)**
- **[Intlayer z Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+svelte.md)**
- **[Intlayer z SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_svelte_kit.md)**
- **[Intlayer z Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_express.md)**
- **[Intlayer z NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nestjs.md)**
- **[Intlayer z Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_hono.md)**
- **[Intlayer z Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_angular_21.md)**

Każdy przewodnik integracyjny zawiera najlepsze praktyki korzystania z funkcji Intlayer, takich jak **renderowanie po stronie serwera (SSR)**, **dynamiczne routowanie**, czy **renderowanie po stronie klienta**, dzięki czemu możesz utrzymać szybką, przyjazną dla SEO i wysoce skalowalną aplikację.

## Wnoszenie Wkładu i Opinie

Cenimy siłę open-source i tworzenia oprogramowania opartego o społeczność. Jeśli chciałbyś zaproponować usprawnienia, dodać nowy poradnik lub poprawić błędy w naszych dokumentach, śmiało wyślij Pull Request lub otwórz Issue w naszym [repozytorium GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Gotowy, aby tłumaczyć swoją aplikację szybciej i wydajniej?** Zanurz się w naszej dokumentacji, aby rozpocząć korzystanie z Intlayer już dziś. Doświadcz solidnego, zoptymalizowanego podejścia do internacjonalizacji, które sprawi, że Twoje treści będą uporządkowane, a Twój zespół bardziej produktywny.

## Często Zadawane Pytania

<FAQ>

<Question title="Do czego służy Intlayer?">

Intlayer to biblioteka internacjonalizacji (i18n) dla aplikacji JavaScript i TypeScript. Deklarujesz treść komponentu obok samego komponentu w pliku `.content.ts`, Intlayer kompiluje te deklaracje w typowane słowniki w czasie budowy, a Twoje komponenty odczytują je za pomocą hooka, takiego jak `useIntlayer`. Obejmuje tłumaczenia, reguły liczby mnogiej, płeć, Markdown, routing uwzględniający lokalizację, metadane SEO, tłumaczenia ze wsparciem AI oraz edytor wizualny dla osób nietechnicznych.

</Question>

<Question title="O ile i18n zwiększa rozmiar mojego bundle'a?">

Znacznie mniej niż rozwiązania oparte na przestrzeniach nazw, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Znaczniki renderowane po stronie serwera rozwiązują treść na serwerze, a kompilator czasu budowy zastępuje wywołania `useIntlayer` dokładnymi wpisami, których używa komponent, dzięki czemu nieużywane klucze i nieużywane języki są usuwane. [Słowniki dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę na poszczególne języki. W porównaniu z typowymi alternatywami, Intlayer zmniejsza rozmiar bundle'a i strony nawet o 50%. Zobacz [optymalizację bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="Czy mogę zmigrować z i18next, next-intl lub react-i18next bez przepisywania moich komponentów?">

Tak, i są dwie drogi. Możesz migrować treść stopniowo za pomocą [przewodnika migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md) lub [przewodnika migracji z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md). Możesz także zachować obecne API w całości: [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) udostępniają dokładnie to samo API co `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` i `Lingui`, ale zasilane słownikami Intlayer, więc zmieniają się importy, a kod komponentów pozostaje nienaruszony.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. Wtyczka [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. Wtyczka [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić zawartość według języka zamiast grupować lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje pliki źródłowe, wyodrębni ciągi widoczne dla użytkownika i utworzy plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast ręcznie kopiować ciągi do katalogu pojedynczo. Zobacz [polecenie extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md).

W przypadku w pełni zautomatyzowanego procesu [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie budowania w kodzie JSX, TSX, Vue i Svelte, generując słowniki przy każdej zmianie, dzięki czemu nie ma potrzeby ręcznego zarządzania kluczami. Działa on w oparciu o analizę statyczną, więc ciągi istniejące tylko w czasie wykonywania pozostają poza jego zasięgiem i wymaga kilku adnotacji do odróżnienia tekstu dla użytkownika od logiki aplikacji.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku treści, który go deklaruje, wyodrębnianie treści z komponentu oraz uruchamianie build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: taka sama świadomość w dowolnym edytorze obsługującym LSP, z funkcjami przejdź do definicji (go to definition), znajdź wszystkie referencje, podglądem przetłumaczonej wartości po najechaniu kursorem, autouzupełnianiem kluczy i pól oraz ostrzeżeniem, gdy klucz nie jest nigdzie zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, co ułatwia migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystent odpowiada na podstawie aktualnej dokumentacji zamiast zgadywać i może samodzielnie wykonywać polecenia, takie jak `intlayer fill`.
- **[Umiejętności agenta (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz po jednej dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` oznacza zakodowane na stałe ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słownika i nieużywanej zawartości.

</Question>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji aplikacji JavaScript?">

Obszar ten dzieli się na trzy generacje:

- **Biblioteki katalogów w czasie działania (runtime)**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. Wiadomości znajdują się w przestrzeniach nazw JSON ładowanych w runtime. Dojrzałe i niezależne od frameworka, ale bez typowania statycznego i przesyłające cały katalog na klienta.
- **Biblioteki wiadomości w czasie kompilacji**: `Lingui`, `Paraglide`, `react-intl` oraz `next-intl` z etapem ekstrakcji. Lepsze zachowanie bundle'a i częściowe typowanie, ale wciąż zależne od scentralizowanych katalogów.
- **Biblioteki z warstwą treści (Content layer)**: `Intlayer`. Treść deklarowana per komponent i kompilowana per komponent, łącząca typowanie, tree-shaking, narzędzia deweloperskie i edycję w jednym źródle prawdy.

Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="Które frameworki obsługuje Intlayer?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro z dowolnymi wyspami (islands), React Native z Expo, Lynx, a po stronie backendu Express, Fastify, NestJS, Hono, Elysia i AdonisJS. Każdy z nich ma dedykowany przewodnik w sekcji środowisk.

</Question>

<Question title="Dlaczego deklarować treść obok komponentu zamiast w centralnym pliku JSON?">

Z trzech powodów: po pierwsze, strona dostarcza tylko te wpisy, które faktycznie renderują jej komponenty, zamiast całej przestrzeni nazw, co znacznie zmniejsza bundle. Po drugie, katalog funkcji można przenosić lub usuwać autonomicznie bez szukania osieroconych kluczy. Po trzecie, modele LLM lub agenci AI edytujący komponent widzą treść w tym samym folderze, co zapewnia wyższą dokładność. Zobacz [jak działa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/how_works_intlayer.md).

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację za pomocą AI?">

Uruchom `npx intlayer fill`. Narzędzie CLI wykrywa brakujące tłumaczenia i uzupełnia je za pomocą wybranego modelu LLM, korzystając z Twojego dostawcy i klucza API, płacąc bezpośrednio swojemu dostawcy AI. Flaga `--git-diff` ogranicza operację do treści zmienionych na bieżącej gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="Jak znaleźć brakujące tłumaczenia?">

Uruchom `npx intlayer test`. Polecenie kończy się błędem, gdy w zadeklarowanym języku brakuje treści, co uniemożliwia trafienie nieprzetłumaczonego tekstu na produkcję. Rozszerzenie VS Code wyświetla te same błędy bezpośrednio w edytorze, a wtyczka ESLint oznacza nieopakowane teksty regułą `no-raw-text`. Zobacz [testowanie treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md).

</Question>

<Question title="Czy muszę umieszczać lokalizację w adresie URL?">

Nie. Opcja `routing.mode` przyjmuje `"prefix-no-default"` (domyślnie: `/about` i `/pl/about`), `"prefix-all"`, `"no-prefix"` oraz `"search-params"`, a opcja `routing.domains` pozwala przypisać każdy język do własnej domeny. Niezależnie od schematu funkcja `getMultilingualUrls` tworzy linki alternatywne `hreflang` dla metadanych i sitemapy. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Question>

<Question title="Jak tłumacze i edytorzy treści mogą pracować bez dotykania kodu?">

Edytor wizualny działa na Twojej własnej infrastrukturze i pozwala każdemu klikać w tekst działającej aplikacji w celu jego edycji, zapisując zmiany z powrotem do bazy kodu. CMS wyodrębnia treść, dzięki czemu można ją modyfikować bez ponownego wdrażania, a funkcja synchronizacji na żywo (live sync) aplikuje aktualizacje w locie. Zobacz [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) oraz [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak. Intlayer jest projektem open source na licencji Apache 2.0. Biblioteka, CLI, kompilator i edytor wizualny są bezpłatne do użytku komercyjnego. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>
