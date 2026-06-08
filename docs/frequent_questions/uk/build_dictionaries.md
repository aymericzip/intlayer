---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Як згенерувати словники?
description: Дізнайтеся, як згенерувати словники.
keywords:
  - build
  - словники
  - intlayer
  - команда
  - watch
  - vscode
  - плагін
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - build-dictionaries
---

# Build Dictionaries

## How to Build Dictionaries

Intlayer provides a command-line tool to build dictionaries.

```bash
npx intlayer dictionaries build
```

This command:

- Scans all content declaration files (`.content.{ts,tsx,js,mjs,cjs,json,...}`) in your project.
- Generates dictionaries and stores them in the `.intlayer/dictionary` folder.

### Watch Mode

Якщо ви хочете автоматично оновлювати словники при внесенні змін у файли декларацій контенту, виконайте таку команду:

```bash
npx intlayer dictionaries build --watch
```

У цьому режимі Intlayer скануватиме та будуватиме словники щоразу, коли вносяться зміни у файли декларацій контенту, і автоматично оновлюватиме папку `.intlayer/dictionary`.

### Використання розширення VSCode

Ви також можете використовувати [розширення Intlayer для VSCode](https://github.com/aymericzip/intlayer/tree/main/docs/uk/vs_code_extension.md), щоб покращити роботу з Intlayer у VSCode.

### Використання плагіна для вашого улюбленого фреймворка

Якщо ви використовуєте фреймворк на кшталт Next.js (Webpack / Turbopack), Vite, React Native, Lynx тощо, Intlayer надає плагін, який ви можете використати для інтеграції Intlayer у ваш додаток.

Intlayer збирає словники перед збіркою вашого додатка.
Аналогічно, у режимі розробки Intlayer стежитиме за змінами у файлах декларації контенту й автоматично перебудовуватиме словники.

Тому зверніться до документації, специфічної для вашого фреймворку, щоб дізнатися, як інтегрувати плагін.
