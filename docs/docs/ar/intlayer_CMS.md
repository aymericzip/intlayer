---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: نظام إدارة المحتوى Intlayer | إخراج محتواك إلى نظام إدارة المحتوى Intlayer
description: إخراج محتواك إلى نظام إدارة المحتوى Intlayer لتفويض إدارة المحتوى إلى فريقك.
keywords:
  - نظام إدارة المحتوى
  - محرر بصري
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: إضافة توثيق المزامنة الحية
  - version: 6.0.0
    date: 2025-09-04
    changes: استبدال حقل `hotReload` بـ `liveSync`
  - version: 5.5.10
    date: 2025-06-29
    changes: بدء السجل
---

# توثيق نظام إدارة المحتوى Intlayer (CMS)

<iframe title="المحرر البصري + نظام إدارة المحتوى لتطبيق الويب الخاص بك: شرح Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

نظام إدارة المحتوى Intlayer هو تطبيق يسمح لك بإخراج محتواك من مشروع Intlayer.

لهذا، قدم Intlayer مفهوم "القواميس البعيدة".

![واجهة نظام إدارة المحتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## فهم القواميس البعيدة

يفرق Intlayer بين القواميس "المحلية" و"البعيدة".

- القاموس "المحلي" هو قاموس يتم إعلانه داخل مشروع Intlayer الخاص بك. مثل ملف إعلان زر، أو شريط التنقل الخاص بك. إخراج المحتوى الخاص بك لا معنى له في هذه الحالة لأن هذا المحتوى من المفترض ألا يتغير كثيرًا.

- القاموس "البعيد" هو قاموس يتم إدارته من خلال نظام إدارة المحتوى Intlayer CMS. قد يكون مفيدًا للسماح لفريقك بإدارة المحتوى مباشرة على موقعك الإلكتروني، ويهدف أيضًا إلى استخدام ميزات اختبار A/B والتحسين التلقائي لمحركات البحث (SEO).

## المحرر المرئي مقابل نظام إدارة المحتوى (CMS)

محرر [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) هو أداة تتيح لك إدارة المحتوى الخاص بك في محرر مرئي للقواميس المحلية. بمجرد إجراء تغيير، سيتم استبدال المحتوى في قاعدة الشيفرة. هذا يعني أن التطبيق سيتم إعادة بنائه وستتم إعادة تحميل الصفحة لعرض المحتوى الجديد.

على النقيض من ذلك، فإن نظام إدارة المحتوى Intlayer CMS هو أداة تتيح لك إدارة المحتوى الخاص بك في محرر مرئي للقواميس البعيدة. بمجرد إجراء تغيير، لن يؤثر المحتوى على قاعدة الشيفرة الخاصة بك. وسيعرض الموقع تلقائيًا المحتوى المُعدل.

## التكامل

لمزيد من التفاصيل حول كيفية تثبيت الحزمة، راجع القسم ذي الصلة أدناه:

### التكامل مع Next.js

للتكامل مع Next.js، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md).

### التكامل مع Create React App

للتكامل مع Create React App، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md).

### التكامل مع Vite + React

للتكامل مع Vite + React، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md).

## التهيئة

