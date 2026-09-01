---
createdAt: 2026-08-29
updatedAt: 2026-08-30
title: "htmx i18n - Guide complet pour traduire votre application"
description: "Fini i18next. Le guide 2026 pour construire une application htmx multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalization
  - Documentation
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

# Traduisez votre application htmx en utilisant Intlayer | Internationalization (i18n)

htmx ne rend aucun contenu de sa propre initiative. Chaque libellé qu'un visiteur lit est du HTML produit par votre serveur, et chaque swap est une requête HTTP distincte. L'internationalisation d'une app htmx est donc une préoccupation serveur : la locale doit être résolue à chaque requête, et chaque fragment doit être rendu dans cette locale.

Intlayer couvre cela à travers ses intégrations backend, qui détectent la locale par requête et exposent votre contenu déclaré au handler qui construit le HTML.

## Table des matières

<TOC/>

## Les trois règles de l'i18n dans une app htmx

<AccordionGroup>
<Accordion header="La locale doit être résolue à chaque requête, pas seulement à la première">

Une seule page peut déclencher des dizaines d'échanges. Chacun est une demande nouvelle sans mémoire de la page qui l'a émise. Si la locale réside dans une variable définie lors du rendu initial, chaque fragment après celui-ci revient à la langue par défaut.

Le middleware Intlayer résout la locale à partir de la demande elle-même, de sorte qu'un fragment servi à la minute dix répond dans la même langue que la page servie à la minute zéro.

</Accordion>

<Accordion header="La locale doit voyager avec la demande">

Deux porteurs fonctionnent avec htmx. Un cookie (`INTLAYER_LOCALE`) est envoyé automatiquement par le navigateur à chaque demande, y compris les demandes htmx. Un en-tête (`x-intlayer-locale`) peut être attaché aux demandes htmx avec l'attribut `hx-headers`. Les deux sont lus par défaut.

</Accordion>

<Accordion header="Le HTML échangé est toujours du HTML">

Une valeur traduite interpolée dans un fragment est du markup. Échappez-la, exactement comme vous le feriez pour toute autre valeur dynamique, afin qu'une traduction contenant `<` ne puisse pas casser le document dans lequel elle est échangée.

</Accordion>
</AccordionGroup>

---

