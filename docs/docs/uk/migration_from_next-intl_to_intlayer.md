---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Міграція з next-intl на Intlayer | Інтернаціоналізація (i18n)"
description: "Дізнайтеся, як перенести вашу Next.js програму з next-intl на Intlayer — крок за кроком, без порушення вашого існуючого коду. Використовуйте адаптер сумісності @intlayer/next-intl для беззбійного переходу."
keywords:
  - next-intl
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Перехід з next-intl на Intlayer

## Чому мігрувати з next-intl на Intlayer?

<AccordionGroup>

<Accordion header="Розмір bundle">

Замість завантаження масивних JSON файлів на ваші сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розміри bundle та сторінок на 50%**.

</Accordion>

<Accordion header="Зручність обслуговування">

Структурування вмісту вашого додатку **спрощує обслуговування** для великомасштабних додатків. Ви можете дублювати або видаляти окрему папку функцій без необхідності перегляду всієї вашої codebase вмісту. Крім того, Intlayer **повністю типізований** для забезпечення точності вашого вмісту.

Intlayer також є рішенням з **найбільш активною розробкою** в екосистемі i18n — проблеми вирішуються швидко, нові адаптери фреймворків регулярно з'являються, а базовий API постійно удосконалюється на основі реального feedback з production.

</Accordion>

<Accordion header="AI Agent">

Розташування вмісту в одному місці **зменшує контекст, необхідний** для великих мовних моделей (LLMs). Intlayer також поставляється з набором інструментів, таких як **CLI** для перевірки відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)** та **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити developer experience (DX) ще більш гладким для AI агентів.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу в вашому CI/CD pipeline з допомогою LLM на ваш вибір за вартість вашого AI провайдера. Intlayer також пропонує **compiler** для автоматизації видобування вмісту, а також [web платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) для **перекладу у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення масивних JSON файлів до компонентів може призвести до проблем з продуктивністю та реактивністю. Intlayer оптимізує завантаження вашого вмісту на етапі збірки.

</Accordion>

<Accordion header="Масштабування без розробників">

Більше ніж просто i18n рішення, Intlayer надає **самостійно розміщений [редактор видимості](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)** та **[повну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)** для допомоги в управлінні вашим багатомовним вмістом в **реальному часі**, що робить співпрацю з перекладачами, копірайтерами та іншими членами команди безпроблемною. Вміст може зберігатися локально та/або віддалено.

</Accordion>

</AccordionGroup>

---

## Стратегія міграції

Рекомендований підхід для існуючих додатків — це **compat adapter**: встановіть `@intlayer/next-intl`, який надає **той же API**, що й `next-intl`, але делегує всю роботу перекладу Intlayer під капотом.

Ви зберігаєте свої існуючі `useTranslations`, `getTranslations`, `NextIntlClientProvider` та подібне — **єдина зміна — це шлях імпорту**. Переструктуризація сигнатур викликів, форм реквізитів або структури компонентів не потрібна.

З часом ви можете опціонально мігрувати окремі файли до багатішого формату `.content.ts` Intlayer, щоб розблокувати візуальний редактор, CMS та область видимості вмісту на рівні компонентів — але цей крок повністю опціональний і може бути виконаний поступово.

---

## Зміст

<TOC/>

---

## Швидка міграція

Наступні кроки — це мінімум, необхідний для запуску вашого існуючого `next-intl` додатку на Intlayer без змін коду.

<Steps>

<Step number={1} title="Встановлення залежностей">

Встановіть основні пакети Intlayer та адаптер сумісності `@intlayer/next-intl`:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> прапор `--interactive` є необов'язковим. Використовуйте `intlayer-cli init`, якщо ви AI агент.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

> Тримайте `next-intl` встановленим — він все ще необхідний для **маршрутизації URL** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). Адаптер сумісності **не** замінює шар маршрутизації.

</Step>

<Step number={2} title="Налаштування Intlayer">

Команда `intlayer init` створює стартовий файл `intlayer.config.ts`. Оновіть його, щоб він відповідав вашим існуючим локалям і вкажіть плагін `syncJSON` на ваші файли повідомлень:

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
      // 'icu' відповідає синтаксису ICU заповнювачів next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** відображує локаль на шлях її JSON файлу. **`location`** повідомляє спостерігачу Intlayer, яку папку моніторити на предмет змін. Опція `format: 'icu'` гарантує, що ICU заповнювачі на кшталт `{name}` та `{count, plural, one {# item} other {# items}}` розпарсюються правильно.

