---
createdAt: 2024-08-13
updatedAt: 2026-01-10
title: Конфігурація
description: Дізнайтеся, як налаштувати Intlayer для вашого застосунку. Зрозумійте різні параметри та опції, доступні для налаштування Intlayer відповідно до ваших потреб.
keywords:
  - Конфігурація
  - Налаштування
  - Кастомізація
  - Intlayer
  - Опції
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 7.5.1
    date: 2026-01-10
    changes: Додано підтримку форматів файлів JSON5 та JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Додано опцію `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Додано конфігурацію `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Замінено `middleware` на конфігурацію `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Додано опцію `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Оновлено опцію `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Додано опцію `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Вилучено поле `dictionaryOutput` та поле `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Додано режим імпорту `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Замінено поле `hotReload` на `liveSync` та додано поля `liveSyncPort` і `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Замінено `activateDynamicImport` опцією `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Змінено значення за замовчуванням для contentDir з `['src']` на `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Додано команди `docs`
---

# Документація конфігурації Intlayer

## Огляд

Файли конфігурації Intlayer дозволяють налаштовувати різні аспекти плагіна, такі як інтернаціоналізація, middleware та обробка контенту. У цьому документі наведено детальний опис кожної властивості конфігурації.

---

## Зміст

<TOC/>

---

## Підтримувані формати файлів конфігурації

Intlayer підтримує формати файлів конфігурації JSON, JS, MJS та TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Приклад файлу конфігурації

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  dictionary: {
    fill: "./{{fileName}}.content.json",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "cookie",
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "Це тестовий додаток",
  },
  build: {
    mode: "auto",
    importMode: "dynamic",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  routing: {
    mode: "prefix-no-default",
    storage: "cookie",
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "Це тестовий додаток",
  },
  build: {
    importMode: "dynamic",
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "contentDir": ["src", "../ui-library"],
  },
  "dictionary": {
    "fill": "./{{fileName}}.content.json",
  },
  "routing": {
    "mode": "prefix-no-default",
    "storage": "cookie",
  },
  "editor": {
    "applicationURL": "https://example.com",
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "This is a test application",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## Довідник конфігурації

Нижченаведені розділи описують різні параметри конфігурації, доступні в Intlayer.

---

### Налаштування інтернаціоналізації

Визначає параметри, пов'язані з інтернаціоналізацією, включно з доступними локалями та локаллю за замовчуванням для застосунку.

#### Властивості

- **locales**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `['en']`
  - _Опис_: Список локалей, які підтримуються в застосунку.
  - _Приклад_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `[]`
  - _Description_: Перелік обов'язкових локалей у застосунку.
  - _Example_: `[]`
  - _Note_: Якщо порожній, усі локалі є обов'язковими в режимі `strict`.
  - _Note_: Переконайтеся, що обов'язкові локалі також визначені в полі `locales`.
- **strictMode**:
  - _Type_: `string`
  - _Default_: `inclusive`
  - _Description_: Забезпечує суворі реалізації інтернаціоналізованого контенту з використанням TypeScript.
  - _Note_: Якщо встановлено "strict", функція перекладу `t` вимагатиме, щоб кожна оголошена локаль була визначена. Якщо якась локаль відсутня або не зазначена в конфігурації, буде викинута помилка.
  - _Note_: Якщо встановлено "inclusive", функція перекладу `t` вимагатиме, щоб кожна оголошена locale була визначена. Якщо одна locale відсутня, буде виведено попередження. Проте функція прийме locale, яка не оголошена у вашій конфігурації, але існує.
  - _Note_: Якщо встановлено "loose", функція перекладу `t` прийматиме будь-яку наявну locale.

- **defaultLocale**:
  - _Type_: `string`
  - _Default_: `'en'`
  - _Description_: Локаль за замовчуванням, яка використовується як fallback, якщо запитувана локаль не знайдена.
  - _Example_: `'en'`
  - _Note_: Використовується для визначення локалі, коли вона не вказана в URL, cookie або заголовку.

---

### Editor Configuration

Визначає налаштування, пов'язані з інтегрованим редактором, включно з портом сервера та статусом активності.

#### Properties

- **applicationURL**:
  - _Type_: `string`
  - _За замовчуванням_: `http://localhost:3000`
  - _Опис_: URL додатка. Використовується для обмеження origin редактора з міркувань безпеки.
  - _Приклад_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Примітка_: URL додатка. Використовується для обмеження origin редактора з міркувань безпеки. Якщо встановлено в `'*'`, редактор доступний з будь-якого origin.

