---
createdAt: 2024-12-24
updatedAt: 2025-11-01
title: كيفية أتمتة ترجمات JSON الخاصة بـ i18next باستخدام Intlayer
description: أتمتة ترجمات JSON الخاصة بك باستخدام Intlayer و i18next لتعزيز التدويل في تطبيقات جافا سكريبت.
keywords:
  - Intlayer
  - i18next
  - التدويل
  - i18n
  - التوطين
  - الترجمة
  - React
  - Next.js
  - جافا سكريبت
  - TypeScript
  - الترحيل
  - التكامل
slugs:
  - blog
  - intlayer-with-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: إضافة ملحق loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: تغيير إلى ملحق syncJSON
---

# كيفية أتمتة ترجمات JSON الخاصة بـ i18next باستخدام Intlayer

<iframe title="كيفية أتمتة ترجمات JSON الخاصة بـ i18next باستخدام Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل مبتكرة ومفتوحة المصدر مصممة لمعالجة أوجه القصور في حلول i18n التقليدية. تقدم نهجًا حديثًا لإدارة المحتوى في تطبيقات جافا سكريبت.

اطلع على مقارنة ملموسة مع i18next في منشور المدونة الخاص بنا [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md).

## لماذا الجمع بين Intlayer و i18next؟

بينما يوفر Intlayer حلاً ممتازًا مستقلاً لـ i18n (راجع دليل التكامل مع Next.js الخاص بنا [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md))، قد ترغب في دمجه مع i18next لأسباب عدة:

1. **قاعدة الشيفرة الحالية**: لديك تنفيذ قائم لـ i18next وتريد الانتقال تدريجيًا إلى تجربة المطور المحسنة التي يقدمها Intlayer.
2. **متطلبات قديمة**: مشروعك يتطلب التوافق مع الإضافات أو سير العمل الحالي الخاص بـ i18next.
3. **ألفة الفريق**: فريقك معتاد على i18next لكنه يرغب في إدارة محتوى أفضل.
4. **استخدام ميزات Intlayer**: تريد استخدام ميزات Intlayer مثل إعلان المحتوى، إدارة مفاتيح الترجمة، حالة الترجمة، والمزيد.

**لهذا، يمكن تنفيذ Intlayer كمحول لـ i18next للمساعدة في أتمتة ترجمات JSON الخاصة بك في سطر الأوامر أو خطوط أنابيب CI/CD، اختبار ترجماتك، والمزيد.**

يوضح هذا الدليل كيفية الاستفادة من نظام إعلان المحتوى المتفوق في Intlayer مع الحفاظ على التوافق مع i18next.

## جدول المحتويات

<TOC/>

## دليل خطوة بخطوة لإعداد Intlayer مع i18next

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة:

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

**وصف الحزم:**

- **intlayer**: المكتبة الأساسية لإدارة التدويل، إعلان المحتوى، والبناء
- **@intlayer/sync-json-plugin**: مكون إضافي لتصدير إعلانات محتوى Intlayer إلى صيغة JSON المتوافقة مع i18next

### الخطوة 2: تنفيذ مكون Intlayer الإضافي لتغليف JSON

قم بإنشاء ملف تكوين Intlayer لتعريف اللغات المدعومة:

**إذا كنت ترغب أيضًا في تصدير قواميس JSON لـ i18next**، أضف مكون `syncJSON` الإضافي:

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

سيقوم مكون الإضافة `syncJSON` تلقائيًا بتغليف ملفات JSON. سيقرأ ويكتب ملفات JSON دون تغيير هيكل المحتوى.

إذا كنت ترغب في جعل ملفات JSON تتعايش مع ملفات إعلان محتوى intlayer (`.content`)، فسيتبع Intlayer الطريقة التالية:

    1. تحميل كل من ملفات JSON وملفات إعلان المحتوى وتحويلها إلى قاموس intlayer.
    2. إذا كانت هناك تعارضات بين ملفات JSON وملفات إعلان المحتوى، سيقوم Intlayer بدمج جميع القواميس. وذلك حسب أولوية المكونات الإضافية وأولوية ملف إعلان المحتوى (كلها قابلة للتكوين).

إذا تم إجراء تغييرات باستخدام واجهة الأوامر CLI لترجمة JSON، أو باستخدام نظام إدارة المحتوى CMS، سيقوم Intlayer بتحديث ملف JSON بالترجمات الجديدة.

للاطلاع على مزيد من التفاصيل حول المكون الإضافي `syncJSON`، يرجى الرجوع إلى [توثيق مكون syncJSON الإضافي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md).

### (اختياري) الخطوة 3: تنفيذ ترجمات JSON لكل مكون على حدة

بشكل افتراضي، سيقوم Intlayer بتحميل ودمج ومزامنة كل من ملفات JSON وملفات إعلان المحتوى. راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md) لمزيد من التفاصيل. ولكن إذا كنت تفضل، باستخدام مكون إضافي من Intlayer، يمكنك أيضًا تنفيذ إدارة JSON المترجمة لكل مكون في أي مكان في قاعدة الشيفرة الخاصة بك.

لهذا الغرض، يمكنك استخدام المكون الإضافي `loadJSON`.

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
      priority: 1, // يضمن أن هذه الملفات JSON لها أولوية على الملفات في `./locales/en/${key}.json`
    }),
    /**
     * سيقوم بتحميل، وكتابة المخرجات والترجمات مرة أخرى إلى ملفات JSON في مجلد locales
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

سيقوم هذا بتحميل جميع ملفات JSON في مجلد `src` التي تطابق النمط `{key}.i18n.json` وتحميلها كقواميس Intlayer.

---

## إعدادات Git

يوصى بتجاهل ملفات Intlayer التي يتم إنشاؤها تلقائيًا:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

يمكن إعادة إنشاء هذه الملفات أثناء عملية البناء الخاصة بك ولا تحتاج إلى الالتزام بها في نظام التحكم في الإصدارات.

### إضافة VS Code

لتحسين تجربة المطور، قم بتثبيت **إضافة Intlayer الرسمية لـ VS Code**:

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
