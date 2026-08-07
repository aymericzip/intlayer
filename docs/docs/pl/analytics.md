---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Intlayer Analytics | Śledzenie ekspozycji treści i testy A/B
description: Dowiedz się, w jaki sposób @intlayer/analytics śledzi wyświetlenia stron/języków i ekspozycję treści oraz jak z niego korzystać do przeprowadzania testów A/B zawartości Intlayer.
keywords:
  - Analytics (Analityka)
  - Testy A/B
  - Odbiorcy (Audience)
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — pakiet @intlayer/analytics, śledzenie na poziomie dostawcy (provider)/węzła (node), testy A/B, dashboard"
author: aymericzip
---

# Dokumentacja Intlayer Analytics

`@intlayer/analytics` to opcjonalny pakiet dodatkowy, który podpowiada ci **jakie treści są faktycznie wyświetlane** twoim odwiedzającym — jaka strona, w jakiej lokalizacji (języku) oraz jaki konkretny fragment przetłumaczonej treści — co pozwala ci lepiej zrozumieć odbiorców i przeprowadzać **testy A/B zawartości**.

## Spis treści

<TOC/>

---

## Co jest śledzone

`@intlayer/analytics` gromadzi i wysyła (batch) trzy rodzaje anonimowych zdarzeń:

| Zdarzenie          | Gdzie przechwytywane                             | Co mówi                                                                                                                                    |
| ------------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `page_view`        | Na poziomie Providera (`IntlayerProvider`)       | Jaką stronę i lokalizację (locale) przeglądała sesja podczas pierwszego ładowania, zmiany trasy lub zmiany lokalizacji.                    |
| `content_exposure` | Na poziomie Węzła (`useIntlayer` / interpretery) | Jaki klucz słownika / ścieżka klucza został faktycznie rozwiązany i wyświetlony — oraz, jeśli jest częścią eksperymentu, jaki **wariant**. |
| `conversion`       | Gdziekolwiek wywołasz `useConversion()`          | Cel osiągnięty (rejestracja, kliknięcie, zakup...) przypisany do wariantu A/B, na który została wystawiona sesja.                          |

Zdarzenia są zbierane w pamięci i wysyłane jako **jedno żądanie wsadowe (batch request) w przybliżeniu co 20 sekund** — nigdy po każdym wciśnięciu klawisza czy renderowaniu — więc analityka nigdy nie wpływa na czas pierwszego wyrenderowania ani nie dodaje żądań dla każdej interakcji.

## Jak napędza to testy A/B treści

