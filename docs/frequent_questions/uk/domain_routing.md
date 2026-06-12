---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Як налаштувати маршрутизацію на основі домену?
description: Дізнайтеся, як налаштувати маршрутизацію на основі домену.
keywords:
  - домен
  - маршрутизація
  - intlayer
  - конфігурація
  - middleware
  - react-router
  - vue-router
  - next.js
  - vite
  - фреймворк
slugs:
  - frequent-questions
  - domain-routing
author: aymericzip
---

# Як налаштувати **маршрутизацію на основі домену** в Intlayer замість шляхів `/[locale]/`?

## Коротка відповідь

Маршрутизація на основі домену простіша за маршрутизацію через шляхи (`example.com/[locale]/`), оскільки ви можете пропустити всю конфігурацію middleware та маршрутизації. Просто розгорніть ваш додаток на кожному мовному домені та встановіть по одній змінній оточення для кожного домену.

## Покроково

1. **Розгорніть додаток окремо для кожного домену** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. Для кожного розгортання встановіть `LOCALE` (та звичайні змінні оточення Intlayer) у локаль, яку має обслуговувати цей домен.
3. Посилайтеся на цю змінну як `defaultLocale` у вашому `intlayer.config.[ts|js]`.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 домен визначає локаль
  },
  // ... решта вашої конфігурації
};

export default config;
```

Ось і все, те саме працює для **Next.js**, **Vite + React**, **Vite + Vue** тощо.

## Що якщо всі домени вказують на **те саме** розгортання?

Якщо всі домени вказують на той самий бандл застосунку, вам потрібно визначати хост під час виконання та передавати локаль вручну через провайдер.

### Для Next.js

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname();
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Для Vue

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname());
app.mount("#app");
```

Замініть `getLocaleFromHostname()` своєю власною логікою визначення локалі.

## Оновіть ваш перемикач локалі

Коли використовується маршрутизація на основі доменів, зміна мови означає перехід на інший домен:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## Переваги маршрутизації на основі доменів

1. **Простіша конфігурація**: Немає потреби налаштовувати `intlayerProxy`, `generateStaticParams`, `react-router` або `vue-router`
2. **Краще SEO**: Кожна мова має власний домен
3. **Чистіші URL-адреси**: Немає префікса локалі в шляху
4. **Простіше обслуговування**: Розгортання для кожної мови незалежне
