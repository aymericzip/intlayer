---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: वेरिएंट
description: कोड परिवर्तनों के बिना रनटाइम पर उनके बीच स्विच करने के लिए नामित सामग्री विकल्पों (A/B परीक्षण, मौसमी बैनर, फीचर-फ़्लैग्ड प्रतिलिपि) को घोषित करने के लिए Intlayer सामग्री फ़ाइलों में variant मेटाडेटा फ़ील्ड का उपयोग करें।
keywords:
  - वेरिएंट
  - A/B परीक्षण
  - फीचर फ़्लैग
  - डायनेमिक सामग्री
  - Intlayer
  - अंतर्राष्ट्रीयकरण
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "वेरिएंट डिक्शनरी सुविधा का विमोचन"
author: aymericzip
---

# वेरिएंट (Variants)

एक **वेरिएंट** (variant) सामग्री फ़ाइलों का एक सेट है जो एक ही डिक्शनरी कुंजी (`key`) साझा करते हैं लेकिन प्रत्येक में एक अलग `variant` नाम होता है। Intlayer `useIntlayer` को दिए गए चयनकर्ता के आधार पर उपयुक्त फ़ाइल प्रस्तुत करता है।

## वेरिएंट घोषित करना

प्रत्येक फ़ाइल एक नामित विकल्प का प्रतिनिधित्व करती है। `variant` फ़ील्ड को छोड़ने (या इसे `"default"` पर सेट करने) से यह डिफ़ॉल्ट (fallback) वेरिएंट के रूप में चिह्नित हो जाता है।

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

## वेरिएंट का उपयोग करना

### डिफ़ॉल्ट वेरिएंट

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → डिफ़ॉल्ट वेरिएंट

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
      // → डिफ़ॉल्ट वेरिएंट

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
      // → डिफ़ॉल्ट वेरिएंट

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
      // → डिफ़ॉल्ट वेरिएंट

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

### नामित वेरिएंट

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

### स्पष्ट भाषा विकल्प के साथ नामित वेरिएंट

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "hi",
});
```

## विशिष्ट उपयोग के मामले

- एक परीक्षण कुंजी द्वारा संचालित A/B प्रतिलिपि परीक्षण
- मौसमी या प्रचार बैनर
- फीचर-फ़्लैग्ड मैसेजिंग
- स्थानीय बाजार के विशिष्ट अभियान
