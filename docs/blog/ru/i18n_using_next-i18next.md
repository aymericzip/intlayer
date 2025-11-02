---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Как интернационализировать ваше приложение Next.js с помощью next-i18next
description: Настройка i18n с next-i18next: лучшие практики и советы по SEO для многоязычных приложений Next.js, охватывающие интернационализацию, организацию контента и техническую настройку.
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Начальная версия
---

# Как интернационализировать ваше приложение Next.js с помощью next-i18next в 2025 году

## Содержание

<TOC/>

## Что такое next-i18next?

**next-i18next** — это популярное решение для интернационализации (i18n) приложений Next.js. В то время как оригинальный пакет `next-i18next` был разработан для Pages Router, в этом руководстве показано, как реализовать i18next с современным **App Router**, используя напрямую `i18next` и `react-i18next`.

С таким подходом вы можете:

- **Организовывать переводы** с помощью пространств имён (например, `common.json`, `about.json`) для лучшего управления контентом.
- **Эффективно загружать переводы**, загружая только необходимые пространства имён для каждой страницы, что уменьшает размер бандла.
- **Поддерживать как серверные, так и клиентские компоненты** с правильной обработкой SSR и гидратации.
- **Обеспечить поддержку TypeScript** с типобезопасной конфигурацией локалей и ключей переводов.
- **Оптимизируйте SEO** с помощью правильных метаданных, карты сайта и интернационализации robots.txt.

> В качестве альтернативы вы также можете ознакомиться с [руководством next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_next-intl.md) или использовать напрямую [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md).

> Сравнение смотрите в [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md).

## Практики, которые следует соблюдать

Прежде чем перейти к реализации, вот некоторые практики, которые следует соблюдать:

- **Устанавливайте атрибуты HTML `lang` и `dir`**
  В вашем layout вычисляйте `dir` с помощью `getLocaleDirection(locale)` и устанавливайте `<html lang={locale} dir={dir}>` для правильной доступности и SEO.
- **Разделяйте сообщения по namespace**
  Организуйте JSON-файлы по локалям и namespace (например, `common.json`, `about.json`), чтобы загружать только необходимое.
- **Минимизируйте нагрузку на клиент**
  На страницах отправляйте в `NextIntlClientProvider` только нужные namespace (например, `pick(messages, ['common', 'about'])`).
- **Предпочитайте статические страницы**
  Используйте статические страницы по возможности для лучшей производительности и SEO.
- **Интернационализация в серверных компонентах**
  Серверные компоненты, такие как страницы или все компоненты, не помеченные как `client`, являются статическими и могут быть предварительно отрендерены во время сборки. Поэтому нам нужно передавать функции перевода им через props.
- **Настройте типы TypeScript**
  Для ваших локалей обеспечьте типовую безопасность по всему приложению.
- **Прокси для перенаправления**
  Используйте прокси для обработки определения локали и маршрутизации, а также для перенаправления пользователя на URL с соответствующим префиксом локали.
- **Интернационализация метаданных, sitemap, robots.txt**
  Интернационализируйте ваши метаданные, sitemap, robots.txt с помощью функции `generateMetadata`, предоставляемой Next.js, чтобы обеспечить лучшее обнаружение поисковыми системами во всех локалях.
- **Локализация ссылок**
  Локализуйте ссылки с помощью компонента `Link`, чтобы перенаправлять пользователя на URL с соответствующим префиксом локали. Это важно для обеспечения обнаружения ваших страниц во всех локалях.
- **Автоматизация тестов и переводов**
  Автоматизация тестов и переводов помогает экономить время на поддержку вашего многоязычного приложения.

> Смотрите нашу документацию, в которой перечислено все, что вам нужно знать об интернационализации и SEO: [Интернационализация (i18n) с next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/internationalization_and_SEO.md).

---

## Пошаговое руководство по настройке i18next в приложении Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Смотрите [шаблон приложения](https://github.com/aymericzip/next-i18next-template) на GitHub.

Вот структура проекта, которую мы будем создавать:

