---
createdAt: 2025-02-07
updatedAt: 2026-01-10
title: Файл контенту
description: Дізнайтеся, як налаштувати розширення для файлів декларації контенту. Дотримуйтесь цієї документації, щоб ефективно реалізувати умови у вашому проєкті.
keywords:
  - Файл контенту
  - Документація
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 7.5.13
    date: 2026-01-10
    changes: Додано підтримку форматів файлів JSON5 та JSONC
  - version: 7.5.0
    date: 2025-12-13
    changes: Додано підтримку форматів ICU та i18next
  - version: 7.0.0
    date: 2025-10-23
    changes: Перейменовано `autoFill` на `fill`
  - version: 6.0.0
    date: 2025-09-20
    changes: Додано документацію для полів
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізовано історію
---

# Файл контенту

<iframe title="i18n, Markdown, JSON… одне рішення, щоб керувати всім | Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Що таке файл контенту?

Файл контенту в Intlayer — це файл, який містить визначення словників.
Такі файли оголошують текстовий контент вашого застосунку, переклади та ресурси.
Файли контенту обробляються Intlayer для генерації словників.

Словники будуть кінцевим результатом, який ваш застосунок імпортуватиме з використанням хуку `useIntlayer`.

### Ключові поняття

#### Словник

Словник — це структурована колекція контенту, організована за ключами. Кожен словник містить:

