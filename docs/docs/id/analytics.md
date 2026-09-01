---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | Lacak paparan konten dan jalankan pengujian A/B (A/B testing)
description: Temukan bagaimana @intlayer/analytics melacak tampilan halaman/lokal dan paparan konten, dan bagaimana menggunakannya untuk menjalankan pengujian A/B (A/B testing) pada konten Intlayer Anda.
keywords:
  - Analytics (Analitik)
  - A/B Testing (Pengujian A/B)
  - Audience (Audiens)
  - Internationalization (Internasionalisasi)
  - Documentation (Dokumentasi)
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "Mengaktifkan analitik secara default saat `@intlayer/analytics` terpasang"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — paket @intlayer/analytics, pelacakan tingkat provider/node, pengujian A/B, dasbor"
author: aymericzip
---

# Dokumentasi Intlayer Analytics

`@intlayer/analytics` adalah paket pelengkap opsional yang memberi tahu Anda **konten mana yang benar-benar ditampilkan** kepada pengunjung Anda — halaman mana, dalam bahasa (locale) apa, dan bagian mana dari konten terjemahan yang spesifik — sehingga Anda dapat memahami audiens Anda dan menjalankan **pengujian A/B pada konten**.

## Daftar Isi (Table of Contents)

<TOC/>

---

## Apa yang dilacak (What it tracks)

`@intlayer/analytics` menggabungkan tiga jenis peristiwa anonim dalam sebuah batch:

| Peristiwa (Event)  | Di mana ditangkap                                 | Apa yang dikatakannya kepada Anda                                                                                                                       |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Tingkat Provider (`IntlayerProvider`)             | Halaman dan lokal (locale) mana yang dilihat oleh sesi (session), pada muat awal, perubahan rute, atau pergantian bahasa.                               |
| `content_exposure` | Tingkat Node (`useIntlayer` / plugin interpreter) | Kunci kamus / jalur kunci mana yang benar-benar diselesaikan (resolved) dan ditampilkan — dan jika bagian dari sebuah eksperimen, **varian** yang mana. |
| `conversion`       | Di mana pun Anda memanggil `useConversion()`      | Sebuah tujuan (goal) yang dicapai (pendaftaran, klik, pembelian...) yang diatribusikan ke varian A/B yang diekspos kepada sesi tersebut.                |

Peristiwa (events) dikumpulkan di dalam memori dan dikirimkan sebagai **sebuah permintaan batch tunggal kira-kira setiap 20 detik** — tidak pernah pada setiap ketikan (keystroke) atau saat di-render (render) — sehingga analitik tidak pernah berdampak pada waktu rendering pertama (first render time) atau menambahkan sebuah request setiap interaksi.

## Bagaimana hal ini mendukung pengujian A/B pada konten

