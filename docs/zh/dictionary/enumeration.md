---
docName: dictionary__enumeration
url: https://intlayer.org/doc/concept/content/enumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/enumeration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: 枚举
description: 发现如何在您的多语言网站中声明和使用枚举。按照此在线文档中的步骤，在几分钟内设置您的项目。
keywords:
  - 枚举
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# 枚举 / 复数化

## 枚举的工作原理

在 Intlayer 中，枚举是通过 `enu` 函数实现的，该函数将特定的键映射到其对应的内容。这些键可以表示数值、范围或自定义标识符。当与 React Intlayer 或 Next Intlayer 一起使用时，系统会根据应用程序的语言环境和定义的规则自动选择适当的内容。

## 设置枚举

要在 Intlayer 项目中设置枚举，您需要创建一个包含枚举定义的内容模块。以下是一个关于汽车数量的简单枚举示例：

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
      ">5": "一些车",
      ">19": "很多车",
      "fallback": "回退值", // 可选
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
      ">5": "一些车",
      ">19": "很多车",
      "fallback": "回退值", // 可选
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
      ">5": "一些车",
      ">19": "很多车",
      "fallback": "回退值", // 可选
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
        "0": "没有车",
        "1": "一辆车",
        ">5": "一些车",
        ">19": "很多车",
        "fallback": "回退值" // 可选
      }
    }
  }
}
```

在此示例中，`enu` 将各种条件映射到特定内容。当在 React 组件中使用时，Intlayer 可以根据给定变量自动选择适当的内容。

> 在 Intlayer 枚举中，声明的顺序很重要。第一个有效的声明将被选中。如果多个条件适用，请确保它们的顺序正确，以避免意外行为。

> 如果未声明回退值，当没有键匹配时，函数将返回 `undefined`。

## 在 React Intlayer 中使用枚举

要在 React 组件中使用枚举，可以利用 `react-intlayer` 包中的 `useIntlayer` 钩子。此钩子根据指定的 ID 检索正确的内容。以下是如何使用它的示例：

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 输出: 没有车
        }
      </p>
      <p>
        {
          numberOfCar(6) // 输出: 一些车
        }
      </p>
      <p>
        {
          numberOfCar(20) // 输出: 很多车
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 输出: 回退值
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
          numberOfCar(0) // 输出: 没有车
        }
      </p>
      <p>
        {
          numberOfCar(6) // 输出: 一些车
        }
      </p>
      <p>
        {
          numberOfCar(20) // 输出: 很多车
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 输出: 回退值
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
          numberOfCar(0) // 输出: 没有车
        }
      </p>
      <p>
        {
          numberOfCar(6) // 输出: 一些车
        }
      </p>
      <p>
        {
          numberOfCar(20) // 输出: 很多车
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 输出: 回退值
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

在此示例中，组件根据汽车数量动态调整其输出。系统会根据指定的范围自动选择正确的内容。

## 其他资源

有关配置和使用的更多详细信息，请参阅以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了在不同环境和各种框架中设置和使用 Intlayer 的进一步见解。
