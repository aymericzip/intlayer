---
createdAt: 2026-08-23
updatedAt: 2026-08-24
title: "Elysia i18n - Повний посібник щодо перекладу вашого додатка"
description: "Більше ніяких i18next. Посібник 2026 року з розробки багатомовного (i18n) додатка Elysia. Перекладайте за допомогою AI агентів та оптимізуйте розмір bundle, SEO та продуктивність."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Узгодження посібника з шаблоном Elysia (типізація контексту, налаштування Bun, скрипти)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Перекладіть свій Elysia backend веб-сайт за допомогою Intlayer | Інтернаціоналізація (i18n)

`elysia-intlayer` – це потужний плагін інтернаціоналізації (i18n) для Elysia додатків, розроблений для того, щоб зробити ваші backend сервіси глобально доступними, надаючи локалізовані відповіді на основі переваг клієнта.

> Див. реалізацію пакету на GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### Практичні casos використання

- **Відображення помилок Backend мовою користувача**: Коли виникає помилка, відображення повідомлень рідною мовою користувача покращує розуміння та зменшує розчарування. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися в компонентах front-end, таких як toast-сповіщення або модальні вікна.
- **Отримання багатомовного контенту**: Для додатків, які завантажують контент з бази даних, інтернаціоналізація забезпечує можливість подавати цей контент кількома мовами. Це критично важливо для платформ, таких як сайти електронної комерції або системи управління контентом, які повинні відображати описи продуктів, статті та інший контент мовою, яку переважає користувач.
- **Надсилання багатомовних електронних листів**: Чи то трансакційні листи, маркетингові кампанії чи сповіщення, надсилання листів мовою одержувача може значно підвищити залучення та ефективність.
- **Багатомовні push-сповіщення**: Для мобільних додатків надсилання push-сповіщень мовою, яку переважає користувач, може підвищити взаємодію та утримання користувачів. Цей особистісний підхід може зробити сповіщення більш релевантними та практичними.
- **Інші комунікації**: Будь-яка форма комунікації з backend, така як SMS-повідомлення, системні сповіщення або оновлення користувацького інтерфейсу, виграють від того, що вони мовою користувача, забезпечуючи ясність та покращуючи загальний досвід користувача.

Інтернаціоналізуючи backend, ваш додаток не лише поважає культурні відмінності, а й краще узгоджується з глобальними потребами ринку, що робить це ключовим кроком у масштабуванні ваших послуг по всьому світу.

## Початок роботи

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Як інтернаціоналізувати вашу програму за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Див. [Application Template](https://github.com/aymericzip/intlayer-elysia-template) на GitHub.

### Установка

Щоб почати використовувати `elysia-intlayer`, встановіть пакет за допомогою npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> прапорець `--interactive` є опціональним. Використовуйте `intlayer-cli init`, якщо ви є AI-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> Elysia орієнтований на runtime **Bun**. `elysia-intlayer` спирається на `AsyncLocalStorage` (замість бібліотеки `cls-hooked`, яку використовують плагіни Intlayer на базі Node) саме тому, що Bun не реалізує `async_hooks.createHook`.

### Налаштування

Налаштуйте параметри інтернаціоналізації, створивши `intlayer.config.ts` у корені вашого проекту:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * Локаль за замовчуванням, яка використовується як fallback, якщо запитану локаль не знайдено.
     */
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Оголосіть Ваш Контент

Створюйте та керуйте своїми оголошеннями контенту для зберігання перекладів:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      uk: "Приклад контенту, повернутого українською мовою",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
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
        "uk": "Приклад контенту, повернутого українською мовою",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es": "Ejemplo de contenido devuelto en español"
      }
    }
  }
}
```

> Ваші оголошення контенту можна визначити будь-де у вашому додатку, якщо вони включені в директорію `contentDir` (за замовчуванням `./src`). І відповідають розширенню файлу оголошення контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для отримання додаткових інформацій зверніться до [документації оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Налаштування додатка Elysia

Налаштуйте ваш додаток Elysia для використання `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // Завантажте плагін інтернаціоналізації
  .use(intlayer())
  // Маршрути
  .get("/", ({ intlayer }) => ({
    // Мова, яка використовується для цього запиту, узгоджена `Accept-Language` або прочитана з сховища
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      uk: "Привіт",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Плагін реєструє свій контекст через **глобальний** `derive`, який Elysia типізує як `Partial<{ intlayer: IntlayerContext }>`. Під час виконання значення завжди присутнє для маршрутів, зареєстрованих після `.use(intlayer())`, тож використовуйте non-null assertion (`intlayer!.locale`) — або optional chaining — щоб задовольнити TypeScript у режимі `strict`.

Контекст маршруту надає:

| Властивість       | Опис                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| `locale`          | Локаль, яку слід використати для цього запиту; `locale_storage` має пріоритет над `locale_detected`. |
| `locale_storage`  | Локаль, явно запитана клієнтом через cookie або header.                                              |
| `locale_detected` | Локаль, узгоджена із заголовків запиту.                                                              |
| `defaultLocale`   | Локаль, налаштована як fallback у `intlayer.config.ts`.                                              |
| `t`               | Функція перекладу.                                                                                   |
| `getIntlayer`     | Функція для отримання словників за ключем.                                                           |
| `getDictionary`   | Функція для обробки об'єктів словників.                                                              |

Ті самі helpers також експортуються як standalone. Вони отримують поточний запит через `AsyncLocalStorage`, тож ви можете викликати їх без деструктуризації контексту:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      uk: "Приклад повернутого вмісту українською мовою",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> Контекст запиту звільняється одразу після мапінгу відповіді, тож окремі хелпери ніколи не розв'язуються щодо вже завершеного запиту. Якщо їх викликати поза запитом, який обробляє плагін, вони повертаються до налаштованої локалі за замовчуванням.

### Запуск вашого застосунку

Додайте скрипти Intlayer до вашого `package.json`. `intlayer build` компілює ваші декларації контенту в директорію `.intlayer` і генерує типи TypeScript:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Потім запустіть сервер:

```bash
bun run dev
```

Перевірте узгодження локалі за допомогою `Accept-Language`:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `intlayer build` не є суворо обов'язковим перед `bun run src/index.ts`: плагін також готує словники під час старту застосунку Elysia. Запуск наперед тримає згенеровані типи актуальними для вашого редактора та усуває вартість збірки під час першого запиту.

### Сумісність

`elysia-intlayer` повністю сумісна з:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/index.md) для React додатків
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/index.md) для Next.js додатків
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/index.md) для Vite додатків

