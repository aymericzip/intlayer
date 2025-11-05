---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja hooka useIntlayer | next-intlayer
description: Zobacz, jak używać hooka useIntlayer w pakiecie next-intlayer
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
  - next-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Integracja z Next.js: Dokumentacja hooka `useIntlayer`

Hook `useIntlayer` jest dostosowany do aplikacji Next.js, aby efektywnie pobierać i zarządzać zlokalizowaną zawartością. Ta dokumentacja skupia się na tym, jak korzystać z hooka w projektach Next.js, zapewniając prawidłowe praktyki lokalizacyjne.

## Importowanie `useIntlayer` w Next.js

W zależności od tego, czy pracujesz nad komponentami po stronie klienta, czy po stronie serwera w aplikacji Next.js, możesz zaimportować hook `useIntlayer` w następujący sposób:

- **Komponent klienta:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Używane w komponentach po stronie klienta
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Używane w komponentach po stronie klienta
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Używane w komponentach po stronie klienta
  ```

- **Komponent serwera:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Używane w komponentach po stronie serwera
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Używane w komponentach po stronie serwera
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Używane w komponentach po stronie serwera
  ```

## Parametry

1. **`key`**: Identyfikator klucza słownika w postaci łańcucha znaków, z którego chcesz pobrać zawartość.
2. **`locale`** (opcjonalny): Konkretna lokalizacja do użycia. Jeśli zostanie pominięta, hook domyślnie użyje lokalizacji ustawionej w kontekście klienta lub serwera.

## Pliki słownika

Kluczowe jest, aby wszystkie klucze zawartości były zdefiniowane w plikach deklaracji zawartości, aby zapobiec błędom w czasie wykonywania i zapewnić bezpieczeństwo typów. Takie podejście ułatwia również integrację z TypeScript dla walidacji na etapie kompilacji.

Instrukcje dotyczące konfigurowania plików deklaracji zawartości są dostępne [tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

## Przykład użycia w Next.js

Oto jak można zaimplementować hook `useIntlayer` na stronie Next.js, aby dynamicznie ładować zlokalizowaną zawartość w oparciu o aktualną lokalizację aplikacji:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Obsługa lokalizacji atrybutów

Aby lokalizować atrybuty takie jak `alt`, `title`, `href`, `aria-label` itp., upewnij się, że poprawnie odwołujesz się do zawartości:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Dalsze informacje

- **Intlayer Visual Editor**: Dowiedz się, jak korzystać z edytora wizualnego, aby łatwiej zarządzać treścią [tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

Niniejsza dokumentacja opisuje użycie hooka `useIntlayer` specjalnie w środowiskach Next.js, oferując solidne rozwiązanie do zarządzania lokalizacją w Twoich aplikacjach Next.js.
