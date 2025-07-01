---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: نظام إدارة المحتوى Intlayer | استخرج محتواك إلى نظام إدارة المحتوى Intlayer
description: استخرج محتواك إلى نظام إدارة المحتوى Intlayer لتفويض إدارة المحتوى لفريقك.
keywords:
  - نظام إدارة المحتوى
  - محرر مرئي
  - تدويل
  - توثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
---

# توثيق نظام إدارة المحتوى (CMS) الخاص بـ Intlayer

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

نظام إدارة المحتوى Intlayer هو تطبيق يتيح لك فصل محتوى مشروع Intlayer الخاص بك.

لهذا الغرض، يقدم Intlayer مفهوم "القواميس البعيدة".

![واجهة نظام إدارة المحتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## فهم القواميس البعيدة

يقوم Intlayer بالتمييز بين القواميس "المحلية" و"البعيدة".

- القاموس "المحلي" هو قاموس يتم الإعلان عنه في مشروع Intlayer الخاص بك، مثل ملف الإعلان عن زر أو شريط التنقل الخاص بك. لا معنى لفصل المحتوى في هذه الحالة لأن هذا المحتوى ليس من المفترض تغييره بشكل متكرر.

- القاموس "البعيد" هو قاموس يتم إدارته من خلال نظام إدارة المحتوى Intlayer. يمكن أن يكون مفيدًا للسماح لفريقك بإدارة المحتوى مباشرةً على موقعك، كما يهدف إلى استخدام ميزات اختبار A/B وتحسين محركات البحث التلقائي.

## المحرر البصري مقابل نظام إدارة المحتوى

[المحرر البصري Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) هو أداة تتيح لك إدارة المحتوى في محرر بصري للقواميس المحلية. بمجرد إجراء تغيير، سيتم استبدال المحتوى في قاعدة الكود. هذا يعني أن التطبيق سيتم إعادة بنائه وستتم إعادة تحميل الصفحة لعرض المحتوى الجديد.

على النقيض من ذلك، فإن نظام إدارة المحتوى Intlayer هو أداة تتيح لك إدارة المحتوى في محرر بصري للقواميس البعيدة. بمجرد إجراء تغيير، لن يؤثر المحتوى على قاعدة الكود. وسيعرض الموقع تلقائيًا المحتوى الذي تم تغييره.

## التكامل

لمزيد من التفاصيل حول كيفية تثبيت الحزمة، راجع القسم ذي الصلة أدناه:

### التكامل مع Next.js

### التكامل مع Next.js

للتكامل مع Next.js، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md).

### التكامل مع Create React App

للتكامل مع Create React App، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md).

### التكامل مع Vite + React

للتكامل مع Vite + React، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md).

## التكوين

