---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Міграція з @nuxtjs/i18n на Intlayer | Міжнародність (i18n)"
description: "Дізнайтеся, як перенести вашу Nuxt-додаток з @nuxtjs/i18n на Intlayer — крок за кроком, без порушення вашого існуючого коду. Використовуйте адаптер сумісності @intlayer/vue-i18n для безперервного переходу."
keywords:
  - "@nuxtjs/i18n"
  - vue-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Міграція з @nuxtjs/i18n на Intlayer

## Чому мігрувати з @nuxtjs/i18n на Intlayer?

<AccordionGroup>

<Accordion header="Розмір bundle">

Замість завантаження масивних JSON файлів на ваші сторінки завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір вашого bundle та сторінок на 50%**.

</Accordion>

<Accordion header="Зручність обслуговування">

Розділення вмісту вашого додатка **полегшує обслуговування** для масштабних додатків. Ви можете дублювати або видаляти папку однієї функції без необхідності аналізувати всю вашу базу кодування вмісту. Крім того, Intlayer **повністю типізований**, щоб забезпечити точність вашого вмісту.

Intlayer також є рішенням з **найактивнішим розробленням** в екосистемі i18n — проблеми вирішуються швидко, нові адаптери фреймворків регулярно додаються, а основний API постійно вдосконалюється на основі реальних відгомілів з виробництва.

</Accordion>

<Accordion header="AI Agent">

Розташування вмісту поблизу **зменшує контекст, необхідний** для великих мовних моделей (LLMs). Intlayer також поставляється з набором інструментів, таких як **CLI** для перевірки відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)** та **[навички агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити досвід розробника (DX) ще гладшим для AI агентів.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу в вашому CI/CD конвеєрі, використовуючи LLM на ваш вибір за вартістю вашого постачальника AI. Intlayer також пропонує **компілятор** для автоматизації вилучення вмісту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) для допомоги **перекладу на фоні**.

</Accordion>

<Accordion header="Продуктивність">

Підключення масивних JSON файлів до компонентів може привести до проблем з продуктивністю та реактивністю. Intlayer оптимізує завантаження вашого вмісту під час збірки.

</Accordion>

<Accordion header="Масштабування з не-розробниками">

Більш ніж просто рішення для i18n, Intlayer надає **самостійно розміщений [редактор з візуалізацією](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)** та **[повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)** для допомоги у керуванні вашим багатомовним вмістом **у реальному часі**, що робить співпрацю з перекладачами, копірайтерами та іншими членами команди безперешкодною. Вміст можна зберігати локально та/або віддалено.

</Accordion>

</AccordionGroup>

---

## Стратегії міграції

Оскільки `@nuxtjs/i18n` використовує `vue-i18n` під капотом, існує дві взаємодоповнюючі стратегії для міграції на Intlayer:

1. **Compat adapter (рекомендується для існуючих додатків)** — Встановіть `@intlayer/vue-i18n` та `nuxt-intlayer`. Це надає **той самий API**, що й `vue-i18n`, але делегує всю роботу перекладу на Intlayer під капотом. Ви зберігаєте свої існуючі `$t`, `useI18n()` та маршрутизацію Nuxt без змін — єдина зміна — це ініціалізація.

2. **Повна міграція** — Поступово замініть API `@nuxtjs/i18n` на нативні хуки Intlayer (`useIntlayer`) та розмістіть вміст у файлах `.content.ts` поряд із ваших компонентами.

Цей посібник охоплює **Стратегію 1** спочатку (drop-in compat adapter), а потім розглядає необов'язкову повну міграцію.

---

## Зміст

<TOC/>

---

## Швидка міграція

Наступні кроки — це мінімум, необхідний для запуску вашого існуючого додатка Nuxt на Intlayer без змін коду в компонентах.

<Steps>

<Step number={1} title="Встановлення залежностей">

Встановіть основні пакети Intlayer та адаптер сумісності:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> прапор `--interactive` необов'язковий. Використовуйте `intlayer-cli init`, якщо ви — агент AI.

> Ця команда визначить ваше середовище та встановить необхідні пакети. Приклад:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Ви можете безпечно залишити встановленим `@nuxtjs/i18n` під час міграції, але ви видалите його з конфігурації Nuxt незабаром.

</Step>

<Step number={2} title="Налаштування Intlayer">

