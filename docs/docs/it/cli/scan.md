---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: verificare i18n e SEO di un sito"
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
  - version: 9.5.11
    date: 2026-09-26
    changes: "Rileva la strategia di routing e lo stack i18n (librerie, TMS); aggiunge controlli di reciprocità hreflang, og:locale e selettore di lingua; segue sitemap di robots.txt, indici di sitemap e sitemap compresse gzip"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Aggiunto il flag `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Aggiunto comando scan"
author: aymericzip
---

# Scansiona il sito web

Il comando `scan` recupera un URL pubblico, misura la dimensione totale della pagina e controlla la salute i18n e SEO della pagina. Produce un rapporto con punteggio (0–100) che copre attributi HTML, collegamenti canonici, tag hreflang e relativi link di ritorno, robots.txt, sitemap, collegamenti interni localizzati e il peso della locale nel bundle JavaScript.

Indica inoltre in che modo il sito codifica la locale nei suoi URL (strategia di routing) e quale framework, libreria i18n, sistema di gestione delle traduzioni (TMS) o proxy di traduzione utilizza. Gli stessi controlli alimentano lo [scanner SEO i18n online](https://intlayer.org/i18n-seo-scanner) e l'estensione Chrome di Intlayer.

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
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0
  i18n library next-intl
  TMS Crowdin
Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
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

- **`--base-dir`**: Directory di base utilizzata per individuare il file `intlayer.config.*`.
- **`-e, --env`**: Ambiente di destinazione (ad esempio, `development`, `production`).
- **`--env-file`**: Percorso di un file `.env` personalizzato.
- **`--no-cache`**: Disabilita la cache di configurazione.
- **`--ci`**: Esegue il comando in ogni progetto Intlayer del monorepo (o solo in quello corrente se lanciato da una directory di progetto). Le credenziali per progetto possono essere iniettate tramite `INTLAYER_PROJECT_CREDENTIALS`, un oggetto JSON che associa ogni percorso di progetto a `{ "clientId", "clientSecret" }`.
- **`--verbose`**: Abilita la registrazione dettagliata (impostazione predefinita in modalità CLI).
- **`--prefix`**: Prefisso di registro personalizzato.

## Strategia di routing

Il pattern di locale condiviso dalle alternative hreflang della pagina rivela come il sito instrada le sue locale. Senza alternative, viene utilizzato unicamente l'URL scansionato (basso livello di confidenza).

| Strategia           | Esempio                                    |
| ------------------- | ------------------------------------------ |
| `prefix-all`        | `/en/about`, `/fr/about`                   |
| `prefix-no-default` | `/about` (locale predefinita), `/fr/about` |
| `search-params`     | `/about?lang=fr`                           |
| `subdomain`         | `fr.example.com`                           |
| `domain`            | `example.fr`, `example.de`                 |
| `no-prefix`         | Un solo URL per ogni locale (cookie)       |

I controlli su collegamenti, link canonici, robots.txt e sitemap leggono ogni URL attraverso questa strategia. Ad esempio, un link non prefissato è corretto nella locale predefinita di un sito `prefix-no-default`, e un link senza `?lang=` abbandona la locale su un sito `search-params`.

## Stack rilevato

Framework, librerie i18n (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), sistemi di gestione delle traduzioni (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) e proxy di traduzione (Weglot, Localize, GTranslate…) sono identificati dall'HTML, dalle risorse caricate e dai bundle JavaScript. La modalità avanzata legge anche le variabili globali di window e i cookie.

## Cosa viene controllato

| Controllo                       | Descrizione                                                                                                | Peso del punteggio |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------ |
| `html lang`                     | `<html lang>` è presente ed è un tag BCP 47 valido                                                         | 9                  |
| `html dir`                      | `dir="rtl"` è impostato per lingue con scrittura da destra a sinistra (`ltr` è il valore predefinito)      | 3                  |
| `locale signals consistent`     | `<html lang>`, la locale dell'URL e la voce hreflang auto-riferita concordano                              | 5                  |
| `og:locale`                     | `og:locale` è impostato e corrisponde a `<html lang>`                                                      | 3                  |
| `canonical`                     | Esiste un link canonico e non punta a un'altra versione linguistica                                        | 10                 |
| `hreflang`                      | I tag hreflang esistono, con codici validi, URL assoluti, senza duplicati e con auto-riferimento           | 9                  |
| `x-default hreflang`            | Esiste un'alternativa hreflang `x-default`                                                                 | 7                  |
| `hreflang alternates link back` | Le alternative rispondono con stato 200, non sono reindirizzate, rimandano indietro e dichiarano la lingua | 8                  |
| `localized links`               | I link interni puntano alla locale della pagina                                                            | 8                  |
| `all links keep the locale`     | Nessun link interno commuta o perde la locale                                                              | 6                  |
| `language switcher`             | Esistono link `<a href>` scansionabili verso le altre versioni linguistiche                                | 6                  |
| `robots.txt present`            | `/robots.txt` restituisce una risposta 200                                                                 | 10                 |
| `robots.txt localized URLs`     | Né il sito né i suoi URL localizzati sono bloccati per Googlebot                                           | 8                  |
| `sitemap present`               | Viene trovata una sitemap (direttive `Sitemap:` in robots.txt, `/sitemap.xml`, `/sitemap_index.xml`)       | 10                 |
| `sitemap locale coverage`       | Ogni locale è elencata e le voci con alternative elencano se stesse                                        | 9                  |
| `sitemap alternates`            | La sitemap contiene collegamenti alternativi `hreflang`                                                    | 8                  |
| `sitemap x-default`             | La sitemap contiene un hreflang `x-default`                                                                | 7                  |
| `unused bundle content`         | Il bundle JS principale non include traduzioni di altre locale                                             | 8                  |

Un avviso assegna metà del punteggio. Il punteggio finale è la somma ponderata dei controlli eseguiti espressa in percentuale (0–100). I controlli non superati stampano i primi problemi rilevati; usa `--json` per tutti i dettagli.

## Utilizzo programmatico della funzione di scansione

La funzione `scan` viene anche esportata da `@intlayer/cli` per essere richiamata dai tuoi script:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Per l'accesso di livello inferiore, `scanWebsite` da `@intlayer/engine/scan` restituisce un oggetto `ScanResult` strutturato:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
