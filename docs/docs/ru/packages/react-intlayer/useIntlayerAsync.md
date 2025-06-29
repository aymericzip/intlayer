---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayerAsync.md
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

# React Интеграция: Документация хука `useIntlayerAsync`

Хук `useIntlayerAsync` расширяет функциональность `useIntlayer`, возвращая не только предварительно отрендеренные словари, но и асинхронно загружая обновления, что делает его идеальным для приложений, которые часто обновляют локализованный контент после первоначального рендера.

## Обзор

- **Асинхронная загрузка словарей:**  
  При первом монтировании `useIntlayerAsync` сначала возвращает предварительно загруженный или статически встроенный словарь локали (как это делает `useIntlayer`), а затем асинхронно загружает и объединяет любые новые доступные удаленные словари.
- **Управление состоянием загрузки:**  
  Хук также предоставляет состояние `isLoading`, указывающее, когда загружается удаленный словарь. Это позволяет разработчикам отображать индикаторы загрузки или скелетон-элементы для более плавного пользовательского опыта.

## Настройка окружения

Intlayer предоставляет безголовую систему управления источниками контента (CSM), которая позволяет пользователям без навыков программирования управлять и обновлять контент приложения. Используя интуитивно понятную панель управления Intlayer, ваша команда может редактировать локализованный текст, изображения и другие ресурсы без прямого изменения кода. Это упрощает процесс управления контентом, способствует сотрудничеству и обеспечивает быстрые и легкие обновления.

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

3. **Загрузите новый словарь локали в Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   Эта команда загружает ваши начальные словари контента, делая их доступными для асинхронной загрузки и редактирования через платформу Intlayer.

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
   Ключ словаря, используемый для идентификации блока локализованного контента. Этот ключ должен быть определен в ваших файлах декларации контента.

2. **`locale`** (опционально):  
   **Тип**: `Locales`  
   Конкретная локаль, которую вы хотите использовать. Если параметр не указан, хук использует локаль из текущего контекста Intlayer.

3. **`isRenderEditor`** (опционально, по умолчанию `true`):  
   **Тип**: `boolean`  
   Определяет, должен ли контент быть готовым для рендера с наложением редактора Intlayer. Если установлено в `false`, возвращаемые данные словаря будут исключать функции, специфичные для редактора.

## Возвращаемое значение

Хук возвращает объект словаря, содержащий локализованный контент, связанный с `key` и `locale`. Также он включает булево значение `isLoading`, указывающее, загружается ли в данный момент удаленный словарь.

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
- Пока `isLoading` равно `true`, в фоновом режиме выполняется запрос на получение обновленного словаря.
- После завершения загрузки `title` и `description` обновляются с учетом нового контента, а `isLoading` возвращается в `false`.

## Работа с локализацией атрибутов

Вы также можете получить локализованные значения атрибутов для различных HTML-свойств (например, `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Файлы словарей

Все ключи контента должны быть определены в ваших файлах декларации контента для обеспечения безопасности типов и предотвращения ошибок во время выполнения. Эти файлы позволяют использовать проверку TypeScript, гарантируя, что вы всегда ссылаетесь на существующие ключи и локали.

Инструкции по настройке файлов декларации контента доступны [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

## Дополнительная информация

- **Визуальный редактор Intlayer:**  
  Интеграция с визуальным редактором Intlayer для управления и редактирования контента напрямую из пользовательского интерфейса. Подробнее [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

---

**В заключение**, `useIntlayerAsync` , это мощный хук React, предназначенный для улучшения пользовательского опыта и поддержания актуальности контента путем объединения предварительно отрендеренных или предварительно загруженных словарей с асинхронными обновлениями словарей. Используя `isLoading` и декларации контента на основе TypeScript, вы можете легко интегрировать динамический локализованный контент в свои React-приложения.