Intlayer pozwala ci już deklarować [Warianty (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) zawartości (np. słownik `hero-banner` z wariantem `control` i `black_friday`). `@intlayer/analytics` zamyka pętlę:

1. `getVariant(experimentKey, variants)` deterministycznie przypisuje każdą anonimową sesję do danego wariantu — czysta funkcja bazująca na identyfikatorze sesji i kluczu eksperymentu, więc przypisanie jest **stabilne przez całą sesję** i nie wymaga **okrężnego zapytania do serwera (server round-trip)** przed pierwszym wyrenderowaniem (brak migotania, brak przesunięć układu/layout shift).
2. Każde zdarzenie `content_exposure` przenosi `variant`, który został pokazany.
3. `useConversion()` pozwala na przypisanie celu (np. `"cta_click"`) do tego wariantu.
4. Punkt końcowy (endpoint) z wynikami eksperymentu na dashboardzie porównuje współczynniki konwersji (conversion rates) wariantów, wliczając w to istotność statystyczną (test-z).

## Instalacja

`@intlayer/analytics` jest zależnością typu **peer, opcjonalną** — nigdy nie jest instalowana automatycznie przez żaden pakiet frameworku. Dodaj ją obok `intlayer`:

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Jeśli nie ją zainstalujesz, każdy punkt integracyjny sprowadza się do pustej operacji (no-op) — zobacz [Zerowy koszt, gdy nie zainstalowano](#zerowy-koszt-gdy-nie-zainstalowano) poniżej.

## Konfiguracja

Analytics **wykorzystuje ponownie istniejący blok konfiguracji `editor`** — nie ma osobnego schematu konfiguracyjnego `analytics` do uzupełnienia:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Wykorzystywane również jako punkt końcowy przyswajania analityki
    clientId: "your-client-id", // Wykorzystywane również jako klucz projektu analityki
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — podstawowy URL, do którego przesyłane są zdarzenia analityki (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — publiczny klucz projektu przypisany do każdego przetworzonego zdarzenia. Służy również jako **przełącznik aktywacji**: analityka pozostaje całkowicie wyłączona (oraz usunięta podczas tree-shakingu, patrz niżej), dopóki `clientId` nie zostanie skonfigurowany.

Jeśli hostujesz sam Intlayer (self-host), analityka automatycznie wskazuje na twoją własną instancję, jako że współdzieli parametr `editor.backendURL`.

## Wsparcie dla Frameworków

Analytics jest wpięty w udostępniony `IntlayerProvider` z `react-intlayer`, stąd jest dostępny już dziś w każdym miejscu, w którym ten provider jest używany:

| Framework                                                | Status                                                                                               |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ Dostępne                                                                                          |
| Next.js (`next-intlayer`)                                | ✅ Dostępne (poprzez `react-intlayer`)                                                               |
| React Native / Expo (`react-native-intlayer`)            | ✅ Dostępne (poprzez `react-intlayer`)                                                               |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 Zaplanowano — ten sam klient, podpięcia na poziomie providera wzorujące się na `@intlayer/editor` |

## Użycie

### Automatyczne śledzenie na poziomie providera

Brak konieczności modyfikowania kodu. Po zainstalowaniu pakietu `@intlayer/analytics` oraz po skonfigurowaniu `editor.clientId`, `IntlayerProvider` będzie automatycznie:

- inicjalizować klienta analityki po zamontowaniu (mount),
- rejestrować `page_view` po pierwszym załadowaniu,
- rejestrować `page_view` za każdą zmianą lokalizacji,
- uruchamiać cykl „wypychania” (flush) zdarzeń po około 20 sekundach oraz natychmiast, gdy zakładka zostanie zamknięta (za pośrednictwem `navigator.sendBeacon`, z trybem zapasowym (fallback) do `fetch(..., { keepalive: true })`).

### Automatyczne śledzenie na poziomie węzła

Za każdym razem, gdy `useIntlayer` rozwiąże jakiś fragment treści do wyświetlenia, interpreter raportuje zdarzenie typu `content_exposure` dla odpowiedniego elementu tj. zbiór `dictionaryKey` + lokalizacja (locale) + precyzyjna ścieżka klucza (key path) — ponownie, nie ma potrzeby zmieniania kodu. Powielone zdarzenia tego samego węzła pojawiające się w cyklu wypychania zostają zgrupowane do 1 zapytania razem z właściwością `count` — dzięki czemu lista z renderowaniem wykonywanym po 50 razy nie wypycha 50 razy osobnego zapytania.

### Śledzenie konwersji do testów A/B

Wykorzystaj `useConversion()`, aby przypisać cel do wariantu, z którym wchodzono w interakcję w czasie sesji:

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      Rozpocznij
    </button>
  );
};
```

### Odbieranie wariantu bezpośrednio po stronie klienta

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## Prywatność & Wydajność

- **Z założenia anonimowe (Anonymous by design)**: sesje definiowane są losowymi unikalnymi indentyfikatorami (rotating ids), i backend nie przetwarza danych tak mocno, by przetrzymywać oryginał i nigdy IP urządzenia; pozostawia jedynie odcienie, zjawisko **SHA-256 hash**.
- **Dokładność pozycjonowania ogólna (coarse)**: pozostaje do dyspozycji jedynie unikalny fragment kraju.
- **Odnośniki odrzucają query string (search params)** z definicji.
- **Losowanie pul (Sampling)**: opcja `sampleRate` umożliwia selekcjonowanie wyświetlanej treści.
- **Zbiorcze transakcje (Batched)**: 1 transakcja średnio na 20 sec (`flushInterval`), w skrajnych momentach częściej, np. by wyzerować zapętlające procesy, jeżeli dojdzie do uzupełniania bufru (`maxBufferSize`).

### Zerowy koszt, gdy nie zainstalowano

`@intlayer/analytics` podąża za tym samym modelem zależności opcjonalnej co `@intlayer/editor`:

- Zawsze paczka dociągana jest dynamicznie w osłonie **`import()` z klauzulą `try/catch`**.
- Stała wartość dla buildowania (`INTLAYER_ANALYTICS_ENABLED`) redukuje procesowanie w kodzie zjawiskiem **dead-code-eliminate** do momentu skonfigurowania i deklaracji `editor.clientId`.

## Dashboard: Strona Analityki

Jak tylko system zdobędzie niezbędne detale na start z Twojego portalu (podpiętego pod projekt), sekcja **Analytics** (pod panelem) ukaże widok:

- Ilość użytkowników „Aktywnych”.
- Sumę w danym przedziale do ok 7 dni.
- Widok wyświetleń z perspektywy danej grupy stron (Page views).
- Pełen zakres podziału z punktu widzenia specyficznych preferencji odwiedzającego – w oparciu o sekcje państw z dodatkiem preferowanych ustawień językowych na zakładce podziału.

## Odniesienie Backend API

Każde odniesienie czytające poddawane jest procesom weryfikacyjnym. System pobierający wystawiony jest na świat by funkcjonować prawidłowo z argumentem body `clientId`.

| Metoda | Endpoint                                    | Opis                                                                                |
| ------ | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/events`                     | Masowe pobieranie eventów z puli publicznej odfiltrowane wg. kryteriów `clientId`.  |
| `GET`  | `/api/analytics/overview`                   | Parametry odsłon na język i podstrony do autoryzowanego projektu.                   |
| `GET`  | `/api/analytics/audience?days=30`           | Grupy wizytorów i szczegóły wyświetlania w ujęciu wielowymiarowym (dzień,język,itd) |
| `GET`  | `/api/analytics/content-stats`              | Odsłony w grupie precyzyjnie celowanej ścieżki i pod klucz w słowniku.              |
| `GET`  | `/api/analytics/experiments/:experimentKey` | Konwersja by przeprowadzać na wariantach testy (A/B testing, statistical itp.)      |

Korzystając z dostępu masz uprawnienia do podpięcia własnych wywoływań ze skryptami wspierając system SDK: [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## Przydatne linki

- [Słowniki dynamiczne – Kolekcje & Warianty (Dynamic Dictionaries)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- [Odwołanie konfiguracyjne (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Poradnik hostingu samodzielnego (Self-Hosting Guide)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md)
