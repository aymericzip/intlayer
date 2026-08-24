---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Документація функції getDictionary | intlayer
description: Дізнайтеся, як використовувати функцію getDictionary для пакету intlayer
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Документація: функція `getDictionary` в `intlayer`

## Опис

Функція `getDictionary` інтерпретує об'єкт словника, **який ви передаєте самі**, і повертає його розв'язаний вміст для заданої локалі. Вона проходить по вмісту за один прохід і застосовує кожен плагін інтерпретатора за необхідності, розв'язуючи переклади `t()`, перерахування, умови, вставки, вкладеність, markdown, HTML та вузли файлів.

На відміну від [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayer.md), який шукає словник за ключем у згенерованому реєстрі, `getDictionary` приймає сам словник. Це робить його правильним інструментом для вмісту, побудованого під час виконання, отриманого з API або CMS, або оголошеного вбудовано в тесті.

**Основні функції:**

- Працює з будь-яким об'єктом, що слідує структурі словника (`{ key, content }`)
- Також приймає кваліфіковану групу словника (колекції, варіанти) разом із селектором
- Повністю типізований: повернений об'єкт відображає `content`, який ви передали
- Приймає спеціальні плагіни інтерпретатора

---

## Сигнатура функції

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Обов'язково
  localeOrSelector?: LocalesValues | DictionarySelector, // Опціонально
  plugins?: Plugins[]                                // Опціонально
): DeepTransformContent<...>
```

---

## Параметри

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Опис**: Словник (або кваліфікована група словників) для інтерпретації.
  - **Тип**: `Dictionary | QualifiedDictionaryGroup`
  - **Обов'язково**: Так

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Опис**: Мова для інтерпретації вмісту або об'єкт селектора (`{ item }`, `{ variant }`, опціонально з `locale`). Див. [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md).
  - **Тип**: `LocalesValues | DictionarySelector`
  - **Обов'язково**: Ні (Опціонально) — за замовчуванням використовується налаштований `defaultLocale`.

- `plugins: Plugins[]`
  - **Опис**: Масив трансформаторів вузлів, які визначають, як інтерпретуються розпізнані вузли. Якщо опущено, використовується стандартний набір плагінів інтерпретатора.
  - **Тип**: `Plugins[]`
  - **Обов'язково**: Ні (Опціонально)

### Повертає

- **Тип**: Інтерпретований вміст словника.
- **Опис**: `content`, яке ви передали, з кожним вузлом Intlayer розв'язаним для запитаної локалі. Для групи колекції без селектора `item` повертається впорядкований масив інтерпретованих записів; `null` повертається, коли селектор не вказує на що-небудь.

---

## Приклад використання

### Базове використання

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        uk: "Привіт",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "uk"
);

console.log(content.greeting); // "Привіт"
```

### Інтерпретація контенту, отриманого під час виконання

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### З селектором

```typescript
import { getDictionary } from "intlayer";

// Кваліфікована група словника розв'язується на один запис…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …або на впорядкований масив, коли `item` не задано
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## Пов'язані функції

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayer.md): Та сама інтерпретація, але словник шукається за ключем у сгенерованому реєстрі.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getDictionaryAsync.md): Аналог для карт завантажувачів для кожної мови.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useDictionary.md): Еквівалент React hook, який читає мову з провайдера.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
