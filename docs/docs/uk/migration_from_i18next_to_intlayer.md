---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Міграція з i18next на Intlayer | Інтернаціоналізація (i18n)"
description: "Дізнайтеся, як перенести вашу JavaScript/TypeScript додаток з i18next на Intlayer — крок за кроком, без порушення вашого існуючого коду. Використовуйте адаптер сумісності @intlayer/i18next для безперебійного переходу."
keywords:
  - i18next
  - intlayer
  - migration
  - internationalization
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Міграція з i18next на Intlayer

## Чому варто перейти з i18next на Intlayer?

<AccordionGroup>

<Accordion header="Розмір bundle">

Замість завантаження великих JSON-файлів на ваші сторінки завантажуйте лише необхідний контент. Intlayer допомагає **зменшити розмір bundle та сторінок на 50%**.

</Accordion>

<Accordion header="Підтримуваність">

Область видимості контенту вашої програми **полегшує обслуговування** великомасштабних додатків. Ви можете дублювати або видаляти папку однієї функції без перегляду всієї codebase контенту. Крім того, Intlayer **повністю типізований**, щоб забезпечити точність вашого контенту.

Intlayer також є рішенням із **найактивнішою розробкою** в екосистемі i18n — проблеми вирішуються швидко, нові адаптери фреймворків регулярно додаються, а основний API постійно вдосконалюється на основі реального відгуку з production.

</Accordion>

<Accordion header="AI Agent">

Розташування контенту поруч **зменшує контекст, необхідний** великим мовним моделям (LLMs). Intlayer також поставляється з набором інструментів, таких як **CLI** для тестування відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)** та **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити досвід розробника (DX) ще зручнішим для AI агентів.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу у вашому CI/CD pipeline, використовуючи LLM на ваш вибір за вартість вашого AI провайдера. Intlayer також пропонує **компілятор** для автоматизації вилучення контенту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) для допомоги в **перекладі у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення великих JSON-файлів до компонентів може привести до проблем із продуктивністю та реактивністю. Intlayer оптимізує завантаження контенту на етапі збірки.

</Accordion>

<Accordion header="Масштабування з не-розробниками">

Більше ніж просто рішення i18n, Intlayer надає **самостійно розміщений [редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)** та **[повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)** для керування вашим багатомовним контентом у **режимі реального часу**, що робить співпрацю з перекладачами, копірайтерами та іншими членами команди безпроблемною. Контент може зберігатися локально та/або віддалено.

</Accordion>

</AccordionGroup>

---

## Стратегії міграції

Існують дві взаємодоповнюючі стратегії для міграції з `i18next` на Intlayer:

1. **Compat adapter (рекомендується для існуючих додатків)** — Встановіть `@intlayer/i18next`. Цей пакет надає **точно той самий API** як `i18next`, але делегує всю роботу перекладу Intlayer під капотом. Ви зберігаєте свої існуючі виклики `i18next.t()`, `i18next.changeLanguage()` та `createInstance()` — єдина зміна - це шлях імпорту та ініціалізація.

2. **Повна міграція** — Поступово замініть `i18next` API на нативні інструменти Intlayer та розмістіть вміст у файлах `.content.ts`.

Цей посібник спочатку охоплює **Стратегію 1** (drop-in compat adapter), а потім розглядає опціональну повну міграцію.

---

## Зміст

<TOC/>

---

## Швидка міграція

Наступні кроки — це мінімум, необхідний для запуску вашого існуючого додатку `i18next` на Intlayer без змін коду.

<Steps>

<Step number={1} title="Встановлення залежностей">

Встановіть основні пакети Intlayer та адаптер сумісності:

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

> прапор `--interactive` не обов'язковий. Використовуйте `intlayer-cli init`, якщо ви AI-агент.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

> Ви можете залишити встановленим `i18next` — адаптер сумісності використовує його як `devDependency` / `peerDependency` для типів TypeScript.

</Step>

<Step number={2} title="Налаштування Intlayer">

Команда `intlayer init` створює стартовий файл `intlayer.config.ts`. Оновіть його, щоб відповідав вашим існуючим локалям, та спрямуйте плагін `syncJSON` на ваші файли повідомлень:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Додайте всі ваші існуючі локалі тут
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // відповідає синтаксису заповнювачів i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** маппує локаль на шлях її JSON-файлу. **`location`** говорить спостерігачу Intlayer, яку папку моніторити на предмет змін. Опція `format: 'i18next'` забезпечує правильний парсинг заповнювачів на кшталт `{{name}}`.

