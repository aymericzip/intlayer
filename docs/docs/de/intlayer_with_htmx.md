---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026er-Leitfaden zum Erstellen einer mehrsprachigen (i18n) htmx-App. Übersetzen Sie mit KI-Agenten und optimieren Sie die Bundle-Größe, SEO und Leistung."
keywords:
  - Internationalisierung
  - Dokumentation
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
    changes: "Erste Geschichte"
author: aymericzip
---

# Übersetzen Sie Ihre htmx-Anwendung mit Intlayer | Internationalisierung (i18n)

htmx rendert keinen eigenen Inhalt. Jedes Label, das ein Besucher liest, ist HTML, das Ihr Server produziert hat, und jeder Swap ist eine separate HTTP-Anfrage. Die Internationalisierung einer htmx-App ist daher eine Server-Aufgabe: Das Locale muss bei jeder Anfrage aufgelöst werden, und jedes Fragment muss in diesem Locale gerendert werden.

Intlayer behandelt dies durch seine Backend-Integrationen, die das Locale pro Anfrage erkennen und Ihren deklarierten Inhalt dem Handler bereitstellen, der das HTML erstellt.

## Inhaltsverzeichnis

<TOC/>

## Die drei Regeln der i18n in einer htmx-App

<AccordionGroup>

<Accordion header="Das Locale muss bei jeder Anfrage aufgelöst werden, nicht nur bei der ersten">

Eine einzelne Seite kann Dutzende von Swaps auslösen. Jeder ist eine neue Anfrage ohne Erinnerung an die Seite, die sie ausgelöst hat. Wenn das Locale in einer Variablen gespeichert ist, die während des initialen Renderings festgelegt wird, greift jedes Fragment danach auf die Standardsprache zurück.

Die Intlayer-Middleware löst das Locale aus der Anfrage selbst auf, sodass ein Fragment, das in Minute zehn bereitgestellt wird, in der gleichen Sprache antwortet wie die Seite, die in Minute null bereitgestellt wurde.

</Accordion>

<Accordion header="Das Locale muss mit der Anfrage reisen">

Zwei Träger funktionieren mit htmx. Ein Cookie (`INTLAYER_LOCALE`) wird vom Browser automatisch bei jeder Anfrage, einschließlich htmx-Anfragen, gesendet. Ein Header (`x-intlayer-locale`) kann htmx-Anfragen mit dem Attribut `hx-headers` angehängt werden. Beide werden standardmäßig gelesen.

</Accordion>

<Accordion header="Ausgetauschte HTML ist immer noch HTML">

Ein übersetzter Wert, der in ein Fragment interpoliert wird, ist Markup. Escape es genau wie jeden anderen dynamischen Wert, damit eine Übersetzung mit `<` das Dokument, in das es ausgetauscht wird, nicht beschädigen kann.

</Accordion>

</AccordionGroup>

---

## Schritt-für-Schritt-Anleitung

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Wie man deine Anwendung mit Intlayer internationalisiert"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Siehe [Application Template](https://github.com/aymericzip/intlayer-htmx-template) auf GitHub.

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie `intlayer` plus die Integration für Ihren Server.

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

> Express und Fastify lesen das Locale-Cookie über ihre eigenen Cookie-Parser, daher müssen diese parallel installiert werden. Hono und Elysia parsen Cookies nativ.

htmx selbst ist ein einzelnes Script-Tag, das in Schritt 4 hinzugefügt wird.

</Step>

<Step number={2} title="Konfiguration Ihres Projekts">

Erstellen Sie eine `intlayer.config.ts` im Stammverzeichnis Ihres Projekts:

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

> Die vollständige Liste der Optionen finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Step>

<Step number={3} title="Deklarieren Sie Ihren Inhalt">

Deklarieren Sie jedes Label, das der Server rendert, einschließlich derjenigen, die nur in einem Fragment erscheinen:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      de: "Sprache",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        de: "Artikel in Ihrem Warenkorb: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      de: "Artikel hinzufügen",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Inhaltsdeklarationen können überall unter `contentDir` (standardmäßig `./src`) leben und mit `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}` übereinstimmen. Siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>

