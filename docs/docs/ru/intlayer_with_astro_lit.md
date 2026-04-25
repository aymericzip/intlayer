---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Lit i18n - Как перевести приложение Astro + Lit в 2026 году
description: Узнайте, как добавить интернационализацию (i18n) на ваш сайт Astro + Lit с помощью Intlayer. Следуйте этому руководству, чтобы сделать ваш сайт многоязычным.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Astro
  - Lit
  - Веб-компоненты
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Начальная документация для Astro + Lit"
---

# Переводите ваш сайт Astro + Lit с помощью Intlayer | Интернационализация (i18n)

## Содержание

<TOC/>

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека интернационализации (i18n) с открытым исходным кодом, разработанная для упрощения многоязычной поддержки в современных веб-приложениях.

С Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, улучшая автодополнение и обнаружение ошибок.
- **Пользоваться расширенными функциями**, такими как динамическое определение локали и переключение языков.

---

## Пошаговое руководство по настройке Intlayer в Astro + Lit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Посмотреть [Шаблон приложения](https://github.com/aymericzip/intlayer-astro-template) на GitHub.

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью вашего менеджера пакетов:

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

bun x intlayer init
```

- **intlayer**
  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [объявлением контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляцией и [командами CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **astro-intlayer**
  Включает плагин интеграции для Astro для интеграции Intlayer с [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочтительной локали пользователя, управления куки и обработки перенаправлений URL.

- **lit**
  Основной пакет Lit для создания быстрых и легких веб-компонентов.

- **lit-intlayer**
  Пакет, который интегрирует Intlayer с приложениями Lit. Он предоставляет хуки на основе `ReactiveController` (`useIntlayer`, `useLocale` и т. д.) для автоматической перерисовки LitElements при смене языка.

- **@astrojs/lit**
  Официальная интеграция Astro, которая позволяет использовать кастомные элементы Lit на страницах Astro.

### Шаг 2: Настройка вашего проекта

Создайте конфигурационный файл для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts"
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

> Через этот конфигурационный файл вы можете настроить локализованные URL, перенаправления middleware, названия куки, расположение и расширение ваших объявлений контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Astro

Добавьте плагин intlayer и интеграцию Lit в вашу конфигурацию.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> Плагин интеграции `intlayer()` используется для интеграции Intlayer с Astro. Он обеспечивает сборку файлов объявления контента и отслеживает их изменения в режиме разработки. Он определяет переменные окружения Intlayer внутри приложения Astro. Кроме того, он предоставляет псевдонимы для оптимизации производительности.

> Интеграция `lit()` позволяет использовать кастомные элементы Lit на страницах Astro.

### Шаг 4: Объявление контента

Создавайте и управляйте объявлениями контента для хранения переводов:

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      ru: "Привет, мир",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
      ru: "Добро пожаловать на мой многоязычный сайт Astro + Lit.",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию `./src`) и соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Более подробную информацию см. в [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Шаг 5: Использование контента в Astro

Вы можете использовать словари напрямую в файлах `.astro`, используя основные хелперы, экспортируемые из `intlayer`. Вам также следует добавить SEO-метаданные, такие как hreflang и канонические ссылки, на каждую страницу. Кастомный элемент Lit импортируется через клиентский `<script>` и размещается в теле страницы.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Каноническая ссылка -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Ссылки Hreflang -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- Кастомный элемент Lit — получает локаль, определенную сервером, через свойство -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> **Примечание по конфигурации маршрутизации:**
> Структура каталогов, которую вы используете, зависит от настройки `middleware.routing` в вашем `intlayer.config.ts`:
>
> - **`prefix-no-default` (по умолчанию):** Сохраняет локаль по умолчанию в корне (без префикса) и добавляет префиксы к остальным. Используйте `[...locale]` для обработки всех случаев.
> - **`prefix-all`:** Все URL имеют префикс языка. Вы можете использовать стандартный `[locale]`, если вам не нужно обрабатывать корень отдельно.
> - **`search-param` или `no-prefix`:** Папка локали не нужна. Локаль обрабатывается через параметры поиска или куки.

### Шаг 6: Создание кастомного элемента Lit

Создайте кастомный элемент Lit. Вызовите `installIntlayer` в `connectedCallback` со свойством `locale`, определенным сервером, чтобы инициализировать синглтон Intlayer на клиенте.

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // Инициализация локалью, определенной сервером
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- Переключатель языка отрисовывается в LitElement -->
        <div class="locale-switcher">
          <span class="switcher-label">Сменить язык :</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${localeItem === currentLocale
                    ? "active"
                    : ""}"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">{localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> Проп `locale` передается со страницы Astro (определенной сервером) и используется в `connectedCallback` для инициализации `installIntlayer`, что делает её начальной локалью для всех хуков `ReactiveController` в элементе.

> `useIntlayer` регистрируется как `ReactiveController`. Элемент автоматически перерисовывается при смене языка — дополнительная настройка не требуется.

### Шаг 7: Добавление переключателя языков

Переключатель языков встроен непосредственно в метод `render()` кастомного элемента Lit (показано в Шаге 6). Он использует `useLocale` из `lit-intlayer` и переходит по локализованному URL, когда пользователь выбирает новый язык:

```typescript fileName="src/components/lit/LitDemo.ts"
// Внутри класса LitElement, после настройки useLocale (из Шага 6):

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // Перейти по локализованному URL при смене языка
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">Сменить язык :</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Примечание по реактивности Lit:**
> `useLocale` возвращает `ReactiveController`. При вызове `setLocale` контроллер автоматически планирует перерисовку — таким образом, состояние активной кнопки обновляется без ручных манипуляций с DOM.

> **Примечание по сохранению состояния:**
> Использование `onLocaleChange` для перенаправления через `window.location.href` гарантирует посещение нового языкового URL, позволяя middleware Intlayer установить куки языка и запомнить предпочтение пользователя для будущих посещений.

### Шаг 8: Sitemap и Robots.txt

Intlayer предоставляет утилиты для динамического создания локализованных карт сайта и файлов robots.txt.

#### Sitemap

Создайте `src/pages/sitemap.xml.ts` для генерации карты сайта, включающей все ваши локализованные маршруты.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Создайте `src/pages/robots.txt.ts` для управления сканированием поисковыми системами.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Настройка TypeScript

Intlayer использует расширение модулей, чтобы воспользоваться преимуществами TypeScript и сделать вашу кодовую базу более надежной. Lit требует включения `experimentalDecorators`, если вы используете синтаксис декораторов.

![Автодополнение](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Ошибка перевода](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // Требуется Lit для поддержки декораторов
  },
  include: [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автогенерируемые типы
  ],
}
```

### Настройка Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволит избежать их добавления в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```bash
# Игнорировать файлы, созданные Intlayer
.intlayer
```

### Расширение для VS Code

Для улучшения процесса разработки с помощью Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный предпросмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения более подробной информации об использовании расширения см. [документацию расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Дальнейшие шаги

Вы также можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешнюю [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