- **port**:
  - _Тип_: `number`
  - _За замовчуванням_: `8000`
  - _Опис_: Порт, який використовується сервером візуального редактора.

- **editorURL**:
  - _Тип_: `string`
  - _За замовчуванням_: `'http://localhost:8000'`
  - _Опис_: URL сервера редактора. Використовується для обмеження origin редактора з міркувань безпеки.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Note_: URL сервера редактора, до якого звертається додаток. Використовується для обмеження origins, які можуть взаємодіяти з додатком з міркувань безпеки. Якщо встановлено `'*'`, редактор доступний з будь-якого origin. Має бути вказаний, якщо змінено порт або якщо редактор розміщено на іншому домені.

- **cmsURL**:
  - _Type_: `string`
  - _Default_: `'https://intlayer.org'`
  - _Description_: URL Intlayer CMS.
  - _Example_: `'https://intlayer.org'`
  - _Note_: URL Intlayer CMS.

- **backendURL**:
  - _Type_: `string`
  - _Default_: `https://back.intlayer.org`
  - _Description_: URL backend-сервера.
  - _Example_: `http://localhost:4000`

- **enabled**:
  - _Type_: `boolean`
  - _За замовчуванням_: `true`
  - _Опис_: Вказує, чи додаток взаємодіє з візуальним редактором.
  - _Приклад_: `process.env.NODE_ENV !== 'production'`
  - _Примітка_: Якщо `true`, редактор зможе взаємодіяти з додатком. Якщо `false`, редактор не зможе взаємодіяти з додатком. У будь-якому випадку редактор може бути ввімкнений лише візуальним редактором. Вимкнення редактора для окремих середовищ — спосіб підвищити безпеку.

- **clientId**:
  - _Тип_: `string` | `undefined`
  - _За замовчуванням_: `undefined`
  - _Description_: clientId і clientSecret дозволяють пакетам intlayer автентифікуватися з бекендом за допомогою автентифікації oAuth2. Access token використовується для автентифікації користувача, пов’язаного з проєктом. Щоб отримати access token, перейдіть на https://app.intlayer.org/project та створіть обліковий запис.
  - _Example_: `true`
  - _Note_: Важливо: clientId та clientSecret мають зберігатися в секреті і не розголошуватися публічно. Переконайтеся, що вони зберігаються у безпечному місці, наприклад у змінних оточення.

- **clientSecret**:
  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId та clientSecret дозволяють пакетам intlayer автентифікуватися з бекендом за допомогою oAuth2. Токен доступу використовується для автентифікації користувача, пов’язаного з проєктом. Щоб отримати токен доступу, перейдіть на https://app.intlayer.org/project і створіть обліковий запис.
  - _Example_: `true`
  - _Note_: Важливо: clientId та clientSecret слід зберігати в таємниці й не розголошувати публічно. Переконайтеся, що зберігаєте їх у безпечному місці, наприклад у environment variables.

- **dictionaryPriorityStrategy**:
  - _Type_: `string`
  - _Default_: `'local_first'`
  - _Description_: Стратегія пріоритету словників у разі наявності як локальних, так і віддалених словників. Якщо встановлено `'distant_first'`, застосунок віддаватиме пріоритет віддаленим словникам над локальними. Якщо встановлено `'local_first'`, застосунок віддаватиме пріоритет локальним словникам над віддаленими.
  - _Example_: `'distant_first'`

