---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayer Hook Dokumentation | react-intlayer
description: Siehe, wie der useIntlayer Hook für das react-intlayer Paket verwendet wird
keywords:
  - useIntlayer
  - Wörterbuch
  - Schlüssel
  - Intlayer
  - Internationalisierung
  - Dokumentation
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
    changes: "Initiale Historie"
author: aymericzip
---

# React-Integration: `useIntlayer` Hook Dokumentation

Dieser Abschnitt bietet eine detaillierte Anleitung zur Verwendung des `useIntlayer` Hooks in React-Anwendungen, um eine effiziente Inhaltslokalisierung zu ermöglichen.

## Beispielhafte Verwendung in React

Demonstration des `useIntlayer` Hooks innerhalb einer React-Komponente:

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
      <p>{content.description}</p>
    </div>
  );
};

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

## Zusätzliche Ressourcen

- **Intlayer Visual Editor**: Für eine intuitivere Verwaltung von Inhalten finden Sie die Dokumentation zum visuellen Editor [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

Dieser Abschnitt richtet sich speziell an die Integration des `useIntlayer` Hooks in React-Anwendungen, um den Lokalisierungsprozess zu vereinfachen und die Konsistenz der Inhalte über verschiedene Sprachversionen hinweg sicherzustellen.
