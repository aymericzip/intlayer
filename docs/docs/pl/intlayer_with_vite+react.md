---
createdAt: 2024-03-07
updatedAt: 2026-03-12
title: Vite + React i18n - Jak przetłumaczyć aplikację React w 2026
description: Dowiedz się, jak dodać internacjonalizację (i18n) do swojej aplikacji Vite i React za pomocą Intlayer. Postępuj zgodnie z tym przewodnikiem, aby uczynić swoją aplikację wielojęzyczną.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
---

# Przetłumacz swoją stronę Vite i React za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source'owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, trasy i treści.
- **Zapewnić wsparcie dla TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

---

## Przewodnik krok po kroku: jak skonfigurować Intlayer w aplikacji Vite i React

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">
  
<iframe title="Najlepsze rozwiązanie i18n dla Vite i React? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Application Template](https://github.com/aymericzip/intlayer-vite-react-template) na GitHub.

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**
  Główny pakiet dostarczający narzędzia do internacjonalizacji dla zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **react-intlayer**
  Pakiet integrujący Intlayer z aplikacją React. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w React.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

### Krok 2: Konfiguracja projektu

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

> Poprzez ten plik konfiguracyjny możesz ustawić zlokalizowane adresy URL, przekierowania middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Aby uzyskać pełną listę dostępnych parametrów, zapoznaj się z [dokumentacją konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer w swojej konfiguracji Vite

Dodaj wtyczkę intlayer do swojej konfiguracji.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Wtyczka Vite `intlayer()` służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji treści oraz monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo dostarcza aliasy w celu optymalizacji wydajności.

### Krok 4: Zadeklaruj swoją treść

Utwórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      en: (
        <>
          Edytuj <code>src/App.tsx</code> i zapisz, aby przetestować HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "pl": "Logo Vite",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "pl": "Logo React",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "pl": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "pl": "licznik to "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "pl": "Edytuj src/App.tsx i zapisz, aby przetestować HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "pl": "Kliknij na logotypy Vite i React, aby dowiedzieć się więcej"
      }
    }
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "pl": "Kliknij na logotypy Vite i React, aby dowiedzieć się więcej"
      }
    }
  }
}
```

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`) i będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

> Jeśli Twój plik zawartości zawiera kod TSX, powinieneś rozważyć import `import React from "react";` w swoim pliku zawartości.

### Krok 5: Wykorzystaj Intlayer w swoim kodzie

Uzyskaj dostęp do swoich słowników treści w całej aplikacji:

```tsx {5,9} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> Jeśli chcesz użyć swojej zawartości w atrybucie typu `string`, takim jak `alt`, `title`, `href`, `aria-label` itp., musisz wywołać wartość funkcji, na przykład:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md).

> Jeśli Twoja aplikacja już istnieje, możesz użyć [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) w połączeniu z [poleceniem extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md), aby przekonwertować tysiące komponentów w jedną sekundę.

### (Opcjonalny) Krok 6: Zmień język swojej zawartości

Aby zmienić język swojej zawartości, możesz użyć funkcji `setLocale` dostarczonej przez hook `useLocale`. Funkcja ta pozwala ustawić lokalizację aplikacji i odpowiednio zaktualizować zawartość.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Zmień język na angielski
    </button>
  );
};
```

> Aby dowiedzieć się więcej o hooku `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md).

### (Opcjonalny) Krok 7: Dodaj lokalizowane routingi do swojej aplikacji

Celem tego kroku jest utworzenie unikalnych ścieżek dla każdego języka. Jest to przydatne dla SEO oraz przyjaznych dla SEO adresów URL.
Przykład:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Domyślnie trasy nie mają prefiksu dla domyślnej lokalizacji. Jeśli chcesz dodać prefiks dla domyślnej lokalizacji, możesz ustawić opcję `middleware.prefixDefault` na `true` w swojej konfiguracji. Więcej informacji znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

Aby dodać lokalizowany routing do swojej aplikacji, możesz utworzyć komponent `LocaleRouter`, który opakuje trasy Twojej aplikacji i obsłuży routing oparty na lokalizacji. Oto przykład z użyciem [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
import { localeMap } from "intlayer"; // Funkcje narzędziowe i typy z 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Typy React dla komponentów funkcyjnych i propsów
import { IntlayerProvider } from "react-intlayer"; // Provider dla kontekstu internacjonalizacji
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Komponenty routera do zarządzania nawigacją

/**
 * Komponent routera, który ustawia trasy specyficzne dla lokalizacji.
 * Używa React Router do zarządzania nawigacją i renderowania zlokalizowanych komponentów.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // Wzorzec trasy do przechwytywania lokalizacji (np. /en/, /fr/) i dopasowania wszystkich kolejnych ścieżek
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // Opakowuje dzieci zarządzaniem lokalizacją
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

> Uwaga: Jeśli używasz `routing.mode: 'no-prefix' | 'search-params'`, prawdopodobnie nie musisz używać funkcji `localeMap`.

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

Równolegle możesz również użyć `intlayerProxy`, aby dodać routing po stronie serwera do swojej aplikacji. Ten plugin automatycznie wykryje bieżącą lokalizację na podstawie URL i ustawi odpowiedni cookie lokalizacji. Jeśli lokalizacja nie jest określona, plugin wybierze najbardziej odpowiednią lokalizację na podstawie preferencji językowych przeglądarki użytkownika. Jeśli żadna lokalizacja nie zostanie wykryta, nastąpi przekierowanie do domyślnej lokalizacji.

> Uwaga: aby używać `intlayerProxy` w produkcji, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    react(),
    intlayer(),
  ],
});
```

