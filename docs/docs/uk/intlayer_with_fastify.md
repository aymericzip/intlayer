---
createdAt: 2025-12-30
updatedAt: 2026-05-31
title: "Fastify i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Fastify. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Fastify
  - JavaScript
  - Бекенд
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Додано команду init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Ініціалізовано історію"
author: aymericzip
---

# Перекладіть свій бекенд-сайт на Fastify за допомогою Intlayer | Інтернаціоналізація (i18n)

`fastify-intlayer` - це потужний плагін інтернаціоналізації (i18n) для додатків Fastify, розроблений для того, щоб зробити ваші бекенд-сервіси доступними в усьому світі, надаючи локалізовані відповіді на основі вподобань клієнта.

> Подивитися [реалізацію пакета на GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer).

### Практичні варіанти використання

- **Відображення помилок бекенда мовою користувача**: Коли виникає помилка, відображення повідомлень рідною мовою користувача покращує розуміння та зменшує роздратування. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися в компонентах фронтенду, таких як тости або модальні вікна.
- **Отримання багатомовного контенту**: Для додатків, що витягують контент із бази даних, інтернаціоналізація гарантує, що ви зможете надавати цей контент декількома мовами. Це вкрай важливо для таких платформ, як сайти електронної комерції або системи управління контентом, яким необхідно відображати описи продуктів, статті та інший контент мовою, якій надає перевагу користувач.
- **Відправка багатомовних листів**: Будь то транзакційні листи, маркетингові кампанії чи сповіщення, відправка листів мовою одержувача може значно підвищити залученість та ефективність.
- **Багатомовні пуш-сповіщення**: Для мобільних додатків відправка пуш-сповіщень мовою користувача може покращити взаємодію та лояльність. Цей персоналізований підхід робить сповіщення більш релевантними та такими, що спонукають до дії.
- **Інші види комунікації**: Будь-яка форма комунікації з боку бекенда, така як SMS-повідомлення, системні оповіщення або оновлення інтерфейсу користувача, виграє від використання мови користувача, забезпечуючи ясність та покращуючи загальний досвід користувача.

Інтернаціоналізуючи бекенд, ваш додаток не лише поважає культурні відмінності, а й краще відповідає потребам глобального ринку, що є ключовим кроком у масштабуванні ваших послуг по всьому світу.

## Початок роботи

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Подивитися [шаблон додатка](https://github.com/aymericzip/intlayer-fastify-template) на GitHub.

### Встановлення

Щоб почати використовувати `fastify-intlayer`, встановіть пакет за допомогою npm:

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
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### Налаштування

Налаштуйте параметри інтернаціоналізації, створивши файл `intlayer.config.ts` у корені вашого проєкту:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Оголошення контенту

Створюйте та керуйте оголошеннями контенту для зберігання перекладів:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ваші оголошення контенту можуть бути визначені в будь-якому місці вашого додатка, за умови, що вони включені в каталог `contentDir` (за замовчуванням `./src`). І відповідають розширенню файлу оголошення контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для отримання більш детальної інформації зверніться до [документації з оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Налаштування додатка Fastify

Налаштуйте ваш додаток Fastify для використання `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Завантажити плагін інтернаціоналізації
await fastify.register(intlayer);

// Маршрути
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Сумісність

`fastify-intlayer` повністю сумісний з:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/index.md) для React-додатків
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/index.md) для Next.js-додатків
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/index.md) для Vite-додатків

Він також безшовно працює з будь-яким рішенням для інтернаціоналізації в різних середовищах, включаючи браузери та API-запити. Ви можете налаштувати проміжне ПЗ (middleware) для визначення локалі через заголовки або куки:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інші параметри налаштування
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

За замовчуванням `fastify-intlayer` інтерпретуватиме заголовок `Accept-Language` для визначення вподобаної мови клієнта.

> Для отримання додаткової інформації про налаштування та просунуті теми відвідайте нашу [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Налаштування TypeScript

`fastify-intlayer` використовує потужні можливості TypeScript для покращення процесу інтернаціоналізації. Статична типізація TypeScript гарантує, що кожен ключ перекладу врахований, знижуючи ризик відсутності перекладів та покращуючи підтримуваність.

Переконайтеся, що автоматично згенеровані типи (за замовчуванням у ./types/intlayer.d.ts) включені у ваш файл tsconfig.json.

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

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного контенту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Більш детальну інформацію про використання розширення можна знайти в [документації розширення Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Конфігурація Git

Рекомендується ігнорувати файли, що генеруються Intlayer. Це дозволить вам уникнути їх коміту у ваш Git-репозиторій.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, що генеруються Intlayer
.intlayer

```

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків Fastify?">

- **Плагіни `i18next` для Fastify**: бібліотеки часу виконання на основі просторів імен JSON.
- **`Intlayer`**: плагін `fastify-intlayer`, оптимізований під життєвий цикл Fastify, повна типізація TypeScript, AI переклад та єдині словники з фронтендом.

Головна причина інтернаціоналізації бекенду полягає в тому, що значна частина тексту, який бачить користувач, ніколи не проходить через фронтенд: повідомлення про помилки API, транзакційні електронні листи, push-сповіщення, SMS та експорт у PDF. Вони потребують мови одержувача, яка визначається для кожного запиту, а не для всієї сесії.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

</Question>

<Question title="Скільки i18n додає до розміру серверного бандла Fastify?">

Значно менше, ніж традиційні каталоги JSON. Компілятор Intlayer оптимізує словники під час збирання і не парсить їх заново під час кожного запиту, зменшуючи використання пам'яті та час холодного старту. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

</Question>

<Question title="Чи можу я мігрувати з i18next або інших бібліотек без переписування обробників?">

Так, за допомогою посібників з міграції або автоматичної синхронізації JSON файлів.

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

Плагін Fastify перевіряє cookie, заголовки або параметри шляху та зберігає результат у `request.locale`.

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

<Question title="Чи можу я використовувати власний механізм визначення мови?">

Так. За допомогою хука `preHandler` ви можете отримати мову з JWT токена чи сесії та встановити локаль.

</Question>

<Question title="Як використовувати локалізовані префікси URL у маршрутах Fastify?">

Додавши параметр `/:locale/` до маршрутів та використовуючи валідатор Intlayer для відсікання невідомих мов.

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
