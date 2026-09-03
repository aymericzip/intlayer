---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Come individuare le traduzioni mancanti prima dei tuoi utenti"
description: Le traduzioni mancanti falliscono in silenzio. Perché il fallback le nasconde, i quattro livelli di rilevamento realmente efficaci e come bloccare una build su una chiave non tradotta.
keywords:
  - trovare traduzioni mancanti
  - chiavi traduzione mancanti
  - audit i18n
  - stringhe non tradotte
  - copertura traduzioni
  - lint i18n
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# Come individuare le traduzioni mancanti prima dei tuoi utenti

Una traduzione mancante non genera quasi mai un errore esplicito. A seconda della configurazione, mostra la stringa in inglese a un utente giapponese, oppure stampa `checkout.summary.total` direttamente sulla pagina in produzione. Entrambi i problemi passano la code review senza intoppi, finiscono online e vengono scoperti da un cliente anziché dal tuo team.

## Indice

<TOC/>

## Questo vale qualunque sia la libreria utilizzata

Nulla di quanto descritto qui è vincolato a uno stack specifico. I livelli di rilevamento funzionano allo stesso modo su i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate o Lingui, poiché tutti risolvono le chiavi con la medesima logica e falliscono nello stesso modo.

Anche gli strumenti sono portabili. Se i tuoi messaggi risiedono oggi in cataloghi JSON, il [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) punta Intlayer verso quei file, fornendoti i comandi di audit, fill e test senza spostare i contenuti né modificare un singolo import:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // o "icu" per next-intl / react-intl
    }),
  ],
};

export default config;
```

Se preferisci mantenere inalterata anche l'API a runtime, gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) creano alias a livello di bundler per `useTranslation`, `$t` e simili. In ogni caso, considera i comandi seguenti come una concreta attuazione dell'idea, non come un vincolo.

## Perché i vuoti sono invisibili

Ogni libreria i18n risolve una chiave attraverso la medesima catena: cerca la lingua attiva, ricorre alla lingua predefinita come fallback e, se anche questo fallisce, restituisce la chiave grezza. Quest'ultimo passaggio è il vero problema. Non c'è errore, nessun avviso in produzione e nessun test fallisce, perché nessun elemento della pipeline considera anomala una chiave mancante.

Il fallback peggiora le cose anziché risolverle. Una pagina che renderizza silenziosamente in inglese sembra perfetta a uno sviluppatore anglofono e a tutti i controlli automatici. Il bug è visibile solo alla persona che non comprende il testo.

La domanda non è "come gestisco le traduzioni mancanti a runtime". Bensì "come rendo impossibile il merge di una chiave non tradotta".

## I quattro livelli in cui puoi intercettarle

Ogni livello intercetta qualcosa che gli altri non vedono. È consigliabile adottarne più di uno.

| Livello           | Rileva                                        | Ignora                                        |
| :---------------- | :-------------------------------------------- | :-------------------------------------------- |
| Tipi              | Chiavi che non esistono affatto               | Chiave esistente ma non tradotta in `ja`      |
| Linter            | Testi hardcoded mai inviati in traduzione     | Chiavi mancanti da un catalogo                |
| Audit             | Copertura lingue su ogni chiave dichiarata    | Testi che non sono mai stati resi traducibili |
| Test di rendering | Chiavi risolte ma visualizzate in modo errato | Tutto ciò che non è coperto dai test          |

La lacuna più comune riguarda la terza riga: i team sanno che le loro chiavi sono valide nel codice, ma nulla verifica che tutte le diciotto lingue contengano effettivamente un valore.

## Livello 1: rendere la chiave un tipo, non una stringa

`t("checkout.summry.total")` è un errore di battitura che compila perfettamente. Se le chiavi sono stringhe semplici, ogni rinomina è un rischio in produzione e ogni eliminazione lascia chiavi orfane.

I tipi trasformano questo problema in un errore di compilazione. `react-i18next` lo supporta tramite declaration merging, `next-intl` lo deduce dalla struttura dei messaggi, Lingui ricava gli ID dal testo sorgente e Intlayer genera tipi restrittivi dai file di dichiarazione. Tutti funzionano; ciò che cambia è la quantità di codice di configurazione necessaria.

Questo livello è indispensabile ma non sufficiente. I tipi descrivono la forma del catalogo predefinito. Non dicono nulla sul fatto che il coreano abbia un valore assegnato a quella chiave.

## Livello 2: linter per le stringhe mai diventate chiavi

La traduzione che non riesci a trovare è spesso quella che non è mai stata resa traducibile. Un'etichetta hardcoded in un componente è invisibile a qualsiasi audit basato su cataloghi, perché per gli strumenti quella stringa semplicemente non esiste.

Il plugin ESLint di Intlayer copre questo caso con `no-raw-text`, insieme a `no-unused-content` per la situazione opposta: contenuti dichiarati che non vengono più letti da nessuna parte.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` impedisce che i cataloghi si gonfino a dismisura. Le chiavi morte non rompono l'applicazione, ma fanno lievitare inutilmente le fatture dei servizi di traduzione. Consulta l'elenco completo delle regole nella [documentazione del plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md).

