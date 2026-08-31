---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "Create React App i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji Create React App. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Przetłumacz swoją stronę Create React App za pomocą Intlayer | Internacjonalizacja (i18n)

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-cra-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-react-cra-template) na GitHub.

## Czym jest Intlayer?

W porównaniu z głównymi rozwiązaniami, takimi jak `react-i18next` lub `i18next`, Intlayer to rozwiązanie wyposażone w zintegrowane optymalizacje, takie jak:

<AccordionGroup>

<Accordion header="Pełne wsparcie React">

**Intlayer** to innowacyjna, open-source’owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

</Accordion>

<Accordion header="Rozmiar pakietu">

Zamiast ładować ogromne pliki JSON do swoich stron, ładuj tylko niezbędną zawartość. Intlayer pomaga **zmniejszyć rozmiar pakietu i stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość utrzymania">

Zakres zawartości aplikacji **ułatwia utrzymanie** aplikacji na dużą skalę. Możesz zduplikować lub usunąć pojedynczy folder funkcji bez obciążenia przeglądem całej bazy kodu zawartości. Dodatkowo, Intlayer jest **w pełni typowany**, aby zapewnić dokładność Twojej zawartości.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **zmniejsza kontekst wymagany** przez Large Language Models (LLMs). Intlayer zawiera również pakiet narzędzi, takich jak **CLI** do testowania brakujących tłumaczeń, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)** i **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**, aby jeszcze bardziej usprawnić doświadczenie programisty (DX) dla agentów AI.

</Accordion>

Dzięki Intlayer możesz:

Użyj automatyzacji do tłumaczenia w swoim potoku CI/CD, używając wybranego przez siebie LLM-u na koszt twojego dostawcy AI. Intlayer oferuje również **kompilator** do automatyzacji ekstrakcji treści, a także [platformę webową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) pomagającą **tłumaczyć w tle**.

</Accordion>

<Accordion header="Wydajność">

Łączenie dużych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Intlayer optymalizuje ładowanie treści w czasie kompilacji.

</Accordion>

<Accordion header="Skalowanie bez dev">

- **Łatwe zarządzanie tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamiczna lokalizacja metadanych**, tras i treści.
- **Zapewnienie wsparcia dla TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystanie z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i zmiana lokalizacji.

</Accordion>
</AccordionGroup>

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji React

<Steps>

<Step number={1} title="Instalacja zależności">

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
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  Główny pakiet, który dostarcza narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **react-intlayer**

  Pakiet integrujący Intlayer z aplikacją React. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w React.

- **react-scripts-intlayer**

  Zawiera polecenia `react-scripts-intlayer` oraz wtyczki do integracji Intlayer z aplikacją opartą na Create React App. Te wtyczki bazują na [craco](https://craco.js.org/) i zawierają dodatkową konfigurację dla bundlera [Webpack](https://webpack.js.org/).

</Step>

<Step number={2} title="Konfiguracja Twojego projektu">

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

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
};

export default config;
```

> Za pomocą tego pliku konfiguracyjnego możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracyjnej](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={3} title="Zintegruj Intlayer w swojej konfiguracji CRA">

Zmień swoje skrypty, aby używać react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Skrypty `react-scripts-intlayer` bazują na [CRACO](https://craco.js.org/). Możesz również zaimplementować własną konfigurację opartą na wtyczce intlayer craco. [Zobacz przykład tutaj](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

</Step>

<Step number={4} title="Zadeklaruj swoją zawartość">

Utwórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia:

```tsx fileName="src/app.content.tsx" codeFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edytuj <code>src/App.tsx</code> i zapisz, aby przeładować
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w Twojej aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). I będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

> Jeśli Twój plik zawartości zawiera kod TSX, powinieneś rozważyć import `import React from "react";` w swoim pliku zawartości.

</Step>

<Step number={5} title="Wykorzystaj Intlayer w swoim kodzie">

Uzyskaj dostęp do swoich słowników zawartości w całej aplikacji:

```tsx {4,7} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> Uwaga: Jeśli chcesz użyć swojej zawartości w atrybucie typu `string`, takim jak `alt`, `title`, `href`, `aria-label` itp., musisz wywołać wartość funkcji, na przykład:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={6} title="Zmień język swojej zawartości" isOptional={true}>

Aby zmienić język swojej zawartości, możesz użyć funkcji `setLocale` dostarczonej przez hook `useLocale`. Funkcja ta pozwala ustawić lokalizację aplikacji i odpowiednio zaktualizować zawartość.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> Aby dowiedzieć się więcej o hooku `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="Dodaj lokalizowane routingi do swojej aplikacji" isOptional={true}>

