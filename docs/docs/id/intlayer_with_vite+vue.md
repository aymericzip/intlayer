---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Cara menerjemahkan aplikasi Vite dan Vue Anda – panduan i18n 2025
description: Temukan cara membuat situs web Vite dan Vue Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vue-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahkan situs web Vite dan Vue Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah pustaka internasionalisasi (i18n) open-source yang inovatif, dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata**, rute, dan konten secara dinamis.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan autocompletion dan deteksi kesalahan.
- **Memanfaatkan fitur canggih**, seperti deteksi dan pergantian locale secara dinamis.

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dalam Aplikasi Vite dan Vue

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-vue-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-vite-vue-template) di GitHub.

### Langkah 1: Instalasi Dependensi

Instal paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpile, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).

- **vue-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi Vue. Paket ini menyediakan context providers dan composables untuk internasionalisasi Vue.

- **vite-intlayer**
  Termasuk plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi locale yang dipilih pengguna, mengelola cookie, dan menangani pengalihan URL.

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
      // Bahasa lain milik Anda
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Bahasa lain milik Anda
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
      // Bahasa lain milik Anda
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi Vite Anda

Tambahkan plugin intlayer ke dalam konfigurasi Anda.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer()],
});
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Plugin ini memastikan pembuatan file deklarasi konten dan memantau file tersebut dalam mode pengembangan. Plugin ini juga mendefinisikan variabel lingkungan Intlayer dalam aplikasi Vite. Selain itu, plugin ini menyediakan alias untuk mengoptimalkan performa.

### Langkah 4: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      en: "Check out ",
      id: "Periksa ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      en: ", the official Vue + Vite starter",
      id: ", starter resmi Vue + Vite",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      id: "Pelajari lebih lanjut tentang Dukungan IDE untuk Vue di ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      id: "Panduan Peningkatan Skala Dokumentasi Vue",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      id: "Klik pada logo Vite dan Vue untuk mempelajari lebih lanjut",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      en: "count is ",
      id: "jumlah adalah ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      id: "Edit <code>components/HelloWorld.vue</code> dan simpan untuk menguji HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      en: "Check out ",
      id: "Periksa ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      id: "starter resmi Vue + Vite",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      id: "Pelajari lebih lanjut tentang Dukungan IDE untuk Vue di ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      id: "Panduan Scaling up Vue Docs",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      id: "Klik logo Vite dan Vue untuk mempelajari lebih lanjut",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", id: "jumlah adalah ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      id: "Edit <code>components/HelloWorld.vue</code> dan simpan untuk menguji HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", id: "Periksa ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      id: "starter resmi Vue + Vite",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      id: "Pelajari lebih lanjut tentang Dukungan IDE untuk Vue di ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      id: "Panduan Scaling up Vue Docs",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      id: "Klik pada logo Vite dan Vue untuk mempelajari lebih lanjut",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "id": "jumlah adalah ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "id": "Edit <code>components/HelloWorld.vue</code> dan simpan untuk menguji HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "en": "Check out ",
        "fr": "Vérifiez ",
        "id": "Periksa ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "id": "starter resmi Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "id": "Pelajari lebih lanjut tentang Dukungan IDE untuk Vue di ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "id": "Panduan Skalabilitas Dokumen Vue",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "id": "Klik pada logo Vite dan Vue untuk mempelajari lebih lanjut",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama sudah dimasukkan ke dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 5: Gunakan Intlayer dalam Kode Anda

Untuk memanfaatkan fitur internasionalisasi Intlayer di seluruh aplikasi Vue Anda, pertama-tama Anda perlu mendaftarkan instance singleton Intlayer di file utama Anda. Langkah ini sangat penting karena menyediakan konteks internasionalisasi ke semua komponen dalam aplikasi Anda, sehingga terjemahan dapat diakses di mana saja dalam pohon komponen Anda.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Menyuntikkan provider di tingkat atas
installIntlayer(app);

// Memasang aplikasi
app.mount("#app");
```

Akses kamus konten Anda di seluruh aplikasi dengan membuat komponen Vue utama dan menggunakan composable `useIntlayer`:

```vue fileName="src/HelloWord.vue"
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
  officialStarter,
  learnMore,
  vueDocs,
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
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, <officialStarter />
  </p>
  <p>
    <learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Mengakses Konten di Intlayer

