# Documentazione: `getHTMLTextDir` Funzione in `intlayer`

## Descrizione:

La funzione `getHTMLTextDir` determina la direzione del testo (`ltr`, `rtl` o `auto`) in base alla lingua fornita. È progettata per aiutare gli sviluppatori a impostare l'attributo `dir` in HTML per una corretta visualizzazione del testo.

## Parametri:

- `locale?: Locales`

  - **Descrizione**: La stringa della lingua (ad es., `Locales.ENGLISH`, `Locales.ARABIC`) utilizzata per determinare la direzione del testo.
  - **Tipo**: `Locales` (opzionale)

## Restituisce:

- **Tipo**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Descrizione**: La direzione del testo corrispondente alla lingua:
  - `'ltr'` per le lingue da sinistra a destra.
  - `'rtl'` per le lingue da destra a sinistra.
  - `'auto'` se la lingua non è riconosciuta.

## Esempio di utilizzo:

### Determinare la direzione del testo:

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

## Casi limite:

- **Nessuna lingua fornita:**

  - La funzione restituisce `'auto'` quando `locale` è `undefined`.

- **Lingua non riconosciuta:**
  - Per le lingue non riconosciute, la funzione predefinisce a `'auto'`.

## Utilizzo nei componenti:

La funzione `getHTMLTextDir` può essere utilizzata per impostare dinamicamente l'attributo `dir` in un documento HTML per una corretta visualizzazione del testo in base alla lingua.

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

Nell'esempio sopra, l'attributo `dir` è impostato dinamicamente in base alla lingua.