- **liveSync**:
  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: Вказує, чи має сервер застосунку виконувати hot reload контенту застосунку при виявленні змін у CMS / Visual Editor / Backend.
  - _Example_: `true`
  - _Note_: Наприклад, коли додається або оновлюється новий словник, застосунок оновить контент, що відображається на сторінці.
  - _Примітка_: Live sync потребує винесення вмісту застосунку на інший сервер. Це означає, що це може трохи вплинути на продуктивність застосунку. Щоб обмежити цей вплив, рекомендуємо розміщувати застосунок і live sync сервер на одній машині. Також комбінація live sync та `optimize` може спричинити значну кількість запитів до live sync сервера. Залежно від вашої інфраструктури, рекомендуємо протестувати обидві опції та їх комбінацію.

- **liveSyncPort**:
  - _Тип_: `number`
  - _За замовчуванням_: `4000`
  - _Опис_: Порт live sync сервера.
  - _Приклад_: `4000`
  - _Примітка_: Порт live sync сервера.

- **liveSyncURL**:
  - _Тип_: `string`
  - _За замовчуванням_: `'http://localhost:{liveSyncPort}'`
  - _Description_: URL live sync сервера.
  - _Example_: `'https://example.com'`
  - _Note_: За замовчуванням вказує на localhost, але може бути змінений на будь-який URL у випадку віддаленого live sync сервера.

### Конфігурація маршрутизації

Налаштування, що контролюють поведінку маршрутизації, включно зі структурою URL, зберіганням locale та обробкою middleware.

#### Властивості