Intlayer menawarkan berbagai API untuk mengakses konten Anda:

- **Sintaks berbasis Komponen** (direkomendasikan):
  Gunakan sintaks `<myContent />`, atau `<Component :is="myContent" />` untuk merender konten sebagai Node Intlayer. Ini terintegrasi dengan mulus dengan [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) dan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

- **Sintaks berbasis String**:
  Gunakan `{{ myContent }}` untuk merender konten sebagai teks biasa, tanpa dukungan Visual Editor.

- **Sintaks HTML mentah**:
  Gunakan `<div v-html="myContent" />` untuk merender konten sebagai HTML mentah, tanpa dukungan Visual Editor.

- **Sintaks destrukturisasi**:  
  Composable `useIntlayer` mengembalikan sebuah Proxy dengan konten. Proxy ini dapat didestrukturisasi untuk mengakses konten sambil mempertahankan reaktivitas.
  - Gunakan `const content = useIntlayer("myContent");` dan `{{ content.myContent }}` / `<content.myContent />`.
  - Atau gunakan `const { myContent } = useIntlayer("myContent");` dan `{{ myContent }}` / `<myContent/>` untuk mendestrukturisasi konten.

### (Opsional) Langkah 6: Ubah bahasa konten Anda

Untuk mengubah bahasa konten Anda, Anda dapat menggunakan fungsi `setLocale` yang disediakan oleh composable `useLocale`. Fungsi ini memungkinkan Anda untuk mengatur locale aplikasi dan memperbarui konten sesuai dengan locale tersebut.

Buat sebuah komponen untuk beralih antar bahasa:

```vue fileName="src/components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getLocaleName } from "intlayer";
import { useLocale } from "vue-intlayer";

// Mendapatkan informasi locale dan fungsi setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Melacak locale yang dipilih dengan ref
const selectedLocale = ref(locale.value);

// Memperbarui locale saat pilihan berubah
const changeLocale = () => setLocale(selectedLocale.value);

// Menjaga selectedLocale agar tetap sinkron dengan locale global
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Kemudian, gunakan komponen ini di App.vue Anda:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Buat file deklarasi intlayer terkait
</script>

<template>
  <div>
    <LocaleSwitcher />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="content.viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" :alt="content.vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="content.title" />
</template>
```

### (Opsional) Langkah 7: Tambahkan Routing yang Dilokalkan ke aplikasi Anda

Menambahkan routing yang dilokalkan dalam aplikasi Vue biasanya melibatkan penggunaan Vue Router dengan prefix locale. Ini membuat rute unik untuk setiap bahasa, yang berguna untuk SEO dan URL yang ramah SEO.

Contoh:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Pertama, instal Vue Router:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

Lalu, buat konfigurasi router yang menangani routing berbasis locale:

```js fileName="src/router/index.ts"
import {
  configuration,
  getPathWithoutLocale,
  localeFlatMap,
  type Locales,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

// Mendapatkan konfigurasi internasionalisasi
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Mendeklarasikan routes dengan path dan metadata spesifik locale.
 */
const routes = localeFlatMap((localizedData) => [
  {
    path: `${localizedData.urlPrefix}/`,
    name: `Root-${localizedData.locale}`,
    component: RootView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: `${localizedData.urlPrefix}/home`,
    name: `Home-${localizedData.locale}`,
    component: HomeView,
    meta: {
      locale: localizedData.locale,
    },
  },
]);

// Buat instance router
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Tambahkan guard navigasi untuk penanganan locale
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Gunakan kembali locale yang didefinisikan di meta route
    client.setLocale(metaLocale);
    next();
  } else {
    // Cadangan: tidak ada locale di meta, kemungkinan route tidak cocok
    // Opsional: tangani 404 atau redirect ke locale default
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> Nama digunakan untuk mengidentifikasi route dalam router. Nama ini harus unik di seluruh route untuk menghindari konflik dan memastikan navigasi serta linking yang tepat.

Kemudian, daftarkan router di file main.js Anda:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Tambahkan router ke aplikasi
app.use(router);

// Pasang aplikasi
app.mount("#app");
```

