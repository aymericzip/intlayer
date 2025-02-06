# Next.js Интернационализация (i18n) с next-i18next и Intlayer

Как next-i18next, так и Intlayer являются открытыми фреймворками интернационализации (i18n), разработанными для приложений Next.js. Они широко используются для управления переводами, локализацией и переключением языков в программных проектах.

Обе решения включают три основных понятия:

1. **Декларация контента**: Метод определения переводимого контента вашего приложения.

   - Называемый `resource` в случае `i18next`, декларация контента - это структурированный объект JSON, содержащий пары ключ-значение для переводов на одном или нескольких языках. Смотрите [документацию i18next](https://www.i18next.com/translation-function/essentials) для получения дополнительной информации.
   - Называемый `content declaration file` в случае `Intlayer`, декларация контента может быть JSON, JS или TS файлом, экспортирующим структурированные данные. Смотрите [документацию Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/doc/concept/content) для получения дополнительной информации.

2. **Утилиты**: Инструменты для создания и интерпретации деклараций контента в приложении, такие как `getI18n()`, `useCurrentLocale()`, или `useChangeLocale()` для next-i18next, и `useIntlayer()` или `useLocale()` для Intlayer.

3. **Плагины и промежуточные программы**: Функции для управления перенаправлением URL, оптимизацией сборки и другим, такие как `next-i18next/middleware` для next-i18next или `intlayerMiddleware` для Intlayer.

## Intlayer против i18next: Ключевые различия

Чтобы изучить различия между i18next и Intlayer, ознакомьтесь с нашим [next-i18next против next-intl против Intlayer](https://github.com/aymericzip/intlayer/blob/main/blog/ru/i18next_vs_next-intl_vs_intlayer.md) блогом.

## Как сгенерировать словари next-i18next с Intlayer

### Почему использовать Intlayer с next-i18next?

Файлы декларации контента Intlayer обычно предлагают лучший опыт для разработчиков. Они более гибкие и поддерживаемые благодаря двум основным преимуществам:

1. **Гибкое расположение**: Файл декларации контента Intlayer можно разместить в любом месте файлового дерева приложения, упрощая управление дублируемыми или удаленными компонентами без оставления неиспользуемых деклараций контента.

   Примеры структур файлов:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Файл декларации контента
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Файл декларации контента
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Файл декларации контента
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Файл декларации контента
               └── index.jsx
   ```

2. **Централизованные переводы**: Intlayer хранит все переводы в одном файле, что гарантирует отсутствие пропущенных переводов. При использовании TypeScript отсутствующие переводы автоматически обнаруживаются и сообщаются как ошибки.

### Установка

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### Настройка Intlayer для экспорта словарей i18next

> Экспорт ресурсов i18next не гарантирует совместимость 1:1 с другими фреймворками. Рекомендуется придерживаться конфигурации на основе Intlayer для минимизации проблем.

Чтобы экспортировать ресурсы i18next, настройте Intlayer в файле `intlayer.config.ts`. Примеры конфигураций:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

Вот продолжение и исправление оставшихся частей вашего документа:

---

### Импортирование словарей в вашу конфигурацию i18next

Чтобы импортировать сгенерированные ресурсы в вашу конфигурацию i18next, используйте `i18next-resources-to-backend`. Ниже приведены примеры:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### Декларация контента

Примеры файлов декларации контента в различных форматах:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Соберите ресурсы next-i18next

Чтобы собрать ресурсы next-i18next, выполните следующую команду:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Это создаст ресурсы в директории `./i18next/resources`. Ожидаемый результат:

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Примечание: Пространство имен i18next соответствует ключу декларации Intlayer.

### Реализация плагина Next.js

После настройки реализуйте плагин Next.js, чтобы пересобрать ваши ресурсы i18next, когда файлы деклараций контента Intlayer обновляются.

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Использование контента в компонентах Next.js

После реализации плагина Next.js вы можете использовать контент в своих компонентах:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```
