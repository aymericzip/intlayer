---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Перевод вашего сайта на Vite и Solid (i18n)
description: Узнайте, как сделать ваш сайт на Vite и Solid многоязычным. Следуйте документации для интернационализации (i18n) и перевода.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Vite
  - Solid
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-solid
# applicationTemplate: https://github.com/aymericzip/intlayer-vite-solid-template
---

# Начало работы с интернационализацией (i18n) с Intlayer, Vite и Solid

> Этот пакет находится в разработке. Подробнее смотрите в [issue](https://github.com/aymericzip/intlayer/issues/117). Покажите свой интерес к Intlayer для Solid, поставив лайк этому issue.

<!-- Смотрите [шаблон приложения](https://github.com/aymericzip/intlayer-solid-template) на GitHub. -->

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации (i18n), созданная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и содержимое.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, улучшая автодополнение и обнаружение ошибок.
- **Воспользуйтесь расширенными возможностями**, такими как динамическое определение и переключение локали.

---

## Пошаговое руководство по настройке Intlayer в приложении на Vite и Solid

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

- **solid-intlayer**
  Пакет, интегрирующий Intlayer с приложением Solid. Он предоставляет провайдеры контекста и хуки для интернационализации в Solid.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочтительной локали пользователя, управления cookie и обработки перенаправления URL.

### Шаг 2: Настройка вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Конфигурация интернационализации
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Конфигурация интернационализации
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправление в промежуточном ПО, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в вашу конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> Плагин Vite `intlayerPlugin()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов деклараций контента и отслеживает их в режиме разработки. Также он определяет переменные окружения Intlayer внутри приложения Vite. Дополнительно предоставляет алиасы для оптимизации производительности.

### Шаг 4: Объявите ваш контент

Создайте и управляйте декларациями контента для хранения переводов:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {},
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Объявление словаря контента приложения
const appContent = {
  key: "app",
  content: {},
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Объявление словаря контента приложения
const appContent = {
  key: "app",
  content: {},
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {}
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, как только они будут включены в каталог `contentDir` (по умолчанию, `./src`). И соответствовать расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения дополнительной информации обратитесь к [документации по объявлениям контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

### Шаг 5: Использование Intlayer в вашем коде

[будет дополнено]

### (Необязательно) Шаг 6: Изменение языка вашего контента

[будет дополнено]

### (Необязательно) Шаг 7: Добавление локализованной маршрутизации в ваше приложение

[будет дополнено]

### (Необязательно) Шаг 8: Изменение URL при смене локали

[будет дополнено]

### (Необязательно) Шаг 9: Переключение атрибутов языка и направления HTML

[будет дополнено]

### (Необязательно) Шаг 10: Создание локализованного компонента ссылки

[будет дополнено]

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведённого контента.
- **Быстрые действия** для лёгкого создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Продвинутые возможности

Для расширения возможностей вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешний [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
