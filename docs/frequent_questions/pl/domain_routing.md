---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Jak skonfigurować routing oparty na domenach?
description: Dowiedz się, jak skonfigurować routing oparty na domenach.
keywords:
  - domena
  - routing
  - intlayer
  - konfiguracja
  - middleware
  - react-router
  - vue-router
  - next.js
  - vite
  - framework
slugs:
  - frequent-questions
  - domain-routing
---

# Jak skonfigurować **routing oparty na domenach** w Intlayer zamiast ścieżek `/[locale]/`?

## Krótka odpowiedź

Routing oparty na domenach jest prostszy niż routing oparty na ścieżkach (`example.com/[locale]/`), ponieważ można pominąć całą konfigurację middleware i routingu. Wystarczy wdrożyć aplikację na każdej domenie językowej i ustawić jedną zmienną środowiskową na domenę.

## Krok po kroku

1. **Wdroż aplikację raz na domenę** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. Dla każdego wdrożenia ustaw `LOCALE` (oraz standardowe zmienne środowiskowe Intlayer) na lokalizację, którą dana domena ma obsługiwać.
3. Odwołaj się do tej zmiennej jako `defaultLocale` w swoim pliku `intlayer.config.[ts|js]`.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 domena decyduje o lokalizacji
  },
  // ... reszta twojej konfiguracji
};

export default config;
```

To wszystko — działa tak samo dla **Next.js**, **Vite + React**, **Vite + Vue** itd.

## Co jeśli każda domena trafia do **tego samego** wdrożenia?

Jeśli wszystkie domeny wskazują na ten sam pakiet aplikacji, musisz wykryć hosta w czasie wykonywania i ręcznie przekazać lokalizację przez providera.

### Dla Next.js

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
  const resolvedLocale = locale ?? getLocaleFromHostname(); // 👈 rozwiąż lokalizację na podstawie hosta
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Dla Vue

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname()); // 👈 zainstaluj Intlayer z lokalizacją na podstawie hosta
app.mount("#app");
```

Zamień `getLocaleFromHostname()` na własną logikę wyszukiwania.

## Zaktualizuj swój przełącznik lokalizacji

Przy routingu opartym na domenach, zmiana języka oznacza przejście na inną domenę:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target]; // 👈 przekieruj do domeny odpowiadającej wybranej lokalizacji
}
```

## Zalety routingu opartego na domenach

1. **Prostsza konfiguracja**: Nie ma potrzeby konfigurowania `intlayerProxy`, `generateStaticParams`, `react-router` ani `vue-router`
2. **Lepsze SEO**: Każdy język ma własną domenę
3. **Czystsze adresy URL**: Brak prefiksu lokalizacji w ścieżce
4. **Łatwiejsza konserwacja**: Każde wdrożenie języka jest niezależne
