---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: वैरिएंट
description: नामित या संरचित सामग्री विकल्प — A/B परीक्षण, मौसमी बैनर, फ़ीचर-फ़्लैग टेक्स्ट, CMS रिकॉर्ड, उपयोगकर्ता-विशिष्ट सामग्री — घोषित करने और कोड बदले बिना रनटाइम पर उनके बीच स्विच करने के लिए Intlayer सामग्री फ़ाइलों में variant मेटाडेटा फ़ील्ड का उपयोग करें।
keywords:
  - वैरिएंट
  - A/B परीक्षण
  - फ़ीचर फ़्लैग
  - डायनेमिक सामग्री
  - डायनेमिक रिकॉर्ड
  - CMS
  - Intlayer
  - अंतर्राष्ट्रीयकरण
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "वैरिएंट सुविधा का रिलीज़"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` अब एक स्ट्रिंग या ऑब्जेक्ट स्वीकार करता है — पूर्व `meta` / गतिशील रिकॉर्ड को ऑब्जेक्ट वेरिएंट के रूप में घोषित किया जाता है"
  - version: 9.1.1
    date: 2026-07-31
    changes: "वेरिएंट केवल उन्हीं कुंजियों को घोषित करता है जिन्हें वह ओवरराइड करता है; अघोषित वेरिएंट डिफ़ॉल्ट प्रविष्टि पर वापस आ जाते हैं"
  - version: 9.1.2
    date: 2026-08-04
    changes: "प्रोवाइडर एक परिवेशी `variant` प्रॉप स्वीकार करते हैं; सेलेक्टर एक क्रमित वरीयता शृंखला स्वीकार करते हैं"
author: aymericzip
---

# वैरिएंट

एक **वैरिएंट** सामग्री फ़ाइलों का एक समूह है जो समान डिक्शनरी `key` साझा करती हैं लेकिन प्रत्येक का एक अलग `variant` मान होता है। Intlayer `useIntlayer` को पास किए गए सेलेक्टर के आधार पर उपयुक्त फ़ाइल परोसता है।

`variant` मान **दो रूप** ले सकता है:

- **एक स्ट्रिंग** — एकल नामित विकल्प (A/B परीक्षण, मौसमी बैनर, फ़ीचर फ़्लैग)।
- **एक ऑब्जेक्ट** — फ़ील्ड के सेट द्वारा संबोधित एक संरचित विभेदक (CMS रिकॉर्ड, उपयोगकर्ता-विशिष्ट सामग्री, अपारदर्शी ID द्वारा कुंजीबद्ध कोई भी सामग्री)। पूरा ऑब्जेक्ट ही पहचान है: प्रविष्टि हल करने के लिए सेलेक्टर को एक **समान** ऑब्जेक्ट देना होगा।

> ऑब्जेक्ट रूप पुराने `meta` फ़ील्ड की जगह लेता है। जहाँ भी आप पहले `meta: { id, … }` लिखते थे, वहाँ `variant: { id, … }` लिखें और इसे `{ variant: { id, … } }` के साथ चुनें।

## नामित (स्ट्रिंग) वैरिएंट

प्रत्येक फ़ाइल एक नामित विकल्प का प्रतिनिधित्व करती है। `variant` को छोड़ना (या `"default"` पर सेट करना) इसे फ़ॉलबैक के रूप में चिह्नित करता है।

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

### आंशिक वेरिएंट

एक वेरिएंट **केवल उन्हीं कुंजियों को घोषित करता है जिन्हें वह ओवरराइड करता है**; बाकी डिफ़ॉल्ट प्रविष्टि से विरासत में मिलती हैं।

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` विरासत में मिला

