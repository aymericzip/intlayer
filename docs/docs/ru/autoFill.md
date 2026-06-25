---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Автозаполнение
description: Узнайте, как использовать функцию автозаполнения в Intlayer для автоматического заполнения контента на основе предопределённых шаблонов. Следуйте этой документации, чтобы эффективно внедрить функции автозаполнения в вашем проекте.
keywords:
  - Автозаполнение
  - Автоматизация контента
  - Динамический контент
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: "Добавлена глобальная конфигурация"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Добавлена переменная `{{fileName}}`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Автоматическое заполнение файлов объявления контента переводов

**Автоматическое заполнение файлов объявления контента** в вашей CI — это способ ускорить рабочий процесс разработки.

## Понимание поведения

Команда `fill` включает два режима:

- **Complete**: Автоматически заполняет все недостающее содержимое для каждой локали и редактирует текущий файл или другой файл, если он указан. То есть режим complete пропустит перевод существующего содержимого, если оно уже переведено.
- **Review**: Автоматически заполняет **все** содержимое для каждой локали и генерирует для конкретного файла или другого файла, если он указан.

Команда fill будет обрабатывать все ваши файлы объявления содержимого локали. То есть она не будет обрабатывать ваше удаленное содержимое из CMS. CMS включает собственное управление переводами.
Если вы используете плагины, такие как `@intlayer/sync-json-plugin`, Intlayer преобразует файлы JSON в файлы объявления содержимого локали. То есть они будут обработаны командой `fill`.

Новые сгенерированные файлы включают инструкцию `filled` в качестве метаданных словаря. Эта инструкция будет использоваться Intlayer для определения того, был ли файл автоматически заполнен или нет, и пропустит этот файл от повторного перевода, если она присутствует.

Intlayer также будет учитывать следующую инструкцию для автоматического заполнения:

- Из вашего `.content.{ts|js|json}` → инструкция `fill`
- Из вашего файла конфигурации `.intlayer.config.ts` → инструкция `dictionary.fill`
- По умолчанию будет установлено значение `true`

Для файлов объявления содержимого для каждой локали инструкция `true` будет заменена на `./{{fileName}}.fill.content.json`. Это потому, что файл объявления содержимого для каждой локали не может получать дополнительное локализованное содержимое. Поэтому он будет генерировать новый файл, чтобы не перезаписать существующий файл.

## Поведение по умолчанию

По умолчанию `fill` установлено в `true` глобально, что означает, что Intlayer будет автоматически заполнять все файлы контента и редактировать сам файл. Это поведение можно настроить несколькими способами:

### Глобальные параметры конфигурации

1. **`fill: true` (по умолчанию)** - Автоматически заполнить все локали и отредактировать текущий файл
2. **`fill: false`** - Отключить автоматическое заполнение для этого файла контента
3. **`fill: "./relative/path/to/file"`** - Создать/обновить указанный файл без редактирования текущего, указав относительный путь, разрешенный на основе расположения текущего файла
4. **`fill: "/absolute/path/to/file"`** - Создать/обновить указанный файл без редактирования текущего, указав относительный путь, разрешенный на основе расположения базовой директории (поле `baseDir` в файле конфигурации `.intlayer.config.ts`)
5. **`fill: "C:\\absolute\path\to\file"`** - Создать/обновить указанный файл без редактирования текущего, указав абсолютный путь, разрешенный на основе вашей операционной системы
6. **`fill: { [key in Locales]?: string }`** - Создать/обновить указанный файл для каждой локали

### Изменения поведения в v7

В v7 поведение команды `fill` было обновлено:

- **`fill: true`** - Перезаписывает текущий файл с заполненным содержимым для всех локалей
- **`fill: "path/to/file"`** - Заполняет указанный файл без изменения текущего файла
- **`fill: false`** - Полностью отключает автоматическое заполнение

При использовании опции пути для записи в другой файл механизм заполнения работает через отношение _master-slave_ между файлами объявления содержимого. Основной файл (master) служит источником истины, и при его обновлении Intlayer автоматически применит эти изменения к производным (заполненным) файлам объявления, указанным в пути.

# Переводы файлов декларации автозаполнения контента

**Файлы декларации автозаполнения контента**, это способ ускорить ваш процесс разработки.

Механизм автозаполнения работает через _мастер-слейв_ отношения между файлами декларации контента. Когда основной (мастер) файл обновляется, Intlayer автоматически применяет эти изменения к производным (автозаполненным) файлам декларации.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "Это пример контента", // пример контента
  },
} satisfies Dictionary;

export default exampleContent;
```

Вот [файл декларации контента для каждого локаля](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md), использующий инструкцию `autoFill`.

Затем, когда вы выполните следующую команду:

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer автоматически сгенерирует производный файл декларации по пути `src/components/example/example.content.json`, заполняя все локали, которые ещё не объявлены в основном файле.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

После этого оба файла деклараций будут объединены в один словарь, доступный через стандартный хук `useIntlayer("example")` (react) / композицию (vue).

## Глобальная конфигурация

Вы можете настроить глобальную конфигурацию автозаполнения в файле `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Автогенерация отсутствующих переводов для всех словарей
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // автогенерация отсутствующих переводов для всех словарей, как при использовании "./{{fileName}}.content.json"
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

Вы по-прежнему можете настраивать каждый словарь отдельно, используя поле `fill` в файлах содержимого. Intlayer сначала рассмотрит конфигурацию каждого словаря, а затем вернётся к глобальной конфигурации.

## Формат автозаполненного файла

Рекомендуемый формат для автоматически заполняемых файлов деклараций, **JSON**, который помогает избежать ограничений форматирования. Однако Intlayer также поддерживает форматы `.ts`, `.js`, `.mjs`, `.cjs` и другие.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует файл по адресу:

```
src/components/example/example.filled.content.ts
```

> Генерация файлов `.js`, `.ts` и подобных работает следующим образом:
>
> - Если файл уже существует, Intlayer будет парсить его с помощью AST (Абстрактного синтаксического дерева), чтобы найти каждое поле и вставить отсутствующие переводы.
> - Если файл не существует, Intlayer сгенерирует его, используя шаблон файла декларации содержимого по умолчанию.

## Абсолютные пути

Поле `autoFill` также поддерживает абсолютные пути.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует файл по адресу:

```
/messages/example.content.json
```

## Автоматическая генерация файлов деклараций содержимого для каждого локаля

Поле `autoFill` также поддерживает генерацию файлов деклараций содержимого **для каждого локаля**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует два отдельных файла:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> В этом случае, если объект не содержит все локали, Intlayer пропускает генерацию оставшихся локалей.

## Фильтрация автозаполнения для конкретной локали

Использование объекта в поле `autoFill` позволяет применять фильтры и генерировать файлы только для определённых локалей.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует только файл перевода на французский язык.

## Переменные пути

Вы можете использовать переменные внутри пути `autoFill` для динамического определения целевых путей для сгенерированных файлов.

**Доступные переменные:**

- `{{locale}}` – Код локали (например, `fr`, `es`)
- `{{fileName}}` – Имя файла (например, `index`)
- `{{key}}` – Ключ словаря (например, `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует:

- `./index.content.json`
- `./index.content.json`
