---
docName: package__next-intlayer__t
url: https://intlayer.org/doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Dokumentation der Funktion t | next-intlayer
description: Siehe, wie die Funktion t im next-intlayer-Paket verwendet wird
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

Die `t`-Funktion im `next-intlayer`-Paket ist ein grundlegendes Werkzeug für die Inline-Internationalisierung innerhalb Ihrer Next.js-Anwendung. Sie ermöglicht es Ihnen, Übersetzungen direkt in Ihren Komponenten zu definieren, wodurch es einfach wird, lokalisierten Inhalt basierend auf der aktuellen Sprache anzuzeigen.

---

## Überblick

Die `t`-Funktion wird verwendet, um Übersetzungen für verschiedene Sprachen direkt in Ihren Komponenten bereitzustellen. Indem Sie ein Objekt übergeben, das Übersetzungen für jede unterstützte Sprache enthält, gibt `t` die passende Übersetzung basierend auf dem aktuellen Sprachkontext in Ihrer Next.js-Anwendung zurück.

---

## Hauptmerkmale

- **Inline-Übersetzungen**: Ideal für schnelle, inline-Texte, die keine separate Inhaltsdeklaration erfordern.
- **Automatische Sprachauswahl**: Gibt automatisch die Übersetzung zurück, die der aktuellen Sprache entspricht.
- **TypeScript-Unterstützung**: Bietet Typsicherheit und Autovervollständigung bei Verwendung mit TypeScript.
- **Einfache Integration**: Funktioniert nahtlos sowohl in Client- als auch in Server-Komponenten in Next.js.

---

## Funktionssignatur

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel Sprachcodes (z. B. `en`, `fr`, `es`) sind und die Werte die entsprechenden übersetzten Strings.

### Rückgabewert

- Ein String, der den übersetzten Inhalt für die aktuelle Sprache repräsentiert.

---

## Anwendungsbeispiele

### Verwendung von `t` in einer Client-Komponente

Stellen Sie sicher, dass Sie die Direktive `'use client';` am Anfang Ihrer Komponenten-Datei einfügen, wenn Sie `t` in einer Client-Komponente verwenden.

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

Die Funktion `t` ist besonders nützlich für Inline-Übersetzungen in JSX-Attributen.
Beim Lokalisieren von Attributen wie `alt`, `title`, `href` oder `aria-label` können Sie `t` direkt innerhalb des Attributs verwenden.

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

## Fortgeschrittene Themen

### TypeScript-Integration

Die Funktion `t` ist typensicher, wenn sie mit TypeScript verwendet wird, und stellt sicher, dass alle erforderlichen Sprachversionen bereitgestellt werden.

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

### Lokalerkennung und Kontext

In `next-intlayer` wird die aktuelle Locale über Kontext-Provider verwaltet: `IntlayerClientProvider` und `IntlayerServerProvider`. Stellen Sie sicher, dass diese Provider Ihre Komponenten umschließen und die `locale`-Eigenschaft korrekt übergeben wird.

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

## Häufige Fehler und Problemlösungen

### `t` Gibt Undefined oder falsche Übersetzung zurück

- **Ursache**: Die aktuelle Locale ist nicht korrekt gesetzt oder die Übersetzung für die aktuelle Locale fehlt.
- **Lösung**:
  - Überprüfen Sie, ob der `IntlayerClientProvider` oder `IntlayerServerProvider` korrekt mit der passenden `locale` eingerichtet ist.
  - Stellen Sie sicher, dass Ihr Übersetzungsobjekt alle notwendigen Locales enthält.

### Fehlende Übersetzungen in TypeScript

- **Ursache**: Das Übersetzungsobjekt erfüllt nicht die erforderlichen Locales, was zu TypeScript-Fehlern führt.
- **Lösung**: Verwenden Sie den Typ `IConfigLocales`, um die Vollständigkeit Ihrer Übersetzungen sicherzustellen.

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

## Tipps für eine effektive Nutzung

1. **Verwenden Sie `t` für einfache Inline-Übersetzungen**: Ideal, um kleine Textstücke direkt in Ihren Komponenten zu übersetzen.
2. **Bevorzugen Sie `useIntlayer` für strukturierte Inhalte**: Für komplexere Übersetzungen und die Wiederverwendung von Inhalten definieren Sie Inhalte in Deklarationsdateien und verwenden Sie `useIntlayer`.
3. **Konsistente Bereitstellung der Locale**: Stellen Sie sicher, dass Ihre Locale in Ihrer gesamten Anwendung durch die entsprechenden Provider konsistent bereitgestellt wird.
4. **Nutzen Sie TypeScript**: Verwenden Sie TypeScript-Typen, um fehlende Übersetzungen zu erkennen und Typensicherheit zu gewährleisten.

---

## Fazit

Die `t`-Funktion in `next-intlayer` ist ein leistungsstarkes und praktisches Werkzeug zur Verwaltung von Inline-Übersetzungen in Ihren Next.js-Anwendungen. Durch eine effektive Integration verbessern Sie die Internationalisierungsfähigkeiten Ihrer App und bieten Nutzern weltweit ein besseres Erlebnis.

Für eine detailliertere Nutzung und erweiterte Funktionen verweisen wir auf die [next-intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

---

**Hinweis**: Denken Sie daran, Ihren `IntlayerClientProvider` und `IntlayerServerProvider` korrekt einzurichten, um sicherzustellen, dass die aktuelle Locale korrekt an Ihre Komponenten weitergegeben wird. Dies ist entscheidend dafür, dass die `t`-Funktion die richtigen Übersetzungen zurückgibt.

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
