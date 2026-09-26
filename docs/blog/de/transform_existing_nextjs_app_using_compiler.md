---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "So machen Sie eine bestehende Next.js-Anwendung nachträglich mehrsprachig (i18n-Leitfaden 2026)"
description: "Der Leitfaden für 2026, um eine bestehende Next.js-App nachträglich mehrsprachig (i18n) zu machen. Automatische Extraktion, KI-Übersetzung und Routing mit Intlayer."
keywords:
  - Next.js i18n
  - Internationalisierung
  - Bestehende Next.js App übersetzen
  - Next.js 16
  - Intlayer
  - Mehrsprachig
  - React i18n
  - Compiler
  - KI-Übersetzung
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# So machen Sie eine bestehende Next.js-Anwendung nachträglich mehrsprachig (i18n-Leitfaden 2026)

Internationalisierung (i18n) vom ersten Tag an in ein Next.js-Projekt zu integrieren, ist relativ einfach. Doch was passiert, wenn Sie bereits eine ausgereifte, produktive Next.js-Anwendung in einer einzigen Sprache haben und diese **nachträglich** mehrsprachig machen müssen?

Wer dies schon einmal mit traditionellen Bibliotheken wie `next-intl` oder `next-i18next` versucht hat, kennt den Albtraum:

- Manuelle Suche nach fest kodierten Texten in Hunderten von JSX/TSX-Dateien.
- Erstellen verschachtelter JSON-Dateien und Erfinden willkürlicher Übersetzungsschlüssel (`pages.dashboard.header.title` usw.).
- Ersetzen von Text durch Hook-Aufrufe (`t('...')`).
- Umstrukturieren des gesamten `app/`-Ordners in `app/[locale]/...`, was bestehende Routen, Lesezeichen und Suchmaschinen-Indexierungen beschädigt.

Im Jahr 2026 müssen Sie Ihre Codebasis nicht neu schreiben. Mit **Intlayer** rüsten Sie eine bestehende Next.js-App in wenigen Minuten mit automatisierter Extraktion, KI-Übersetzung und flexiblem Routing nach.

> Suchen Sie die vollständige, schrittweise technische Anleitung für Next.js 16 App Router? Besuchen Sie unsere Dokumentation: [Next.js 16 mit Intlayer übersetzen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md).

## Inhaltsverzeichnis

<TOC/>

## Das Nachrüstungs-Dilemma: Warum die Internationalisierung bestehender Apps schwierig ist

Entwickler stehen bei bestehenden Next.js-Apps vor drei großen Herausforderungen:

1. **Codebasis-Unterbrechung**: Das manuelle Extrahieren von Zeichenketten in JSON-Wörterbücher erfordert Änderungen an fast jeder Komponentendatei.
2. **Routing-Zwang**: Herkömmliche i18n-Bibliotheken zwingen Sie dazu, Seiten in ein dynamisches `[locale]`-Segment zu verschieben (z. B. `/app/[locale]/page.tsx`).
3. **Mühsame Übersetzungsarbeit**: Das Übersetzen extrahierter Wörterbücher in 5, 10 oder 20 Sprachen erfordert ständiges Kopieren und Einfügen.

Intlayer löst diese Probleme architektonisch durch **Compiler-gestützte Extraktion**, **deklarative Wörterbücher** und **flexibles Routing**.

## Automatisierte Inhaltsextraktion (Keine manuelle Textsuche)

### Option A: Der CLI-Extraktor (`npx intlayer extract`)

Führen Sie das Extraktions-Tool von Intlayer direkt in Ihrem Code aus:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

Dieser Befehl analysiert Ihre React-Komponenten, extrahiert Texte und erstellt automatisch deklarative Inhaltsdateien (`.content.ts`) direkt neben Ihren Komponenten.

### Option B: Der Intlayer-Compiler (Build-Time-Extraktion)

Mit aktiviertem Intlayer-Compiler schreiben Sie Ihre Komponenten einfach mit reinem Text in Ihrer Standardsprache weiter. Beim Build extrahiert der Compiler den Text und bindet die lokalisierten Inhalte automatisch ein:

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

