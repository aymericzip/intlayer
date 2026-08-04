---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Varian
description: Gunakan field metadata variant di file konten Intlayer untuk mendeklarasikan alternatif konten bernama atau terstruktur — pengujian A/B, banner musiman, teks ber-feature flag, record CMS, konten khusus pengguna — dan beralih di antaranya saat runtime tanpa perubahan kode.
keywords:
  - Varian
  - Pengujian A/B
  - Feature Flag
  - Konten Dinamis
  - Record Dinamis
  - CMS
  - Intlayer
  - Internasionalisasi
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Rilis fitur varian"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` kini menerima string atau objek — `meta` / record dinamis sebelumnya dideklarasikan sebagai varian objek"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Varian hanya mendeklarasikan kunci yang ditimpanya; varian yang tidak dideklarasikan akan kembali ke entri default"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Provider menerima prop `variant` ambien; selektor menerima rantai preferensi terurut"
author: aymericzip
---

# Varian

Sebuah **varian** adalah sekumpulan file konten yang berbagi `key` kamus yang sama tetapi masing-masing membawa nilai `variant` yang berbeda. Intlayer menyajikan file yang sesuai berdasarkan selektor yang diberikan ke `useIntlayer`.

Nilai `variant` dapat berupa **dua bentuk**:

- **String** — satu alternatif bernama (pengujian A/B, banner musiman, feature flag).
- **Objek** — diskriminator terstruktur yang dialamatkan oleh sekumpulan field (record CMS, konten khusus pengguna, konten apa pun yang dikunci oleh ID buram). Seluruh objek adalah identitasnya: selektor harus memberikan objek yang **sama** untuk menyelesaikan entri.

> Bentuk objek menggantikan field `meta` sebelumnya. Di mana pun Anda dulu menulis `meta: { id, … }`, tulis `variant: { id, … }`, dan pilih dengan `{ variant: { id, … } }`.

## Varian bernama (string)

Setiap file mewakili satu alternatif bernama. Menghilangkan `variant` (atau mengaturnya ke `"default"`) menandainya sebagai fallback.

