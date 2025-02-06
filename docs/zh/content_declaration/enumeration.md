# 枚举 / 复数化

## 枚举如何工作

在 Intlayer 中，枚举是通过 `enu` 函数来实现的，该函数将特定的键映射到相应的内容。这些键可以表示数字值、范围或自定义标识符。当与 React Intlayer 或 Next Intlayer 一起使用时，根据信息的语言环境和定义的规则，适当的内容会被自动选择。

## 设置枚举

要在你的 Intlayer 项目中设置枚举，你需要创建一个包含枚举定义的内容模块。以下是一个简单的汽车数量枚举的示例：

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "很多车",
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "很多车",
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type DeclarationContent } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "很多车",
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "很多车"
    }
  }
}
```

在这个示例中，`enu` 将各种条件映射到特定的内容。当在 React 组件中使用时，Intlayer 可以根据信息的语言环境自动选择合适的内容。

## 在 React Intlayer 中使用枚举

要在 React 组件中使用枚举，你可以利用 `react-intlayer` 包中的 `useIntlayer` hook。这个 hook 会根据指定的 ID 检索正确的内容。以下是如何使用它的示例：

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 输出：没有车 */}
      <p>{content.numberOfCar(6)}</p> {/* 输出：一些车 */}
      <p>{content.numberOfCar(20)}</p> {/* 输出：一些车 */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 输出：没有车 */}
      <p>{content.numberOfCar(6)}</p> {/* 输出：一些车 */}
      <p>{content.numberOfCar(20)}</p> {/* 输出：一些车 */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 输出：没有车 */}
      <p>{content.numberOfCar(6)}</p> {/* 输出：一些车 */}
      <p>{content.numberOfCar(20)}</p> {/* 输出：一些车 */}
    </div>
  );
};

module.exports = CarComponent;
```

在这个示例中，组件根据汽车数量动态调整其输出。根据指定的范围，正确的内容会被自动选择。

## 重要说明

- 声明的顺序在 Intlayer 枚举中至关重要。第一个有效的声明是被选中的声明。
- 如果多个条件适用，请确保它们的顺序正确，以避免意外的行为。

## 枚举的最佳实践

为了确保你的枚举按照预期工作，请遵循以下最佳实践：

- **一致的命名**：使用清晰且一致的标识符来命名枚举模块，以避免混淆。
- **文档**：记录你的枚举键及其期望的输出，以确保将来的可维护性。
- **错误处理**：实现错误处理，以管理未找到有效枚举的情况。
- **性能优化**：对于大型应用程序，减少监视的文件扩展名数量，以提高性能。

## 其他资源

有关配置和使用的更多详细信息，请参考以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了关于在不同环境和各种框架中设置和使用 Intlayer 的进一步见解。
