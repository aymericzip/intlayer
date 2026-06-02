---
createdAt: 2026-03-23
updatedAt: 2026-05-31
title: "Vite + Lit i18n - Повний посібник з перекладу застосунку Vite + Lit"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Vite + Lit. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Vite
  - Lit
  - Веб-компоненти
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
applicationShowcase: https://intlayer-vite-lit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 8.4.10
    date: 2026-03-23
    changes: "Початкова історія"
---

# Перекладіть свій веб-сайт на Vite та Lit за допомогою Intlayer | Інтернаціоналізація (i18n)

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-lit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-vite-lit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-vite-lit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `lit-localize` або `i18next`, Intlayer — це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>

<Accordion header="Повне освітлення">

Intlayer оптимізовано для ідеальної роботи з Lit, пропонуючи **Визначення вмісту на рівні веб-компонентів**, **Підтримку TypeScript** і всі функції, необхідні для інтернаціоналізації масштабування (i18n).

</Accordion>

<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір бандлу і сторінок до 50%**.

</Accordion>

<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>

<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** і **[навички агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу в конвеєрі CI/CD за допомогою LLM за вашим вибором за рахунок вашого постачальника штучного інтелекту. Intlayer також пропонує **компілятор** для автоматизації екстракція вмісту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), щоб допомогти **перекладати у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення великих файлів JSON до компонентів може призвести до проблем з продуктивністю та реакцією. Intlayer оптимізує завантаження вмісту під час збірки (build time).

</Accordion>

<Accordion header="Співпраця з не-розробниками">