<Step number={4} title="Registrieren Sie die Intlayer-Middleware">

Das Middleware löst das Locale jeder Anfrage auf und stellt es Ihren Handlern zur Verfügung.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Der Cookie-Parser muss zuerst ausgeführt werden: `express-intlayer` liest das Locale
// Cookie über `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

Das aufgelöste Locale befindet sich auf `res.locals.locale`.

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

Das aufgelöste Locale ist auf `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

Das aufgelöste Locale ist `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

Die aufgelöste Locale befindet sich unter `intlayer!.locale` im Route-Kontext.

  </Tab>
</Tabs>

Standardmäßig wird die Locale aus dem `INTLAYER_LOCALE` Cookie entnommen, dann der `x-intlayer-locale` Header, dann `Accept-Language` Verhandlung.

</Step>

<Step number={5} title="Fragment mit der Request-Locale rendern">

Schreiben Sie Ihre Fragment-Renderer als reine Funktionen einer Locale, und übergeben Sie die Locale, die die Middleware aufgelöst hat. Die explizite Übergabe hält ein Fragment an die Anfrage gebunden, die es angefordert hat, unabhängig davon, auf welchem Server Sie sich befinden.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escaped einen übersetzten Wert, damit dieser nicht aus dem Markup ausbrechen kann. */
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

Stelle es von einer Route bereit:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  // Die Artikelanzahl aus dem Request-Body abrufen und um 1 erhöhen
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  // Das Warenkorb-HTML mit der aktuellen Locale und Artikelanzahl rendern
  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  // Die Artikelanzahl aus dem Request-Body abrufen und um 1 erhöhen
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  // Das Warenkorb-HTML mit der aktuellen Locale und Artikelanzahl rendern
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

Das gleiche Fragment antwortet nun auf Französisch für einen Besucher, dessen Cookie `fr` sagt, und auf Arabisch für einen, dessen Cookie `ar` sagt, ohne Änderung am aufrufenden Markup.

</Step>

<Step number={6} title="Die erste Seite bereitstellen">

Rendern Sie den `<body>` allein, damit der Locale-Switcher in Schritt 7 ihn vollständig austauschen kann, dann wickeln Sie ihn in das Dokument, das htmx lädt:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  // Hole den Inhalt für die aktuelle Locale
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

`getHTMLTextDir` gibt `ltr`, `rtl` oder `auto` für das Locale zurück, was dafür sorgt, dass Arabisch und Hebräisch korrekt angezeigt werden.

</Step>

<Step number={7} title="Sprache wechseln">

Ein Sprachwechsel ist eine Anfrage wie jede andere. Der Server speichert die Auswahl im Cookie, den die Middleware liest, und gibt dann die Seite in den neuen Lokalisierungen neu gerendert zurück.

Rendere den Wechsler als `select`, der sich selbst sendet und den ganzen `<body>` austauscht, sodass auch die statischen Bezeichnungen um deine Fragmente herum wechseln:

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

> `getLocaleName(availableLocale, locale)` schreibt jede Sprache in der aktuell angezeigten Sprache. Übergeben Sie kein zweites Argument, um jede stattdessen in ihrer eigenen Sprache zu schreiben.

Behandeln Sie den POST, indem Sie den Wert validieren, das Cookie setzen und den neuen Body zurückgeben:

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
  // Extrahieren Sie die angeforderte Sprache aus dem Request-Body
  const requestedLocale = String((req.body as { locale?: string })?.locale);

  // Überprüfen Sie, ob die angeforderte Sprache deklariert ist
  if (!isDeclaredLocale(requestedLocale)) {
    return reply.status(400).send("Unknown locale");
  }

  // Setzen Sie das Cookie und geben Sie den neuen Body zurück
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
  // Body parsen
  const body = await c.req.parseBody();
  // Angeforderte Locale aus dem Body extrahieren
  const requestedLocale = String(body["locale"]);

  // Überprüfen, ob die angeforderte Locale deklariert ist
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  // Cookie für die Locale setzen
  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  // HTML mit der angeforderten Locale zurückgeben
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

