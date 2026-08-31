---
createdAt: 2025-08-23
updatedAt: 2026-07-08
title: Intlayer CMS | Виносьте свій контент у Intlayer CMS
description: Виносьте свій контент у Intlayer CMS, щоб делегувати керування ним вашій команді.
keywords:
  - CMS
  - Visual Editor
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Розділ «Live Sync» перенесено на окрему сторінку (live-sync.md), тут залишено короткий вступ і посилання"
  - version: 9.0.0
    date: 2026-06-30
    changes: "Додано розділ «Самостійне розгортання»"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Додано документацію `liveSync`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Замінено поле `hotReload` на `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізовано історію"
author: aymericzip
---

# Документація системи керування контентом Intlayer (CMS)

<iframe title="Візуальний редактор + CMS для вашого вебзастосунку: Intlayer, пояснення" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS, це застосунок, який дозволяє винести вміст вашого проєкту Intlayer у зовнішню систему (CMS).

Для цього Intlayer вводить поняття «віддалених словників» (distant dictionaries).

![Інтерфейс Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Зміст

<TOC/>

---

## Розуміння віддалених словників

Intlayer розрізняє 'local' та 'remote' словники.

- 'local' словник, це словник, який оголошений у вашому проєкті Intlayer. Наприклад файл декларації кнопки або ваша панель навігації. Виносити контент назовні в такому випадку не має сенсу, оскільки цей контент зазвичай не змінюється часто.

- 'remote' словник, це словник, яким керують через Intlayer CMS. Це може бути корисно, щоб дозволити вашій команді керувати контентом безпосередньо на вашому вебсайті, а також для використання функцій A/B тестування та автоматичної SEO-оптимізації.

## Візуальний редактор проти CMS

Редактор [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), це інструмент, який дозволяє керувати вашим вмістом у візуальному редакторі для локальних словників. Після внесення зміни вміст буде замінено в code-base. Це означає, що застосунок буде перебудовано, а сторінка перезавантажиться для відображення нового вмісту.

На відміну від цього, Intlayer CMS, це інструмент, який дозволяє керувати вмістом у візуальному редакторі для віддалених словників. Після внесення зміни вміст **не** вплине на ваш code-base. Вебсайт автоматично відобразить змінений вміст.

## Інтеграція

Для детальнішої інформації про встановлення пакета див. відповідний розділ нижче:

### Інтеграція з Next.js

Для інтеграції з Next.js зверніться до [керівництва з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md).

### Інтеграція з Create React App

Для інтеграції з Create React App зверніться до [керівництва з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md).

### Інтеграція з Vite + React

Для інтеграції з Vite + React зверніться до [керівництва з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md).

## Конфігурація

Запустіть наступну команду, щоб увійти в Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

Це відкриє ваш браузер за замовчуванням, щоб завершити процес автентифікації й отримати необхідні облікові дані (Client ID та Client Secret) для використання сервісів Intlayer.

У файлі конфігурації Intlayer ви можете налаштувати параметри CMS:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... інші налаштування конфігурації
  editor: {
    /**
     * Обов'язково
     *
     * URL застосунку.
     * Це URL, що використовується візуальним редактором.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Обов'язково
     *
     * Client ID та client secret потрібні для увімкнення редактора.
     * Вони дозволяють ідентифікувати користувача, який редагує контент.
     * Їх можна отримати, створивши нового клієнта в Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Необов'язково
     *
     * Якщо ви розгортаєте Intlayer CMS самостійно, ви можете вказати URL CMS.
     *
     * URL Intlayer CMS.
     * За замовчуванням встановлено на https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Необов'язково
     *
     * У випадку, якщо ви самостійно розгортаєте Intlayer CMS, ви можете вказати URL бекенду.
     *
     * URL Intlayer CMS.
     * За замовчуванням встановлено на https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

> Якщо у вас немає client ID та client secret, ви можете отримати їх, створивши нового клієнта в [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Щоб побачити всі доступні параметри, зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

## Використання CMS

### Надіслати вашу конфігурацію

Щоб налаштувати Intlayer CMS, ви можете використовувати команди [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/uk/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Якщо ви використовуєте змінні оточення в файлі конфігурації `intlayer.config.ts`, ви можете вказати потрібне оточення за допомогою аргументу `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Ця команда завантажує вашу конфігурацію в Intlayer CMS.

### Відправити словник

