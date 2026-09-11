---
createdAt: 2026-09-09
updatedAt: 2026-09-11
title: "Remix 3 i18n - Kompletny przewodnik po tłumaczeniu aplikacji"
description: "Zapomnij o i18next. Przewodnik 2026 po tworzeniu wielojęzycznej (i18n) aplikacji Remix 3. Tłumacz za pomocą agentów AI i optymalizuj rozmiar paczki, SEO oraz wydajność."
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Standardy internetowe
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Początkowa dokumentacja dla Remix 3"
author: aymericzip
---

# Przetłumacz swoją stronę Remix 3 za pomocą Intlayer | Internacjonalizacja (i18n)

Ten przewodnik pokazuje, jak zintegrować **Intlayer** w celu bezproblemowej internacjonalizacji w aplikacjach **Remix 3** z routingiem uwzględniającym język, bezpiecznymi pod kątem typów deklaracjami treści, komponentami JSX renderowanymi na serwerze oraz wsparciem dla środowisk Node.js, Bun, Deno i Cloudflare Workers.

## Czym jest Remix 3?

**Remix 3** reprezentuje fundamentalną zmianę architektoniczną w kierunku **modułowego, niezależnego od środowiska uruchomieniowego frameworka opartego w całości na standardach internetowych**. Zamiast powiązania z konkretnymi bundlerami lub własnościowymi API serwerowymi, Remix 3 jest dystrybuowany jako zestaw modułowych pakietów:

- **`remix/fetch-router`** (lub `remix/router`): Lekki, zgodny ze standardami routing oparty na Fetch API (`Request` i `Response`).
- **`remix/ui`**: Model komponentów JSX (`jsxImportSource: "remix/ui"`). Komponent to funkcja konfiguracyjna (setup function), która zwraca funkcję renderującą (render function), odbierając propsy za pośrednictwem typowanego uchwytu (handle).
- **`remix/middleware/render`**: Instaluje `context.render(<Page />)` dla każdego żądania, strumieniując drzewo JSX do obiektu HTML `Response`.
- **`remix/node-fetch-server`**: Adaptery serwerowe dla Node.js z natywnym wsparciem dla Bun, Deno i środowisk edge.
- **`remix/cookie`**: Kryptograficznie podpisane parsowanie i serializacja ciasteczek.

W połączeniu z **Intlayer** otrzymujesz kompletny system internacjonalizacji zapewniający bezpieczeństwo typów w czasie kompilacji, zautomatyzowane tłumaczenia AI, renderowanie po stronie serwera bez dodatkowego narzutu oraz intuicyjny routing językowy.

## Spis treści

<TOC/>

## Dlaczego warto wybrać Intlayer?

W porównaniu z tradycyjnymi rozwiązaniami, takimi jak `i18next` czy dedykowane loadery tłumaczeń, Intlayer oferuje zintegrowane środowisko programistyczne zoptymalizowane pod kątem nowoczesnej architektury aplikacji webowych:

<AccordionGroup>
<Accordion header="Pełna obsługa Remix 3 i standardów webowych">

Intlayer został stworzony do bezproblemowej współpracy ze standardami sieciowymi (`Request`, `Response`, `Headers` oraz `URL`). Integruje się z routerem Fetch w Remix 3 za pomocą lekkiego middleware, pobierając język ze ścieżki URL, ciasteczek lub nagłówków `Accept-Language` bez uzależniania od środowiska wykonawczego.

</Accordion>
<Accordion header="Bezpieczne pod kątem typów deklaracje treści">

Pożegnaj luźne klucze JSON i błędy brakujących tłumaczeń w czasie działania aplikacji. Intlayer wymusza weryfikację TypeScript dla wszystkich zadeklarowanych języków, ostrzegając już na etapie kompilacji, jeśli tłumaczenie jest niekompletne lub niepoprawne.

</Accordion>
<Accordion header="Zero narzutu na rozmiar paczki na serwerze">

Podczas korzystania z komponentów JSX Remix 3 renderowanych na serwerze, do strumienia odpowiedzi trafia wyłącznie przetłumaczony tekst dla wybranego języka. Komponenty działają w całości na serwerze, chyba że wyraźnie skonfigurujesz hydratację klienta za pomocą `clientEntry`. Domyślnie do klienta nie są wysyłane żadne katalogi tłumaczeń ani środowiska uruchomieniowe hydratacji.

</Accordion>
<Accordion header="Gotowość na agentów AI i automatyzację">

Intlayer umieszcza deklaracje treści (`.content.ts`) bezpośrednio przy logice tras, zmniejszając kontekst tokenów potrzebny dla modeli LLM. Wbudowane polecenia CLI, takie jak `intlayer fill` i `intlayer test`, pozwalają na automatyzację tłumaczeń w pipeline'ach CI/CD po bezpośrednim koszcie wybranego dostawcy AI.

