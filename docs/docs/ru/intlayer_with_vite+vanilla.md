---
createdAt: 2026-03-23
updatedAt: 2026-05-31
title: "Vite + Vanilla JS i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Vite + Vanilla JS. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
applicationShowcase: https://intlayer-vite-vanilla.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 8.4.10
    date: 2026-03-23
    changes: "Начальная история"
author: aymericzip
---

# Переведите ваш сайт на Vite и Vanilla JS с помощью Intlayer | Интернационализация (i18n)

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-vite-vanilla.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-vite-vanilla-template"
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

<Accordion header="Полное покрытие Vite">

Intlayer оптимизирован для идеальной работы с Vite, предлагая **независимое от платформы управление контентом**, **поддержку TypeScript** и все функции, необходимые для масштабирования интернационализации (i18n).

</Accordion>

<Accordion header="Размер бандла">

Вместо загрузки огромных файлов JSON на свои страницы загружайте только необходимый контент. Intlayer помогает **уменьшить размер бандла и страниц до 50 %**.

</Accordion>

<Accordion header="Удобство обслуживания">

Определение области содержимого вашего приложения **облегчает обслуживание** крупномасштабных приложений. Вы можете дублировать или удалить отдельную папку функций, не утруждав себя мысленным бременем проверки всей кодовой базы контента. Кроме того, Intlayer **полностью типизирован**, что обеспечивает точность вашего контента.

</Accordion>

<Accordion header="Агент ИИ">

Совместное размещение контента **уменьшает контекст, необходимый** для моделей большого языка (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствия переводов,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, и **[навыки агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, чтобы сделать работу разработчика (DX) еще более удобной для агентов ИИ.

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

## Пошаговое руководство по настройке Intlayer в приложении на Vite и Vanilla JS

<Steps>

<Step number={1} title="Установка зависимостей">

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> флаг `--interactive` не является обязательным. Используйте `intlayer-cli init`, если вы являетесь ИИ-агентом.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **vanilla-intlayer**
  Пакет для интеграции Intlayer в приложения на чистом JavaScript / TypeScript. Он предоставляет синглтон pub/sub (`IntlayerClient`) и вспомогательные функции на основе колбэков (`useIntlayer`, `useLocale` и т. д.), чтобы любая часть вашего приложения могла реагировать на изменения языка без зависимости от UI-фреймворка.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также посредник (middleware) для определения предпочтительного языка пользователя, управления куки и обработки перенаправления URL.

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

> Через этот файл конфигурации вы можете настроить локализованные URL, перенаправление посредника, имена куки, местоположение и расширение ваших объявлений контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в конфигурацию Vite">

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов объявления контента и отслеживает их изменения в режиме разработки. Он определяет переменные окружения Intlayer внутри приложения Vite. Кроме того, он предоставляет псевдонимы (aliases) для оптимизации производительности.

</Step>

<Step number={4} title="Инициализация Intlayer в точке входа">

Вызовите `installIntlayer()` **перед** рендерингом любого контента, чтобы глобальный синглтон языка был готов.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// Должно быть вызвано перед рендерингом любого i18n контента.
installIntlayer();

// Импортируйте и запустите модули вашего приложения.
import "./app.js";
```

Если вы также используете объявления контента `md()` (Markdown), установите также рендерер макрдауна:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

</Step>

<Step number={5} title="Объявление вашего контента">

Создавайте объявления контента для хранения переводов и управляйте ими:

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
      es: "Нажмите на логотип Vite, чтобы узнать больше",
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
        "es": "Нажмите на логотип Vite, чтобы узнать больше"
      }
    }
  }
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, при условии, что они включены в каталог `contentDir` (по умолчанию `./src`) и соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Дополнительную информацию см. в [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={6} title="Использование Intlayer в вашем JavaScript">

`vanilla-intlayer` повторяет поверхностный API `react-intlayer`: `useIntlayer(key, locale?)` возвращает переведенный контент напрямую. Добавьте `.onChange()` к результату, чтобы подписаться на изменения языка - это явный эквивалент ререндеринга в React.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// Получите начальный контент для текущего языка.
// Добавьте .onChange(), чтобы получать уведомления при смене языка.
const content = useIntlayer("app").onChange((newContent) => {
  // Перерисуйте или обновите только затронутые узлы DOM
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// Начальный рендеринг
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> Обращайтесь к значениям как к строкам, оборачивая их в `String()`, что вызывает метод `toString()` узла и возвращает переведенный текст.
>
> Когда вам нужно значение для стандартного HTML-атрибута (например, `alt`, `aria-label`), используйте `.value` напрямую:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Изменение языка вашего контента" isOptional={true}>

Чтобы изменить язык вашего контента, используйте функцию `setLocale`, предоставляемую `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
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

  select.addEventListener("change", () => setLocale(select.value as any));

  // Синхронизация выпадающего списка при изменении языка из другого места
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Рендеринг контента Markdown и HTML" isOptional={true}>

Intlayer поддерживает объявления контента `md()` и `html()`. В чистом JS скомпилированный результат вставляется как необработанный HTML через `innerHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Компиляция и вставка HTML:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` вызывает `toString()` для `IntlayerNode`, который возвращает необработанную строку Markdown. Передайте её в `compileMarkdown`, чтобы получить HTML-строку, а затем установите через `innerHTML`.

> [!WARNING]
> Используйте `innerHTML` только для доверенного контента. Если макрдаун получен из пользовательского ввода, сначала очистите его (например, с помощью DOMPurify). Вы можете динамически установить рендерер с очисткой:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

</Step>

<Step number={9} title="Добавление локализованной маршрутизации в ваше приложение" isOptional={true}>

Чтобы создать уникальные маршруты для каждого языка (полезно для SEO), вы можете использовать `intlayerProxy` в вашей конфигурации Vite для определения языка на стороне сервера.

Сначала добавьте `intlayerProxy` в конфигурацию Vite:

> Обратите внимание, что для использования `intlayerProxy` в продакшене вам нужно переместить `vite-intlayer` из `devDependencies` в `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // должен быть первым
    intlayer(),
  ],
});
```

</Step>

<Step number={10} title="Изменение URL при смене языка" isOptional={true}>

Чтобы обновлять URL браузера при смене языка, вызовите `useRewriteURL()` после установки Intlayer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// Перезаписывает URL немедленно и при каждой последующей смене языка.
// Возвращает функцию отписки для очистки.
const stopRewriteURL = useRewriteURL();
```

</Step>

<Step number={11} title="Переключение атрибутов языка и направления текста HTML" isOptional={true}>

Обновляйте атрибуты `lang` и `dir` тега `<html>` в соответствии с текущим языком для обеспечения доступности и SEO.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={12} title="Ленивая загрузка словарей по языкам" isOptional={true}>

Для больших приложений вы можете разделить словари по языкам на отдельные чанки. Используйте `useDictionaryDynamic` вместе с динамическим `import()` от Vite:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> Бандл каждого языка запрашивается только тогда, когда этот язык становится активным, и результат кэшируется - последующие переключения на тот же язык происходят мгновенно.

</Step>

<Step number={13} title="Извлечение контента из ваших компонентов" isOptional={true}>

Если у вас уже есть кодовая база, преобразование тысяч файлов может занять много времени.

Чтобы облегчить этот процесс, Intlayer предлагает [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) / [экстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md) для преобразования ваших компонентов и извлечения контента.

Чтобы настроить его, вы можете добавить раздел `compiler` в файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Остальная часть вашей конфигурации
  compiler: {
    /**
     * Указывает, должен ли быть включен компилятор.
     */
    enabled: true,

    /**
     * Определяет путь к выходным файлам
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Указывает, должны ли компоненты сохраняться после трансформации.
     * Таким образом, компилятор можно запустить только один раз для трансформации приложения, а затем удалить его.
     */
    saveComponents: false,

    /**
     * Префикс ключа словаря
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Команда Extract'>

Запустите экстрактор, чтобы преобразовать ваши компоненты и извлечь контент

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Компилятор Babel'>

Обновите `vite.config.ts`, включив плагин `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Добавляет плагин компилятора
  ],
});
```

```bash packageManager="npm"
npm run build # Или npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Или pnpm run dev
```

```bash packageManager="yarn"
yarn build # Или yarn dev
```

```bash packageManager="bun"
bun run build # Или bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### (Опционально) Sitemap и robots.txt (генерация на сборке)

