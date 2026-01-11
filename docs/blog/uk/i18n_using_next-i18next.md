---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Як інтернаціоналізувати ваш додаток Next.js за допомогою next-i18next
description: Налаштуйте i18n з next-i18next — найкращі практики та поради з SEO для багатомовних застосунків Next.js, що охоплюють інтернаціоналізацію, організацію контенту та технічне налаштування.
keywords:
  - next-i18next
  - i18next
  - Інтернаціоналізація
  - Блог
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Початкова версія
---

# Як інтернаціоналізувати ваш додаток Next.js за допомогою next-i18next у 2025 році

## Зміст

<TOC/>

## Що таке next-i18next?

**next-i18next** — популярне рішення для інтернаціоналізації (i18n) застосунків Next.js. Хоча оригінальний пакет `next-i18next` був розроблений для Pages Router, цей посібник показує, як реалізувати i18next з сучасним **App Router**, використовуючи безпосередньо `i18next` і `react-i18next`.

За допомогою цього підходу ви можете:

- **Організовувати переклади** за допомогою просторів імен (namespaces) (наприклад, `common.json`, `about.json`) для кращого керування контентом.
- **Завантажувати переклади ефективно** — завантажуючи лише ті простори імен, які потрібні для кожної сторінки, що зменшує розмір бандла.
- **Підтримувати як серверні, так і клієнтські компоненти** з правильною обробкою SSR та гідратації.
- **Забезпечити підтримку TypeScript** з типобезпечною конфігурацією локалі та ключів перекладу.
- **Оптимізуйте для SEO** з правильними метаданими, sitemap та інтернаціоналізацією robots.txt.

> Як альтернативу, ви також можете звернутися до [посібника next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_next-intl.md), або безпосередньо використовуючи [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md).

> Див. порівняння у [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md).

## Практики, яких слід дотримуватися

Перш ніж перейти до реалізації, ось кілька практик, яких слід дотримуватися:

- **Встановіть атрибути HTML `lang` та `dir`**
  У вашому layout обчисліть `dir` за допомогою `getLocaleDirection(locale)` і встановіть `<html lang={locale} dir={dir}>` для належної доступності та SEO.
- **Split messages by namespace**
  Організуйте JSON-файли за локаллю та неймспейсом (наприклад, `common.json`, `about.json`), щоб завантажувати лише те, що потрібно.
- **Minimize client payload**
  На сторінках надсилайте до `NextIntlClientProvider` лише потрібні неймспейси (наприклад, `pick(messages, ['common', 'about'])`).
- **Prefer static pages**
  Віддавайте перевагу статичним сторінкам і використовуйте їх якомога частіше для кращої продуктивності та SEO.
- **I18n in server components**
  Серверні компоненти, як-от pages або всі компоненти, що не позначені як `client`, є статичними і можуть бути попередньо зрендерені під час збірки. Тому нам доведеться передавати їм функції перекладу як пропси.
- **Set up TypeScript types**
  Налаштуйте типи TypeScript для забезпечення типобезпеки у вашому додатку.
  Для ваших локалей, щоб забезпечити безпеку типів у всьому вашому застосунку.
- **Проксі для перенаправлення**
  Використовуйте proxy для обробки визначення локалі та маршрутизації й перенаправляйте користувача на відповідний URL з префіксом локалі.
- **Інтернаціоналізація ваших metadata, sitemap, robots.txt**
  Інтернаціоналізуйте ваші metadata, sitemap, robots.txt за допомогою функції `generateMetadata`, наданої Next.js, щоб забезпечити кращу індексацію пошуковими системами для всіх локалей.
- **Локалізація посилань**
  Локалізуйте посилання, використовуючи компонент `Link`, щоб перенаправляти користувача на відповідний URL з префіксом локалі. Це важливо для забезпечення індексації ваших сторінок у всіх локалях.
- **Автоматизація тестів та перекладів**
  Автоматизація тестів та перекладів допомагає заощаджувати час на підтримку вашого багатомовного застосунку.