Celem tego kroku jest utworzenie unikalnych ścieżek dla każdego języka. Jest to przydatne dla SEO oraz przyjaznych dla SEO adresów URL.
Przykład:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Domyślnie trasy nie mają prefiksu dla domyślnej lokalizacji. Jeśli chcesz dodać prefiks dla domyślnej lokalizacji, możesz ustawić opcję `middleware.prefixDefault` na `true` w swojej konfiguracji. Więcej informacji znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

Aby dodać lokalizowane routingi do swojej aplikacji, możesz utworzyć komponent `LocaleRouter`, który opakuje trasy Twojej aplikacji i obsłuży routing oparty na lokalizacji. Oto przykład użycia [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
// Importowanie niezbędnych zależności i funkcji
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Funkcje narzędziowe i typy z 'intlayer'
// Funkcje narzędziowe i typy z 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Typy React dla komponentów funkcyjnych i propsów
import { IntlayerProvider } from "react-intlayer"; // Provider dla kontekstu internacjonalizacji
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Komponenty routera do zarządzania nawigacją

// Destrukturyzacja konfiguracji z Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Komponent obsługujący lokalizację i opakowujący dzieci w odpowiedni kontekst lokalizacji.
 * Zarządza wykrywaniem i walidacją lokalizacji na podstawie URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Pobierz aktualną ścieżkę URL

  // Określ bieżącą lokalizację, domyślnie używając domyślnej, jeśli nie jest podana
  const currentLocale = locale ?? defaultLocale;

  // Usuń prefiks lokalizacji ze ścieżki, aby utworzyć bazową ścieżkę
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktualna ścieżka URL
  );

  /**
   * Jeśli middleware.prefixDefault jest prawdziwe, domyślna lokalizacja powinna zawsze mieć prefiks.
   */
  if (middleware.prefixDefault) {
    // Waliduj lokalizację
    if (!locale || !locales.includes(locale)) {
      // Przekieruj do domyślnej lokalizacji z zaktualizowaną ścieżką
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Zamień bieżący wpis w historii na nowy
        />
      );
    }

    // Opakuj dzieci w IntlayerProvider i ustaw bieżącą lokalizację
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Gdy middleware.prefixDefault jest false, domyślna lokalizacja nie jest poprzedzona prefiksem.
     * Upewnij się, że bieżąca lokalizacja jest prawidłowa i nie jest domyślną lokalizacją.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Wyklucz domyślną lokalizację
        )
        .includes(currentLocale) // Sprawdź, czy bieżąca lokalizacja znajduje się na liście ważnych lokalizacji
    ) {
      // Przekieruj do ścieżki bez prefiksu lokalizacji
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Opakuj dzieci w IntlayerProvider i ustaw bieżącą lokalizację
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Komponent routera, który ustawia trasy specyficzne dla lokalizacji.
 * Używa React Router do zarządzania nawigacją i renderowania zlokalizowanych komponentów.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Wzorzec ścieżki do przechwycenia lokalizacji (np. /en/, /fr/) i dopasowania wszystkich kolejnych ścieżek
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Opakowuje dzieci zarządzaniem lokalizacją
          />
        ))}

      {
        // Jeśli prefiksowanie domyślnej lokalizacji jest wyłączone, renderuj dzieci bezpośrednio na ścieżce głównej
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Opakowuje dzieci zarządzaniem lokalizacją
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Następnie możesz użyć komponentu `LocaleRouter` w swojej aplikacji:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Twój komponent AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

</Step>

<Step number={8} title="Zmiana URL po zmianie lokalizacji" isOptional={true}>

Aby zmienić URL podczas zmiany lokalizacji, możesz użyć właściwości `onLocaleChange` dostarczonej przez hook `useLocale`. Równolegle możesz użyć hooków `useLocation` i `useNavigate` z `react-router-dom`, aby zaktualizować ścieżkę URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Pobierz aktualną ścieżkę URL. Przykład: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Konstrukcja URL z zaktualizowaną lokalizacją
      // Przykład: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aktualizacja ścieżki URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Lokalizacja - np. FR */}
              {localeItem}
            </span>
            <span>
              {/* Język w swojej własnej lokalizacji - np. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Język w bieżącej lokalizacji - np. Francés przy ustawionej lokalizacji Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Język po angielsku - np. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Odwołania do dokumentacji:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` atrybut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` atrybut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` atrybut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` atrybut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Zmiana atrybutów języka i kierunku w tagu HTML" isOptional={true}>

Gdy Twoja aplikacja obsługuje wiele języków, kluczowe jest, aby zaktualizować atrybuty `lang` i `dir` w tagu `<html>`, tak aby odpowiadały bieżącej lokalizacji. Zapewnia to:

- **Dostępność**: Czytniki ekranu i technologie wspomagające polegają na poprawnym atrybucie `lang`, aby prawidłowo wymawiać i interpretować zawartość.
- **Renderowanie tekstu**: Atrybut `dir` (kierunek) zapewnia, że tekst jest wyświetlany w odpowiedniej kolejności (np. od lewej do prawej dla języka angielskiego, od prawej do lewej dla arabskiego lub hebrajskiego), co jest kluczowe dla czytelności.
- **SEO**: Wyszukiwarki używają atrybutu `lang`, aby określić język strony, co pomaga w dostarczaniu odpowiednio zlokalizowanych treści w wynikach wyszukiwania.

Poprzez dynamiczną aktualizację tych atrybutów przy zmianie lokalizacji, zapewniasz spójne i dostępne doświadczenie dla użytkowników we wszystkich obsługiwanych językach.

#### Implementacja hooka

Utwórz niestandardowy hook do zarządzania atrybutami HTML. Hook nasłuchuje zmian lokalizacji i odpowiednio aktualizuje atrybuty:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualizuje atrybuty `lang` i `dir` elementu HTML <html> na podstawie bieżącej lokalizacji.
 * - `lang`: Informuje przeglądarki i wyszukiwarki o języku strony.
 * - `dir`: Zapewnia poprawny kierunek czytania (np. 'ltr' dla angielskiego, 'rtl' dla arabskiego).
 *
 * Ta dynamiczna aktualizacja jest niezbędna dla prawidłowego renderowania tekstu, dostępności i SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualizuje atrybut języka na bieżącą lokalizację.
    document.documentElement.lang = locale;

    // Ustawia kierunek tekstu na podstawie bieżącej lokalizacji.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### Użycie Hooka w Twojej Aplikacji

Zintegruj hook w swoim głównym komponencie, aby atrybuty HTML były aktualizowane za każdym razem, gdy zmienia się locale:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Zastosuj hook do aktualizacji atrybutów lang i dir tagu <html> na podstawie lokalizacji.
  useI18nHTMLAttributes();

  // ... Reszta twojego komponentu
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

Wprowadzając te zmiany, Twoja aplikacja:

- Zapewni, że atrybut **language** (`lang`) poprawnie odzwierciedla bieżącą lokalizację, co jest ważne dla SEO i zachowania przeglądarki.
- Dostosuje **kierunek tekstu** (`dir`) zgodnie z lokalizacją, poprawiając czytelność i użyteczność dla języków o różnych kierunkach czytania.
- Zapewni bardziej **dostępne** doświadczenie, ponieważ technologie wspomagające polegają na tych atrybutach, aby działać optymalnie.
  </Step>

</Steps>

### Konfiguracja TypeScript

Intlayer używa rozszerzenia modułów (module augmentation), aby wykorzystać zalety TypeScript i wzmocnić Twoją bazę kodu.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Dołącz automatycznie generowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić swoje doświadczenie deweloperskie z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji projektu Create React App?">

- **`react-i18next` / `i18next`**: najbardziej rozpowszechnione rozwiązanie z przestrzeniami nazw JSON ładowanymi w runtime.
- **`react-intl`** oraz **`Lingui`**: oparte na formatowaniu ICU i ekstrakcji.
- **`Intlayer`**: najbardziej zaawansowane rozwiązanie. Treści deklarowane w dowolnym miejscu bazy kodu ([obok każdego komponentu lub centralnie](https://intlayer.org/blog/per-component-vs-centralized-i18n)) i kompilowane w czasie budowania przez `react-scripts-intlayer`, w pełni typowane, z tłumaczeniem AI, edytorem wizualnym i systemem CMS.

Create React App posiada własną konfigurację webpacka, więc integracja odbywa się przez zamiennik `react-scripts-intlayer` dla `react-scripts`. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar mojego bundle'a w React?">

Znacznie mniej niż rozwiązania oparte na przestrzeniach nazw, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Kompilator czasu budowy zastępuje wywołania `useIntlayer` dokładnymi wpisami ze słownika, których używa komponent, dzięki czemu nieużywane klucze i nieużywane języki są usuwane, a [słowniki dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę na poszczególne języki. W porównaniu z typowymi alternatywami, Intlayer zmniejsza rozmiar bundle'a i strony nawet o 50%. Zobacz [optymalizację bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="Czy mogę zmigrować z react-i18next lub react-intl bez przepisywania moich komponentów?">

Tak, i są dwie drogi. Możesz migrować treść stopniowo za pomocą [przewodnika migracji z react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_react-i18next_to_intlayer.md) lub [przewodnika migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md). Możesz także zachować dotychczasowe API: [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) udostępniają dokładnie to samo API co `react-i18next`, `react-intl` i `i18next`, ale zasilane słownikami Intlayer.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. Wtyczka [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. Wtyczka [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić zawartość według języka zamiast grupować lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje komponenty, wyodrębni ciągi widoczne dla użytkownika i utworzy plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast ręcznie kopiować ciągi do katalogu pojedynczo.

W przypadku w pełni zautomatyzowanego procesu [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie budowania: skanuje kod JSX, TSX, Vue i Svelte przy każdej zmianie, generuje słowniki i utrzymuje je w synchronizacji za pośrednictwem hot module replacement, dzięki czemu nie trzeba w ogóle ręcznie utrzymywać kluczy.

Warto pamiętać o dwóch ograniczeniach przed włączeniem kompilatora. Działa on w oparciu o analizę statyczną, więc ciągi tekstowe istniejące tylko w czasie wykonywania, takie jak kody błędów API czy pola z CMS, pozostają poza jego zasięgiem. Musi on także odróżnić tekst dla użytkownika od logiki aplikacji, takiej jak `className="active"` czy kod stanu, co w dużej bazie kodu wymaga kilku adnotacji. Polecenie [extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) unika obu tych problemów, pozostawiając Ci pełną kontrolę.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku treści, który go deklaruje, wyodrębnianie treści z komponentu oraz uruchamianie build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: taka sama świadomość w dowolnym edytorze obsługującym LSP, z funkcjami przejdź do definicji (go to definition), znajdź wszystkie referencje, podglądem przetłumaczonej wartości po najechaniu kursorem, autouzupełnianiem kluczy i pól oraz ostrzeżeniem, gdy klucz nie jest nigdzie zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, co ułatwia migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystent odpowiada na podstawie aktualnej dokumentacji zamiast zgadywać i może samodzielnie wykonywać polecenia, takie jak `intlayer fill`.
- **[Umiejętności agenta (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz po jednej dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` oznacza zakodowane na stałe ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słownika i nieużywanej zawartości.

</Question>

<Question title="Create React App nie jest już rozwijany. Czy powinienem najpierw przejść na Vite?">

Jeśli planujesz migrację, zrób to w pierwszej kolejności i skorzystaj z [przewodnika po Vite i React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md): wtyczka Vite jest lepiej wspierana i zapewnia znacznie szybsze budowanie. Jeśli jeszcze nie jesteś gotowy, ten przewodnik w pełni działa, a deklaracje treści nie zmieniają się między obiema konfiguracjami, więc późniejsza zmiana bundlera nie wymaga przepisywania i18n.

</Question>

<Question title="Jak skonfigurować routing uwzględniający lokalizację w projekcie Create React App?">

W przypadku React Routera zapoznaj się z [przewodnikiem po React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_react_router_v7.md). W aplikacji bez routera opcję `routing.mode` można ustawić na `"no-prefix"` lub `"search-params"`, aby lokalizacja była przechowywana w ciasteczku lub parametrze zapytania zamiast w ścieżce URL. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Question>

<Question title="Jak zarządzać metadanymi SEO w aplikacji React renderowanej po stronie klienta?">

Ustaw atrybuty `lang` i `dir` w elemencie `html` na podstawie aktywnego języka i wyemituj alternatywy `hreflang` dla każdej zadeklarowanej lokalizacji za pomocą `getMultilingualUrls`, w tym `x-default`. W przypadku stron wymagających niezawodnego indeksowania przez roboty, preferuj architekturę pre-renderowaną lub SSR.

</Question>

<Question title="Jak obsługiwać języki pisane od prawej do lewej, takie jak arabski lub hebrajski?">

Krok 9 to opisuje. Funkcja `getHTMLTextDir` zwraca `ltr`, `rtl` lub `auto` dla danego języka, więc ustawiasz `lang` i `dir` w elemencie głównym na podstawie aktywnego języka, a logiczne reguły CSS dbają o układ.

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację za pomocą AI?">

Uruchom `npx intlayer fill`. Narzędzie CLI wykrywa brakujące tłumaczenia i uzupełnia je za pomocą wybranego modelu LLM, korzystając z Twojego dostawcy i klucza API. Flaga `--git-diff` ogranicza operację do treści zmienionych na bieżącej gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="Czy Intlayer obsługuje formy mnogie, płeć i sformatowany tekst (rich text)?">

Tak: [formy mnogie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md), [treści zależne od płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md), warunki, [wstawki (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md) dla dłuższych tekstów oraz [formatowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md) dla liczb, dat i walut.

</Question>

<Question title="Jak tłumacze mogą edytować treść bez dotykania kodu?">

Za pośrednictwem [edytora wizualnego](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) w trybie self-hosted, który pozwala każdemu edytować tekst bezpośrednio w działającej aplikacji, lub systemu [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) dla treści, które muszą zmieniać się bez konieczności ponownego wdrożenia.

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, włączając zastosowania komercyjne. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>
