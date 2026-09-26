---
createdAt: 2024-03-07
updatedAt: 2026-09-06
priority: 8
title: "So machen Sie eine bestehende Vite- und React-Anwendung nachträglich mehrsprachig (i18n-Leitfaden 2026)"
description: "Der Leitfaden für 2026, um eine bestehende Vite- und React-App nachträglich mehrsprachig (i18n) zu machen. Automatische Extraktion, KI-Übersetzung und optimierte Bundles mit Intlayer."
keywords:
  - Vite i18n
  - React i18n
  - Internationalisierung
  - Bestehende Vite App übersetzen
  - Bestehende React App übersetzen
  - Intlayer
  - Mehrsprachig
  - Compiler
  - KI-Übersetzung
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
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

# So machen Sie eine bestehende Vite- und React-Anwendung nachträglich mehrsprachig (i18n-Leitfaden 2026)

Internationalisierung (i18n) vom ersten Tag an in ein Vite- und React-Projekt zu integrieren, ist relativ einfach. Doch was passiert, wenn Sie bereits eine ausgereifte, produktive Anwendung in einer einzigen Sprache betreiben und diese **nachträglich** mehrsprachig machen müssen?

Wer dies schon einmal mit traditionellen Bibliotheken wie `react-i18next` oder `react-intl` versucht hat, kennt den Frust:

- Manuelle Suche nach fest kodierten Zeichenketten in Hunderten von JSX- und TSX-Dateien.
- Erstellen verschachtelter JSON-Dateien und Erfinden willkürlicher Übersetzungsschlüssel (`components.header.title` usw.).
- Ersetzen von Texten durch unhandliche Hook-Aufrufe (`t('...')`).
- Umstrukturieren des clientseitigen Routings, des State Managements und der Sprachauswahl-Logik.

Im Jahr 2026 müssen Sie Ihre Codebasis nicht neu schreiben. Mit **Intlayer** rüsten Sie eine bestehende Vite- und React-App in wenigen Minuten mit automatisierter Extraktion, KI-Übersetzung und nahtloser Integration nach.

> Suchen Sie die vollständige, schrittweise technische Anleitung für Vite und React? Besuchen Sie unsere Dokumentation: [Vite und React mit Intlayer übersetzen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md).

## Inhaltsverzeichnis

<TOC/>

## Das Nachrüstungs-Dilemma: Warum die Internationalisierung bestehender Apps schwierig ist

Entwickler stehen bei bestehenden Vite- und React-Apps vor drei großen Herausforderungen:

1. **Störung der Codebasis**: Das manuelle Extrahieren von Texten in JSON-Wörterbücher erfordert Änderungen an fast jeder Komponentendatei. Dies erzeugt riesige Git-Diffs, birgt Merge-Konflikte und birgt Risiken für visuelle Regressionen.
2. **Schlüssel-Verwaltungsaufwand**: Das Erfinden von Schlüsseln wie `dashboard.hero.ctaButton` für jedes Textfragment verlangsamt die Entwicklung und erhöht die kognitive Belastung bei jeder Textänderung.
3. **Mühsame Übersetzungsarbeit**: Sobald Texte extrahiert sind, erfordert das Übersetzen in 5, 10 oder 20 Sprachen endloses Kopieren oder teure externe Übersetzungsdienste.

Intlayer löst diese Probleme auf architektonischer Ebene mit **Compiler-gestützter Extraktion**, **deklarativen Wörterbüchern auf Komponentenebene** und **reibungsloser Vite-Integration**.

## Automatisierte Inhaltsextraktion (keine manuelle Textsuche)

Statt jede Zeichenkette manuell aus Ihrem JSX zu kopieren, bietet Intlayer zwei einfache Wege:

### Option A: Das CLI-Extraktionswerkzeug (`npx intlayer extract`)

Sie können das Extraktionswerkzeug von Intlayer direkt in Ihrer Codebasis ausführen:

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

Dieser Befehl analysiert Ihre React-Komponenten, erkennt sichtbare Texte und erstellt automatisch Inhaltsdeklarationsdateien (`.content.ts`) direkt neben Ihren Komponenten. Ihre Komponentenlogik bleibt deklarativ, lesbar und typsicher.

### Option B: Der Intlayer-Compiler (Extraktion beim Build)

Wenn der Intlayer-Compiler in Ihrer Konfiguration aktiviert ist, können Sie Komponenten weiterhin mit einfachem Text in Ihrer Standardsprache schreiben. Beim Build extrahiert der Compiler den Text und injiziert den lokalisierten Inhalt automatisch:

```tsx fileName="src/App.tsx"
// Schreiben Sie ganz normalen React-Code. Der Compiler extrahiert den Text automatisch
export default function App() {
  return (
    <section>
      <h1>Willkommen auf unserer Plattform</h1>
      <p>Entdecken Sie noch heute unsere modernen Funktionen.</p>
    </section>
  );
}
```

Im Hintergrund erstellt Intlayer das Wörterbuch und verknüpft die Komponente mit ihrem lokalisierten Inhalt, wodurch manuelles Refactoring vollständig entfällt.

