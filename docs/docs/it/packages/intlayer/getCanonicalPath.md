---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Documentazione della funzione getCanonicalPath | intlayer
description: Scopri come usare la funzione getCanonicalPath del pacchetto intlayer
keywords:
  - getCanonicalPath
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Implement custom URL rewrites
---

# Documentazione: Funzione `getCanonicalPath` in `intlayer`

## Descrizione

La funzione `getCanonicalPath` risolve un percorso URL localizzato (es., `/a-propos`) riportandolo al percorso canonico interno dell'applicazione (es., `/about`). Questo è essenziale affinché i router possano associare la rotta interna corretta indipendentemente dalla lingua dell'URL.

**Caratteristiche principali:**

- Supporta parametri di rotta dinamici usando la sintassi `[param]`.
- Confronta i percorsi localizzati con regole di riscrittura personalizzate definite nella tua configurazione.
- Restituisce il percorso originale se non viene trovata alcuna regola di riscrittura corrispondente.

---

## Firma della funzione

```typescript
getCanonicalPath(
  localizedPath: string,         // Obbligatorio
  locale: Locales,               // Obbligatorio
  rewriteRules?: RoutingConfig['rewrite'] // Opzionale
): string
```

---

## Parametri

### Parametri obbligatori

- `localizedPath: string`
  - **Descrizione**: Il percorso localizzato come visto nel browser (es., `/a-propos`).
  - **Tipo**: `string`
  - **Obbligatorio**: Sì

- `locale: Locales`
  - **Descrizione**: La locale usata per il percorso da risolvere.
  - **Tipo**: `Locales`
  - **Obbligatorio**: Sì

### Parametri opzionali

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Descrizione**: Un oggetto che definisce regole di riscrittura personalizzate. Se non fornito, assume come valore predefinito la proprietà `routing.rewrite` dalla configurazione del tuo progetto.
  - **Tipo**: `RoutingConfig['rewrite']`
  - **Predefinito**: `configuration.routing.rewrite`

---

## Restituisce

- **Tipo**: `string`
- **Descrizione**: Il percorso canonico interno.

---

## Esempio d'uso

### Uso base (con configurazione)

Se hai configurato riscritture personalizzate nel tuo `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Configurazione: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Risultato: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Risultato: "/about"
```

### Utilizzo con rotte dinamiche

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Configurazione: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Risultato: "/product/123"
```

### Regole di riscrittura manuali

È inoltre possibile passare regole di riscrittura manuali alla funzione:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Risultato: "/contact"
```

---

## Funzioni correlate

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedPath.md): Risolve un percorso canonico nella sua equivalente localizzata.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md): Genera un URL completamente localizzato (incluso protocollo, host e prefisso della locale).
