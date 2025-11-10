---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Eine Komponente mehrsprachig machen (i18n-Bibliothek) in React und Next.js
description: Lernen Sie, wie Sie lokalisierten Inhalt deklarieren und abrufen, um eine mehrsprachige React- oder Next.js-Komponente mit Intlayer zu erstellen.
keywords:
  - i18n
  - komponent
  - react
  - mehrsprachig
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Wie man eine Komponente mehrsprachig macht (i18n) mit Intlayer

Diese Anleitung zeigt die minimalen Schritte, um eine UI-Komponente in zwei gängigen Setups mehrsprachig zu machen:

- React (Vite/SPA)
- Next.js (App Router)

Zuerst deklarieren Sie Ihren Inhalt und rufen ihn dann in Ihrer Komponente ab.

## 1) Deklarieren Sie Ihren Inhalt (gemeinsam für React und Next.js)

Erstellen Sie eine Inhaltsdeklarationsdatei in der Nähe Ihrer Komponente. Dies hält die Übersetzungen nah an der Verwendung und ermöglicht Typsicherheit.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "Eine mehrsprachige React-Komponente", // Kommentar auf Deutsch
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

JSON wird ebenfalls unterstützt, wenn Sie Konfigurationsdateien bevorzugen.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Eine mehrsprachige React-Komponente",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) Rufen Sie Ihren Inhalt ab

### Fall A — React-App (Vite/SPA)

Standardansatz: Verwenden Sie `useIntlayer`, um per Schlüssel abzurufen. Dies hält Komponenten schlank und typisiert.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Serverseitiges Rendering oder außerhalb des Providers: Verwenden Sie `react-intlayer/server` und übergeben Sie bei Bedarf eine explizite `locale`.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

Alternative: `useDictionary` kann ein vollständig deklariertes Objekt lesen, wenn Sie die Struktur lieber am Aufrufort zusammenhalten möchten.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Fall B — Next.js (App Router)

Bevorzugen Sie Server-Komponenten für Datensicherheit und Leistung. Verwenden Sie `useIntlayer` aus `next-intlayer/server` in Server-Dateien und `useIntlayer` aus `next-intlayer` in Client-Komponenten.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Tipp: Für Seiten-Metadaten und SEO können Sie Inhalte auch mit `getIntlayer` abrufen und mehrsprachige URLs über `getMultilingualUrls` generieren.

## Warum der Komponentenansatz von Intlayer der beste ist

- **Kollokation**: Inhaltsdeklarationen befinden sich nahe bei den Komponenten, was Drift reduziert und die Wiederverwendung in Designsystemen verbessert.
- **Typsicherheit**: Schlüssel und Strukturen sind stark typisiert; fehlende Übersetzungen werden zur Build-Zeit und nicht zur Laufzeit erkannt.
- **Server-first**: Funktioniert nativ in Server-Komponenten für bessere Sicherheit und Leistung; Client-Hooks bleiben ergonomisch.
- **Tree-shaking**: Es wird nur der Inhalt gebündelt, der von der Komponente verwendet wird, wodurch die Payloads in großen Apps klein bleiben.
- **DX & Tooling**: Eingebaute Middleware, SEO-Hilfen und optionale Visual Editor/AI-Übersetzungen optimieren die tägliche Arbeit.

Siehe die Vergleiche und Muster im Next.js-fokussierten Überblick: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## Verwandte Anleitungen und Referenzen

- React Setup (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStack Start: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Next.js Einrichtung: https://intlayer.org/doc/environment/nextjs
- Warum Intlayer vs. next-intl vs. next-i18next - https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

Diese Seiten enthalten End-to-End-Setup, Provider, Routing und SEO-Hilfen.
