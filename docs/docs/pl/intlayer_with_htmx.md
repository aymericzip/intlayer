---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Kompletny przewodnik tłumaczenia Twojej aplikacji"
description: "Nie więcej i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji htmx. Tłumacz za pomocą agentów AI i optymalizuj rozmiar bundle'a, SEO i wydajność."
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

# Przetłumacz swoją aplikację htmx za pomocą Intlayer | Internationalization (i18n)

htmx nie renderuje żadnej zawartości z własnej inicjatywy. Każda etykieta, którą widzi odwiedzający, to HTML wyprodukowany przez serwer, a każda zamiana to osobne żądanie HTTP. Internacjonalizacja aplikacji htmx jest zatem sprawą serwera: locale musi być rozwiązane dla każdego żądania, a każdy fragment musi być renderowany w tym locale.

Intlayer pokrywa to poprzez swoje integracje backendowe, które wykrywają locale dla każdego żądania i ujawniają zadeklarowaną zawartość obsługującemu, który buduje HTML.

## Spis treści

<TOC/>

## Trzy zasady i18n w aplikacji htmx

<AccordionGroup>
<Accordion header="Locale musi być rozwiązane dla każdego żądania, a nie tylko pierwszego">

Pojedyncza strona może wyzwolić dziesiątki swapów. Każdy z nich jest świeżym żądaniem bez pamięci o stronie, która go wydała. Jeśli locale znajduje się w zmiennej ustawionej podczas początkowego renderowania, każdy fragment po nim powraca do języka domyślnego.

Middleware Intlayer rozwiązuje locale z samego żądania, więc fragment wysłużony o dziesiątej minucie odpowiada w tym samym języku co strona wysłużona o zerowej minucie.

</Accordion>

<Accordion header="Locale musi podróżować z żądaniem">

Dwa nośniki pracują z htmx. Cookie (`INTLAYER_LOCALE`) jest wysyłany przez przeglądarkę automatycznie na każde żądanie, w tym te z htmx. Nagłówek (`x-intlayer-locale`) można dołączyć do żądań htmx za pomocą atrybutu `hx-headers`. Oba są czytane domyślnie.

</Accordion>

<Accordion header="Zamieniony HTML jest wciąż HTML">

Przetłumaczona wartość interpolowana do fragmentu to markup. Uciekaj przed nią, dokładnie tak jak zrobiłbyś to z jakąkolwiek inną wartością dynamiczną, aby tłumaczenie zawierające `<` nie mogło złamać dokumentu, do którego jest zamieniane.

</Accordion>
</AccordionGroup>

---

