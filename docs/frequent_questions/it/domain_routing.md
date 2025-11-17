---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Come configurare il routing basato sul dominio?
description: Scopri come configurare il routing basato sul dominio.
keywords:
  - dominio
  - routing
  - intlayer
  - configurazione
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

# Come configurare il **routing basato sul dominio** con Intlayer invece dei percorsi `/[locale]/`?

## Risposta breve

Il routing basato sul dominio è più semplice rispetto al routing basato sul percorso (`example.com/[locale]/`) perché puoi evitare tutta la configurazione di middleware e routing. Basta distribuire la tua app su ogni dominio linguistico e impostare una variabile d'ambiente per ogni dominio.

## Passo dopo passo

1. **Distribuisci una volta per dominio** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. Per ogni distribuzione, imposta `LOCALE` (e le solite variabili d'ambiente di Intlayer) sulla lingua che quel dominio deve servire.
3. Riferisciti a quella variabile come `defaultLocale` nel tuo file `intlayer.config.[ts|js]`.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 il dominio decide la lingua
  },
  // ... il resto della tua configurazione
};

export default config;
```

Questo è tutto-funziona allo stesso modo per **Next.js**, **Vite + React**, **Vite + Vue**, ecc.

## Cosa succede se tutti i domini puntano alla **stessa** distribuzione?

Se tutti i domini puntano allo stesso bundle dell'applicazione, sarà necessario rilevare l'host a runtime e passare manualmente la lingua tramite il provider.

### Per Next.js

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
  const resolvedLocale = locale ?? getLocaleFromHostname(); // 👈 risolvi la lingua dal nome host
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Per Vue

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

Sostituisci `getLocaleFromHostname()` con la tua logica di ricerca personalizzata.

## Aggiorna il tuo selettore di lingua

Quando si utilizza il routing basato sul dominio, cambiare lingua significa navigare verso un altro dominio:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## Vantaggi del routing basato sul dominio

1. **Configurazione più semplice**: Non è necessario configurare `intlayerProxy`, `generateStaticParams`, `react-router` o `vue-router`
2. **Migliore SEO**: Ogni lingua ha il proprio dominio
3. **URL più puliti**: Nessun prefisso di localizzazione nel percorso
4. **Manutenzione più semplice**: Ogni distribuzione linguistica è indipendente
