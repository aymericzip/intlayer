---
createdAt: 2025-03-13
updatedAt: 2026-10-08
priority: 8
title: "文件内容：嵌入外部文件"
description: "使用 file() 函数将 Markdown 或文本等外部文件嵌入 Intlayer 字典，并与源文件保持同步。"
keywords:
  - 文件
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史记录"
author: aymericzip
---

# 文件内容 / 在 Intlayer 中嵌入文件

在 Intlayer 中，`file` 函数允许将外部文件内容嵌入到字典中。这种方法确保 Intlayer 识别源文件，从而与 Intlayer Visual Editor 和 CMS 实现无缝集成。

## 文件嵌入的工作原理

在 Intlayer 中，`file` 函数允许将外部文件内容嵌入到字典中。这种方法确保 Intlayer 识别源文件，实现与 Intlayer 可视化编辑器和 CMS 的无缝集成。与直接使用 `import`、`require` 或 `fs` 文件读取方法不同，使用 `file` 会将文件与字典关联，使 Intlayer 能够在文件被编辑时动态跟踪和更新内容。

## 设置文件内容

要在您的 Intlayer 项目中嵌入文件内容，请在内容模块中使用 `file` 函数。以下示例展示了不同的实现方式。

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

## 在各框架中使用文件内容

<Tabs group="framework">
  <Tab label="React" value="react">

要在 React 组件中使用嵌入的文件内容，请从 `react-intlayer` 包中导入并使用 `useIntlayer` Hook。该 Hook 会从指定的键获取内容并动态渲染：

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

要在 Next.js 客户端组件中使用嵌入的文件内容，可通过 `useIntlayer` Hook 获取。示例如下：

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

要在 Vue 组件中使用嵌入的文件内容，可通过 `useIntlayer` Hook 获取。示例如下：

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

要在 Svelte 组件中使用嵌入的文件内容，可通过 `useIntlayer` Hook 获取。使用 `$` 访问 store。示例如下：

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

要在 Preact 组件中使用嵌入的文件内容，可通过 `useIntlayer` Hook 获取。示例如下：

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

要在 SolidJS 组件中使用嵌入的文件内容，可通过 `useIntlayer` Hook 获取。示例如下：

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

要在 Angular 组件中使用嵌入的文件内容，可通过 `useIntlayer` Hook 获取。示例如下：

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

要在 Vanilla JS 中使用嵌入的文件内容，可通过 `vanilla-intlayer` 的 `useIntlayer` 获取。示例如下：

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// 初始渲染
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>

## 多语言 Markdown 示例

为了支持多语言可编辑的 Markdown 文件，您可以结合使用 `file`、`t()` 和 `md()` 来定义 Markdown 内容文件的不同语言版本。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        zh: file("src/components/test.zh.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

此设置允许根据用户的语言偏好动态检索内容。当在 Intlayer 可视化编辑器或 CMS 中使用时，系统将识别内容来自指定的 Markdown 文件，并确保它们保持可编辑状态。

## Intlayer 如何处理文件内容

`file` 函数基于 Node.js 的 `fs` 模块，用于读取指定文件的内容并将其插入到字典中。当与 Intlayer 可视化编辑器或 CMS 结合使用时，Intlayer 可以跟踪字典与文件之间的关系。这使得 Intlayer 能够：

- 识别内容来源于特定文件。
- 当关联文件被编辑时，自动更新字典内容。
- 确保文件与字典之间的同步，保持内容的完整性。

## 额外资源

有关在 Intlayer 中配置和使用文件嵌入的更多详细信息，请参阅以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)
- [Markdown 内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)
- [翻译内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)

这些资源提供了关于文件嵌入、内容管理以及 Intlayer 与各种框架集成的更多见解。
