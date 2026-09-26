---
createdAt: 2026-01-20
updatedAt: 2026-09-21
priority: 8
title: Konten HTML
description: Pelajari cara mendeklarasikan dan menggunakan konten HTML dengan komponen kustom di Intlayer. Ikuti dokumentasi ini untuk menyematkan konten mirip HTML yang kaya dengan penggantian komponen dinamis dalam proyek yang di-internasionalisasi.
keywords:
  - HTML
  - Komponen Kustom
  - Konten Kaya
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
  - Remix
  - Astro
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.5.0
    date: 2026-03-24
    changes: "Add `intlayerHTML` plugin object; use `app.use(intlayerHTML)` instead of `app.use(installIntlayerHTML)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Memindahkan import dari `{{framework}}-intlayer` ke `{{framework}}-intlayer/html`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Menambahkan HTMLRenderer / useHTMLRenderer / utilitas renderHTML"
  - version: 8.0.0
    date: 2026-01-20
    changes: "Menambahkan dukungan parsing HTML"
author: aymericzip
---

# Konten HTML / HTML di Intlayer

Intlayer mendukung konten HTML, memungkinkan Anda menyematkan konten yang kaya dan terstruktur dalam dictionaries Anda. Konten ini dapat dirender dengan tag HTML standar atau digantikan dengan komponen kustom saat runtime.

## Mendeklarasikan Konten HTML

Anda dapat menyatakan konten HTML menggunakan fungsi `html` atau cukup sebagai string.

