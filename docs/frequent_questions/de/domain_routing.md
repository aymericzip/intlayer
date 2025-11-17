---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Wie konfiguriere ich domänenbasiertes Routing?
description: Erfahren Sie, wie Sie domänenbasiertes Routing konfigurieren.
keywords:
  - domäne
  - routing
  - intlayer
  - konfiguration
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

# Wie konfiguriere ich **domänenbasiertes Routing** mit Intlayer anstelle von `/[locale]/`-Pfaden?

## Kurze Antwort

Domänenbasiertes Routing ist einfacher als pfadbasiertes Routing (`example.com/[locale]/`), da Sie alle Middleware- und Routing-Konfigurationen überspringen können. Stellen Sie Ihre App einfach für jede Sprachdomäne bereit und setzen Sie für jede Domäne eine Umgebungsvariable.

## Schritt-für-Schritt

1. **Einmal pro Domäne bereitstellen** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. Für jede Bereitstellung setzen Sie `LOCALE` (und die üblichen Intlayer-Umgebungsvariablen) auf die Sprache, die diese Domäne bedienen soll.
3. Verweisen Sie in Ihrer `intlayer.config.[ts|js]` auf diese Variable als `defaultLocale`.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 die Domäne bestimmt die Sprache
  },
  // ... Rest Ihrer Konfiguration
};

export default config;
```

Das war's – funktioniert genauso für **Next.js**, **Vite + React**, **Vite + Vue** usw.

## Was ist, wenn jede Domäne auf die **gleiche** Bereitstellung zugreift?

Wenn alle Domains auf dasselbe Anwendungs-Bundle zeigen, müssen Sie den Host zur Laufzeit erkennen und die Sprache manuell über den Provider übergeben.

### Für Next.js

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
  const resolvedLocale = locale ?? getLocaleFromHostname(); // Ermittelt die Sprache anhand des Hostnamens, falls locale nicht gesetzt ist
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Für Vue

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

Ersetzen Sie `getLocaleFromHostname()` durch Ihre eigene Logik zur Ermittlung der Sprache.

## Aktualisieren Sie Ihren Sprachumschalter

Bei der Verwendung von domänenbasiertem Routing bedeutet das Wechseln der Sprache, zu einer anderen Domain zu navigieren:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## Vorteile des domänenbasierten Routings

1. **Einfachere Konfiguration**: Keine Notwendigkeit, `intlayerProxy`, `generateStaticParams`, `react-router` oder `vue-router` zu konfigurieren
2. **Bessere SEO**: Jede Sprache hat ihre eigene Domain
3. **Sauberere URLs**: Kein Sprachpräfix im Pfad
4. **Einfachere Wartung**: Jede Sprachbereitstellung ist unabhängig
