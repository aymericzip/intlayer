---
createdAt: 2025-03-13
updatedAt: 2026-10-08
priority: 8
title: "محتوى الملفات: تضمين ملفات خارجية"
description: "ضمّن ملفات خارجية مثل markdown أو النصوص في قواميس Intlayer باستخدام الدالة file()، متزامنة مع الملف المصدر."
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
    changes: "بداية التاريخ"
author: aymericzip
---

# محتوى الملفات / دمج الملفات في Intlayer

في Intlayer، تسمح دالة `file` بدمج محتوى الملفات الخارجية في قاموس. يضمن هذا النهج أن Intlayer يتعرف على ملف المصدر، مما يتيح التكامل السلس مع محرر Intlayer المرئي و CMS.

## كيف يعمل تضمين الملفات

في Intlayer، تتيح دالة `file` تضمين محتوى ملف خارجي داخل قاموس. تضمن هذه الطريقة أن يتعرف Intlayer على الملف المصدر، مما يمكّن من التكامل السلس مع محرر Intlayer المرئي ونظام إدارة المحتوى (CMS). على عكس طرق قراءة الملفات المباشرة مثل `import` أو `require` أو `fs`، فإن استخدام `file` يربط الملف بالقاموس، مما يسمح لـ Intlayer بتتبع المحتوى وتحديثه ديناميكيًا عند تعديل الملف.

## إعداد محتوى الملف

لتضمين محتوى ملف في مشروع Intlayer الخاص بك، استخدم دالة `file` في وحدة المحتوى. فيما يلي أمثلة توضح تطبيقات مختلفة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
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

<Tabs group="framework">
  <Tab label="React" value="react">

لاستخدام محتوى الملفات المضمنة في مكون React، استورد واستخدم خطاف `useIntlayer` من حزمة `react-intlayer`. يسترجع هذا الخطاف المحتوى من المفتاح المحدد ويسمح بعرضه ديناميكيًا.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
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

  </Tab>
  <Tab label="Next.js" value="nextjs">

لاستخدام محتوى الملفات المضمنة في مكونات عميل Next.js، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

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

  </Tab>
  <Tab label="Vue" value="vue">

لاستخدام محتوى الملفات المضمنة في مكونات Vue، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

لاستخدام محتوى الملفات المضمنة في مكونات Svelte، استرجعه عبر خطاف `useIntlayer`. يتم الوصول إلى المخزن باستخدام `---
createdAt: 2025-03-13
updatedAt: 2026-09-27
priority: 8
title: "محتوى الملفات: تضمين ملفات خارجية"
description: "ضمّن ملفات خارجية مثل markdown أو النصوص في قواميس Intlayer باستخدام الدالة file()، متزامنة مع الملف المصدر."
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
  changes: "بداية التاريخ"
  author: aymericzip

---

# محتوى الملفات / دمج الملفات في Intlayer

في Intlayer، تسمح دالة `file` بدمج محتوى الملفات الخارجية في قاموس. يضمن هذا النهج أن Intlayer يتعرف على ملف المصدر، مما يتيح التكامل السلس مع محرر Intlayer المرئي و CMS.

## كيف يعمل تضمين الملفات

في Intlayer، تتيح دالة `file` تضمين محتوى ملف خارجي داخل قاموس. تضمن هذه الطريقة أن يتعرف Intlayer على الملف المصدر، مما يمكّن من التكامل السلس مع محرر Intlayer المرئي ونظام إدارة المحتوى (CMS). على عكس طرق قراءة الملفات المباشرة مثل `import` أو `require` أو `fs`، فإن استخدام `file` يربط الملف بالقاموس، مما يسمح لـ Intlayer بتتبع المحتوى وتحديثه ديناميكيًا عند تعديل الملف.

## إعداد محتوى الملف

لتضمين محتوى ملف في مشروع Intlayer الخاص بك، استخدم دالة `file` في وحدة المحتوى. فيما يلي أمثلة توضح تطبيقات مختلفة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
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

<Tabs group="framework">
  <Tab label="React" value="react">

لاستخدام محتوى الملفات المضمنة في مكون React، استورد واستخدم خطاف `useIntlayer` من حزمة `react-intlayer`. يسترجع هذا الخطاف المحتوى من المفتاح المحدد ويسمح بعرضه ديناميكيًا.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
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

  </Tab>
  <Tab label="Next.js" value="nextjs">

لاستخدام محتوى الملفات المضمنة في مكونات عميل Next.js، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

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

  </Tab>
  <Tab label="Vue" value="vue">

لاستخدام محتوى الملفات المضمنة في مكونات Vue، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

. فيما يلي مثال:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

لاستخدام محتوى الملفات المضمنة في مكونات Preact، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">

لاستخدام محتوى الملفات المضمنة في مكونات SolidJS، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

لاستخدام محتوى الملفات المضمنة في مكونات Angular، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

لاستخدام محتوى الملفات المضمنة مع `vanilla-intlayer`، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// Initial render
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>

## مثال على ملفات Markdown متعددة اللغات

لدعم ملفات Markdown القابلة للتحرير متعددة اللغات، يمكنك استخدام `file` مع `t()` و `md()` لتعريف نسخ مختلفة من ملف محتوى Markdown بلغات متعددة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

يتيح هذا الإعداد استرجاع المحتوى بشكل ديناميكي بناءً على تفضيل لغة المستخدم. عند استخدامه في محرر Intlayer المرئي أو نظام إدارة المحتوى (CMS)، سيتعرف النظام على أن المحتوى يأتي من ملفات Markdown المحددة ويضمن بقاؤها قابلة للتحرير.

## أنواع المسارات المختلفة

عند استخدام دالة `file`، يمكنك استخدام أنواع مختلفة من المسارات لتحديد الملف المراد دمجه.

- `file("./path/to/file.txt")` - مسار نسبي إلى الملف الحالي
- `file("path/to/file.txt")` - مسار نسبي إلى دليل جذر المشروع
- `file("/users/username/path/to/file.txt")` - مسار مطلق

## كيف يتعامل Intlayer مع محتوى الملفات

تعتمد دالة `file` على وحدة `fs` الخاصة بـ Node.js لقراءة محتوى الملف المحدد وإدراجه في القاموس. عند استخدامها بالتزامن مع محرر Intlayer المرئي أو نظام إدارة المحتوى، يمكن لـ Intlayer تتبع العلاقة بين القاموس والملف. هذا يسمح لـ Intlayer بـ:

- التعرف على أن المحتوى أصله من ملف محدد.
- تحديث محتوى القاموس تلقائيًا عند تعديل الملف المرتبط.
- ضمان التزامن بين الملف والقاموس، مع الحفاظ على سلامة المحتوى.

## موارد إضافية

لمزيد من التفاصيل حول تكوين واستخدام تضمين الملفات في Intlayer، يرجى الرجوع إلى الموارد التالية:

- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)
- [توثيق محتوى Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)
- [توثيق محتوى الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md)

توفر هذه الموارد رؤى إضافية حول تضمين الملفات، إدارة المحتوى، وتكامل Intlayer مع أُطُر العمل المختلفة.