Щоб перетворити ваші локальні словники у віддалений словник, ви можете використовувати команди [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/uk/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Якщо ви використовуєте змінні середовища у вашому файлі конфігурації `intlayer.config.ts`, ви можете вказати потрібне середовище за допомогою аргументу `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Ця команда завантажує ваші початкові словники контенту, роблячи їх доступними для асинхронного отримання та редагування через платформу Intlayer.

### Редагування словника

Потім ви зможете переглядати та керувати своїм словником у [Intlayer CMS](https://app.intlayer.org/content).

## Програмний доступ за допомогою `@intlayer/api` SDK

Крім CLI і візуального редактора, Intlayer поставляється з типізованим SDK у пакеті [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api). Це дозволяє вам розглядати CMS як **headless content database**: ви можете отримувати проекти, отримувати словники та безпосередньо змінювати їх з вашого власного додатку, скриптів або CI pipeline.

SDK обробляє автентифікацію за вас. Доки ваші `clientId` і `clientSecret` доступні (у вашій конфігурації Intlayer або середовищі), він автоматично отримує та оновлює OAuth2 access token та підписує кожен запит.

### Установка

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### Як це працює: authenticator + endpoints

SDK розділений на **два окремі імпорти** навмисне, щоб зберегти ваш bundle компактним:

1. `createIntlayerCMS` — створює легкий **authenticator**. Він містить лише облікові дані та керований токен доступу; він нічого не знає про будь-який конкретний домен.
2. `dictionaryEndpoint`, `projectEndpoint`, … — привʼязки **endpoint** для кожного домену, кожна імпортується з власного підпапки (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). Ви передаєте authenticator потрібному вам endpoint.

Оскільки кожний endpoint імпортується окремо, ваш bundle містить лише домени, які ви насправді використовуєте — імпортування `dictionaryEndpoint` ніколи не потягне за собою project, AI або будь-який інший клієнт домену.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// Конфігурація є необов'язковою: якщо її опущено, облікові дані читаються з
// `@intlayer/config/built`, що розв'язує змінні середовища INTLAYER_CLIENT_ID та
// INTLAYER_CLIENT_SECRET.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> Облікові дані CMS (`clientId` / `clientSecret`) надають **доступ до запису** вашого контенту. Завжди створюйте authenticator лише на **серверній стороні** (server actions, route handlers, scripts, CI). Ніколи не імпортуйте його в код на стороні клієнта та не розкривайте ваші облікові дані браузеру.

Якщо ви воліте не покладатися на конфігурацію на етапі збирання, передайте облікові дані явно:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // Необов'язково, для самостійно розміщених backend:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> Отримайте свої облікові дані, створивши новий ключ доступу в [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

### Завантажити проекти

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// Список проектів, доступних з вашими облікові даними
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// Читання агрегованих інформацій про локалізацію вибраного проекту
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### Отримання словників

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Список усіх віддалених словників проекту
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// Або отримайте один словник за ключем
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### Отправка та оновлення словників

Використовуйте CMS як базу даних для запису вмісту назад:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Створення нового словника
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Upsert пакету словників (створення або оновлення в одному викликі)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// Оновлення існуючого словника
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> Порада: повторно використовуйте прив'язану endpoint, щоб уникнути повторень:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### Вилучення одного методу

Кожен метод endpoint уже автентифікований та самостійний (він має власну обробку токена), тому ви можете вилучити один і передавати його навколо — наприклад, щоб інжектувати його як залежність:

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// Уже автентифіковано — автоматично оновлює токен при кожному виклику
export const pushDictionaries = dictionary.pushDictionaries;

// Використання
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## Live Sync

Live Sync дозволяє вашому застосунку відображати зміни контенту з CMS під час виконання. Немає потреби у перебудові або повторному розгортанні. Коли увімкнено, оновлення передаються на сервер Live Sync, який оновлює словники, які читає ваш застосунок.

Повний посібник з налаштування (увімкнення, запуск сервера Live Sync, локальний робочий процес розробки та обмеження) наведено в [документації Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/live-sync.md).

## Самостійне розгортання (Self-Hosting)

Intlayer може працювати повністю на вашій власній інфраструктурі. Одна команда розгортає повний стек (дашборд, API, база даних, сховище об'єктів та електронна пошта) за допомогою Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Повний посібник із налаштування, довідник зі змінних середовища, інструкції з оновлення та процедури резервного копіювання/відновлення наведені в [Посібнику із самостійного розгортання](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

---

## Налагодження

Якщо у вас виникли проблеми з CMS, перевірте наступне:

- Застосунок запущено.

- Налаштування [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) правильно встановлені у вашому конфігураційному файлі Intlayer.
  - Обов'язкові поля:
    - URL застосунку має відповідати тому, що ви вказали в конфігурації редактора (`applicationURL`).
    - URL CMS

- Переконайтеся, що конфігурацію проєкту було pushed до Intlayer CMS.

- Візуальний редактор використовує iframe для відображення вашого вебсайту. Переконайтеся, що Content Security Policy (CSP) вашого сайту дозволяє URL CMS у `frame-ancestors` ('https://app.intlayer.org' за замовчуванням). Перевірте консоль редактора на наявність помилок.

## Часто задавані запитання

<FAQ>

<Question title="У чому різниця між Intlayer CMS та візуальним редактором?">

[Візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) редагує локальні файли словників у вашій кодовій базі. CMS керує контентом віддалено на сервері, дозволяючи публікувати зміни текстів без необхідності нового розгортання додатку.

</Question>

<Question title="Скільки i18n додає до розміру бандла?">

Значно менше, ніж рішення на основі просторів імен (namespaces), оскільки сторінка ніколи не завантажує каталог, який вона не рендерить. Розмітка, що рендериться на сервері, отримує свій контент безпосередньо на сервері, а компілятор під час збирання замінює виклики `useIntlayer` точними записами словника, які використовує компонент, тому невикористані ключі та мови видаляються. [Динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) розділяють залишок за окремими локалями. У порівнянні зі звичними альтернативами Intlayer зменшує розмір бандла та сторінки до 50%. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

</Question>

<Question title="Чи можу я мігрувати з i18next, next-intl або react-i18next без переписування моїх компонентів?">

Так, і для цього є два шляхи. Ви можете переносити контент поступово, користуючись [посібником з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md) або [посібником з міграції з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md). Або ви можете повністю зберегти свій поточний API: [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) надають абсолютно той самий інтерфейс, що й `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` та `Lingui`, але дані беруться зі словників Intlayer, завдяки чому змінюються лише імпорти, а код компонентів залишається незмінним.

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування локалей в один файл.

</Question>

<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

Для повністю автоматизованого робочого процесу [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання у коді JSX, TSX, Vue та Svelte, генеруючи словники під час кожної зміни, тому вручну підтримувати ключі не потрібно. Оскільки він працює через статичний аналіз, динамічні рядки середовища виконання залишаються поза його досяжністю.

</Question>

<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, вилучення рядків із компонента та запуск build, fill, test, push і pull із палітри команд або вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: та сама функціональність у будь-якому редакторі з підтримкою LSP, включно з переходом до визначення, переглядом перекладеного значення під час наведення та автодоповненням ключів. Також підтримує виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="Який контент варто переносити до CMS?">

Контент, що часто змінюється і не прив'язаний до циклу релізів коду: тексти на лендінгах, ціни, оголошення, банери та статті блогу.

</Question>

<Question title="Що станеться, якщо CMS недоступна?">

Додаток автоматично повертається до локального оголошення словника в кодовій базі, завдяки чому збій мережі ніколи не призведе до порожньої сторінки для користувача.

</Question>

<Question title="Чи можу я самостійно хостити CMS?">

Так. CMS може працювати на вашій власній інфраструктурі, коли контент не повинен виходити за межі внутрішньої мережі. Див. [посібник із self-hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

<Question title="Чи потрібен редакторам контенту розробник для публікації змін?">

Ні. Це головна мета віддалених словників: редактор змінює текст у CMS, і завдяки функції живої синхронізації (live sync) сайт миттєво відображає оновлення.

</Question>

<Question title="Чи можна автоматизувати CMS замість використання інтерфейсу?">

Так. SDK `@intlayer/api` надає ті самі ендпоінти, що й інтерфейс, дозволяючи керувати проектами та публікацією словників за допомогою власних скриптів.

</Question>

<Question title="Чи підтримує CMS A/B тестування перекладів?">

Так. Віддалені словники підтримують [варіанти контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md), що дозволяє показувати різні версії текстів різним аудиторіям.

</Question>

<Question title="Чи є CMS безкоштовною?">

Бібліотека Intlayer, CLI, компілятор та візуальний редактор безкоштовні під ліцензією Apache 2.0. Хмарна CMS є платною послугою, але її версію для самостійного розміщення можна запустити безкоштовно на власному сервері.

</Question>

</FAQ>