```ts fileName="hero-banner.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "default",
  content: {
    headline: t({
      en: "Build faster with Intlayer",
      fr: "Développez plus vite avec Intlayer",
    }),
    cta: t({ en: "Get started", fr: "Commencer" }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="hero-banner.black-friday.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "black_friday",
  content: {
    headline: t({
      en: "50 % off — today only",
      fr: "−50 % — aujourd'hui seulement",
    }),
    cta: t({ en: "Shop now", fr: "Acheter maintenant" }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Varian parsial

Varian **hanya mendeklarasikan kunci yang ditimpanya**; sisanya diwarisi dari entri default.

```ts fileName="hero-banner.summer.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "summer",
  content: {
    headline: t({
      en: "Build faster all summer",
      fr: "Développez plus vite tout l'été",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

```tsx
useIntlayer("hero-banner", { variant: "summer" });
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` diwarisi

useIntlayer("hero-banner", { variant: "never-declared" });
// → entri default
```

Jadi Anda hanya menambahkan file varian di mana kata-katanya benar-benar berbeda. Sebuah kunci hanya menjadi `null` jika mendeklarasikan varian tetapi tidak ada entri default.

### Mengonsumsi varian bernama

#### Varian default

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → varian default

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → varian default

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Hero.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { headline, cta } = useIntlayer("hero-banner");
    </script>

    <template>
      <section>
        <h1>{{ headline }}</h1>
        <a>{{ cta }}</a>
      </section>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Hero.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("hero-banner");
    </script>

    <section>
      <h1>{$content.headline}</h1>
      <a>{$content.cta}</a>
    </section>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → varian default

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Hero = () => {
      const content = useIntlayer("hero-banner");
      // → varian default

      return (
        <section>
          <h1>{content().headline}</h1>
          <a>{content().cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="hero.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-hero",
      template: `
        <section>
          <h1>{{ content().headline }}</h1>
          <a>{{ content().cta }}</a>
        </section>
      `,
    })
    export class HeroComponent {
      content = useIntlayer("hero-banner");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="hero.js"
    import { useIntlayer } from "vanilla-intlayer";

    const { headline, cta } = useIntlayer("hero-banner");

    document.body.innerHTML = `
      <section>
        <h1>${headline}</h1>
        <a>${cta}</a>
      </section>
    `;
    ```

  </Tab>
</Tabs>

#### Varian bernama

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Varian bernama dengan locale eksplisit

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Varian objek (terstruktur)

Varian objek mengalamatkan konten dengan sekumpulan pasangan key-value sewenang-wenang yang dideklarasikan di field `variant` — memungkinkan pemodelan record CMS, konten khusus pengguna, atau konten apa pun yang kuncinya berupa ID buram. **Seluruh objek** adalah identitasnya: selektor harus memberikan objek yang sama agar entri diselesaikan.

```ts fileName="product.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abc", userId: "user_123" },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
    description: t({ en: "The best widget.", fr: "Le meilleur widget." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abcd", userId: "user_123" },
  content: {
    name: t({ en: "Widget Lite", fr: "Widget Lite" }),
    description: t({ en: "A lighter option.", fr: "Une option plus légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Mengonsumsi varian objek

Berikan objek yang cocok ke `variant`. Setiap field yang dideklarasikan pada kamus harus disediakan dan sama; jika tidak, hasilnya `null`. Urutan field tidak penting.

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Product.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product", {
      variant: { id: props.productId, userId: props.userId },
    });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Product.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product", {
      variant: { id: productId, userId },
    });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Product = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: props.productId, userId: props.userId },
      });

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product", {
          variant: { id: this.productId, userId: this.userId },
        });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product", {
      variant: { id: "prod_abcd", userId: "user_123" },
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

#### Dengan locale eksplisit

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Field hilang — tidak cocok

```ts
// Mengembalikan null: `userId` hilang, sehingga objek tidak cocok dengan varian yang dideklarasikan
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Varian ambien

Beberapa dimensi varian tetap sepanjang satu sesi — tenant, jenis sekolah, tingkat paket. Semuanya diselesaikan sekali, dan tidak ada komponen yang perlu meneruskannya secara manual.

> Jangan membungkus `useIntlayer` dalam hook Anda sendiri untuk menyuntikkannya. Optimasi saat build hanya menulis ulang pemanggilan literal `useIntlayer("key")` yang diimpor dari paket framework, sehingga apa pun di balik pembungkus tidak akan ikut dibundel.

Sebagai gantinya, deklarasikan varian sekali pada provider, persis seperti `locale`:

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "react-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerServerProvider } from "next-intlayer/server";
    import { IntlayerClientProvider } from "next-intlayer";

    export default async function Layout({ children, params }) {
      const { locale } = await params;
      const schoolType = await getSchoolType();

      return (
        <IntlayerServerProvider locale={locale} variant={schoolType}>
          <IntlayerClientProvider locale={locale} variant={schoolType}>
            {children}
          </IntlayerClientProvider>
        </IntlayerServerProvider>
      );
    }
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```ts fileName="main.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { createApp } from "vue";
    import { installIntlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    installIntlayer(app, { locale: "en", variant: schoolType });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="+layout.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { setupIntlayer } from "svelte-intlayer";

    export let schoolType: string;

    setupIntlayer("en", schoolType);
    </script>

    <slot />
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "preact-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "solid-intlayer";

    export const App = (props) => (
      <IntlayerProvider locale={props.locale} variant={props.schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="app.config.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { ApplicationConfig } from "@angular/core";
    import { provideIntlayer } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer("en", true, schoolType)],
    };
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="main.js"
    import { installIntlayer } from "vanilla-intlayer";

    installIntlayer({ locale: "en", variant: schoolType });
    ```

  </Tab>
</Tabs>

Setiap pembacaan kamus di bawah provider kini diselesaikan terhadap varian tersebut, dan selektor di titik pemanggilan selalu menang:

```tsx
useIntlayer("hero-banner");
// → varian dari provider

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — menggantikan varian provider, bukan memperluasnya
```

### Bentuk

Prop `variant` menerima tiga bentuk:

| Bentuk                                                    | Arti                                   |
| --------------------------------------------------------- | -------------------------------------- |
| `variant="school1"`                                       | satu varian bernama untuk setiap kunci |
| `variant={["school1", "default"]}`                        | rantai preferensi terurut              |
| `variant={{ "hero-banner": "school1", default: "base" }}` | satu varian per kunci kamus            |

#### Rantai preferensi

Rantai dicoba dari kiri ke kanan terhadap entri yang dideklarasikan setiap kunci, dan yang pertama dideklarasikan menang. Bila tidak ada yang dideklarasikan, entri default implisit digunakan — persis seperti untuk nilai tunggal.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` tidak mendeklarasikan entri `school1` tetapi mendeklarasikan `school2` → "school2"
// kunci yang tidak mendeklarasikan keduanya → entri default
```

Jadi `["black_friday", "summer"]` dibaca sebagai «black friday jika kunci ini memilikinya, jika tidak summer, jika tidak default». Rantai juga diterima di titik pemanggilan:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Perhatikan bahwa ini adalah kebalikan dari array yang diterima oleh **field** `variant` pada berkas konten: di sana array _mendeklarasikan_ satu entri per elemen, di sini ia _mengonsumsi_ entri tersebut sesuai urutan prioritas.

#### Peta per kunci

Alamatkan setiap kunci kamus secara terpisah. Entri `default` yang dicadangkan mencakup semua kunci yang tidak terdaftar:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> Pada provider, objek biasa **selalu** dibaca sebagai peta per kunci, bukan sebagai varian objek — keduanya identik secara struktural. Untuk menetapkan varian objek secara global, sarangkan di bawah sebuah entri: `variant={{ default: { id: "prod_abc" } }}`.

Karena kunci pada peta diperiksa terhadap kunci kamus yang Anda deklarasikan, salah ketik — atau varian objek yang ditulis langsung, seperti `variant={{ id: "prod_abc" }}` — adalah galat saat kompilasi.

## Mode pemuatan

Varian objek sering dimuat secara malas. Atur `importMode` pada kamus untuk mengendalikannya:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) untuk detail tentang mode `static`, `dynamic`, dan `fetch`.

## Kasus penggunaan umum

- Pengujian A/B teks yang digerakkan oleh kunci eksperimen
- Banner musiman atau promosi
- Pesan ber-feature flag
- Kampanye pemasaran spesifik locale
- Teks pemasaran per-produk yang dikelola di CMS
- Konten khusus pengguna atau akun
- Konten apa pun yang dikunci oleh ID buram saat runtime
