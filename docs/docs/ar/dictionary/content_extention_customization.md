---
docName: dictionary__content_extention_customization
url: https://intlayer.org/doc/concept/content
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_extention_customization.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: تخصيص امتدادات المحتوى
description: تعلّم كيفية تخصيص الامتدادات لملفات إعلان المحتوى الخاصة بك. اتبع هذا التوثيق لتنفيذ الشروط بكفاءة في مشروعك.
keywords:
  - تخصيص امتدادات المحتوى
  - التوثيق
  - Intlayer
---

# تخصيص امتدادات المحتوى

## امتدادات ملفات المحتوى

تتيح لك Intlayer تخصيص الامتدادات لملفات إعلان المحتوى الخاصة بك. يوفر هذا التخصيص مرونة في إدارة المشاريع واسعة النطاق ويساعد في تجنب التعارضات مع الوحدات الأخرى.

### الامتدادات الافتراضية

بشكل افتراضي، تراقب Intlayer جميع الملفات التي تحمل الامتدادات التالية لإعلانات المحتوى:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

هذه الامتدادات الافتراضية مناسبة لمعظم التطبيقات. ومع ذلك، عندما تكون لديك احتياجات محددة، يمكنك تعريف امتدادات مخصصة لتبسيط عملية البناء وتقليل مخاطر التعارض مع المكونات الأخرى.

### تخصيص امتدادات المحتوى

لتخصيص امتدادات الملفات التي يستخدمها Intlayer لتحديد ملفات إعلان المحتوى، يمكنك تحديدها في ملف تكوين Intlayer. هذه الطريقة مفيدة للمشاريع واسعة النطاق حيث أن تحديد نطاق عملية المراقبة يحسن أداء البناء.

فيما يلي مثال على كيفية تعريف امتدادات محتوى مخصصة في تكوينك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // امتداداتك المخصصة
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // امتداداتك المخصصة
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // امتداداتك المخصصة
  },
};

module.exports = config;
```

في هذا المثال، يحدد التكوين امتدادين مخصصين: `.my_content.ts` و `.my_content.tsx`. سيقوم Intlayer بمراقبة الملفات التي تحمل هذه الامتدادات فقط لبناء القواميس.

### فوائد الامتدادات المخصصة

- **أداء البناء**: تقليل نطاق الملفات التي تتم مراقبتها يمكن أن يحسن بشكل كبير من أداء البناء في المشاريع الكبيرة.
- **تجنب التعارض**: تساعد الامتدادات المخصصة في منع التعارض مع ملفات جافا سكريبت أو تايب سكريبت الأخرى في مشروعك.
- **التنظيم**: تسمح لك الامتدادات المخصصة بتنظيم ملفات إعلان المحتوى الخاصة بك وفقًا لاحتياجات مشروعك.

### إرشادات الامتدادات المخصصة

عند تخصيص امتدادات ملفات المحتوى، ضع الإرشادات التالية في اعتبارك:

- **التفرد**: اختر امتدادات فريدة داخل مشروعك لتجنب التعارضات.
- **التسمية المتسقة**: استخدم قواعد تسمية متسقة لتحسين قابلية قراءة الكود وصيانته.
- **تجنب الامتدادات الشائعة**: تجنب استخدام الامتدادات الشائعة مثل `.ts` أو `.js` لمنع التعارض مع الوحدات أو المكتبات الأخرى.

## الخاتمة

تخصيص امتدادات ملفات المحتوى في Intlayer هي ميزة قيمة لتحسين الأداء وتجنب التعارضات في التطبيقات واسعة النطاق. من خلال اتباع الإرشادات الموضحة في هذه الوثيقة، يمكنك إدارة إعلانات المحتوى الخاصة بك بفعالية وضمان تكامل سلس مع أجزاء أخرى من مشروعك.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
