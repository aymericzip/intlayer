---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Documentazione della funzione getLocalizedPath | intlayer
description: Scopri come utilizzare la funzione getLocalizedPath del pacchetto intlayer
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Implement custom URL rewrites
---

# Documentazione: Funzione `getLocalizedPath` in `intlayer`

## Descrizione

La funzione `getLocalizedPath` risolve un percorso canonico (percorso interno dell'applicazione) nella sua equivalente localizzata in base alla locale fornita e alle regole di riscrittura. È particolarmente utile per generare URL SEO-friendly che variano in base alla lingua.

**Caratteristiche principali:**

- Supporta parametri di route dinamiche usando la sintassi `[param]`.
- Risolve i percorsi in base alle regole di riscrittura personalizzate definite nella tua configurazione.
- Gestisce automaticamente il fallback al percorso canonico se non viene trovata una regola di riscrittura per la locale specificata.

---

## Firma della funzione

```typescript
getLocalizedPath(
  canonicalPath: string,         // Obbligatorio
  locale: Locales,               // Obbligatorio
  rewriteRules?: RoutingConfig['rewrite'] // Opzionale
): string
```

---

## Parametri

### Parametri obbligatori

- `canonicalPath: string`
  - **Descrizione**: Il percorso interno dell'applicazione (es., `/about`, `/product/[id]`).
  - **Tipo**: `string`
  - **Obbligatorio**: Sì

- `locale: Locales`
  - **Descrizione**: La locale di destinazione per la quale il percorso deve essere localizzato.
  - **Tipo**: `Locales`
  - **Obbligatorio**: Sì

### Parametri opzionali

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Descrizione**: Un oggetto che definisce regole di riscrittura personalizzate. Se non fornito, assume per default la proprietà `routing.rewrite` dalla configurazione del progetto.
  - **Tipo**: `RoutingConfig['rewrite']`
  - **Default**: `configuration.routing.rewrite`

---

## Restituisce

- **Tipo**: `string`
- **Descrizione**: Il percorso localizzato per la locale specificata.

---

## Esempio d'uso

### Uso base (con configurazione)

Se hai configurato riscritture personalizzate in `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Output: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Output: "/about"
```

### Utilizzo con Rotte Dinamiche

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Output: "/produit/123"
```

### Regole di Riscrittura Manuale

Puoi anche passare regole di riscrittura manuali alla funzione:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Risultato: "/contactez-nous"
```

---

## Funzioni correlate

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getCanonicalPath.md): Risolve un percorso localizzato nel suo path canonico interno.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md): Genera un URL completamente localizzato (inclusi protocollo, host e prefisso della lingua).
