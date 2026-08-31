---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: "Vanilla JS i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Vanilla JS. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
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
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 8.4.10
    date: 2026-03-31
    changes: "Ініціалізація історії"
author: aymericzip
---

# Перекладіть свій вебсайт на Vanilla JS за допомогою Intlayer | Інтернаціоналізація (i18n)

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

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `i18next` або `i18n.js`, Intlayer — це рішення, яке поставляється з інтегрованою оптимізацією, як-от:

<AccordionGroup>

<Accordion header="Повна підтримка Vanilla JS">

Intlayer оптимізовано для ідеальної роботи з Vanilla JavaScript, пропонуючи **незалежне від фреймворку керування вмістом**, **підтримку TypeScript** і всі функції, необхідні для масштабування інтернаціоналізації (i18n).

</Accordion>

<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір бандлу і сторінок до 50%**.

</Accordion>

<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>

<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** і **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

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

## Покроковий посібник із налаштування Intlayer у застосунку на Vanilla JS

<Steps>

<Step number={1} title="Встановлення залежностей">

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

</Step>

<Step number={2} title="Конфігурація вашого проєкту">

Створіть файл конфігурації для налаштування мов вашого застосунку:

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

> Через цей файл конфігурації ви можете налаштувати локалізовані URL, перенаправлення через middleware, імена кукі, розташування та розширення ваших оголошень контенту, вимкнути логи Intlayer у консолі та багато іншого. Повний список доступних параметрів див. у [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>

<Step number={3} title="Імпорт збірки у ваш HTML">

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

</Step>

<Step number={4} title="Ініціалізація Intlayer у точці входу">

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

</Step>

<Step number={5} title="Оголошення вашого контенту">

Створюйте та керуйте оголошеннями контенту для зберігання перекладів:

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
      es: "Натисніть на логотип Vite, щоб дізнатися більше",
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

> Ваші оголошення контенту можуть бути визначені будь-де у вашому застосунку, якщо вони включені в директорію `contentDir` (за замовчуванням `./src`) та відповідають розширенню файлу оголошення контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Для отримання детальнішої інформації див. [документацію з оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={6} title="Використання Intlayer у вашому JavaScript">

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

</Step>

<Step number={7} title="Зміна мови вашого контенту" isOptional={true}>

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

</Step>

<Step number={8} title="Перемикання атрибутів мови та напрямку тексту HTML" isOptional={true}>

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

</Step>

<Step number={9} title="Ледаче завантаження словників за мовами" isOptional={true}>

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
> </Step>

</Steps>

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

## Часто задавані запитання

<FAQ>

<Question title="Чи можу я використовувати Intlayer без бандлера або фреймворку?">

Так. Цей посібник присвячений саме цьому. Ви підключаєте пакет `vanilla-intlayer` прямо в HTML, ініціалізуєте його та читаєте контент через `useIntlayer` або `getIntlayer`.

</Question>

<Question title="Скільки i18n додає до ваги моєї сторінки?">

Значно менше, ніж традиційні каталоги, оскільки сторінка ніколи не завантажує мову, яку не рендерить. Вміст надається в оптимізованих форматах. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

</Question>

<Question title="Чи можу я мігрувати з i18next без переписування скриптів?">

Більшою мірою так. Дотримуйтесь [посібника з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md).

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування локалей в один файл.

</Question>

<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

Для повної автоматизації [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання та генерує словники під час кожної зміни.

</Question>

<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, вилучення рядків із компонента та запуск build, fill, test, push і pull із палітри команд або вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: та сама функціональність у будь-якому редакторі з підтримкою LSP, включно з переходом до визначення, переглядом перекладеного значення під час наведення та автодоповненням ключів. Також підтримує виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="Які є різні рішення для інтернаціоналізації чистого JavaScript сайту?">

- **Власний об'єкт словника**: без типізації та інструментів контролю якості.
- **`i18next`**: універсальна бібліотека для runtime.
- **`Intlayer`**: оголошення у файлах вмісту, опціональна компіляція під час збирання, типізація, візуальний редактор та CMS.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

</Question>

<Question title="Як прочитати переклад і вставити його в DOM?">

Викликайте `useIntlayer` з ключем словника і встановіть значення у вузол DOM власноруч, як показано на кроці 6.

</Question>

<Question title="Як визначається мова відвідувача?">

З джерел, перелічених у `routing.storage`: зазвичай спочатку cookie, потім заголовок `Accept-Language`, а далі мова за замовчуванням. Див. [довідник конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Question>

<Question title="Як підтримувати мови з написанням справа наліво?">

Крок 8 описує це. `getHTMLTextDir` повертає `ltr`, `rtl` або `auto` для локалі, тому ви встановлюєте атрибути `lang` та `dir` на елементі `html` або `body`.

</Question>

<Question title="Чи завантажують відвідувачі кожну мову?">

Ні, якщо ви цього не бажаєте. Крок 9 описує ліниве завантаження (lazy loading) словників за мовами, тому сторінка завантажує лише активну мову.

</Question>

<Question title="Як автоматично перекласти додаток за допомогою AI?">

Запустіть `npx intlayer fill`. Утиліта заповнює відсутні переклади через обрану LLM з вашим провайдером та ключем API, а прапорець `--git-diff` обмежує обробку зміненими файлами. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

</Question>

<Question title="Чи підтримує Intlayer форми множини, стать та форматований текст (rich text)?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [контент з урахуванням статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md) та [форматування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md) чисел, дат і валют.

</Question>

<Question title="Як перекладачі можуть редагувати вміст без втручання в код?">

Через [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), який дозволяє будь-кому редагувати тексти безпосередньо у працюючому додатку, або через [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), яка відокремлює вміст і дозволяє оновлювати його без повторного розгортання коду.

</Question>

<Question title="Чи є Intlayer безкоштовним та відкритим кодом?">

Так, під ліцензією Apache 2.0, включно з комерційним використанням. Хмарна CMS - це додаткова платна послуга, яку також можна [розгорнути самостійно (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

</FAQ>
