---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Guía completa para traducir tu aplicación"
description: "No más i18next. La guía 2026 para construir una aplicación htmx multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
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
    changes: "Historial inicial"
author: aymericzip
---

# Traduce tu aplicación htmx usando Intlayer | Internacionalización (i18n)

htmx no renderiza contenido propio. Cada etiqueta que ve un visitante es HTML que tu servidor produjo, y cada intercambio es una solicitud HTTP separada. Internacionalizar una aplicación htmx es por lo tanto una preocupación del servidor: la locale tiene que resolverse en cada solicitud, y cada fragmento tiene que renderizarse en esa locale.

Intlayer cubre esto a través de sus integraciones de backend, que detectan la locale por solicitud y exponen tu contenido declarado al controlador que construye el HTML.

## Tabla de Contenidos

<TOC/>

## Las tres reglas de i18n en una aplicación htmx

<AccordionGroup>

<Accordion header="La locale debe resolverse en cada solicitud, no solo en la primera">

Una sola página puede desencadenar docenas de intercambios. Cada uno es una solicitud nueva sin memoria de la página que la emitió. Si la configuración regional vive en una variable establecida durante la representación inicial, cada fragmento después de ella vuelve al idioma predeterminado.

El middleware de Intlayer resuelve la configuración regional de la solicitud misma, por lo que un fragmento servido en el minuto diez responde en el mismo idioma que la página servida en el minuto cero.

</Accordion>

<Accordion header="La configuración regional debe viajar con la solicitud">

Dos portadores funcionan con htmx. Una cookie (`INTLAYER_LOCALE`) es enviada automáticamente por el navegador en cada solicitud, incluyendo las de htmx. Un encabezado (`x-intlayer-locale`) puede adjuntarse a las solicitudes de htmx con el atributo `hx-headers`. Ambos se leen por defecto.

</Accordion>

<Accordion header="El HTML intercambiado sigue siendo HTML">

Un valor traducido interpolado en un fragmento es markup. Escápalo, exactamente como lo harías con cualquier otro valor dinámico, para que una traducción que contenga `<` no pueda romper el documento en el que se intercambia.

</Accordion>

</AccordionGroup>

---

## Guía Paso a Paso

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-htmx-template) en GitHub.

<Steps>

<Step number={1} title="Instalar Dependencias">

Instala `intlayer` más la integración para tu servidor.

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

> Express y Fastify leen la cookie de locale a través de sus propios analizadores de cookies, por lo que deben instalarse junto con ellos. Hono y Elysia analizan cookies de forma nativa.

htmx en sí es una única etiqueta de script, agregada en el paso 4.

</Step>

<Step number={2} title="Configuración de tu proyecto">

Crea un `intlayer.config.ts` en la raíz de tu proyecto:

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

> Para obtener la lista completa de opciones, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={3} title="Declarar tu contenido">

Declara cada etiqueta que el servidor renderizará, incluyendo las que solo aparecen dentro de un fragmento:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      es: "Idioma",
      en: "Language",
      fr: "Langue",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        es: "Artículos en tu carrito: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      es: "Añadir un artículo",
      en: "Add an item",
      fr: "Ajouter un article",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Las declaraciones de contenido pueden vivir en cualquier lugar bajo `contentDir` (por defecto `./src`) y coincidir `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. Consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>

<Step number={4} title="Registrar el middleware de Intlayer">

El middleware resuelve la configuración regional de cada solicitud y la expone a tus manejadores.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// El analizador de cookies debe ejecutarse primero: `express-intlayer` lee la configuración regional
// cookie a través de `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

La configuración regional resuelta está en `res.locals.locale`.

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}


</budget:token_budget>
import cookie from "@fastify/cookie";
import formbody from "@fastify/formbody";
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

await fastify.register(cookie);
await fastify.register(formbody);
await fastify.register(intlayer);
```

La configuración regional resuelta está en `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

