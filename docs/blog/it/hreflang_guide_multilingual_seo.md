---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, guida per il SEO multilingue"
description: "Cos'è hreflang, le regole applicate dai motori di ricerca, perché x-default è quasi sempre sbagliato, e come generare tag corretti in Next.js e TanStack Start."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: la guida per il SEO multilingue

Hai tradotto la tua app. Hai deployato `/en`, `/fr`, `/es`. E gli utenti francesi atterrano ancora sulla pagina in inglese.

La traduzione è la parte facile. La parte difficile è dire ai motori di ricerca che queste pagine sono la **stessa pagina in un'altra lingua**, non tre documenti che competono tra loro. Questo è quello che fa `hreflang`, ed è dove la maggior parte dei siti multilingue perdono silenziosamente il loro traffico.

---

## Cosa è effettivamente hreflang

Un'annotazione su una pagina che dice: _questo URL ha versioni equivalenti laggiù, per quelle lingue._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Ti offre due cose: la versione corretta mostrata all'utente giusto, e le tue locale consolidate in un cluster unico invece di cannibalizzarsi a vicenda come duplicati.

Vale la pena essere chiari su cosa non è. **Non è un redirect** — è un suggerimento, e Google potrebbe ignorarlo. **Non è un ranking boost** — cambia _quale_ versione si posiziona, non _se_ ti posizioni. E Bing lo ignora completamente, affidandosi invece a `content-language` e geo-targeting.

---

## Dove dichiararlo

Tre posizionamenti, tutti validi. Scegliere uno e rimanere lì — lo stesso cluster dichiarato in due posti è come gli insiemi si divergono.

**HTML `<head>`** è la scelta abituale. Un avvertenza: i tag iniettati dopo l'idratazione sono inaffidabili. Se il tuo framework li aggiunge solo lato client, il crawler potrebbe non vederli mai.

**XML sitemap** è migliore su larga scala. Dieci locale su 5 000 pagine significa 50 000 elementi `<link>` inviati ai browser per niente; in una sitemap costa alle tue pagine zero byte.

**HTTP `Link` header** è l'unica opzione per file non HTML come i PDF.

---

## Le regole

### Auto-riferimento e reciprocità

L'insieme su `/fr/about` deve includere `hreflang="fr"` che punta a `/fr/about`. E se `/about` punta a `/fr/about`, `/fr/about` deve puntare indietro. Google chiama un riferimento unidirezionale un "no return tag" e lo scarta.

In pratica questo significa che **ogni pagina in un cluster spedisce l'insieme identico di link**. Generarli da una lista locale condivisa non è una comodità, è l'unico modo per rimanere corretti una volta che hai più di due locale.

### URL assoluti, sempre

