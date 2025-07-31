---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: تكامل CI/CD
description: تعلّم كيفية دمج Intlayer في خط أنابيب CI/CD الخاص بك لإدارة المحتوى والنشر التلقائي.
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

مع Intlayer، يمكنك اعتماد سير عمل حيث يتم إعلان لغة واحدة فقط محليًا، بينما تتم إدارة جميع الترجمات عن بُعد من خلال نظام إدارة المحتوى (CMS). يتيح ذلك فصل المحتوى والترجمات تمامًا عن قاعدة الشيفرة، مما يوفر مزيدًا من المرونة لمحرري المحتوى ويسمح بإعادة تحميل المحتوى بشكل فوري (دون الحاجة إلى إعادة بناء التطبيق لتطبيق التغييرات).

### مثال على التكوين

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // اللغات الاختيارية ستتم إدارتها عن بُعد
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // المحتوى البعيد له الأولوية

    applicationURL: process.env.APPLICATION_URL, // عنوان URL للتطبيق المستخدم من قبل نظام إدارة المحتوى

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

يمكنك دمج توليد الترجمة في سير عمل Git المحلي الخاص بك باستخدام [Husky](https://typicode.github.io/husky/).

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
    clientId: process.env.INTLAYER_CLIENT_ID, // بيانات اعتماد نظام إدارة المحتوى
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
npx intlayer fill --unpushed --mode fill    # ملء المحتوى المفقود فقط، لا يتم تحديث المحتويات الموجودة
```

> لمزيد من المعلومات حول أوامر Intlayer CLI وكيفية استخدامها، راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

> إذا كان لديك عدة تطبيقات في مستودعك تستخدم نسخ منفصلة من intlayer، يمكنك استخدام الوسيطة `--base-dir` كما يلي:

```bash fileName=".husky/pre-push"
# التطبيق 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# التطبيق 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## استخدام GitHub Actions

توفر Intlayer أمر CLI لملء محتوى القاموس تلقائيًا ومراجعته. يمكن دمج هذا في سير عمل CI/CD الخاص بك باستخدام GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: ملء تلقائي Intlayer
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ استنساخ المستودع
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 إعداد Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 تثبيت التبعيات
        run: npm ci

      - name: ⚙️ بناء مشروع Intlayer
        run: npx intlayer build

      - name: 🤖 ملء الترجمات المفقودة تلقائيًا
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 إنشاء أو تحديث طلب السحب للترجمة
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: ملء تلقائي للترجمات المفقودة [skip ci]
          branch: auto-translations
          title: chore: تحديث الترجمات المفقودة
          labels: translation, automated
```

> بنفس طريقة Husky، في حالة وجود monorepo، يمكنك استخدام الوسيطة `--base-dir` لمعالجة كل تطبيق بالتتابع.

> بشكل افتراضي، تقوم الوسيطة `--git-diff` بتصفية القواميس التي تتضمن تغييرات من القاعدة (الافتراضية `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).

> لمزيد من المعلومات حول أوامر Intlayer CLI وكيفية استخدامها، راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
