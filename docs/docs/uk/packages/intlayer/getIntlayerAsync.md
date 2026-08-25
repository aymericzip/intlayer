---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Документація функції getIntlayerAsync | intlayer
description: Дізнайтеся, як використовувати функцію getIntlayerAsync з пакета intlayer
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
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
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Документація: функція `getIntlayerAsync` в `intlayer`

## Опис

Функція `getIntlayerAsync` вибирає один словник за його ключем і розв'язує його вміст для заданої локалі, **завантажуючи тільки цю локаль**.

Це асинхронний аналог [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayer.md), призначений для місць, де словник читається поза рендеруванням — маршрути `head` / конструктори метаданих, лодери, серверні функції.

Де `getIntlayer` завантажує об'єднаний словник, що містить кожну локаль, [плагіни збірки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) переписують цей виклик у `getDictionaryAsync(loaderMap, key, locale)`, спрямовуючи його на фрагменти для кожної локалі в `.intlayer/dynamic_dictionaries/`. Таким чином, пакет ніколи не містить нічого, крім фактично запитаної локалі.

Без цих плагінів — необоптимізована збірка — виклик розв'язується через синхронний реєстр словників: той же вміст, але без поділу по локалях.

**Ключові особливості:**

- Ті самі типізовані ключі, селектори та повернений вміст, що й у `getIntlayer`
- Завантажує тільки запитаний фрагмент локалі в оптимізованих збірках
- Одночасні виклики для одного й того ж фрагмента діляться одним завантаженням
- Безпечна для використання в асинхронних конструкторах метаданих, лодерах та серверних функціях

---

## Function Signature

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Обов'язковий
  localeOrSelector?: LocalesValues | DictionarySelector, // Необов'язковий
  plugins?: Plugins[]                         // Необов'язковий
): Promise<DeepTransformContent<...>>
```

---

## Параметри

- `key: DictionaryKeys`
  - **Опис**: Ключ словника для читання, як оголошено у ваших файлах вмісту.
  - **Тип**: `DictionaryKeys` — об'єднання всіх оголошених ключів словника.
  - **Обов'язково**: Так

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Опис**: Локаль для інтерпретації вмісту або об'єкт селектора для [динамічних словників](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md).
    - `'fr'` — локаль
    - `{ item: 2 }` — елемент [колекції](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/collections.md) (пропустіть `item`, щоб отримати кожен елемент як масив)
    - `{ variant: 'black-friday' }` — названий [варіант](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/variants.md) (пропустіть для `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — структурований варіант
    - Будь-який селектор може містити локаль: `{ item: 2, locale: 'fr' }`
  - **Тип**: `LocalesValues | DictionarySelector`
  - **Обов'язково**: Ні (Опціонально) — за замовчуванням використовується налаштована `defaultLocale`.

- `plugins: Plugins[]`
  - **Опис**: Користувацькі трансформатори вузлів, що замінюють базові плагіни інтерпретатора. Тільки для розширеного використання.
  - **Тип**: `Plugins[]`
  - **Обов'язково**: Ні (Опціонально)

### Повертає

- **Тип**: `Promise<Content>` — promise, що розв'язується в інтерпретований вміст словника, типізований на основі вашої декларації.

---

## Приклад використання

### Базове використання

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Returns            | Вміст                                                                                                           | Promise вмісту                                     |
| Dictionary loaded  | Об'єднаний словник (усі локалі)                                                                                 | Фрагмент тільки запитаної локалі                   |
| Best suited for    | Rendering, синхронні кодові шляхи                                                                               | Metadata, loaders, серверні функції                |
| Requires a plugin? | No                                                                                                              | No — розділення за локалями потребує build plugins |

Обидві функції приймають однакові аргументи та повертають один і той же вміст: перемикання між ними змінює лише **коли** та **скільки** завантажується.

---

## Пов'язані функції

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayer.md): Синхронний еквівалент, який читає об'єднаний словник.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getDictionaryAsync.md): Низькорівнева функція, яку переписують плагіни збірки.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocale.md): Визначає локаль вхідного запиту.

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