> Для повного переліку параметрів конфігурації дивіться [документацію конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>

<Step number={3} title="Додайте плагін Intlayer до Next.js">

Обгорніть вашу існуючу конфігурацію Next.js за допомогою `createNextIntlPlugin` із `@intlayer/next-intl/plugin`. Цей wrapper складає `withIntlayer` **та** реєструє псевдоніми `next-intl` → `@intlayer/next-intl` для вас:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {/* ваші існуючі параметри конфігурації */};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` обгортає `withIntlayer`, автоматично виявляє **Webpack** або **Turbopack**, налаштовує спостереження вмісту, компіляцію словників та — критично — **впровадження псевдонімів модулів**, щоб ваші існуючі виклики `import … from 'next-intl'` прозоро перенаправлялися на `@intlayer/next-intl` під час побудови. Записи маршрутизації `next-intl/routing` залишаються спрямованими на реальний пакет. Жодні зміни вихідних файлів не потрібні.
>
> Надаєте перевагу простому `withIntlayer` із `next-intlayer/server`? Він скомпілює ваші словники, але **не** додає псевдоніми `next-intl` — вам потім довелося б вручну перейменувати імпорти на `@intlayer/next-intl` (див. Крок 4).

> **Вам більше не потрібні `getRequestConfig` або `loadMessages`.** З `next-intl` вам довелося писати файл `src/i18n.ts`, який завантажував JSON пакети повідомлень при кожному запиті через `getRequestConfig`. Intlayer компілює всі словники в **час побудови**, тому немає кроку завантаження під час виконання. Ви можете повністю видалити цей файл (або зберегти тільки частини маршрутизації, якщо ви все ще використовуєте `createNavigation`).

</Step>

</Steps>

Це все для швидкої міграції. Ваш додаток тепер працює на Intlayer, зберігаючи кожний `next-intl` імпорт та API незмінним.

> **Типізовані ключі перекладу — автоматично.** Після того як Intlayer скомпілює ваші словники, `useTranslations` та `getTranslations` типізуються проти вашого фактичного вмісту. Ключі автоматично доповнюються у вашій IDE, а невірні шляхи спричиняють помилки TypeScript під час побудови — додатково налаштування не потрібно.
>
> ```tsx
> // Компонент клієнта — 'about' — це зареєстрований ключ словника
> const t = useTranslations("about");
> t("counter.label"); // ✓ автоматичне доповнення
> t("does.not.exist"); // ✗ Помилка TypeScript
>
> // Серверний компонент
> const t = await getTranslations("about");
> t("counter.label"); // ✓ типізовано
> ```

---

## Повна міграція

Кроки, наведені нижче, є необов'язковими і можуть виконуватися поступово. Вони розблоковують повний набір функцій Intlayer: візуальний редактор, CMS, типізовані файли вмісту, автоматизований переклад на основі AI та інше.

<Steps>

<Step number={4} title="Явне перейменування імпортів (опціонально)" isOptional={true}>

Обгортка `createNextIntlPlugin()` вже обробляє створення псевдоніма `next-intl` → `@intlayer/next-intl` на рівні bundler. Якщо ви віддаєте перевагу зробити залежність явною у вихідних файлах (і використовувати звичайний плагін `withIntlayer` замість цього), ви можете перейменувати імпорти вручну:

| До                                                   | Після                                                          |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Завжди залишайте імпорти маршрутизації з реального `next-intl` — адаптер сумісності **не** замінює шар маршрутизації URL:
>
> ```ts
> // ✅ Завжди залишайте ці імпорти з реального 'next-intl'
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> Як альтернатива, ви можете використовувати `defineRouting` з `@intlayer/next-intl/routing`, який автоматично об'єднує конфігурацію локалі з вашого `intlayer.config.ts`.

</Step>

<Step number={5} title="Увімкнути автоматизацію перекладу на основі AI" isOptional={true}>

Після настройки Intlayer ви можете використовувати його CLI для автоматичного заповнення відсутніх перекладів за допомогою LLM на ваш вибір:

```bash packageManager="npm"
# Перевірити відсутні переклади (додати до CI)
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

Додайте `OPENAI_API_KEY` (або ключ вашого переважного провайдера) до вашого файлу `.env`, потім розширьте ваш `intlayer.config.ts`:

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
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

Після встановлення `@intlayer/next-intl` можна видалити наступний boilerplate код `next-intl`:

| Файл / шаблон                                      | Чому він більше не потрібен                                                                                                                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/i18n.ts` → експорт `getRequestConfig`         | Intlayer компілює словники під час побудови; немає завантаження повідомлень на основі запиту. Тримайте файл лише якщо він також експортує помічники маршрутизації `createNavigation`. |
| Виклик `loadMessages()` / `getMessages()` в layout | `NextIntlClientProvider` з `@intlayer/next-intl` читає з скомпільованого виходу; властивість `messages` не потрібна.                                                                  |
| Імпорти `locales/{locale}/*.json` в layout         | JSON bundles потрібні тільки якщо ви все ще використовуєте плагін `syncJSON`. Після міграції на файли `.content.ts` ви можете видалити папку JSON.                                    |

Коли ви будете готові піти далі, Intlayer **автоматично виявляє всі файли `.content.ts` та `.content.json` будь-де в вашій кодовій базі** (за замовчуванням, будь-де всередину `./src`). Ви можете розмістити файл `about.content.ts` прямо поруч з вашим `about/page.tsx` і Intlayer підберуть його під час побудови без додаткової конфігурації — ніяких імпортів, реєстрації, жодного централізованого файлу індексу не потрібно. Це робить co-locating перекладів зі сторінками та компонентами абсолютно без тертя.

---

## Налаштування TypeScript

Intlayer використовує module augmentation для забезпечення повної intellisense TypeScript для ваших ключів перекладу. Переконайтесь, що ваш `tsconfig.json` включає автоматично створені типи:

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично створені типи
  ],
}
```

---

## Git Configuration

Додайте згенерований Intlayer каталог до вашого `.gitignore`:

```plaintext fileName=".gitignore"
# Ігноруйте файли, створені Intlayer
.intlayer
```

---

## Йти далі

- **Visual Editor** — Керуйте перекладами візуально у браузері: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- **CMS** — Екстерналізуйте та керуйте контентом дистанційно: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- **VS Code Extension** — Отримуйте автодоповнення та виявлення помилок перекладу в реальному часі: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- **CLI Reference** — Повний список CLI команд: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- **Intlayer with Next.js** — Повний посібник з налаштування для Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)
