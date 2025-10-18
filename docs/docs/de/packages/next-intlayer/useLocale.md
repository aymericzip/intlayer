---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale Hook Dokumentation | next-intlayer
description: Siehe, wie der useLocale Hook für das next-intlayer Paket verwendet wird
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
  - next-intlayer
  - useLocale
history:
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

## Parameter und Rückgabewerte

Wenn Sie den `useLocale` Hook aufrufen, gibt er ein Objekt mit den folgenden Eigenschaften zurück:

- **`locale`**: Die aktuelle Sprache, wie im React-Kontext gesetzt.
- **`defaultLocale`**: Die primäre Sprache, die in der Konfiguration definiert ist.
- **`availableLocales`**: Eine Liste aller verfügbaren Sprachen, wie in der Konfiguration definiert.
- **`setLocale`**: Eine Funktion, um die Sprache der Anwendung zu ändern und die URL entsprechend zu aktualisieren. Sie kümmert sich um Präfix-Regeln, ob die Sprache basierend auf der Konfiguration zum Pfad hinzugefügt werden soll oder nicht. Verwendet `useRouter` aus `next/navigation` für Navigationsfunktionen wie `push` und `refresh`.
- **`pathWithoutLocale`**: Eine berechnete Eigenschaft, die den Pfad ohne die Sprache zurückgibt. Dies ist nützlich zum Vergleichen von URLs. Zum Beispiel, wenn die aktuelle Sprache `fr` ist und die URL `fr/my_path` lautet, ist der Pfad ohne Sprache `/my_path`. Verwendet `usePathname` aus `next/navigation`, um den aktuellen Pfad zu erhalten.

## Fazit

Der `useLocale` Hook von `next-intlayer` ist ein wichtiges Werkzeug zur Verwaltung von Sprachversionen in Next.js-Anwendungen. Er bietet einen integrierten Ansatz, um Ihre Anwendung nahtlos für mehrere Sprachen anzupassen, indem er die Speicherung der Sprache, das Zustandsmanagement und die URL-Anpassungen übernimmt.
