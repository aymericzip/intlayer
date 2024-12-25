# Dokumentation: `t` Funktion in `next-intlayer`

Die `t` Funktion im `next-intlayer` Paket ist ein grundlegendes Werkzeug für die Inline-Internationalisierung innerhalb Ihrer Next.js-Anwendung. Sie ermöglicht es Ihnen, Übersetzungen direkt innerhalb Ihrer Komponenten zu definieren, wodurch es einfach wird, lokalisierten Inhalt basierend auf der aktuellen Locale anzuzeigen.

---

## Übersicht

Die `t` Funktion wird verwendet, um Übersetzungen für verschiedene Locales direkt in Ihren Komponenten bereitzustellen. Durch das Übergeben eines Objekts, das Übersetzungen für jede unterstützte Locale enthält, gibt `t` die geeignete Übersetzung basierend auf dem aktuellen Locale-Kontext in Ihrer Next.js-Anwendung zurück.

---

## Hauptmerkmale

- **Inline-Übersetzungen**: Ideal für schnellen, Inline-Text, der keine separate Inhaltsdeklaration erfordert.
- **Automatische Locale-Auswahl**: Gibt automatisch die Übersetzung zurück, die der aktuellen Locale entspricht.
- **TypeScript-Unterstützung**: Bietet Typensicherheit und Autovervollständigung, wenn es mit TypeScript verwendet wird.
- **Einfache Integration**: Funktioniert nahtlos innerhalb von sowohl client- als auch serverseitigen Komponenten in Next.js.

---

## Funktionssignatur

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameter

- `translations`: Ein Objekt, in dem die Schlüssel Locale-Codes (z. B. `en`, `fr`, `es`) und die Werte die entsprechenden übersetzten Strings sind.

### Rückgabewert

- Ein String, der den übersetzten Inhalt für die aktuelle Locale darstellt.

---

## Anwendungsbeispiele

### Verwendung von `t` in einer Client-Komponente

Stellen Sie sicher, dass Sie die Direktive `'use client';` am Anfang Ihrer Komponenten-Datei einfügen, wenn Sie `t` in einer clientseitigen Komponente verwenden.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      de: "Dies ist der Inhalt eines Beispiels für eine Client-Komponente",
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
      de: "Dies ist der Inhalt eines Beispiels für eine Client-Komponente",
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
      de: "Dies ist der Inhalt eines Beispiels für eine Client-Komponente",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
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
      de: "Dies ist der Inhalt eines Beispiels für eine Server-Komponente",
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
      de: "Dies ist der Inhalt eines Beispiels für eine Server-Komponente",
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
      de: "Dies ist der Inhalt eines Beispiels für eine Server-Komponente",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Inline-Übersetzungen in Attributen

Die `t` Funktion ist besonders nützlich für Inline-Übersetzungen in JSX-Attributen. Wenn Sie Attribute wie `alt`, `title`, `href` oder `aria-label` lokalisieren, können Sie `t` direkt innerhalb des Attributs verwenden.

```jsx
<button
  aria-label={t({
    de: "Einreichen",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    de: "Einreichen",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      de: "Eine schöne Landschaft",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Fortgeschrittene Themen

### TypeScript-Integration

Die `t` Funktion ist typensicher, wenn sie mit TypeScript verwendet wird, und stellt sicher, dass alle erforderlichen Locales bereitgestellt werden.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  de: "Willkommen",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  de: "Willkommen",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  de: "Willkommen",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Locale-Erkennung und Kontext

In `next-intlayer` wird die aktuelle Locale durch Kontextanbieter verwaltet: `IntlayerClientProvider` und `IntlayerServerProvider`. Stellen Sie sicher, dass diese Anbieter Ihre Komponenten umschließen und die `locale`-Prop korrekt übergeben wird.

#### Beispiel:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

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

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Ihre Komponenten hier */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Häufige Fehler und Problemlösung

### `t` gibt undefinierte oder falsche Übersetzung zurück

- **Ursache**: Die aktuelle Locale ist nicht richtig gesetzt oder die Übersetzung für die aktuelle Locale fehlt.
- **Lösung**:
  - Überprüfen Sie, dass der `IntlayerClientProvider` oder `IntlayerServerProvider` korrekt mit der entsprechenden `locale` eingerichtet ist.
  - Stellen Sie sicher, dass Ihr Übersetzungsobjekt alle erforderlichen Locales enthält.

### Fehlende Übersetzungen in TypeScript

- **Ursache**: Das Übersetzungsobjekt erfüllt nicht die erforderlichen Locales, was zu TypeScript-Fehlern führt.
- **Lösung**: Verwenden Sie den Typ `IConfigLocales`, um die Vollständigkeit Ihrer Übersetzungen zu gewährleisten.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  de: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' führt zu einem TypeScript-Fehler [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  de: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' führt zu einem TypeScript-Fehler [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  de: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' führt zu einem TypeScript-Fehler [!code error]
};

const text = t(translations);
```

---

## Tipps für eine effektive Nutzung

1. **Verwenden Sie `t` für einfache Inline-Übersetzungen**: Ideal für die Übersetzung kleiner Textstücke direkt innerhalb Ihrer Komponenten.
2. **Bevorzugen Sie `useIntlayer` für strukturierte Inhalte**: Definieren Sie komplexere Übersetzungen und Wiederverwendung von Inhalten in Deklarationsdateien und verwenden Sie `useIntlayer`.
3. **Konsistente Locale-Bereitstellung**: Stellen Sie sicher, dass Ihre Locale konsistent über Ihre Anwendung hinweg durch die entsprechenden Anbieter bereitgestellt wird.
4. **Nutzen Sie TypeScript**: Verwenden Sie TypeScript-Typen, um fehlende Übersetzungen zu erfassen und Typensicherheit zu gewährleisten.

---

## Fazit

Die `t` Funktion in `next-intlayer` ist ein leistungsstarkes und praktisches Werkzeug für die Verwaltung von Inline-Übersetzungen in Ihren Next.js-Anwendungen. Durch eine effektive Integration verbessern Sie die Internationalisierungsfähigkeiten Ihrer App und bieten Ihren Nutzern weltweit eine bessere Erfahrung.

Für detailliertere Informationen zur Verwendung und zu erweiterten Funktionen verweisen Sie auf die [next-intlayer-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

---

**Hinweis**: Denken Sie daran, Ihre `IntlayerClientProvider` und `IntlayerServerProvider` ordnungsgemäß einzurichten, um sicherzustellen, dass die aktuelle Locale korrekt an Ihre Komponenten weitergegeben wird. Dies ist entscheidend, damit die `t` Funktion die richtigen Übersetzungen zurückgibt.