- **Ключ**: Унікальний ідентифікатор словника
- **Контент**: Фактичні значення контенту (текст, числа, об'єкти тощо)
- **Метадані**: Додаткова інформація, наприклад title, description, tags тощо

#### Файл контенту

Приклад файлу контенту:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Привіт, світ",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      uk: "Український контент",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Менше ніж мінус одна машина",
      "-1": "Мінус одна машина",
      "0": "Немає машин",
      "1": "Одна машина",
      ">5": "Декілька машин",
      ">19": "Багато машин",
    }),
    conditionalContent: cond({
      true: "Валідація увімкнена",
      false: "Валідація вимкнена",
    }),
    insertionContent: insert("Привіт {{name}}!"),
    nestedContent: nest(
      "navbar", // Ключ словника для вкладення
      "login.button" // [Необов'язково] Шлях до вмісту для вкладення
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Приклад Markdown"),

    /*
     * Доступно лише при використанні `react-intlayer` або `next-intlayer`
     */
    jsxContent: <h1>Мій заголовок</h1>,
  },
} satisfies Dictionary<Content>; // [необов'язково] Dictionary — generic тип, який дозволяє уточнити форматування вашого словника
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Привіт, світ",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      uk: "Контент українською",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Менше ніж мінус одна машина",
      "-1": "Мінус одна машина",
      "0": "Немає машин",
      "1": "Одна машина",
      ">5": "Кілька автомобілів",
      ">19": "Багато автомобілів",
    }),
    conditionalContent: cond({
      true: "Валідація увімкнена",
      false: "Валідація вимкнена",
    }),
    insertionContent: insert("Привіт {{name}}!"),
    nestedContent: nest(
      "navbar", // Ключ словника для вкладення
      "login.button" // [Необов'язково] Шлях до вмісту для вкладення
    ),
    markdownContent: md("# Приклад Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Доступно лише при використанні `react-intlayer` або `next-intlayer`
    jsxContent: <h1>Мій заголовок</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Привіт, світ",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      uk: "Вміст українською",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Менше ніж мінус одна машина",
      "-1": "Мінус одна машина",
      "0": "Жодної машини",
      "1": "Одна машина",
      ">5": "Декілька машин",
      ">19": "Багато машин",
    }),
    conditionalContent: cond({
      true: "Валідація увімкнена",
      false: "Валідація вимкнена",
    }),
    insertionContent: insert("Привіт {{name}}!"),
    nestedContent: nest(
      "navbar", // Ключ словника для вкладення
      "login.button" // [Опційно] Шлях до контенту для вкладення
    ),
    markdownContent: md("# Приклад Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Доступно лише при використанні `react-intlayer` або `next-intlayer`
    jsxContent: <h1>Мій заголовок</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Привіт, світ",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "uk": "Український контент",
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Немає автомобілів",
        "1": "Один автомобіль",
        "<-1": "Менше ніж мінус один автомобіль",
        "-1": "Мінус один автомобіль",
        ">5": "Декілька автомобілів",
        ">19": "Багато автомобілів",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Валідація увімкнена",
        "false": "Валідація вимкнена",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Привіт {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Приклад Markdown",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Мій заголовок"],
      },
    },
  },
}
```

#### Вузли контенту

Вузли контенту — це будівельні блоки вмісту словника. Вони можуть бути:

- **Примітивні значення**: strings, numbers, booleans, null, undefined
- **Типізовані вузли**: спеціальні типи контенту, такі як translations, conditions, markdown тощо
- **Функції**: динамічний контент, який може бути виконаний під час виконання [див. Отримання функцій](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/function_fetching.md)
- **Вкладений контент**: посилання на інші словники

#### Типи контенту

Intlayer підтримує різні типи контенту через типізовані вузли:

- **Контент перекладів**: багатомовний текст зі значеннями для конкретних локалей [див. Контент перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/translation_content.md)
- **Умовний контент**: Контент, що залежить від булевих виразів [див. Умовний контент](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/condition_content.md)
- **Контент перелічення**: Контент, який змінюється залежно від переліку значень [див. Контент перелічення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/enumeration_content.md)
- **Вставний контент**: Контент, який можна вставити в інший контент [див. Вставний контент](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion_content.md)
- **Markdown-контент**: Багатий текстовий контент у форматі Markdown [див. Markdown-контент](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown_content.md)
- **Вкладений вміст**: Посилання на інші словники [див. Вкладений вміст](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/nested_content.md)
- **Гендерний вміст**: Вміст, що змінюється залежно від статі [див. Гендерний вміст](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender_content.md)
- **Вміст файлу**: Посилання на зовнішні файли [див. Вміст файлу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/file_content.md)

## Структура словника

Словник в Intlayer визначається типом `Dictionary` і містить кілька властивостей, які керують його поведінкою:

### Обов'язкові властивості

#### `key` (string)

Ідентифікатор словника. Якщо кілька словників мають однаковий key, Intlayer автоматично їх об'єднає.

> Використовуйте формат іменування kebab-case (наприклад, "about-page-meta").

#### `content` (string | number | boolean | object | array | function)

Властивість `content` містить фактичні дані словника та підтримує:

- **Примітивні значення**: рядки, числа, булеві значення, null, undefined
- **Типізовані вузли**: спеціальні типи контенту, що використовують допоміжні функції Intlayer
- **Вкладені об'єкти**: складні структури даних
- **Масиви**: колекції контенту
- **Функції**: динамічна оцінка контенту

### Необов'язкові властивості

#### `title` (string)

Зрозуміла для людини назва словника, яка допомагає ідентифікувати його в редакторах та CMS. Це особливо корисно при керуванні великою кількістю словників або роботі з інтерфейсами систем управління контентом.

**Приклад:**

```typescript
{
  key: "about-page-meta",
  title: "Метадані сторінки «Про нас»",
  content: { /* ... */ }
}
```

#### `description` (string)

Детальний опис, який пояснює призначення словника, рекомендації щодо використання та будь-які особливі зауваження. Цей опис також використовується як контекст для генерації перекладів за допомогою ШІ, що робить його цінним для підтримки якості та послідовності перекладів.

**Приклад:**

```typescript
{
  key: "about-page-meta",
  description: [
    "Цей словник керує метаданими сторінки «Про нас»",
    "Розгляньте кращі практики для SEO:",
    "- Заголовок має містити від 50 до 60 символів",
    "- Опис має містити від 150 до 160 символів",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Масив рядків для категоризації та організації словників. Теги надають додатковий контекст та можуть використовуватись для фільтрації, пошуку або впорядкування словників в редакторах та CMS системах.

**Приклад:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Визначає форматувальник, який використовується для вмісту словника. Це дозволяє застосовувати різні синтаксиси форматування повідомлень.

- `'intlayer'`: Форматувальник Intlayer за замовчуванням.
- `'icu'`: Використовує форматування повідомлень ICU.
- `'i18next'`: Використовує форматування повідомлень i18next.

**Приклад:**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Привіт {name}, у вас {count, plural, one {# повідомлення} other {# повідомлень}}"
  }
}
```

#### `locale` (LocalesValues)

Перетворює словник у словник для конкретної локалі, де кожне поле, вказане в `content`, автоматично перетворюється на вузол перекладу. Коли ця властивість встановлена:

- Словник розглядається як словник однієї локалі
- Кожне поле стає вузлом перекладу для тієї конкретної локалі
- Ви НЕ повинні використовувати вузли перекладу (`t()`) у `content` при використанні цієї властивості
- Якщо ця властивість відсутня, словник буде розглядатися як багатомовний словник

> Див. [Оголошення вмісту по локалях в Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/per_locale_file.md) для додаткової інформації.

**Приклад:**

```json
// Словник для конкретної локалі
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // Це стає вузлом перекладу для 'en'
    "description": "Learn more about our company"
  }
}
```

#### `fill` (Заповнення)

Інструкції для автоматичного заповнення вмісту словника з зовнішніх джерел. Це можна налаштувати глобально в `intlayer.config.ts` або для окремого словника. Підтримує кілька форматів:

- **`true`**: Увімкнути заповнення для всіх локалей
- **`false`**: Вимкнути заповнення для всіх локалей
- **`string`**: Шлях до одного файлу або шаблону з змінними
- **`object`**: Шляхи до файлів для кожної локалі

**Приклади:**

```json
// Вимкнути автозаповнення
{
  "fill": false
}
// Один файл
{
  "fill": "./translations/aboutPage.content.json"
}
// Шаблон з змінними
{
  "fill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Конфігурація для кожної локалі
{
  "fill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Доступні змінні:**

- `{{locale}}` – код локалі (наприклад `fr`, `es`)
- `{{fileName}}` – назва файлу (наприклад `example`)
- `{{key}}` – ключ словника (наприклад `example`)

> Див. [Налаштування автоматичного заповнення в Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/fill.md) для отримання додаткової інформації.

##### `priority` (число)

Вказує пріоритет словника для вирішення конфліктів. Якщо кілька словників містять той самий ключ, словник з найбільшим числом пріоритету перекриє інші. Це корисно для керування ієрархіями контенту та переваженням значень.

**Приклад:**

```typescript
// Базовий словник
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// Словник-перевизначення
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Welcome to our premium service!" }
}
// Це перекриє базовий словник
```

### Властивості CMS

##### `version` (string)

Ідентифікатор версії для віддалених словників. Допомагає відстежувати, яка версія словника використовується на даний момент; особливо корисно при роботі з віддаленими системами управління контентом.

##### `live` (boolean)

Для віддалених словників вказує, чи слід отримувати словник у реальному часі під час виконання. Коли ввімкнено:

- Потребує, щоб `importMode` було встановлено в "live" у `intlayer.config.ts`
- Вимагає запущеного live-сервера
- Словник буде отримано під час виконання за допомогою live sync API
- Якщо режим live увімкнено, але отримання не вдається, відбувається відкат до динамічного значення
- Якщо режим live вимкнено, словник трансформується під час збірки для оптимальної продуктивності

### Системні властивості (Автоматично згенеровані)

Ці властивості автоматично генеруються Intlayer і не повинні змінюватися вручну:

##### `$schema` (string)

JSON-схема, що використовується для валідації структури словника. Автоматично додається Intlayer для забезпечення цілісності словника.

##### `id` (string)

Для віддалених словників це унікальний ідентифікатор словника на віддаленому сервері. Використовується для отримання та керування віддаленим вмістом.

##### `projectIds` (string[])

Для віддалених словників цей масив містить ID проєктів, які можуть використовувати цей словник. Віддалений словник може бути спільно використаний кількома проєктами.

##### `localId` (LocalDictionaryId)

Унікальний ідентифікатор для локальних словників. Автоматично генерується Intlayer, щоб допомогти ідентифікувати словник і визначити, чи є він локальним або віддаленим, а також його розташування.

##### `localIds` (LocalDictionaryId[])

Для злитих словників цей масив містить ID усіх словників, які були об'єднані. Корисно для відстеження джерела злитого вмісту.

##### `filePath` (string)

Шлях до файлу локального словника, що вказує, з якого файлу `.content` було згенеровано словник. Допомагає з налагодженням та відстеженням джерела.

##### `versions` (string[])

Для віддалених словників цей масив містить усі доступні версії словника. Допомагає відстежувати, які версії доступні для використання.

##### `filled` (true)

Вказує, чи словник був автоматично заповнений з зовнішніх джерел. У разі конфліктів базові словники матимуть пріоритет над автоматично заповненими словниками.

##### `location` ('distant' | 'locale')

Вказує місцезнаходження словника:

- `'locale'`: Локальний словник (з файлів контенту)
- `'distant'`: Віддалений словник (із зовнішнього джерела)

## Типи вузлів контенту

Intlayer надає кілька спеціалізованих типів вузлів вмісту, які розширюють базові примітивні значення:

### Перекладний контент (`t`)

Багатомовний контент, що змінюється залежно від локалі:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  uk: "Ласкаво просимо на наш вебсайт",
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Умовний контент (`cond`)

Контент, що змінюється залежно від булевих умов:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "Користувач увійшов",
  false: "Будь ласка, увійдіть, щоб продовжити",
});
```

### Контент переліку (`enu`)

Контент, що змінюється залежно від значень переліку:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Ваш запит очікує розгляду",
  approved: "Ваш запит було схвалено",
  rejected: "Ваш запит було відхилено",
});
```

