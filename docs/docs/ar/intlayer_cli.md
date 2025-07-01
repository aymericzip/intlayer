---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: واجهة سطر الأوامر (CLI)
description: اكتشف كيفية استخدام واجهة سطر أوامر Intlayer لإدارة موقعك متعدد اللغات. اتبع الخطوات في هذا التوثيق عبر الإنترنت لإعداد مشروعك في دقائق معدودة.
keywords:
  - CLI
  - واجهة سطر الأوامر
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - concept
  - cli
---

# واجهة سطر أوامر Intlayer

## تثبيت الحزمة

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> إذا كانت حزمة `intlayer` مثبتة بالفعل، يتم تثبيت واجهة سطر الأوامر تلقائيًا. يمكنك تخطي هذه الخطوة.

## حزمة intlayer-cli

تهدف حزمة `intlayer-cli` إلى تحويل [تصريحات intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md) الخاصة بك إلى قواميس.

ستقوم هذه الحزمة بتحويل جميع ملفات intlayer، مثل `src/**/*.content.{ts|js|mjs|cjs|json}`. [انظر كيفية إعلان ملفات تصريحات Intlayer الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

لتفسير قواميس intlayer يمكنك استخدام مفسرات، مثل [react-intlayer](https://www.npmjs.com/package/react-intlayer)، أو [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## دعم ملف التكوين

يقبل Intlayer عدة صيغ لملفات التكوين:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

لمعرفة كيفية تكوين اللغات المتاحة أو معلمات أخرى، راجع [توثيق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## SDK سطر الأوامر (CLI)

SDK سطر الأوامر هو مكتبة تتيح لك استخدام CLI الخاص بـ Intlayer في كودك الخاص.

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
```

مثال على الاستخدام:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## تشغيل أوامر intlayer

### بناء القواميس

لبناء القواميس الخاصة بك، يمكنك تشغيل الأوامر التالية:

```bash
npx intlayer build
```

أو في وضع المراقبة

```bash
npx intlayer build --watch
```

سيقوم هذا الأمر بالبحث عن ملفات محتوى التصريحات الخاصة بك بشكل افتراضي في `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. وبناء القواميس في مجلد `.intlayer`.

##### الأسماء المستعارة:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### دفع القواميس

```bash
npx intlayer dictionary push
```

إذا تم تثبيت [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، يمكنك أيضًا دفع القواميس إلى المحرر. سيسمح هذا الأمر بجعل القواميس متاحة لـ [المحرر](https://intlayer.org/dashboard). بهذه الطريقة، يمكنك مشاركة القواميس مع فريقك وتحرير المحتوى الخاص بك دون الحاجة إلى تعديل كود التطبيق الخاص بك.

##### الأسماء المستعارة:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### الوسائط:

- `-d`, `--dictionaries`: معرفات القواميس التي سيتم دفعها. إذا لم يتم تحديدها، فسيتم دفع جميع القواميس.
  > مثال: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: تخطي السؤال الذي يطلب حذف مجلدات اللغات بمجرد دفع القواميس، وحذفها. بشكل افتراضي، إذا تم تعريف القاموس محليًا، فسيتم الكتابة فوق محتوى القواميس البعيدة.
  > مثال: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: تخطي السؤال الذي يطلب حذف مجلدات اللغات بمجرد دفع القواميس، والاحتفاظ بها. بشكل افتراضي، إذا تم تعريف القاموس محليًا، فسيتم الكتابة فوق محتوى القواميس البعيدة.
  > مثال: `npx intlayer dictionary push -k`
- `--env`: تحديد البيئة (مثل `development`، `production`).
- `--env-file`: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- `--base-dir`: تحديد الدليل الأساسي للمشروع.

- `--verbose`: تمكين تسجيل مفصل لأغراض التصحيح.
- `--git-diff`: التشغيل فقط على القواميس التي تتضمن تغييرات من الأساس (الافتراضي `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).
- `--git-diff-base`: تحديد المرجع الأساسي لمقارنة git diff (الافتراضي `origin/main`).
- `--git-diff-current`: تحديد المرجع الحالي لمقارنة git diff (الافتراضي `HEAD`).
- `--uncommitted`: تضمين التغييرات غير الملتزمة.
- `--unpushed`: تضمين التغييرات غير المدفوعة.
- `--untracked`: تضمين الملفات غير المتتبعة.

### سحب القواميس البعيدة

```bash
npx intlayer pull
```

إذا تم تثبيت [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، يمكنك أيضًا سحب القواميس من المحرر. بهذه الطريقة، يمكنك استبدال محتوى قواميسك حسب حاجة تطبيقك.

##### الأسماء المستعارة:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### الوسائط:

- `-d, --dictionaries`: معرفات القواميس التي سيتم سحبها. إذا لم يتم تحديدها، سيتم سحب جميع القواميس.
  > مثال: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : مسار الدليل حيث سيتم حفظ القواميس الجديدة. إذا لم يتم تحديده، سيتم حفظ القواميس الجديدة في دليل `./intlayer-dictionaries` الخاص بالمشروع. إذا تم تحديد حقل `filePath` في محتوى القاموس الخاص بك، فلن تأخذ القواميس هذا الوسيط في الاعتبار وسيتم حفظها في الدليل المحدد في `filePath`.
- `--env`: تحديد البيئة (مثلًا، `development`، `production`).
- `--env-file`: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- `--base-dir`: تحديد الدليل الأساسي للمشروع.
- `--verbose`: تفعيل تسجيل الدخول التفصيلي لأغراض التصحيح.

##### مثال:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### تعبئة / تدقيق / ترجمة القواميس

```bash
npx intlayer fill
```

يقوم هذا الأمر بتحليل ملفات إعلان المحتوى الخاصة بك للبحث عن مشكلات محتملة مثل الترجمات المفقودة، أو التناقضات الهيكلية، أو عدم تطابق الأنواع. إذا وجد أي مشاكل، فإن **intlayer fill** سيقترح أو يطبق تحديثات للحفاظ على اتساق وكمال قواميسك.

##### الأسماء المستعارة:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### الوسائط:

- `-f, --file [files...]`
  قائمة بملفات إعلان المحتوى المحددة التي سيتم تدقيقها. إذا لم يتم توفيرها، سيتم تدقيق جميع الملفات المكتشفة التي تطابق النمط `*.content.{ts,js,mjs,cjs,tsx,jsx,json}`.

- `--exclude [excludedGlobs...]`
  نمط globs لاستبعاد ملفات من التدقيق (مثلاً `--exclude "src/test/**"`).

- `--source-locale [sourceLocale]`

  لغة المصدر للترجمة منها. إذا لم يتم تحديدها، سيتم استخدام اللغة الافتراضية من تكوينك.

- `--output-locales [outputLocales...]`
  اللغات المستهدفة للترجمة إليها. إذا لم يتم تحديدها، سيتم استخدام جميع اللغات من تكوينك باستثناء لغة المصدر.

- `--mode [mode]`
  وضع الترجمة: 'complete' (كامل)، 'review' (مراجعة)، أو 'missing-only' (الناقص فقط). الافتراضي هو 'missing-only'.

- `--git-diff`
  يقوم بتصفية القواميس التي تحتوي على تغييرات من الأساس (الافتراضي `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).

- `--git-diff-base`
  تحديد المرجع الأساسي لـ git diff (الافتراضي `origin/main`).

- `--git-diff-current`
  تحديد المرجع الحالي لـ git diff (الافتراضي: `HEAD`).

- `--uncommitted`
  يقوم بتصفية القواميس التي تحتوي على تغييرات غير ملتزمة.

- `--unpushed`
- `--unpushed`
  يقوم بتصفية القواميس التي تحتوي على تغييرات غير مدفوعة.

- `--untracked`
  يقوم بتصفية القواميس التي تحتوي على ملفات غير متتبعة.

- `--keys [keys...]`
  تصفية القواميس بناءً على المفاتيح المحددة.

- `--excluded-keys [excludedKeys...]`
  استبعاد القواميس بناءً على المفاتيح المحددة.

- `--path-filter [pathFilters...]`
  تصفية القواميس بناءً على نمط glob لمسارات الملفات.

- `--model [model]`
  نموذج الذكاء الاصطناعي المستخدم للترجمة (مثل `gpt-3.5-turbo`).

- `--provider [provider]`
  مزود الذكاء الاصطناعي المستخدم للترجمة.

- `--temperature [temperature]`
  إعداد درجة الحرارة لنموذج الذكاء الاصطناعي.

- `--api-key [apiKey]`
  تقديم مفتاح API خاص بك لخدمة الذكاء الاصطناعي.

- `--custom-prompt [prompt]`
  تقديم موجه مخصص لتعليمات الترجمة الخاصة بك.
- `--application-context [applicationContext]`
  تقديم سياق إضافي لترجمة الذكاء الاصطناعي.

- `--env`
  تحديد البيئة (مثل `development`، `production`).

- `--env-file [envFile]`
  تقديم ملف بيئة مخصص لتحميل المتغيرات منه.

- `--base-dir`
  تحديد الدليل الأساسي للمشروع.

- `--verbose`
  تفعيل تسجيل مفصل لأغراض التصحيح.

##### مثال:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

سيقوم هذا الأمر بترجمة المحتوى من الإنجليزية إلى الفرنسية والإسبانية لجميع ملفات إعلان المحتوى في دليل `src/home/` باستخدام نموذج GPT-3.5 Turbo.

### إدارة التكوين

#### الحصول على التكوين

يسترجع أمر `configuration get` التكوين الحالي لـ Intlayer، وخاصة إعدادات اللغة. هذا مفيد للتحقق من إعداداتك.

```bash
npx intlayer configuration get
```

##### الأسماء المستعارة:

- `npx intlayer config get`
- `npx intlayer conf get`

##### الوسائط:

- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.
- **`--verbose`**: تفعيل تسجيل مفصل لأغراض التصحيح.

#### دفع التكوين

يقوم أمر `configuration push` برفع التكوين الخاص بك إلى نظام إدارة المحتوى Intlayer والمحرر. هذه الخطوة ضرورية لتمكين استخدام القواميس البعيدة في محرر Intlayer المرئي.

```bash
bash
npx intlayer configuration push
```

##### الأسماء المستعارة:

- `npx intlayer config push`
- `npx intlayer conf push`

##### الوسائط:

- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.
- **`--verbose`**: تفعيل تسجيل مفصل للأخطاء لأغراض التصحيح.

عن طريق دفع التكوين، يتم دمج مشروعك بالكامل مع نظام إدارة المحتوى Intlayer، مما يتيح إدارة القواميس بسلاسة عبر الفرق.

### إدارة الوثائق

توفر أوامر `doc` أدوات لإدارة وترجمة ملفات الوثائق عبر عدة لغات.

#### ترجمة الوثائق

يقوم أمر `doc translate` بترجمة ملفات التوثيق تلقائيًا من لغة أساسية إلى لغات مستهدفة باستخدام خدمات الترجمة بالذكاء الاصطناعي.

```bash
npx intlayer doc translate
```

##### الوسائط:

- **`--doc-pattern [docPattern...]`**: أنماط Glob لمطابقة ملفات التوثيق التي سيتم ترجمتها.
  > مثال: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`**: أنماط Glob لاستبعادها من الترجمة.
  > مثال: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: عدد الملفات التي تتم معالجتها في نفس الوقت للترجمة.
  > مثال: `npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`**: اللغات المستهدفة لترجمة الوثائق إليها.
  > مثال: `npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`**: لغة المصدر التي سيتم الترجمة منها.
  > مثال: `npx intlayer doc translate --base-locale en`
- **`--model [model]`**: نموذج الذكاء الاصطناعي المستخدم للترجمة (مثل `gpt-3.5-turbo`).
- **`--provider [provider]`**: مزود خدمة الذكاء الاصطناعي المستخدم للترجمة.
- **`--temperature [temperature]`**: إعداد درجة الحرارة لنموذج الذكاء الاصطناعي.
- **`--api-key [apiKey]`**: توفير مفتاح API الخاص بك لخدمة الذكاء الاصطناعي.
- **`--custom-prompt [prompt]`**: توفير موجه مخصص لتعليمات الترجمة.
- **`--application-context [applicationContext]`**: توفير سياق إضافي لترجمة الذكاء الاصطناعي.
- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file [envFile]`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.
- **`--verbose`**: تفعيل تسجيل مفصل لأغراض التصحيح.
- **`--custom-instructions [customInstructions]`**: تعليمات مخصصة تضاف إلى الموجه. مفيدة لتطبيق قواعد محددة بخصوص التنسيق، ترجمة الروابط، إلخ.

##### مثال:

```bash
npx intlayer doc translate
  --doc-pattern "docs/en/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> لاحظ أن مسار ملف الإخراج سيتم تحديده عن طريق استبدال الأنماط التالية
>
> - `/{{baseLocale}}/` بـ `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` بواسطة `\{{locale}}\` (ويندوز)
> - `_{{baseLocale}}.` بواسطة `_{{locale}}.`
> - `{{baseLocale}}_` بواسطة `{{locale}}_`
> - `.{{baseLocaleName}}.` بواسطة `.{{localeName}}.`
>
> إذا لم يتم العثور على النمط، ستضيف ملف الإخراج `.{{locale}}` في امتدادات الملف. على سبيل المثال، `./my/file.md` سيتم ترجمته إلى `./my/file.fr.md` للغة الفرنسية.

#### مراجعة الوثائق

يقوم أمر `doc review` بتحليل ملفات الوثائق من حيث الجودة، والاتساق، والكمال عبر اللغات المختلفة.

```bash
npx intlayer doc review
```

##### الوسائط:

يقبل أمر `doc review` نفس الوسائط التي يقبلها `doc translate`، مما يتيح لك مراجعة ملفات الوثائق المحددة وتطبيق فحوصات الجودة.

##### مثال:

```bash
npx intlayer doc review
 --doc-pattern "docs/ar/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

## استخدم أوامر intlayer في ملف `package.json` الخاص بك

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## تصحيح أمر intlayer

### 1. **تأكد من أنك تستخدم أحدث إصدار**

شغل:

```bash
npx intlayer --version                  # إصدار intlayer الحالي للغة المحلية
npx intlayer@latest --version           # أحدث إصدار متوفر من intlayer
```

### 2. **التحقق مما إذا كان الأمر مسجلاً**

يمكنك التحقق باستخدام:

```bash
npx intlayer --help                     # يعرض قائمة الأوامر المتاحة ومعلومات الاستخدام
npx intlayer dictionary build --help    # يعرض قائمة الخيارات المتاحة لأمر معين
```

### 3. **إعادة تشغيل الطرفية**

في بعض الأحيان، يلزم إعادة تشغيل الطرفية للتعرف على الأوامر الجديدة.

### 4. **مسح ذاكرة التخزين المؤقت لـ npx (إذا كنت عالقًا مع إصدار قديم)**

```bash
npx clear-npx-cache
```

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
