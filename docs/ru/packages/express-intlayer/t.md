# Документация: `t` Функция в `express-intlayer`

Функция `t` в пакете `express-intlayer` является основной утилитой для предоставления локализованных ответов в вашем приложении Express. Она упрощает интернационализацию (i18n), динамически выбирая контент на основе предпочтительного языка пользователя.

---

## Обзор

Функция `t` используется для определения и получения переводов для заданного набора языков. Она автоматически определяет подходящий язык для возврата на основе настроек запроса клиента, таких как заголовок `Accept-Language`. Если предпочтительный язык недоступен, она плавно возвращается к умолчанию, указанному в вашей конфигурации.

---

## Ключевые Особенности

- **Динамическая Локализация**: Автоматически выбирает наиболее подходящий перевод для клиента.
- **Запасной Язык по Умолчанию**: Падает на язык по умолчанию, если предпочтительный язык клиента недоступен, обеспечивая непрерывность пользовательского опыта.
- **Легковесность и Скорость**: Разработан для высокопроизводительных приложений, обеспечивая минимальные накладные расходы.
- **Поддержка Строгого Режима**: Обеспечивает строгое соблюдение заявленных языков для надежного поведения.

---

## Подпись Функции

```typescript
t(translations: Record<string, string>): string;
```

### Параметры

- `translations`: Объект, где ключи - это коды языков (например, `en`, `fr`, `es-MX`), а значения - соответствующие переведенные строки.

### Возвращает

- Строку, представляющую содержимое на предпочитаемом языке клиента.

---

## Загрузка Обработчика Запросов Интернационализации

Чтобы убедиться, что функция интернационализации, предоставляемая `express-intlayer`, работает правильно, вы **должны** загрузить промежуточное ПО интернационализации в начале вашего приложения Express. Это включает функцию `t` и обеспечивает правильную обработку обнаружения языка и перевода.

### Необходимая Настройка Промежуточного ПО

```typescript
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Загрузить обработчик запросов интернационализации
app.use(intlayer());
```

### Размещение в Приложении

Разместите промежуточное ПО `app.use(intlayer())` **до любых маршрутов** в вашем приложении, чтобы обеспечить, что все маршруты benefited от интернационализации:

```typescript
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

### Почему Это Необходимо

- **Обнаружение Языка**: Промежуточное ПО `intlayer` обрабатывает входящие запросы для обнаружения предпочитаемого языка пользователя на основе заголовков, файлов cookie или других настроенных методов.
- **Контекст Перевода**: Устанавливает необходимый контекст для правильной работы функции `t`, обеспечивая, чтобы переводы возвращались на правильном языке.
- **Предотвращение Ошибок**: Без этого промежуточного ПО использование функции `t` приведет к возникновению ошибок во время выполнения, так как необходимая информация о языке не будет доступна.

---

## Примеры Использования

### Основной Пример

Предоставьте локализованный контент на разных языках:

```typescript
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

**Запросы Клиента:**

- Клиент с `Accept-Language: fr` получит `Bienvenue!`.
- Клиент с `Accept-Language: es` получит `¡Bienvenido!`.
- Клиент с `Accept-Language: de` получит `Welcome!` (язык по умолчанию).

### Обработка Ошибок

Предоставьте сообщения об ошибках на нескольких языках:

```typescript
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

### Использование Вариантов Языка

Укажите переводы для специфичных для языка вариантов:

```typescript
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

## Расширенные Темы

### Механизм Запасного Языка

Если предпочтительный язык недоступен, функция `t` вернется к языку по умолчанию, определенному в конфигурации:

```typescript
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};
```

Например:

- Если `defaultLocale` равен `Locales.CHINESE`, а клиент запрашивает `Locales.DUTCH`, возвращенный перевод будет по умолчанию равен значению `Locales.CHINESE`.
- Если `defaultLocale` не определен, функция `t` вернется к значению `Locales.ENGLISH`.

---

### Принуждение Строгого Режима

Настройте функцию `t`, чтобы обеспечить строгое соблюдение заявленных языков:

| Режим           | Поведение                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| `strict`        | Все заявленные языки должны иметь предоставленные переводы. Отсутствующие языки вызовут ошибки.       |
| `required_only` | Заявленные языки должны иметь переводы. Отсутствующие языки вызовут предупреждения, но будут приняты. |
| `loose`         | Любой существующий язык принимается, даже если не заявлен.                                            |

Пример Конфигурации:

```typescript
const config = {
  internationalization: {
    strictMode: "strict", // Принуждение к строгому режиму
  },
};
```

---

### Интеграция с TypeScript

Функция `t` безопасна с типами, когда используется с TypeScript. Определите типобезопасный объект переводов:

```typescript
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

---

### Общие Ошибки и Устранение Неполадок

| Проблема                    | Причина                               | Решение                                                          |
| --------------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| Функция `t` не работает     | Промежуточное ПО не загружено         | Убедитесь, что `app.use(intlayer())` добавлено перед маршрутами. |
| Ошибка отсутствия переводов | Включен строгий режим без всех языков | Предоставьте все необходимые переводы.                           |

---

## Советы для Эффективного Использования

1. **Централизуйте Переводы**: Используйте централизованный модуль или JSON файлы для управления переводами, чтобы повысить поддерживаемость.
2. **Проверяйте Переводы**: Убедитесь, что каждый вариант языка имеет соответствующий перевод, чтобы избежать ненужных возвратов.
3. **Сочетайте с Фронтенд i18n**: Синхронизируйте с фронтенд интернационализацией для бесшовного пользовательского опыта по всему приложению.
4. **Оцените Производительность**: Проверьте время ответа вашего приложения при добавлении переводов, чтобы обеспечить минимальное влияние.

---

## Заключение

Функция `t` - это мощный инструмент для серверной интернационализации. Эффективно используя ее, вы можете создать более инклюзивное и удобное приложение для глобальной аудитории. Для продвинутого использования и подробных параметров конфигурации обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).