في ملف تهيئة Intlayer الخاص بك، يمكنك تخصيص إعدادات نظام إدارة المحتوى:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... إعدادات التهيئة الأخرى
  editor: {
    /**
     * مطلوب
     *
     * عنوان URL الخاص بالتطبيق.
     * هذا هو العنوان الذي يستهدفه المحرر المرئي.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * مطلوب
     *
     * معرف العميل والسر السري للعميل مطلوبان لتمكين المحرر.
     * يسمحان بتحديد هوية المستخدم الذي يقوم بتحرير المحتوى.
     * يمكن الحصول عليهما بإنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * اختياري
     *
     * في حال كنت تستضيف نظام إدارة المحتوى Intlayer بنفسك، يمكنك تعيين عنوان URL الخاص بنظام إدارة المحتوى.
     *
     * عنوان URL الخاص بنظام إدارة المحتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * اختياري
     *
     * في حال كنت تستضيف نظام إدارة المحتوى Intlayer بنفسك، يمكنك تعيين عنوان URL الخاص بالواجهة الخلفية.
     *
     * عنوان URL الخاص بنظام إدارة المحتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * مطلوب
     *
     * عنوان URL الخاص بالتطبيق.
     * هذا هو عنوان URL المستهدف من قبل المحرر المرئي.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * مطلوب
     *
     * معرف العميل والسر السري للعميل مطلوبان لتمكين المحرر.
     * يسمحان بتحديد هوية المستخدم الذي يقوم بتحرير المحتوى.
     * يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * اختياري
     *
     * في حال كنت تستضيف نظام إدارة المحتوى Intlayer بنفسك، يمكنك تعيين عنوان URL الخاص بنظام إدارة المحتوى.
     *
     * عنوان URL الخاص بنظام إدارة محتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * اختياري
     *
     * في حال كنت تستضيف نظام إدارة محتوى Intlayer بنفسك، يمكنك تعيين عنوان URL الخاص بالواجهة الخلفية.
     *
     * عنوان URL الخاص بنظام إدارة محتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * مطلوب
     *
     * عنوان URL الخاص بالتطبيق.
     * هذا هو العنوان الذي يستهدفه المحرر المرئي.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * مطلوب
     *
     * معرف العميل والسر السري للعميل مطلوبان لتمكين المحرر.
     * يسمحان بتحديد هوية المستخدم الذي يقوم بتحرير المحتوى.
     * يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * اختياري
     *
     * في حال كنت تستضيف نظام إدارة محتوى Intlayer بنفسك، يمكنك تعيين عنوان URL الخاص بنظام إدارة المحتوى.
     *
     * عنوان URL الخاص بنظام إدارة محتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * اختياري
     *
     * في حال كنت تستضيف نظام إدارة محتوى Intlayer بنفسك، يمكنك تعيين عنوان URL الخاص بالخادم الخلفي.
     *
     * عنوان URL الخاص بنظام إدارة محتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> إذا لم يكن لديك معرف عميل وسر عميل، يمكنك الحصول عليهما بإنشاء عميل جديد في [لوحة تحكم Intlayer - المشاريع](https://intlayer.org/dashboard/projects).

> لرؤية جميع المعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## استخدام نظام إدارة المحتوى

### دفع التهيئة الخاصة بك

لتكوين نظام إدارة محتوى Intlayer، يمكنك استخدام أوامر [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ar/intlayer_cli.md).

```bash
npx intlayer config push
```

> إذا كنت تستخدم متغيرات البيئة في ملف التهيئة `intlayer.config.ts`، يمكنك تحديد البيئة المطلوبة باستخدام الوسيطة `--env`:

```bash
npx intlayer config push --env production
```

يقوم هذا الأمر برفع تهيئتك إلى نظام إدارة محتوى Intlayer.

### دفع قاموس

لتحويل قواميس اللغة المحلية الخاصة بك إلى قاموس بعيد، يمكنك استخدام أوامر [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ar/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> إذا كنت تستخدم متغيرات البيئة في ملف التهيئة `intlayer.config.ts` الخاص بك، يمكنك تحديد البيئة المطلوبة باستخدام الوسيطة `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

يقوم هذا الأمر برفع قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة للتحميل والتحرير غير المتزامن عبر منصة Intlayer.

### تحرير القاموس

بعد ذلك، ستتمكن من رؤية وإدارة قاموسك في [نظام إدارة محتوى Intlayer](https://intlayer.org/dashboard/content).

## التزامن الحي

يتيح التزامن الحي لتطبيقك عكس تغييرات محتوى نظام إدارة المحتوى أثناء وقت التشغيل. لا حاجة لإعادة البناء أو إعادة النشر. عند التمكين، يتم بث التحديثات إلى خادم التزامن الحي الذي يقوم بتحديث القواميس التي يقرأها تطبيقك.

> يتطلب التزامن الحي اتصالًا مستمرًا بالخادم وهو متاح في خطة المؤسسات.

قم بتمكين التزامن الحي عن طريق تحديث تكوين Intlayer الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
  build: {
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
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * يُمكّن إعادة التحميل السريع لتكوينات اللغة عند اكتشاف تغييرات.
     * على سبيل المثال، عند إضافة قاموس أو تحديثه، يقوم التطبيق بتحديث
     * المحتوى المعروض على الصفحة.
     *
     * نظرًا لأن إعادة التحميل السريع تتطلب اتصالًا مستمرًا بالخادم، فهي
     * متاحة فقط لعملاء خطة `enterprise`.
     *
     * الافتراضي: false
     */
    liveSync: true,
  },
  build: {
    /**
     * يتحكم في كيفية استيراد القواميس:
     *
     * - "live": يتم جلب القواميس ديناميكيًا باستخدام واجهة برمجة تطبيقات المزامنة الحية (Live Sync API).
     *   يستبدل useIntlayer بـ useDictionaryDynamic.
     *
     * ملاحظة: يستخدم الوضع الحي واجهة برمجة تطبيقات المزامنة الحية لجلب القواميس. إذا فشل استدعاء الواجهة
     * ملاحظة: فقط القواميس التي تحتوي على محتوى عن بُعد وعلامات "live" تستخدم الوضع الحي.
     * يستخدم الآخرون الوضع الديناميكي من أجل الأداء.
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * يُمكّن إعادة التحميل السريع لتكوينات اللغة عند اكتشاف تغييرات.
     * على سبيل المثال، عند إضافة قاموس أو تحديثه، يقوم التطبيق بتحديث
     * المحتوى المعروض على الصفحة.
     *
     * نظرًا لأن إعادة التحميل السريع تتطلب اتصالًا مستمرًا بالخادم، فهي
     * متاحة فقط لعملاء خطة `enterprise`.
     *
     * الافتراضي: false
     */
    liveSync: true,

    /**
     * منفذ خادم المزامنة الحية.
     *
     * الافتراضي: 4000
     */
    liveSyncPort: 4000,

    /**
     * عنوان URL الخاص بخادم المزامنة الحية.
     *
     * الافتراضي: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * يتحكم في كيفية استيراد القواميس:
     *
     * - "live": يتم جلب القواميس ديناميكيًا باستخدام واجهة برمجة تطبيقات المزامنة الحية.
     *   يستبدل useIntlayer بـ useDictionaryDynamic.
     *
     * ملاحظة: يستخدم الوضع الحي واجهة برمجة تطبيقات المزامنة الحية لجلب القواميس. إذا فشل استدعاء API،
     * يتم استيراد القواميس ديناميكيًا.
     * ملاحظة: فقط القواميس التي تحتوي على محتوى عن بُعد وعلامات "live" تستخدم الوضع الحي.
     * القواميس الأخرى تستخدم الوضع الديناميكي لأداء أفضل.
     */
    importMode: "live",
  },
};

