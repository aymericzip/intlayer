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
    changes: "Implement custom URL rewrites"
author: aymericzip
---

# Documentazione: Funzione `getLocalizedPath` in `intlayer`

## Descrizione

La funzione `getLocalizedPath` risolve un percorso canonico (percorso interno dell'applicazione) nella sua equivalente localizzata in base alla locale fornita e alle regole di riscrittura. È particolarmente utile per generare URL SEO-friendly che variano in base alla lingua.

È l'equivalente relativo di [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md) — per un input relativo entrambi restituiscono lo stesso valore. A differenza di `getLocalizedUrl`, non restituisce mai un URL assoluto: la configurazione `domains` viene ignorata, quindi una locale servita dal suo proprio dominio restituisce comunque un percorso. Un input assoluto è accettato, ma la sua origine viene scartata — solo il percorso, la query string e l'hash vengono mantenuti.

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

### Parametri opzionali

- `locale?: Locales`
  - **Description**: La locale target per la quale il percorso dovrebbe essere localizzato.
  - **Type**: `Locales`
  - **Default**: La locale predefinita della configurazione del tuo progetto.

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Descrizione**: Un oggetto che definisce regole di riscrittura personalizzate. Se non fornito, assume per default la proprietà `routing.rewrite` dalla configurazione del progetto.
  - **Tipo**: `RoutingConfig['rewrite']`
  - **Default**: `configuration.routing.rewrite`

  - `options.locales?: Locales[]` — locale supportati. **Default**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — la locale predefinita. **Default**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — come la locale appare nel percorso. **Default**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — regole di riscrittura personalizzate. **Default**: `configuration.routing.rewrite`

---

## Restituisce

- **Tipo**: `string`
- **Descrizione**: Il percorso localizzato per la locale specificata.

Il tipo è ristretto dalle regole di riscrittura dichiarate nella tua configurazione, quindi l'editor mostra il percorso risolto anziché una semplice `string`:

```typescript codeFormat="typescript"
// Configurazione: mode 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (nessuna regola di riscrittura corrisponde, viene applicato solo il prefisso)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

Lo stesso narrowing fluisce in [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md), che applica le regole di riscrittura prima di prefissare la locale.

Due to que i casi rimangono allargati a `string`, perché non possono essere risolti al momento della compilazione:

- un percorso che non è un string literal (ad es. uno costruito da una variabile);
- un percorso che corrisponde a una regola usando un parametro multi-segmento o opzionale (`[...slug]`, `[[...slug]]`, `:param?`).

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

### Omissione della Locale

Quando non viene fornita alcuna locale, il percorso viene localizzato per la locale predefinita configurata:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Configuration: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Output: "/about"
```

---

## Funzioni correlate

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getCanonicalPath.md): Risolve un percorso localizzato nel suo path canonico interno.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md): Genera un URL completamente localizzato (inclusi protocollo, host e prefisso della lingua).
