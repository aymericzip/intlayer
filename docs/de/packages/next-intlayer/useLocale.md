# Next.js Integration: `useLocale` Hook Dokumentation für `next-intlayer`

Dieser Abschnitt bietet eine detaillierte Dokumentation über den `useLocale` Hook, der für Next.js-Anwendungen innerhalb der `next-intlayer` Bibliothek maßgeschneidert wurde. Er wurde entwickelt, um locale Wechsel und Routing effizient zu handhaben.

## Importieren von `useLocale` in Next.js

Um den `useLocale` Hook in Ihrer Next.js-Anwendung zu verwenden, importieren Sie ihn wie unten gezeigt:

```javascript
import { useLocale } from "next-intlayer"; // Wird verwendet, um Locales und Routing in Next.js zu verwalten
```

## Verwendung

Hier erfahren Sie, wie Sie den `useLocale` Hook innerhalb einer Next.js-Komponente implementieren:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
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
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
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
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

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
```

## Parameter und Rückgabewerte

Wenn Sie den `useLocale` Hook aufrufen, gibt er ein Objekt zurück, das die folgenden Eigenschaften enthält:

- **`locale`**: Die aktuelle Locale, die im React-Kontext festgelegt ist.
- **`defaultLocale`**: Die primäre Locale, die in der Konfiguration definiert ist.
- **`availableLocales`**: Eine Liste aller verfügbaren Locales, die in der Konfiguration definiert sind.
- **`setLocale`**: Eine Funktion, um die Locale der Anwendung zu ändern und die URL entsprechend zu aktualisieren. Sie kümmert sich um Präfixregeln, ob die Locale zum Pfad hinzugefügt werden soll oder nicht, basierend auf der Konfiguration. Nutzt `useRouter` aus `next/navigation` für Navigationsfunktionen wie `push` und `refresh`.
- **`pathWithoutLocale`**: Eine berechnete Eigenschaft, die den Pfad ohne die Locale zurückgibt. Sie ist nützlich zum Vergleichen von URLs. Zum Beispiel, wenn die aktuelle Locale `fr` ist, und die URL `fr/my_path`, ist der Pfad ohne Locale `/my_path`. Nutzt `usePathname` aus `next/navigation`, um den aktuellen Pfad zu erhalten.

## Fazit

Der `useLocale` Hook von `next-intlayer` ist ein wichtiges Werkzeug für die Verwaltung von Locales in Next.js-Anwendungen. Er bietet einen integrierten Ansatz, um Ihre Anwendung für mehrere Locales anzupassen, indem er die Speicherung von Locales, das Zustandsmanagement und die URL-Änderungen nahtlos behandelt.
