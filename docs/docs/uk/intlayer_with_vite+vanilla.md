---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Vanilla JS - Як перекласти додаток Vanilla JS у 2026 році
description: Дізнайтеся, як зробити свій веб-сайт Vite та Vanilla JS багатомовним. Дотримуйтесь документації щодо інтернаціоналізації (i18n) та перекладу.
keywords:
  - Інтернаціоналізація
  - Документація
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
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Перекладіть свій веб-сайт Vite та Vanilla JS за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна бібліотека інтернаціоналізації (i18n) з відкритим вихідним кодом, розроблена для спрощення підтримки багатомовності в сучасних веб-додатках.

З Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та вміст.
- **Забезпечити підтримку TypeScript** за допомогою автоматично згенерованих типів, що покращує автодоповнення та виявлення помилок.
- **Використовувати розширені функції**, такі як динамічне визначення та перемикання мови.

---

## Покроковий посібник із налаштування Intlayer у додатку Vite та Vanilla JS

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **vanilla-intlayer**
  Пакет, який інтегрує Intlayer із чистими додатками JavaScript / TypeScript. Він надає pub/sub синглтон (`IntlayerClient`) та помічники на основі колбеків (`useIntlayer`, `useLocale` тощо), щоб будь-яка частина вашого додатка могла реагувати на зміни локалі незалежно від фреймворку інтерфейсу.

- **vite-intlayer**
  Включає плагін Vite для інтеграції Intlayer із [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), а також проміжне програмне забезпечення (middleware) для визначення мови користувача, керування файлами cookie та обробки перенаправлень URL-адрес.

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
      // Ваші інші локалі
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
      // Ваші інші локалі
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
      // Ваші інші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Через цей конфігураційний файл ви можете налаштувати локалізовані URL-адреси, перенаправлення проміжного ПЗ, назви файлів cookie, розташування та розширення ваших декларацій вмісту, вимкнути журнали Intlayer у консолі та багато іншого. Повний список доступних параметрів див. у [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

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

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer із Vite. Він забезпечує побудову файлів декларації вмісту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у додатку Vite. Крім того, він надає псевдоніми (aliases) для оптимізації продуктивності.

### Крок 4: Запустіть Intlayer у вашій точці входу

Викличте `installIntlayer()` **перед** візуалізацією будь-якого вмісту, щоб глобальний синглтон локалі був готовий.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// Має бути викликано перед візуалізацією будь-якого вмісту i18n.
installIntlayer();

// Імпортуйте та запустіть модулі програми.
import "./app.js";
```

Якщо ви також використовуєте декларації вмісту `md()` (Markdown), встановіть також рендерер markdown:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

### Крок 5: Декларуйте ваш контент

Створюйте та керуйте деклараціями вмісту для зберігання перекладів:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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
      es: "Натисніть на логотип Vite, щоб дізнатися більше",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
      es: "Натисніть на логотип Vite, щоб дізнатися більше",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
      es: "Натисніть на логотип Vite, щоб дізнатися більше",
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
        "es": "Натисніть на логотип Vite, щоб дізнатися більше"
      }
    }
  }
}
```

> Ваші декларації вмісту можна визначити будь-де у вашому додатку, якщо вони включені до каталогу `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлу декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Докладніше див. у [документації з декларації вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 6: Використовуйте Intlayer у вашому JavaScript

`vanilla-intlayer` відображає API поверхні `react-intlayer`: `useIntlayer(key, locale?)` повертає перекладений вміст безпосередньо. Приєднайте `.onChange()` до результату, щоб підписатися на зміни локалі — явний еквівалент перерендерингу в React.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// Отримайте початковий контент для поточної локалі.
// Приєднайте .onChange(), щоб отримувати сповіщення при кожній зміні локалі.
const content = useIntlayer("app").onChange((newContent) => {
  // Перерендерить або оновіть лише зачеплені вузли DOM
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// Початковий рендеринг
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> Отримуйте доступ до кінцевих значень як до рядків, загорнувши їх у `String()`, що викликає метод `toString()` вузла та повертає перекладений текст.
>
> Якщо вам потрібне значення для нативного атрибута HTML (наприклад, `alt`, `aria-label`), використовуйте безпосередньо `.value`:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

### (Необов’язково) Крок 7: Змініть мову вашого вмісту

Щоб змінити мову вмісту, використовуйте функцію `setLocale`, надану `useLocale`.

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

  // Тримайте випадаючий список синхронізованим, коли локаль змінюється деінде
  return subscribe((newLocale) => render(newLocale));
}
```

