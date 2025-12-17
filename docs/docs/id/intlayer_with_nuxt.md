---
createdAt: 2025-06-18
updatedAt: 2025-12-07
title: Cara Menerjemahkan Aplikasi Nuxt dan Vue Anda – Panduan i18n 2025
description: Temukan cara membuat situs web Nuxt dan Vue Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
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
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 7.3.11
    date: 2025-12-07
    changes: Memperbarui LocaleSwitcher, SEO, metadata
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahkan situs web Nuxt dan Vue Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah pustaka internasionalisasi (i18n) sumber terbuka yang inovatif, dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata**, rute, dan konten secara dinamis.
- **Menjamin dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan autocompletion dan deteksi kesalahan.
- **Memanfaatkan fitur canggih**, seperti deteksi dan pengalihan locale secara dinamis.

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer di Aplikasi Nuxt

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Cara menerjemahkan aplikasi Nuxt dan Vue Anda menggunakan Intlayer? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Kode" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-nuxt-4-template) di GitHub.

### Langkah 1: Pasang Dependensi

Pasang paket yang diperlukan menggunakan npm:

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

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpile, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **vue-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi Vue. Ini adalah composables untuk komponen Vue.

- **nuxt-intlayer**
  Modul Nuxt yang mengintegrasikan Intlayer dengan aplikasi Nuxt. Modul ini menyediakan pengaturan otomatis, middleware untuk deteksi locale, manajemen cookie, dan pengalihan URL.

### Langkah 2: Konfigurasi proyek Anda

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi Nuxt Anda

Tambahkan modul intlayer ke konfigurasi Nuxt Anda:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Konfigurasi Nuxt Anda yang sudah ada
  modules: ["nuxt-intlayer"],
});
```

> Modul `nuxt-intlayer` secara otomatis menangani integrasi Intlayer dengan Nuxt. Modul ini mengatur pembuatan deklarasi konten, memantau file dalam mode pengembangan, menyediakan middleware untuk deteksi locale, dan mengelola routing yang dilokalkan.

### Langkah 4: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat="typescript"
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

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama termasuk dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Untuk informasi lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 5: Gunakan Intlayer dalam Kode Anda

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

### (Opsional) Langkah 6: Ubah bahasa konten Anda

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

### (Opsional) Langkah 6b: Buat Layout dengan Navigasi

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

### (Opsional) Langkah 7: Tambahkan Routing yang Dilokalkan ke aplikasi Anda

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
  title: content.metaTitle.value,
  meta: [
    {
      name: "description",
      content: content.metaDescription.value,
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

### (Opsional) Langkah 8: Membuat Komponen Link yang Dilokalkan

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

### (Opsional) Langkah 9: Menangani Metadata dan SEO

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

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="pages/about-page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default aboutPageContent;
```

```javascript fileName="pages/about-page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = aboutPageContent;
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
