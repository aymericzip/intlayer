---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI, команда login
description: Дізнайтеся, як використовувати команду login Intlayer CLI для автентифікації в Intlayer CMS та отримання облікових даних доступу.
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
author: aymericzip
---

# Команда Intlayer CLI, login

---

## Опис

Команда `login` Intlayer CLI дозволяє вам автентифікуватися в Intlayer CMS. Ця команда автоматично відкриває ваш браузер за замовчуванням для завершення процесу автентифікації та отримання необхідних облікових даних (Client ID та Client Secret) для використання сервісів Intlayer.

## Використання

```bash packageManager="npm"
npx intlayer login [options]
```

```bash packageManager="yarn"
yarn intlayer login [options]
```

```bash packageManager="pnpm"
pnpm intlayer login [options]
```

```bash packageManager="bun"
bun x intlayer login [options]
```

або

```bash
intlayer login [options]
```

## Параметри

### `--cms-url <url>`

Вкажіть URL Intlayer CMS, до якого потрібно підключитися для аутентифікації.

- **Тип**: `string`
- **За замовчуванням**: Значення, вказане в `intlayer.config.*` або `https://intlayer.org`
- **Приклад**:

```bash packageManager="npm"
npx intlayer login --cms-url https://intlayer.org
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://intlayer.org
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://intlayer.org
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://intlayer.org
```

### Параметри конфігурації

Ви також можете використовувати загальні параметри конфігурації:

- `--env-file <path>`: Шлях до файлу середовища
- `-e, --env <env>`: Середовище виконання
- `--base-dir <dir>`: Базовий каталог проекту
- `--verbose`: Увімкнути детальний вивід (за замовчуванням: true)
- `--prefix <prefix>`: Префікс для логів

## Як це працює

1. **Запуск локального сервера**: Команда запускає локальний HTTP‑сервер на випадковому порті, щоб отримати облікові дані від CMS
2. **Відкриття браузера**: команда автоматично відкриває ваш браузер за замовчуванням на URL для входу в CMS
3. **Аутентифікація**: завершіть аутентифікацію в браузері, використовуючи ваш обліковий запис Intlayer
4. **Отримання облікових даних**: локальний сервер отримує Client ID та Client Secret від CMS
5. **Інструкції**: команда відображає інструкції щодо конфігурації облікових даних у вашому проекті

## Вивід

Після успішного входу команда відобразить:

1. **Отримані облікові дані** (Client ID та Client Secret)
2. **Інструкції для файлу `.env`**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Інструкції для файлу конфігурації Intlayer**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Збереження ключа доступу в безпеці

`intlayer login` видає **ключ доступу**: пару `clientId` / `clientSecret`, яку використовують усі команди з авторизацією (`push`, `pull`, `fill`, `configuration push`, `live`, …) для аутентифікації.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

> **`clientSecret` — це серверна облікові дані.** Вони надають повний доступ до API в межах проекту — читання та запис ваших словників, вашого проекту та вашої організації. Зберігайте це в `.env` (git-ignored) або у вашому сховищі секретів CI, і ніколи не вставляйте це в файл конфігурації.

Intlayer забезпечує це, а не просто документує:

- `clientSecret` **видаляється з конфігурації, яку inline ваш bundler**, тому він не може потрапити в bundle браузера, незалежно від того, яку інтеграцію фреймворку ви використовуєте. Він читається лише на сервері під час виконання з навколишнього середовища.
- `clientId` інший: це **публічний** ключ проекту, безпечний для розповсюдження, і використовується [`@intlayer/analytics`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/analytics.md#how-events-are-authenticated) для отримання короткочасного токена лише для прийому.

Закоментування `clientId` достатньо, щоб вимкнути кожну поведінку з авторизацією — отримання віддалених словників, доступ до CMS, аналітику — навіть якщо змінні середовища все ще визначені.

Для конвеєрів CI надавайте перевагу [`ci` команді](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/ci.md), яка вводить облікові дані на час виконання однієї операції, замість того щоб зберігати їх.

## Ручна конфігурація

Якщо браузер не відкрився автоматично, ви можете вручну перейти за URL, вказаним у терміналі.

## Приклади

### Вхід із власною URL-адресою CMS

```bash packageManager="npm"
npx intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://custom-cms.example.com
```

### Вхід із конкретним файлом середовища

```bash packageManager="npm"
npx intlayer login --env-file .env.production
```

```bash packageManager="yarn"
yarn intlayer login --env-file .env.production
```

```bash packageManager="pnpm"
pnpm intlayer login --env-file .env.production
```

```bash packageManager="bun"
bun x intlayer login --env-file .env.production
```

### Вхід у verbose-режимі

```bash packageManager="npm"
npx intlayer login --verbose
```

```bash packageManager="yarn"
yarn intlayer login --verbose
```

```bash packageManager="pnpm"
pnpm intlayer login --verbose
```

```bash packageManager="bun"
bun x intlayer login --verbose
```

## Усунення несправностей

### Браузер не відкривається

Якщо браузер не відкривається автоматично, скопіюйте URL, показаний у терміналі, і відкрийте його вручну у браузері.

### Проблеми з підключенням

Якщо виникають проблеми з підключенням, перевірте:

1. Що URL CMS вказано правильно
2. Що ваше інтернет-з'єднання працює належним чином
3. Що жодні фаєрволи не блокують з'єднання

### Облікові дані не отримано

Якщо облікові дані не надійшли:

1. Переконайтеся, що ви завершили процес аутентифікації в браузері
2. Перевірте, що локальний порт не заблокований
3. Спробуйте виконати команду ще раз

## Наступні кроки

Після завершення входу:

1. Додайте облікові дані до вашого файлу `.env`
2. Сконфігуруйте ваш файл `intlayer.config.*` з цими обліковими даними
3. Використовуйте CLI-команди для керування вашими словниками:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/push.md) - Push dictionaries to the CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/pull.md) - Pull dictionaries from the CMS
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) - Заповнити відсутні переклади

## Див. також

- [Документація CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Конфігурація Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
- [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
