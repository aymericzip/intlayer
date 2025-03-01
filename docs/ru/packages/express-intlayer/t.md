# Документация: Функция `t` в `express-intlayer`

Функция `t` в пакете `express-intlayer` является основным инструментом для предоставления локализованных ответов в вашем приложении Express. Она упрощает интернационализацию (i18n), динамически выбирая контент на основе предпочтительного языка пользователя.

---

## Обзор

Функция `t` используется для определения и получения переводов для заданного набора языков. Она автоматически определяет подходящий язык для возврата на основе настроек запроса клиента, таких как заголовок `Accept-Language`. Если предпочтительный язык недоступен, функция плавно переходит на язык по умолчанию, указанный в вашей конфигурации.

---

## Основные возможности

- **Динамическая локализация**: Автоматически выбирает наиболее подходящий перевод для клиента.
- **Резервный язык по умолчанию**: Переходит на язык по умолчанию, если предпочтительный язык клиента недоступен, обеспечивая непрерывность пользовательского опыта.
- **Легковесность и высокая скорость**: Разработана для высокопроизводительных приложений с минимальной нагрузкой.
- **Поддержка строгого режима**: Обеспечивает строгое соблюдение объявленных локалей для надежного поведения.

---

## Сигнатура функции

```typescript
t(translations: Record<string, string>): string;
```

### Параметры

- `translations`: Объект, где ключи — это коды локалей (например, `en`, `fr`, `es-MX`), а значения — соответствующие переведенные строки.

### Возвращает

- Строку, представляющую контент на предпочтительном языке клиента.

---

## Загрузка обработчика запросов интернационализации

Чтобы функциональность интернационализации, предоставляемая `express-intlayer`, работала корректно, **необходимо** загрузить middleware интернационализации в начале вашего приложения Express. Это активирует функцию `t` и обеспечивает правильное определение локалей и переводов.

Разместите middleware `app.use(intlayer())` **перед любыми маршрутами** в вашем приложении, чтобы все маршруты поддерживали интернационализацию:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Определите маршруты после загрузки middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ru: "Привет, мир!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Определите маршруты после загрузки middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ru: "Привет, мир!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Определите маршруты после загрузки middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ru: "Привет, мир!",
    })
  );
});
```

### Почему это необходимо

- **Определение локали**: Middleware `intlayer` обрабатывает входящие запросы для определения предпочтительной локали пользователя на основе заголовков, cookies или других настроенных методов.
- **Контекст перевода**: Настраивает необходимый контекст для корректной работы функции `t`, обеспечивая возврат переводов на правильном языке.
- **Предотвращение ошибок**: Без этого middleware использование функции `t` приведет к ошибкам выполнения, так как необходимая информация о локали будет недоступна.

---

## Примеры использования

### Базовый пример

Предоставление локализованного контента на разных языках:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
      ru: "Добро пожаловать!",
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
      ru: "Добро пожаловать!",
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
      ru: "Добро пожаловать!",
    })
  );
});
```

**Запросы клиента:**

- Клиент с `Accept-Language: fr` получит `Bienvenue!`.
- Клиент с `Accept-Language: es` получит `¡Bienvenido!`.
- Клиент с `Accept-Language: de` получит `Welcome!` (язык по умолчанию).

### Обработка ошибок

Предоставление сообщений об ошибках на нескольких языках:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
      ru: "Произошла неожиданная ошибка.",
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
      ru: "Произошла неожиданная ошибка.",
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
      ru: "Произошла неожиданная ошибка.",
    })
  );
});
```

---

### Использование вариантов локалей

Укажите переводы для специфических вариантов локалей:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
      ru: "Привет!",
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
      ru: "Привет!",
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
      ru: "Привет!",
    })
  );
});
```

---

## Заключение

Функция `t` — это мощный инструмент для интернационализации на стороне сервера. Используя её эффективно, вы можете создать более инклюзивное и удобное приложение для глобальной аудитории. Для продвинутого использования и подробных настроек обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).
