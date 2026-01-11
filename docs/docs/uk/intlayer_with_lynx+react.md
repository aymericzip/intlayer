---
createdAt: 2025-03-09
updatedAt: 2025-12-30
title: Як перекласти ваш мобільний додаток Lynx і React – посібник з i18n 2026
description: Дізнайтеся, як зробити ваш мобільний додаток Lynx і React багатомовним. Дотримуйтеся документації, щоб інтернаціоналізувати (i18n) та перекласти його.
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
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Перекладіть вебсайт вашого мобільного додатка Lynx і React за допомогою Intlayer | Інтернаціоналізація (i18n)

Перегляньте [шаблон застосунку](https://github.com/aymericzip/intlayer-lynx-template) на GitHub.

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-lynx-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо в CodeSandbox — Як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Що таке Intlayer?

**Intlayer** — інноваційна, відкрита бібліотека для інтернаціоналізації (i18n), яка спрощує багатомовну підтримку в сучасних застосунках. Вона працює в багатьох JavaScript/TypeScript середовищах, **включно з Lynx** (через пакет `react-intlayer`).

За допомогою Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Забезпечити підтримку TypeScript** завдяки автогенерованим типам.
- **Динамічно локалізувати** контент, включно з **рядками інтерфейсу** (а в React для web це також може локалізувати HTML-метадані тощо).
- **Користуватися розширеними можливостями**, такими як динамічне визначення локалі та її перемикання.

---

## Крок 1: Встановлення залежностей

З вашого проєкту Lynx встановіть наступні пакети:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
bunx intlayer init
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

## Крок 2: Створіть конфігураційний файл Intlayer

У корені вашого проєкту (або в будь-якому зручному місці) створіть **конфігураційний файл Intlayer**. Він може виглядати так:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
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

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

У цій конфігурації ви можете:

- Налаштувати свій **список підтримуваних локалей**.
- Встановити **локаль за замовчуванням**.
- Надалі ви можете додати більш розширені опції (наприклад, логи, кастомні каталоги контенту тощо).
- Див. [документацію конфігурації Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) для деталей.

## Крок 3: Додайте плагін Intlayer у збирач Lynx

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

## Крок 4: Додайте провайдера Intlayer

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

## Крок 5: Оголосіть свій контент

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

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

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
      uk: "Торкніться логотипу та розважайтеся!",
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
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      uk: "на Lynx",
      en: "on Lynx",
      uk: "на Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      uk: "Натисніть на логотип та повеселіться!",
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
};

module.exports = appContent;
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

## Крок 4: Використання Intlayer у ваших компонентах

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

## (Необов'язково) Крок 5: Змінити локаль додатка

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

```plaintext
# Ігнорувати файли, згенеровані Intlayer
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
