---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Автозаповнення
description: Дізнайтеся, як використовувати функцію автозаповнення в Intlayer для автоматичного заповнення контенту на основі заздалегідь визначених шаблонів. Дотримуйтесь цієї документації, щоб ефективно реалізувати можливості автозаповнення у вашому проєкті.
keywords:
  - Автозаповнення
  - Автоматизація контенту
  - Динамічний контент
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 7.0.0
    date: 2025-10-23
    changes: Перейменовано `autoFill` на `fill` та оновлено поведінку
  - version: 6.0.0
    date: 2025-09-20
    changes: Додано глобальну конфігурацію
  - version: 6.0.0
    date: 2025-09-17
    changes: Додано змінну `{{fileName}}`
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізовано історію
---

# Заповнення файлів декларації контенту

**Файли декларації контенту з автозаповненням** у вашому CI — це спосіб прискорити робочий процес розробки.

## Розуміння поведінки

Команда `fill` має два режими:

- **Complete**: Автоматично заповнює весь відсутній контент для кожної локалі та редагує поточний файл або інший файл, якщо вказано. Тобто режим Complete пропускає переклад наявного контенту, якщо він уже перекладений.
- **Review**: Автоматично заповнює **весь** контент для кожної локалі та генерує файл для поточного або вказаного іншого файлу.

Команда `fill` обробляє лише ваші локальні файли декларації контенту. Тобто вона не обробляє віддалений контент із CMS — CMS має власну систему керування перекладами.
Якщо ви використовуєте плагіни, такі як `@intlayer/sync-json-plugin`, Intlayer перетворить JSON-файли на файли декларацій локалізованого контенту. Тобто вони будуть оброблятися командою `fill`.

У новостворених файлах міститься інструкція `filled` як метадані словника. Ця інструкція використовується Intlayer, щоб визначити, чи файл був автозаповнений, і, якщо так, пропустити цей файл при наступному перекладі.

Intlayer також враховуватиме такі інструкції для автозаповнення:

- Із вашого файлу `.content.{ts|js|json}` → інструкція `fill`
- Із конфігураційного файлу `.intlayer.config.ts` → інструкція `dictionary.fill`
- Якщо ніде не вказано — за замовчуванням буде встановлено `true`

Для деклараційних файлів вмісту, що призначені для окремої локалі (per-locale), інструкція `true` буде замінена на `./{{fileName}}.fill.content.json`. Це відбувається тому, що такий per-locale деклараційний файл вмісту не може отримувати додатковий локалізований вміст. Отже, буде згенеровано новий файл, щоб не перезаписувати існуючий файл.

## Поведінка за замовчуванням

За замовчуванням глобальний параметр `fill` встановлено в `true`, що означає, що Intlayer автоматично заповнюватиме всі файли вмісту та редагуватиме сам файл. Цю поведінку можна налаштувати кількома способами:

### Глобальні параметри конфігурації

1. **`fill: true` (default)** - Автоматично заповнювати всі локалі та редагувати поточний файл
2. **`fill: false`** - Вимкнути автоматичне заповнення для цього файлу вмісту
3. **`fill: "./relative/path/to/file"`** - Створює/оновлює вказаний файл без редагування поточного, вказуючи на відносний шлях, який резольвується на основі розташування поточного файлу
4. **`fill: "/absolute/path/to/file"`** - Створює/оновлює вказаний файл без редагування поточного, вказуючи шлях, що резольвується відносно базового каталогу (поле `baseDir` у файлі конфігурації `.intlayer.config.ts`)
5. **`fill: "C:\\absolute\path\to\file"`** - Створює/оновлює вказаний файл без редагування поточного, вказуючи на абсолютний шлях, який резольвується на основі вашої операційної системи
6. **`fill: { [key in Locales]?: string }`** - Створює/оновлює вказаний файл для кожної локалі

### Зміни поведінки у v7

У версії v7 поведінка команди `fill` була оновлена:

- **`fill: true`** - Перезаписує поточний файл із заповненим вмістом для всіх локалей
- **`fill: "path/to/file"`** - Заповнює вказаний файл, не змінюючи поточний файл
- **`fill: false`** - Повністю відключає автоматичне заповнення

При використанні опції шляху для запису в інший файл механізм fill працює через _master-slave_ зв'язок між файлами декларацій вмісту. Основний (master) файл є джерелом істини, і коли він оновлюється, Intlayer автоматично застосовує ці зміни до похідних (filled) файлів декларацій, вказаних у шляху.