</Step>

<Step number={3} title="Оновлення псевдонімів bundler (необов'язково)">

Якщо ви використовуєте bundler (Vite, Webpack, esbuild), ви можете вінжектити псевдонім модуля, щоб `import ... from 'i18next'` автоматично розв'язувався на `@intlayer/i18next`. Це усуває необхідність вручну змінювати імпорти у вашій кодовій базі.

**Для Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()` обгортає плагін `intlayer()` від `vite-intlayer` та додає
> псевдонім `i18next` → `@intlayer/i18next` за вас. Використання звичайного плагіна `intlayer()`
> від `vite-intlayer` компілює словники, але **не** додає цей псевдонім — ви
> тоді вручну перейменуєте імпорти на `@intlayer/i18next` (див. наступний крок).

</Step>

</Steps>

Це все для швидкої міграції. Ваш додаток тепер запускається на Intlayer, зберігаючи кожен імпорт та API `i18next`.

---

## Повна міграція

Наведені нижче кроки є необов'язковими і можуть виконуватися поступово. Вони розблоковують повний набір функцій Intlayer: візуальний редактор, CMS, типізовані файли контенту, переклад на базі AI та багато іншого.

<Steps>

<Step number={4} title="Явне перейменування імпортів (необов'язково)" isOptional={true}>

Якщо ви вважаєте за потрібне зробити залежність явною у ваших вихідних файлах або якщо ви не використовуєте плагін bundler для створення псевдонімів імпортів, ви можете вручну перейменувати імпорти:

| До                                         | Після                                                |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

Це **прямі заміни** — жодних змін до підписів функцій, аргументів або типів повернення не потрібно.

</Step>

<Step number={5} title="Увімкнути автоматизацію перекладу на базі AI" isOptional={true}>

Після налаштування Intlayer використовуйте його CLI для автоматичного заповнення відсутніх перекладів:

```bash packageManager="npm"
# Тест на відсутні переклади (додати до CI)
npx intlayer test

# Заповнити відсутні переклади за допомогою AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Додайте конфігурацію AI до `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // за замовчуванням
    // model: "gpt-4o-mini",   // за замовчуванням
  },
};

export default config;
```

> Див. [документацію Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) для всіх доступних опцій.

</Step>

</Steps>

---

## Що можна видалити після міграції

Після того як адаптер сумісності буде встановлений, наступний `i18next` шаблонний код можна видалити:

| Файл / pattern                           | Чому він більше не потрібен                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` calls                   | Intlayer ініціалізує все автоматично; немає кроку завантаження під час виконання.                                                                 |
| `i18next.use(...)`                       | Intlayer не використовує плагіни i18next, backends або детектори мови.                                                                            |
| JSON language bundles (`locales/*.json`) | JSON пакети потрібні тільки якщо ви все ще використовуєте плагін `syncJSON`. Після переходу на файли `.content.ts` ви можете видалити папку JSON. |

Коли ви готові йти далі, Intlayer **автоматично виявляє всі файли `.content.ts` і `.content.json` де-небудь у вашому codebase** (за замовчуванням, де-небудь всередину `./src`). Ви можете розмістити файл `my-component.content.ts` прямо поруч із вашою логікою, і Intlayer підберіть його під час збірки без додаткової конфігурації — без імпортів, реєстрацій або централізованого індексного файлу. Це робить co-locating перекладів абсолютно безпроблемним.

---

## Налаштування TypeScript

Intlayer використовує module augmentation для забезпечення повної TypeScript intellisense для ваших ключів перекладу. Переконайтеся, що ваш `tsconfig.json` включає автоматично згенеровані типи:

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включіть автоматично згенеровані типи
  ],
}
```

---

## Git Configuration

Додайте згенерований Intlayer каталог до вашого `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

---

## Йдіть далі

- **Visual Editor** — Керуйте перекладами візуально у вашому браузері: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- **CMS** — Екстерналізуйте та керуйте контентом віддалено: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- **VS Code Extension** — Отримайте автозаповнення та виявлення помилок перекладу в реальному часі: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- **CLI Reference** — Повний список команд CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
