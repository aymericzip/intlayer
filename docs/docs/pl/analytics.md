---
createdAt: 2026-07-08
updatedAt: 2026-08-22
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
  - version: 9.3.3
    date: 2026-08-22
    changes: "Domyślne włączenie analityki, gdy zainstalowano `@intlayer/analytics`"
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

`@intlayer/analytics` jest **opcjonalną zależnością** każdego pakietu frameworka (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …), więc większość projektów już go ma. Zainstaluj go jawnie, jeśli Twoja konfiguracja pomija zależności opcjonalne (`npm install --no-optional`, …):

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

Instalacja pakietu to wszystko, czego potrzeba, aby włączyć analitykę: `analytics.enabled` domyślnie wynosi `true`, a `@intlayer/config` ustawia je na `false`, gdy pakietu nie da się znaleźć w projekcie. Jeśli nie ją zainstalujesz, każdy punkt integracyjny sprowadza się do pustej operacji (no-op) — zobacz [Zerowy koszt, gdy nie zainstalowano](#zerowy-koszt-gdy-nie-zainstalowano) poniżej.

## Konfiguracja

Analityka nie wymaga żadnej konfiguracji, aby ruszyć: jest **włączona domyślnie** i **wykorzystuje istniejący blok konfiguracji `editor`** jako endpoint i klucz projektu.

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

### Wywoływanie API z przeglądarki

Ten sam token zasila mały klient niewymagający danych uwierzytelniających, dzięki czemu strona statyczna lub SPA może odczytać zawartość swojego CMS w czasie działania bez serwera, bez server action i bez żadnego sekretu w paczce (bundle):

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

Uwierzytelnia się on samodzielnie na podstawie `editor.clientId`: wymiana, buforowanie (caching) i odnawianie są obsługiwane wewnętrznie. Zakresy (scopes) ograniczają to, do czego ma dostęp: opublikowaną zawartość słowników oraz przyjmowanie zdarzeń analityki. Wszystko inne (wysyłanie słowników, odczyt projektu, wydawanie kredytów AI) wymaga prawdziwych danych uwierzytelniających, a więc serwera lub zalogowanego użytkownika.

### Rezygnacja (opt-out)

Opcjonalny blok `analytics` pozwala dostroić — lub wyłączyć — zbieranie danych:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // Domyślnie: true — usuwa całą integrację z pakietu aplikacji
    flushInterval: 20_000, // Milisekundy między dwoma zbiorczymi wysyłkami
    sampleRate: 1, // Ułamek rejestrowanych sesji, od 0 (żadnej) do 1 (wszystkie)
  },
};

export default config;
```

Odinstalowanie `@intlayer/analytics` daje ten sam efekt co `enabled: false`. Pełną listę pól znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

## Użycie

### Automatyczne śledzenie na poziomie providera

Brak konieczności modyfikowania kodu. Po zainstalowaniu pakietu `@intlayer/analytics` oraz po skonfigurowaniu `editor.clientId`, `IntlayerProvider` będzie automatycznie:

- inicjalizować klienta analityki po zamontowaniu (mount),
- rejestrować `page_view` po pierwszym załadowaniu,
- rejestrować `page_view` za każdą zmianą lokalizacji,
- uruchamiać cykl „wypychania” (flush) zdarzeń po około 20 sekundach oraz natychmiast, gdy zakładka zostanie zamknięta (za pośrednictwem `navigator.sendBeacon`, z trybem zapasowym (fallback) do `fetch(..., { keepalive: true })`).

Punkt wejścia różni się w zależności od frameworka, ale w każdym przypadku jest to to samo miejsce, którego już używasz do skonfigurowania Intlayer, więc nie ma nic więcej do dodania:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider` montuje dostawcę analityki wewnętrznie.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer` eksportuje ponownie `IntlayerProvider` z React, więc analityka jest podłączona w ten sam sposób.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    Wtyczka `intlayer` rejestruje hooki analityki w cyklu życia komponentu głównego.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > Przy Nuxt, `nuxt-intlayer` instaluje wtyczkę za ciebie: nie musisz nic robić.

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` uruchamia analitykę z komponentu, który konfiguruje Intlayer.

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider` montuje dostawcę analityki wewnętrznie.

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider` montuje dostawcę analityki leniwie (lazy), dzięki czemu ten fragment kodu (chunk) pozostaje poza krytyczną ścieżką.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()` zawiera już `provideIntlayerAnalytics()`.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > Używaj `provideIntlayerAnalytics()` samodzielnie tylko wtedy, gdy zarządzasz providerami indywidualnie.

  </Tab>
</Tabs>

### Automatyczne śledzenie na poziomie węzła

Za każdym razem, gdy `useIntlayer` rozwiąże jakiś fragment treści do wyświetlenia, interpreter raportuje zdarzenie typu `content_exposure` dla odpowiedniego elementu tj. zbiór `dictionaryKey` + lokalizacja (locale) + precyzyjna ścieżka klucza (key path) — ponownie, nie ma potrzeby zmieniania kodu. Powielone zdarzenia tego samego węzła pojawiające się w cyklu wypychania zostają zgrupowane do 1 zapytania razem z właściwością `count` — dzięki czemu lista z renderowaniem wykonywanym po 50 razy nie wypycha 50 razy osobnego zapytania.

### Śledzenie konwersji do testów A/B

Wykorzystaj `useConversion()`, aby przypisać cel do wariantu, z którym wchodzono w interakcję w czasie sesji:

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
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

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

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

    > `useConversion` to hook kliencki: oznacz komponent jako `"use client"`.

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        Rozpocznij
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      Rozpocznij
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

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

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">Rozpocznij</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### Odbieranie wariantu bezpośrednio po stronie klienta

`useExperiment()` przypisuje sesję do wariantu i rejestruje ekspozycję, która staje się mianownikiem współczynnika konwersji. Pokazuj poddrzewo zależne od wariantu dopiero, gdy `isAssigned` ma wartość prawda, aby żaden odwiedzający nie zobaczył krótkiego mignięcia wariantu kontrolnego, zanim przypisanie zostanie rozstrzygnięte:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` jest zwykłym ciągiem znaków (string).

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` jest zwykłym ciągiem znaków (string). Przypisanie następuje w przeglądarce, więc komponent musi być komponentem klienckim.

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` i `isAssigned` to `Ref`y.

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` i `isAssigned` to store'y: odczytaj je z prefiksem `$`.

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` jest zwykłym ciągiem znaków (string).

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` i `isAssigned` to `Accessor`y: wywołaj je, aby odczytać wartość.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` i `isAssigned` to `Signal`y: wywołaj je, aby odczytać wartość.

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

