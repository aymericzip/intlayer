---
docName: package__intlayer__getHTMLTextDir
url: https://intlayer.org/doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getHTMLTextDir Funktionsdokumentation | intlayer
description: So verwenden Sie die Funktion getHTMLTextDir im intlayer-Paket
keywords:
  - getHTMLTextDir
  - Übersetzung
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# Dokumentation: `getHTMLTextDir` Funktion in `intlayer`

## Beschreibung

Die Funktion `getHTMLTextDir` bestimmt die Schreibrichtung (`ltr`, `rtl` oder `auto`) basierend auf der angegebenen Locale. Sie ist dafür gedacht, Entwicklern zu helfen, das `dir`-Attribut im HTML für eine korrekte Textdarstellung zu setzen.

## Parameter

- `locale?: Locales`

  - **Beschreibung**: Der Locale-String (z.B. `Locales.ENGLISH`, `Locales.ARABIC`), der zur Bestimmung der Schreibrichtung verwendet wird.
  - **Typ**: `Locales` (optional)

## Rückgabewert

- **Typ**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Beschreibung**: Die Schreibrichtung, die der Locale entspricht:
  - `'ltr'` für Sprachen von links nach rechts.
  - `'rtl'` für Sprachen von rechts nach links.
  - `'auto'` wenn die Locale nicht erkannt wird.

## Beispielanwendung

### Bestimmung der Schreibrichtung

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

## Randfälle

- **Keine Locale angegeben:**

  - Die Funktion gibt `'auto'` zurück, wenn `locale` `undefined` ist.

- **Nicht erkannte Locale:**
  - Für nicht erkannte Locales verwendet die Funktion standardmäßig `'auto'`.

## Verwendung in Komponenten:

Die Funktion `getHTMLTextDir` kann verwendet werden, um das `dir`-Attribut in einem HTML-Dokument dynamisch zu setzen, damit der Text basierend auf der Locale korrekt dargestellt wird.

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

Im obigen Beispiel wird das `dir`-Attribut dynamisch basierend auf der Locale gesetzt.

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
