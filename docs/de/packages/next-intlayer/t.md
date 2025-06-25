---
docName: package__next-intlayer__t
url: https://intlayer.org/doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Dokumentation der t-Funktion | next-intlayer
description: Erfahren Sie, wie Sie die t-Funktion für das next-intlayer-Paket verwenden
keywords:
  - t
  - Übersetzung
  - Intlayer
  - next-intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# Dokumentation: `t` Funktion in `next-intlayer`

Die `t` Funktion im `next-intlayer` Paket ist ein grundlegendes Werkzeug für Inline-Internationalisierung innerhalb Ihrer Next.js-Anwendung. Sie ermöglicht es, Übersetzungen direkt in Ihren Komponenten zu definieren, was es einfach macht, lokalisierte Inhalte basierend auf der aktuellen Sprache anzuzeigen.

---

## Überblick

Die `t` Funktion wird verwendet, um Übersetzungen für verschiedene Sprachen direkt in Ihren Komponenten bereitzustellen. Durch die Übergabe eines Objekts, das Übersetzungen für jede unterstützte Sprache enthält, gibt `t` die entsprechende Übersetzung basierend auf dem aktuellen Sprachkontext in Ihrer Next.js-Anwendung zurück.

---

## Hauptmerkmale

- **Inline-Übersetzungen**: Ideal für schnelle, inline Texte, die keine separate Inhaltsdeklaration erfordern.
- **Automatische Sprachauswahl**: Gibt automatisch die Übersetzung zurück, die der aktuellen Sprache entspricht.
- **TypeScript-Unterstützung**: Bietet Typsicherheit und Autovervollständigung bei der Verwendung mit TypeScript.
- **Einfache Integration**: Funktioniert nahtlos in sowohl Client- als auch Server-Komponenten in Next.js.

---

## Funktionssignatur

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel Sprachcodes (z. B. `en`, `fr`, `es`) und die Werte die entsprechenden übersetzten Zeichenketten sind.

### Rückgabewert

- Eine Zeichenkette, die den übersetzten Inhalt für die aktuelle Sprache darstellt.

---

## Anwendungsbeispiele

### Verwendung von `t` in einer Client-Komponente

Stellen Sie sicher, dass Sie die Direktive `'use client';` am Anfang Ihrer Komponentendatei einfügen, wenn Sie `t` in einer Client-seitigen Komponente verwenden.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### Verwendung von `t` in einer Server-Komponente

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Inline-Übersetzungen in Attributen

Die `t` Funktion ist besonders nützlich für Inline-Übersetzungen in JSX-Attributen. Beim Lokalisieren von Attributen wie `alt`, `title`, `href` oder `aria-label` können Sie `t` direkt innerhalb des Attributs verwenden.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Erweiterte Themen

### TypeScript-Integration

Die `t` Funktion ist typsicher, wenn sie mit TypeScript verwendet wird, und stellt sicher, dass alle erforderlichen Sprachen bereitgestellt werden.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Spracherkennung und Kontext

In `next-intlayer` wird die aktuelle Sprache über Kontextanbieter verwaltet: `IntlayerClientProvider` und `IntlayerServerProvider`. Stellen Sie sicher, dass diese Anbieter Ihre Komponenten umschließen und die `locale` Eigenschaft korrekt übergeben wird.

#### Beispiel:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Ihre Komponenten hier */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Ihre Komponenten hier */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Ihre Komponenten hier */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Häufige Fehler und Fehlerbehebung

### `t` gibt undefiniert oder falsche Übersetzung zurück

- **Ursache**: Die aktuelle Sprache ist nicht richtig eingestellt, oder die Übersetzung für die aktuelle Sprache fehlt.
- **Lösung**:
  - Überprüfen Sie, ob der `IntlayerClientProvider` oder `IntlayerServerProvider` korrekt mit der entsprechenden `locale` eingerichtet ist.
  - Stellen Sie sicher, dass Ihr Übersetzungsobjekt alle erforderlichen Sprachen enthält.

### Fehlende Übersetzungen in TypeScript

- **Ursache**: Das Übersetzungsobjekt erfüllt nicht die erforderlichen Sprachen, was zu TypeScript-Fehlern führt.
- **Lösung**: Verwenden Sie den Typ `IConfigLocales`, um die Vollständigkeit Ihrer Übersetzungen zu erzwingen.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' verursacht einen TypeScript-Fehler [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' verursacht einen TypeScript-Fehler [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' verursacht einen TypeScript-Fehler [!code error]
};

const text = t(translations);
```

---

## Tipps für effektive Nutzung

1. **Verwenden Sie `t` für einfache Inline-Übersetzungen**: Ideal zum Übersetzen kleiner Textstücke direkt in Ihren Komponenten.
2. **Bevorzugen Sie `useIntlayer` für strukturierte Inhalte**: Für komplexere Übersetzungen und Inhaltswiederverwendung definieren Sie Inhalte in Deklarationsdateien und verwenden Sie `useIntlayer`.
3. **Konsistente Sprachbereitstellung**: Stellen Sie sicher, dass Ihre Sprache konsistent über die entsprechenden Anbieter in Ihrer Anwendung bereitgestellt wird.
4. **Nutzen Sie TypeScript**: Verwenden Sie TypeScript-Typen, um fehlende Übersetzungen zu erkennen und Typsicherheit zu gewährleisten.

---

## Fazit

Die `t` Funktion in `next-intlayer` ist ein leistungsstarkes und praktisches Werkzeug zur Verwaltung von Inline-Übersetzungen in Ihren Next.js-Anwendungen. Durch eine effektive Integration verbessern Sie die Internationalisierungsfähigkeiten Ihrer App und bieten eine bessere Benutzererfahrung weltweit.

Für detailliertere Nutzung und erweiterte Funktionen lesen Sie die [next-intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md).

---

**Hinweis**: Denken Sie daran, Ihre `IntlayerClientProvider` und `IntlayerServerProvider` ordnungsgemäß einzurichten, um sicherzustellen, dass die aktuelle Sprache korrekt an Ihre Komponenten weitergegeben wird. Dies ist entscheidend, damit die `t` Funktion die richtigen Übersetzungen zurückgibt.