<Tabs>
  <Tab label="Pembungkusan Manual" value="manual-wrapping">
    Gunakan fungsi `html` untuk secara eksplisit menyatakan konten HTML. Ini memastikan tag standar dipetakan dengan benar bahkan jika deteksi otomatis dinonaktifkan.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      contentAutoTransformation: true, // dapat diatur di file konfigurasi
      content: {
        myHtmlContent:  html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Deteksi Otomatis" value="automatic-detection">
    Jika string berisi tag HTML umum (misalnya, `<p>`, `<div>`, `<strong>`, dll.), Intlayer akan secara otomatis mengubahnya.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // dapat diatur di file konfigurasi
      content: {
        myHtmlContent:  "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="File Eksternal" value="external-files">
    Impor konten HTML dari file. Perhatikan bahwa saat ini fungsi `file()` mengembalikan sebuah string, yang akan terdeteksi otomatis sebagai HTML jika mengandung tag.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

### Node `html()`

Fungsi `html()` adalah fitur baru di Intlayer v8 yang memungkinkan Anda menentukan konten HTML secara eksplisit di kamus Anda. Meskipun Intlayer sering kali dapat mendeteksi konten HTML secara otomatis, penggunaan fungsi `html()` memberikan beberapa keuntungan:

- **Keamanan Tipe**: Fungsi `html()` memungkinkan Anda menentukan props yang diharapkan untuk komponen kustom, memberikan pelengkapan otomatis dan pemeriksaan tipe yang lebih baik di editor Anda.
- **Deklarasi Eksplisit**: Ini memastikan bahwa string selalu diperlakukan sebagai HTML, bahkan jika string tersebut tidak berisi tag HTML standar yang akan memicu deteksi otomatis.
- **Definisi Komponen Kustom**: Anda dapat memberikan argumen kedua ke `html()` untuk menentukan komponen kustom dan tipe prop yang diharapkan.

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='Halo'>Dunia</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

Saat menggunakan metode `.use()` pada node HTML, komponen yang Anda berikan akan diperiksa terhadap definisi yang diberikan dalam fungsi `html()` (jika tersedia).

## Merender HTML

Proses merender dapat ditangani secara otomatis oleh sistem konten Intlayer atau secara manual menggunakan alat khusus.

### Perenderan Otomatis (menggunakan `useIntlayer`)

Saat Anda mengakses konten melalui `useIntlayer`, node HTML sudah disiapkan untuk dirender.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Node HTML dapat dirender langsung sebagai JSX. Tag standar bekerja secara otomatis.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Gunakan metode `.use()` untuk menyediakan komponen kustom atau menimpa tag:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Di Vue, konten HTML dapat dirender menggunakan built-in `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Gunakan `.use()` untuk override:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte merender node HTML sebagai string. Gunakan `{@html}` untuk merendernya.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact mendukung node HTML secara langsung di JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid mendukung node HTML secara langsung di JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular menggunakan direktif `[innerHTML]` untuk merender konten HTML.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myHtmlContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    Gunakan metode `.use()` untuk menyediakan komponen kustom atau menimpa tag:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    Di Remix 3, node HTML diselesaikan menjadi string HTML. Sisipkan dengan prop `innerHTML` dari Remix JSX, atau dengan `html.raw` dalam tampilan `html-template`.

    ```tsx fileName="src/views/home.tsx"
    import { useIntlayer } from "remix-intlayer";

    export const HomePage = () => () => {
      const { myHtmlContent } = useIntlayer("app");

      return <div innerHTML={myHtmlContent.value} />;
    };
    ```

    ```ts fileName="src/views/home.ts"
    import { html } from "remix/html-template";
    import { useIntlayer } from "remix-intlayer";

    export const renderHomePage = () => {
      const { myHtmlContent } = useIntlayer("app");

      return html.raw`<div>${myHtmlContent.value}</div>`;
    };
    ```

    > Remix secara default menghindari nilai yang diinterpolasi. `innerHTML` dan `html.raw` adalah dua pengecualian, yang dibutuhkan oleh string HTML.

    Gunakan metode `.use()` untuk mengganti tag atau memetakan komponen kustom. Penggantian adalah fungsi yang mengembalikan string HTML:

    ```tsx
    <div
      innerHTML={myHtmlContent.use({
        p: ({ children }) => `<p class="prose">${children}</p>`,
        CustomLink: ({ children }) => `<a href="/details">${children}</a>`,
      })}
    />
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    Di Astro, node HTML diselesaikan menjadi string HTML. Sisipkan dengan direktif `set:html` dalam template, atau dengan `innerHTML` dalam `<script>` klien.

    ```astro fileName="src/pages/index.astro"
    ---
    import { useIntlayer } from "astro-intlayer";

    const { myHtmlContent } = useIntlayer("app");
    ---

    <div set:html={myHtmlContent.value} />
    ```

    ```astro fileName="src/components/Content.astro"
    <div id="content"></div>

    <script>
      import { useIntlayer } from "astro-intlayer";

      const { myHtmlContent } = useIntlayer("app");

      document.querySelector("#content")!.innerHTML = myHtmlContent.value;
    </script>
    ```

    > Astro secara default menghindari `{ekspresi}`. `set:html` adalah pengecualian, yang dibutuhkan oleh string HTML.

    Gunakan metode `.use()` untuk mengganti tag atau memetakan komponen kustom. Penggantian adalah fungsi yang mengembalikan string HTML:

    ```astro
    <div
      set:html={myHtmlContent.use({
        p: ({ children }) => `<p class="prose">${children}</p>`,
        CustomLink: ({ children }) => `<a href="/details">${children}</a>`,
      })}
    />
    ```

  </Tab>
</Tabs>

## Konfigurasi Global dengan `HTMLProvider`

Anda dapat mengonfigurasi rendering HTML secara global untuk seluruh aplikasi Anda. Ini ideal untuk mendefinisikan komponen kustom yang harus tersedia di semua konten HTML.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
          CustomLink: ({ children }) => <a href="/details">{children}</a>,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    Anda juga dapat menggunakan renderer HTML Anda sendiri:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('react-intlayer/html');
          return renderHTML(html);
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    > Mengimpor renderer HTML Anda secara dinamis adalah cara yang baik untuk mengurangi ukuran bundle aplikasi Anda.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerHTML } from "vue-intlayer/html";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

    Anda juga dapat menggunakan renderer HTML Anda sendiri:

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerHTML } from "vue-intlayer/html";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerHTML, {
      renderHTML: async (html) => {
        const { renderHTML } = await import('vue-intlayer/html');
        return renderHTML(html);
      },
    });

    app.mount("#app");
    ```

    > Mengimpor renderer HTML Anda secara dinamis adalah cara yang baik untuk mengurangi ukuran bundle aplikasi Anda.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer/html";
      import MyCustomP from "./MyCustomP.svelte";
    </script>

    <HTMLProvider
      components={{
        p: MyCustomP,
      }}
    >
      <slot />
    </HTMLProvider>
    ```

    Anda juga dapat menggunakan renderer HTML Anda sendiri:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer/html";
    </script>

    <HTMLProvider
      renderHTML={async (html) => {
        const { renderHTML } = await import('svelte-intlayer/html');
        return renderHTML(html);
      }}
    >
      <slot />
    </HTMLProvider>
    ```

    > Mengimpor renderer HTML Anda secara dinamis adalah cara yang baik untuk mengurangi ukuran bundle aplikasi Anda.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    Anda juga dapat menggunakan renderer HTML Anda sendiri:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('preact-intlayer/html');
          return renderHTML(html);
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    > Mengimpor renderer HTML Anda secara dinamis adalah cara yang baik untuk mengurangi ukuran bundle aplikasi Anda.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer/html";

    export const AppProvider = (props) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

    Anda juga dapat menggunakan renderer HTML Anda sendiri:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer/html";

    export const AppProvider = (props) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('solid-intlayer/html');
          return renderHTML(html);
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

    > Mengimpor renderer HTML Anda secara dinamis adalah cara yang baik untuk mengurangi ukuran bundle aplikasi Anda.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerHTMLProvider } from "angular-intlayer/html";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerHTMLProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

    Anda juga dapat menggunakan renderer HTML Anda sendiri:

    ```typescript fileName="app.config.ts"
    import { createIntlayerHTMLProvider } from "angular-intlayer/html";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerHTMLProvider({
          renderHTML: async (html) => {
            const { renderHTML } = await import('angular-intlayer/html');
            return renderHTML(html);
          },
        }),
      ],
    };
    ```

    > Mengimpor renderer HTML Anda secara dinamis adalah cara yang baik untuk mengurangi ukuran bundle aplikasi Anda.

  </Tab>
  <Tab label="Remix" value="remix">

    Remix tidak memiliki pohon komponen untuk menampung provider, sehingga konfigurasi diinstal sekali, sebagai singleton, saat server dimulai. Ini mengonfigurasi renderer yang dikembalikan oleh `useHTMLRenderer()`. Node `html` yang dikembalikan oleh `useIntlayer` dirender apa adanya; ganti tag per node dengan `.use()`.

    ```typescript fileName="src/router.ts"
    import { installIntlayerHTML } from "remix-intlayer/html";

    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });
    ```

    > Gunakan `installIntlayerHTMLDynamic(async () => …)` untuk memuat renderer secara lazy; loader hanya berjalan pada panggilan pertama.

  </Tab>
  <Tab label="Astro" value="astro">

    Astro tidak memiliki pohon komponen untuk menampung provider, sehingga konfigurasi diinstal sekali, sebagai singleton, di middleware (server) dan dalam `<script>` klien (browser). Ini mengonfigurasi renderer yang dikembalikan oleh `useHTMLRenderer()`. Node `html` yang dikembalikan oleh `useIntlayer` dirender apa adanya; ganti tag per node dengan `.use()`.

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerHTML } from "astro-intlayer/html";
    import { defineMiddleware } from "astro:middleware";

    // Berjalan sekali saat server dimulai; middleware Intlayer itu sendiri
    // didaftarkan oleh integrasi, sebelum file ini.
    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });

    export const onRequest = defineMiddleware((_context, next) => next());
    ```

    > Gunakan `installIntlayerHTMLDynamic(async () => …)` untuk memuat renderer secara lazy; loader hanya berjalan pada panggilan pertama.

  </Tab>
