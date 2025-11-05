<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Logo Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer : toolkit i18n Open-source yang fleksibel dengan terjemahan bertenaga AI & CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Dokumentasi</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="versi npm" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Bintang GitHub" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="unduhan bulanan" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="lisensi"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="commit terakhir"/>
  </a>
</p>

![Tonton videonya](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Mulai-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Apa itu Intlayer?

Sebagian besar perpustakaan i18n terlalu kompleks, terlalu kaku, atau tidak dibuat untuk framework modern.

Intlayer adalah **solusi i18n modern** untuk aplikasi web dan mobile.  
Ini bersifat framework-agnostik, **ditenagai AI**, dan menyertakan **CMS & editor visual** gratis.

Dengan **file konten per-locale**, **autocompletion TypeScript**, **kamus tree-shakable**, dan **integrasi CI/CD**, Intlayer membuat internasionalisasi menjadi **lebih cepat, lebih bersih, dan lebih cerdas**.

## Manfaat utama Intlayer:

| Fitur                                                                                                                                             | Deskripsi                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Fitur" width="700">                          | **Dukungan Lintas-Framework**<br><br>Intlayer kompatibel dengan semua framework dan pustaka utama, termasuk Next.js, React, Vite, Vue.js, Nuxt, Preact, Express, dan lainnya.                                                                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Fitur" width="700">       | **Manajemen Konten Berbasis JavaScript**<br><br>Manfaatkan fleksibilitas JavaScript untuk mendefinisikan dan mengelola konten Anda secara efisien. <br><br> - [Deklarasi Konten](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Fitur" width="700"> | **File Deklarasi Konten Per-Locale**<br><br>Percepat pengembangan Anda dengan mendeklarasikan konten sekali saja, sebelum auto generation.<br><br> - [File Deklarasi Konten Per-Locale](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Fitur" width="700">                      | **Lingkungan Aman-Tipe**<br><br>Manfaatkan TypeScript untuk memastikan definisi konten dan kode Anda bebas dari kesalahan, sekaligus mendapatkan keuntungan dari autocompletion IDE.<br><br> - [Konfigurasi TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Fitur" width="700">                         | **Pengaturan yang Disederhanakan**<br><br>Mulai dengan cepat menggunakan konfigurasi minimal. Sesuaikan pengaturan untuk internasionalisasi, routing, AI, build, dan penanganan konten dengan mudah.<br><br> - [Jelajahi integrasi Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Fitur" width="700">                   | **Pengambilan Konten yang Disederhanakan**<br><br>Tidak perlu memanggil fungsi `t` Anda untuk setiap potongan konten. Ambil semua konten Anda langsung menggunakan satu hook.<br><br> - [Integrasi React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Fitur" width="700">                    | **Implementasi Komponen Server yang Konsisten**<br><br>Sangat cocok untuk komponen server Next.js, gunakan implementasi yang sama untuk komponen klien dan server, tidak perlu meneruskan fungsi `t` Anda ke setiap komponen server. <br><br> - [Komponen Server](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Fitur" width="700">                           | **Codebase yang Terorganisir**<br><br>Jaga agar codebase Anda lebih terorganisir: 1 komponen = 1 kamus dalam folder yang sama. Terjemahan dekat dengan komponen masing-masing, meningkatkan pemeliharaan dan kejelasan. <br><br> - [Cara Kerja Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Fitur" width="700">                         | **Routing yang Ditingkatkan**<br><br>Dukungan penuh untuk routing aplikasi, menyesuaikan dengan mulus pada struktur aplikasi yang kompleks, untuk Next.js, React, Vite, Vue.js, dll.<br><br> - [Jelajahi integrasi Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Fitur" width="700">                            | **Dukungan Markdown**<br><br>Impor dan interpretasi, file locale dan Markdown jarak jauh untuk konten multibahasa seperti kebijakan privasi, dokumentasi, dll. Interpretasikan dan buat metadata Markdown dapat diakses dalam kode Anda.<br><br> - [File konten](https://intlayer.org/doc/concept/content/file)                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Fitur" width="700">                       | **Editor Visual & CMS Gratis**<br><br>Editor visual dan CMS gratis tersedia untuk penulis konten, menghilangkan kebutuhan akan platform lokalisasi. Jaga konten Anda tetap sinkron menggunakan Git, atau eksternalisasi secara total atau sebagian dengan CMS.<br><br> - [Editor Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Fitur" width="700">                              | **Konten Tree-shakable**<br><br>Konten tree-shakable, mengurangi ukuran bundle akhir. Memuat konten per komponen, mengecualikan konten yang tidak digunakan dari bundle Anda. Mendukung lazy loading untuk meningkatkan efisiensi pemuatan aplikasi. <br><br> - [Optimasi build aplikasi](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Fitur" width="700">                    | **Rendering Statis**<br><br>Tidak menghalangi Rendering Statis. <br><br> - [Integrasi Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Fitur" width="700">                      | **Terjemahan Berbasis AI**<br><br>Ubah situs web Anda ke dalam 231 bahasa hanya dengan satu klik menggunakan alat terjemahan canggih berbasis AI dari Intlayer dengan menggunakan penyedia AI / kunci API Anda sendiri. <br><br> - [Integrasi CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Pengisian otomatis](https://intlayer.org/doc/concept/auto-fill) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Fitur" width="700">                                 | **Integrasi Server MCP**<br><br>Menyediakan server MCP (Model Context Protocol) untuk otomatisasi IDE, memungkinkan manajemen konten dan alur kerja i18n yang mulus langsung di dalam lingkungan pengembangan Anda. <br><br> - [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Fitur" width="700">                    | **Ekstensi VSCode**<br><br>Intlayer menyediakan ekstensi VSCode untuk membantu Anda mengelola konten dan terjemahan Anda, membangun kamus Anda, menerjemahkan konten Anda, dan lainnya. <br><br> - [Ekstensi VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Fitur" width="700">                    | **Interoperabilitas**<br><br>Memungkinkan interoperabilitas dengan react-i18next, next-i18next, next-intl, dan react-intl. <br><br> - [Intlayer dan react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer dan next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer dan next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                  |

---

## 📦 Instalasi

Mulailah perjalanan Anda dengan Intlayer hari ini dan rasakan pendekatan internasionalisasi yang lebih lancar dan lebih kuat.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Mulai Cepat (Next.js)

```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Dapatkan panduan lengkap → </a>

## 🎥 Tutorial langsung di YouTube

[![Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Daftar Isi

Jelajahi dokumentasi lengkap kami untuk memulai dengan Intlayer dan pelajari cara mengintegrasikannya ke dalam proyek Anda.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Memulai</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Mengapa Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc">Pendahuluan</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Konsep</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Cara Kerja Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Konfigurasi</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">Penyedia AI</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Intlayer Editor</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Kamus</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">File Deklarasi Konten Per-Locale</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Terjemahan</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Enumerasi</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Kondisi</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">Nesting</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Pengambilan Fungsi</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Penyisipan</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">File</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Lingkungan</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Intlayer dengan Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Mulai Tanstack</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">Angular</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">Express</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest">NestJS</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/what_is_internationalization.md">Apa itu i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n dan SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer dan i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer dan react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer dan next-intl</a></li>
</ul>
</details>

## 🌐 Readme dalam bahasa lain

[English](https://github.com/aymericzip/intlayer/blob/main/readme.md) •
[简体中文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) •
[Русский](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) •
[日本語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) •
[Français](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) •
[한국어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) •
[Español](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) •
[Deutsch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) •
[العربية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) •
[Italiano](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) •
[English (UK)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md) •
[Português](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) •
[हिन्दी](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)
[Türkçe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md)

## 🤝 Komunitas

Intlayer dibangun bersama dan untuk komunitas dan kami sangat menghargai masukan Anda!

- Punya saran? [Buka sebuah issue](https://github.com/aymericzip/intlayer/issues)
- Menemukan bug atau perbaikan? [Kirim PR](https://github.com/aymericzip/intlayer/pulls)
- Butuh bantuan atau ingin terhubung? [Bergabung dengan Discord kami](https://discord.gg/7uxamYVeCk)

Anda juga dapat mengikuti kami di:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Kontribusi

Untuk panduan lebih rinci tentang kontribusi pada proyek ini, silakan merujuk ke file [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). File tersebut berisi informasi penting mengenai proses pengembangan kami, konvensi pesan commit, dan prosedur rilis. Kontribusi Anda sangat berharga bagi kami, dan kami menghargai upaya Anda dalam membuat proyek ini menjadi lebih baik!

### Terima Kasih atas Dukungan Anda

Jika Anda menyukai Intlayer, berikan kami ⭐ di GitHub. Ini membantu orang lain menemukan proyek ini!

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