```bash
.
├── i18n.config.ts
└── src # Src необязателен
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Группа маршрутов, чтобы не засорять все страницы сообщениями домашней страницы)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: Основной фреймворк интернационализации, который отвечает за загрузку и управление переводами.
- **react-i18next**: Обертки для React над i18next, предоставляющие хуки, такие как `useTranslation`, для клиентских компонентов.
- **i18next-resources-to-backend**: Плагин, который позволяет динамически загружать файлы переводов, загружая только необходимые пространства имён.

### Шаг 2: Настройка проекта

Создайте файл конфигурации, чтобы определить поддерживаемые локали, локаль по умолчанию и вспомогательные функции для локализации URL. Этот файл служит единственным источником правды для вашей настройки i18n и обеспечивает типобезопасность во всем приложении.

Централизация конфигурации локалей предотвращает несоответствия и упрощает добавление или удаление локалей в будущем. Вспомогательные функции обеспечивают единообразное формирование URL для SEO и маршрутизации.

```ts fileName="i18n.config.ts"
// Определяем поддерживаемые локали как константный массив для типобезопасности
// Утверждение 'as const' заставляет TypeScript выводить литеральные типы вместо string[]
export const locales = ["en", "fr"] as const;

// Извлекаем тип Locale из массива локалей
// Это создаёт объединённый тип: "en" | "fr"
export type Locale = (typeof locales)[number];

// Установите локаль по умолчанию, используемую, когда локаль не указана
export const defaultLocale: Locale = "en";

// Языки с направлением текста справа налево, требующие специальной обработки
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Проверяет, требует ли локаль направление текста справа налево (RTL)
// Используется для таких языков, как арабский, иврит, персидский и урду
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Генерирует локализованный путь для заданной локали и пути
// Пути для локали по умолчанию не имеют префикса (например, "/about" вместо "/en/about")
// Для других локалей добавляется префикс (например, "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// Базовый URL для абсолютных URL (используется в sitemap, метаданных и т.д.)
const ORIGIN = "https://example.com";

// Генерация абсолютного URL с префиксом локали
// Используется для SEO метаданных, sitemap и канонических URL
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Используется для установки cookie локали в браузере
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 год
    "SameSite=Lax",
  ].join("; ");
}
```

### Шаг 3: Централизовать пространства имён переводов

Создайте единый источник правды для каждого namespace, который использует ваше приложение. Повторное использование этого списка поддерживает синхронизацию кода сервера, клиента и инструментов, а также обеспечивает строгую типизацию для помощников перевода.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Шаг 4: Строгая типизация ключей перевода с помощью TypeScript

Расширьте `i18next`, чтобы он ссылался на ваши канонические языковые файлы (обычно английские). TypeScript тогда выводит допустимые ключи для каждого namespace, поэтому вызовы `t()` проверяются полностью.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> Совет: Сохраните это объявление в папке `src/types` (создайте папку, если её нет). Next.js уже включает `src` в `tsconfig.json`, поэтому расширение будет автоматически подхвачено. Если нет, добавьте следующее в ваш файл `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

С этим вы сможете использовать автодополнение и проверки во время компиляции:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// ОК, типизировано: t("counter.increment")
// ОШИБКА, ошибка компиляции: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Шаг 5: Настройка инициализации i18n на стороне сервера

Создайте функцию инициализации на стороне сервера, которая загружает переводы для серверных компонентов. Эта функция создает отдельный экземпляр i18next для серверного рендеринга, обеспечивая загрузку переводов до рендеринга.

