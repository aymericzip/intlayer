---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI — команда login
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
---

# Команда Intlayer CLI — login

---

## Опис

Команда `login` Intlayer CLI дозволяє вам автентифікуватися в Intlayer CMS. Ця команда автоматично відкриває ваш браузер за замовчуванням для завершення процесу автентифікації та отримання необхідних облікових даних (Client ID та Client Secret) для використання сервісів Intlayer.

## Використання

```bash
npx intlayer login [options]
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

```bash
npx intlayer login --cms-url https://intlayer.org
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

## Ручна конфігурація

Якщо браузер не відкрився автоматично, ви можете вручну перейти за URL, вказаним у терміналі.

## Приклади

### Вхід із власною URL-адресою CMS

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### Вхід із конкретним файлом середовища

```bash
npx intlayer login --env-file .env.production
```

### Вхід у verbose-режимі

```bash
npx intlayer login --verbose
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