- **mode**:
  - _Type_: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
  - _Default_: `'prefix-no-default'`
  - _Description_: Режим маршрутизації URL для обробки locale.
  - _Examples_:
    - `'prefix-no-default'`: `/dashboard` (en) або `/fr/dashboard` (fr)
    - `'prefix-all'`: `/en/dashboard` (en) або `/fr/dashboard` (fr)
    - `'no-prefix'`: `/dashboard` (locale обробляється іншими способами`)
    - `'search-params'`: `/dashboard?locale=fr`
  - _Note_: Це налаштування не впливає на керування cookie або зберіганням локалі.

- **storage**:
  - _Type_: `false | 'cookie' | 'localStorage' | 'sessionStorage' | 'header' | CookiesAttributes | StorageAttributes | Array`
  - _Default_: `'localStorage'`
  - _Description_: Налаштування для зберігання локалі на клієнті.

  - **cookie**:
    - _Description_: Зберігає дані в cookie — невеликі фрагменти даних, що зберігаються в браузері клієнта, доступні як на стороні клієнта, так і на стороні сервера.
    - _Note_: Для зберігання, що відповідає вимогам GDPR, перед використанням забезпечте належну згоду користувача.
    - _Note_: Параметри cookie можна налаштувати, якщо вказати їх як CookiesAttributes (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).

  - **localStorage**:
    - _Опис_: Зберігає дані в браузері без дат закінчення терміну дії, що дозволяє зберігати дані між сесіями, доступне лише на боці клієнта.
    - _Примітка_: Ідеально підходить для зберігання довгострокових даних, проте слід враховувати питання приватності та безпеки через відсутність строку дії, якщо їх не видалити явно.
    - _Примітка_: Сховище локалі доступне лише на боці клієнта, проксі intlayer не зможе до нього отримати доступ.
    - _Примітка_: Параметри сховища локалі можна налаштувати, якщо вказати їх як StorageAttributes (`{ type: 'localStorage', name: 'custom-locale' }`).

  - **sessionStorage**:
    - _Опис_: Зберігає дані протягом сеансу сторінки, тобто вони очищуються після закриття вкладки або вікна, доступне лише на боці клієнта.
    - _Note_: Підходить для тимчасового збереження даних для кожної сесії.
    - _Note_: Сховище локалі доступне лише на стороні клієнта, проксі intlayer не зможе до нього звертатися.
    - _Note_: Параметри збереження локалі можна налаштувати, якщо задати їх як StorageAttributes (`{ type: 'sessionStorage', name: 'custom-locale' }`).

  - **header**:
    - _Description_: Використовує HTTP-заголовки для збереження або передачі даних локалі, підходить для визначення мови на стороні сервера.
    - _Note_: Корисно в API-запитах для підтримки узгоджених налаштувань мови між запитами.
    - _Note_: Заголовок доступний лише на стороні сервера, клієнт не зможе отримати до нього доступ.
    - _Note_: Назву заголовка можна змінити, якщо вказати її в StorageAttributes (`{ type: 'header', name: 'custom-locale' }`).

- **basePath**:
  - _Тип_: `string`
  - _За замовчуванням_: `''`
  - _Опис_: Базовий шлях для URL-адрес застосунку.
  - _Приклад_: `'/my-app'`
  - _Примітка_:
    - Якщо застосунок розміщений за адресою `https://example.com/my-app`
    - Базовий шлях — `'/my-app'`
    - URL буде `https://example.com/my-app/en`
    - Якщо базовий шлях не встановлено, URL буде `https://example.com/en`

#### Атрибути cookie

При використанні зберігання в cookie ви можете налаштувати додаткові атрибути cookie:

- **name**: Ім'я cookie (за замовчуванням: `'INTLAYER_LOCALE'`)
- **domain**: Домен cookie (за замовчуванням: undefined)
- **path**: Шлях cookie (за замовчуванням: undefined)
- **secure**: Вимагати HTTPS (за замовчуванням: undefined)
- **httpOnly**: Прапорець лише для HTTP (httpOnly) (за замовчуванням: undefined)
- **sameSite**: Політика SameSite (`'strict' | 'lax' | 'none'`)
- **expires**: Дата закінчення строку дії або кількість днів (значення за замовчуванням: undefined)

#### Атрибути збереження локалі

Коли використовується localStorage або sessionStorage:

- **type**: Тип сховища (`'localStorage' | 'sessionStorage'`)
- **name**: Ім'я ключа в сховищі (за замовчуванням: `'INTLAYER_LOCALE'`)

#### Приклади конфігурації

Нижче наведені поширені приклади конфігурації для нової структури маршрутизації v7:

**Базова конфігурація (за замовчуванням)**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Конфігурація, сумісна з GDPR**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Режим параметрів пошуку**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Режим без префікса з кастомним сховищем**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    headerName: "x-custom-locale",
    basePath: "/my-app",
  },
});
```

---

### Конфігурація контенту

Налаштування, пов'язані з обробкою контенту в додатку, включаючи назви директорій, розширення файлів та похідні конфігурації.

#### Властивості

- **watch**:
  - _Тип_: `boolean`
  - _За замовчуванням_: `process.env.NODE_ENV === 'development'`
  - _Опис_: Вказує, чи Intlayer має відслідковувати зміни в файлах декларації контенту в додатку, щоб перебудувати відповідні словники.

- **fileExtensions**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Опис_: Розширення файлів, які слід шукати під час побудови словників.
  - _Приклад_: `['.data.ts', '.data.js', '.data.json']`
  - _Примітка_: Налаштування розширень файлів може допомогти уникнути конфліктів.

- **baseDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `process.cwd()`
  - _Опис_: Базова директорія проекту.
  - _Приклад_: `'/path/to/project'`
  - _Примітка_: Використовується для визначення всіх директорій, пов'язаних з Intlayer.

- **contentDir**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `['.']`
  - _Приклад_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Опис_: Шлях до каталогу, де зберігається контент.

- **dictionariesDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'.intlayer/dictionaries'`
  - _Опис_: Шлях до каталогу для збереження проміжних або вихідних результатів.

