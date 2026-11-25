---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Koleksi: daftar terlokalisasi berdasarkan posisi atau ID"
description: "Bangun daftar terlokalisasi di Intlayer dengan satu file konten per item: FAQ, artikel blog, atau record database, dipilih berdasarkan posisi atau ID, dengan metadata untuk halaman daftar."
keywords:
  - Koleksi
  - Daftar Konten
  - ID database
  - Konten Dinamis
  - Intlayer
  - Internasionalisasi
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Menambahkan `metadata` item, selektor `metadataOnly`, dan ID item berupa string"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Rilis fitur kamus koleksi"
author: aymericzip
---

# Koleksi: daftar item terlokalisasi

Sebuah **koleksi** adalah sekumpulan file konten yang berbagi satu `key` kamus, masing-masing mendeklarasikan `item` yang berbeda. Intlayer menggabungkannya saat build menjadi sebuah daftar yang bisa Anda baca seluruhnya atau per item. Sebuah item diidentifikasi oleh posisi (`1`, `2`…) atau ID berupa string, seperti ID record database.

## Daftar Isi

<TOC />

## Mendeklarasikan item

Setiap file adalah satu item:

```ts fileName="faq.1.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 1,
  content: {
    question: t({ en: "What is Intlayer?", fr: "Qu'est-ce qu'Intlayer ?" }),
    answer: t({ en: "An i18n toolkit.", fr: "Une boîte à outils i18n." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="faq.2.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 2,
  content: {
    question: t({ en: "Is it free?", fr: "Est-ce gratuit ?" }),
    answer: t({ en: "Yes, open-source.", fr: "Oui, open-source." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Item yang diidentifikasi dengan ID string

Saat item berasal dari database atau CMS, gunakan ID record sebagai `item`:

```ts fileName="src/products/desk-lamp.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "products",
  item: "6620d4e8a1b2c3d4e5f60718",
  content: {
    name: t({ en: "Desk lamp", fr: "Lampe de bureau" }),
  },
} satisfies Dictionary;

