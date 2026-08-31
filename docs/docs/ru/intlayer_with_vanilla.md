---
createdAt: 2026-03-31
updatedAt: 2026-08-30
title: "Vanilla JS i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Vanilla JS. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
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
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 8.4.10
    date: 2026-03-31
    changes: "Инициализация истории"
author: aymericzip
---

# Переведите ваш сайт на Vanilla JS с помощью Intlayer | Интернационализация (i18n)

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Содержание

<TOC/>

## Почему Intlayer лучше альтернатив?

По сравнению с основными решениями, такими как i18next или i18n.js, Intlayer — это решение, которое включает в себя встроенные оптимизации, такие как:

<AccordionGroup>

<Accordion header="Полное покрытие Vanilla JS">

Intlayer оптимизирован для идеальной работы с Vanilla JavaScript, предлагая **независимое от платформы управление контентом**, **поддержку TypeScript** и все функции, необходимые для масштабирования интернационализации (i18n).

</Accordion>

<Accordion header="Размер бандла">

Вместо загрузки огромных файлов JSON на свои страницы загружайте только необходимый контент. Intlayer помогает **уменьшить размер бандла и страниц до 50 %**.

</Accordion>

<Accordion header="Удобство обслуживания">

Определение области содержимого вашего приложения **облегчает обслуживание** крупномасштабных приложений. Вы можете дублировать или удалить отдельную папку функций, не утруждав себя мысленным бременем проверки всей кодовой базы контента. Кроме того, Intlayer **полностью типизирован**, что обеспечивает точность вашего контента.

</Accordion>

<Accordion header="Агент ИИ">

