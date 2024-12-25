# Документация: Функция `t` в `express-intlayer`

Функция `t` в пакете `express-intlayer` является основным инструментом для предоставления локализованных ответов в вашем приложении Express. Она упрощает международную адаптацию (i18n), динамически выбирая контент в зависимости от предпочитаемого языка пользователя.

---

## Обзор

Функция `t` используется для определения и извлечения переводов для заданного набора языков. Она автоматически определяет подходящий язык для возврата на основе настроек запроса клиента, таких как заголовок `Accept-Language`. Если предпочитаемый язык недоступен, функция плавно возвращается к языковой метке по умолчанию, указанной в вашей конфигурации.

---

## Ключевые особенности

- **Динамическая локализация**: Автоматически выбирает наиболее подходящий перевод для клиента.
- **Резервирование на язык по умолчанию**: Возвращается к языку по умолчанию, если предпочтительный язык клиента недоступен, обеспечивая непрерывность пользовательского опыта.
- **Легковесность и скорость**: Разработан для высокопроизводительных приложений, обеспечивая минимальные накладные расходы.
- **Поддержка строгого режима**: Обеспечивает строгое соблюдение заявленных языковых меток для надежного поведения.

---

## Подпись функции

```typescript
t(translations: Record<string, string>): string;
```

### Параметры

- `translations`: Объект, где ключи - это коды языков (например, `en`, `fr`, `es-MX`), а значения - соответствующие переведенные строки.

### Возвращает

- Строку, представляющую содержимое на предпочитаемом языке клиента.

---

## Загрузка обработчика международных запросов

Чтобы обеспечить правильную работу функциональности международной адаптации, предоставляемой `express-intlayer`, вы **должны** загрузить промежуточное программное обеспечение для международной адаптации в начале вашего приложения Express. Это включает функцию `t` и обеспечивает надлежащее управление определением языка и переводом.

Поместите промежуточное программное обеспечение `app.use(intlayer())` **до любых маршрутов** в вашем приложении, чтобы все маршруты могли воспользоваться международной адаптацией:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Загрузка обработчика международной адаптации
app.use(intlayer());

// Определите ваши маршруты после загрузки промежуточного ПО
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

// Загрузка обработчика международной адаптации
app.use(intlayer());

// Определите ваши маршруты после загрузки промежуточного ПО
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

// Загрузка обработчика международной адаптации
app.use(intlayer());

// Определите ваши маршруты после загрузки промежуточного ПО
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

### Зачем это нужно

- **Определение языка**: Промежуточное программное обеспечение `intlayer` обрабатывает входящие запросы для определения предпочитаемого языка пользователя на основе заголовков, cookies или других настроенных методов.
- **Контекст перевода**: Устанавливает необходимый контекст для правильной работы функции `t`, обеспечивая, чтобы переводы возвращались на правильном языке.
- **Предотвращение ошибок**: Без этого промежуточного программного обеспечения использование функции `t` приведет к ошибкам выполнения, потому что необходимая информация о языке не будет доступна.

---

## Примеры использования

### Базовый пример

Предоставьте локализованный контент на разных языках:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
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
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Запросы клиентов:**

- Клиент с `Accept-Language: fr` получит `Bienvenue!`.
- Клиент с `Accept-Language: es` получит `¡Bienvenido!`.
- Клиент с `Accept-Language: de` получит `Welcome!` (язык по умолчанию).

### Обработка ошибок

Предоставьте сообщения об ошибках на нескольких языках:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
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
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Использование вариантов языков

Укажите переводы для специфичных для языка вариантов:

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

## Расширенные темы

### Механизм резервирования

Если предпочитаемый язык недоступен, функция `t` вернется к языку по умолчанию, определенному в конфигурации:

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

Например:

- Если `defaultLocale` - `Locales.CHINESE`, и клиент запрашивает `Locales.DUTCH`, возвращаемый перевод будет по умолчанию установлен на значение `Locales.CHINESE`.
- Если `defaultLocale` не определен, функция `t` вернется к значению `Locales.ENGLISH`.

---

### Принуждение к строгому режиму

Настройте функцию `t` для принуждения к строгому соблюдению заявленных языков:

| Режим           | Поведение                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| `strict`        | Все заявленные языки должны иметь предоставленные переводы. Отсутствие языков вызовет ошибки.           |
| `required_only` | Заявленные языки должны иметь переводы. Отсутствие языков приведет к предупреждениям, но будет принято. |
| `loose`         | Любой существующий язык принимается, даже если не заявлен.                                              |

Пример конфигурации:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Ваша существующая конфигурация
  internationalization: {
    // ... Ваша существующая конфигурация международной адаптации
    strictMode: "strict", // Принудительное соблюдение строгого режима
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Ваша существующая конфигурация
  internationalization: {
    // ... Ваша существующая конфигурация международной адаптации
    strictMode: "strict", // Принудительное соблюдение строгого режима
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Ваша существующая конфигурация
  internationalization: {
    // ... Ваша существующая конфигурация международной адаптации
    strictMode: "strict", // Принудительное соблюдение строгого режима
  },
};

module.exports = config;
```

---

### Интеграция с TypeScript

Функция `t` безопасна по типам при использовании с TypeScript. Определите объект перевода, безопасный для типов:

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
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Общие ошибки и устранение неполадок

| Проблема                    | Причина                                            | Решение                                                          |
| --------------------------- | -------------------------------------------------- | ---------------------------------------------------------------- |
| Функция `t` не работает     | Промежуточное программное обеспечение не загружено | Убедитесь, что `app.use(intlayer())` добавлено перед маршрутами. |
| Ошибка отсутствия переводов | Включен строгий режим без всех языков              | Предоставьте все необходимые переводы.                           |

---

## Советы по эффективному использованию

1. **Централизуйте переводы**: Используйте централизованный модуль или JSON-файлы для управления переводами, чтобы улучшить удобство обслуживания.
2. **Проверяйте переводы**: Убедитесь, что каждый языковой вариант имеет соответствующий перевод, чтобы предотвратить ненужное резервирование.
3. **Совмещайте с фронтенд-i18n**: Синхронизируйте с международной адаптацией фронтенда для непрерывного пользовательского опыта по всему приложению.
4. **Проводите тестирование производительности**: Тестируйте время отклика вашего приложения при добавлении переводов, чтобы обеспечить минимальное воздействие.

---

## Заключение

Функция `t` является мощным инструментом для международной адаптации серверной части. Используя ее эффективно, вы можете создать более инклюзивное и удобное приложение для глобальной аудитории. Для продвинутого использования и детальных параметров конфигурации обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).
