---
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: Plan rozwoju
description: Odkryj plan rozwoju Intlayer. Zobacz wszystkie funkcje, które Intlayer zaimplementował i planuje zaimplementować.
keywords:
  - Plan rozwoju
  - Intlayer
  - Internacjonalizacja
  - CMS
  - System zarządzania treścią
  - Edytor wizualny
slugs:
  - doc
  - roadmap
history:
  - version: 5.5.10
    date: 2025-06-30
    changes: Dodano wsparcie dla Preact i Nuxt, serwer MCP, aktualizacja CLI
  - version: 5.5.11
    date: 2025-06-29
    changes: Dodano polecenia `docs`
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Intlayer: Przegląd funkcji i plan rozwoju

Intlayer to rozwiązanie do zarządzania treścią i internacjonalizacji, zaprojektowane tak, aby usprawnić sposób deklarowania, zarządzania i aktualizacji treści w Twoich aplikacjach. Oferuje potężne funkcje, takie jak scentralizowana lub rozproszona deklaracja treści, rozbudowane opcje internacjonalizacji, wsparcie dla Markdown, renderowanie warunkowe, integrację z TypeScript/JavaScript/JSON i wiele więcej. Poniżej znajduje się kompleksowy przegląd tego, co Intlayer obecnie oferuje, a także nadchodzące funkcje w planie rozwoju.

---

## Spis treści

<TOC/>

---

## Obecne funkcje

### 1. Deklaracja treści

#### Scentralizowana lub rozproszona

- **Scentralizowana**: Deklaruj całą swoją treść w jednym, dużym pliku u podstawy aplikacji, podobnie jak w i18next, aby zarządzać wszystkim w jednym miejscu.
- **Rozproszona**: Alternatywnie podziel swoją treść na osobne pliki na poziomie komponentów lub funkcji, aby ułatwić utrzymanie. Dzięki temu Twoja treść pozostaje blisko odpowiedniego kodu (komponenty, testy, Storybook itp.). Usunięcie komponentu powoduje również usunięcie powiązanej z nim treści, zapobiegając pozostawianiu niepotrzebnych danych zaśmiecających bazę kodu.

> Zasoby:
>
> - [Deklaracja treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)

### 2. Internacjonalizacja

- Wsparcie dla **230 języków i lokalizacji** (w tym warianty regionalne, takie jak francuski (Francja), angielski (Kanada), angielski (Wielka Brytania), portugalski (Portugalia) itd.).
- Łatwe zarządzanie tłumaczeniami dla wszystkich tych lokalizacji z jednego miejsca.

> Zasoby:
>
> - [Internacjonalizacja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md)

### 3. Wsparcie Markdown

- Deklaruj treść za pomocą **Markdown**, co pozwala automatycznie formatować tekst za pomocą akapitów, nagłówków, linków i innych elementów.
- Idealne do wpisów na blogu, artykułów, stron dokumentacji lub każdego scenariusza, w którym potrzebne jest formatowanie tekstu bogatego.

> Zasoby:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md)

### 4. Wsparcie plików zewnętrznych

- Importuj treści z plików zewnętrznych w formacie tekstowym, takich jak TXT, HTML, JSON, YAML lub CSV.
- Użyj funkcji `file` w Intlayer, aby osadzić zawartość pliku zewnętrznego w słowniku, zapewniając płynną integrację z Intlayer Visual Editor i CMS.
- Obsługuje dynamiczne aktualizacje treści, co oznacza, że gdy plik źródłowy zostanie zmodyfikowany, treść jest automatycznie aktualizowana w Intlayer.
- Umożliwia zarządzanie treściami wielojęzycznymi poprzez dynamiczne łączenie plików Markdown specyficznych dla języka.

> Zasoby:
>
> - [Osadzanie treści z plików](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/file.md)

### 5. Dynamiczna treść i pobieranie funkcji