> Дивіться нашу документацію, яка містить усе, що потрібно знати про інтернаціоналізацію та SEO: [Інтернаціоналізація (i18n) з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/internationalization_and_SEO.md).

---

## Покроковий посібник з налаштування i18next у застосунку Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демонстрація CodeSandbox — як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Дивіться [Шаблон застосунку](https://github.com/aymericzip/next-i18next-template) на GitHub.

Ось структура проєкту, яку ми створимо:

```bash
.
├── i18n.config.ts
└── src # Папка src необов'язкова
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
    │       ├── (home) # / (група маршрутів, щоб не засмічувати всі сторінки повідомленнями головної)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about (сторінка "about")
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Крок 1: Встановіть залежності

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: Основний фреймворк для інтернаціоналізації, який відповідає за завантаження та керування перекладами.
- **react-i18next**: React-байндинги для i18next, що надають хуки, такі як `useTranslation`, для клієнтських компонентів.
- **i18next-resources-to-backend**: Плагін, який дозволяє динамічно завантажувати файли перекладів, даючи змогу підвантажувати лише ті простори імен (namespaces), які потрібні.

### Крок 2: Налаштуйте свій проєкт

Створіть файл конфігурації, щоб визначити підтримувані локалі, локаль за замовчуванням та допоміжні функції для локалізації URL. Цей файл слугує єдиним джерелом істини для вашої i18n-настройки та забезпечує безпечність типів у всьому застосунку.

Централізація конфігурації локалей запобігає невідповідностям і спрощує додавання або видалення локалей у майбутньому. Допоміжні функції забезпечують узгоджене формування URL для SEO та маршрутизації.

```ts fileName="i18n.config.ts"
// Визначаємо підтримувані локалі як const-масив для безпечності типів
// Уточнення 'as const' змушує TypeScript виводити літеральні типи замість string[]
export const locales = ["en", "fr"] as const;

// Витягуємо тип Locale з масиву locales
// Це створює union-тип: "en" | "fr"
export type Locale = (typeof locales)[number];

// Мова за замовчуванням, яка використовується, коли мова не вказана
export const defaultLocale: Locale = "en";

// Мови з напрямком справа наліво, що потребують спеціальної обробки напрямку тексту
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Перевіряє, чи потребує мова напрямку RTL (справа наліво)
// Використовується для мов, таких як арабська, іврит, перська та урду
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Генерує локалізований шлях для заданої мови та шляху
// Шляхи для мови за замовчуванням не мають префікса (наприклад, "/about" замість "/en/about")
// Інші мови мають префікс (наприклад, "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// Базовий URL для абсолютних адрес (використовується в sitemap, метаданих тощо)
const ORIGIN = "https://example.com";

// Генерує абсолютний URL з префіксом локалі
// Використовується для SEO-метаданих, sitemap'ів і канонічних URL
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Використовується для встановлення cookie локалі в браузері
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 рік
    "SameSite=Lax",
  ].join("; ");
}
```

### Крок 3: Централізація просторів імен перекладів

Створіть єдине джерело істини для кожного простору імен (namespace), який надає ваша аплікація. Повторне використання цього списку дозволяє синхронізувати код на сервері, клієнті та в інструментах і відкриває можливість суворої типізації для допоміжних функцій перекладу.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Крок 4: Сувора типізація ключів перекладу за допомогою TypeScript

Розширіть `i18next`, щоб вказати на ваші канонічні мовні файли (зазвичай англійські). TypeScript потім виведе дійсні ключі для кожного простору імен, тож виклики `t()` перевіряються повністю.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/uk/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> Порада: Збережіть це оголошення в каталозі `src/types` (створіть папку, якщо вона не існує). Next.js вже включає `src` у `tsconfig.json`, тому розширення буде підхоплене автоматично. Якщо ні, додайте наступне до вашого файлу `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

З цим налаштованим ви можете покладатися на автозаповнення та перевірки під час компіляції:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// OK, типізовано: t("counter.increment")
// ПОМИЛКА, помилка компіляції: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Крок 5: Налаштування серверної ініціалізації i18n

