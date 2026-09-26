---
createdAt: 2026-09-22
updatedAt: 2026-09-22
priority: 6
title: Estensione Chrome & Firefox, Scanner i18n & SEO
description: Ispeziona la configurazione i18n di qualsiasi sito web con l'estensione Chrome di Intlayer. Rileva framework, libreria i18n, lingue, tag hreflang e SEO ed esegui un audit SEO i18n completo.
keywords:
  - Estensione Chrome
  - Scanner i18n
  - Controllo hreflang
  - SEO multilingue
  - Intlayer
  - Localizzazione
  - Strumenti di sviluppo
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Inizializzazione cronologia"
author: aymericzip
---

# Estensione Chrome & Firefox: Scanner i18n & SEO

## Panoramica

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) è l'estensione ufficiale di Chrome per **Intlayer**. Aprila su qualsiasi sito web per vedere come il sito gestisce l'internazionalizzazione: quale framework e libreria i18n utilizza, quali lingue espone e se i suoi tag SEO multilingue sono impostati correttamente.

Funziona su qualsiasi sito web, indipendentemente dal fatto che utilizzi o meno Intlayer.

![Estensione Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

[Link all'estensione per Chrome](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

[Link al componente aggiuntivo per Firefox](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/)

## Funzionalità

- **Rilevamento delle tecnologie**: identifica il framework (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) e la libreria i18n (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Ogni rilevamento mostra gli elementi che lo hanno attivato, come una variabile globale, un cookie o un marcatore DOM.
- **Lingue**: elenca le lingue trovate nell'attributo `lang`, nei tag hreflang e `og:locale`, nel prefisso di lingua dell'URL e nei cookie o voci di memorizzazione della lingua.
- **Tag SEO i18n**: controlla `html lang`, `html dir`, il link canonico, i tag hreflang, `x-default`, `og:locale` e la percentuale di link interni localizzati.
- **Navigazione tra le locale**: passa con un clic dalla pagina corrente a una delle sue versioni localizzate, in base ai suoi tag hreflang.
- **Ricerca nella sitemap**: cerca tra tutte le pagine elencate nella sitemap del sito e le apre nella scheda corrente.
- **Audit completo**: esegue lo stesso audit dello [Scanner SEO i18n](https://intlayer.org/i18n-seo-scanner) e mostra un punteggio in tempo reale.

## Installazione

<Tabs group="browser">
  <Tab label="Chrome" value="chrome">

Installa [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) dal Chrome Web Store, quindi fissala sulla barra degli strumenti.

L'estensione funziona su Chrome e su qualsiasi browser basato su Chromium che supporta le estensioni del Chrome Web Store (Edge, Brave, Arc, Opera).

  </Tab>
  <Tab label="Firefox" value="firefox">

Installa [**Intlayer i18n Scanner**](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/) dai componenti aggiuntivi di Firefox, quindi fissala sulla barra degli strumenti.

  </Tab>
</Tabs>

## Utilizzo

### Ispezionare una pagina

1. Apri il sito web che desideri ispezionare.
2. Fai clic sull'icona di **Intlayer i18n Scanner** nella barra degli strumenti.
3. Il popup mostra le sezioni **Tecnologie rilevate**, **Lingue** e **Tag SEO i18n** per la pagina corrente.

Il rilevamento viene eseguito localmente nel browser, solo sulla scheda attiva.

### Navigare tra le locale

![Navigazione dell'estensione Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_navigation.png?raw=true)

La sezione **Naviga** elenca le **Versioni localizzate** della pagina corrente, lette dai suoi tag hreflang. Clicca su una locale per aprire quella versione nella scheda corrente.

In **Pagine della sitemap**, digita per cercare tra gli URL della sitemap del sito, poi clicca su un risultato per aprirlo.

### Eseguire un audit completo

![Punteggio dell'audit dell'estensione Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Scorri fino alla sezione **Audit completo** e fai clic su **Esegui audit i18n completo**. I risultati arrivano in streaming al termine di ogni verifica, raggruppati in:

- **Pagina**: attributi `html lang` e `dir`, lingua corrente, tag hreflang, `x-default`, link canonico, link interni localizzati, selettore di lingua, icone delle bandiere e contenuto non utilizzato della lingua incluso nel bundle JavaScript.
- **Robots.txt**: presenza e verifica che i percorsi di lingua rimangano accessibili ai crawler.
- **Sitemap**: presenza, ogni lingua elencata, link alternativi e `x-default`.
- **Dominio**: numero di lingue scoperte nell'intero sito.

Ogni controllo è contrassegnato come superato, avviso o fallito e il punteggio riassume lo stato generale del SEO i18n della pagina.

## Privacy e autorizzazioni

L'estensione richiede autorizzazioni minime:

- **activeTab** e **scripting**: il rilevatore viene eseguito solo sulla scheda attualmente visualizzata e solo quando si apre il popup.
- **back.intlayer.org**: utilizzato solo quando si esegue un audit completo. L'URL della pagina corrente viene inviato all'API di Intlayer per essere scansionato.

Non viene raccolta alcuna cronologia di navigazione e nulla viene eseguito in background.

## FAQ

<FAQ>

<Question title="Il sito web deve utilizzare Intlayer?">

No. L'estensione ispeziona qualsiasi sito web, indipendentemente dal framework o dalla libreria i18n utilizzata.

</Question>
<Question title="Perché una tecnologia non viene rilevata?">

Il rilevamento si basa su ciò che la pagina espone nel browser: variabili globali, cookie, meta tag e marcatori DOM. Alcune build di produzione rimuovono questi marcatori, quindi una libreria può essere in uso senza lasciare una traccia visibile.

</Question>
<Question title="Come posso risolvere i problemi riscontrati dall'audit?">

La maggior parte dei controlli corrisponde a un'impostazione di routing o di metadati. Con Intlayer, hreflang, canonico, `x-default`, link localizzati, sitemap e robots.txt vengono generati dalla tua [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md). Consulta la guida all'integrazione per il tuo framework, ad esempio [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nuxt.md) o [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Strumenti correlati

- [Estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)
- [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)
- [Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)
