# Интеграция с Next.js: Документация Хука `useIntlayerAsync`

Хук `useIntlayerAsync` расширяет функциональность `useIntlayer`, возвращая не только предварительно отрисованные словари, но и асинхронно загружая обновления, что делает его идеальным для приложений, которые часто обновляют свой локализованный контент после начальной отрисовки.

## Обзор

- **Асинхронная загрузка словарей:**  
  На стороне клиента `useIntlayerAsync` сначала возвращает предварительно отрисованный словарь локали (как и `useIntlayer`), а затем асинхронно загружает и сливает любые новые доступные удаленные словари.
- **Управление состоянием прогресса:**  
  Хук также предоставляет состояние `isLoading`, указывая, когда загружается удаленный словарь. Это позволяет разработчикам отображать индикаторы загрузки или «скелетные» состояния для более плавного пользовательского опыта.

## Настройка окружения

Intlayer предоставляет безголовую систему управления содержимым (CSM), позволяя недевелоперам управлять и обновлять контент приложения без проблем. Используя интуитивно понятную панель инструментов Intlayer, ваша команда может редактировать локализованный текст, изображения и другие ресурсы без необходимости прямо изменять код. Это оптимизирует процесс управления содержимым, способствует сотрудничеству и обеспечивает возможность быстрого и легкого внесения обновлений.

Чтобы начать работу с Intlayer, сначала вам нужно зарегистрироваться и получить токен доступа на [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Получив свои учетные данные, добавьте их в файл конфигурации, как показано ниже:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

export default {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

После настройки ваших учетных данных вы можете отправить новый словарь локали в Intlayer, запустив:

```bash
npm intlayer push -d my-first-dictionary-key
```

Эта команда загружает ваши начальные словари контента, делая их доступными для асинхронной загрузки и редактирования через платформу Intlayer.

## Импортирование `useIntlayerAsync` в Next.js

Поскольку `useIntlayerAsync` предназначен для **клиентских** компонентов, вы должны импортировать его из той же точки входа для клиента, что и `useIntlayer`:

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

Убедитесь, что файл импорта аннотирован `"use client"` вверху, если вы используете маршрутизатор приложения Next.js с разделенными серверными и клиентскими компонентами.

## Параметры

1. **`key`**:  
   **Тип**: `DictionaryKeys`  
   Ключ словаря, используемый для идентификации блока локализованного контента. Этот ключ должен быть определен в ваших файлах декларации контента.

2. **`locale`** (необязательный):  
   **Тип**: `Locales`  
   Конкретная локаль, которую вы хотите нацелить. Если опущено, хук использует локаль из контекста клиента.

3. **`isRenderEditor`** (опционально, по умолчанию `true`):  
   **Тип**: `boolean`  
   Определяет, должен ли контент быть готовым к отображению с наложением редактора Intlayer. Если установлено в `false`, возвращаемые данные словаря будут исключать редакторные функции.

## Возвращаемое значение

Хук возвращает объект словаря, содержащий локализованный контент, сгруппированный по `key` и `locale`. Также включает булевую переменную `isLoading`, указывающую, загружается ли в данный момент удаленный словарь.

## Пример использования в Next.js

### Пример клиентского компонента

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Контент загружается...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Контент загружается...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Контент загружается...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**Основные моменты:**

- При начальной отрисовке `title` и `description` берутся из предварительно отрисованного словаря локали.
- Пока `isLoading` равно `true`, в фоновом режиме выполняется удаленный запрос для получения обновленного словаря.
- Как только загрузка завершится, `title` и `description` обновляются с новыми данными, и `isLoading` возвращается к `false`.

## Обработка локализации атрибутов

Как и в случае с `useIntlayer`, вы можете получать локализованные значения атрибутов для различных свойств HTML (например, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Файлы декларации контента

Все ключи контента должны быть определены в ваших файлах декларации контента для обеспечения типобезопасности и предотвращения ошибок времени выполнения. Эти файлы позволяют выполнять проверку TypeScript, гарантируя, что вы всегда ссылаетесь на существующие ключи и локали.

Инструкции по настройке файлов декларации контента доступны [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

## Дополнительная информация

- **Визуальный редактор Intlayer:**  
  Интегрируйтесь с визуальным редактором Intlayer для управления и редактирования контента непосредственно из пользовательского интерфейса. Более подробная информация [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).

---

**В заключение**, `useIntlayerAsync` — это мощный клиентский хук, предназначенный для повышения качества пользовательского опыта и поддержания актуальности контента, комбинируя предварительно отрисованные словари с асинхронными обновлениями словарей. Используя `isLoading` и декларации контента на основе TypeScript, вы можете без труда интегрировать динамический, локализованный контент в свои приложения Next.js.