Створіть функцію ініціалізації на сервері, яка завантажує переклади для серверних компонентів. Ця функція створює окремий екземпляр i18next для рендерингу на сервері, забезпечуючи завантаження перекладів перед рендерингом.

Серверні компоненти потребують власного екземпляра i18next, оскільки вони виконуються в іншому контексті, ніж клієнтські компоненти. Попереднє завантаження перекладів на сервері запобігає міганню неперекладеного вмісту та покращує SEO, гарантуючи, що пошукові системи бачать перекладений вміст.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Налаштування динамічного завантаження ресурсів для i18next
// Ця функція динамічно імпортує JSON-файли перекладів на основі locale і namespace
// Приклад: locale="fr", namespace="about" -> імпортує "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Ініціалізує екземпляр i18next для рендерингу на сервері
 *
 * @returns Ініціалізований екземпляр i18next, готовий до використання на сервері
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Створити новий екземпляр i18next (відокремлений від клієнтського екземпляру)
  const i18n = createInstance();

  // Ініціалізувати з інтеграцією для React та завантажувачем ресурсів (backend)
  await i18n
    .use(initReactI18next) // Увімкнути підтримку React hooks
    .use(backend) // Увімкнути динамічне завантаження ресурсів
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Завантажувати лише вказані простори імен для кращої продуктивності
      defaultNS: "common", // Простір імен за замовчуванням, коли жоден не вказаний
      interpolation: { escapeValue: false }, // Не екранувати HTML (React відповідає за захист від XSS)
      react: { useSuspense: false }, // Вимкнути Suspense для сумісності з SSR
      returnNull: false, // Повернути порожній рядок замість null для відсутніх ключів
      initImmediate: false, // Відкласти ініціалізацію до завантаження ресурсів (швидший SSR)
    });
  return i18n;
}
```

### Крок 6: Створіть клієнтський провайдер i18n

Створіть клієнтський компонент-провайдер, який обгортає ваш додаток контекстом i18next. Цей провайдер отримує попередньо завантажені переклади з сервера, щоб запобігти мерехтінню неперекладеного вмісту (FOUC) та уникнути дублювання запитів.

Клієнтським компонентам потрібен власний екземпляр i18next, що працює в браузері. Приймаючи попередньо завантажені ресурси з сервера, ми забезпечуємо безшовну гідратацію та запобігаємо мерехтінню контенту. Провайдер також динамічно керує зміною локалі та завантаженням namespace.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Налаштування динамічного завантаження ресурсів на клієнті
// Та ж сама схема, що й на сервері, але цей екземпляр працює в браузері
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Попередньо завантажені ресурси з сервера (запобігає FOUC — мерехтінню неперекладеного вмісту)
  // Формат: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Клієнтський i18n provider, який обгортає додаток контекстом i18next
 * Отримує попередньо завантажені ресурси з сервера, щоб уникнути повторного запиту перекладів
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Створює інстанс i18n лише один раз за допомогою лінивої ініціалізації useState
  // Це гарантує, що інстанс створюється лише один раз, а не при кожному рендері
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Якщо ресурси надані (з сервера), використовуйте їх, щоб уникнути запитів на клієнті
        // Це запобігає FOUC і покращує початкову продуктивність завантаження
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Запобігає поверненню значень undefined
      });

    return i18nInstance;
  });

  // Оновлює мову, коли змінюється prop locale
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Переконується, що всі необхідні namespaces завантажені на клієнті
  // Використання join("|") як залежності для правильного порівняння масивів
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Надати екземпляр i18n усім дочірнім компонентам через React context
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Крок 7: Визначення динамічних маршрутів локалей

Налаштуйте динамічну маршрутизацію для локалей, створивши директорію `[locale]` у вашій папці app. Це дозволяє Next.js обробляти маршрути залежно від локалі, де кожна локаль стає сегментом URL (наприклад, `/en/about`, `/fr/about`).

Використання динамічних маршрутів дозволяє Next.js генерувати статичні сторінки для всіх локалей під час збірки, що покращує продуктивність і SEO. Компонент layout встановлює HTML-атрибути `lang` та `dir` на основі локалі, що має вирішальне значення для доступності та розуміння сторінки пошуковими системами.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Вимкнути динамічні параметри — усі локалі повинні бути відомі на етапі збірки
// Це забезпечує статичну генерацію для всіх маршрутів локалей
export const dynamicParams = false;

/**
 * Згенерувати статичні параметри для всіх локалей на етапі збірки
 * Next.js буде попередньо рендерити сторінки для кожної локалі, що повернена тут
 * Приклад: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Кореневий layout-компонент, який обробляє атрибути HTML для конкретної локалі
 * Встановлює атрибут lang і напрямок тексту (ltr/rtl) залежно від локалі
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Перевіряємо locale з параметрів URL
  // Якщо вказано недійсну locale, використовуємо defaultLocale
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // Визначаємо напрямок тексту залежно від locale
  // Мови з написанням справа наліво (RTL), такі як арабська, потребують dir="rtl" для правильного відображення тексту
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Крок 8: Створіть файли перекладів

Створіть JSON-файли для кожного locale та namespace. Така структура дозволяє логічно організувати переклади та завантажувати лише те, що потрібно для кожної сторінки.

Організація перекладів за неймспейсами (наприклад, `common.json`, `about.json`) дозволяє розділяти код (code splitting) і зменшувати розмір бандла. Ви завантажуєте лише переклади, потрібні для кожної сторінки, що покращує продуктивність.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Додаток Next.js i18n",
  "appDescription": "Приклад додатку Next.js з інтернаціоналізацією за допомогою i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Додаток Next.js i18n",
  "appDescription": "Приклад додатку Next.js з інтернаціоналізацією за допомогою i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Головна",
  "description": "Опис головної сторінки",
  "welcome": "Ласкаво просимо",
  "greeting": "Привіт, світ!",
  "aboutPage": "Сторінка «Про»",
  "documentation": "Документація"
}
```

