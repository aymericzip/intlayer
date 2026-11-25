---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "कलेक्शन: स्थिति या ID के आधार पर स्थानीयकृत सूचियाँ"
description: "Intlayer में हर आइटम के लिए एक कंटेंट फ़ाइल से स्थानीयकृत सूचियाँ बनाएँ: FAQ, ब्लॉग पोस्ट या डेटाबेस रिकॉर्ड, जिन्हें स्थिति या ID से चुना जाता है, और सूची पेजों के लिए मेटाडेटा के साथ।"
keywords:
  - संग्रह
  - सामग्री सूची
  - डेटाबेस ID
  - डायनेमिक सामग्री
  - Intlayer
  - अंतर्राष्ट्रीयकरण
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "आइटम `metadata`, `metadataOnly` सेलेक्टर और स्ट्रिंग आइटम ID जोड़े गए"
  - version: 9.0.0
    date: 2026-06-12
    changes: "संग्रह डिक्शनरी सुविधा का विमोचन"
author: aymericzip
---

# संग्रह (Collections): स्थानीयकृत आइटम की सूचियाँ

एक **संग्रह** (collection) उन कंटेंट फ़ाइलों का सेट है जो एक ही डिक्शनरी `key` साझा करती हैं और हर फ़ाइल एक अलग `item` घोषित करती है। Intlayer बिल्ड के समय इन्हें एक सूची में मिला देता है, जिसे आप पूरा या एक-एक आइटम करके पढ़ सकते हैं। किसी आइटम की पहचान स्थिति (`1`, `2`…) या स्ट्रिंग ID से होती है, जैसे डेटाबेस रिकॉर्ड का ID।

## विषय सूची

<TOC />

## आइटम घोषित करना

हर फ़ाइल एक आइटम है:

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

### स्ट्रिंग ID से पहचाने जाने वाले आइटम

जब आइटम किसी डेटाबेस या CMS से आते हैं, तो रिकॉर्ड ID को `item` के रूप में उपयोग करें:

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

- **क्रम**: पूरी सूची पहले संख्यात्मक आइटम को मान के अनुसार, फिर स्ट्रिंग ID को कैरेक्टर कोड के अनुसार लौटाती है, इसलिए MongoDB ObjectId और UUIDv7 बनाए जाने के क्रम में आते हैं।
- **टेक्स्ट के रूप में संख्याएँ**: `item: "2"` और `item: 2` एक ही आइटम हैं। `"007"` स्ट्रिंग ID ही रहता है।
- **Markdown frontmatter**: जिन ID को YAML संख्या के रूप में पढ़ता है, उन्हें उद्धरण चिह्नों में रखें। बिना उद्धरण के `0012` बन जाता है `12` और `123e4567` बन जाता है `Infinity`।
- **अक्षरों का केस**: `importMode: "dynamic"` के साथ ऐसे ID से बचें जो केवल केस में अलग हों (`abc` और `ABC`)। ये macOS और Windows फ़ाइल सिस्टम पर टकराते हैं।

### आइटम के बीच साझा कंटेंट

समान `key` वाली और बिना `item` वाली फ़ाइल वह कंटेंट रखती है जो हर आइटम साझा करता है। हर आइटम इससे पूरा होता है, और जब दोनों एक ही फ़ील्ड घोषित करते हैं तो आइटम अपना मान रखता है:

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

अब `useIntlayer("faq")` के हर आइटम में `question`, `answer` और `contactLabel` हैं।

## संग्रह पढ़ना

### सभी आइटम

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

### एक आइटम

```tsx
// स्थिति के आधार पर
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// ID के आधार पर
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// स्पष्ट locale के साथ
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

जिस `item` को कोई फ़ाइल घोषित नहीं करती, वह `null` लौटाता है, ताकि डिटेल पेज अपनी "नहीं मिला" स्थिति दिखा सके।

## आइटम मेटाडेटा

हर आइटम `metadata` घोषित कर सकता है: सरल डेटा (शीर्षक, तारीख, टैग…) जो कंटेंट से अलग रखा जाता है और जैसा घोषित है वैसा ही लौटाया जाता है। सूची पेज आइटम लोड किए बिना सभी आइटम का मेटाडेटा पढ़ता है, जिससे 1,000 पोस्ट वाला ब्लॉग भी तेज़ रहता है।

`.content.md` फ़ाइल में frontmatter ही मेटाडेटा बन जाता है, डिक्शनरी सेटिंग्स (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`) को छोड़कर। इसका अनुवाद करने के लिए हर locale के लिए एक फ़ाइल घोषित करें:

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

`item` मेटाडेटा का हिस्सा नहीं है, इसलिए `id` उसे दोहराता है ताकि सूची की हर एंट्री अपने पेज से लिंक हो सके।

`.content.ts` फ़ाइल में `metadata` फ़ील्ड सेट करें, जैसे `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`। बहुभाषी घोषणा में यह हर locale पर लागू होता है।

विज़ुअल एडिटर और CMS में, डिक्शनरी का **Metadata** टैब इन फ़ील्ड्स को संपादित करता है और उन्हें घोषणा फ़ाइल में वापस सहेजता है।

### सूची और डिटेल पेज

`metadataOnly: true` मेटाडेटा पढ़ता है, `item` एक आइटम का कंटेंट पढ़ता है:

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

एक आइटम का मेटाडेटा पढ़ने के लिए दोनों को साथ इस्तेमाल करें, उदाहरण के लिए पेज के `<head>` में: `useIntlayer("blog", { item: postId, metadataOnly: true })`।

## ज़रूरत पड़ने पर आइटम लोड करना

आइटम फ़ाइलों पर `importMode: "dynamic"` के साथ, हर आइटम प्रति locale अपने अलग chunk में भेजा जाता है:

- `{ item }` केवल वही आइटम लोड करता है।
- पूरी सूची सभी आइटम को समानांतर में लोड करती है।
- पूरी सूची पर `{ metadataOnly: true }` एक ही मेटाडेटा इंडेक्स लोड करता है, आइटम कभी नहीं।

स्टैटिक और डायनेमिक मोड समान मान लौटाते हैं। `importMode: "fetch"` अभी संग्रह को सपोर्ट नहीं करता: वे बिल्ड चेतावनी के साथ स्टैटिक import पर लौट आते हैं। import मोड के लिए [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

## वेरिएंट के साथ संयोजन

आइटम एक `variant` भी घोषित कर सकते हैं ([वेरिएंट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/variants.md) देखें)। तब उस key की हर आइटम फ़ाइल `item` और `variant` दोनों घोषित करती है:

```tsx
// "promo" के लिए घोषित आइटम, हर एक अपने "default" संस्करण से पूरा किया गया
const promoItems = useIntlayer("banner", { variant: "promo" });

// "promo" वेरिएंट का एक आइटम
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

जिस आइटम के लिए `promo` घोषणा नहीं है, वह `promo` सूची में शामिल नहीं होता।

## सामान्य उपयोग के मामले

- FAQ सूचियाँ
- मूल्य निर्धारण योजनाएँ
- कैरोसेल और स्लाइडर स्लाइड
- चरण-दर-चरण निर्देश
- ब्लॉग पोस्ट
- डेटाबेस या CMS से रिकॉर्ड, ID के आधार पर
