---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vanilla JS i18n - Jak przetłumaczyć aplikację Astro + Vanilla JS w 2026 roku
description: Dowiedz się, jak dodać międzynarodowość (i18n) do swojej witryny Astro + Vanilla JS za pomocą Intlayer. Postępuj zgodnie z tym przewodnikiem, aby uczynić swoją witrynę wielojęzyczną.
keywords:
  - międzynarodowość
  - dokumentacja
  - Intlayer
  - Astro
  - Vanilla JS
  - JavaScript
  - TypeScript
slugs:
  - doc
  - environment
  - astro
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Początkowa dokumentacja dla Astro + Vanilla JS"
---

# Przetłumacz swoją witrynę Astro + Vanilla JS za pomocą Intlayer | Międzynarodowość (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna biblioteka międzynarodowości (i18n) o otwartym kodzie źródłowym, zaprojektowana w celu uproszczenia obsługi wielojęzyczności w nowoczesnych aplikacjach internetowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami**: Korzystając z deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane, trasy i treści**.
- **Zapewnić obsługę TypeScript**: Dzięki automatycznie generowanym typom dla lepszego autouzupełniania i wykrywania błędów.
- **Korzystać z zaawansowanych funkcji**: Takich jak dynamiczne wykrywanie języka i przełączanie języków.

---

## Przewodnik krok po kroku po konfiguracji Intlayer w Astro + Vanilla JS

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Sprawdź [szablon aplikacji](https://github.com/aymericzip/intlayer-astro-template) na GitHubie.

### Krok 1: Zainstaluj zależności

Zainstaluj niezbędne pakiety za pomocą preferowanego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer astro-intlayer vanilla-intlayer

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vanilla-intlayer

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vanilla-intlayer

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vanilla-intlayer

bun x intlayer init
```

- **intlayer**
  Główny pakiet zapewniający narzędzia i18n do zarządzania konfiguracją, tłumaczeniami, [deklaracją treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacją i [poleceniami CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **astro-intlayer**
  Wtyczka integracyjna Astro służąca do połączenia Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production); zawiera również oprogramowanie pośredniczące (middleware) do wykrywania preferowanego języka użytkownika, zarządzania plikami cookie i obsługi przekierowań URL.

- **vanilla-intlayer**
  Pakiet do integracji Intlayer z aplikacjami Vanilla JavaScript / TypeScript. Zapewnia singleton Pub/Sub (`IntlayerClient`) oraz pomocniki oparte na wywołaniach zwrotnych (`useIntlayer`, `useLocale` itp.), dzięki którym dowolna część Twoich skryptów Astro `<script>` może reagować na zmiany języka bez potrzeby posiadania UI frameworka.

### Krok 2: Skonfiguruj swój projekt

Utwórz plik konfiguracyjny, aby zdefiniować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.POLISH,
      // Twoje inne języki
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Za pośrednictwem tego pliku konfiguracyjnego możesz ustawić zlokalizowane adresy URL, przekierowania oprogramowania pośredniczącego, nazwy plików cookie, lokalizację i rozszerzenia deklaracji treści, wyłączyć dzienniki Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer ze swoją konfiguracją Astro

Dodaj wtyczkę `intlayer` do konfiguracji Astro. W przypadku Vanilla JS nie jest wymagana dodatkowa integracja z frameworkiem UI.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Wtyczka integracyjna `intlayer()` służy do integracji Intlayer z Astro. Zapewnia ona generowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Astro i udostępnia aliasy w celu optymalizacji wydajności.

### Krok 4: Zadeklaruj swoją treść

Twórz i zarządzaj swoimi deklaracjami treści, aby przechowywać tłumaczenia:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      pl: "Witaj świecie",
    }),
    description: t({
      en: "Welcome to my multilingual Astro site.",
      fr: "Bienvenue sur mon site Astro multilingue.",
      es: "Bienvenido a mi sitio Astro multilingüe.",
      pl: "Witaj na mojej wielojęzycznej stronie Astro.",
    }),
    switchLocale: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
      pl: "Zmień język:",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Deklaracje treści mogą być definiowane w dowolnym miejscu aplikacji, pod warunkiem, że są zawarte w `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Więcej informacji znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 5: Korzystanie z treści w Astro

Z Vanilla JS całe renderowanie po stronie serwera (SSR) odbywa się bezpośrednio w plikach `.astro` przy użyciu `getIntlayer`. Następnie, po stronie klienta, blok `<script>` inicjuje bibliotekę `vanilla-intlayer`, aby umożliwić przełączanie języków.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  getLocaleName,
  localeMap,
  locales,
  defaultLocale,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
const { greeting, description, switchLocale } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Link kanoniczny -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Linki hreflang -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <main>
      <h1 id="greeting">{greeting}</h1>
      <p id="description">{description}</p>

      <div class="locale-switcher">
        <span class="switcher-label">{switchLocale}</span>
        <div class="locale-buttons">
          {
            locales.map((localeItem) => (
              <a
                href={localeItem === locale ? undefined : getLocalizedUrl(pathWithoutLocale, localeItem)}
                class={`locale-btn ${localeItem === locale ? "active" : ""}`}
                data-locale={localeItem}
                aria-disabled={localeItem === locale}
              >
                {getLocaleName(localeItem)}
              </a>
            ))
          }
        </div>
      </div>
    </main>
  </body>
</html>
```

> **Uwaga na temat konfiguracji routingu:**
> Używana przez Ciebie struktura katalogów zależy od ustawienia `middleware.routing` w `intlayer.config.ts`:
>
> - **`prefix-no-default` (domyślnie):** Zachowuje domyślny język w katalogu głównym (bez prefiksu) i dodaje prefiksy do pozostałych. Użyj `[...locale]`, aby obsłużyć wszystkie przypadki.
> - **`prefix-all`:** Wszystkie adresy URL otrzymują prefiks języka. Możesz użyć standardowego `[locale]`, jeśli nie musisz traktować katalogu głównego oddzielnie.
> - **`search-param` lub `no-prefix`:** Katalogi językowe nie są wymagane. Język jest zarządzany za pomocą parametrów zapytania lub plików cookie.

### Krok 6: Dodanie przełącznika języków

W Astro z Vanilla JS przełącznik języków jest generowany na serwerze jako zwykłe linki i ożywiany po stronie klienta za pomocą bloku `<script>`. Gdy użytkownik kliknie link do języka, `vanilla-intlayer` ustawia plik cookie języka za pomocą `setLocale` przed przejściem do zlokalizowanego adresu URL.

```astro fileName="src/pages/[...locale]/index.astro"
<!-- Dołącz znaczniki strony po stronie serwera z kroku 5 -->

<script>
  import { installIntlayer, useLocale } from "vanilla-intlayer";
  import { getLocaleFromPath, getLocalizedUrl, type LocalesValues } from "intlayer";

  // Zainicjuj Intlayer po stronie klienta z językiem pobranym z bieżącej ścieżki
  const locale = getLocaleFromPath(window.location.pathname);
  installIntlayer({ locale: locale as LocalesValues });

  const { setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  // Podepnij zdarzenia kliknięcia pod linki przełącznika języków
  const localeLinks = document.querySelectorAll("[data-locale]");
  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const localeValue = link.getAttribute("data-locale") as LocalesValues;
      if (localeValue && localeValue !== locale) {
        e.preventDefault();
        setLocale(localeValue);
      }
    });
  });
