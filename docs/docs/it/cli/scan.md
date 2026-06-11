---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Scansiona il sito web
description: Scopri come utilizzare il comando scan della CLI di Intlayer per misurare la dimensione della pagina e controllare la salute i18n/SEO di qualsiasi sito web.
keywords:
  - Scan
  - SEO
  - i18n
  - Controllo
  - CLI
  - Intlayer
  - Dimensione pagina
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 8.13.0
    date: 2026-06-11
    changes: "Aggiunto comando scan"
---

# Scansiona il sito web

Il comando `scan` recupera un URL pubblico, misura la dimensione totale della pagina e controlla la salute i18n e SEO della pagina. Produce un rapporto con punteggio (0–100) che copre attributi HTML, collegamenti canonici, tag hreflang, robots.txt, sitemap.xml, collegamenti interni localizzati e il peso della locale nel bundle JavaScript.

Non sono richieste dipendenze aggiuntive. Quando [puppeteer](https://pptr.dev/) è installato, la scansione può catturare frammenti JavaScript caricati in modo ritardato (lazy-loaded) per un'analisi del bundle più precisa; in caso contrario, ricorre all'ispezione degli script caricati direttamente dichiarati nell'HTML.

## Utilizzo

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### Esempio

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Esempio di output:

```
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## Opzioni

### `<url>` (richiesto)

L'URL completo da scansionare (ad esempio, `https://example.com`).

### `--no-deep`

Disabilita la scansione approfondita basata sul rendering.

Per impostazione predefinita, il comando tenta di utilizzare [puppeteer](https://pptr.dev/) per eseguire il rendering della pagina in un browser headless, catturare frammenti JavaScript caricati in modo ritardato e misurare la dimensione reale del trasferimento. Se puppeteer non è installato, il comando ricorre automaticamente alla modalità base.

Passa `--no-deep` per forzare la modalità base anche quando puppeteer è disponibile.

> Esempio: `npx intlayer scan https://example.com --no-deep`

### `--json`

Mostra il risultato completo della scansione come oggetto JSON invece di un rapporto formattato. Utile per l'integrazione programmatica o pipeline di CI.

> Esempio: `npx intlayer scan https://example.com --json`

### Opzioni di configurazione standard

- **`--base-dir`** — Directory di base utilizzata per individuare il file `intlayer.config.*`.
- **`-e, --env`** — Ambiente di destinazione (ad esempio, `development`, `production`).
- **`--env-file`** — Percorso di un file `.env` personalizzato.
- **`--no-cache`** — Disabilita la cache di configurazione.
- **`--verbose`** — Abilita la registrazione dettagliata (impostazione predefinita in modalità CLI).
- **`--prefix`** — Prefisso di registro personalizzato.

## Cosa viene controllato

| Controllo                 | Descrizione                                                     | Peso del punteggio |
| ------------------------- | --------------------------------------------------------------- | ------------------ |
| `html lang`               | L'attributo `<html lang="…">` è presente                        | 9                  |
| `html dir`                | L'attributo `<html dir="…">` è presente                         | 3                  |
| `canonical`               | `<link rel="canonical">` è presente                             | 10                 |
| `hreflang`                | I tag `<link rel="alternate" hreflang="…">` sono presenti       | 9                  |
| `x-default hreflang`      | Esiste un'alternativa hreflang `x-default`                      | 7                  |
| `localized links`         | Almeno un collegamento interno include un segmento di lingua    | 5                  |
| `all links localized`     | Ogni collegamento interno include un segmento di lingua         | 5                  |
| `current locale`          | La lingua della pagina può essere rilevata                      | 3                  |
| `robots.txt present`      | `/robots.txt` restituisce una risposta 200                      | 10                 |
| `robots.txt locale paths` | Nessun percorso di lingua è bloccato in robots.txt              | 10                 |
| `sitemap.xml present`     | `/sitemap.xml` restituisce una risposta 200                     | 10                 |
| `sitemap locale coverage` | Ogni lingua rilevata appare nella sitemap                       | 10                 |
| `sitemap alternates`      | La sitemap contiene collegamenti alternativi `hreflang`         | 5                  |
| `sitemap x-default`       | La sitemap contiene un `x-default` hreflang                     | 5                  |
| `unused bundle content`   | Il bundle JS non contiene dati di lingua inutilizzati eccessivi | 9                  |

Il punteggio finale è la somma pesata di tutti i controlli superati espressa in percentuale (0–100).

## Utilizzo programmatico della funzione di scansione

La funzione `scan` viene anche esportata da `@intlayer/cli` per essere richiamata dai tuoi script:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Per l'accesso di livello inferiore, `scanWebsite` da `@intlayer/chokidar/scan` restituisce un oggetto `ScanResult` strutturato:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
