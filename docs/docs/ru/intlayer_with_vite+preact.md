---
docName: intlayer_with_vite_preact
url: https://intlayer.org/doc/environment/vite-and-preact
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+preact.md
createdAt: 2025-04-18
updatedAt: 2025-04-18
title: Переведите свой сайт Vite и Preact (i18n)
description: Узнайте, как сделать ваш сайт на Vite и Preact многоязычным. Следуйте документации для интернационализации (i18n) и перевода.
keywords:
  - интернационализация
  - Документация
  - Intlayer
  - Vite
  - Preact
  - JavaScript
---

# Начало работы с интернационализацией (i18n) с Intlayer, Vite и Preact

> Этот пакет находится в разработке. Подробнее см. в [задаче](https://github.com/aymericzip/intlayer/issues/118). Проявите интерес к Intlayer для Preact, поставив лайк задаче.

Смотрите [шаблон приложения](https://github.com/aymericzip/intlayer-vite-preact-template) на GitHub.

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека с открытым исходным кодом для интернационализации (i18n), разработанная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автоматически генерируемых типов, улучшая автозаполнение и обнаружение ошибок.
- **Использовать расширенные функции**, такие как динамическое определение и переключение локалей.

---

## Пошаговое руководство по настройке Intlayer в приложении на Vite и Preact

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [объявлениями контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md), транспиляцией и [CLI-командами](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

- **preact-intlayer**
  Пакет, интегрирующий Intlayer с приложением Preact. Он предоставляет контекстные провайдеры и хуки для интернационализации в Preact.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также middleware для определения предпочтительной локали пользователя, управления cookie и обработки перенаправлений URL.

### Шаг 2: Конфигурация вашего проекта

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

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправление через middleware, имена cookie, расположение и расширение ваших объявлений контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> Плагин `intlayerPlugin()` для Vite используется для интеграции Intlayer с Vite. Он обеспечивает создание файлов объявлений контента и их мониторинг в режиме разработки. Он определяет переменные окружения Intlayer в приложении Vite. Кроме того, он предоставляет алиасы для оптимизации производительности.

### Шаг 4: Объявление вашего контента

Создайте и управляйте объявлениями контента для хранения переводов:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ru: "Логотип Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      ru: "Логотип Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      ru: "счет равен ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      ru: (
        <>
          Редактируйте <code>src/app.tsx</code> и сохраните для тестирования HMR
        </>
      ),
      en: (
        <>
          Edit <code>src/app.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      ru: "Нажмите на логотипы Vite и Preact, чтобы узнать больше",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // Необходимо, если вы используете JSX напрямую в .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ru: "Логотип Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      ru: "Логотип Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      ru: "счет равен ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      ru: "Редактируйте src/app.jsx и сохраните для тестирования HMR",
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      ru: "Нажмите на логотипы Vite и Preact, чтобы узнать больше",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Необходимо, если вы используете JSX напрямую в .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ru: "Логотип Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      ru: "Логотип Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      ru: "счет равен ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      // Для JSX в .cjs убедитесь, что ваш процесс сборки (например, Babel/SWC с Vite) настроен для преобразования JSX Preact.
      // Альтернативно, используйте функции h: edit: t({ en: <>Edit {h('code', null, 'src/app.jsx')} and save to test HMR</> })
      en: (
        <>
          Edit <code>src/app.jsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.jsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.jsx</code> y guarda para probar HMR
        </>
      ),
      ru: (
        <>
          Редактируйте <code>src/app.jsx</code> и сохраните для тестирования HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      ru: "Нажмите на логотипы Vite и Preact, чтобы узнать больше",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "ru": "Логотип Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact",
        "ru": "Логотип Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact",
        "ru": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "ru": "счет равен "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "ru": "Редактируйте src/app.tsx и сохраните для тестирования HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información",
        "ru": "Нажмите на логотипы Vite и Preact, чтобы узнать больше"
      }
    }
  }
}
```

> Ваши декларации контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию, `./src`). И соответствуют расширению файла декларации контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения дополнительной информации обратитесь к [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

> Если ваш файл контента включает код TSX, вам может потребоваться импортировать `import { h } from "preact";` или убедиться, что ваша директива JSX правильно настроена для Preact.

### Шаг 5: Используйте Intlayer в вашем коде

Получайте доступ к словарям контента по всему вашему приложению:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Предполагается, что у вас есть preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Предполагается, что ваш CSS файл называется app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> Если вы хотите использовать ваш контент в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Примечание: В Preact, `className` обычно пишется как `class`.

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md) (API аналогичен для `preact-intlayer`).

### (Опционально) Шаг 6: Измените язык вашего контента

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет установить локаль приложения и обновить контент соответствующим образом.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Изменить язык на английский
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Сменить язык на английский
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Сменить язык на английский
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md) (API аналогичен для `preact-intlayer`).

### (Опционально) Шаг 7: Добавьте локализованный роутинг в ваше приложение

Цель этого шага — создать уникальные маршруты для каждого языка. Это полезно для SEO и дружественных к SEO URL.
Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> По умолчанию маршруты не имеют префикса для языка по умолчанию. Если вы хотите добавить префикс для языка по умолчанию, вы можете установить опцию `middleware.prefixDefault` в `true` в вашей конфигурации. Подробнее см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

Чтобы добавить локализованный роутинг в ваше приложение, вы можете создать компонент `LocaleRouter`, который оборачивает маршруты вашего приложения и обрабатывает маршрутизацию на основе локали. Вот пример с использованием [preact-iso](https://github.com/preactjs/preact-iso):

Сначала установите `preact-iso`:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Управляет определением локали на основе URL и её проверкой.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Определяем текущую локаль, используя локаль по умолчанию, если она не указана
  const currentLocale = locale ?? defaultLocale;

  // Убираем префикс локали из пути для создания базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault равен true, локаль по умолчанию всегда должна иметь префикс.
   */
  if (middleware.prefixDefault) {
    // Проверяем локаль
    if (!locale || !locales.includes(locale)) {
      // Перенаправляем на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Заменяем текущую запись в истории на новую
        />
      );
    }

    // Оборачиваем дочерние элементы в IntlayerProvider и устанавливаем текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равен false, локаль по умолчанию не имеет префикса.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Исключаем локаль по умолчанию
        )
        .includes(currentLocale) // Проверяем, есть ли текущая локаль в списке допустимых локалей
    ) {
      // Перенаправляем на путь без префикса локали
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Оборачиваем дочерние элементы в IntlayerProvider и устанавливаем текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Компонент роутера, который настраивает маршруты, зависящие от локали.
 * Использует preact-iso для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// Импорт необходимых зависимостей и функций
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // Необходимо для JSX

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Управляет определением локали на основе URL и её проверкой.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Определяем текущую локаль, используя локаль по умолчанию, если она не указана
  const currentLocale = locale ?? defaultLocale;

  // Убираем префикс локали из пути для создания базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault равен true, локаль по умолчанию всегда должна иметь префикс.
   */
  if (middleware.prefixDefault) {
    // Проверяем локаль
    if (!locale || !locales.includes(locale)) {
      // Перенаправляем на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Заменяем текущую запись в истории на новую
        />
      );
    }

    // Оборачиваем дочерние элементы в IntlayerProvider и устанавливаем текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равен false, локаль по умолчанию не имеет префикса.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Исключаем локаль по умолчанию
        )
        .includes(currentLocale) // Проверяем, есть ли текущая локаль в списке допустимых локалей
    ) {
      // Перенаправляем на путь без префикса локали
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Оборачиваем дочерние элементы в IntlayerProvider и устанавливаем текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

// Импорт необходимых зависимостей и функций
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // Необходимо для JSX

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Управляет определением и проверкой локали на основе URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Определение текущей локали, с использованием локали по умолчанию, если не указано
  const currentLocale = locale ?? defaultLocale;

  // Удаление префикса локали из пути для создания базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault равно true, локаль по умолчанию всегда должна быть с префиксом.
   */
  if (middleware.prefixDefault) {
    // Проверка локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправление на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Заменить текущую запись в истории на новую
        />
      );
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равно false, локаль по умолчанию не имеет префикса.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Проверить, находится ли текущая локаль в списке допустимых локалей
    ) {
      // Перенаправление на путь без префикса локали
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, зависящие от локали.
 * Использует preact-iso для управления навигацией и рендеринга локализованных компонентов.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Затем вы можете использовать компонент `LocaleRouter` в своем приложении:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Ваш компонент AppContent (определен в шаге 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Ваш компонент AppContent (определен в шаге 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Ваш компонент AppContent (определен в шаге 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

Параллельно вы также можете использовать `intLayerMiddlewarePlugin` для добавления маршрутизации на стороне сервера в ваше приложение. Этот плагин автоматически определяет текущую локаль на основе URL и устанавливает соответствующий cookie локали. Если локаль не указана, плагин определяет наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не обнаружена, он перенаправляет на локаль по умолчанию.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Опционально) Шаг 8: Изменение URL при изменении локали

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso предоставляет полный URL
      // Построить URL с обновленной локалью
      // Пример: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Обновить путь URL
      route(pathWithLocale, true); // true для замены
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // Программная навигация после установки локали будет обработана через onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Локаль - например, FR */}
              {localeItem}
            </span>
            <span>
              {/* Язык на своем языке - например, Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущей локали - например, Francés с текущей локалью, установленной на Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // Для JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // Для JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> Ссылки на документацию:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md) (API аналогичен для `preact-intlayer`)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)
> - [`hreflang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ru)
> - [`lang` attribute](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/ru/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> - [Popover API](https://developer.mozilla.org/ru/docs/Web/API/Popover_API)

---

### (Необязательно) Шаг 9: Переключение атрибутов языка и направления HTML

Когда ваше приложение поддерживает несколько языков, важно обновлять атрибуты `lang` и `dir` тега `<html>` в соответствии с текущей локалью. Это обеспечивает:

- **Доступность**: Читалки экрана и вспомогательные технологии полагаются на правильный атрибут `lang` для точного произношения и интерпретации контента.
- **Отображение текста**: Атрибут `dir` (направление) гарантирует, что текст отображается в правильном порядке (например, слева направо для английского, справа налево для арабского или иврита), что важно для читаемости.
- **SEO**: Поисковые системы используют атрибут `lang` для определения языка вашей страницы, помогая предоставлять правильный локализованный контент в результатах поиска.

Динамически обновляя эти атрибуты при изменении локали, вы гарантируете последовательный и доступный опыт для пользователей на всех поддерживаемых языках.

#### Реализация хука

Создайте пользовательский хук для управления HTML-атрибутами. Хук отслеживает изменения локали и обновляет атрибуты соответствующим образом:

import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

- Обновляет атрибуты `lang` и `dir` элемента HTML <html> в зависимости от текущей локали.
- - `lang`: Информирует браузеры и поисковые системы о языке страницы.
- - `dir`: Обеспечивает правильный порядок чтения (например, 'ltr' для английского, 'rtl' для арабского).
-
- Это динамическое обновление необходимо для правильного отображения текста, доступности и SEO.

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Обновляет атрибут языка в соответствии с текущей локалью.
    document.documentElement.lang = locale;

    // Устанавливает направление текста в зависимости от текущей локали.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Обновляет атрибуты `lang` и `dir` элемента HTML <html> в зависимости от текущей локали.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Обновляет атрибуты `lang` и `dir` элемента HTML <html> в зависимости от текущей локали.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Использование хука в вашем приложении

Интегрируйте хук в ваш основной компонент, чтобы атрибуты HTML обновлялись при изменении локали:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer уже импортирован, если AppContent его использует
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Определение AppContent из Шага 5

const AppWithHooks: FunctionalComponent = () => {
  // Применяет хук для обновления атрибутов lang и dir тега <html> в зависимости от локали.
  useI18nHTMLAttributes();

  // Предполагается, что AppContent — это ваш основной компонент отображения контента из Шага 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Определение AppContent из Шага 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// Определение AppContent из Шага 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

Применяя эти изменения, ваше приложение будет:

- Обеспечивать, чтобы атрибут **языка** (`lang`) корректно отражал текущую локаль, что важно для SEO и поведения браузера.
- Настраивать **направление текста** (`dir`) в зависимости от локали, улучшая читаемость и удобство использования для языков с разным порядком чтения.
- Предоставлять более **доступный** опыт, так как вспомогательные технологии зависят от этих атрибутов для оптимальной работы.

### (Необязательно) Шаг 10: Создание компонента локализованной ссылки

Чтобы убедиться, что навигация в вашем приложении учитывает текущую локаль, вы можете создать пользовательский компонент `Link`. Этот компонент автоматически добавляет префикс к внутренним URL-адресам с текущим языком.

Это поведение полезно по нескольким причинам:

- **SEO и пользовательский опыт**: Локализованные URL-адреса помогают поисковым системам правильно индексировать страницы на определенных языках и предоставляют пользователям контент на их предпочтительном языке.
- **Согласованность**: Используя локализованную ссылку по всему приложению, вы гарантируете, что навигация остается в пределах текущей локали, предотвращая неожиданные переключения языка.
- **Удобство поддержки**: Централизация логики локализации в одном компоненте упрощает управление URL-адресами.

Для Preact с `preact-iso` обычно используются стандартные теги `<a>` для навигации, а `preact-iso` обрабатывает маршрутизацию. Если вам нужно программное управление навигацией при клике (например, для выполнения действий перед переходом), вы можете использовать функцию `route` из `useLocation`. Вот как можно создать пользовательский компонент ссылки, который локализует URL-адреса:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Предполагается, что useLocation и route могут быть из preact-iso через preact-intlayer, если реэкспортированы, или импортированы напрямую
// Если не реэкспортированы, импортируйте напрямую: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // Для HTMLAttributes
import { forwardRef } from "preact/compat"; // Для передачи ссылок

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Необязательно: для замены состояния истории
}

/**
 * Утилита для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Пользовательский компонент ссылки, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок используется `getLocalizedUrl` для добавления префикса URL с локалью (например, /ru/about).
 * Это гарантирует, что навигация остается в контексте текущей локали.
 * Используется стандартный тег <a>, но может инициировать навигацию на стороне клиента с использованием функции `route` из preact-iso.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // из preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // Убедитесь, что href определен
        event.button === 0 && // Левый клик
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // Проверка стандартных модификаторов
        !props.target // Не нацелено на новую вкладку/окно
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // Навигация только если URL отличается
          route(hrefI18n, replace); // Используйте функцию route из preact-iso
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";

import { useLocation, route } from "preact-iso"; // Импорт из preact-iso
import { forwardRef } from "preact/compat";
import { h } from "preact"; // Для JSX

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // Импорт из preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Для JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Как это работает

- **Определение внешних ссылок**:  
  Вспомогательная функция `checkIsExternalLink` определяет, является ли URL внешним. Внешние ссылки остаются неизменными.
- **Получение текущей локали**:  
  Хук `useLocale` предоставляет текущую локаль.
- **Локализация URL**:  
  Для внутренних ссылок `getLocalizedUrl` добавляет префикс текущей локали к URL.
- **Навигация на стороне клиента**:
  Функция `handleClick` проверяет, является ли ссылка внутренней, и нужно ли предотвратить стандартную навигацию. Если да, используется функция `route` из `preact-iso` (полученная через `useLocation` или импортированная напрямую) для выполнения навигации на стороне клиента. Это обеспечивает поведение, похожее на SPA, без полной перезагрузки страницы.
- **Возврат ссылки**:  
  Компонент возвращает элемент `<a>` с локализованным URL и пользовательским обработчиком кликов.

### Настройка TypeScript

Intlayer использует расширение модулей для получения преимуществ TypeScript и повышения надежности вашего кода.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Рекомендуется для Preact 10+
    // ...
  },
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

> Убедитесь, что ваш `tsconfig.json` настроен для Preact, особенно параметры `jsx` и `jsxImportSource` или `jsxFactory`/`jsxFragmentFactory` для более старых версий Preact, если вы не используете настройки по умолчанию `preset-vite`.

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их добавления в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автозаполнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Предпросмотр переведенного контента** в строке.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Дальнейшие шаги

## Чтобы углубиться, вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