```html
<!-- Silently ignored -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Corretto -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

Il vale la pena comprendere il motivo piuttosto che memorizzarlo. `hreflang` è un riferimento cross-document: i motori di ricerca costruiscono un cluster identificato dall'URL, condiviso su ogni pagina in esso. Un percorso relativo ha significato solo relativamente al documento in cui si trova, quindi non può esprimerlo. Non può nemmeno attraversare un host — e un alternate spesso lo fa, quando una locale vive su `example.fr` o `fr.example.com`. In una sitemap o in un header HTTP non c'è alcun documento base su cui risolvere.

Questo ha una conseguenza diretta nel codice. `getLocalizedUrl("/about", "fr")` restituisce `/fr/about` — relativo in ingresso, relativo in uscita. Per `hreflang` devi fornirgli un URL assoluto:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ scartato
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

L'unica eccezione è un framework che risolve i valori relativi per te prima del rendering: Next.js espande gli `alternates` relativi rispetto a `metadataBase`. Va bene — ma la regola si applica all'**HTML emesso**, quindi verifica con `curl`, non l'inspector di DevTools.

### Codici linguistici

ISO 639-1 per la lingua, ISO 3166-1 Alpha 2 per la regione opzionale: `fr`, `fr-CA`, `pt-BR`.

Due trappole catturano quasi tutti. Una regione da sola è invalida — `hreflang="ca"` è catalano, non Canada; hai bisogno di `en-CA` o `fr-CA`. E `en-UK` non esiste: il codice del paese per il Regno Unito è `GB`, quindi è `en-GB`.

Aggiungi una regione solo quando servi genuinamente contenuti diversi per quella regione — prezzi diversi, avvisi legali diversi. `fr` e `fr-FR` su contenuto identico è rumore.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Un concetto che è il più frequentemente dimenticato, e male interpretato, è `x-default` — meno del 30% delle app lo implementano correttamente.

È il fallback per gli utenti la cui lingua non corrisponde a nulla nel tuo set. Un parlante olandese su un sito che offre inglese, francese e spagnolo non corrisponde a nessuna voce; senza `x-default`, Google sceglie per te.

Quello che le persone non capiscono è il significato. `x-default` **non è "la versione in inglese"** e **non è "la locale predefinita"**, anche se di solito punta lì. Significa _la pagina per gli utenti che questo set non copre_. Ecco perché è legittimo — e spesso migliore — farla puntare a un selettore di lingua o a una pagina di destinazione con reindirizzamento geografico piuttosto che a `/en`. Se non hai una tale pagina, la tua lingua principale è la risposta sensata.

Due cose da tenere distinte: `x-default` è una voce aggiuntiva nel set, non un sostituto di quella auto-referenziale, e come tutte le altre voci deve apparire identicamente su ogni pagina nel cluster.

---

## La trappola del canonical

Ogni pagina localizzata deve essere **il proprio canonical**:

```html
<!-- Su https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Puntare il canonical di ogni locale alla versione in inglese invece:

```html
<!-- Su https://example.com/fr/about — uccide la pagina -->
<link rel="canonical" href="https://example.com/about" />
```

dice che la pagina francese è un duplicato che non deve essere indicizzato, mentre `hreflang` dice che è la pagina da servire agli utenti francesi. I segnali sono contraddittori, il canonical vince, e le tue pagine francesi escono dall'indice.

**Il canonical è auto-referenziale per locale. `hreflang` descrive il cluster.**

---

## Scelta di una struttura URL

`hreflang` annota gli URL, quindi la struttura viene prima.

| Struttura          | Esempio           | Trade-off                                                                         |
| ------------------ | ----------------- | --------------------------------------------------------------------------------- |
| **Sottodirectory** | `example.com/fr/` | Un dominio, autorità condivisa — segnale geo più debole                           |
| **Sottodomini**    | `fr.example.com`  | Facile aggiungere o rimuovere una locale — può essere letto come un sito separato |
| **ccTLD**          | `example.fr`      | Segnale paese più forte — autorità costruita per dominio                          |

Le sottodirectory sono la scelta predefinita giusta per la maggior parte dei progetti. Ricorri ai ccTLD solo quando operi davvero come aziende in paesi separati.

L'unica struttura da evitare: servire lingue diverse nello **stesso URL** basandosi su `Accept-Language` o IP. I crawler vedono una versione e indicizzano una versione; tutto il resto è invisibile.

