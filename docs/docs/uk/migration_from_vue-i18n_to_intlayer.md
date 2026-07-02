---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Міграція з vue-i18n на Intlayer | Internationalisation (i18n)"
description: "Дізнайтеся, як перенести вашу Vue або Nuxt програму з vue-i18n на Intlayer — крок за кроком, без порушення вашого існуючого коду. Використовуйте адаптер сумісності @intlayer/vue-i18n для безперебійного переходу."
keywords:
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
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Перехід з vue-i18n на Intlayer

## Чому перейти з vue-i18n на Intlayer?

<AccordionGroup>

<Accordion header="Розмір bundle">

Замість завантаження масивних JSON файлів на ваші сторінки, завантажуйте лише необхідний контент. Intlayer допомагає **зменшити розмір вашого bundle та сторінок на 50%**.

</Accordion>

<Accordion header="Зручність обслуговування">

Організація контенту вашої програми **полегшує обслуговування** великомасштабних додатків. Ви можете дублювати або видаляти окриму папку функцій без необхідності перегляду всього codebase контенту. Крім того, Intlayer **повністю типізований**, щоб забезпечити точність вашого контенту.

Intlayer також є рішенням з **найбільш активним розробленням** в екосистемі i18n — проблеми вирішуються швидко, нові адаптери фреймворків надходять регулярно, а основний API постійно вдосконалюється на основі реального виробничого зворотного зв'язку.

</Accordion>

<Accordion header="AI Agent">

Розташування контенту в одному місці **зменшує контекст, необхідний** для великих мовних моделей (LLMs). Intlayer також поставляється з набором інструментів, таких як **CLI** для тестування відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)** та **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити досвід розробника (DX) ще гладшим для AI агентів.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу у вашому CI/CD pipeline, використовуючи LLM на ваш вибір за вартість вашого AI-провайдера. Intlayer також пропонує **компілятор** для автоматизації видобування контенту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) для допомоги в **перекладі у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення масивних JSON файлів до компонентів може призвести до проблем продуктивності та реактивності. Intlayer оптимізує завантаження вашого контенту під час збирання.

</Accordion>

<Accordion header="Масштабування з неробами">

Більше ніж просто рішення i18n, Intlayer надає **самостійно розміщений [редактор з візуальним інтерфейсом](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)** та **[повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)** для допомоги в керуванні вашим багатомовним контентом у **режимі реального часу**, що робить співпрацю з перекладачами, копірайтерами та іншими членами команди безперешкодною. Контент можна зберігати локально та/або віддалено.

</Accordion>

</AccordionGroup>

---

## Стратегії міграції

Існує дві взаємодоповнюючі стратегії для міграції з `vue-i18n` на Intlayer:

1. **Compat adapter (рекомендується для існуючих додатків)** — Встановіть `@intlayer/vue-i18n` (для Vue-компонентів). Цей пакет надає **абсолютно той самий API**, що й `vue-i18n`, але делегує всю роботу з перекладами Intlayer під капотом. Ви зберігаєте свої існуючі виклики `$t`, `useI18n()` та `<i18n-t>` — єдина зміна — це шлях імпорту та ініціалізація.

2. **Повна міграція** — Поступово замініть API `vue-i18n` на нативні hook'и Intlayer (`useIntlayer`) та розташуйте контент у файлах `.content.ts` поруч з вашими компонентами.

Цей посібник спочатку охоплює **Strategy 1** (drop-in compat adapter), а потім проходить через опціональну повну міграцію.

---

## Table of Contents

<TOC/>

---

## Швидка міграція

Наступні кроки є мінімально необхідними для запуску вашого існуючого `vue-i18n` застосунку на Intlayer без змін коду в ваших компонентах.

<Steps>

<Step number={1} title="Встановлення залежностей">

Встановіть основні пакети Intlayer та адаптер сумісності:

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

> прапор `--interactive` є опціональним. Використовуйте `intlayer-cli init`, якщо ви AI агент.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Ви можете залишити встановленим `vue-i18n` — адаптер сумісності використовує його як `devDependency` / `peerDependency` для типів TypeScript.

</Step>

<Step number={2} title="Налаштування Intlayer">

Команда `intlayer init` створює стартовий `intlayer.config.ts`. Оновіть його відповідно до ваших існуючих локалей та вкажіть плагіну `syncJSON` на ваші файли повідомлень:

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
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** відображає локаль на шлях до її JSON файла. **`location`** повідомляє спостерігачу Intlayer, яку папку слід контролювати на предмет змін. Опція `format: 'icu'` гарантує, що заповнювачі правильно розпарсюються для `vue-i18n`.

</Step>

<Step number={3} title="Додайте плагін Intlayer до вашого бундлера">

Обгорніть вашу існуючу конфігурацію бундлера плагіном сумісності. Він складає основний плагін Intlayer, налаштовує спостереження вмісту та — критично — **впроваджує псевдонім модуля**, щоб ваші існуючі виклики `import … from 'vue-i18n'` були прозоро перенаправлені на `@intlayer/vue-i18n` під час збирання. Жодні змін файлів вихідного коду не потрібні.

