---
createdAt: 2024-12-24
updatedAt: 2025-10-29
title: كيفية أتمتة ترجمات JSON الخاصة بـ i18next باستخدام Intlayer
description: أتمتة ترجمات JSON الخاصة بك باستخدام Intlayer و i18next لتعزيز التدويل في تطبيقات جافاسكريبت.
keywords:
  - Intlayer
  - i18next
  - التدويل
  - i18n
  - التوطين
  - الترجمة
  - React
  - Next.js
  - جافاسكريبت
  - TypeScript
  - الترحيل
  - التكامل
slugs:
  - blog
  - intlayer-with-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: التغيير إلى مكون syncJSON
---

# كيفية أتمتة ترجمات JSON الخاصة بـ i18next باستخدام Intlayer

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل مبتكرة ومفتوحة المصدر مصممة لمعالجة أوجه القصور في حلول i18n التقليدية. تقدم نهجًا حديثًا لإدارة المحتوى في تطبيقات جافاسكريبت.

اطلع على مقارنة ملموسة مع i18next في منشور المدونة الخاص بنا [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md).

## لماذا الجمع بين Intlayer و i18next؟

بينما يوفر Intlayer حلاً ممتازًا مستقلاً لـ i18n (راجع دليل التكامل مع Next.js الخاص بنا [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md))، قد ترغب في دمجه مع i18next لأسباب عدة:

1. **قاعدة الشيفرة الحالية**: لديك تنفيذ قائم لـ i18next وترغب في الترحيل التدريجي إلى تجربة المطور المحسنة التي يوفرها Intlayer.
2. **متطلبات النظام القديم**: يتطلب مشروعك التوافق مع الإضافات أو سير العمل الحالي لـ i18next.
3. **ألفة الفريق**: فريقك معتاد على i18next لكنه يرغب في إدارة محتوى أفضل.

**لهذا، يمكن تنفيذ Intlayer كمحول لـ i18next للمساعدة في أتمتة ترجمات JSON الخاصة بك في واجهة الأوامر أو خطوط أنابيب CI/CD، واختبار ترجماتك، والمزيد.**

يوضح هذا الدليل كيفية الاستفادة من نظام إعلان المحتوى المتفوق في Intlayer مع الحفاظ على التوافق مع i18next.

## جدول المحتويات

<TOC/>

## دليل خطوة بخطوة لإعداد Intlayer مع i18next

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

**وصف الحزم:**

- **intlayer**: المكتبة الأساسية لإدارة التدويل، إعلان المحتوى، والبناء
- **@intlayer/sync-json-plugin**: إضافة لتصدير إعلانات محتوى Intlayer إلى صيغة JSON المتوافقة مع i18next

### الخطوة 2: تنفيذ إضافة Intlayer لتغليف JSON

قم بإنشاء ملف إعدادات Intlayer لتعريف اللغات المدعومة لديك:

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
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

إضافة `syncJSON` ستقوم تلقائيًا بتغليف JSON. ستقرأ وتكتب ملفات JSON دون تغيير هيكل المحتوى.

إذا كنت تريد جعل JSON يتعايش مع ملفات إعلان محتوى intlayer (`.content` files)، فستقوم Intlayer بالخطوات التالية:

    1. تحميل كل من ملفات JSON وملفات إعلان المحتوى وتحويلها إلى قاموس intlayer.
    2. إذا كانت هناك تعارضات بين ملفات JSON وملفات إعلان المحتوى، ستقوم Intlayer بدمج جميع القواميس. وذلك يعتمد على أولوية الإضافات، وأولوية ملف إعلان المحتوى (كلها قابلة للتكوين).

إذا تم إجراء تغييرات باستخدام CLI لترجمة JSON، أو باستخدام نظام إدارة المحتوى (CMS)، ستقوم Intlayer بتحديث ملف JSON بالترجمات الجديدة.

## إعداد Git

يوصى بتجاهل ملفات Intlayer التي يتم إنشاؤها تلقائيًا:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

يمكن إعادة إنشاء هذه الملفات أثناء عملية البناء الخاصة بك ولا تحتاج إلى الالتزام بها في نظام التحكم في الإصدارات.

### إضافة VS Code

لتحسين تجربة المطور، قم بتثبيت **إضافة Intlayer الرسمية لـ VS Code**:

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