Wagi są opcjonalne — przekaż jedną na wariant, aby zmienić proporcje podziału, np. `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

Komponent dziecko odczytuje następnie pasujący [Wariant (Variant)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/variants.md) słownika:

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> Odczytanie wariantu w **komponencie dziecku** sprawia, że działa to poza React: w Vue, Svelte, Solid i Angular selektor przekazany do `useIntlayer` jest przechwytywany w momencie konfigurowania komponentu, więc odczyt musi nastąpić w komponencie, który montuje się dopiero, gdy wariant jest już znany.

Jeśli eksperyment obejmuje całą stronę, a nie pojedynczy słownik, przenieś wariant na providera — zobacz [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/variants.md#ambient-variant). Każdy `useIntlayer` poniżej rozwiąże się wtedy względem niego bez zmian w miejscu wywołania.

Jeśli potrzebujesz surowego przypisania poza komponentem, skorzystaj bezpośrednio z klienta:

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` tylko przypisuje — nie rejestruje ekspozycji. Preferuj `useExperiment()`, w przeciwnym razie współczynnik konwersji nie będzie miał mianownika.

## Prywatność & Wydajność

- **Z założenia anonimowe (Anonymous by design)**: sesje definiowane są losowymi unikalnymi indentyfikatorami (rotating ids), i backend nie przetwarza danych tak mocno, by przetrzymywać oryginał i nigdy IP urządzenia; pozostawia jedynie odcienie, zjawisko **SHA-256 hash**.
- **Dokładność pozycjonowania ogólna (coarse)**: pozostaje do dyspozycji jedynie unikalny fragment kraju.
- **Odnośniki odrzucają query string (search params)** z definicji.
- **Losowanie pul (Sampling)**: opcja `sampleRate` umożliwia selekcjonowanie wyświetlanej treści.
- **Zbiorcze transakcje (Batched)**: 1 transakcja średnio na 20 sec (`flushInterval`), w skrajnych momentach częściej, np. by wyzerować zapętlające procesy, jeżeli dojdzie do uzupełniania bufru (`maxBufferSize`).

### Zerowy koszt, gdy nie zainstalowano

`@intlayer/analytics` podąża za tym samym modelem zależności opcjonalnej co `@intlayer/editor`:

- Zawsze paczka dociągana jest dynamicznie w osłonie **`import()` z klauzulą `try/catch`**.
- zmienna środowiskowa ustalana w czasie kompilacji (`INTLAYER_ANALYTICS_ENABLED`), automatycznie ustawiana na `'false'` przez `@intlayer/config`, gdy pakiet nie jest zainstalowany, `analytics.enabled` ma wartość `false` lub nie skonfigurowano `editor.clientId`, pozwala bundlerom **usunąć całą integrację jako martwy kod (dead-code-eliminate)**;

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

> **Tylko po stronie serwera.** `createIntlayerCMS()` uwierzytelnia się za pomocą `clientId` + `clientSecret`, a sekret nigdy nie jest dostępny w przeglądarce: ten fragment kodu wysyłałby nieuwierzytelnione żądania, gdyby działał tam. Trzymaj go w route handlerze, server action lub skrypcie.

## Przydatne linki

- [Słowniki dynamiczne – Kolekcje & Warianty (Dynamic Dictionaries)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- [Odwołanie konfiguracyjne (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Poradnik hostingu samodzielnego (Self-Hosting Guide)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md)