</Tabs>

### Merender Manual & Alat Lanjutan

Jika Anda perlu merender string HTML mentah atau memiliki kontrol lebih atas pemetaan komponen, gunakan alat berikut.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Komponen `<HTMLRenderer />`
    Merender string HTML dengan komponen tertentu.

    ```tsx
    import { HTMLRenderer } from "react-intlayer/html";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    Dapatkan fungsi renderer yang telah dikonfigurasi sebelumnya.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer/html";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Utilitas `renderHTML()`

    Utilitas mandiri untuk merender di luar komponen.

    ```tsx
    import { renderHTML } from "react-intlayer/html";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Komponen `<HTMLRenderer />`

    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer/html";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Komponen `<HTMLRenderer />`

    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer/html";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### `useHTMLRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer/html";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### Utilitas `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer/html";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    #### Komponen `<HTMLRenderer />`

    ```tsx
    import { HTMLRenderer } from "preact-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utilitas `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    #### Komponen `<HTMLRenderer />`

    ```tsx
    import { HTMLRenderer } from "solid-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utilitas `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Layanan `IntlayerHTMLService`
    Render string HTML menggunakan layanan tersebut.

    ```typescript
    import { IntlayerHTMLService } from "angular-intlayer/html";

    export class MyComponent {
      constructor(private markdownService: IntlayerHTMLService) {}

      renderHTML(html: string) {
        return this.markdownService.renderHTML(html);
      }
    }
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    #### `useHTMLRenderer()` Hook

    Dapatkan fungsi renderer yang telah dikonfigurasi sebelumnya oleh `installIntlayerHTML()`. Ini mengembalikan string HTML.

    ```tsx
    import { useHTMLRenderer } from "remix-intlayer/html";

    const renderHTML = useHTMLRenderer();

    return <div innerHTML={renderHTML("<p>Hello <strong>World</strong></p>")} />;
    ```

    #### Utilitas `renderHTML()`

    Utilitas mandiri yang mengabaikan konfigurasi global.

    ```tsx
    import { renderHTML } from "remix-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    #### `useHTMLRenderer()` Hook

    Dapatkan fungsi renderer yang telah dikonfigurasi sebelumnya oleh `installIntlayerHTML()`. Ini mengembalikan string HTML.

    ```astro
    ---
    import { useHTMLRenderer } from "astro-intlayer/html";

    const renderHTML = useHTMLRenderer();
    ---

    <div set:html={renderHTML("<p>Hello <strong>World</strong></p>")} />
    ```

    #### Utilitas `renderHTML()`

    Utilitas mandiri yang mengabaikan konfigurasi global.

    ```astro
    ---
    import { renderHTML } from "astro-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ---

    <div set:html={html} />
    ```

  </Tab>
</Tabs>

## Referensi Opsi

Opsi-opsi ini dapat diteruskan ke `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer`, dan `renderHTML`.

| Opsi         | Tipe                  | Default | Deskripsi                                                                                                           |
| :----------- | :-------------------- | :------ | :------------------------------------------------------------------------------------------------------------------ |
| `components` | `Record<string, any>` | `{}`    | Peta dari tag HTML atau nama komponen kustom ke komponen.                                                           |
| `renderHTML` | `Function`            | `null`  | Fungsi rendering kustom untuk sepenuhnya menggantikan parser HTML default (penyedia Vue, Svelte, Remix, dan Astro). |

> Catatan: Untuk React dan Preact, tag HTML standar disediakan secara otomatis. Anda hanya perlu meneruskan prop `components` jika ingin menimpanya atau menambahkan komponen kustom.
