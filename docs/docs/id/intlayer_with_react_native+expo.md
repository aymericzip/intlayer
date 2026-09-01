---
createdAt: 2025-06-18
updatedAt: 2026-06-25
title: "Expo + React Native i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi Expo + React Native multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Impor provider dan hook langsung dari react-native-intlayer; react-intlayer tidak lagi diperlukan sebagai dependensi langsung"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Tambahkan perintah init"
  - version: 6.1.6
    date: 2025-10-02
    changes: "Menambahkan bagian debug"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Terjemahkan aplikasi Expo dan React Native Anda | Internasionalisasi (i18n)

<Tabs defaultTab="code">
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Daftar Isi

<TOC/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `react-native-localize` atau `i18next`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>
<Accordion header="Cakupan React Native Penuh">

Intlayer dioptimalkan agar berfungsi sempurna dengan React Native dan Expo dengan menawarkan **pelingkupan konten tingkat komponen**, **dukungan TypeScript**, dan semua fitur yang diperlukan untuk penskalaan internasionalisasi (i18n) di aplikasi seluler.

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

<Accordion header="Ukuran bundle">

Daripada memuat file JSON berukuran besar ke halaman Anda, muat saja konten yang diperlukan. Intlayer membantu **mengurangi paket dan ukuran tampilan hingga 50%**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="Instal Dependensi">

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-react-native-template) di GitHub.

Dari proyek React Native Anda, instal paket berikut:

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

> Flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Contohnya:

```bash packageManager="npm"
npm install intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-native-intlayer
```

### Paket

- **intlayer**  
  Toolkit inti i18n untuk konfigurasi, konten kamus, generasi tipe, dan perintah CLI.

- **react-native-intlayer**  
  Integrasi React Native yang menyediakan context providers dan React hooks yang akan Anda gunakan untuk mendapatkan dan mengganti locale, polyfill React Native, serta plugin Metro untuk mengintegrasikan Intlayer dengan bundler React Native. Paket ini mengekspor ulang semua hal dari `react-intlayer`, sehingga Anda hanya memerlukan satu paket ini dalam aplikasi React Native.

</Step>

<Step number={2} title="Buat Konfigurasi Intlayer">

Di root proyek Anda (atau di mana saja yang nyaman), buat file **konfigurasi Intlayer**. File tersebut mungkin terlihat seperti ini:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * Jika tipe Locales tidak tersedia, coba atur moduleResolution ke "bundler" di tsconfig.json Anda
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Tambahkan locale lain yang Anda butuhkan
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Dalam konfigurasi ini, Anda dapat:

- Mengonfigurasi **daftar locale yang didukung**.
- Menetapkan locale **default**.
- Nanti, Anda dapat menambahkan opsi yang lebih canggih (misalnya, log, direktori konten khusus, dll.).
- Lihat [dokumentasi konfigurasi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) untuk informasi lebih lanjut.

</Step>

<Step number={3} title="Tambahkan plugin Metro">

Metro adalah bundler untuk React Native. Ini adalah bundler default untuk proyek React Native yang dibuat dengan perintah `react-native init`. Untuk menggunakan Intlayer dengan Metro, Anda perlu menambahkan plugin ke file `metro.config.js` Anda:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Catatan: `configMetroIntlayer` adalah fungsi promise. Gunakan `configMetroIntlayerSync` jika Anda ingin menggunakannya secara sinkron, atau hindari IFFE (Immediately Invoked Function Expression).
> Catatan: `configMetroIntlayerSync` tidak memungkinkan untuk membangun kamus intlayer saat server mulai

</Step>

<Step number={4} title="Tambahkan provider Intlayer">

Untuk menjaga sinkronisasi bahasa pengguna di seluruh aplikasi Anda, Anda perlu membungkus komponen root Anda dengan komponen `IntlayerProvider` dari `react-native-intlayer`.

> Selalu impor dari `react-native-intlayer`. `IntlayerProvider`-nya mencakup polyfill untuk API web yang digunakan oleh Intlayer, dan paket ini mengekspor ulang semua hook serta utilitas dari `react-intlayer`.

