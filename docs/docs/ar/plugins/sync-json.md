---
createdAt: 2025-03-13
updatedAt: 2026-06-21
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
  - version: 9.0.0
    date: 2026-06-21
    changes: "إضافة خيار splitKeys (قاموس واحد لكل مفتاح مساحة اسم من المستوى الأعلى) لتخطيطات الملف الواحد في next-intl / react-intl"
  - version: 7.5.0
    date: 2025-12-13
    changes: "إضافة دعم تنسيقات ICU و i18next"
  - version: 6.1.6
    date: 2025-10-05
    changes: "الوثائق الأولية لمكون مزامنة JSON"
author: aymericzip
---

# مزامنة JSON (جسور التدويل) - مزامنة JSON مع دعم ICU / i18next

<iframe title="كيفية الحفاظ على مزامنة ترجمات JSON الخاصة بك مع Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Plugins

توفر هذه الحزمة مكونين إضافيين:

- `loadJSON`: تحميل ملفات JSON إلى قواميس Intlayer.
  - يستخدم هذا المكون الإضافي لتحميل ملفات JSON من مصدر وسيتم تحميلها في قواميس Intlayer. يمكنه مسح جميع قواعد التعليمات البرمجية والبحث عن ملفات JSON محددة.
    يمكن استخدام هذا المكون الإضافي
    - إذا كنت تستخدم مكتبة i18n تفرض موقعًا محددًا لملفات JSON الخاصة بك ليتم تحميلها (على سبيل المثال: `next-intl`، `i18next`، `react-intl`، `vue-i18n`، إلخ)، ولكنك تريد وضع إعلان المحتوى الخاص بك حيثما تريد في قاعدة التعليمات البرمجية الخاصة بك.
    - يمكن استخدامه أيضًا إذا كنت ترغب في جلب رسائلك من مصدر بعيد (على سبيل المثال: نظام إدارة محتوى، واجهة برمجة تطبيقات، إلخ) وتخزين رسائلك في ملفات JSON.

  > تحت الغطاء، سيقوم هذا المكون الإضافي بمسح جميع قواعد التعليمات البرمجية والبحث عن ملفات JSON محددة وتحميلها في قواميس Intlayer.
  > لاحظ أن هذا المكون الإضافي لن يكتب المخرجات والترجمات مرة أخرى إلى ملفات JSON.

- `syncJSON`: مزامنة ملفات JSON مع قواميس Intlayer.
  - يستخدم هذا المكون الإضافي لمزامنة ملفات JSON مع قواميس Intlayer. يمكنه مسح الموقع المحدد وتحميل ملفات JSON التي تتطابق مع النمط لملفات JSON محددة. هذا المكون الإضافي مفيد إذا كنت ترغب في الحصول على فوائد Intlayer أثناء استخدام مكتبة i18n أخرى.

