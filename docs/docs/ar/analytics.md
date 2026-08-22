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

## دعم إطارات العمل

التحليلات مدمجة في `IntlayerProvider` المشترك من `react-intlayer`، لذا فهي متاحة اليوم في أي مكان يُستخدم فيه هذا المزود:

| إطار العمل (Framework)                                   | الحالة (Status)                                                                      |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| React                                                    | ✅ متاح                                                                              |
| Next.js (`next-intlayer`)                                | ✅ متاح (عبر `react-intlayer`)                                                       |
| React Native / Expo (`react-native-intlayer`)            | ✅ متاح (عبر `react-intlayer`)                                                       |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 مخطط له — نفس العميل، ارتباطات على مستوى المزود تتبع نمط إطلاق `@intlayer/editor` |

## الاستخدام

### التتبع التلقائي على مستوى المزود

لا توجد تغييرات برمجية مطلوبة. بمجرد تثبيت `@intlayer/analytics` وتكوين `editor.clientId`، يقوم `IntlayerProvider` تلقائيًا بـ:

- تهيئة عميل التحليلات عند التحميل (mount)،
- تسجيل `page_view` عند التحميل الأولي،
- تسجيل `page_view` عند كل تغيير في اللغة (locale)،
- بدء حلقة الإرسال كل ~20 ثانية وإرسال أي أحداث متبقية عند إزالة التحميل / إغلاق التبويب (عبر `navigator.sendBeacon`، مع العودة إلى `fetch(..., { keepalive: true })`).

### التتبع التلقائي على مستوى العقدة (Node)

في كل مرة يقوم فيها `useIntlayer` بحل جزء من المحتوى لعرضه، يقوم المفسر بالإبلاغ عن حدث `content_exposure` لذلك الـ `dictionaryKey` المحدد + مسار المفتاح + اللغة — مرة أخرى، لا توجد تغييرات برمجية مطلوبة. يتم تجميع مرات العرض المتكررة لنفس العقدة داخل نافذة الإرسال في حدث واحد مع `count` (عدد)، لذلك فإن القائمة التي تتم إعادة تصييرها 50 مرة لا ترسل 50 حدثًا.

### تتبع التحويلات (Conversions) لاختبارات A/B

استخدم `useConversion()` لنسبة هدف إلى المتغير الذي شاهدته الجلسة:

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
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

### حل متغير على جانب العميل

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

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

## روابط مفيدة

- [القواميس الديناميكية - المجموعات والمتغيرات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)
- [محرر Intlayer المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
- [مرجع التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
- [دليل الاستضافة الذاتية (Self-Hosting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md)