Intlayer telah memungkinkan Anda mendeklarasikan [Varian (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md) dari konten (misalnya kamus `hero-banner` yang memiliki varian `control` dan varian `black_friday`). `@intlayer/analytics` menutup siklus tersebut:

1. `getVariant(experimentKey, variants)` secara deterministik (deterministically) menugaskan (assign) setiap sesi anonim ke dalam sebuah varian — ini merupakan murni sebuah fungsi (pure function) dari session id dan experiment key, sehingga tugas (assignment) ini **stabil (stable) di seluruh sesi** dan tidak memerlukan **satu siklus ke server (server round-trip)** sebelum proses rendering pertama selesai dilakukan (tidak ada kelap-kelip / flicker, dan juga layout shift).
2. Setiap peristiwa `content_exposure` turut membawa `variant` yang dipertunjukkan tersebut.
3. `useConversion()` memungkinkan Anda untuk mengatribusikan (attribute) sebuah tujuan (goal) (contohnya `"cta_click"`) ke arah varian tersebut.
4. Titik-akhir (endpoint) terkait hasil eksperimen pada dasbor membandingkan tingkat konversi (conversion rates) dari setiap varian, termasuk dengan signifikansi statistik-nya (melalui z-test).

## Instalasi (Installation)

`@intlayer/analytics` adalah **dependensi opsional** dari setiap paket framework (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …), sehingga sebagian besar proyek sudah memilikinya. Pasang secara eksplisit jika setup Anda melewati dependensi opsional (`npm install --no-optional`, …):

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Memasang paketnya sudah cukup untuk menyalakan analitik: `analytics.enabled` bernilai `true` secara default, dan `@intlayer/config` mengubahnya menjadi `false` setiap kali paket tidak ditemukan di proyek Anda. Bila Anda memutuskan untuk tak memasangnya, maka titik temu / integrasi (integration point) ini diselesaikan menjadi hal yang tidak beroperasi atau no-op — silakan periksa rincian dari [Tidak ada biaya apa pun ketika tidak dipasang (Zero-cost ketika tidak dipasang)](#nol-biaya-saat-tidak-diinstal) pada poin selanjutnya di bawah.

## Konfigurasi (Configuration)

Analitik tidak memerlukan konfigurasi untuk memulai: fitur ini **aktif secara default** dan **menggunakan kembali blok konfigurasi `editor` yang sudah ada** untuk endpoint dan kunci proyeknya.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Turut dipakai pula untuk keperluan analytics (berfungsi selaku analytics ingestion endpoint)
    clientId: "your-client-id", // Juga dipakai pada fungsi kunci proyek analytics / analytics project key
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — merupakan dasar (base) rujukan / acuan bagi URL saat peristiwa (event) analytics diantarkan ke sana (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — merujuk terhadap pengunci (key) bagi proyek publik agar dipertautkan / diatribusikan ke beragam input data. Tak hanya itu fungsinya turut bertindak layaknya **pemicu aktivasi (enable switch)**: analitik sepenuhnya dibuat pada tingkatan non-aktif (dan dalam kondisi ter-tree-shaken, perhatikan penjabarannya di bawah) sampai kemudian di saat fungsi `clientId` ini ditata & dikonfigurasikan.

Dalam situasi ketika melakukan hosting (self-host) mandiri akan halnya fungsi Intlayer ini, analitik bakal terpusat tanpa penyesuaian baru (otomatis) terhadap instalasi server Anda disebabkan rujukan pengaturannya adalah identik terhadap rujukan `editor.backendURL`.

### Memanggil API dari browser

Token yang sama mendukung sebuah klien kecil tanpa kredensial, sehingga situs statis atau SPA dapat membaca konten CMS-nya saat runtime tanpa server, tanpa server action, dan tanpa secret apa pun di dalam bundle:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

Klien ini melakukan autentikasi sendiri berdasarkan `editor.clientId`: pertukaran, penyimpanan cache, dan pembaruan token ditangani secara internal. Scope membatasi apa yang dapat diaksesnya: konten kamus yang dipublikasikan dan pengumpulan data analytics. Selain itu (mengirim kamus, membaca proyek, menggunakan kredit AI) memerlukan kredensial asli, sehingga membutuhkan server atau pengguna yang sudah masuk (signed-in).

### Menonaktifkan (opt-out)

Blok `analytics` opsional menyetel — atau mematikan — pengumpulan data:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // Default: true — mengeluarkan seluruh integrasi dari bundel
    flushInterval: 20_000, // Milidetik antara dua pengiriman batch
    sampleRate: 1, // Fraksi sesi yang direkam, dari 0 (tidak ada) hingga 1 (semua)
  },
};

export default config;
```

Menghapus `@intlayer/analytics` memberi efek yang sama dengan `enabled: false`. Lihat [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) untuk daftar bidang lengkapnya.

## Penggunaan (Usage)

### Pelacakan tingkat provider (Automatic provider-level tracking)

Tidak perlu ada perubahan kode atau modifikasi koding apa pun. Setelah instalan dari `@intlayer/analytics` dipastikan, serta konfigurasinya mengacu terhadap `editor.clientId`, dengan cara yang langsung `IntlayerProvider` bertindak untuk:

- Melakukan proses inisialisasi awal klien (analytics client) saat mounting awal (mount),
- Mencatatkan satu rekam jejak rupa tampilan layar `page_view` sewaktu pemuatan yang pertama,
- Menginisiasi kembali pelacakan `page_view` ini sewaktu perpindahan wilayah pilihan penggunaan (locale change),
- Memunculkan mekanisme pusaran siklus (~20s flush loop) agar menyaring tuntas rincian atau pun serpihan yang melekat tanpa menunggu (unmount / tutupan pada tab halaman pengguna; yaitu memfungsikan `navigator.sendBeacon` yang bakal melakukan hal serupa disusul balikan perujukannya memakai `fetch(..., { keepalive: true })`).

Titik masuknya berbeda untuk setiap framework, tetapi dalam semua kasus tetap tempat yang sama yang sudah Anda pakai untuk menyiapkan Intlayer, jadi tidak ada tambahan lain yang perlu dilakukan:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider` memasang (mount) provider analytics secara internal.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer` meng-ekspor ulang `IntlayerProvider` milik React, sehingga analytics tersambung dengan cara yang sama.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    Plugin `intlayer` mendaftarkan hook analytics pada siklus hidup komponen root.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > Dengan Nuxt, `nuxt-intlayer` memasang plugin ini untuk Anda: tidak ada yang perlu dilakukan.

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` memulai analytics dari komponen yang menyiapkan Intlayer.

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider` memasang (mount) provider analytics secara internal.

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider` memasang provider analytics secara lazy, sehingga chunk ini tetap berada di luar jalur kritis (critical path).

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()` sudah menyertakan `provideIntlayerAnalytics()`.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > Gunakan `provideIntlayerAnalytics()` sendiri hanya jika Anda mengelola provider secara terpisah.

  </Tab>
</Tabs>

### Pelacakan otomatis tingkat Node (Automatic node-level tracking)

Dalam segenap ragam resolusi muatan koding saat menampilkan serpihan / wujud konten pada panggilannya melewati rujukan pemakaian dari `useIntlayer`, interpreter di sistem melaporkan dan merekam serpihan data bertitelkan rujukan nama peristiwanya (event): `content_exposure` untuk paduan akurasi di hal penggunaan ini: `dictionaryKey` + arah pencariannya pada perincian jalan/aksesnya (key path) + daerah acuan pilihan pemakai (locale) — sekali lagi tak satu jengkal pun perubahan bentuk kode dilibatkan. Adanya wujud rentetan dari kemunculan satu buah referensi simpul penamaan (node) selama jangka tahapan pusar (flush window) maka keseluruhannya cuma dikumpulkan di dalam satu rangkuman catatan rujukan dan dibumbuhi tambahan catatan bilangan rekam-an `count`, ini menegaskan bahwasanya dari hal yang sama terulang dan memunculkan rupa ulang tampilan atau rendering tak-kurang-bahkan 50 kali sekalipun bukan berarti mengirimkan rincian berurutan dan mengada-adakan proses berulang (50 pengantaran yang diestimasikan terhitung secara manual).

### Memantau hal rekam pencapaian / Konversi test A/B (Tracking conversions for A/B tests)

Anda mesti menerapkan rincian `useConversion()` guna memandu sebuah tujuan akhir ke wujud sebuah variabel eksperimen dengan hasil pengamatan pengguna akhir (session):

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "react-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Mari kita memulainya (Get started)
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Mari kita memulainya (Get started)
        </button>
      );
    };
    ```

    > `useConversion` adalah hook client: tandai komponen dengan `"use client"`.

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        Mari kita memulainya (Get started)
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      Mari kita memulainya (Get started)
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Mari kita memulainya (Get started)
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Mari kita memulainya (Get started)
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">Mari kita memulainya</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### Penyelesaian varian eksperimen klien secara internal (Resolving a variant client-side)

`useExperiment()` menetapkan sesi ke sebuah varian dan mencatat paparan (exposure) yang menjadi penyebut (denominator) dari tingkat konversi. Tampilkan subtree yang bergantung pada varian hanya setelah `isAssigned` bernilai true, agar tidak ada pengunjung yang sempat melihat kedipan varian kontrol sebelum penetapannya selesai:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` adalah string biasa.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` adalah string biasa. Penetapan terjadi di browser, sehingga komponennya harus berupa komponen client.

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` dan `isAssigned` adalah `Ref`.

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` dan `isAssigned` adalah store: baca dengan prefiks `$`.

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` adalah string biasa.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` dan `isAssigned` adalah `Accessor`: panggil untuk membaca nilainya.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` dan `isAssigned` adalah `Signal`: panggil untuk membaca nilainya.

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

Weights bersifat opsional — kirim satu nilai per varian untuk mengubah pembagiannya, misalnya `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

Komponen anak kemudian membaca [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/variants.md) dari kamus yang sesuai:

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> Membaca varian di dalam komponen **anak** adalah yang membuat ini bekerja di luar React: di Vue, Svelte, Solid, dan Angular, selector yang diberikan ke `useIntlayer` ditangkap saat komponen disiapkan, sehingga pembacaannya harus terjadi di komponen yang baru dipasang setelah variannya diketahui.

Jika eksperimen mencakup seluruh halaman, bukan hanya satu kamus, angkat variannya ke provider — lihat [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/variants.md#ambient-variant). Setiap `useIntlayer` di bawahnya kemudian akan diselesaikan berdasarkan itu tanpa perubahan pada titik pemanggilan.

Jika Anda memerlukan hasil penetapan mentah di luar sebuah komponen, akses client-nya secara langsung:

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` hanya menetapkan varian — tidak mencatat paparan (exposure). Sebaiknya gunakan `useExperiment()`, jika tidak tingkat konversi tidak akan memiliki penyebut.

## Privasi dan Peforma (Privacy & performance)

- **Anonim semenjak disajikan di dalam rancang bangun rancangan arsitektur** (Anonymous by design): keseluruhan lalu-lintas data pengguna hanya akan mempergunakan nama acak yang bergilir secara unik (rotating id); fungsi-fungsi bagian hulu dari mesin server (backend) tidak pernah (secara langsung & tak sadar) me-rekam hasil catatan rujukan dalam hal ini IP dari pengguna asalnya — namun alih-alih me-rekam atau men-sirkulasikannya pada **rangkaian fungsi Hash SHA-256 (SHA-256 hash)** demi tujuan keutuhan.
- **Batasan dan acuan dari pemosisian sangat acak / menyeluruh (Location is coarse)**: rincian data disuplai melalui serangkaian fungsi pelacakan geo-posisi atau geolokasi di CDN headers (`cf-ipcountry`, `x-vercel-ip-country`, ...). Rangkaian tidak merekam data maupun menyalin posisi akurat IP penggunanya secara keseluruhan maupun sebagian di sepanjang lalu lalang dari setiap interaksi data di lapangan.
- **Rujukan URL senantiasa tidak menyingkap serpihan/sandi atau referensinya (URLs exclude search params)** berkat penetapan bawaan sistem di balik layar (default settings) demi kemaslahatan fungsi yang menyeluruh dari pengguna saat men-skrining pelacakan referensi penyamaran yang berkesinambungan.
- **Batasan perbandingan sampling (Sampling)**: `sampleRate` dapat diselaraskan atau diformat berdasarkan dari rentetan trafik atau kerumitan penelusuran demi fungsi kinerja tinggi aplikasi.
- **Mekanisme antrian pengiriman rupa-upa (Batched)**: Pengaturan ini mengatur bahwasanya ada rujukan rentang acuan di `flushInterval` dalam interval taksiran pengantaran ± setiap 20 detik (kira-kira) atau pun bila terhambat di `maxBufferSize` maka sistem bereaksi dan beraksi menyuplai secara masal dari sekumpulan rincian (batched) itu ke dalam rujukan tanpa mencederai prinsip asasi yakni 'tak-ada satu-pun rekaman penelusuran untuk setiap transaksi / satu peristiwa dikirim sebagai laporan sendiri'.

### Nol-biaya saat tidak diinstal (Zero-cost when not installed)

Fungsi di belakang layer yang senantiasa berlaku dalam hal-ihwal perincian `@intlayer/analytics` sepenuhnya taat terhadap acuan yang lazim dipakai, tak-ubahnya seperti keberadaan pakem atau patokan yang biasa mendasari / membidani / menyelimuti referensi kebergantungan situasional (optional-dependency pattern) dalam serangkaian fungsi dari ranah operasional `@intlayer/editor`:

- di setiap rupa kemunculan pada fase / titik pertautan (integration point) sistem senantiasa mendatangkan wujud dari kumpulan rujukan kodingnya dalam model penanganan kesalahan yaitu mendayagunakan blok rujukan di kerangka kodingan bersandikan **`try/catch` pada rangkaian perincian pemanggil model pemanggil dari fungsi / pola struktur pemrograman pemanggil dinamis `import()` (dynamic `import()`)** — Hal itu mengasumsikan bila ternyata sewaktu sistem di mana di satu aplikasi tak-menyematkan proses pasang modul / instal koding pendukung untuk instrumen ini (di kasus penggunaan rujukan spesifik bagi instalasi alat pelacak seperti instalasi di `@intlayer/analytics`) — itu sama sekali tak akan mengurangi sedikit pun ruang ketersediaan sistem penyedia data atau server karena sistem mengasumsikan penggunanya memang memandang sebelah mata perihal tersebut (yakni tak pernah merilis wujud dukungan alat operasional penganalisa data rujukan aplikasi untuk ukuran besar/bundel pada penyediaan / runtime di sisi sistem dan tidak perlu melihat kegagalan proses).
- variabel lingkungan saat kompilasi (`INTLAYER_ANALYTICS_ENABLED`), yang otomatis diatur ke `'false'` oleh `@intlayer/config` setiap kali paket tidak terpasang, `analytics.enabled` bernilai `false`, atau `editor.clientId` tidak dikonfigurasi, memungkinkan bundler **menghilangkan seluruh integrasi sebagai kode mati (dead-code-eliminate)**;
  Bentuk pengeset-an rupa-rupa di waktu-awal oleh koding pengatur yakni alat di lingkungan rancangan pemograman (`@intlayer/config`) menyelaraskannya seraya otomatis dikukuhkan kepada bentuk referensi bertuliskankan status `'false'` dan rujukan pengunci dari sisi / sisi koding pendefinisi tak ditemukan keberadaannya dari sisi koding acuan konfigurasi (`editor.clientId`). Proses berkesinambungan menyingkirkan elemen mati demi mencegah rupa serpihan sampah ini disebut sebagai — fitur pembuangan dari elemen kode mubazir (atau perlakuan ini dikenal di dunia sistem sebagai pemicu dalam fungsi acuan yang disebut hal **dead-code-eliminate**).

## Dasbor (Dashboard): Halaman Analitik

Saat di mana perancangan rupa proyek Anda secara sempurna rampung & mampu / bisa mengambil dan menyalin kejadian di ranahnya — perincian perujukan sistem dari pemanggil pada tautan **Analytics** pada tampilan di dasbor/pusat fungsi rujukan operasional pada antarmuka ([Intlayer dashboard](https://app.intlayer.org/analytics)) maka bagian tersebut senantiasa terbuka dan tampak bila pengguna menentukan opsi ke sebuah perwujudan pilihan atau proyek tertentu di dalam kolom-menu samping dari layar antar-muka operasional (sidebar) dan tampil perinciannya:

- **Rujukan dari pengunjung atau pemakai / pelanggan atau pengguna-aktif harian** (Active users).
- **Hasil catatan perihal rincian rujukan harian pengunjung / orang yang berlalu lalang (today & last 7 days)**.
- Rangkaian catatan **halaman-halaman** sepanjang jeda hari (Page views) pada periode tertentu.
- Acuan grafis visual yang menjelaskan laju/rekaman harian orang berkunjung.
- Seksi-seksi pilihan untuk mengatur penjabaran berdasarkan perpaduan antara **wilayah/Daerah pilihan pengguna (Locales)** dari pengunjung & acuan per wilayah pemetaan ke-negara / geografi.

## Referensi API Backend (Backend API reference)

Untuk segenap rincian di dalam pangkalan yang bersinggungan langsung sewaktu proses perujukan atau pembacaan-data meniscayakan perlunya satu identifikasi atau rujukan data terpusat (authenticated); proses sebaliknya (pemasukan referensi / ingestion) dibebaskan dan dirujuk & diatur lewat sebaris kode (`clientId`) yang dideklarasikan secara tertanam di sekujur bentuk operasional rincian pembawa referensinya (body parameter).

| Method | Endpoint                                    | Deskripsi                                                                                                      |
| ------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/events`                     | Proses memasukkan referensi data per kumpulan data berantai (bersifat teruka, diatribusikan lewat `clientId`). |
| `GET`  | `/api/analytics/overview`                   | Kalkulasi halaman (Page) / Daerah Bahasa (Locale) terhadap hasil perhitungan autentikasi keseluruhan.          |
| `GET`  | `/api/analytics/audience?days=30`           | Menjabarkan serangkaian referensi harian untuk setiap ragam pengelompokannya berdasarkan rincian acuan.        |
| `GET`  | `/api/analytics/content-stats`              | Kumpulan kalkulasi (total) untuk masing-masing wujud paparan / eksposur (berkelompok & dikategorikan).         |
| `GET`  | `/api/analytics/experiments/:experimentKey` | Nilai atau serangkaian nilai / referensi A/B test (pengaruh eksperimental dari wujud tampilan pembanding).     |

Fungsi SDK Intlayer secara otomatis menyalurkan ragam instrumen pada fungsi ini melalui jalur kode ter-automasi lewat pemrograman, hal tersebut senantiasa berpedoman kepada fungsi kodingan yang sama dari sumber SDK ini.
Lihat / Pelajari selengkapnya seputar: [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

> **Hanya di sisi server.** `createIntlayerCMS()` melakukan autentikasi dengan `clientId` + `clientSecret`, dan secret tidak pernah tersedia di browser: cuplikan kode ini akan mengirim permintaan yang tidak terautentikasi jika dijalankan di sana. Simpan kode ini di route handler, server action, atau skrip.

## Tautan Berguna (Useful links)

- [Kamus Dinamis - Koleksi & Varian (Dynamic Dictionaries - Collections & Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- [Editor Visual Intlayer (Intlayer Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- [Referensi Konfigurasi (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [Panduan Hosting Mandiri (Self-Hosting Guide)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md)
