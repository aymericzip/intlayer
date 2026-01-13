---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Переклад документа
description: Дізнайтеся, як автоматично перекладати файли документації за допомогою AI-сервісів перекладу.
keywords:
  - Переклад
  - Документ
  - Документація
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Переклад документа

Команда `doc translate` автоматично перекладає файли документації з базової локалі до цільових локалей за допомогою AI-сервісів перекладу.

## Ключові моменти:

- Розділяє великі markdown-файли на частини, щоб залишатися в межах вікна контексту моделі AI.
- Повторює переклад, якщо формат виводу невірний.
- Включає контекст, специфічний для додатка та файлу, для підвищення точності перекладу.
- Зберігає існуючі переклади, не перезаписуючи їх.
- Обробляє файли, частини та локалі паралельно, використовуючи систему черг для збільшення швидкості.

```bash
npx intlayer doc translate
```

## Аргументи:

**Параметри списку файлів:**

- **`--doc-pattern [docPattern...]`**: Глобальні шаблони (glob) для співпадіння файлів документації, які потрібно перекласти.

  > Приклад: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Glob-шаблони, які слід виключити з перекладу.

  > Приклад: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Пропустити файл, якщо він був змінений до вказаного часу.
  - Може бути абсолютним часом у форматі "2025-12-05" (рядок або Date)
  - Може бути відносним часом у мс `1 * 60 * 60 * 1000` (1 година)
  - Ця опція перевіряє час оновлення файлу за допомогою методу `fs.stat`. Тому на неї можуть вплинути Git або інші інструменти, що змінюють файл.

  > Приклад: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Пропустити файл, якщо він був змінений протягом вказаного проміжку часу.
  - Може бути абсолютним часом, наприклад "2025-12-05" (рядок або Date)
  - Може бути відносним часом у мс `1 * 60 * 60 * 1000` (1 година)
  - Ця опція перевіряє час оновлення файлу за допомогою методу `fs.stat`. Тому вона може залежати від Git або інших інструментів, які змінюють файл.

  > Example: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Пропустити файл, якщо він уже існує.

  > Example: `npx intlayer doc translate --skip-if-exists`

**Параметри виводу записів:**

- **`--locales [locales...]`**: Цільові локалі для перекладу документації.

  > Example: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Базова локаль, з якої перекладати.

  > Example: `npx intlayer doc translate --base-locale en`

**Параметри обробки файлів:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Кількість файлів для одночасної обробки під час перекладу.

  > Приклад: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Параметри AI:**

- **`--model [model]`**: Модель AI, яку слід використовувати для перекладу (наприклад, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Провайдер AI, який слід використовувати для перекладу.
- **`--temperature [temperature]`**: Налаштування temperature для моделі AI.
- **`--api-key [apiKey]`**: Надати власний API-ключ для сервісу AI.
- **`--application-context [applicationContext]`**: Надати додатковий контекст для перекладу AI.
- **`--custom-prompt [prompt]`**: Налаштувати базовий prompt, який використовується для перекладу. (Примітка: у більшості випадків натомість рекомендується використовувати опцію `--custom-instructions`, оскільки вона дає кращий контроль над поведінкою перекладу.)

  > Приклад: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**Параметри змінних оточення:**

- **`--env`**: Вказати середовище (наприклад, `development`, `production`).
- **`--env-file [envFile]`**: Надати користувацький файл оточення для завантаження змінних.
- **`--base-dir`**: Вказати базову директорію проєкту.
- **`--no-cache`**: Вимкнути кеш.

  > Приклад: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Параметри логування:**

- **`--verbose`**: Увімкнути детальне логування для налагодження. (за замовчуванням true при використанні CLI)

  > Приклад: `npx intlayer doc translate --verbose`

**Параметри користувацьких інструкцій:**

- **`--custom-instructions [customInstructions]`**: Користувацькі інструкції, додані до prompt. Корисно для застосування специфічних правил щодо форматування, перекладу URL тощо.
  - Може бути абсолютним часом, наприклад "2025-12-05" (рядок або Date)
  - Може бути відносним часом у мс `1 * 60 * 60 * 1000` (1 година)
  - Ця опція перевіряє час оновлення файлу за допомогою методу `fs.stat`. Тож це може залежати від Git або інших інструментів, які змінюють файл.

  > Приклад: `npx intlayer doc translate --custom-instructions "Avoid translating urls, and keep the markdown format"`

  > Приклад: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Опції Git:**

- **`--git-diff`**: Запускати лише для словників, які містять зміни від бази (за замовчуванням `origin/main`) до поточної гілки (за замовчуванням: `HEAD`).
- **`--git-diff-base`**: Вказати базову ревізію для git diff (за замовчуванням `origin/main`).
- **`--git-diff-current`**: Вказати поточну ревізію для git diff (за замовчуванням `HEAD`).
- **`--uncommitted`**: Включати незакомічені зміни.
- **`--unpushed`**: Включати незапушені зміни.
- **`--untracked`**: Включати не відстежувані файли.

  > Приклад: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Приклад: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Зверніть увагу, що шлях вихідного файлу визначається заміною наступних шаблонів
>
> - `/{{baseLocale}}/` на `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` на `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` на `_{{locale}}.`
> - `{{baseLocale}}_` на `{{locale}}_`
> - `.{{baseLocaleName}}.` на `.{{localeName}}.`
>
> Якщо шаблон не знайдено, до розширення файлу буде додано `.{{locale}}`. `./my/file.md` буде перекладено на `./my/file.fr.md` для французької локалі.
