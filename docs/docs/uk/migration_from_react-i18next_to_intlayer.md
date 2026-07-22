---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Міграція з react-i18next / i18next на Intlayer | Internationalization (i18n)"
description: "Дізнайтеся, як перенести вашу React або Next.js додаток з react-i18next або i18next на Intlayer — покроково, без порушення вашого існуючого коду. Використовуйте адаптери сумісності @intlayer/react-i18next та @intlayer/i18next для безперебійного переходу."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Міграція з react-i18next / i18next на Intlayer

## Чому варто перейти з react-i18next / i18next на Intlayer?

<AccordionGroup>

<Accordion header="Розмір bundle">

Замість завантаження великих JSON файлів на ваші сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір bundle та сторінок на 50%**.

</Accordion>

<Accordion header="Легкість обслуговування">

Розміщення вмісту вашої програми в одному місці **полегшує обслуговування** крупномасштабних додатків. Ви можете дублювати або видаляти окремий папку функції без потреби перегляду всієї бази коду вмісту. Крім того, Intlayer **повністю типізований**, щоб забезпечити точність вашого вмісту.

Intlayer також є рішенням з **найактивнішим розвитком** в екосистемі i18n — проблеми виправляються швидко, нові адаптери фреймворків з'являються регулярно, а основний API постійно удосконалюється на основі реального зворотного зв'язку з production.

</Accordion>

<Accordion header="AI Agent">

Розташування вмісту в одному місці **зменшує контекст, необхідний** для великих мовних моделей (LLMs). Intlayer також містить набір інструментів, таких як **CLI** для тестування відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)** та **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити розробницький досвід (DX) ще гладшим для AI agents.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу у вашому CI/CD pipeline, використовуючи LLM на ваш вибір за вартість вашого AI провайдера. Intlayer також пропонує **компілятор** для автоматизації видобутку вмісту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) для допомоги **перекладу у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення великих JSON файлів до компонентів може привести до проблем продуктивності та реактивності. Intlayer оптимізує завантаження вашого вмісту під час збирання.

</Accordion>

<Accordion header="Масштабування з не-розробниками">

Більше ніж просто рішення i18n, Intlayer пропонує **самостійно розміщений [редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)** та **[повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)** для допомоги вам керувати вашим багатомовним вмістом у **реальному часі**, що робить співпрацю з перекладачами, копірайтерами та іншими членами команди безперебійною. Вміст можна зберігати локально та/або віддалено.

</Accordion>

</AccordionGroup>

---

## Стратегії міграції

Існують дві взаємодоповнюючі стратегії для переходу з `react-i18next` / `i18next` на Intlayer:

1. **Compat adapter (рекомендується для існуючих додатків)** — Встановіть `@intlayer/react-i18next` (для React компонентів) та/або `@intlayer/i18next` (для основного екземпляра `i18n`). Ці пакети надають **той самий API**, що й `react-i18next` / `i18next`, але делегують всю роботу перекладу Intlayer під капотом. Ви зберігаєте існуючі виклики `useTranslation`, `Trans`, `withTranslation`, `i18next.t()` — єдиною змією є шлях імпорту.

2. **Повна міграція** — Поступово замінюйте `react-i18next` API на нативні хуки Intlayer (`useIntlayer`, `IntlayerProvider`) і розміщуйте вміст у файлах `.content.ts` поряд із ваші компонентами.

Цей посібник спочатку охоплює **Стратегію 1** (drop-in compat adapter), а потім розглядає необов'язкову повну міграцію.

---

## Зміст

<TOC/>

---

## Швидка міграція

Наступні кроки — мінімум необхідний для запуску вашої існуючої програми `react-i18next` на Intlayer без змін коду.

<Steps>

<Step number={1} title="Встановлення залежностей">

Встановіть основні пакети Intlayer та адаптери сумісності:

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

> флаг `--interactive` необов'язковий. Використовуйте `intlayer-cli init`, якщо ви AI-агент.

> Ця команда визначить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Ви можете залишити встановленими `react-i18next` та `i18next` — адаптери сумісності використовують їх як `devDependencies` / необов'язкові `peerDependencies` для типів TypeScript. Вам не потрібно змінювати жодних однорівневих залежностей `package.json`.

</Step>

<Step number={2} title="Налаштування Intlayer">

Команда `intlayer init` створює стартовий файл `intlayer.config.ts`. Оновіть його відповідно до ваших існуючих локалей та вкажіть плагін `syncJSON` на ваші файли повідомлень:

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
      // відповідає синтаксису заповнювачів react-i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** відображає локаль на шлях її JSON-файлу. **`location`** повідомляє спостерігачу Intlayer, яку папку моніторити на предмет змін. Параметр `format: 'i18next'` гарантує, що заповнювачі на кшталт `{{name}}` аналізуються правильно.

</Step>

<Step number={3} title="Додавання плагіна Intlayer до вашого Bundler">