- **moduleAugmentationDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'.intlayer/types'`
  - _Опис_: Каталог для module augmentation, що дозволяє покращені підказки IDE та перевірку типів.
  - _Приклад_: `'intlayer-types'`
  - _Примітка_: Переконайтеся, що цей каталог включений у `tsconfig.json`.

- **unmergedDictionariesDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'.intlayer/unmerged_dictionary'`
  - _Опис_: Каталог для збереження незлитих словників.
  - _Приклад_: `'translations'`

- **dictionariesDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'.intlayer/dictionary'`
  - _Опис_: Каталог для збереження словників локалізації.
  - _Приклад_: `'translations'`

- **typesDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'types'`
  - _Опис_: Каталог для збереження типів словників.
  - _Приклад_: `'intlayer-types'`

- **mainDir**:
  - _Тип_: `string`
  - _За замовчуванням_: `'main'`
  - _Опис_: Каталог, де зберігаються основні файли застосунку.
  - _Приклад_: `'intlayer-main'`

- **excludedPath**:
  - _Тип_: `string[]`
  - _За замовчуванням_: `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']`
  - _Description_: Каталоги, виключені з пошуку вмісту.
  - _Note_: Ця налаштування ще не використовується, але планується для майбутньої реалізації.

- **formatCommand**:
  - _Type_: `string`
  - _Default_: `undefined`
  - _Description_: Команда для форматування вмісту. Коли Intlayer записуватиме ваші .content файли локально, ця команда буде використана для форматування вмісту.
  - _Example_: `'npx prettier --write "{{file}}" --log-level silent'` За допомогою Prettier
  - _Example_: `'npx biome format "{{file}}" --write --log-level none'` За допомогою Biome
  - _Example_: `'npx eslint --fix "{{file}}"  --quiet'` За допомогою ESLint
  - _Note_: Intlayer замінить {{file}} на шлях до файлу, який потрібно форматувати.
  - _Note_: Якщо не вказано, Intlayer спробує визначити команду форматування автоматично. Він буде намагатися знайти такі команди: prettier, biome, eslint.

### Конфігурація словника

Налаштування, які керують операціями словника, включаючи поведінку автоматичного заповнення та генерацію контенту.

Ця конфігурація словника має дві основні цілі:

1. **Значення за замовчуванням**: Визначати значення за замовчуванням під час створення файлів декларації контенту
2. **Поведінка при відсутності значень**: Забезпечувати запасні значення, коли певні поля не визначені, що дозволяє задавати поведінку операцій словника глобально

