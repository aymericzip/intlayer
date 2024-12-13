# Intlayer CLI

## تثبيت الحزمة

قم بتثبيت الحزم الضرورية باستخدام npm:

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> ملاحظة: إذا كانت حزمة `intlayer` مثبتة مسبقاً، سيتم تثبيت واجهة الأوامر تلقائياً. يمكنك تخطي هذه الخطوة.

## حزمة intlayer-cli

تهدف حزمة `intlayer-cli` إلى تحويل إعلانات [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme.md) الخاصة بك إلى قواميس.

ستقوم هذه الحزمة بتحويل جميع ملفات intlayer، مثل `src/**/*.content.{ts|js|mjs|cjs|json}`. [انظر كيف يمكنك إعلان ملفات إعلان Intlayer الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme.md).

لتفسير قواميس intlayer يمكنك استخدام مفسرات، مثل [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/readme.md)، أو [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/readme.md)

## دعم ملف التكوين

تقبل Intlayer تنسيقات متعددة لملفات التكوين:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

لرؤية كيفية تكوين اللغات المتاحة، أو معلمات أخرى، يرجى الرجوع إلى [وثائق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## تشغيل أوامر intlayer

### بناء القواميس

لبناء قواميسك، يمكنك تشغيل الأوامر:

```bash
npx intlayer build
```

أو في وضع المراقبة

```bash
npx intlayer build --watch
```

ستجد هذه الأوامر ملفات محتوى الإعلانات بشكل افتراضي مثل `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. وستقوم ببناء القواميس في دليل `.intlayer`.

### دفع القواميس

```bash
npx intlayer push
```

إذا كانت [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/intlayer_editor.md) مثبتة، يمكنك أيضاً دفع القواميس إلى المحرر. ستتيح لك هذه الأوامر جعل القواميس متاحة للمحرر على [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content). بهذه الطريقة، يمكنك مشاركة قواميسك مع فريقك وتحرير المحتوى الخاص بك دون تعديل كود تطبيقك.

##### الوسائط:

- `-d`, `--dictionaries`: معرفات القواميس التي سيتم سحبها. إذا لم يتم تحديدها، سيتم دفع جميع القواميس.
  > مثال: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: تخطي السؤال الذي يسأل عن حذف أدلة اللغات بعد دفع القواميس، وإزالتها. بشكل افتراضي، إذا كانت القاموس معرّفة محلياً، فستقوم باستبدال محتوى القواميس البعيدة.
  > مثال: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: تخطي السؤال الذي يسأل عن حذف أدلة اللغات بعد دفع القواميس، والاحتفاظ بها. بشكل افتراضي، إذا كانت القاموس معرّفة محلياً، فستقوم باستبدال محتوى القواميس البعيدة.
  > مثال: `npx intlayer push -k`

### سحب القواميس البعيدة

```bash
npx intlayer pull
```

إذا كانت [محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/intlayer_editor.md) مثبتة، يمكنك أيضاً سحب القواميس من المحرر. بهذه الطريقة، يمكنك استبدال محتوى قواميسك بما تحتاجه تطبيقك.

##### الوسائط:

- `-d, --dictionaries`: معرفات القواميس التي سيتم سحبها. إذا لم يتم تحديدها، سيتم سحب جميع القواميس.
  > مثال: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: مسار الدليل حيث ستُحفظ القواميس الجديدة. إذا لم يتم تحديدها، ستُحفظ القواميس الجديدة في دليل `./intlayer-dictionaries` الخاص بالمشروع. إذا تم تحديد حقل `filePath` في محتوى قواميسك، فلن تأخذ القواميس هذا الوسيط بعين الاعتبار وستُحفظ في الدليل المحدد `filePath`.
  > مثال: `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## استخدام أوامر intlayer في `package.json`:

```json
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