Совместное размещение контента **уменьшает контекст, необходимый** для моделей большого языка (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствия переводов,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, и **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**, чтобы сделать работу разработчика (DX) еще более удобной для агентов ИИ.

</Accordion>

<Accordion header="Автоматизация">

Используйте автоматизацию для перевода в своем конвейере CI/CD, используя LLM по вашему выбору за счет вашего поставщика ИИ. Intlayer также предлагает **компилятор** для автоматизации извлечения контента, а также [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), которая помогает **переводить в фоновом режиме**.

</Accordion>

<Accordion header="Производительность">

Подключение больших файлов JSON к компонентам может привести к проблемам с производительностью и реактивностью. Intlayer оптимизирует загрузку контента во время сборки (build time).

</Accordion>

<Accordion header="Масштабирование с помощью не-разработчиками">

Intlayer — это больше, чем просто решение i18n. Он предоставляет **автономный [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** и **[полный CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, чтобы помочь вам управлять многоязычным контентом в **реальном времени**, упрощая сотрудничество с переводчиками, копирайтерами и другими членами команды. Контент может храниться локально и/или удаленно.

</Accordion>
</AccordionGroup>

---

## Пошаговое руководство по настройке Intlayer в приложении на Vanilla JS

<Steps>

<Step number={1} title="Установка зависимостей">

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

</Step>

<Step number={2} title="Конфигурация вашего проекта">

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

</Step>

<Step number={3} title="Импорт сборки в ваш HTML">

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

</Step>

<Step number={4} title="Инициализация Intlayer в точке входа">

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

</Step>

<Step number={5} title="Объявление вашего контента">

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

> Ваши объявления контента могут быть определены в любом месте вашего приложения, если они включены в директорию `contentDir` (по умолчанию `./src`) и соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Для получения более подробной информации см. [документацию по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={6} title="Использование Intlayer в вашем JavaScript">

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

</Step>

<Step number={7} title="Изменение языка вашего контента" isOptional={true}>

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

</Step>

<Step number={8} title="Переключение атрибутов языка и направления текста HTML" isOptional={true}>

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

</Step>

<Step number={9} title="Ленивая загрузка словарей по языкам" isOptional={true}>

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
> </Step>

</Steps>

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

## Часто задаваемые вопросы

<FAQ>

<Question title="Могу ли я использовать Intlayer без сборщика или фреймворка?">

Да. Это то, что охватывает данное руководство. Вы импортируете бандл `vanilla-intlayer` напрямую в ваш HTML, как показано в шаге 3, инициализируете его в вашей точке входа и читаете ваш контент с помощью `useIntlayer`. Ни Vite, ни webpack, ни какой-либо конвейер сборки не требуются.

</Question>

<Question title="Насколько i18n увеличивает вес моей страницы?">

Гораздо меньше, чем каталог во время выполнения, потому что страница никогда не загружает язык, который не отображает. Контент разрешается из словарей, скомпилированных заранее, а ленивая загрузка по локали держит остальные языки вне начальной полезной нагрузки, пока посетитель не переключится. По сравнению с обычными альтернативами Intlayer сокращает размер бандла и страницы до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md), [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md).

</Question>

<Question title="Могу ли я мигрировать с `i18next`, не переписывая свои скрипты?">

В значительной степени. Следуйте [руководству по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md), чтобы перенести контент. Вы также можете мигрировать постепенно: [плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши существующие каталоги JSON как источник истины и генерирует из них словари Intlayer, поэтому оба слоя остаются синхронизированными, пока вы переносите скрипты по одному.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши исходные файлы, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. См. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md).

Для полностью автоматизированного конвейера [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) делает то же самое во время сборки на исходном коде JSX, TSX, Vue и Svelte, генерируя словари при каждом изменении, поэтому нет ключей, которые нужно поддерживать вручную. Он работает через статический анализ, поэтому строки, существующие только во время выполнения, остаются недоступными, и ему нужно несколько аннотаций, чтобы отличать текст, видимый пользователю, от логики приложения.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Какие существуют решения для интернационализации сайта на чистом JavaScript?">

- **Написанный вручную объект-словарь**, обычно один файл JSON на язык, загружаемый через `fetch`: без зависимостей, но без типизации, без правил множественного числа и без чего-либо, что сообщит вам о недостающем переводе.
- **`i18next`** из CDN: зрелый и независимый от фреймворка, с экосистемой плагинов, но он добавляет среду выполнения и собственную загрузку каталогов.
- **`Intlayer`**: объявленный контент с правилами множественного числа и рода, определением локали, поддержкой письма справа налево и ленивой загрузкой по локали, плюс CLI, которая заполняет недостающие переводы с помощью ИИ, и визуальный редактор для не-разработчиков.

См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md).

</Question>

<Question title="Как прочитать перевод и поместить его в DOM?">

Вызовите `useIntlayer` с ключом вашего словаря и запишите значение в узел сами, как показано в шаге 6. Поскольку здесь нет фреймворка, ничего не перерисовывается само по себе: вы обновляете узлы при смене локали, что охватывает шаг 7.

</Question>

<Question title="Как определяется язык посетителя?">

Из источников, перечисленных в `routing.storage`, обычно сначала cookie, затем заголовок `Accept-Language`, с откатом к вашей локали по умолчанию. Язык, который посетитель выбирает явно, сохраняется, поэтому переживает следующий визит. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Question>

<Question title="Как поддерживать языки с письмом справа налево, такие как арабский или иврит?">

Шаг 8 охватывает это. `getHTMLTextDir` возвращает `ltr`, `rtl` или `auto` для локали, поэтому вы устанавливаете `lang` и `dir` на элементе `html` из активной локали и позволяете логическим свойствам CSS делать остальное.

</Question>

<Question title="Загружают ли посетители все языки?">

Не обязательно, если вы этого не хотите. Шаг 9 охватывает ленивую загрузку словарей по локали, поэтому страница загружает один язык и получает другой только при переключении посетителем. См. [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md).

</Question>

<Question title="Как автоматически перевести приложение с помощью ИИ?">

Запустите `npx intlayer fill`. Она заполняет недостающие переводы с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ, а `--git-diff` ограничивает запуск контентом, изменённым в ветке. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род и форматированный текст?">

Да: [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md) и [форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) для чисел, дат и валют.

</Question>

<Question title="Как переводчики могут редактировать контент, не касаясь кода?">

Через [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), который работает на вашей собственной инфраструктуре и позволяет любому редактировать текст на месте в работающем приложении, или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), которая выносит контент вовне, чтобы он мог меняться без развёртывания.

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая CMS - это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