</Accordion>
<Accordion header="Edytor wizualny i integracja z CMS">

Oprócz pracy z kodem, Intlayer zapewnia hostowany lokalnie [Edytor Wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) oraz [Zdalny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), umożliwiając edytorom i tłumaczom aktualizację treści bez ponownego wdrażania kodu.

</Accordion>
</AccordionGroup>

## Przewodnik krok po kroku

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak zinternacjonalizować aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo szablonu Remix 3 Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon Aplikacji](https://github.com/aymericzip/intlayer-remix-3-template) na GitHubie.

<Steps>
<Step number={1} title="Instalacja zależności">

Zainstaluj `intlayer` oraz `remix` (wersja 3) za pomocą wybranego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: Główny silnik internacjonalizacji zapewniający zarządzanie konfiguracją, deklarację słowników (`t()`, `Dictionary`), narzędzia CLI oraz interpreter czasu wykonania.
- **`remix`**: Ujednolicony pakiet frameworka Remix 3 eksportujący `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` oraz `remix/node-fetch-server`.

</Step>
<Step number={2} title="Konfiguracja Intlayer">

Utwórz plik `intlayer.config.ts` w katalogu głównym projektu, aby zadeklarować obsługiwane języki i ustawienia:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.POLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.POLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.POLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Dodatkowe informacje o konfiguracji znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>
<Step number={3} title="Deklarowanie treści wielojęzycznych">

Zadeklaruj przetłumaczoną treść w pliku `.content.ts`:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      pl: "Witaj w Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      pl: "Modułowa aplikacja oparta na standardach webowych z natywną obsługą i18n.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      pl: "Zmień język:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer obsługuje również formaty JSON, YAML i CommonJS. Zobacz [Dokumentację deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>
<Step number={4} title="Budowanie słowników Intlayer">

Skompiluj definicje słowników, aby wygenerować typy TypeScript oraz rejestry:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

To polecenie kompiluje zawartość do katalogu `.intlayer`, zapewniając autouzupełnianie w TypeScript i szybki dostęp do słowników.

</Step>
<Step number={5} title="Implementacja middleware Intlayer">

Remix 3 oferuje potok middleware za pośrednictwem `createRouter({ middleware: [...] })`.

Utwórz middleware Intlayer, które ustala język dla każdego przychodzącego żądania na podstawie:

1. Prefiksu ścieżki URL za pośrednictwem `getLocaleFromPath` (np. `/pl` lub `/fr`).
2. Funkcji pomocniczej `getLocale`, która sprawdza pliki cookie (`INTLAYER_LOCALE`), niestandardowe nagłówki (`x-intlayer-locale`), standardowe nagłówki `Accept-Language` oraz zdefiniowany `defaultLocale`.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Bezpieczny pod kątem typów klucz kontekstu do pobierania języka z RequestContext Remix 3.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Middleware Intlayer dla Remix 3.
 *
 * Ustala język żądania według priorytetu:
 * 1. Prefiks ścieżki URL (np. `/pl/...`) za pomocą `getLocaleFromPath`
 * 2. Negocjacja nagłówków i pamięci za pomocą `getLocale` (cookie, nagłówek niestandardowy, Accept-Language, domyślna wartość defaultLocale)
 *
 * Dołącza ustalony język do RequestContext w Remix 3.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Wykrywanie ścieżki (/pl/about -> "pl", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // Dołącz ustalony język do kontekstu żądania Remix 3
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // Dołącz ustalony język do kontekstu żądania Remix 3
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="Definiowanie bezpiecznych typowo tras">

Zdefiniuj trasy aplikacji za pomocą `route()` z `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Trasa domyślnego języka
  home: "/",

  // Trasa zlokalizowana z dynamicznym segmentem :locale
  localizedHome: "/:locale",
});
```

Użycie `route()` zapewnia bezpieczne typowo generowanie adresów URL w całej aplikacji:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "pl" }); // "/pl"
```

</Step>
<Step number={7} title="Renderowanie zlokalizowanych stron za pomocą JSX">

Remix 3 używa `remix/ui` do komponentów JSX. Komponent to **funkcja konfiguracyjna (setup function)**, która zwraca **funkcję renderującą (render function)**. Props są przekazywane przez typowany `handle` (na przykład `handle.props.locale`):

Utwórz współdzieloną powłokę dokumentu HTML:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import type { SetupFunction } from "remix/ui";

export const Document: SetupFunction<{
  title: string;
  lang?: string;
  dir?: string;
  children?: any;
}> = (handle) => {
  return () => {
    const { title, lang = "en", dir = "ltr", children } = handle.props;

    return (
      <html lang={lang} dir={dir}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
        </head>
        <body>{children}</body>
      </html>
    );
  };
};
```