useIntlayer("hero-banner", { variant: "never-declared" });
// → डिफ़ॉल्ट प्रविष्टि
```

इसलिए आप केवल वहीं वेरिएंट फ़ाइल जोड़ते हैं जहां शब्द वास्तव में भिन्न होते हैं। एक कुंजी केवल तभी `null` पर हल होती है जब वह वेरिएंट घोषित करती है लेकिन कोई डिफ़ॉल्ट प्रविष्टि नहीं होती है।

### नामित वेरिएंट का उपयोग करना

#### डिफ़ॉल्ट वैरिएंट

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → डिफ़ॉल्ट वैरिएंट

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
      // → डिफ़ॉल्ट वैरिएंट

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
      // → डिफ़ॉल्ट वैरिएंट

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
      // → डिफ़ॉल्ट वैरिएंट

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

#### नामित वैरिएंट

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### स्पष्ट locale के साथ नामित वैरिएंट

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## ऑब्जेक्ट (संरचित) वैरिएंट

एक ऑब्जेक्ट वैरिएंट `variant` फ़ील्ड में घोषित मनमाने key-value युग्मों के सेट द्वारा सामग्री को संबोधित करता है — जिससे CMS रिकॉर्ड, उपयोगकर्ता-विशिष्ट सामग्री, या ऐसी कोई भी सामग्री मॉडल करना संभव हो जाता है जिसकी कुंजी एक अपारदर्शी ID है। पहचान **पूरा ऑब्जेक्ट** है: प्रविष्टि हल होने के लिए सेलेक्टर को एक समान ऑब्जेक्ट देना होगा।

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

### ऑब्जेक्ट वैरिएंट का उपयोग

मिलान करने वाला ऑब्जेक्ट `variant` में पास करें। डिक्शनरी में घोषित प्रत्येक फ़ील्ड प्रदान किया जाना चाहिए और समान होना चाहिए; अन्यथा परिणाम `null` होता है। फ़ील्ड का क्रम मायने नहीं रखता।

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

#### स्पष्ट locale के साथ

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### अनुपस्थित फ़ील्ड — कोई मिलान नहीं

```ts
// null लौटाता है: `userId` अनुपस्थित है, इसलिए ऑब्जेक्ट घोषित वैरिएंट से मेल नहीं खाता
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## परिवेशी वैरिएंट

कुछ वैरिएंट आयाम पूरे सत्र के लिए स्थिर रहते हैं — टेनेंट, विद्यालय का प्रकार, प्लान स्तर। ये एक ही बार हल होते हैं, और किसी भी कॉम्पोनेंट को इन्हें हाथ से पास नहीं करना चाहिए।

> इन्हें इंजेक्ट करने के लिए `useIntlayer` को अपने हुक में न लपेटें। बिल्ड-टाइम अनुकूलन केवल फ्रेमवर्क पैकेज से आयातित शाब्दिक `useIntlayer("key")` कॉल को ही पुनर्लिखित करता है, इसलिए किसी रैपर के पीछे कुछ भी बंडल नहीं होता।