Серверным компонентам нужен собственный экземпляр i18next, так как они работают в другом контексте, чем клиентские компоненты. Предварительная загрузка переводов на сервере предотвращает появление непереведенного контента и улучшает SEO, гарантируя, что поисковые системы видят переведенный контент.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Настройка динамической загрузки ресурсов для i18next
// Эта функция динамически импортирует JSON-файлы переводов на основе локали и пространства имён
// Пример: locale="fr", namespace="about" -> импортирует "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Инициализация экземпляра i18next для серверного рендеринга
 *
 * @returns Инициализированный экземпляр i18next, готовый к использованию на сервере
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Создайте новый экземпляр i18next (отдельный от клиентского экземпляра)
  const i18n = createInstance();

  // Инициализация с интеграцией React и загрузчиком backend
  await i18n
    .use(initReactI18next) // Включить поддержку React hooks
    .use(backend) // Включить динамическую загрузку ресурсов
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Загружать только указанные пространства имён для лучшей производительности
      defaultNS: "common", // Пространство имён по умолчанию, если не указано другое
      interpolation: { escapeValue: false }, // Не экранировать HTML (React обеспечивает защиту от XSS)
      react: { useSuspense: false }, // Отключить Suspense для совместимости с SSR
      returnNull: false, // Возвращать пустую строку вместо null для отсутствующих ключей
      initImmediate: false, // Отложить инициализацию до загрузки ресурсов (ускоряет SSR)
    });
  return i18n;
}
```

### Шаг 6: Создание клиентского провайдера i18n

Создайте клиентский компонент-провайдер, который оборачивает ваше приложение в контекст i18next. Этот провайдер получает предварительно загруженные переводы с сервера, чтобы предотвратить мерцание непереведённого контента (FOUC) и избежать повторных запросов.

Клиентским компонентам необходим собственный экземпляр i18next, который работает в браузере. Принимая предварительно загруженные ресурсы с сервера, мы обеспечиваем плавную гидратацию и предотвращаем мерцание контента. Провайдер также динамически управляет изменениями локали и загрузкой пространств имён.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Настройка динамической загрузки ресурсов для клиентской стороны
// Такой же паттерн, как и на сервере, но этот экземпляр работает в браузере
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Предзагруженные ресурсы с сервера (предотвращает FOUC - мерцание непереведённого контента)
  // Формат: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Провайдер i18n на стороне клиента, который оборачивает приложение в контекст i18next
 * Получает предварительно загруженные ресурсы с сервера, чтобы избежать повторного запроса переводов
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Создаем экземпляр i18n один раз с помощью ленивой инициализации useState
  // Это гарантирует, что экземпляр создается только один раз, а не при каждом рендере
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Если ресурсы предоставлены (с сервера), используйте их, чтобы избежать загрузки переводов на клиенте
        // Это предотвращает FOUC и улучшает производительность при первоначальной загрузке
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Предотвращает возврат undefined значений
      });

    return i18nInstance;
  });

  // Обновление языка при изменении свойства locale
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Обеспечить загрузку всех необходимых пространств имён на клиенте
  // Использование join("|") в качестве зависимости для корректного сравнения массивов
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Предоставить экземпляр i18n всем дочерним компонентам через React context
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Шаг 7: Определение динамических маршрутов локалей

Настройте динамическую маршрутизацию для локалей, создав директорию `[locale]` в вашей папке app. Это позволяет Next.js обрабатывать маршрутизацию на основе локалей, где каждая локаль становится сегментом URL (например, `/en/about`, `/fr/about`).

Использование динамических маршрутов позволяет Next.js генерировать статические страницы для всех локалей во время сборки, что улучшает производительность и SEO. Компонент layout устанавливает атрибуты HTML `lang` и `dir` в зависимости от локали, что важно для доступности и понимания поисковыми системами.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Отключить динамические параметры - все локали должны быть известны на этапе сборки
// Это обеспечивает статическую генерацию для всех маршрутов локалей
export const dynamicParams = false;

/**
 * Генерировать статические параметры для всех локалей на этапе сборки
 * Next.js предварительно отрендерит страницы для каждой локали, возвращенной здесь
 * Пример: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Корневой компонент layout, который обрабатывает HTML-атрибуты, специфичные для локали
 * Устанавливает атрибут lang и направление текста (ltr/rtl) в зависимости от локали
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Проверка локали из параметров URL
  // Если указана недопустимая локаль, используется локаль по умолчанию
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // Определение направления текста на основе локали
  // Языки с письмом справа налево, такие как арабский, требуют dir="rtl" для правильного отображения текста
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Шаг 8: Создайте файлы переводов

Создайте JSON-файлы для каждой локали и пространства имён. Такая структура позволяет логично организовать переводы и загружать только то, что необходимо для каждой страницы.

Организация переводов по пространствам имён (например, `common.json`, `about.json`) позволяет разделять код и уменьшать размер бандла. Вы загружаете только те переводы, которые нужны для каждой страницы, что улучшает производительность.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

Организация переводов по пространствам имён (например, `common.json`, `about.json`) позволяет разделять код и уменьшать размер бандла. Вы загружаете только те переводы, которые нужны для каждой страницы, что улучшает производительность.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/ru/common.json"
{
  "appTitle": "Приложение Next.js с i18n",
  "appDescription": "Пример приложения Next.js с интернационализацией с использованием i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/ru/home.json"
{
  "title": "Главная",
  "description": "Описание главной страницы",
  "welcome": "Добро пожаловать",
  "greeting": "Привет, мир!",
  "aboutPage": "Страница О нас",
  "documentation": "Документация"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "description": "Click the button to increase the counter"
  }
}
```

