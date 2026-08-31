---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Nuxt i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi Nuxt multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 7.3.11
    date: 2025-12-07
    changes: "Memperbarui LocaleSwitcher, SEO, metadata"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Terjemahkan situs web Nuxt dan Vue Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `@nuxtjs/i18n` atau `i18next`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>

<Accordion header="Cakupan Nuxt penuh">

Intlayer dioptimalkan untuk bekerja sempurna dengan Nuxt dengan menawarkan **perutean multibahasa**, **middleware untuk deteksi lokal**, **peta situs**, dan semua fitur yang diperlukan untuk penskalaan internasionalisasi (i18n).

</Accordion>

<Accordion header="Ukuran bundle">

Daripada memuat file JSON berukuran besar ke halaman Anda, muat saja konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Kemampuan Pemeliharaan">

Mencakup konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi berskala besar. Anda dapat menduplikasi atau menghapus satu folder fitur tanpa beban mental untuk meninjau seluruh basis kode konten Anda. Selain itu, Intlayer **diketik sepenuhnya** untuk memastikan keakuratan konten Anda.

</Accordion>

<Accordion header="Agen AI">

Menempatkan konten bersama **mengurangi konteks yang diperlukan** dengan Model Bahasa Besar (LLM). Intlayer juga dilengkapi dengan serangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk menjadikan pengalaman pengembang (DX) lebih lancar bagi agen AI.

</Accordion>

<Accordion header="Otomatisasi">

Gunakan otomatisasi untuk menerjemahkan dalam saluran CI/CD Anda menggunakan LLM pilihan Anda dengan biaya penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomatiskan ekstraksi konten, serta [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Pertunjukan">

Menghubungkan file JSON berukuran besar ke komponen dapat menyebabkan masalah kinerja dan reaktivitas. Intlayer mengoptimalkan pemuatan konten Anda pada waktu pembuatan.

</Accordion>

<Accordion header="Menskalakan tanpa pengembang">

Lebih dari sekedar solusi i18n, Intlayer menyediakan **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** yang dihosting sendiri dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa secara **real-time**, membuat kolaborasi dengan penerjemah, copywriter, dan anggota tim lainnya menjadi lancar. Konten dapat disimpan secara lokal dan/atau jarak jauh.

</Accordion>
</AccordionGroup>

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer di Aplikasi Nuxt

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Cara menerjemahkan aplikasi Nuxt dan Vue Anda menggunakan Intlayer? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-nuxt-4-template) di GitHub.

<Steps>

<Step number={1} title="Pasang Dependensi">

Pasang paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Misalnya:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpile, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **vue-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi Vue. Ini adalah composables untuk komponen Vue.

- **nuxt-intlayer**
  Modul Nuxt yang mengintegrasikan Intlayer dengan aplikasi Nuxt. Modul ini menyediakan pengaturan otomatis, middleware untuk deteksi locale, manajemen cookie, dan pengalihan URL.

</Step>

<Step number={2} title="Konfigurasi proyek Anda">

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Locale lain milik Anda
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Step>

<Step number={3} title="Integrasikan Intlayer dalam Konfigurasi Nuxt Anda">

Tambahkan modul intlayer ke konfigurasi Nuxt Anda:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Konfigurasi Nuxt Anda yang sudah ada
  modules: ["nuxt-intlayer"],
});
```

> Modul `nuxt-intlayer` secara otomatis menangani integrasi Intlayer dengan Nuxt. Modul ini mengatur pembuatan deklarasi konten, memantau file dalam mode pengembangan, menyediakan middleware untuk deteksi locale, dan mengelola routing yang dilokalkan.

</Step>

<Step number={4} title="Deklarasikan Konten Anda">

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama termasuk dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk informasi lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

</Step>

<Step number={5} title="Gunakan Intlayer dalam Kode Anda">

Akses kamus konten Anda di seluruh aplikasi Nuxt menggunakan composable `useIntlayer`:

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld");
const countRef = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <p>
    <checkOut />
    <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank"
      >Nuxt</a
    >, <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Mengakses Konten di Intlayer

Intlayer menawarkan berbagai API untuk mengakses konten Anda:

- **Sintaks berbasis komponen** (direkomendasikan):
  Gunakan sintaks `<myContent />`, atau `<Component :is="myContent" />` untuk merender konten sebagai Node Intlayer. Ini terintegrasi dengan mulus dengan [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) dan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

- **Sintaks berbasis string**:  
  Gunakan `{{ myContent }}` untuk merender konten sebagai teks biasa, tanpa dukungan Visual Editor.

- **Sintaks HTML mentah**:  
  Gunakan `<div v-html="myContent" />` untuk merender konten sebagai HTML mentah, tanpa dukungan Visual Editor.

- **Sintaks destrukturisasi**:  
  Composable `useIntlayer` mengembalikan sebuah Proxy dengan konten. Proxy ini dapat didestrukturisasi untuk mengakses konten sambil menjaga reaktivitas.
  - Gunakan `const content = useIntlayer("myContent");` dan `{{ content.myContent }}` / `<content.myContent />`.
  - Atau gunakan `const { myContent } = useIntlayer("myContent");` dan `{{ myContent}}` / `<myContent/>` untuk mendestruktur konten.

</Step>

<Step number={6} title="Ubah bahasa konten Anda" isOptional={true}>

Untuk mengubah bahasa konten Anda, Anda dapat menggunakan fungsi `setLocale` yang disediakan oleh composable `useLocale`. Fungsi ini memungkinkan Anda untuk mengatur locale aplikasi dan memperbarui konten sesuai dengan itu.

Buat komponen untuk beralih antar bahasa menggunakan `NuxtLink`. **Menggunakan tautan daripada tombol untuk pergantian locale adalah praktik terbaik untuk SEO dan keterlihatan halaman**, karena memungkinkan mesin pencari untuk merayapi dan mengindeks semua versi terlokalisasi dari halaman Anda:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt secara otomatis mengimpor useRoute
const route = useRoute();
const { locale, availableLocales, setLocale } = useLocale();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeEl in availableLocales"
      :key="localeEl"
      :to="getLocalizedUrl(route.fullPath, localeEl)"
      class="locale-link"
      :class="{ 'active-locale': localeEl === locale }"
      @click="setLocale(localeEl)"
    >
      {{ getLocaleName(localeEl) }}
    </NuxtLink>
  </nav>
</template>
```