## Guide Étape par Étape

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Voir [Modèle d'Application](https://github.com/aymericzip/intlayer-htmx-template) sur GitHub.

<Steps>

<Step number={1} title="Installer les Dépendances">

Installez `intlayer` plus l'intégration pour votre serveur.

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

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

  </Tab>
</Tabs>

> Express et Fastify lisent le cookie de locale via leurs propres parseurs de cookies, donc ceux-ci doivent être installés parallèlement. Hono et Elysia analysent les cookies nativement.

htmx lui-même est une seule balise de script, ajoutée à l'étape 4.

</Step>

<Step number={2} title="Configuration de votre projet">

Créez un `intlayer.config.ts` à la racine de votre projet :

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

> Pour la liste complète des options, voir la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={3} title="Déclarez Votre Contenu">

Déclarez chaque étiquette que le serveur restituera, y compris celles qui n'apparaissent que dans un fragment :

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      fr: "Langue",
      en: "Language",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        fr: "Articles dans votre panier : {{count}}",
        en: "Items in your cart: {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      fr: "Ajouter un article",
      en: "Add an item",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Les déclarations de contenu peuvent se trouver n'importe où sous `contentDir` (par défaut `./src`) et correspondre à `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. Consultez la [documentation de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

</Step>

<Step number={4} title="Enregistrer le middleware Intlayer">

Le middleware résout la locale de chaque requête et l'expose à vos handlers.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Le cookie parser doit s'exécuter en premier : `express-intlayer` lit la locale
// du cookie via `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

La locale résolue se trouve sur `res.locals.locale`.

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

La locale résolue est sur `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

La locale résolue est `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

La locale résolue est `intlayer!.locale` sur le contexte de la route.

  </Tab>
</Tabs>

Par défaut, la locale est extraite du cookie `INTLAYER_LOCALE`, puis de l'en-tête `x-intlayer-locale`, puis de la négociation `Accept-Language`.

</Step>

<Step number={5} title="Rendre des fragments avec la locale de la requête">

Écrivez vos renderers de fragment comme des fonctions pures d'une locale, et passez la locale que le middleware a résolu. La passer explicitement lie un fragment à la requête qui l'a demandé, quel que soit le serveur sur lequel vous êtes.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Échappe une valeur traduite pour qu'elle ne puisse pas s'échapper du markup. */
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

Le servir à partir d'une route :

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

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

Le même fragment répond maintenant en français pour un visiteur dont le cookie indique `fr`, et en arabe pour celui dont le cookie indique `ar`, sans aucun changement au markup appelant.

</Step>

<Step number={6} title="Servir la première page">

Rendu du `<body>` seul, de sorte que le commutateur de locale à l'étape 7 puisse le remplacer entièrement, puis envelopper-le dans le document qui charge htmx :

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  // Récupère le contenu internationalisé pour la locale donnée
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

`getHTMLTextDir` retourne `ltr`, `rtl` ou `auto` pour la locale, ce qui permet à l'arabe et l'hébreu de s'afficher correctement.

</Step>

<Step number={7} title="Changer la langue">

Changer de langue est une requête comme une autre. Le serveur stocke le choix dans le cookie que le middleware lit, puis retourne la page rendue dans la nouvelle locale.

Affichez le sélecteur comme un `select` qui s'envoie lui-même et remplace tout le `<body>`, pour que les étiquettes statiques autour de vos fragments changent aussi :

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

> `getLocaleName(availableLocale, locale)` écrit chaque langue dans la langue actuellement affichée. Passez aucun deuxième argument pour écrire chacune dans sa propre langue à la place.

Gérez la publication en validant la valeur, en définissant le cookie et en renvoyant le nouveau corps :

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
    return reply.status(400).send("Unknown locale");
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
    return c.text("Locale inconnue", 400);
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

> `isDeclaredLocale` restreint une chaîne arbitraire à l'une de vos locales configurées, donc une valeur inattendue ne atteint jamais vos renderers.

</Step>

<Step number={8} title="Garder lang et dir synchronisés après un swap" isOptional={true}>

Un échange peut remplacer le `<body>`, jamais le `<html>` qui l'entoure. Affichez `lang` et `dir` sur le corps échangé et copiez-les sur l'élément racine une fois, à partir de la tête :

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    // Synchronise la langue et la direction du document avec le body après un échange HTMX
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Sans cela, un passage à l'arabe s'affiche de droite à gauche dans le corps tandis que le document annonce toujours la langue précédente aux technologies d'assistance et aux crawlers.

</Step>

<Step number={9} title="Envoyer la locale comme en-tête au lieu d'un cookie" isOptional={true}>

Si un cookie ne vous convient pas, attachez la locale à chaque requête htmx avec `hx-headers` sur un élément ancêtre. Les descendants l'hériteront :

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

Le middleware lit `x-intlayer-locale` par défaut. Vous pouvez renommer les deux carriers dans votre configuration :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Autres options de configuration
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

### Configurer TypeScript

Incluez les types générés automatiquement afin qu'une clé non déclarée soit une erreur de compilation plutôt qu'une chaîne vide à l'exécution.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'extension officielle **Intlayer VS Code Extension**.

[Installer depuis la VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus intégrés** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur la façon d'utiliser l'extension, consultez la [documentation de l'extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Pour aller plus loin, vous pouvez externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), afin que les traducteurs puissent modifier le contenu sans déploiement.

## Questions fréquentes

<FAQ>

<Question title="Pourquoi mon fragment échangé revient-il dans la mauvaise langue ?">

Parce que la requête du fragment ne portait aucune locale. Les requêtes htmx sont indépendantes de la page qui les a émises, la locale doit donc voyager sur chacune, via le cookie `INTLAYER_LOCALE` ou un en-tête `x-intlayer-locale` défini avec `hx-headers`. Vérifiez que le parseur de cookies s'exécute avant le middleware Intlayer sur Express et Fastify, sinon le cookie n'est jamais lu et chaque requête se replie sur `Accept-Language`.

</Question>

<Question title="Dois-je passer la locale à `getIntlayer` ou m'appuyer sur le contexte de la requête ?">

Passez-la. Les intégrations exposent la locale résolue (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), et la transmettre à `getIntlayer` fait de chaque renderer une fonction pure d'une locale. C'est plus facile à tester, et cela garde vos renderers de fragments portables si vous changez de serveur.

</Question>

<Question title="Ai-je besoin d'une bibliothèque d'i18n côté client aux côtés de htmx ?">

Non. Tout ce qu'un visiteur voit est produit par le serveur, il n'y a donc rien à traduire dans le navigateur. C'est aussi pourquoi le coût en poids de page de l'i18n dans une application htmx est proche de zéro : aucun catalogue n'est jamais livré au client.

</Question>

<Question title="Comment localiser aussi l'URL, pour le SEO ?">

Servez vos pages sous un préfixe de locale (`/fr/cart`) et lisez la locale à partir du chemin dans votre gestionnaire de route, plutôt qu'à partir du cookie, pour le rendu de la page complète. Les fragments peuvent continuer d'utiliser le cookie ou l'en-tête. Voir la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) pour les options de routage et les [réécritures d'URL personnalisées](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/custom_url_rewrites.md).

</Question>

<Question title="Comment gérer les langues de droite à gauche ?">

`getHTMLTextDir(locale)` renvoie `ltr`, `rtl` ou `auto`. Définissez-le sur le document pour le rendu initial, et réappliquez-le après un échange comme le montre l'étape 8. Utilisez les propriétés logiques CSS (`margin-inline-start` plutôt que `margin-left`) afin que votre mise en page suive.

</Question>

<Question title="Dois-je échapper les valeurs traduites ?">

Oui, pour tout ce que vous interpolez dans une chaîne de template, exactement comme pour toute autre valeur dynamique. Le contenu provenant du CMS ou d'un traducteur n'est pas du balisage que vous contrôlez. L'étape 5 montre un échappeur minimal.

</Question>

<Question title="Le même contenu peut-il aussi servir mes réponses d'API ?">

Oui. Les intégrations backend exposent `t()` et `getIntlayer()` à tout gestionnaire, si bien qu'un message d'erreur affiché dans un toast et un libellé rendu dans un fragment proviennent du même contenu déclaré. Voir les guides [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_hono.md) et [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_elysia.md).

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non. Lancez `npx intlayer extract` et Intlayer lit vos fichiers source, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une. Voir la [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md).

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Comment traduire l'application automatiquement avec l'IA ?">

Lancez `npx intlayer fill`, qui remplit les traductions manquantes avec le LLM de votre choix en utilisant votre propre fournisseur et votre clé d'API. Ajoutez `--git-diff` pour ne traduire que le contenu modifié sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Intlayer prend-il en charge le genre, les conditions et les valeurs interpolées ?">

Oui : le [contenu basé sur le genre](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md), les conditions, les [énumérations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/enumeration.md), les [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md) pour les valeurs interpolées, et les [formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) pour les nombres, les dates et les devises.

</Question>

<Question title="Quels outils d'éditeur et d'agent IA sont disponibles ?">

Cinq éléments, tous optionnels :

- **[Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)** : passez d'une clé au fichier de contenu qui la déclare, extrayez du contenu depuis un fichier, et lancez build, fill, test, push et pull depuis la palette de commandes.
- **[Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)** : la même connaissance dans tout éditeur qui parle LSP, avec aller à la définition, aperçus au survol d'une valeur traduite, autocomplétion des clés, et un avertissement lorsqu'une clé n'est déclarée nulle part.
- **[Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** : expose la documentation et la CLI d'Intlayer à Cursor, VS Code, Claude Desktop, Claude Code et ChatGPT.
- **[Compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)** : des compétences ciblées telles que `intlayer-config`, `intlayer-cli` et `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)** : `no-raw-text` signale les chaînes codées en dur.

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
