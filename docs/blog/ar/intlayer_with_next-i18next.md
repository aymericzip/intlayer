---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: إنتلاير و next-i18next
description: دمج إنتلاير مع next-i18next لحل شامل للتدويل في Next.js
keywords:
  - i18next
  - next-i18next
  - إنتلاير
  - التدويل
  - مدونة
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: إضافة إضافة loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: التغيير إلى إضافة syncJSON وإعادة كتابة شاملة
---

# التدويل في Next.js (i18n) مع next-i18next و إنتلاير

<iframe title="كيفية أتمتة ترجمات JSON الخاصة بـ next-i18next باستخدام Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## جدول المحتويات

<TOC/>

## ما هو next-i18next؟

**next-i18next** هي واحدة من أكثر أُطُر التدويل (i18n) شعبية لتطبيقات Next.js. مبنية على نظام **i18next** القوي، توفر حلاً شاملاً لإدارة الترجمات، والتعريب، وتبديل اللغات في مشاريع Next.js.

ومع ذلك، يأتي next-i18next مع بعض التحديات:

- **إعداد معقد**: يتطلب إعداد next-i18next ملفات تكوين متعددة وإعداد دقيق لحالات i18n على جانب الخادم والعميل.
- **ترجمات متفرقة**: عادةً ما تُخزن ملفات الترجمة في مجلدات منفصلة عن المكونات، مما يصعب الحفاظ على الاتساق.
- **إدارة يدوية للمساحات الاسمية**: يحتاج المطورون إلى إدارة المساحات الاسمية يدويًا وضمان تحميل موارد الترجمة بشكل صحيح.
- **سلامة نوع محدودة**: يتطلب دعم TypeScript تكوينًا إضافيًا ولا يوفر توليد أنواع تلقائي للترجمات.

## ما هو Intlayer؟

**Intlayer** هو مكتبة تعريب مبتكرة ومفتوحة المصدر مصممة لمعالجة أوجه القصور في حلول i18n التقليدية. يقدم نهجًا حديثًا لإدارة المحتوى في تطبيقات Next.js.

اطلع على مقارنة ملموسة مع next-intl في منشور المدونة الخاص بنا [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md).

## لماذا الجمع بين Intlayer و next-i18next؟

بينما توفر Intlayer حلاً ممتازًا مستقلًا للترجمة الدولية (راجع دليل التكامل مع Next.js الخاص بنا [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md))، قد ترغب في دمجها مع next-i18next لأسباب عدة:

1. **قاعدة كود موجودة**: لديك تنفيذ قائم لـ next-i18next وتريد الترحيل تدريجيًا إلى تجربة المطور المحسنة التي تقدمها Intlayer.
2. **متطلبات قديمة**: مشروعك يتطلب التوافق مع الإضافات أو سير العمل الحالي لـ i18next.
3. **ألفة الفريق**: فريقك معتاد على next-i18next لكنه يرغب في إدارة محتوى أفضل.

لهذا، يمكن تنفيذ Intlayer كمحول لـ next-i18next للمساعدة في أتمتة ترجمات JSON الخاصة بك في واجهة الأوامر أو خطوط أنابيب CI/CD، واختبار ترجماتك، والمزيد.

يوضح هذا الدليل كيفية الاستفادة من نظام إعلان المحتوى المتفوق في Intlayer مع الحفاظ على التوافق مع next-i18next.

---

## دليل خطوة بخطوة لإعداد Intlayer مع next-i18next

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**توضيحات الحزم:**

- **intlayer**: المكتبة الأساسية لإعلان المحتوى وإدارته
- **@intlayer/sync-json-plugin**: الإضافة لمزامنة إعلانات محتوى Intlayer إلى صيغة JSON الخاصة بـ i18next

### الخطوة 2: تنفيذ إضافة Intlayer لتغليف JSON

قم بإنشاء ملف تكوين Intlayer لتعريف اللغات المدعومة لديك:

**إذا كنت ترغب أيضًا في تصدير قواميس JSON لـ i18next**، أضف إضافة `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

سيقوم مكون `syncJSON` تلقائيًا بتغليف ملفات JSON. سيقرأ ويكتب ملفات JSON دون تغيير هيكل المحتوى.

إذا كنت ترغب في جعل ملفات JSON تتعايش مع ملفات إعلان المحتوى الخاصة بـ intlayer (`.content` files)، فسيعمل Intlayer بالطريقة التالية:

    1. تحميل كل من ملفات JSON وملفات إعلان المحتوى وتحويلها إلى قاموس intlayer.
    2. إذا كانت هناك تعارضات بين ملفات JSON وملفات إعلان المحتوى، فسيقوم Intlayer بدمج جميع القواميس. وذلك يعتمد على أولوية الإضافات (plugins) وأولوية ملف إعلان المحتوى (كلها قابلة للتكوين).

إذا تم إجراء تغييرات باستخدام واجهة الأوامر (CLI) لترجمة ملفات JSON، أو باستخدام نظام إدارة المحتوى (CMS)، فسيقوم Intlayer بتحديث ملف JSON بالترجمات الجديدة.

لمزيد من التفاصيل حول إضافة `syncJSON`، يرجى الرجوع إلى [توثيق إضافة syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md).

---

### (اختياري) الخطوة 3: تنفيذ ترجمات JSON لكل مكون على حدة

بشكل افتراضي، يقوم Intlayer بتحميل ودمج ومزامنة كل من ملفات JSON وملفات إعلان المحتوى. راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md) لمزيد من التفاصيل. ولكن إذا كنت تفضل، باستخدام إضافة Intlayer، يمكنك أيضًا تنفيذ إدارة JSON المترجمة لكل مكون في أي مكان في قاعدة الشيفرة الخاصة بك.

لهذا، يمكنك استخدام الإضافة `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // حافظ على مزامنة ملفات JSON الحالية مع قواميس Intlayer
  plugins: [
    /**
     * سيقوم بتحميل جميع ملفات JSON في مجلد src التي تطابق النمط {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // يضمن أن هذه الملفات JSON لها أولوية على الملفات في `./public/locales/en/${key}.json`
    }),
    /**
     * سيقوم بتحميل وكتابة المخرجات والترجمات مرة أخرى إلى ملفات JSON في دليل اللغات
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

سيقوم هذا بتحميل جميع ملفات JSON في دليل `src` التي تطابق النمط `{key}.i18n.json` وتحميلها كقواميس لـ Intlayer.

---

## إعدادات Git

استبعاد الملفات المُولدة من نظام التحكم في الإصدارات:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

يتم إعادة إنشاء هذه الملفات تلقائيًا أثناء عملية البناء ولا تحتاج إلى الالتزام بها في مستودعك.

### إضافة VS Code

لتحسين تجربة المطور، قم بتثبيت **امتداد Intlayer الرسمي لـ VS Code**:

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
