---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Как настроить маршрутизацию на основе домена?
description: Узнайте, как настроить маршрутизацию на основе домена.
keywords:
  - домен
  - маршрутизация
  - intlayer
  - конфигурация
  - middleware
  - react-router
  - vue-router
  - next.js
  - vite
  - framework
slugs:
  - frequent-questions
  - domain-routing
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Как настроить **маршрутизацию на основе домена** с Intlayer вместо путей `/[locale]/`?

## Краткий ответ

Маршрутизация на основе домена проще, чем маршрутизация на основе пути (`example.com/[locale]/`), потому что вы можете пропустить всю настройку middleware и маршрутизации. Просто разверните ваше приложение на каждом языковом домене и установите одну переменную окружения для каждого домена.

## Пошагово

1. **Разверните приложение для каждого домена** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. Для каждого развертывания установите `LOCALE` (и обычные переменные окружения Intlayer) в локаль, которую должен обслуживать этот домен.
3. Ссылайтесь на эту переменную как на `defaultLocale` в вашем файле `intlayer.config.[ts|js]`.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 домен определяет локаль
  },
  // ... остальная часть вашей конфигурации
};

export default config;
```

Вот и всё - работает одинаково для **Next.js**, **Vite + React**, **Vite + Vue** и т.д.

## Что если все домены указывают на **одно и то же** развертывание?

Если все домены указывают на один и тот же пакет приложения, вам нужно будет определить хост во время выполнения и вручную передать локаль через провайдер.

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
  const resolvedLocale = locale ?? getLocaleFromHostname(); // определяем локаль, если не передана
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
installIntlayer(app, getLocaleFromHostname()); // устанавливаем локаль, определённую по имени хоста
app.mount("#app");
```

Замените `getLocaleFromHostname()` на вашу собственную логику определения локали.

## Обновите переключатель локали

При использовании маршрутизации на основе доменов смена языка означает переход на другой домен:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target]; // перенаправление на домен, соответствующий выбранной локали
}
```

## Преимущества маршрутизации на основе доменов

1. **Проще конфигурация**: Нет необходимости настраивать `intlayerProxy`, `generateStaticParams`, `react-router` или `vue-router`
2. **Лучшее SEO**: Для каждого языка используется собственный домен
3. **Чище URL**: В пути отсутствует префикс локали
4. **Проще в обслуживании**: Развёртывание для каждого языка независимо