```json fileName="src/locales/fr/home.json"
{
  "title": "Головна",
  "description": "Опис головної сторінки",
  "welcome": "Ласкаво просимо",
  "greeting": "Привіт, світ!",
  "aboutPage": "Сторінка «Про»",
  "documentation": "Документація"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "Про",
  "description": "Опис сторінки «Про»",
  "counter": {
    "label": "Лічильник",
    "increment": "Збільшити",
    "description": "Натисніть кнопку, щоб збільшити лічильник"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "Про",
  "description": "Опис сторінки «Про»",
  "counter": {
    "label": "Лічильник",
    "increment": "Збільшити",
    "description": "Натисніть кнопку, щоб збільшити лічильник"
  }
}
```

### Крок 9: Використовуйте переклади на своїх сторінках

Створіть компонент сторінки, який ініціалізує i18next на сервері та передає переклади як серверним, так і клієнтським компонентам. Це гарантує завантаження перекладів перед рендерінгом і запобігає мерехтінню контенту.

Ініціалізація на сервері завантажує переклади до того, як сторінка буде відрендерена, що покращує SEO та запобігає FOUC (Flash of Unstyled Content). Передаючи попередньо завантажені ресурси провайдеру на клієнті, ми уникаємо повторних запитів і забезпечуємо плавну гідратацію.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Серверна сторінка-компонент, яка ініціалізує i18n
 * Попередньо завантажує переклади на сервері і передає їх клієнтським компонентам
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Визначає, які простори імен перекладів потрібні цій сторінці
  // Використовує централізований список для безпеки типів та автодоповнення
  const pageNamespaces = allNamespaces;

  // Ініціалізує i18next на сервері з потрібними просторами імен
  // Це завантажує JSON-файли перекладів на стороні сервера
  const i18n = await initI18next(locale, pageNamespaces);

  // Отримати фіксовану функцію перекладу для простору імен "about"
  // getFixedT фіксує простір імен, тож можна викликати t("title") замість t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // Витягнути бандли перекладів з екземпляра i18n
  // Ці дані передаються в I18nProvider для гідратації i18n на клієнті
  // Запобігає FOUC (Flash of Untranslated Content — миготінню неперекладеного вмісту) та уникає дубльованих запитів
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

