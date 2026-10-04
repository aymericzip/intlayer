---
createdAt: 2025-08-23
updatedAt: 2026-05-31
priority: 9
title: "Hono i18n - Повний посібник з перекладу вашого застосунку"
description: "Налаштування Intlayer у Hono: визначення локалі для кожного запиту через middleware, переклад відповідей API на Node, Bun або edge-рантаймах."
keywords:
  - інтернаціоналізація
  - документація
  - Intlayer
  - Hono
  - JavaScript
  - бекенд
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
author: aymericzip
---

# Перекладіть свій бекенд на Hono за допомогою Intlayer

`hono-intlayer`, це потужне проміжне ПЗ (middleware) для інтернаціоналізації (i18n) додатків Hono, розроблене для того, щоб зробити ваші бекенд-сервіси доступними в усьому світі, надаючи локалізовані відповіді на основі вподобань клієнта.

## Практичні сценарії використання

- **Відображення помилок бекенда мовою користувача**: коли стається помилка, відображення повідомлень рідною мовою користувача покращує розуміння та знижує роздратування. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися у фронтенд-компонентах, таких як сповіщення (toasts) або модальні вікна.

- **Отримання багатомовного вмісту**: для додатків, що витягують вміст із бази даних, інтернаціоналізація гарантує, що ви зможете надавати цей вміст кількома мовами. Це критично важливо для таких платформ, як сайти електронної комерції або системи управління вмістом, де необхідно відображати описи товарів, статті та інший вміст мовою, якій надає перевагу користувач.

- **Надсилання багатомовних листів**: будь то транзакційні листи, маркетингові кампанії чи сповіщення, надсилання електронних листів мовою одержувача може значно підвищити залученість та ефективність.

- **Багатомовні push-сповіщення**: для мобільних додатків надсилання push-сповіщень бажаною мовою користувача може покращити взаємодію та утримання. Цей персональний підхід робить сповіщення більш актуальними та дієвими.

- **Інші комунікації**: будь-яка форма комунікації з бекенда, така як SMS-повідомлення, системні сповіщення або оновлення інтерфейсу користувача, виграє від використання мови користувача, забезпечуючи чіткість та покращуючи загальний досвід користувача.

Інтернаціоналізуючи бекенд, ваш додаток не тільки поважає культурні відмінності, але й краще відповідає потребам глобального ринку, що є ключовим кроком у масштабуванні ваших послуг по всьому світу.

