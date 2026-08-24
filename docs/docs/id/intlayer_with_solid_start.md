---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi SolidStart multibahasa (i18n). Pengarahan lokal yang dirender server, hreflang, peta situs, dan terjemahan dibantu AI."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Initial history"
author: aymericzip
---

# Terjemahkan situs web SolidStart Anda menggunakan Intlayer | Internasionalisasi (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Solusi i18n terbaik untuk Vite dan Solid? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasikan aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>

 <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-solid-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Template Intlayer Solid Start"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Daftar Isi

<TOC/>

Panduan ini mencakup aplikasi SolidStart yang **dirender di server**: deteksi lokal terjadi pada permintaan, halaman dirender di server dalam bahasa yang tepat, dan sinyal `<html lang>`, `hreflang`, serta peta situs yang dibutuhkan mesin pencari dipancarkan di sisi server.

## Mengapa Intlayer dibandingkan alternatif lain?

Dibandingkan dengan solusi utama seperti `@solid-primitives/i18n` atau `i18next`, Intlayer adalah solusi yang dilengkapi dengan optimasi terintegrasi seperti:

<AccordionGroup>

<Accordion header="Cakupan Solid penuh">

Intlayer dioptimalkan untuk bekerja secara sempurna dengan Solid dengan menawarkan **pelingkup konten tingkat komponen**, **terjemahan reaktif**, dan semua fitur yang diperlukan untuk menskalakan internasionalisasi (i18n).

</Accordion>

<Accordion header="Ukuran bundel">

Alih-alih memuat file JSON yang sangat besar ke dalam halaman Anda, muat hanya konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundel dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Kemudahan pemeliharaan">

Melingkupi konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi skala besar. Anda dapat menduplikasi atau menghapus satu folder fitur tanpa beban mental untuk meninjau seluruh basis kode konten Anda. Selain itu, Intlayer **bertipe penuh** untuk memastikan akurasi konten Anda.

</Accordion>

<Accordion header="Agen AI">

Menempatkan konten bersama **mengurangi konteks yang dibutuhkan** oleh Model Bahasa Besar (LLM). Intlayer juga dilengkapi dengan serangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk membuat pengalaman pengembang (DX) menjadi lebih lancar bagi agen AI.

</Accordion>

<Accordion header="Otomatisasi">

Gunakan otomatisasi untuk menerjemahkan dalam alur CI/CD Anda menggunakan LLM pilihan Anda dengan biaya penyedia AI Anda. Intlayer juga menawarkan **kompilator** untuk mengotomatiskan ekstraksi konten, serta [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Performa">

Menghubungkan file JSON yang besar ke komponen dapat menyebabkan masalah performa dan reaktivitas. Intlayer mengoptimalkan pemuatan konten Anda pada saat build.

</Accordion>

<Accordion header="Skalabilitas dengan non-pengembang">

Lebih dari sekadar solusi i18n, Intlayer menyediakan **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) mandiri** dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa Anda secara **real-time**, membuat kolaborasi dengan penerjemah, penulis teks, dan anggota tim lainnya menjadi mulus. Konten dapat disimpan secara lokal dan/atau jarak jauh.

</Accordion>
</AccordionGroup>

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dalam Aplikasi SolidStart

<Steps>

<Step number={1} title="Install Dependensi">

Install paket yang diperlukan menggunakan npm:

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

> bendera `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Sebagai contoh:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **solid-intlayer**

  Paket yang mengintegrasikan Intlayer dengan aplikasi Solid. Paket ini menyediakan penyedia konteks dan hook untuk internasionalisasi Solid.

- **vite-intlayer**

  Mencakup plugin Vite untuk mengintegrasikan Intlayer dengan [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), serta penangan pengarahan lokal yang mendeteksi lokal pilihan pengguna, mengelola cookie, dan menangani pengalihan URL.

> `vite-intlayer` adalah perhatian sisi server di sini, bukan hanya saat build: ini menyediakan penangan permintaan yang dijalankan oleh server Nitro SolidStart. Menyimpannya dalam `dependencies` adalah pilihan aman secara default — Anda dapat memindahkannya ke `devDependencies` hanya jika Anda menyebarkan direktori `.output` yang dibuat, di mana Nitro menyisipkan penangan tersebut.

</Step>

<Step number={2} title="Konfigurasi proyek Anda">

Buat file konfigurasi untuk mengonfigurasi bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Lokal Anda lainnya
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

Dengan `prefix-no-default`, lokal default dilayani dari URL tanpa awalan:

```plaintext
/            /about          → Bahasa Inggris (lokal default)
/fr          /fr/about       → Bahasa Prancis
/es          /es/about       → Bahasa Spanyol
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL terlokalisasi, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Integrasikan Intlayer dalam Konfigurasi Vite Anda">

