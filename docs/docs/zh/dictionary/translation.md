---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 翻译
description: 了解如何在您的多语言网站中声明和使用翻译。按照本在线文档中的步骤，在几分钟内设置您的项目。
keywords:
  - 翻译
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
  - translation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
---

# 翻译

## 定义翻译

`intlayer` 中的 `t` 函数允许您声明多语言内容。该函数确保类型安全，如果缺少任何翻译会抛出错误，这在 TypeScript 环境中特别有用。

以下是如何声明带有翻译内容的示例。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies Dictionary<Content>;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## 本地化配置

为了确保正确处理翻译，您可以在 `intlayer.config.ts` 中配置接受的本地化语言。此配置允许您定义应用程序支持的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## 本地化配置

为了确保正确的翻译处理，您可以在 `intlayer.config.ts` 中配置接受的本地化语言。此配置允许您定义应用程序支持的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## 在 React 组件中使用翻译

使用 `react-intlayer`，您可以在 React 组件中使用翻译。示例如下：

```jsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

该组件根据您应用中设置的当前语言环境获取相应的翻译内容。

## 自定义内容对象

`intlayer` 支持用于翻译的自定义内容对象，允许您定义更复杂的结构，同时确保类型安全。以下是一个自定义对象的示例：

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "页面标题",
        content: "页面内容",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "页面标题",
        content: "页面内容",
      },
    }),
  },
} satisfies Dictionary;

export default customContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "custom_content",
  "content": {
    "profileText": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "title": "页面标题",
          "content": "页面内容"
        },
        "fr": {
          "title": "页面标题",
          "content": "页面内容"
        },
        "es": {
          "title": "页面标题",
          "content": "页面内容"
        }
      }
    }
  }
}
```