Kemudian perbarui file `App.vue` Anda untuk merender komponen RouterView. Komponen ini akan menampilkan komponen yang cocok untuk rute saat ini.

```vue fileName="src/App.vue"
<script setup lang="ts">
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
</script>

<template>
  <nav>
    <LocaleSwitcher />
  </nav>
  <RouterView />
</template>
```

Secara paralel, Anda juga dapat menggunakan `intlayerProxy` untuk menambahkan routing sisi server ke aplikasi Anda. Plugin ini secara otomatis akan mendeteksi locale saat ini berdasarkan URL dan mengatur cookie locale yang sesuai. Jika tidak ada locale yang ditentukan, plugin akan menentukan locale yang paling tepat berdasarkan preferensi bahasa browser pengguna. Jika tidak ada locale yang terdeteksi, maka akan mengarahkan ulang ke locale default.

> Perlu dicatat bahwa untuk menggunakan `intlayerProxy` dalam produksi, Anda perlu memindahkan paket `vite-intlayer` dari `devDependencies` ke `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

### (Opsional) Langkah 8: Ubah URL saat locale berubah

Untuk secara otomatis memperbarui URL ketika pengguna mengganti bahasa, Anda dapat memodifikasi komponen `LocaleSwitcher` untuk menggunakan Vue Router:

```vue fileName="src/components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Mendapatkan Vue Router
const router = useRouter();

// Mendapatkan informasi locale dan fungsi setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Mendapatkan rute saat ini dan membuat URL yang dilokalkan
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Navigasi ke rute yang dilokalkan tanpa memuat ulang halaman
    router.push(localizedPath);
  },
});

// Melacak locale yang dipilih dengan ref
const selectedLocale = ref(locale.value);

// Memperbarui locale saat pilihan berubah
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Menjaga selectedLocale tetap sinkron dengan locale global
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Tip: Untuk SEO dan aksesibilitas yang lebih baik, gunakan tag seperti `<a href="/fr/home" hreflang="fr">` untuk menautkan ke halaman yang dilokalkan, seperti yang ditunjukkan pada Langkah 10. Ini memungkinkan mesin pencari menemukan dan mengindeks URL spesifik bahasa dengan benar. Untuk mempertahankan perilaku SPA, Anda dapat mencegah navigasi default dengan @click.prevent, mengubah locale menggunakan useLocale, dan menavigasi secara programatik menggunakan Vue Router.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Beralih ke Bahasa Inggris"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>Bahasa Inggris</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Beralih ke Bahasa Spanyol"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>Bahasa Spanyol</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Opsional) Langkah 9: Ganti Atribut Bahasa dan Arah pada Tag HTML

Ketika aplikasi Anda mendukung beberapa bahasa, sangat penting untuk memperbarui atribut `lang` dan `dir` pada tag `<html>` agar sesuai dengan locale saat ini. Melakukan hal ini memastikan:

- **Aksesibilitas**: Pembaca layar dan teknologi bantu bergantung pada atribut `lang` yang benar untuk mengucapkan dan menginterpretasikan konten dengan akurat.
- **Perenderan Teks**: Atribut `dir` (arah) memastikan teks dirender dalam urutan yang tepat (misalnya, kiri-ke-kanan untuk bahasa Inggris, kanan-ke-kiri untuk bahasa Arab atau Ibrani), yang sangat penting untuk keterbacaan.
- **SEO**: Mesin pencari menggunakan atribut `lang` untuk menentukan bahasa halaman Anda, membantu menyajikan konten lokal yang tepat dalam hasil pencarian.

Dengan memperbarui atribut ini secara dinamis saat locale berubah, Anda menjamin pengalaman yang konsisten dan dapat diakses bagi pengguna di semua bahasa yang didukung.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable yang memperbarui atribut `lang` dan `dir` elemen HTML <html>
 * berdasarkan locale saat ini.
 *
 * @example
 * // Di App.vue Anda atau komponen global
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Memperbarui atribut HTML setiap kali locale berubah
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Perbarui atribut bahasa
      document.documentElement.lang = newLocale;

      // Atur arah teks (ltr untuk sebagian besar bahasa, rtl untuk Arab, Ibrani, dll.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