Команда `intlayer init` створює стартовий файл `intlayer.config.ts`. Оновіть його, щоб він відповідав вашим існуючим локалям, і вкажіть плагіну `syncJSON` на ваші файли повідомлень:

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
      // відповідає синтаксису заповнювачів vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`** відображає локаль на шлях її JSON-файлу. **`location`** повідомляє спостерігачу Intlayer, яку папку моніторити на предмет змін. Опція `format: 'icu'` гарантує, що заповнювачі правильно розпарсюються для `vue-i18n`.

</Step>

<Step number={3} title="Оновлення конфігурації Nuxt">

Замініть модуль `@nuxtjs/i18n` на `nuxt-intlayer` у вашому `nuxt.config.ts`. Плагін Intlayer автоматично вводить псевдоніми модулів, тому ваші існуючі виклики `import { useI18n } from 'vue-i18n'` прозоро перенаправляються на `@intlayer/vue-i18n`.

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // Видаліть '@nuxtjs/i18n'
  modules: ["nuxt-intlayer"],
});
```

> **Вам більше не потрібно визначати об'єкти конфігурації Nuxt i18n.** Intlayer компілює всі словники під час **build time**, безпроблемно обробляючи виявлення локалей, маршрутизацію та завантаження словників.

</Step>

</Steps>

На цьому швидка міграція завершена. Ваш додаток Nuxt тепер працює на Intlayer, зберігаючи всі `$t` та `useI18n()` без змін.

---

## Повна міграція

Наведені нижче кроки є необов'язковими та можуть виконуватися поступово. Вони розблоковують повний набір функцій Intlayer: візуальний редактор, CMS, типізовані файли вмісту, переклад на базі штучного інтелекту та інше.

<Steps>

<Step number={4} title="Явне перейменування імпортів (необов'язково)" isOptional={true}>

Плагіни Intlayer вже обробляють aliasing на рівні bundler. Якщо ви бажаєте зробити залежність явною у ваших вихідних файлах, ви можете перейменувати імпорти вручну:

| Раніше                               | Після                                          |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

Це **drop-in replacements** — не потрібні жодні зміни до сигнатур викликів, аргументів або типів повернення.

</Step>

<Step number={5} title="Включення автоматизації перекладу на базі штучного інтелекту" isOptional={true}>

Після того, як Intlayer налаштовано, використовуйте його CLI для автоматичного заповнення відсутніх перекладів:

```bash packageManager="npm"
# Тест на відсутні перекладу (додати до CI)
npx intlayer test

# Заповнити відсутні перекладу за допомогою AI
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
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
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

> Див. [документацію CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) для всіх доступних опцій.

</Step>

</Steps>

---

## Що можна видалити після міграції

Після встановлення compat adapter можна видалити наступний boilerplate:

| File / pattern                            | Чому це більше не потрібно                                                                                                                   |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18n` configurations in `nuxt.config.ts` | Intlayer обробляє маршрутизацію, завантаження словників і стандартні locales внутрішньо.                                                     |
| `@nuxtjs/i18n` from `package.json`        | Повністю замінено на `nuxt-intlayer`.                                                                                                        |
| JSON language bundles (`locales/*.json`)  | JSON bundles потрібні лише якщо ви все ще використовуєте плагін `syncJSON`. Після міграції на файли `.content.ts` можна видалити папку JSON. |

Коли ви будете готові йти далі, Intlayer **автоматично виявляє всі файли `.content.ts` і `.content.json` будь-де в вашому codebase** (за замовчуванням, будь-де всередині `./src`). Ви можете розмістити файл `my-component.content.ts` прямо поруч з вашим `MyComponent.vue`, і Intlayer виявить його під час збірки без будь-якої додаткової конфігурації — не потрібні імпорти, реєстрація чи централізований файл індексу. Це робить co-locating перекладів зі сторінками та компонентами абсолютно безпроблемним.

---

## Налаштування TypeScript

Intlayer використовує module augmentation для надання повної TypeScript intellisense для ваших ключів перекладу. Переконайтеся, що ваш `tsconfig.json` включає автоматично згенеровані типи:

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

## Конфігурація Git

Додайте згенерований Intlayer директорій до вашого `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, генеровані Intlayer
.intlayer
```

---

## Йдіть далі

- **Visual Editor** — Керуйте перекладами візуально у вашому браузері: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- **CMS** — Зберігайте та керуйте контентом віддалено: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- **VS Code Extension** — Отримайте автодоповнення та виявлення помилок перекладу в реальному часі: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- **CLI Reference** — Повний список команд CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- **Intlayer with Nuxt** — Повний посібник налаштування для Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nuxt.md)
- **Intlayer with Vue** — Повний посібник налаштування для Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+vue.md)
