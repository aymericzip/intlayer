---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Eigene Domains
description: Erfahren Sie, wie Sie das domänenbasierte Locale-Routing in Intlayer konfigurieren, um verschiedene Locales über dedizierte Hostnamen bereitzustellen.
keywords:
  - Eigene Domains
  - Domain-Routing
  - Routing
  - Internationalisierung
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Domänenbasiertes Locale-Routing über die Konfiguration routing.domains hinzugefügt."
---

# Eigene Domains

Intlayer unterstützt domänenbasiertes Locale-Routing, sodass Sie spezifische Locales über dedizierte Hostnamen bereitstellen können. Beispielsweise können chinesische Besucher auf `intlayer.zh` anstatt auf `intlayer.org/zh` geleitet werden.

## Funktionsweise

Die `domains`-Map in `routing` ordnet jeder Locale einen Hostnamen zu. Intlayer verwendet diese Map an zwei Stellen:

1. **URL-Generierung** (`getLocalizedUrl`): Wenn sich die Ziel-Locale auf einer _anderen_ Domain als die aktuelle Seite befindet, wird eine absolute URL zurückgegeben (z. B. `https://intlayer.zh/about`). Wenn beide Domains übereinstimmen, wird eine relative URL zurückgegeben (z. B. `/fr/about`).
2. **Server-Proxy** (Next.js & Vite): Eingehende Anfragen werden basierend auf der Domain, auf der sie ankommen, umgeleitet oder umgeschrieben.

### Exklusive vs. gemeinsame Domains

Der entscheidende Unterschied ist die **Exklusivität**:

- **Exklusive Domain** — Nur eine Locale wird diesem Hostnamen zugeordnet (z. B. `zh → intlayer.zh`). Die Domain selbst identifiziert die Locale, daher wird dem Pfad kein Locale-Präfix hinzugefügt. `https://intlayer.zh/about` stellt chinesische Inhalte bereit.
- **Gemeinsame Domain** — Mehrere Locales werden demselben Hostnamen zugeordnet (z. B. werden sowohl `en` als auch `fr` auf `intlayer.org` abgebildet). Es gilt das normale präfixbasierte Routing. `intlayer.org/fr/about` stellt französische Inhalte bereit.

## Konfiguration

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // Gemeinsame Domain — en und fr verwenden Präfix-Routing auf intlayer.org
      en: "intlayer.org",
      // Exklusive Domain — zh hat einen eigenen Hostnamen, kein /zh/-Präfix erforderlich
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Locales, die nicht in `domains` aufgeführt sind, verwenden weiterhin das Standard-Präfix-Routing ohne Domain-Überschreibung.

## URL-Generierung

`getLocalizedUrl` erzeugt automatisch den richtigen URL-Typ basierend auf dem Aufrufkontext.

### Locale auf derselben Domain (relative URL)

```ts
// Aktuelle Seite: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (Standard-Locale, kein Präfix)
```

### Domainübergreifende Locale (absolute URL)

```ts
// Aktuelle Seite: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (exklusive Domain, kein /zh/-Präfix)
```

### Bereitstellung über die eigene Domain der Locale

```ts
// Aktuelle Seite: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (bereits auf der richtigen Domain — relative URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (domainübergreifender Link zurück zu intlayer.org)
```

### Automatische Erkennung der aktuellen Domain

`currentDomain` ist optional. Wenn es weggelassen wird, löst `getLocalizedUrl` es in dieser Reihenfolge auf:

1. Der Hostname einer absoluten Eingabe-URL (z. B. `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` in Browserumgebungen.
3. Wenn keines von beiden verfügbar ist (SSR ohne explizite Option), wird eine relative URL für Locales auf derselben Domain zurückgegeben und keine absolute URL erzeugt — dies ist der sichere Fallback.

```ts
// Browser — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (automatisch von window erkannt)

// Von einer absoluten URL — Domain automatisch erkannt
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` mit Domains

`getMultilingualUrls` ruft `getLocalizedUrl` für jede Locale auf, sodass je nach Domain des Aufrufers eine Mischung aus relativen und absoluten URLs erzeugt wird:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

Diese absoluten URLs können direkt in `<link rel="alternate" hreflang="...">`-Tags für SEO verwendet werden.

## Proxy-Verhalten

### Next.js

Die `intlayerProxy`-Middleware übernimmt das Domain-Routing automatisch. Fügen Sie sie zu Ihrer `middleware.ts` hinzu:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Redirect** — Anfrage kommt auf der falschen Domain für ein bestimmtes Locale-Präfix an:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Rewrite** — Anfrage kommt auf der exklusiven Domain der Locale ohne Präfix an:

```
GET intlayer.zh/about
→ Rewrite zu /zh/about  (nur internes Next.js-Routing, URL bleibt sauber)
```

### Vite

Das `intlayerProxy` Vite-Plugin wendet die gleiche Logik während der Entwicklung an:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Hinweis**: Bei der lokalen Entwicklung befinden Sie sich normalerweise auf `localhost`, daher weisen domainübergreifende Umleitungen auf die Live-Domains anstatt auf einen anderen lokalen Port hin. Verwenden Sie ein Überschreiben der hosts-Datei (z. B. `127.0.0.1 intlayer.zh`) oder einen Reverse-Proxy, wenn Sie das Multi-Domain-Routing lokal testen müssen.

## Locale-Switcher

Der `useLocale`-Hook von `next-intlayer` übernimmt die domänenbewusste Navigation automatisch. Wenn ein Benutzer zu einer Locale auf einer anderen Domain wechselt, führt der Hook eine vollständige Seitennavigation (`window.location.href`) anstelle eines clientseitigen Router-Pushs durch, da der Next.js-Router keine Ursprungsgrenzen überschreiten kann.

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Es ist keine zusätzliche Konfiguration erforderlich — `useLocale` erkennt intern `window.location.hostname` und entscheidet zwischen `router.replace` (gleiche Domain) und `window.location.href` (domainübergreifend).

## SEO: `hreflang` Alternate Links

Domänenbasiertes Routing wird häufig zusammen mit `hreflang` verwendet, um Suchmaschinen mitzuteilen, welche URL für welche Sprache indexiert werden soll. Verwenden Sie `getMultilingualUrls`, um den vollständigen Satz alternativer URLs zu generieren:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // z. B. "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Dies erzeugt:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Kern-Utilities

| Utility                                           | Beschreibung                                                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Gibt eine relative oder absolute URL zurück, je nachdem, ob sich die Ziel-Locale auf der aktuellen Domain befindet. |
| `getMultilingualUrls(url, { currentDomain })`     | Gibt eine Map lokalisierter URLs zurück, wobei relative und absolute URLs nach Bedarf gemischt werden.              |
| `getPrefix(locale, { domains })`                  | Gibt ein leeres Präfix für Locales mit exklusiver Domain zurück, ansonsten das normale Präfix.                      |
