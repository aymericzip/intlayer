# React-Integration: `useLocale` Hook Dokumentation

Dieser Abschnitt bietet umfassende Informationen zum `useLocale` Hook aus der `react-intlayer` Bibliothek, die für das Handling der Lokalisierung in React-Anwendungen konzipiert ist.

## Importieren von `useLocale` in React

Um den `useLocale` Hook in Ihre React-Anwendung zu integrieren, importieren Sie ihn aus dem entsprechenden Paket:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Wird in React-Komponenten für die Lokalisierung verwendet
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Wird in React-Komponenten für die Lokalisierung verwendet
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Wird in React-Komponenten für die Lokalisierung verwendet
```

## Übersicht

Der `useLocale` Hook bietet eine einfache Möglichkeit, auf die Lokalisierungseinstellungen innerhalb der React-Komponenten zuzugreifen und diese zu manipulieren. Er bietet Zugriff auf die aktuelle Locale, die Standard-Locale, alle verfügbaren Locales und Funktionen zur Aktualisierung der Lokalisierungseinstellungen.

## Verwendung

So können Sie den `useLocale` Hook innerhalb einer React-Komponente verwenden:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale(); // Lokale, Standard-Locale, verfügbare Locales und Funktion zum Setzen der Locale

  return (
    <div>
      <h1>Aktuelle Locale: {locale}</h1>
      <p>Standard Locale: {defaultLocale}</p>
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
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale(); // Lokale, Standard-Locale, verfügbare Locales und Funktion zum Setzen der Locale

  return (
    <div>
      <h1>Aktuelle Locale: {locale}</h1>
      <p>Standard Locale: {defaultLocale}</p>
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
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale(); // Lokale, Standard-Locale, verfügbare Locales und Funktion zum Setzen der Locale

  return (
    <div>
      <h1>Aktuelle Locale: {locale}</h1>
      <p>Standard Locale: {defaultLocale}</p>
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

- **`locale`**: Die aktuelle Locale, wie im React-Kontext festgelegt.
- **`defaultLocale`**: Die primäre Locale, die in der Konfiguration definiert ist.
- **`availableLocales`**: Eine Liste aller verfügbaren Locales, die in der Konfiguration definiert sind.
- **`setLocale`**: Eine Funktion zum Aktualisieren der aktuellen Locale innerhalb des Anwendungsbereichs.

## Beispiel

Dieses Beispiel zeigt eine Komponente, die den `useLocale` Hook verwendet, um einen Locale-Umschalter darzustellen, mit dem Benutzer die Locale der Anwendung dynamisch ändern können:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale(); // Lokale, Setzen der Locale und verfügbare Locales

  const handleLocaleChange = (newLocale) => {
    // Funktion zum Ändern der Locale
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
  const { locale, setLocale, availableLocales } = useLocale(); // Lokale, Setzen der Locale und verfügbare Locales

  const handleLocaleChange = (newLocale) => {
    // Funktion zum Ändern der Locale
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
  const { locale, setLocale, availableLocales } = useLocale(); // Lokale, Setzen der Locale und verfügbare Locales

  const handleLocaleChange = (newLocale) => {
    // Funktion zum Ändern der Locale
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

Der `useLocale` Hook aus `react-intlayer` ist ein unverzichtbares Werkzeug zur Verwaltung von Locales in Ihren React-Anwendungen und bietet die benötigte Funktionalität, um Ihre Anwendung effektiv an verschiedene internationale Zielgruppen anzupassen.