> `isDeclaredLocale` grenzt einen beliebigen String auf eine deiner konfigurierten Locales ein, sodass ein unerwarteter Wert niemals deine Renderer erreicht.

</Step>

<Step number={8} title="Lang und dir nach einem Swap synchron halten" isOptional={true}>

Ein Swap kann den `<body>` ersetzen, niemals das `<html>` um ihn herum. Render `lang` und `dir` auf dem ausgetauschten body und kopiere sie danach einmal vom head auf das root-Element zurück:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Ohne dies wird ein Wechsel zu Arabisch innerhalb des body von rechts nach links gerendert, während das Dokument die vorherige Sprache gegenüber unterstützender Technologie und Crawlern weiterhin bewirbt.

</Step>

<Step number={9} title="Die Locale als Header statt als Cookie senden" isOptional={true}>

Wenn ein Cookie nicht für Sie geeignet ist, hängen Sie das Locale an jede htmx-Anfrage mit `hx-headers` auf einem übergeordneten Element an. Untergeordnete Elemente erben es:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

Die Middleware liest standardmäßig `x-intlayer-locale`. Sie können beide Träger in Ihrer Konfiguration umbenennen:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Andere Konfigurationsoptionen
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

### TypeScript konfigurieren

Fügen Sie die autogenerierten Typen ein, damit ein nicht deklarierter Schlüssel ein Kompilierungsfehler ist statt einer leeren Zeichenkette zur Laufzeit.