## Початок роботи

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-hono-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Дивіться [Application Template](https://github.com/aymericzip/intlayer-hono-template) на GitHub.

### Встановлення

Щоб почати використовувати `hono-intlayer`, встановіть пакет за допомогою npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> прапорець `--interactive` не є обов'язковим. Використовуйте `intlayer-cli init`, якщо ви є ШІ-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
```

### Налаштування

Налаштуйте параметри інтернаціоналізації, створивши файл `intlayer.config.ts` у корені вашого проєкту:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Оголошення вмісту

Створюйте та керуйте оголошеннями вмісту для зберігання перекладів:

```typescript fileName="src/index.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      uk: "Приклад контенту, що повертається українською мовою",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      uk: "Приклад повернутого вмісту українською мовою",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "uk": "Приклад повернутого вмісту українською мовою",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ваші оголошення вмісту можуть бути визначені в будь-якому місці вашого додатка, якщо вони включені в каталог `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлу оголошення вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для отримання додаткової інформації зверніться до [документації з оголошення вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

- [документації з оголошення вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)

### Налаштування додатка Hono

Налаштуйте свій додаток Hono для використання `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Завантаження обробника запитів інтернаціоналізації
app.use("*", intlayer());

// Маршрути
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      uk: "Приклад контенту, що повертається українською мовою",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Сумісність

`hono-intlayer` повністю сумісний із:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/exports.md)
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/exports.md)
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/exports.md)

Він також безперешкодно працює з будь-яким рішенням для інтернаціоналізації в різних середовищах, включаючи браузери та API-запити. Ви можете налаштувати проміжне ПЗ для виявлення локалі через заголовки або файли cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інші параметри конфігурації
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

За замовчуванням `hono-intlayer` буде інтерпретувати заголовок `Accept-Language` для визначення бажаної мови клієнта.

> Для отримання додаткової інформації про конфігурацію та розширені теми відвідайте нашу [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

- [Конфігурація Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

### Налаштування TypeScript

`hono-intlayer` використовує можливості TypeScript для покращення процесу інтернаціоналізації. Статична типізація TypeScript гарантує, що кожен ключ перекладу врахований, що знижує ризик пропущених перекладів та покращує підтримуваність.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Переконайтеся, що автоматично згенеровані типи (за замовчуванням у `./types/intlayer.d.ts`) включені у ваш файл `tsconfig.json`.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично згенеровані типи
  ],
}
```

### Розширення VS Code

Для покращення досвіду розробки з Intlayer ви можете встановити офіційне **розширення Intlayer VS Code**.

- [Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення забезпечує:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для пропущених перекладів.
- **Вбудований перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для отримання додаткової інформації про те, як використовувати розширення, зверніться до [документації розширення Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md).

- [документації розширення Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)

### Налаштування Git

Рекомендується ігнорувати файли, що генеруються Intlayer. Це дозволить уникнути їх фіксації у вашому Git-репозиторії.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, що генеруються Intlayer
.intlayer
```

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків Hono?">

Hono не має власного рівня i18n, тому варіантами є загальна бібліотека, така як `i18next`, підключена вручну до middleware, або `Intlayer` через `hono-intlayer`, який реєструє middleware для вас, визначає локаль для кожного запиту та використовує той самий оголошений вміст, що й ваш фронтенд.

Причина інтернаціоналізації бекенду полягає в тому, що значна частина тексту, який бачить користувач, ніколи не проходить через фронтенд: повідомлення про помилки API, транзакційні електронні листи, push-сповіщення, SMS та експорт у PDF. Вони потребують мови одержувача, яка визначається для кожного запиту, а не для кожної сесії.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

- [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md)

</Question>
<Question title="Скільки i18n додає до розміру серверного бандла Hono?">

Дуже мало. Словники компілюються заздалегідь, і до бандла потрапляють лише оголошені вами локалі, тому немає завантаження каталогів під час запуску та немає читання файлів під час обробки запиту. Це найважливіше для serverless- та edge-розгортань, де розмір бандла визначає час холодного старту. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

- [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)

</Question>
<Question title="Чи можу я мігрувати з `i18next` без переписування обробників?">

Так, і для цього є два шляхи. Ви можете мігрувати контент поступово за допомогою [посібника з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md). Або ви можете повністю зберегти поточний API: [compat-адаптери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) надають точно такий самий API, як `i18next`, але працюють на словниках Intlayer, тож змінюються лише імпорти, а код обробників залишається незмінним.

- [посібник з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md)
- [compat-адаптери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md)

</Question>
<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування локалей в один файл.

- [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)
- [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md)
- [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md)

</Question>
<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші вихідні файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним із них, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог по одному. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

- [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md)

На фронтенд-стороні того ж проєкту [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) іде ще далі й генерує словники під час збирання з вашого коду JSX, TSX, Vue або Svelte, тож обидві половини застосунку спільно використовують один шар контенту без жодних ключів, які потрібно підтримувати вручну.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md)

</Question>
<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, який його оголошує, вилучення контенту з компонента та запуск build, fill, test, push і pull із палітри команд або окремої вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: те саме розуміння коду в будь-якому редакторі з підтримкою LSP: перехід до визначення, пошук усіх посилань, перегляд перекладеного значення під час наведення, автодоповнення ключів і полів та попередження, коли ключ ніде не оголошено. Він також розпізнає виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`, що допомагає під час міграції.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT, тож асистент відповідає на основі актуальної документації замість здогадок і може сам виконувати команди, як-от `intlayer fill`.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички, такі як `intlayer-config`, `intlayer-cli` та `intlayer-content`, а також по одній для кожного фреймворку, які навчають агента вашого налаштування маршрутизації та типів вузлів контенту.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` позначає жорстко закодовані рядки, а додаткові правила стосуються статичних ключів словників і невикористаного контенту.

</Question>
<Question title="Як Intlayer визначає, якою мовою відповідати?">

За замовчуванням `hono-intlayer` читає заголовок `Accept-Language` вхідного запиту й обирає найближчу оголошену локаль, повертаючись до локалі за замовчуванням. Ви можете змінити джерело через `routing.storage`, наприклад на власний заголовок або cookie, встановлений вашим фронтендом, щоб API відповідав мовою, яку користувач справді обрав, а не тією, яку повідомляє його браузер. Див. [довідник з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

- [довідник з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

</Question>
<Question title="Чи ізольована локаль для кожного запиту?">

Так. Middleware обмежує активну локаль межами запиту, тому два одночасні запити різними мовами ніколи не читають локаль один одного. Саме це робить виклики `t()` та `getIntlayer()` безпечними всередині сервісу без передавання аргументу локалі через кожну функцію.

</Question>
<Question title="Як надсилати транзакційні листи мовою одержувача?">

Оголосіть контент листа у файлі контенту, як і будь-який інший контент, а потім отримайте його через `getIntlayer` для збереженої локалі одержувача замість локалі запиту. Це важливо для фонових задач і черг, де мова належить до запису користувача і немає вхідного запиту, з якого можна прочитати заголовок.

</Question>
<Question title="Як локалізувати повідомлення про помилки API?">

Обгорніть повідомлення в `t()` у місці, де створюється помилка. Активна локаль запиту визначає його значення, тож клієнт отримує повідомлення, яке може відобразити напряму, а вашому фронтенду не потрібен паралельний каталог кодів помилок.

</Question>
<Question title="Чи працює це на edge-середовищах, таких як Cloudflare Workers, Deno або Bun?">

Hono підтримує їх усі, а Intlayer отримує контент зі словників, скомпільованих під час збирання, замість читання файлів каталогів з диска під час виконання, що зазвичай і ламається на edge-середовищах. Залиште `dictionary.importMode` зі значенням за замовчуванням `"static"`, щоб контент потрапив у бандл разом із worker.

</Question>
<Question title="Як автоматично перекласти контент бекенда за допомогою AI?">

Запустіть `npx intlayer fill`, що заповнює відсутні переклади за допомогою обраної вами LLM, використовуючи вашого власного провайдера та API-ключ. Додайте `--git-diff`, щоб перекладати лише контент, змінений у гілці. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

- [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md)
- [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md)

</Question>
<Question title="Чи підтримує Intlayer множину, рід та інтерпольовані значення на сервері?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [контент залежно від роду](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md) для інтерпольованих значень, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md) для тексту листів та [форматери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md) для чисел, дат і валют.

- [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md)
- [контент залежно від роду](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md)
- [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md)
- [форматери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md)

</Question>
<Question title="Чи отримую я автодоповнення TypeScript на сервері?">

Так. Intlayer генерує типи ваших словників у `./types/intlayer.d.ts`, тому неіснуючий ключ стає помилкою компіляції, а не порожнім рядком під час виконання. Запускайте `npx intlayer test` у CI, щоб збирання падало, коли для оголошеної локалі бракує контенту.

</Question>
<Question title="Чи можуть фронтенд і бекенд використовувати той самий контент?">

Так, і це звичайне налаштування. `hono-intlayer` працює разом із `react-intlayer`, `next-intlayer` та `vite-intlayer` на тому самому оголошеному контенті, тож мітка, яка використовується і у відповіді API, і на сторінці, оголошується лише один раз. Див. [як працює Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/how_works_intlayer.md).

- [як працює Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/how_works_intlayer.md)

</Question>
<Question title="Чи є Intlayer безкоштовним і з відкритим кодом?">

Так, за ліцензією Apache 2.0, включно з комерційним використанням. Хостинговий [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) є необов'язковим платним сервісом, який також можна [розгорнути на власному сервері](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- [розгорнути на власному сервері](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md)

</Question>

</FAQ>
