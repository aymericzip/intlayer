---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: إضافة Sync PO
description: قم بمزامنة قواميس Intlayer مع ملفات Gettext PO. حافظ على نظام i18n الحالي الخاص بك مع استخدام Intlayer لإدارة رسائلك وترجمتها واختبارها.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - ترجمات
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "التوثيق الأولي لإضافة Sync PO"
---

# Sync PO (جسور i18n) - مزامنة PO مع دعم ICU / i18next

استخدم Intlayer كإضافة لمجموعة أدوات i18n الحالية لديك. تحافظ هذه الإضافة على رسائل Gettext PO الخاصة بك متزامنة مع قواميس Intlayer حتى تتمكن من:

- الحفاظ على سير عمل الترجمة الحالي المعتمد على PO.
- إدارة رسائلك وترجمتها باستخدام Intlayer (CLI، CI، المزودين، CMS)، دون إعادة صياغة تطبيقك.
- شحن الدروس ومحتوى SEO الذي يستهدف كل نظام بيئي، مع اقتراح Intlayer كطبقة إدارة PO.

ملاحظات والنطاق الحالي:

- يعمل التصدير الخارجي إلى CMS للترجمات والنصوص الكلاسيكية.
- لا يوجد دعم حتى الآن للإدراجات، أو الجموع/ICU، أو ميزات وقت التشغيل المتقدمة للمكتبات الأخرى داخل مدخلات PO نفسها.
- المحرر المرئي غير مدعوم بعد لمخرجات i18n التابعة لجهات خارجية.

### متى تستخدم هذه الإضافة

- أنت تستخدم بالفعل ملفات Gettext PO لترجماتك.
- تريد التعبئة بمساعدة الذكاء الاصطناعي، والاختبار في CI، وعمليات المحتوى دون تغيير وقت تشغيل العرض الخاص بك.

## التثبيت

```bash
pnpm add -D @intlayer/sync-po-plugin
# أو
npm i -D @intlayer/sync-po-plugin
```

## الإضافات

توفر هذه الحزمة إضافتين:

- `loadPO`: تحميل ملفات PO في قواميس Intlayer.
  - تُستخدم هذه الإضافة لتحميل ملفات PO من مصدر وسيتم تحميلها في قواميس Intlayer. يمكنها مسح كامل قاعدة الأكواد والبحث عن ملفات PO محددة.
    يمكن استخدام هذه الإضافة:
    - إذا كنت تستخدم مكتبة i18n تفرض موقعًا معينًا لتحميل ملفات PO الخاصة بك، ولكنك تريد وضع إعلان المحتوى الخاص بك في أي مكان تريده في قاعدة الأكواد الخاصة بك.
    - يمكن استخدامها أيضًا إذا كنت تريد جلب رسائلك من مصدر بعيد (مثل: CMS، API، إلخ) وتخزين رسائلك في ملفات PO.

  > تحت الغطاء، ستقوم هذه الإضافة بمسح كامل قاعدة الأكواد والبحث عن ملفات PO محددة وتحميلها في قواميس Intlayer.
  > لاحظ أن هذه الإضافة لن تكتب المخرجات والترجمات مرة أخرى في ملفات PO.

- `syncPO`: مزامنة ملفات PO مع قواميس Intlayer.
  - تُستخدم هذه الإضافة لمزامنة ملفات PO مع قواميس Intlayer. يمكنها مسح الموقع المحدد وتحميل ملفات PO التي تطابق النمط لملفات PO محددة. هذه الإضافة مفيدة إذا كنت تريد الحصول على فوائد Intlayer أثناء استخدام مكتبة i18n أخرى.

