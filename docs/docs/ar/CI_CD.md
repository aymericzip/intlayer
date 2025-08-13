---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: تكامل CI/CD
description: تعلّم كيفية دمج Intlayer في خط أنابيب CI/CD الخاص بك لإدارة المحتوى والنشر بشكل آلي.
keywords:
  - CI/CD
  - التكامل المستمر
  - النشر المستمر
  - الأتمتة
  - التدويل
  - التوثيق
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
---

# التوليد التلقائي للترجمات في خط أنابيب CI/CD

يتيح Intlayer التوليد التلقائي للترجمات لملفات إعلان المحتوى الخاصة بك. هناك عدة طرق لتحقيق ذلك اعتمادًا على سير عملك.

## استخدام نظام إدارة المحتوى (CMS)

مع Intlayer، يمكنك اعتماد سير عمل حيث يتم إعلان لغة واحدة فقط محليًا، بينما تتم إدارة جميع الترجمات عن بُعد من خلال نظام إدارة المحتوى (CMS). يتيح هذا فصل المحتوى والترجمات تمامًا عن قاعدة الشيفرة، مما يوفر مزيدًا من المرونة لمحرري المحتوى ويمكّن من إعادة تحميل المحتوى الحي (دون الحاجة إلى إعادة بناء التطبيق لتطبيق التغييرات).

### مثال على التكوين

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // سيتم إدارة اللغات الاختيارية عن بُعد
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // المحتوى البعيد له الأولوية

    applicationURL: process.env.APPLICATION_URL, // عنوان URL الخاص بالتطبيق المستخدم من قبل نظام إدارة المحتوى

    clientId: process.env.INTLAYER_CLIENT_ID, // بيانات اعتماد نظام إدارة المحتوى
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // يساعد في ضمان توليد ترجمة متسقة
  },
};

export default config;
```

لمعرفة المزيد عن نظام إدارة المحتوى، راجع [التوثيق الرسمي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

## استخدام Husky

يمكنك دمج توليد الترجمات في سير عمل Git المحلي الخاص بك باستخدام [Husky](https://typicode.github.io/husky/).

### مثال على التكوين

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // يتم التعامل مع اللغات الاختيارية عن بُعد
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // استخدم مفتاح API الخاص بك

    applicationContext: "This is a test application", // يساعد في ضمان توليد ترجمة متسقة
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # لضمان تحديث القواميس
npx intlayer fill --unpushed --mode fill    # ملء المحتوى المفقود فقط، لا يقوم بتحديث المحتويات الموجودة
```

> لمزيد من المعلومات حول أوامر Intlayer CLI وكيفية استخدامها، راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

> إذا كان لديك عدة تطبيقات في مستودعك تستخدم نسخ منفصلة من intlayer، يمكنك استخدام الوسيط `--base-dir` كما يلي:

```bash fileName=".husky/pre-push"
# التطبيق 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# التطبيق 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## استخدام GitHub Actions

توفر Intlayer أمر CLI لملء ومراجعة محتوى القاموس تلقائيًا. يمكن دمج هذا في سير عمل CI/CD الخاص بك باستخدام GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: تعبئة Intlayer تلقائيًا
# شروط تشغيل هذا سير العمل
on:
  pull_request:
    branches:
      - "main"

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
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # الخطوة 1: جلب أحدث كود من المستودع
      - name: ⬇️ سحب المستودع
        uses: actions/checkout@v4
        with:
          persist-credentials: true # الاحتفاظ بالاعتمادات لإنشاء طلبات السحب
          fetch-depth: 0 # الحصول على كامل تاريخ git لتحليل الفروقات

      # الخطوة 2: إعداد بيئة Node.js
      - name: 🟢 إعداد Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # استخدام Node.js 20 LTS للاستقرار

      # الخطوة 3: تثبيت تبعيات المشروع
      - name: 📦 تثبيت التبعيات
        run: npm install

      # الخطوة 4: تثبيت Intlayer CLI عالميًا لإدارة الترجمات
      - name: 📦 تثبيت Intlayer
        run: npm install -g intlayer-cli

      # الخطوة 5: بناء مشروع Intlayer لإنشاء ملفات الترجمة
      - name: ⚙️ بناء مشروع Intlayer
        run: npx intlayer build

      # الخطوة 6: استخدام الذكاء الاصطناعي لملء الترجمات الناقصة تلقائيًا
      - name: 🤖 ملء الترجمات الناقصة تلقائيًا
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # الخطوة 7: التحقق من وجود تغييرات والقيام بعملية الالتزام بها
      - name: � التحقق من وجود تغييرات
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # الخطوة 8: الالتزام ودفع التغييرات إذا وجدت
      - name: 📤 الالتزام ودفع التغييرات
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: ملء تلقائي للترجمات المفقودة [تخطي CI]"
          git push origin HEAD:${{ github.head_ref }}
```

لإعداد متغيرات البيئة، انتقل إلى GitHub → الإعدادات → الأسرار والمتغيرات → الإجراءات وأضف السر .

> كما هو الحال مع Husky، في حالة وجود مستودع أحادي (monorepo)، يمكنك استخدام الوسيطة `--base-dir` لمعالجة كل تطبيق بالتتابع.

> بشكل افتراضي، تقوم الوسيطة `--git-diff` بتصفية القواميس التي تتضمن تغييرات من القاعدة (الافتراضية `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).

> لمزيد من المعلومات حول أوامر Intlayer CLI وكيفية استخدامها، راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات |
| ------- | ---------- | --------- |
| 5.5.10  | 2025-06-29 | بدء السجل |