### Вставний вміст (`insert`)

Вміст, який можна вставляти в інший вміст:

```typescript
import { insert } from "intlayer";

insertionContent: insert("Цей текст можна вставити будь-де");
```

### Вкладений вміст (`nest`)

Посилання на інші словники:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Markdown-вміст (`md`)

Розширений текст у форматі Markdown:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Ласкаво просимо\n\nЦе **жирний** текст з [посиланнями](https://example.com)"
);
```

### Гендерний вміст (`gender`)

Вміст, що змінюється залежно від гендеру:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "Він розробник",
  female: "Вона розробниця",
  other: "Вони розробники",
});
```

### Вміст файлу (`file`)

Посилання на зовнішні файли:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Створення файлів контенту

### Базова структура файлу контенту

Файл контенту експортує об'єкт за замовчуванням, який відповідає типу `Dictionary`:

```typescript
// приклад.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Вміст сторінки привітання",
  description:
    "Контент для головної вітальної сторінки, включно з секцією героя та функціями",
  tags: ["page", "welcome", "homepage"],
  content: {
    hero: {
      title: t({
        uk: "Ласкаво просимо на нашу платформу",
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        uk: "Створюйте дивовижні додатки з легкістю",
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          uk: "Почати",
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          uk: "Зареєструватися",
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          uk: "Простий у використанні",
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          uk: "Інтуїтивний інтерфейс для користувачів з будь-яким рівнем навичок",
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### Файл вмісту в форматі JSON

Ви також можете створювати файли вмісту у форматі JSON:

```json
{
  "key": "welcome-page",
  "title": "Вміст сторінки привітання",
  "description": "Зміст для головної вітальної сторінки",
  "tags": ["сторінка", "привітання"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "uk": "Ласкаво просимо на нашу платформу",
          "en": "Welcome to Our Platform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "uk": "Створюйте дивовижні застосунки з легкістю",
          "en": "Build amazing applications with ease",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### Файли вмісту для кожної локалі

Для словників по локалях вкажіть властивість `locale`:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Ласкаво просимо на нашу платформу",
      subtitle: "Створюйте дивовижні застосунки з легкістю",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Ласкаво просимо на нашу платформу",
      subtitle: "Створюйте дивовижні додатки з легкістю",
    },
  },
} satisfies Dictionary;
```

## Розширення файлів контенту

Intlayer дозволяє налаштовувати розширення файлів декларації контенту. Це налаштування надає гнучкість у керуванні проєктами великого масштабу та допомагає уникати конфліктів з іншими модулями.

### Розширення за замовчуванням

За замовчуванням Intlayer відстежує всі файли з наведеними нижче розширеннями як файли декларацій контенту:

- `.content.json`
- `.content.json5`
- `.content.jsonc`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Ці стандартні розширення підходять для більшості застосунків. Однак якщо у вас є спеціальні вимоги, ви можете визначити власні розширення, щоб оптимізувати процес збірки та зменшити ризик конфліктів з іншими компонентами.

> Щоб налаштувати розширення файлів, які Intlayer використовує для ідентифікації файлів декларацій контенту, ви можете вказати їх у конфігураційному файлі Intlayer. Цей підхід корисний для проектів великого масштабу, де обмеження сфери процесу watch покращує продуктивність збірки.

## Розширені концепції

### Злиття словників

Коли декілька словників мають один і той самий ключ, Intlayer автоматично їх зливає. Поведінка злиття залежить від кількох факторів:

- **Priority**: Словники з більшими значеннями `priority` перекривають ті, що мають менші значення
- **Автозаповнення проти Бази**: базові словники мають перевагу над автоматично заповненими словниками
- **Розташування**: локальні словники мають перевагу над віддаленими словниками (коли пріоритети рівні)

### Безпека типів

Intlayer забезпечує повну підтримку TypeScript для файлів контенту:

```typescript
// Визначте тип вашого контенту
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Використайте це у вашому словнику
export default {
  key: "welcome-page",
  content: {
    // TypeScript надасть автозаповнення та перевірку типів
    hero: {
      title: "Welcome",
      subtitle: "Build amazing apps",
      cta: "Get Started",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Вкладення вузлів

Ви можете без проблем вкладати функції одна в одну.

Приклад:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` повертає `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        uk: "Привіт",
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Композитний контент, що вкладає умову, перелік (enumeration) та багатомовний контент
    // `getIntlayer('page','en').advancedContent(true)(10)` повертає 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          uk: "Не знайдено жодного елемента",
          en: "No items found",
... (rest of file continues)
          "0": t({
          uk: "Жодних елементів не знайдено",
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          uk: "Знайдено один елемент",
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          uk: "Знайдено кілька елементів",
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        uk: "Немає дійсних даних",
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` повертає `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        uk: "Привіт",
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Складений контент, що вкладає cond, enu та багатомовний вміст
    // `getIntlayer('page','en').advancedContent(true)(10)` повертає 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          uk: "Елементів не знайдено",
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          uk: "Знайдено один елемент",
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          uk: "Знайдено кілька елементів",
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        uk: "Немає дійсних даних",
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` повертає `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        uk: "Привіт",
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Складовий контент, що вкладає умову, перелік та багатомовний контент
    // `getIntlayer('page','en').advancedContent(true)(10) повертає 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          uk: "Елементів не знайдено",
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          uk: "Знайдено один елемент",
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          uk: "Знайдено кілька елементів",
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        uk: "Немає дійсних даних",
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
        uk: "Немає дійсних даних",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "uk": "Привіт",
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "uk": "Жодних елементів не знайдено",
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "uk": "Знайдено один елемент",
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "uk": "Знайдено кілька елементів",
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "uk": "Немає дійсних даних",
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### Найкращі практики

1. **Конвенції найменувань**:
   - Використовуйте kebab-case для ключів словника (`"about-page-meta"`)
   - Групуйте пов'язаний контент під одним префіксом ключа

2. **Організація контенту**:
   - Зберігайте пов'язаний контент разом у тому ж словнику
   - Використовуйте вкладені об'єкти для організації складних структур контенту
   - Використовуйте теги для категоризації
   - Використовуйте `fill`, щоб автоматично заповнювати відсутні переклади

3. **Продуктивність**:
   - Налаштуйте конфігурацію контенту, щоб обмежити область відстежуваних файлів
   - Використовуйте live dictionaries лише коли потрібні оновлення в реальному часі (наприклад, A/B тестування тощо)
   - Переконайтеся, що плагін трансформації збірки (`@intlayer/swc`, or `@intlayer/babel`) увімкнений, щоб оптимізувати словник під час збірки