Intlayer oferuje różne metody wstawiania i zarządzania dynamiczną treścią, zapewniając elastyczność i adaptacyjność w dostarczaniu treści. Obejmuje to funkcje do dynamicznego wstawiania treści, renderowania warunkowego, enumeracji, zagnieżdżania oraz pobierania funkcji.

1. Dynamiczne wstawianie treści

   Użyj funkcji insert, aby zdefiniować treść z miejscami na dane ({{name}}, {{age}} itd.).

   Umożliwia tworzenie treści podobnych do szablonów, które dostosowują się na podstawie danych wprowadzonych przez użytkownika, odpowiedzi API lub innych dynamicznych źródeł danych.

   Działa bezproblemowo z konfiguracjami TypeScript, ESM, CommonJS oraz JSON.

   Łatwo integruje się z React Intlayer i Next Intlayer za pomocą useIntlayer.

2. Renderowanie warunkowe

   Definiuj treści, które dostosowują się na podstawie warunków specyficznych dla użytkownika, takich jak język czy status uwierzytelnienia.

   Twórz spersonalizowane doświadczenia bez konieczności duplikowania treści w wielu plikach.

3. Enumeracja i pluralizacja

   Użyj funkcji enu, aby definiować warianty treści w oparciu o wartości liczbowe, zakresy lub niestandardowe klucze.

   Zapewnia automatyczny wybór poprawnej frazy na podstawie podanej wartości.

   Obsługuje reguły porządkowania, gwarantując przewidywalne zachowanie.

4. Zagnieżdżanie i odwoływanie się do podtreści

   Używaj funkcji nest, aby odwoływać się do i ponownie wykorzystywać treści z innego słownika, zmniejszając duplikację.

   Wspiera zarządzanie treściami w sposób strukturalny i hierarchiczny dla lepszej utrzymalności.

5. Pobieranie funkcji

   Intlayer pozwala deklarować treści jako funkcje, umożliwiając zarówno synchroniczne, jak i asynchroniczne pobieranie treści.

   Funkcje synchroniczne: Treść jest generowana dynamicznie w czasie budowania.

   Funkcje asynchroniczne: Pobierają dane dynamicznie z zewnętrznych źródeł (np. API, bazy danych).

   Integracja: Działa z TypeScript, ESM i CommonJS, ale nie jest wspierana w plikach JSON ani zdalnych plikach treści.

### 6. Format deklaracji treści

Intlayer obsługuje **TypeScript** (również JavaScript) oraz **JSON** do deklarowania treści.

- **TypeScript**:
  - Zapewnia poprawną strukturę treści oraz brak brakujących tłumaczeń.
  - Oferuje rygorystyczne lub bardziej elastyczne tryby walidacji.
  - Umożliwia dynamiczne pobieranie danych z zmiennych, funkcji lub zewnętrznych API.

- **JSON**:
  - Ułatwia integrację z zewnętrznymi narzędziami (np. edytorami wizualnymi) dzięki swojemu ustandaryzowanemu formatowi.

  > Zasoby:
  >
  > - [Formaty deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)

### 7. Czyszczenie, optymalizacja pakietu i dynamiczne importy

- Intlayer integruje wtyczki `Babel` i `SWC`, aby zoptymalizować twój pakiet i poprawić wydajność. Zastępuje importy, pozwalając na importowanie tylko tych słowników, które są używane w pakiecie.
- Aktywując tę opcję, Intlayer pozwala również na dynamiczne importowanie zawartości słownika tylko dla bieżącej lokalizacji.

> Zasoby:
>
> - [Konfiguracja budowania](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## Integracja z Frameworkami i Środowiskami

### 1. Next.js

#### a. Komponenty serwera i klienta

- Zapewnia **jednolite podejście do zarządzania treścią** zarówno dla komponentów serwera, jak i klienta.
- Oferuje wbudowany kontekst dla komponentów serwera, upraszczając implementację w porównaniu z innymi rozwiązaniami.

#### b. Metadane, mapy witryn i robots.txt

- Dynamicznie pobiera i wstrzykuje treści, aby generować metadane, mapy witryn lub pliki `robots.txt`.

#### c. Middleware

- Dodaj middleware, aby **przekierowywać użytkowników** do treści na podstawie ich preferowanego języka.

#### d. Kompatybilność z Turbopack i Webpack

- W pełni kompatybilny z nowym Turbopack Next.js oraz tradycyjnym Webpackiem.

> Zasoby:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

### 2. Vite

- Podobnie jak w Next.js, możesz zintegrować Intlayer z Vite i użyć **middleware** do przekierowywania użytkowników do treści na podstawie ich preferowanego języka.

> Zasoby:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)

