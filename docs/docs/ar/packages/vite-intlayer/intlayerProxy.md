---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: توثيق إضافة intlayerProxy Vite | vite-intlayer
description: برنامج وسيط لتوجيه اللغات لخوادم تطوير/معاينة Vite والـ SSR في الإنتاج. يتعامل مع اكتشاف اللغة، وإعادة توجيه عناوين URL، وإعادة الكتابة الداخلية.
keywords:
  - intlayerProxy
  - vite
  - plugin
  - middleware
  - locale
  - routing
  - internationalization
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "تم دمج configOptions في كائن خيارات واحد؛ البروكسي مدمج في intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` هو عبارة عن إضافة لـ Vite يقوم بتسجيل برنامج وسيط لتوجيه اللغات لـ **كل بيئة**: خادم التطوير، وخادم المعاينة، والـ SSR للإنتاج (Nitro / TanStack Start).

> **بدءاً من إطلاق Intlayer v9** يتم تضمين `intlayerProxy` تلقائيًا داخل الإضافة الأساسية [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayer.md) وتمكينه افتراضيًا عبر الخيار `routing.enableProxy: true`. تحتاج فقط لتسجيله بشكل منفصل إذا كنت بحاجة لسرعة تحكم ذات مستوى أدنى أو كنت تستخدمه خارج إطار عمل `intlayer()` القياسي.

## الاستخدام

### كجزء من `intlayer()` (موصى به، الإصدار 9+)

قم بتمرير خيارات الـ `proxy` إلى الإضافة الرئيسية بدلاً من تسجيل `intlayerProxy` بشكل منفصل:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### منفصل (عند الحاجة)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## الخيارات

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

جميع الخيارات اختيارية وتُمرر ككائن واحد:

| الخيار          | النوع                               | الوصف                                                                                                                                     |
| --------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | دالة شرطية تستبعد طلبات معينة من توجيه اللغات. أرجع `true` لتخطي طلب ما (مثل مسارات API أو فحوصات الصحة).                                 |
| `configOptions` | `GetConfigurationOptions`           | تجاوزات إعدادات Intlayer التي يتم تمريرها إلى `getConfiguration()`. استخدم هذا عندما تحتاج إلى قراءة ملف إعدادات محدد أو تجاوز قيم معينة. |

### مثال

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

تنشئ الدالة `createIntlayerProxyHandler` برنامج وسيط Node.js مستقل وغير مرتبط بإطار عمل معين `(req, res, next)` يحتوي على كل منطق توجيه اللغات. يفيد هذا في البيئات التي لا تتوفر فيها واجهة برمجة تطبيقات إضافات Vite (مثل خادم Node.js عادي أو وحدة Nitro مخصصة).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### الـ SSR للإنتاج (TanStack Start / Nitro عبر h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## سلوك التوجيه

يحاكي البرنامج الوسيط منطق التوجيه الخاص بـ برنامج وسيط `next-intlayer` ويدعم جميع أوضاع توجيه Intlayer.

### أوضاع التوجيه

| الوضع           | عنوان URL المرئي في المتصفح | السلوك                                                                                                                            |
| --------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/ar/about`                 | الافتراضي. بادئة اللغة في عنوان URL. اللغة الافتراضية تعيد التوجيه لعنوان بدون بادئة إلا إذا تم تفعيل `prefix-all`.               |
| `prefix-all`    | `/en/about` و `/ar/about`   | جميع اللغات — بما في ذلك اللغة الافتراضية — تحتوي دائمًا على بادئة.                                                               |
| `no-prefix`     | `/about`                    | لا توجد لغة في عنوان URL. يتم تخزين اللغة في ملفات تعريف الارتباط فقط؛ وتحدث عمليات إعادة كتابة العناوين داخليًا.                 |
| `search-params` | `/about?locale=ar`          | يتم تمرير اللغة كمعامل استعلام (query parameter). يقوم بإعادة التوجيه لإضافة/تحديث المعامل `locale` عندما يكون مفقودًا أو قديمًا. |

### أولوية الاكتشاف

1. بادئة مسار URL (على سبيل المثال `/ar/about` ← `ar`).
2. قيمة الكوكيز / localStorage (باستخدام `intlayer-locale`).
3. ترويسة `Accept-Language`.
4. اللغة الافتراضية `defaultLocale` من ملف الإعدادات.

### التجاوز التلقائي (Automatic bypass)

يقوم البرنامج الوسيط دائمًا بتمرير هذه الطلبات مباشرة دون معالجة اللغة:

- الطلبات المطابقة لدالة التصفية `ignore`.
- `/node_modules/**`
- `/@**` – الملفات الداخلية لـ Vite (`@vite/` و `@fs/` و `@id/` إلخ).
- `/_**` – الملفات الداخلية للخادم (`__vite_ping` و `__manifest` إلخ).
- الطلبات التي تنتهي مساراتها بامتداد ملف (أصول ثابتة). إذا تواجدت بادئة لغة في مسار أصل ثابت (مثل `/ar/logo.png`)، يتم تجريدها حتى يتمكن الخادم من تقديم الملف بشكل صحيح.

### توجيه النطاقات (Domain routing)

عندما يتم تكوين `routing.domains` في ملف إعدادات Intlayer الخاص بك، يتعامل البرنامج الوسيط مع توجيه اللغات عبر النطاقات المختلفة:

- يتم إعادة توجيه طلب لـ `/zh/about` على النطاق `intlayer.org` إلى `https://intlayer.zh/about` عندما يكون `domains.zh = "intlayer.zh"`.
- يتم إعادة كتابة طلب لـ `intlayer.zh/about` داخليًا إلى `/zh/about` بحيث يتم تعبئة معلم المسار `[locale]`.

### الحماية من حلقة إعادة التوجيه

يتتبع البرنامج الوسيط عدد مرات إعادة التوجيه لكل زوج `originalUrl → newUrl` داخل نافذة منزلقة مدتها ثانيتان. إعادة توجيه أكثر من 10 مرات في تلك النافذة ترجع استجابة بـ `500` مع رسالة خطأ تصف المشكلة بدلاً من الدخول في حلقة لا نهائية.

## Nitro / الـ SSR للإنتاج (الحقن التلقائي، الإصدار v9+)

عند استخدام `intlayerProxy` كإضافة لـ Vite، فإنه يحمل خاصية `.nitro`. يقرأ مكون بناء `nitro/vite` هذه الخاصية ويدفعها إلى `nitroConfig.modules` ، لذلك يتم تسجيل `intlayerNitroHandler` كبرنامج وسيط لخادم Nitro تلقائيًا — لا يلزم تكوين يدوي لـ SSR الإنتاج.

يستخدم معالج Nitro نموذج أحداث Web Fetch API الخاص بـ h3 v2 (وليس `fromNodeMiddleware`) لذا فهو متوافق مع جميع ملفات تعريف ومسبقات Nitro: Node، Bun، Deno، بيئات عمل الحافة (edge).

## الأسماء المستعارة المهملة

| التصدير المهمل             | البديل          |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