La configuración regional resuelta es `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

La configuración regional resuelta es `intlayer!.locale` en el contexto de la ruta.

  </Tab>
</Tabs>

Por defecto, la configuración regional se toma de la cookie `INTLAYER_LOCALE`, luego del encabezado `x-intlayer-locale`, luego de la negociación `Accept-Language`.

</Step>

<Step number={5} title="Renderizar fragmentos con la configuración regional de la solicitud">

Escribe tus renderizadores de fragmentos como funciones puras de una configuración regional, y pasa la configuración regional que el middleware resolvió. Pasarla explícitamente mantiene un fragmento vinculado a la solicitud que lo pidió, sin importar en qué servidor estés.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapa un valor traducido para que no pueda salir del marcado. */
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

Sírvelo desde una ruta:

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

El mismo fragmento ahora responde en francés para un visitante cuya cookie dice `fr`, y en árabe para uno cuya cookie dice `ar`, sin cambios en el marcado de llamada.

</Step>

<Step number={6} title="Servir la primera página">

Renderiza el `<body>` por sí solo, para que el cambiador de idioma en el paso 7 pueda intercambiarlo completamente, luego envuélvelo en el documento que carga htmx:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  // Obtener el contenido internacionalizado para la locale especificada
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

`getHTMLTextDir` devuelve `ltr`, `rtl` o `auto` para la locale, lo que permite que el árabe y el hebreo se muestren correctamente.

</Step>

<Step number={7} title="Cambiar el idioma">

Cambiar el idioma es una solicitud como cualquier otra. El servidor almacena la selección en la cookie que lee el middleware, y luego devuelve la página renderizada nuevamente en la nueva locale.

Renderiza el selector como un `select` que se envía a sí mismo e intercambia todo el `<body>`, para que las etiquetas estáticas alrededor de tus fragmentos también cambien:

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

> `getLocaleName(availableLocale, locale)` escribe cada idioma en el idioma actualmente mostrado. No pases un segundo argumento para escribir cada uno en su propio idioma en su lugar.

Maneja la publicación validando el valor, estableciendo la cookie y devolviendo el nuevo cuerpo:

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
    return reply.status(400).send("Idioma desconocido");
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
  // Analizar el cuerpo de la solicitud
  const body = await c.req.parseBody();
  // Obtener la locale solicitada del cuerpo
  const requestedLocale = String(body["locale"]);

  // Verificar si la locale está declarada
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Locale desconocida", 400);
  }

  // Establecer la cookie de locale
  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  // Retornar la respuesta HTML renderizada
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

> `isDeclaredLocale` estrecha una cadena arbitraria a uno de tus locales configurados, por lo que un valor inesperado nunca llega a tus renderizadores.

</Step>

<Step number={8} title="Mantener lang y dir sincronizados después de un swap" isOptional={true}>

Un swap puede reemplazar el `<body>`, nunca el `<html>` que lo rodea. Renderiza `lang` y `dir` en el body intercambiado y cópialos de vuelta al elemento raíz una vez, desde el head:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Sin esto, un cambio al árabe renderiza de derecha a izquierda dentro del body mientras el documento aún anuncia el idioma anterior a la tecnología de asistencia y a los crawlers.

</Step>

<Step number={9} title="Enviar la configuración regional como encabezado en lugar de una cookie" isOptional={true}>

Si una cookie no te conviene, adjunta la locale a cada solicitud htmx con `hx-headers` en un elemento ancestro. Los descendientes la heredan:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

El middleware lee `x-intlayer-locale` por defecto. Puedes renombrar ambos portadores en tu configuración:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Otras opciones de configuración
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

### Configurar TypeScript

Incluye los tipos autogenerados para que una clave no declarada sea un error de compilación en lugar de una cadena vacía en tiempo de ejecución.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones de TypeScript existentes
  "include": [
    // ... Tus configuraciones de TypeScript existentes
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompleción** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir más allá

Para ir más allá, puedes externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md), para que los traductores cambien el contenido sin necesidad de una implementación.

## Preguntas Frecuentes

<FAQ>

<Question title="¿Por qué mi fragmento intercambiado vuelve en el idioma incorrecto?">

Porque la solicitud del fragmento no llevaba ninguna configuración regional. Las solicitudes de htmx son independientes de la página que las emitió, por lo que la configuración regional tiene que viajar en cada una, a través de la cookie `INTLAYER_LOCALE` o un encabezado `x-intlayer-locale` establecido con `hx-headers`. Comprueba que el analizador de cookies se ejecuta antes del middleware de Intlayer en Express y Fastify, de lo contrario la cookie nunca se lee y cada solicitud vuelve a `Accept-Language`.

</Question>

<Question title="¿Debo pasar la configuración regional a `getIntlayer` o depender del contexto de la solicitud?">

Pásalo. Las integraciones exponen la locale resuelta (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), y pasarla a `getIntlayer` hace que cada renderer sea una función pura de una locale. Eso es más fácil de probar, y mantiene tus fragment renderers portátiles si cambias de servidor.

</Question>

<Question title="¿Necesito una librería i18n del lado del cliente junto a htmx?">

No. Todo lo que ve un visitante es producido por el servidor, así que no hay nada que traducir en el navegador. Por eso también el costo de peso de la página del i18n en una app htmx es casi cero: ningún catálogo se envía nunca al cliente.

</Question>

<Question title="¿Cómo localizo también la URL, para SEO?">

Sirva sus páginas bajo un prefijo de locale (`/fr/cart`) y lea el locale de la ruta en su controlador de rutas, en lugar de desde la cookie, para el renderizado completo de la página. Los fragmentos pueden seguir utilizando la cookie o el encabezado. Véase [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para las opciones de enrutamiento y [reescrituras de URL personalizadas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/custom_url_rewrites.md).

</Question>

<Question title="¿Cómo manejo los idiomas de derecha a izquierda?">

`getHTMLTextDir(locale)` devuelve `ltr`, `rtl` o `auto`. Establézcalo en el documento para el renderizado inicial y vuelva a aplicarlo después de un intercambio como se muestra en el paso 8. Utilice propiedades lógicas de CSS (`margin-inline-start` en lugar de `margin-left`) para que su diseño se ajuste.

</Question>

<Question title="¿Tengo que escapar los valores traducidos?">

Sí, para cualquier cosa que interpoles en una cadena de plantilla, exactamente como para cualquier otro valor dinámico. El contenido proveniente del CMS o de un traductor no es markup que controles. El paso 5 muestra un escapador mínimo.

</Question>

<Question title="¿Puede el mismo contenido servir también mis respuestas de API?">

Sí. Las integraciones de backend exponen `t()` y `getIntlayer()` a cualquier manejador, por lo que un mensaje de error mostrado en un toast y una etiqueta renderizada en un fragmento provienen del mismo contenido declarado. Consulta las guías de [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_hono.md) y [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_elysia.md).

</Question>

<Question title="¿Tengo que mover mi contenido clave por clave?">

No. Ejecuta `npx intlayer extract` e Intlayer lee tus archivos fuente, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, para que revises un diff en lugar de copiar cadenas en un catálogo una por una. Consulta el [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md).

</Question>

<Question title="¿Puedo mantener mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como la fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para catálogos gettext, y los [archivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar locales en un archivo.

</Question>

<Question title="¿Cómo traduzco la aplicación automáticamente con IA?">

Ejecuta `npx intlayer fill`, que completa las traducciones faltantes con el LLM de tu elección utilizando tu propio proveedor y clave API. Añade `--git-diff` para traducir solo el contenido modificado en la rama. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) e [integración CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

</Question>

<Question title="¿Intlayer soporta género, condiciones y valores interpolados?">

Sí: [contenido basado en género](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender.md), condiciones, [enumeraciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/enumeration.md), [inserciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md) para valores interpolados, y [formateadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md) para números, fechas y monedas.

</Question>

<Question title="¿Qué herramientas de editor y agente de IA están disponibles?">

Cinco componentes, todos opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave al archivo de contenido que la declara, extrae contenido de un archivo y ejecuta build, fill, test, push y pull desde la paleta de comandos.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: la misma awareness en cualquier editor que hable LSP, con ir a definición, previsualizaciones al pasar el ratón de un valor traducido, autocompletado de claves y una advertencia cuando una clave no está declarada en ningún lugar.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación de Intlayer y CLI a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades enfocadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca strings hardcodeadas.

</Question>

<Question title="¿Es Intlayer gratuito y de código abierto?">

Sí, bajo la licencia Apache 2.0, incluido el uso comercial. El [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) alojado es un servicio de pago opcional que también puede ser [auto-hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