Tambahkan plugin Intlayer ke konfigurasi Anda:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> Plugin Vite `intlayer()` membangun file deklarasi konten Anda, memantaunya dalam mode pengembangan, dan menentukan variabel lingkungan Intlayer di dalam aplikasi. Ini juga menyediakan alias yang mengoptimalkan performa.

### Pengarahan lokal hadir bersama plugin

SolidStart berjalan di [Nitro](https://nitro.build), dan `intlayer()` mendaftarkan penangan pengarahan lokalnya secara langsung ke dalam alur server Nitro (melalui opsi `routing.enableProxy`, `true` secara default). Tidak ada hal lain yang perlu dihubungkan: pada server yang dibangun, setiap permintaan diperiksa sebelum mencapai router, dan

- lokal dibaca dari awalan URL, kemudian cookie `INTLAYER_LOCALE`, kemudian header `Accept-Language`;
- URL tanpa awalan dialihkan ke rekanannya yang terlokalisasi jika lokal yang diselesaikan bukan lokal default (`/` → `/fr`);
- URL dengan awalan redundan dialihkan kembali ke bentuk kanonisnya (`/en/about` → `/about`);
- cookie lokal ditulis kembali pada respons.

</Step>

<Step number={4} title="Deklarasikan Konten Anda">

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **Catatan khusus SolidStart**: setiap file `.ts` / `.tsx` di bawah `src/routes` menjadi rute, dan file `.content.ts` memiliki ekspor default, sehingga akan diambil sebagai halaman. Simpan deklarasi konten **halaman** Anda di luar direktori routes (`src/contents/` bekerja dengan baik). Konten **komponen** dapat tetap ditempatkan bersama, karena `src/components` tidak dipindai oleh router sistem file.

> Deklarasi konten Anda dapat ditentukan di mana saja dalam aplikasi Anda selama disertakan dalam direktori `contentDir` (secara default, `./src`), dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Untuk detail selengkapnya, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={5} title="Tambahkan pengarahan terlokalisasi">

Tujuan dari langkah ini adalah untuk memberikan URL-nya sendiri ke setiap bahasa, yang diindeks oleh mesin pencari.

Pindahkan halaman Anda ke bawah **segmen dinamik opsional**. Dalam router sistem file SolidStart, `[[locale]]` mengompilasi ke pola jalur `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          ← tata letak yang memvalidasi segmen
  [[locale]]/
    index.tsx             → /        dan /fr        dan /es
    about.tsx             → /about   dan /fr/about  dan /es/about
  [...404].tsx            → penangkap semua untuk yang lainnya
```

Satu-satunya tugas file tata letak adalah membatasi segmen ke lokal yang dikonfigurasi:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` memperluas `:locale?` menjadi dua pola — satu dengan segmen dan satu tanpa — dan mencobanya berdasarkan spesifisitas yang menurun. `matchFilters` adalah apa yang membuat perbedaan antara pengaturan yang berfungsi dan yang membingungkan:

| URL         | Tanpa `matchFilters`                                           | Dengan `matchFilters`                      |
| ----------- | -------------------------------------------------------------- | ------------------------------------------ |
| `/fr/about` | Halaman tentang dalam bahasa Prancis                           | Halaman tentang dalam bahasa Prancis       |
| `/about`    | Halaman tentang (segmen statis menang)                         | Halaman tentang                            |
| `/unknown`  | **Halaman beranda**, secara diam-diam, dengan `locale=unknown` | Tidak cocok → jatuh ke 404 penangkap semua |

> Lebih suka `[locale]` (wajib) daripada `[[locale]]` jika Anda menggunakan mode pengarahan `'prefix-all'`, dan hapus segmen sepenuhnya untuk `'no-prefix'` atau `'search-params'`.

</Step>

<Step number={6} title="Sediakan lokal ke aplikasi Anda">

URL adalah satu-satunya sumber kebenaran untuk lokal: middleware telah mengalihkan permintaan ke jalur terlokalisasi, jadi membaca jalur di tata letak root menjaga penyajian server dan hidrasi klien tetap sesuai, dan membuat setiap navigasi sisi klien memperbarui lokal secara gratis.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // Server merender <html> di entry-server.tsx; navigasi sisi klien
  // antar lokal harus memperbarui atribut itu sendiri.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` bereaksi terhadap prop `locale`-nya, jadi mempassing panggilan aksesor `locale()` di dalam JSX sudah cukup — Solid mengompilasinya ke getter, dan seluruh pohon dirender ulang dalam bahasa baru saat URL berubah.

</Step>

<Step number={7} title="Atur atribut lang dan dir HTML di server">

Elemen `<html>` dirender oleh `entry-server.tsx`, di luar `Router`. Baca lokal dari URL permintaan sebagai gantinya:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Praperamban (crawlers) sekarang menerima bahasa yang tepat pada byte pertama:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Gunakan Intlayer di Halaman Anda">

Akses kamus konten Anda di seluruh aplikasi Anda:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> Di Solid, `useIntlayer` mengembalikan konten reaktif (misalnya, `content`). Anda dapat mengakses propertinya secara langsung.

> Jika Anda ingin menggunakan konten Anda dalam atribut `string`, seperti `alt`, `title`, `href`, `aria-label`, dll., Anda dapat menggunakan nilai fungsi tersebut, seperti:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md).

