---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n - Як перекласти застосунок Vanilla JS у 2026 році
description: Дізнайтеся, як зробити свій вебсайт на Vanilla JS багатомовним. Дотримуйтесь документації з інтернаціоналізації (i18n) та перекладу.
keywords:
  - Інтернаціоналізація
  - Документація
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
    changes: "Ініціалізація історії"
---

# Перекладіть свій вебсайт на Vanilla JS за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна бібліотека інтернаціоналізації (i18n) з відкритим вихідним кодом, розроблена для спрощення багатомовної підтримки в сучасних вебзастосунках.

За допомогою Intlayer ви можете:

- **Легко керувати перекладами**, використовуючи декларативні словники на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** завдяки типам, що генеруються автоматично, що покращує автодоповнення та виявлення помилок.
- **Користуватися розширеними функціями**, такими як динамічне визначення та зміна мови.

Цей посібник демонструє, як використовувати Intlayer у застосунку на Vanilla JavaScript **без використання менеджера пакетів або збірника** (такого як Vite, Webpack тощо).

Якщо ваш застосунок використовує збірник (наприклад, Vite), ми рекомендуємо натомість дотримуватися [Посібника з Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+vanilla.md).

Використовуючи автономну збірку (standalone bundle), ви можете імпортувати Intlayer безпосередньо у свої HTML-файли через один JavaScript-файл, що робить його ідеальним для застарілих проєктів або простих статичних сайтів.

---

## Покроковий посібник із налаштування Intlayer у застосунку на Vanilla JS

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
# Створення автономної збірки intlayer та vanilla-intlayer
# Цей файл буде імпортовано у ваш HTML-файл
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Ініціалізація intlayer з файлом конфігурації
npx intlayer init --no-gitignore

# Збірка словників
npx intlayer build
```

```bash packageManager="pnpm"
# Створення автономної збірки intlayer та vanilla-intlayer
# Цей файл буде імпортовано у ваш HTML-файл
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Ініціалізація intlayer з файлом конфігурації
pnpm intlayer init --no-gitignore

# Збірка словників
pnpm intlayer build
```

```bash packageManager="yarn"
# Створення автономної збірки intlayer та vanilla-intlayer
# Цей файл буде імпортовано у ваш HTML-файл
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Ініціалізація файлу конфігурації intlayer, TypeScript (якщо налаштовано), змінних оточення
yarn intlayer init --no-gitignore

# Збірка словників
yarn intlayer build
```

```bash packageManager="bun"
# Створення автономної збірки intlayer та vanilla-intlayer
# Цей файл буде імпортовано у ваш HTML-файл
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Ініціалізація intlayer з файлом конфігурації
bun x intlayer init --no-gitignore

# Збірка словників
bun x intlayer build
```

- **intlayer**
  Основний пакет, що надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **vanilla-intlayer**
  Пакет, що інтегрує Intlayer з чистими застосунками на JavaScript / TypeScript. Він надає синглтон pub/sub (`IntlayerClient`) та допоміжні функції на основі зворотних викликів (`useIntlayer`, `useLocale` тощо), щоб будь-яка частина вашого застосунку могла реагувати на зміну мови без залежності від UI-фреймворку.

> Експорт збірки (bundling) через CLI `intlayer standalone` створює оптимізований білд шляхом деревотрусу (tree-shaking) для невикористаних пакетів, локалей та другорядної логіки (наприклад, перенаправлень або префіксів), специфічної для вашої конфігурації.

### Крок 2: Конфігурація вашого проєкту

Створіть файл конфігурації для налаштування мов вашого застосунку:

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

> Через цей файл конфігурації ви можете налаштувати локалізовані URL, перенаправлення через middleware, імена кукі, розташування та розширення ваших оголошень контенту, вимкнути логи Intlayer у консолі та багато іншого. Повний список доступних параметрів див. у [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Імпорт збірки у ваш HTML

Після того, як ви згенерували збірку `intlayer.js`, ви можете імпортувати її у свій HTML-файл:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />

    <!-- Імпорт збірки -->
    <script src="./intlayer.js" defer></script>
    <!-- Імпорт вашого основного скрипту -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

Збірка надає `Intlayer` та `VanillaIntlayer` як глобальні об'єкти на `window`.

### Крок 4: Ініціалізація Intlayer у точці входу

У вашому `src/main.js` викличте `installIntlayer()` **до** того, як будь-який контент буде відмальовано, щоб глобальний синглтон мови був готовий.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Має бути викликано перед відмальовуванням будь-якого i18n-контенту.
installIntlayer();
```

Якщо ви також хочете використовувати рендерер markdown, викличте `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

### Крок 5: Оголошення вашого контенту

Створюйте та керуйте оголошеннями контенту для зберігання перекладів:

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
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Ваші оголошення контенту можуть бути визначені будь-де у вашому застосунку, якщо вони включені в директорію `contentDir` (за замовчуванням `./src`) та відповідають розширенню файлу оголошення контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Для отримання детальнішої інформації див. [документацію з оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 6: Використання Intlayer у вашому JavaScript

Об'єкт `window.VanillaIntlayer` надає допоміжні функції API: `useIntlayer(key, locale?)` повертає перекладений контент для заданого ключа.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Отримання початкового контенту для поточної мови.
// Додайте .onChange(), щоб отримувати сповіщення при зміні мови.
const content = useIntlayer("app").onChange((newContent) => {
  // Перемальовуємо або оновлюємо тільки зачеплені DOM-вузли
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Початкове відмальовування
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Отримуйте кінцеві значення у вигляді рядків, огортаючи їх у `String()`, що викликає метод `toString()` вузла та повертає перекладений текст.
>
> Якщо вам потрібне значення для нативного HTML-атрибута (наприклад, `alt`, `aria-label`), використовуйте `.value` напряму:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

### (Опціонально) Крок 7: Зміна мови вашого контенту

Щоб змінити мову вашого контенту, використовуйте функцію `setLocale`, що надається `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Мова");

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

  // Підтримуємо список у актуальному стані, якщо мову було змінено в іншому місці
  return subscribe((newLocale) => render(newLocale));
}
```

### (Опціонально) Крок 8: Перемикання атрибутів мови та напрямку тексту HTML

Оновлюйте атрибути `lang` та `dir` тегу `<html>` відповідно до поточної мови для забезпечення доступності та SEO.

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

### (Опціонально) Крок 9: Ледаче завантаження словників за мовами

Якщо ви хочете завантажувати словники ледаче для кожної мови, ви можете використовувати `useDictionaryDynamic`. Це корисно, якщо ви не хочете включати всі переклади в початковий файл `intlayer.js`.

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

> Примітка: `useDictionaryDynamic` вимагає, щоб словники були доступні у вигляді окремих файлів ESM. Цей підхід зазвичай використовується, якщо у вас є вебсервер, що роздає словники.

### Налаштування TypeScript

Переконайтеся, що ваша конфігурація TypeScript включає типи, що генеруються автоматично.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Розширення для VS Code

Щоб покращити процес розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладів.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований передпрогляд** перекладеного контенту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для отримання детальнішої інформації про використання розширення див. [документацію розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Йдіть далі

Щоб піти далі, ви можете впровадити [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести ваш контент у зовнішнє середовище за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
