---
docName: vscode_extension
url: /doc/vs-code-extension
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/vs_code_extension.md
createdAt: 2025-03-17
updatedAt: 2025-03-17
title: Официальное расширение VS Code
description: Узнайте, как использовать расширение Intlayer в VS Code, чтобы улучшить ваш рабочий процесс разработки. Быстро перемещайтесь между локализованным контентом и эффективно управляйте своими словарями.
keywords:
  - Расширение VS Code
  - Intlayer
  - Локализация
  - Инструменты разработки
  - React
  - Next.js
  - JavaScript
  - TypeScript
---

# Официальное расширение для VS Code

## Обзор

**Intlayer** , это официальное расширение Visual Studio Code для **Intlayer**, разработанное для улучшения опыта разработчиков при работе с локализованным контентом в проектах на **React, Next.js и JavaScript**.

С помощью этого расширения разработчики могут **быстро перемещаться** к своим словарям контента, управлять файлами локализации и оптимизировать свой рабочий процесс с помощью мощных автоматизированных команд.

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Ссылка на расширение: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Возможности

### Мгновенная навигация

**Поддержка перехода к определению** – Используйте `Cmd+Click` (Mac) или `Ctrl+Click` (Windows/Linux) на ключе `useIntlayer`, чтобы мгновенно открыть соответствующий файл контента.  
**Бесшовная интеграция** – Работает без проблем с проектами **react-intlayer** и **next-intlayer**.  
**Поддержка нескольких языков** – Поддерживает локализованный контент на разных языках.  
**Интеграция с VS Code** – Плавно интегрируется с навигацией и палитрой команд VS Code.

### Команды управления словарями

Управляйте своими словарями контента прямо из VS Code:

- **Создание словарей** (`extension.buildDictionaries`) – Генерация файлов контента на основе структуры вашего проекта.
- **Отправка словарей** (`extension.pushDictionaries`) – Загрузка последнего содержимого словарей в ваш репозиторий.
- **Получение словарей** (`extension.pullDictionaries`) – Синхронизация последнего содержимого словарей из вашего репозитория в локальную среду.

### Генератор деклараций контента

Легко создавайте структурированные файлы словарей в различных форматах:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Установка

Вы можете установить **Intlayer** напрямую из VS Code Marketplace:

1. Откройте **VS Code**.
2. Перейдите в **Marketplace расширений**.
3. Найдите **"Intlayer"**.
4. Нажмите **Установить**.

Или установите через командную строку:

```sh
code --install-extension intlayer
```

## Использование

### Быстрая навигация

1. Откройте проект, использующий **react-intlayer**.
2. Найдите вызов `useIntlayer()`, например:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` на macOS) или **Ctrl+Click** (на Windows/Linux) на ключе (например, `"app"`).
4. VS Code автоматически откроет соответствующий файл словаря, например, `src/app.content.ts`.

### Управление словарями контента

#### Создание словарей

Создайте все файлы контента словарей с помощью:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Найдите **Build Dictionaries** и выполните команду.

#### Отправка словарей

Загрузите последнее содержимое словарей:

1. Откройте **Палитру команд**.
2. Найдите **Push Dictionaries**.
3. Выберите словари для отправки и подтвердите.

#### Получение словарей

Синхронизируйте последнее содержимое словарей:

1. Откройте **Палитру команд**.
2. Найдите **Pull Dictionaries**.
3. Выберите словари для получения.

### Настройка путей к файлам словарей

По умолчанию расширение следует стандартной структуре проекта **Intlayer**. Однако вы можете настроить пользовательские пути:

1. Откройте **Настройки (`Cmd + ,` на macOS / `Ctrl + ,` на Windows/Linux)`**.
2. Найдите `Intlayer`.
3. Настройте параметр пути к файлам контента.

## Разработка и вклад

Хотите внести вклад? Мы приветствуем участие сообщества!

URL репозитория: https://github.com/aymericzip/intlayer-vs-code-extension

### Начало работы

Клонируйте репозиторий и установите зависимости:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> Используйте менеджер пакетов `npm` для совместимости с пакетом `vsce` для сборки и публикации расширения.

### Запуск в режиме разработки

1. Откройте проект в **VS Code**.
2. Нажмите `F5`, чтобы запустить новое окно **Extension Development Host**.

### Отправка Pull Request

Если вы улучшили расширение, отправьте PR на [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## Обратная связь и проблемы

Нашли ошибку или хотите предложить новую функцию? Откройте задачу в нашем **репозитории GitHub**:

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Лицензия

Intlayer распространяется под лицензией **MIT License**.
