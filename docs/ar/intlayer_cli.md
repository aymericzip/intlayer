# Intlayer CLI

## تثبيت الحزمة

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

> إذا كانت حزمة `intlayer` مثبتة بالفعل، فسيتم تثبيت الـ CLI تلقائيًا. يمكنك تخطي هذه الخطوة.

## حزمة intlayer-cli

تعتزم حزمة `intlayer-cli` تحويل [إعلانات intlayer الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md) إلى قواميس.

ستقوم هذه الحزمة بتحويل جميع ملفات intlayer، مثل `src/**/*.content.{ts|js|mjs|cjs|json}`. [انظر كيف تعلن عن ملفات إعلان Intlayer الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

لتفسير قواميس intlayer يمكنك استخدام المفسرات، مثل [react-intlayer](https://www.npmjs.com/package/react-intlayer)، أو [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## دعم ملفات التكوين

تقبل Intlayer تنسيقات متعددة لملفات التكوين:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

لرؤية كيفية تكوين اللغات المتاحة أو أي معلمات أخرى، يرجى الرجوع إلى [وثائق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

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

سيقوم هذا الأمر بالبحث عن ملفات محتوى الإعلان الافتراضية كالتالي: `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. وسيقوم ببناء القواميس في دليل `.intlayer`.

### دفع القواميس

```bash
npx intlayer dictionary push
```

إذا كانت [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md) مثبتة، يمكنك أيضًا دفع القواميس إلى المحرر. سيسمح لك هذا الأمر بجعل القواميس متاحة لـ [المحرر](https://intlayer.org/dashboard). بهذه الطريقة، يمكنك مشاركة قواميسك مع فريقك وتحرير محتواك دون تحرير كود تطبيقك.

##### المعاملات:

- `-d`, `--dictionaries`: معرفات القواميس للسحب. إذا لم يتم تحديدها، فسيتم دفع جميع القواميس.
  > مثال: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: تخطي السؤال الذي يسأل عن حذف أدلة اللغات بمجرد دفع القواميس، وإزالتها. بشكل افتراضي، إذا تم تعريف القاموس محليًا، فسوف يقوم بالكتابة فوق محتوى القواميس البعيدة.
  > مثال: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: تخطي السؤال الذي يسأل عن حذف أدلة اللغات بمجرد دفع القواميس، والاحتفاظ بها. بشكل افتراضي، إذا تم تعريف القاموس محليًا، فسوف يقوم بالكتابة فوق محتوى القواميس البعيدة.
  > مثال: `npx intlayer dictionary push -k`

### سحب القواميس البعيدة

```bash
npx intlayer dictionary pull
```

إذا كانت [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md) مثبتة، يمكنك أيضًا سحب القواميس من المحرر. بهذه الطريقة، يمكنك الكتابة فوق محتوى قواميسك حسب احتياجات تطبيقك.

##### المعاملات:

- `-d, --dictionaries`: معرفات القواميس للسحب. إذا لم يتم تحديدها، فسيتم سحب جميع القواميس.
  > مثال: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : المسار إلى الدليل الذي سيتم حفظ القواميس الجديدة فيه. إذا لم يتم تحديده، فستُحفظ القواميس الجديدة في دليل `./intlayer-dictionaries` الخاص بالمشروع. إذا تم تحديد حقل `filePath` في محتوى قاموسك، فلن تأخذ القواميس بعين الاعتبار هذه المعلمة وسيتم حفظها في الدليل المحدد `filePath`.

##### مثال:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### تدقيق القواميس

```bash
npx intlayer audit
```

هذا الأمر يقوم بتحليل ملفات إعلان المحتوى لديك بحثًا عن مشاكل محتملة مثل الترجمات المفقودة، أو عدم التناسق الهيكلي، أو عدم تطابق الأنواع. إذا وجدت أي مشاكل، فإن **intlayer audit** ستقترح أو تطبق تحديثات للحفاظ على تناسق قواميسك وكمالها.

##### المعاملات:

- **`-f, --files [files...]`**  
  قائمة بملفات إعلان المحتوى المحددة التي سيتم التدقيق عليها. إذا لم يتم توفيرها، فسيتم تدقيق جميع ملفات `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` المكتشفة.

- **`--exclude [excludedGlobs...]`**  
  نمط الغلوب للذين سيتم استثناؤهم من التدقيق (مثل `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  نموذج ChatGPT الذي سيتم استخدامه للتدقيق (مثل `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  تقديم موجه مخصص لتعليمات التدقيق الخاصة بك.

- **`-l, --async-limit [asyncLimit]`**  
  الحد الأقصى لعدد الملفات التي سيتم معالجتها في نفس الوقت.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  تقديم مفتاح API الخاص بك من OpenAI لتجاوز مصادقة OAuth2.

##### مثال:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

سيقوم هذا الأمر بتجاهل أي ملفات تحت `tests/**` واستخدام نموذج `gpt-3.5-turbo` لتدقيق ملفات إعلان المحتوى المكتشفة. إذا تم العثور على أي مشاكل - مثل الترجمات المفقودة - سيتم تصحيحها في المكان، مع الحفاظ على هيكلة الملف الأصلية.

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