### Крок 10: Використання перекладів у клієнтських компонентах

Клієнтські компоненти можуть використовувати хук `useTranslation` для доступу до перекладів. Цей хук надає доступ до функції перекладу та екземпляра i18n, що дозволяє перекладати вміст та отримувати інформацію про локаль.

Клієнтські компоненти потребують React-хуків для доступу до перекладів. Хук `useTranslation` органічно інтегрується з i18next і забезпечує реактивне оновлення при зміні локалі.

> Переконайтеся, що сторінка/провайдер містить лише ті простори імен (namespaces), які вам потрібні (наприклад, `about`).  
> Якщо ви використовуєте React < 19, мемоізуйте важкі форматтери, наприклад `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Приклад клієнтського компонента, що використовує React hooks для перекладів
 * Можна використовувати хуки, такі як useState, useEffect та useTranslation
 */
const ClientComponent = () => {
  // Хук useTranslation надає доступ до функції перекладу та екземпляру i18n
  // Вкажіть namespace, щоб завантажити лише переклади для неймспейсу "about"
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Створюємо форматер чисел, враховуючий локаль
  // i18n.language повертає поточну локаль (наприклад, "en", "fr")
  // Intl.NumberFormat форматуватиме числа згідно з локальними правилами
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Форматувати число з урахуванням локалі */}
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

### Крок 11: Використання перекладів у серверних компонентах

Серверні компоненти не можуть використовувати React hooks, тому вони отримують переклади через props від батьківських компонентів. Такий підхід робить серверні компоненти синхронними і дозволяє вкладати їх у клієнтські компоненти.

Серверні компоненти, які можуть бути вкладені в client boundaries, мають бути синхронними. Передаючи перекладені рядки та інформацію про локаль як props, ми уникаємо асинхронних операцій і забезпечуємо коректне рендерення.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Функція перекладу, передана від батьківського серверного компонента
  // Серверні компоненти не можуть використовувати hooks, тому переклади надходять через props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Приклад Server component - отримує переклади через props
 * Може бути вкладений у client components (async server components)
 * Не може використовувати React hooks, тому всі дані повинні надходити через props або через асинхронні операції
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Форматує число на сервері, використовуючи locale
  // Це виконується на сервері під час SSR, що покращує початкове завантаження сторінки
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Використовує функцію перекладу, передану через props */}
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

### (Необов'язково) Крок 12: Змініть мову вашого контенту

Щоб змінити мову вашого контенту в Next.js, рекомендовано використовувати URL-адреси з префіксом локалі та компоненти Link від Next.js. Приклад нижче зчитує поточну локаль з маршруту, видаляє її з pathname і рендерить по одному посиланню для кожної доступної локалі.

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

  // Повертає локалізовану мітку для даної локалі або код локалі у верхньому регістрі
  const getLocaleLabel = (locale: Locale): string => {
    try {
      // Використовує Intl.DisplayNames для отримання назви мови на відповідній локалі
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      // Якщо Intl не підтримується або сталася помилка, повертаємо код локалі у верхньому регістрі
      return locale.toUpperCase();
    }
  };

  // Обчислює базовий шлях без префікса локалі
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
    <nav aria-label="Вибір мови">
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

### (Необов'язково) Крок 13: Створіть локалізований компонент Link

Повторне використання локалізованих URL у вашому додатку зберігає навігацію послідовною та дружньою до SEO. Обгорніть `next/link` у невеликий хелпер, який додає префікс активної локалі до внутрішніх маршрутів, залишаючи зовнішні URL без змін.

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

> Порада: Оскільки `LocalizedLink` є drop-in replacement, мігруйте поступово, замінюючи імпорти та дозволяючи компоненту обробляти URL-адреси, специфічні для локалі.

### (Необов'язково) Крок 14: Доступ до активної локалі всередині Server Actions

Server Actions часто потребують поточної локалі для email-розсилок, логування або інтеграцій зі сторонніми сервісами. Поєднайте cookie локалі, встановлене вашим проксі, із заголовком `Accept-Language` як fallback.

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

// Приклад Server Action, який використовує поточну локаль
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Використовуйте локаль для локалізованих побічних ефектів (електронні листи, CRM тощо)
  console.log(`Stuff from server with locale ${locale}`);
}
```

