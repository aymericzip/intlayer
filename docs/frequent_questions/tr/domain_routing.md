---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Alan adına göre yönlendirme nasıl yapılır?
description: Alan adına göre yönlendirme nasıl yapılır, öğrenin.
keywords:
  - alan adı
  - yönlendirme
  - intlayer
  - yapılandırma
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

# Intlayer ile **alan adına göre yönlendirme** nasıl yapılandırılır? `/[locale]/` yolları yerine

## Kısa cevap

Alan adına göre yönlendirme, yol tabanlı yönlendirmeden (`example.com/[locale]/`) daha basittir çünkü tüm middleware ve yönlendirme yapılandırmasını atlayabilirsiniz. Sadece uygulamanızı her dil için ayrı bir domaine dağıtın ve her domain için bir ortam değişkeni ayarlayın.

## Adım adım

1. **Her domain için ayrı dağıtım yapın** (`example.com`, `exemple.fr`, `ejemplo.es`, ...).
2. Her dağıtımda, o domainin hangi dili sunacağını belirten `LOCALE` (ve diğer Intlayer ortam değişkenlerini) ayarlayın.
3. Bu değişkeni `intlayer.config.[ts|js]` dosyanızda `defaultLocale` olarak kullanın.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 domain dili belirler
  },
  // ... diğer ayarlar
};

export default config;
```

Bu kadar! **Next.js**, **Vite + React**, **Vite + Vue** vb. için aynıdır.

## Tüm domainler **aynı** dağıtıma yönleniyorsa?

Tüm domainler aynı uygulama paketine yönleniyorsa, host'u çalışma zamanında tespit edip locale'i sağlayıcıya manuel iletmeniz gerekir.

### Next.js için

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

### Vue için

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

`getLocaleFromHostname()` fonksiyonunu kendi domain tespit mantığınızla değiştirin.

## Dil değiştirici güncelleyin

Alan adına göre yönlendirme kullanırken, dil değiştirmek başka bir domaine gitmek anlamına gelir:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## Alan adına göre yönlendirmenin avantajları

1. **Daha basit yapılandırma**: `intlayerProxy`, `generateStaticParams`, `react-router` veya `vue-router` yapılandırmaya gerek yok
2. **Daha iyi SEO**: Her dilin kendi domaini olur
3. **Daha temiz URL'ler**: Yolda dil öneki yok
4. **Daha kolay bakım**: Her dil dağıtımı bağımsızdır
