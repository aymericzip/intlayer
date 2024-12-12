# React-Integration: `useLocale` Hook-Dokumentation

Dieser Abschnitt bietet umfassende Informationen zum `useLocale`-Hook aus der `react-intlayer`-Bibliothek, der für das Locale-Management in React-Anwendungen entwickelt wurde.

## Importieren von `useLocale` in React

Um den `useLocale`-Hook in Ihre React-Anwendung zu integrieren, importieren Sie ihn aus dem entsprechenden Paket:

```javascript
import { useLocale } from "react-intlayer"; // Wird in React-Komponenten für das Locale-Management verwendet
```

## Übersicht

Der `useLocale`-Hook bietet eine einfache Möglichkeit, auf die Locale-Einstellungen innerhalb von React-Komponenten zuzugreifen und diese zu manipulieren. Er bietet Zugriff auf die aktuelle Locale, die Standard-Locale, alle verfügbaren Locales und Funktionen zum Aktualisieren der Locale-Einstellungen.

## Verwendung

So können Sie den `useLocale`-Hook innerhalb einer React-Komponente verwenden:

```jsx
import React from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
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

Wenn Sie den `useLocale`-Hook aufrufen, gibt er ein Objekt mit den folgenden Eigenschaften zurück:

- **`locale`**: Die aktuelle Locale, die im React-Kontext festgelegt ist.
- **`defaultLocale`**: Die primäre Locale, die in der Konfiguration definiert ist.
- **`availableLocales`**: Eine Liste aller verfügbaren Locales, die in der Konfiguration definiert sind.
- **`setLocale`**: Eine Funktion, um die aktuelle Locale im Kontext der Anwendung zu aktualisieren.

## Beispiel

Dieses Beispiel zeigt eine Komponente, die den `useLocale`-Hook verwendet, um einen Locale-Wechsler darzustellen, der es den Benutzern ermöglicht, die Locale der Anwendung dynamisch zu ändern:

```jsx
import { useLocale } from "react-intlayer";

function LocaleSelector() {
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
}

export default LocaleSelector;
```

## Fazit

Der `useLocale`-Hook aus `react-intlayer` ist ein essentielles Werkzeug für das Management von Locales in Ihren React-Anwendungen und bietet die benötigte Funktionalität, um Ihre Anwendung effektiv an verschiedene internationale Zielgruppen anzupassen.
