---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: डायनेमिक रिकॉर्ड्स
description: बिल्ड-टाइम एन्यूमरेट किए बिना दृढ़ता से टाइप किए गए डायनेमिक कंटेंट को सक्षम करते हुए, एक अपारदर्शी आईडी द्वारा रनटाइम पर प्राप्त सीएमएस-प्रबंधित रिकॉर्ड घोषित करने के लिए Intlayer कंटेंट फ़ाइलों में meta फ़ील्ड का उपयोग करें।
keywords:
  - डायनेमिक रिकॉर्ड्स
  - डायनेमिक कंटेंट
  - सीएमएस
  - रनटाइम कंटेंट
  - Intlayer
  - अंतर्राष्ट्रीयकरण
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "डायनेमिक कंटेंट सुविधा का विमोचन"
author: aymericzip
---

# डायनेमिक रिकॉर्ड्स (Dynamic Records)

एक **डायनेमिक रिकॉर्ड** (dynamic record) एक कंटेंट फ़ाइल है जिसकी पहचान एक अनुक्रमिक इंडेक्स या एक नामांकित वेरिएंट नहीं है, बल्कि एक `meta` फ़ील्ड में घोषित कुंजी-मान (key-value) जोड़े का एक मनमाना सेट है। Intlayer इन फ़ील्ड्स का उपयोग रनटाइम पर चयनकर्ता (selector) के रूप में करता है, जिससे सीएमएस रिकॉर्ड्स, उपयोगकर्ता-विशिष्ट कॉपी, या किसी भी कंटेंट को संबोधित करना संभव हो जाता है जिसकी कुंजियाँ बिल्ड टाइम पर ज्ञात नहीं होती हैं।

## डायनेमिक रिकॉर्ड घोषित करना

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

## डायनेमिक रिकॉर्ड का उपयोग करना

चयनकर्ता में सभी `meta` फ़ील्ड **आवश्यक** हैं। किसी भी फ़ील्ड को छोड़ने पर `null` प्राप्त होता है और यह एक TypeScript त्रुटि है।

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
      // TypeScript लागू करता है कि id और userId दोनों प्रदान किए जाएं।

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
      // TypeScript लागू करता है कि id और userId दोनों प्रदान किए जाएं।

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
      // TypeScript लागू करता है कि id और userId दोनों प्रदान किए जाएं।

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
      // TypeScript लागू करता है कि id और userId दोनों प्रदान किए जाएं।

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

### स्पष्ट भाषा विकल्प के साथ

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "fr",
});
```

### अनुपलब्ध मेटा फ़ील्ड — कंपाइल-टाइम त्रुटि

```ts
// प्रकार त्रुटि: `userId` अनुपलब्ध है
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## लोडिंग मोड

डायनेमिक रिकॉर्ड्स को आमतौर पर आलसी तरीके से (lazily) लोड किया जाता है। इसे नियंत्रित करने के लिए डिक्शनरी पर `importMode` सेट करें:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // या "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

स्थिर (`static`), गतिशील (`dynamic`), और फ़ेच (`fetch`) मोड के विवरण के लिए [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

## विशिष्ट उपयोग के मामले

- सीएमएस में प्रबंधित प्रति-उत्पाद विपणन कॉपी (marketing copy)
- उपयोगकर्ता-विशिष्ट या खाता-विशिष्ट कंटेंट
- एक अपारदर्शी रनटाइम आईडी द्वारा कुंजीकृत कोई भी कंटेंट