### (Необов’язково) Крок 8: Рендеринг вмісту Markdown та HTML

Intlayer підтримує декларації вмісту `md()` та `html()`. У чистому JS скомпільований вихідний код вставляється як необроблений HTML через `innerHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

Скомпілюйте та вставте HTML:

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
> `String(content.editNote)` викликає `toString()` на `IntlayerNode`, що повертає необроблений рядок Markdown. Передайте його в `compileMarkdown`, щоб отримати рядок HTML, а потім встановіть через `innerHTML`.

> [!WARNING]
> Використовуйте `innerHTML` лише з довіреним вмістом. Якщо markdown надходить від користувача, спочатку очистіть його (наприклад, за допомогою DOMPurify). Ви можете встановити рендерер очищення динамічно:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

### (Необов’язково) Крок 9: Додайте локалізовану маршрутизацію (Localized Routing) до свого додатка

Щоб створити унікальні маршрути для кожної мови (корисно для SEO), ви можете використовувати `intlayerProxy` у вашій конфігурації Vite для визначення локалі на стороні сервера.

Спочатку додайте `intlayerProxy` до вашої конфігурації Vite:

> Зверніть увагу, що для використання `intlayerProxy` у продуктовому середовищі вам потрібно перемістити `vite-intlayer` із `devDependencies` до `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // має бути розміщено першим
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // має бути розміщено першим
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // має бути розміщено першим
    intlayer(),
  ],
});
```

### (Необов’язково) Крок 10: Зміна URL при зміні локалі

Щоб оновити URL браузера при зміні локалі, викличте `useRewriteURL()` після встановлення Intlayer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// Переписує URL негайно та при кожній наступній зміні локалі.
// Повертає функцію скасування підписки для очищення.
const stopRewriteURL = useRewriteURL();
```

### (Необов’язково) Крок 11: Перемикання атрибутів мови та напрямку HTML

Оновлюйте атрибути `lang` та `dir` тегу `<html>` відповідно до поточної локалі для підтримки доступності та SEO.

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

### (Необов’язково) Крок 12: Ліниве завантаження словників за локалями

Для великих додатків ви можете розділити словник кожної локалі на власний фрагмент (chunk). Використовуйте `useDictionaryDynamic` разом із динамічним `import()` від Vite:

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

> Пакет кожної локалі завантажується лише тоді, коли ця локаль стає активною, а результат кешується — наступні перемикання на ту саму локаль відбуваються миттєво.

### (Необов’язково) Крок 13: Отримайте вміст ваших компонентів (Extract)

Якщо у вас є існуюча кодова база, перетворення тисяч файлів може зайняти багато часу.

Щоб полегшити цей процес, Intlayer пропонує [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) / [екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) для перетворення ваших компонентів та вилучення вмісту.

Для налаштування ви можете додати розділ `compiler` у ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Решта вашої конфігурації
  compiler: {
    /**
     * Вказує, чи має бути включений компілятор.
     */
    enabled: true,

    /**
     * Визначає шлях вихідних файлів
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи потрібно зберігати компоненти після перетворення.
     * Таким чином компілятор можна запустити лише один раз для перетворення програми, а потім видалити.
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

<Tabs>
 <Tab value='Команда Extract'>

Запустіть екстрактор, щоб перетворити ваші компоненти та витягти вміст

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
bunx intlayer extract
```

 </Tab>
 <Tab value='Компілятор Babel'>

Оновіть свій `vite.config.ts`, щоб включити плагін `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Додає плагін компілятора
  ],
});
```

```bash packageManager="npm"
npm run build # Або npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Або pnpm run dev
```

```bash packageManager="yarn"
yarn build # Або yarn dev
```

```bash packageManager="bun"
bun run build # Або bun run dev
```

 </Tab>
</Tabs>

### Налаштування TypeScript

Переконайтеся, що ваша конфігурація TypeScript включає автоматично згенеровані типи.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Конфігурація Git

Ми рекомендуємо ігнорувати файли, згенеровані Intlayer. Це дозволить вам уникнути їх фіксації (commit) у вашому репозиторії Git.

Для цього ви можете додати наступні інструкції у ваш файл `.gitignore`:

```bash
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити свій досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення забезпечує:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Докладніше про використання розширення див. у [документації розширення Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Йдіть далі

Щоб піти далі, ви можете впровадити [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій контент за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
