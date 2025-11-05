---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja hooka useI18n | react-intlayer
description: Dowiedz się, jak używać hooka useI18n w pakiecie react-intlayer
keywords:
  - useI18n
  - i18n
  - tłumaczenie
  - słownik
  - Intlayer
  - internacjonalizacja
  - dokumentacja
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
history:
  - version: 6.0.0
    date: 2025-06-29
    changes: Pierwotne napisanie dokumentacji hooka `useI18n`
---

# Integracja z React: Dokumentacja hooka `useI18n`

Ta sekcja zawiera szczegółowe wskazówki dotyczące używania hooka `useI18n` w aplikacjach React, umożliwiając efektywną lokalizację treści.

## Importowanie `useI18n` w React

Hook `useI18n` można importować i integrować z aplikacjami React w zależności od kontekstu w następujący sposób:

- **Komponenty klienckie:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Użycie w komponentach React po stronie klienta
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Użycie w komponentach React po stronie klienta
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Użycie w komponentach React po stronie klienta
  ```

- **Komponenty serwerowe:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Użycie w komponentach React po stronie serwera
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Użycie w komponentach React po stronie serwera
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Użycie w komponentach React po stronie serwera
  ```

## Parametry

Ten hook przyjmuje dwa parametry:

1. **`namespace`**: Przestrzeń nazw słownika do zakresu kluczy tłumaczeń.
2. **`locale`** (opcjonalny): Żądany język. Jeśli nie zostanie określony, domyślnie zostanie użyty język z kontekstu.

## Słownik

Wszystkie klucze słownika muszą być zadeklarowane w plikach deklaracji zawartości, aby zwiększyć bezpieczeństwo typów i zapobiec błędom. [Instrukcje konfiguracji można znaleźć tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

## Przykłady użycia w React

Przykłady użycia hooka `useI18n` w komponentach React:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};

tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Wyświetl tytuł */}
      <p>{t("description")}</p> {/* Wyświetl opis */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Wyświetl tytuł */}
      <p>{t("description")}</p> {/* Wyświetl opis */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Wyświetl tytuł */}
      <p>{t("description")}</p> {/* Wyświetl opis */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Wyświetl tytuł */}
      <p>{t("description")}</p> {/* Wyświetl opis */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Wyświetl tytuł */}
      <p>{t("description")}</p> {/* Wyświetl opis */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## Obsługa Atrybutów

Podczas lokalizacji atrybutów, odpowiednio uzyskuj wartości tłumaczeń:

```jsx
<!-- Dla atrybutów dostępności (np. aria-label) używaj .value, ponieważ wymagane są czyste łańcuchy znaków -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Dodatkowe Zasoby

- **Intlayer Visual Editor**: Dla bardziej intuicyjnego zarządzania treścią, zapoznaj się z dokumentacją edytora wizualnego [tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

Ta sekcja dotyczy integracji hooka `useI18n` w aplikacjach React, upraszczając proces lokalizacji i zapewniając spójność treści w różnych lokalizacjach.