### (Opcjonalny) Krok 8: Zmiana URL po zmianie lokalizacji

Aby zmienić URL po zmianie lokalizacji, możesz użyć właściwości `onLocaleChange` dostarczanej przez hook `useLocale`. Równolegle możesz użyć hooków `useLocation` i `useNavigate` z `react-router-dom`, aby zaktualizować ścieżkę URL.

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
      // Zbuduj URL z zaktualizowanym locale
      // Przykład: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Zaktualizuj ścieżkę URL
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

> Odniesienia do dokumentacji:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/pl/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/pl/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/pl/docs/Web/Accessibility/ARIA/Attributes/aria-current)

Poniżej znajduje się zaktualizowany **Krok 9** z dodatkowymi wyjaśnieniami i dopracowanymi przykładami kodu:

---

### (Opcjonalny) Krok 9: Zmiana atrybutów języka i kierunku w elemencie HTML

Gdy Twoja aplikacja obsługuje wiele języków, kluczowe jest zaktualizowanie atrybutów `lang` i `dir` w tagu `<html>`, aby odpowiadały bieżącej lokalizacji. Zapewnia to:

- **Dostępność**: Czytniki ekranu i technologie wspomagające polegają na poprawnym atrybucie `lang`, aby prawidłowo wymawiać i interpretować zawartość.
- **Renderowanie tekstu**: Atrybut `dir` (kierunek) zapewnia, że tekst jest wyświetlany w odpowiedniej kolejności (np. od lewej do prawej dla angielskiego, od prawej do lewej dla arabskiego lub hebrajskiego), co jest niezbędne dla czytelności.
- **SEO**: Wyszukiwarki używają atrybutu `lang`, aby określić język Twojej strony, co pomaga w serwowaniu odpowiednio zlokalizowanych treści w wynikach wyszukiwania.

Aktualizując te atrybuty dynamicznie przy zmianie lokalizacji, zapewniasz spójne i dostępne doświadczenie dla użytkowników we wszystkich obsługiwanych językach.

#### Implementacja Hooka

Utwórz niestandardowy hook do zarządzania atrybutami HTML. Hook nasłuchuje zmian lokalizacji i odpowiednio aktualizuje atrybuty:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualizuje atrybuty `lang` i `dir` elementu HTML <html> na podstawie bieżącej lokalizacji.
 * - `lang`: Informuje przeglądarki i wyszukiwarki o języku strony.
 * - `dir`: Zapewnia prawidłowy kierunek czytania (np. 'ltr' dla angielskiego, 'rtl' dla arabskiego).
 *
 * Ta dynamiczna aktualizacja jest niezbędna dla prawidłowego renderowania tekstu, dostępności oraz SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualizuj atrybut języka na bieżący locale.
    document.documentElement.lang = locale;

    // Ustaw kierunek tekstu na podstawie bieżącego locale.
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
  // Zastosuj hook, aby aktualizować atrybuty lang i dir tagu <html> na podstawie locale.
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

Wprowadzając te zmiany, twoja aplikacja:

- Upewnij się, że atrybut **language** (`lang`) poprawnie odzwierciedla aktualną lokalizację, co jest ważne dla SEO i zachowania przeglądarki.
- Dostosuj **kierunek tekstu** (`dir`) zgodnie z lokalizacją, poprawiając czytelność i użyteczność dla języków o różnych kierunkach czytania.
- Zapewnij bardziej **dostępne** doświadczenie, ponieważ technologie wspomagające polegają na tych atrybutach, aby działać optymalnie.

