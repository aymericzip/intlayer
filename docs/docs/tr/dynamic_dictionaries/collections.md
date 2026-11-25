---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Koleksiyonlar: konuma veya ID'ye göre yerelleştirilmiş listeler"
description: "Intlayer'da öğe başına bir içerik dosyasıyla yerelleştirilmiş listeler oluşturun: SSS, blog yazıları veya veritabanı kayıtları, konuma veya ID'ye göre seçilir ve liste sayfaları için meta verilerle gelir."
keywords:
  - Koleksiyonlar
  - İçerik Listesi
  - Veritabanı ID'si
  - Dinamik İçerik
  - Intlayer
  - Uluslararasılaştırma
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Öğe `metadata` alanı, `metadataOnly` seçicisi ve string öğe ID'leri eklendi"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Koleksiyon sözlükleri özelliğinin sürümü"
author: aymericzip
---

# Koleksiyonlar: yerelleştirilmiş öğe listeleri

Bir **koleksiyon**, aynı sözlük `key` değerini paylaşan ve her biri farklı bir `item` bildiren içerik dosyaları kümesidir. Intlayer bunları build sırasında, tamamını veya tek tek öğelerini okuyabileceğiniz bir listede birleştirir. Bir öğe bir konumla (`1`, `2`…) veya veritabanı kayıt ID'si gibi bir string ID ile tanımlanır.

## İçindekiler

<TOC />

## Öğeleri bildirme

Her dosya bir öğedir:

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

### String ID ile tanımlanan öğeler

Öğeler bir veritabanından veya CMS'ten geliyorsa, kayıt ID'sini `item` olarak kullanın:

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

- **Sıra**: tam liste önce sayısal öğeleri değere göre, ardından string ID'leri karakter koduna göre döndürür. Bu yüzden MongoDB ObjectId'leri ve UUIDv7 değerleri oluşturulma sırasıyla listelenir.
- **Metin olarak sayılar**: `item: "2"` ve `item: 2` aynı öğedir. `"007"` ise string ID olarak kalır.
- **Markdown frontmatter**: YAML'ın sayı olarak okuduğu ID'leri tırnak içine alın. Tırnaksız yazıldığında `0012`, `12` olur ve `123e4567`, `Infinity` olur.
- **Büyük/küçük harf**: `importMode: "dynamic"` ile yalnızca harf büyüklüğüyle ayrılan ID'lerden (`abc` ve `ABC`) kaçının. Bunlar macOS ve Windows dosya sistemlerinde çakışır.

### Öğeler arasında paylaşılan içerik

Aynı `key` değerine sahip ve `item` içermeyen bir dosya, tüm öğelerin paylaştığı içeriği tutar. Her öğe bununla tamamlanır ve ikisi aynı alanı bildirdiğinde kendi değerini korur:

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

Artık `useIntlayer("faq")` içindeki her öğede `question`, `answer` ve `contactLabel` bulunur.

## Bir koleksiyonu okuma

### Tüm öğeler

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

### Tek bir öğe

```tsx
// Konuma göre
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// ID'ye göre
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// Açık bir locale ile
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

Hiçbir dosyanın bildirmediği bir `item`, `null` döndürür. Böylece bir detay sayfası "bulunamadı" durumunu gösterebilir.

## Öğe meta verileri

Her öğe `metadata` bildirebilir: içerikten ayrı tutulan ve bildirildiği gibi döndürülen basit veriler (başlık, tarih, etiketler…). Bir liste sayfası, öğeleri yüklemeden tüm öğelerin meta verilerini okur. Bu sayede 1.000 yazılık bir blog hızlı kalır.

Bir `.content.md` dosyasında frontmatter, sözlük ayarları (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`) dışında meta veriye dönüşür. Çevirmek için her locale için bir dosya bildirin:

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

`item` meta verilerin parçası değildir. Bu yüzden `id` onu tekrarlar ve her liste girişini kendi sayfasına bağlar.

Bir `.content.ts` dosyasında `metadata` alanını ayarlayın, örneğin `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. Çok dilli bir bildirimde tüm locale'lere uygulanır.

Görsel editörde ve CMS'te, bir sözlüğün **Metadata** sekmesi bu alanları düzenler ve bildirim dosyasına geri kaydeder.

### Liste ve detay sayfaları

`metadataOnly: true` meta verileri, `item` ise tek bir öğenin içeriğini okur:

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

Tek bir öğenin meta verilerini okumak için ikisini birlikte kullanın, örneğin sayfanın `<head>` bölümünde: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Öğeleri isteğe bağlı yükleme

Öğe dosyalarında `importMode: "dynamic"` kullanıldığında her öğe, her locale için kendi chunk'ında sunulur:

- `{ item }` yalnızca o öğeyi yükler.
- Tam liste tüm öğeleri paralel olarak yükler.
- Tam listede `{ metadataOnly: true }` tek bir meta veri dizini yükler, öğeleri asla yüklemez.

Statik ve dinamik modlar aynı değerleri döndürür. `importMode: "fetch"` henüz koleksiyonları desteklemiyor: bunlar bir build uyarısıyla statik import'lara geri döner. Import modları için [bundle optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) sayfasına bakın.

## Varyantlarla birleştirme

Öğeler ayrıca bir `variant` bildirebilir (bkz. [Varyantlar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/variants.md)). Bu durumda anahtarın her öğe dosyası hem `item` hem de `variant` bildirir:

```tsx
// "promo" için bildirilen öğeler, her biri kendi "default" sürümüyle tamamlanır
const promoItems = useIntlayer("banner", { variant: "promo" });

// "promo" varyantının tek bir öğesi
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

`promo` bildirimi olmayan bir öğe `promo` listesinde yer almaz.

## Tipik kullanım senaryoları

- SSS listeleri
- Fiyatlandırma planları
- Carousel ve slider slaytları
- Adım adım talimatlar
- Blog yazıları
- ID'ye göre bir veritabanından veya CMS'ten gelen kayıtlar
