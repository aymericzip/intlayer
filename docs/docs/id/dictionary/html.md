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

## Cara Kerja HTML

Intlayer v8 mendeteksi tag HTML dalam string konten Anda secara cerdas. Jika sebuah string diidentifikasi sebagai HTML (mengandung tag), string tersebut secara otomatis diubah menjadi node HTML.

<Columns>
<Column title="Perilaku v7 (Pembungkusan Manual)">

```typescript fileName="htmlDictionary.content.ts"
import { html } from "intlayer";

export default {
  key: "app",
  content: {
    text: html("<p>Hello <strong>World</strong></p>"),
  },
};
```

</Column>
<Column title="Perilaku v8 (Deteksi Otomatis)">

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    text: "<p>Hello <strong>World</strong></p>",
  },
};
```

</Column>
</Columns>

---

## Mendeklarasikan Konten HTML

Anda dapat menyatakan konten HTML menggunakan fungsi `html` atau cukup sebagai string.

<Tabs>
  <Tab label="Pembungkusan Manual">
    Gunakan fungsi `html` untuk secara eksplisit menyatakan konten HTML. Ini memastikan tag standar dipetakan dengan benar bahkan jika deteksi otomatis dinonaktifkan.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Deteksi Otomatis">
    Jika string berisi tag HTML umum (misalnya, `<p>`, `<div>`, `<strong>`, dll.), Intlayer akan secara otomatis mengubahnya.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Halo <strong>Dunia</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="File Eksternal">
    Impor konten HTML dari file. Perhatikan bahwa saat ini fungsi `file()` mengembalikan sebuah string, yang akan terdeteksi otomatis sebagai HTML jika mengandung tag.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          id: html(file("./content.id.html")),
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Merender HTML

Proses merender dapat ditangani secara otomatis oleh sistem konten Intlayer atau secara manual menggunakan alat khusus.

### Perenderan Otomatis (menggunakan `useIntlayer`)

Saat Anda mengakses konten melalui `useIntlayer`, node HTML sudah disiapkan untuk dirender.

<Tabs group="framework">
  <Tab label="React / Next.js">
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
  <Tab label="Vue">
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
  <Tab label="Svelte">
    Svelte merender node HTML sebagai string. Gunakan `{@html}` untuk merendernya.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact mendukung node HTML secara langsung di JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
</Tabs>

## Konfigurasi Global dengan `HTMLProvider`

Anda dapat mengonfigurasi rendering HTML secara global untuk seluruh aplikasi Anda. Ini ideal untuk mendefinisikan komponen kustom yang harus tersedia di semua konten HTML.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
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
  <Tab label="Vue">
  
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
  <Tab label="Svelte">
   
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
  <Tab label="Preact">
   
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
</Tabs>

---

### Merender Manual & Alat Lanjutan

Jika Anda perlu merender string HTML mentah atau memiliki kontrol lebih atas pemetaan komponen, gunakan alat berikut.

<Tabs group="framework">
  <Tab label="React / Next.js">
    #### `<HTMLRenderer />` Komponen
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
  <Tab label="Vue">
   
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
  <Tab label="Svelte">
  
    #### Komponen `<HTMLRenderer />`
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

  </Tab>
  <Tab label="Preact">
   
    #### `<HTMLRenderer />` Komponen
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
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
