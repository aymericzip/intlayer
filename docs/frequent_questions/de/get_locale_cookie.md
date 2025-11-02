---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Wie man die Locale aus Cookies / Headern ausliest
description: Lernen Sie, wie man die Locale aus Cookies / Headern ausliest.
keywords:
  - cookie
  - header
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - frequent-questions
  - get-locale-cookie
---

# Wie man die Locale aus Cookies / Headern ausliest

## Verwendung von Hooks (Empfohlen)

Für die meisten Anwendungsfälle wird empfohlen, die aktuelle Locale mit dem `useLocale` Hook auszulesen, da dieser automatisch aufgelöst wird. Dies funktioniert ähnlich wie der `useLocale` Composable in Vue.js.

```ts
import { useLocale } from "next-intlayer";
// oder import { useLocale } von "react-intlayer";
// oder import { useLocale } von "vue-intlayer";

// Client-seitige Verwendung
const { locale } = useLocale();
```

Für Server-Komponenten können Sie es importieren von:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

Es gibt auch einen `useLocaleCookie` Hook, der nur den Cookie-Wert auflöst.

## Manuelle Cookie-Konfiguration

Sie können einen benutzerdefinierten Cookie-Namen deklarieren als

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // Standard ist 'intlayer-locale'
  },
};

export default config;
```

das Abrufen erfolgt wie folgt

### Client-seitig

```ts
// Verwendung des Standard-Cookie-Namens
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Verwendung eines benutzerdefinierten Cookie-Namens
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### Server-seitig (Next.js)

```ts
import { cookies } from "next/headers";

// Verwendung des Standard-Cookie-Namens
const locale = cookies().get("intlayer-locale")?.value;

// Verwendung eines benutzerdefinierten Cookie-Namens
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### Falls die Locale noch nicht gesetzt ist

Die Locale wird als Cookie nur gesetzt, wenn der Benutzer die Locale explizit auswählt. Standardmäßig wird für neue Besucher die Locale aus den Header-Feldern interpretiert.

Sie können die bevorzugte Locale des Benutzers aus den Anforderungsheadern erkennen. Hier ist ein Beispiel, wie dies gehandhabt wird:

```ts
/**
 * Erkennt die Locale aus den Anforderungsheadern
 *
 * Der accept-language Header ist der wichtigste für die Locale-Erkennung.
 * Er enthält eine Liste von Sprachcodes mit Qualitätswerten (q-Werten), die
 * die bevorzugten Sprachen des Benutzers in der Reihenfolge der Präferenz angeben.
 *
 * Beispiel: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US ist die primäre Sprache (q=1.0 ist impliziert)
 * - en ist die zweite Wahl (q=0.9)
 * - fr ist die dritte Wahl (q=0.8)
 * - es ist die vierte Wahl (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Beispiel für Negotiator-Header, die Browser typischerweise senden
 * Diese Header helfen dabei, die bevorzugte Sprache des Benutzers zu bestimmen
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Anwendungsbeispiel:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