Щоб дізнатися більше про файли декларації контенту та про те, як застосовуються значення конфігурації, див. [Документацію щодо контент-файлів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

#### Властивості

- **fill**
- **description**
- **locale**
- **priority**
- **live**
- **title**
- **tags**
- **version**

---

### Конфігурація логера

Налаштування, що керують логером, включно з префіксом, який слід використовувати.

#### Властивості

- **mode**:
  - _Тип_: `string`
  - _За замовчуванням_: `default`
  - _Опис_: Вказує режим роботи логера.
  - _Опції_: `default`, `verbose`, `disabled`
  - _Приклад_: `default`
  - _Примітка_: Режим роботи логера. Режим `verbose` записуватиме більше інформації й підходить для налагодження. Режим `disabled` вимкне логер.

- **prefix**:
  - _Type_: `string`
  - _Default_: `'[intlayer] '`
  - _Description_: Префікс logger'а.
  - _Example_: `'[my custom prefix] '`
  - _Note_: Префікс logger'а.

### Конфігурація AI

Налаштування, які контролюють AI-функції Intlayer, включно з провайдером, моделлю та API-ключем.

Ця конфігурація є необов'язковою, якщо ви зареєстровані на [Intlayer Dashboard](https://app.intlayer.org/project) і використовуєте ключ доступу. Intlayer автоматично підбере найефективніше та економічно вигідне AI-рішення для ваших потреб. Використання опцій за замовчуванням забезпечує кращу довгострокову підтримуваність, оскільки Intlayer постійно оновлюється, щоб використовувати найбільш релевантні моделі.

Якщо ви віддаєте перевагу використовувати власний API-ключ або конкретну модель, ви можете визначити власну конфігурацію AI.
Ця конфігурація ШІ буде використовуватися глобально в усьому вашому середовищі Intlayer. Команди CLI використовуватимуть ці налаштування як значення за замовчуванням для команд (наприклад, `fill`), а також SDK, Visual Editor і CMS. Ви можете перевизначати ці значення за замовчуванням для конкретних випадків використання за допомогою параметрів команд.

Intlayer підтримує кількох постачальників ШІ для більшої гнучкості та вибору. Наразі підтримуються такі постачальники:

- **OpenAI** (за замовчуванням)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**
- **ollama**

#### Властивості

- **provider**:
  - _Type_: `string`
  - _Default_: `'openai'`
  - _Description_: Постачальник, який використовуватиметься для функцій ШІ Intlayer.
  - _Options_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`
  - _Example_: `'anthropic'`
  - _Note_: Різні провайдери можуть вимагати різні API-ключі та мати різні моделі ціноутворення.

- **model**:
  - _Type_: `string`
  - _Default_: None
  - _Description_: Модель, яку слід використовувати для функцій ШІ в Intlayer.
  - _Example_: `'gpt-4o-2024-11-20'`
  - _Note_: Конкретна модель для використання залежить від провайдера.

- **temperature**:
  - _Type_: `number`
  - _Default_: None
  - _Description_: Параметр temperature контролює випадковість відповідей ШІ.
  - _Example_: `0.1`
  - _Note_: Вища температура зробить ШІ більш креативним та менш передбачуваним.

- **apiKey**:
  - _Type_: `string`
  - _Default_: None
  - _Description_: Ваш API-ключ для вибраного провайдера.
  - _Example_: `process.env.OPENAI_API_KEY`
  - _Note_: Важливо: API-ключі слід зберігати в таємниці та не поширювати публічно. Будь ласка, зберігайте їх у безпечному місці, наприклад у змінних середовища.

- **applicationContext**:
  - _Type_: `string`
  - _Default_: None
  - _Description_: Надає додатковий контекст про ваш застосунок для AI-моделі, допомагаючи їй генерувати точніші та контекстуально доречні переклади. Це може включати інформацію про домен вашого додатку, цільову аудиторію, тон або специфічну термінологію.
  - _Note_: Ви можете використовувати його, щоб додати більше правил для AI-моделі (e.g. "You should not transform urls").
  - _Example_: `'My application context'`

- **baseURL**:
  - _Type_: `string`
  - _Default_: None
  - _Description_: Базовий URL для AI API.
  - _Example_: `'https://api.openai.com/v1'`
  - _Example_: `'http://localhost:5000'`
  - _Note_: Може використовуватися для вказівки локального або кастомного AI API endpoint.

> Якщо ви надаєте додаткові параметри, Intlayer передасть їх AI-моделі як контекст. Це можна використовувати для налаштування інтенсивності міркувань, детальності тексту тощо

### Конфігурація збірки

Налаштування, що контролюють, як Intlayer оптимізує та збирає інтернаціоналізацію вашого застосунку.

Параметри збірки застосовуються до плагінів `@intlayer/babel` та `@intlayer/swc`.

> У режимі розробки Intlayer використовує статичні імпорти словників, щоб спростити процес розробки.

> У режимі оптимізації Intlayer замінює виклики словників для оптимізації розбиття на чанки (chunking), тож фінальний бандл імпортує лише ті словники, які фактично використовуються.

#### Властивості

- **mode**:
  - _Type_: `'auto' | 'manual'`
  - _За замовчуванням_: `'auto'`
  - _Опис_: Керує режимом збірки.
  - _Приклад_: `'manual'`
  - _Примітка_: Якщо 'auto', збірка буде увімкнена автоматично під час побудови застосунку.
  - _Примітка_: Якщо 'manual', збірка буде встановлена лише під час виконання команди збірки.
  - _Примітка_: Може використовуватися для вимкнення збірки словників, наприклад, коли слід уникати виконання в середовищі Node.js.

- **optimize**:
  - _Тип_: `boolean`
  - _За замовчуванням_: `undefined`
  - _Опис_: Керує тим, чи слід оптимізувати збірку.
  - _Приклад_: `process.env.NODE_ENV === 'production'`
  - _Примітка_: За замовчуванням оптимізація збірки не зафіксована. Якщо не встановлено, Intlayer запустить оптимізацію під час збірки вашого застосунку (vite / nextjs / тощо). Встановлення `true` примусово увімкне оптимізацію збірки, включно з режимом розробки. Встановлення `false` вимкне оптимізацію збірки.
  - _Примітка_: Коли ввімкнено, Intlayer замінює всі виклики словників для оптимізації розбиття на чанки. Таким чином фінальний бандл імпортуватиме лише ті словники, які використовуються. Всі імпорти залишаться статичними, щоб уникнути асинхронної обробки під час завантаження словників.
  - _Примітка_: Intlayer замінить усі виклики `useIntlayer` на варіант, визначений опцією `importMode`, а `getIntlayer` — на `getDictionary`.
  - _Примітка_: Ця опція покладається на плагіни `@intlayer/babel` та `@intlayer/swc`.
  - _Примітка_: Переконайтесь, що всі ключі оголошені статично у викликах `useIntlayer`. Наприклад `useIntlayer('navbar')`.

- **importMode**:
  - _Тип_: `'static' | 'dynamic' | 'live'`
  - _За замовчуванням_: `'static'`
  - _Опис_: Керує тим, як імпортуються словники.
  - _Приклад_: `'dynamic'`
  - _Примітка_: Доступні режими:
    - "static": Словники імпортуються статично. Замінює `useIntlayer` на `useDictionary`.
    - "dynamic": Словники імпортуються динамічно з використанням Suspense. Замінює `useIntlayer` на `useDictionaryDynamic`.
    - "live": Словники отримуються динамічно з використанням live sync API. Замінює `useIntlayer` на `useDictionaryDynamic`.
  - _Note_: Динамічні імпорти залежать від Suspense і можуть дещо вплинути на продуктивність рендерингу.
  - _Note_: Якщо вимкнено, усі локалі будуть завантажені одночасно, навіть якщо вони не використовуються.
  - _Note_: Ця опція покладається на плагіни `@intlayer/babel` та `@intlayer/swc`.
  - _Note_: Переконайтеся, що всі ключі оголошені статично у викликах `useIntlayer`. Наприклад `useIntlayer('navbar')`.
  - _Note_: Ця опція буде ігноруватися, якщо `optimize` вимкнено.
  - _Note_: Якщо встановлено в "live", лише ті словники, які містять віддалений контент і позначені прапорцем "live", будуть перетворені у live-режим. Інші будуть імпортовані динамічно як режим "dynamic" для оптимізації кількості запитів і швидкості завантаження.
  - _Note_: У режимі live буде використовуватися Live Sync API для отримання словників. Якщо виклик API завершиться невдачею, словники будуть імпортовані динамічно в режимі "dynamic".
  - _Note_: Ця опція не вплине на функції `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` та `useDictionaryDynamic`.
- **outputFormat**:
  - _Type_: `'esm' | 'cjs'`
  - _Default_: `'esm'`
  - _Description_: Керує форматом виводу словників.
  - _Example_: `'cjs'`
  - _Note_: Формат виводу словників.

- **traversePattern**:
  - _Type_: `string[]`
  - _Default_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Description_: Шаблони, що визначають, які файли слід обходити під час оптимізації.
    - _Example_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Note_: Використовуйте це, щоб обмежити оптимізацію релевантними файлами коду та покращити продуктивність збірки.
  - _Note_: Ця опція буде ігнорована, якщо `optimize` вимкнено.
  - _Note_: Використовуйте glob-шаблон.