Hinter den Kulissen erstellt Intlayer das Wörterbuch und verknüpft die Komponente mit ihren lokalisierten Inhalten, wodurch manuelles Refactoring vollständig entfällt.

In diesem Fall wird eine Datei `src/app/page.content.ts` mit folgendem Inhalt generiert:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## KI-gestützte Übersetzung mit Ihrem bevorzugten LLM

Nach der Extraktion übersetzt die integrierte KI-CLI von Intlayer Ihre Inhalte blitzschnell mit OpenAI, Anthropic, DeepSeek oder Mistral über Ihre eigenen API-Schlüssel:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "SaaS-Dashboard für Produktivität und Teamzusammenarbeit",
  },
};

export default config;
```

Das Ausführen von `npx intlayer fill` füllt Ihre `.content.ts`-Deklarationen mit Übersetzungen für alle konfigurierten Sprachen:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      de: "Willkommen auf unserer Plattform",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      de: "Entdecken Sie noch heute unsere modernen Funktionen.",
    }),
  },
};

export default content;
```

Da Intlayer dem LLM einen übergeordneten `applicationContext` bereitstellt, behalten generierte Übersetzungen technische Nuancen, Markenstimme und grammatikalischen Kontext deutlich besser bei als herkömmliche Automatisierungswerkzeuge.

Um vor dem Release in Produktion zu prüfen, dass keine Texte übersehen wurden:

```bash
npx intlayer test
```

## Mehrsprachiges Routing ohne Beschädigung bestehender URLs

Intlayer bietet flexible Routing-Strategien:

- **Suchparameter / Cookie-Modus (`search-params`)**: Behalten Sie Ihre Verzeichnisstruktur (`/app/page.tsx`) ohne Verschieben in `[locale]` bei.
- **Präfix-Modus (`prefix` / `prefix-all-locales`)**: Sobald Sie für suchmaschinenoptimierte URLs bereit sind, unterstützt Intlayer Pfad-Routing über einen einfachen Next.js-Proxy.

Konfigurieren Sie Ihre Next.js-Integration in Sekundenschnelle:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

Ummanteln Sie Ihr Root-Layout mit `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## Mehrsprachiges SEO

Generieren Sie lokalisierte Metadaten und `hreflang`-Tags für globales SEO:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## Vertiefung: Bereit für die schrittweise Implementierung?

Dieser Leitfaden gibt einen Überblick über die nachträgliche Internationalisierung einer Next.js-App im Jahr 2026. Für die vollständige schrittweise Anleitung besuchen Sie unsere Dokumentation:

👉 **[Vollständiger Leitfaden zur Übersetzung von Next.js 16 mit Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)**

## Häufig gestellte Fragen (FAQ)

<FAQ>

<Question title="Kann ich meine Next.js-App mehrsprachig machen, ohne Dateien nach app/[locale] zu verschieben?">

Ja. Intlayer unterstützt `routing.mode: "search-params"` sowie Cookie- und Header-basierte Erkennung. Ihre bestehende Ordnerstruktur bleibt vollständig erhalten.

</Question>
<Question title="Muss ich alle fest kodierten Texte manuell ersetzen?">

Nein. Mit `npx intlayer extract` oder dem Intlayer-Compiler werden Texte automatisch extrahiert und deklariert.

</Question>
<Question title="Wie reduziert Intlayer die Bundle-Größe im Vergleich zu next-intl oder next-i18next?">

Intlayer verwendet Inhaltsdeklarationen pro Komponente und Makro-Optimierung. Der Client lädt nur die für die gerenderte Seite erforderlichen Texte.

</Question>
<Question title="Kann ich KI verwenden, um meine Komponenten automatisch zu übersetzen?">

Ja. Der Befehl `npx intlayer fill` bindet OpenAI, Anthropic, Mistral oder DeepSeek ein, um fehlende Übersetzungen mit Kontext automatisch zu ergänzen.

</Question>
</FAQ>
