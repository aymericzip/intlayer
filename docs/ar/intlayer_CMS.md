# Intlayer نظام إدارة المحتوى (CMS) الوثائق

نظام إدارة محتوى Intlayer هو تطبيق يتيح لك تفريغ المحتوى الخاص بمشروع Intlayer.

لهذا، يقدم Intlayer مفهوم "القواميس البعيدة".

## فهم القواميس البعيدة

يضع Intlayer تمييزًا بين "القواميس المحلية" و "القواميس البعيدة".

- "القاموس المحلي" هو قاموس يتم الإعلان عنه في مشروع Intlayer الخاص بك. مثل ملف الإعلان عن زر، أو شريط التنقل الخاص بك. تفريغ المحتوى الخاص بك لا معنى له في هذه الحالة لأن هذا المحتوى من المفترض ألا يتغير كثيرًا.

- "القاموس البعيد" هو قاموس يتم إدارته عبر نظام إدارة المحتوى Intlayer. قد يكون مفيدًا للسماح لفريقك بإدارة المحتوى الخاص بك مباشرة على موقعك، ويهدف أيضًا إلى استخدام ميزات اختبار A/B وتحسين SEO التلقائي.

## محرر مرئي مقابل CMS

محرر [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) هو أداة تتيح لك إدارة المحتوى الخاص بك في محرر مرئي للموسوعات المحلية. بمجرد إجراء تغيير، سيتم استبدال المحتوى في قاعدة الشيفرة. وهذا يعني أن التطبيق سيتم إعادة بنائه وسيتم إعادة تحميل الصفحة لعرض المحتوى الجديد.

بالمقابل، إن نظام إدارة المحتوى Intlayer هو أداة تتيح لك إدارة المحتوى الخاص بك في محرر مرئي للقواميس البعيدة. بمجرد إجراء تغيير، **لن** يؤثر المحتوى على قاعدة الشيفرة الخاصة بك. وسيعرض الموقع تلقائيًا المحتوى الذي تم تغييره.

## التكامل

للحصول على مزيد من التفاصيل حول كيفية تثبيت الحزمة، راجع القسم ذي الصلة أدناه:

### التكامل مع Next.js

للتكامل مع Next.js، يرجى الاطلاع على [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

### التكامل مع Create React App

للتكامل مع Create React App، يرجى الاطلاع على [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md).

### التكامل مع Vite + React

للتكامل مع Vite + React، يرجى الاطلاع على [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md).

## التكوين

### 1. تمكين المحرر في ملف intlayer.config.ts الخاص بك

في ملف تكوين Intlayer الخاص بك، يمكنك تخصيص إعدادات المحرر:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... إعدادات تكوين أخرى
  editor: {
    /**
     * معرف العميل وسر العميل مطلوبان لتمكين المحرر.
     * يسمحان بتحديد المستخدم الذي يقوم بتحرير المحتوى.
     * يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة التحكم لـ Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * اختياري
     * الافتراض هو `true`. إذا كان `false`، فإن المحرر غير نشط ولا يمكن الوصول إليه.
     * يمكن استخدامه لتعطيل المحرر لبيئات معينة لأسباب أمنية، مثل الإنتاج.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات تكوين أخرى
  editor: {
    /**
     * معرف العميل وسر العميل مطلوبان لتمكين المحرر.
     * يسمحان بتحديد المستخدم الذي يقوم بتحرير المحتوى.
     * يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة التحكم لـ Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * اختياري
     * الافتراض هو `true`. إذا كان `false`، فإن المحرر غير نشط ولا يمكن الوصول إليه.
     * يمكن استخدامه لتعطيل المحرر لبيئات معينة لأسباب أمنية، مثل الإنتاج.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات تكوين أخرى
  editor: {
    /**
     * معرف العميل وسر العميل مطلوبان لتمكين المحرر.
     * يسمحان بتحديد المستخدم الذي يقوم بتحرير المحتوى.
     * يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة التحكم لـ Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * اختياري
     * الافتراض هو `true`. إذا كان `false`، فإن المحرر غير نشط ولا يمكن الوصول إليه.
     * يمكن استخدامه لتعطيل المحرر لبيئات معينة لأسباب أمنية، مثل الإنتاج.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> إذا لم يكن لديك معرف عميل وسر عميل، يمكنك الحصول عليهما عن طريق إنشاء عميل جديد في [لوحة التحكم لـ Intlayer - المشاريع](https://intlayer.org/dashboard/projects).

> لرؤية جميع المعلمات المتاحة، يرجى الرجوع إلى [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## استخدام CMS

عندما يتم تثبيت المحرر، يمكنك عرض كل حقل تم فهرسته بواسطة Intlayer عن طريق تمرير المؤشر فوق المحتوى الخاص بك.

![تحويم فوق المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

إذا كان المحتوى الخاص بك محددًا، يمكنك الضغط عليه لفترة طويلة لعرض درج التحرير.
