---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Pelajari cara mendeklarasikan dan menggunakan konten Markdown di situs web multibahasa Anda dengan Intlayer. Ikuti langkah-langkah dalam dokumentasi online ini untuk mengintegrasikan Markdown dengan mulus ke dalam proyek Anda.
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
  - version: 8.10.0
    date: 2026-05-19
    changes: "Menambahkan dukungan untuk file `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Menambahkan objek plugin `intlayerMarkdown`; gunakan `app.use(intlayerMarkdown)` sebagai ganti `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Memindahkan impor dari `{{framework}}-intlayer` ke `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Menambahkan utilitas MarkdownRenderer / useMarkdownRenderer / renderMarkdown dan opsi forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Dekorasi otomatis dari konten markdown, dukungan MDX dan SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inisialisasi riwayat"
---

# Markdown / Konten Teks Kaya

Intlayer mendukung konten teks kaya yang didefinisikan menggunakan sintaks Markdown. Ini memungkinkan Anda dengan mudah menulis dan memelihara konten berformat kaya seperti blog, artikel, dan lainnya.

## Mendeklarasikan Konten Markdown

Anda dapat mendeklarasikan konten Markdown menggunakan fungsi `md` atau cukup sebagai string (jika mengandung sintaks Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">
    Mulai dari versi `8.10.0`, Anda dapat mendeklarasikan konten Markdown langsung di dalam file `.content.md`. Intlayer akan secara otomatis mendeteksi dan mem-parsing konten Markdown.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: Konten saya
    locale: en
    ---

    # Konten saya

    Berikut adalah contoh konten markdown
    ```

    Bidang `locale` pada front-matter adalah bidang yang mendefinisikan bahasa konten. Ini bersifat opsional. Jika tidak diberikan, Intlayer akan menggunakan bahasa default, yang juga digunakan sebagai bahasa cadangan jika tidak ada terjemahan yang tersedia untuk bahasa tertentu.

    Contoh struktur file:

    ```text
    content
    ├── markdown-file.en.content.md
    ├── markdown-file.fr.content.md
    └── markdown-file.es.content.md
    ```

    Anda dapat menambahkan properti apa pun yang didefinisikan dalam [Definisi Kamus](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md) ke dalam front-matter

  </Tab>
  <Tab label="Pembungkusan Manual" value="manual-wrapping">
    Gunakan fungsi `md` untuk mendeklarasikan konten Markdown secara eksplisit. Ini berguna jika Anda ingin memastikan sebuah string diperlakukan sebagai Markdown bahkan jika tidak mengandung sintaks yang jelas.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Judul saya \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="File Eksternal" value="external-files">
    Impor file `.md` secara langsung menggunakan fungsi `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          id: md(file("./myMarkdown.id.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="Deteksi Otomatis" value="automatic-detection">
    Jika string mengandung indikator Markdown umum (seperti judul, daftar, tautan, dll.), Intlayer akan secara otomatis mengubahnya.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Mengaktifkan deteksi otomatis dari konten Markdown - Dapat diatur secara global di intlayer.config.ts
      content: {
        myMarkdownContent: "## Judul saya \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
</Tabs>

## Merender Markdown

Intlayer menyediakan dua cara independen untuk merender Markdown:

1. **Melalui `useIntlayer`**
   — Intlayer secara otomatis mengubah simpul `md` menjadi keluaran asli kerangka kerja (JSX, VNode, string HTML).
   - Frontmatter diparsing dan diekspos sebagai `.metadata`. Anda dapat mengesampingkan rendering pada dua tingkat — secara global dengan `MarkdownProvider` (atau yang setara di kerangka kerja) dan secara lokal per simpul dengan `.use()`. Keduanya dapat digabungkan; `.use()` diutamakan daripada `MarkdownProvider`, yang pada gilirannya diutamakan daripada nilai default.

2. **Utilitas Pembantu** — `<MarkdownRenderer />`, `useMarkdownRenderer()`, dan `renderMarkdown()` adalah alat mandiri yang menerima **hanya string Markdown mentah**. Alat-alat ini independen dari `useIntlayer` dan tidak bekerja dengan simpul dekoratif yang dikembalikannya.

Rendering Markdown mendukung **MDX** — gunakan komponen JSX/kerangka kerja apa pun berdasarkan namanya langsung di dalam Markdown Anda.

### 1. Rendering Otomatis (melalui `useIntlayer`)

<Tabs group="framework">
  <Tab label="React" value="react">
    Simpul Markdown dapat dirender langsung sebagai JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";
    import { MarkdownProvider } from "react-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // Komponen MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Jika `MarkdownProvider` tidak ada, Intlayer akan merender markdown menggunakan parser default Markdown ke JSX.

    Anda juga dapat memberikan pengesampingan lokal untuk simpul tertentu menggunakan metode `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Anda dapat mengambil Markdown sebagai sebuah string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Dan Anda dapat mengakses metadata markdown Anda seperti ini:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    Simpul Markdown dapat dirender langsung sebagai JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "next-intlayer";
    import { MarkdownProvider } from "next-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // Komponen MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Jika `MarkdownProvider` tidak ada, Intlayer akan merender markdown menggunakan parser default Markdown ke JSX.

    Anda juga dapat memberikan pengesampingan lokal untuk simpul tertentu menggunakan metode `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Anda dapat mengambil Markdown sebagai sebuah string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Dan Anda dapat mengakses metadata markdown Anda seperti ini:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Di Vue, konten Markdown dapat dirender menggunakan tag `component` bawaan atau langsung sebagai sebuah simpul.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Konfigurasikan secara global melalui plugin `intlayerMarkdown` (mendukung komponen kustom MDX):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // Komponen MDX
      },
    });
    ```

    > Jika plugin `intlayerMarkdown` tidak diinstal, Intlayer akan merender menggunakan kompilator default.

    Anda juga dapat memberikan pengesampingan lokal untuk simpul tertentu menggunakan metode `.use()`:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Anda dapat mengambil Markdown sebagai sebuah string:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    Dan Anda dapat mengakses metadata markdown Anda seperti ini:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte merender Markdown sebagai string HTML secara default. Gunakan `{@html}` untuk merendernya.

    ```svelte fileName="App.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    import { MarkdownProvider } from "svelte-intlayer/markdown";
    import MyHeading from "./MyHeading.svelte";

    const content = useIntlayer("app");
    </script>

    <MarkdownProvider components={{ h1: MyHeading }}>
      {@html $content.myMarkdownContent}
    </MarkdownProvider>
    ```

    > Jika `MarkdownProvider` tidak ada, Intlayer akan merender markdown menggunakan kompilator default.

    Anda juga dapat memberikan pengesampingan lokal untuk simpul tertentu menggunakan metode `.use()`:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Anda dapat mengambil Markdown sebagai sebuah string:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    Dan Anda dapat mengakses metadata markdown Anda seperti ini:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact mendukung simpul Markdown secara langsung di JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";
    import { MarkdownProvider } from "preact-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // Komponen MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Jika `MarkdownProvider` tidak ada, Intlayer akan merender markdown menggunakan parser default Markdown ke JSX.

    Anda juga dapat memberikan pengesampingan lokal untuk simpul tertentu menggunakan metode `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Anda dapat mengambil Markdown sebagai sebuah string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Dan Anda dapat mengakses metadata markdown Anda seperti ini:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid mendukung simpul Markdown secara langsung di JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { MarkdownProvider } from "solid-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
          MyButton: (props) => <button {...props} />, // Komponen MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Jika `MarkdownProvider` tidak ada, Intlayer akan merender markdown menggunakan parser default Markdown ke JSX.

    Anda juga dapat memberikan pengesampingan lokal untuk simpul tertentu menggunakan metode `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Anda dapat mengambil Markdown sebagai sebuah string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Dan Anda dapat mengakses metadata markdown Anda seperti ini:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
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

    > Jika penyedia IntlayerMarkdown tidak dikonfigurasi, Intlayer akan merender menggunakan kompilator default.

    Anda juga dapat memberikan pengesampingan lokal untuk simpul tertentu menggunakan metode `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Anda dapat mengambil Markdown sebagai sebuah string:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    Dan Anda dapat mengakses metadata markdown Anda seperti ini:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Utilitas Pembantu (Hanya String Markdown)

Utilitas ini merender **hanya string Markdown mentah** dan independen dari `useIntlayer`. Gunakan utilitas ini saat Anda perlu merender Markdown dari sumber selain dari kamus Anda.

<Tabs group="framework">
  <Tab label="React" value="react">
  
    #### Komponen `<MarkdownRenderer />`

    Merender string Markdown dengan opsi tertentu.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Judul Saya"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Mendapatkan fungsi perender yang sudah dikonfigurasi sebelumnya.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Judul Saya");
    ```

    #### Utilitas `renderMarkdown()`
    Utilitas mandiri untuk rendering di luar komponen.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# Judul Saya", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
  
    #### Komponen `<MarkdownRenderer />`

    Merender string Markdown dengan opsi tertentu.

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Judul Saya"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Mendapatkan fungsi perender yang sudah dikonfigurasi sebelumnya.

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Judul Saya");
    ```

    #### Utilitas `renderMarkdown()`
    Utilitas mandiri untuk rendering di luar komponen.

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

    const jsx = renderMarkdown("# Judul Saya", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Komponen `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Judul Saya" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Komponen `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Judul Saya" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Judul Saya")}
    ```

    #### Utilitas `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# Judul Saya")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Komponen `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Judul Saya"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Judul Saya")}</div>;
    ```

    #### Utilitas `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# Judul Saya")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Komponen `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Judul Saya"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Judul Saya")}</div>;
    ```

    #### Utilitas `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# Judul Saya")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Layanan `IntlayerMarkdownService`
    Merender string Markdown menggunakan layanan.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer/markdown";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

