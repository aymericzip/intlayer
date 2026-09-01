---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | تتبع عرض المحتوى وإجراء اختبارات A/B
description: اكتشف كيف يقوم @intlayer/analytics بتتبع مشاهدات الصفحات/اللغات وعرض المحتوى، وكيفية استخدامه لإجراء اختبارات A/B على محتوى Intlayer الخاص بك.
keywords:
  - التحليلات
  - اختبار A/B
  - الجمهور
  - التدويل (Internationalization)
  - التوثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "تفعيل التحليلات افتراضيًا عند تثبيت `@intlayer/analytics`"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — @intlayer/analytics package, provider/node-level tracking, A/B testing, dashboard"
author: aymericzip
---

# توثيق Intlayer Analytics

`@intlayer/analytics` هي حزمة مساعدة اختيارية تخبرك **بالمحتوى الذي يتم عرضه بالفعل** لزوارك — أي صفحة، بأي لغة (locale)، وأي جزء محدد من المحتوى المترجم — حتى تتمكن من فهم جمهورك وإجراء **اختبارات A/B على المحتوى**.

## جدول المحتويات

<TOC/>

---

## ما الذي يتم تتبعه

تجمع حزمة `@intlayer/analytics` ثلاثة أنواع من الأحداث المجهولة في دفعات:

| الحدث (Event)      | أين يتم التقاطه                                  | ماذا يخبرك                                                                                                 |
| ------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `page_view`        | على مستوى المزود (`IntlayerProvider`)            | أي صفحة ولغة شاهدتها الجلسة، عند التحميل الأولي، أو تغيير المسار، أو تبديل اللغة.                          |
| `content_exposure` | على مستوى العقدة (`useIntlayer` / إضافات المفسر) | أي مفتاح قاموس / مسار مفتاح تم حله وعرضه بالفعل — وإذا كان جزءًا من تجربة، أي **متغير (variant)** تم عرضه. |
| `conversion`       | أينما تستدعي `useConversion()`                   | هدف تم تحقيقه (تسجيل، نقرة، شراء...) يُنسب إلى متغير A/B الذي تعرضت له الجلسة.                             |

يتم جمع الأحداث في الذاكرة وإرسالها كـ **طلب دفعة واحد كل 20 ثانية تقريبًا** — وليس عند كل ضغطة زر أو كل عملية تصيير (render) — لذا فإن التحليلات لا تؤثر أبدًا على وقت التصيير الأول ولا تضيف طلبًا عند كل تفاعل.

## كيف يدعم اختبارات A/B على المحتوى

