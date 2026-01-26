---
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
description: Documentation for the useLocale hook in the next-intlayer package
createdAt: 2024-08-11
updatedAt: 2026-01-26
title: useLocale Hook Dokumentation | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: Standardwert für `onLocaleChange` auf `replace` gesetzt
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
---

# Next.js Integration: `useLocale` Hook Dokumentation für `next-intlayer`

Dieser Abschnitt bietet eine ausführliche Dokumentation zum `useLocale` Hook, der speziell für Next.js-Anwendungen innerhalb der `next-intlayer` Bibliothek entwickelt wurde. Er ist darauf ausgelegt, Sprachänderungen und Routing effizient zu verwalten.

## Importieren von `useLocale` in Next.js

Um den `useLocale` Hook in Ihrer Next.js-Anwendung zu verwenden, importieren Sie ihn wie folgt:

```javascript
import { useLocale } from "next-intlayer"; // Wird verwendet, um Sprachen und Routing in Next.js zu verwalten
```

## Verwendung

So implementieren Sie den `useLocale` Hook innerhalb einer Next.js-Komponente:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktuelle Sprache: {locale}</h1>
      <p>Standardsprache: {defaultLocale}</p>
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
      <h1>Aktuelle Sprache: {locale}</h1>
      <p>Standardsprache: {defaultLocale}</p>
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
      <h1>Aktuelle Sprache: {locale}</h1>
      <p>Standardsprache: {defaultLocale}</p>
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

## Parameter

Der `useLocale` Hook akzeptiert die folgenden Parameter:

- **`onLocaleChange`**: Ein String, der bestimmt, wie die URL aktualisiert werden soll, wenn sich die Sprache ändert. Mögliche Werte sind `"replace"`, `"push"` oder `"none"`.

  > Nehmen wir ein Beispiel:
  >
  > 1. Sie befinden sich auf `/fr/home`
  > 2. Sie navigieren zu `/fr/about`
  > 3. Sie ändern die Sprache zu `/es/about`
  > 4. Sie klicken auf die "Zurück"-Schaltfläche des Browsers
  >
  > Das Verhalten unterscheidet sich je nach Wert von `onLocaleChange`:
  >
  > - `"replace"` (Standard): Ersetzt die aktuelle URL durch die neue lokalisierte URL und setzt den Cookie.
  >   -> Die "Zurück"-Schaltfläche führt zu `/es/home`
  > - `"push"`: Fügt die neue lokalisierte URL dem Browser-Verlauf hinzu und setzt den Cookie.
  >   -> Die "Zurück"-Schaltfläche führt zu `/fr/about`
  > - `"none"`: Aktualisiert nur die Sprache im Client-Kontext und setzt den Cookie, ohne die URL zu ändern.
  >   -> Die "Zurück"-Schaltfläche führt zu `/fr/home`
  > - `(locale) => void`: Setzt den Cookie und löst eine benutzerdefinierte Funktion aus, die aufgerufen wird, wenn sich die Sprache ändert.
  >
  >   Die Option `undefined` ist das Standardverhalten, da wir empfehlen, die `Link`-Komponente zu verwenden, um zur neuen Sprache zu navigieren.
  >   Beispiel:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     Über uns
  >   </Link>
  >   ```

## Rückgabewerte

- **`locale`**: Die aktuelle Sprache, wie im React-Kontext gesetzt.
- **`defaultLocale`**: Die primäre Sprache, die in der Konfiguration definiert ist.
- **`availableLocales`**: Eine Liste aller verfügbaren Sprachen, wie in der Konfiguration definiert.
- **`setLocale`**: Eine Funktion, um die Sprache der Anwendung zu ändern und die URL entsprechend zu aktualisieren. Sie kümmert sich um Präfix-Regeln, ob die Sprache basierend auf der Konfiguration zum Pfad hinzugefügt werden soll oder nicht. Verwendet `useRouter` aus `next/navigation` für Navigationsfunktionen wie `push` und `refresh`.
- **`pathWithoutLocale`**: Eine berechnete Eigenschaft, die den Pfad ohne die Sprache zurückgibt. Dies ist nützlich zum Vergleichen von URLs. Zum Beispiel, wenn die aktuelle Sprache `fr` ist und die URL `fr/my_path` lautet, ist der Pfad ohne Sprache `/my_path`. Verwendet `usePathname` aus `next/navigation`, um den aktuellen Pfad zu erhalten.

## Fazit

Der `useLocale` Hook von `next-intlayer` ist ein wichtiges Werkzeug zur Verwaltung von Sprachversionen in Next.js-Anwendungen. Er bietet einen integrierten Ansatz, um Ihre Anwendung nahtlos für mehrere Sprachen anzupassen, indem er die Speicherung der Sprache, das Zustandsmanagement und die URL-Anpassungen übernimmt.