## Konfigurasi Global dengan `MarkdownProvider`

`MarkdownProvider` (atau padanan kerangka kerjanya) mengonfigurasi jalur rendering Markdown untuk seluruh aplikasi Anda. Ini berlaku baik untuk rendering `useIntlayer` otomatis maupun utilitas pembantu. Opsi yang ditetapkan di sini adalah default — `.use()` mengesampingkannya di tingkat simpul.

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```


    > MDX didukung — nama komponen apa pun yang digunakan di dalam Markdown Anda (misalnya `<MyCustomJSXComponent />`) diselesaikan terhadap peta `components`.

    Anda juga dapat menggunakan perender markdown Anda sendiri:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Mengimpor perender Markdown Anda secara dinamis adalah cara yang bagus untuk mengurangi ukuran bundel aplikasi Anda.

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```


    > MDX didukung — nama komponen apa pun yang digunakan di dalam Markdown Anda (misalnya `<MyCustomJSXComponent />`) diselesaikan terhadap peta `components`.

    Anda juga dapat menggunakan perender markdown Anda sendiri:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
          const { renderMarkdown } = await import('next-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Mengimpor perender Markdown Anda secara dinamis adalah cara yang bagus untuk mengurangi ukuran bundel aplikasi Anda.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      components: {
        h1: (props) =>
        h('h1', { style: { color: 'orange' }, ...props }, props.children),
        ComponentDemo: () => h('div', { style: { background: 'grey' } }, 'DEMO'),
        bold: (props) => h('strong', props),
        code: (props) => h('code', props),
      },
    });

    app.mount("#app");
    ```


    > MDX didukung — nama komponen apa pun yang digunakan di dalam Markdown Anda (misalnya `<MyCustomJSXComponent />`) diselesaikan terhadap peta `components`.

    Anda juga dapat menggunakan perender markdown Anda sendiri:

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      renderMarkdown: async (md) => {
        const { renderMarkdown } = await import('vue-intlayer/markdown');
        return renderMarkdown(md);
      },
    });

    app.mount("#app");
    ```

    > Mengimpor perender Markdown Anda secara dinamis adalah cara yang bagus untuk mengurangi ukuran bundel aplikasi Anda.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```


    > MDX didukung — nama komponen apa pun yang digunakan di dalam Markdown Anda (misalnya `<MyCustomJSXComponent />`) diselesaikan terhadap peta `components`.

    Anda juga dapat menggunakan perender markdown Anda sendiri:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
    </script>

    <MarkdownProvider
      renderMarkdown={async (md) => {
        const { renderMarkdown } = await import('svelte-intlayer/markdown');
        return renderMarkdown(md);
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    > Mengimpor perender Markdown Anda secara dinamis adalah cara yang bagus untuk mengurangi ukuran bundel aplikasi Anda.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```


    > MDX didukung — nama komponen apa pun yang digunakan di dalam Markdown Anda (misalnya `<MyCustomJSXComponent />`) diselesaikan terhadap peta `components`.

    Anda juga dapat menggunakan perender markdown Anda sendiri:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('preact-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Mengimpor perender Markdown Anda secara dinamis adalah cara yang bagus untuk mengurangi ukuran bundel aplikasi Anda.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```


    > MDX didukung — nama komponen apa pun yang digunakan di dalam Markdown Anda (misalnya `<MyCustomJSXComponent />`) diselesaikan terhadap peta `components`.

    Anda juga dapat menggunakan perender markdown Anda sendiri:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('solid-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    > Mengimpor perender Markdown Anda secara dinamis adalah cara yang bagus untuk mengurangi ukuran bundel aplikasi Anda.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.module.ts"
    import { NgModule } from '@angular/core';
    import { IntlayerMarkdownModule } from 'angular-intlayer/markdown';

    @NgModule({
      imports: [
        IntlayerMarkdownModule.forRoot({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          }
        })
      ]
    })
    export class AppModule {}
    ```

    > Mengimpor perender Markdown Anda secara dinamis adalah cara yang bagus untuk mengurangi ukuran bundel aplikasi Anda.

  </Tab>
</Tabs>

## Suspense

Perender Markdown Intlayer dimuat secara dinamis. Meskipun dioptimalkan, ukuran parser dasarnya sekitar 55kb. Memuat ini secara sinkron menunda perenderan halaman awal dan menurunkan First Contentful Paint (FCP).

Untuk mencegah pemblokiran UI, Intlayer terintegrasi dengan API Suspense dari React. Ia mengambil parser di latar belakang dan melempar Promise selama pengunduhan.

Bungkus komponen apa pun yang merender Markdown Intlayer di dalam batasan `<Suspense>`. Ini menampilkan status fallback yang dilokalkan saat chunk diunduh, memungkinkan sisa DOM Anda segera dirender.

Peringatan: Jika Anda tidak menyediakan batasan `<Suspense>`, React akan ditangguhkan pada tingkat root atau memblokir seluruh pohon komponen dari perenderan hingga chunk 55kb dimuat sepenuhnya.

<Tabs>
  <Tab label="Next.js" value="nextjs">

Di Next.js App Router, Anda dapat menggunakan `Suspense` React untuk komponen klien atau file `loading.tsx` untuk komponen server.

**Komponen Klien:**

```tsx fileName="components/MyComponent.tsx"
"use client";
import { useIntlayer } from "next-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

**Komponen Server dengan `loading.tsx`:**

```tsx fileName="app/loading.tsx"
export default function Loading() {
  return <div>Loading...</div>;
}
```

```tsx fileName="app/page.tsx"
import { useIntlayer } from "next-intlayer/server";

const MyPage = () => {
  const markdownContent = useIntlayer("my-markdown");
  return <div>{markdownContent}</div>;
};

export default MyPage;
```

  </Tab>

  <Tab label="React" value="react">

```tsx
import { useIntlayer } from "react-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
 
  <Tab label="Vue" value="vue">

Vue memiliki komponen `<Suspense>` bawaan. Bungkus komponen yang merender konten Markdown dalam batasan `<Suspense>`.

```vue fileName="MyComponent.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { markdownContent } = useIntlayer("my-markdown");
</script>

<template>
  <Suspense>
    <component :is="markdownContent" />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Svelte tidak memiliki API Suspense yang setara. Gunakan blok `{#await}` untuk menangani perenderan asinkron dari konten Markdown.

```svelte fileName="MyComponent.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my-markdown");
</script>

{#await $content.markdownContent}
  <div>Loading...</div>
{:then rendered}
  {@html rendered}
{/await}
```

  </Tab>
  <Tab label="Preact" value="preact">

Preact mendukung API Suspense React melalui `preact/compat`.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "preact-intlayer";
import { Suspense } from "preact/compat";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Solid" value="solid">

Solid memiliki komponen `<Suspense>` sendiri dari `solid-js`.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "solid-intlayer";
import { Suspense } from "solid-js";

const MyComponent = () => {
  const { markdownContent } = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Angular" value="angular">

Angular tidak memiliki API Suspense. Gunakan tampilan yang ditangguhkan (`@defer`) milik Angular untuk menangani konten Markdown yang dimuat secara lambat (membutuhkan Angular 17+).

```typescript fileName="my.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my",
  template: `
    @defer {
      <div [innerHTML]="content().markdownContent"></div>
    } @loading {
      <div>Loading...</div>
    }
  `,
})
export class MyComponent {
  content = useIntlayer("my-markdown");
}
```

  </Tab>
</Tabs>

---

## Referensi Opsi

Opsi ini dapat diteruskan ke `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer`, dan `renderMarkdown`.

| Option                | Type        | Default | Deskripsi                                                                                            |
| :-------------------- | :---------- | :------ | :--------------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | Memaksa output untuk dibungkus dalam elemen tingkat blok (mis., `<div>`).                            |
| `forceInline`         | `boolean`   | `false` | Memaksa output untuk dibungkus dalam elemen sebaris (mis., `<span>`).                                |
| `tagfilter`           | `boolean`   | `true`  | Mengaktifkan GitHub Tag Filter untuk keamanan yang ditingkatkan dengan menghapus tag HTML berbahaya. |
| `preserveFrontmatter` | `boolean`   | `false` | Jika `true`, frontmatter di awal string Markdown tidak akan dihapus.                                 |
| `components`          | `Overrides` | `{}`    | Peta tag HTML ke komponen kustom (mis., `{ h1: MyHeading }`).                                        |
| `wrapper`             | `Component` | `null`  | Komponen kustom untuk membungkus Markdown yang dirender.                                             |
| `renderMarkdown`      | `Function`  | `null`  | Fungsi perenderan kustom untuk sepenuhnya menggantikan kompilator Markdown default.                  |
