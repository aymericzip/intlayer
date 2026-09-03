---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "أتمتة الترجمات في CI/CD دون شحن نصوص رديئة"
description: ثلاثة أماكن لأتمتة i18n، خطاف ما قبل الدفع (pre-push)، طلب السحب (pull request)، ووقت التشغيل (runtime). كيفية حظر البناء بناءً على التغطية، والتعبئة الآمنة، وتجنب حلقة التثبيت اللانهائية.
keywords:
  - أتمتة الترجمات ci
  - i18n ci cd
  - github actions ترجمات
  - husky pre-push
  - التوطين المستمر
  - مسار الترجمة
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# أتمتة الترجمات في CI/CD دون شحن نصوص رديئة

لا تصمد الترجمة اليدوية أمام وتيرة الإصدارات السريعة. يضيف مطور نصاً جديداً يوم الجمعة، ولا تتم عملية التصدير حتى الدورة البرمجية (Sprint) التالية، وبحلول ذلك الوقت تتأخر ثلاث لغات أخرى. الأتمتة سهلة في حد ذاتها. لكن أتمتتها دون نشر نصوص آلية غير مراجعة للمستخدمين هي المسألة الحقيقية التي تستحق التفكير.

## جدول المحتويات

<TOC/>

## لا تحتاج إلى الانتقال أو الترحيل لتطبيق الأتمتة

أنماط المسارات البرمجية الموضحة أدناه مستقلة تماماً عن المكتبة المستخدمة، وكذلك الأدوات. إذا كانت رسائلك عبارة عن كتالوجات JSON لـ i18next أو next-intl أو react-intl أو vue-i18n أو next-translate، فإن [إضافة Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) تقرأ وتكتب هذه الملفات مباشرة في مكانها الأصلي:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // أو "icu" لمكتبات next-intl / react-intl
    }),
  ],
};