```json5 fileName="tsconfig.json"
{
  // ... Ihre vorhandenen TypeScript-Konfigurationen
  "include": [
    // ... Ihre vorhandenen TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Fügen Sie die autogenerierten Typen ein
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren:

```plaintext fileName=".gitignore"
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```

### VS Code Extension

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Extension** installieren.

[Aus dem VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlerdetection** für fehlende Übersetzungen.
- **Inline-Vorschau** von übersetztem Inhalt.
- **Schnellaktionen** zur einfachen Erstellung und Aktualisierung von Übersetzungen.

Weitere Informationen zur Verwendung der Erweiterung finden Sie in der [Intlayer VS Code Extension-Dokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Noch weiter gehen

Um noch weiter zu gehen, können Sie Ihren Inhalt mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) externalisieren, damit Übersetzer Inhalte ohne Deployment ändern können.

## Häufig gestellte Fragen

<FAQ>

<Question title="Warum kommt mein ausgetauschtes Fragment in der falschen Sprache zurück?">

Weil die Fragment-Anfrage keine Sprache mitgebracht hat. htmx-Anfragen sind unabhängig von der Seite, die sie ausgelöst hat, daher muss die Sprache bei jeder Anfrage über den `INTLAYER_LOCALE`-Cookie oder einen `x-intlayer-locale`-Header mitgegeben werden, der mit `hx-headers` gesetzt wird. Überprüfen Sie, dass der Cookie-Parser vor der Intlayer-Middleware auf Express und Fastify ausgeführt wird, sonst wird der Cookie nie gelesen und jede Anfrage fällt auf `Accept-Language` zurück.

</Question>

<Question title="Sollte ich die Sprache an `getIntlayer` übergeben oder mich auf den Request-Kontext verlassen?">

Übergeben Sie es. Die Integrationen zeigen das aufgelöste Locale (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), und das Übergeben an `getIntlayer` macht jeden Renderer zu einer reinen Funktion eines Locales. Das ist leichter zu testen und hält Ihre Fragment-Renderer portabel, falls Sie den Server wechseln.

</Question>

<Question title="Benötige ich eine Client-seitige i18n-Bibliothek neben htmx?">

Nein. Alles, was ein Besucher sieht, wird vom Server erzeugt, es gibt also nichts, das im Browser übersetzt werden muss. Das ist auch der Grund, warum die Seitengewicht-Kosten von i18n in einer htmx-App nahe bei null liegen: Kein Katalog wird jemals an den Client verschickt.

</Question>

<Question title="Wie lokalisiere ich auch die URL für SEO?">

Stellen Sie Ihre Seiten unter einem Locale-Präfix (`/fr/cart`) bereit und lesen Sie die Locale aus dem Pfad in Ihrem Route-Handler, anstatt aus dem Cookie, für das vollständige Seiten-Rendering. Fragmente können weiterhin das Cookie oder den Header verwenden. Siehe [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) für die Routing-Optionen und [benutzerdefinierte URL-Umschreibungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/custom_url_rewrites.md).

</Question>

<Question title="Wie behandle ich Sprachen von rechts nach links?">

`getHTMLTextDir(locale)` gibt `ltr`, `rtl` oder `auto` zurück. Setzen Sie es für das ursprüngliche Rendering auf das Dokument und wenden Sie es nach einem Swap wie in Schritt 8 erneut an. Verwenden Sie logische CSS-Eigenschaften (`margin-inline-start` anstelle von `margin-left`), damit sich Ihr Layout entsprechend anpasst.

</Question>

<Question title="Muss ich übersetzte Werte escapen?">

Ja, für alles, das du in einen Template-String interpolierst, genau wie für jeden anderen dynamischen Wert. Inhalte aus dem CMS oder von einem Übersetzer sind kein Markup, das du kontrollierst. Schritt 5 zeigt einen minimalen Escaper.

</Question>

<Question title="Kann derselbe Inhalt auch meine API-Antworten bedienen?">

Ja. Die Backend-Integrationen stellen `t()` und `getIntlayer()` für jeden Handler zur Verfügung, sodass eine Fehlermeldung in einem Toast und ein Label in einem Fragment aus demselben deklarierten Content stammen. Siehe die Guides für [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_hono.md) und [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_elysia.md).

</Question>

<Question title="Muss ich meinen Content schlüsselweise verschieben?">

Nein. Führe `npx intlayer extract` aus und Intlayer liest deine Quelldateien, extrahiert die benutzerdefinierten Strings und schreibt eine `.content`-Datei neben jede Datei, sodass du einen Diff überprüfst, anstatt Strings einzeln in einen Katalog zu kopieren. Siehe den [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md).

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält deine `/messages/{locale}/{namespace}.json` Dateien als Single Source of Truth und generiert Intlayer Wörterbücher daraus, in beide Richtungen. Ein [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext Kataloge, und [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) ermöglichen dir, Inhalte nach Sprache aufzuteilen, anstatt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Wie übersetze ich die App automatisch mit KI?">

Führen Sie `npx intlayer fill` aus, um fehlende Übersetzungen mit dem LLM Ihrer Wahl unter Verwendung Ihres eigenen Providers und API-Schlüssels zu füllen. Fügen Sie `--git-diff` hinzu, um nur den Inhalt zu übersetzen, der auf dem Branch geändert wurde. Siehe den [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

</Question>

<Question title="Unterstützt Intlayer Geschlecht, Bedingungen und interpolierte Werte?">

Ja: [geschlechtsbasierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md), Bedingungen, [Enumerationen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/enumeration.md), [Einfügungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md) für interpolierte Werte und [Formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) für Zahlen, Daten und Währungen.

</Question>

<Question title="Welche Editor- und KI-Agent-Tools sind verfügbar?">

Fünf Komponenten, alle optional:

- **[VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)**: Sprung vom Schlüssel zur Content-Datei, die ihn deklariert, Extraktion von Inhalten aus einer Datei und Ausführung von Build, Fill, Test, Push und Pull aus der Befehlspalette.
- **[LSP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**: dieselbe Funktionalität in jedem Editor, der LSP unterstützt, mit Go-to-Definition, Hover-Vorschau von übersetzten Werten, Autocompletion von Schlüsseln und einer Warnung, wenn ein Schlüssel nirgendwo deklariert ist.
- **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)**: stellt die Intlayer-Dokumentation und die CLI für Cursor, VS Code, Claude Desktop, Claude Code und ChatGPT zur Verfügung.
- **[Agent-Fähigkeiten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**: fokussierte Fähigkeiten wie `intlayer-config`, `intlayer-cli` und `intlayer-content`.
- **[ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)**: `no-raw-text` kennzeichnet hartcodierte Strings.

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung inbegriffen. Das gehostete [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) ist ein optionaler bezahlter Service, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
