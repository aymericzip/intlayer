---
createdAt: 2025-03-09
updatedAt: 2026-05-31
title: "Lynx + React i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Lynx + React. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
author: aymericzip
---

# Перекладіть вебсайт вашого мобільного додатка Lynx і React за допомогою Intlayer | Інтернаціоналізація (i18n)

Перегляньте [шаблон застосунку](https://github.com/aymericzip/intlayer-lynx-template) на GitHub.

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-lynx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо в CodeSandbox. Як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `react-native-localize` або `i18next`, Intlayer — це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>

<Accordion header="Повна підтримка Lynx">

Intlayer оптимізовано для ідеальної роботи з Lynx і React, пропонуючи **визначення вмісту на рівні компонентів**, **підтримку TypeScript** і всі функції, необхідні для інтернаціоналізації масштабування (i18n).

</Accordion>

<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір бандлу і сторінок до 50%**.

</Accordion>

<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>

<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** і **[навички агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу в конвеєрі CI/CD за допомогою LLM за вашим вибором за рахунок вашого постачальника штучного інтелекту. Intlayer також пропонує **компілятор** для автоматизації екстракція вмісту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), щоб допомогти **перекладати у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення великих файлів JSON до компонентів може призвести до проблем з продуктивністю та реакцією. Intlayer оптимізує завантаження вмісту під час збірки (build time).

</Accordion>

<Accordion header="Співпраця з не-розробниками">

Більше ніж просто рішення i18n, Intlayer пропонує **власний [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** і **[повний CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, щоб допомогти вам керувати своїм багатомовним вмістом у **реальному часі**, спрощуючи співпрацю з перекладачами, копірайтерами та іншими членами команди. Контент можна зберігати локально та/або віддалено.

</Accordion>
</AccordionGroup>

---

<Steps>

<Step number={1} title="Встановлення залежностей">

З вашого проєкту Lynx встановіть наступні пакети:

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

> прапорець `--interactive` не є обов'язковим. Використовуйте `intlayer-cli init`, якщо ви є ШІ-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
```

### Пакети

- **intlayer**  
  Основний інструментарій i18n для конфігурації, вмісту словників, генерації типів та CLI-команд.

- **react-intlayer**  
  Інтеграція для React, що надає context providers та React hooks, які ви використовуватимете в Lynx для отримання й перемикання локалей.

- **lynx-intlayer**  
  Інтеграція для Lynx, яка надає плагін для інтеграції Intlayer з бандлером Lynx.

///

---

</Step>

<Step number={2} title="Створіть конфігураційний файл Intlayer">

У корені вашого проєкту (або в будь-якому зручному місці) створіть **конфігураційний файл Intlayer**. Він може виглядати так:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Додайте будь-які інші локалі, які вам потрібні
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

У цій конфігурації ви можете:

- Налаштувати свій **список підтримуваних локалей**.
- Встановити **локаль за замовчуванням**.
- Надалі ви можете додати більш розширені опції (наприклад, логи, кастомні каталоги контенту тощо).
- Див. [документацію конфігурації Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) для деталей.

</Step>

<Step number={3} title="Додайте плагін Intlayer у збирач Lynx">

Щоб використовувати Intlayer з Lynx, потрібно додати плагін у файл `lynx.config.ts`:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... інші плагіни
    pluginIntlayerLynx(),
  ],
});
```

</Step>

<Step number={4} title="Додайте провайдера Intlayer">

Щоб синхронізувати мову користувача по всьому додатку, обгорніть кореневий компонент компонентом `IntlayerProvider` з `react-intlayer`.

Також потрібно додати виклик функції `intlayerPolyfill`, щоб забезпечити правильну роботу Intlayer.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

</Step>

<Step number={5} title="Оголосіть свій контент">

Створіть **файли декларації контенту** у будь-якому місці вашого проєкту (зазвичай у `src/`), використовуючи будь-який із форматів розширень, які підтримує Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- etc.

Приклад:

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      uk: "на Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      uk: "Натисніть на логотип і розважайтеся!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        uk: "Редагувати",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        uk: "щоб побачити оновлення!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "uk": "на Lynx",
        "en": "on Lynx",
        "uk": "на Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "uk": "Торкніться логотипа та розважайтеся!",
        "en": "Tap the logo and have fun!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "uk": "Редагувати",
          "en": "Edit",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "uk": "щоб побачити оновлення!",
          "en": "to see updates!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!"
        }
      }
    ]
  }
}
```

> Детальніше про декларації контенту див. [документацію Intlayer щодо файлів контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

---

</Step>

<Step number={6} title="Використання Intlayer у ваших компонентах">

Використайте хук `useIntlayer` у дочірніх компонентах, щоб отримувати локалізований контент.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");

  const onTap = useCallback(() => {
    "лише фон";
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> Коли ви використовуєте `content.someKey` у властивостях, які очікують рядок (наприклад, `title` кнопки або `children` компонента `Text`), **викликайте `content.someKey.value`**, щоб отримати фактичний рядок.

---

</Step>

<Step number={7} title="Змінити локаль додатка">

Щоб перемикати локалі зсередини ваших компонентів, ви можете використовувати метод `setLocale` хука `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

Це спричиняє повторний рендер усіх компонентів, що використовують вміст Intlayer, які тепер відображатимуть переклади для нової локалі.

> Дивіться [документацію `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md) для детальнішої інформації.

</Step>

</Steps>

## Налаштування TypeScript (якщо ви використовуєте TypeScript)

Intlayer генерує визначення типів у прихованій папці (за замовчуванням `.intlayer`) для покращення автозаповнення та виявлення помилок у перекладах:

```json5
// tsconfig.json
{
  // ... ваша існуюча конфігурація TS
  "include": [
    "src", // ваш вихідний код
    ".intlayer/types/**/*.ts", // <-- переконайтеся, що автогенеровані типи включені
    // ... все інше, що ви вже включаєте
  ],
}
```

Це забезпечує такі можливості:

- **Автозаповнення** для ключів вашого словника.
- **Перевірка типів**, яка попереджає, якщо ви звертаєтеся до неіснуючого ключа або тип не відповідає.

---

## Конфігурація Git

Щоб уникнути коміту автоматично згенерованих файлів Intlayer, додайте наступне до вашого `.gitignore`:

```bash
#  Ігнорувати файли, згенеровані Intlayer
.intlayer
```

---

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для зручного створення та оновлення перекладів.

Для детальнішої інформації про використання розширення див. документацію [Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

## Додаткові можливості

- **Візуальний редактор**: Використовуйте [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) для візуального керування перекладами.
- **Інтеграція з CMS**: Ви також можете зовнішньо зберігати та отримувати вміст вашого словника з [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
- **Команди CLI**: Ознайомтеся з [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) для завдань, таких як **вилучення перекладів** або **перевірка відсутніх ключів**.

---