Node konten tidak terbatas pada terjemahan biasa. Penghitung jamak, misalnya:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` memilih kategori melalui `Intl.PluralRules` untuk lokal yang aktif, sehingga bahasa dengan lebih dari dua bentuk jamak bekerja tanpa kode ekstra.

</Step>

<Step number={9} title="Buat Komponen Tautan Terlokalisasi">

Buat komponent `Link` kustom yang secara otomatis memberi awalan URL internal dengan bahasa saat ini:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Menulis `href="/about"` sekali sekarang menghasilkan `/about`, `/fr/about` atau `/es/about` tergantung pada lokal aktif — tanpa pengawalan manual di mana pun di halaman Anda.

</Step>

<Step number={10} title="Buat Komponen Pengalih Lokal">

Render pengalih sebagai **jangkar (anchor) nyata** daripada `<select>`: setiap bahasa dari halaman saat ini menjadi tautan yang dapat merayap yang dapat dibuka di tab baru, yang tidak dapat ditawarkan oleh kontrol khusus JavaScript.

`getPathWithoutLocale` menghapus segmen lokal dari jalur saat ini, dan `getLocalizedUrl` membangunnya kembali untuk lokal target, sehingga tautan mengikuti mode pengarahan Anda tanpa hard-coding apa pun. Navigasi adalah apa yang mengubah lokal yang dirender — rute `[[locale]]` menurunkannya dari URL — sementara `setLocale` mempertahankan pilihan dalam cookie `INTLAYER_LOCALE` sehingga kunjungan berikutnya ke URL bebas lokal menyelesaikan ke bahasa yang sama.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Jalur kanonis (bebas lokal) dari halaman yang sedang ditampilkan
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Hanya kecocokan persis, sehingga tautan lokal default tidak ditandai
              // aktif di setiap halaman
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Memastikan tombol "kembali" di peramban kembali ke halaman sebelumnya
              replace
            >
              {/* Bahasa dalam lokalnya sendiri - misal Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> Di Solid, `locale` dari `useLocale` adalah **aksesor sinyal**. Gunakan `locale()` (dengan tanda kurung) untuk membaca nilai saat ini secara reaktif.
>
> `getLocaleName(localeItem)` merender setiap bahasa dalam bahasanya sendiri — `English / Français / Español`. Berikan argumen kedua untuk menerjemahkan nama-nama ke dalam bahasa yang sedang ditampilkan: `getLocaleName(localeItem, locale())` memberikan `English / French / Spanish` dalam bahasa Inggris, `anglais / français / espagnol` dalam bahasa Prancis.
>
> `<A>` sudah mengatur `aria-current="page"` pada tautan yang cocok dengan URL saat ini, jadi tidak ada yang perlu ditambahkan untuk itu. `replace` dibaca kembali dari atribut yang dirender oleh router: ini menukar entri riwayat alih-alih mendorongnya, sehingga tombol "kembali" di peramban kembali ke halaman yang dikunjungi sebelum pengalihan daripada ke halaman yang sama dalam bahasa sebelumnya.
>
> `dir` dan `hreflang` pada setiap tautan menjaga nama bahasa kanan-ke-kiri berorientasi dengan benar dan memberi tahu teknologi pemandu dan praperamban bahasa mana yang ditunjuk oleh setiap tautan.
>
> Untuk mempelajari lebih lanjut tentang hook `useLocale`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Pancarkan tautan canonical dan hreflang" isOptional={true}>

Anotasi `hreflang` memberi tahu mesin pencari bahwa `/about`, `/fr/about` dan `/es/about` adalah halaman yang sama dalam bahasa yang berbeda. `getMultilingualUrls` menurunkannya dari jalur kanonis (bebas lokal), mengikuti mode pengarahan Anda, sehingga tidak ada yang di-hard-code:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** URL mutlak dari halaman yang dirender. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Render itu di head dokumen, tempat URL permintaan tersedia:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … di dalam <head>, di sebelah tag meta lainnya:
<AlternateLinks url={url} />;
```

