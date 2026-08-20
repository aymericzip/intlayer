---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji SolidStart. Server-rendered routing lokalizacji, hreflang, mapa strony i tłumaczenie wspomagane przez AI."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Initial history"
author: aymericzip
---

# Przetłumacz swoją stronę SolidStart za pomocą Intlayer | Internacjonalizacja (i18n)

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">

<iframe title="Najlepsze rozwiązanie i18n dla Vite i Solid? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Spis treści

<TOC/>

Ten przewodnik dotyczy aplikacji SolidStart **renderowanej po stronie serwera (SSR)**: detekcja lokalizacji odbywa się podczas żądania, strony są renderowane na serwerze w odpowiednim języku, a sygnały `<html lang>`, `hreflang` oraz mapy strony wymagane przez wyszukiwarki są generowane po stronie serwera.

## Dlaczego Intlayer zamiast alternatyw?

W porównaniu z głównymi rozwiązaniami, takimi jak `@solid-primitives/i18n` czy `i18next`, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

<AccordionGroup>

<Accordion header="Pełne wsparcie dla Solid">

Intlayer jest zoptymalizowany do idealnej współpracy z Solid, oferując **zakresowanie treści na poziomie komponentów**, **reaktywne tłumaczenia** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

</Accordion>

<Accordion header="Rozmiar paczki (bundle)">

Zamiast ładować ogromne pliki JSON do swoich stron, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiar paczki i stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość utrzymania">

Zakresowanie treści aplikacji **ułatwia utrzymanie** w przypadku aplikacji o dużej skali. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążenia psychicznego wynikającego z przeglądania całej bazy kodowej treści. Ponadto Intlayer jest **w pełni typowany**, aby zapewnić dokładność treści.

</Accordion>

<Accordion header="Agent AI">

Wspólna lokalizacja treści **zmniejsza kontekst wymagany** przez duże modele językowe (LLM). Intlayer zawiera również zestaw narzędzi, takich jak **CLI** do testowania brakujących tłumaczeń, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** oraz **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**, aby czynić doświadczenie programistyczne (DX) jeszcze płynniejszym dla agentów AI.

</Accordion>

<Accordion header="Automatyzacja">

Używaj automatyzacji do tłumaczenia w swoim potoku CI/CD za pomocą wybranego LLM po kosztach Twojego dostawcy AI. Intlayer oferuje również **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) pomagającą **tłumaczyć w tle**.

</Accordion>

<Accordion header="Wydajność">

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Intlayer optymalizuje ładowanie treści na etapie budowania.

</Accordion>

<Accordion header="Skalowanie z osobami niebędącymi programistami">

