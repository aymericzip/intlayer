## 概述

**Intlayer** 是 **Intlayer** 的官方 Visual Studio Code 扩展，旨在提升开发者在 **React、Next.js 和 JavaScript** 项目中处理本地化内容的体验。

通过此扩展，开发者可以**快速导航**到其内容字典，管理本地化文件，并通过强大的自动化命令优化工作流程。

## 功能

### 即时导航

**定义跳转支持** – 使用 `Cmd+Click`（Mac）或 `Ctrl+Click`（Windows/Linux）点击 `useIntlayer` 键，立即打开对应的内容文件。  
**无缝集成** – 与 **react-intlayer** 和 **next-intlayer** 项目完美兼容。  
**多语言支持** – 支持跨多种语言的本地化内容。  
**VS Code 集成** – 与 VS Code 的导航和命令面板无缝整合。

### 字典管理命令

直接从 VS Code 管理您的内容字典：

- **生成字典** (`extension.buildDictionaries`) – 根据项目结构生成内容文件。
- **上传字典** (`extension.pushDictionaries`) – 将最新的字典内容上传到您的代码库。
- **同步字典** (`extension.pullDictionaries`) – 将代码库中的最新字典内容同步到本地环境。

### 内容声明生成器

轻松生成不同格式的结构化字典文件：

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## 安装

您可以直接从 VS Code Marketplace 安装 **Intlayer**：

1. 打开 **VS Code**。
2. 进入 **扩展市场**。
3. 搜索 **"Intlayer"**。
4. 点击 **安装**。

或者，通过命令行安装：

```sh
code --install-extension intlayer
```

## 使用方法

### 快速导航

1. 打开一个使用 **react-intlayer** 的项目。
2. 找到一个 `useIntlayer()` 调用，例如：

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command+点击**（macOS 上为 `⌘+Click`）或 **Ctrl+点击**（Windows/Linux 上）键（例如 `"app"`）。
4. VS Code 将自动打开对应的字典文件，例如 `src/app.content.ts`。

### 管理内容字典

#### 生成字典

使用以下命令生成所有字典内容文件：

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

搜索 **Build Dictionaries** 并执行命令。

#### 上传字典

上传最新的字典内容：

1. 打开 **命令面板**。
2. 搜索 **Push Dictionaries**。
3. 选择要上传的字典并确认。

#### 同步字典

同步最新的字典内容：

1. 打开 **命令面板**。
2. 搜索 **Pull Dictionaries**。
3. 选择要同步的字典。

### 自定义字典文件路径

默认情况下，扩展遵循标准的 **Intlayer** 项目结构。不过，您可以配置自定义路径：

1. 打开 **设置（`Cmd + ,` 在 macOS / `Ctrl + ,` 在 Windows/Linux）**。
2. 搜索 `Intlayer`。
3. 调整内容文件路径设置。

## 开发与贡献

想要贡献代码？我们欢迎社区贡献！

代码库地址: https://github.com/aymericzip/intlayer-vs-code-extension

### 入门指南

克隆代码库并安装依赖：

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> 使用 `npm` 包管理器以确保与 `vsce` 包兼容，用于构建和发布扩展。

### 开发模式运行

1. 在 **VS Code** 中打开项目。
2. 按 `F5` 启动一个新的 **扩展开发主机** 窗口。

### 提交拉取请求

如果您改进了扩展，请在 [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension) 上提交 PR。

## 反馈与问题

发现错误或有功能请求？请在我们的 **GitHub 代码库** 上提交问题：

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## 许可证

Intlayer 根据 **MIT 许可证** 发布。
