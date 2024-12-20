# التدويل باستخدام Intlayer و i18next

i18next هو إطار عمل مفتوح المصدر للتدويل (i18n) مصمم لتطبيقات JavaScript. يتم استخدامه على نطاق واسع لإدارة الترجمات، والتعريب، والتبديل بين اللغات في مشاريع البرمجيات. ومع ذلك، فإنه يحتوي على بعض القيود التي يمكن أن تعقد قابلية التوسع والتطوير.

Intlayer هو إطار عمل آخر للتدويل يعالج هذه القيود، ويقدم نهجًا أكثر مرونة لإعلان المحتوى وإدارته. دعنا نستكشف بعض الفروقات الرئيسية بين i18next و Intlayer، وكيفية تكوين كلاهما لتحقيق أفضل تجربة للتدويل.

## Intlayer مقابل i18next: الفروقات الرئيسية

### 1. إعلان المحتوى

مع i18next، يجب إعلان قواميس الترجمة في مجلد محدد، مما يمكن أن يعقد قابلية التوسع في التطبيق. بالمقابل، يسمح Intlayer بإعلان المحتوى داخل نفس الدليل مثل المكون الخاص بك. وهذا له عدة مزايا:

- **تسهيل تحرير المحتوى**: لا يحتاج المستخدمون للبحث عن القاموس الصحيح للتعديل، مما يقلل من فرصة الأخطاء.
- **التكيف التلقائي**: إذا تغير موقع المكون أو تمت إزالته، يقوم Intlayer بالكشف والتكيف تلقائيًا.

### 2. تعقيد التكوين

يمكن أن يكون تكوين i18next معقدًا، خاصة عند التكامل مع المكونات من جانب الخادم أو تكوين الوحدات البرمجية لإطارات العمل مثل Next.js. يبسط Intlayer هذه العملية، مقدمًا تكوينًا أكثر وضوحًا.

### 3. اتساق قواميس الترجمة

يمكن أن يكون ضمان اتساق قواميس الترجمة عبر لغات مختلفة تحديًا باستخدام i18next. يمكن أن يؤدي هذا الاختلاف إلى تعطل التطبيق إذا لم يتم التعامل معه بشكل صحيح. يعالج Intlayer هذا من خلال فرض قيود على المحتوى المترجم، مما يضمن عدم تفويت أي ترجمة وأن تكون المحتويات المترجمة دقيقة.

### 4. تكامل TypeScript

يقدم Intlayer تكاملاً أفضل مع TypeScript، مما يسمح باقتراحات تلقائية للمحتوى في تعليماتك البرمجية، وبالتالي تعزيز كفاءة التطوير.

### 5. مشاركة المحتوى عبر التطبيقات

يسهل Intlayer مشاركة ملفات إعلان المحتوى عبر تطبيقات متعددة ومكتبات مشتركة. هذه الميزة تجعل من الأسهل الحفاظ على ترجمات متناسقة عبر قاعدة تعليمات برمجية أكبر.

## كيفية توليد قواميس i18next باستخدام Intlayer

### تكوين Intlayer لتصدير قواميس i18next

> ملاحظات هامة
> تصدير قواميس i18next هو حالياً في مرحلة البيتا ولا يضمن توافق 1: 1 مع أطر العمل الأخرى. يوصى بالتمسك بتكوين يعتمد على Intlayer لتقليل المشاكل.

لتصدير قواميس i18next، تحتاج إلى تكوين Intlayer بشكل مناسب. أدناه مثال على كيفية إعداد Intlayer لتصدير كل من القواميس الخاصة بـ Intlayer و i18next.

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // الإشارة إلى أن Intlayer ستصدر كل من قواميس Intlayer و i18next
    dictionaryOutput: ["intlayer", "i18next"],
    // المسار النسبي من جذر المشروع إلى المجلد الذي ستصدر فيه قواميس i18n
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

من خلال تضمين 'i18next' في التكوين، يقوم Intlayer بإنشاء قواميس مخصصة لـ i18next بالإضافة إلى قواميس Intlayer. لاحظ أن إزالة 'intlayer' من التكوين قد يتسبب في كسر التوافق مع React-Intlayer أو Next-Intlayer.

### استيراد القواميس إلى تكوين i18next الخاص بك

لاستيراد القواميس التي تم إنشاؤها إلى تكوين i18next الخاص بك، يمكنك استخدام 'i18next-resources-to-backend'. إليك مثال على كيفية استيراد قواميس i18next الخاصة بك:

```typescript
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // تكوين i18next الخاص بك
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```
