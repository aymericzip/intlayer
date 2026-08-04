---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: المتغيرات
description: استخدم حقل البيانات الوصفية variant في ملفات محتوى Intlayer لإعلان بدائل محتوى مُسمّاة أو منظّمة — اختبارات A/B، لافتات موسمية، نصوص بأعلام الميزات، سجلات CMS، محتوى خاص بالمستخدم — والتبديل بينها في وقت التشغيل دون تغييرات في الشيفرة.
keywords:
  - المتغيرات
  - اختبار A/B
  - أعلام الميزات
  - المحتوى الديناميكي
  - السجلات الديناميكية
  - CMS
  - Intlayer
  - التدويل
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "إصدار ميزة المتغيرات"
  - version: 9.1.0
    date: 2026-06-26
    changes: "تقبل `variant` الآن سلسلة أو كائنًا — تُعلن السجلات الديناميكية أو `meta` السابقة كمتغيرات كائنات"
  - version: 9.1.1
    date: 2026-07-31
    changes: "تُعرّف المتغيرة فقط المفاتيح التي تتجاوزها؛ بينما تتراجع المتغيرات غير المُعرّفة إلى الإدخال الافتراضي"
  - version: 9.1.2
    date: 2026-08-04
    changes: "تقبل المزوِّدات خاصية `variant` محيطية؛ وتقبل المحدِّدات سلسلة تفضيل مرتَّبة"
author: aymericzip
---

# المتغيرات

**المتغير** هو مجموعة من ملفات المحتوى تشترك في مفتاح القاموس نفسه (`key`) لكن يحمل كل منها قيمة `variant` مختلفة. يقدّم Intlayer الملف المناسب بناءً على المُحدِّد المُمرَّر إلى `useIntlayer`.

يمكن أن تأخذ قيمة `variant` **شكلين**:

- **سلسلة نصية** — بديل مُسمّى واحد (اختبارات A/B، لافتات موسمية، أعلام ميزات).
- **كائن** — مُميِّز منظّم يُعنوَن بمجموعة من الحقول (سجلات CMS، محتوى خاص بالمستخدم، أي محتوى مفتاحه مُعرِّف غامض). الكائن بأكمله هو الهوية: يجب أن يوفّر المُحدِّد كائنًا **مساويًا** لحلّ المدخلة.

> يحلّ الشكل الكائني محل حقل `meta` السابق. في كل مكان كنت تكتب فيه سابقًا `meta: { id, … }`، اكتب `variant: { id, … }`، وحدّدها بـ `{ variant: { id, … } }`.

## المتغيرات المسماة (سلسلة نصية)

يمثّل كل ملف بديلًا مُسمّى واحدًا. وإغفال `variant` (أو ضبطه على `"default"`) يجعله البديل الاحتياطي.

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

### المتغيرات الجزئية

تُعرّف المتغيرة **فقط المفاتيح التي تتجاوزها**؛ ويتم وراثة الباقي من الإدخال الافتراضي.

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — تم وراثة `cta`

useIntlayer("hero-banner", { variant: "never-declared" });
// → الإدخال الافتراضي
```

لذلك لا تضيف ملف متغيرة إلا عندما تختلف الصياغة بالفعل. يتحول المفتاح إلى `null` فقط عندما يُعرّف متغيرات ولكن دون إدخال افتراضي.

### استخدام المتغيرات المسماة

#### المتغير الافتراضي

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

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // ← المتغير الافتراضي

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
      // ← المتغير الافتراضي

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
      // ← المتغير الافتراضي

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
      // ← المتغير الافتراضي

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

#### متغير مُسمّى

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### متغير مُسمّى بلغة locale صريحة

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## المتغيرات الكائنية (المنظّمة)

يُعنوِن المتغير الكائني المحتوى بمجموعة عشوائية من أزواج المفتاح-القيمة المُعلَنة في حقل `variant` — مما يتيح نمذجة سجلات CMS، أو المحتوى الخاص بالمستخدم، أو أي محتوى مفتاحه مُعرِّف غامض. الهوية هي **الكائن بأكمله**: يجب أن يوفّر المُحدِّد كائنًا مساويًا حتى تُحلّ المدخلة.

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

### استهلاك المتغيرات الكائنية

مرّر الكائن المطابق إلى `variant`. يجب توفير كل حقل مُعلَن في القاموس ومساواته؛ وإلا فالنتيجة `null`. لا يهم ترتيب الحقول.

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

#### مع لغة locale صريحة

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### حقل مفقود — لا تطابق

```ts
// يُعيد null: `userId` مفقود، لذا لا يتطابق الكائن مع المتغير المُعلَن
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## المتغير المحيطي

