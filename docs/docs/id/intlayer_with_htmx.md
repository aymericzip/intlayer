---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Panduan lengkap untuk menerjemahkan aplikasi Anda"
description: "Tidak perlu i18next lagi. Panduan 2026 untuk membangun aplikasi htmx multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
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

# Terjemahkan aplikasi htmx Anda menggunakan Intlayer | Internationalization (i18n)

htmx tidak merender konten apa pun dari dirinya sendiri. Setiap label yang dibaca pengunjung adalah HTML yang dihasilkan server Anda, dan setiap swap adalah permintaan HTTP yang terpisah. Menginternasionalisasi aplikasi htmx adalah oleh karena itu tanggung jawab server: locale harus diselesaikan pada setiap permintaan, dan setiap fragment harus dirender dalam locale tersebut.

Intlayer mencakup ini melalui integrasi backend-nya, yang mendeteksi locale per permintaan dan mengekspos konten yang Anda deklarasikan ke handler yang membangun HTML.

## Daftar Isi

<TOC/>

## Tiga aturan i18n dalam aplikasi htmx

<AccordionGroup>

<Accordion header="Locale harus diselesaikan pada setiap permintaan, bukan hanya yang pertama">

Satu halaman dapat memicu puluhan swap. Setiap satu adalah permintaan baru tanpa memori dari halaman yang mengeluarkannya. Jika locale berada dalam variabel yang diatur selama render awal, setiap fragment setelahnya kembali ke bahasa default.

Middleware Intlayer menyelesaikan locale dari permintaan itu sendiri, sehingga fragment yang dikirimkan pada menit kesepuluh menjawab dalam bahasa yang sama dengan halaman yang dikirimkan pada menit nol.

</Accordion>

<Accordion header="Locale harus bepergian dengan permintaan">

Dua pembawa bekerja dengan htmx. Cookie (`INTLAYER_LOCALE`) dikirimkan oleh browser secara otomatis pada setiap permintaan, termasuk yang htmx. Header (`x-intlayer-locale`) dapat dilampirkan ke permintaan htmx dengan atribut `hx-headers`. Keduanya dibaca secara default.

</Accordion>

<Accordion header="HTML yang ditukar masih HTML">

Nilai yang diterjemahkan dan diinterpolasi ke dalam fragmen adalah markup. Escape-nya, persis seperti yang Anda lakukan untuk nilai dinamis lainnya, jadi terjemahan yang mengandung `<` tidak dapat merusak dokumen tempat fragmen tersebut ditukar.

</Accordion>

</AccordionGroup>

---

