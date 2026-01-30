---
createdAt: 2026-01-20
updatedAt: 2026-01-22
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
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Menambahkan HTMLRenderer / useHTMLRenderer / utilitas renderHTML
  - version: 8.0.0
    date: 2026-01-20
    changes: Menambahkan dukungan parsing HTML
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

---

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
</Tabs>

## Konfigurasi Global dengan `HTMLProvider`

Anda dapat mengonfigurasi rendering HTML secara global untuk seluruh aplikasi Anda. Ini ideal untuk mendefinisikan komponen kustom yang harus tersedia di semua konten HTML.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer";

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

  </Tab>
  <Tab label="Vue" value="vue">
  
    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { installIntlayer, installIntlayerHTML } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
   
    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer";
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

  </Tab>
  <Tab label="Preact" value="preact">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer";

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

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

### Merender Manual & Alat Lanjutan

Jika Anda perlu merender string HTML mentah atau memiliki kontrol lebih atas pemetaan komponen, gunakan alat berikut.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Komponen `<HTMLRenderer />`
    Merender string HTML dengan komponen tertentu.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    Dapatkan fungsi renderer yang telah dikonfigurasi sebelumnya.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Utilitas `renderHTML()`

    Utilitas mandiri untuk merender di luar komponen.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### Komponen `<HTMLRenderer />`
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
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
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### `useHTMLRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### Utilitas `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### Komponen `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utilitas `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### Komponen `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utilitas `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Layanan `IntlayerMarkdownService`
    Render string HTML menggunakan layanan tersebut.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderHTML(html: string) {
        return this.markdownService.renderMarkdown(html);
      }
    }
    ```

  </Tab>
</Tabs>

---

## Referensi Opsi

Opsi-opsi ini dapat diteruskan ke `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer`, dan `renderHTML`.

| Opsi         | Tipe                  | Default | Deskripsi                                                                                                 |
| :----------- | :-------------------- | :------ | :-------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`    | Peta dari tag HTML atau nama komponen kustom ke komponen.                                                 |
| `renderHTML` | `Function`            | `null`  | Fungsi render kustom untuk menggantikan sepenuhnya parser HTML default (Hanya untuk provider Vue/Svelte). |

> Catatan: Untuk React dan Preact, tag HTML standar disediakan secara otomatis. Anda hanya perlu meneruskan prop `components` jika ingin menimpanya atau menambahkan komponen kustom.
