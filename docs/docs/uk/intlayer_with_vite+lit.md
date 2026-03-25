---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Lit - Як перекласти додаток Lit у 2026 році
description: Дізнайтеся, як зробити ваш веб-сайт на Vite та Lit багатомовним. Дотримуйтесь документації для інтернаціоналізації (i18n) та перекладу.
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
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Перекладіть свій веб-сайт на Vite та Lit за допомогою Intlayer | Інтернаціоналізація (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-lit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна бібліотека інтернаціоналізації (i18n) з відкритим вихідним кодом, розроблена для спрощення підтримки багатомовності в сучасних веб-додатках.

З Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані, маршрути та контент**.
- **Забезпечити підтримку TypeScript** з автоматично згенерованими типами, що покращує автодоповнення та виявлення помилок.
- **Користуватися розширеними функціями**, такими як динамічне визначення та перемикання мови.

---

## Покрокова інструкція з налаштування Intlayer у додатку Vite та Lit

### Крок 1: Встановлення залежностей

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
bunx intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларування контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **lit-intlayer**
  Пакет, що інтегрує Intlayer з додатками Lit. Він надає хуки на основі `ReactiveController` (`useIntlayer`, `useLocale` тощо), щоб LitElement автоматично перерендерилися при зміні мови.

- **vite-intlayer**
  Включає плагін Vite для інтеграції Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також проміжне програмне забезпечення (middleware) для визначення мови користувача, керування файлами cookie та обробки перенаправлень URL.

### Крок 2: Конфігурація вашого проекту

Створіть конфігураційний файл для налаштування мов вашого додатка:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Через цей конфігураційний файл ви можете налаштувати локалізовані URL-адреси, перенаправлення проміжного ПЗ, назви файлів cookie, розташування та розширення ваших декларацій контенту, вимкнути журнали Intlayer у консолі та багато іншого. Повний список доступних параметрів дивіться в [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтегруйте Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer до вашої конфігурації.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує створення файлів декларації контенту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у додатку Vite. Крім того, він надає псевдоніми (aliases) для оптимізації продуктивності.

### Крок 4: Запустіть Intlayer у вашій точці входу

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

### Крок 5: Декларуйте ваш контент

Створюйте та керуйте вашими деклараціями контенту для зберігання перекладів:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
      es: "Haga clic en los logotipos de Vite y Lit para obtener більше інформації",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
      es: "Haga clic en los logotipos de Vite y Lit para obtener більше інформації",
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

### Крок 6: Використовуйте Intlayer у вашому LitElement

Використовуйте `useIntlayer` всередині `LitElement`. Він повертає проксі `ReactiveController`, який автоматично запускає перерендеринг щоразу, коли змінюється активна мова — додаткових налаштувань не потрібно.

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

> [!NOTE]
> Коли вам потрібен перекладений рядок у нативному атрибуті HTML (наприклад, `alt`, `aria-label`, `title`), викликайте `.value` на листовому вузлі:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> ```

### (Опціонально) Крок 7: Змініть мову вашого контенту

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

### (Опціонально) Крок 8: Рендеринг контенту Markdown та HTML

Intlayer підтримує декларації контенту `md()` та `html()`. У Lit скомпільований вивід вставляється як сирий HTML за допомогою директиви `unsafeHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

### (Опціонально) Крок 9: Додайте локалізовану маршрутизацію до вашого додатка

Для створення унікальних маршрутів для кожної мови (корисно для SEO), ви можете використовувати клієнтський маршрутизатор разом із помічниками Intlayer `localeMap` / `localeFlatMap` та плагіном Vite `intlayerProxy` для визначення мови на стороні сервера.

Спочатку додайте `intlayerProxy` до вашої конфігурації Vite:

> Зверніть увагу, що для використання `intlayerProxy` у продакшні вам потрібно перемістити `vite-intlayer` з `devDependencies` до `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

### (Опціонально) Крок 10: Зміна URL при зміні мови

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

### (Опціонально) Крок 11: Перемикання атрибутів мови та напрямку HTML

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

### (Опціонально) Крок 12: Витягніть контент ваших компонентів

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
