---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: السجلات الديناميكية
description: استخدم حقل meta في ملفات محتوى Intlayer للإعلان عن السجلات التي يديرها نظام إدارة المحتوى (CMS) والتي يتم جلبها في وقت التشغيل بواسطة معرف غير شفاف، مما يتيح محتوى ديناميكيًا قوي النوع بدون تعداد في وقت البناء.
keywords:
  - السجلات الديناميكية
  - المحتوى الديناميكي
  - نظام إدارة المحتوى
  - محتوى وقت التشغيل
  - Intlayer
  - تدويل
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "إصدار ميزة المحتوى الديناميكي"
author: aymericzip
---

# السجلات الديناميكية

**السجل الديناميكي** (dynamic record) هو ملف محتوى لا يتم تحديد هويته بواسطة فهرس تسلسلي أو متغير مسمى، بل بواسطة مجموعة عشوائية من أزواج المفاتيح والقيم المعلنة في حقل `meta`. يستخدم Intlayer هذه الحقول كمحدد في وقت التشغيل، مما يتيح معالجة سجلات CMS، أو نسخ محددة للمستخدم، أو أي محتوى لا تُعرف مفاتيحه في وقت البناء.

## الإعلان عن السجلات الديناميكية

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

## استهلاك السجلات الديناميكية

جميع حقول `meta` **مطلوبة** في المحدد. يؤدي حذف أي حقل إلى إرجاع `null` ويعد خطأ في TypeScript.

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
      // يضمن TypeScript توفير كل من `id` و `userId`.

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
      // يضمن TypeScript توفير كل من `id` و `userId`.

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
      // يضمن TypeScript توفير كل من `id` و `userId`.

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
      // يضمن TypeScript توفير كل من `id` و `userId`.

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

### مع تحديد لغة صريحة

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "fr",
});
```

### حقل meta مفقود — خطأ وقت الترجمة

```ts
// خطأ في النوع: `userId` مفقود
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## وضع التحميل

عادة ما يتم تحميل السجلات الديناميكية بشكل كسول. قم بتعيين `importMode` في القاموس للتحكم في ذلك:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // أو "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

انظر [تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) لمعرفة التفاصيل حول الأوضاع `static` و `dynamic` و `fetch`.

## حالات الاستخدام الشائعة

- نسخة تسويقية لكل منتج تتم إدارتها في نظام إدارة المحتوى (CMS)
- محتوى خاص بالمستخدم أو خاص بالحساب
- أي محتوى يتم تعيينه بواسطة معرف تشغيل غير شفاف