Обгорніть вашу існуючу конфігурацію bundler за допомогою плагіна сумісності. Він компонує основний плагін Intlayer, налаштовує моніторинг вмісту та — що критично — **інжектує псевдоніми модулів** так, щоб ваші існуючі виклики `import … from 'react-i18next'` (та `'i18next'`) були прозоро перенаправлені на `@intlayer/react-i18next` / `@intlayer/i18next` під час побудови. Жодних змін вихідних файлів не потрібно.

**Для Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` обгортає плагін `intlayer()` від `vite-intlayer` та додає псевдоніми `react-i18next` / `i18next`. Використання звичайного плагіна `intlayer()` від `vite-intlayer` компілює словники, але **не** додає ці псевдоніми — тоді вам потрібно було б вручну перейменувати імпорти на `@intlayer/*` (див. крок 4).

**Для Next.js:**

Якщо ви використовуєте `next-i18next` (інтеграція Pages Router), встановіть `@intlayer/next-i18next` та `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Потім додайте плагін сумісності до вашого `next.config.ts` (він інжектує псевдоніми `next-i18next` / `react-i18next` / `i18next`):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {/* ваші параметри */};

export default withIntlayer(nextConfig);
```

> **Вам більше не потрібен `i18next.init()` або ручне завантаження провайдера.** Intlayer компілює всі словники під час **побудови**, тому немає кроку завантаження під час виконання. Провайдер з псевдонімом обробляє ініціалізацію за вас.

</Step>

</Steps>

Це все для швидкої міграції. Ваша програма тепер працює на Intlayer, зберігаючи кожний імпорт та API `react-i18next`.

> **Типізовані ключі перекладу — автоматично.** Як тільки Intlayer компілює ваші словники, `useTranslation` та `getFixedT` типізуються відповідно до вашого фактичного вмісту. Ключі автодоповнюються у вашому IDE, а неправильні шляхи викликають помилки TypeScript під час побудови — жодного додаткового налаштування не потрібно.
>
> ```tsx
> // 'about' — зареєстрований ключ словника → t() приймає лише правильні крапкові шляхи
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ автодоповнення
> t("does.not.exist"); // ✗ помилка TypeScript
>
> // На стороні сервера (екземпляр i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ типізовано
> ```

---

## Повна міграція

Наведені нижче кроки є необов'язковими і можуть виконуватися поступово. Вони розблоковують повний набір функцій Intlayer: візуальний редактор, CMS, типізовані файли вмісту, переклад з використанням AI та інше.

<Steps>

<Step number={4} title="Явне перейменування імпорту (необов'язково)" isOptional={true}>

Плагіни Intlayer вже обробляють aliasing на рівні bundler. Якщо ви віддаєте перевагу явній вказівці залежності у своїх файлах, ви можете перейменувати імпорти вручну:

| Раніше                                             | Після                                                        |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Для Next.js (`next-i18next`):

| Раніше                                                                         | Після                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

</Step>

<Step number={5} title="Увімкнення автоматизованого перекладу з AI" isOptional={true}>

Коли Intlayer буде підключено, використовуйте його CLI для автоматичного заповнення відсутніх перекладів:

```bash packageManager="npm"
# Тест на відсутні переклади (додайте в CI)
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

Після того як адаптери сумісності будуть на місці, наступний boilerplate `react-i18next` / `i18next` можна видалити:

| Файл / шаблон                            | Чому більше це не потрібно                                                                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` calls                   | Інтлейєр автоматично ініціалізує все; немає етапу завантаження під час виконання.                                                               |
| `I18nextProvider` / `initReactI18next`   | Плагін Intlayer обробляє впровадження та завантаження під капотом.                                                                              |
| JSON language bundles (`locales/*.json`) | JSON пакети потрібні лише якщо ви все ще використовуєте плагін `syncJSON`. Після міграції на файли `.content.ts` ви можете видалити папку JSON. |

Коли ви будете готові йти далі, Intlayer **автоматично виявляє всі файли `.content.ts` і `.content.json` будь-де у вашій кодовій базі** (за замовчуванням, будь-де всередині `./src`). Ви можете розмістити файл `my-component.content.ts` прямо поряд з вашим `MyComponent.tsx`, і Intlayer перехопить його під час збирання без будь-якої додаткової конфігурації — без імпортів, реєстрації чи централізованого файлу індексу. Це робить розташування перекладів поряд зі сторінками та компонентами абсолютно безпроблемним.

---

## Налаштування TypeScript

Intlayer використовує модульне розширення для забезпечення повної TypeScript intellisense для ваших ключів перекладу. Переконайтесь, що ваш `tsconfig.json` включає автоматично генеровані типи:

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично генеровані типи
  ],
}
```

---

## Конфігурація Git

Додайте сформовану директорію Intlayer до вашого `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, генеровані Intlayer
.intlayer
```

---

## Йди далі

- **Visual Editor** — Керуйте перекладами візуально у вашому браузері: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- **CMS** — Екстерналізуйте та керуйте контентом віддалено: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- **VS Code Extension** — Отримуйте автозаповнення та виявлення помилок перекладу в реальному часі: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- **CLI Reference** — Повний список команд CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- **Intlayer with React** — Повний посібник налаштування для React: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md)
- **Intlayer with Next.js** — Повний посібник налаштування для Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)
