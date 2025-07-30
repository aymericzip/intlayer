---
createdAt: 2025-03-17
updatedAt: 2025-06-29
title: Официальное расширение VS Code
description: Узнайте, как использовать расширение Intlayer в VS Code для улучшения вашего рабочего процесса разработки. Быстро переходите между локализованным контентом и эффективно управляйте своими словарями.
keywords:
  - Расширение VS Code
  - Intlayer
  - Локализация
  - Инструменты разработки
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# Официальное расширение VS Code

## Обзор

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) — официальное расширение Visual Studio Code для **Intlayer**, созданное для улучшения опыта разработчика при работе с локализованным контентом в ваших проектах.

![Расширение Intlayer для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Ссылка на расширение: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Возможности

### Мгновенная навигация

**Поддержка перехода к определению** – Используйте `Cmd+Click` (Mac) или `Ctrl+Click` (Windows/Linux) по ключу `useIntlayer`, чтобы мгновенно открыть соответствующий файл с контентом.  
**Бесшовная интеграция** – Работает без усилий с проектами **react-intlayer** и **next-intlayer**.  
**Поддержка нескольких языков** – Поддерживает локализованный контент на разных языках.  
**Интеграция с VS Code** – Плавно интегрируется с навигацией и палитрой команд VS Code.

### Команды управления словарями

Управляйте своими словарями контента прямо из VS Code:

- **Сборка словарей** (`extension.buildDictionaries`) – Генерирует файлы контента на основе структуры вашего проекта.
- **Отправка словарей** (`extension.pushDictionaries`) – Загружает последний контент словарей в ваш репозиторий.
- **Загрузка словарей** (`extension.pullDictionaries`) – Синхронизирует последний контент словарей из вашего репозитория с локальной средой.

### Генератор деклараций контента

Легко генерируйте структурированные файлы словарей в различных форматах:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Установка

Вы можете установить **Intlayer** напрямую из Marketplace VS Code:

1. Откройте **VS Code**.
2. Перейдите в **Marketplace расширений**.
3. Найдите **"Intlayer"**.
4. Нажмите **Установить**.

Альтернативно, установите через командную строку:

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

3. **Командный клик** (`⌘+Click` на macOS) или **Ctrl+Click** (на Windows/Linux) по ключу (например, `"app"`).
4. VS Code автоматически откроет соответствующий файл словаря, например, `src/app.content.ts`.

### Управление словарями контента

#### Сборка словарей

Сгенерируйте все файлы содержимого словарей с помощью:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Найдите команду **Build Dictionaries** и выполните её.

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

## Разработка и Вклад

Хотите внести свой вклад? Мы приветствуем участие сообщества!

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

Нашли ошибку или хотите предложить новую функцию? Откройте issue в нашем **репозитории на GitHub**:

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Лицензия

Intlayer распространяется под **лицензией MIT**.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
