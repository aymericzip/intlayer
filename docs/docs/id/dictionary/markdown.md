---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Pelajari cara mendeklarasikan dan menggunakan konten Markdown di situs web multibahasa Anda dengan Intlayer. Ikuti langkah-langkah dalam dokumentasi online ini untuk mengintegrasikan Markdown secara mulus ke dalam proyek Anda.
keywords:
  - Markdown
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Menambahkan utilitas MarkdownRenderer / useMarkdownRenderer / renderMarkdown dan opsi forceInline
  - version: 8.0.0
    date: 2026-01-18
    changes: Dekorasi otomatis konten markdown, dukungan MDX dan SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Markdown / Konten Teks Kaya

Intlayer mendukung konten teks kaya yang didefinisikan menggunakan sintaks Markdown. Ini memungkinkan Anda menulis dan memelihara konten dengan format kaya secara mudah, seperti blog, artikel, dan lainnya.

## Cara Kerja Markdown

Intlayer v8 mendeteksi sintaks Markdown dalam string konten Anda secara cerdas. Jika sebuah string diidentifikasi sebagai Markdown, string tersebut secara otomatis diubah menjadi node Markdown.

<Columns>
  <Column title="Perilaku v7 (Pembungkusan Manual)">

    ```typescript fileName="markdownDictionary.content.ts"
    import { md } from "intlayer";

    export default {
      key: "app",
      content: {
        text: md("## My title \n\nLorem Ipsum"),
      },
    };
    ```

  </Column>
  <Column title="Perilaku v8 (Deteksi Otomatis)">

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Aktifkan deteksi otomatis konten Markdown - Dapat diatur secara global di intlayer.config.ts
      content: {
        text: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Column>
</Columns>

---

## Bagian 1: Mendeklarasikan Konten Markdown

Anda dapat menyatakan konten Markdown menggunakan fungsi `md` atau cukup sebagai string (jika mengandung sintaks Markdown).

<Tabs>
  <Tab label="Pembungkusan Manual">
    Gunakan fungsi `md` untuk menyatakan konten Markdown secara eksplisit. Ini berguna jika Anda ingin memastikan sebuah string diperlakukan sebagai Markdown meskipun tidak mengandung sintaks yang jelas.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## My title \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Deteksi Otomatis">
    Jika string mengandung indikator Markdown umum (seperti header, daftar, tautan, dll.), Intlayer akan secara otomatis mengubahnya.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Aktifkan deteksi otomatis konten Markdown - Dapat diatur secara global di intlayer.config.ts
      content: {
        myMarkdownContent: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="File Eksternal">
    Impor file `.md` secara langsung menggunakan fungsi `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Bagian 2: Merender Markdown

Proses merender dapat ditangani secara otomatis oleh sistem konten Intlayer atau secara manual menggunakan alat khusus.

### 1. Perenderan Otomatis (menggunakan `useIntlayer`)

Saat Anda mengakses konten melalui `useIntlayer`, node Markdown sudah disiapkan untuk dirender.

<Tabs group="framework">
  <Tab label="React / Next.js">
    Node Markdown dapat dirender langsung sebagai JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    Anda juga dapat memberikan override lokal untuk node tertentu menggunakan metode `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    Di Vue, konten Markdown dapat dirender menggunakan built-in `component` atau langsung sebagai node.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">
    Svelte merender Markdown sebagai string HTML secara default. Gunakan `{@html}` untuk merendernya.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact mendukung node Markdown secara langsung di JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid mendukung node Markdown secara langsung di JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
    Angular menggunakan direktif `[innerHTML]` untuk merender konten Markdown.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myMarkdownContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    Anda juga dapat memberikan override lokal untuk node tertentu menggunakan metode `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Merender Manual & Alat Lanjutan

Jika Anda perlu merender string Markdown mentah atau memiliki kontrol lebih atas proses rendering, gunakan alat berikut.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    #### Komponen `<MarkdownRenderer />`

    Merender string Markdown dengan opsi tertentu.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    Dapatkan fungsi renderer yang telah dikonfigurasi sebelumnya.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### Utilitas `renderMarkdown()`
    Utilitas mandiri untuk merender di luar komponen.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue">

    #### Komponen `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# My Title" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">

    #### Komponen `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# My Title" />
    ```

    #### `useMarkdownRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# My Title")}
    ```

    #### Utilitas `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact">
    #### Komponen `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### Utilitas `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
    #### Komponen `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### Utilitas `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### Layanan `IntlayerMarkdownService`
    Render string Markdown menggunakan layanan tersebut.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

---

## Konfigurasi Global dengan `MarkdownProvider`

Anda dapat mengonfigurasi perenderan Markdown secara global untuk seluruh aplikasi Anda. Ini menghindari pengiriman prop yang sama ke setiap renderer.

<Tabs group="framework">
  <Tab label="React / Next.js">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
          a: ({ href, children }) => <Link to={href}>{children}</Link>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerMarkdown, {
      forceBlock: true,
      tagfilter: true,
      components: {
        h1: {
          component: "h1",
          props: { class: "text-2xl font-bold" },
        },
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      forceBlock={true}
      tagfilter={true}
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

  </Tab>
  <Tab label="Preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer";

    export const AppProvider = (props) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            h1: { class: "text-2xl font-bold" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

## Referensi Opsi

Opsi-opsi ini dapat diteruskan ke `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer`, dan `renderMarkdown`.

| Opsi                  | Tipe        | Default | Deskripsi                                                                                               |
| :-------------------- | :---------- | :------ | :------------------------------------------------------------------------------------------------------ |
| `forceBlock`          | `boolean`   | `false` | Memaksa output untuk dibungkus dalam elemen tingkat blok (misalnya, `<div>`).                           |
| `forceInline`         | `boolean`   | `false` | Memaksa output untuk dibungkus dalam elemen inline (misalnya, `<span>`).                                |
| `tagfilter`           | `boolean`   | `true`  | Mengaktifkan Filter Tag GitHub untuk keamanan yang lebih baik dengan menghapus tag HTML yang berbahaya. |
| `preserveFrontmatter` | `boolean`   | `false` | Jika `true`, frontmatter di awal string Markdown tidak akan dihapus.                                    |
| `components`          | `Overrides` | `{}`    | Peta tag HTML ke komponen kustom (misalnya, `{ h1: MyHeading }`).                                       |
| `wrapper`             | `Component` | `null`  | Komponen kustom untuk membungkus Markdown yang dirender.                                                |
| `renderMarkdown`      | `Function`  | `null`  | Fungsi render kustom untuk menggantikan sepenuhnya kompiler Markdown default.                           |
