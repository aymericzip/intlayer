---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "Hono i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Hono. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
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

# Перекладіть свій бекенд на Hono за допомогою Intlayer | Інтернаціоналізація (i18n)

`hono-intlayer`, це потужне проміжне ПЗ (middleware) для інтернаціоналізації (i18n) додатків Hono, розроблене для того, щоб зробити ваші бекенд-сервіси доступними в усьому світі, надаючи локалізовані відповіді на основі вподобань клієнта.

### Практичні сценарії використання

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

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/index.md) для React-додатків
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/index.md) для Next.js-додатків
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/index.md) для Vite-додатків

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

### Налаштування TypeScript

`hono-intlayer` використовує можливості TypeScript для покращення процесу інтернаціоналізації. Статична типізація TypeScript гарантує, що кожен ключ перекладу врахований, що знижує ризик пропущених перекладів та покращує підтримуваність.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення забезпечує:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для пропущених перекладів.
- **Вбудований перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для отримання додаткової інформації про те, як використовувати розширення, зверніться до [документації розширення Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

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

</Question>

<Question title="Скільки i18n додає до розміру серверного бандла Hono?">

Значно менше, ніж традиційні каталоги JSON. Компілятор Intlayer оптимізує словники під час збирання і не парсить їх заново під час кожного запиту, зменшуючи використання пам'яті та час холодного старту. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

</Question>

<Question title="Чи можу я мігрувати з i18next або інших бібліотек без переписування обробників?">

Так, через поступову міграцію або синхронізацію файлів перекладів.

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

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа до файлу контенту, вилучення рядків та запуск build, fill, test, push і pull із палітри команд.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: перехід до визначення, перегляд перекладеного значення під час наведення та автодоповнення ключів у будь-якому редакторі з підтримкою LSP. Також обробляє виклики `i18next`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="Як визначається мова клієнта у вхідних запитах?">

Middleware Hono читає cookie та заголовок `Accept-Language` через `c.req`, надаючи активну мову через `c.get('locale')`.

</Question>

<Question title="Чи можуть одні й ті самі оголошення контенту обслуговувати відповіді API та веб-інтерфейс?">

Так, у монорепозиторіях або спільних пакетах це є ключовою перевагою. Оголошений словник можна імпортувати як на бекенді (листи, помилки, відповіді API), так і на фронтенді (React, Vue, Svelte тощо), зберігаючи єдине джерело істини для всіх текстів.

</Question>

<Question title="Чи сповільнює Intlayer обробку запитів?">

Ні. Визначення локалі відбувається у швидкому middleware (читаються cookie, параметри або заголовок Accept-Language). Словники скомпільовані під час збирання та знаходяться в пам'яті, тому під час запиту немає читання з диска чи парсингу рядків.

</Question>

<Question title="Як локалізувати повідомлення про помилки, електронні листи та push-сповіщення?">

Викликаючи функцію `getIntlayer` або `t()` з урахуванням локалі запиту. Якщо мова користувача зберігається у базі даних, у фонових завданнях цільову мову можна передати у функцію явно.

</Question>

<Question title="Чи працює Intlayer у Cloudflare Workers та edge середовищах?">

Так. Intlayer генерує оптимізований JavaScript код без залежності від локальної файлової системи під час виконання, тому він ідеально працює на Cloudflare Workers, Deno та Vercel Edge.

</Question>

<Question title="Як використовувати локалізовані префікси URL у маршрутах Hono?">

Використовуючи сегмент `/:locale/` або створюючи суб-роутери Hono.

</Question>

<Question title="Як автоматично перекласти додаток за допомогою AI?">

Запустіть `npx intlayer fill`. Утиліта заповнює відсутні переклади через обрану LLM з вашим провайдером та ключем API, а прапорець `--git-diff` обмежує обробку зміненими файлами. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

</Question>

<Question title="Чи підтримує Intlayer форми множини, стать та форматований текст (rich text)?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [контент з урахуванням статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md) та [форматування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md).

</Question>

<Question title="Як нетехнічні члени команди можуть редагувати шаблони листів та повідомлення про помилки без доступу до коду?">

Є два шляхи: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), яка відокремлює вміст від кодової бази і дозволяє редагувати тексти через веб-інтерфейс, або [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), який записує зміни безпосередньо у файли коду.

</Question>

<Question title="Чи є Intlayer безкоштовним та відкритим кодом?">

Так, під ліцензією Apache 2.0, включно з комерційним використанням. Хмарна CMS - це додаткова платна послуга, яку також можна [розгорнути самостійно (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

</FAQ>
