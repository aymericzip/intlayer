---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Dokumentation der Funktion t | react-intlayer
description: Siehe, wie die Funktion t im react-intlayer-Paket verwendet wird
keywords:
  - t
  - Übersetzung
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
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initiale Historie
---

# Dokumentation: `t` Funktion in `react-intlayer`

Die `t`-Funktion im `react-intlayer`-Paket ist ein grundlegendes Werkzeug für die Inline-Internationalisierung innerhalb Ihrer React-Anwendung. Sie ermöglicht es Ihnen, Übersetzungen direkt in Ihren Komponenten zu definieren, wodurch es einfach wird, lokalisierten Inhalt basierend auf der aktuellen Sprache anzuzeigen.

---

## Übersicht

Die `t`-Funktion wird verwendet, um Übersetzungen für verschiedene Sprachen direkt in Ihren Komponenten bereitzustellen. Indem Sie ein Objekt übergeben, das Übersetzungen für jede unterstützte Sprache enthält, gibt `t` die entsprechende Übersetzung basierend auf dem aktuellen Sprachkontext in Ihrer React-Anwendung zurück.

---

## Hauptmerkmale

- **Inline-Übersetzungen**: Ideal für schnellen, inline-Text, der keine separate Inhaltsdeklaration erfordert.
- **Automatische Sprachauswahl**: Gibt automatisch die Übersetzung zurück, die der aktuellen Sprache entspricht.
- **TypeScript-Unterstützung**: Bietet Typsicherheit und Autovervollständigung bei Verwendung mit TypeScript.
- **Einfache Integration**: Funktioniert nahtlos innerhalb von React-Komponenten.

---

## Funktionssignatur

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel Sprachcodes (z. B. `en`, `fr`, `es`) sind und die Werte die entsprechenden übersetzten Zeichenketten.

### Rückgabewert

- Eine Zeichenkette, die den übersetzten Inhalt für die aktuelle Sprache darstellt.

---

## Anwendungsbeispiele

### Grundlegende Verwendung von `t` in einer Komponente

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Inline-Übersetzungen in Attributen

Die Funktion `t` ist besonders nützlich für Inline-Übersetzungen in JSX-Attributen. Beim Lokalisieren von Attributen wie `alt`, `title`, `href` oder `aria-label` können Sie `t` direkt innerhalb des Attributs verwenden.

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
      en: "Eine schöne Landschaft",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Fortgeschrittene Themen

### TypeScript-Integration

Die Funktion `t` ist bei Verwendung mit TypeScript typensicher und stellt sicher, dass alle erforderlichen Sprachversionen bereitgestellt werden.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Willkommen",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Willkommen",
  fr: "Bienvenue",
  es: "Willkommen",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Willkommen",
  fr: "Bienvenue",
  es: "Willkommen",
};

const greeting = t(translations);
```

### Lokalerkennung und Kontext

In `react-intlayer` wird die aktuelle Sprache über den `IntlayerProvider` verwaltet. Stellen Sie sicher, dass dieser Provider Ihre Komponenten umschließt und die `locale`-Eigenschaft korrekt übergeben wird.

#### Beispiel:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ihre Komponenten hier */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ihre Komponenten hier */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ihre Komponenten hier */}
  </IntlayerProvider>
);
```

---

## Häufige Fehler und Problemlösungen

### `t` gibt undefined oder eine falsche Übersetzung zurück

- **Ursache**: Die aktuelle Locale ist nicht korrekt gesetzt oder die Übersetzung für die aktuelle Locale fehlt.
- **Lösung**:
  - Überprüfen Sie, ob der `IntlayerProvider` korrekt mit der passenden `locale` eingerichtet ist.
  - Stellen Sie sicher, dass Ihr Übersetzungsobjekt alle notwendigen Locales enthält.

### Fehlende Übersetzungen in TypeScript

- **Ursache**: Das Übersetzungsobjekt erfüllt nicht die erforderlichen Locales, was zu TypeScript-Fehlern führt.
- **Lösung**: Verwenden Sie den Typ `IConfigLocales`, um die Vollständigkeit Ihrer Übersetzungen sicherzustellen.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' führt zu einem TypeScript-Fehler
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' verursacht einen TypeScript-Fehler
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' verursacht einen TypeScript-Fehler
};

const text = t(translations);
```

---

## Tipps für eine effektive Nutzung

1. **Verwenden Sie `t` für einfache Inline-Übersetzungen**: Ideal zum Übersetzen kleiner Textstücke direkt in Ihren Komponenten.
2. **Bevorzugen Sie `useIntlayer` für strukturierte Inhalte**: Für komplexere Übersetzungen und Wiederverwendung von Inhalten definieren Sie Inhalte in Deklarationsdateien und verwenden `useIntlayer`.
3. **Konsistente Bereitstellung der Locale**: Stellen Sie sicher, dass Ihre Locale durchgehend in Ihrer Anwendung über den `IntlayerProvider` bereitgestellt wird.
4. **Nutzen Sie TypeScript**: Verwenden Sie TypeScript-Typen, um fehlende Übersetzungen zu erkennen und Typensicherheit zu gewährleisten.

---

## Fazit

Die `t`-Funktion in `react-intlayer` ist ein leistungsstarkes und praktisches Werkzeug zur Verwaltung von Inline-Übersetzungen in Ihren React-Anwendungen. Durch eine effektive Integration verbessern Sie die Internationalisierungsfähigkeiten Ihrer App und bieten Nutzern weltweit ein besseres Erlebnis.

Für detailliertere Anleitungen und erweiterte Funktionen konsultieren Sie bitte die [react-intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

---

**Hinweis**: Denken Sie daran, Ihren `IntlayerProvider` richtig einzurichten, damit die aktuelle Locale korrekt an Ihre Komponenten weitergegeben wird. Dies ist entscheidend dafür, dass die `t`-Funktion die richtigen Übersetzungen zurückgibt.
