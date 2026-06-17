---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Перевірка документа
description: Дізнайтеся, як перевіряти файли документації на предмет якості, узгодженості та повноти для різних локалей.
keywords:
  - Перевірка
  - Документ
  - Документація
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
author: aymericzip
---

# Перевірка документа

Команда `doc review` аналізує файли документації на предмет якості, узгодженості та повноти в різних локалях.

## Ключові моменти:

- Розділяє великі markdown-файли на частини, щоб залишатися в межах вікна контексту моделі AI.
- Оптимізує частини для перевірки та пропускає частини, які вже перекладені та не змінені.
- Обробляє файли, частини та локалі паралельно, використовуючи систему черг для збільшення швидкості.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

Її можна використовувати для перевірки файлів, які вже перекладені, а також для оцінки коректності перекладу.

У більшості випадків,

- віддавайте перевагу використанню `doc translate` коли перекладена версія цього файлу недоступна.
- надавайте перевагу використанню `doc review`, коли перекладена версія цього файлу вже існує.

> Зауважте, що процес рев'ю споживає більше вхідних токенів, ніж процес перекладу для повного перегляду того самого файлу. Проте процес рев'ю оптимізує chunks для перегляду і пропускатиме ті частини, які не були змінені.

## Аргументи:

**Параметри списку файлів:**

- **`--doc-pattern [docPattern...]`**: Глобальні шаблони (glob) для співпадіння файлів документації, які потрібно перевірити.

  > Приклад: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Glob-шаблони, які слід виключити з перевірки.

  > Приклад: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Пропустити файл, якщо он був змінений до вказаного часу.
  - Може бути абсолютним часом у форматі "2025-12-05" (рядок або Date)
  - Може бути відносним часом у мс `1 * 60 * 60 * 1000` (1 година)
  - Ця опція перевіряє час оновлення файлу за допомогою методу `fs.stat`. Тому на неї можуть вплинути Git або інші інструменти, що змінюють файл.

  > Приклад: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Пропустити файл, якщо він був змінений протягом вказаного проміжку часу.
  - Може бути абсолютним часом, наприклад "2025-12-05" (рядок або Date)
  - Може бути відносним часом у мс `1 * 60 * 60 * 1000` (1 година)
  - Ця опція перевіряє час оновлення файлу за допомогою методу `fs.stat`. Тому вона може залежати від Git або інших інструментів, які змінюють файл.

  > Приклад: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Пропустити файл, якщо він уже існує.

  > Приклад: `npx intlayer doc review --skip-if-exists`

**Параметри режиму перевірки:**

- **`--log`**: Режим тільки логування. Не перекладати з допомогою AI; замість цього логувати блоки, які потребують уваги (з номерами рядків і вмістом) для базової та цільової локалей, щоб допомогти іншому агенту згенерувати переклади.

  > Приклад: `npx intlayer doc review --log`

**Параметри виводу записів:**

- **`--locales [locales...]`**: Цільові локалі для перевірки документації.

  > Приклад: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: Базова локаль (базовий документ), з якою порівнювати.

  > Приклад: `npx intlayer doc review --base-locale en`

**Параметри обробки файлів:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Кількість файлів для одночасної обробки під час перевірки.

  > Приклад: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**Параметри AI:**

- **`--model [model]`**: Модель AI, яку слід використовувати для перевірки (наприклад, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Провайдер AI, який слід використовувати для перевірки.
- **`--temperature [temperature]`**: Налаштування temperature для моделі AI.
- **`--api-key [apiKey]`**: Надати власний API-ключ для сервісу AI.
- **`--application-context [applicationContext]`**: Надати додатковий контекст для перевірки AI.
- **`--data-serialization [dataSerialization]`**: Формат серіалізації даних для використання у функціях ШІ Intlayer. Опції: `json` (стандартний, надійний), `toon` (менше токенів, менш стабільний).
- **`--custom-prompt [prompt]`**: Налаштувати базовий prompt, який використовується для перевірки. (Примітка: у більшості випадків натомість рекомендується використовувати опцію `--custom-instructions`, оскільки вона забезпечує кращий контроль.)

  > Приклад: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**Параметри змінних оточення:**

- **`--env`**: Вказати середовище (наприклад, `development`, `production`).
- **`--env-file [envFile]`**: Надати користувацький файл оточення для завантаження змінних.
- **`--base-dir`**: Вказати базову директорію проєкту.
- **`--no-cache`**: Вимкнути кеш.

  > Приклад: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Параметри логування:**

- **`--verbose`**: Увімкнути детальне логування для налагодження. (за замовчуванням true при використанні CLI)

  > Приклад: `npx intlayer doc review --verbose`

**Параметри користувацьких інструкцій:**

- **`--custom-instructions [customInstructions]`**: Користувацькі інструкції, додані до prompt. Корисно для застосування специфічних правил щодо форматування, перекладу URL тощо.

  > Приклад: `npx intlayer doc review --custom-instructions "Avoid translating urls, and keep the markdown format"`

  > Приклад: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Опції Git:**

- **`--git-diff`**: Запускати лише для файлів, які містять зміни від бази (за замовчуванням `origin/main`) до поточної гілки (за замовчуванням: `HEAD`).
- **`--git-diff-base`**: Вказати базову ревізію для git diff (за замовчуванням `origin/main`).
- **`--git-diff-current`**: Вказати поточну ревізію для git diff (за замовчуванням `HEAD`).
- **`--uncommitted`**: Включати незакомічені зміни.
- **`--unpushed`**: Включати незапушені зміни.
- **`--untracked`**: Включати не відстежувані файли.

  > Приклад: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Приклад: `npx intlayer doc review --uncommitted --unpushed --untracked`

> Зверніть увагу, що шлях вихідного файлу визначається заміною наступних шаблонів:
>
> - `/{{baseLocale}}/` на `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` на `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` на `_{{locale}}.`
> - `{{baseLocale}}_` на `{{locale}}_`
> - `.{{baseLocaleName}}.` на `.{{localeName}}.`
>
> Якщо шаблон не знайдено, до розширення файлу буде додано `.{{locale}}`. `./my/file.md` буде перевірено та оновлено на `./my/file.fr.md` для французької локалі.
