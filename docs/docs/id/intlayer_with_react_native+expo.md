---
createdAt: 2025-06-18
updatedAt: 2025-12-30
title: Cara menerjemahkan aplikasi React Native dan Expo Anda – panduan i18n 2026
description: Temukan cara membuat situs web React Native dan Expo Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
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
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Tambahkan perintah init
  - version: 6.1.6
    date: 2025-10-02
    changes: Menambahkan bagian debug
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahkan situs web React Native dan Expo Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah **perpustakaan internasionalisasi (i18n) open-source yang inovatif** yang mempermudah dukungan multibahasa dalam aplikasi modern. Ini bekerja di banyak lingkungan JavaScript/TypeScript, **termasuk React Native** (melalui paket `react-intlayer`).

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis.
- **Melokalkan konten secara dinamis**, termasuk **string UI** (dan di React untuk web, juga dapat melokalkan metadata HTML, dll.).
- **Memanfaatkan fitur canggih**, seperti deteksi dan pengalihan locale secara dinamis.

---

## Langkah 1: Instalasi Dependensi

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-native-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-react-native-template) di GitHub.

Dari proyek React Native Anda, instal paket-paket berikut:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
bunx intlayer init
```

### Paket

- **intlayer**  
  Toolkit inti i18n untuk konfigurasi, konten kamus, generasi tipe, dan perintah CLI.

- **react-intlayer**  
  Integrasi React yang menyediakan context providers dan React hooks yang akan Anda gunakan di React Native untuk mendapatkan dan mengganti locale.

- **react-native-intlayer**  
  Integrasi React Native yang menyediakan plugin Metro untuk mengintegrasikan Intlayer dengan bundler React Native.

---

## Langkah 2: Buat Konfigurasi Intlayer

Di root proyek Anda (atau di mana saja yang nyaman), buat file **konfigurasi Intlayer**. File tersebut mungkin terlihat seperti ini:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
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

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Dalam konfigurasi ini, Anda dapat:

- Mengonfigurasi **daftar locale yang didukung**.
- Menetapkan locale **default**.
- Nanti, Anda dapat menambahkan opsi yang lebih canggih (misalnya, log, direktori konten khusus, dll.).
- Lihat [dokumentasi konfigurasi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) untuk informasi lebih lanjut.

## Langkah 3: Tambahkan plugin Metro

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

## Langkah 4: Tambahkan provider Intlayer

Untuk menjaga sinkronisasi bahasa pengguna di seluruh aplikasi Anda, Anda perlu membungkus komponen root Anda dengan komponen `IntlayerProvider` dari `react-native-intlayer`.

> Pastikan untuk menggunakan provider dari `react-native-intlayer` bukan dari `react-intlayer`. Ekspor dari `react-native-intlayer` mencakup polyfill untuk API web.

Selain itu, Anda perlu menambahkan fungsi `intlayerPolyfill` ke file `index.js` Anda untuk memastikan Intlayer dapat bekerja dengan baik.

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
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

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
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

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProvider } = require("react-native-intlayer");

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

module.exports = RootLayout;
```

## Langkah 5: Deklarasikan Konten Anda

Buat file **deklarasi konten** di mana saja dalam proyek Anda (biasanya di dalam `src/`), menggunakan salah satu format ekstensi yang didukung Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- dll.

Contoh (TypeScript dengan node TSX untuk React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
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

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";
import { ReactNode } from "react";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

module.exports = appContent;
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

---

## Langkah 4: Gunakan Intlayer di Komponen Anda

Gunakan hook `useIntlayer` di komponen anak untuk mendapatkan konten yang sudah dilokalisasi.

### Contoh

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
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

```jsx fileName="app/(tabs)/index.content.msx" codeFormat="esm"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const HomeScreen = () => {
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

```jsx fileName="app/(tabs)/index.content.csx" codeFormat="commonjs"
const { Image, StyleSheet, Platform } = require("react-native");
const { useIntlayer } = require("react-intlayer");
const { HelloWave } = require("@/components/HelloWave");
const ParallaxScrollView = require("@/components/ParallaxScrollView");
const { ThemedText } = require("@/components/ThemedText");
const { ThemedView } = require("@/components/ThemedView");

const HomeScreen = () => {
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

module.exports = HomeScreen;
```

> Saat menggunakan `content.someKey` dalam properti berbasis string (misalnya, `title` pada tombol atau `children` pada komponen `Text`), **panggil `content.someKey.value`** untuk mendapatkan string yang sebenarnya.

---

## (Opsional) Langkah 5: Ubah Locale Aplikasi

Untuk mengganti locale dari dalam komponen Anda, Anda dapat menggunakan metode `setLocale` dari hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher = () => {
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { View, Text, TouchableOpacity, StyleSheet } = require("react-native");
const { getLocaleName } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
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

```plaintext
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
- **Perintah CLI**: Jelajahi [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md) untuk tugas seperti **mengekstrak terjemahan** atau **memeriksa kunci yang hilang**.

Nikmati membangun aplikasi **React Native** Anda dengan i18n yang sepenuhnya didukung melalui **Intlayer**!

---

### Debug

React Native bisa kurang stabil dibandingkan React Web, jadi perhatikan keselarasan versi dengan ekstra.

Intlayer terutama menargetkan Web Intl API; pada React Native Anda harus menyertakan polyfill yang sesuai.

Daftar periksa:

- Gunakan versi terbaru dari `intlayer`, `react-intlayer`, dan `react-native-intlayer`.
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

---
