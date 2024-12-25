# How Intlayer Works

## Overview

The role of Intlayer is to interpret JavaScript content declaration files into dictionaries.

For this, Intlayer goes through several steps:

1. Declaration of content files

   - Content files can be defined in various formats, such as TypeScript, ECMAScript, CommonJS, or JSON.
   - Content files can be defined everywhere in the project, which allows for better maintenance and scalability. It is important to respect the file extension conventions for content files. This extension is by default `*.content.{js|cjs|mjs|ts|tsx|json}`, but it can be modified in the [configuration file](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/configuration.md).

2. Generation of dictionaries

   - Dictionaries are generated from content files. By default, intlayer dictionaries are generated in the `.intlayer/dictionary` directory of the project.
   - Two types of dictionaries can be generated: intlayer dictionaries and i18n dictionaries (beta).

3. Generation of dictionary types

   - Dictionary types are generated from intlayer dictionaries. By default, intlayer dictionary types are generated in the `.intlayer/types` directory of the project.

4. Generation of Intlayer module augmentation

   - Intlayer [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) is a TypeScript feature that allows you to define additional types for Intlayer. This makes development experience easier by suggesting available arguments or required arguments.
     Among the types generated, intlayer dictionary types or even language configuration types are added to the `types/intlayer.d.ts` file, and used by other packages. To do this, it is necessary that the `tsconfig.json` file is configured to include the `.intlayer/types` directory of the project.

5. Content file monitoring

   - Content files are monitored to be regenerated each time they are modified.

6. Dictionary interpretation
   - Dictionaries are finally interpreted to be used in applications.

## Packages

Intlayer is composed of several packages, each with a specific role in the translation process. Here is a graphical representation of the structure of this package:

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

The `intlayer` package is used in applications to declare content in content files.

### react-intlayer

The `react-intlayer` package is used to interpret intlayer dictionaries and make them usable in React applications.

### next-intlayer

The `next-intlayer` package is used as a layer on top of `react-intlayer` to make intlayer dictionaries usable in Next.js applications. It integrates essential features to make Intlayer work in a Next.js environment, such as translation middleware, routing, or the `next.config.js` file configuration.

### intlayer-editor

The `intlayer-editor` package is used to allow the use of the visual editor. This package, optional can be installed in applications and will be used by the `react-intlayer` package.
It consists of two parts: the server and the client.

The client contains UI elements that will be used by `react-intlayer`.

The server, based on Express, is used to receive the editor visual requests and manage or modify content files.

### intlayer-cli

The `intlayer-cli` package can be used to generate dictionaries using the `npx intlayer build` command. If `intlayer` is already installed, the cli is automatically installed and this package is not necessary.

### @intlayer/core

The `@intlayer/core` package is the master Intlayer package. It contains translation and dictionary management functions. `@intlayer/core` is multiplatform and is used by other packages to perform interpretation of dictionaries.

### @intlayer/config

The `@intlayer/config` package is used to configure Intlayer settings, such as available languages, Next.js middleware parameters or the integrated editor settings.

### @intlayer/webpack

The `@intlayer/webpack` package is used to add compilation plugins to Next.js and React.

### @intlayer/cli

The `@intlayer/cli` package is used to ensure uniformity of all intlayer CLI commands.

### @intlayer/dictionaries-entry

The `@intlayer/dictionaries-entry` package is a package that only returns the entry path of the intlayer dictionaries. Since the filesystem search is impossible from the browser, using bundlers like Webpack or Rollup to retrieve the entry path of the dictionaries is not possible. This package aims to be aliased.

### @intlayer/chokidar

The `@intlayer/chokidar` package is used to monitor content files and regenerate the modified dictionary at each modification.
