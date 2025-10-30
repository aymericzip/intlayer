---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: إنتلاير و next-i18next
description: دمج إنتلاير مع next-i18next لحل شامل للتدويل في Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - التدويل
  - مدونة
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: التغيير إلى مكون syncJSON وإعادة كتابة شاملة
---

# التدويل في Next.js (i18n) باستخدام next-i18next و Intlayer

## جدول المحتويات

<TOC/>

## ما هو next-i18next؟

**next-i18next** هو أحد أكثر أُطُر التدويل (i18n) شعبية لتطبيقات Next.js. مبني على قمة النظام البيئي القوي **i18next**، ويوفر حلاً شاملاً لإدارة الترجمات، والتعريب، وتبديل اللغات في مشاريع Next.js.

ومع ذلك، يأتي next-i18next مع بعض التحديات:

- **إعداد معقد**: يتطلب إعداد next-i18next ملفات إعداد متعددة وإعداد دقيق لحالات i18n على جانب الخادم والعميل.
- **ترجمات متفرقة**: عادةً ما تُخزن ملفات الترجمة في مجلدات منفصلة عن المكونات، مما يجعل الحفاظ على الاتساق أكثر صعوبة.
- **إدارة المساحات الاسمية يدويًا**: يحتاج المطورون إلى إدارة المساحات الاسمية يدويًا وضمان تحميل موارد الترجمة بشكل صحيح.
- **سلامة نوع محدودة**: يتطلب دعم TypeScript إعدادًا إضافيًا ولا يوفر توليد نوع تلقائي للترجمات.

## ما هو Intlayer؟

**Intlayer** هو مكتبة تعريب مبتكرة ومفتوحة المصدر مصممة لمعالجة أوجه القصور في حلول i18n التقليدية. يقدم نهجًا حديثًا لإدارة المحتوى في تطبيقات Next.js.

اطلع على مقارنة ملموسة مع next-intl في منشور المدونة الخاص بنا [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md).

## لماذا الجمع بين Intlayer و next-i18next؟

بينما توفر Intlayer حلاً ممتازًا مستقلًا للترجمة الدولية (راجع دليل التكامل مع Next.js الخاص بنا [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md))، قد ترغب في دمجها مع next-i18next لأسباب عدة:

1. **قاعدة كود موجودة**: لديك تنفيذ قائم لـ next-i18next وترغب في الترحيل التدريجي إلى تجربة المطور المحسنة التي تقدمها Intlayer.
2. **متطلبات قديمة**: مشروعك يتطلب التوافق مع الإضافات أو سير العمل الحالي لـ i18next.
3. **ألفة الفريق**: فريقك معتاد على next-i18next ولكنه يرغب في إدارة محتوى أفضل.

لهذا، يمكن تنفيذ Intlayer كمحول لـ next-i18next للمساعدة في أتمتة ترجمات JSON الخاصة بك في واجهة الأوامر أو خطوط أنابيب CI/CD، واختبار ترجماتك، والمزيد.

يوضح هذا الدليل كيفية الاستفادة من نظام إعلان المحتوى المتفوق في Intlayer مع الحفاظ على التوافق مع next-i18next.

---

## دليل خطوة بخطوة لإعداد Intlayer مع next-i18next

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

**توضيحات الحزم:**

- **intlayer**: المكتبة الأساسية لإعلان المحتوى وإدارته
- **next-intlayer**: طبقة تكامل Next.js مع إضافات البناء
- **i18next**: إطار العمل الأساسي للتدويل (i18n)
- **next-i18next**: غلاف Next.js لـ i18next
- **i18next-resources-to-backend**: تحميل الموارد الديناميكي لـ i18next
- **@intlayer/sync-json-plugin**: إضافة لمزامنة إعلانات محتوى Intlayer مع صيغة JSON الخاصة بـ i18next

### الخطوة 2: تنفيذ إضافة Intlayer لتغليف JSON

قم بإنشاء ملف تكوين Intlayer لتعريف اللغات المدعومة لديك:

**إذا كنت تريد أيضًا تصدير قواميس JSON لـ i18next**، أضف إضافة `syncJSON`:

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

ستقوم إضافة `syncJSON` تلقائيًا بتغليف ملفات JSON. ستقوم بقراءة وكتابة ملفات JSON دون تغيير هيكل المحتوى.

إذا كنت تريد جعل ملفات JSON تتعايش مع ملفات إعلان محتوى intlayer (`.content`)، فسيتم التعامل معها بهذه الطريقة:

    1. تحميل كل من ملفات JSON وملفات إعلان المحتوى وتحويلها إلى قاموس intlayer.

2. إذا كانت هناك تعارضات بين ملفات JSON وملفات إعلان المحتوى، فإن Intlayer سيقوم بدمج جميع القواميس. وذلك يعتمد على أولوية الإضافات، وأولوية ملف إعلان المحتوى (كلها قابلة للتكوين).

إذا تم إجراء تغييرات باستخدام واجهة الأوامر CLI لترجمة JSON، أو باستخدام نظام إدارة المحتوى CMS، فسيقوم Intlayer بتحديث ملف JSON بالترجمات الجديدة.

---

## تكوين Git

استثناء الملفات المولدة من نظام التحكم في الإصدارات:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
intl
```

يتم إعادة إنشاء هذه الملفات تلقائيًا أثناء عملية البناء ولا تحتاج إلى الالتزام بها في مستودعك.

### إضافة VS Code

لتحسين تجربة المطور، قم بتثبيت **إضافة Intlayer الرسمية لـ VS Code**:

2. إذا كان هناك تعارض بين ملفات JSON وملفات إعلان المحتوى، ستقوم Intlayer بدمج جميع القواميس. وذلك حسب أولوية الإضافات وأولوية ملف إعلان المحتوى (جميعها قابلة للتكوين).

إذا تم إجراء تغييرات باستخدام واجهة الأوامر CLI لترجمة JSON، أو باستخدام نظام إدارة المحتوى CMS، ستقوم Intlayer بتحديث ملف JSON بالترجمات الجديدة.

---

## إعداد Git

استبعاد الملفات المُولدة من نظام التحكم في الإصدارات:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
intl
```

يتم إعادة إنشاء هذه الملفات تلقائيًا أثناء عملية البناء ولا تحتاج إلى الالتزام بها في مستودعك.

### إضافة VS Code

لتحسين تجربة المطور، قم بتثبيت **إضافة Intlayer الرسمية لـ VS Code**:

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
