---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: كيفية أتمتة ترجمات JSON الخاصة بـ react-i18next باستخدام Intlayer
description: أتمتة ترجمات JSON الخاصة بك باستخدام Intlayer و react-i18next لتعزيز التدويل في تطبيقات React.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - التدويل
  - i18n
  - مدونة
  - React
  - JavaScript
  - TypeScript
  - إدارة المحتوى
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: التغيير إلى مكون syncJSON
---

# كيفية أتمتة ترجمات JSON الخاصة بـ react-i18next باستخدام Intlayer

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل مبتكرة ومفتوحة المصدر مصممة لمعالجة أوجه القصور في حلول i18n التقليدية. تقدم نهجًا حديثًا لإدارة المحتوى في تطبيقات React.

اطلع على مقارنة ملموسة مع react-i18next في منشور مدونتنا [react-i18next مقابل react-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/react-i18next_vs_react-intl_vs_intlayer.md).

## لماذا الجمع بين Intlayer و react-i18next؟

بينما يوفر Intlayer حلاً ممتازًا مستقلاً لـ i18n (راجع دليل التكامل مع React الخاص بنا [React integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md))، قد ترغب في دمجه مع react-i18next لأسباب عدة:

1. **قاعدة الشيفرة الحالية**: لديك تنفيذ قائم لـ react-i18next وترغب في الترحيل تدريجيًا إلى تجربة المطور المحسنة التي يقدمها Intlayer.
2. **متطلبات قديمة**: مشروعك يتطلب التوافق مع الإضافات أو سير العمل الحالي لـ react-i18next.
3. **ألفة الفريق**: فريقك مرتاح لاستخدام react-i18next لكنه يرغب في إدارة محتوى أفضل.

**لهذا، يمكن تنفيذ Intlayer كمحول لـ react-i18next للمساعدة في أتمتة ترجمات JSON الخاصة بك في واجهة الأوامر أو خطوط أنابيب CI/CD، واختبار ترجماتك، والمزيد.**

يوضح هذا الدليل كيفية الاستفادة من نظام إعلان المحتوى المتفوق في Intlayer مع الحفاظ على التوافق مع react-i18next.

## جدول المحتويات

<TOC/>

## دليل خطوة بخطوة لإعداد Intlayer مع react-i18next

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
- **@intlayer/sync-json-plugin**: إضافة لتصدير إعلانات محتوى Intlayer إلى صيغة JSON المتوافقة مع react-i18next

### الخطوة 2: تنفيذ إضافة Intlayer لتغليف JSON

قم بإنشاء ملف تكوين Intlayer لتعريف اللغات المدعومة لديك:

**إذا كنت تريد أيضًا تصدير قواميس JSON لـ react-i18next**، أضف إضافة `syncJSON`:

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

إضافة `syncJSON` ستقوم تلقائيًا بتغليف JSON. ستقرأ وتكتب ملفات JSON دون تغيير بنية المحتوى.

إذا كنت تريد جعل ملفات JSON تتعايش مع ملفات إعلان محتوى intlayer (`.content` files)، فإن Intlayer سيتبع هذه الطريقة:

    1. تحميل كل من ملفات JSON وملفات إعلان المحتوى وتحويلها إلى قاموس intlayer.
    2. إذا كانت هناك تعارضات بين ملفات JSON وملفات إعلان المحتوى، سيقوم Intlayer بدمج جميع القواميس. وذلك يعتمد على أولوية الإضافات، وأولوية ملف إعلان المحتوى (كلها قابلة للتكوين).

إذا تم إجراء تغييرات باستخدام CLI لترجمة JSON، أو باستخدام نظام إدارة المحتوى (CMS)، سيقوم Intlayer بتحديث ملف JSON بالترجمات الجديدة.

للاطلاع على مزيد من التفاصيل حول إضافة `syncJSON`، يرجى الرجوع إلى [توثيق إضافة syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md).

## تكوين Git

يوصى بتجاهل ملفات Intlayer التي يتم إنشاؤها تلقائيًا:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

يمكن إعادة إنشاء هذه الملفات أثناء عملية البناء الخاصة بك ولا تحتاج إلى الالتزام بها في نظام التحكم في الإصدارات.

### إضافة VS Code

لتحسين تجربة المطور، قم بتثبيت **إضافة Intlayer الرسمية لـ VS Code**:

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