يسمح لك Intlayer بالفعل بتعريف [متغيرات المحتوى (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md) (على سبيل المثال، قاموس `hero-banner` مع متغير `control` ومتغير `black_friday`). حزمة `@intlayer/analytics` تغلق الدائرة:

1. دالة `getVariant(experimentKey, variants)` تخصص بشكل حتمي كل جلسة مجهولة لمتغير — وهي دالة بحتة تعتمد على معرف الجلسة ومفتاح التجربة، لذا فإن التخصيص يكون **مستقرًا طوال الجلسة** ولا يتطلب **أي اتصال بالخادم (server round-trip)** قبل التصيير الأول (بدون وميض، وبدون تحول في التخطيط).
2. كل حدث `content_exposure` يحمل الـ `variant` الذي تم عرضه.
3. تتيح لك `useConversion()` نسبة هدف (مثل `"cta_click"`) إلى ذلك المتغير.
4. تقارن نقطة نهاية (endpoint) نتائج التجربة في لوحة التحكم معدلات التحويل لكل متغير، بما في ذلك الدلالة الإحصائية (اختبار z).

## التثبيت

`@intlayer/analytics` هي **تبعية اختيارية (optional dependency)** لكل حزمة إطار عمل (`react-intlayer`، `next-intlayer`، `vue-intlayer`، …)، لذا فهي موجودة بالفعل في معظم المشاريع. ثبّتها صراحةً إذا كان إعدادك يتخطى التبعيات الاختيارية (`npm install --no-optional`، …):

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

تثبيت الحزمة هو كل ما يلزم لتفعيل التحليلات: قيمة `analytics.enabled` الافتراضية هي `true`، ويحوّلها `@intlayer/config` إلى `false` عندما لا يعثر على الحزمة في مشروعك. إذا لم تقم بتثبيتها، فإن كل نقطة تكامل تتحول إلى عملية لا تفعل شيئًا (no-op) — انظر [تكلفة صفرية عند عدم التثبيت](#تكلفة-صفرية-عند-عدم-التثبيت) أدناه.

## التكوين (Configuration)

لا تحتاج التحليلات إلى أي إعداد للبدء: فهي **مفعّلة افتراضيًا** و**تعيد استخدام كتلة إعدادات `editor` الموجودة** لنقطة الإرسال ومفتاح المشروع.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // يستخدم أيضًا كنقطة نهاية لاستيعاب أحداث التحليلات
    clientId: "your-client-id", // يستخدم أيضًا كمفتاح مشروع التحليلات
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — عنوان URL الأساسي الذي يتم إرسال أحداث التحليلات إليه (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — مفتاح المشروع العام المنسوب إلى كل حدث يتم استيعابه. وهو يعمل أيضًا كـ **مفتاح تفعيل**: تظل التحليلات معطلة تمامًا (ومحذوفة كتعليمات برمجية ميتة، انظر أدناه) حتى يتم تكوين `clientId`.

إذا قمت بالاستضافة الذاتية لـ Intlayer (self-host)، فإن التحليلات تشير تلقائيًا إلى النسخة الخاصة بك لأنها تتشارك `editor.backendURL`.

### استدعاء الواجهة البرمجية (API) من المتصفح

يدعم الرمز المميز (token) نفسه عميلًا صغيرًا لا يحتاج إلى بيانات اعتماد، بحيث يمكن لموقع ثابت أو تطبيق SPA قراءة محتوى نظام إدارة المحتوى (CMS) الخاص به وقت التشغيل دون خادم، ودون إجراء خادم (server action)، ودون أي سر (secret) داخل الحزمة (bundle):

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

يوثّق العميل نفسه اعتمادًا على `editor.clientId`، ويتم التعامل مع عملية التبادل والتخزين المؤقت (caching) والتجديد داخليًا. تحدد النطاقات (scopes) ما يمكنه الوصول إليه: محتوى القاموس المنشور واستيعاب بيانات التحليلات. أي شيء آخر (رفع القواميس، قراءة مشروع، إنفاق أرصدة الذكاء الاصطناعي) يحتاج إلى بيانات اعتماد حقيقية، وبالتالي إلى خادم أو مستخدم مسجّل الدخول.

### إلغاء الاشتراك (Opt-out)

تتيح كتلة `analytics` الاختيارية ضبط عملية الجمع — أو إيقافها تمامًا:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // الافتراضي: true — يستبعد التكامل بالكامل من الحزمة
    flushInterval: 20_000, // المللي ثانية بين عمليتَي إرسال مجمّعتين
    sampleRate: 1, // نسبة الجلسات المسجَّلة، من 0 (لا شيء) إلى 1 (الكل)
  },
};

export default config;
```

إلغاء تثبيت `@intlayer/analytics` له نفس أثر `enabled: false`. راجع [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) للاطلاع على قائمة الحقول الكاملة.

## الاستخدام

### التتبع التلقائي على مستوى المزود

لا توجد تغييرات برمجية مطلوبة. بمجرد تثبيت `@intlayer/analytics` وتكوين `editor.clientId`، يقوم `IntlayerProvider` تلقائيًا بـ:

- تهيئة عميل التحليلات عند التحميل (mount)،
- تسجيل `page_view` عند التحميل الأولي،
- تسجيل `page_view` عند كل تغيير في اللغة (locale)،
- بدء حلقة الإرسال كل ~20 ثانية وإرسال أي أحداث متبقية عند إزالة التحميل / إغلاق التبويب (عبر `navigator.sendBeacon`، مع العودة إلى `fetch(..., { keepalive: true })`).

نقطة الدخول تختلف حسب إطار العمل، لكنها في كل الحالات نفس النقطة التي تستخدمها بالفعل لإعداد Intlayer، لذا لا يوجد شيء إضافي لإضافته:

<Tabs group="framework">
  <Tab label="React" value="react">

    يقوم `IntlayerProvider` بتحميل (mount) موفر التحليلات داخليًا.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    تُعيد `next-intlayer` تصدير `IntlayerProvider` الخاص بـ React، لذا يتم ربط التحليلات بنفس الطريقة.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    يقوم إضافة (plugin) `intlayer` بتسجيل خطافات (hooks) التحليلات ضمن دورة حياة المكون الجذري.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > مع Nuxt، تقوم `nuxt-intlayer` بتثبيت الإضافة نيابة عنك، فلا حاجة لأي إجراء.

  </Tab>
  <Tab label="Svelte" value="svelte">

    تبدأ `setupIntlayer()` التحليلات من المكون الذي يُعد Intlayer.

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    يقوم `IntlayerProvider` بتحميل (mount) موفر التحليلات داخليًا.

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    يقوم `IntlayerProvider` بتحميل موفر التحليلات بشكل كسول (lazy)، بحيث يبقى هذا الجزء (chunk) خارج المسار الحرج.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    تتضمن `provideIntlayer()` بالفعل `provideIntlayerAnalytics()`.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > استخدم `provideIntlayerAnalytics()` بمفردها فقط إذا كنت تدير الموفرين (providers) بشكل فردي.

  </Tab>
</Tabs>

### التتبع التلقائي على مستوى العقدة (Node)

في كل مرة يقوم فيها `useIntlayer` بحل جزء من المحتوى لعرضه، يقوم المفسر بالإبلاغ عن حدث `content_exposure` لذلك الـ `dictionaryKey` المحدد + مسار المفتاح + اللغة — مرة أخرى، لا توجد تغييرات برمجية مطلوبة. يتم تجميع مرات العرض المتكررة لنفس العقدة داخل نافذة الإرسال في حدث واحد مع `count` (عدد)، لذلك فإن القائمة التي تتم إعادة تصييرها 50 مرة لا ترسل 50 حدثًا.

### تتبع التحويلات (Conversions) لاختبارات A/B

استخدم `useConversion()` لنسبة هدف إلى المتغير الذي شاهدته الجلسة:

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "react-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          ابدأ الآن
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          ابدأ الآن
        </button>
      );
    };
    ```

    > `useConversion` هو خطاف (hook) خاص بالعميل: ضع علامة `"use client"` على المكون.

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        ابدأ الآن
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      ابدأ الآن
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          ابدأ الآن
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          ابدأ الآن
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">ابدأ الآن</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### حل متغير على جانب العميل

تقوم `useExperiment()` بتخصيص الجلسة لمتغير وتسجيل التعرض (exposure) الذي يصبح مقام معدل التحويل. اربط عرض الشجرة الفرعية المعتمدة على المتغير بـ `isAssigned` حتى لا يرى أي زائر ومضة المتغير الافتراضي (control) قبل أن يتم تحديد التخصيص:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` هي سلسلة نصية بسيطة.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` هي سلسلة نصية بسيطة. يحدث التخصيص في المتصفح، لذا يجب أن يكون المكون مكون عميل (client component).

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` و `isAssigned` عبارة عن `Ref`.

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` و `isAssigned` عبارة عن مخازن (stores): اقرأهما باستخدام البادئة `$`.

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` هي سلسلة نصية بسيطة.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` و `isAssigned` عبارة عن `Accessor`: استدعهما لقراءة القيمة.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` و `isAssigned` عبارة عن `Signal`: استدعهما لقراءة القيمة.

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

الأوزان اختيارية — مرّر واحدًا لكل متغير لتحديل التقسيم، على سبيل المثال `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

ثم يقرأ العميل [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/variants.md) من القاموس الذي يطابق:

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> قراءة المتغير في **مكون فرعي** هي ما يجعل هذا يعمل خارج React: في Vue و Svelte و Solid و Angular، يتم التقاط المحدد الذي يتم تمريره إلى `useIntlayer` عند إعداد المكون، لذلك يجب أن تحدث القراءة في مكون يتم تحميله فقط بعد معرفة المتغير.

إذا كانت التجربة تغطي صفحة كاملة بدلاً من قاموس واحد، فقم برفع المتغير إلى موفر البيانات بدلاً من ذلك — انظر [متغير محيط](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/variants.md#ambient-variant). بعد ذلك، كل `useIntlayer` أدناه يتم حله مقابله دون تغيير موقع الاستدعاء.

إذا كنت بحاجة إلى الوصول المباشر خارج مكون ما، فاستخدم الـ client مباشرة:

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` فقط يعين — لا يسجل التعرض. فضّل `useExperiment()`، وإلا فإن معدل التحويل لن يكون له مقام.

## الخصوصية والأداء

- **مجهول حسب التصميم**: يتم تحديد الجلسات بواسطة معرّف متغير (rotating id)؛ وتقوم الواجهة الخلفية (backend) دائمًا بتخزين **تجزئة SHA-256** فقط لهذا المعرف — ولا تقوم أبدًا بتخزين المعرف الخام، ولا تقوم أبدًا بتخزين عنوان IP.
- **الموقع تقريبي**: فقط رمز الدولة، المستمد من رؤوس تحديد الموقع الجغرافي الخاصة بشبكة CDN (مثل `cf-ipcountry`، `x-vercel-ip-country`، ...) — لا يتم قراءة أو تخزين أي IP.
- **تستبعد عناوين URL معلمات البحث** افتراضيًا، لذلك لا يتم التقاط سلاسل الاستعلام (query strings) أبدًا.
- **أخذ العينات (Sampling)**: يتيح لك `sampleRate` الاحتفاظ بجزء بسيط فقط من أحداث عرض المحتوى في التطبيقات ذات حركة المرور العالية.
- **معالجة مجمعة (Batched)**: طلب واحد تقريبًا كل 20 ثانية (`flushInterval`)، أو في وقت مبكر إذا امتلأت الذاكرة المؤقتة (`maxBufferSize`) — لا يتم أبدًا إرسال طلب واحد لكل حدث.

### تكلفة صفرية عند عدم التثبيت

تتبع `@intlayer/analytics` نفس نمط التبعية الاختيارية المتبع في `@intlayer/editor`:

- تقوم كل نقطة تكامل بتحميل الحزمة عبر **استيراد ديناميكي `import()` مغلف بـ `try/catch`** — التطبيق الذي لم يقم أبدًا بتثبيت `@intlayer/analytics` لا يدفع أي تكلفة لحجم الحزمة أو وقت التشغيل، ولا يرى خطأ أبدًا؛
- متغيّر بيئة يُحدَّد وقت الترجمة (`INTLAYER_ANALYTICS_ENABLED`)، يضبطه `@intlayer/config` تلقائيًا على `'false'` عندما لا تكون الحزمة مثبّتة، أو تكون `analytics.enabled` تساوي `false`، أو لا يكون `editor.clientId` مُعدًّا، ما يسمح للـ bundlers بـ**إزالة التكامل بالكامل كشيفرة ميتة (dead-code-eliminate)**؛
- يتم تعطيل التحليلات داخل نافذة إطار المعاينة (iframe) الخاصة بمحرر Intlayer / CMS، لذا لا يتم حساب جلسات المحرر كحركة مرور حقيقية أبدًا.

## لوحة التحكم (Dashboard): صفحة التحليلات

بمجرد أن يجمع مشروعك الأحداث، فإن صفحة **التحليلات (Analytics)** في [لوحة تحكم Intlayer](https://app.intlayer.org/analytics) (تظهر في الشريط الجانبي بمجرد تحديد المشروع) تعرض:

- **المستخدمين النشطين** — الزوار الفريدين خلال النافذة الزمنية المحددة (7 / 30 / 90 يومًا).
- **المستخدمين اليوم** و **المستخدمين خلال آخر 7 أيام**.
- **مشاهدات الصفحة** خلال النافذة المحددة.
- **رسم بياني للتطور** للزوار الفريدين اليوميين.
- علامات تبويب لتحليل **اللغات (Locales)** و **الموقع (Location)**، مما يصنف جمهورك حسب اللغة وحسب البلد.

## مرجع واجهة برمجة تطبيقات الواجهة الخلفية (Backend API)

تتطلب جميع نقاط نهاية القراءة المصادقة؛ استيعاب البيانات عام وينسب إلى `clientId`.

| الطريقة (Method) | نقطة النهاية (Endpoint)                     | الوصف (Description)                                                    |
| ---------------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| `POST`           | `/api/analytics/events`                     | استيعاب دفعة من الأحداث (عام، يُنسب بواسطة `clientId` في جسم الطلب).   |
| `GET`            | `/api/analytics/overview`                   | إجماليات الصفحة/اللغة للمشروع الموثق.                                  |
| `GET`            | `/api/analytics/audience?days=30`           | زوار فريدون، مشاهدات الصفحة، سلاسل يومية، تفصيلات اللغة + البلد.       |
| `GET`            | `/api/analytics/content-stats`              | إجماليات عرض كل محتوى، مجمعة حسب مفتاح القاموس / مسار المفتاح / اللغة. |
| `GET`            | `/api/analytics/experiments/:experimentKey` | معدلات التحويل لكل متغير والدلالة الإحصائية لتجربة A/B.                |

يمكنك أيضًا استدعاء هذه النقاط برمجيًا باستخدام [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

> **خادم فقط.** `createIntlayerCMS()` يتحقق من الهوية باستخدام `clientId` + `clientSecret`، والسر لا يكون متاحًا أبدًا في المتصفح — هذا الجزء من التعليمات البرمجية سيصدر طلبات غير مصادق عليها إذا تم تشغيله هناك. احتفظ به في معالج مسار أو إجراء خادم أو نص برمجي.

## روابط مفيدة

- [القواميس الديناميكية - المجموعات والمتغيرات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)
- [محرر Intlayer المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
- [مرجع التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
- [دليل الاستضافة الذاتية (Self-Hosting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md)