> Intlayer copre tutti e tre attraverso `routing.mode` e `routing.domains`. Vedi [custom domains](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/custom_domains.md) e [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

---

## Implementazione

Scrivere manualmente questi tag non funziona quando si aggiunge una seconda lingua. Deriva questi tag dalla tua lista di locale.

<Steps>

<Step number={1} title="Emetti il cluster su ogni pagina">

Lo stesso set ovunque, canonical per locale, URL assoluti, `x-default` incluso.

<Tabs>

<Tab label="Next.js" value="nextjs">

La Metadata API espone `alternates.languages`, e `getMultilingualUrls` costruisce l'intero record dalle tue locale configurate:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) restituisce:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

Configurazione completa: [Guida i18n Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

La funzione `head` della route costruisce i link. `localeMap` itera sulle tue locale configurate, quindi aggiungere una locale alla config la aggiunge ovunque in una volta:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    // Estrai la locale dai parametri, usa defaultLocale se non presente
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` viene eseguito sul server, quindi i tag finiscono nell'HTML iniziale. Setup completo: [Guida i18n TanStack](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Oppure spostalo tutto nella sitemap">

Su larga scala, mantieni le annotazioni completamente fuori dalle tue pagine. `generateSitemap` emette alternati `xhtml:link` per ogni voce, leggendo locale e modalità di routing dalla tua configurazione:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

Due opzioni da conoscere:

- `xhtmlLinks` (default `true`) — gli alternates vengono emessi solo dove gli URL delle locale differiscono effettivamente. In modalità `no-prefix` ogni locale condivide un URL, quindi vengono saltati a meno che `routing.domains` non dia alle locale i loro hostname.
- `entryPerLocale` (default `false`) — per default un'entry `<url>` contiene tutti gli alternati. Entrambe le forme sono valide, ma solo un URL elencato come `<loc>` conta come _submitted_ in Search Console; le locale alternate rimangono scopribili ma attribuite a nessuna sitemap. Attivando questa opzione ogni URL localizzato ottiene la propria entry con l'intero set di alternati ripetuto. Moltiplica le entry per il numero di locale, quindi fai attenzione al limite di 50 000 URL / 50 MB e dividi in un indice sitemap oltre questo limite.

</Step>

<Step number={3} title="Verifica cosa riceve il crawler">

`hreflang` fallisce silenziosamente, quindi controllalo piuttosto che darla per scontata.

Leggi il source, non l'inspector — `curl https://example.com/fr/about | grep hreflang` mostra quello che riceve un crawler; DevTools mostra il DOM dopo che JavaScript è stato eseguito. Quindi segui ogni alternate e conferma che punta indietro con lo stesso insieme, e che nessuno di loro reindirizza. Il rapporto International Targeting di Search Console cattura il resto su tutto il sito.

Per una crawl specifica per multilingua, lo [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) verifica tag mancanti, alternate rotti e conflitti canonici nelle tue pagine localizzate.

</Step>

</Steps>

---

## Checklist

- [ ] Ogni locale ha un URL distinto e crawlabile
- [ ] Ogni pagina auto-riferisce, e ogni riferimento è reciproco
- [ ] Lo stesso set viene spedito su ogni pagina nel cluster
- [ ] Tutti i valori `href` sono assoluti nell'HTML emesso
- [ ] I codici sono ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, non `en-UK`)
- [ ] `x-default` è presente e punta a dove gli utenti non corrispondenti dovrebbero andare
- [ ] Il canonical è auto-referenziale per locale
- [ ] I tag sono renderizzati lato server, non iniettati dopo l'idratazione
- [ ] Dichiarati esattamente in un unico posto
- [ ] Nessun redirect degli alternati

---

## Conclusioni

`hreflang` è semplice e intransigente. Un tag di ritorno mancante, un URL relativo, un canonical cross-locale, e il cluster viene scartato senza errori da nessuna parte. Ognuno di questi problemi deriva dalla scrittura manuale dei tag.

Deriva l'insieme da un singolo elenco di locale, renderizzalo lato server, mantieni il canonical auto-referenziale e dai a `x-default` la considerazione che merita. Fallo una volta e la correttezza smette di essere qualcosa che devi mantenere.

### Approfondimenti

- [SEO e Internazionalizzazione](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/internationalization_and_SEO.md) — il quadro più ampio della SEO multilingue
- [SEO e i18n in Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Guida Next.js 16 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)
- [Guida i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md)
- [Domini personalizzati per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/custom_domains.md)
- [Riferimento della configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
