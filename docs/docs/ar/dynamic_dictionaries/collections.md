---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "المجموعات: قوائم مترجمة حسب الموضع أو المعرّف"
description: "أنشئ قوائم مترجمة في Intlayer بملف محتوى واحد لكل عنصر: الأسئلة الشائعة أو مقالات المدونة أو سجلات قاعدة البيانات، تُحدَّد حسب الموضع أو المعرّف، مع بيانات وصفية لصفحات القوائم."
keywords:
  - المجموعات
  - قائمة المحتوى
  - معرّف قاعدة البيانات
  - المحتوى الديناميكي
  - Intlayer
  - تدويل
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "إضافة `metadata` للعناصر والمحدِّد `metadataOnly` والمعرّفات النصية للعناصر"
  - version: 9.0.0
    date: 2026-06-12
    changes: "إصدار ميزة قواميس المجموعات"
author: aymericzip
---

# المجموعات: قوائم مترجمة من العناصر

**المجموعة** (Collection) هي مجموعة من ملفات المحتوى تتشارك `key` قاموس واحداً، ويعلن كل منها عن `item` مختلف. يدمجها Intlayer وقت البناء في قائمة تقرؤها كاملة أو عنصراً بعنصر. يُعرَّف العنصر بموضع (`1`، `2`…) أو بمعرّف نصي، مثل معرّف سجل في قاعدة بيانات.

## جدول المحتويات

<TOC />

## الإعلان عن العناصر

كل ملف هو عنصر واحد:

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

### عناصر تُعرَّف بمعرّف نصي

عندما تأتي العناصر من قاعدة بيانات أو من CMS، استخدم معرّف السجل كقيمة `item`:

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

- **الترتيب**: تعيد القائمة الكاملة العناصر الرقمية حسب قيمتها أولاً، ثم المعرّفات النصية حسب رمز الحرف، لذا تظهر معرّفات ObjectId في MongoDB وقيم UUIDv7 بترتيب إنشائها.
- **الأرقام كنص**: `item: "2"` و`item: 2` هما العنصر نفسه. أما `"007"` فيبقى معرّفاً نصياً.
- **Frontmatter في Markdown**: ضع بين علامتي اقتباس المعرّفات التي يقرؤها YAML كأرقام. من دونهما يصبح `0012` هو `12` ويصبح `123e4567` هو `Infinity`.
- **حالة الأحرف**: مع `importMode: "dynamic"`، تجنّب المعرّفات التي تختلف في حالة الأحرف فقط (`abc` و`ABC`). فهي تتعارض على أنظمة ملفات macOS وWindows.

### محتوى مشترك بين العناصر

الملف الذي يحمل `key` نفسه ولا يحتوي على `item` يضم المحتوى المشترك بين جميع العناصر. يُكمَّل كل عنصر به، ويحتفظ بقيمته الخاصة عندما يعلن كلاهما عن الحقل نفسه:

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

أصبح لكل عنصر في `useIntlayer("faq")` الآن `question` و`answer` و`contactLabel`.

## قراءة مجموعة

### جميع العناصر

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

### عنصر واحد

```tsx
// حسب الموضع
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// حسب المعرّف
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// مع لغة محددة صراحةً
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

يعيد `item` الذي لا يعلنه أي ملف القيمة `null`، فتستطيع صفحة التفاصيل عرض حالة "غير موجود".

## البيانات الوصفية للعناصر

يمكن لكل عنصر أن يعلن عن `metadata`: بيانات بسيطة (عنوان، تاريخ، وسوم…) تُحفظ منفصلة عن محتواه وتُعاد كما أُعلنت. تقرأ صفحة القائمة البيانات الوصفية لكل العناصر دون تحميل العناصر نفسها، فتبقى مدونة من 1000 مقال سريعة.

في ملف `.content.md`، تصبح الـ frontmatter هي البيانات الوصفية، باستثناء إعدادات القاموس (`key`، `locale`، `item`، `variant`، `importMode`، `fill`، `location`، `priority`، `version`). أعلن عن ملف لكل لغة لترجمتها:

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

`item` ليس جزءاً من البيانات الوصفية، لذا يكرّره `id` لربط كل عنصر في القائمة بصفحته.

في ملف `.content.ts`، عيّن الحقل `metadata`، مثل `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. في الإعلان متعدد اللغات، ينطبق على جميع اللغات.

في المحرر المرئي وفي CMS، يعدّل تبويب **Metadata** الخاص بالقاموس هذه الحقول ويحفظها في ملف الإعلان.

### صفحات القوائم والتفاصيل

يقرأ `metadataOnly: true` البيانات الوصفية، ويقرأ `item` محتوى عنصر واحد:

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

اجمع بينهما لقراءة البيانات الوصفية لعنصر واحد، مثلاً في `<head>` الصفحة: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## تحميل العناصر عند الطلب

مع `importMode: "dynamic"` على ملفات العناصر، يُشحن كل عنصر في chunk خاص به لكل لغة:

- يحمّل `{ item }` ذلك العنصر فقط.
- تحمّل القائمة الكاملة جميع العناصر بالتوازي.
- يحمّل `{ metadataOnly: true }` على القائمة الكاملة فهرس بيانات وصفية واحداً، ولا يحمّل العناصر أبداً.

يعيد الوضعان الثابت والديناميكي القيم نفسها. لا يدعم `importMode: "fetch"` المجموعات بعد: فهي تعود إلى الاستيراد الثابت، مع تحذير أثناء البناء. راجع [تحسين حجم الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) لمعرفة أوضاع الاستيراد.

## الجمع مع المتغيرات

يمكن للعناصر أيضاً أن تعلن عن `variant` (راجع [المتغيرات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/variants.md)). عندها يعلن كل ملف عنصر لهذا المفتاح عن `item` و`variant` معاً:

```tsx
// العناصر المعلنة لـ "promo"، كل منها مكمَّل بنسخته "default"
const promoItems = useIntlayer("banner", { variant: "promo" });

// عنصر واحد من المتغير "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

العنصر الذي لا يملك إعلاناً لـ `promo` يُستبعد من قائمة `promo`.

## حالات الاستخدام الشائعة

- قوائم الأسئلة الشائعة (FAQ)
- خطط الأسعار
- شرائح العرض الدوّار (carousel) والمنزلق (slider)
- تعليمات خطوة بخطوة
- مقالات المدونة
- سجلات من قاعدة بيانات أو من CMS، حسب المعرّف
