---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentazione della funzione comparePaths | intlayer
description: Scopri come utilizzare la funzione comparePaths per il pacchetto intlayer
keywords:
  - comparePaths
  - normalizePath
  - link attivo
  - navigazione
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
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "Documentazione iniziale"
author: aymericzip
---

# Documentazione: Funzione `comparePaths` in `intlayer`

## Descrizione

La funzione `comparePaths` confronta due URL o percorsi per verificarne l'uguaglianza ignorando il segmento locale, il protocollo/host, la query string, l'hash e le barre finali. È il metodo consigliato per determinare se un link di navigazione punta alla pagina corrente — ad esempio per evidenziare il link attivo — senza dover creare una logica di normalizzazione personalizzata (soggetta a errori).

Internamente riutilizza [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md) per rimuovere il segmento locale, in modo da rispettare la modalità di routing e i locale configurati.

Il pacchetto esporta anche l'utility sottostante [`normalizePath`](#normalizepath), che restituisce il percorso canonico, indipendente dal locale, utilizzato per il confronto.

**Funzionalità chiave:**

- Confronto indipendente dal locale (`/it/about` corrisponde a `/about`)
- Funziona sia con URL assoluti che con percorsi relativi
- Ignora query string, hash e barre finali
- Tollera l'assenza di barre iniziali e valori vuoti (normalizzato a `/`)
- Leggero — basato su `getPathWithoutLocale`

---

## Firma della funzione

```typescript
comparePaths(
  pathname: string,  // Richiesto
  href: string,      // Richiesto
  locales?: Locales[] // Opzionale
): boolean

normalizePath(
  inputUrl: string,   // Richiesto
  locales?: Locales[] // Opzionale
): string
```

---

## Parametri

- `pathname: string`
  - **Descrizione**: La prima stringa URL o percorso da confrontare (in genere il percorso corrente).
  - **Tipo**: `string`
  - **Richiesto**: Sì

- `href: string`
  - **Descrizione**: La seconda stringa URL o percorso da confrontare (in genere l'`href` di un link di navigazione).
  - **Tipo**: `string`
  - **Richiesto**: Sì

- `locales: Locales[]`
  - **Descrizione**: Array opzionale di locale supportati. Per impostazione predefinita, i locale configurati nel progetto.
  - **Tipo**: `Locales[]`
  - **Richiesto**: No (Opzionale)

### Restituisce

- **Tipo**: `boolean`
- **Descrizione**: `true` quando entrambi gli input si risolvono allo stesso percorso indipendente dal locale, altrimenti `false`.

---

## Esempio di utilizzo

### Utilizzo di base

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### URL assoluti e relativi

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Evidenziare il link di navigazione attivo

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` restituisce il percorso canonico e indipendente dal locale utilizzato da `comparePaths`. Rimuove il segmento locale, il protocollo/host, la query string e l'hash, assicura la presenza di una singola barra iniziale, rimuove qualsiasi barra finale (tranne che per la root) e utilizza `/` come fallback per i valori vuoti.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## Funzioni correlate

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md): Rimuove il segmento locale da un URL o percorso.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPrefix.md): Determina il prefisso URL per un dato locale.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md): Genera un URL localizzato per uno specifico locale.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
