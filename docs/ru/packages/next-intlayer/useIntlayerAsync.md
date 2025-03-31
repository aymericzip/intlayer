# Next.js Интеграция: Документация по хуку `useIntlayerAsync`

Хук `useIntlayerAsync` расширяет функциональность `useIntlayer`, возвращая не только предварительно отрендеренные словари, но и асинхронно загружая обновления, что делает его идеальным для приложений, которые часто обновляют локализованный контент после начального рендера.

## Обзор

- **Асинхронная загрузка словарей:**  
  На стороне клиента `useIntlayerAsync` сначала возвращает предварительно отрендеренный словарь локали (так же, как `useIntlayer`), а затем асинхронно загружает и объединяет любые новые удаленные словари.
- **Управление состоянием прогресса:**  
  Хук также предоставляет состояние `isLoading`, указывающее, когда загружается удаленный словарь. Это позволяет разработчикам отображать индикаторы загрузки или скелетон-элементы для более плавного пользовательского опыта.

## Настройка окружения

Intlayer предоставляет безголовую систему управления источниками контента (CSM), которая позволяет пользователям без технических навыков управлять и обновлять контент приложения. Используя интуитивно понятную панель управления Intlayer, ваша команда может редактировать локализованный текст, изображения и другие ресурсы без прямого изменения кода. Это упрощает процесс управления контентом, способствует сотрудничеству и обеспечивает возможность быстрого и легкого внесения изменений.

Чтобы начать работу с Intlayer, сначала зарегистрируйтесь и получите токен доступа на [https://intlayer.org/dashboard](https://intlayer.org/dashboard). После получения учетных данных добавьте их в файл конфигурации, как показано ниже:

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

После настройки учетных данных вы можете загрузить новый словарь локали в Intlayer, выполнив:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Эта команда загружает ваши начальные словари контента, делая их доступными для асинхронной загрузки и редактирования через платформу Intlayer.

## Импорт `useIntlayerAsync` в Next.js

Поскольку `useIntlayerAsync` предназначен для **клиентских** компонентов, импортируйте его из той же точки входа клиента, что и `useIntlayer`:

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

Убедитесь, что файл, в который вы импортируете, аннотирован `"use client"` в начале, если вы используете App Router Next.js с разделением серверных и клиентских компонентов.

## Параметры

1. **`key`**:  
   **Тип**: `DictionaryKeys`  
   Ключ словаря, используемый для идентификации блока локализованного контента. Этот ключ должен быть определен в ваших файлах декларации контента.

2. **`locale`** (опционально):  
   **Тип**: `Locales`  
   Конкретная локаль, которую вы хотите использовать. Если параметр не указан, хук использует локаль из клиентского контекста.

3. **`isRenderEditor`** (опционально, по умолчанию `true`):  
   **Тип**: `boolean`  
   Определяет, должен ли контент быть готовым для рендеринга с наложением редактора Intlayer. Если установлено в `false`, возвращаемые данные словаря будут исключать функции, специфичные для редактора.

## Возвращаемое значение

Хук возвращает объект словаря, содержащий локализованный контент, связанный с `key` и `locale`. Также он включает булево значение `isLoading`, указывающее, загружается ли в данный момент удаленный словарь.

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

- При первом рендере `title` и `description` берутся из предварительно отрендеренного словаря локали.
- Пока `isLoading` равно `true`, в фоновом режиме выполняется удаленный запрос для загрузки обновленного словаря.
- После завершения загрузки `title` и `description` обновляются с учетом нового контента, а `isLoading` возвращается в `false`.

## Локализация атрибутов

Как и с `useIntlayer`, вы можете получить локализованные значения атрибутов для различных HTML-свойств (например, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Файлы словарей

Все ключи контента должны быть определены в ваших файлах декларации контента для обеспечения безопасности типов и предотвращения ошибок во время выполнения. Эти файлы позволяют использовать проверку TypeScript, гарантируя, что вы всегда ссылаетесь на существующие ключи и локали.

Инструкции по настройке файлов декларации контента доступны [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md).

## Дополнительная информация

- **Визуальный редактор Intlayer:**  
  Интеграция с визуальным редактором Intlayer для управления и редактирования контента напрямую из интерфейса. Подробнее [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md).

---

**В заключение**, `useIntlayerAsync` , это мощный клиентский хук, предназначенный для улучшения пользовательского опыта и поддержания актуальности контента, объединяя предварительно отрендеренные словари с асинхронными обновлениями. Используя `isLoading` и декларации контента на основе TypeScript, вы можете легко интегрировать динамический, локализованный контент в свои приложения Next.js.
