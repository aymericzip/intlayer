# Intlayer CLI

## تثبيت الحزمة

قم بتثبيت الحزم الضرورية باستخدام npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> إذا كانت حزمة `intlayer` مثبتة بالفعل، فسيتم تثبيت CLI تلقائيًا. يمكنك تخطي هذه الخطوة.

## حزمة intlayer-cli

تهدف حزمة `intlayer-cli` إلى تحويل [تصريحات intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md) إلى قواميس.

ستقوم هذه الحزمة بتحويل جميع ملفات intlayer، مثل `src/**/*.content.{ts|js|mjs|cjs|json}`. [اطلع على كيفية إعلان ملفات تصريح Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

لتفسير قواميس intlayer يمكنك استخدام المفسرين، مثل [react-intlayer](https://www.npmjs.com/package/react-intlayer)، أو [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## دعم ملف التكوين

يدعم Intlayer تنسيقات ملفات التكوين المتعددة:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

لرؤية كيفية تكوين اللغات المتاحة أو معلمات أخرى، راجع [وثائق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## تشغيل أوامر intlayer

### بناء القواميس

لبناء القواميس الخاصة بك، يمكنك تشغيل الأوامر:

```bash
npx intlayer dictionaries build
```

أو في وضع المراقبة

```bash
npx intlayer dictionaries build --watch
```

سيقوم هذا الأمر بالعثور على ملفات محتوى التصريح الخاصة بك افتراضيًا كـ `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. وبناء القواميس في دليل `.intlayer`.

### دفع القواميس

```bash
npx intlayer dictionary push
```

إذا كان [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) مثبتًا، يمكنك أيضًا دفع القواميس إلى المحرر. سيسمح هذا الأمر بجعل القواميس متاحة لـ [المحرر](https://intlayer.org/dashboard). بهذه الطريقة، يمكنك مشاركة القواميس مع فريقك وتحرير المحتوى الخاص بك دون تحرير كود التطبيق الخاص بك.

##### الوسائط:

- `-d`, `--dictionaries`: معرفات القواميس المراد دفعها. إذا لم يتم تحديدها، سيتم دفع جميع القواميس.
  > مثال: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: تخطي السؤال الذي يطلب حذف مجلدات اللغات بعد دفع القواميس، وحذفها. افتراضياً، إذا كان القاموس معرفاً محلياً، فسيقوم بكتابة محتوى القواميس البعيدة.
  > مثال: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: تخطي السؤال الذي يطلب حذف مجلدات اللغات بعد دفع القواميس، والاحتفاظ بها. افتراضياً، إذا كان القاموس معرفاً محلياً، فسيقوم بكتابة محتوى القواميس البعيدة.
  > مثال: `npx intlayer dictionary push -k`
- `--env`: تحديد البيئة (مثل `development`، `production`).
- `--env-file`: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- `--base-dir`: تحديد المجلد الأساسي للمشروع.
- `--verbose`: تفعيل التسجيل المفصل للتصحيح.
- `--git-diff`: تشغيل فقط على القواميس التي بها تغييرات غير مدفوعة.
- `--git-diff-base`: تحديد المرجع الأساسي لمقارنة git.
- `--git-diff-current`: تحديد المرجع الحالي لمقارنة git.
- `--uncommitted`: تضمين التغييرات غير الملتزمة.
- `--unpushed`: تضمين التغييرات غير المدفوعة.
- `--untracked`: تضمين الملفات غير المتعقبة.

### سحب القواميس البعيدة

```bash
npx intlayer dictionary pull
```

إذا كان [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) مثبتًا، يمكنك أيضًا سحب القواميس من المحرر. بهذه الطريقة، يمكنك الكتابة فوق محتوى القواميس الخاصة بك لتلبية احتياجات تطبيقك.

##### الوسائط:

- `-d, --dictionaries`: معرفات القواميس المراد سحبها. إذا لم يتم تحديدها، سيتم سحب جميع القواميس.
  > مثال: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: المسار إلى المجلد حيث سيتم حفظ القواميس الجديدة. إذا لم يتم تحديده، سيتم حفظ القواميس الجديدة في مجلد `./intlayer-dictionaries` للمشروع. إذا تم تحديد حقل `filePath` في محتوى القاموس الخاص بك، فلن تأخذ القواميس هذا الوسيط بعين الاعتبار وسيتم حفظها في مجلد `filePath` المحدد.
- `--env`: تحديد البيئة (مثل `development`، `production`).
- `--env-file`: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- `--base-dir`: تحديد المجلد الأساسي للمشروع.
- `--verbose`: تفعيل التسجيل المفصل للتصحيح.

### تدقيق القواميس

```bash
npx intlayer audit
```

يقوم هذا الأمر بتحليل ملفات تصريح المحتوى الخاصة بك للبحث عن مشكلات محتملة مثل الترجمات المفقودة أو التناقضات الهيكلية أو عدم تطابق الأنواع. إذا وجد أي مشاكل، سيقترح أو يطبق تحديثات للحفاظ على تناسق القواميس واكتمالها.

##### الوسائط:

- **`-f, --files [files...]`**  
  قائمة بملفات إعلان المحتوى المحددة للتدقيق. إذا لم يتم توفيرها، سيتم تدقيق جميع ملفات `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` المكتشفة.

- **`--exclude [excludedGlobs...]`**  
  نمط globs لاستثناء من التدقيق (مثل `--exclude "src/test/**"`).

- **`--source-locale [sourceLocale]`**  
  اللغة المصدر للترجمة منها. إذا لم يتم تحديدها، سيتم استخدام اللغة الافتراضية من التكوين الخاص بك.

- **`--output-locales [outputLocales...]`**  
  اللغات المستهدفة للترجمة إليها. إذا لم يتم تحديدها، سيتم استخدام جميع اللغات من التكوين الخاص بك باستثناء اللغة المصدر.

- **`--mode [mode]`**  
  وضع الترجمة: 'complete'، 'review'، أو 'missing-only'. الافتراضي هو 'missing-only'.

- **`--git-diff`**  
  تشغيل فقط على القواميس التي بها تغييرات غير مدفوعة في مستودع git.

- **`--git-diff-base`**  
  تحديد المرجع الأساسي لمقارنة git.

- **`--git-diff-current`**  
  تحديد المرجع الحالي لمقارنة git.

- **`--uncommitted`**  
  تضمين التغييرات غير الملتزمة.

- **`--unpushed`**  
  تضمين التغييرات غير المدفوعة.

- **`--untracked`**  
  تضمين الملفات غير المتعقبة.

- **`--keys [keys...]`**  
  تصفية القواميس بناءً على المفاتيح المحددة.

- **`--excluded-keys [excludedKeys...]`**  
  استبعاد القواميس بناءً على المفاتيح المحددة.

- **`--path-filter [pathFilters...]`**  
  تصفية القواميس بناءً على نمط glob لمسارات الملفات.

- **`--model [model]`**  
  نموذج الذكاء الاصطناعي المستخدم للترجمة (مثل `gpt-3.5-turbo`).

- **`--provider [provider]`**  
  مزود الذكاء الاصطناعي المستخدم للترجمة.

- **`--temperature [temperature]`**  
  إعداد درجة الحرارة لنموذج الذكاء الاصطناعي.

- **`--api-key [apiKey]`**  
  توفير مفتاح API الخاص بك لخدمة الذكاء الاصطناعي.

- **`--custom-prompt [prompt]`**  
  توفير توجيه مخصص لتعليمات الترجمة الخاصة بك.

- **`--application-context [applicationContext]`**  
  توفير سياق إضافي لترجمة الذكاء الاصطناعي.

- **`--env`**  
  تحديد البيئة (مثل `development`، `production`).

- **`--env-file [envFile]`**  
  توفير ملف بيئة مخصص لتحميل المتغيرات منه.

- **`--base-dir`**  
  تحديد المجلد الأساسي للمشروع.

- **`--verbose`**  
  تفعيل التسجيل المفصل للتصحيح.

### إدارة التكوين

#### الحصول على التكوين

يقوم أمر `get configuration` باسترداد التكوين الحالي لـ Intlayer، خاصة إعدادات اللغة. هذا مفيد للتحقق من الإعداد الخاص بك.

```bash
npx intlayer config get
```

##### الوسائط:

- **`--env`**: تحديد البيئة (مثلًا، `development`, `production`).
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--verbose`**: تمكين تسجيل مفصل لتصحيح الأخطاء.

#### دفع التكوين

يقوم أمر `push configuration` بتحميل التكوين الخاص بك إلى CMS ومحرر Intlayer. هذه الخطوة ضرورية لتمكين استخدام القواميس البعيدة في محرر Intlayer المرئي.

```bash
npx intlayer config push
```

##### الوسائط:

- **`--env`**: تحديد البيئة (مثلًا، `development`, `production`).
- **`--env-file`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--verbose`**: تمكين تسجيل مفصل لتصحيح الأخطاء.

من خلال دفع التكوين، يتم دمج مشروعك بالكامل مع CMS الخاص بـ Intlayer، مما يتيح إدارة سلسة للقواميس عبر الفرق.

## استخدام أوامر intlayer في `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```

## تصحيح أمر intlayer

### 1. **تأكد من استخدام أحدث إصدار**

قم بتنفيذ:

```bash
npx intlayer --version                  # إصدار intlayer المحلي الحالي
npx intlayer@latest --version          # أحدث إصدار من intlayer
```

### 2. **تحقق مما إذا كان الأمر مسجلاً**

يمكنك التحقق باستخدام:

```bash
npx intlayer --help      # يعرض قائمة بالأوامر المتاحة ومعلومات الاستخدام
man npx intlayer         # يعرض صفحة الدليل للأمر، إذا كانت متاحة
```

### 3. **أعد تشغيل الطرفية**

أحياناً يكون من الضروري إعادة تشغيل الطرفية للتعرف على الأوامر الجديدة.

### 4. **امسح ذاكرة التخزين المؤقت لـ npx (إذا كنت عالقاً في إصدار قديم)**

```bash
npx clear-npx-cache
```
