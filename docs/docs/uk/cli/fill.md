---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Заповнення словників
description: Дізнайтеся, як заповнювати, перевіряти та перекладати ваші словники за допомогою AI.
keywords:
  - Заповнення
  - Аудит
  - Переклад
  - Словники
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Заповнення / аудит / переклад словників

```bash
npx intlayer fill
```

Ця команда аналізує ваші файли декларацій контенту на предмет потенційних проблем, таких як відсутні переклади, структурні невідповідності або невідповідності типів. Якщо будуть виявлені якісь проблеми, **intlayer fill** запропонує або застосує оновлення, щоб тримати ваші словники консистентними та повними.

## Аліаси:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Аргументи:

**Опції списку файлів:**

- **`-f, --file [files...]`**: Список конкретних файлів декларації контенту для перевірки. Якщо не вказано, будуть перевірені всі виявлені `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` згідно з налаштуваннями вашого конфігураційного файлу.

  > Приклад: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Фільтрувати словники за ключами. Якщо не вказано, будуть перевірені всі словники.

  > Приклад: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Фільтрувати словники за ключами (псевдонім для --keys).

  > Приклад: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Виключати словники за ключами. Якщо не вказано, будуть перевірені всі словники.

  > Приклад: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Фільтрувати словники за ключами (синонім для --excluded-keys).

  > Приклад: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Фільтрувати словники на основі шаблону glob для шляхів файлів.

  > Приклад: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Параметри виводу записів:**

- **`--source-locale [sourceLocale]`**: Початкова локаль для перекладу. Якщо не вказано, буде використана локаль за замовчуванням з вашої конфігурації.

- **`--output-locales [outputLocales...]`**: Цільові локалі для перекладу. Якщо не вказано, будуть використані всі локалі з вашої конфігурації, за винятком початкової локалі.

- **`--mode [mode]`**: Режим перекладу: `complete`, `review`. За замовчуванням — `complete`. `complete` заповнює весь відсутній контент, `review` заповнює відсутній контент та переглядає наявні ключі.

**Параметри Git:**

- **`--git-diff`**: Запускати лише для словників, які містять зміни від бази (за замовчуванням `origin/main`) до поточної гілки (за замовчуванням: `HEAD`).
- **`--git-diff-base`**: Вказати базовий референс для git diff (за замовчуванням `origin/main`).
- **`--git-diff-current`**: Вказати поточний референс для git diff (за замовчуванням: `HEAD`).
- **`--uncommitted`**: Включати незакомічені зміни.
- **`--unpushed`**: Включати незапушені зміни.
- **`--untracked`**: Включати не відстежувані файли.

  > Приклад: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Приклад: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Параметри AI:**

- **`--model [model]`**: Модель AI для перекладу (наприклад, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Провайдер AI, який буде використаний для перекладу.
- **`--temperature [temperature]`**: Параметр temperature для моделі AI.
- **`--api-key [apiKey]`**: Надайте власний API-ключ для сервісу AI.
- **`--custom-prompt [prompt]`**: Надайте власний prompt для інструкцій перекладу.
- **`--application-context [applicationContext]`**: Надайте додатковий контекст для перекладу AI.

  > Приклад: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**Параметри змінних середовища:**

- **`--env`**: Вказати середовище (наприклад, `development`, `production`).
- **`--env-file [envFile]`**: Надати власний файл середовища для завантаження змінних.

  > Приклад: `npx intlayer fill --env-file .env.production.local`

  > Приклад: `npx intlayer fill --env production`

**Параметри конфігурації:**

- **`--base-dir`**: Вказати базовий каталог для проєкту.

  > Приклад: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Вимкнути кеш.

  > Приклад: `npx intlayer build --no-cache`

**Опції підготовки:**

- **`--build`**: Збирати словники перед відправкою, щоб забезпечити актуальність контенту. True примусово виконає збірку, false пропустить збірку, undefined дозволить використовувати кеш збірки.

- **`--skip-metadata`**: Пропустити заповнення відсутніх метаданих (description, title, tags) для словників.

**Опції логування:**

- **`--verbose`**: Увімкнути детальне (verbose) логування для налагодження. (за замовчуванням true при використанні CLI)

## Приклад:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Ця команда перекладе вміст з англійської на французьку та іспанську для всіх файлів декларацій вмісту в директорії `src/home/`, використовуючи модель GPT-3.5 Turbo.
