# Intlayer CLI

## تثبيت الحزمة

قم بتثبيت الحزم الضرورية باستخدام npm:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
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
npx intlayer build
```

أو في وضع المراقبة

```bash
npx intlayer build --watch
```

سيقوم هذا الأمر بالعثور على ملفات محتوى التصريح الخاصة بك افتراضيًا كـ `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. وبناء القواميس في دليل `.intlayer`.

### دفع القواميس

```bash
npx intlayer dictionary push
```

إذا كان [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) مثبتًا، يمكنك أيضًا دفع القواميس إلى المحرر. سيسمح هذا الأمر بجعل القواميس متاحة لـ [المحرر](https://intlayer.org/dashboard). بهذه الطريقة، يمكنك مشاركة القواميس مع فريقك وتحرير المحتوى الخاص بك دون تحرير كود التطبيق الخاص بك.

##### الوسائط:

- `-d`, `--dictionaries`: معرفات القواميس التي سيتم سحبها. إذا لم يتم تحديدها، سيتم دفع جميع القواميس.
  > مثال: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: تخطي السؤال الذي يسأل عن حذف أدلة اللغات بمجرد دفع القواميس، وإزالتها. افتراضيًا، إذا تم تعريف القاموس محليًا، فسيتم الكتابة فوق محتوى القواميس البعيدة.
  > مثال: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: تخطي السؤال الذي يسأل عن حذف أدلة اللغات بمجرد دفع القواميس، والاحتفاظ بها. افتراضيًا، إذا تم تعريف القاموس محليًا، فسيتم الكتابة فوق محتوى القواميس البعيدة.
  > مثال: `npx intlayer dictionary push -k`

### سحب القواميس البعيدة

```bash
npx intlayer dictionary pull
```

إذا كان [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) مثبتًا، يمكنك أيضًا سحب القواميس من المحرر. بهذه الطريقة، يمكنك الكتابة فوق محتوى القواميس الخاصة بك لتلبية احتياجات تطبيقك.

##### الوسائط:

- `-d, --dictionaries`: معرفات القواميس التي سيتم سحبها. إذا لم يتم تحديدها، سيتم سحب جميع القواميس.
  > مثال: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : المسار إلى الدليل حيث سيتم حفظ القواميس الجديدة. إذا لم يتم تحديده، سيتم حفظ القواميس الجديدة في دليل `./intlayer-dictionaries` الخاص بالمشروع. إذا تم تحديد حقل `filePath` في محتوى القاموس الخاص بك، فلن يعتبر القواميس هذه الوسيطة وسيتم حفظها في دليل `filePath` المحدد.

##### مثال:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### تدقيق القواميس

```bash
npx intlayer audit
```

يقوم هذا الأمر بتحليل ملفات تصريح المحتوى الخاصة بك للبحث عن مشكلات محتملة مثل الترجمات المفقودة أو التناقضات الهيكلية أو عدم تطابق الأنواع. إذا وجد أي مشاكل، سيقترح أو يطبق تحديثات للحفاظ على تناسق القواميس واكتمالها.

##### الوسائط:

- **`-f, --files [files...]`**  
  قائمة بملفات تصريح المحتوى المحددة للتدقيق. إذا لم يتم توفيرها، سيتم تدقيق جميع الملفات المكتشفة `*.content.{ts,js,mjs,cjs,tsx,jsx,json}`.

- **`--exclude [excludedGlobs...]`**  
  نمط Globs لاستبعاده من التدقيق (مثلًا `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  نموذج ChatGPT لاستخدامه في التدقيق (مثلًا، `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  توفير موجه مخصص لتعليمات التدقيق الخاصة بك.

- **`-l, --async-limit [asyncLimit]`**  
  الحد الأقصى لعدد الملفات التي يتم معالجتها بالتوازي.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  توفير مفتاح API الخاص بـ OpenAI لتجاوز مصادقة OAuth2.

##### مثال:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

سيقوم هذا الأمر بتجاهل أي ملفات تحت `tests/**` واستخدام نموذج `gpt-3.5-turbo` لتدقيق ملفات تصريح المحتوى المكتشفة. إذا تم العثور على أي مشكلات—مثل الترجمات المفقودة—سيتم تصحيحها في مكانها، مع الحفاظ على بنية الملف الأصلية.

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
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