</script>
```

> **Uwaga na temat trwałości:**
> `installIntlayer` inicjuje singleton Intlayer z językiem zdefiniowanym na serwerze. `useLocale` wraz z `onLocaleChange` zapewnia, że plik cookie języka zostanie ustawiony przed przekierowaniem przez middleware, co pozwoli zapamiętać preferencje językowe użytkownika przy przyszłych wizytach.

> **Uwaga na temat stopniowego ulepszania (Progressive Enhancement):**
> Linki w przełączniku języków będą działać jako standardowe znaczniki `<a>` nawet bez JavaScriptu. Gdy JavaScript jest obecny, wywołanie `setLocale` aktualizuje plik cookie przed przekierowaniem, zapewniając, że middleware poprawnie obsłuży wybór języka.

### Krok 7: Sitemap i Robots.txt

Intlayer oferuje narzędzia do dynamicznego generowania zlokalizowanej mapy witryny oraz pliku robots.txt.

#### Sitemap

Utwórz plik `src/pages/sitemap.xml.ts`, aby wygenerować mapę witryny obejmującą wszystkie Twoje zlokalizowane trasy.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Utwórz plik `src/pages/robots.txt.ts`, aby kontrolować indeksowanie przez wyszukiwarki.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Konfiguracja TypeScript

Intlayer wykorzystuje rozszerzenie modułów (module augmentation), aby skorzystać z TypeScript, czyniąc bazę kodu bardziej solidną.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoja istniejąca konfiguracja TypeScript
  "include": [
    // ... Twoja istniejąca konfiguracja TypeScript
    ".intlayer/**/*.ts", // Uwzględnij automatycznie generowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Zapobiega to ich przesyłaniu do repozytorium Git.

Aby to zrobić, dodaj następujące instrukcje do pliku `.gitignore`:

```bash
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować **oficjalne rozszerzenie Intlayer dla VS Code**.

[Instalacja z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd inline** przetłumaczonej treści.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Więcej informacji na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Pogłębiaj swoją wiedzę

Jeśli chcesz dowiedzieć się więcej, możesz również wdrożyć [Edytor Wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub użyć [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), aby wyeksternalizować swoją treść.