### (Opcjonalny) Krok 10: Tworzenie lokalizowanego komponentu Link

Aby zapewnić, że nawigacja w Twojej aplikacji respektuje aktualny język, możesz stworzyć niestandardowy komponent `Link`. Komponent ten automatycznie dodaje prefiks z aktualnym językiem do wewnętrznych adresów URL. Na przykład, gdy użytkownik mówiący po francusku kliknie link do strony "About", zostanie przekierowany na `/fr/about` zamiast na `/about`.

To zachowanie jest przydatne z kilku powodów:

- **SEO i doświadczenie użytkownika**: Lokalizowane adresy URL pomagają wyszukiwarkom poprawnie indeksować strony specyficzne dla języka oraz dostarczać użytkownikom treści w ich preferowanym języku.
- **Spójność**: Korzystając z lokalizowanego linku w całej aplikacji, zapewniasz, że nawigacja pozostaje w obrębie aktualnego języka, zapobiegając nieoczekiwanym zmianom języka.
- **Utrzymanie**: Centralizacja logiki lokalizacji w jednym komponencie upraszcza zarządzanie adresami URL, co sprawia, że Twoja baza kodu jest łatwiejsza do utrzymania i rozbudowy wraz z rozwojem aplikacji.

Poniżej znajduje się implementacja lokalizowanego komponentu `Link` w TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps extends DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {}

/**
 * Funkcja pomocnicza do sprawdzania, czy dany URL jest zewnętrzny.
 * Jeśli URL zaczyna się od http:// lub https://, jest uznawany za zewnętrzny.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Niestandardowy komponent Link, który dostosowuje atrybut href na podstawie bieżącej lokalizacji.
 * Dla linków wewnętrznych używa `getLocalizedUrl`, aby poprzedzić URL lokalizacją (np. /fr/about).
 * Zapewnia to, że nawigacja pozostaje w tym samym kontekście lokalizacyjnym.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Jeśli link jest wewnętrzny i podano prawidłowy href, pobierz zlokalizowany URL.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

#### Jak to działa

- **Wykrywanie linków zewnętrznych**:  
  Funkcja pomocnicza `checkIsExternalLink` określa, czy URL jest zewnętrzny. Linki zewnętrzne pozostają niezmienione, ponieważ nie wymagają lokalizacji.

- **Pobieranie bieżącej lokalizacji**:  
  Hook `useLocale` dostarcza aktualną lokalizację (np. `fr` dla języka francuskiego).

- **Lokalizacja URL**:  
  Dla linków wewnętrznych (czyli nie zewnętrznych) używana jest funkcja `getLocalizedUrl`, która automatycznie dodaje prefiks lokalizacji do URL. Oznacza to, że jeśli użytkownik korzysta z wersji francuskiej, podanie `/about` jako `href` zostanie przekształcone na `/fr/about`.

- **Zwracanie linku**:  
  Komponent zwraca element `<a>` z zlokalizowanym URL, zapewniając, że nawigacja jest spójna z wybraną lokalizacją.

Integrując ten komponent `Link` w całej aplikacji, utrzymujesz spójne i świadome językowo doświadczenie użytkownika, jednocześnie korzystając z poprawy SEO i użyteczności.

### Konfiguracja TypeScript

Intlayer wykorzystuje rozszerzenie modułów (module augmentation), aby korzystać z zalet TypeScript i wzmocnić Twoją bazę kodu.

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

```bash
#  Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić swoje doświadczenie programistyczne z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### (Opcjonalnie) Krok 11 : Wyodrębnij zawartość swoich komponentów

Jeśli masz istniejącą bazę kodu, transformacja tysięcy plików może być czasochłonna.

Aby ułatwić ten proces, Intlayer proponuje [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md), aby przetransformować komponenty i wyodrębnić zawartość.

Aby go skonfigurować, możesz dodać sekcję `compiler` w pliku `intlayer.config.ts`:

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
     * Wskazuje, czy komponenty powinny zostać zapisane po transformacji. W ten sposób kompilator można uruchomić tylko raz, aby przetransformować aplikację, a następnie go usunąć.
     */
    saveComponents: false,

    /**
     * Prefiks klucza słownika
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Polecenie wyodrębniania'>

Uruchom ekstraktor, aby przetransformować komponenty i wyodrębnić zawartość

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

 </Tab>
 <Tab value='Kompilator Babel'>

Zaktualizuj `vite.config.ts`, aby dołączyć wtyczkę `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Dodaje wtyczkę kompilatora
  ],
});
```

```bash packageManager="npm"
npm run build # Lub npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyodrębnić swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
