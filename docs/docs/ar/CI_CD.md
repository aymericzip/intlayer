---
docName: ci_cd
url: https://intlayer.org/doc/concept/ci-cd
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: تكامل CI/CD
description: تعرف على كيفية دمج Intlayer في خط أنابيب CI/CD الخاص بك لإدارة المحتوى والنشر الآلي.
keywords:
  - CI/CD
  - التكامل المستمر
  - النشر المستمر
  - الأتمتة
  - التدويل
  - توثيق
  - Intlayer
---

# توليد الترجمات تلقائيًا في خط أنابيب CI/CD

تتيح Intlayer إنشاء الترجمات تلقائيًا لملفات إعلان المحتوى الخاصة بك. هناك طرق متعددة لتحقيق ذلك بناءً على سير العمل الخاص بك.

## استخدام CMS

مع Intlayer، يمكنك اعتماد سير عمل حيث يتم الإعلان عن لغة واحدة فقط محليًا، بينما تتم إدارة جميع الترجمات عن بُعد من خلال CMS. يتيح ذلك فصل المحتوى والترجمات تمامًا عن قاعدة الكود، مما يوفر مرونة أكبر لمحرري المحتوى ويمكّن من إعادة تحميل المحتوى بشكل فوري (دون الحاجة إلى إعادة بناء التطبيق لتطبيق التغييرات).

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

    applicationURL: process.env.APPLICATION_URL, // عنوان URL الخاص بالتطبيق المستخدم بواسطة CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // بيانات اعتماد CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // يساعد في ضمان توليد ترجمات متسقة
  },
};

export default config;
```

لمعرفة المزيد عن CMS، راجع [التوثيق الرسمي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

## استخدام Husky

يمكنك دمج توليد الترجمات في سير عمل Git المحلي الخاص بك باستخدام [Husky](https://typicode.github.io/husky/).

### مثال على التكوين

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // اللغات الاختيارية تتم إدارتها عن بُعد
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // استخدم مفتاح API الخاص بك

    applicationContext: "This is a test application", // يساعد في ضمان توليد ترجمات متسقة
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # لضمان تحديث القواميس
npx intlayer fill --unpushed --mode fill    # ملء المحتوى المفقود فقط، لا يتم تحديث الموجود
```

> لمزيد من المعلومات حول أوامر Intlayer CLI واستخدامها، راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

> إذا كان لديك تطبيقات متعددة في المستودع تستخدم مثيلات Intlayer منفصلة، يمكنك استخدام الوسيطة `--base-dir` كما يلي:

```bash fileName=".husky/pre-push"
# التطبيق 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# التطبيق 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## استخدام GitHub Actions

توفر Intlayer أمر CLI لملء ومراجعة محتوى القواميس تلقائيًا. يمكن دمجه في سير عمل CI/CD باستخدام GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
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
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Install dependencies
        run: npm ci

      - name: ⚙️ Build Intlayer project
        run: npx intlayer build

      - name: 🤖 Auto-fill missing translations
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Create or update translation PR
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> كما هو الحال مع Husky، في حالة وجود مستودع أحادي، يمكنك استخدام الوسيطة `--base-dir` لمعالجة كل تطبيق على حدة.

> بشكل افتراضي، تقوم الوسيطة `--git-diff` بتصفية القواميس التي تتضمن تغييرات من الفرع الأساسي (افتراضيًا `origin/main`) إلى الفرع الحالي (افتراضيًا: `HEAD`).

> لمزيد من المعلومات حول أوامر Intlayer CLI واستخدامها، راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).