> Menggunakan `NuxtLink` dengan atribut `href` yang tepat (melalui `getLocalizedUrl`) memastikan bahwa mesin pencari dapat menemukan semua varian bahasa dari halaman Anda. Ini lebih disukai dibandingkan dengan pengalihan locale hanya menggunakan JavaScript, yang mungkin tidak diikuti oleh perayap mesin pencari.

Kemudian, atur `app.vue` Anda untuk menggunakan layout:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</Step>

<Step number={7} title="Tambahkan Routing yang Dilokalkan ke aplikasi Anda" isOptional={true}>

Nuxt secara otomatis menangani routing yang dilokalkan saat menggunakan modul `nuxt-intlayer`. Ini membuat rute untuk setiap bahasa secara otomatis berdasarkan struktur direktori halaman Anda.

Contoh:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Untuk membuat halaman yang dilokalkan, cukup buat file Vue Anda di direktori `pages/`. Berikut adalah dua contoh halaman:

**Halaman Beranda (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.raw,
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**Halaman Tentang (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Gunakan .raw untuk akses string primitif
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Gunakan .raw untuk akses string primitif
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Catatan: `useHead` diimpor secara otomatis di Nuxt. Anda dapat mengakses nilai konten menggunakan `.value` (reaktif) atau `.raw` (string primitif) sesuai kebutuhan Anda.

Modul `nuxt-intlayer` secara otomatis akan:

- Mendeteksi locale yang dipilih pengguna
- Menangani pergantian locale melalui URL
- Mengatur atribut `<html lang="">` yang sesuai
- Mengelola cookie locale
- Mengarahkan pengguna ke URL lokal yang sesuai

</Step>

<Step number={8} title="Membuat Komponen Link yang Dilokalkan" isOptional={true}>

Untuk memastikan navigasi aplikasi Anda menghormati locale saat ini, Anda dapat membuat komponen `Links` kustom. Komponen ini secara otomatis menambahkan prefix bahasa saat ini pada URL internal, yang sangat penting untuk **SEO dan keterlihatan halaman**.

```vue fileName="components/Links.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

interface Props {
  href: string;
  locale?: string;
}

const props = defineProps<Props>();

const { locale: currentLocale } = useLocale();

// Hitung path akhir
const finalPath = computed(() => {
  // 1. Periksa apakah link bersifat eksternal
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Jika eksternal, kembalikan apa adanya (NuxtLink menangani pembuatan tag <a>)
  if (isExternal) return props.href;

  // 3. Jika internal, lokalize URL-nya
  const targetLocale = props.locale || currentLocale.value;
  return getLocalizedUrl(props.href, targetLocale);
});
</script>

<template>
  <NuxtLink :to="finalPath" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>
```

Kemudian gunakan komponen ini di seluruh aplikasi Anda:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Beranda</Links>
    <Links href="/about">Tentang</Links>
  </div>
</template>
```

> Dengan menggunakan `NuxtLink` dengan path yang dilokalkan, Anda memastikan bahwa:
>
> - Mesin pencari dapat merayapi dan mengindeks semua versi bahasa dari halaman Anda
> - Pengguna dapat membagikan URL yang dilokalkan secara langsung
> - Riwayat browser berfungsi dengan benar dengan URL yang diawali locale

</Step>

<Step number={9} title="Menangani Metadata dan SEO" isOptional={true}>

Nuxt menyediakan kemampuan SEO yang sangat baik melalui composable `useHead` (diimpor otomatis). Anda dapat menggunakan Intlayer untuk menangani metadata yang dilokalkan menggunakan accessor `.raw` atau `.value` untuk mendapatkan nilai string primitif:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead diimpor otomatis di Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Gunakan .raw untuk akses string primitif
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Gunakan .raw untuk akses string primitif
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Sebagai alternatif, Anda dapat menggunakan fungsi `import { getIntlayer } from "intlayer"` untuk mendapatkan konten tanpa reaktivitas Vue.

> **Mengakses nilai konten:**
>
> - Gunakan `.raw` untuk mendapatkan nilai string primitif (non-reaktif)
> - Gunakan `.value` untuk mendapatkan nilai reaktif
> - Gunakan sintaks komponen `<content.key />` untuk dukungan Visual Editor

Buat deklarasi konten yang sesuai:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "Tentang Kami - Perusahaan Saya",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Pelajari lebih lanjut tentang perusahaan kami dan misi kami",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "Tentang Kami",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "en": "Tentang Kami - Perusahaan Saya",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión",
        "id": "Pelajari lebih lanjut tentang perusahaan kami dan misi kami"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros",
        "id": "Tentang Kami"
      }
    }
  }
}
```

</Step>

<Step number="6b" title="Buat Layout dengan Navigasi" isOptional={true}>

Layout Nuxt memungkinkan Anda mendefinisikan struktur umum untuk halaman Anda. Buat layout default yang mencakup locale switcher dan navigasi:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Beranda</Links>
    <Links href="/about">Tentang</Links>
  </div>
</template>
```

Komponen `Links` (ditunjukkan di bawah) memastikan bahwa tautan navigasi internal secara otomatis dilokalkan.

</Step>

</Steps>

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda menghindari meng-commit file tersebut ke repositori Git Anda.

Untuk melakukannya, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Aksi cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi Nuxt?">

- **`@nuxtjs/i18n`**: modul standar berbasis `vue-i18n`.
- **`Intlayer`**: tree-shaking otomatis, typing TypeScript lengkap, AI terjemahan, visual editor, dan CMS.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle Nuxt saya?">

Jauh lebih sedikit daripada solusi berbasis namespace, karena halaman tidak pernah mengunduh katalog yang tidak di-render. Kompilator build time mengganti panggilan `useIntlayer` dengan entri kamus persis yang digunakan komponen, dan [kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md) membagi sisanya per locale, mengurangi bundle hingga 50%. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md).

</Question>

<Question title="Bisakah saya bermigrasi dari @nuxtjs/i18n atau vue-i18n tanpa menulis ulang komponen saya?">

Ya. Ikuti [panduan migrasi @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_vue-i18n_to_intlayer.md) atau gunakan adapter kompatibilitas.

</Question>

<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan lokal dalam satu file.

</Question>

<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca file Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu. Lihat [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md).

Untuk proses otomatis penuh, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melakukan hal yang sama saat build time dan menghasilkan kamus pada setiap perubahan.

</Question>

<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci `useIntlayer` ke file konten yang mendeklarasikannya, ekstrak konten dari komponen, dan jalankan build, fill, test, push dan pull dari command palette atau tab Intlayer.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: pengalaman yang sama di editor mana pun yang mendukung LSP, dengan go to definition, hover preview dari nilai terjemahan, autocompletion kunci, dan peringatan ketika kunci tidak dideklarasikan. Ini juga menyelesaikan panggilan `i18next`, `react-i18next`, `next-intl` dan `use-intl`.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: aturan `no-raw-text` menandai string hardcoded.

</Question>

<Question title="Apakah Intlayer bekerja dengan server side rendering dan generasi statis di Nuxt?">

Ya. Konten diselesaikan saat SSR dan selama `nuxt generate`, sehingga halaman yang dihasilkan berisi markup terjemahan lengkap.

</Question>

<Question title="Apakah saya harus mencantumkan locale di URL?">

Tidak. `routing.mode` menerima `"prefix-no-default"`, `"prefix-all"`, `"no-prefix"`, dan `"search-params"`.

</Question>

<Question title="Bagaimana cara mengelola metadata SEO dan tag hreflang di Nuxt?">

Langkah 9 membahas hal ini. Metadata `useHead` diambil dari kamus dan `getMultilingualUrls` membuat tag `hreflang` untuk mesin pencari.

</Question>

<Question title="Bagaimana cara membuat pengalih bahasa yang mempertahankan halaman saat ini?">

Gunakan `useLocale` untuk bahasa aktif dan komponen link terlokalisasi dari langkah 8.

</Question>

<Question title="Bagaimana cara menerjemahkan aplikasi Nuxt secara otomatis dengan AI?">

Jalankan `npx intlayer fill`. Alat ini mendeteksi string yang hilang dan mengisinya menggunakan LLM pilihan Anda. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md).

</Question>

<Question title="Apakah Intlayer mendukung bentuk jamak, gender dan rich text di template Vue?">

Ya: [bentuk jamak](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md), [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [penyisipan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md), dan [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md).

</Question>

<Question title="Bagaimana penerjemah dapat mengedit konten tanpa menyentuh kode?">

Melalui [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), yang memungkinkan siapa saja mengedit teks langsung di aplikasi yang berjalan, atau melalui [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), yang memisahkan konten sehingga dapat diubah tanpa perlu redeploy kode.

</Question>

<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, termasuk penggunaan komersial. CMS yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

</Question>

</FAQ>
