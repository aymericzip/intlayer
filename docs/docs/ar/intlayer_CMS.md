---
createdAt: 2025-08-23
updatedAt: 2026-07-08
title: نظام إدارة المحتوى Intlayer | إخراج محتواك إلى نظام إدارة المحتوى Intlayer
description: إخراج محتواك إلى نظام إدارة المحتوى Intlayer لتفويض إدارة المحتوى إلى فريقك.
keywords:
  - نظام إدارة المحتوى
  - محرر بصري
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "نقل قسم «التزامن الحي» إلى صفحة مستقلة (live-sync.md)، مع الإبقاء هنا على مقدمة قصيرة ورابط"
  - version: 9.0.0
    date: 2026-06-30
    changes: "إضافة قسم الاستضافة الذاتية"
  - version: 6.0.1
    date: 2025-09-22
    changes: "إضافة توثيق المزامنة الحية"
  - version: 6.0.0
    date: 2025-09-04
    changes: "استبدال حقل `hotReload` بـ `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "بدء السجل"
author: aymericzip
---

# توثيق نظام إدارة المحتوى Intlayer (CMS)

<iframe title="المحرر البصري + نظام إدارة المحتوى لتطبيق الويب الخاص بك: شرح Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

نظام إدارة المحتوى Intlayer هو تطبيق يسمح لك بإخراج محتواك من مشروع Intlayer.

لهذا، قدم Intlayer مفهوم "القواميس البعيدة".

![واجهة نظام إدارة المحتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## جدول المحتويات

<TOC/>

---

## فهم القواميس البعيدة

يفرق Intlayer بين القواميس "المحلية" و"البعيدة".

- القاموس "المحلي" هو قاموس يتم إعلانه داخل مشروع Intlayer الخاص بك. مثل ملف إعلان زر، أو شريط التنقل الخاص بك. إخراج المحتوى الخاص بك لا معنى له في هذه الحالة لأن هذا المحتوى من المفترض ألا يتغير كثيرًا.

- القاموس "البعيد" هو قاموس يتم إدارته من خلال نظام إدارة المحتوى Intlayer CMS. قد يكون مفيدًا للسماح لفريقك بإدارة المحتوى مباشرة على موقعك الإلكتروني، ويهدف أيضًا إلى استخدام ميزات اختبار A/B والتحسين التلقائي لمحركات البحث (SEO).

## المحرر المرئي مقابل نظام إدارة المحتوى (CMS)

محرر [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) هو أداة تتيح لك إدارة المحتوى الخاص بك في محرر مرئي للقواميس المحلية. بمجرد إجراء تغيير، سيتم استبدال المحتوى في قاعدة الشيفرة. هذا يعني أن التطبيق سيتم إعادة بنائه وستتم إعادة تحميل الصفحة لعرض المحتوى الجديد.

على النقيض من ذلك، فإن نظام إدارة المحتوى Intlayer CMS هو أداة تتيح لك إدارة المحتوى الخاص بك في محرر مرئي للقواميس البعيدة. بمجرد إجراء تغيير، لن يؤثر المحتوى على قاعدة الشيفرة الخاصة بك. وسيعرض الموقع تلقائيًا المحتوى المُعدل.

## التكامل

لمزيد من التفاصيل حول كيفية تثبيت الحزمة، راجع القسم ذي الصلة أدناه:

### التكامل مع Next.js

للتكامل مع Next.js، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md).

### التكامل مع Create React App

للتكامل مع Create React App، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md).

### التكامل مع Vite + React

للتكامل مع Vite + React، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md).

## التهيئة

قم بتشغيل الأمر التالي لتسجيل الدخول إلى Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

سيؤدي هذا إلى فتح المتصفح الافتراضي الخاص بك لإكمال عملية المصادقة والحصول على بيانات الاعتماد اللازمة (معرف العميل وسر العميل) لاستخدام خدمات Intlayer.

