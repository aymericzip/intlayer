---
createdAt: 2025-03-13
updatedAt: 2025-12-13
title: مكون مزامنة JSON
description: مزامنة قواميس Intlayer مع ملفات JSON الخاصة بالتدويل من طرف ثالث (i18next، next-intl، react-intl، vue-i18n، والمزيد). احتفظ بنظام التدويل الحالي لديك أثناء استخدام Intlayer لإدارة وترجمة واختبار رسائلك.
keywords:
  - Intlayer
  - مزامنة JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - الترجمات
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: إضافة دعم تنسيقات ICU و i18next
  - version: 6.1.6
    date: 2025-10-05
    changes: الوثائق الأولية لمكون مزامنة JSON
---

# مزامنة JSON (جسور التدويل) - مزامنة JSON مع دعم ICU / i18next

<iframe title="كيفية الحفاظ على مزامنة ترجمات JSON الخاصة بك مع Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

استخدم Intlayer كمكون إضافي إلى نظام التدويل (i18n) الحالي لديك. يحافظ هذا المكون على مزامنة رسائل JSON الخاصة بك مع قواميس Intlayer بحيث يمكنك:

- الاحتفاظ بـ i18next، next-intl، react-intl، vue-i18n، next-translate، nuxt-i18n، Solid-i18next، svelte-i18n، وغيرها.
- إدارة وترجمة رسائلك باستخدام Intlayer (CLI، CI، المزودين، نظام إدارة المحتوى)، دون الحاجة لإعادة هيكلة تطبيقك.
- نشر الدروس ومحتوى تحسين محركات البحث (SEO) المستهدف لكل نظام بيئي، مع اقتراح Intlayer كطبقة لإدارة JSON.

ملاحظات ونطاق العمل الحالي:

- التصدير إلى نظام إدارة المحتوى يعمل للترجمات والنصوص التقليدية.
- لا يوجد دعم حتى الآن للإدخالات، الجمع/ICU، أو الميزات المتقدمة في وقت التشغيل لمكتبات أخرى.
- محرر الواجهة البصرية غير مدعوم حتى الآن لمخرجات التدويل من طرف ثالث.

### متى تستخدم هذا المكون

- أنت تستخدم بالفعل مكتبة i18n وتخزن الرسائل في ملفات JSON.
- تريد ملء بمساعدة الذكاء الاصطناعي، واختبار في CI، وعمليات المحتوى دون تغيير وقت تشغيل العرض الخاص بك.

## التثبيت

```bash
pnpm add -D @intlayer/sync-json-plugin
# أو
npm i -D @intlayer/sync-json-plugin
```

## بداية سريعة

