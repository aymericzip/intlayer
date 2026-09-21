---
createdAt: 2024-03-07
updatedAt: 2026-09-06
title: "Как постфактум сделать существующее приложение Vite и React многоязычным (i18n руководство 2026)"
description: "Руководство 2026 года по добавлению многоязычности (i18n) в существующее приложение Vite и React без утомительного рефакторинга. Автоматическое извлечение, ИИ-перевод и оптимизированный бандл с Intlayer."
keywords:
  - Vite i18n
  - React i18n
  - Интернационализация
  - Перевести существующее приложение Vite
  - Перевести существующее приложение React
  - Intlayer
  - Многоязычность
  - Компилятор
  - ИИ-перевод
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# Как постфактум сделать существующее приложение Vite и React многоязычным (i18n руководство 2026)

Добавить интернационализацию (i18n) в проект Vite и React с самого начала относительно просто. Но что делать, если у вас уже есть готовое production-приложение на одном языке, и вам нужно сделать его мультиязычным **постфактум**?

С традиционными библиотеками вроде `react-i18next` или `react-intl` это превращается в кошмар:

- Поиск захардкоженных строк в сотнях файлов JSX и TSX.
- Создание вложенных JSON-словарей и придумывание произвольных ключей перевода (`components.header.title` и т. д.).
- Замена текста интерфейса на громоздкие вызовы хуков (`t('...')`).
- Переработка клиентской маршрутизации, управления состоянием и логики переключения языков.

В 2026 году вам больше не нужно переписывать свой проект. С **Intlayer** вы можете локализовать существующее приложение Vite и React за считанные минуты благодаря автоматическому извлечению, переводу с помощью ИИ и бесшовной интеграции.

> Ищете подробное пошаговое техническое руководство для Vite и React? Ознакомьтесь с документацией: [Локализация Vite и React с Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md).

## Содержание

<TOC/>

## Дилемма доработки: почему локализация готового приложения трудна

Разработчики сталкиваются с тремя сложностями при локализации существующего приложения Vite и React:

1. **Разрушение структуры кодовой базы**: Ручное извлечение строк в файлы JSON требует изменения почти каждого компонента. Это приводит к огромным diff в git, конфликтам слияния и потенциальным визуальным регрессиям.
2. **Сложность управления ключами**: Выдумывание ключей вроде `dashboard.hero.ctaButton` для каждой фразы замедляет разработку и создает когнитивную нагрузку при каждом изменении текстов.
3. **Рутинный перевод**: После извлечения строк их перевод на 5, 10 или 20 языков требует бесконечного копирования или дорогостоящих внешних сервисов локализации.

Intlayer решает эти проблемы на уровне архитектуры с помощью **извлечения на базе компилятора**, **декларативных словарей на уровне компонентов** и **нативной интеграции с Vite**.

## Автоматизированное извлечение контента (без ручного поиска строк)

Вместо того чтобы вручную извлекать каждую строку из вашего JSX, Intlayer предлагает два удобных пути:

### Вариант A: CLI-инструмент извлечения (`npx intlayer extract`)

Вы можете запустить утилиту извлечения Intlayer прямо в вашей кодовой базе:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

Эта команда сканирует компоненты React, находит отображаемый текст и автоматически создает файлы декларации контента (`.content.ts`) рядом с соответствующими компонентами. Ваш код остается декларативным, понятным и строго типизированным без ручного ввода ключей.

### Вариант B: Компилятор Intlayer (Извлечение во время сборки)

При включенном компиляторе Intlayer вы можете продолжать писать компоненты с обычным текстом на вашем языке по умолчанию. Во время сборки компилятор извлекает строки и внедряет локализованный контент автоматически:

```tsx fileName="src/App.tsx"
// Пишите обычный React-код. Компилятор извлечет текст автоматически
export default function App() {
  return (
    <section>
      <h1>Добро пожаловать на нашу платформу</h1>
      <p>Начните исследовать современные возможности уже сегодня.</p>
    </section>
  );
}
```

Под капотом Intlayer формирует словарь и связывает компонент с локализованными данными, полностью избавляя от необходимости ручного рефакторинга.

