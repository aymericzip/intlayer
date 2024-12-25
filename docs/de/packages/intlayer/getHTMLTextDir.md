# Dokumentation: `getHTMLTextDir` Funktion in `intlayer`

## Beschreibung:

Die `getHTMLTextDir` Funktion bestimmt die Textausrichtung (`ltr`, `rtl` oder `auto`) basierend auf der bereitgestellten Locale. Sie ist dafür konzipiert, Entwicklern zu helfen, das `dir` Attribut in HTML für eine korrekte Textdarstellung einzustellen.

## Parameter:

- `locale?: Locales`

  - **Beschreibung**: Der Locale-String (z.B. `Locales.ENGLISH`, `Locales.ARABIC`), der zur Bestimmung der Textausrichtung verwendet wird.
  - **Typ**: `Locales` (optional)

## Rückgaben:

- **Typ**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Beschreibung**: Die Textausrichtung, die der Locale entspricht:
  - `'ltr'` für von links nach rechts laufende Sprachen.
  - `'rtl'` für von rechts nach links laufende Sprachen.
  - `'auto'`, wenn die Locale nicht erkannt wird.

## Beispielnutzung:

### Bestimmung der Textausrichtung:

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Ausgabe: "ltr"
getHTMLTextDir(Locales.FRENCH); // Ausgabe: "ltr"
getHTMLTextDir(Locales.ARABIC); // Ausgabe: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Ausgabe: "ltr"
getHTMLTextDir(Locales.FRENCH); // Ausgabe: "ltr"
getHTMLTextDir(Locales.ARABIC); // Ausgabe: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Ausgabe: "ltr"
getHTMLTextDir(Locales.FRENCH); // Ausgabe: "ltr"
getHTMLTextDir(Locales.ARABIC); // Ausgabe: "rtl"
```

## Randfälle:

- **Keine Locale bereitgestellt:**

  - Die Funktion gibt `'auto'` zurück, wenn `locale` `undefined` ist.

- **Nicht erkannte Locale:**
  - Bei nicht erkannten Locales standardisiert die Funktion auf `'auto'`.

## Verwendung in Komponenten:

Die `getHTMLTextDir` Funktion kann verwendet werden, um dynamisch das `dir` Attribut in einem HTML-Dokument basierend auf der Locale für eine korrekte Textdarstellung einzustellen.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

Im obigen Beispiel wird das `dir` Attribut dynamisch basierend auf der Locale festgelegt.