أضف المكون الإضافي إلى ملف `intlayer.config.ts` وأشر إلى هيكل JSON الحالي الخاص بك.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // حافظ على مزامنة ملفات JSON الحالية مع قواميس Intlayer
  plugins: [
    syncJSON({
      // تخطيط لكل لغة ولكل مساحة أسماء (مثل next-intl، i18next مع مساحات الأسماء)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

البديل: ملف واحد لكل لغة (شائع مع إعدادات i18next/react-intl):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### كيف يعمل

- القراءة: يكتشف المكون الإضافي ملفات JSON من منشئ `source` الخاص بك ويحمّلها كقواميس Intlayer.
- الكتابة: بعد عمليات البناء والملء، يكتب ملفات JSON المحلية مرة أخرى إلى نفس المسارات (مع سطر جديد نهائي لتجنب مشاكل التنسيق).
- الملء التلقائي: يعلن المكون الإضافي عن مسار `autoFill` لكل قاموس. تشغيل الأمر `intlayer fill` يقوم بتحديث الترجمات المفقودة فقط في ملفات JSON الخاصة بك بشكل افتراضي.

واجهة برمجة التطبيقات (API):

```ts
syncJSON({
  source: ({ key, locale }) => string, // مطلوب
  location?: string, // تسمية اختيارية، الافتراضي: "plugin"
  priority?: number, // أولوية اختيارية لحل التعارضات، الافتراضي: 0
  format?: 'intlayer' | 'icu' | 'i18next', // مُنسق اختياري، الافتراضي: 'intlayer'
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

يحدد المُنسق الذي سيتم استخدامه لمحتوى القاموس عند مزامنة ملفات JSON. يسمح هذا باستخدام صيغ تنسيق رسائل مختلفة متوافقة مع مكتبات i18n مختلفة.

- `'intlayer'`: مُنسق Intlayer الافتراضي (الافتراضي).
- `'icu'`: يستخدم تنسيق رسائل ICU (متوافق مع مكتبات مثل react-intl، vue-i18n).
- `'i18next'`: يستخدم تنسيق رسائل i18next (متوافق مع i18next، next-i18next، Solid-i18next).

**مثال:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // استخدام تنسيق i18next للتوافق
}),
```

## مصادر JSON متعددة والأولوية

يمكنك إضافة عدة مكونات إضافية `syncJSON` لمزامنة مصادر JSON مختلفة. هذا مفيد عندما يكون لديك مكتبات i18n متعددة أو هياكل JSON مختلفة في مشروعك.

### نظام الأولوية

عندما تستهدف عدة مكونات إضافية نفس مفتاح القاموس، يحدد معامل `priority` أي مكون إضافي له الأسبقية:

- الأرقام الأعلى في الأولوية تفوز على الأقل منها
- الأولوية الافتراضية لملفات `.content` هي `0`
- الأولوية الافتراضية لملفات محتوى المكونات الإضافية هي `-1`
- تتم معالجة المكونات الإضافية التي لها نفس الأولوية بالترتيب الذي تظهر به في التكوين

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // المصدر الأساسي لملفات JSON (الأولوية الأعلى)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // المصدر الاحتياطي لملفات JSON (أولوية أقل)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // المصدر القديم لملفات JSON (الأولوية الأدنى)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### حل النزاعات

عندما يوجد نفس مفتاح الترجمة في مصادر JSON متعددة:

1. يحدد المكون الإضافي ذو الأولوية الأعلى القيمة النهائية
2. تُستخدم المصادر ذات الأولوية الأقل كاحتياطيات للمفاتيح المفقودة
3. يتيح لك هذا الحفاظ على الترجمات القديمة أثناء الترحيل التدريجي إلى الهياكل الجديدة

## التكاملات

فيما يلي الخرائط الشائعة. احتفظ ببيئة التشغيل الخاصة بك دون تغيير؛ فقط أضف المكون الإضافي.

### i18next

تخطيط الملف النموذجي: `./public/locales/{locale}/{namespace}.json` أو `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

رسائل JSON لكل لغة (غالبًا `./messages/{locale}.json`) أو لكل مساحة أسماء.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

انظر أيضًا: `docs/ar/intlayer_with_next-intl.md`.

### react-intl

عادةً ما يكون ملف JSON واحد لكل لغة:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

إما ملف واحد لكل لغة أو لكل مساحة أسماء:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

سيتم اعتبار ملفات JSON المتزامنة كملفات `.content` أخرى. هذا يعني أن جميع أوامر intlayer ستكون متاحة لملفات JSON المتزامنة. بما في ذلك:

- `intlayer content test` لاختبار ما إذا كانت هناك ترجمات مفقودة
- `intlayer content list` لعرض قائمة ملفات JSON المتزامنة
- `intlayer content fill` لملء الترجمات المفقودة
- `intlayer content push` لدفع ملفات JSON المتزامنة
- `intlayer content pull` لسحب ملفات JSON المتزامنة

راجع [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md) لمزيد من التفاصيل.

## القيود (الحالية)

- لا توجد إدخالات أو دعم للجمع/ICU عند استهداف مكتبات الطرف الثالث.
- محرر بصري غير متوفر بعد لبيئات التشغيل غير الخاصة بـ Intlayer.
- مزامنة JSON فقط؛ تنسيقات الكتالوج غير JSON غير مدعومة.

## لماذا هذا مهم

- يمكننا التوصية بحلول i18n المعروفة ووضع Intlayer كإضافة.
- نستفيد من تحسين محركات البحث/الكلمات المفتاحية الخاصة بهم مع الدروس التي تنتهي باقتراح استخدام Intlayer لإدارة JSON.
- يوسع الجمهور المستهدف من "المشاريع الجديدة" إلى "أي فريق يستخدم i18n بالفعل".