В этом случае генерируется файл `src/App.content.ts` со следующей структурой:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    dobroPozhalovatNaNashuPlatformu: t({
      ru: "Добро пожаловать на нашу платформу",
    }),
    nachniteIssledovatSovremennye: t({
      ru: "Начните исследовать современные возможности уже сегодня.",
    }),
  },
};

export default content;
```

## Перевод с помощью ИИ и вашей любимой LLM

После извлечения контента его перевод на десятки языков не должен занимать дни. Intlayer предоставляет встроенный CLI для перевода через OpenAI, Anthropic, DeepSeek или Mistral с использованием ваших собственных API-ключей:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

Настройте список языков и ИИ-провайдера в `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.RUSSIAN,
    ],
    defaultLocale: Locales.RUSSIAN,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Современное SaaS-приложение и панель управления на базе Vite и React",
  },
};

export default config;
```

Вызов `npx intlayer fill` заполняет декларации точными переводами для всех настроенных языков:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    dobroPozhalovatNaNashuPlatformu: t({
      ru: "Добро пожаловать на нашу платформу",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    nachniteIssledovatSovremennye: t({
      ru: "Начните исследовать современные возможности уже сегодня.",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

Благодаря тому, что Intlayer передает контекст приложения `applicationContext` в модель, переводы сохраняют техническую терминологию, корпоративный стиль и грамматические нюансы гораздо лучше традиционных средств перевода.

Для проверки отсутствия непереведенных строк перед деплоем:

```bash
npx intlayer test
```

## Интеграция с Vite и настройка Provider

Интеграция Intlayer в Vite требует лишь подключения плагина в `vite.config.ts` и оборачивания корневого компонента в `IntlayerProvider`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Начиная с Intlayer v9, компилятор включен непосредственно в плагин `intlayer()` и активируется автоматически при настройке `compiler.enabled` в `intlayer.config.ts`.

Оберните приложение компонентом `IntlayerProvider`:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### Динамическое переключение языка

Меняйте язык в любой части приложения с помощью хука `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Многоязычное SEO (Sitemap и Robots.txt)

Intlayer включает утилиты вроде `generateSitemap` и `getMultilingualUrls`, которые генерируют файлы `sitemap.xml` и `robots.txt` для статических сборок Vite:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("SEO-файлы успешно созданы.");
```

Добавьте команду `prebuild` в ваш `package.json`, чтобы запускать скрипт перед `vite build`:

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Подробное руководство: Готовы к пошаговой настройке?

Этот материал дал концептуальное представление о том, как добавить интернационализацию в существующий проект Vite и React в 2026 году без лишних сложностей.

Если вы хотите детально настроить каждый элемент приложения, включая строгую типизацию TypeScript, динамические словари и визуальный редактор, перейдите к подробному руководству:

👉 **[Полное руководство по переводу Vite и React с Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)**

## Часто задаваемые вопросы (FAQ)

<FAQ>

<Question title="Можно ли сделать приложение Vite и React многоязычным без ручного рефакторинга всех строк?">

Да. Вы можете использовать `npx intlayer extract` для автоматического нахождения и извлечения строк в локализованные файлы объявлений, либо использовать компилятор Intlayer, трансформирующий компоненты во время сборки, пока вы пишете стандартный JSX.

</Question>
<Question title="Как Intlayer сокращает размер бандла Vite по сравнению с react-i18next или react-intl?">

Intlayer распределяет словари по отдельным компонентам и использует макро-оптимизацию во время сборки. В бандл попадают только строки, нужные отображаемым компонентам, вместо загрузки гигантских JSON-файлов. Динамические словари также позволяют подгружать языки по мере необходимости.

</Question>
<Question title="Могу ли я использовать ИИ для перевода компонентов на множество языков?">

Да. В CLI Intlayer есть команда `npx intlayer fill`, которая подключается к выбранной LLM (OpenAI, Anthropic, Mistral, DeepSeek) для генерации контекстных переводов по всем настроенным языкам.

</Question>
<Question title="Можно ли перейти с react-i18next или react-intl без переписывания компонентов?">

Да. Intlayer предоставляет адаптеры совместимости для `react-i18next` и `react-intl`, а также плагины для автоматической синхронизации существующих JSON-словарей (`sync-json`).

</Question>

</FAQ>