Gunakan composable ini di `App.vue` Anda atau komponen global:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Terapkan atribut HTML berdasarkan locale saat ini
useI18nHTMLAttributes();
</script>

<template>
  <!-- Template aplikasi Anda -->
</template>
```

### (Opsional) Langkah 10: Membuat Komponen Link yang Dilokalkan

Untuk memastikan navigasi aplikasi Anda menghormati locale saat ini, Anda dapat membuat komponen `Link` kustom. Komponen ini secara otomatis menambahkan prefix bahasa saat ini pada URL internal, sehingga. Misalnya, ketika pengguna berbahasa Prancis mengklik tautan ke halaman "About", mereka akan diarahkan ke `/fr/about` alih-alih `/about`.

Perilaku ini berguna untuk beberapa alasan:

- **SEO dan Pengalaman Pengguna**: URL yang dilokalkan membantu mesin pencari mengindeks halaman spesifik bahasa dengan benar dan menyediakan konten kepada pengguna dalam bahasa pilihan mereka.
- **Konsistensi**: Dengan menggunakan tautan yang dilokalkan di seluruh aplikasi Anda, Anda menjamin navigasi tetap dalam locale saat ini, mencegah perubahan bahasa yang tidak diinginkan.
- **Maintainability**: Memusatkan logika lokalisasi dalam satu komponen menyederhanakan pengelolaan URL, sehingga codebase Anda lebih mudah dipelihara dan dikembangkan seiring pertumbuhan aplikasi Anda.

```vue fileName="src/components/Link.vue"
<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Periksa apakah link bersifat eksternal
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Buat href yang dilokalisasi untuk link internal
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Untuk digunakan dengan Vue Router, buat versi khusus router:

```vue fileName="src/components/RouterLink.vue"
<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// Membuat properti to yang sudah dilokalkan untuk router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Jika 'to' adalah objek, lokalisa properti path
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

Gunakan komponen-komponen ini dalam aplikasi Anda:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router  -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- Lainnya -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### (Opsional) Langkah 11: Render Markdown

Intlayer mendukung rendering konten Markdown langsung di aplikasi Vue Anda. Secara default, Markdown diperlakukan sebagai teks biasa. Untuk mengubah Markdown menjadi HTML kaya, Anda dapat mengintegrasikan [markdown-it](https://github.com/markdown-it/markdown-it), sebuah parser Markdown.

Ini sangat berguna ketika terjemahan Anda mencakup konten yang diformat seperti daftar, tautan, atau penekanan.

Secara default Intlayer merender markdown sebagai string. Namun Intlayer juga menyediakan cara untuk merender markdown menjadi HTML menggunakan fungsi `installIntlayerMarkdown`.

> Untuk melihat cara mendeklarasikan konten markdown menggunakan paket `intlayer`, lihat [dokumen markdown](https://github.com/aymericzip/intlayer/tree/main/docs/id/dictionary/markdown.md).

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // mengizinkan tag HTML
  linkify: true, // otomatis membuat tautan URL
  typographer: true, // mengaktifkan tanda kutip pintar, tanda hubung, dll.
});

// Beritahu Intlayer untuk menggunakan md.render() setiap kali perlu mengubah markdown menjadi HTML
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

Setelah terdaftar, Anda dapat menggunakan sintaks berbasis komponen untuk menampilkan konten Markdown secara langsung:

```vue
<template>
  <div>
    <myMarkdownContent />
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myMarkdownContent } = useIntlayer("my-component");
</script>
```

### Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk mendapatkan manfaat dari TypeScript dan membuat codebase Anda lebih kuat.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Kesalahan Terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dihasilkan secara otomatis.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

### Konfigurasi Git

Disarankan untuk mengabaikan file-file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari meng-commit file tersebut ke repository Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke dalam file `.gitignore` Anda:

```plaintext
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi Intlayer VS Code** resmi.

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan secara real-time** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten terjemahan.
- **Aksi cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk informasi lebih lanjut tentang cara menggunakan ekstensi ini, lihat dokumentasi [Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

---
