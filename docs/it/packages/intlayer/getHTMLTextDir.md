---
docName: package__intlayer__getHTMLTextDir
url: /doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione della funzione getHTMLTextDir | intlayer
description: Scopri come utilizzare la funzione getHTMLTextDir per il pacchetto intlayer
keywords:
  - getHTMLTextDir
  - traduzione
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzione `getHTMLTextDir` in `intlayer`

## Descrizione

La funzione `getHTMLTextDir` determina la direzione del testo (`ltr`, `rtl` o `auto`) in base alla locale fornita. È progettata per aiutare gli sviluppatori a impostare l'attributo `dir` in HTML per una corretta visualizzazione del testo.

## Parametri

- `locale?: Locales`

  - **Descrizione**: La stringa della locale (ad esempio, `Locales.ENGLISH`, `Locales.ARABIC`) utilizzata per determinare la direzione del testo.
  - **Tipo**: `Locales` (opzionale)

## Restituisce

- **Tipo**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Descrizione**: La direzione del testo corrispondente alla locale:
  - `'ltr'` per le lingue da sinistra a destra.
  - `'rtl'` per le lingue da destra a sinistra.
  - `'auto'` se la locale non è riconosciuta.

## Esempio di Utilizzo

### Determinare la Direzione del Testo

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

## Casi Limite

- **Locale Non Fornita:**

  - La funzione restituisce `'auto'` quando `locale` è `undefined`.

- **Locale Non Riconosciuta:**
  - Per le locali non riconosciute, la funzione predefinisce `'auto'`.

## Utilizzo nei Componenti:

La funzione `getHTMLTextDir` può essere utilizzata per impostare dinamicamente l'attributo `dir` in un documento HTML per una corretta visualizzazione del testo in base alla locale.

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

Nell'esempio sopra, l'attributo `dir` è impostato dinamicamente in base alla locale.
