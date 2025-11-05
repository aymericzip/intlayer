---
createdAt: 2024-08-11
updatedAt: 2025-07-11
title: CLI
description: اكتشف كيفية استخدام واجهة الأوامر الخاصة بـ Intlayer لإدارة موقعك متعدد اللغات. اتبع الخطوات في هذه الوثائق عبر الإنترنت لإعداد مشروعك في دقائق قليلة.
keywords:
  - CLI
  - واجهة سطر الأوامر
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 5.5.11
    date: 2025-07-11
    changes: تحديث توثيق معلمات أوامر CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: بدء السجل
---

# واجهة الأوامر Intlayer CLI

---

## جدول المحتويات

<TOC/>

---

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

> إذا كانت حزمة `intlayer` مثبتة بالفعل، يتم تثبيت واجهة الأوامر تلقائيًا. يمكنك تخطي هذه الخطوة.

## حزمة intlayer-cli

تهدف حزمة `intlayer-cli` إلى تحويل [تصريحات intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md) الخاصة بك إلى قواميس.

ستقوم هذه الحزمة بتحويل جميع ملفات intlayer، مثل `src/**/*.content.{ts|js|mjs|cjs|json}`. [انظر كيفية إعلان ملفات تصريحات Intlayer الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

لتفسير قواميس intlayer يمكنك استخدام المفسرات، مثل [react-intlayer](https://www.npmjs.com/package/react-intlayer)، أو [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## دعم ملفات التهيئة

تدعم Intlayer عدة صيغ لملفات التهيئة:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

لمعرفة كيفية تكوين اللغات المتاحة، أو معلمات أخرى، يرجى الرجوع إلى [توثيق التهيئة هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## تشغيل أوامر intlayer

### بناء القواميس

لبناء قواميسك، يمكنك تشغيل الأوامر التالية:

```bash
npx intlayer build
```

أو في وضع المراقبة

```bash
npx intlayer build --watch
```

سيقوم هذا الأمر بالعثور على ملفات محتوى التصريحات الخاصة بك بشكل افتراضي في `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. وبناء القواميس في مجلد `.intlayer`.

##### الأسماء المستعارة:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### دفع القواميس

```bash
bash
npx intlayer dictionary push
```

إذا تم تثبيت [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، يمكنك أيضًا دفع القواميس إلى المحرر. سيسمح هذا الأمر بجعل القواميس متاحة لـ [المحرر](https://intlayer.org/dashboard). بهذه الطريقة، يمكنك مشاركة قواميسك مع فريقك وتحرير المحتوى الخاص بك دون الحاجة إلى تعديل كود التطبيق.

##### الأسماء المستعارة:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### الوسائط:

**خيارات القاموس:**

- **`-d`، `--dictionaries`**: معرفات القواميس التي سيتم دفعها. إذا لم يتم تحديدها، سيتم دفع جميع القواميس.

  > مثال: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**خيارات التكوين:**

- **`--base-dir`**: تحديد الدليل الأساسي للمشروع. لاسترجاع تكوين intlayer، سيبحث الأمر عن ملف `intlayer.config.{ts,js,json,cjs,mjs}` في الدليل الأساسي.

  > مثال: `npx intlayer dictionary push --env-file .env.production.local`

**خيارات متغيرات البيئة:**

- **`--env`**: تحديد البيئة (مثل `development`، `production`). مفيد في حالة استخدام متغيرات البيئة في ملف تكوين intlayer الخاص بك.
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه. مفيد في حالة استخدام متغيرات البيئة في ملف تكوين intlayer الخاص بك.

  > مثال: `npx intlayer dictionary push --env-file .env.production.local`

  > مثال: `npx intlayer dictionary push --env production`

**خيارات الإخراج:**

- **`-r`، `--delete-locale-dictionary`**: تخطي السؤال الذي يطلب حذف مجلدات اللغات بمجرد دفع القواميس، وحذفها. بشكل افتراضي، إذا تم تعريف القاموس محليًا، فسوف يستبدل محتوى القواميس البعيدة.

  > مثال: `npx intlayer dictionary push -r`

  > مثال: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`، `--keep-locale-dictionary`**: تخطي السؤال الذي يطلب حذف مجلدات اللغات بمجرد دفع القواميس، والاحتفاظ بها. بشكل افتراضي، إذا تم تعريف القاموس محليًا، فسوف يستبدل محتوى القواميس البعيدة.

  > مثال: `npx intlayer dictionary push -k`

  > مثال: `npx intlayer dictionary push --keep-locale-dictionary`

**خيارات السجل:**

- **`--verbose`**: تفعيل تسجيل مفصل لأغراض التصحيح.

**خيارات Git:**

- **`--git-diff`**: تشغيل فقط على القواميس التي تتضمن تغييرات من القاعدة (الافتراضية `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).
- **`--git-diff-base`**: تحديد المرجع الأساسي لفارق git (الافتراضي `origin/main`).
- **`--git-diff-current`**: تحديد المرجع الحالي لفارق git (الافتراضي `HEAD`).
- **`--uncommitted`**: تضمين التغييرات غير الملتزم بها.
- **`--unpushed`**: تضمين التغييرات غير المدفوعة.
- **`--untracked`**: تضمين الملفات غير المتتبعة.

  > مثال: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > مثال: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### سحب القواميس البعيدة

```bash
npx intlayer pull
```

إذا كان [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) مثبتًا، يمكنك أيضًا سحب القواميس من المحرر. بهذه الطريقة، يمكنك استبدال محتوى قواميسك حسب حاجة تطبيقك.

##### الأسماء المستعارة:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### الوسائط:

**خيارات القاموس:**

- **`-d, --dictionaries`**: معرفات القواميس التي تريد سحبها. إذا لم يتم تحديدها، سيتم سحب جميع القواميس.

  > مثال: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**خيارات التكوين:**

- **`--base-dir`**: تحديد الدليل الأساسي للمشروع. لاسترجاع تكوين intlayer، سيبحث الأمر عن ملف `intlayer.config.{ts,js,json,cjs,mjs}` في الدليل الأساسي.

  > مثال: `npx intlayer dictionary push --env-file .env.production.local`

**خيارات متغيرات البيئة:**

- **`--env`**: تحديد البيئة (مثلًا، `development`، `production`).
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع. لاسترجاع تكوين intlayer، سيبحث الأمر عن ملف `intlayer.config.{ts,js,json,cjs,mjs}` في الدليل الأساسي.

  > مثال: `npx intlayer dictionary push --env-file .env.production.local`

  > مثال: `npx intlayer dictionary push --env production`

**خيارات الإخراج:**

- **`--new-dictionaries-path`**: المسار إلى الدليل حيث سيتم حفظ القواميس الجديدة. إذا لم يتم تحديده، سيتم حفظ القواميس الجديدة في دليل `./intlayer-dictionaries` الخاص بالمشروع. إذا تم تحديد حقل `filePath` في محتوى القاموس الخاص بك، فلن تأخذ القواميس هذا الوسيط في الاعتبار وسيتم حفظها في الدليل المحدد في `filePath`.

**خيارات السجل:**

- **`--verbose`**: تفعيل تسجيل مفصل لأغراض التصحيح.

##### مثال:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### ملء / تدقيق / ترجمة القواميس

```bash
npx intlayer fill
```

يقوم هذا الأمر بتحليل ملفات إعلان المحتوى الخاصة بك للبحث عن مشكلات محتملة مثل الترجمات المفقودة، التناقضات الهيكلية، أو عدم تطابق الأنواع. إذا وجد أي مشاكل، فإن **intlayer fill** سيقترح أو يطبق تحديثات للحفاظ على قوام وكمال القواميس الخاصة بك.

##### الأسماء المستعارة:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### الوسائط:

**خيارات قائمة الملفات:**

- **`-f, --file [files...]`**: قائمة بملفات إعلان المحتوى المحددة التي سيتم تدقيقها. إذا لم يتم توفيرها، فسيتم تدقيق جميع الملفات المكتشفة التي تطابق النمط `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` بناءً على إعداد ملف التكوين الخاص بك.

  > مثال: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: تصفية القواميس بناءً على المفاتيح. إذا لم يتم توفيرها، سيتم تدقيق جميع القواميس.

  > مثال: `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**: استبعاد القواميس بناءً على المفاتيح. إذا لم يتم توفيرها، سيتم تدقيق جميع القواميس.

  > مثال: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**: تصفية القواميس بناءً على نمط glob لمسارات الملفات.

  > مثال: `npx intlayer dictionary fill --path-filter "src/home/**"`

**خيارات إخراج الإدخال:**

- **`--source-locale [sourceLocale]`**: لغة المصدر للترجمة منها. إذا لم يتم تحديدها، سيتم استخدام اللغة الافتراضية من إعداداتك.

- **`--output-locales [outputLocales...]`**: اللغات المستهدفة للترجمة إليها. إذا لم يتم تحديدها، سيتم استخدام جميع اللغات من تكوينك باستثناء لغة المصدر.

- **`--mode [mode]`**: وضع الترجمة: 'كامل'، 'مراجعة'، أو 'الناقص فقط'. الوضع الافتراضي هو 'الناقص فقط'.

**خيارات Git:**

- **`--git-diff`**: تشغيل فقط على القواميس التي تتضمن تغييرات من القاعدة (الافتراضية `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).
- **`--git-diff-base`**: تحديد المرجع الأساسي لفارق git (الافتراضي `origin/main`).
- **`--git-diff-current`**: تحديد المرجع الحالي لفارق git (الافتراضي: `HEAD`).
- **`--uncommitted`**: تضمين التغييرات غير الملتزمة.
- **`--unpushed`**: تضمين التغييرات غير المدفوعة.
- **`--untracked`**: تضمين الملفات غير المتتبعة.

> مثال: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`
> مثال: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**خيارات الذكاء الاصطناعي:**

- **`--model [model]`**: نموذج الذكاء الاصطناعي المستخدم للترجمة (مثلًا، `gpt-3.5-turbo`).
- **`--provider [provider]`**: مزود الذكاء الاصطناعي المستخدم للترجمة.
- **`--temperature [temperature]`**: إعداد درجة الحرارة لنموذج الذكاء الاصطناعي.
- **`--api-key [apiKey]`**: توفير مفتاح API خاص بك لخدمة الذكاء الاصطناعي.
- **`--custom-prompt [prompt]`**: توفير موجه مخصص لتعليمات الترجمة الخاصة بك.
- **`--application-context [applicationContext]`**: توفير سياق إضافي لترجمة الذكاء الاصطناعي.

  > مثال: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "تطبيقي هو متجر للقطط"`

**خيارات متغيرات البيئة:**

- **`--env`**: تحديد البيئة (مثل: `development`، `production`).
- **`--env-file [envFile]`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.

  > مثال: `npx intlayer fill --env-file .env.production.local`

  > مثال: `npx intlayer fill --env production`

**خيارات التكوين:**

- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.

  > مثال: `npx intlayer fill --base-dir ./src`

**خيارات السجل:**

- **`--verbose`**: تفعيل تسجيل مفصل لأغراض التصحيح.

##### مثال:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

سيقوم هذا الأمر بترجمة المحتوى من الإنجليزية إلى الفرنسية والإسبانية لجميع ملفات إعلان المحتوى في دليل `src/home/` باستخدام نموذج GPT-3.5 Turbo.

### إدارة التكوين

#### الحصول على التكوين

يقوم أمر `configuration get` باسترجاع التكوين الحالي لـ Intlayer، وخاصة إعدادات اللغة. هذا مفيد للتحقق من إعداداتك.

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
- **`--verbose`**: تمكين تسجيل الدخول التفصيلي لأغراض التصحيح.

#### دفع التكوين

أمر `configuration push` يقوم بتحميل تكوينك إلى نظام إدارة المحتوى Intlayer والمحرر. هذه الخطوة ضرورية لتمكين استخدام القواميس البعيدة في محرر Intlayer المرئي.

```bash
npx intlayer configuration push
```

##### الأسماء المستعارة:

- `npx intlayer config push`
- `npx intlayer conf push`

##### الوسائط:

- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.
- **`--verbose`**: تمكين تسجيل الدخول التفصيلي لأغراض التصحيح.

من خلال دفع التكوين، يتم دمج مشروعك بالكامل مع نظام إدارة المحتوى Intlayer، مما يتيح إدارة القواميس بسلاسة عبر الفرق.

### إدارة الوثائق

توفر أوامر `doc` أدوات لإدارة وترجمة ملفات الوثائق عبر عدة لغات.

#### ترجمة الوثائق

يقوم الأمر `doc translate` بترجمة ملفات الوثائق تلقائيًا من لغة أساسية إلى لغات مستهدفة باستخدام خدمات الترجمة بالذكاء الاصطناعي.

```bash
npx intlayer doc translate
```

##### الوسائط:

**خيارات قائمة الملفات:**

- **`--doc-pattern [docPattern...]`**: أنماط glob لمطابقة ملفات الوثائق التي سيتم ترجمتها.

  > مثال: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: أنماط Glob لاستبعادها من الترجمة.

  > مثال: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: تخطى الملف إذا تم تعديله قبل الوقت المحدد.
  - يمكن أن يكون وقتًا مطلقًا مثل "2025-12-05" (سلسلة نصية أو تاريخ)
  - يمكن أن يكون وقتًا نسبيًا بالميلي ثانية `1 * 60 * 60 * 1000` (ساعة واحدة)
  - هذا الخيار يتحقق من وقت تحديث الملف باستخدام طريقة `fs.stat`. لذلك قد يتأثر بأدوات مثل Git أو أدوات أخرى تعدل الملف.

  > مثال: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: تخطى الملف إذا تم تعديله خلال الوقت المحدد.
  - يمكن أن يكون وقتًا مطلقًا مثل "2025-12-05" (نص أو تاريخ)
  - يمكن أن يكون وقتًا نسبيًا بالميلي ثانية `1 * 60 * 60 * 1000` (ساعة واحدة)
  - تقوم هذه الخيار بفحص وقت تحديث الملف باستخدام طريقة `fs.stat`. لذلك قد يتأثر بأدوات مثل Git أو أدوات أخرى تقوم بتعديل الملف.

  > مثال: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**خيارات إخراج الإدخال:**

- **`--locales [locales...]`**: اللغات المستهدفة لترجمة الوثائق إليها.

  > مثال: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: لغة المصدر للترجمة منها.

  > مثال: `npx intlayer doc translate --base-locale en`

**خيارات معالجة الملفات:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: عدد الملفات التي سيتم معالجتها في وقت واحد للترجمة.

  > مثال: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**خيارات الذكاء الاصطناعي:**

- **`--model [model]`**: نموذج الذكاء الاصطناعي المستخدم للترجمة (مثل `gpt-3.5-turbo`).
- **`--provider [provider]`**: مزود خدمة الذكاء الاصطناعي المستخدم للترجمة.
- **`--temperature [temperature]`**: إعداد درجة الحرارة لنموذج الذكاء الاصطناعي.
- **`--api-key [apiKey]`**: توفير مفتاح API خاص بك لخدمة الذكاء الاصطناعي.
- **`--application-context [applicationContext]`**: توفير سياق إضافي لترجمة الذكاء الاصطناعي.
- **`--custom-prompt [prompt]`**: تخصيص الموجه الأساسي المستخدم للترجمة. (ملاحظة: في معظم الحالات، يُنصح باستخدام خيار `--custom-instructions` بدلاً من ذلك لأنه يوفر تحكمًا أفضل في سلوك الترجمة.)

  > مثال: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "تطبيقي هو متجر للقطط"`

**خيارات متغيرات البيئة:**

- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file [envFile]`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.

  > مثال: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**خيارات السجل:**

- **`--verbose`**: تمكين تسجيل الدخول التفصيلي لأغراض التصحيح.

  > مثال: `npx intlayer doc translate --verbose`

**خيارات التعليمات المخصصة:**

- **`--custom-instructions [customInstructions]`**: تعليمات مخصصة تضاف إلى الموجه. مفيدة لتطبيق قواعد محددة تتعلق بالتنسيق، ترجمة الروابط، إلخ.
  - يمكن أن تكون وقتًا مطلقًا مثل "2025-12-05" (نص أو تاريخ)
  - يمكن أن تكون وقتًا نسبيًا بالمللي ثانية `1 * 60 * 60 * 1000` (ساعة واحدة)
  - تقوم هذه الخيار بفحص وقت تحديث الملف باستخدام طريقة `fs.stat`. لذلك قد يتأثر بأدوات مثل Git أو أدوات أخرى تعدل الملف.

  > مثال: `npx intlayer doc translate --custom-instructions "تجنب ترجمة الروابط، واحتفظ بتنسيق الماركداون"`

  > مثال: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**خيارات Git:**

- **`--git-diff`**: تشغيل فقط على القواميس التي تتضمن تغييرات من القاعدة (الافتراضية `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).
- **`--git-diff-base`**: تحديد المرجع الأساسي لمقارنة git diff (الافتراضي `origin/main`).
- **`--git-diff-current`**: تحديد المرجع الحالي لمقارنة git diff (الافتراضي: `HEAD`).
- **`--uncommitted`**: تضمين التغييرات غير الملتزمة.
- **`--unpushed`**: تضمين التغييرات غير المدفوعة.
- **`--untracked`**: تضمين الملفات غير المتتبعة.

  > مثال: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > مثال: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> لاحظ أن مسار ملف الإخراج سيتم تحديده عن طريق استبدال الأنماط التالية
>
> - `/{{baseLocale}}/` إلى `/{{locale}}/` (يونكس)
> - `\{{baseLocale}}\` إلى `\{{locale}}\` (ويندوز)
> - `_{{baseLocale}}.` إلى `_{{locale}}.`
> - `{{baseLocale}}_` إلى `{{locale}}_`
> - `.{{baseLocaleName}}.` إلى `.{{localeName}}.`
>
> إذا لم يتم العثور على النمط، فسيتم إضافة `.{{locale}}` إلى امتدادات الملف في ملف الإخراج. على سبيل المثال، `./my/file.md` سيتم ترجمته إلى `./my/file.fr.md` للغة الفرنسية.

#### مراجعة الوثائق

يقوم الأمر `doc review` بتحليل ملفات الوثائق من حيث الجودة، الاتساق، والكمال عبر اللغات المختلفة.

```bash
npx intlayer doc review
```

يمكن استخدامه لمراجعة الملفات التي تم ترجمتها بالفعل، وللتحقق مما إذا كانت الترجمة صحيحة.

في معظم الحالات،

- يُفضّل استخدام أمر `doc translate` عندما لا تتوفر نسخة مترجمة من هذا الملف.
- يُفضّل استخدام أمر `doc review` عندما تكون النسخة المترجمة من هذا الملف موجودة بالفعل.

> لاحظ أن عملية المراجعة تستهلك عددًا أكبر من رموز الإدخال مقارنة بعملية الترجمة لمراجعة الملف بالكامل. ومع ذلك، فإن عملية المراجعة ستقوم بتحسين الأجزاء التي يجب مراجعتها، وستتخطى الأجزاء التي لم تتغير.

##### الوسائط:

يقبل أمر `doc review` نفس الوسائط التي يقبلها أمر `doc translate`، مما يتيح لك مراجعة ملفات التوثيق المحددة وتطبيق فحوصات الجودة.

إذا قمت بتفعيل أحد خيارات git، فإن الأمر سيقوم بمراجعة الجزء من الملفات الذي يتم تغييره فقط. سيقوم السكربت بمعالجة الملف بتقسيمه إلى أجزاء ومراجعة كل جزء على حدة. إذا لم يكن هناك تغييرات في الجزء، فسيتخطى السكربت هذا الجزء لتسريع عملية المراجعة وتقليل تكلفة استخدام واجهة برمجة التطبيقات لمزود الذكاء الاصطناعي.

## استخدام أوامر intlayer في ملف `package.json` الخاص بك

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

## SDK الخاص بواجهة الأوامر CLI

SDK الخاص بواجهة الأوامر (CLI) هو مكتبة تتيح لك استخدام واجهة أوامر Intlayer في كودك الخاص.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
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

## تصحيح أمر intlayer

### 1. **تأكد من أنك تستخدم أحدث إصدار**

شغّل:

```bash
npx intlayer --version                  # إصدار intlayer المحلي الحالي
npx intlayer@latest --version           # أحدث إصدار intlayer متوفر
```

### 2. **تحقق مما إذا كان الأمر مسجلاً**

يمكنك التحقق باستخدام:

```bash
npx intlayer --help                     # يعرض قائمة الأوامر المتاحة ومعلومات الاستخدام
npx intlayer dictionary build --help    # يعرض قائمة الخيارات المتاحة لأمر معين
```

### 3. **أعد تشغيل الطرفية**

في بعض الأحيان، يكون من الضروري إعادة تشغيل الطرفية للتعرف على الأوامر الجديدة.

### 4. **مسح ذاكرة التخزين المؤقت لـ npx (إذا كنت عالقًا مع إصدار أقدم)**

```bash
npx clear-npx-cache
```
