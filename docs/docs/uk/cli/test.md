---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Перевірка відсутніх перекладів
description: Дізнайтеся, як перевіряти та виявляти відсутні переклади у ваших словниках.
keywords:
  - Тест
  - Відсутні переклади
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Перевірка відсутніх перекладів

```bash
npx intlayer content test
```

## Аліаси:

- `npx intlayer test`

Ця команда аналізує ваші файли декларацій контенту, щоб ідентифікувати відсутні переклади у всіх налаштованих locales. Вона генерує детальний звіт, який показує, яких ключів перекладу бракує для яких locales, допомагаючи вам підтримувати узгодженість у вашому багатомовному контенті.

## Приклад виводу:

```bash
pnpm intlayer content test
Відсутні переклади:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Missing required locales: -
Total missing locales: 3
Total missing required locales: 0
```

## Аргументи:

**Параметри конфігурації:**

- **`--env`**: Вкажіть середовище (наприклад, `development`, `production`).
- **`--env-file [envFile]`**: Надайте власний файл середовища для завантаження змінних.
- **`--base-dir`**: Вкажіть базовий каталог проекту.

  > Приклад: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Вимкнути кеш.

  > Приклад: `npx intlayer build --no-cache`

**Параметри підготовки:**

- **`--build`**: Побудувати словники перед відправкою, щоб переконатися, що контент актуальний. True примусить виконати збірку, false пропустить збірку, undefined дозволить використовувати кеш збірки.

**Параметри логування:**

- **`--verbose`**: Увімкнути детальне логування для налагодження. (за замовчуванням true при використанні CLI)

  > Приклад: `npx intlayer content test --verbose`

## Приклад:

```bash
npx intlayer content test --verbose
```

Вивід допомагає швидко визначити, які переклади потрібно завершити, щоб ваша програма коректно працювала у всіх налаштованих локалях.
