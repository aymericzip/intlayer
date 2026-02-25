---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite i React i18n - Przekształć istniejącą aplikację w wielojęzyczną (przewodnik i18n 2026)
description: Odkryj, jak uczynić swoją istniejącą aplikację Vite i React wielojęzyczną przy użyciu Intlayer Compiler. Postępuj zgodnie z dokumentacją, aby ją umiędzynarodowić (i18n) i przetłumaczyć za pomocą AI.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Vite
  - React
  - Kompilator
  - AI
slugs:
  - doc
  - srodowisko
  - vite-i-react
  - kompilator
  - AI
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Pierwsze wydanie
---

# Jak uczynić istniejącą aplikację Vite i React wielojęzyczną (i18n) (przewodnik i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">
  
<iframe title="Najlepsze rozwiązanie i18n dla Vite i React? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-vite-react-template) na GitHubie.

## Spis treści

<TOC/>

## Dlaczego internacjonalizacja istniejącej aplikacji jest trudna?

Jeśli kiedykolwiek próbowałeś dodać wiele języków do aplikacji, która została zbudowana tylko dla jednego, znasz ten ból. To nie jest tylko „trudne” — to jest żmudne. Musisz przeszukać każdy plik, wyłowić każdy ciąg tekstowy i przenieść go do oddzielnych plików słownikowych.

Następnie przychodzi ryzykowna część: zastąpienie całego tego tekstu hookami w kodzie bez psuciu układu lub logiki. To rodzaj pracy, który wstrzymuje rozwój nowych funkcji na tygodnie i wydaje się niekończącym się refaktoryzacją.

## Co to jest Intlayer Compiler?

**Intlayer Compiler** został stworzony, aby pominąć tę ręczną, żmudną pracę. Zamiast ręcznego wyodrębniania ciągów znaków, kompilator robi to za Ciebie. Skanuje Twój kod, znajduje tekst i używa AI do generowania słowników w tle.
Następnie modyfikuje Twój kod podczas budowania, aby wstrzyknąć niezbędne hooki i18n. Zasadniczo piszesz aplikację tak, jakby była jednojęzyczna, a kompilator automatycznie zajmuje się wielojęzyczną transformacją.

> Dokumentacja kompilatora: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md)

### Ograniczenia

Ponieważ kompilator wykonuje analizę i transformację kodu (wstawianie hooków i generowanie słowników) w **czasie kompilacji**, może to **spowolnić proces budowania** Twojej aplikacji.

Aby złagodzić ten wpływ podczas programowania, możesz skonfigurować kompilator tak, aby działał w trybie [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) lub wyłączyć go, gdy nie jest potrzebny.

---

## Przewodnik krok po kroku po konfiguracji Intlayer w aplikacji Vite i React

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
bunx intlayer init
```

- **intlayer**
  Podstawowy pakiet dostarczający narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilacji i [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  Pakiet integrujący Intlayer z aplikacją React. Dostarcza dostawców kontekstu i hooki dla internacjonalizacji Reacta.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania plikami cookie i obsługi przekierowań URL.

### Krok 2: Skonfiguruj swój projekt

Utwórz plik konfiguracyjny, aby ustawić języki Twojej aplikacji:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.POLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true, // Można ustawić na 'build-only', aby ograniczyć wpływ na tryb dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Brak prefiksu comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Ta aplikacja to aplikacja mapowa", // Uwaga: możesz spersonalizować ten opis aplikacji
  },
};

export default config;
```

> **Uwaga**: Upewnij się, że masz ustawiony klucz `OPEN_AI_API_KEY` w zmiennych środowiskowych.

> Poprzez ten plik konfiguracyjny możesz skonfigurować zlokalizowane adresy URL, przekierowania middleware, nazwy plików cookie, lokalizację i rozszerzenia deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Krok 3: Zintegruj Intlayer w konfiguracji Vite

Dodaj wtyczkę intlayer do swojej konfiguracji.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> Wtyczka Vite `intlayer()` służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo zapewnia aliasy w celu optymalizacji wydajności.

> Wtyczka Vite `intlayerCompiler()` służy do wyodrębniania treści z komponentów i zapisywania plików `.content`.

### Krok 4: Skompiluj swój kod

Po prostu pisz swoje komponenty z zakodowanymi na sztywno ciągami znaków w domyślnym języku. Kompilator zajmie się resztą.

Przykład tego, jak może wyglądać Twoja strona:

<Tabs>
 <Tab value="Kod">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
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

 </Tab>
 <Tab value="Wynik">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      pl: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "licznik wynosi",
        editMessage: "Edytuj",
        hmrMessage: "i zapisz, aby przetestować HMR",
        readTheDocs: "Kliknij logo Vite i React, aby dowiedzieć się więcej",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

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
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
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

 </Tab>
</Tabs>

- **`IntlayerProvider`** służy do dostarczania ustawień regionalnych do zagnieżdżonych komponentów.

### (Opcjonalnie) Krok 6: Zmiana języka treści

Aby zmienić język treści, możesz użyć funkcji `setLocale` dostarczonej przez hook `useLocale`. Funkcja ta pozwala ustawić język aplikacji i odpowiednio zaktualizować treść.

```tsx fileName="src/components/LocaleSwitcher.tsx"
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

> Aby dowiedzieć się więcej o hooku `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md).

### (Opcjonalnie) Krok 7: Uzupełnij brakujące tłumaczenia

Intlayer udostępnia narzędzie CLI, które pomaga uzupełnić brakujące tłumaczenia. Możesz użyć polecenia `intlayer`, aby przetestować i uzupełnić brakujące tłumaczenia w swoim kodzie.

```bash
npx intlayer test         # Sprawdź, czy brakuje tłumaczeń
```

```bash
npx intlayer fill         # Uzupełnij brakujące tłumaczenia
```

> Więcej szczegółów znajdziesz w [dokumentacji CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/ci.md)

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć dodawania ich do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki wygenerowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby usprawnić proces programowania z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** w przypadku brakujących tłumaczeń.
- **Podgląd na żywo** przetłumaczonej treści.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) lub wyeksportować treść za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