## Using both plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current JSON files in sync with Intlayer dictionaries
  plugins: [
    /**
     * Will load all the JSON files in the src that match the pattern {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Ensures these JSON files take precedence over files at `./locales/en/${key}.json`
      format: "intlayer", // Format of the JSON content
    }),
    /**
     * Will load, and write the output and translations back to the JSON files in the locales directory
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Quick start

أضف المكون الإضافي إلى ملف `intlayer.config.ts` وأشر إلى هيكل JSON الحالي الخاص بك.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // حافظ على مزامنة ملفات JSON الحالية مع قواميس Intlayer
  plugins: [
    syncJSON({
      // تخطيط لكل لغة ولكل مساحة أسماء (مثل next-intl، i18next مع مساحات الأسماء)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

البديل: ملف واحد لكل لغة (شائع مع إعدادات i18next/react-intl):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### كيف يعمل

- القراءة: يكتشف المكون الإضافي ملفات JSON من منشئ `source` الخاص بك ويحمّلها كقواميس Intlayer.
- الكتابة: بعد عمليات البناء والملء، يكتب ملفات JSON المحلية مرة أخرى إلى نفس المسارات (مع سطر جديد نهائي لتجنب مشاكل التنسيق).
- الملء التلقائي: يعلن المكون الإضافي عن مسار `autoFill` لكل قاموس. تشغيل الأمر `intlayer fill` يقوم بتحديث الترجمات المفقودة فقط في ملفات JSON الخاصة بك بشكل افتراضي.

واجهة برمجة التطبيقات (API):

```ts
syncJSON({
  source: ({ key, locale }) => string, // مطلوب
  location?: string, // تسمية اختيارية، الافتراضي: "plugin"
  priority?: number, // أولوية اختيارية لحل التعارضات، الافتراضي: 0
  format?: 'intlayer' | 'icu' | 'i18next', // مُنسق اختياري، يُستخدم للتوافق مع وقت تشغيل Intlayer
  splitKeys?: boolean, // اختياري، يقسم ملفًا واحدًا إلى قاموس واحد لكل مفتاح مساحة اسم من المستوى الأعلى (يتم الكشف عنه تلقائيًا)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

يحدد المُنسق الذي سيتم استخدامه لمحتوى القاموس عند مزامنة ملفات JSON. يسمح هذا باستخدام صيغ تنسيق رسائل مختلفة متوافقة مع وقت تشغيل Intlayer.

- `undefined`: لن يتم استخدام أي مُنسق، سيتم استخدام محتوى JSON كما هو.
- `'intlayer'`: مُنسق Intlayer الافتراضي (الافتراضي).
- `'icu'`: يستخدم تنسيق رسائل ICU (متوافق مع مكتبات مثل react-intl، vue-i18n).
- `'i18next'`: يستخدم تنسيق رسائل i18next (متوافق مع i18next، next-i18next، Solid-i18next).

> لاحظ أن استخدام مُنسق سيحول محتوى JSON الخاص بك في المدخلات والمخرجات. بالنسبة لقواعد JSON المعقدة مثل صيغ الجمع ICU، قد لا يضمن التحليل تطابقاً 1 إلى 1 بين المدخلات والمخرجات.
> إذا كنت لا تستخدم وقت تشغيل Intlayer، قد تفضل عدم تعيين مُنسق.

**مثال:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // استخدام تنسيق i18next للتوافق
}),
```

#### `splitKeys` (منطقية)

يتحكم هذا الخيار فيما إذا كان ملف JSON واحد، الذي تكون **مفاتيحه من المستوى الأول هي مساحات أسماء**، يجب أن يصبح قاموسًا واحدًا لكل مفتاح من المستوى الأعلى، بدلاً من قاموس واحد يحمل الملف بأكمله.

يتطابق هذا مع نموذج مساحة الأسماء للمكتبات مثل `next-intl` و `react-intl`، حيث يقوم ملف `messages/{locale}.json` واحد بتجميع عدة مساحات أسماء بواسطة مفاتيحه من المستوى الأول، ويتم التعامل مع كل منها بشكل مستقل (على سبيل المثال، `useTranslations('Hero')` يحل إلى قاموس `Hero`).

- `undefined` (افتراضي): **يتم الكشف عنه تلقائيًا** — يتم تقسيم الملف عندما لا يحتوي نمط `source` على جزء `{key}` (ملف واحد يحمل كل مساحة اسم)، ويتم الاحتفاظ به كقاموس واحد بخلاف ذلك (ملف واحد لكل مفتاح).
- `true`: دائمًا يقسم كل مفتاح من المستوى الأعلى إلى قاموس خاص به.
- `false`: لا يقسم أبدًا؛ يصبح الملف بأكمله قاموسًا واحدًا.

بالنظر إلى ملف `messages/{locale}.json` واحد:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // ضمني لأن النمط لا يحتوي على جزء `{key}`
}),
```

ينتج عن هذا ثلاثة قواميس — `Hero` و `Nav` و `About` — بحيث يتم حل `useTranslations('Hero')` (next-intl) بشكل صحيح. عند إعادة الكتابة، يتم إعادة تجميع جميع مساحات الأسماء في نفس الملف لكل لغة.

> عندما تحتفظ بالجزء الصريح `{key}` في `source` الخاص بك (على سبيل المثال، `./locales/${locale}/${key}.json`)، يكون كل ملف بالفعل مساحة اسم واحدة، لذلك يتم تعطيل التقسيم افتراضيًا.

### Multiple JSON sources and priority

يمكنك إضافة عدة مكونات إضافية `syncJSON` لمزامنة مصادر JSON مختلفة. هذا مفيد عندما يكون لديك مكتبات i18n متعددة أو هياكل JSON مختلفة في مشروعك.

#### Priority system

عندما تستهدف عدة مكونات إضافية نفس مفتاح القاموس، يحدد معامل `priority` أي مكون إضافي له الأسبقية:

- الأرقام الأعلى في الأولوية تفوز على الأقل منها
- الأولوية الافتراضية لملفات `.content` هي `0`
- الأولوية الافتراضية لملفات محتوى المكونات الإضافية هي `0`
- تتم معالجة المكونات الإضافية التي لها نفس الأولوية بالترتيب الذي تظهر به في التكوين

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
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
};

export default config;
```

## Load JSON plugin

### Quick start

أضف المكون الإضافي إلى ملف `intlayer.config.ts` لاستيعاب ملفات JSON الموجودة كقواميس Intlayer. هذا المكون الإضافي للقراءة فقط (لا يكتب على القرص):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingest JSON messages located anywhere in your source tree
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Load a single locale per plugin instance (defaults to the config defaultLocale)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

البديل: تخطيط لكل لغة، لا يزال للقراءة فقط (يتم تحميل اللغة المحددة فقط):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Only files for Locales.FRENCH will be loaded from this pattern
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- اكتشاف: يبني glob من منشئ `source` الخاص بك ويجمع ملفات JSON المطابقة.
- استيعاب: يحمل كل ملف JSON كقاموس Intlayer باللغة المقدمة `locale`.
- للقراءة فقط: لا يكتب أو ينسق ملفات الإخراج؛ استخدم `syncJSON` إذا كنت بحاجة إلى مزامنة ذهابًا وإيابًا.
- جاهز للملء التلقائي: يحدد نمط `fill` بحيث يمكن لـ `intlayer content fill` ملء المفاتيح المفقودة عبر CLI عندما تختار ذلك.

### API

```ts
loadJSON({
  // Build paths to your JSON. `locale` is optional if your structure has no locale segment
  source: ({ key, locale }) => string,

  // Target locale for the dictionaries loaded by this plugin instance
  // Defaults to configuration.internationalization.defaultLocale
  locale?: Locale,

  // Optional label to identify the source
  location?: string, // default: "plugin"

  // Priority used for conflict resolution against other sources
  priority?: number, // default: 0

  // Optional formatter for the JSON content
  format?: 'intlayer' | 'icu' | 'i18next', // default: 'intlayer'

  // Split a single file into one dictionary per top-level key (auto-detected)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

يحدد المُنسق الذي سيتم استخدامه لمحتوى القاموس عند تحميل ملفات JSON. يسمح هذا باستخدام صيغ تنسيق رسائل مختلفة متوافقة مع مكتبات i18n المتنوعة.

- `'intlayer'`: مُنسق Intlayer الافتراضي (الافتراضي).
- `'icu'`: يستخدم تنسيق رسائل ICU (متوافق مع مكتبات مثل react-intl، vue-i18n).
- `'i18next'`: يستخدم تنسيق رسائل i18next (متوافق مع i18next، next-i18next، Solid-i18next).

**مثال:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // استخدام تنسيق ICU للتوافق
}),
```

#### `splitKeys` (منطقية)

نفس السلوك كما في [`syncJSON`](#splitkeys-boolean): عندما يجمع ملف JSON واحد عدة مساحات أسماء بواسطة مفاتيحه من المستوى الأول، يصبح كل مفتاح من المستوى الأعلى قاموسًا خاصًا به.

- `undefined` (افتراضي): **يتم الكشف عنه تلقائيًا** — يتم التقسيم عندما لا يحتوي نمط `source` على جزء `{key}`، أو قاموس واحد بخلاف ذلك.
- `true` / `false`: فرض أو تعطيل التقسيم.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys auto-enabled: `Hero`, `Nav`, `About`, … each become a dictionary
}),
```

### Behavior and conventions

- إذا كان قناع `source` الخاص بك يتضمن عنصر نائب للغة، فسيتم استيعاب الملفات الخاصة باللغة `locale` المحددة فقط.
- إذا لم يكن هناك جزء `{key}` في القناع الخاص بك، يصبح كل مفتاح من المستوى الأعلى للملف قاموسًا خاصًا به افتراضيًا (انظر [`splitKeys`](#splitkeys-boolean)). قم بتعيين `splitKeys: false` لتحميل الملف بأكمله كقاموس `index` واحد بدلاً من ذلك.
- يتم اشتقاق المفاتيح من مسارات الملفات عن طريق استبدال العنصر النائب `{key}` في منشئ `source` الخاص بك.
- يستخدم المكون الإضافي الملفات المكتشفة فقط ولا يقوم بإنشاء لغات أو مفاتيح مفقودة.
- يتم استنتاج مسار `fill` من `source` الخاص بك ويستخدم لتحديث القيم المفقودة عبر CLI عندما تختار ذلك.

## Conflict resolution

عندما يوجد نفس مفتاح الترجمة في مصادر JSON متعددة:

1. يحدد المكون الإضافي ذو الأولوية الأعلى القيمة النهائية
2. تُستخدم المصادر ذات الأولوية الأقل كاحتياطيات للمفاتيح المفقودة
3. يتيح لك هذا الحفاظ على الترجمات القديمة أثناء الترحيل التدريجي إلى الهياكل الجديدة

## CLI

سيتم اعتبار ملفات JSON المتزامنة كملفات `.content` أخرى. هذا يعني أن جميع أوامر intlayer ستكون متاحة لملفات JSON المتزامنة. بما في ذلك:

- `intlayer content test` لاختبار ما إذا كانت هناك ترجمات مفقودة
- `intlayer content list` لعرض قائمة ملفات JSON المتزامنة
- `intlayer content fill` لملء الترجمات المفقودة
- `intlayer content push` لدفع ملفات JSON المتزامنة
- `intlayer content pull` لسحب ملفات JSON المتزامنة

راجع [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) لمزيد من التفاصيل.

## القيود (الحالية)

- لا توجد إدخالات أو دعم للجمع/ICU عند استهداف مكتبات الطرف الثالث.
- محرر بصري غير متوفر بعد لبيئات التشغيل غير الخاصة بـ Intlayer.
- مزامنة JSON فقط؛ تنسيقات الكتالوج غير JSON غير مدعومة.

## لماذا هذا مهم

- يمكننا التوصية بحلول i18n المعروفة ووضع Intlayer كإضافة.
- نستفيد من تحسين محركات البحث/الكلمات المفتاحية الخاصة بهم مع الدروس التي تنتهي باقتراح استخدام Intlayer لإدارة JSON.
- يوسع الجمهور المستهدف من "المشاريع الجديدة" إلى "أي فريق يستخدم i18n بالفعل".
