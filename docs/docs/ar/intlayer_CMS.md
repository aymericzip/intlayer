---
createdAt: 2025-08-23
updatedAt: 2026-07-08
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
  - version: 9.0.0
    date: 2026-07-08
    changes: "نقل قسم «التزامن الحي» إلى صفحة مستقلة (live-sync.md)، مع الإبقاء هنا على مقدمة قصيرة ورابط"
  - version: 9.0.0
    date: 2026-06-30
    changes: "إضافة قسم الاستضافة الذاتية"
  - version: 6.0.1
    date: 2025-09-22
    changes: "إضافة توثيق المزامنة الحية"
  - version: 6.0.0
    date: 2025-09-04
    changes: "استبدال حقل `hotReload` بـ `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "بدء السجل"
author: aymericzip
---

# توثيق نظام إدارة المحتوى Intlayer (CMS)

<iframe title="المحرر البصري + نظام إدارة المحتوى لتطبيق الويب الخاص بك: شرح Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

نظام إدارة المحتوى Intlayer هو تطبيق يسمح لك بإخراج محتواك من مشروع Intlayer.

لهذا، قدم Intlayer مفهوم "القواميس البعيدة".

![واجهة نظام إدارة المحتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## جدول المحتويات

<TOC/>

---

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

قم بتشغيل الأمر التالي لتسجيل الدخول إلى Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

سيؤدي هذا إلى فتح المتصفح الافتراضي الخاص بك لإكمال عملية المصادقة والحصول على بيانات الاعتماد اللازمة (معرف العميل وسر العميل) لاستخدام خدمات Intlayer.

في ملف تهيئة Intlayer الخاص بك، يمكنك تخصيص إعدادات نظام إدارة المحتوى:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
     * يمكن الحصول عليهما بإنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://app.intlayer.org/projects).
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

> إذا لم يكن لديك معرف عميل وسر عميل، يمكنك الحصول عليهما بإنشاء عميل جديد في [لوحة تحكم Intlayer - المشاريع](https://app.intlayer.org/projects).

> لرؤية جميع المعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## استخدام نظام إدارة المحتوى

### دفع التهيئة الخاصة بك

لتكوين نظام إدارة محتوى Intlayer، يمكنك استخدام أوامر [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ar/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> إذا كنت تستخدم متغيرات البيئة في ملف التهيئة `intlayer.config.ts`، يمكنك تحديد البيئة المطلوبة باستخدام الوسيطة `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

يقوم هذا الأمر برفع تهيئتك إلى نظام إدارة محتوى Intlayer.

### دفع قاموس

لتحويل قواميس اللغة المحلية الخاصة بك إلى قاموس بعيد، يمكنك استخدام أوامر [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ar/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> إذا كنت تستخدم متغيرات البيئة في ملف التهيئة `intlayer.config.ts` الخاص بك، يمكنك تحديد البيئة المطلوبة باستخدام الوسيطة `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

يقوم هذا الأمر برفع قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة للتحميل والتحرير غير المتزامن عبر منصة Intlayer.

### تحرير القاموس

بعد ذلك، ستتمكن من رؤية وإدارة قاموسك في [نظام إدارة محتوى Intlayer](https://app.intlayer.org/content).

## التزامن الحي

يتيح التزامن الحي لتطبيقك عكس تغييرات محتوى نظام إدارة المحتوى أثناء وقت التشغيل. لا حاجة لإعادة البناء أو إعادة النشر. عند التمكين، يتم بث التحديثات إلى خادم التزامن الحي الذي يقوم بتحديث القواميس التي يقرأها تطبيقك.

للحصول على دليل الإعداد الكامل (التفعيل، تشغيل خادم Live Sync، سير عمل التطوير المحلي، والقيود)، راجع [توثيق Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/live-sync.md).

## الاستضافة الذاتية (Self-Hosting)

يمكن تشغيل Intlayer بالكامل على بنيتك التحتية الخاصة. يؤدي أمر واحد إلى تشغيل المكدس الكامل (لوحة التحكم، وواجهة برمجة التطبيقات، وقاعدة البيانات، وتخزين الكائنات، والبريد الإلكتروني) باستخدام Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

للاطلاع على دليل الإعداد الكامل، ومرجع متغيرات البيئة، وتعليمات الترقية، وإجراءات النسخ الاحتياطي والاستعادة، راجع [دليل الاستضافة الذاتية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

---

## تصحيح الأخطاء

إذا واجهت أي مشاكل مع نظام إدارة المحتوى (CMS)، تحقق من الأمور التالية:

- التطبيق يعمل.

- تم إعداد تكوين [`المحرر`](https://intlayer.org/doc/concept/configuration#editor-configuration) بشكل صحيح في ملف تكوين Intlayer الخاص بك.
  - الحقول المطلوبة:
    - يجب أن يتطابق عنوان URL الخاص بالتطبيق مع العنوان الذي قمت بتعيينه في تكوين المحرر (`applicationURL`).
    - عنوان URL الخاص بنظام إدارة المحتوى (CMS)

- تأكد من أن تكوين المشروع تم دفعه إلى نظام إدارة محتوى Intlayer.

- يستخدم المحرر المرئي إطار iframe لعرض موقعك الإلكتروني. تأكد من أن سياسة أمان المحتوى (CSP) لموقعك تسمح بعنوان URL الخاص بنظام إدارة المحتوى كـ `frame-ancestors` ('https://app.intlayer.org' بشكل افتراضي). تحقق من وحدة تحكم المحرر لأي أخطاء.
