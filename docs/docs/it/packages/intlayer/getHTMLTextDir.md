---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getHTMLTextDir | intlayer
description: Scopri come utilizzare la funzione getHTMLTextDir per il pacchetto intlayer
keywords:
  - getHTMLTextDir
  - traduzione
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getHTMLTextDir
---

# Documentazione: Funzione `getHTMLTextDir` in `intlayer`

## Descrizione

La funzione `getHTMLTextDir` determina la direzione del testo (`ltr`, `rtl` o `auto`) in base alla locale fornita. È progettata per aiutare gli sviluppatori a impostare l'attributo `dir` in HTML per una corretta visualizzazione del testo.

## Parametri

- `locale?: Locales`

  - **Descrizione**: La stringa della locale (es. `Locales.ENGLISH`, `Locales.ARABIC`) utilizzata per determinare la direzione del testo.
  - **Tipo**: `Locales` (opzionale)

## Valore di ritorno

- **Tipo**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Descrizione**: La direzione del testo corrispondente alla locale:
  - `'ltr'` per lingue da sinistra a destra.
  - `'rtl'` per lingue da destra a sinistra.
  - `'auto'` se la locale non è riconosciuta.

## Esempio d'uso

### Determinare la direzione del testo

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

## Casi limite

- **Nessuna locale fornita:**

  - La funzione restituisce `'auto'` quando `locale` è `undefined`.

- **Locale non riconosciuta:**
  - Per le località non riconosciute, la funzione predefinisce il valore `'auto'`.

## Utilizzo nei Componenti:

La funzione `getHTMLTextDir` può essere utilizzata per impostare dinamicamente l'attributo `dir` in un documento HTML per una corretta visualizzazione del testo in base alla località.

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

Nell'esempio sopra, l'attributo `dir` viene impostato dinamicamente in base alla località.

## Cronologia Documentazione

- 5.5.10 - 2025-06-29: Storia iniziale
