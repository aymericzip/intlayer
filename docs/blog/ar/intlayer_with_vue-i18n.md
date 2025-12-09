---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: إنتلاير و vue-i18n
description: دمج إنتلاير مع vue-i18n لحل شامل للتدويل في Vue.js
keywords:
  - vue-i18n
  - Intlayer
  - التدويل
  - مدونة
  - Vue.js
  - Nuxt
  - جافا سكريبت
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: إضافة مكون loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: التغيير إلى مكون syncJSON وإعادة كتابة شاملة
---

# التدويل في Vue.js (i18n) باستخدام vue-i18n و Intlayer

<iframe title="كيفية أتمتة ترجمات JSON الخاصة بـ vue-i18n باستخدام Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## جدول المحتويات

<TOC/>

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل مبتكرة ومفتوحة المصدر مصممة لمعالجة أوجه القصور في حلول i18n التقليدية. تقدم نهجًا حديثًا لإدارة المحتوى في تطبيقات Vue.js و Nuxt.

اطلع على مقارنة ملموسة مع vue-i18n في منشور مدونتنا [vue-i18n مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/vue-i18n_vs_intlayer.md).

## لماذا الجمع بين Intlayer و vue-i18n؟

بينما يوفر Intlayer حلاً مستقلاً ممتازًا للتدويل (راجع دليل التكامل مع Vue.js الخاص بنا [دليل التكامل مع Vue.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+vue.md))، قد ترغب في دمجه مع vue-i18n لأسباب عدة:

1. **قاعدة الشيفرة الحالية**: لديك تنفيذ قائم لـ vue-i18n وترغب في الانتقال تدريجيًا إلى تجربة المطور المحسنة التي يقدمها Intlayer.
2. **متطلبات قديمة**: يتطلب مشروعك التوافق مع الإضافات أو سير العمل الحالي لـ vue-i18n.
3. **ألفة الفريق**: فريقك معتاد على vue-i18n ولكنه يرغب في إدارة محتوى أفضل.
4. **استخدام ميزات Intlayer**: تريد استخدام ميزات Intlayer مثل إعلان المحتوى، وأتمتة الترجمة، واختبار الترجمات، والمزيد.

**لهذا، يمكن تنفيذ Intlayer كمحول لـ vue-i18n لمساعدتك في أتمتة ترجمات JSON الخاصة بك في واجهة الأوامر أو خطوط أنابيب CI/CD، واختبار ترجماتك، وأكثر من ذلك.**

يوضح هذا الدليل كيفية الاستفادة من نظام إعلان المحتوى المتفوق في Intlayer مع الحفاظ على التوافق مع vue-i18n.

---

## دليل خطوة بخطوة لإعداد Intlayer مع vue-i18n

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

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

**توضيحات الحزم:**

- **intlayer**: المكتبة الأساسية لإعلان المحتوى وإدارته
- **@intlayer/sync-json-plugin**: مكون إضافي لمزامنة إعلانات محتوى Intlayer إلى تنسيق JSON الخاص بـ vue-i18n

### الخطوة 2: تنفيذ مكون Intlayer لتغليف JSON

قم بإنشاء ملف تكوين Intlayer لتعريف اللغات المدعومة لديك:

**إذا كنت ترغب أيضًا في تصدير قواميس JSON لـ vue-i18n**، أضف مكون `syncJSON` الإضافي:

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
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

سيقوم مكون الإضافة `syncJSON` تلقائيًا بتغليف JSON. سيقرأ ويكتب ملفات JSON دون تغيير هيكل المحتوى.

إذا كنت ترغب في جعل JSON يتعايش مع ملفات إعلان محتوى intlayer (`.content` ملفات)، فسيعمل Intlayer بهذه الطريقة:

    1. تحميل كل من ملفات JSON وملفات إعلان المحتوى وتحويلها إلى قاموس intlayer.
    2. إذا كانت هناك تعارضات بين JSON وملفات إعلان المحتوى، فسيقوم Intlayer بدمج جميع القواميس. وذلك اعتمادًا على أولوية المكونات الإضافية، وأولوية ملف إعلان المحتوى (كلها قابلة للتكوين).

إذا تم إجراء تغييرات باستخدام CLI لترجمة JSON، أو باستخدام CMS، فسيقوم Intlayer بتحديث ملف JSON بالترجمات الجديدة.

للاطلاع على مزيد من التفاصيل حول مكون `syncJSON` الإضافي، يرجى الرجوع إلى [توثيق مكون syncJSON الإضافي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md).

---

### (اختياري) الخطوة 3: تنفيذ ترجمات JSON لكل مكون على حدة

بشكل افتراضي، سيقوم Intlayer بتحميل ودمج ومزامنة كل من ملفات JSON وملفات إعلان المحتوى. راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md) لمزيد من التفاصيل. ولكن إذا كنت تفضل، باستخدام مكون إضافي من Intlayer، يمكنك أيضًا تنفيذ إدارة JSON المترجمة لكل مكون في أي مكان في قاعدة الشيفرة الخاصة بك.

لهذا الغرض، يمكنك استخدام مكون `loadJSON` الإضافي.

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
     * سيقوم بتحميل، وكتابة المخرجات والترجمات مرة أخرى إلى ملفات JSON في مجلد locales
     */
    syncJSON({
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

سيقوم هذا بتحميل جميع ملفات JSON في مجلد `src` التي تطابق النمط `{key}.i18n.json` وتحميلها كقاموسات Intlayer.

---

## إعدادات Git

استثناء الملفات المُولدة من نظام التحكم في الإصدارات:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

يتم إعادة إنشاء هذه الملفات تلقائيًا أثناء عملية البناء ولا تحتاج إلى الالتزام بها في مستودعك.

### إضافة VS Code

لتحسين تجربة المطور، قم بتثبيت **إضافة Intlayer الرسمية لـ VS Code**:

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