```json fileName="src/locales/ru/about.json"
{
  "title": "О нас",
  "description": "Описание страницы О нас",
  "counter": {
    "label": "Счётчик",
    "increment": "Увеличить",
    "description": "Нажмите кнопку, чтобы увеличить счётчик"
  }
}
```

### Шаг 9: Использование переводов на ваших страницах

Создайте компонент страницы, который инициализирует i18next на сервере и передаёт переводы как серверным, так и клиентским компонентам. Это гарантирует, что переводы загружены до рендера и предотвращает мерцание контента.

Инициализация на стороне сервера загружает переводы до рендера страницы, улучшая SEO и предотвращая FOUC (Flash of Unstyled Content). Передавая заранее загруженные ресурсы клиентскому провайдеру, мы избегаем повторных запросов и обеспечиваем плавную гидратацию.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Серверный компонент страницы, который инициализирует i18n
 * Предварительно загружает переводы на сервере и передает их клиентским компонентам
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Определяем, какие пространства имен переводов нужны этой странице
  // Используем централизованный список для типобезопасности и автодополнения
  const pageNamespaces = allNamespaces;

  // Инициализируем i18next на сервере с необходимыми пространствами имен
  // Это загружает JSON-файлы переводов на сервере
  const i18n = await initI18next(locale, pageNamespaces);

  // Получить фиксированную функцию перевода для пространства имён "about"
  // getFixedT фиксирует пространство имён, поэтому используется t("title") вместо t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // Извлечь пакеты переводов из экземпляра i18n
  // Эти данные передаются в I18nProvider для гидратации i18n на стороне клиента
  // Предотвращает FOUC (вспышку непереведённого контента) и избегает повторного запроса
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### Шаг 10: Использование переводов в клиентских компонентах

Клиентские компоненты могут использовать хук `useTranslation` для доступа к переводам. Этот хук предоставляет функцию перевода и экземпляр i18n, что позволяет переводить контент и получать информацию о локали.

Клиентским компонентам необходимы React хуки для доступа к переводам. Хук `useTranslation` интегрируется с i18next и обеспечивает реактивное обновление при изменении локали.

> Убедитесь, что страница/провайдер включает только необходимые пространства имён (например, `about`).  
> Если вы используете React < 19, мемоизируйте тяжёлые форматтеры, такие как `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Пример клиентского компонента с использованием React hooks для переводов
 * Можно использовать хуки, такие как useState, useEffect и useTranslation
 */
const ClientComponent = () => {
  // Хук useTranslation предоставляет доступ к функции перевода и экземпляру i18n
  // Указываем namespace, чтобы загружать только переводы для пространства "about"
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Создаем форматтер чисел с учетом локали
  // i18n.language предоставляет текущую локаль (например, "en", "fr")
  // Intl.NumberFormat форматирует числа согласно локальным стандартам
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Форматирование числа с учетом локали */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

### Шаг 11: Использование переводов в серверных компонентах

Серверные компоненты не могут использовать React hooks, поэтому они получают переводы через props от своих родительских компонентов. Такой подход сохраняет синхронность серверных компонентов и позволяет вкладывать их внутрь клиентских компонентов.

Серверные компоненты, которые могут быть вложены в клиентские границы, должны быть синхронными. Передавая переведённые строки и информацию о локали через props, мы избегаем асинхронных операций и обеспечиваем корректный рендеринг.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Функция перевода, переданная от родительского серверного компонента
  // Серверные компоненты не могут использовать hooks, поэтому переводы приходят через props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Пример серверного компонента - получает переводы через props
 * Может быть вложен в клиентские компоненты (асинхронные серверные компоненты)
 * Не может использовать React hooks, поэтому все данные должны поступать через props или асинхронные операции
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Форматирование числа на сервере с использованием локали
  // Выполняется на сервере во время SSR, улучшая начальную загрузку страницы
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Использование функции перевода, переданной через props */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (Необязательно) Шаг 12: Изменение языка вашего контента

Для изменения языка вашего контента в Next.js рекомендуется использовать URL с префиксом локали и ссылки Next.js. Пример ниже считывает текущую локаль из маршрута, удаляет её из пути и отображает по одной ссылке для каждой доступной локали.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="Выбор языка">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

        const href =
          locale === defaultLocale ? basePath : `/${locale}${basePath}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "page" : undefined}
            onClick={() => {
              document.cookie = getCookie(locale);
            }}
          >
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (Необязательно) Шаг 13: Создание локализованного компонента Link

