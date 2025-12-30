---
createdAt: 2025-03-09
updatedAt: 2025-12-30
title: Jak przetłumaczyć swoją aplikację mobilną Lynx i React – przewodnik i18n 2026
description: Dowiedz się, jak uczynić swoją aplikację mobilną Lynx i React wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zinternacjonalizować (i18n) i przetłumaczyć aplikację.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Dodaj polecenie init
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Przetłumacz swoją aplikację mobilną Lynx i React za pomocą Intlayer | Internacjonalizacja (i18n)

Zobacz [Application Template](https://github.com/aymericzip/intlayer-lynx-template) na GitHub.

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-lynx-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak zinternacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Czym jest Intlayer?

**Intlayer** to **innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji (i18n)**, która upraszcza wsparcie wielojęzyczne w nowoczesnych aplikacjach. Działa w wielu środowiskach JavaScript/TypeScript, **w tym w Lynx** (za pomocą pakietu `react-intlayer`).

Dzięki Intlayer możesz:

- **Łatwe zarządzanie tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Zapewnienie wsparcia TypeScript** dzięki automatycznie generowanym typom.
- **Dynamiczna lokalizacja** treści, w tym **łańcuchów UI** (a w React dla web, może także lokalizować metadane HTML itd.).
- **Korzystanie z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

---

## Krok 1: Instalacja zależności

W swoim projekcie Lynx zainstaluj następujące pakiety:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
bunx intlayer init
```

### Pakiety

- **intlayer**
- **intlayer**  
  Podstawowe narzędzie i18n do konfiguracji, zawartości słowników, generowania typów oraz poleceń CLI.

- **react-intlayer**  
  Integracja z React, która dostarcza context providers oraz React hooks, których użyjesz w Lynx do pobierania i przełączania lokalizacji.

- **lynx-intlayer**  
  Integracja z Lynx, która dostarcza plugin do integracji Intlayer z bundlerem Lynx.

---

## Krok 2: Utwórz konfigurację Intlayer

W katalogu głównym projektu (lub w dowolnym wygodnym miejscu) utwórz plik **konfiguracji Intlayer**. Może on wyglądać tak:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Dodaj inne potrzebne lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Dodaj inne potrzebne lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

W ramach tej konfiguracji możesz:

- Skonfigurować swoją **listę obsługiwanych lokalizacji**.
- Ustawić **domyślną** lokalizację.
- Później możesz dodać bardziej zaawansowane opcje (np. logi, niestandardowe katalogi z zawartością itp.).
- Zobacz [dokumentację konfiguracji Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) aby uzyskać więcej informacji.

## Krok 3: Dodaj wtyczkę Intlayer do bundlera Lynx

Aby używać Intlayer z Lynx, musisz dodać wtyczkę do swojego pliku `lynx.config.ts`:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... inne wtyczki
    pluginIntlayerLynx(),
  ],
});
```

## Krok 4: Dodaj dostawcę Intlayer

Aby utrzymać synchronizację języka użytkownika w całej aplikacji, musisz owinąć swój komponent root komponentem `IntlayerProvider` z pakietu `react-intlayer`.

Dodatkowo, musisz dodać plik funkcji `intlayerPolyfill`, aby zapewnić prawidłowe działanie Intlayer.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## Krok 5: Zadeklaruj swoją zawartość

Utwórz pliki **deklaracji treści** w dowolnym miejscu w swoim projekcie (zazwyczaj w katalogu `src/`), używając dowolnego z formatów rozszerzeń obsługiwanych przez Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- itd.

Przykład:

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "na Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Stuknij w logo i baw się dobrze!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edytuj",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "na Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Dotknij logo i baw się dobrze!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edytuj",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "en": "na Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Stuknij logo i baw się dobrze!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "en": "Edytuj",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "en": "aby zobaczyć aktualizacje!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!"
        }
      }
    ]
  }
}
```

> Aby uzyskać szczegóły dotyczące deklaracji treści, zobacz [dokumentację Intlayer dotycząca treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

---

## Krok 4: Użyj Intlayer w swoich komponentach

Użyj hooka `useIntlayer` w komponentach potomnych, aby uzyskać zlokalizowaną zawartość.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");

  const onTap = useCallback(() => {
    "tylko tło"; // komentarz po polsku
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> Podczas używania `content.someKey` w właściwościach opartych na łańcuchach znaków (np. `title` przycisku lub `children` komponentu `Text`), **wywołaj `content.someKey.value`**, aby uzyskać właściwy łańcuch znaków.

---

## (Opcjonalny) Krok 5: Zmiana lokalizacji aplikacji

Aby zmienić lokalizację z poziomu komponentów, możesz użyć metody `setLocale` hooka `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

To powoduje ponowne renderowanie wszystkich komponentów korzystających z zawartości Intlayer, wyświetlając teraz tłumaczenia dla nowej lokalizacji.

> Zobacz [`useLocale` docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md) po więcej szczegółów.

## Konfiguracja TypeScript (jeśli używasz TypeScript)

Intlayer generuje definicje typów w ukrytym folderze (domyślnie `.intlayer`), aby poprawić autouzupełnianie i wychwytywać błędy tłumaczeń:

```json5
// tsconfig.json
{
  // ... twoja istniejąca konfiguracja TS
  "include": [
    "src", // twój kod źródłowy
    ".intlayer/types/**/*.ts", // <-- upewnij się, że dołączone są automatycznie generowane typy
    // ... wszystko inne, co już dołączasz
  ],
}
```

To umożliwia funkcje takie jak:

- **Autouzupełnianie** dla kluczy słownika.
- **Sprawdzanie typów**, które ostrzega, jeśli odwołujesz się do nieistniejącego klucza lub niezgodności typu.

---

## Konfiguracja Git

Aby uniknąć zatwierdzania automatycznie generowanych plików przez Intlayer, dodaj następujące do swojego `.gitignore`:

```plaintext
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

---

### Rozszerzenie VS Code

Aby poprawić swoje doświadczenie deweloperskie z Intlayer, możesz zainstalować oficjalne **Rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Idź dalej

- **Edytor wizualny**: Użyj [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) do zarządzania tłumaczeniami wizualnie.
- **Integracja z CMS**: Możesz również zewnętrznie przechowywać i pobierać zawartość swojego słownika z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
- **Polecenia CLI**: Poznaj [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md) do zadań takich jak **wyodrębnianie tłumaczeń** lub **sprawdzanie brakujących kluczy**.

---