Następnie utwórz widok strony głównej. Użyj `getIntlayer`, aby pobrać zawartość słownika dla aktywnego języka, i wyrenderuj przełącznik języków za pomocą `getLocalizedPath`:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import {
  getIntlayer,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import type { SetupFunction } from "remix/ui";
import { routes } from "../routes";
import { Document } from "./document";

export const HomePage: SetupFunction<{ locale: Locale }> = (handle) => {
  return () => {
    const { locale } = handle.props;
    const content = getIntlayer("home", locale);

    return (
      <Document
        title={content.title}
        lang={locale}
        dir={getHTMLTextDir(locale)}
      >
        <header>
          <nav aria-label="Languages">
            <span>{content.switchLanguage}</span>
            {locales.map((loc) => {
              const href = getLocalizedPath(routes.home.href(), loc);
              const isActive = loc === locale;
              return (
                <a
                  href={href}
                  class={isActive ? "active" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  {getLocaleName(loc, locale)}
                </a>
              );
            })}
          </nav>
        </header>
        <main>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </main>
      </Document>
    );
  };
};
```

> Remix JSX to nie React: nie ma hooków, `class` zapisuje się bez zmian (zamiast `className`), a komponenty są strumieniowane bezpośrednio do odpowiedzi HTML bez żadnego narzutu JavaScript po stronie klienta.

</Step>
<Step number={8} title="Łączenie routera i serwera">

Utwórz `src/router.tsx`, aby zarejestrować middleware i zdefiniować akcje tras. Użyj `remix/middleware/render`, aby zainstalować pomocnika `context.render()`, i przekaż swój komponent JSX bezpośrednio:

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { HomePage } from "./views/home";

export const router = createRouter({
  middleware: [intlayer(), render()],
});

router.map(routes, {
  actions: {
    // Trasa dla języka domyślnego (np. /)
    home(context) {
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },

    // Trasa zlokalizowana (np. /fr, /es)
    localizedHome(context) {
      const { locale } = context.params;

      if (!isDeclaredLocale(locale)) {
        return new Response("Not Found", { status: 404 });
      }

      return context.render(<HomePage locale={locale} />);
    },
  },
});
```

> `context.render` przyjmuje opcjonalny argument `ResponseInit` jako drugi parametr, co pozwala ustawić niestandardowe nagłówki (np. `Content-Language` lub `Cache-Control`) obok renderowanej strony:
>
> ```typescript
> return context.render(<HomePage locale={locale} />, {
>   headers: { "Content-Language": locale },
> });
> ```

Teraz połącz `src/server.ts` za pomocą `remix/node-fetch-server` dla Node.js (lub wyeksportuj moduł obsługi `fetch` bezpośrednio dla Bun, Deno lub Cloudflare Workers):

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Serwer HTTP Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Serwer działa pod adresem http://localhost:${PORT}`);
});

// Eksport dla Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Audyt i automatyczne uzupełnianie tłumaczeń">

Intlayer udostępnia narzędzie CLI do sprawdzania brakujących tłumaczeń i ich automatycznego uzupełniania za pomocą AI:

```bash packageManager="npm"
# Sprawdź brakujące tłumaczenia
npx intlayer test

# Uzupełnij brakujące tłumaczenia za pomocą AI
npx intlayer fill
```

```bash packageManager="pnpm"
# Sprawdź brakujące tłumaczenia
pnpm dlx intlayer test

# Uzupełnij brakujące tłumaczenia za pomocą AI
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Sprawdź brakujące tłumaczenia
yarn dlx intlayer test

# Uzupełnij brakujące tłumaczenia za pomocą AI
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Sprawdź brakujące tłumaczenia
bun x intlayer test

# Uzupełnij brakujące tłumaczenia za pomocą AI
bun x intlayer fill
```

</Step>
</Steps>

## Konfiguracja TypeScript

Skonfiguruj `tsconfig.json`, aby wskazać środowisko wykonawcze `remix/ui` dla JSX i dołączyć wygenerowane typy `.intlayer`:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` sprawia, że `<HomePage />` odwołuje się do funkcji `createElement` z Remix zamiast z Reacta. Żadne środowisko wykonawcze React nie jest ładowane.

## Podsumowanie

Dzięki Remix 3 i Intlayer otrzymujesz lekki, w pełni typowany i elastyczny stos technologiczny oparty na otwartych standardach sieciowych. Twoja aplikacja może bez wysiłku skalować się od prostych stron marketingowych po globalnie dystrybuowane usługi renderowane na krawędzi (edge).