Selain itu, Anda perlu menambahkan fungsi `intlayerPolyfill` ke file `index.js` Anda untuk memastikan Intlayer dapat bekerja dengan baik.

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
```

</Step>

<Step number={5} title="Deklarasikan Konten Anda">

Buat file **deklarasi konten** di mana saja dalam proyek Anda (biasanya di dalam `src/`), menggunakan salah satu format ekstensi yang didukung Intlayer:

- `.content.json`
- `.content.jsonc`
- `.content.json5`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`
- dll.

> **Expo Router (web): jauhkan file `.content.*` dari direktori `app/`.** Expo Router memperlakukan setiap file JavaScript/TypeScript di dalam `app/` sebagai rute. Di web, penemuan rutenya memindai sistem file secara langsung dan **tidak** menghormati `resolver.blockList` Metro, sehingga `*.content.ts` yang ditempatkan bersama terdaftar sebagai rute. File seperti `app/(tabs)/_layout.content.ts` bahkan diuraikan sebagai tata letak (bagian `.content` dibaca sebagai sufiks platform), yang bertabrakan dengan `_layout.tsx` asli dan menampilkan:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> Tempatkan deklarasi Anda di direktori di luar `app/` (misalnya `content/` atau `src/content/`). Intlayer menemukan file `.content.*` di mana saja dalam proyek dan kamus direferensikan oleh `key` mereka, jadi tidak diperlukan perubahan impor. Pada aplikasi native ini tidak diperlukan (`blockList` Metro sudah menyembunyikannya), tetapi menggunakan direktori selain `app/` membuat kedua platform tetap berfungsi.

