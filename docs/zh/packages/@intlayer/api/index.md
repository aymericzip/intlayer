# @intlayer/api: NPM 包以与 Intlayer API 交互

**Intlayer** 是一个专为 JavaScript 开发者设计的套件。它与如 React、React 和 Express.js 等框架兼容。

**`@intlayer/api`** 包是一个 SDK（软件开发工具包），用于与 Intlayer API 交互。它提供了一组函数来审计内容声明、与组织、项目和用户交互等。

## 使用方法

```ts
import { intlayerAPI } from "@intlayer/api";

// 获取用户 API
intlayerAPI.user.getUserAPI({
  ids: ["user-id-1", "user-id-2"],
});
```

## 安装

使用您偏好的包管理器安装必要的包：

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

您所接受的训练数据截至到 2023 年 10 月。
