---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Create React App i18n - Як перекласти додаток React у 2026
description: Дізнайтеся, як зробити ваш вебсайт на Create React App (CRA) багатомовним. Дотримуйтесь документації, щоб інтернаціоналізувати (i18n) та перекласти його.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізовано історію"
---

# Перекладіть ваш вебсайт Create React App за допомогою Intlayer | Інтернаціоналізація (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-cra-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox, як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Дивіться [шаблон додатку](https://github.com/aymericzip/intlayer-react-cra-template) на GitHub.

## Що таке Intlayer?

**Intlayer**, інноваційна open-source бібліотека для інтернаціоналізації (i18n), розроблена, щоб спростити багатомовну підтримку в сучасних веб-застосунках.

За допомогою Intlayer ви можете:

- **Легко керуйте перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізуйте метадані**, маршрути та контент.
- **Забезпечте підтримку TypeScript** за допомогою автогенерованих типів, що покращують автодоповнення та виявлення помилок.
- **Отримайте переваги від розширених можливостей**, таких як динамічне визначення та перемикання локалі.

## Покроковий посібник з налаштування Intlayer у React-додатку

### Крок 1: Встановіть залежності

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer react-scripts-intlayer
bun x intlayer init
```

- **intlayer**

  The core package that provides internationalization tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **react-intlayer**

  The package that integrates Intlayer with React application. It provides context providers and hooks for React internationalization.

- **react-scripts-intlayer**

Містить команди та плагіни `react-scripts-intlayer` для інтеграції Intlayer у застосунок на базі Create React App. Ці плагіни базуються на [craco](https://craco.js.org/) і включають додаткову конфігурацію для бандлера [Webpack](https://webpack.js.org/).

### Крок 2: Налаштування вашого проекту

Створіть файл конфігурації для налаштування мов вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Інші ваші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> За допомогою цього файлу конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення через middleware, імена cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer у консолі та інше. Для повного переліку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтегруйте Intlayer у конфігурацію CRA

Змініть ваші скрипти, щоб використовувати react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-scripts-intlayer` scripts are based on [CRACO](https://craco.js.org/). You can also implement your own setup based on the intlayer craco plugin. [See example here](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Крок 4: Оголосіть свій вміст

Create and manage your content declarations to store translations:

```tsx fileName="src/app.content.tsx" codeFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      uk: (
        <>
          Відредагуйте <code>src/App.tsx</code> та збережіть, щоб
          перезавантажити
        </>
      ),
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      uk: (
        <>
          Редагуйте <code>src/App.tsx</code> і збережіть, щоб перезавантажити
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        uk: "Вивчити React",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

> Ваші декларації контенту можуть бути визначені в будь-якому місці вашого застосунку, якщо вони включені до директорії `contentDir` (за замовчуванням, `./src`). І вони повинні відповідати розширенню файлу декларації контенту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для отримання детальнішої інформації зверніться до [документації щодо декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

> Якщо ваш файл контенту містить код TSX, слід розглянути імпорт `import React from "react";` у вашому файлі контенту.

### Крок 5: Використання Intlayer у вашому коді

Отримуйте доступ до словників контенту у всьому застосунку:

```tsx {4,7} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="логотип" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> Примітка: Якщо ви хочете використовувати ваш контент у `string` атрибуті, наприклад `alt`, `title`, `href`, `aria-label` тощо, ви повинні викликати значення функції, як-от:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, перегляньте [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md).

### (Необов'язково) Крок 6: Зміна мови вашого контенту

Щоб змінити мову контенту, ви можете використати функцію `setLocale`, що надається хуком `useLocale`. Ця функція дозволяє встановити locale застосунку та відповідно оновити контент.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> Щоб дізнатися більше про хук `useLocale`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md).

### (Необов'язково) Крок 7: Додайте локалізовану маршрутизацію до вашого додатку

Мета цього кроку, створити унікальні маршрути для кожної мови. Це корисно для SEO та SEO-дружніх URL-адрес.
Приклад:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> За замовчуванням маршрути не мають префікса для локалі за замовчуванням. Якщо ви хочете додати префікс і для локалі за замовчуванням, встановіть опцію `middleware.prefixDefault` в `true` у вашій конфігурації. Див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) для докладнішої інформації.

