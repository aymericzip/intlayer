---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Guida completa per tradurre la tua app"
description: "Non più i18next. La guida 2026 per costruire un'app htmx multilingue (i18n). Traduci con AI agents e ottimizza la dimensione del bundle, SEO e performance."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - htmx
  - Hypermedia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - htmx
history:
  - version: 9.4.1
    date: 2026-08-29
    changes: "Initial history"
author: aymericzip
---

# Traduci la tua applicazione htmx usando Intlayer | Internazionalizzazione (i18n)

htmx non esegue il rendering di alcun contenuto proprio. Ogni etichetta che un visitatore legge è HTML prodotto dal tuo server, e ogni swap è una richiesta HTTP separata. Internazionalizzare un'app htmx è quindi una preoccupazione del server: la locale deve essere risolta su ogni richiesta, e ogni frammento deve essere renderizzato in quella locale.

Intlayer copre questo attraverso le sue integrazioni backend, che rilevono la locale per ogni richiesta ed espongono i contenuti dichiarati al handler che costruisce l'HTML.

## Indice dei contenuti

<TOC/>

## Le tre regole dell'i18n in un'app htmx

<AccordionGroup>

<Accordion header="La locale deve essere risolta su ogni richiesta, non solo sulla prima">

Una singola pagina può attivare dozzine di swap. Ognuno è una richiesta nuova senza memoria della pagina che l'ha generata. Se la locale vive in una variabile impostata durante il rendering iniziale, ogni frammento successivo ricade al linguaggio predefinito.

Il middleware di Intlayer risolve la locale dalla richiesta stessa, quindi un frammento servito al minuto dieci risponde nella stessa lingua della pagina servita al minuto zero.

</Accordion>

<Accordion header="La locale deve viaggiare con la richiesta">

Due vettori funzionano con htmx. Un cookie (`INTLAYER_LOCALE`) viene inviato automaticamente dal browser ad ogni richiesta, incluse quelle htmx. Un header (`x-intlayer-locale`) può essere allegato alle richieste htmx con l'attributo `hx-headers`. Entrambi vengono letti per impostazione predefinita.

</Accordion>

<Accordion header="L'HTML échangé est toujours de l'HTML">

Une valeur traduite interpolée dans un fragment est du markup. Échappez-la, exactement comme vous le feriez pour toute autre valeur dynamique, afin qu'une traduction contenant `<` ne puisse pas casser le document dans lequel elle est échangée.

</Accordion>

</AccordionGroup>

---

