---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Міграція з next-i18next на Intlayer | Інтернаціоналізація (i18n)"
description: "Дізнайтеся, як перенести вашу Next.js програму з next-i18next на Intlayer — крок за кроком, без порушення вашого існуючого коду. Використовуйте адаптер сумісності @intlayer/next-i18next для плавного переходу без перебоїв."
keywords:
  - next-i18next
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
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Перехід від next-i18next до Intlayer

## Чому мігрувати з next-i18next на Intlayer?

<AccordionGroup>

<Accordion header="Розмір bundle">

Замість завантаження великих JSON-файлів на ваші сторінки, завантажуйте лише необхідний контент. Intlayer допомагає **зменшити розмір вашого bundle та сторінок на до 50%**.

</Accordion>

<Accordion header="Зручність супроводження">

Масштабування контенту вашої програми **полегшує супроводження** для великомасштабних додатків. Ви можете дублювати або видаляти окриму папку функцій без розумового навантаження щодо перегляду всієї вашої codebase контенту. Крім того, Intlayer **повністю типізований**, щоб забезпечити точність вашого контенту.

Intlayer також є рішенням з **найбільш активною розробкою** в екосистемі i18n — проблеми виправляються швидко, нові адаптери фреймворків регулярно з'являються, а основний API постійно вдосконалюється на основі реального зворотного зв'язку виробництва.

</Accordion>

<Accordion header="AI Agent">

Розміщення контенту в одному місці **зменшує контекст, необхідний** для великих мовних моделей (LLMs). Intlayer також поставляється з набором інструментів, таких як **CLI** для тестування відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**, і **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити досвід розробника (DX) ще гладшим для AI агентів.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу у вашому CI/CD pipeline, використовуючи LLM на ваш вибір за вартість вашого AI-провайдера. Intlayer також пропонує **компілятор** для автоматизації екстракції контенту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) для допомоги в **перекладі у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення великих JSON-файлів до компонентів може призвести до проблем із продуктивністю та реактивністю. Intlayer оптимізує завантаження вашого контенту під час збирання.

</Accordion>

<Accordion header="Масштабування з non-dev">

Більше, ніж просто рішення i18n, Intlayer забезпечує **самостійно розміщений [редактор інтерфейсу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)** та **[повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)** для допомоги вам у керуванні вашим багатомовним контентом у **реальному часі**, що робить співпрацю з перекладачами, копірайтерами та іншими членами команди безперешкодною. Контент можна зберігати локально та/або віддалено.

</Accordion>

</AccordionGroup>

---

## Стратегії міграції

Оскільки `next-i18next` обертає `react-i18next` та `i18next`, існують дві взаємодоповнювальні стратегії для міграції на Intlayer:

1. **Адаптер сумісності (рекомендується для існуючих додатків)** — Встановіть `@intlayer/next-i18next`, `@intlayer/react-i18next` та `@intlayer/i18next`. Ці пакети експортують **точно такий же API**, як їхні аналоги, але делегують всю роботу перекладу Intlayer під капотом. Ви зберігаєте існуючі виклики `useTranslation`, `appWithTranslation`, `serverSideTranslations` та маршрутизацію Next.js Pages без змін — єдиною змінею є ініціалізація.

2. **Повна міграція** — Поступово замініть API `next-i18next` на нативні гаки Intlayer (`useIntlayer`) та розташуйте контент у файлах `.content.ts` поряд з вашими компонентами.

Цей посібник спочатку охоплює **Стратегію 1** (адаптер типу "plug-and-play"), а потім проводить вас через опціональну повну міграцію.

---

## Зміст

<TOC/>

---

## Швидка міграція

Наступні кроки - це мінімум, необхідний для запуску вашого існуючого додатка Next.js Pages Router на Intlayer без змін коду в ваших сторінках та компонентах.

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

> прапор `--interactive` опціональний. Використовуйте `intlayer-cli init`, якщо ви AI агент.

> Ця команда визначить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Ви можете безпечно зберігати `next-i18next`, `react-i18next` та `i18next` встановленими під час міграції, хоча ви видалите їх після встановлення псевдонімів.

</Step>

<Step number={2} title="Налаштування Intlayer">

Команда `intlayer init` створює стартовий файл `intlayer.config.ts`. Оновіть його відповідно до ваших існуючих локалей та вкажіть плагіну `syncJSON` на ваші файли повідомлень `next-i18next` (зазвичай всередині `public/locales`):

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** відображає локаль та простір назв (`key`) на шлях до його JSON файлу. **`location`** повідомляє спостерігачу Intlayer, яку папку моніторити на наявність змін. Опція `format: 'i18next'` забезпечує правильне розпарсення заповнювачів для `next-i18next`.

</Step>

<Step number={3} title="Оновлення конфігурації Next.js">

