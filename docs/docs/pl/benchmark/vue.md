---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Najlepsze rozwiązanie i18n dla Vue w 2026 r. — raport z benchmarku
description: Porównaj biblioteki internacjonalizacji (i18n) dla Vue, takie jak vue-i18n, fluent-vue i Intlayer. Szczegółowy raport wydajności dotyczący rozmiaru paczki, wycieków i reaktywności.
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - wydajność
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.7.12
    date: 2026-01-06
    changes: "Inicjalizacja benchmarku"
---

# Biblioteki i18n dla Vue — raport z benchmarku 2026

Ta strona zawiera raport z benchmarku rozwiązań i18n dla Vue.

## Spis treści

<Toc/>

## Interaktywny benchmark

<I18nBenchmark framework="vite-vue" vertical/>

## Referencja wyników:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> [Zobacz pełne dane benchmarku](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md)

Pełne repozytorium benchmarku znajdziesz [tutaj](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Wstęp

Rozwiązania do internacjonalizacji należą do najcięższych zależności w aplikacji Vue. Głównym ryzykiem jest wysyłanie niepotrzebnych treści: tłumaczeń dla innych stron i innych lokalizacji w paczce (bundle) pojedynczej trasy.

W miarę rozwoju aplikacji problem ten może szybko zwiększyć ilość JavaScriptu wysyłanego do klienta i spowolnić nawigację.

W praktyce, w przypadku najmniej zoptymalizowanych implementacji, strona zinternacjonalizowana może okazać się kilkukrotnie cięższa niż wersja bez i18n.

Innym skutkiem jest wpływ na doświadczenie programisty (DX): sposób deklarowania treści, typy, organizacja przestrzeni nazw (namespaces), dynamiczne ładowanie i reaktywność przy zmianie lokalizacji.

## TL;DR

- **Intlayer**: Najlżejsze rozwiązanie (v8.7.12) z natywnym scopingiem i dynamicznym ładowaniem.
- **vue-i18n**: Standard branżowy z bogatym ekosystemem, ale może być znacznie cięższy i trudniejszy do optymalizacji pod kątem code-splittingu w dużych aplikacjach.
- **fluent-vue**: Innowacyjna organizacja komunikatów, ale brakuje jej bezpieczeństwa typów (type-safety) i okazuje się być ekstremalnie ciężkim rozwiązaniem.

## Przetestuj swoją aplikację

Aby szybko wykryć problemy z wyciekami i18n, przygotowałem darmowy skaner dostępny [tutaj](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Problem

Dwa dźwignie są kluczowe dla ograniczenia kosztów aplikacji wielojęzycznej:

- Dzielenie treści według stron / przestrzeni nazw, aby nie ładować całych słowników, gdy nie są potrzebne.
- Dynamiczne ładowanie odpowiedniej lokalizacji tylko wtedy, gdy jest potrzebna.

Zrozumienie technicznych ograniczeń tych podejść:

**Dynamiczne ładowanie**

Bez dynamicznego ładowania większość rozwiązań przechowuje komunikaty w pamięci od pierwszego renderowania, co dodaje znaczny narzut w przypadku aplikacji z wieloma trasami i lokalizacjami.

Dzięki dynamicznemu ładowaniu akceptujesz kompromis: mniej początkowego JS, ale czasami dodatkowe zapytanie przy zmianie języka.

**Dzielenie treści (Splitting)**

Składnie zbudowane wokół `const { t } = useI18n()` + `t('a.b.c')` są bardzo wygodne, ale często zachęcają do utrzymywania dużych obiektów JSON w czasie wykonywania. Ten model utrudnia tree-shaking, chyba że biblioteka oferuje rzeczywistą strategię dzielenia na poszczególne strony.

## Metodologia badań

W tym benchmarku porównaliśmy następujące biblioteki:

- `Base App` (Brak biblioteki i18n)
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

Framework to `Vue` z aplikacją wielojęzyczną składającą się z **10 stron** i **10 języków**.

Porównaliśmy **cztery strategie ładowania**:

| Strategia                | Brak przestrzeni nazw (globalna)                  | Z przestrzeniami nazw (scoped)                                                   |
| :----------------------- | :------------------------------------------------ | :------------------------------------------------------------------------------- |
| **Ładowanie statyczne**  | **Static**: Wszystko w pamięci przy starcie.      | **Scoped static**: Podział na przestrzenie nazw; wszystko ładowane przy starcie. |
| **Ładowanie dynamiczne** | **Dynamic**: Ładowanie na żądanie na lokalizację. | **Scoped dynamic**: Szczegółowe ładowanie na przestrzeń nazw i lokalizację.      |

## Podsumowanie strategii

- **Static**: Proste; brak opóźnień sieciowych po początkowym załadowaniu. Minus: duży rozmiar paczki.
- **Dynamic**: Zmniejsza początkową wagę (lazy-loading). Idealne, gdy masz wiele lokalizacji.
- **Scoped static**: Utrzymuje porządek w kodzie (logiczna separacja) bez skomplikowanych dodatkowych zapytań sieciowych.
- **Scoped dynamic**: Najlepsze podejście dla _code splittingu_ i wydajności. Minimalizuje zużycie pamięci, ładując tylko to, czego potrzebuje bieżący widok i aktywna lokalizacja.

### Co mierzyłem:

Uruchomiłem tę samą wielojęzyczną aplikację w prawdziwej przeglądarce dla każdego stosu technologicznego, a następnie zanotowałem, co faktycznie przesłała sieć i ile czasu zajęły poszczególne operacje. Rozmiary są podawane **po normalnej kompresji internetowej**, ponieważ jest to bliższe temu, co ludzie faktycznie pobierają, niż surowa liczba linii kodu źródłowego.

- **Rozmiar biblioteki internacjonalizacji**: Po spakowaniu (bundling), tree-shakingu i minifikacji, rozmiar biblioteki i18n to rozmiar kodu providerów + composables w pustym komponencie. Nie obejmuje ładowania plików tłumaczeń. Odpowiada na pytanie, jak „droga” jest biblioteka, zanim Twoja treść wejdzie do gry.

- **JavaScript na stronę**: Dla każdej trasy benchmarku, ile skryptów przeglądarka pobiera dla tej wizyty, uśrednione dla stron w zestawie (i dla lokalizacji). Ciężkie strony to wolne strony.

- **Wycieki z innych lokalizacji (Leakage)**: To treść tej samej strony, ale w innym języku, która zostałaby błędnie załadowana na kontrolowanej stronie. Ta treść jest niepotrzebna i należy jej unikać (np. treść strony `/fr/about` w paczce strony `/en/about`).

- **Wycieki z innych tras**: Ten sam pomysł dla **innych ekranów** w aplikacji: czy ich teksty są dołączane, gdy otworzyłeś tylko jedną stronę (np. treść strony `/en/about` w paczce strony `/en/contact`). Wysoki wynik sugeruje słabe dzielenie lub zbyt szerokie paczki.

- **Średni rozmiar paczki komponentu**: Typowe elementy interfejsu użytkownika są mierzone **pojedynczo**, zamiast ukrywać się w gigantycznej liczbie dla całej aplikacji. Pokazuje to, czy internacjonalizacja po cichu nadyma codzienne komponenty. Na przykład, jeśli Twój komponent renderuje się ponownie, załaduje wszystkie te dane z pamięci. Dołączanie gigantycznego JSON-a do dowolnego komponentu jest jak podłączanie dużego magazynu nieużywanych danych, co spowolni wydajność Twoich komponentów.

- **Reaktywność przełączania języka**: Przełączam język za pomocą własnego sterowania aplikacji i mierzę czas, aż strona wyraźnie się przełączy — co zauważyłby odwiedzający.

- **Praca renderowania po zmianie języka**: Bardziej szczegółowe badanie: ile wysiłku interfejs włożył w ponowne odrysowanie dla nowego języka po rozpoczęciu zmiany. Przydatne, gdy „odczuwalny” czas i koszt frameworka się rozbiegają.

- **Czas początkowego ładowania strony**: Od nawigacji do momentu, w którym przeglądarka uzna stronę za w pełni załadowaną dla testowanych przeze mnie scenariuszy. Dobre do porównywania „zimnych startów”.

- **Czas hydratacji (Hydration)**: Czas, jaki klient spędza na przekształcaniu HTML z serwera w interaktywny interfejs. Myślnik w tabelach oznacza, że ta implementacja nie dostarczyła wiarygodnej liczby dotyczącej hydratacji w tym benchmarku.

## Wyniki szczegółowe

### 1 — Rozwiązania, których należy unikać

> W ekosystemie Vue nie ma jednoznacznego rozwiązania, którego należy unikać.

### 2 — Rozwiązania akceptowalne

**(vue-i18n)** (`vue-i18n@11.4.0`):

- **vue-i18n** jest bezsprzecznie najczęściej używaną biblioteką i18n dla Vue, ma wiele funkcji i ogromny ekosystem. Jednak pod maską rozwiązanie to jest dość ciężkie. Nawet jeśli vue-i18n integruje lazy loading dla komunikatów, brakuje mu funkcji scopingu. W przypadku klasycznej aplikacji Vue SPA nie ma problemu, ale dla aplikacji nuxt wykorzystującej @nuxt/i18n prowadzi to do włączania komunikatów ze wszystkich stron do jednej. W przypadku dużej aplikacji nuxt zawierającej ponad 10 stron może to stać się naprawdę problematyczne.

Paczka jest bardzo ciężka (~24.3kb, co stanowi około 9x `vue-intlayer`).

**(fluent-vue)** (`fluent-vue@0.5.0`):

- **fluent-vue** oferuje próbę innowacji poprzez format .ftl. Organizacja komunikatów jest świetna, łatwiej zacząć. Ale w praktyce brak bezpieczeństwa typów zwiększa ryzyko błędu, a debugowanie może szybko stać się czasochłonne. Co więcej, to rozwiązanie ładuje komunikaty za pomocą wtyczki vite, która wymusza ładowanie całej treści we wszystkich językach na każdej stronie. Dodatkowo jest to ekstremalnie ciężkie rozwiązanie (~92.7kb, co stanowi około 34x `vue-intlayer`).

### 3 — Rekomendacje

**(Intlayer)** (`vue-intlayer@8.7.12`):

Nie będę osobiście oceniać `vue-intlayer` ze względu na obiektywizm, ponieważ jest to moje własne rozwiązanie.
