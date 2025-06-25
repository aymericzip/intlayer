---
docName: package__react-intlayer__useLocale
url: https://intlayer.org/doc/packages/react-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Dokumentation des useLocale-Hooks | react-intlayer
description: Erfahren Sie, wie Sie den useLocale-Hook für das nächste intlayer-Paket verwenden
keywords:
  - useLocale
  - Wörterbuch
  - Schlüssel
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# React-Integration: `useLocale` Hook Dokumentation

Dieser Abschnitt bietet umfassende Details zum `useLocale` Hook aus der `react-intlayer` Bibliothek, die für die Verwaltung von Lokalisierungen in React-Anwendungen entwickelt wurde.

## Importieren von `useLocale` in React

Um den `useLocale` Hook in Ihre React-Anwendung zu integrieren, importieren Sie ihn aus dem entsprechenden Paket:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Wird in React-Komponenten für die Lokalisierungsverwaltung verwendet
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Wird in React-Komponenten für die Lokalisierungsverwaltung verwendet
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Wird in React-Komponenten für die Lokalisierungsverwaltung verwendet
```

## Übersicht

Der `useLocale` Hook bietet eine einfache Möglichkeit, auf die Lokalisierungseinstellungen innerhalb von React-Komponenten zuzugreifen und diese zu manipulieren. Er ermöglicht den Zugriff auf die aktuelle Lokalisierung, die Standardlokalisierung, alle verfügbaren Lokalisierungen und Funktionen zum Aktualisieren der Lokalisierungseinstellungen.

## Verwendung

So können Sie den `useLocale` Hook in einer React-Komponente verwenden:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktuelle Lokalisierung: {locale}</h1>
      <p>Standardlokalisierung: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktuelle Lokalisierung: {locale}</h1>
      <p>Standardlokalisierung: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktuelle Lokalisierung: {locale}</h1>
      <p>Standardlokalisierung: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

## Parameter und Rückgabewerte

Wenn Sie den `useLocale` Hook aufrufen, gibt er ein Objekt mit den folgenden Eigenschaften zurück:

- **`locale`**: Die aktuelle Lokalisierung, die im React-Kontext festgelegt ist.
- **`defaultLocale`**: Die primäre Lokalisierung, die in der Konfiguration definiert ist.
- **`availableLocales`**: Eine Liste aller verfügbaren Lokalisierungen, die in der Konfiguration definiert sind.
- **`setLocale`**: Eine Funktion, um die aktuelle Lokalisierung im Anwendungskontext zu aktualisieren.

## Beispiel

Dieses Beispiel zeigt eine Komponente, die den `useLocale` Hook verwendet, um einen Lokalisierungsumschalter zu rendern, der es Benutzern ermöglicht, die Lokalisierung der Anwendung dynamisch zu ändern:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Fazit

Der `useLocale` Hook aus `react-intlayer` ist ein unverzichtbares Werkzeug für die Verwaltung von Lokalisierungen in Ihren React-Anwendungen. Er bietet die Funktionalität, die erforderlich ist, um Ihre Anwendung effektiv an verschiedene internationale Zielgruppen anzupassen.