export default dictionary;
```

- **Urutan**: daftar lengkap mengembalikan item numerik berdasarkan nilainya, lalu ID string berdasarkan kode karakter, sehingga ObjectId MongoDB dan UUIDv7 tersusun sesuai urutan pembuatan.
- **Angka sebagai teks**: `item: "2"` dan `item: 2` adalah item yang sama. `"007"` tetap menjadi ID string.
- **Frontmatter Markdown**: beri tanda kutip pada ID yang dibaca YAML sebagai angka. Tanpa tanda kutip, `0012` menjadi `12` dan `123e4567` menjadi `Infinity`.
- **Huruf besar dan kecil**: dengan `importMode: "dynamic"`, hindari ID yang hanya berbeda huruf besar-kecilnya (`abc` dan `ABC`). Keduanya bertabrakan di sistem file macOS dan Windows.

### Konten bersama antar item

File dengan `key` yang sama dan tanpa `item` berisi konten yang dibagikan ke semua item. Setiap item dilengkapi dengannya, dan mempertahankan nilainya sendiri saat keduanya mendeklarasikan field yang sama:

```ts fileName="faq.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  content: {
    contactLabel: t({
      en: "Still stuck? Contact us",
      fr: "Toujours bloqué ? Contactez-nous",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

Setiap item dari `useIntlayer("faq")` kini memiliki `question`, `answer`, dan `contactLabel`.

## Membaca koleksi

### Semua item

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "react-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "next-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="FAQ.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const items = useIntlayer("faq");
    </script>

    <template>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <strong>{{ item.question }}</strong>
          <p>{{ item.answer }}</p>
        </li>
      </ul>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="FAQ.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const items = useIntlayer("faq");
    </script>

    <ul>
      {#each $items as item}
        <li>
          <strong>{item.question}</strong>
          <p>{item.answer}</p>
        </li>
      {/each}
    </ul>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "preact-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { For } from "solid-js";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          <For each={items()}>
            {(item) => (
              <li>
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </li>
            )}
          </For>
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="faq.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-faq",
      template: `
        <ul>
          @for (item of items(); track $index) {
            <li>
              <strong>{{ item.question }}</strong>
              <p>{{ item.answer }}</p>
            </li>
          }
        </ul>
      `,
    })
    export class FAQComponent {
      items = useIntlayer("faq");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="faq.js"
    import { useIntlayer } from "vanilla-intlayer";

    const faq = useIntlayer("faq");

    faq.forEach((item) => {
      console.log(item.question);
      console.log(item.answer);
    });
    ```

  </Tab>
</Tabs>

### Satu item

```tsx
// Berdasarkan posisi
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// Berdasarkan ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// Dengan locale eksplisit
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

`item` yang tidak dideklarasikan oleh file mana pun mengembalikan `null`, sehingga halaman detail dapat menampilkan status tidak ditemukan.

## Metadata item

Setiap item dapat mendeklarasikan `metadata`: data sederhana (judul, tanggal, tag…) yang disimpan terpisah dari kontennya dan dikembalikan apa adanya. Halaman daftar membaca metadata semua item tanpa memuat item-itemnya, sehingga blog dengan 1.000 artikel tetap cepat.

Dalam file `.content.md`, frontmatter menjadi metadata, kecuali pengaturan kamus (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Deklarasikan satu file per locale untuk menerjemahkannya:

```md fileName="src/blog/first-post.en.content.md"
---
key: blog
locale: en
item: 65f1c0a2b3c4d5e6f7a8b9c0
id: 65f1c0a2b3c4d5e6f7a8b9c0
title: First post
---

# First post
```

`item` bukan bagian dari metadata, jadi `id` mengulanginya untuk menautkan setiap entri daftar ke halamannya.

Dalam file `.content.ts`, isi field `metadata`, misalnya `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. Pada deklarasi multibahasa, field ini berlaku untuk semua locale.

Di editor visual dan CMS, tab **Metadata** pada sebuah kamus mengedit field ini dan menyimpannya kembali ke file deklarasi.

### Halaman daftar dan detail

`metadataOnly: true` membaca metadata, `item` membaca konten satu item:

```tsx fileName="BlogList.tsx"
import { useIntlayer } from "react-intlayer";

export const BlogList = () => {
  const posts = useIntlayer("blog", { metadataOnly: true });

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <a href={`/blog/${post.id}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  );
};
```

```tsx fileName="BlogPost.tsx"
import { useIntlayer } from "react-intlayer";

export const BlogPost = ({ postId }: { postId: string }) => {
  const post = useIntlayer("blog", { item: postId });

  if (!post) return <p>Post not found</p>;

  return <article>{post}</article>;
};
```

Gabungkan keduanya untuk membaca metadata satu item, misalnya di `<head>` halaman: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Memuat item sesuai kebutuhan

Dengan `importMode: "dynamic"` pada file item, setiap item dikirim dalam chunk-nya sendiri per locale:

- `{ item }` hanya memuat item tersebut.
- Daftar lengkap memuat semua item secara paralel.
- `{ metadataOnly: true }` pada daftar lengkap memuat satu indeks metadata, tidak pernah memuat item-itemnya.

Mode statis dan dinamis mengembalikan nilai yang sama. `importMode: "fetch"` belum mendukung koleksi: koleksi kembali ke import statis, dengan peringatan saat build. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) untuk mode import.

## Menggabungkan dengan varian

Item juga dapat mendeklarasikan `variant` (lihat [Varian](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/variants.md)). Setiap file item dari key tersebut kemudian mendeklarasikan `item` sekaligus `variant`:

```tsx
// Item yang dideklarasikan untuk "promo", masing-masing dilengkapi versi "default"-nya
const promoItems = useIntlayer("banner", { variant: "promo" });

// Satu item dari varian "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

Item tanpa deklarasi `promo` tidak masuk ke daftar `promo`.

## Kasus penggunaan umum

- Daftar FAQ
- Paket harga
- Slide carousel dan slider
- Instruksi langkah demi langkah
- Artikel blog
- Record dari database atau CMS, berdasarkan ID