Обгорніть ваш існуючий `next.config.ts` (або `.js`) за допомогою `createNextI18nPlugin` з `@intlayer/next-i18next/plugin`. Цей обгортач складає `withIntlayer` **та** впроваджує псевдоніми `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`, тому ваші існуючі виклики `import { useTranslation } from 'next-i18next'` прозоро перенаправляються під час компіляції. Жодних змін вихідного кода не потрібно.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// Ви можете видалити конфігурацію i18n, імпортовану з next-i18next.config.js
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer керує маршрутизацією Next.js i18n під капотом,
  // тому вам більше не потрібно передавати об'єкт i18n сюди.
};

export default withIntlayer(nextConfig);
```

> **Вам більше не потрібен файл `next-i18next.config.js`.** Intlayer компілює всі словники під час **компіляції**, беручи на себе визначення локалі, маршрутизацію та завантаження словника без втручання.
>
> Надаєте перевагу простому `withIntlayer` з `next-intlayer/server`? Він компілює ваші словники, але **не** додає псевдоніми `next-i18next` / `react-i18next` / `i18next` — тоді вам потрібно буде вручну перейменувати імпорти на `@intlayer/*` (див. крок 4).

</Step>

</Steps>

Ось і все для швидкої міграції. Ваш додаток Next.js тепер працює на Intlayer, зберігаючи цілісність всіх викликів `useTranslation`, `serverSideTranslations` та `appWithTranslation`.

> **Типізовані ключі перекладу — автоматично.** Після того як Intlayer скомпілює ваші словники, `useTranslation` та `getFixedT` типізуються щодо вашого фактичного вмісту. Ключі автозавершуються у вашій IDE, а невалідні шляхи викликають помилки TypeScript під час компіляції — додаткове налаштування не потрібно.
>
> ```tsx
> // Pages Router — 'about' це зареєстрований ключ словника
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ автозавершення
> t("does.not.exist"); // ✗ помилка TypeScript
>
> // getStaticProps / getServerSideProps (екземпляр i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ типізовано
> ```

---

## Повна міграція

Наведені нижче кроки є необов'язковими та можуть виконуватися поступово. Вони розблоковують повний набір функцій Intlayer: візуальний редактор, CMS, типізовані файли вмісту, AI-потужний переклад та інше.

<Steps>

<Step number={4} title="Явне перейменування імпортів (необов'язково)" isOptional={true}>

Плагін Intlayer вже обробляє aliasing на рівні bundler. Якщо ви надаєте перевагу явному позначенню залежності у вихідних файлах, ви можете вручну перейменувати імпорти:

| Раніше                                                                         | Тепер                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

Це **повнофункціональні замінники** — не потрібні жодні зміни в сигнатурах функцій, аргументах або типах повернення.

</Step>

<Step number={5} title="Включення автоматизації перекладу на основі AI" isOptional={true}>

Після підключення Intlayer використовуйте його CLI для автоматичного заповнення відсутніх перекладів:

```bash packageManager="npm"
# Тест на відсутні переклади (додати в CI)
npx intlayer test

# Заповніть відсутні переклади за допомогою AI
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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
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

Після того як адаптер сумісності буде на місці, наступний boilerplate `next-i18next` можна видалити:

| Файл / pattern                              | Чому він більше не потрібен                                                                                                                     |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                    | Intlayer обробляє маршрутизацію, завантаження словників та стандартні мови внутрішньо на основі `intlayer.config.ts`.                           |
| `next-i18next` з `package.json`             | Повністю замінено на `@intlayer/next-i18next` та aliasing.                                                                                      |
| JSON мовні пакети (`public/locales/*.json`) | JSON пакети потрібні лише якщо ви все ще використовуєте plugin `syncJSON`. Після міграції на `.content.ts` файли ви можете видалити папку JSON. |

Коли ви будете готові йти далі, Intlayer **автоматично виявляє всі `.content.ts` та `.content.json` файли будь-де у вашій кодовій базі** (за замовчуванням, будь-де всередині `./src`). Ви можете розмістити файл `my-component.content.ts` прямо поруч з вашим `MyComponent.tsx` і Intlayer підхопить його під час збірки без будь-якої додаткової конфігурації — без імпортів, реєстрації чи централізованого файлу індексу. Це робить co-locating перекладів з сторінками та компонентами абсолютно беззбійним.

---

## Налаштування TypeScript

Intlayer використовує module augmentation для забезпечення повної TypeScript intellisense для ваших ключів перекладу. Переконайтесь, що ваш файл `tsconfig.json` включає автоматично згенеровані типи:

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично згенеровані типи
  ],
}
```

---

## Git Configuration

Додайте згенеровану Intlayer директорію до вашого `.gitignore`:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## Йдіть далі

- **Visual Editor** — Керуйте перекладами візуально у браузері: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- **CMS** — Екстерналізуйте та керуйте вмістом віддалено: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- **VS Code Extension** — Отримайте автодоповнення та виявлення помилок перекладу в реальному часі: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- **CLI Reference** — Повний список команд CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- **Intlayer with Next.js (Pages Router)** — Повний посібник налаштування для Next.js: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_page_router.md)