Intlayer предоставляет `generateSitemap` и `getMultilingualUrls` - утилиты, которые формируют многоязычные `sitemap.xml` и `robots.txt` для краулеров и позволяют автоматически записать их в `public/`. Обычно запускают небольшой Node-скрипт **до** Vite (например, npm-хуки `predev` / `prebuild`).

#### Sitemap

Генератор sitemap учитывает локали и добавляет нужные метаданные.

> Поддерживается пространство имён `xhtml:link` (hreflang). Вместо плоского списка URL Intlayer связывает все языковые версии страницы в обе стороны (например `/about`, `/fr/about` или `/about?lang=fr` в зависимости от режима маршрутизации).

#### Robots.txt

Используйте `getMultilingualUrls`, чтобы правила `Disallow` покрывали все локализованные варианты путей.

#### 1. Файл `generate-seo.mjs` в корне проекта

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Пакет `intlayer` должен быть установлен. Для продакшена задайте `SITE_URL` в окружении (например в CI).

> Для Node ESM предпочтительно `generate-seo.mjs`. Для `generate-seo.js` укажите `"type": "module"` в `package.json` или включите ESM иначе.

#### 2. Запуск скрипта до Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Подстройте команды для pnpm или yarn. Скрипт можно вызывать из CI или другого шага.

### Настройка TypeScript

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Настройка Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволит не добавлять их в ваш Git-репозиторий.

Для этого добавьте следующие инструкции в ваш файл `.gitignore`:

```bash
# Игнорировать файлы, созданные Intlayer
.intlayer
```

### Расширение для VS Code

Чтобы сделать разработку с Intlayer удобнее, вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Инлайновые превью** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения более подробной информации об использовании расширения см. [документацию к расширению Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Что дальше?

Для более глубокого погружения вы можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешнюю [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
