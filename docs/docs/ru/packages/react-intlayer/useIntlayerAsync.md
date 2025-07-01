---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация по хуку useIntlayerAsync | react-intlayer
description: Узнайте, как использовать хук useIntlayerAsync для пакета react-intlayer
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
---

# Интеграция с React: Документация по хуку `useIntlayerAsync`

Хук `useIntlayerAsync` расширяет функциональность `useIntlayer`, возвращая не только предварительно загруженные словари, но и асинхронно получая обновления, что делает его идеальным для приложений, которые часто обновляют локализованный контент после первоначального рендера.

## Обзор

- **Асинхронная загрузка словарей:**  
  При первоначальном монтировании `useIntlayerAsync` сначала возвращает любой предварительно загруженный или статически включённый словарь локали (так же, как и `useIntlayer`), а затем асинхронно загружает и объединяет любые новые доступные удалённые словари.
- **Управление состоянием загрузки:**  
  Хук также предоставляет состояние `isLoading`, которое указывает, когда происходит загрузка удалённого словаря. Это позволяет разработчикам отображать индикаторы загрузки или скелетоны для более плавного пользовательского опыта.

## Настройка окружения

Intlayer предоставляет безголовую систему управления источниками контента (CSM), которая позволяет неразработчикам легко управлять и обновлять содержимое приложения. Используя интуитивно понятную панель управления Intlayer, ваша команда может редактировать локализованный текст, изображения и другие ресурсы без прямого изменения кода. Это упрощает процесс управления контентом, способствует сотрудничеству и обеспечивает возможность быстрого и лёгкого внесения обновлений.

Чтобы начать работу с Intlayer:

1. **Зарегистрируйтесь и получите токен доступа** на [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Добавьте учетные данные в файл конфигурации:**  
   В вашем React-проекте настройте клиент Intlayer с вашими учетными данными:

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

3. **Отправка нового словаря локализации в Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   Эта команда загружает ваши начальные словари контента, делая их доступными для асинхронного получения и редактирования через платформу Intlayer.

## Импорт `useIntlayerAsync` в React

В ваших React-компонентах импортируйте `useIntlayerAsync`:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## Параметры

1. **`key`**:  
   **Тип**: `DictionaryKeys`  
   Ключ словаря, используемый для идентификации блока локализованного контента. Этот ключ должен быть определён в ваших файлах декларации контента.

2. **`locale`** (необязательно):  
   **Тип**: `Locales`  
   Конкретная локаль, на которую вы хотите ориентироваться. Если не указано, хук использует локаль из текущего контекста Intlayer.

3. **`isRenderEditor`** (необязательно, по умолчанию `true`):  
   **Тип**: `boolean`  
   Определяет, должен ли контент быть готов к отображению с наложением редактора Intlayer. Если установлено в `false`, возвращаемые данные словаря не будут содержать функции, специфичные для редактора.

## Возвращаемое значение

Хук возвращает объект словаря, содержащий локализованный контент, ключами которого являются `key` и `locale`. Также он включает булево значение `isLoading`, указывающее, загружается ли в данный момент удалённый словарь.

## Пример использования в React-компоненте

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Контент загружается...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Загрузка…</h1>
          <p>Пожалуйста, подождите, пока контент обновляется.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Контент загружается...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Загрузка…</h1>
          <p>Пожалуйста, подождите, пока контент обновляется.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Контент загружается...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Загрузка…</h1>
          <p>Пожалуйста, подождите, пока контент обновляется.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**Ключевые моменты:**

- При первоначальном рендере `title` и `description` берутся из предварительно загруженного или статически встроенного словаря локали.
- Пока `isLoading` равно `true`, в фоновом режиме выполняется запрос на получение обновлённого словаря.
- После завершения запроса `title` и `description` обновляются с новым содержимым, а `isLoading` возвращается в `false`.

## Обработка локализации атрибутов

Вы также можете получать локализованные значения атрибутов для различных HTML-свойств (например, `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Файлы словарей

Все ключи содержимого должны быть определены в ваших файлах декларации содержимого для обеспечения типовой безопасности и предотвращения ошибок во время выполнения. Эти файлы позволяют выполнять проверку TypeScript, гарантируя, что вы всегда ссылаетесь на существующие ключи и локали.

Инструкции по настройке файлов декларации контента доступны [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

## Дополнительная информация

- **Визуальный редактор Intlayer:**  
  Интеграция с визуальным редактором Intlayer для управления и редактирования контента непосредственно из пользовательского интерфейса. Подробнее [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

---

В итоге, `useIntlayerAsync` — это мощный React-хук, предназначенный для улучшения пользовательского опыта и поддержания актуальности контента путем объединения предварительно отрендеренных или предварительно загруженных словарей с асинхронными обновлениями словарей. Используя `isLoading` и декларации контента на основе TypeScript, вы можете бесшовно интегрировать динамический, локализованный контент в ваши React-приложения.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
