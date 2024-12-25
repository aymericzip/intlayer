# Dokumentation: `t` Funktion in `react-intlayer`

Die `t` Funktion im `react-intlayer` Paket ist ein grundlegendes Werkzeug für Inline-Internationalisierung innerhalb Ihrer React-Anwendung. Sie ermöglicht es Ihnen, Übersetzungen direkt in Ihren Komponenten zu definieren, wodurch es einfach ist, lokalisierten Inhalt basierend auf der aktuellen Locale anzuzeigen.

---

## Übersicht

Die `t` Funktion wird verwendet, um Übersetzungen für verschiedene Lokalisierungen direkt in Ihren Komponenten bereitzustellen. Durch das Übergeben eines Objekts, das Übersetzungen für jede unterstützte Locale enthält, gibt `t` die entsprechende Übersetzung basierend auf dem aktuellen Locale-Kontext in Ihrer React-Anwendung zurück.

---

## Hauptmerkmale

- **Inline-Übersetzungen**: Ideal für schnellen, Inline-Text, der keine separate Inhaltsdeklaration erfordert.
- **Automatische Locale-Auswahl**: Gibt automatisch die Übersetzung zurück, die der aktuellen Locale entspricht.
- **TypeScript-Unterstützung**: Bietet Typensicherheit und Autovervollständigung bei Verwendung mit TypeScript.
- **Einfache Integration**: Funktioniert nahtlos innerhalb von React-Komponenten.

---

## Funktionssignatur

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel Locale-Codes sind (z. B. `en`, `fr`, `es`) und die Werte die entsprechenden übersetzten Zeichenfolgen sind.

### Rückgabe

- Eine Zeichenfolge, die den übersetzten Inhalt für die aktuelle Locale darstellt.

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

Die `t` Funktion ist besonders nützlich für Inline-Übersetzungen in JSX-Attributen. Wenn Sie Attribute wie `alt`, `title`, `href` oder `aria-label` lokalisieren, können Sie `t` direkt innerhalb des Attributs verwenden.

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

Die `t` Funktion ist typensicher, wenn sie mit TypeScript verwendet wird, und stellt sicher, dass alle erforderlichen Lokalisierungen bereitgestellt werden.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Locale-Erkennung und Kontext

In `react-intlayer` wird die aktuelle Locale durch den `IntlayerProvider` verwaltet. Stellen Sie sicher, dass dieser Provider Ihre Komponenten umschließt und das `locale` Prop korrekt übergeben wird.

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

## Häufige Fehler und Fehlersuche

### `t` gibt undefinierte oder falsche Übersetzung zurück

- **Ursache**: Die aktuelle Locale ist nicht korrekt eingestellt oder die Übersetzung für die aktuelle Locale fehlt.
- **Lösung**:
  - Überprüfen Sie, ob der `IntlayerProvider` richtig konfiguriert ist mit der entsprechenden `locale`.
  - Stellen Sie sicher, dass Ihr Übersetzungsobjekt alle erforderlichen Lokalisierungen enthält.

### Fehlende Übersetzungen in TypeScript

- **Ursache**: Das Übersetzungsobjekt erfüllt nicht die erforderlichen Lokalisierungen, was zu TypeScript-Fehlern führt.
- **Lösung**: Verwenden Sie den Typ `IConfigLocales`, um die Vollständigkeit Ihrer Übersetzungen zu erzwingen.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' verursacht einen TypeScript-Fehler
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

1. **Verwenden Sie `t` für einfache Inline-Übersetzungen**: Ideal für die Übersetzung kleiner Textstücke direkt innerhalb Ihrer Komponenten.
2. **Bevorzugen Sie `useIntlayer` für strukturierte Inhalte**: Für komplexere Übersetzungen und Inhaltswiederverwendung definieren Sie Inhalte in Deklarationsdateien und verwenden `useIntlayer`.
3. **Konsistente Locale-Bereitstellung**: Stellen Sie sicher, dass Ihre Locale konsistent in Ihrer Anwendung durch den `IntlayerProvider` bereitgestellt wird.
4. **Nutzen Sie TypeScript**: Verwenden Sie TypeScript-Typen, um fehlende Übersetzungen zu erkennen und Typensicherheit zu gewährleisten.

---

## Fazit

Die `t` Funktion in `react-intlayer` ist ein mächtiges und praktisches Werkzeug für das Management von Inline-Übersetzungen in Ihren React-Anwendungen. Durch eine effektive Integration verbessern Sie die Internationalisierungsfähigkeiten Ihrer App und bieten eine bessere Erfahrung für Benutzer weltweit.

Für detailliertere Nutzung und erweiterte Funktionen, siehe die [react-intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

---

**Hinweis**: Denken Sie daran, Ihren `IntlayerProvider` ordnungsgemäß einzurichten, um sicherzustellen, dass die aktuelle Locale korrekt an Ihre Komponenten weitergegeben wird. Dies ist entscheidend, damit die `t` Funktion die richtigen Übersetzungen zurückgibt.