Щоб додати локалізовану маршрутизацію у ваш застосунок, можна створити компонент `LocaleRouter`, який обгортає маршрути вашого застосунку й обробляє маршрутизацію на основі локалі. Ось приклад з використанням [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
// Імпорт необхідних залежностей та функцій
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Утиліти та типи з 'intlayer'
// Утиліти та типи з 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Типи React для функціональних компонентів та пропсів
import { IntlayerProvider } from "react-intlayer"; // Провайдер контексту інтернаціоналізації
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Компоненти роутера для керування навігацією

// Деструктуризація конфігурації з Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, що обробляє локалізацію та обгортає дочірні елементи у відповідний контекст локалі.
 */
 * Виконує визначення та перевірку локалі на основі URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Отримати поточний шлях URL

  // Визначає поточну локаль, за відсутності значення використовується локаль за замовчуванням
  const currentLocale = locale ?? defaultLocale;

  // Видаляє префікс локалі з шляху для побудови базового шляху
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Поточний шлях URL
  );

  /**
   * Якщо middleware.prefixDefault дорівнює true, локаль за замовчуванням завжди повинна мати префікс.
   */
  if (middleware.prefixDefault) {
    // Перевірити локаль
    if (!locale || !locales.includes(locale)) {
      // Перенаправити на локаль за замовчуванням зі оновленим шляхом
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Замінити поточний запис історії на новий
        />
      );
    }

    // Огорнути дочірні елементи IntlayerProvider та встановити поточну локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Коли middleware.prefixDefault дорівнює false, за замовчуванням локаль не має префікса.
     * Переконайтеся, що поточна локаль є дійсною і не є локаллю за замовчуванням.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Виключити локаль за замовчуванням
        )
        .includes(currentLocale) // Перевіряє, чи поточна локаль входить до списку дійсних локалей
    ) {
      // Перенаправляє на шлях без префікса локалі
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Обгортає дочірні елементи IntlayerProvider та встановлює поточну локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, який налаштовує маршрути, специфічні для локалі.
 * Використовує React Router для керування навігацією та відображення локалізованих компонентів.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Шаблон маршруту для захоплення локалі (наприклад, /en/, /fr/) і відповідності всім наступним шляхам
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Обгортає дочірні елементи з управлінням локаллю
          />
        ))}

      {
        // Якщо префіксування локалі за замовчуванням відключено, відобразити дочірні елементи безпосередньо за кореневим шляхом
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Обгортає дочірні елементи з управлінням локаллю
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Потім ви можете використовувати компонент `LocaleRouter` у вашому застосунку:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Ваш компонент AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

### (Необов'язково) Крок 8: Змінити URL при зміні локалі

Щоб змінювати URL при зміні локалі, ви можете використовувати проп `onLocaleChange`, що надається хуком `useLocale`. Паралельно можна використовувати хуки `useLocation` та `useNavigate` з `react-router-dom` для оновлення шляху URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Отримати поточний шлях URL. Приклад: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Сформувати URL з оновленою локаллю
      // Приклад: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Оновити шлях URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Локаль, напр. FR */}
              {localeItem}
            </span>
            <span>
              {/* Назва мови у її власній локалі, напр. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Назва мови у поточній локалі, напр. Francés, коли поточна локаль встановлена на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Назва мови англійською, напр. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Посилання на документацію:
>
> - [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md)
> - [Хук `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleName.md)
> - [Хук `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md)
> - [Хук `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)
> - [Атрибут `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [Атрибут `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [Атрибут `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [Атрибут `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Необов'язково) Крок 9: Змінити атрибути мови та напрямку HTML

Коли ваш застосунок підтримує кілька мов, важливо оновлювати атрибути `lang` та `dir` тега `<html>`, щоб вони відповідали поточній локалі. Це забезпечує:

- **Доступність**: Екранні читачі та допоміжні технології покладаються на правильний атрибут `lang` для точного вимови та інтерпретації контенту.
- **Відображення тексту**: Атрибут `dir` (напрямок) забезпечує правильний порядок відображення тексту (наприклад, зліва направо для англійської, справа наліво для арабської або івриту), що важливо для читабельності.
- **SEO**: Пошукові системи використовують атрибут `lang` для визначення мови вашої сторінки, допомагаючи показувати правильний локалізований контент у результатах пошуку.

Оновлюючи ці атрибути динамічно при зміні локалі, ви гарантуєте послідовний та доступний досвід для користувачів усіх підтримуваних мов.

#### Реалізація хука

Створіть власний хук для керування атрибутами HTML. Хук слухає зміни локалі та відповідно оновлює атрибути:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Оновлює атрибути `lang` та `dir` елемента HTML <html> на основі поточної локалі.
 * - `lang`: Повідомляє браузери та пошукові системи про мову сторінки.
 * - `dir`: Забезпечує правильний порядок читання (наприклад, 'ltr' для англійської, 'rtl' для арабської).
 *
 * Це динамічне оновлення важливе для правильного відображення тексту, доступності та SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Оновити атрибут мови на поточну локаль.
    document.documentElement.lang = locale;

    // Встановити напрямок тексту на основі поточної локалі.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### Використання хука у вашому застосунку

Інтегруйте хук у ваш основний компонент, щоб атрибути HTML оновлювалися щоразу, коли змінюється локаль:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Застосувати хук для оновлення атрибутів `lang` та `dir` тега <html> на основі локалі.
  useI18nHTMLAttributes();

  // ... Решта вашого компонента
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

Застосувавши ці зміни, ваш застосунок буде:

- Забезпечувати правильне відображення атрибута **мови** (`lang`) відповідно до поточної локалі, що важливо для SEO та поведінки браузера.
- Налаштовувати **напрямок тексту** (`dir`) відповідно до локалі, покращуючи читабельність та зручність використання для мов з різним порядком читання.
- Забезпечувати більш **доступний** досвід, оскільки допоміжні технології покладаються на ці атрибути для оптимальної роботи.

### Налаштування TypeScript

Intlayer використовує module augmentation для отримання переваг TypeScript та зміцнення вашої кодової бази.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автогенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автогенеровані типи
  ],
}
```

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх коміту до вашого репозиторію Git.

Для цього додайте наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **Розширення Intlayer VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного контенту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для отримання додаткової інформації про використання розширення зверніться до [документації розширення Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Піти далі

Щоб піти далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести ваш контент за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