## Guide étape par étape

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Comment internationaliser votre application en utilisant Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Vedi [Application Template](https://github.com/aymericzip/intlayer-htmx-template) su GitHub.

<Steps>

<Step number={1} title="Installare le dipendenze">

Installa `intlayer` più l'integrazione per il tuo server.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```bash packageManager="npm"
npm install intlayer express-intlayer cookie-parser
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer cookie-parser
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer cookie-parser
```

```bash packageManager="bun"
bun add intlayer express-intlayer cookie-parser
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```bash packageManager="npm"
npm install intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

  </Tab>
  <Tab label="Hono" value="hono">

```bash packageManager="npm"
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash
bun add intlayer elysia-intlayer
```

  </Tab>
</Tabs>

> Express e Fastify leggono il cookie della locale attraverso i loro parser di cookie, quindi devono essere installati insieme. Hono ed Elysia analizzano i cookie nativamente.

htmx stesso è un singolo script tag, aggiunto nel passaggio 4.

</Step>

<Step number={2} title="Configurazione del vostro progetto">

Crea un `intlayer.config.ts` alla radice del tuo progetto:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Per l'elenco completo delle opzioni, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Step>

<Step number={3} title="Dichiara il Tuo Contenuto">

Dichiara ogni etichetta che il server renderizzerà, incluse quelle che appaiono solo all'interno di un frammento:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      it: "Lingua",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        it: "Articoli nel tuo carrello: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      it: "Aggiungi un articolo",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Le dichiarazioni di contenuto possono trovarsi ovunque sotto `contentDir` (per impostazione predefinita `./src`) e corrispondere a `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. Vedi la [documentazione sulle dichiarazioni di contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

</Step>

<Step number={4} title="Registra il middleware di Intlayer">

Il middleware risolve la locale di ogni richiesta e la espone ai tuoi handler.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Il cookie parser deve essere eseguito per primo: `express-intlayer` legge la locale
// del cookie attraverso `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

La locale risolta è su `res.locals.locale`.

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookie from "@fastify/cookie";
import formbody from "@fastify/formbody";
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

await fastify.register(cookie);
await fastify.register(formbody);
await fastify.register(intlayer);
```

La locale risolta si trova su `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

La locale risolta è `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

La locale risolta è `intlayer!.locale` nel contesto della route.

  </Tab>
</Tabs>

Per impostazione predefinita, la locale viene presa dal cookie `INTLAYER_LOCALE`, quindi dall'header `x-intlayer-locale`, quindi dalla negoziazione `Accept-Language`.

</Step>

<Step number={5} title="Rendering dei fragment con la locale della richiesta">

Scrivi i tuoi renderer di fragment come funzioni pure di una locale e passa la locale risolta dal middleware. Passarla esplicitamente mantiene un fragment legato alla richiesta che lo ha chiesto, qualunque server tu stia utilizzando.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapa un valore tradotto in modo che non possa fuoriuscire dal markup. */
const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (character) => HTML_ENTITIES[character] ?? character
  );

export const renderCart = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer("app", locale);

  return `<section id="cart">
  <p>${escapeHtml(String(content.cartSummary({ count: itemCount })))}</p>
  <p>${escapeHtml(currency(itemCount * 12.5, { locale, currency: "EUR" }))}</p>
  <button
    hx-post="/cart/items"
    hx-vals='{"itemCount": ${itemCount}}'
    hx-target="#cart"
    hx-swap="outerHTML"
  >${escapeHtml(String(content.addItem))}</button>
</section>`;
};
```

Servirlo da una route:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  // Ottiene il numero di elementi dal corpo della richiesta
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  // Invia la risposta HTML con il carrello renderizzato
  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  // Ottiene il numero di elementi dal corpo della richiesta
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  // Invia la risposta HTML con il carrello renderizzato
  return reply
    .type("text/html")
    .send(renderCart(req.intlayer.locale, itemCount));
});
```

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", async (c) => {
  const body = await c.req.parseBody();
  const itemCount = Number(body["itemCount"] ?? 0) + 1;

  return c.html(renderCart(c.get("locale"), itemCount));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", ({ body, intlayer }) => {
  const itemCount =
    Number((body as { itemCount?: string })?.itemCount ?? 0) + 1;

  return new Response(renderCart(intlayer!.locale, itemCount), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

Lo stesso frammento ora risponde in francese per un visitatore il cui cookie dice `fr`, e in arabo per uno il cui cookie dice `ar`, senza alcuna modifica al markup chiamante.

</Step>

<Step number={6} title="Servire la prima pagina">

Esegui il rendering del `<body>` da solo, in modo che il selettore di lingua nel passaggio 7 possa scambiarlo interamente, quindi racchiudilo nel documento che carica htmx:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer("app", locale);

  return `<body lang="${locale}" dir="${getHTMLTextDir(locale)}">
  <main>
    <h1>${escapeHtml(String(content.pageTitle))}</h1>
    ${renderLocaleSwitcher(locale)}
    ${renderCart(locale, itemCount)}
  </main>
</body>`;
};

export const renderPage = (locale: Locale, itemCount: number): string =>
  `<!doctype html>
<html lang="${locale}" dir="${getHTMLTextDir(locale)}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(String(getIntlayer("app", locale).pageTitle))}</title>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
</head>
${renderBody(locale, itemCount)}
</html>`;
```

`getHTMLTextDir` restituisce `ltr`, `rtl` o `auto` per la locale, il che è ciò che consente all'arabo e all'ebraico di essere visualizzati correttamente.

</Step>

<Step number={7} title="Cambia la lingua">

Cambiare la lingua è una richiesta come qualsiasi altra. Il server memorizza la scelta nel cookie che il middleware legge, quindi restituisce la pagina sottoposta a nuovo rendering nella nuova locale.

Renderizza lo switcher come un `select` che si invia da solo e sostituisce l'intero `<body>`, in modo che anche le etichette statiche intorno ai tuoi frammenti cambino:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getIntlayer, getLocaleName, type Locale, locales } from "intlayer";