`GET /fr/about` kemudian melayani:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Catatan tentang `@solidjs/meta`**: pada saat penulisan, `<Title>` dan `<Meta>` dari `@solidjs/meta` diterapkan pada klien setelah hidrasi tetapi **tidak** dipancarkan ke dalam `<head>` yang dirender server di SolidStart v2. Sampai itu diperbaiki di hulu, render tag yang harus dilihat praperamban tanpa JavaScript — `canonical`, `hreflang`, dan jika perlu `title` / `description` — secara langsung di `entry-server.tsx`, seperti yang ditunjukkan di atas.

</Step>

<Step number={12} title="Kelola halaman tidak ditemukan" isOptional={true}>

Rute splat di akar `src/routes` menangkap setiap jalur yang tidak cocok dengan segmen lokal — termasuk awalan lokal tidak valid yang ditolak oleh `matchFilters`. Karena lokal masih berasal dari URL melalui tata letak root, halaman 404 ditampilkan dalam bahasa pengunjung:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Permintaan        | Hasil                                           |
| ----------------- | ----------------------------------------------- |
| `/xx`             | `404` — `xx` bukan lokal yang dikonfigurasi     |
| `/nonexistent`    | `404` dalam lokal default                       |
| `/fr/nonexistent` | `404` dalam bahasa Prancis (`Page introuvable`) |

</Step>

<Step number={13} title="Hasilkan peta situs multibahasa" isOptional={true}>

Generator peta situs Intlayer memperluas setiap jalur menjadi satu entri per lokal dan menghubungkan alternatif `xhtml:link` di antara mereka, sehingga rute hanya perlu mencantumkan jalur kanonis bebas lokal.

> Tidak seperti generator dasar yang hanya memancarkan URL datar, Intlayer menghubungkan tautan dua arah antara setiap varian terlokalisasi dari setiap halaman, yang membantu mesin pencari menghubungkan URL terlokalisasi dan melayani yang tepat kepada audiens yang tepat.

