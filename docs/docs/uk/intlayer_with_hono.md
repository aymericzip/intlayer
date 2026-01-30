---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Hono i18n - Як перекласти ваш додаток Hono – посібник 2026
description: Дізнайтеся, як зробити ваш бекенд на Hono багатомовним. Дотримуйтесь документації для інтернаціоналізації (i18n) та перекладу.
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
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Перекладіть свій бекенд на Hono за допомогою Intlayer | Інтернаціоналізація (i18n)

`hono-intlayer` — це потужне проміжне ПЗ (middleware) для інтернаціоналізації (i18n) додатків Hono, розроблене для того, щоб зробити ваші бекенд-сервіси доступними в усьому світі, надаючи локалізовані відповіді на основі вподобань клієнта.

### Практичні сценарії використання

- **Відображення помилок бекенда мовою користувача**: коли стається помилка, відображення повідомлень рідною мовою користувача покращує розуміння та знижує роздратування. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися у фронтенд-компонентах, таких як сповіщення (toasts) або модальні вікна.

- **Отримання багатомовного вмісту**: для додатків, що витягують вміст із бази даних, інтернаціоналізація гарантує, що ви зможете надавати цей вміст кількома мовами. Це критично важливо для таких платформ, як сайти електронної комерції або системи управління вмістом, де необхідно відображати описи товарів, статті та інший вміст мовою, якій надає перевагу користувач.

- **Надсилання багатомовних листів**: будь то транзакційні листи, маркетингові кампанії чи сповіщення, надсилання електронних листів мовою одержувача може значно підвищити залученість та ефективність.

- **Багатомовні push-сповіщення**: для мобільних додатків надсилання push-сповіщень бажаною мовою користувача може покращити взаємодію та утримання. Цей персональний підхід робить сповіщення більш актуальними та дієвими.

- **Інші комунікації**: будь-яка форма комунікації з бекенда, така як SMS-повідомлення, системні сповіщення або оновлення інтерфейсу користувача, виграє від використання мови користувача, забезпечуючи чіткість та покращуючи загальний досвід користувача.

Інтернаціоналізуючи бекенд, ваш додаток не тільки поважає культурні відмінності, але й краще відповідає потребам глобального ринку, що є ключовим кроком у масштабуванні ваших послуг по всьому світу.

## Початок роботи

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Дивіться [Application Template](https://github.com/aymericzip/intlayer-hono-template) на GitHub.

### Встановлення

Щоб почати використовувати `hono-intlayer`, встановіть пакет за допомогою npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
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

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
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

> Ваші оголошення вмісту можуть бути визначені в будь-якому місці вашого додатка, якщо вони включені в каталог `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлу оголошення вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

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
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
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