> Оскільки цей хелпер спирається на cookies і headers Next.js, він працює в Route Handlers, Server Actions та інших серверних контекстах.

### (Необов'язково) Крок 15: Інтернаціоналізуйте метадані

Переклад контенту важливий, але основна мета інтернаціоналізації — зробити ваш вебсайт більш помітним для світу. I18n — потужний інструмент для підвищення видимості сайту завдяки належному SEO.

Правильно інтернаціоналізовані метадані допомагають пошуковим системам зрозуміти, які мови доступні на ваших сторінках. Це включає встановлення meta-тегів hreflang, переклад заголовків і описів, а також забезпечення правильного налаштування canonical URLs для кожної локалі.

Ось список кращих практик щодо багатомовного SEO:

- Встановіть hreflang мета-теги у елементі `<head>`, щоб допомогти пошуковим системам зрозуміти, які мови доступні на сторінці
- Перелічіть усі переклади сторінки в sitemap.xml, використовуючи XML-схему `http://www.w3.org/1999/xhtml`
- Не забудьте виключити сторінки з префіксами з robots.txt (наприклад, `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- Використовуйте кастомний компонент Link для перенаправлення на найбільш локалізовану сторінку (наприклад, французькою `<a href="/fr/about">À propos</a>`)

Розробники часто забувають правильно посилатися на свої сторінки в різних локалях. Виправимо це:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Генерує SEO-метадані для кожної локалізованої версії сторінки
 * Ця функція виконується для кожної локалі під час збірки
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Динамічно імпортує файл перекладу для цієї локалі
  // Використовується для отримання перекладеного заголовка та опису для метаданих
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Створює мапу hreflang для всіх локалей
  // Допомагає пошуковим системам зрозуміти альтернативи мов
  // Формат: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // Канонічний URL для цієї локалі
      canonical: absoluteUrl(locale, "/about"),
      // Варіанти мов для SEO (теги hreflang)
      // "x-default" вказує на версію за замовчуванням
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>Про</h1>;
}
```

### (Необов'язково) Крок 16: Інтернаціоналізуйте ваш Sitemap

Згенеруйте карту сайту (sitemap), яка включає всі локалізовані версії ваших сторінок. Це допомагає пошуковим системам знаходити та індексувати всі мовні версії вашого контенту.

Коректно інтернаціоналізована карта сайту гарантує, що пошукові системи можуть знайти та індексувати всі мовні версії ваших сторінок. Це підвищує видимість у міжнародних результатах пошуку.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Отримати мапу всіх локалей та їх локалізованих шляхів
 *
 * Приклад вихідних даних:
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

// Генерує sitemap з усіма мовними варіантами для кращого SEO
// Поле alternates повідомляє пошуковим системам про мовні версії
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

### (Необов'язково) Крок 17: Інтернаціоналізуйте ваш robots.txt

Створіть файл robots.txt, який правильно обробляє всі мовні версії ваших захищених маршрутів. Це гарантує, що пошукові системи не індексують сторінки адміністратора або панелі керування жодною мовою.

Правильна конфігурація robots.txt для всіх локалей запобігає індексації чутливих сторінок пошуковими системами будь-якою мовою. Це критично важливо для безпеки та конфіденційності.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Генерує шляхи для всіх локалей (наприклад, /admin, /fr/admin, /es/admin)
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

### (Необов'язково) Крок 18: Налаштуйте middleware для маршрутизації локалей

Створіть проксі, який автоматично визначає переважну локаль користувача та перенаправляє його на відповідний URL з префіксом локалі. Це покращує досвід користувача, відображаючи контент обраною мовою.

Middleware гарантує, що користувачі автоматично перенаправляються на свою переважну мову під час відвідування сайту. Воно також зберігає мовні вподобання користувача в cookie для майбутніх відвідувань.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Регекс для відповідності файлів з розширеннями (наприклад, .js, .css, .png)
// Використовується, щоб виключити статичні ресурси з маршрутизації за локаллю
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Витягує локаль з заголовка Accept-Language
 * Підтримує формати на кшталт "fr-CA", "en-US" тощо.
 * Повертає локаль за замовчуванням, якщо мова браузера не підтримується
 */
const pickLocale = (accept: string | null) => {
  // Отримати першу мовну перевагу (наприклад, "fr-CA" з "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Витягти базовий код мови (наприклад, "fr" з "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Перевірити, чи підтримується ця локаль; інакше використовувати локаль за замовчуванням
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Проксі Next.js для визначення локалі та маршрутизації
 * Виконується для кожного запиту перед рендерингом сторінки
 * Автоматично перенаправляє на URL з префіксом локалі, коли це необхідно
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Пропустити проксі для внутрішніх шляхів Next.js, API-роутів і статичних файлів
  // Ці шляхи не повинні мати префікс локалі
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Перевірити, чи URL вже містить префікс локалі
  // Приклад: "/fr/about" або "/en" повернуть true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Якщо префікс локалі відсутній — визначаємо локаль і робимо перенаправлення
  if (!hasLocale) {
    // Спочатку намагаємося отримати локаль з cookie (налаштування користувача)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Використовуємо локаль з cookie, якщо вона дійсна; інакше визначаємо за заголовками браузера
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Клонуємо URL, щоб змінити pathname
    const url = request.nextUrl.clone();
    // Додаємо префікс локалі до pathname
    // Особливо обробляємо кореневий шлях, щоб уникнути подвійного слешу
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Створити відповідь з перенаправленням і встановити cookie з локаллю
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Відповідає всім шляхам, крім:
    // - API маршрути (/api/*)
    // - Внутрішні шляхи Next.js (/_next/*)
    // - Статичні файли (/static/*)
    // - Файли з розширеннями (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Необов'язково) Крок 19: Автоматизуйте ваші переклади за допомогою Intlayer

Intlayer — це **безкоштовна** та **з відкритим вихідним кодом** бібліотека, створена для допомоги у процесі локалізації вашого застосунку. Поки i18next відповідає за завантаження та управління перекладами, Intlayer допомагає автоматизувати робочий процес перекладів.

Керування перекладами вручну може займати багато часу й бути схильним до помилок. Intlayer автоматизує тестування, генерацію та керування перекладами, заощаджуючи ваш час і забезпечуючи послідовність у всьому додатку.

Intlayer дозволяє вам:

- **Оголошуйте свій контент там, де вам зручно в codebase**
  Intlayer дозволяє оголошувати ваш контент там, де потрібно в codebase за допомогою файлів `.content.{ts|js|json}`. Це дає змогу краще організувати контент, забезпечуючи кращу читабельність та підтримуваність codebase.

- **Перевірка відсутніх перекладів**
  Intlayer надає функції тестування, які можна інтегрувати у ваш CI/CD pipeline або в модульні тести. Дізнайтеся більше про [тестування ваших перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/testing.md).

- **Автоматизуйте ваші переклади**,
  Intlayer надає CLI та розширення для VSCode для автоматизації ваших перекладів. Це можна інтегрувати у ваш CI/CD pipeline. Дізнайтеся більше про [автоматизацію перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).
  Ви можете використовувати свій **власний API-ключ та AI-провайдера на ваш вибір**. Також він забезпечує контекстно-залежні переклади, див. [заповнення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md).

- **Підключення зовнішнього контенту**
  Intlayer дозволяє підключати ваш контент до зовнішньої системи керування контентом (CMS), щоб отримувати його оптимізовано та вставляти у ваші JSON-ресурси. Дізнайтеся більше про [отримання зовнішнього контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/function_fetching.md).

- **Візуальний редактор**
  Intlayer пропонує безкоштовний візуальний редактор для редагування вашого контенту. Дізнайтеся більше про [візуальне редагування ваших перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

І це ще не все. Щоб дізнатися про всі можливості, які надає Intlayer, будь ласка, перегляньте [документацію «Переваги Intlayer»](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).
