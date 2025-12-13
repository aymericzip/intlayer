---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: كيفية أتمتة ترجمات JSON الخاصة بـ next-intl باستخدام Intlayer
description: أتمتة ترجمات JSON الخاصة بك باستخدام Intlayer و next-intl لتعزيز التدويل في تطبيقات Next.js.
keywords:
  - Intlayer
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: إضافة ملحق loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: التغيير إلى ملحق syncJSON
---

# كيفية أتمتة ترجمات JSON الخاصة بـ next-intl باستخدام Intlayer

<iframe title="كيفية أتمتة ترجمات JSON الخاصة بـ next-intl باستخدام Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل مبتكرة ومفتوحة المصدر مصممة لمعالجة أوجه القصور في حلول i18n التقليدية. تقدم نهجًا حديثًا لإدارة المحتوى في تطبيقات Next.js.

راجع مقارنة ملموسة مع next-intl في منشور المدونة الخاص بنا [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md).

## لماذا الجمع بين Intlayer و next-intl؟

بينما يوفر Intlayer حلاً ممتازًا مستقلاً للتدويل (راجع دليل التكامل مع Next.js الخاص بنا [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md))، قد ترغب في دمجه مع next-intl لأسباب عدة:

1. **قاعدة الشيفرة الحالية**: لديك تنفيذ قائم لـ next-intl وتريد الترحيل تدريجيًا إلى تجربة المطور المحسنة التي يوفرها Intlayer.
2. **متطلبات قديمة**: يتطلب مشروعك التوافق مع ملحقات أو سير عمل next-intl الحالية.
3. **ألفة الفريق**: فريقك مرتاح لاستخدام next-intl ولكنه يرغب في إدارة محتوى أفضل.

**لهذا السبب، يمكن تنفيذ Intlayer كمحول لـ next-intl للمساعدة في أتمتة ترجمات JSON الخاصة بك في واجهة الأوامر أو خطوط أنابيب CI/CD، اختبار ترجماتك، والمزيد.**

يوضح هذا الدليل كيفية الاستفادة من نظام إعلان المحتوى المتفوق في Intlayer مع الحفاظ على التوافق مع next-intl.

## جدول المحتويات

<TOC/>

## دليل خطوة بخطوة لإعداد Intlayer مع next-intl

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**وصف الحزم:**

- **intlayer**: المكتبة الأساسية لإدارة التدويل، إعلان المحتوى، والبناء
- **@intlayer/sync-json-plugin**: إضافة لتصدير إعلانات محتوى Intlayer إلى صيغة JSON متوافقة مع next-intl

### الخطوة 2: تنفيذ إضافة Intlayer لتغليف JSON

قم بإنشاء ملف تكوين Intlayer لتعريف اللغات المدعومة لديك:

**إذا كنت تريد أيضًا تصدير قواميس JSON لـ next-intl**، أضف إضافة `syncJSON`:

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
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

ستقوم إضافة `syncJSON` تلقائيًا بتغليف JSON. ستقوم بقراءة وكتابة ملفات JSON دون تغيير بنية المحتوى.

إذا كنت تريد جعل JSON يتعايش مع ملفات إعلان محتوى intlayer (`.content` files)، فسيعمل Intlayer بهذه الطريقة:

    1. تحميل كل من ملفات JSON وملفات إعلان المحتوى وتحويلها إلى قاموس intlayer.
    2. إذا كانت هناك تعارضات بين ملفات JSON وملفات إعلان المحتوى، فسيقوم Intlayer بدمج جميع القواميس. وذلك يعتمد على أولوية الإضافات، وأولوية ملف إعلان المحتوى (كلها قابلة للتكوين).

إذا تم إجراء تغييرات باستخدام واجهة سطر الأوامر لترجمة JSON، أو باستخدام نظام إدارة المحتوى (CMS)، فسيقوم Intlayer بتحديث ملف JSON بالترجمات الجديدة.

للاطلاع على مزيد من التفاصيل حول إضافة `syncJSON`، يرجى الرجوع إلى [توثيق إضافة syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md).

### (اختياري) الخطوة 3: تنفيذ ترجمات JSON لكل مكون على حدة

بشكل افتراضي، سيقوم Intlayer بتحميل ودمج ومزامنة كل من ملفات JSON وملفات إعلان المحتوى. راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md) لمزيد من التفاصيل. ولكن إذا كنت تفضل، باستخدام إضافة من Intlayer، يمكنك أيضًا تنفيذ إدارة JSON مخصصة لكل مكون في أي مكان في قاعدة الشيفرة الخاصة بك.

لهذا الغرض، يمكنك استخدام إضافة `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // حافظ على تزامن ملفات JSON الحالية مع قواميس Intlayer
  plugins: [
    /**
     * سيقوم بتحميل جميع ملفات JSON في مجلد src التي تطابق النمط {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // يضمن أن هذه الملفات JSON لها أولوية على الملفات في `./locales/en/${key}.json`
    }),
    /**
     * سيقوم بتحميل وكتابة المخرجات والترجمات مرة أخرى إلى ملفات JSON في مجلد locales
     */
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

سيؤدي هذا إلى تحميل جميع ملفات JSON الموجودة في دليل `src` التي تطابق النمط `{key}.i18n.json` وتحميلها كقواميس Intlayer.

## تكوين Git

يوصى بتجاهل ملفات Intlayer التي يتم إنشاؤها تلقائيًا:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

يمكن إعادة إنشاء هذه الملفات أثناء عملية البناء الخاصة بك ولا تحتاج إلى الالتزام بها في نظام التحكم في الإصدارات.

### امتداد VS Code

لتحسين تجربة المطور، قم بتثبيت **امتداد Intlayer الرسمي لـ VS Code**:

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
