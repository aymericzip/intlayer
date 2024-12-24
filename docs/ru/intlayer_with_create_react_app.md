# Начало работы с интернационализацией (i18n) с Intlayer и React Create App

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека интернационализации (i18n) с открытым исходным кодом, предназначенная для упрощения многоязычной поддержки в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с автогенерируемыми типами, улучшая автозаполнение и обнаружение ошибок.
- **Воспользоваться расширенными функциями**, такими как динамическое определение и переключение локали.

---

## Пошаговая инструкция по настройке Intlayer в приложении React

### Шаг 1: Установите зависимости

Установите необходимые пакеты с помощью npm:

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Чтобы увидеть все доступные параметры, ознакомьтесь с [документацией по конфигурации здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в вашу конфигурацию CRA

Измените ваши скрипты, чтобы использовать react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

Примечание: скрипты react-intlayer основаны на craco. Вы также можете реализовать свою собственную настройку на основе плагина intlayer craco. [Смотрите пример здесь](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Шаг 4: Объявите ваш контент

Создайте и управляйте вашими словарями контента:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Редактируйте <code>src/App.tsx</code> и сохраните, чтобы перезагрузить
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
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
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

[Смотрите, как объявить ваши файлы декларации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

### Шаг 5: Используйте Intlayer в вашем коде

Получите доступ к вашим словарям контента на протяжении всего вашего приложения:

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* Чтобы правильно использовать хук useIntlayer, вы должны получать ваши данные в дочернем компоненте */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerProvider>
  );
}

export default App;
```

> Примечание: Если вы хотите использовать ваш контент в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т. д., вы должны вызвать значение функции, например:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Дополнительно) Шаг 6: Измените язык вашего контента

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет вам установить локаль приложения и обновить контент соответственно.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Изменить язык на английский
    </button>
  );
};
```

### (Дополнительно) Шаг 7: Добавьте локализованный маршрутизация в ваше приложение

Цель этого шага — создать уникальные маршруты для каждого языка. Это полезно для SEO и SEO-дружественных URL.
Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> По умолчанию маршруты не префиксируются для локали по умолчанию. Если вы хотите префиксировать локаль по умолчанию, вы можете установить параметр `middleware.prefixDefault` в `true` в вашей конфигурации. Смотрите [документацию по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md) для получения дополнительной информации.

Чтобы добавить локализованную маршрутизацию в ваше приложение, вы можете создать компонент `LocaleRouter`, который оборачивает маршруты вашего приложения и обрабатывает маршрутизацию на основе локали. Вот пример с использованием [React Router](https://reactrouter.com/home):

```tsx
// Импорт необходимых зависимостей и функций
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Утилитные функции и типы из 'intlayer'
import { FC, PropsWithChildren } from "react"; // Типы React для функциональных компонентов и пропсов
import { IntlayerProvider } from "react-intlayer"; // Провайдер для контекста интернационализации
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Компоненты маршрутизатора для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Он управляет определением локали на основе URL и валидацией.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Получить текущий URL путь
  const { locale } = useParams<{ locale: Locales }>(); // Извлечь параметр локали из URL

  // Определить текущую локаль, возвращаясь к локали по умолчанию, если она не указана
  const currentLocale = locale ?? defaultLocale;

  // Удалить префикс локали из пути, чтобы построить базовый путь
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Текущий URL путь
  );

  /**
   * Если middleware.prefixDefault равно true, локаль по умолчанию всегда должна быть префиксированной.
   */
  if (middleware.prefixDefault) {
    // Валидация локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправление на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Заменить текущую запись истории на новую
        />
      );
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равно false, локаль по умолчанию не префиксирована.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Проверить, находится ли текущая локаль в списке допустимых локалей
    ) {
      // Перенаправление к пути без префикса локали
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, специфичные для локали.
 * Он использует React Router для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Шаблон маршрута для захвата локали (например, /en/, /fr/) и сопоставления всех последующих путей
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы с управлением локалью
      />

      {
        // Если префиксирование локали по умолчанию отключено, рендерьте дочерние элементы напрямую по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы с управлением локалью
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Дополнительно) Шаг 8: Измените URL, когда локаль изменяется

Чтобы изменить URL, когда локаль изменяется, вы можете использовать свойство `onLocaleChange`, предоставляемое хуком `useLocale`. Параллельно вы можете использовать хуки `useLocation` и `useNavigate` из `react-router-dom`, чтобы обновить путь URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Получить текущий URL путь. Пример: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Создать URL с обновленной локалью
    // Пример: /es/about с установленной локалью на испанский
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Обновить путь URL
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Изменить язык на английский
    </button>
  );
};
```

### Настройка TypeScript

Intlayer использует модульное расширение, чтобы получить преимущества TypeScript и сделать вашу кодовую базу более надежной.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает авто сгенерированные типы.

```json5
// tsconfig.json

{
  // ваша пользовательская конфигурация
  "include": [
    "src",
    "types", // <- Включите авто сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволяет избежать их коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```