بعض أبعاد المتغيرات ثابتة طوال الجلسة — المستأجر، ونوع المدرسة، ومستوى الخطة. تُحلّ مرة واحدة، ولا ينبغي لأي مكوّن أن يمررها يدويًا.

> لا تغلّف `useIntlayer` داخل خطّاف خاص بك لحقنها. فتحسين وقت البناء لا يعيد كتابة سوى استدعاء `useIntlayer("key")` الحرفي المستورد من حزمة إطار العمل، لذا لن يُحزَم أي شيء خلف غلاف.

بدلًا من ذلك، صرّح عن المتغير مرة واحدة على المزوِّد، تمامًا مثل `locale`:

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

أصبحت كل قراءة قاموس أسفل المزوِّد تُحلّ وفق ذلك المتغير، ويفوز دائمًا المحدِّد الموجود في موضع الاستدعاء:

```tsx
useIntlayer("hero-banner");
// → متغير المزوِّد

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — يستبدل متغير المزوِّد ولا يوسّعه
```

### الأشكال

تقبل خاصية `variant` ثلاثة أشكال:

| الشكل                                                     | المعنى                        |
| --------------------------------------------------------- | ----------------------------- |
| `variant="school1"`                                       | متغير مسمّى واحد لكل المفاتيح |
| `variant={["school1", "default"]}`                        | سلسلة تفضيل مرتَّبة           |
| `variant={{ "hero-banner": "school1", default: "base" }}` | متغير لكل مفتاح قاموس         |

#### سلسلة التفضيل

تُجرَّب السلسلة من اليسار إلى اليمين مقابل المدخلات التي يصرّح بها كل مفتاح، ويفوز أول مدخل مُصرَّح به. وعندما لا يكون أي منها مُصرَّحًا به، يُستخدم المدخل الافتراضي الضمني — تمامًا كما في حالة القيمة المفردة.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` لا يصرّح بمدخل `school1` لكنه يصرّح بـ `school2` ← "school2"
// مفتاح لا يصرّح بأي منهما ← المدخل الافتراضي
```

لذا تُقرأ `["black_friday", "summer"]` على أنها «black friday إن كان لهذا المفتاح واحد، وإلا summer، وإلا الافتراضي». وتُقبل السلاسل أيضًا في موضع الاستدعاء:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> لاحظ أن هذا هو الصورة المعكوسة للمصفوفة التي يقبلها **حقل** `variant` في ملف المحتوى: فهناك تُصرِّح المصفوفة بمدخل لكل عنصر، أما هنا فتستهلكها بترتيب الأولوية.

#### خريطة لكل مفتاح

خاطب كل مفتاح قاموس على حدة. ويغطي المدخل المحجوز `default` كل المفاتيح غير المذكورة:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> على المزوِّد، يُقرأ الكائن البسيط **دائمًا** كخريطة لكل مفتاح، ولا يُقرأ أبدًا كمتغير كائني — فالاثنان متطابقان بنيويًا. ولتثبيت متغير كائني عالميًا، ضعه متداخلًا تحت مدخل: `variant={{ default: { id: "prod_abc" } }}`.

ولأن مفاتيح الخريطة تُدقَّق مقابل مفاتيح القواميس المصرَّح بها، فإن أي خطأ مطبعي — أو متغيرًا كائنيًا مكتوبًا مباشرة مثل `variant={{ id: "prod_abc" }}` — يُعدّ خطأ في وقت الترجمة.

## وضع التحميل

غالبًا ما تُحمَّل المتغيرات الكائنية بشكل كسول. اضبط `importMode` على القاموس للتحكم في ذلك:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

راجع [تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) لمعرفة تفاصيل أوضاع `static` و`dynamic` و`fetch`.

## حالات الاستخدام النموذجية

- اختبارات A/B للنصوص مُوجَّهة بمفتاح تجربة
- لافتات موسمية أو ترويجية
- رسائل بأعلام الميزات
- حملات تسويقية خاصة بلغة locale
- نص تسويقي لكل منتج يُدار في CMS
- محتوى خاص بالمستخدم أو الحساب
- أي محتوى يُعنوَن بمُعرِّف غامض في وقت التشغيل
