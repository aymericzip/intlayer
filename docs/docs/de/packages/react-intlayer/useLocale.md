---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale Hook Dokumentation | react-intlayer
description: Siehe, wie der useLocale Hook für das react-intlayer Paket verwendet wird
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
slugs:
  - doc
  - packages
  - react-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initiale Historie"
---

# React-Integration: `useLocale` Hook Dokumentation

Dieser Abschnitt bietet umfassende Details zum `useLocale` Hook aus der `react-intlayer` Bibliothek, der für die Verwaltung von Locale-Einstellungen in React-Anwendungen entwickelt wurde.

## Importieren von `useLocale` in React

Um den `useLocale` Hook in Ihre React-Anwendung zu integrieren, importieren Sie ihn aus dem entsprechenden Paket:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { useLocale } from "react-intlayer"; // Wird in React-Komponenten zur Verwaltung der Locale verwendet
```

## Überblick

Der `useLocale` Hook bietet eine einfache Möglichkeit, auf die Locale-Einstellungen innerhalb von React-Komponenten zuzugreifen und diese zu manipulieren. Er stellt Zugriff auf die aktuelle Locale, die Standard-Locale, alle verfügbaren Locales sowie Funktionen zur Aktualisierung der Locale-Einstellungen bereit.

## Verwendung

So können Sie den `useLocale` Hook innerhalb einer React-Komponente verwenden:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktuelle Locale: {locale}</h1>
      <p>Standard-Locale: {defaultLocale}</p>
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

Wenn Sie den `useLocale` Hook aufrufen, gibt dieser ein Objekt mit den folgenden Eigenschaften zurück:

- **`locale`**: Die aktuelle Locale, wie sie im React-Kontext gesetzt ist.
- **`defaultLocale`**: Die primäre Locale, die in der Konfiguration definiert ist.
- **`availableLocales`**: Eine Liste aller verfügbaren Locales, wie sie in der Konfiguration definiert sind.
- **`setLocale`**: Eine Funktion, um die aktuelle Locale im Kontext der Anwendung zu aktualisieren.

## Beispiel

Dieses Beispiel zeigt eine Komponente, die den `useLocale` Hook verwendet, um einen Locale-Umschalter darzustellen, der es den Benutzern ermöglicht, die Locale der Anwendung dynamisch zu ändern:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat={["typescript", "esm"]}
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

## Fazit

Der `useLocale` Hook von `react-intlayer` ist ein unverzichtbares Werkzeug zur Verwaltung von Sprach- und Ländereinstellungen in Ihren React-Anwendungen und bietet die notwendige Funktionalität, um Ihre Anwendung effektiv an verschiedene internationale Zielgruppen anzupassen.
