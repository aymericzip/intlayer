# 函数获取

## 函数声明

Intlayer 允许您在内容模块中声明内容函数，这些函数可以是同步的或异步的。当应用程序构建时，Intlayer 执行这些函数以获取函数的结果。返回值必须是一个 JSON 对象或一个简单的值，比如字符串或数字。

以下是一个简单的同步函数获取内容的示例：

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "这是由函数渲染的内容",
  },
} satisfies DeclarationContent;

export default functionContent;
```

在这个例子中，`text` 键包含一个返回字符串的函数。您可以使用 Intlayer 的解释器包，如 `react-intlayer` 在组件中渲染这些内容。

## 异步函数获取

除了同步函数外，Intlayer 还支持异步函数，允许您从外部源获取数据或使用模拟数据模拟数据检索。

下面是一个模拟服务器获取的异步函数示例：

```typescript
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // 等待 200 毫秒以模拟从服务器获取
  return await setTimeout(200).then(() => "这是从服务器获取的内容");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

在这种情况下，`fakeFetch` 函数模拟了一种延迟，以模拟服务器响应时间。Intlayer 执行异步函数并使用结果作为 `text` 键的内容。

## 在 React 组件中使用基于函数的内容

要在 React 组件中使用基于函数的内容，您需要从 `react-intlayer` 导入 `useIntlayer` 并使用内容 ID 调用它以检索内容。以下是一个示例：

```javascript
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 输出：这是由函数渲染的内容 */}
      <p>{asyncFunctionContent.text}</p>
      {/* 输出：这是从服务器获取的内容 */}
    </div>
  );
};

export default MyComponent;
```