## استخدام كلتا الإضافتين

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // حافظ على ملفات PO الحالية متزامنة مع قواميس Intlayer
  plugins: [
    /**
     * سيقوم بتحميل جميع ملفات PO في src التي تطابق النمط {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // يضمن أن ملفات PO هذه لها الأولوية على الملفات في `./locales/en/${key}.po`
    }),
    /**
     * سيقوم بتحميل وكتابة المخرجات والترجمات مرة أخرى في ملفات PO في دليل locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## إضافة `syncPO`

### بداية سريعة

أضف الإضافة إلى `intlayer.config.ts` الخاص بك ووجهها إلى هيكل PO الحالي لديك.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // حافظ على ملفات PO الحالية متزامنة مع قواميس Intlayer
  plugins: [
    syncPO({
      // تخطيط لكل لغة ولكل مساحة اسم
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

بديل: ملف واحد لكل لغة:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### كيف تعمل

- القراءة: تكتشف الإضافة ملفات PO من منشئ `source` الخاص بك وتحملها كقواميس Intlayer.
- الكتابة: بعد عمليات البناء والتعبئة، تقوم بكتابة ملفات PO المترجمة مرة أخرى إلى نفس المسارات (مع رؤوس Gettext المناسبة).
- التعبئة التلقائية: تعلن الإضافة عن مسار `autoFill` لكل قاموس. تشغيل `intlayer fill` يقوم بتحديث الترجمات المفقودة فقط في ملفات PO الخاصة بك بشكل افتراضي.

واجهة برمجة التطبيقات (API):

```ts
syncPO({
  source: ({ key, locale }) => string, // مطلوب
  location?: string, // تسمية اختيارية، الافتراضي: "sync-po::path/to/source"
  priority?: number, // أولوية اختيارية لحل النزاعات، الافتراضي: 0
  format?: 'icu' | 'i18next' | 'vue-i18n', // اختياري، مطلوب فقط عندما تستخدم قيم msgstr الخاصة بك بناء جملة إدراج محدد
});
```

#### `format` ('icu' | 'i18next' | 'vue-i18n')

ملفات PO هي دائمًا ملفات Gettext Portable Object — وهذا أمر ثابت. يصف هذا الخيار فقط **بناء جملة الإدراج** المستخدم داخل قيم `msgstr` ، بحيث يمكن لـ Intlayer تحويلها إلى تنسيقه الخاص في وقت التحليل (عبر `formatDictionary`) والعودة عند كتابة المخرجات.

- `undefined` _(افتراضي)_: يتم التعامل مع قيم `msgstr` كسلاسل نصية عادية — لا يوجد تحويل. استخدم هذا لمعظم ملفات PO.
- `'icu'`: تستخدم قيم `msgstr` بناء جملة رسائل ICU (على سبيل المثال `{count, plural, one {# item} other {# items}}`).
- `'i18next'`: تستخدم قيم `msgstr` بناء جملة إدراج i18next (على سبيل المثال `{{variable}}`).
- `'vue-i18n'`: تستخدم قيم `msgstr` بناء جملة Vue I18n.

> يتم تطبيق التحويل بواسطة `formatDictionary` الخاص بـ `@intlayer/chokidar` عند التحميل، ويتم عكسه باستخدام `formatDictionaryOutput` عند الكتابة. بالنسبة للقواعد المعقدة مثل جموع ICU، فإن دقة الرحلة الذهاب والاياب غير مضمونة.

**مثال — تحتوي ملفات PO على إدراج بنمط i18next:**

```ts
syncPO({
  source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
  format: "i18next",
}),
```

### مصادر PO متعددة والأولوية

يمكنك إضافة إضافات `syncPO` متعددة لمزامنة مصادر PO مختلفة. هذا مفيد عندما يكون لديك مصادر ترجمة متعددة أو هياكل PO مختلفة في مشروعك.

#### نظام الأولوية

عندما تستهدف إضافات متعددة نفس مفتاح القاموس، تحدد معلمة `priority` أي إضافة لها الأسبقية:

- أرقام الأولوية الأعلى تفوز على الأرقام الأقل
- الأولوية الافتراضية لملفات `.content` هي `0`
- الأولوية الافتراضية للإضافات هي `0`
- تتم معالجة الإضافات التي لها نفس الأولوية بالترتيب الذي تظهر به في التكوين

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // مصدر PO الأساسي (أعلى أولوية)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // مصدر PO احتياطي (أولوية أقل)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // مصدر PO قديم (أقل أولوية)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## إضافة Load PO

### بداية سريعة

أضف الإضافة إلى `intlayer.config.ts` لاستيعاب ملفات PO الحالية كقواميس Intlayer. هذه الإضافة للقراءة فقط (لا توجد كتابة على القرص):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // استيعاب رسائل PO الموجودة في أي مكان في شجرة المصدر الخاصة بك
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // تحميل لغة واحدة لكل نسخة إضافة (يتم تعيينها افتراضيًا على defaultLocale للتكوين)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

بديل: تخطيط لكل لغة، لا يزال للقراءة فقط (يتم تحميل اللغة المحددة فقط):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // سيتم تحميل الملفات لـ Locales.FRENCH فقط من هذا النمط
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### كيف تعمل

- الاكتشاف: يبني glob من منشئ `source` الخاص بك ويجمع ملفات PO المطابقة.
- الاستيعاب: يحمل كل ملف PO كقاموس Intlayer مع `locale` المقدم.
- للقراءة فقط: لا يكتب أو ينسق ملفات المخرجات؛ استخدم `syncPO` إذا كنت بحاجة إلى مزامنة ذهاب وإياب.
- جاهز للتعبئة التلقائية: يحدد مسار `fill` حتى يتمكن `intlayer content fill` من تعبئة المفاتيح المفقودة.

### واجهة برمجة التطبيقات (API)

```ts
loadPO({
  // بناء المسارات إلى ملفات PO الخاصة بك. `locale` اختياري إذا كان هيكلك لا يحتوي على جزء للغة
  source: ({ key, locale }) => string,

  // اللغة المستهدفة للقواميس التي يتم تحميلها بواسطة نسخة الإضافة هذه
  // يتم تعيينها افتراضيًا على configuration.internationalization.defaultLocale
  locale?: Locale,

  // تسمية اختيارية لتحديد المصدر
  location?: string, // الافتراضي: "plugin"

  // الأولوية المستخدمة لحل النزاعات ضد المصادر الأخرى
  priority?: number, // الافتراضي: 0
});
```

### السلوك والاتفاقيات

- إذا كان قناع `source` الخاص بك يتضمن نائب لغة، فسيتم استيعاب الملفات الخاصة بـ `locale` المحدد فقط.
- إذا لم يكن هناك جزء `{key}` في قناعك، فسيكون مفتاح القاموس "index".
- يتم اشتقاق المفاتيح من مسارات الملفات عن طريق استبدال النائب `{key}` في منشئ `source` الخاص بك.
- تستخدم الإضافة الملفات المكتشفة فقط ولا تصطنع لغات أو مفاتيح مفقودة.
- يتم استنتاج مسار `fill` من `source` الخاص بك ويستخدم لتحديث القيم المفقودة عبر CLI عند اختيارك.

## حل النزاعات

عندما يوجد نفس مفتاح الترجمة في مصادر PO متعددة:

1. تحدد الإضافة ذات الأولوية القصوى القيمة النهائية
2. تُستخدم المصادر ذات الأولوية الأقل كبدائل للمفاتيح المفقودة
3. يتيح لك هذا الحفاظ على الترجمات القديمة مع الانتقال تدريجيًا إلى الهياكل الجديدة

## واجهة سطر الأوامر (CLI)

سيتم اعتبار ملفات PO المتزامنة كملفات `.content` أخرى. وهذا يعني أن جميع أوامر intlayer ستكون متاحة لملفات PO المتزامنة. بما في ذلك:

- `intlayer content test` لاختبار ما إذا كانت هناك ترجمات مفقودة
- `intlayer content list` لسرد ملفات PO المتزامنة
- `intlayer content fill` لتعبئة الترجمات المفقودة
- `intlayer content push` لدفع ملفات PO المتزامنة
- `intlayer content pull` لسحب ملفات PO المتزامنة

راجع [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) لمزيد من التفاصيل.

## القيود (الحالية)

- لا يوجد دعم للإدراجات أو الجموع/ICU عند استهداف مكتبات جهات خارجية.
- المحرر المرئي غير متاح لأوقات التشغيل غير التابعة لـ Intlayer بعد.
- مزامنة PO فقط؛ تنسيقات الفهرس غير التابعة لـ PO غير مدعومة.

## لماذا هذا مهم

- يمكننا التوصية بحلول i18n الراسخة ووضع Intlayer كإضافة.
- نحن نستفيد من SEO/الكلمات الرئيسية الخاصة بهم مع دروس تنتهي باقتراح Intlayer لإدارة PO.
- يوسع الجمهور القابل للاستهداف من "المشاريع الجديدة" إلى "أي فريق يستخدم بالفعل i18n".