## Livello 3: audit della copertura delle lingue

Questo è il livello che risponde alla domanda fondamentale. Intlayer lo fornisce come comando CLI:

```bash packageManager="npm"
npx intlayer content test
```

Legge le lingue configurate e i dizionari dichiarati, quindi segnala quali chiavi mancano in quali lingue e in quale file.

Un dettaglio cruciale prima di integrarlo nei tuoi flussi: **la CLI stampa un report ma restituisce codice di uscita zero.** Se la inserisci in una pipeline aspettandoti che blocchi la build, otterrai un esito positivo con una serie di avvisi che nessuno leggerà. Per creare un blocco effettivo, usa l'API programmatica illustrata di seguito.

## Livello 4: asserzione nella suite di test

`listMissingTranslations()` ti fornisce lo stesso audit strutturato come dati, perfetto per un gate di build.

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("non presenta lingue richieste mancanti", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Vengono restituiti tre campi principali:

- `missingTranslations`: per chiave, quali lingue mancano e in quale file. È l'informazione da stampare se il test fallisce.
- `missingLocales`: l'unione di tutte le lingue mancanti su tutte le chiavi.
- `missingRequiredLocales`: limitato alle `requiredLocales` della tua configurazione, o a tutte le lingue se non è stato specificato.

## `requiredLocales` rende il controllo sostenibile

Offrire diciotto lingue non impone che tutte debbano essere complete per poter effettuare un deploy. La maggior parte dei team stabilisce un gruppo essenziale che blocca il rilascio e un gruppo che può essere completato con calma.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Senza `requiredLocales`, ogni lingua configurata diventa obbligatoria e la build rimane rossa finché non arriva l'ultima traduzione. Questo finisce per spingere i team a disattivare completamente il controllo, peggiorando la situazione.

## Trovare i vuoti già presenti in produzione

I livelli precedenti impediscono nuovi problemi. Per un'applicazione già online, due strategie si rivelano preziose:

**Pseudolocalizzazione.** Utilizza una finta lingua in cui ogni testo viene trasformato, ad esempio `[!!! Ĉĥéçķöũţ !!!]`. Tutto ciò che rimane in inglese puro è scritto direttamente nel codice. Rivela in dieci minuti ciò che un audit di catalogo non può strutturalmente vedere.

**Scansione del proprio sito.** Se gestisci URL localizzati, scarica un campione di pagine per lingua e cerca nel codice HTML le stringhe della lingua di base. Una pagina in `/ja/` contenente "Add to cart" è una traduzione mancante o un fallback imprevisto.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## Colmare le mancanze

Una volta individuate le lacune, `intlayer fill` compila le voci vuote, e l'opzione `autoFill` può generare i file per lingua man mano che il contenuto viene dichiarato. Vedi [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md).

È bene essere realisti: le traduzioni automatiche trasformano un vuoto _visibile_ in uno _invisibile_. La chiave ha ora un valore, l'audit diventa verde, ma nessuno ha letto il testo. Usalo per sbloccare i rilasci, ma sottoponi a revisione umana i testi critici prima che raggiungano gli utenti. È un punto di partenza, non la soluzione definitiva.

## Errori comuni

- **Considerare il fallback come una protezione.** È solo una strategia di rendering d'emergenza, non una rete di sicurezza. Una pagina che mostra l'inglese in silenzio è un bug invisibile.
- **Affidarsi al report CLI per bloccare la CI.** `intlayer content test` esce con codice 0. Usa un'asserzione in un test.
- **Rendere ogni lingua obbligatoria.** Il controllo viene rimosso non appena blocca una consegna urgente.
- **Ispezionare i cataloghi ma mai la pagina renderizzata.** I testi hardcoded sono per definizione invisibili nei cataloghi.
- **Testare solo la lingua predefinita.** L'unica lingua che non rischia mai di mancare.
- **Fermarsi all'auto-fill automatico.** Audit verde su testi mai revisionati.

## Per approfondire

- [Testare i contenuti: audit CLI, API programmatica e asserzioni UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/testing.md)
- [Regole del plugin ESLint, tra cui `no-raw-text` e `no-unused-content`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md)
- [autoFill: generare file di dichiarazione per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md)
- [Riferimento configurazione: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [Report di benchmark tra framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md)
- [Adattatore di compatibilità i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/i18next.md)
- [Cosa comprende realmente l'internazionalizzazione](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/what_is_internationalization.md)
- [i18n per componente vs centralizzata](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md)