Повторное использование локализованных URL по всему вашему приложению обеспечивает согласованную навигацию и улучшает SEO. Оберните `next/link` в небольшой помощник, который добавляет префикс активной локали к внутренним маршрутам, оставляя внешние URL без изменений.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> Совет: Поскольку `LocalizedLink` является заменой "drop-in", мигрируйте постепенно, меняя импорты и позволяя компоненту обрабатывать URL-адреса, специфичные для локали.

### (Опционально) Шаг 14: Доступ к активной локали внутри Server Actions

Server Actions часто нуждаются в текущей локали для писем, логирования или интеграций с третьими сторонами. Объедините cookie с локалью, установленной вашим прокси, с заголовком `Accept-Language` в качестве резервного варианта.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// Пример server action, который использует текущую локаль
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Используйте локаль для локализованных побочных эффектов (электронные письма, CRM и т.д.)
  console.log(`Stuff from server with locale ${locale}`);
}
```

> Поскольку помощник использует cookies и заголовки Next.js, он работает в Route Handlers, Server Actions и других контекстах, доступных только на сервере.

### (Необязательно) Шаг 15: Интернационализация ваших метаданных

Перевод контента важен, но основная цель интернационализации — сделать ваш сайт более заметным для всего мира. I18n — это мощный инструмент для улучшения видимости вашего сайта через правильное SEO.

Правильно интернационализированные метаданные помогают поисковым системам понять, какие языки доступны на ваших страницах. Это включает установку метатегов hreflang, перевод заголовков и описаний, а также обеспечение корректной установки канонических URL для каждой локали.

Вот список лучших практик по многоязычному SEO:

- Устанавливайте метатеги hreflang в теге `<head>`, чтобы помочь поисковым системам понять, какие языки доступны на странице
- Перечисляйте все переводы страниц в sitemap.xml, используя XML-схему `http://www.w3.org/1999/xhtml`
- Не забывайте исключать страницы с префиксами из robots.txt (например, `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- Используйте кастомный компонент Link для перенаправления на наиболее локализованную страницу (например, на французском `<a href="/fr/about">À propos</a>`)

Разработчики часто забывают правильно ссылаться на свои страницы в разных локалях. Исправим это:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Генерирует SEO метаданные для каждой локальной версии страницы
 * Эта функция выполняется для каждого локали во время сборки
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Динамически импортировать файл перевода для этой локали
  // Используется для получения переведённого заголовка и описания для метаданных
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Создать отображение hreflang для всех локалей
  // Помогает поисковым системам понять языковые альтернативы
  // Формат: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // Канонический URL для этой локальной версии
      canonical: absoluteUrl(locale, "/about"),
      // Языковые альтернативы для SEO (теги hreflang)
      // "x-default" указывает версию локали по умолчанию
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>О нас</h1>;
}
```

### (Необязательно) Шаг 16: Интернационализация вашей карты сайта

Создайте карту сайта, которая включает все версии страниц для каждой локали. Это помогает поисковым системам обнаруживать и индексировать все языковые версии вашего контента.

Правильно интернационализированная карта сайта гарантирует, что поисковые системы смогут найти и индексировать все языковые версии ваших страниц. Это улучшает видимость в международных результатах поиска.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Форматирование локализованного пути в зависимости от локали
const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Получить карту всех локалей и их локализованных путей
 *
 * Пример вывода:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Генерация карты сайта со всеми вариантами локалей для улучшения SEO
// Поле alternates сообщает поисковым системам о языковых версиях
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (Необязательно) Шаг 17: Интернационализация вашего файла robots.txt

Создайте файл robots.txt, который корректно обрабатывает все языковые версии ваших защищённых маршрутов. Это гарантирует, что поисковые системы не будут индексировать страницы админки или панели управления на любом языке.

Правильная настройка robots.txt для всех локалей предотвращает индексацию поисковыми системами конфиденциальных страниц на любом языке. Это важно для безопасности и конфиденциальности.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Генерируем пути для всех локалей (например, /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (Необязательно) Шаг 18: Настройка Middleware для маршрутизации по локали

Создайте прокси, который автоматически определяет предпочитаемую пользователем локаль и перенаправляет его на соответствующий URL с префиксом локали. Это улучшает пользовательский опыт, показывая контент на предпочитаемом языке.

Middleware гарантирует, что пользователи автоматически перенаправляются на предпочитаемый язык при посещении вашего сайта. Также сохраняет предпочтение пользователя в cookie для будущих посещений.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Регулярное выражение для сопоставления файлов с расширениями (например, .js, .css, .png)
// Используется для исключения статических ресурсов из маршрутизации по локали
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Извлекает локаль из заголовка Accept-Language
 * Обрабатывает форматы, такие как "fr-CA", "en-US" и т.д.
 * Возвращает локаль по умолчанию, если язык браузера не поддерживается
 */
const pickLocale = (accept: string | null) => {
  // Получить предпочтительный язык пользователя (например, "fr-CA" из "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Извлечь основной код языка (например, "fr" из "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Проверить, поддерживаем ли мы эту локаль, иначе использовать локаль по умолчанию
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Прокси Next.js для определения локали и маршрутизации
 * Выполняется при каждом запросе перед рендерингом страницы
 * Автоматически перенаправляет на URL с префиксом локали при необходимости
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Пропустить прокси для внутренних маршрутов Next.js, API маршрутов и статических файлов
  // Для них не нужен префикс локали
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Проверить, есть ли в URL уже префикс локали
  // Пример: "/fr/about" или "/en" вернут true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Если префикс локали отсутствует, определить локаль и выполнить перенаправление
  if (!hasLocale) {
    // Сначала попытаться получить локаль из cookie (предпочтение пользователя)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Использовать локаль из cookie, если она валидна, иначе определить из заголовков браузера
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Клонировать URL для изменения pathname
    const url = request.nextUrl.clone();
    // Добавить префикс локали к pathname
    // Особая обработка корневого пути, чтобы избежать двойного слеша
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Создать ответ с перенаправлением и установить cookie локали
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Совпадение со всеми путями, кроме:
    // - API маршрутов (/api/*)
    // - Внутренних путей Next.js (/_next/*)
    // - Статических файлов (/static/*)
    // - Файлов с расширениями (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Опционально) Шаг 19: Автоматизируйте ваши переводы с помощью Intlayer

Intlayer — это **бесплатная** и **открытая** библиотека, созданная для помощи в процессе локализации вашего приложения. В то время как i18next отвечает за загрузку и управление переводами, Intlayer помогает автоматизировать рабочий процесс перевода.

Управление переводами вручную может занимать много времени и быть подвержено ошибкам. Intlayer автоматизирует тестирование, генерацию и управление переводами, экономя ваше время и обеспечивая согласованность по всему приложению.

Intlayer позволяет вам:

- **Объявлять ваш контент там, где вы хотите, в вашем коде**
  Intlayer позволяет объявлять ваш контент там, где вы хотите, в вашем коде, используя файлы `.content.{ts|js|json}`. Это обеспечит лучшую организацию вашего контента, улучшая читаемость и поддерживаемость вашей codebase.

- **Тестировать отсутствующие переводы**
  Intlayer предоставляет функции тестирования, которые можно интегрировать в ваш CI/CD pipeline или в ваши модульные тесты. Узнайте больше о [тестировании ваших переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/testing.md).

- **Автоматизация ваших переводов**,
  Intlayer предоставляет CLI и расширение для VSCode для автоматизации ваших переводов. Это можно интегрировать в ваш CI/CD pipeline. Узнайте больше о [автоматизации ваших переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).
  Вы можете использовать **свой собственный API-ключ и выбранного вами AI-провайдера**. Также поддерживаются контекстно-зависимые переводы, см. [заполнение контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/autoFill.md).

- **Подключение внешнего контента**
- **Автоматизация переводов**  
  Intlayer предоставляет CLI и расширение для VSCode для автоматизации ваших переводов. Это можно интегрировать в ваш CI/CD pipeline. Узнайте больше о [автоматизации переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).  
  Вы можете использовать **собственный API ключ и выбранного вами AI провайдера**. Также поддерживаются контекстно-зависимые переводы, смотрите [заполнение контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/autoFill.md).

- **Подключение внешнего контента**  
  Intlayer позволяет подключать ваш контент к внешней системе управления контентом (CMS). Для оптимального получения данных и вставки их в ваши JSON ресурсы. Узнайте больше о [получении внешнего контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/function_fetching.md).

- **Визуальный редактор**  
  Intlayer предлагает бесплатный визуальный редактор для редактирования вашего контента. Узнайте больше о [визуальном редактировании переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

И многое другое. Чтобы узнать обо всех возможностях Intlayer, пожалуйста, обратитесь к [документации по интересу Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md).
