# 枚举 / 复数化

## 枚举如何工作

在 Intlayer 中，枚举是通过 `enu` 函数实现的，该函数将特定键映射到相应的内容。这些键可以表示数值、范围或自定义标识符。当与 React Intlayer 或 Next Intlayer 一起使用时，适当的内容会根据应用程序的语言环境和定义的规则自动选择。

## 设置枚举

要在您的 Intlayer 项目中设置枚举，您需要创建一个包含枚举定义的内容模块。以下是关于汽车数量的简单枚举示例：

```typescript
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "少于负一辆车", // 中文注释
      "-1": "负一辆车", // 中文注释
      "0": "没有汽车", // 中文注释
      "1": "一辆车", // 中文注释
      ">5": "一些汽车", // 中文注释
      ">19": "很多汽车", // 中文注释
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

在这个示例中，`enu` 将各种条件映射到特定内容。当在 React 组件中使用时，Intlayer 可以根据给定变量自动选择适当的内容。

## 在 React Intlayer 中使用枚举

要在 React 组件中使用枚举，您可以利用来自 `react-intlayer` 包的 `useIntlayer` 钩子。该钩子根据指定的 ID 检索正确的内容。以下是如何使用它的示例：

```javascript
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 输出：没有汽车 */}
      <p>{content.numberOfCar(6)}</p> {/* 输出：一些汽车 */}
      <p>{content.numberOfCar(20)}</p> {/* 输出：很多汽车 */}
    </div>
  );
};

export default CarComponent;
```

在这个示例中，组件根据汽车的数量动态调整输出。正确的内容会自动选择，具体取决于指定的范围。

## 重要注意事项

- 声明的顺序在 Intlayer 枚举中至关重要。第一个有效的声明将被选中。
- 如果适用多个条件，请确保它们的顺序正确，以避免意外行为。

## 枚举的最佳实践

为了确保您的枚举按预期工作，请遵循以下最佳实践：

- **一致命名**：为枚举模块使用清晰且一致的 ID，以避免混淆。
- **文档**：记录您的枚举键及其预期输出，以确保将来的可维护性。
- **错误处理**：实施错误处理，以管理未找到有效枚举的情况。
- **优化性能**：对于大型应用程序，减少监视的文件扩展名数量，以提高性能。

## 附加资源

有关配置和使用的详细信息，请参考以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了有关在不同环境和各种框架中设置和使用 Intlayer 的进一步见解。
