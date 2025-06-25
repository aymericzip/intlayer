---
docName: dictionary__file
url: https://intlayer.org/doc/concept/content/file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: ملف
description: تعلم كيفية تضمين الملفات الخارجية في قاموس المحتوى الخاص بك باستخدام وظيفة `file`. توضح هذه الوثيقة كيفية قيام Intlayer بربط محتوى الملفات وإدارته ديناميكيًا.
keywords:
  - ملف
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# محتوى الملف / تضمين الملفات في Intlayer

## كيفية عمل تضمين الملفات

في Intlayer، تتيح وظيفة `file` تضمين محتوى الملفات الخارجية في القاموس. يضمن هذا النهج أن يتعرف Intlayer على ملف المصدر، مما يتيح التكامل السلس مع محرر Intlayer المرئي ونظام إدارة المحتوى (CMS). على عكس طرق القراءة المباشرة للملفات باستخدام `import` أو `require` أو `fs`، فإن استخدام `file` يربط الملف بالقاموس، مما يسمح لـ Intlayer بتتبع وتحديث المحتوى ديناميكيًا عند تحرير الملف.

## إعداد محتوى الملف

لتضمين محتوى الملف في مشروع Intlayer الخاص بك، استخدم وظيفة `file` في وحدة المحتوى. أدناه أمثلة توضح تطبيقات مختلفة.

### تطبيق TypeScript

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

### تطبيق ECMAScript Module (ESM)

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

### تطبيق CommonJS

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
```

### إعداد JSON

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## استخدام محتوى الملف في React Intlayer

لاستخدام محتوى الملف المضمن في مكون React، قم باستيراد واستخدام الخطاف `useIntlayer` من حزمة `react-intlayer`. يسترجع هذا المحتوى من المفتاح المحدد ويسمح بعرضه ديناميكيًا.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## مثال Markdown متعدد اللغات

لدعم ملفات Markdown القابلة للتحرير متعددة اللغات، يمكنك استخدام `file` مع `t()` و `md()` لتعريف إصدارات مختلفة من ملفات محتوى Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        ar: file("src/components/test.ar.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        ar: file("src/components/test.ar.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        ar: file("src/components/test.ar.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

يتيح هذا الإعداد استرجاع المحتوى ديناميكيًا بناءً على تفضيل لغة المستخدم. عند استخدامه في محرر Intlayer المرئي أو CMS، سيتعرف النظام على أن المحتوى يأتي من ملفات Markdown المحددة ويضمن بقاءها قابلة للتحرير.

## كيفية تعامل Intlayer مع محتوى الملفات

تعتمد وظيفة `file` على وحدة `fs` في Node.js لقراءة محتوى الملف المحدد وإدراجه في القاموس. عند استخدامها مع محرر Intlayer المرئي أو CMS، يمكن لـ Intlayer تتبع العلاقة بين القاموس والملف. يتيح ذلك لـ Intlayer:

- التعرف على أن المحتوى يأتي من ملف معين.
- تحديث محتوى القاموس تلقائيًا عند تحرير الملف المرتبط.
- ضمان التزامن بين الملف والقاموس، مع الحفاظ على سلامة المحتوى.

## موارد إضافية

لمزيد من التفاصيل حول إعداد واستخدام تضمين الملفات في Intlayer، راجع الموارد التالية:

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)
- [وثائق محتوى Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)
- [وثائق محتوى الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md)

تقدم هذه الموارد مزيدًا من الرؤى حول تضمين الملفات، إدارة المحتوى، وتكامل Intlayer مع مختلف الأطر.
