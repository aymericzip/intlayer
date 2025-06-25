# @intlayer/api: 用于与 Intlayer API 交互的 NPM 包

**Intlayer** 是专为 JavaScript 开发人员设计的一套软件包。它兼容 React、React 和 Express.js 等框架。

**`@intlayer/api`** 包是一个 SDK（软件开发工具包），用于与 Intlayer API 交互。它提供了一组函数，用于审核内容声明，与组织、项目和用户等交互。

## 使用方法

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## 安装

使用您喜欢的包管理器安装必要的软件包：

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```