module.exports = config;
```

ابدأ خادم المزامنة الحية لتغليف تطبيقك:

مثال باستخدام Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... سكريبتات أخرى
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
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
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

يقوم خادم المزامنة الحية بتغليف تطبيقك ويطبق المحتوى المحدث تلقائيًا عند وصوله.

لتلقي إشعارات التغيير من نظام إدارة المحتوى (CMS)، يحافظ خادم المزامنة الحية على اتصال SSE مع الخادم الخلفي. عندما يتغير المحتوى في نظام إدارة المحتوى، يقوم الخادم الخلفي بإرسال التحديث إلى خادم المزامنة الحية، الذي يقوم بكتابة القواميس الجديدة. سيعكس تطبيقك التحديث في التنقل التالي أو عند إعادة تحميل المتصفح — دون الحاجة لإعادة بناء التطبيق.

مخطط التدفق (نظام إدارة المحتوى/الخادم الخلفي -> خادم المزامنة الحية -> خادم التطبيق -> الواجهة الأمامية):

![مخطط منطق المزامنة الحية](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

كيف يعمل:

![مخطط تدفق المزامنة الحية نظام إدارة المحتوى/الخادم الخلفي/خادم المزامنة الحية/خادم التطبيق/الواجهة الأمامية](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### سير عمل التطوير (محلي)

- في بيئة التطوير، يتم جلب جميع القواميس البعيدة عند بدء تشغيل التطبيق، بحيث يمكنك اختبار التحديثات بسرعة.
- لاختبار المزامنة الحية محليًا مع Next.js، قم بتغليف خادم التطوير الخاص بك:

```json5 fileName="package.json"
{
  "scripts": {
    // ... سكريبتات أخرى
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // لـ Vite
  },
}
```

قم بتمكين التحسين حتى يطبق Intlayer تحولات الاستيراد الحي أثناء التطوير:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
// تكوين Intlayer مع إعدادات المزامنة الحية
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
// تكوين Intlayer مع إعدادات المزامنة الحية
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

يقوم هذا الإعداد بتغليف خادم التطوير الخاص بك مع خادم المزامنة الحية، ويجلب القواميس البعيدة عند بدء التشغيل، ويقوم ببث التحديثات من نظام إدارة المحتوى عبر SSE. قم بتحديث الصفحة لرؤية التغييرات.

ملاحظات وقيود:

- أضف مصدر المزامنة الحية إلى سياسة أمان موقعك (CSP). تأكد من السماح بعنوان URL الخاص بالمزامنة الحية في `connect-src` (و `frame-ancestors` إذا كان ذلك مناسبًا).
- لا تعمل المزامنة الحية مع المخرجات الثابتة. بالنسبة لـ Next.js، يجب أن تكون الصفحة ديناميكية لتلقي التحديثات أثناء وقت التشغيل (على سبيل المثال، استخدم `generateStaticParams`، `generateMetadata`، `getServerSideProps`، أو `getStaticProps` بشكل مناسب لتجنب القيود الخاصة بالمحتوى الثابت فقط).
- في نظام إدارة المحتوى (CMS)، يحتوي كل قاموس على علامة `live`. يتم جلب القواميس التي تحمل العلامة `live=true` فقط عبر واجهة برمجة تطبيقات المزامنة الحية؛ أما القواميس الأخرى فتُستورد ديناميكيًا وتظل دون تغيير أثناء وقت التشغيل.
- يتم تقييم علامة `live` لكل قاموس أثناء وقت البناء. إذا لم يتم وسم المحتوى البعيد بعلامة `live=true` أثناء البناء، يجب عليك إعادة البناء لتمكين المزامنة الحية لذلك القاموس.
- يجب أن يكون خادم المزامنة الحية قادرًا على الكتابة إلى `.intlayer`. في الحاويات، تأكد من وجود صلاحية الكتابة إلى `/.intlayer`.

## تصحيح الأخطاء

إذا واجهت أي مشاكل مع نظام إدارة المحتوى (CMS)، تحقق من الأمور التالية:

- التطبيق يعمل.

- تم إعداد تكوين [`المحرر`](https://intlayer.org/doc/concept/configuration#editor-configuration) بشكل صحيح في ملف تكوين Intlayer الخاص بك.
  - الحقول المطلوبة:
    - يجب أن يتطابق عنوان URL الخاص بالتطبيق مع العنوان الذي قمت بتعيينه في تكوين المحرر (`applicationURL`).
    - عنوان URL الخاص بنظام إدارة المحتوى (CMS)

- تأكد من أن تكوين المشروع تم دفعه إلى نظام إدارة محتوى Intlayer.

- يستخدم المحرر المرئي إطار iframe لعرض موقعك الإلكتروني. تأكد من أن سياسة أمان المحتوى (CSP) لموقعك تسمح بعنوان URL الخاص بنظام إدارة المحتوى كـ `frame-ancestors` ('https://intlayer.org' بشكل افتراضي). تحقق من وحدة تحكم المحرر لأي أخطاء.
