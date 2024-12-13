# Intlayer CLI

## 安装包

使用 npm 安装必要的包：

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> 注意：如果 `intlayer` 包已经安装，cli 会自动安装。您可以跳过此步骤。

## intlayer-cli 包

`intlayer-cli` 包旨在将您的 [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme.md) 声明转译为字典。

此包将转译所有 intlayer 文件，例如 `src/**/*.content.{ts|js|mjs|cjs|json}`。[查看如何声明您的 Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme.md)。

要解释 intlayer 字典，您可以使用解释器，例如 [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/readme.md) 或 [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/readme.md)

## 配置文件支持

Intlayer 接受多种配置文件格式：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

要查看如何配置可用的语言环境或其他参数，请参考 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 运行 intlayer 命令

### 构建字典

要构建您的字典，可以运行以下命令：

```bash
npx intlayer build
```

或在监视模式中运行

```bash
npx intlayer build --watch
```

此命令将默认查找您的声明内容文件，如 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`。并在 `.intlayer` 目录中构建字典。

### 推送字典

```bash
npx intlayer push
```

如果已安装 [intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/intlayer_editor.md)，您还可以将字典推送到编辑器。此命令将使字典可用于在 [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content) 的编辑器。通过这种方式，您可以与团队分享字典并编辑内容，而无需编辑应用程序代码。

##### 参数：

- `-d`, `--dictionaries`：要拉取的字典的 ID。如果未指定，将推送所有字典。
  > 示例：`npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`：跳过询问在推送字典后是否删除本地目录的问题，并将其删除。默认情况下，如果字典在本地定义，则将覆盖远程字典内容。
  > 示例：`npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`：跳过询问在推送字典后是否删除本地目录的问题，并保留它们。默认情况下，如果字典在本地定义，则将覆盖远程字典内容。
  > 示例：`npx intlayer push -k`

### 拉取远程字典

```bash
npx intlayer pull
```

如果已安装 [intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/intlayer_editor.md)，您还可以从编辑器拉取字典。通过这种方式，您可以覆盖字典的内容以满足应用程序的需求。

##### 参数：

- `-d, --dictionaries`：要拉取的字典的 ID。如果未指定，将拉取所有字典。
  > 示例：`npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`：新字典将保存的目录路径。如果未指定，新的字典将保存在项目的 `./intlayer-dictionaries` 目录中。如果在您的字典内容中指定了 `filePath` 字段，则字典将不考虑此参数，并保存在指定的 `filePath` 目录中。
  > 示例：`npx intlayer pull --newDictionariesPath ./my-dictionaries`

## 在您的 `package.json` 中使用 intlayer 命令：

```json
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
