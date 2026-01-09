---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Офіційне розширення VS Code
description: Дізнайтеся, як використовувати розширення Intlayer у VS Code для покращення робочого процесу розробки. Швидко переходьте між локалізованим контентом і ефективно керуйте своїми словниками.
keywords:
  - Розширення VS Code
  - Intlayer
  - Локалізація
  - Інструменти розробки
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
history:
  - version: 7.3.0
    date: 2025-11-25
    changes: Додано команду Extract Content
  - version: 6.1.5
    date: 2025-09-30
    changes: Додано демонстраційний GIF
  - version: 6.1.0
    date: 2025-09-24
    changes: Додано розділ вибору середовища
  - version: 6.0.0
    date: 2025-09-22
    changes: Вкладка Intlayer / команди Fill & Test
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Офіційне розширення VS Code

## Огляд

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) — офіційне розширення Visual Studio Code для **Intlayer**, створене для покращення досвіду розробника під час роботи з локалізованим контентом у ваших проєктах.

![Розширення Intlayer для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif?raw=true)

Посилання на розширення: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Особливості

![Витяг вмісту](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_extract_content.gif?raw=true)

- **Витяг вмісту** – Витягує вміст із ваших компонентів React / Vue / Svelte

![Заповнення словників](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Миттєва навігація** – Швидко переходьте до відповідного файлу вмісту, натиснувши на ключ `useIntlayer`.
- **Заповнення словників** – Заповнює словники вмістом із вашого проєкту.

![Список команд](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Простий доступ до команд Intlayer** – Build, push, pull, fill, test словників вмісту з легкістю.

![Створити файл вмісту](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **Генератор декларацій вмісту** – Створюйте файли словників вмісту в різних форматах (`.ts`, `.esm`, `.cjs`, `.json`).

![Тест словників](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Тестування словників** – Перевірка словників на наявність відсутніх перекладів.

![Перебудова словника](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Тримайте свої словники в актуальному стані** – Оновлюйте словники останнім вмістом з вашого проєкту.

![Вкладка Intlayer (Панель активності)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Вкладка Intlayer (Панель активності)** – Оглядайте та шукайте словники у виділеній бічній вкладці з панеллю інструментів і контекстними діями (Build, Pull, Push, Fill, Refresh, Test, Create File).

## Використання

### Швидка навігація

1. Відкрийте проєкт, що використовує **react-intlayer**.
2. Знайдіть виклик `useIntlayer()`, наприклад:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` на macOS) або **Ctrl+Click** (на Windows/Linux) по ключу (наприклад, `"app"`).
4. VS Code автоматично відкриє відповідний файл словника, наприклад, `src/app.content.ts`.

### Вкладка Intlayer (Панель активності)

Використовуйте бічну вкладку для перегляду та керування словниками:

- Відкрийте значок Intlayer на Панелі активності.
- У **Search** введіть текст, щоб у реальному часі фільтрувати словники та записи.
- У **Dictionaries** переглядайте середовища, словники та файли. Використовуйте панель інструментів для Build, Pull, Push, Fill, Refresh, Test та Create Dictionary File. Натисніть правою кнопкою для контекстних дій (Pull/Push для словників, Fill для файлів). Поточний файл у редакторі автоматично відображається в дереві, коли це доречно.

### Доступ до команд

Ви можете викликати команди через **Command Palette**.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Build Dictionaries**
- **Надіслати словники**
- **Отримати словники**
- **Заповнити словники**
- **Тестувати словники**
- **Створити файл словника**

### Завантаження змінних оточення

Intlayer рекомендує зберігати ваші AI API keys, а також Intlayer client ID і secret у змінних оточення.

Розширення може завантажувати змінні оточення з вашого робочого простору, щоб виконувати команди Intlayer у правильному контексті.

- **Порядок завантаження (за пріоритетом)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **Недеструктивно**: існуючі значення `process.env` не перезаписуються.
- **Область застосування**: файли визначаються з налаштованого базового каталогу (за замовчуванням — корінь робочого простору).

#### Вибір активного середовища

- **Палітра команд**: відкрийте палітру та виконайте `Intlayer: Select Environment`, потім оберіть середовище (наприклад, `development`, `staging`, `production`). Розширення намагатиметься завантажити перший доступний файл зі списку пріоритетів вище та покаже повідомлення на кшталт «Завантажено env з .env.<env>.local».
- **Налаштування**: перейдіть у `Settings → Extensions → Intlayer` та встановіть:
  - **Environment**: назва середовища, яка використовується для визначення файлів `.env.<env>*`.
  - (Необов'язково) **Env File**: явний шлях до файлу `.env`. Якщо вказано, він має пріоритет над виведеним вище списком.

#### Монорепозиторії та власні каталоги

Якщо ваші файли `.env` розташовані поза коренем робочого простору, встановіть **Базовий каталог** у `Settings → Extensions → Intlayer`. Завантажувач шукатиме файли `.env` відносно цього каталогу.
