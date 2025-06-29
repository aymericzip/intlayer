---
docName: package__intlayer__getHTMLTextDir
url: https://intlayer.org/doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Dokumentation der t-Funktion | intlayer
description: Erfahren Sie, wie Sie die t-Funktion für das intlayer-PakegetHTMLTextDir verwenden
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

Die Funktion `getHTMLTextDir` bestimmt die Textausrichtung (`ltr`, `rtl` oder `auto`) basierend auf der angegebenen Spracheinstellung. Sie wurde entwickelt, um Entwicklern zu helfen, das `dir`-Attribut in HTML für eine korrekte Textrendering einzustellen.

## Parameter

- `locale?: Locales`

  - **Beschreibung**: Der Sprachcode (z. B. `Locales.ENGLISH`, `Locales.ARABIC`), der verwendet wird, um die Textausrichtung zu bestimmen.
  - **Typ**: `Locales` (optional)

## Rückgabewerte

- **Typ**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Beschreibung**: Die Textausrichtung, die der Spracheinstellung entspricht:
  - `'ltr'` für Sprachen mit Links-nach-Rechts-Ausrichtung.
  - `'rtl'` für Sprachen mit Rechts-nach-Links-Ausrichtung.
  - `'auto'`, wenn die Spracheinstellung nicht erkannt wird.

## Beispielverwendung

### Bestimmung der Textausrichtung

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

- **Keine Spracheinstellung angegeben:**

  - Die Funktion gibt `'auto'` zurück, wenn `locale` `undefined` ist.

- **Nicht erkannte Spracheinstellung:**
  - Für nicht erkannte Spracheinstellungen gibt die Funktion standardmäßig `'auto'` zurück.

## Verwendung in Komponenten:

Die Funktion `getHTMLTextDir` kann verwendet werden, um das `dir`-Attribut in einem HTML-Dokument dynamisch basierend auf der Spracheinstellung für eine korrekte Textrendering einzustellen.

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

Im obigen Beispiel wird das `dir`-Attribut dynamisch basierend auf der Spracheinstellung gesetzt.