Вона також безперебійно працює з будь-яким рішенням для інтернаціоналізації в різних середовищах, включаючи браузери та API запити.

За замовчуванням плагін визначає локаль у такому порядку:

1. Cookie `INTLAYER_LOCALE`.
2. Заголовок `x-intlayer-locale`.
3. Узгодження через заголовок `Accept-Language`.

Ви можете налаштувати cookie та заголовок, які використовуються для визначення локалі:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Для отримання додаткової інформації про конфігурацію та розширені теми відвідайте нашу [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Налаштування TypeScript

`elysia-intlayer` використовує надійні можливості TypeScript для покращення процесу локалізації. Статична типізація TypeScript забезпечує, що кожен ключ перекладу враховується, зменшуючи ризик пропущених перекладів і покращуючи maintainability.

Переконайтеся, що автоматично створені типи (за замовчуванням у ./types/intlayer.d.ts) включені у ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично створені типи
  ],
}
```

### VS Code Extension

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок в реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для більш детальної інформації про використання розширення звертайтесь до [документації розширення Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх комітування в ваш Git-репозиторій.

Щоб це зробити, ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків Elysia?">

- **Базові словники**: без типізації та інструментів.
- **`Intlayer`**: оптимізовано спеціально для Bun та Elysia, компіляція під час збирання, суворі типи TypeScript та максимальна швидкодія.

Головна причина інтернаціоналізації бекенду полягає в тому, що значна частина тексту, який бачить користувач, ніколи не проходить через фронтенд: повідомлення про помилки API, транзакційні електронні листи, push-сповіщення, SMS та експорт у PDF. Вони потребують мови одержувача, яка визначається для кожного запиту, а не для всієї сесії.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

</Question>

<Question title="Скільки i18n додає до розміру серверного бандла Elysia?">

Значно менше, ніж традиційні каталоги JSON. Компілятор Intlayer оптимізує словники під час збирання і не парсить їх заново під час кожного запиту, зменшуючи використання пам'яті та час холодного старту. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

</Question>

<Question title="Чи можу я мігрувати з інших бібліотек i18n без переписування обробників?">

Так, за допомогою посібників з міграції та плагіна синхронізації JSON.

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

Плагін Elysia на етапі `onRequest` або `derive` зчитує заголовки та cookie, записуючи локаль у `context.locale`.

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

<Question title="Чи повністю Intlayer сумісний із середовищем Bun?">

Так. Intlayer нативно працює на Bun, використовуючи переваги швидкого завантаження модулів та прямого виконання TypeScript.

</Question>

<Question title="Чи можу я використовувати локалізовані помилки у схемах TypeBox Elysia?">

Так. У хуку `onError` можна перехоплювати помилки валідації схеми та повертати локалізовані відповіді через Intlayer.

</Question>

<Question title="Як керувати маршрутизацією на основі локалі в URL?">

Використовуючи параметр шляху `/:locale/` у маршрутах та повертаючи 404 для невідомих мов.

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