### 3. Express

- Zarządzaj treścią i internacjonalizuj usługi backendowe oparte na Express.
- Personalizuj e-maile, komunikaty o błędach, powiadomienia push i inne za pomocą zlokalizowanego tekstu.

> Zasoby:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_express.md)

### 4. React Native

- Zintegruj Intlayer z React Native, aby zarządzać treściami i internacjonalizować swoje aplikacje mobilne.
- Wspiera platformy iOS oraz Android.

> Zasoby:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_react_native.md)

### 5. Lynx

- Zintegruj Intlayer z Lynx, aby zarządzać treściami i internacjonalizować swoje aplikacje mobilne.
- Wspiera platformy iOS oraz Android.

> Zasoby:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_lynx.md)

### 6. Vue

- Zintegruj Intlayer z Vue, aby zarządzać treściami i internacjonalizować swoje aplikacje Vite / Vue.js.

> Zasoby:
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vue.md)

### 7. Nuxt

- Zintegruj Intlayer z Nuxt, aby zarządzać treściami i internacjonalizować swoje aplikacje Nuxt / Vue.js.
- Obsługuje zarówno komponenty po stronie serwera, jak i klienta.
- Integruje routing i middleware, aby przekierowywać użytkowników do treści na podstawie ich preferowanego języka.

> Zasoby:
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nuxt.md)

### 8. Preact

- Zintegruj Intlayer z Preact, aby zarządzać treściami i internacjonalizować swoje aplikacje Preact.

> Zasoby:
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_preact.md)

---

## Edytory wizualne i CMS

### 1. Lokalny edytor wizualny

- **Darmowy, lokalny edytor wizualny**, który pozwala na edycję treści aplikacji poprzez bezpośredni wybór elementów na stronie.
- Integruje funkcje AI, które pomagają:
  - Generować lub poprawiać tłumaczenia
  - Sprawdzać składnię i pisownię
  - Sugerować ulepszenia
- Może być hostowany lokalnie lub wdrożony na zdalnym serwerze.

> Zasoby:
>
> - [Edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)

### 2. Intlayer CMS (Zdalny)

- **Hostowane rozwiązanie CMS**, które pozwala zarządzać treściami aplikacji online, bez konieczności ingerencji w bazę kodu.
- Oferuje funkcje wspomagane przez AI do deklarowania treści, zarządzania tłumaczeniami oraz poprawiania błędów składniowych i ortograficznych.
- Umożliwia interakcję z treściami poprzez interfejs Twojej działającej aplikacji.

> Zasoby:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)

---

## Rozszerzenia IDE

- Rozszerzenia dla głównych IDE, które zapewniają **graficzny interfejs** do zarządzania lokalnymi i zdalnymi tłumaczeniami.
- Funkcje mogą obejmować automatyczne generowanie plików deklaracji treści dla komponentów, bezpośrednią integrację z Intlayer CMS oraz walidację w czasie rzeczywistym.

---

## Serwer MCP

- **Serwer MCP**, który pozwala zarządzać treścią i tłumaczeniami za pomocą zintegrowanego narzędzia w Twoim IDE.

---

## Intlayer CLI

- **Tłumaczenie i generowanie plików**: Przeprowadzaj audyty plików z treścią, aby wygenerować brakujące tłumaczenia i przejrzeć niespójności.
- **Interakcja zdalna**: Wysyłaj lokalną treść do zdalnego CMS lub pobieraj zdalną treść, aby zintegrować ją z lokalną aplikacją.
- **Tłumaczenie i przegląd dokumentacji**: Tłumacz i przeglądaj swoją dokumentację / pliki itp.