**Для Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()` обгортає плагін `intlayer()` з `vite-intlayer` та додає псевдонім `vue-i18n`. Використання звичайного плагіна `intlayer()` з `vite-intlayer` компілює словники, але **не** додає псевдонім — тоді вам доведеться вручну перейменувати імпорти на `@intlayer/vue-i18n` (див. Крок 4).

**Для Nuxt:**

Якщо ви використовуєте `@nuxtjs/i18n` (інтеграція Nuxt), встановіть `nuxt-intlayer` та додайте його до вашого `nuxt.config.ts`:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // Ви можете безпечно видалити @nuxtjs/i18n з ваших модулів
});
```

> **Вам більше не потрібні `createI18n()` або ручне завантаження провайдера.** Intlayer компілює всі словники під час **збирання**, тому немає етапу завантаження під час виконання. Псевдонімований провайдер обробляє ініціалізацію для вас.

</Step>

</Steps>

На цьому швидка міграція завершена. Ваш застосунок тепер працює на Intlayer, при цьому зберігаючи кожен імпорт та API `vue-i18n`.

> **Типізовані ключі перекладу — автоматично.** Після того як Intlayer скомпілює ваші словники, `useI18n` типізується відповідно до вашого фактичного вмісту, коли ви передаєте опцію `namespace`. Ключі автодоповнюються у вашому IDE, а невалідні шляхи спричиняють помилки TypeScript під час збирання — додатково налаштування не потрібно.
>
> ```ts
> // 'about' — зареєстрований ключ словника
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ автодоповнено
> t("does.not.exist"); // ✗ помилка TypeScript
> ```

---

## Повна міграція

Наведені нижче кроки є необов'язковими і можуть бути виконані поступово. Вони розблоковують повний набір функцій Intlayer: візуальний редактор, CMS, типізовані файли контенту, автоматизований переклад на основі AI та інше.

<Steps>

<Step number={4} title="Явне перейменування імпортів (optional)" isOptional={true}>

Плагіни Intlayer вже обробляють aliasing на рівні bundler. Якщо ви хочете зробити залежність явною у ваших файлах вихідного коду, ви можете вручну перейменувати імпорти:

| Before                                  | After                                             |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

Це **drop-in замінники** — змін у сигнатурах функцій, аргументах або типах повернення не потрібно.

</Step>

<Step number={5} title="Увімкніть автоматизацію перекладу на основі AI" isOptional={true}>

Після того як Intlayer налаштовано, використовуйте його CLI для автоматичного заповнення відсутніх перекладів:

```bash packageManager="npm"
# Перевірка на відсутні переклади (додати до CI)
npx intlayer test

# Заповнення відсутніх перекладів за допомогою AI
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

> Перегляньте [документацію Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) для всіх доступних опцій.

</Step>

</Steps>

---

## Що можна видалити після міграції

Як тільки адаптери сумісності запущені, наступний boilerplate `vue-i18n` можна видалити:

| Файл / шаблон                             | Чому він більше не потрібен                                                                                                                               |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createI18n()` calls                      | Постачальник Intlayer ініціалізує все автоматично; немає кроку завантаження під час виконання.                                                            |
| Vue plugin registration (`app.use(i18n)`) | Плагін Intlayer обробляє ін'єкцію та завантаження під капотом.                                                                                            |
| JSON language bundles (`locales/*.json`)  | JSON bundles потрібні лише якщо ви все ще використовуєте плагін `syncJSON`. Як тільки ви перейдете на файли `.content.ts`, ви можете видалити папку JSON. |

Коли ви будете готові йти далі, Intlayer **автоматично виявляє всі файли `.content.ts` та `.content.json` будь-де у вашому codebase** (за замовчуванням, будь-де всередині `./src`). Ви можете розмістити файл `my-component.content.ts` прямо поруч із вашим `MyComponent.vue`, і Intlayer підхопить його під час збірки без додаткової конфігурації — без імпортів, без реєстрації, без централізованого файлу індексу. Це робить розташування перекладів разом зі сторінками та компонентами повністю безпроблемним.

---

## Налаштування TypeScript

Intlayer використовує module augmentation для надання повної TypeScript intellisense для ваших ключів перекладу. Переконайтеся, що ваш `tsconfig.json` включає автоматично генеровані типи:

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включіть автоматично генеровані типи
  ],
}
```

---

## Git конфігурація

Додайте створену Intlayer директорію до вашого `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

---

## Йти далі

- **Візуальний редактор** — Керуйте перекладами візуально у браузері: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- **CMS** — Екстерналізуйте та керуйте контентом віддалено: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- **VS Code Extension** — Отримуйте автодоповнення та виявлення помилок перекладу в реальному часі: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- **CLI Reference** — Повний список команд CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- **Intlayer with Vue** — Повне керівництво налаштування для Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+vue.md)
- **Intlayer with Nuxt** — Повне керівництво налаштування для Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nuxt.md)
