---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja hooka useIntlayer | react-intlayer
description: Zobacz, jak używać hooka useIntlayer w pakiecie react-intlayer
keywords:
  - useIntlayer
  - słownik
  - klucz
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Integracja z React: Dokumentacja hooka `useIntlayer`

Ta sekcja zawiera szczegółowe wskazówki dotyczące używania hooka `useIntlayer` w aplikacjach React, umożliwiając efektywną lokalizację treści.

## Importowanie `useIntlayer` w React

Hook `useIntlayer` można zintegrować z aplikacjami React, importując go w zależności od kontekstu:

- **Komponent Klienta:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Używane w komponentach React po stronie klienta
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Używane w komponentach React po stronie klienta
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Używane w komponentach React po stronie klienta
  ```

- **Komponent Serwera:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Używane w komponentach React po stronie serwera
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Używane w komponentach React po stronie serwera
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Używane w komponentach React po stronie serwera
  ```

## Parametry

Hook przyjmuje dwa parametry:

1. **`key`**: Klucz słownika do pobrania zlokalizowanej zawartości.
2. **`locale`** (opcjonalny): Żądany locale. Domyślnie używany jest locale z kontekstu, jeśli nie zostanie podany.

## Słownik

Wszystkie klucze słownika muszą być zadeklarowane w plikach deklaracji zawartości, aby zwiększyć bezpieczeństwo typów i uniknąć błędów. Instrukcje konfiguracji znajdziesz [tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

## Przykład użycia w React

Demonstracja hooka `useIntlayer` w komponencie React:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
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

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
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

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p> {/* opis komponentu */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p> {/* opis komponentu */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p> {/* opis komponentu serwera */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p> {/* opis komponentu serwera */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Obsługa Atrybutów

Podczas lokalizowania atrybutów, odpowiednio uzyskuj dostęp do wartości zawartości:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Dodatkowe Zasoby

- **Intlayer Visual Editor**: Dla bardziej intuicyjnego zarządzania treścią, zapoznaj się z dokumentacją edytora wizualnego [tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

Ta sekcja koncentruje się na integracji hooka `useIntlayer` w aplikacjach React, upraszczając proces lokalizacji i zapewniając spójność treści w różnych lokalizacjach.
