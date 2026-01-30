---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Документация функции t | adonis-intlayer
description: Узнайте, как использовать функцию t для пакета adonis-intlayer
keywords:
  - t
  - перевод
  - Intlayer
  - интернационализация
  - документация
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
    changes: Начальная документация
---

# Документация: Функция `t` в `adonis-intlayer`

Функция `t` в пакете `adonis-intlayer` является основным инструментом для предоставления локализованных ответов в вашем приложении AdonisJS. Она упрощает интернационализацию (i18n), динамически выбирая контент на основе предпочтительного языка пользователя.

---

## Обзор

Функция `t` используется для определения и получения переводов для заданного набора языков. Она автоматически определяет соответствующий язык для возврата на основе настроек запроса клиента, таких как заголовок `Accept-Language`. Если предпочтительный язык недоступен, она плавно переключается на локаль по умолчанию, указанную в вашей конфигурации.

---

## Ключевые особенности

- **Динамическая локализация**: Автоматически выбирает наиболее подходящий перевод для клиента.
- **Резервная локаль (Fallback)**: Возвращается к локали по умолчанию, если предпочтительный язык клиента недоступен, обеспечивая непрерывность пользовательского опыта.
- **Асинхронный контекст**: Беспрепятственно работает в рамках жизненного цикла запроса AdonisJS с использованием Async Local Storage.
- **Поддержка TypeScript**: Обеспечивает типизацию для ваших переводов.

---

## Сигнатура функции

```typescript
t(translations: Record<string, any>): any;
```

### Параметры

- `translations`: Объект, где ключами являются коды локалей (например, `en`, `fr`, `es`), а значениями — соответствующий переведенный контент.

### Возвращаемое значение

- Контент, соответствующий предпочтительному языку клиента.

---

## Загрузка промежуточного ПО (Middleware)

Чтобы функция `t` работала правильно, вы **должны** зарегистрировать промежуточное ПО `intlayer` в вашем приложении AdonisJS.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Примеры использования

### Базовый пример

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue !",
    es: "¡Bienvenido!",
  });
});
```

### Использование в контроллерах

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour из контроллера",
      })
    );
  }
}
```

---

## Продвинутые темы

### Механизм Fallback

Если предпочтительная локаль недоступна, функция `t` вернется к локали по умолчанию, определенной в вашем файле `intlayer.config.ts`.

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

### Интеграция с TypeScript

Функция `t` является типизированной при использовании с определенными словарями. Для получения более подробной информации обратитесь к [документации TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).
