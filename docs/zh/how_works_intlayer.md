# Intlayer的工作原理

## 概述

Intlayer的角色是将JavaScript内容声明文件解释为字典。

为此，Intlayer经历了几个步骤：

1. 内容文件的声明

   - 内容文件可以用各种格式定义，例如TypeScript、ECMAScript、CommonJS或JSON。
   - 内容文件可以在项目中的任何地方定义，这允许更好的维护和可扩展性。重要的是要遵循内容文件的文件扩展名约定。此扩展名默认是`*.content.{js|cjs|mjs|ts|tsx|json}`，但可以在[配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)中修改。

2. 字典生成

   - 字典是从内容文件生成的。默认情况下，intlayer字典生成在项目的`.intlayer/dictionary`目录中。
   - 可以生成两种类型的字典：intlayer字典和i18n字典（测试版）。

3. 字典类型的生成

   - 字典类型是从intlayer字典生成的。默认情况下，intlayer字典类型生成在项目的`types`目录中。

4. Intlayer模块扩展的生成

   - Intlayer [模块扩展](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)是一个TypeScript特性，可以让您为Intlayer定义额外的类型。这使得开发体验更简单，因为可以建议可用的参数或必需的参数。
     生成的类型中，intlayer字典类型甚至语言配置类型被添加到`types/intlayer.d.ts`文件中，并被其他包使用。为此，需要配置`tsconfig.json`文件以包含项目的`types`目录。

5. 内容文件监控

   - 内容文件受到监控，以便每次修改时都能重新生成。

6. 字典解释
   - 最后，字典被解释以便在应用程序中使用。

## 包

Intlayer由几个包组成，每个包在翻译过程中扮演着特定的角色。以下是此包结构的图形表示：

![intlayer的包](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer`包用于在应用程序中声明内容在内容文件中。

### react-intlayer

`react-intlayer`包用于解释intlayer字典并使其在React应用程序中可用。

### next-intlayer

`next-intlayer`包用作`react-intlayer`之上的一层，使intlayer字典在Next.js应用程序中可用。它集成了在Next.js环境中使Intlayer工作所需的核心功能，例如翻译中间件、路由或`next.config.js`文件配置。

### intlayer-editor

`intlayer-editor`包用于允许使用可视化编辑器。此包是可选的，可以在应用程序中安装，并将由`react-intlayer`包使用。
它由两部分组成：服务器和客户端。

客户端包含将被`react-intlayer`使用的UI元素。

服务器基于Express，用于接收编辑器的可视化请求并管理或修改内容文件。

### intlayer-cli

`intlayer-cli`包可以使用`npx intlayer build`命令生成字典。如果`intlayer`已经安装，则cli会自动安装，此包就不再需要。

### @intlayer/core

`@intlayer/core`包是主Intlayer包。它包含翻译和字典管理功能。`@intlayer/core`是多平台的，并被其他包用来进行字典解释。

### @intlayer/config

`@intlayer/config`包用于配置Intlayer设置，例如可用语言、Next.js中间件参数或集成编辑器设置。

### @intlayer/webpack

`@intlayer/webpack`包用于为Next.js和React添加编译插件。

### @intlayer/cli

`@intlayer/cli`包用于确保所有intlayer CLI命令的一致性。

### @intlayer/dictionaries-entry

`@intlayer/dictionaries-entry`包是一个只返回intlayer字典条目路径的包。由于从浏览器无法进行文件系统搜索，因此使用Webpack或Rollup等打包工具检索字典的条目路径是不可能的。此包旨在进行别名处理。

### @intlayer/chokidar

`@intlayer/chokidar`包用于监控内容文件，并在每次修改时重新生成修改后的字典。