const renderLocaleSwitcher = (locale: Locale): string => {
  const content = getIntlayer("app", locale);

  const options = locales
    .map(
      (availableLocale: Locale) =>
        `<option value="${availableLocale}"${availableLocale === locale ? " selected" : ""}>${escapeHtml(getLocaleName(availableLocale, locale))}</option>`
    )
    .join("");

  return `<form>
  <label for="locale">${escapeHtml(String(content.localeLabel))}</label>
  <select
    id="locale"
    name="locale"
    hx-post="/locale"
    hx-trigger="change"
    hx-target="body"
    hx-swap="outerHTML"
  >${options}</select>
</form>`;
};
```

> `getLocaleName(availableLocale, locale)` scrive ogni lingua nella lingua attualmente visualizzata. Non passare un secondo argomento per scrivere invece ognuna nella propria lingua.

Gestisci il post convalidando il valore, impostando il cookie e restituendo il nuovo corpo:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", (req, res) => {
  const requestedLocale = String(req.body?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    res.status(400).send("Unknown locale");
    return;
  }

  res.cookie("INTLAYER_LOCALE", requestedLocale, {
    sameSite: "lax",
    path: "/",
  });
  res.type("html").send(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

fastify.post("/locale", async (req, reply) => {
  const requestedLocale = String((req.body as { locale?: string })?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    return reply.status(400).send("Locale sconosciuto");
  }

  return reply
    .setCookie("INTLAYER_LOCALE", requestedLocale, {
      sameSite: "lax",
      path: "/",
    })
    .type("text/html")
    .send(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { setCookie } from "hono/cookie";
import { isDeclaredLocale } from "intlayer";

app.post("/locale", async (c) => {
  const body = await c.req.parseBody();
  const requestedLocale = String(body["locale"]);

  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Locale sconosciuto", 400);
  }

  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  return c.html(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", ({ body, cookie, status }) => {
  const requestedLocale = String((body as { locale?: string })?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    return status(400, "Unknown locale");
  }

  cookie["INTLAYER_LOCALE"]!.set({
    value: requestedLocale,
    sameSite: "lax",
    path: "/",
  });

  return new Response(renderBody(requestedLocale, 0), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

> `isDeclaredLocale` limita una stringa arbitraria a una delle tue locale configurate, quindi un valore inaspettato non raggiunge mai i tuoi renderer.

</Step>

<Step number={8} title="Mantieni lang e dir sincronizzati dopo uno swap" isOptional={true}>

Uno swap può sostituire il `<body>`, mai l'`<html>` che lo circonda. Renderizza `lang` e `dir` sul body scambiato e copiali di nuovo sull'elemento radice una volta, dall'head:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Senza questo, uno switch all'arabo renderizza da destra a sinistra all'interno del body mentre il documento continua a pubblicizzare la lingua precedente alla tecnologia assistiva e ai crawler.

</Step>

<Step number={9} title="Invia la locale come header invece di un cookie" isOptional={true}>

Se un cookie non ti piace, allega la locale a ogni richiesta htmx con `hx-headers` su un elemento antenato. I discendenti l'ereditano:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

Il middleware legge `x-intlayer-locale` per impostazione predefinita. Puoi rinominare entrambi i carrier nella tua configurazione:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Altre opzioni di configurazione
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

</Step>

</Steps>

### Configura TypeScript

Includi i tipi generati automaticamente affinché una chiave non dichiarata sia un errore di compilazione piuttosto che una stringa vuota a runtime.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

### Configurazione Git

È consigliato ignorare i file generati da Intlayer:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**Estensione Intlayer VS Code** ufficiale.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** dei contenuti tradotti.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per ulteriori dettagli su come utilizzare l'estensione, fare riferimento alla [documentazione dell'Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Andare oltre

Per andare oltre, puoi esternalizzare il tuo contenuto utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md), in modo che i traduttori possono modificare i contenuti senza una distribuzione.

## Domande frequenti

<FAQ>

<Question title="Perché il mio frammento scambiato ritorna nella lingua sbagliata?">

Perché la richiesta del frammento non conteneva nessuna locale. Le richieste htmx sono indipendenti dalla pagina che le ha emesse, quindi la locale deve viaggiare su ognuna di esse, tramite il cookie `INTLAYER_LOCALE` o un header `x-intlayer-locale` impostato con `hx-headers`. Verifica che il parser dei cookie sia eseguito prima del middleware Intlayer su Express e Fastify, altrimenti il cookie non viene mai letto e ogni richiesta ricade su `Accept-Language`.

</Question>

<Question title="Devo passare la locale a `getIntlayer` o affidarmi al contesto della richiesta?">

Passalo. Le integrazioni espongono la locale risolta (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), e passarla a `getIntlayer` rende ogni renderer una funzione pura di una locale. Questo è più facile da testare, e mantiene i tuoi fragment renderers portabili se cambi server.

</Question>

<Question title="Ho bisogno di una libreria i18n lato client insieme a htmx?">

No. Tutto ciò che un visitatore vede è prodotto dal server, quindi non c'è niente da tradurre nel browser. Questo è anche il motivo per cui il costo del peso della pagina per l'i18n in un'app htmx è quasi zero: nessun catalogo viene mai spedito al client.

</Question>

<Question title="Come localizzo anche l'URL, per l'SEO?">

Servire le tue pagine con un prefisso di locale (`/fr/cart`) e leggere la locale dal percorso nel tuo route handler, piuttosto che dal cookie, per il rendering completo della pagina. I frammenti possono continuare a utilizzare il cookie o l'header. Vedi [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per le opzioni di routing e [rewrite URL personalizzati](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/custom_url_rewrites.md).

</Question>

<Question title="Come gestisco le lingue da destra a sinistra?">

`getHTMLTextDir(locale)` ritorna `ltr`, `rtl` o `auto`. Impostalo sul documento per il rendering iniziale, e riapplicalo dopo uno swap come mostra il passo 8. Usa proprietà CSS logiche (`margin-inline-start` invece di `margin-left`) così il tuo layout le segue.

</Question>

<Question title="Devo fare l'escape dei valori tradotti?">

Sì, per qualsiasi cosa tu interpoli in una template string, esattamente come per qualsiasi altro valore dinamico. Il contenuto proveniente dal CMS o da un traduttore non è markup che controlli. Il passaggio 5 mostra un escaper minimalista.

</Question>

<Question title="Lo stesso contenuto può servire anche le mie risposte API?">

Sì. Le integrazioni backend espongono `t()` e `getIntlayer()` a qualsiasi handler, quindi un messaggio di errore mostrato in un toast e un'etichetta renderizzata in un frammento provengono dallo stesso contenuto dichiarato. Vedi le guide [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_hono.md) e [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_elysia.md).

</Question>

<Question title="Devo spostare il mio contenuto chiave per chiave?">

No. Esegui `npx intlayer extract` e Intlayer legge i tuoi file sorgente, estrae le stringhe visibili all'utente e scrive un file `.content` accanto a ciascuno, così puoi rivedere un diff invece di copiare le stringhe in un catalogo una alla volta. Vedi il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md).

</Question>

<Question title="Posso mantenere i miei file di traduzione JSON esistenti?">

Sì. Il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi file `/messages/{locale}/{namespace}.json` come fonte di verità e genera dizionari Intlayer da essi, in entrambe le direzioni. Un [plugin di sincronizzazione PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md) fa lo stesso per i cataloghi gettext, e i [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) ti permettono di dividere il contenuto per lingua invece di raggruppare i locale in un unico file.

</Question>

<Question title="Come traduco l'app automaticamente con l'AI?">

Esegui `npx intlayer fill`, che riempie le traduzioni mancanti con l'LLM di tua scelta utilizzando il tuo provider e la tua API key. Aggiungi `--git-diff` per tradurre solo i contenuti modificati nel branch. Vedi il [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md) e l'[integrazione CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/CI_CD.md).

</Question>

<Question title="Intlayer supporta il genere, le condizioni e i valori interpolati?">

Sì: [contenuto basato sul genere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/gender.md), condizioni, [enumerazioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/enumeration.md), [inserimenti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md) per valori interpolati, e [formattatori](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md) per numeri, date e valute.

</Question>

<Question title="Quali strumenti di editor e agenti AI sono disponibili?">

Cinque componenti, tutti opzionali:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)**: salta dalla chiave al file di contenuto che la dichiara, estrai il contenuto da un file ed esegui build, fill, test, push e pull dalla palette dei comandi.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**: la stessa consapevolezza in qualsiasi editor che parla LSP, con go to definition, hover previews di un valore tradotto, autocompletamento delle chiavi e un avviso quando una chiave non è dichiarata da nessuna parte.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)**: espone la documentazione di Intlayer e la CLI a Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**: competenze specifiche come `intlayer-config`, `intlayer-cli` e `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md)**: `no-raw-text` segnala le stringhe hardcoded.

</Question>

<Question title="Intlayer è gratuito e open source?">

Sì, sotto licenza Apache 2.0, uso commerciale incluso. Il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) ospitato è un servizio a pagamento opzionale che può anche essere [auto-hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

</Question>

</FAQ>