In diesem Fall wird eine Deklarationsdatei `src/App.content.ts` mit folgender Struktur erzeugt:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    willkommenAufUnsererPlattform: t({
      de: "Willkommen auf unserer Plattform",
    }),
    entdeckenSieNochHeuteUnsereFunktionen: t({
      de: "Entdecken Sie noch heute unsere modernen Funktionen.",
    }),
  },
};

export default content;
```

## KI-gestützte Übersetzung mit Ihrem bevorzugten LLM

Nach dem Extrahieren sollte das Übersetzen in Dutzende Sprachen keine Tage dauern. Intlayer enthält eine integrierte KI-Übersetzungs-CLI, die direkt mit OpenAI, Anthropic, DeepSeek oder Mistral über Ihre eigenen API-Schlüssel kommuniziert:

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

Konfigurieren Sie Ihre Sprachen und den KI-Anbieter in `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.GERMAN,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Moderne SaaS-Anwendung und Dashboard entwickelt mit Vite und React",
  },
};

export default config;
```

Das Ausführen von `npx intlayer fill` befüllt Ihre Deklarationen mit präzisen Übersetzungen für alle konfigurierten Sprachen:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    willkommenAufUnsererPlattform: t({
      de: "Willkommen auf unserer Plattform",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    entdeckenSieNochHeuteUnsereFunktionen: t({
      de: "Entdecken Sie noch heute unsere modernen Funktionen.",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

Da Intlayer den `applicationContext` an das Modell weitergibt, berücksichtigen die Übersetzungen den technischen Kontext, den Tonfall und grammatikalische Besonderheiten weitaus besser als generische Tools.

Um vor dem Deployment zu prüfen, ob alle Texte übersetzt wurden:

```bash
npx intlayer test
```

## Vite-Integration und Provider-Einrichtung

Die Integration von Intlayer in Vite erfordert lediglich das Hinzufügen des Plugins in `vite.config.ts` sowie das Umschließen der Wurzelkomponente mit `IntlayerProvider`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Seit Intlayer v9 ist der Compiler direkt im Plugin `intlayer()` enthalten und wird automatisch aktiviert, sobald `compiler.enabled` in `intlayer.config.ts` gesetzt ist.

Umschließen Sie Ihre Anwendung in der Wurzelkomponente mit `IntlayerProvider`:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### Sprache dynamisch wechseln

Wechseln Sie Sprachen an beliebiger Stelle in Ihrer Anwendung mit dem Hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Mehrsprachiges SEO (Sitemap und Robots.txt)

Intlayer enthält Formatierungsfunktionen wie `generateSitemap` und `getMultilingualUrls`, die suchmaschinenoptimierte `sitemap.xml`- und `robots.txt`-Dateien für statische Vite-Deployments erstellen:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("SEO-Dateien erfolgreich generiert.");
```

Fügen Sie in Ihrer `package.json` einen `prebuild`-Hook ein, um das Skript vor `vite build` auszuführen:

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Vertiefung: Bereit für die schrittweise Implementierung?

Dieser Leitfaden hat Ihnen einen Überblick gegeben, wie Sie eine bestehende Vite- und React-Anwendung im Jahr 2026 ohne aufwendige Refactorings internationalisieren können.

Wenn Sie jeden Teil Ihrer Anwendung detailliert einrichten möchten, einschließlich vollständiger TypeScript-Typsicherheit, dynamischer Wörterbücher und visuellem Editor, lesen Sie unsere ausführliche Dokumentation:

👉 **[Ausführliche Anleitung zum Übersetzen von Vite und React mit Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)**

## Häufig gestellte Fragen (FAQ)

<FAQ>

<Question title="Kann ich meine Vite- und React-App mehrsprachig machen, ohne alle Texte manuell zu refaktorisieren?">

Ja. Sie können `npx intlayer extract` verwenden, um fest kodierte Texte automatisch in lokalisierte Inhaltsdeklarationen zu überführen, oder den Intlayer-Compiler nutzen, der Komponenten zur Build-Zeit transformiert, während Sie weiterhin normales JSX schreiben.

</Question>
<Question title="Wie reduziert Intlayer die Bundle-Größe in Vite im Vergleich zu react-i18next oder react-intl?">

Intlayer verwendet Wörterbuchdefinitionen auf Komponentenebene und Makro-Optimierung beim Build. Ihre Bundles erhalten nur die exakten Daten, die von den aktuell gerenderten Komponenten benötigt werden, statt ganze JSON-Dateien zu laden. Dynamische Wörterbücher können Sprachen zudem bei Bedarf nachladen.

</Question>
<Question title="Kann ich KI verwenden, um meine bestehenden Komponenten in mehrere Sprachen zu übersetzen?">

Ja. Die Intlayer-CLI enthält den Befehl `npx intlayer fill`, der sich mit Ihrem bevorzugten KI-Anbieter (OpenAI, Anthropic, Mistral, DeepSeek) verbindet, um kontextbezogene Übersetzungen für alle konfigurierten Sprachen zu erstellen.

</Question>
<Question title="Kann ich von react-i18next oder react-intl migrieren, ohne meine Komponenten neu zu schreiben?">

Ja. Intlayer bietet Kompatibilitäts-Adapter für `react-i18next` und `react-intl` sowie Plugins zur Synchronisierung bestehender JSON-Übersetzungsdateien (`sync-json`).

</Question>

</FAQ>
