# Documentation: `getHTMLTextDir` 函数在 `intlayer`

## 描述：

`getHTMLTextDir` 函数根据提供的语言环境确定文本方向（`ltr`、`rtl` 或 `auto`）。它旨在帮助开发人员为适当的文本渲染设置 HTML 的 `dir` 属性。

## 参数：

- `locale?: Locales`

  - **描述**：用于确定文本方向的语言环境字符串（例如，`Locales.ENGLISH`、`Locales.ARABIC`）。
  - **类型**：`Locales`（可选）

## 返回值：

- **类型**：`Dir` (`'ltr' | 'rtl' | 'auto'`)
- **描述**：与语言环境对应的文本方向：
  - `'ltr'` 代表从左到右的语言。
  - `'rtl'` 代表从右到左的语言。
  - `'auto'` 如果语言环境未被识别。

## 示例用法：

### 确定文本方向：

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 输出: "ltr"
getHTMLTextDir(Locales.FRENCH); // 输出: "ltr"
getHTMLTextDir(Locales.ARABIC); // 输出: "rtl"
```

## 边缘案例：

- **未提供语言环境：**

  - 当 `locale` 为 `undefined` 时，函数返回 `'auto'`。

- **未识别的语言环境：**
  - 对于未识别的语言环境，函数默认返回 `'auto'`。

## 在组件中的用法：

`getHTMLTextDir` 函数可以用于动态设置 HTML 文档中的 `dir` 属性，以便根据语言环境进行适当的文本渲染。

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

在上面的示例中，`dir` 属性根据语言环境动态设置。