## Przewodnik Krok po Kroku

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zapoznaj się z [Szablonem Aplikacji](https://github.com/aymericzip/intlayer-htmx-template) na GitHub.

<Steps>

<Step number={1} title="Zainstaluj Zależności">

Zainstaluj `intlayer` plus integrację dla twojego serwera.

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

> Express i Fastify odczytują ciasteczko lokalizacji za pośrednictwem własnych parserów ciasteczek, dlatego te muszą być zainstalowane obok. Hono i Elysia parsują ciasteczka natywnie.

htmx sam w sobie to pojedynczy znacznik skryptu, dodawany w kroku 4.

</Step>

<Step number={2} title="Konfiguracja projektu">

Utwórz plik `intlayer.config.ts` w katalogu głównym projektu:

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

> Pełną listę opcji można znaleźć w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={3} title="Zadeklaruj swoją zawartość">

Zadeklaruj każdą etykietę, którą serwer będzie renderować, w tym te, które pojawiają się tylko wewnątrz fragmentu:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      pl: "Język",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        pl: "Przedmioty w koszyku: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      pl: "Dodaj przedmiot",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Deklaracje treści mogą znajdować się w dowolnym miejscu w `contentDir` (domyślnie `./src`) i powinny pasować do `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. Zobacz [dokumentację deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={4} title="Zarejestruj middleware Intlayer">

Middleware rozwiązuje locale każdego żądania i udostępnia je twoim handlerom.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Parser ciasteczek musi uruchomić się pierwszy: `express-intlayer` czyta locale
// ciasteczko przez `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

Rozwiązany locale znajduje się na `res.locals.locale`.

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

Rozwiązana lokalizacja znajduje się w `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

Rozwiązana lokalizacja to `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

Rozwiązana lokalizacja znajduje się na `intlayer!.locale` w kontekście trasy.

  </Tab>
</Tabs>

Domyślnie lokalizacja jest pobierana z ciasteczka `INTLAYER_LOCALE`, następnie nagłówka `x-intlayer-locale`, a następnie negocjacji `Accept-Language`.

</Step>

<Step number={5} title="Renderuj fragmenty ze zmienną lokalizacją żądania">

Napisz swoich renderery fragmentów jako czyste funkcje lokalizacji i przekaż rozwiązaną przez middleware lokalizację. Jawne przekazanie jej utrzymuje fragment związany z żądaniem, które go poprosiło, niezależnie od tego, na którym serwerze się znajdujesz.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape'a przetłumaczoną wartość, aby nie mogła wyrwać się z markup'u. */
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

Serwuj to z trasy:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  // Pobierz liczbę elementów z ciała żądania i zwiększ o 1
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  // Wyślij HTML z renderowanym koszkiem
  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  // Pobierz liczbę elementów z ciała żądania i zwiększ o 1
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  // Wyślij HTML z renderowanym koszkiem
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

Ten sam fragment teraz odpowiada w języku francuskim dla odwiedzającego, którego cookie mówi `fr`, i w arabskim dla tego, którego cookie mówi `ar`, bez żadnych zmian w wywoływanym znaczniku.

</Step>

<Step number={6} title="Podaj pierwszą stronę">

Renderuj `<body>` samodzielnie, aby przełącznik locale w kroku 7 mógł go całkowicie zamienić, a następnie opakuj go w dokument, który ładuje htmx:

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

`getHTMLTextDir` zwraca `ltr`, `rtl` lub `auto` dla locale, co sprawia, że arabski i hebrajski renderują się poprawnie.

</Step>

<Step number={7} title="Zmień język">

Zmiana języka to żądanie jak każde inne. Serwer zapisuje wybór w ciasteczku, które odczytuje middleware, a następnie zwraca stronę re-renderowaną w nowym locale.

Renderuj przełącznik jako `select`, który wysyła się sam i zastępuje całe `<body>`, dzięki czemu zmieniają się również etykiety statyczne wokół twoich fragmentów:

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

> `getLocaleName(availableLocale, locale)` zapisuje każdy język w aktualnie wyświetlanym języku. Nie podawaj drugiego argumentu, aby zamiast tego zapisać każdy w jego własnym języku.

Obsługuj post poprzez walidację wartości, ustawienie pliku cookie i zwrócenie nowej treści:

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

  // Sprawdzenie, czy żądana lokalizacja jest zadeklarowana
  if (!isDeclaredLocale(requestedLocale)) {
    return reply.status(400).send("Nieznana lokalizacja");
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
  // Parsuj treść żądania
  const body = await c.req.parseBody();
  // Pobierz żądaną lokalizację
  const requestedLocale = String(body["locale"]);

  // Sprawdzź, czy lokalizacja jest zadeklarowana
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Nieznana lokalizacja", 400);
  }

  // Ustaw cookie z lokalizacją
  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  // Zwróć renderowaną stronę HTML
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

> `isDeclaredLocale` zawęża arbitralny string do jednej z twoich skonfigurowanych lokalizacji, więc nieoczekiwana wartość nigdy nie dotrze do twoich renderów.

</Step>

<Step number={8} title="Utrzymaj lang i dir zsynchronizowane po wymianie" isOptional={true}>

Zamiana może zastąpić `<body>`, nigdy nie `<html>` wokół niego. Renderuj `lang` i `dir` na zamienianym body i skopiuj je z powrotem na element główny raz, z head:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Bez tego przełączenie na język arabski renderuje się od prawej do lewej wewnątrz body, podczas gdy dokument wciąż ogłasza poprzedni język technologiom pomocniczym i crawlerom.

</Step>

<Step number={9} title="Wyślij locale jako nagłówek zamiast ciasteczka" isOptional={true}>

Jeśli cookie nie odpowiada Ci, dołącz locale do każdego żądania htmx za pomocą `hx-headers` na elemencie ancestor. Descendants go dziedziczą:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

Middleware czyta `x-intlayer-locale` domyślnie. Możesz zmienić nazwę obu nośników w Twojej konfiguracji:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Pozostałe opcje konfiguracji
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

### Konfiguruj TypeScript

Dołącz autogenerowane typy, aby niezadeklarowany klucz był błędem kompilacji, a nie pustym stringiem w runtime'ie.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Dołącz autogenerowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby ulepszyć doświadczenie programisty z Intlayer, możesz zainstalować oficjalne **Rozszerzenie VS Code Intlayer**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy bezpośrednie** przetłumaczonej zawartości.
- **Szybkie akcje** do łatwego tworzenia i aktualizacji tłumaczeń.

Aby uzyskać więcej szczegółów na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Idź dalej

Aby pójść dalej, możesz eksternalizować swoją zawartość za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), aby tłumacze mogli zmieniać kopię bez wdrażania.

## Frequently Asked Questions

<FAQ>

<Question title="Dlaczego mój zamieniony fragment wraca w złym języku?">

Ponieważ żądanie fragmentu nie zawierało locale. Żądania htmx są niezależne od strony, która je wysłała, więc locale musi podróżować z każdym z nich, poprzez cookie `INTLAYER_LOCALE` lub nagłówek `x-intlayer-locale` ustawiony za pomocą `hx-headers`. Sprawdź, czy parser cookie działa przed middleware Intlayer na Express i Fastify, w przeciwnym razie cookie nigdy nie zostanie odczytane, a każde żądanie powróci do `Accept-Language`.