### Налаштування для кожної локалі

Ви також можете налаштувати поведінку для кожної локалі, використовуючи об'єкт:

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  content: {
    internationalization: {
      locales: [Locales.ENGLISH, Locales.FRENCH, Locales.POLISH],
      defaultLocale: Locales.ENGLISH,
      requiredLocales: [Locales.ENGLISH], // Рекомендовано, щоб уникнути помилки Property 'pl' is missing in type '{ en: string; xxx } on your t function if
    },
  },
  dictionary: {
    fill: {
      en: true, // Заповнює та редагує поточний файл для англійської
      fr: "./translations/fr.json", // Створює окремий файл для французької
      es: false, // Вимикає заповнення для іспанської
    },
  },
};
```

Це дозволяє мати різну поведінку заповнення для різних локалей у межах одного проєкту.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  fill: "./example.content.json",
  content: {
    contentExample: "Це приклад вмісту",
  },
} satisfies Dictionary;

export default exampleContent;
```

Ось [файл декларації вмісту на рівні локалі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md), який використовує інструкцію `fill`.

Потім, коли ви виконаєте наступну команду:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer автоматично згенерує похідний файл декларації за адресою `src/components/example/example.content.json`, заповнивши всі локалі, які ще не оголошені в основному файлі.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "uk": "Це приклад вмісту",
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Після цього обидва файли декларацій будуть об'єднані в один словник, доступний за допомогою стандартного хука `useIntlayer("example")` (React) / composable (Vue).

## Глобальна конфігурація

Ви можете налаштувати глобальну конфігурацію автоматичного заповнення у файлі `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Автоматично згенерувати відсутні переклади для всіх словників
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // автоматично згенерувати відсутні переклади для всіх словників, як при використанні "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

Ви все ще можете тонко налаштувати для кожного словника, використовуючи поле `fill` у файлах контенту. Intlayer спочатку врахує конфігурацію для конкретного словника, а потім відкотиться до глобальної конфігурації.

## Формат автозаповнених файлів

Рекомендований формат для автозаповнених файлів декларацій — **JSON**, оскільки це допомагає уникнути обмежень форматування. Однак Intlayer також підтримує `.ts`, `.js`, `.mjs`, `.cjs` та інші формати.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "./example.filled.content.ts",
  content: {
    // Ваш контент
  },
};
```

Це згенерує файл за шляхом:

```
src/components/example/example.filled.content.ts
```

> Генерація `.js`, `.ts` та схожих файлів працює таким чином:
>
> - Якщо файл вже існує, Intlayer розпарсить його, використовуючи AST (Abstract Syntax Tree), щоб знайти кожне поле та вставити будь-які відсутні переклади.
> - Якщо файл не існує, Intlayer згенерує його, використовуючи шаблон файлу декларації контенту за замовчуванням.

## Абсолютні шляхи

Поле `fill` також підтримує абсолютні шляхи.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/example.content.json",
  content: {
    // Ваш контент
  },
};
```

Це згенерує файл за шляхом:

```
/messages/example.content.json
```

## Автогенерація файлів декларацій контенту для кожної локалі

Поле `fill` також підтримує генерацію **файлів декларацій контенту для кожної локалі**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Ваш контент
  },
};
```

Це згенерує два окремі файли:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> У цьому випадку, якщо об'єкт не містить усіх локалей, Intlayer пропустить генерацію решти локалей.

## Фільтрація автозаповнення для певної локалі

Використання об'єкта у полі `fill` дозволяє застосовувати фільтри та генерувати лише файли для певних локалей.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Ваш контент
  },
};
```

Це згенерує лише файл перекладу французькою.

## Змінні шляху

Ви можете використовувати змінні всередині шляху `fill`, щоб динамічно формувати цільові шляхи для згенерованих файлів.

**Доступні змінні:**

- `{{locale}}` – код локалі (наприклад `fr`, `es`)
- `{{fileName}}` – ім'я файлу (наприклад `index`)
- `{{key}}` – ключ словника (наприклад `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Ваш вміст
  },
};
```

Це згенерує:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "./{{fileName}}.content.json",
  content: {
    // Ваш вміст
  },
};
```

Це згенерує:

/// `./index.content.json`
/// `./index.content.json`
