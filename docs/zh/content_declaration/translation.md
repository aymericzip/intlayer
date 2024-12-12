# 翻译

## 定义翻译

`intlayer`中的`t`函数允许您声明多种语言的内容。该函数确保类型安全，如果缺少任何翻译，会引发错误，这在TypeScript环境中特别有用。

### 使用 TypeScript

以下是如何在TypeScript文件中声明带有翻译的内容的示例：

```typescript
import { t, type DeclarationContent } from "intlayer";

const multiLangContent = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "欢迎来到我们的应用程序",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent;

export default multiLangContent;
```

### 使用 ECMAScript 模块

如果您正在使用ECMAScript模块，声明如下所示：

```javascript
import { t } from "intlayer";

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "欢迎来到我们的应用程序",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

export default multiLangContent;
```

### 使用 CommonJS 模块

在CommonJS设置中，您可以这样声明翻译：

```javascript
const { t } = require("intlayer");

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "欢迎来到我们的应用程序",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

module.exports = multiLangContent;
```

### 使用 JSON

对于基于JSON的声明，您可以如下定义翻译：

```json
{
  "id": "multi_lang",
  "welcomeMessage": {
    "nodeType": "translation",
    "en": "欢迎来到我们的应用程序",
    "fr": "Bienvenue dans notre application",
    "es": "Bienvenido a nuestra aplicación"
  }
}
```

## 语言环境的配置

为了确保正确处理翻译，您可以在`intlayer.config.ts`中配置接受的语言环境。该配置允许您定义您的应用程序支持的语言：

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## 在 React 组件中使用翻译

使用`react-intlayer`，您可以在React组件中使用翻译。以下是一个示例：

```jsx
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

该组件根据您在应用程序中设置的当前语言环境获取相应的翻译。

## 自定义内容对象

`intlayer`支持自定义内容对象进行翻译，允许您定义更复杂的结构，同时确保类型安全。以下是带有自定义对象的示例：

```typescript
import { t, type DeclarationContent } from "intlayer";

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
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
    }),
  },
} satisfies DeclarationContent;

export default customContent;
```
