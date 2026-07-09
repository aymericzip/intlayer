---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: التزامن الحي | اعكس تغييرات محتوى CMS في الوقت الفعلي
description: اجعل تطبيقك يعكس تغييرات محتوى Intlayer CMS في وقت التشغيل، دون الحاجة لإعادة البناء أو إعادة النشر.
keywords:
  - التزامن الحي
  - Live Sync
  - CMS
  - المحرر المرئي
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "تم نقله من توثيق Intlayer CMS إلى صفحة مستقلة خاصة به"
  - version: 6.0.1
    date: 2025-09-22
    changes: "إضافة توثيق المزامنة الحية"
  - version: 6.0.0
    date: 2025-09-04
    changes: "استبدال حقل `hotReload` بـ `liveSync`"
author: aymericzip
---

# التزامن الحي

يتيح التزامن الحي لتطبيقك عكس تغييرات محتوى نظام إدارة المحتوى أثناء وقت التشغيل. لا حاجة لإعادة البناء أو إعادة النشر. عند التمكين، يتم بث التحديثات إلى خادم التزامن الحي الذي يقوم بتحديث القواميس التي يقرأها تطبيقك.

## جدول المحتويات

<TOC/>

---

> يتطلب التزامن الحي اتصالًا مستمرًا بالخادم وهو متاح في خطة المؤسسات.

قم بتمكين التزامن الحي عن طريق تحديث تكوين Intlayer الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * يُمكّن إعادة تحميل التكوينات المحلية تلقائيًا عند اكتشاف تغييرات.
     * على سبيل المثال، عند إضافة قاموس أو تحديثه، يقوم التطبيق بتحديث
     * المحتوى المعروض على الصفحة.
     *
     * نظرًا لأن إعادة التحميل الساخن تتطلب اتصالًا مستمرًا بالخادم،
     * فهي متاحة فقط لعملاء خطة `enterprise`.
     *
     * الافتراضي: false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * يتحكم في كيفية استيراد القواميس:
     *
     * - "live": يتم جلب القواميس ديناميكيًا باستخدام واجهة برمجة تطبيقات المزامنة الحية (Live Sync API).
     *   يستبدل useIntlayer بـ useDictionaryDynamic.
     *
     * ملاحظة: يستخدم الوضع الحي (Live) واجهة برمجة تطبيقات المزامنة الحية لجلب القواميس. إذا فشل استدعاء الواجهة،
     * يتم استيراد القواميس ديناميكيًا.
     * ملاحظة: فقط القواميس التي تحتوي على محتوى عن بُعد وعلامة "live" تستخدم الوضع الحي.
     * القواميس الأخرى تستخدم الوضع الديناميكي لأداء أفضل.
     */
    importMode: "fetch",
  },
};

export default config;
```

ابدأ خادم المزامنة الحية لتغليف تطبيقك:

مثال باستخدام Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... سكريبتات أخرى
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

مثال باستخدام Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... سكريبتات أخرى
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

يقوم خادم المزامنة الحية بتغليف تطبيقك ويطبق المحتوى المحدث تلقائيًا عند وصوله.

لتلقي إشعارات التغيير من نظام إدارة المحتوى (CMS)، يحافظ خادم المزامنة الحية على اتصال SSE مع الخادم الخلفي. عندما يتغير المحتوى في نظام إدارة المحتوى، يقوم الخادم الخلفي بإرسال التحديث إلى خادم المزامنة الحية، الذي يقوم بكتابة القواميس الجديدة. سيعكس تطبيقك التحديث في التنقل التالي أو عند إعادة تحميل المتصفح, دون الحاجة لإعادة بناء التطبيق.

مخطط التدفق (نظام إدارة المحتوى/الخادم الخلفي -> خادم المزامنة الحية -> خادم التطبيق -> الواجهة الأمامية):

![مخطط منطق المزامنة الحية](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

كيف يعمل:

![مخطط تدفق المزامنة الحية نظام إدارة المحتوى/الخادم الخلفي/خادم المزامنة الحية/خادم التطبيق/الواجهة الأمامية](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

## سير عمل التطوير (محلي)

- في بيئة التطوير، يتم جلب جميع القواميس البعيدة عند بدء تشغيل التطبيق، بحيث يمكنك اختبار التحديثات بسرعة.
- لاختبار المزامنة الحية محليًا مع Next.js، قم بتغليف خادم التطوير الخاص بك:

```json5 fileName="package.json"
{
  "scripts": {
    // ... سكريبتات أخرى
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // لـ Vite
  },
}
```

قم بتمكين التحسين حتى يطبق Intlayer تحولات الاستيراد الحي أثناء التطوير:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

يقوم هذا الإعداد بتغليف خادم التطوير الخاص بك مع خادم المزامنة الحية، ويجلب القواميس البعيدة عند بدء التشغيل، ويقوم ببث التحديثات من نظام إدارة المحتوى عبر SSE. قم بتحديث الصفحة لرؤية التغييرات.

ملاحظات وقيود:

- أضف مصدر المزامنة الحية إلى سياسة أمان موقعك (CSP). تأكد من السماح بعنوان URL الخاص بالمزامنة الحية في `connect-src` (و `frame-ancestors` إذا كان ذلك مناسبًا).
- لا تعمل المزامنة الحية مع المخرجات الثابتة. بالنسبة لـ Next.js، يجب أن تكون الصفحة ديناميكية لتلقي التحديثات أثناء وقت التشغيل (على سبيل المثال، استخدم `generateStaticParams`، `generateMetadata`، `getServerSideProps`، أو `getStaticProps` بشكل مناسب لتجنب القيود الخاصة بالمحتوى الثابت فقط).
- في نظام إدارة المحتوى (CMS)، يحتوي كل قاموس على علامة `live`. يتم جلب القواميس التي تحمل العلامة `live=true` فقط عبر واجهة برمجة تطبيقات المزامنة الحية؛ أما القواميس الأخرى فتُستورد ديناميكيًا وتظل دون تغيير أثناء وقت التشغيل.
- يتم تقييم علامة `live` لكل قاموس أثناء وقت البناء. إذا لم يتم وسم المحتوى البعيد بعلامة `live=true` أثناء البناء، يجب عليك إعادة البناء لتمكين المزامنة الحية لذلك القاموس.
- يجب أن يكون خادم المزامنة الحية قادرًا على الكتابة إلى `.intlayer`. في الحاويات، تأكد من وجود صلاحية الكتابة إلى `/.intlayer`.

## روابط مفيدة

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)
- [المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
- [مرجع التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
- [دليل الاستضافة الذاتية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md)
