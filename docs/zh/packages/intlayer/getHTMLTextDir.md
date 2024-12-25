# Documentation: `getHTMLTextDir` 函数在 `intlayer`

## 描述：

`getHTMLTextDir` 函数根据提供的语言环境确定文本方向（`ltr`、`rtl` 或 `auto`）。它旨在帮助开发人员为正确的文本渲染设置 HTML 中的 `dir` 属性。

## 参数：

- `locale?: Locales`

  - **描述**：用于确定文本方向的语言环境字符串（例如，`Locales.ENGLISH`、`Locales.ARABIC`）。
  - **类型**：`Locales`（可选）

## 返回：

- **类型**：`Dir` (`'ltr' | 'rtl' | 'auto'`)
- **描述**：与语言环境对应的文本方向：
  - `'ltr'` 用于从左到右的语言。
  - `'rtl'` 用于从右到左的语言。
  - `'auto'` 如果语言环境未被识别。

## 示例用法：

### 确定文本方向：

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 输出: "ltr"
getHTMLTextDir(Locales.FRENCH); // 输出: "ltr"
getHTMLTextDir(Locales.ARABIC); // 输出: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 输出: "ltr"
getHTMLTextDir(Locales.FRENCH); // 输出: "ltr"
getHTMLTextDir(Locales.ARABIC); // 输出: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // 输出: "ltr"
getHTMLTextDir(Locales.FRENCH); // 输出: "ltr"
getHTMLTextDir(Locales.ARABIC); // 输出: "rtl"
```

## 边缘案例：

- **未提供语言环境：**

  - 当 `locale` 为 `undefined` 时，函数返回 `'auto'`。

- **无法识别的语言环境：**
  - 对于无法识别的语言环境，函数默认返回 `'auto'`。

## 在组件中的使用：

`getHTMLTextDir` 函数可以用来根据语言环境动态设置 HTML 文档中的 `dir` 属性，以便正确的文本渲染。

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

在上述示例中，`dir` 属性是根据语言环境动态设置的。
