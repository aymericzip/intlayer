# Next.js Integration: `useLocale` Hook Dokumentation für `next-intlayer`

Dieser Abschnitt bietet eine detaillierte Dokumentation des `useLocale` Hooks, der für Next.js-Anwendungen innerhalb der `next-intlayer` Bibliothek angepasst ist. Er ist dafür ausgelegt, lokale Änderungen und Routing effizient zu handhaben.

## Importieren von `useLocale` in Next.js

Um den `useLocale` Hook in Ihrer Next.js-Anwendung zu verwenden, importieren Sie ihn wie unten gezeigt:

```javascript
import { useLocale } from "next-intlayer"; // Wird zur Verwaltung von lokalen und Routing in Next.js verwendet
```

## Verwendung

So implementieren Sie den `useLocale` Hook innerhalb einer Next.js-Komponente:

```jsx
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

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

- **`locale`**: Die aktuelle Locale, die im React-Kontext festgelegt ist.
- **`defaultLocale`**: Die primäre Locale, die in der Konfiguration definiert ist.
- **`availableLocales`**: Eine Liste aller verfügbaren Locales, die in der Konfiguration definiert sind.
- **`setLocale`**: Eine Funktion, um die Locale der Anwendung zu ändern und die URL entsprechend zu aktualisieren. Sie kümmert sich um Präfixregeln, ob die Locale zum Pfad hinzugefügt werden soll oder nicht, basierend auf der Konfiguration. Verwendet `useRouter` von `next/navigation` für Navigationsfunktionen wie `push` und `refresh`.
- **`pathWithoutLocale`**: Eine berechnete Eigenschaft, die den Pfad ohne die Locale zurückgibt. Sie ist nützlich, um URLs zu vergleichen. Zum Beispiel, wenn die aktuelle Locale `fr` ist und die URL `fr/my_path`, dann ist der Pfad ohne Locale `/my_path`. Verwendet `usePathname` von `next/navigation`, um den aktuellen Pfad zu erhalten.

## Fazit

Der `useLocale` Hook von `next-intlayer` ist ein entscheidendes Werkzeug für die Verwaltung von Locales in Next.js-Anwendungen. Er bietet einen integrierten Ansatz, um Ihre Anwendung für mehrere Locales zu adaptieren, indem er die Speicherung von Locales, das Zustand-Management und die Modifikation von URLs nahtlos handhabt.
