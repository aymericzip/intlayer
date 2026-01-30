---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Документація функції t | adonis-intlayer
description: Дізнайтеся, як використовувати функцію t для пакета adonis-intlayer
keywords:
  - t
  - переклад
  - Intlayer
  - інтернаціоналізація
  - документація
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Початкова документація
---

# Документація: Функція `t` в `adonis-intlayer`

Функція `t` у пакеті `adonis-intlayer` є основною утилітою для надання локалізованих відповідей у вашому додатку AdonisJS. Вона спрощує інтернаціоналізацію (i18n) на основі бажаної мови користувача.

---

## Огляд

Функція `t` використовується для визначення та отримання перекладів для заданого набору мов. Вона автоматично визначає відповідну мову для повернення на основі налаштувань запиту клієнта, таких як заголовок `Accept-Language`. Якщо бажана мова недоступна, вона плавно переключається на локаль за замовчуванням, зазначену у вашій конфігурації.

---

## Ключові особливості

- **Динамічна локалізація**: Автоматично вибирає найбільш підходящий переклад для клієнта.
- **Резервна локаль (Fallback)**: Повертається до локалі за замовчуванням, якщо бажана мова клієнта недоступна, забезпечуючи безперервність користувацького досвіду.
- **Асинхронний контекст**: Безперешкодно працює в рамках життєвого циклу запиту AdonisJS з використанням Async Local Storage.
- **Підтримка TypeScript**: Забезпечує типізацію для ваших перекладів.

---

## Сигнатура функції

```typescript
t(translations: Record<string, any>): any;
```

### Параметри

- `translations`: Об'єкт, де ключами є коди локалей (наприклад, `en`, `fr`, `es`), а значеннями — відповідний перекладений контент.

### Повертає

- Контент, що відповідає бажаній мові клієнта.

---

## Завантаження проміжного ПЗ (Middleware)

Щоб функція `t` працювала правильно, ви **повинні** зареєструвати проміжне ПЗ `intlayer` у вашому додатку AdonisJS.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Приклади використання

### Базовий приклад

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### Використання в контролерах

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour з контролера",
      })
    );
  }
}
```

---

## Просунуті теми

### Механізм Fallback

Якщо бажана локаль недоступна, функція `t` повернеться до локалі за замовчуванням, визначеної у вашому файлі `intlayer.config.ts`.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Інтеграція з TypeScript

Функція `t` є типізованою при використанні з визначеними словниками. Для отримання більш детальної інформації зверніться до [документації TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).