export default config;
```

يستمر تطبيقك في استيراد ما اعتاد عليه. وتتولى مهام الـ CI ملء كتالوجاتك الحالية وحمايتها، والفرق الذي يراه المراجع في الكود هو مجرد تحديث لملف `locales/fr/checkout.json`، وليس تغييراً معمارياً شاملاً. تتوفر أيضاً [إضافة Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) لتدفقات gettext، و[محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) للحفاظ على واجهة وقت التشغيل دون أي تعديل.

## الفصل بين بوابة الفحص (Gate) والتعبئة (Fill)

تختلط مهمتان مختلفتان بشكل مستمر لدى الفرق.

**بوابة الفحص (Gate)** هي فحص يفشل عند وجود أخطاء. وتحدد أن هذا البناء لا يجوز شحنه أو نشره لأن هناك لغات مطلوبة مفقودة. وهي لا تعدل أو تكتب أي ملف.

**التعبئة (Fill)** هي عملية تعديل للبيانات. تقوم بإنشاء الترجمات المفقودة وتثبيتها برمجياً (Commit). وهي لا تفشل عملية البناء مطلقاً.

تشغيل التعبئة فقط يعني عدم حظر أي شيء على الإطلاق، وتسلل مخرجات الذكاء الاصطناعي غير المدققة إلى الإنتاج. تشغيل بوابة الفحص فقط يعني فشل البناء واضطرار المطورين للتدخل اليدوي في كل مرة. تحتاج معظم الفرق إلى كليهما، لكن مع ربطهما بمحفزات مختلفة: التعبئة عند فتح طلب سحب (Pull Request)، وبوابة الفحص عند الدمج في فرع الإصدار (Release Branch).

## أين يمكن وضع الأتمتة

| المرحلة           | المحفز   | مناسبة لـ                                 | التكلفة                                             |
| :---------------- | :------- | :---------------------------------------- | :-------------------------------------------------- |
| خطاف ما قبل الدفع | Git محلي | ملاحظات سريعة، دون استهلاك دقائق CI       | تعمل على جهاز المطور وتستخدم مفتاح الـ API الخاص به |
| طلب السحب         | وظيفة CI | مراجعة الكود قبل الدمج، مكان موحد للأسرار | استهلاك دقائق CI بالإضافة إلى استدعاءات النماذج     |
| فرع الإصدار       | وظيفة CI | فحص صارم يمنع النشر عند نقص التغطية       | رخيصة جداً، لا استدعاءات لنماذج الذكاء الاصطناعي    |
| وقت التشغيل       | CMS      | تعديل النصوص دون الحاجة لإعادة البناء     | الاعتماد على خدمة مستضافة                           |

## ما قبل الدفع (Pre-push): الحلقة الأسرع

تقوم أداة Husky بتنفيذ التعبئة قبل أن يغادر الكود الجهاز المحلي، مما يضمن وصول الترجمات في نفس دفعة الرفع التي تحتوي على النصوص الجديدة.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

يقوم المعامل `--unpushed` بحصر العمل في المحتوى الذي لم يتم دفعه بعد، مما يمنع بطء العملية عند كل رفع. ويقوم `--mode complete` بتعبئة الحقول المفقودة فقط دون المساس بالنصوص التي تمت ترجمتها بالفعل، لحماية النصوص المدققة من الاستبدال.

في المشاريع متعددة الحزم (Monorepo)، حدد نطاق كل تطبيق:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

العيب هنا واضح: يحتاج كل مطور إلى مفتاح API، وتقع التكلفة على الشخص الذي يدفع الكود. لهذا السبب تنقل الفرق هذه الخطوة إلى الـ CI بمجرد توسعها.

## طلب السحب (Pull Request): التعبئة في مكان المراجعة

نفس العمليات باستخدام GitHub Actions، ومحصورة في التغييرات الفعلية (Diff):

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

هناك أربع تفاصيل جوهرية هنا:

- **`fetch-depth: 0`** إلزامي لعمل الخيار `--git-diff`. فالنسخ السطحي (Shallow clone) يفتقر إلى فرع الأساس لحساب الفروقات، وبالتالي لا يتم إنشاء أي شيء.
- **عبارة `[skip ci]` في رسالة الـ commit** تمنع سير العمل من إعادة تشغيل نفسه في حلقة مغلقة. فبدونها يقوم الـ commit بإطلاق تشغيل جديد يؤدي لـ commit آخر، مما يستنزف ميزانية الـ CI في ليلة واحدة.
- **`concurrency` مع `cancel-in-progress`** تمنع محاولتين متزامنتين من الكتابة على نفس الملفات في وقت واحد.
- **`--git-diff`** يحدد نطاق التعبئة بالتغييرات المحدثة في طلب السحب فقط. وإغفاله يؤدي لإعادة ترجمة الكتالوج بأكمله في كل مرة.

تُسجل الترجمات كـ commit على فرع طلب السحب، مما يتيح للمراجع فحصها ضمن الفروقات. هذا هو الهدف الأساسي من تنفيذها هنا بدلاً من الانتظار لما بعد الدمج.

## فرع الإصدار: بوابة الفحص الحازمة (Gate)

لا تتطلب بوابة الفحص وصولاً إلى النماذج الذكية ويجب أن تكون سريعة جداً.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

تعتمد على اختبار برمجي يؤكد التغطية بدلاً من الاكتفاء بتقرير الأوامر:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("لا توجد لغات مطلوبة مفقودة", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

يطبع الأمر `npx intlayer content test` تقريراً ولكنه ينتهي برمز خروج 0، وبالتالي فهو يفيد بالمعلومات دون أن يوقف عملية البناء. استخدمه محلياً؛ واستخدم التأكيد البرمجي في الـ CI. تفاصيل إضافية في مقال [اكتشاف الترجمات المفقودة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/detecting_missing_translations.md).

## `requiredLocales` تجعل بوابة الفحص قابلة للاستمرار

الفحص الذي يشترط اكتمال جميع اللغات الثماني عشرة يعطل كافة الإصدارات حتى تكتمل أبطأ لغة، وسرعان ما يتم تعطيله من قبل الفريق في غضون شهر.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

أعلن عن كافة اللغات المدعومة، واشترط فقط تلك التي تتطلب إيقاف الإصدار عند غيابها. وتتم تعبئة بقية اللغات بصورة غير متزامنة دون تأخير النشر.

## فصل الترجمات عن المستودع البرمجي تماماً

النموذج الآخر هو إعلان لغة واحدة داخل الكود وإدارة بقية اللغات عن بُعد عبر نظام إدارة المحتوى (CMS) مع خاصية المزامنة الحية (Live Sync). لا تتطلب تغييرات المحتوى حينئذ إعادة بناء التطبيق، مما يفصل مسار التحرير عن مسار النشر البرمجي.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

يلائم هذا النموذج الفرق التي يدير فيها أشخاص غير تقنيين المحتوى. إنه خيار ومفاضلة: تحصل على استقلالية في التحرير لكنك تفقد ميزة أن مستودع Git يعكس بمفرده كل ما يظهر على الشاشة. تفاصيل أوفى في [توثيق نظام إدارة المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

لاحظ أن `clientSecret` يمثل بيانات اعتماد حساسة خاصة بالخادم. يجب حفظها في أسرار الـ CI ومتغيرات بيئة الخادم، وألا تصل إطلاقاً إلى حزمة العميل (Client Bundle).

## القيود والحدود الحقيقية

كل ما تم شرحه يؤتمت **التغطية**، ولا يؤتمت **الجودة**. فالتعبئة الآلية تحول النقص الظاهر إلى نقص خفي: يجتاز الكود الفحص بنجاح لأن المفتاح أصبح له قيمة، ولكن لم يقرأ أي إنسان تلك القيمة بعد.

هذا مقبول في الأدوات الداخلية، وسجلات التغيير، واللغات التجريبية. ولكنه غير مقبول في صفحات الأسعار، والنصوص القانونية، ورسائل فشل عمليات الدفع، أو أي نص يقرأه العميل قبل اتخاذ قرار الشراء. وجه تلك النصوص لمراجع بشري، واستخدم دائماً `--mode complete` لحماية النصوص المراجعة من الاستبدال.

زود النموذج بالسياق المناسب لضمان اتساق الصياغة:

```ts
ai: {
  applicationContext: "تطبيق فواتير موجه للشركات (B2B). أسلوب رسمي ورصين. لا تقم بترجمة اسم المنتج إطلاقاً.",
}
```

## أخطاء شائعة

- **نسيان `[skip ci]` في التثبيت الآلي.** يدخل المسار في حلقة مفرغة تعيد تشغيل نفسها.
- **النسخ السطحي مع `--git-diff`.** غياب أساس للمقارنة يؤدي لتخطي التعبئة دون تنبيه.
- **تعبئة الكتالوج بأكمله في كل عملية تشغيل.** حدد النطاق عبر `--git-diff` أو `--unpushed` للتحكم بالتكاليف.
- **استخدام تقرير واجهة الأوامر (CLI) كبوابة فحص.** يعود دائماً بالرمز 0 ولا يوقف البناء.
- **إلزامية كافة اللغات كشرط حتمي.** يؤدي لإلغاء الفحص عند أول تعطل لجدول النشر.
- **مهمة تعبئة دون أي بوابة فحص مرافقة.** لا يفشل أي شيء، وتصل نصوص الذكاء الاصطناعي الخام للمستخدمين دون تدقيق.
- **حفظ مفاتيح API الخاصة بالنماذج داخل المستودع.** مكانها هو أسرار الـ CI شأنها شأن `clientSecret`.

## للمزيد من القراءة

- [CI/CD: التوليد الآلي للترجمات عبر Husky و GitHub Actions ونظام CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md)
- [اختبار المحتوى وحظر البناء بناءً على التغطية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/testing.md)
- [autoFill: إنشاء ملفات الإعلان لكل لغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md)
- [مرجع الإعدادات: `locales` و `requiredLocales` و `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
- [تقارير المقارنة المعيارية عبر أطر العمل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md)
- [محول التوافق مع i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/i18next.md)
- [كيفية اكتشاف الترجمات المفقودة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/detecting_missing_translations.md)
- [كيف تختبر الترجمات دون اختبارات هشة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_testing_strategies.md)
