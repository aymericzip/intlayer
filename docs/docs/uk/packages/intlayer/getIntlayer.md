---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Документація функції getIntlayer | intlayer
description: Дивіться, як використовувати функцію getIntlayer для пакета intlayer
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Документація: функція `getIntlayer` в `intlayer`

## Опис

Функція `getIntlayer` вибирає один словник за його ключем і повертає його вміст, інтерпретований для певної локалі. Це аналог хука `useIntlayer`, незалежний від фреймворку: той самий вміст, ті самі селектори, але придатний скрізь, де React контекст недоступний — Node-скрипти, серверні функції, завантажувачі маршрутів, конструктори метаданих, обробники Express/Fastify, тести.

Він читає словники, згенеровані Intlayer у `.intlayer/`, тому аргумент `key` типізований та автодоповнюється на основі ваших декларацій вмісту, а повернений об'єкт повністю типізований аж до кожного листка.

**Ключові особливості:**

- Типізовані ключі словника та типізований повернений вміст
- Інтерпретує кожен вузол вмісту (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Приймає локаль або об'єкт селектора (колекції, варіанти)
- Результати кешуються для кожної комбінації `key + locale + selector`
- Під час розробки повертається до безпечного проксі, коли словник відсутній, замість краху

---

## Function Signature

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Обов'язковий
  localeOrSelector?: LocalesValues | DictionarySelector, // Опціональний
  plugins?: Plugins[]                         // Опціональний
): DeepTransformContent<...>
```

---

## Параметри

- `key: DictionaryKeys`
  - **Description**: The key of the dictionary to read, as declared in your content files.
  - **Type**: `DictionaryKeys` — a union of every declared dictionary key.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: The locale to interpret the content with, or a selector object for [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md).
    - `'fr'` — a locale
    - `{ item: 2 }` — a [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/collections.md) item (omit `item` to get every item as an array)
    - `{ variant: 'black-friday' }` — a named [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/variants.md) (omit for the `default` one)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — a structured variant
    - Any selector can carry a locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Custom node transformers replacing the base interpreter plugins. Advanced use only; omit it to keep the default behaviour.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Повертає

- **Тип**: Інтерпретований вміст словника, типізований з вашої декларації.
- **Опис**: Простий об'єкт, що відображає поле `content` вашого словника, де кожен вузол Intlayer розв'язаний на його остаточне значення для запитуваної мови.

---

## Приклад використання

### Базове використання

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      uk: "Привіт",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### Без локалі

Пропуск локалі інтерпретує вміст за допомогою `defaultLocale`, декларованої у вашій [конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Інтерпретується з локаллю за замовчуванням
```

### Усередині серверного обробника

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### З селектором (колекції та варіанти)

```typescript
import { getIntlayer } from "intlayer";

// Один елемент колекції
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Всі елементи колекції як упорядкований масив
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Названий варіант
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## Примітки щодо поведінки

### Caching

Результати кешуються в кеші на рівні модуля за допомогою ключа `key + locale + selector`. Повторне виклик `getIntlayer("app", "fr")` інтерпретує словник один раз і повертає той самий об'єкт потім.

### Відсутні словники

Під час розробки, якщо запросити ключ, для якого не було згенеровано словник, виводиться попередження один раз і повертається безпечний резервний проксі: читання `content.title` повертає рядок `"app.title"` замість викидання помилки. Це дозволяє сторінці залишатися функціональною, поки відсутня декларація не буде виправлена. Запустіть збірку Intlayer (або dev сервер), щоб словник був згенеровано.

### Розмір bundle

`getIntlayer` читає об'єднаний словник, який містить **кожну** локаль. У клієнтських bundle'ах [плагіни збірки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) переписують виклик, щоб відправляється тільки необхідний контент. Коли ви читаєте контент поза рендерингом (метадані, loader'и, серверні функції) і хочете, щоб одна локаль завантажувалася за запитом, використовуйте замість цього [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayerAsync.md).

---

## Пов'язані функції

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayerAsync.md): Асинхронний аналог для завантаження одного chunk'у локалізації.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getDictionary.md): Інтерпретує об'єкт dictionary, який ви передаєте самі, замість пошуку за ключем.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md): React hook еквівалент, який зчитує локаль від провайдера.

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