Більше ніж просто рішення i18n, Intlayer пропонує **власний [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** і **[повний CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, щоб допомогти вам керувати своїм багатомовним вмістом у **реальному часі**, спрощуючи співпрацю з перекладачами, копірайтерами та іншими членами команди. Контент можна зберігати локально та/або віддалено.

</Accordion>
</AccordionGroup>

---

## Покрокова інструкція з налаштування Intlayer у додатку Vite та Lit

<Steps>

<Step number={1} title="Встановлення залежностей">

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларування контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **lit-intlayer**
  Пакет, що інтегрує Intlayer з додатками Lit. Він надає хуки на основі `ReactiveController` (`useIntlayer`, `useLocale` тощо), щоб LitElement автоматично перерендерилися при зміні мови.

- **vite-intlayer**
  Включає плагін Vite для інтеграції Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також проміжне програмне забезпечення (middleware) для визначення мови користувача, керування файлами cookie та обробки перенаправлень URL.

</Step>

<Step number={2} title="Конфігурація вашого проекту">

Створіть конфігураційний файл для налаштування мов вашого додатка:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваші інші мови
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Через цей конфігураційний файл ви можете налаштувати локалізовані URL-адреси, перенаправлення проміжного ПЗ, назви файлів cookie, розташування та розширення ваших декларацій контенту, вимкнути журнали Intlayer у консолі та багато іншого. Повний список доступних параметрів дивіться в [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>

<Step number={3} title="Інтегруйте Intlayer у вашу конфігурацію Vite">

Додайте плагін intlayer до вашої конфігурації.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує створення файлів декларації контенту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у додатку Vite. Крім того, він надає псевдоніми (aliases) для оптимізації продуктивності.

</Step>

<Step number={4} title="Запустіть Intlayer у вашій точці входу">

Викличте `installIntlayer()` **перед** реєстрацією будь-яких користувацьких елементів, щоб глобальний синглтон локалі був готовий, коли перший елемент підключиться.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// Повинно бути викликано до того, як будь-який LitElement підключиться до DOM.
installIntlayer();

// Імпортуйте та зареєструйте ваші користувацькі елементи.
import "./my-element.js";
```

Якщо ви також використовуєте декларації контенту `md()` (Markdown), встановіть також рендерер markdown:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

</Step>

<Step number={5} title="Декларуйте ваш контент">

Створюйте та керуйте вашими деклараціями контенту для зберігання перекладів:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
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
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener більше інформації"
      }
    }
  }
}
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому додатку, якщо вони включені в каталог `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлу декларації контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Для отримання додаткової інформації дивіться [документацію з декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={6} title="Використовуйте Intlayer у вашому LitElement">

Використовуйте `useIntlayer` всередині `LitElement`. Він повертає проксі `ReactiveController`, який автоматично запускає перерендеринг щоразу, коли змінюється активна мова - додаткових налаштувань не потрібно.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer реєструє себе як ReactiveController.
  // Елемент перерендериться автоматично при зміні мови.
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> Коли вам потрібен перекладений рядок у нативному атрибуті HTML (наприклад, `alt`, `aria-label`, `title`), викликайте `.value` на листовому вузлі:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> html`<img alt=${content.viteLogo.toString()} />`;
> html`<img alt=${String(content.viteLogo)} />`;
> ```

</Step>

<Step number={7} title="Змініть мову вашого контенту" isOptional={true}>

Щоб змінити мову вашого контенту, скористайтеся методом `setLocale`, наданим контролером `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={8} title="Рендеринг контенту Markdown та HTML" isOptional={true}>

Intlayer підтримує декларації контенту `md()` та `html()`. У Lit скомпільований вивід вставляється як сирий HTML за допомогою директиви `unsafeHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Відрендерите скомпільований HTML у своєму елементі:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` викликає `toString()` на `IntlayerNode`, який повертає сирий рядок Markdown. Передайте його в `compileMarkdown`, щоб отримати рядок HTML, а потім відрендерите за допомогою директиви `unsafeHTML` від Lit.

</Step>

<Step number={9} title="Додайте локалізовану маршрутизацію до вашого додатка" isOptional={true}>

Для створення унікальних маршрутів для кожної мови (корисно для SEO), ви можете використовувати клієнтський маршрутизатор разом із помічниками Intlayer `localeMap` / `localeFlatMap` та плагіном Vite `intlayerProxy` для визначення мови на стороні сервера.

Спочатку додайте `intlayerProxy` до вашої конфігурації Vite:

> Зверніть увагу, що для використання `intlayerProxy` у продакшні вам потрібно перемістити `vite-intlayer` з `devDependencies` до `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

</Step>

<Step number={10} title="Зміна URL при зміні мови" isOptional={true}>

Щоб оновлювати URL-адресу браузера при зміні мови, використовуйте `useRewriteURL` разом із перемикачем мови:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // Автоматично перезаписує поточний URL при зміні мови.
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={11} title="Перемикання атрибутів мови та напрямку HTML" isOptional={true}>

Оновлюйте атрибути `lang` та `dir` тегу `<html>` відповідно до поточної мови для доступності та SEO.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- ваш контент -->`;
  }
}
```

</Step>

<Step number={12} title="Витягніть контент ваших компонентів" isOptional={true}>

Якщо у вас є існуюча кодова база, трансформація тисяч файлів може зайняти багато часу.

Щоб полегшити цей процес, Intlayer пропонує [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) / [екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) для трансформації ваших компонентів та витягування контенту.

Щоб налаштувати це, ви можете додати розділ `compiler` у ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... решта вашої конфігурації
  compiler: {
    /**
     * Вказує, чи має бути увімкнено компілятор.
     */
    enabled: true,

    /**
     * Визначає шлях файлів виводу
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи мають компоненти бути збережені після трансформації.
     * Таким чином, компілятор можна запустити лише один раз для трансформації додатка, а потім його можна видалити.
     */
    saveComponents: false,

    /**
     * Префікс ключа словника
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

</Step>

</Steps>

### (Опційно) Sitemap і robots.txt (генерація під час збірки)

Intlayer надає `generateSitemap` і `getMultilingualUrls` - утиліти для формування багатомовних `sitemap.xml` і `robots.txt` для краулерів та автоматичного запису в `public/`. Зазвичай запускають невеликий Node-скрипт **перед** Vite (наприклад, npm-хуки `predev` / `prebuild`).

#### Sitemap

Генератор sitemap враховує локалі й додає метадані для краулерів.

> Підтримується простір імен `xhtml:link` (hreflang). Замість плоского списку URL Intlayer пов’язує всі мовні версії сторінки в обидва боки (наприклад `/about`, `/fr/about` або `/about?lang=fr` залежно від режиму маршрутизації).

#### Robots.txt

Використовуйте `getMultilingualUrls`, щоб правила `Disallow` покривали всі локалізовані варіанти шляхів.

#### 1. Файл `generate-seo.mjs` у корені проєкту

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

Пакет `intlayer` має бути встановлений. У продакшені задайте `SITE_URL` у середовищі (наприклад у CI).

> Для Node ESM краще `generate-seo.mjs`. Для `generate-seo.js` додайте `"type": "module"` у `package.json` або ввімкніть ESM інакше.

#### 2. Запуск скрипта перед Vite

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

Підлаштуйте команди для pnpm або yarn. Можна викликати скрипт із CI.

### Конфігурація TypeScript

Переконайтеся, що ваша конфігурація TypeScript включає автоматично згенеровані типи.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` та `useDefineForClassFields: false` потрібні для Lit для підтримки декораторів.

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їхнього коміту до вашого репозиторію Git.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```bash
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладів.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного контенту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Докладніше про використання розширення дивіться в [документації до розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Йдіть далі

Щоб дізнатися більше, ви можете впровадити [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести ваш контент у зовнішню систему за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
