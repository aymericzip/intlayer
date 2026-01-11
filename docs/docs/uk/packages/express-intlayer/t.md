---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Документація: функція `t` у `express-intlayer`
description: Дізнайтеся, як використовувати функцію `t` у пакеті `express-intlayer`
keywords:
  - t
  - переклад
  - Intlayer
  - інтернаціоналізація
  - документація
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Документація: функція `t` у `express-intlayer`

Функція `t` у пакеті `express-intlayer` — це основна утиліта для надання локалізованих відповідей у вашому додатку Express. Вона спрощує інтернаціоналізацію (i18n), динамічно підбираючи контент залежно від бажаної мови користувача.

---

## Огляд

Функція `t` використовується для визначення та отримання перекладів для заданого набору мов. Вона автоматично визначає відповідну мову для повернення на основі налаштувань запиту клієнта, таких як заголовок `Accept-Language`. Якщо бажана мова недоступна, вона коректно повертає локаль за замовчуванням, вказану у вашій конфігурації.

---

## Ключові можливості

- **Динамічна локалізація**: автоматично обирає найвідповідніший переклад для клієнта.
- **Повернення до локалі за замовчуванням**: у разі недоступності бажаної мови використовується локаль за замовчуванням, що забезпечує безперервність користувацького досвіду.
- **Легкий і швидкий**: спроектовано для високопродуктивних застосунків, забезпечуючи мінімальні накладні витрати.
- **Підтримка Strict Mode**: Забезпечує суворе дотримання оголошених локалей для надійної роботи.

---

## Підпис функції

```typescript
t(translations: Record<string, string>): string;
```

### Параметри

- `translations`: Об'єкт, де ключі — це коди локалей (наприклад, `en`, `fr`, `es-MX`), а значення — відповідні перекладені рядки.

### Повертає

- Рядок, що представляє вміст мовою, яку віддає перевагу клієнт.

---

## Завантаження обробника запитів інтернаціоналізації

Щоб забезпечити правильну роботу функціональності інтернаціоналізації, що надається `express-intlayer`, ви **повинні** завантажити middleware інтернаціоналізації на початку вашого Express-застосунку. Це активує функцію `t` і гарантує коректне визначення локалі та обробку перекладів.

Розмістіть middleware `app.use(intlayer())` **перед будь-якими маршрутами** у вашому додатку, щоб усі маршрути використовували інтернаціоналізацію:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Завантажте обробник запитів інтернаціоналізації
app.use(intlayer());

// Визначте маршрути після завантаження middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Завантажити обробник запитів інтернаціоналізації
app.use(intlayer());

// Визначте маршрути після завантаження middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Завантажити обробник запитів інтернаціоналізації
app.use(intlayer());

// Визначте маршрути після завантаження middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Чому це потрібно

- **Виявлення локалі**: проміжне ПЗ `intlayer` обробляє вхідні запити, щоб визначити переважну локаль користувача на основі заголовків, cookies або інших налаштованих методів.
- **Контекст перекладу**: встановлює необхідний контекст для функції `t`, щоб вона працювала правильно, гарантуючи повернення перекладів потрібною мовою.
- **Запобігання помилкам**: без цього middleware використання функції `t` призведе до помилок виконання, оскільки необхідна інформація про локаль не буде доступна.

---

## Приклади використання

### Базовий приклад

Подача локалізованого контенту різними мовами:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      uk: "Ласкаво просимо!",
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      uk: "Ласкаво просимо!",
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      uk: "Ласкаво просимо!",
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Запити клієнтів:**

- Клієнт з `Accept-Language: fr` отримає `Bienvenue!`.
- Клієнт з `Accept-Language: es` отримає `¡Bienvenido!`.
- Клієнт з `Accept-Language: de` отримає `Welcome!` (локаль за замовчуванням).

### Обробка помилок

Надайте повідомлення про помилки кількома мовами:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      uk: "Сталася непередбачена помилка.",
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      uk: "Сталася непередбачена помилка.",
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      uk: "Сталася непередбачена помилка.",
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Використання варіантів локалі

Specify translations for locale-specific variants:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Додаткові теми

### Механізм fallback

Якщо бажана локаль недоступна, функція `t` підставить значення з локалі за замовчуванням, визначеної в конфігурації (`defaultLocale`):

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Наприклад:

- Якщо `defaultLocale` встановлено в `Locales.CHINESE`, а клієнт запитує `Locales.DUTCH`, повернутий переклад за замовчуванням буде значенням `Locales.CHINESE`.
- Якщо `defaultLocale` не визначено, функція `t` використає значення `Locales.ENGLISH`.

---

### Примусове застосування режиму `strict`

Налаштуйте функцію `t` для забезпечення суворої відповідності задекларованим локалям:

| Режим       | Поведінка                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| `strict`    | Усі задекларовані локалі повинні мати переклади. Відсутні локалі призведуть до помилок.                 |
| `inclusive` | Задекларовані локалі повинні мати переклади. Відсутні локалі спричиняють попередження, але приймаються. |
| `loose`     | Будь-яка наявна локаль приймається, навіть якщо не задекларована.                                       |

Приклад конфігурації:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Ваша існуюча конфігурація
  internationalization: {
    // ... Ваші існуючі налаштування інтернаціоналізації
    strictMode: "strict", // Застосовує строгий режим
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Ваша існуюча конфігурація
  internationalization: {
    // ... Ваші існуючі налаштування інтернаціоналізації
    strictMode: "strict", // Застосовує строгий режим
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Ваша існуюча конфігурація
  internationalization: {
    // ... Ваша існуюча конфігурація інтернаціоналізації
    strictMode: "strict", // Увімкнути строгий режим
  },
};

module.exports = config;
```

---

### Інтеграція з TypeScript

Функція `t` є типобезпечною при використанні з TypeScript. Визначте типобезпечний об'єкт перекладів:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  uk: "Доброго ранку!",
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  uk: "Доброго ранку!",
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Загальні помилки та усунення неполадок

| Проблема                     | Причина                                  | Рішення                                                          |
| ---------------------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `t` функція не працює        | Middleware не підключено                 | Переконайтеся, що `app.use(intlayer())` додано перед маршрутами. |
| Помилка відсутніх перекладів | Увімкнено строгий режим без усіх локалей | Надайте всі необхідні переклади.                                 |

---

## Поради для ефективного використання

1. **Централізуйте переклади**: Використовуйте централізований модуль або JSON-файли для керування перекладами, щоб покращити підтримуваність.
2. **Перевіряйте переклади**: Переконайтеся, що кожен мовний варіант має відповідний переклад, щоб уникнути непотрібного fallback.
3. **Поєднуйте з фронтенд i18n**: Синхронізуйте з фронтендовою інтернаціоналізацією для безперервного користувацького досвіду в додатку.
4. **Вимірюйте продуктивність**: Перевірте час відгуку вашого додатку при додаванні перекладів, щоб забезпечити мінімальний вплив.

---

## Висновок

Функція `t` — потужний інструмент для інтернаціоналізації бекенду. Правильно використовуючи її, ви можете створити більш інклюзивний та зручний додаток для глобальної аудиторії. Для просунутого використання та детальних опцій конфігурації див. [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).