Czymś więcej niż tylko rozwiązaniem i18n, Intlayer zapewnia **samodzielnie hostowany [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** oraz **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** pomagający zarządzać wielojęzyczną treścią w **czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu jest płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

</Accordion>
</AccordionGroup>

---

## Przewodnik krok po kroku dotyczący konfiguracji Intlayer w aplikacji SolidStart

<Steps>

<Step number={1} title="Zainstaluj zależności">

Zainstaluj niezbędne pakiety za pomocą npm:

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

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

> To polecenie wykryje Twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  Główny pakiet zapewniający narzędzia internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **solid-intlayer**

  Pakiet integrujący Intlayer z aplikacją Solid. Zapewnia dostawców kontekstu i haki (hooki) dla internacjonalizacji Solid.

- **vite-intlayer**

  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także obsługę routingu lokalizacji, która wykrywa preferowaną lokalizację użytkownika, zarządza plikami cookie i obsługuje przekierowania URL.

> `vite-intlayer` jest tutaj kwestią po stronie serwera, a nie tylko etapu budowania: dostarcza procedurę obsługi żądań uruchamianą przez serwer Nitro w SolidStart. Przechowywanie go w `dependencies` jest bezpiecznym domyślnym rozwiązaniem — możesz przenieść go do `devDependencies` tylko wtedy, gdy wdrażasz zbudowany katalog `.output`, w którym Nitro osadza tę procedurę.

</Step>

<Step number={2} title="Konfiguracja Twojego projektu">

Utwórz plik konfiguracyjny, aby skonfigurować języki Twojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje inne lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

W przypadku `prefix-no-default` domyślna lokalizacja jest serwowana z adresów URL bez przedrostka:

```plaintext
/            /about          → Angielski (domyślna lokalizacja)
/fr          /fr/about       → Francuski
/es          /es/about       → Hiszpański
```

> Za pomocą tego pliku konfiguracyjnego możesz skonfigurować zlokalizowane adresy URL, przekierowania middleware, nazwy plików cookie, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Zintegruj Intlayer w konfiguracji Vite">

Dodaj wtyczkę Intlayer do swojej konfiguracji:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> Wtyczka Vite `intlayer()` buduje pliki deklaracji treści, obserwuje je w trybie deweloperskim i definiuje zmienne środowiskowe Intlayer wewnątrz aplikacji. Zapewnia również aliasy optymalizujące wydajność.

### Routing lokalizacji jest dostarczany z wtyczką

SolidStart działa na [Nitro](https://nitro.build), a `intlayer()` rejestruje swoją procedurę obsługi routingu lokalizacji bezpośrednio w potoku serwera Nitro (poprzez opcję `routing.enableProxy`, domyślnie `true`). Nic więcej nie trzeba podłączać: na zbudowanym serwerze każde żądanie jest sprawdzane, zanim dotrze do routera, oraz:

- lokalizacja jest odczytywana z przedrostka URL, następnie z pliku cookie `INTLAYER_LOCALE`, a potem z nagłówka `Accept-Language`;
- adres URL bez przedrostka jest przekierowywany do swojego zlokalizowanego odpowiednika, gdy rozstrzygnięta lokalizacja nie jest domyślną (`/` → `/fr`);
- nadmiarowo zlokalizowany adres URL jest przekierowywany z powrotem do swojej kanonicznej formy (`/en/about` → `/about`);
- plik cookie lokalizacji jest zapisywany z powrotem w odpowiedzi.

</Step>

<Step number={4} title="Zadeklaruj swoją treść">

Utwórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **Haczyk specyficzny dla SolidStart**: każdy plik `.ts` / `.tsx` w `src/routes` staje się ścieżką (route), a plik `.content.ts` posiada domyślny eksport, więc zostałby wyłapany jako strona. Przechowuj deklaracje treści swoich **stron** poza katalogiem routes (`src/contents/` działa dobrze). Treść **komponentów** może pozostać w tej samej lokalizacji, ponieważ `src/components` nie jest skanowany przez router oparty na systemie plików.

> Deklaracje treści można definiować w dowolnym miejscu aplikacji, o ile są zawarte w katalogu `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={5} title="Dodaj zlokalizowany routing">

Celem tego kroku jest nadanie każdemu językowi własnego adresu URL, co jest indeksowane przez wyszukiwarki.

Przenieś swoje strony pod **opcjonalny dynamiczny segment**. W routerze opartym na systemie plików SolidStart `[[locale]]` kompiluje się do wzorca ścieżki `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          ← układ (layout), który weryfikuje segment
  [[locale]]/
    index.tsx             → /        oraz /fr        oraz /es
    about.tsx             → /about   oraz /fr/about  oraz /es/about
  [...404].tsx            → zbiorczy plik dla wszystkiego innego
```

Jedynym zadaniem pliku układu (layout) jest ograniczenie segmentu do skonfigurowanej lokalizacji:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` rozwija `:locale?` do dwóch wzorców — jednego z segmentem i jednego bez — i próbuje ich według malejącej szczegółowości. `matchFilters` to różnica między działającą konfiguracją a mylącą:

| Adres URL   | Bez `matchFilters`                              | Z `matchFilters`                                      |
| ----------- | ----------------------------------------------- | ----------------------------------------------------- |
| `/fr/about` | Strona o nas po francusku                       | Strona o nas po francusku                             |
| `/about`    | Strona o nas (statyczny segment wygrywa)        | Strona o nas                                          |
| `/unknown`  | **Strona główna**, po cichu, z `locale=unknown` | Brak dopasowania → przechodzi do zbiorczej strony 404 |

> Preferuj `[locale]` (wymagane) zamiast `[[locale]]`, jeśli używasz trybu routingu `'prefix-all'`, i całkowicie pomiń segment dla `'no-prefix'` lub `'search-params'`.

</Step>

<Step number={6} title="Dostarcz lokalizację do swojej aplikacji">

Adres URL jest jedynym źródłem prawdy dla lokalizacji: middleware przekierował już żądanie do zlokalizowanej ścieżki, więc odczytanie ścieżki w układzie głównym (root layout) utrzymuje zgodność renderowania po stronie serwera i hydracji po stronie klienta, oraz powoduje, że każda nawigacja po stronie klienta aktualizuje lokalizację automatycznie.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // Serwer renderuje <html> w entry-server.tsx; nawigacja po stronie klienta
  // między lokalizacjami musi samodzielnie aktualizować atrybuty.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` reaguje na swój rekwizyt (prop) `locale`, więc przekazanie wywołania akcesora `locale()` wewnątrz JSX wystarczy — Solid kompiluje je do gettera, a całe drzewo renderuje się ponownie w nowym języku, gdy zmienia się URL.

</Step>

<Step number={7} title="Ustaw atrybuty lang i dir w elemencie HTML po stronie serwera">

Element `<html>` jest renderowany przez `entry-server.tsx`, poza `Router`. Zamiast tego odczytaj lokalizację z adresu URL żądania:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Roboty indeksujące otrzymują teraz właściwy język od pierwszego bajtu:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Wykorzystaj Intlayer w swoich stronach">

Uzyskaj dostęp do słowników treści w całej aplikacji:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> W Solid `useIntlayer` zwraca reaktywną treść (np. `content`). Możesz uzyskać dostęp do jej właściwości bezpośrednio.

> Jeśli chcesz użyć treści w atrybucie typu `string`, takim jak `alt`, `title`, `href`, `aria-label` itp., możesz użyć wartości funkcji, na przykład:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Aby dowiedzieć się więcej o haku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md).

Węzły treści nie ograniczają się do zwykłych tłumaczeń. Na przykład licznik z liczbą mnogą:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` wybiera kategorię za pomocą `Intl.PluralRules` dla aktywnej lokalizacji, dzięki czemu języki z więcej niż dwoma formami liczby mnogiej działają bez dodatkowego kodu.

</Step>

<Step number={9} title="Utwórz komponent Zlokalizowany Link">

Utwórz niestandardowy komponent `Link`, który automatycznie dodaje przedrostek aktualnego języka do wewnętrznych adresów URL:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Napisanie `href="/about"` raz powoduje teraz wygenerowanie `/about`, `/fr/about` lub `/es/about` w zależności od aktywnej lokalizacji — bez ręcznego dodawania przedrostków w jakimkolwiek miejscu na stronach.

</Step>

<Step number={10} title="Utwórz komponent Przełącznik Lokalizacji">

Renderuj przełącznik jako **prawdziwe odnośniki (anchors)**, a nie `<select>`: każdy język aktualnej strony staje się linkiem możliwym do zindeksowania, który można otworzyć w nowej karcie, czego nie zapewnia kontrolka oparta wyłącznie na JavaScript.

`getPathWithoutLocale` usuwa segment lokalizacji z aktualnej ścieżki, a `getLocalizedUrl` odbudowuje ją dla docelowej lokalizacji, dzięki czemu linki podążają za Twoim trybem routingu bez kodowania cokolwiek na sztywno. Nawigacja jest tym, co zmienia wyrenderowaną lokalizację — trasa `[[locale]]` wywodzi ją z adresu URL — podczas gdy `setLocale` utrwala wybór w pliku cookie `INTLAYER_LOCALE`, dzięki czemu późniejsza wizyta na adresie URL bez lokalizacji rozstrzyga się do tego samego języka.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Kanoniczna ścieżka (bez lokalizacji) aktualnie wyświetlanej strony
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Tylko dokładne dopasowanie, aby link domyślnej lokalizacji nie był oznaczony
              // jako aktywny na każdej stronie
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Gwarantuje, że przycisk „wstecz” w przeglądarce powraca do poprzedniej strony
              replace
            >
              {/* Język we własnej lokalizacji - np. Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> W Solid `locale` z `useLocale` jest **akcesorem sygnału**. Użyj `locale()` (z nawiasami), aby reaktywnie odczytać jego aktualną wartość.
>
> `getLocaleName(localeItem)` renderuje każdy język we własnym języku — `English / Français / Español`. Przekaż drugi argument, aby zamiast tego przetłumaczyć nazwy na aktualnie wyświetlany język: `getLocaleName(localeItem, locale())` daje `English / French / Spanish` po angielsku, `anglais / français / espagnol` po francusku.
>
> `<A>` ustawia już `aria-current="page"` na linku pasującym do aktualnego adresu URL, więc nie trzeba nic dodawać. `replace` jest odczytywane z wyrenderowanego atrybutu przez router: zastępuje wpis w historii zamiast dodawać nowy, dzięki czemu przycisk „wstecz” w przeglądarce powraca do strony odwiedzonej przed zmianą, a nie do tej samej strony w poprzednim języku.
>
> `dir` i `hreflang` na każdym linku utrzymują prawidłową orientację nazw języków pisanych od prawej do lewej oraz informują technologie wspomagające i roboty indeksujące, na jaki język wskazuje każdy link.
>
> Aby dowiedzieć się więcej o haku `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Emituj linki canonical i hreflang" isOptional={true}>

Anotacje `hreflang` informują wyszukiwarki, że `/about`, `/fr/about` i `/es/about` to ta sama strona w różnych językach. `getMultilingualUrls` wywodzi je z kanonicznej ścieżki (bez lokalizacji), zgodnie z Twoim trybem routingu, więc nic nie jest zakodowane na sztywno:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** Bezawzględny URL renderowanej strony. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Wyrenderuj to w nagłówku dokumentu (head), gdzie dostępny jest adres URL żądania:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … wewnątrz <head>, obok innych tagów meta:
<AlternateLinks url={url} />;
```

`GET /fr/about` serwuje wtedy:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Uwaga dotycząca `@solidjs/meta`**: w momencie pisania tego tekstu, `<Title>` i `<Meta>` z `@solidjs/meta` są stosowane po stronie klienta po hydracji, ale **nie** są emitowane do renderowanego po stronie serwera `<head>` w SolidStart v2. Dopóki nie zostanie to naprawione, renderuj tagi, które roboty indeksujące muszą widzieć bez JavaScript — `canonical`, `hreflang` oraz, jeśli to konieczne, `title` / `description` — bezpośrednio w `entry-server.tsx`, jak pokazano powyżej.

</Step>

<Step number={12} title="Zarządzaj stronami nieznalezionymi (404)" isOptional={true}>

Trasa wieloznaczna (splat route) w korzeniu `src/routes` wyłapuje każdą ścieżkę, do której segment lokalizacji nie pasował — w tym nieprawidłowe przedrostki lokalizacji odrzucone przez `matchFilters`. Ponieważ lokalizacja nadal pochodzi z adresu URL poprzez układ główny, strona 404 jest wyświetlana w języku odwiedzającego:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Żądanie           | Wynik                                            |
| ----------------- | ------------------------------------------------ |
| `/xx`             | `404` — `xx` nie jest skonfigurowaną lokalizacją |
| `/nonexistent`    | `404` w domyślnej lokalizacji                    |
| `/fr/nonexistent` | `404` po francusku (`Page introuvable`)          |

</Step>

<Step number={13} title="Wygeneruj wielojęzyczną mapę strony (sitemap)" isOptional={true}>

Generator mapy strony Intlayer rozwija każdą ścieżkę do jednego wpisu na lokalizację i łączy alternatywy `xhtml:link` między nimi, dzięki czemu trasa musi jedynie wymienić kanoniczne ścieżki bez lokalizacji.

> W przeciwieństwie do podstawowych generatorów, które emitują tylko płaskie adresy URL, Intlayer łączy dwukierunkowe linki między wszystkimi zlokalizowanymi wariantami każdej strony, co pomaga wyszukiwarkom powiązać zlokalizowane adresy URL i dostarczać właściwy właściwym odbiorcom.

SolidStart zmienia plik eksportujący metodę HTTP w trasę API i usuwa rozszerzenie `.ts` ze ścieżki — więc `src/routes/sitemap.xml.ts` jest serwowane pod adresem `/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> Trasy API nie obsługują parametrów opcjonalnych, więc trzymaj ten plik w korzeniu `src/routes`, poza segmentem `[[locale]]`. Mapa strony zawiera już każdą lokalizację.

Możesz zbudować `robots.txt` w ten sam sposób za pomocą `getMultilingualUrls`, tak aby wpisy `Disallow` obejmowały każdy zlokalizowany zapis wrażliwej ścieżki:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Pobierz lokalizację w funkcjach serwerowych" isOptional={true}>

Możesz chcieć uzyskać dostęp do bieżącej lokalizacji z wnętrza funkcji serwerowej lub trasy API.

W konfiguracji opartej na przedrostkach, takiej jak ta, **adres URL jest rozstrzygający**: `getLocaleFromPath` odczytuje przedrostek z adresu URL żądania. `getLocale` jest alternatywą dla żądań, które nie przenoszą przedrostka lokalizacji — sprawdza plik cookie `INTLAYER_LOCALE`, następnie nagłówek `x-intlayer-locale`, a potem negocjuje `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Pobiera plik cookie z żądania (domyślnie: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Pobiera nagłówek z żądania (domyślnie: 'x-intlayer-locale'),
      // przechodząc w razie potrzeby do negocjacji Accept-Language
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Pobierz część treści poza komponentem za pomocą getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Nie polegaj tutaj wyłącznie na `getLocale`: plik cookie lokalizacji jest zapisywany dopiero wtedy, gdy odwiedzający aktywnie zmieni język, więc pierwsza wizyta na `/fr/...` rozstrzygnęłaby się do domyślnej lokalizacji.

</Step>

<Step number={15} title="Wyodrębnij treść swoich komponentów" isOptional={true}>

Jeśli masz istniejącą bazę kodu, przekształcanie tysięcy plików może być czasochłonne.

Aby ułatwić ten proces, Intlayer proponuje [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) do przekształcania komponentów i ekstrakcji treści.

Aby go skonfigurować, możesz dodać sekcję `compiler` w swoim pliku `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Reszta Twojej konfiguracji
  compiler: {
    /**
     * Wskazuje, czy kompilator powinien być włączony.
     */
    enabled: true,

    /**
     * Definiuje ścieżkę plików wyjściowych
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Wskazuje, czy komponenty powinny zostać zapisane po przekształceniu.
     *
     * - Jeśli `true`, kompilator nadpisze plik komponentu na dysku. Przekształcenie będzie więc trwałe, a kompilator pominie przekształcenie przy następnym procesie. W ten sposób kompilator może przekształcić aplikację, a następnie można go usunąć.
     *
     * - Jeśli `false`, kompilator wstrzyknie wywołanie funkcji `useIntlayer()` do kodu tylko w danych wyjściowych budowania i zachowa bazową bazę kodu nienaruszoną. Przekształcenie zostanie wykonane tylko w pamięci.
     */
    saveComponents: false,

    /**
     * Przedrostek klucza słownika
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Uruchom ekstraktor, aby przekształcić komponenty i wyodrębnić treść

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

> Przenieś wygenerowane pliki treści swoich stron poza `src/routes` po wykonaniu tej czynności, z powodu wyjaśnionego w kroku 5.

 </Tab>
 <Tab value='Babel compiler'>

> Od v9 `intlayerCompiler` jest dołączony do wtyczki `intlayer`. Nie musisz więc dodawać go ręcznie.

Zaktualizuj swój `vite.config.ts`, aby dołączyć wtyczkę `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // Dodaje wtyczkę kompilatora
  ],
});
```

```bash packageManager="npm"
npm run build # Lub npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Lub pnpm run dev
```

```bash packageManager="yarn"
yarn build # Lub yarn dev
```

```bash packageManager="bun"
bun run build # Lub bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Skonfiguruj TypeScript">

Intlayer używa rozszerzania modułów (module augmentation), aby czerpać korzyści z TypeScript i uczynić bazę kodu silniejszą.

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie wygenerowane typy:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... Twoje istniejące konfiguracje
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Dołącz automatycznie wygenerowane typy
  ],
}
```

Klucze słownika i ścieżki treści są teraz sprawdzane w czasie kompilacji:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Weryfikacja Twojej konfiguracji

Zbuduj i uruchom serwer, a następnie sprawdź, czy te żądania zachowują się zgodnie z oczekiwaniami:

```bash
npm run build
node .output/server/index.mjs
```

| Żądanie                               | Oczekiwana odpowiedź                         |
| ------------------------------------- | -------------------------------------------- |
| `GET /`                               | `200` — Angielski                            |
| `GET /` z `Accept-Language: fr`       | `302` → `/fr`                                |
| `GET /` z cookie `INTLAYER_LOCALE=es` | `302` → `/es`                                |
| `GET /fr`                             | `200` — Francuski, `<html lang="fr">`        |
| `GET /fr/about`                       | `200` — Francuska strona o nas               |
| `GET /en/about`                       | `302` → `/about` (kanoniczne przekierowanie) |
| `GET /xx`                             | `404`                                        |
| `GET /fr/nonexistent`                 | `404` po francusku                           |
| `GET /sitemap.xml`                    | `200` — wielojęzyczna mapa strony XML        |

Wiersze renderujące stronę zachowują się identycznie w trybie `vite dev`. Trzy wiersze z przekierowaniami mają zastosowanie tylko do zbudowanego serwera, chyba że samodzielnie zarejestrujesz procedurę obsługi jako middleware — zobacz krok 3.

> Uruchamiaj serwer deweloperski w środowisku Node (`vite dev`), a nie w Bun (`bun --bun vite dev`): SSR w SolidStart obecnie nie działa w środowisku uruchomieniowym Bun z błędem `Expected a Response object, but received 'NodeResponse'`. Nie jest to związane z Intlayer — powtarza się to na zwykłym szablonie — i dotyczy tylko serwera deweloperskiego, a nie `vite build`.

---

## Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć zatwierdzania ich w repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

---

## Rozszerzenie VS Code

Aby poprawić doświadczenie programistyczne z Intlayer, możesz zainstalować oficjalne **Rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd wstawny (inline)** przetłumaczonej treści.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

---

## Przejdź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) lub uzewnętrznić swoją treść za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## Odnośniki do dokumentacji

- [Dokumentacja Intlayer](https://intlayer.org)
- [Dokumentacja SolidStart](https://start.solidjs.com)
- [Haczyk useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [Haczyk useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [Deklaracja treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