في ملف تكوين Intlayer الخاص بك، يمكنك تخصيص إعدادات نظام إدارة المحتوى:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * مطلوب
     *
     * عنوان URL للتطبيق.
     * هذا هو عنوان URL المستهدف من قبل المحرر البصري.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * مطلوب
     *
     * معرف العميل والسر الخاص بالعميل مطلوبان لتمكين المحرر.
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
     * في حالة استضافة نظام إدارة المحتوى Intlayer ذاتيًا، يمكنك تعيين عنوان URL الخاص بنظام إدارة المحتوى.
     *
     * عنوان URL لنظام إدارة المحتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * اختياري
     *
     * في حالة استضافة نظام إدارة المحتوى Intlayer ذاتيًا، يمكنك تعيين عنوان URL الخاص بالخلفية.
     *
     * عنوان URL لنظام إدارة المحتوى Intlayer.
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
     * عنوان URL للتطبيق.
     * هذا هو عنوان URL المستهدف من قبل المحرر البصري.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * مطلوب
     *
     * معرف العميل والسر الخاص بالعميل مطلوبان لتمكين المحرر.
     * يسمحان بتحديد هوية المستخدم الذي يقوم بتحرير المحتوى.
     * يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * اختياري
     *
     * في حالة استضافة نظام إدارة المحتوى Intlayer ذاتيًا، يمكنك تعيين عنوان URL الخاص بنظام إدارة المحتوى.
     *
     * عنوان URL لنظام إدارة المحتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * اختياري
     *
     * في حالة استضافة نظام إدارة المحتوى Intlayer ذاتيًا، يمكنك تعيين عنوان URL الخاص بالخلفية.
     *
     * عنوان URL لنظام إدارة المحتوى Intlayer.
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
     * عنوان URL للتطبيق.
     * هذا هو عنوان URL المستهدف من قبل المحرر البصري.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * مطلوب
     *
     * معرف العميل والسر الخاص بالعميل مطلوبان لتمكين المحرر.
     * يسمحان بتحديد هوية المستخدم الذي يقوم بتحرير المحتوى.
     * يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * اختياري
     *
     * في حالة استضافة نظام إدارة المحتوى Intlayer ذاتيًا، يمكنك تعيين عنوان URL الخاص بنظام إدارة المحتوى.
     *
     * عنوان URL لنظام إدارة المحتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * اختياري
     *
     * في حالة استضافة نظام إدارة المحتوى Intlayer ذاتيًا، يمكنك تعيين عنوان URL الخاص بالخلفية.
     *
     * عنوان URL لنظام إدارة المحتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> إذا لم يكن لديك معرف العميل والسر الخاص بالعميل، يمكنك الحصول عليهما عن طريق إنشاء عميل جديد في [لوحة تحكم Intlayer - المشاريع](https://intlayer.org/dashboard/projects).

> لرؤية جميع المعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## استخدام نظام إدارة المحتوى

### دفع التكوين الخاص بك

لتكوين نظام إدارة المحتوى Intlayer، يمكنك استخدام أوامر [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ar/intlayer_cli.md).

```bash
npx intlayer config push
```

> إذا كنت تستخدم متغيرات البيئة في ملف التكوين `intlayer.config.ts`، يمكنك تحديد البيئة المطلوبة باستخدام الوسيطة `--env`:

```bash
npx intlayer config push --env production
```

يقوم هذا الأمر بتحميل التكوين الخاص بك إلى نظام إدارة المحتوى Intlayer.

### دفع قاموس

لتحويل القواميس المحلية الخاصة بك إلى قاموس بعيد، يمكنك استخدام أوامر [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ar/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> إذا كنت تستخدم متغيرات البيئة في ملف التكوين `intlayer.config.ts`، يمكنك تحديد البيئة المطلوبة باستخدام الوسيطة `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

يقوم هذا الأمر بتحميل قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة للجلب غير المتزامن والتحرير من خلال منصة Intlayer.

### تحرير القاموس

بعد ذلك، ستتمكن من رؤية وإدارة القاموس الخاص بك في [نظام إدارة المحتوى Intlayer](https://intlayer.org/dashboard/content).

## إعادة التحميل الفوري

يستطيع نظام إدارة المحتوى Intlayer إعادة تحميل القواميس تلقائيًا عند اكتشاف تغيير.

بدون إعادة التحميل الفوري، سيكون من الضروري إنشاء جديد للتطبيق لعرض المحتوى الجديد.
من خلال تفعيل إعداد [`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration)، سيقوم التطبيق تلقائيًا باستبدال المحتوى المحدث عند اكتشافه.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... إعدادات التكوين الأخرى
  editor: {
    // ... إعدادات التكوين الأخرى

    /**
     * يشير إلى ما إذا كان يجب على التطبيق إعادة تحميل تكوينات اللغة تلقائيًا عند اكتشاف تغيير.
     * على سبيل المثال، عند إضافة أو تحديث قاموس جديد، سيقوم التطبيق بتحديث المحتوى لعرضه في الصفحة.
     *
     * لأن إعادة التحميل الفوري تحتاج إلى اتصال مستمر بالخادم، فهي متاحة فقط لعملاء خطة `enterprise`.
     *
     * الافتراضي: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات التكوين الأخرى
  editor: {
    // ... إعدادات التكوين الأخرى

    /**
     * يشير إلى ما إذا كان يجب على التطبيق إعادة تحميل تكوينات اللغة تلقائيًا عند اكتشاف تغيير.
     * على سبيل المثال، عند إضافة أو تحديث قاموس جديد، سيقوم التطبيق بتحديث المحتوى لعرضه في الصفحة.
     *
     * لأن إعادة التحميل الفوري تحتاج إلى اتصال مستمر بالخادم، فهي متاحة فقط لعملاء خطة `enterprise`.
     *
     * الافتراضي: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات التكوين الأخرى
  editor: {
    // ... إعدادات التكوين الأخرى

    /**
     * يشير إلى ما إذا كان يجب على التطبيق إعادة تحميل تكوينات اللغة تلقائيًا عند اكتشاف تغيير.
     * على سبيل المثال، عند إضافة أو تحديث قاموس جديد، سيقوم التطبيق بتحديث المحتوى لعرضه في الصفحة.
     *
     * لأن إعادة التحميل الفوري تحتاج إلى اتصال مستمر بالخادم، فهي متاحة فقط لعملاء خطة `enterprise`.
     *
     * الافتراضي: false
     */
    hotReload: true,
  },
};

module.exports = config;
```

إعادة التحميل الفوري تستبدل المحتوى على كلا الجانبين الخادم والعميل.

- على جانب الخادم، يجب التأكد من أن عملية التطبيق لديها حق الوصول للكتابة إلى دليل `.intlayer/dictionaries`.
- على جانب العميل، تتيح إعادة التحميل الفوري للتطبيق إعادة تحميل المحتوى في المتصفح دون الحاجة إلى إعادة تحميل الصفحة. ومع ذلك، هذه الميزة متاحة فقط لمكونات العملاء.

> لأن إعادة التحميل الفوري تحتاج إلى اتصال مستمر بالخادم باستخدام `EventListener`، فهي متاحة فقط لعملاء خطة `enterprise`.

## التصحيح

إذا واجهت أي مشاكل مع نظام إدارة المحتوى، تحقق من التالي:

- التطبيق يعمل.

- تم تعيين إعدادات [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) بشكل صحيح في ملف تكوين Intlayer الخاص بك.

  - الحقول المطلوبة:
    - يجب أن يتطابق عنوان URL للتطبيق مع الذي قمت بتعيينه في إعدادات المحرر (`applicationURL`).
    - عنوان URL لنظام إدارة المحتوى.

- تأكد من أن تكوين المشروع تم دفعه إلى نظام إدارة المحتوى Intlayer.

- يستخدم المحرر البصري إطار iframe لعرض موقعك. تأكد من أن سياسة أمان المحتوى (CSP) لموقعك تسمح بعنوان URL لنظام إدارة المحتوى كـ `frame-ancestors` ('https://intlayer.org' افتراضيًا). تحقق من وحدة تحكم المحرر لأي أخطاء.

## سجل الوثائق

- 5.5.10 - 2025-06-29: بداية السجل