في ملف تهيئة Intlayer الخاص بك، يمكنك تخصيص إعدادات نظام إدارة المحتوى:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... إعدادات التهيئة الأخرى
  editor: {
    /**
     * مطلوب
     *
     * عنوان URL الخاص بالتطبيق.
     * هذا هو العنوان الذي يستهدفه المحرر المرئي.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * مطلوب
     *
     * معرف العميل والسر السري للعميل مطلوبان لتمكين المحرر.
     * يسمحان بتحديد هوية المستخدم الذي يقوم بتحرير المحتوى.
     * يمكن الحصول عليهما بإنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * اختياري
     *
     * في حال كنت تستضيف نظام إدارة المحتوى Intlayer بنفسك، يمكنك تعيين عنوان URL الخاص بنظام إدارة المحتوى.
     *
     * عنوان URL الخاص بنظام إدارة المحتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * اختياري
     *
     * في حال كنت تستضيف نظام إدارة المحتوى Intlayer بنفسك، يمكنك تعيين عنوان URL الخاص بالواجهة الخلفية.
     *
     * عنوان URL الخاص بنظام إدارة المحتوى Intlayer.
     * بشكل افتراضي، يتم تعيينه إلى https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

> إذا لم يكن لديك معرف عميل وسر عميل، يمكنك الحصول عليهما بإنشاء عميل جديد في [لوحة تحكم Intlayer - المشاريع](https://app.intlayer.org/projects).

> لرؤية جميع المعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## استخدام نظام إدارة المحتوى

### دفع التهيئة الخاصة بك

لتكوين نظام إدارة محتوى Intlayer، يمكنك استخدام أوامر [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ar/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> إذا كنت تستخدم متغيرات البيئة في ملف التهيئة `intlayer.config.ts`، يمكنك تحديد البيئة المطلوبة باستخدام الوسيطة `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

يقوم هذا الأمر برفع تهيئتك إلى نظام إدارة محتوى Intlayer.

### دفع قاموس

لتحويل قواميس اللغة المحلية الخاصة بك إلى قاموس بعيد، يمكنك استخدام أوامر [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ar/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> إذا كنت تستخدم متغيرات البيئة في ملف التهيئة `intlayer.config.ts` الخاص بك، يمكنك تحديد البيئة المطلوبة باستخدام الوسيطة `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

يقوم هذا الأمر برفع قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة للتحميل والتحرير غير المتزامن عبر منصة Intlayer.

### تحرير القاموس

بعد ذلك، ستتمكن من رؤية وإدارة قاموسك في [نظام إدارة محتوى Intlayer](https://app.intlayer.org/content).

## الوصول البرمجي باستخدام SDK `@intlayer/api`

بالإضافة إلى واجهة سطر الأوامر والمحرر المرئي، يأتي Intlayer مع SDK مكتوب بشكل آمن من حيث النوع في حزمة [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api). يتيح لك التعامل مع نظام إدارة المحتوى كـ **قاعدة بيانات محتوى بدون رأس**: يمكنك جلب المشاريع وجلب القواميس، وتحديثها مباشرة من تطبيقك الخاص أو البرامج النصية أو خط أنابيب CI.

يتعامل SDK مع المصادقة من أجلك. طالما أن `clientId` و `clientSecret` متاحة (في تكوين Intlayer أو البيئة)، فإنه يحصل على رمز OAuth2 للوصول وينعشه تلقائياً ويوقع كل طلب.

### التثبيت

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### كيفية عملها: المصادق + نقاط النهاية

تم تقسيم SDK إلى **استيرادين منفصلين** عن قصد، للحفاظ على حجم حزمتك صغيرًا:

1. `createIntlayerCMS` — ينشئ **مصادقًا** خفيف الوزن. يحمل فقط بيانات الاعتماد والرمز المميز للوصول المُدار؛ لا يعرف شيئًا عن أي مجال محدد.
2. `dictionaryEndpoint`, `projectEndpoint`, … — **محررات نقاط النهاية** لكل مجال، يتم استيراد كل منها من مسارها الخاص (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). تمرر المصادق إلى نقطة النهاية التي تحتاجها.

لأن كل نقطة نهاية يتم استيرادها بشكل منفصل، تتضمن حزمتك فقط المجالات التي تستخدمها فعليًا — استيراد `dictionaryEndpoint` لا يسحب أبدًا المشروع أو الذكاء الاصطناعي أو أي عميل مجال آخر.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// التكوين اختياري: عند حذفه، يتم قراءة بيانات الاعتماد من
// `@intlayer/config/built`، الذي يحل متغيرات البيئة INTLAYER_CLIENT_ID و
// INTLAYER_CLIENT_SECRET.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> بيانات اعتماد CMS (`clientId` / `clientSecret`) تمنح **حق الوصول للكتابة** إلى محتواك. لا تنشئ المصادق أبدًا إلا على **الجانب الخادم** (إجراءات الخادم، معالجات المسارات، البرامج النصية، CI). لا تستورده أبدًا في الكود من جانب العميل أو تعرض بيانات اعتمادك للمتصفح.

إذا فضلت عدم الاعتماد على تكوين وقت البناء، مرر بيانات الاعتماد بشكل صريح:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // اختياري، للخوادم الذاتية الاستضافة:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> احصل على بيانات اعتمادك بإنشاء مفتاح وصول جديد في [لوحة معلومات Intlayer - المشاريع](https://app.intlayer.org/projects).

### جلب المشاريع

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// قائمة المشاريع التي يمكن الوصول إليها باستخدام بيانات اعتمادك
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// قراءة رؤى التوطين المجمعة للمشروع المحدد
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### جلب القواميیس

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// قائمة بكل قاموس بعید من المشروع
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// أو الحصول على قاموس واحد حسب المفتاح
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### دفع وتحديث القواميس

استخدم نظام إدارة المحتوى (CMS) كقاعدة بيانات لكتابة المحتوى مرة أخرى:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// إنشاء قاموس جديد
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Upsert مجموعة من القواميس (إنشاء أو تحديثها في استدعاء واحد)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// تحديث قاموس موجود
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> نصيحة: أعد استخدام نقطة النهاية المرتبطة لتجنب تكرار نفسك:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### استخراج طريقة واحدة

كل طريقة endpoint مصادق عليها بالفعل وقائمة بذاتها (تحمل معالجة الرمز الخاص بها)، لذا يمكنك استخراج واحدة وتمريرها حوله — على سبيل المثال لحقنها كتبعية:

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// مصادق عليه بالفعل — ينعش الرمز تلقائياً في كل استدعاء
export const pushDictionaries = dictionary.pushDictionaries;

// الاستخدام
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## التزامن الحي

يتيح التزامن الحي لتطبيقك عكس تغييرات محتوى نظام إدارة المحتوى أثناء وقت التشغيل. لا حاجة لإعادة البناء أو إعادة النشر. عند التمكين، يتم بث التحديثات إلى خادم التزامن الحي الذي يقوم بتحديث القواميس التي يقرأها تطبيقك.

للحصول على دليل الإعداد الكامل (التفعيل، تشغيل خادم Live Sync، سير عمل التطوير المحلي، والقيود)، راجع [توثيق Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/live-sync.md).

## الاستضافة الذاتية (Self-Hosting)

يمكن تشغيل Intlayer بالكامل على بنيتك التحتية الخاصة. يؤدي أمر واحد إلى تشغيل المكدس الكامل (لوحة التحكم، وواجهة برمجة التطبيقات، وقاعدة البيانات، وتخزين الكائنات، والبريد الإلكتروني) باستخدام Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

للاطلاع على دليل الإعداد الكامل، ومرجع متغيرات البيئة، وتعليمات الترقية، وإجراءات النسخ الاحتياطي والاستعادة، راجع [دليل الاستضافة الذاتية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

---

## تصحيح الأخطاء

إذا واجهت أي مشاكل مع نظام إدارة المحتوى (CMS)، تحقق من الأمور التالية:

- التطبيق يعمل.

- تم إعداد تكوين [`المحرر`](https://intlayer.org/doc/concept/configuration#editor-configuration) بشكل صحيح في ملف تكوين Intlayer الخاص بك.
  - الحقول المطلوبة:
    - يجب أن يتطابق عنوان URL الخاص بالتطبيق مع العنوان الذي قمت بتعيينه في تكوين المحرر (`applicationURL`).
    - عنوان URL الخاص بنظام إدارة المحتوى (CMS)

- تأكد من أن تكوين المشروع تم دفعه إلى نظام إدارة محتوى Intlayer.

- يستخدم المحرر المرئي إطار iframe لعرض موقعك الإلكتروني. تأكد من أن سياسة أمان المحتوى (CSP) لموقعك تسمح بعنوان URL الخاص بنظام إدارة المحتوى كـ `frame-ancestors` ('https://app.intlayer.org' بشكل افتراضي). تحقق من وحدة تحكم المحرر لأي أخطاء.

## الأسئلة الشائعة

<FAQ>

<Question title="ما الفرق بين Intlayer CMS والمحرر المرئي؟">

يعدل [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) ملفات القواميس المحلية في قاعدة التعليمات البرمجية الخاصة بك. يدير نظام CMS المحتوى عن بُعد على الخادم، مما يتيح تحديثات النصوص دون إعادة نشر كود التطبيق.

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة (bundle) تطبيقي؟">

أقل بكثير من الإعدادات القائمة على فضاءات الأسماء، لأن الصفحة لا تُحمّل أبدًا كتالوجًا لا تعرضه. يُحل المحتوى المعروض على الخادم مباشرة على الخادم، ويستبدل مترجم وقت البناء استدعاءات `useIntlayer` بإدخالات القاموس الدقيقة التي يستخدمها المكون، لذلك يتم التخلص من المفاتيح واللغات غير المستخدمة. تقسم [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md) الباقي حسب اللغة. مقارنة بالبدائل التقليدية، يقلل Intlayer حجم الحزمة والصفحة بنسبة تصل إلى 50%. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) و [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

</Question>

<Question title="هل يمكنني الترحيل من i18next أو next-intl أو react-i18next دون إعادة كتابة مكوناتي؟">

نعم، وبطريقتين. يمكنك ترحيل المحتوى تدريجيًا باستخدام [دليل ترحيل i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md) أو [دليل ترحيل next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md). أو يمكنك الاحتفاظ بواجهة برمجة التطبيقات الحالية بالكامل: تكشف [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) نفس واجهات `i18next` و `react-i18next` و `next-intl` و `next-i18next` و `react-intl` و `use-intl` و `vue-i18n` و `Lingui`، ولكنها مدعومة بقواميس Intlayer، بحيث تتغير الاستيرادات فقط بينما يظل كود المكون كما هو.

</Question>

<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` الخاصة بك كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

</Question>

<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفات المصدر الخاصة بك، ويسحب السلاسل النصية الموجهة للمستخدم ويكتب ملف `.content` بجانب كل منها، بحيث تراجع diff بدلاً من نسخ السلاسل إلى كتالوج يدويًا. راجع [أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md).

لأتمتة كاملة، يقوم [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) بالشيء نفسه في وقت البناء على كود JSX و TSX و Vue و Svelte، منشئًا القواميس عند كل تغيير دون الحاجة إلى إدارة المفاتيح يدويًا.

</Question>

<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح `useIntlayer` إلى ملف المحتوى المصرح به، استخراج المحتوى من المكون، وتشغيل build و fill و test و push و pull من لوحة الأوامر أو علامة تبويب Intlayer.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: نفس التجربة في أي محرر يدعم LSP، مع الانتقال إلى التعريف وعروض القيمة المترجمة عند التمرير والإكمال التلقائي للمفاتيح. يدعم أيضًا استدعاءات `i18next` و `react-i18next` و `next-intl` و `use-intl`.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مخصصة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: قاعدة `no-raw-text` ترصد النصوص المكتوبة مباشرة بدون تدويل.

</Question>

<Question title="ما هو المحتوى الذي يجب وضعه على نظام إدارة المحتوى (CMS)؟">

المحتوى الذي يتغير بشكل متكرر وغير مرتبط بدورة إصدار الكود: نصوص الصفحات المقصودة، وجداول الأسعار، والإعلانات، ولافتات العروض الترويجية، ومقالات المدونة.

</Question>

<Question title="ماذا يحدث إذا تعذر الاتصال بنظام إدارة المحتوى؟">

يعود التطبيق تلقائيًا إلى إعلانات القاموس المحلية في قاعدة الكود، مما يضمن ألا تؤدي مشكلات الشبكة أبدًا إلى إظهار صفحة فارغة للمستخدم.

</Question>

<Question title="هل يمكنني استضافة CMS ذاتيًا؟">

نعم. يمكن تشغيل CMS على بنيتك التحتية الخاصة للمتطلبات التي لا يجب أن يغادر فيها المحتوى شبكتك الداخلية. انظر [دليل الاستضافة الذاتية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

</Question>

<Question title="هل يحتاج محررو المحتوى إلى مطور لنشر التغييرات؟">

لا. هذا هو الهدف الأساسي من القواميس البعيدة: يغير المحررون النصوص على CMS وبفضل ميزة المزامنة المباشرة (live sync)، يعرض الموقع التحديث على الفور.

</Question>

<Question title="هل يمكنني أتمتة CMS بدلاً من استخدام واجهة المستخدم؟">

نعم. تكشف حزمة SDK `@intlayer/api` نفس نقاط النهاية للواجهة، مما يتيح لك قراءة المشاريع، وجلب القواميس، وأتمتة النشر عبر البرامج النصية.

</Question>

<Question title="هل يدعم CMS اختبار A/B للترجمات؟">

نعم. تدعم القواميس البعيدة [تنوعات المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md)، مما يتيح لك اختبار نسخ نصية مختلفة لشرائح جمهور مختلفة.

</Question>

<Question title="هل CMS مجاني؟">

مكتبة Intlayer، و CLI، والمترجم، والمحرر المرئي مجانية تمامًا ومفتوحة المصدر بموجب ترخيص Apache 2.0. سحابة CMS هي خدمة مدفوعة، ولكن النسخة المستضافة ذاتيًا يمكن تشغيلها مجانًا على خادمك الخاص.

</Question>

</FAQ>
