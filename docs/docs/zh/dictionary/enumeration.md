---
docName: dictionary__enumeration
url: https://intlayer.org/doc/concept/content/zh/enumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 枚举
description: 了解如何在您的多语言网站中声明和使用枚举。按照本在线文档中的步骤，几分钟内即可设置您的项目。
keywords:
  - 枚举
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# 枚举 / 复数形式

## 枚举的工作原理

在 Intlayer 中，枚举是通过 `enu` 函数实现的，该函数将特定的键映射到对应的内容。这些键可以表示数值、范围或自定义标识符。当与 React Intlayer 或 Next Intlayer 一起使用时，会根据应用程序的语言环境和定义的规则自动选择合适的内容。

## 设置枚举

要在您的 Intlayer 项目中设置枚举，您需要创建一个包含枚举定义的内容模块。以下是一个关于汽车数量的简单枚举示例：

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "许多车",
      "fallback": "备用值", // 可选
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "许多车",
      "fallback": "备用值", // 可选
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "许多车",
      "fallback": "备用值", // 可选
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
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "少于负一辆车",
        "-1": "负一辆车",
        "0": "没有车辆",
        "1": "一辆车",
        ">5": "一些车辆",
        ">19": "许多车辆",
        "fallback": "备用值" // 可选
      }
    }
  }
}
```

在此示例中，`enu` 将各种条件映射到特定内容。当在 React 组件中使用时，Intlayer 可以根据给定的变量自动选择合适的内容。

> 在 Intlayer 枚举中，声明的顺序非常重要。第一个有效的声明将被选中。如果多个条件适用，请确保它们的顺序正确，以避免意外行为。

> 如果未声明备用值，当没有匹配的键时，函数将返回 `undefined`。

## 在 React Intlayer 中使用枚举

要在 React 组件中使用枚举，您可以利用 `react-intlayer` 包中的 `useIntlayer` 钩子。该钩子根据指定的 ID 获取正确的内容。以下是如何使用它的示例：

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 输出：无车
        }
      </p>
      <p>
        {
          numberOfCar(6) // 输出：一些车
        }
      </p>
      <p>
        {
          numberOfCar(20) // 输出：许多车
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 输出：回退值
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 输出：没有汽车
        }
      </p>
      <p>
        {
          numberOfCar(6) // 输出：一些汽车
        }
      </p>
      <p>
        {
          numberOfCar(20) // 输出：许多汽车
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 输出：回退值
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 输出：没有汽车
        }
      </p>
      <p>
        {
          numberOfCar(6) // 输出：一些汽车
        }
      </p>
      <p>
        {
          numberOfCar(20) // 输出：许多汽车
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 输出：回退值
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

在此示例中，组件会根据汽车数量动态调整其输出。正确的内容会根据指定的范围自动选择。

## 附加资源

有关配置和使用的更详细信息，请参阅以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了关于在不同环境和各种框架中设置和使用 Intlayer 的更多见解。

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史
