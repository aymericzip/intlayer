# Translation

## Defining Translations

`t` 函数在 `intlayer` 中允许您声明多种语言的内容。该函数确保类型安全，如果任何翻译缺失，将引发错误，这在 TypeScript 环境中特别有用。

### Using TypeScript

这是如何在 TypeScript 文件中声明翻译内容的一个示例：

```typescript
import { t, type DeclarationContent } from "intlayer";

interface Content {
  welcomeMessage: string; // 欢迎信息
}

export default {
  key: "multi_lang", // 多语言键
  content: {
    welcomeMessage: t({
      en: "Welcome to our application", // 欢迎来到我们的应用程序
      fr: "Bienvenue dans notre application", // 欢迎来到我们的应用程序
      es: "Bienvenido a nuestra aplicación", // 欢迎来到我们的应用程序
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Using ECMAScript Modules

如果您使用 ECMAScript 模块，声明看起来像这样：

```javascript
import { t } from "intlayer";

export default {
  key: "multi_lang", // 多语言键
  content: {
    welcomeMessage: t({
      en: "Welcome to our application", // 欢迎来到我们的应用程序
      fr: "Bienvenue dans notre application", // 欢迎来到我们的应用程序
      es: "Bienvenido a nuestra aplicación", // 欢迎来到我们的应用程序
    }),
  },
};
```

### Using CommonJS Modules

在 CommonJS 设置中，您可以像这样声明翻译：

```javascript
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang", // 多语言键
  content: {
    welcomeMessage: t({
      en: "Welcome to our application", // 欢迎来到我们的应用程序
      fr: "Bienvenue dans notre application", // 欢迎来到我们的应用程序
      es: "Bienvenido a nuestra aplicación", // 欢迎来到我们的应用程序
    }),
  },
};
```

### Using JSON

对于基于 JSON 的声明，您可以如下定义翻译：

```json
{
  "key": "multi_lang", // 多语言键
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application", // 欢迎来到我们的应用程序
        "fr": "Bienvenue dans notre application", // 欢迎来到我们的应用程序
        "es": "Bienvenido a nuestra aplicación" // 欢迎来到我们的应用程序
      }
    }
  }
}
```

## Configuration for Locales

为了确保适当的翻译处理，您可以在 `intlayer.config.ts` 中配置接受的地区语言。这一配置允许您定义您的应用程序支持的语言：

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 支持的语言
  },
};

export default config;
```

## Using Translations in React Components

使用 `react-intlayer`，您可以在 React 组件中使用翻译。以下是一个示例：

```jsx
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const content = useIntlayer("multi_lang"); // 获取多语言内容

  return (
    <div>
      <p>{content.welcomeMessage}</p> // 显示欢迎信息
    </div>
  );
};

export default MyComponent;
```

该组件根据您应用程序中设置的当前语言获取相应的翻译。

## Custom Content Objects

`intlayer` 支持自定义内容对象进行翻译，允许您定义更复杂的结构，同时确保类型安全。以下是一个带有自定义对象的示例：

```typescript
import { t, type DeclarationContent } from "intlayer";

interface ICustomContent {
  title: string; // 标题
  content: string; // 内容
}

const customContent = {
  key: "custom_content", // 自定义内容键
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "Page Title", // 页面标题
        content: "Page Content", // 页面内容
      },
      fr: {
        title: "Titre de la Page", // 页面标题
        content: "Contenu de la Page", // 页面内容
      },
      es: {
        title: "Título de la Página", // 页面标题
        content: "Contenido de la Página", // 页面内容
      },
    }),
  },
} satisfies DeclarationContent;

export default customContent;
```
