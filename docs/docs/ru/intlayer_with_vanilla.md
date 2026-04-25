---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n — Как перевести приложение на Vanilla JS в 2026 году
description: Узнайте, как сделать ваш сайт на Vanilla JS многоязычным. Следуйте документации по интернационализации (i18n) и переводу.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "Инициализация истории"
---

# Переведите ваш сайт на Vanilla JS с помощью Intlayer | Интернационализация (i18n)

## Содержание

<TOC/>

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека интернационализации (i18n) с открытым исходным кодом, созданная для упрощения поддержки нескольких языков в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** благодаря автоматически генерируемым типам, что улучшает автодополнение и обнаружение ошибок.
- **Пользоваться расширенными функциями**, такими как динамическое определение и переключение языка.

В этом руководстве показано, как использовать Intlayer в приложении на Vanilla JavaScript **без использования менеджера пакетов или сборщика** (такого как Vite, Webpack и т. д.).

Если ваше приложение использует сборщик (например, Vite), мы рекомендуем вместо этого следовать [Руководству по Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+vanilla.md).

Используя автономную сборку (standalone bundle), вы можете импортировать Intlayer напрямую в HTML-файлы через один JavaScript-файл, что делает его идеальным для устаревших проектов или простых статических сайтов.

---

## Пошаговое руководство по настройке Intlayer в приложении на Vanilla JS

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
# Создание автономной сборки intlayer и vanilla-intlayer
# Этот файл будет импортирован в ваш HTML-файл
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Инициализация intlayer с файлом конфигурации
npx intlayer init --no-gitignore

# Сборка словарей
npx intlayer build
```

```bash packageManager="pnpm"
# Создание автономной сборки intlayer и vanilla-intlayer
# Этот файл будет импортирован в ваш HTML-файл
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Инициализация intlayer с файлом конфигурации
pnpm intlayer init --no-gitignore

# Сборка словарей
pnpm intlayer build
```

```bash packageManager="yarn"
# Создание автономной сборки intlayer и vanilla-intlayer
# Этот файл будет импортирован в ваш HTML-файл
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Инициализация файла конфигурации intlayer, TypeScript (если настроен), переменных окружения
yarn intlayer init --no-gitignore

# Сборка словарей
yarn intlayer build
```

```bash packageManager="bun"
# Создание автономной сборки intlayer и vanilla-intlayer
# Этот файл будет импортирован в ваш HTML-файл
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Инициализация intlayer с файлом конфигурации
bun x intlayer init --no-gitignore

# Сборка словарей
bun x intlayer build
```

- **intlayer**
  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **vanilla-intlayer**
  Пакет, интегрирующий Intlayer с чистыми приложениями на JavaScript / TypeScript. Он предоставляет синглтон pub/sub (`IntlayerClient`) и вспомогательные функции на основе обратных вызовов (`useIntlayer`, `useLocale` и т. д.), чтобы любая часть вашего приложения могла реагировать на изменение языка без зависимости от UI-фреймворка.

> Экспорт сборки (bunding) CLI `intlayer standalone` создает оптимизированную сборку за счет исключения неиспользуемого кода (tree-shaking) неиспользуемых пакетов, локалей и второстепенной логики (такой как редиректы или префиксы), специфичной для вашей конфигурации.

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие языки
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Через этот файл конфигурации вы можете настроить локализованные URL, перенаправление через middleware, имена куки, расположение и расширение ваших объявлений контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Импорт сборки в ваш HTML

После того как вы сгенерировали сборку `intlayer.js`, вы можете импортировать ее в свой HTML-файл:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />

    <!-- Импорт сборки -->
    <script src="./intlayer.js" defer></script>
    <!-- Импорт вашего основного скрипта -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

Сборка предоставляет `Intlayer` и `VanillaIntlayer` в качестве глобальных объектов на `window`.

### Шаг 4: Инициализация Intlayer в точке входа

В вашем `src/main.js` вызовите `installIntlayer()` **до** того, как какой-либо контент будет отрисован, чтобы глобальный синглтон языка был готов.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Должно быть вызвано перед отрисовкой любого i18n-контента.
installIntlayer();
```

Если вы также хотите использовать рендерер markdown, вызовите `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

### Шаг 5: Объявление вашего контента

Создавайте и управляйте объявлениями контента для хранения переводов:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, если они включены в директорию `contentDir` (по умолчанию `./src`) и соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Для получения более подробной информации см. [документацию по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Шаг 6: Использование Intlayer в вашем JavaScript

Объект `window.VanillaIntlayer` предоставляет вспомогательные функции API: `useIntlayer(key, locale?)` возвращает переведенный контент для заданного ключа.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Получение начального контента для текущего языка.
// Соедините с .onChange(), чтобы получать уведомления при смене языка.
const content = useIntlayer("app").onChange((newContent) => {
  // Перерисовываем или обновляем только затронутые DOM-узлы
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Начальная отрисовка
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Получайте дочерние значения в виде строк, оборачивая их в `String()`, что вызывает метод `toString()` узла и возвращает переведенный текст.
>
> Если вам нужно значение для нативного HTML-атрибута (например, `alt`, `aria-label`), используйте `.value` напрямую:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

### (Опционально) Шаг 7: Изменение языка вашего контента

Чтобы изменить язык вашего контента, используйте функцию `setLocale`, предоставляемую `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Язык");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // Поддерживаем список в актуальном состоянии, если язык был изменен в другом месте
  return subscribe((newLocale) => render(newLocale));
}
```

### (Опционально) Шаг 8: Переключение атрибутов языка и направления текста HTML

Обновляйте атрибуты `lang` и `dir` тега `<html>` в соответствии с текущим языком для обеспечения доступности и SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (Опционально) Шаг 9: Ленивая загрузка словарей по языкам

Если вы хотите загружать словари лениво для каждого языка, вы можете использовать `useDictionaryDynamic`. Это полезно, если вы не хотите включать все переводы в начальный файл `intlayer.js`.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Примечание: `useDictionaryDynamic` требует, чтобы словари были доступны в виде отдельных файлов ESM. Этот подход обычно используется, если у вас есть веб-сервер, раздающий словари.

### Настройка TypeScript

Убедитесь, что ваша конфигурация TypeScript включает автоматически генерируемые типы.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Расширение для VS Code

Чтобы улучшить процесс разработки с Intlayer, вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для недостающих переводов.
- **Встроенный предпросмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения более подробной информации об использовании расширения см. [документацию расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Идите дальше

Чтобы пойти дальше, вы можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешнюю среду с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
