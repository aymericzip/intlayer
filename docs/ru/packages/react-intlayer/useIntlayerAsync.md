# Интеграция React: Документация по хуку `useIntlayerAsync`

Хук `useIntlayerAsync` расширяет функциональность `useIntlayer`, возвращая не только заранее отрендеренные словари, но и асинхронно загружая обновления, что делает его идеальным для приложений, которые часто обновляют свой локализованный контент после первичного рендеринга.

## Обзор

- **Асинхронная загрузка словарей:**  
  При первом монтировании `useIntlayerAsync` сначала возвращает любой предварительно загруженный или статически упакованный словарь локали (так же, как это делает `useIntlayer`), а затем асинхронно загружает и объединяет любые доступные удаленные словари.
- **Управление состоянием загрузки:**  
  Хук также предоставляет состояние `isLoading`, указывающее, когда удаленный словарь загружается. Это позволяет разработчикам отображать индикаторы загрузки или скелетные состояния для более плавного пользовательского опыта.

## Настройка окружения

Intlayer предоставляет управляемую систему управления контентом (CSM), позволяющую неразработчикам управлять и обновлять контент приложений без каких-либо затруднений. Используя интуитивную панель управления Intlayer, ваша команда может редактировать локализованный текст, изображения и другие ресурсы без необходимости прямого изменения кода. Это упрощает процесс управления контентом, способствует совместной работе и гарантирует, что обновления могут быть сделаны быстро и легко.

Чтобы начать работу с Intlayer:

1. **Зарегистрируйтесь и получите токен доступа** на [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Добавьте учетные данные в ваш конфигурационный файл:**  
   В вашем проекте React настройте клиент Intlayer с вашими учетными данными:

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

3. **Отправьте новый словарь локали в Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   Эта команда загружает ваши первоначальные словари контента, делая их доступными для асинхронной загрузки и редактирования через платформу Intlayer.

## Импортирование `useIntlayerAsync` в React

В ваших компонентах React импортируйте `useIntlayerAsync`:

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

2. **`locale`** (необязательный):  
   **Тип**: `Locales`  
   Конкретная локаль, которую вы хотите выбрать. Если пропущено, хук использует локаль из текущего контекста Intlayer.

3. **`isRenderEditor`** (необязательный, по умолчанию `true`):  
   **Тип**: `boolean`  
   Определяет, должен ли контент быть готов к рендерингу с наложением редактора Intlayer. Если установлено значение `false`, возвращаемые данные словаря будут исключать функции, специфичные для редактора.

## Возвращаемое значение

Хук возвращает объект словаря, содержащий локализованный контент, организованный по ключу `key` и `locale`. Он также включает булевое значение `isLoading`, указывающее, загружается ли в данное время удаленный словарь.

## Пример использования в компоненте React

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
- Когда `isLoading` равно `true`, фоновый запрос загружает обновленный словарь.
- После завершения загрузки `title` и `description` обновляются с новейшим контентом, и `isLoading` возвращается к `false`.

## Обработка локализации атрибутов

Вы также можете получить локализованные значения атрибутов для различных свойств HTML (например, `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Файлы декларации контента

Все ключи контента должны быть определены в ваших файлах декларации контента для обеспечения безопасности типов и предотвращения ошибок во время выполнения. Эти файлы позволяют выполнять валидацию TypeScript, обеспечивая, что вы всегда ссылаетесь на существующие ключи и локали.

Инструкции по настройке файлов декларации контента доступны [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md).

## Дополнительная информация

- **Визуальный редактор Intlayer:**  
  Интегрируйтесь с визуальным редактором Intlayer для управления и редактирования контента непосредственно из интерфейса. Более подробная информация [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).

---

**В заключение**, `useIntlayerAsync` — мощный хук React, созданный для улучшения пользовательского опыта и поддержания актуальности контента, объединяя заранее отрендеренные или предварительно загруженные словари с асинхронными обновлениями словарей. Используя `isLoading` и декларации контента на основе TypeScript, вы можете бесшовно интегрировать динамический, локализованный контент в ваши приложения React.
