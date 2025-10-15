---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: ملف
description: تعلّم كيفية تضمين ملفات خارجية في قاموس المحتوى الخاص بك باستخدام دالة `file`. تشرح هذه الوثائق كيف يربط Intlayer محتوى الملفات ويديره بشكل ديناميكي.
keywords:
  - ملف
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: بداية التاريخ
---

# محتوى الملف / تضمين الملفات في Intlayer

## كيف يعمل تضمين الملفات

في Intlayer، تتيح دالة `file` تضمين محتوى ملف خارجي داخل قاموس. تضمن هذه الطريقة أن يتعرف Intlayer على الملف المصدر، مما يمكّن من التكامل السلس مع محرر Intlayer المرئي ونظام إدارة المحتوى (CMS). على عكس طرق قراءة الملفات المباشرة مثل `import` أو `require` أو `fs`، فإن استخدام `file` يربط الملف بالقاموس، مما يسمح لـ Intlayer بتتبع المحتوى وتحديثه ديناميكيًا عند تعديل الملف.

## إعداد محتوى الملف

لتضمين محتوى ملف في مشروع Intlayer الخاص بك، استخدم دالة `file` في وحدة المحتوى. فيما يلي أمثلة توضح تطبيقات مختلفة.

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

لاستخدام محتوى ملف مضمن في مكون React، قم باستيراد واستخدام الخطاف `useIntlayer` من حزمة `react-intlayer`. هذا يسترجع المحتوى من المفتاح المحدد ويسمح بعرضه بشكل ديناميكي.

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

// مكون لعرض محتوى الملف باستخدام React و esm
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

// مكون لعرض محتوى الملف باستخدام React و commonjs
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

## مثال على ملفات Markdown متعددة اللغات

لدعم ملفات Markdown القابلة للتحرير متعددة اللغات، يمكنك استخدام `file` مع `t()` و `md()` لتعريف نسخ مختلفة من ملف محتوى Markdown بلغات متعددة.

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
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

يتيح هذا الإعداد استرجاع المحتوى بشكل ديناميكي بناءً على تفضيل لغة المستخدم. عند استخدامه في محرر Intlayer المرئي أو نظام إدارة المحتوى (CMS)، سيتعرف النظام على أن المحتوى يأتي من ملفات Markdown المحددة ويضمن بقاؤها قابلة للتحرير.

## كيف يتعامل Intlayer مع محتوى الملفات

تعتمد دالة `file` على وحدة `fs` الخاصة بـ Node.js لقراءة محتوى الملف المحدد وإدراجه في القاموس. عند استخدامها بالتزامن مع محرر Intlayer المرئي أو نظام إدارة المحتوى، يمكن لـ Intlayer تتبع العلاقة بين القاموس والملف. هذا يسمح لـ Intlayer بـ:

- التعرف على أن المحتوى أصله من ملف محدد.
- تحديث محتوى القاموس تلقائيًا عند تعديل الملف المرتبط.
- ضمان التزامن بين الملف والقاموس، مع الحفاظ على سلامة المحتوى.

## موارد إضافية

لمزيد من التفاصيل حول تكوين واستخدام تضمين الملفات في Intlayer، يرجى الرجوع إلى الموارد التالية:

- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)
- [توثيق محتوى Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)
- [توثيق محتوى الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md)

توفر هذه الموارد رؤى إضافية حول تضمين الملفات، إدارة المحتوى، وتكامل Intlayer مع أُطُر العمل المختلفة.
