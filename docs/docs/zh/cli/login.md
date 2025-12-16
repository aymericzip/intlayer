---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - 登录
description: 了解如何使用 Intlayer CLI 的 login 命令与 Intlayer CMS 进行身份验证并获取访问凭证。
keywords:
  - CLI
  - 登录
  - 认证
  - CMS
  - Intlayer
  - 凭证
slugs:
  - doc
  - concept
  - cli
  - login
---

# Intlayer CLI 登录命令

---

## 描述

Intlayer CLI 的 `login` 命令允许您对 Intlayer CMS 进行身份验证。该命令会自动打开您的默认浏览器以完成身份验证流程，并接收使用 Intlayer 服务所需的凭证（Client ID 和 Client Secret）。

## 用法

```bash
npx intlayer login [options]
```

或

```bash
intlayer login [options]
```

## 选项

### `--cms-url <url>`

指定用于身份验证的 Intlayer CMS 的 URL。

- **类型**: `string`
- **默认**: 在 `intlayer.config.*` 中配置的值，或 `https://intlayer.org`
- **示例**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### 配置选项

您还可以使用常见的配置选项：

- `--env-file <path>`：环境文件的路径
- `-e, --env <env>`：执行环境
- `--base-dir <dir>`：项目的基目录
- `--verbose`：启用详细输出（默认：true）
- `--prefix <prefix>`：日志前缀

## 工作原理

1. **启动本地服务器**：该命令在一个随机端口上启动本地 HTTP 服务器，以从 CMS 接收凭证

指定要用于身份验证的 Intlayer CMS 的 URL。

- **类型**: `string`
- **默认**: 在 `intlayer.config.*` 中配置的值，或 `https://intlayer.org`
- **示例**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### 配置选项

您还可以使用常用的配置选项：

- `--env-file <path>`: 环境文件的路径
- `-e, --env <env>`: 执行环境
- `--base-dir <dir>`: 项目的基目录
- `--verbose`: 启用详细输出（默认：true）
- `--prefix <prefix>`: 日志前缀

## 工作原理

1. **启动本地服务器**：该命令在随机端口启动一个本地 HTTP 服务器以接收来自 CMS 的凭证
2. **Browser Opening**：该命令会自动在你的默认浏览器中打开 CMS 的登录 URL
3. **Authentication**：在浏览器中使用你的 Intlayer 帐户完成身份验证
4. **Credentials Reception**：本地服务器从 CMS 接收 Client ID 和 Client Secret
5. **Instructions**：该命令显示在项目中配置凭证的说明

## 输出

登录成功后，命令将显示：

1. **接收到的凭证**（Client ID 和 Client Secret）
2. **`.env` 文件的说明**：

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Intlayer 配置文件的说明**：

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## 手动配置

如果浏览器没有自动打开，您可以手动访问终端中显示的 URL。

## 示例

### 使用自定义 CMS URL 登录

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### 使用特定环境文件登录

```bash
npx intlayer login --env-file .env.production
```

### 以详细模式登录

```bash
npx intlayer login --verbose
```

## 故障排除

### 浏览器未打开

如果浏览器没有自动打开，请复制终端中显示的 URL 并在浏览器中手动打开。

### 连接问题

如果遇到连接问题，请验证：

1. 确认 CMS URL 是否正确
2. 确认您的网络连接正常工作
3. 确认没有防火墙阻止连接

### 未收到凭证

如果未收到凭证：

1. 确保在浏览器中完成了身份验证流程
2. 验证本地端口未被阻塞
3. 重新尝试该命令

## 后续步骤

完成登录后：

1. 将凭证添加到您的 `.env` 文件中
2. 在 `intlayer.config.*` 文件中配置这些凭证
3. 使用 CLI 命令管理您的词典：
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/push.md) - 将词典推送到 CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/pull.md) - 从 CMS 拉取词典
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) - 填充缺失的翻译
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) - 填充缺失的翻译

## 另请参阅

- [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- [Intlayer 配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
