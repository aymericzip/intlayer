---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: Документація функції getIntlayer | intlayer
description: "Використовуйте getIntlayer, щоб читати контент словника для локалі будь-де: це незалежний від фреймворку аналог хука useIntlayer."
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
  - version: 9.5.12
    date: 2026-09-28
    changes: "Без локалі використовується локаль запиту або збережена локаль, перш ніж локаль за замовчуванням"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Початкова документація"
author: aymericzip
---

# Документація: функція `getIntlayer` в `intlayer`

## Опис

Функція `getIntlayer` вибирає один словник за його ключем і повертає його вміст, інтерпретований для певної локалі. Це аналог хука `useIntlayer`, незалежний від фреймворку: той самий вміст, ті самі селектори, але придатний скрізь, де React контекст недоступний, Node-скрипти, серверні функції, завантажувачі маршрутів, конструктори метаданих, обробники Express/Fastify, тести.

Він читає словники, згенеровані Intlayer у `.intlayer/`, тому аргумент `key` типізований та автодоповнюється на основі ваших декларацій вмісту, а повернений об'єкт повністю типізований аж до кожного листка.

**Ключові особливості:**

- Типізовані ключі словника та типізований повернений вміст
- Інтерпретує кожен вузол вмісту (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Приймає локаль або об'єкт селектора (колекції, варіанти)
- Результати кешуються для кожної комбінації `key + locale + selector`
- Під час розробки повертається до безпечного проксі, коли словник відсутній, замість краху

## Сигнатура функції

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Обов'язковий
  localeOrSelector?: LocalesValues | DictionarySelector, // Опціональний
  plugins?: Plugins[]                         // Опціональний
): DeepTransformContent<...>
```

## Параметри

- `key: DictionaryKeys`
  - **Опис**: Ключ словника для читання, як оголошено у ваших файлах контенту.
  - **Тип**: `DictionaryKeys`, об'єднання всіх оголошених ключів словників.
  - **Обов'язково**: Так

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Опис**: Локаль для інтерпретації контенту або об'єкт селектора для [динамічних словників](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md).
    - `'fr'`: локаль
    - `{ item: 2 }`: елемент [колекції](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/collections.md) (не вказуйте `item`, щоб отримати всі елементи як масив)
    - `{ variant: 'black-friday' }`: іменований [варіант](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/variants.md) (не вказуйте для варіанта `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: структурований варіант
    - Будь-який селектор може містити локаль: `{ item: 2, locale: 'fr' }`
  - **Тип**: `LocalesValues | DictionarySelector`
  - **Обов'язково**: Ні (необов'язково). Якщо не вказано, див. [Без локалі](#без-локалі).

- `plugins: Plugins[]`
  - **Опис**: Власні трансформери вузлів, що замінюють базові плагіни інтерпретатора. Лише для просунутого використання; не вказуйте, щоб зберегти поведінку за замовчуванням.
  - **Тип**: `Plugins[]`
  - **Обов'язково**: Ні (необов'язково)

### Повертає

- **Тип**: Інтерпретований вміст словника, типізований з вашої декларації.
- **Опис**: Простий об'єкт, що відображає поле `content` вашого словника, де кожен вузол Intlayer розв'язаний на його остаточне значення для запитуваної мови.

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

Якщо локаль не передано, `getIntlayer` не переходить одразу до локалі за замовчуванням. Вона визначає локаль у такому порядку:

1. **Локаль поточного запиту**, на сервері, коли його обробляє інтеграція Intlayer: middleware `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer` та `elysia-intlayer`, middleware `remix-intlayer` та `astro-intlayer`, а також `IntlayerProvider` / `setLocale` у React Server Components. Кожен запит визначається за його власними cookies і заголовками, тому одночасні користувачі ніколи не ділять одну локаль.
2. **Локаль, збережена в браузері** (cookie, `localStorage`, `sessionStorage`), яку зберігає перемикач мови.
3. **`defaultLocale`**, оголошена у вашій [конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

- [конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Локаль запиту, інакше збережена, інакше локаль за замовчуванням
```

Те саме визначення застосовується до `getDictionary`, до викликів, які переписують [плагіни збірки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md), і до `useIntlayer` / `useDictionaryDynamic`, відрендерених поза провайдером. Явно передана локаль завжди має пріоритет.

- [плагіни збірки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)

> `getIntlayer` не реактивна: після зміни локалі викличте її знову, щоб прочитати нову локаль. На сторінці із серверним рендерингом виклик поза будь-яким провайдером рендерить локаль за замовчуванням на сервері та збережену локаль у браузері, що може спричинити hydration mismatch. У такому разі підключіть провайдер вашого фреймворку або передайте локаль.

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

## Примітки щодо поведінки

### Caching

Результати кешуються в кеші на рівні модуля за допомогою ключа `key + locale + selector`. Повторне виклик `getIntlayer("app", "fr")` інтерпретує словник один раз і повертає той самий об'єкт потім.

### Відсутні словники

Під час розробки, якщо запросити ключ, для якого не було згенеровано словник, виводиться попередження один раз і повертається безпечний резервний проксі: читання `content.title` повертає рядок `"app.title"` замість викидання помилки. Це дозволяє сторінці залишатися функціональною, поки відсутня декларація не буде виправлена. Запустіть збірку Intlayer (або dev сервер), щоб словник був згенеровано.

### Розмір bundle

`getIntlayer` читає об'єднаний словник, який містить **кожну** локаль. У клієнтських bundle'ах [плагіни збірки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) переписують виклик, щоб відправляється тільки необхідний контент. Коли ви читаєте контент поза рендерингом (метадані, loader'и, серверні функції) і хочете, щоб одна локаль завантажувалася за запитом, використовуйте замість цього [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayerAsync.md).

- [плагіни збірки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)
- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayerAsync.md)

## Пов'язані функції

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayerAsync.md)
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getDictionary.md)
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md)

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