> Zasoby:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md)

---

## Środowiska

- Używaj **zmiennych środowiskowych**, aby konfigurować Intlayer inaczej w środowiskach produkcyjnych, testowych i lokalnych.
- Określ, który edytor wizualny lub zdalny projekt CMS ma być używany w zależności od środowiska.

---

## Gorące aktualizacje treści

- Korzystając ze zdalnych słowników i Intlayer CMS, możesz **aktualizować treść aplikacji na bieżąco**, bez konieczności ponownego wdrażania.

> Zasoby:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)

---

## Nadchodzące funkcje

### 1. Testy A/B i personalizacja

- **Testowanie wielowariantowe**: Testuj różne wersje danego fragmentu treści, aby zobaczyć, która działa najlepiej (np. wyższy wskaźnik kliknięć).
- **Personalizacja oparta na danych**: Wyświetlaj różne treści w zależności od demografii użytkownika (płeć, wiek, lokalizacja itp.) lub innych wzorców zachowań.
- **Automatyczna iteracja**: Pozwól AI automatycznie testować wiele wersji i wybrać najlepszą lub zasugerować opcje do zatwierdzenia przez administratora.

### 2. Wersjonowanie

- Przywracaj poprzednie wersje swoich treści dzięki **wersjonowaniu zawartości**.
- Śledź zmiany w czasie i w razie potrzeby cofaj się do wcześniejszych stanów.

### 3. Automatyczne tłumaczenie

- Dla użytkowników zdalnego CMS, **generowanie tłumaczeń jednym kliknięciem** dla dowolnego obsługiwanego języka.
- System generowałby tłumaczenia w tle, a następnie prosił o ich zatwierdzenie lub edycję.

### 4. Ulepszenia SEO

- Narzędzia do **analizy słów kluczowych**, intencji wyszukiwania użytkowników oraz pojawiających się trendów.
- Sugestie ulepszonej treści dla lepszych pozycji w rankingach oraz monitorowanie długoterminowej wydajności.

### 5. Zgodność z większą liczbą frameworków

- Trwają prace nad wsparciem dla **Solid, Svelte, Angular** i innych.
- Celem jest uczynienie Intlayer kompatybilnym z **dowolną aplikacją opartą na JavaScript**.

---

## Podsumowanie

- System generowałby tłumaczenia w tle, a następnie prosiłby Cię o ich zatwierdzenie lub edycję.

### 4. Ulepszenia SEO

- Narzędzia do **analizy słów kluczowych**, intencji wyszukiwania użytkowników oraz pojawiających się trendów.
- Sugestie ulepszonej treści dla lepszych pozycji w rankingach oraz śledzenie długoterminowej wydajności.

### 5. Kompatybilność z większą liczbą frameworków

- Trwają prace nad wsparciem dla **Solid, Svelte, Angular** i innych.
- Celem jest uczynienie Intlayer kompatybilnym z **każdą aplikacją opartą na JavaScript**.

---

## Podsumowanie

Intlayer ma na celu być kompleksowym rozwiązaniem do zarządzania treścią i internacjonalizacji. Skupia się na elastyczności (pliki scentralizowane lub rozproszone), szerokim wsparciu językowym, łatwej integracji z nowoczesnymi frameworkami i bundlerami oraz potężnych funkcjach opartych na sztucznej inteligencji. W miarę pojawiania się nowych możliwości, takich jak testy A/B, wersjonowanie i automatyczne tłumaczenia, Intlayer będzie nadal upraszczał przepływy pracy z treścią i podnosił jakość doświadczeń użytkowników na różnych platformach.

Bądź na bieżąco z nadchodzącymi wydaniami i śmiało eksploruj istniejące funkcje, aby zobaczyć, jak Intlayer może pomóc w centralizacji i optymalizacji procesów zarządzania treścią już dziś!

---