इसके बजाय वैरिएंट को प्रोवाइडर पर एक ही बार घोषित करें, ठीक `locale` की तरह:

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
    <Tabs>
      <Tab label="Intlayer >=9.4" value=">=9.4">

        ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
        import { IntlayerProvider } from "next-intlayer/server";

        export default async function Layout({ children, params }) {
          const { locale } = await params;
          const schoolType = await getSchoolType();

          return (
            <IntlayerProvider locale={locale} variant={schoolType}>
              {children}
            </IntlayerProvider>
          );
        }
        ```

      </Tab>
      <Tab label="Intlayer <9.4" value="<9.4">

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
    </Tabs>

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

अब प्रोवाइडर के नीचे प्रत्येक डिक्शनरी पठन उसी वैरिएंट के सापेक्ष हल होता है, और कॉल-स्थल का सेलेक्टर हमेशा जीतता है:

```tsx
useIntlayer("hero-banner");
// → प्रोवाइडर का वैरिएंट

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — प्रोवाइडर वैरिएंट को प्रतिस्थापित करता है, उसका विस्तार नहीं करता
```

### रूप

`variant` प्रॉप तीन रूप स्वीकार करता है:

| रूप                                                       | अर्थ                             |
| --------------------------------------------------------- | -------------------------------- |
| `variant="school1"`                                       | हर कुंजी के लिए एक नामित वैरिएंट |
| `variant={["school1", "default"]}`                        | एक क्रमित वरीयता शृंखला          |
| `variant={{ "hero-banner": "school1", default: "base" }}` | प्रति डिक्शनरी कुंजी एक वैरिएंट  |

#### वरीयता शृंखला

शृंखला को प्रत्येक कुंजी द्वारा घोषित प्रविष्टियों के सापेक्ष बाएँ से दाएँ आज़माया जाता है, और पहली घोषित प्रविष्टि जीतती है। जब कोई भी घोषित न हो, तो निहित डिफ़ॉल्ट प्रविष्टि का उपयोग होता है — ठीक वैसे ही जैसे एकल मान के लिए।

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` कोई `school1` प्रविष्टि घोषित नहीं करता, पर `school2` घोषित करता है → "school2"
// वह कुंजी जो दोनों में से कोई घोषित नहीं करती → डिफ़ॉल्ट प्रविष्टि
```

अतः `["black_friday", "summer"]` का अर्थ है «यदि इस कुंजी के पास black friday है तो वही, अन्यथा summer, अन्यथा डिफ़ॉल्ट»। शृंखलाएँ कॉल-स्थल पर भी स्वीकार्य हैं:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> ध्यान दें कि यह कंटेंट फ़ाइल के `variant` **फ़ील्ड** द्वारा स्वीकार किए जाने वाले ऐरे का दर्पण प्रतिबिंब है: वहाँ एक ऐरे प्रति तत्व एक प्रविष्टि _घोषित_ करता है, यहाँ वह उन्हें प्राथमिकता क्रम में _उपभोग_ करता है।

#### प्रति-कुंजी मैप

प्रत्येक डिक्शनरी कुंजी को अलग-अलग संबोधित करें। आरक्षित `default` प्रविष्टि उन सभी कुंजियों को कवर करती है जो सूचीबद्ध नहीं हैं:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> प्रोवाइडर पर एक सामान्य ऑब्जेक्ट **हमेशा** प्रति-कुंजी मैप के रूप में पढ़ा जाता है, कभी ऑब्जेक्ट वैरिएंट के रूप में नहीं — दोनों संरचनात्मक रूप से समान हैं। किसी ऑब्जेक्ट वैरिएंट को वैश्विक रूप से तय करने के लिए उसे किसी प्रविष्टि के नीचे नेस्ट करें: `variant={{ default: { id: "prod_abc" } }}`।

चूँकि मैप की कुंजियाँ आपकी घोषित डिक्शनरी कुंजियों के विरुद्ध जाँची जाती हैं, कोई टाइपो — या सीधे लिखा गया ऑब्जेक्ट वैरिएंट, जैसे `variant={{ id: "prod_abc" }}` — संकलन-समय त्रुटि है।

## लोडिंग मोड

ऑब्जेक्ट वैरिएंट अक्सर आलसी रूप से लोड किए जाते हैं। इसे नियंत्रित करने के लिए डिक्शनरी पर `importMode` सेट करें:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

`static`, `dynamic` और `fetch` मोड के विवरण के लिए [बंडल ऑप्टिमाइज़ेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

## विशिष्ट उपयोग-मामले

- प्रयोग key द्वारा संचालित A/B टेक्स्ट परीक्षण
- मौसमी या प्रचारात्मक बैनर
- फ़ीचर-फ़्लैग संदेश
- locale-विशिष्ट मार्केटिंग अभियान
- CMS में प्रबंधित प्रति-उत्पाद मार्केटिंग टेक्स्ट
- उपयोगकर्ता-विशिष्ट या खाता-विशिष्ट सामग्री
- रनटाइम पर अपारदर्शी ID द्वारा कुंजीबद्ध कोई भी सामग्री