</Question>

<Question title="Czy powinienem przekazać locale do `getIntlayer` czy polegać na kontekście żądania?">

Przekaż ją. Integracje eksponują rozstrzyganą lokalność (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), a przekazanie jej do `getIntlayer` sprawia, że każdy renderer jest czystą funkcją lokalności. To jest łatwiejsze do testowania i utrzymuje przenośność twoich fragment rendererów, jeśli zmienisz serwer.

</Question>

<Question title="Czy potrzebuję biblioteki i18n po stronie klienta obok htmx?">

Nie. Wszystko, co widzi odwiedzający, jest produkowane przez serwer, więc nie ma nic do przetłumaczenia w przeglądarce. To również dlatego, że koszt wagi strony dla i18n w aplikacji htmx wynosi prawie zero: żaden katalog nigdy nie jest wysyłany do klienta.

</Question>

<Question title="Jak zlokalizować adres URL, aby poprawić SEO?">

Serwuj swoje strony pod prefixem lokalizacji (`/fr/cart`) i odczytuj lokalę ze ścieżki w handleru trasy, zamiast z ciasteczka, dla pełnego renderowania strony. Fragmenty mogą nadal używać ciasteczka lub nagłówka. Zobacz [konfigurację](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) opcji routingu i [niestandardowe przepisywanie adresów URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/custom_url_rewrites.md).

</Question>

<Question title="Jak obsługuję języki od prawej do lewej?">

`getHTMLTextDir(locale)` zwraca `ltr`, `rtl` lub `auto`. Ustaw to na dokumencie dla początkowego renderowania i ponownie zastosuj po zamianie, jak pokazuje krok 8. Używaj logicznych właściwości CSS (`margin-inline-start` zamiast `margin-left`), aby twój układ podążał za tym.

</Question>

<Question title="Czy muszę escapować przetłumaczone wartości?">

Tak, dla wszystkiego, co interpolujesz w string szablonowy, dokładnie jak dla każdej innej wartości dynamicznej. Zawartość pochodząca z CMS lub od tłumacza to nie markup, którym możesz manipulować. Krok 5 pokazuje minimalny escaper.

</Question>

<Question title="Czy ta sama zawartość może obsługiwać moje odpowiedzi API?">

Tak. Integracje backend'owe udostępniają `t()` i `getIntlayer()` do dowolnego handlera, dzięki czemu komunikat o błędzie wyświetlany w toast'e i etykieta renderowana do fragmentu pochodzą z tej samej zadeklarowanej treści. Zobacz przewodniki [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_hono.md) i [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_elysia.md).

</Question>

<Question title="Czy muszę przenosić moją treść klucz za kluczem?">

Nie. Uruchom `npx intlayer extract` i Intlayer przeczyta Twoje pliki źródłowe, wyciągnie ciągi znaków przeznaczone dla użytkownika i napisze plik `.content` obok każdego z nich, abyś mógł przejrzeć diff zamiast kopiować ciągi znaków do katalogu jeden po jednym. Zobacz [polecenie extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md).

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. [Plugin synchronizacji JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje słowniki Intlayer z nich, w obu kierunkach. [Plugin synchronizacji PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki dla poszczególnych lokalizacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają na podział zawartości według języka zamiast grupowania lokalizacji w jednym pliku.

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację za pomocą AI?">

Uruchom `npx intlayer fill`, które wypełnia brakujące tłumaczenia za pomocą LLM wybranego dostawcy i klucza API. Dodaj `--git-diff`, aby tłumaczyć tylko zawartość zmienioną na gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) i [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="Czy Intlayer obsługuje płeć, warunki i wartości interpolowane?">

Tak: [zawartość oparta na płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md), warunki, [wyliczenia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/enumeration.md), [wstawienia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md) dla interpolowanych wartości, oraz [formatory](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md) dla liczb, dat i walut.

</Question>

<Question title="Jakie narzędzia edytora i agenta AI są dostępne?">

Pięć elementów, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza do pliku zawartości, który go deklaruje, ekstrakcja zawartości z pliku i uruchamianie build, fill, test, push i pull z palety poleceń.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: ta sama świadomość w każdym edytorze obsługującym LSP, z przejściem do definicji, podglądami wartości przetłumaczonych przy najechaniu myszą, autouzupełnianiem kluczy i ostrzeżeniem, gdy klucz nie jest zadeklarowany nigdzie.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację Intlayer i CLI dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: umiejętności ukierunkowane, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: `no-raw-text` oznacza twardo zakodowane ciągi znaków.

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, komercyjne użycie włączone. Hostowany [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) jest opcjonalną płatną usługą, którą można również [hostować samodzielnie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>
