---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация по хуку useIntlayerAsync | next-intlayer
description: Узнайте, как использовать хук useIntlayerAsync для пакета next-intlayer
keywords:
  - useIntlayerAsync
  - словарь
  - ключ
  - Intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayerAsync
---

# Интеграция с Next.js: Документация по хуку `useIntlayerAsync`

Хук `useIntlayerAsync` расширяет функциональность `useIntlayer`, возвращая не только предварительно отрендеренные словари, но и асинхронно загружая обновления, что делает его идеальным для приложений, которые часто обновляют локализованный контент после первоначального рендера.

## Обзор

- **Асинхронная загрузка словарей:**  
  На стороне клиента `useIntlayerAsync` сначала возвращает предварительно отрендеренный словарь локали (так же, как и `useIntlayer`), а затем асинхронно загружает и объединяет любые новые доступные удалённые словари.
- **Управление состоянием загрузки:**  
  Хук также предоставляет состояние `isLoading`, которое указывает, когда происходит загрузка удалённого словаря. Это позволяет разработчикам отображать индикаторы загрузки или скелетоны для более плавного пользовательского опыта.

## Настройка окружения

Intlayer предоставляет безголовую систему управления источниками контента (CSM), которая позволяет неразработчикам легко управлять и обновлять содержимое приложения. Используя интуитивно понятную панель управления Intlayer, ваша команда может редактировать локализованные тексты, изображения и другие ресурсы без прямого изменения кода. Это упрощает процесс управления контентом, способствует сотрудничеству и обеспечивает возможность быстрого и лёгкого внесения обновлений.

Чтобы начать работу с Intlayer, вам сначала нужно зарегистрироваться и получить токен доступа на [панели управления](https://intlayer.org/dashboard). После получения учетных данных добавьте их в файл конфигурации, как показано ниже:

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

После настройки ваших учетных данных вы можете загрузить новый словарь локали в Intlayer, выполнив команду:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Эта команда загружает ваши начальные словари контента, делая их доступными для асинхронного получения и редактирования через платформу Intlayer.

## Импорт `useIntlayerAsync` в Next.js

Поскольку `useIntlayerAsync` предназначен для **клиентских** компонентов, импортируйте его из той же клиентской точки входа, что и `useIntlayer`:

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

Убедитесь, что импортируемый файл аннотирован директивой `"use client"` в начале, если вы используете Next.js App Router с разделением серверных и клиентских компонентов.

## Параметры

1. **`key`**:  
   **Тип**: `DictionaryKeys`  
   Ключ словаря, используемый для идентификации блока локализованного контента. Этот ключ должен быть определён в ваших файлах декларации контента.

2. **`locale`** (необязательно):  
   **Тип**: `Locales`  
   Конкретная локаль, на которую вы хотите ориентироваться. Если не указано, хук использует локаль из клиентского контекста.

3. **`isRenderEditor`** (необязательно, по умолчанию `true`):  
   **Тип**: `boolean`  
   Определяет, должен ли контент быть готовым для рендеринга с наложением редактора Intlayer. Если установлено в `false`, возвращаемые данные словаря не будут содержать функции, специфичные для редактора.

## Возвращаемое значение

Хук возвращает объект словаря, содержащий локализованный контент, ключи которого — `key` и `locale`. Также он включает булевое значение `isLoading`, указывающее, загружается ли в данный момент удалённый словарь.

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

**Ключевые моменты:**

- При первоначальном рендеринге `title` и `description` берутся из предварительно отрендеренного словаря локали.
- Пока `isLoading` равно `true`, в фоновом режиме выполняется удалённый запрос для получения обновлённого словаря.
- После завершения запроса `title` и `description` обновляются с новым содержимым, а `isLoading` возвращается к значению `false`.

## Обработка локализации атрибутов

Как и с `useIntlayer`, вы можете получать локализованные значения атрибутов для различных HTML-свойств (например, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Файлы словарей

Все ключи контента должны быть определены в ваших файлах деклараций контента для обеспечения типовой безопасности и предотвращения ошибок во время выполнения. Эти файлы позволяют TypeScript выполнять проверку, гарантируя, что вы всегда ссылаетесь на существующие ключи и локали.

Инструкции по настройке файлов декларации контента доступны [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

## Дополнительная информация

- **Визуальный редактор Intlayer:**  
  Интеграция с визуальным редактором Intlayer для управления и редактирования контента непосредственно из пользовательского интерфейса. Подробнее [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

---

В итоге, `useIntlayerAsync` — это мощный клиентский хук, предназначенный для улучшения пользовательского опыта и поддержания актуальности контента за счёт объединения предварительно отрендеренных словарей с асинхронными обновлениями словарей. Используя `isLoading` и декларации контента на основе TypeScript, вы можете бесшовно интегрировать динамический, локализованный контент в ваши приложения Next.js.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
