---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Dinamik Kayıtlar
description: Derleme zamanı numaralandırması olmadan kesin tür atanmış (strongly-typed) dinamik içerik sağlamak üzere çalışma zamanında opak bir ID ile getirilen CMS yönetimli kayıtları bildirmek için Intlayer içerik dosyalarındaki meta alanını kullanın.
keywords:
  - Dinamik Kayıtlar
  - Dinamik İçerik
  - CMS
  - Çalışma Zamanı İçeriği
  - Intlayer
  - Uluslararasılaştırma
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Dinamik içerik özelliğinin sürümü"
author: aymericzip
---

# Dinamik Kayıtlar

Bir **dinamik kayıt** (dynamic record), kimliği sıralı bir dizin (index) veya adlandırılmış bir varyant olmayan, bunun yerine bir `meta` alanında bildirilen rastgele anahtar-değer çiftleri kümesi olan bir içerik dosyasıdır. Intlayer, çalışma zamanında (runtime) bu alanları seçici olarak kullanır. Bu sayede CMS kayıtlarını, kullanıcıya özel metinleri veya derleme zamanında anahtarları bilinmeyen herhangi bir içeriği adreslemeyi mümkün kılar.

## Dinamik kayıtları bildirme

```ts fileName="product-copy.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product-copy",
  meta: {
    id: "prod_abc",
    userId: "user_123",
  },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
    description: t({ en: "The best widget.", fr: "Le meilleur widget." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product-copy.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product-copy",
  meta: {
    id: "prod_abcd",
    userId: "user_123",
  },
  content: {
    name: t({ en: "Widget Lite", fr: "Widget Lite" }),
    description: t({ en: "A lighter option.", fr: "Une option plus légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

## Dinamik kayıtları tüketme

Seçicide tüm `meta` alanları **zorunludur**. Herhangi bir alanın atlanması `null` döndürür ve bir TypeScript hatasıdır.

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // TypeScript hem `id` hem de `userId` alanlarının sağlanmasını zorunlu kılar.

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // TypeScript hem `id` hem de `userId` alanlarının sağlanmasını zorunlu kılar.

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="ProductCopy.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product-copy", { id: props.productId, userId: props.userId });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="ProductCopy.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product-copy", { id: productId, userId });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // TypeScript hem `id` hem de `userId` alanlarının sağlanmasını zorunlu kılar.

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const ProductCopy = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: props.productId, userId: props.userId });
      // TypeScript hem `id` hem de `userId` alanlarının sağlanmasını zorunlu kılar.

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product-copy.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product-copy",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductCopyComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product-copy", { id: this.productId, userId: this.userId });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product-copy.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product-copy", {
      id: "prod_abcd",
      userId: "user_123"
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

### Belirli dil seçeneği ile

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "tr",
});
```

### Eksik meta alanı — derleme zamanı hatası

```ts
// Tip hatası: `userId` eksik
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## Yükleme modu (loading mode)

Dinamik kayıtlar genellikle geç (lazy) yüklenir. Bunu kontrol etmek için sözlükte `importMode` alanını ayarlayın:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // veya "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

`static`, `dynamic` ve `fetch` modları hakkında ayrıntılı bilgi için [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) sayfasına bakın.

## Tipik kullanım senaryoları

- Bir CMS'de yönetilen ürün başına pazarlama metinleri
- Kullanıcıya veya hesaba özel içerik
- Çalışma zamanında opak bir kimlikle (ID) anahtarlanan tüm içerikler