## Panduan Langkah demi Langkah

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Application Template](https://github.com/aymericzip/intlayer-htmx-template) di GitHub.

<Steps>

<Step number={1} title="Install Dependencies">

Pasang `intlayer` plus integrasi untuk server Anda.

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

> Express dan Fastify membaca cookie locale melalui parser cookie mereka sendiri, jadi cookie-cookie tersebut harus dipasang bersama. Hono dan Elysia mem-parse cookie secara native.

htmx itu sendiri adalah tag script tunggal, ditambahkan di step 4.

</Step>

<Step number={2} title="Konfigurasi proyek Anda">

Buat `intlayer.config.ts` di root proyek Anda:

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

> Untuk daftar lengkap opsi, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Step>

<Step number={3} title="Deklarasikan Konten Anda">

Deklarasikan setiap label yang akan dirender server, termasuk yang hanya muncul di dalam fragment:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      id: "Bahasa",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        id: "Item dalam keranjang Anda: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      id: "Tambahkan item",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Deklarasi konten dapat berada di mana saja di bawah `contentDir` (secara default `./src`) dan cocok dengan `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. Lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

</Step>

<Step number={4} title="Daftarkan middleware Intlayer">

Middleware menyelesaikan locale dari setiap request dan membuatnya dapat diakses oleh handlers Anda.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Cookie parser harus berjalan pertama: `express-intlayer` membaca locale
// cookie melalui `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

Locale yang sudah diselesaikan berada di `res.locals.locale`.

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

Locale yang diselesaikan ada di `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

Locale yang diselesaikan adalah `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

Locale yang telah diselesaikan adalah `intlayer!.locale` pada konteks rute.

  </Tab>
</Tabs>

Secara default, locale diambil dari cookie `INTLAYER_LOCALE`, kemudian header `x-intlayer-locale`, kemudian negosiasi `Accept-Language`.

</Step>

<Step number={5} title="Render fragments dengan locale permintaan">

Tulis renderer fragment Anda sebagai fungsi murni dari sebuah locale, dan berikan locale yang telah diselesaikan middleware. Meneruskannya secara eksplisit membuat fragment tetap terikat pada permintaan yang memintanya, di server mana pun Anda berada.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Mengamankan nilai yang diterjemahkan agar tidak dapat keluar dari markup. */
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

Sajikan dari rute:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  // Menambah jumlah item dari body permintaan
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  // Mengirim respons HTML dengan keranjang yang dirender
  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  // Menambah jumlah item dari body permintaan
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  // Mengirim respons HTML dengan keranjang yang dirender
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

Fragment yang sama sekarang menjawab dalam bahasa Prancis untuk pengunjung yang cookie-nya mengatakan `fr`, dan dalam bahasa Arab untuk yang cookie-nya mengatakan `ar`, tanpa perubahan pada markup yang dipanggil.

</Step>

<Step number={6} title="Sajikan halaman pertama">

Render `<body>` sendirian, jadi penyaklah locale di step 7 dapat menukarnya sepenuhnya, kemudian bungkus dalam dokumen yang memuat htmx:

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

`getHTMLTextDir` mengembalikan `ltr`, `rtl` atau `auto` untuk locale, yang membuat Arabic dan Hebrew ditampilkan dengan benar.

</Step>

<Step number={7} title="Ubah bahasa">

Mengubah bahasa adalah permintaan seperti yang lain. Server menyimpan pilihan dalam cookie yang dibaca middleware, kemudian mengembalikan halaman yang di-render ulang dalam locale baru.

Render the switcher as a `select` that posts itself and swaps the whole `<body>`, so the static labels around your fragments change too:

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

> `getLocaleName(availableLocale, locale)` menulis setiap bahasa dalam bahasa yang sedang ditampilkan. Jangan lewatkan argumen kedua untuk menulis masing-masing dalam bahasa mereka sendiri.

Tangani post dengan memvalidasi nilai, mengatur cookie, dan mengembalikan body baru:

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
    return c.text("Locale tidak dikenal", 400);
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

> `isDeclaredLocale` mempersempit string arbitrer ke salah satu locale yang dikonfigurasi, sehingga nilai yang tidak terduga tidak pernah mencapai renderer Anda.

</Step>

<Step number={8} title="Jaga lang dan dir tetap sinkron setelah swap" isOptional={true}>

Swap dapat mengganti `<body>`, namun tidak pernah `<html>` di sekitarnya. Render `lang` dan `dir` pada body yang di-swap dan salin kembali ke elemen root sekali saja, dari head:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Tanpa ini, beralih ke Bahasa Arab akan merender dari kanan ke kiri di dalam body sementara dokumen masih mengumumkan bahasa sebelumnya ke teknologi asistif dan ke crawler.

</Step>

<Step number={9} title="Kirim locale sebagai header daripada cookie" isOptional={true}>

Jika cookie tidak sesuai untuk Anda, lampirkan locale ke setiap htmx request dengan `hx-headers` pada elemen ancestor. Descendants akan mewarisinya:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

Middleware membaca `x-intlayer-locale` secara default. Anda dapat mengganti kedua carrier dalam konfigurasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Opsi konfigurasi lainnya
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

### Konfigurasi TypeScript

Sertakan tipe yang dihasilkan secara otomatis sehingga kunci yang tidak dideklarasikan menjadi kesalahan kompilasi daripada string kosong saat runtime.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang ada
  "include": [
    // ... Konfigurasi TypeScript Anda yang ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Intlayer VS Code Extension** resmi.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan real-time** untuk terjemahan yang hilang.
- **Preview inline** dari konten yang diterjemahkan.
- **Aksi cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi, lihat [dokumentasi Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Lanjutkan Lebih Jauh

Untuk lanjutkan lebih jauh, Anda dapat meneksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), sehingga penerjemah dapat mengubah teks tanpa deployment.

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Mengapa fragmen yang ditukar saya kembali dalam bahasa yang salah?">

Karena permintaan fragment tidak membawa locale. Permintaan htmx independen dari halaman yang mengeluarkannya, jadi locale harus berpindah di setiap satu, melalui cookie `INTLAYER_LOCALE` atau header `x-intlayer-locale` yang diatur dengan `hx-headers`. Periksa bahwa cookie parser berjalan sebelum middleware Intlayer di Express dan Fastify, jika tidak cookie tidak pernah dibaca dan setiap permintaan kembali ke `Accept-Language`.

</Question>

<Question title="Haruskah saya melewatkan locale ke `getIntlayer` atau mengandalkan konteks permintaan?">

Berikan locale ke `getIntlayer`. Integrasi mengekspos locale yang sudah diselesaikan (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), dan menyerahkannya ke `getIntlayer` membuat setiap renderer menjadi fungsi murni dari sebuah locale. Itu lebih mudah untuk diuji, dan membuat renderer fragment Anda portable jika Anda mengubah server.

</Question>

<Question title="Apakah saya perlu library i18n sisi klien di samping htmx?">

Tidak. Semua yang dilihat pengunjung diproduksi oleh server, jadi tidak ada yang perlu diterjemahkan di browser. Itulah juga mengapa biaya berat halaman i18n dalam aplikasi htmx hampir nol: tidak ada katalog yang pernah dikirim ke klien.

</Question>

<Question title="Bagaimana cara saya melokalisasi URL juga, untuk SEO?">

Layani halaman Anda di bawah awalan lokal (`/fr/cart`) dan baca lokal dari jalur di penangani rute Anda, bukan dari cookie, untuk rendering halaman lengkap. Fragment dapat terus menggunakan cookie atau header. Lihat [konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) untuk opsi routing dan [penulisan ulang URL kustom](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/custom_url_rewrites.md).

</Question>

<Question title="Bagaimana cara menangani bahasa dari kanan ke kiri?">

`getHTMLTextDir(locale)` mengembalikan `ltr`, `rtl` atau `auto`. Tetapkan pada dokumen untuk rendering awal, dan terapkan kembali setelah swap seperti yang ditunjukkan pada langkah 8. Gunakan properti logis CSS (`margin-inline-start` daripada `margin-left`) sehingga tata letak Anda mengikutinya.

</Question>

<Question title="Apakah saya harus escape nilai yang diterjemahkan?">

Ya, untuk apa pun yang Anda interpolasi ke dalam template string, persis seperti nilai dinamis lainnya. Konten yang berasal dari CMS atau dari penerjemah bukanlah markup yang Anda kontrol. Langkah 5 menunjukkan escaper minimal.

</Question>

<Question title="Bisakah konten yang sama melayani respons API saya juga?">

Ya. Integrasi backend mengekspos `t()` dan `getIntlayer()` ke handler apa pun, jadi pesan kesalahan yang ditampilkan dalam toast dan label yang dirender ke fragment berasal dari konten yang dideklarasikan sama. Lihat panduan [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_hono.md), dan [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_elysia.md).

</Question>

<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca file sumber Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu. Lihat [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md).

</Question>

<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan lokal dalam satu file.

</Question>

<Question title="Bagaimana cara menerjemahkan aplikasi secara otomatis dengan AI?">

Jalankan `npx intlayer fill`, yang mengisi terjemahan yang hilang dengan LLM pilihan Anda menggunakan provider dan API key Anda sendiri. Tambahkan `--git-diff` untuk menerjemahkan hanya konten yang berubah di branch. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

</Question>

<Question title="Apakah Intlayer mendukung gender, kondisi dan nilai interpolasi?">

Ya: [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [enumerasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/enumeration.md), [penyisipan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md) untuk nilai yang diinterpolasi, dan [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md) untuk angka, tanggal, dan mata uang.

</Question>

<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci ke file konten yang mendeklarasikannya, ekstrak konten dari file, dan jalankan build, fill, test, push dan pull dari command palette.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: kesadaran yang sama di editor apa pun yang mendukung LSP, dengan go to definition, hover previews dari nilai terjemahan, autocompletion kunci, dan peringatan ketika kunci tidak dideklarasikan di mana pun.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: focused skills seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: `no-raw-text` flags hardcoded strings.

</Question>

<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, penggunaan komersial termasuk. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

</Question>

</FAQ>
