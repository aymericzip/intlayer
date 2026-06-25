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
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Integracja z React: Dokumentacja hooka `useIntlayer`

Ta sekcja zawiera szczegółowe wskazówki dotyczące używania hooka `useIntlayer` w aplikacjach React, umożliwiając efektywną lokalizację treści.

## Przykład użycia w React

Demonstracja hooka `useIntlayer` w komponencie React:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

## Dodatkowe Zasoby

- **Intlayer Visual Editor**: Dla bardziej intuicyjnego zarządzania treścią, zapoznaj się z dokumentacją edytora wizualnego [tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

Ta sekcja koncentruje się na integracji hooka `useIntlayer` w aplikacjach React, upraszczając proces lokalizacji i zapewniając spójność treści w różnych lokalizacjach.
