---
createdAt: 2025-03-09
updatedAt: 2025-06-29
title: Переведите своё мобильное приложение Lynx и React (i18n)
description: Узнайте, как сделать ваше мобильное приложение Lynx и React многоязычным. Следуйте документации для интернационализации (i18n) и перевода.
keywords:
  - интернационализация
  - документация
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
---

# Начало работы с интернационализацией (i18n) с Intlayer, Lynx и React

Смотрите [шаблон приложения](https://github.com/aymericzip/intlayer-lynx-template) на GitHub.

## Что такое Intlayer?

**Intlayer** — это **инновационная, открытая библиотека интернационализации (i18n)**, которая упрощает поддержку нескольких языков в современных приложениях. Она работает во многих средах JavaScript/TypeScript, **включая Lynx** (через пакет `react-intlayer`).

С помощью Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Обеспечить поддержку TypeScript** с помощью автоматически генерируемых типов.
- **Динамически локализовать** контент, включая **строки пользовательского интерфейса** (а в React для веба также можно локализовать HTML-метаданные и т.д.).
- **Использовать расширенные функции**, такие как динамическое определение и переключение локали.

---

## Шаг 1: Установите зависимости

Из вашего проекта Lynx установите следующие пакеты:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

### Пакеты

- **intlayer**  
  Основной набор инструментов i18n для конфигурации, содержания словарей, генерации типов и CLI-команд.

- **react-intlayer**  
  Интеграция с React, предоставляющая провайдеры контекста и React-хуки, которые вы будете использовать в Lynx для получения и переключения локалей.

- **lynx-intlayer**  
  Интеграция с Lynx, предоставляющая плагин для интеграции Intlayer с бандлером Lynx.

---

## Шаг 2: Создайте конфигурацию Intlayer

В корне вашего проекта (или в любом удобном месте) создайте файл **конфигурации Intlayer**. Он может выглядеть так:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Добавьте любые другие локали, которые вам нужны
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
      // ... Добавьте любые другие локали, которые вам нужны
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

В этой конфигурации вы можете:

- Настроить **список поддерживаемых локалей**.
- Установить **локаль по умолчанию**.
- Позже вы можете добавить более сложные опции (например, логи, пользовательские директории контента и т.д.).
- См. [документацию по конфигурации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) для получения дополнительной информации.

## Шаг 3: Добавьте плагин Intlayer в бандлер Lynx

Чтобы использовать Intlayer с Lynx, вам нужно добавить плагин в файл `lynx.config.ts`:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... другие плагины
    pluginIntlayerLynx(),
  ],
});
```

## Шаг 4: Добавьте провайдер Intlayer

Чтобы синхронизировать язык пользователя по всему приложению, вам нужно обернуть ваш корневой компонент в компонент `IntlayerProvider` из `react-intlayer`.

Также вам нужно добавить файл функции `intlayerPolyfill`, чтобы Intlayer работал корректно.

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

## Шаг 5: Объявите ваш контент

Создайте файлы **объявления контента** в любом месте вашего проекта (обычно в `src/`), используя любой из форматов расширений, поддерживаемых Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- и т.д.

Пример:

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      ru: "на Lynx",
      en: "on Lynx",
      ru: "на Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      ru: "Нажмите на логотип и повеселитесь!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        ru: "Редактировать",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        ru: "чтобы увидеть обновления!",
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
      ru: "на Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      ru: "Нажмите на логотип и повеселитесь!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        ru: "Редактировать",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        ru: "чтобы увидеть обновления!",
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
      ru: "на Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      ru: "Нажмите на логотип и повеселитесь!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        ru: "Редактировать",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        ru: "чтобы увидеть обновления!",
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
        "ru": "на Lynx",
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    }
  },
  "description": {
    "nodeType": "translation",
    "translation": {
      "ru": "Нажмите на логотип и повеселитесь!",
      "en": "Tap the logo and have fun!",
      "fr": "Appuyez sur le logo et amusez-vous!",
      "es": "¡Toca el logo y diviértete!"
    }
  },
  "hint": [
    {
      "nodeType": "translation",
      "translation": {
        "ru": "Редактировать",
        "en": "Edit",
        "fr": "Modifier",
        "es": "Editar"
      }
    },
    " src/App.tsx ",
    {
      "nodeType": "translation",
      "translation": {
        "ru": "чтобы увидеть обновления!",
        "en": "to see updates!",
        "fr": "pour voir les mises à jour!",
        "es": "para ver actualizaciones!"
      }
    }
  ]
}
```

> Для получения подробной информации о декларациях контента, см. [документацию по контенту Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

---

## Шаг 4: Используйте Intlayer в ваших компонентах

Используйте хук `useIntlayer` в дочерних компонентах для получения локализованного контента.

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
    // только фон
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

> При использовании `content.someKey` в строковых свойствах (например, `title` кнопки или `children` компонента `Text`), **вызывайте `content.someKey.value`**, чтобы получить строку.

---

## (Опционально) Шаг 5: Измените локаль приложения

Для переключения локалей из ваших компонентов вы можете использовать метод `setLocale` из хука `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "intlayer";

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

Это вызывает повторный рендер всех компонентов, использующих контент Intlayer, теперь с переводами для новой локали.

> См. [документацию по `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md) для получения дополнительной информации.

## Настройка TypeScript (если вы используете TypeScript)

Intlayer генерирует определения типов в скрытой папке (по умолчанию `.intlayer`) для улучшения автозаполнения и обнаружения ошибок перевода:

```json5
// tsconfig.json
{
  // ... ваш существующий TS конфиг
  "include": [
    "src", // ваш исходный код
    ".intlayer/types/**/*.ts", // <-- убедитесь, что автоматически сгенерированные типы включены
    // ... все остальное, что вы уже включили
  ],
}
```

Это позволяет использовать такие функции, как:

- **Автозаполнение** для ключей вашего словаря.
- **Проверка типов**, которая предупреждает, если вы обращаетесь к несуществующему ключу или несовместимому типу.

---

## Конфигурация Git

Чтобы избежать коммита автоматически сгенерированных файлов Intlayer, добавьте следующее в ваш `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

---

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автозаполнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведённого контента.
- **Быстрые действия** для лёгкого создания и обновления переводов.
  Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации по расширению Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Узнайте больше

- **Визуальный редактор**: Используйте [визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) для визуального управления переводами.
- **Интеграция с CMS**: Вы также можете вынести и получить содержимое вашего словаря из [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
- **CLI команды**: Изучите [CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md) для выполнения задач, таких как **извлечение переводов** или **проверка отсутствующих ключей**.

---

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