Contoh (TypeScript dengan node TSX untuk React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Kamus konten untuk domain "app" kami
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> Untuk detail tentang deklarasi konten, lihat [dokumentasi konten Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

</Step>

<Step number={6} title="Gunakan Intlayer di Komponen Anda">

Gunakan hook `useIntlayer` di komponen anak untuk mendapatkan konten yang sudah dilokalisasi.

### Contoh

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-native-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> Saat menggunakan `content.someKey` dalam properti berbasis string (misalnya, `title` pada tombol atau `children` pada komponen `Text`), **panggil `content.someKey.value`** untuk mendapatkan string yang sebenarnya.

> Jika aplikasi Anda sudah ada, Anda dapat menggunakan [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) secara kombinasi dengan [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk mengonversi ribuan komponen dalam satu detik.

</Step>

<Step number={7} title="Ubah Locale Aplikasi" isOptional={true}>

Untuk mengganti locale dari dalam komponen Anda, Anda dapat menggunakan metode `setLocale` dari hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-native-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

Ini memicu re-render semua komponen yang menggunakan konten Intlayer, yang sekarang menampilkan terjemahan untuk locale baru.

> Lihat [`useLocale` docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md) untuk detail lebih lanjut.

</Step>

</Steps>

## Konfigurasi TypeScript (jika Anda menggunakan TypeScript)

Intlayer menghasilkan definisi tipe dalam folder tersembunyi (secara default `.intlayer`) untuk meningkatkan autocompletion dan menangkap kesalahan terjemahan:

```json5
// tsconfig.json
{
  // ... konfigurasi TS Anda yang sudah ada
  "include": [
    "src", // kode sumber Anda
    ".intlayer/types/**/*.ts", // <-- pastikan tipe yang dihasilkan otomatis disertakan
    // ... apapun yang sudah Anda sertakan
  ],
}
```

Ini yang mengaktifkan fitur seperti:

- **Autocompletion** untuk kunci kamus Anda.
- **Pemeriksaan tipe** yang memberi peringatan jika Anda mengakses kunci yang tidak ada atau tipe yang tidak cocok.

---

## Konfigurasi Git

Untuk menghindari commit file yang dihasilkan otomatis oleh Intlayer, tambahkan berikut ini ke `.gitignore` Anda:

```bash
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

---

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten terjemahan.
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

## Melangkah Lebih Jauh

- **Visual Editor**: Gunakan [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) untuk mengelola terjemahan secara visual.
- **Integrasi CMS**: Anda juga dapat mengeksternalisasi dan mengambil konten kamus Anda dari sebuah [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).
- **Perintah CLI**: Jelajahi [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk tugas seperti **mengekstrak terjemahan** atau **memeriksa kunci yang hilang**.

Nikmati membangun aplikasi **React Native** Anda dengan i18n yang sepenuhnya didukung melalui **Intlayer**!

---

### Debug

React Native bisa kurang stabil dibandingkan React Web, jadi perhatikan keselarasan versi dengan ekstra.

Intlayer terutama menargetkan Web Intl API; pada React Native Anda harus menyertakan polyfill yang sesuai.

Daftar periksa:

- Gunakan versi terbaru dari `intlayer` dan `react-native-intlayer`.
- Aktifkan polyfill Intlayer.
- Jika Anda menggunakan `getLocaleName` atau utilitas lain berbasis Intl-API, impor polyfill ini lebih awal (misalnya di `index.js` atau `App.tsx`):

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- Periksa konfigurasi Metro Anda (alias resolver, plugin aset, jalur `tsconfig`) jika modul gagal di-resolve.

---

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi React Native atau Expo?">

- **`i18n-js`** bersama `expo-localization`: objek sederhana tanpa typing statis.
- **`react-i18next`**: library umum dengan pemuatan namespace ke memori.
- **`Intlayer`**: plugin Metro untuk optimasi build time, typing TypeScript lengkap, terjemahan AI, dan performa tinggi pada perangkat mobile.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle React Native saya?">

Jauh lebih sedikit daripada solusi berbasis namespace, karena halaman tidak pernah mengunduh katalog yang tidak di-render. Kompilator build time mengganti panggilan `useIntlayer` dengan entri kamus persis yang digunakan komponen, dan [kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md) membagi sisanya per locale, mengurangi bundle hingga 50%. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md).

</Question>

<Question title="Bisakah saya bermigrasi dari i18n-js atau react-i18next tanpa menulis ulang komponen saya?">

Ya. Ikuti [panduan migrasi react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_react-i18next_to_intlayer.md) atau gunakan adapter kompatibilitas.

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

<Question title="Apakah Intlayer bekerja dengan Expo dan bundler Metro?">

Ya. Langkah 3 menambahkan plugin Metro; saat disimpan, tipe diperbarui seketika untuk mendukung Fast Refresh.

</Question>

<Question title="Bagaimana cara mendeteksi bahasa perangkat?">

Baca melalui `expo-localization` dan teruskan ke provider Intlayer sebagai locale awal, simpan pilihan pengguna di `AsyncStorage`.

</Question>

<Question title="Bagaimana cara mengubah bahasa aplikasi saat runtime?">

Langkah 7 membahas hal ini. Hook `useLocale` menyediakan locale aktif, daftar bahasa, dan setter; komponen me-render ulang tanpa restart aplikasi.

</Question>

<Question title="Bagaimana cara mendukung bahasa dari kanan ke kiri seperti Arab atau Ibrani?">

Periksa arah teks via `getHTMLTextDir` dan terapkan melalui modul `I18nManager` di React Native.

</Question>

<Question title="Bagaimana cara menerjemahkan aplikasi secara otomatis dengan AI?">

Jalankan `npx intlayer fill`. Perintah ini mengisi terjemahan yang hilang menggunakan LLM pilihan Anda dengan provider dan API key Anda sendiri, dan `--git-diff` membatasi proses ke file yang diubah. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

</Question>

<Question title="Apakah Intlayer mendukung bentuk jamak, gender dan rich text?">

Ya: [bentuk jamak (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md), [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [penyisipan (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md), dan [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md) untuk angka, tanggal, dan mata uang.

</Question>

<Question title="Bagaimana penerjemah dapat mengedit konten tanpa menyentuh kode?">

Melalui [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), yang memungkinkan siapa saja mengedit teks langsung di aplikasi yang berjalan, atau melalui [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), yang memisahkan konten sehingga dapat diubah tanpa perlu redeploy kode.

</Question>

<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, termasuk penggunaan komersial. CMS yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

</Question>

</FAQ>
