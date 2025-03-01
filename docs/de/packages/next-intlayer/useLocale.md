# Next.js-Integration: `useLocale` Hook-Dokumentation für `next-intlayer`

Dieser Abschnitt bietet eine detaillierte Dokumentation des `useLocale` Hooks, der speziell für Next.js-Anwendungen innerhalb der `next-intlayer` Bibliothek entwickelt wurde. Er ist darauf ausgelegt, Locale-Änderungen und Routing effizient zu handhaben.

## Importieren von `useLocale` in Next.js

Um den `useLocale` Hook in Ihrer Next.js-Anwendung zu nutzen, importieren Sie ihn wie unten gezeigt:

```javascript
import { useLocale } from "next-intlayer"; // Wird für die Verwaltung von Locales und Routing in Next.js verwendet
```

## Verwendung

So implementieren Sie den `useLocale` Hook in einer Next.js-Komponente:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktuelles Locale: {locale}</h1>
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
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktuelles Locale: {locale}</h1>
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
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktuelles Locale: {locale}</h1>
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
```

## Parameter und Rückgabewerte

Wenn Sie den `useLocale` Hook aufrufen, gibt er ein Objekt mit den folgenden Eigenschaften zurück:

- **`locale`**: Das aktuelle Locale, das im React-Kontext gesetzt ist.
- **`defaultLocale`**: Das primäre Locale, das in der Konfiguration definiert ist.
- **`availableLocales`**: Eine Liste aller verfügbaren Locales, wie in der Konfiguration definiert.
- **`setLocale`**: Eine Funktion, um das Locale der Anwendung zu ändern und die URL entsprechend zu aktualisieren. Sie berücksichtigt Präfixregeln, ob das Locale dem Pfad hinzugefügt werden soll oder nicht, basierend auf der Konfiguration. Verwendet `useRouter` aus `next/navigation` für Navigationsfunktionen wie `push` und `refresh`.
- **`pathWithoutLocale`**: Eine berechnete Eigenschaft, die den Pfad ohne Locale zurückgibt. Dies ist nützlich zum Vergleichen von URLs. Zum Beispiel, wenn das aktuelle Locale `fr` ist und die URL `fr/my_path`, ist der Pfad ohne Locale `/my_path`. Verwendet `usePathname` aus `next/navigation`, um den aktuellen Pfad zu erhalten.

## Fazit

Der `useLocale` Hook aus `next-intlayer` ist ein entscheidendes Werkzeug für die Verwaltung von Locales in Next.js-Anwendungen. Er bietet einen integrierten Ansatz, um Ihre Anwendung nahtlos für mehrere Locales anzupassen, indem er Locale-Speicherung, Zustandsverwaltung und URL-Modifikationen effizient handhabt.