SolidStart mengubah file yang mengekspor metode HTTP menjadi rute API, dan menghapus ekstensi `.ts` dari jalur — jadi `src/routes/sitemap.xml.ts` dilayani di `/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> Rute API tidak mendukung parameter opsional, jadi simpan file ini di akar `src/routes`, di luar segmen `[[locale]]`. Peta situs sudah berisi setiap lokal.

Anda dapat membangun `robots.txt` dengan cara yang sama menggunakan `getMultilingualUrls`, sehingga entri `Disallow` mencakup setiap ejaan terlokalisasi dari jalur sensitif:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Dapatkan lokal di fungsi server Anda" isOptional={true}>

Anda mungkin ingin mengakses lokal saat ini dari dalam fungsi server atau rute API.

Dalam pengaturan berbasis awalan seperti ini, **URL adalah otoritatif**: `getLocaleFromPath` membaca awalan dari URL permintaan. `getLocale` adalah fallback untuk permintaan yang tidak membawa awalan lokal — ini memeriksa cookie `INTLAYER_LOCALE`, lalu header `x-intlayer-locale`, lalu menegosiasikan `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Ambil cookie dari permintaan (default: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Ambil header dari permintaan (default: 'x-intlayer-locale'),
      // beralih ke negosiasi Accept-Language
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Ambil beberapa konten di luar komponen menggunakan getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Jangan hanya mengandalkan `getLocale` di sini: cookie lokal hanya ditulis setelah pengunjung secara aktif beralih bahasa, jadi kunjungan pertama ke `/fr/...` akan menyelesaikan ke lokal default.

</Step>

<Step number={15} title="Ekstrak konten komponen Anda" isOptional={true}>

Jika Anda memiliki basis kode yang ada, mengubah ribuan file dapat memakan waktu.

Untuk mempermudah proses ini, Intlayer mengusulkan [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) untuk mengubah komponen Anda dan mengekstrak konten.

Untuk mengaturnya, Anda dapat menambahkan bagian `compiler` di file `intlayer.config.ts` Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Sisa konfigurasi Anda
  compiler: {
    /**
     * Menunjukkan apakah kompilator harus diaktifkan.
     */
    enabled: true,

    /**
     * Menentukan jalur file keluaran
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Menunjukkan apakah komponen harus disimpan setelah diubah.
     *
     * - Jika `true`, kompilator akan menulis ulang file komponen di disk. Sehingga transformasi akan permanen, dan kompilator akan melewati transformasi untuk proses berikutnya. Dengan begitu, kompilator dapat mengubah aplikasi, lalu dapat dihapus.
     *
     * - Jika `false`, kompilator akan menyuntikkan pemanggilan fungsi `useIntlayer()` ke dalam kode di keluaran build saja, dan menjaga basis kode dasar tetap utuh. Transformasi akan dilakukan hanya di memori.
     */
    saveComponents: false,

    /**
     * Awalan kunci kamus
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Jalankan ekstraktor untuk mengubah komponen Anda dan mengekstrak konten

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

> Pindahkan file konten yang dihasilkan dari halaman Anda keluar dari `src/routes` setelahnya, untuk alasan yang dijelaskan dalam langkah 5.

 </Tab>
 <Tab value='Babel compiler'>

> Sejak v9, `intlayerCompiler` disertakan dalam plugin `intlayer`. Jadi Anda tidak perlu menambahkannya secara manual.

Perbarui `vite.config.ts` Anda untuk menyertakan plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // Menambahkan plugin kompilator
  ],
});
```

```bash packageManager="npm"
npm run build # Atau npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Atau pnpm run dev
```

```bash packageManager="yarn"
yarn build # Atau yarn dev
```

```bash packageManager="bun"
bun run build # Atau bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Konfigurasi TypeScript">

Intlayer menggunakan augmentasi modul untuk mendapatkan manfaat TypeScript dan membuat basis kode Anda lebih kuat.

Pastikan konfigurasi TypeScript Anda mencakup tipe yang dihasilkan secara otomatis:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... konfigurasi Anda yang ada
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

Kunci kamus dan jalur konten sekarang diperiksa saat kompilasi:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Memverifikasi pengaturan Anda

Build dan jalankan server, lalu periksa apakah permintaan ini berperilaku seperti yang diharapkan:

```bash
npm run build
node .output/server/index.mjs
```

| Permintaan                                 | Respons yang diharapkan                    |
| ------------------------------------------ | ------------------------------------------ |
| `GET /`                                    | `200` — Bahasa Inggris                     |
| `GET /` dengan `Accept-Language: fr`       | `302` → `/fr`                              |
| `GET /` dengan cookie `INTLAYER_LOCALE=es` | `302` → `/es`                              |
| `GET /fr`                                  | `200` — Bahasa Prancis, `<html lang="fr">` |
| `GET /fr/about`                            | `200` — Halaman tentang bahasa Prancis     |
| `GET /en/about`                            | `302` → `/about` (pengalihan kanonis)      |
| `GET /xx`                                  | `404`                                      |
| `GET /fr/nonexistent`                      | `404` dalam bahasa Prancis                 |
| `GET /sitemap.xml`                         | `200` — peta situs XML multibahasa         |

Baris yang merender halaman berperilaku secara identik di bawah `vite dev`. Tiga baris pengalihan hanya berlaku untuk server yang dibangun kecuali Anda mendaftarkan penangan sebagai middleware sendiri — lihat langkah 3.

> Jalankan server pengembangan di Node (`vite dev`) daripada di Bun (`bun --bun vite dev`): SSR SolidStart saat ini gagal di bawah runtime Bun dengan `Expected a Response object, but received 'NodeResponse'`. Ini tidak terkait dengan Intlayer — ini mereproduksi pada templat biasa — dan hanya memengaruhi server pengembangan, bukan `vite build`.

---

## Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari melakukan commit file tersebut ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

---

## Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autokomplit** untuk kunci terjemahan.
- **Deteksi kesalahan real-time** untuk terjemahan yang hilang.
- **Pratinjau langsung** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk membuat dan memperbarui terjemahan dengan mudah.

---

## Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## Referensi Dokumentasi

- [Dokumentasi Intlayer](https://intlayer.org)
- [Dokumentasi SolidStart](https://start.solidjs.com)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [Deklarasi Konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
