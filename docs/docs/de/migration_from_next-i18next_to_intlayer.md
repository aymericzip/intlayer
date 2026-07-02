---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migration von next-i18next zu Intlayer | Internationalisierung (i18n)"
description: "Erfahren Sie, wie Sie Ihre Next.js-App von next-i18next zu Intlayer migrieren — Schritt für Schritt, ohne Ihren bestehenden Code zu beeinträchtigen. Verwenden Sie den @intlayer/next-i18next-Kompatibilitätsadapter für einen nahtlosen Übergang."
keywords:
  - next-i18next
  - react-i18next
  - i18next
  - intlayer
  - Migration
  - Internationalisierung
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migration von next-i18next zu Intlayer

## Warum von next-i18next zu Intlayer migrieren?

<AccordionGroup>

<Accordion header="Bundle-Größe">

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur die benötigten Inhalte. Intlayer hilft Ihnen, **die Größe Ihres Bundles und Ihrer Seiten um bis zu 50 % zu reduzieren**.

</Accordion>

<Accordion header="Wartbarkeit">

Das Scopen Ihrer Anwendungsinhalte **erleichtert die Wartung** für große Anwendungen. Sie können einen ganzen Feature-Ordner duplizieren oder löschen, ohne den mentalen Aufwand betreiben zu müssen, Ihre gesamte Inhalts-Codebase zu überprüfen. Darüber hinaus ist Intlayer **vollständig typisiert**, um die Richtigkeit Ihrer Inhalte sicherzustellen.

Intlayer ist zudem die Lösung mit der **aktivsten Entwicklung** im i18n-Ökosystem — Probleme werden schnell behoben, neue Framework-Adapter kommen regelmäßig hinzu und die Kern-API wird kontinuierlich auf Basis echter Produktionserfahrungen verfeinert.

</Accordion>

<Accordion header="KI-Agent">

Die Kollokation von Inhalten **reduziert den für Large Language Models (LLMs) erforderlichen Kontext**. Intlayer verfügt außerdem über eine Reihe von Werkzeugen, wie eine **CLI** zum Testen fehlender Übersetzungen, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)** und **[Agenten-Fähigkeiten (Agent Skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

</Accordion>

<Accordion header="Automatisierung">

Nutzen Sie Automatisierung zur Übersetzung in Ihrer CI/CD-Pipeline unter Verwendung des LLM Ihrer Wahl zum Preis Ihres KI-Anbieters. Intlayer bietet auch einen **Compiler** zur Automatisierung der Inhaltsextraktion sowie eine [Web-Plattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), die **Übersetzungen im Hintergrund** unterstützt.

</Accordion>

<Accordion header="Leistung">

Das Verknüpfen riesiger JSON-Dateien mit Komponenten kann zu Leistungs- und Reaktivitätsproblemen führen. Intlayer optimiert das Laden Ihrer Inhalte zur Build-Zeit.

</Accordion>

<Accordion header="Skalierbarkeit mit Nicht-Entwicklern">

Mehr als nur eine i18n-Lösung bietet Intlayer einen selbst gehosteten **[visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)**, das Ihnen hilft, Ihre mehrsprachigen Inhalte in **Echtzeit** zu verwalten. Dies ermöglicht eine nahtlose Zusammenarbeit mit Übersetzern, Textern und anderen Teammitgliedern. Die Inhalte können lokal und/oder remote gespeichert werden.

</Accordion>

</AccordionGroup>

---

## Migrationsstrategien

Da `next-i18next` unter der Haube `react-i18next` und `i18next` kapselt, gibt es zwei ergänzende Strategien für die Migration zu Intlayer:

1. **Kompatibilitätsadapter (empfohlen für bestehende Apps)** — Installieren Sie `@intlayer/next-i18next`, `@intlayer/react-i18next` und `@intlayer/i18next`. Diese Pakete bieten **genau dieselbe API** wie ihre Gegenstücke, delegieren jedoch die gesamte Übersetzungsarbeit an Intlayer. Sie behalten Ihre bestehenden Aufrufe für `useTranslation`, `appWithTranslation`, `serverSideTranslations` und das Next.js-Seitenrouting unverändert bei — die einzige Änderung ist die Initialisierung.

2. **Vollständige Migration** — Ersetzen Sie schrittweise `next-i18next`-APIs durch native Intlayer-Hooks (`useIntlayer`) und platzieren Sie Inhalte lokal in `.content.ts`-Dateien neben Ihren Komponenten.

Dieser Leitfaden behandelt zuerst **Strategie 1** (schneller Kompatibilitätsadapter) und geht dann auf die optionale vollständige Migration ein.

---

## Inhaltsverzeichnis

<TOC/>

---

## Schnelle Migration

Die folgenden Schritte sind das Minimum, das erforderlich ist, um Ihre bestehende Next.js Pages Router-App auf Intlayer laufen zu lassen, ohne Codeänderungen in Ihren Seiten und Komponenten vornehmen zu müssen.

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die Intlayer-Kernpakete und die Kompatibilitätsadapter:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> Das Flag `--interactive` ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt Ihre Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Sie können `next-i18next`, `react-i18next` und `i18next` während der Migration sicher installiert lassen, obwohl Sie sie entfernen werden, sobald die Aliase eingerichtet sind.

</Step>

<Step number={2} title="Intlayer konfigurieren">

Der Befehl `intlayer init` erstellt eine initiale Datei `intlayer.config.ts`. Aktualisieren Sie sie so, dass sie Ihren bestehenden Locales (Sprachen) entspricht, und verweisen Sie das `syncJSON`-Plugin auf Ihre `next-i18next`-Nachrichtendateien (üblicherweise in `public/locales`):

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Fügen Sie hier alle Ihre bestehenden Locales hinzu
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // Entspricht der Platzhalter-Syntax von i18next: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** ordnet ein Locale und einen Namespace (`key`) dem Dateipfad seiner JSON-Datei zu. **`location`** gibt dem Intlayer-Watcher an, welcher Ordner auf Änderungen überwacht werden soll. Die Option `format: 'i18next'` stellt sicher, dass Platzhalter für `next-i18next` korrekt verarbeitet werden.

</Step>

<Step number={3} title="Next.js-Konfiguration aktualisieren">

Kapseln Sie Ihre bestehende `next.config.ts` (oder `.js`) mit `createNextI18nPlugin` aus `@intlayer/next-i18next/plugin`. Dieser Wrapper wendet `withIntlayer` an **und** injiziert die Aliase `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`, sodass Ihre bestehenden Aufrufe für `import { useTranslation } from 'next-i18next'` zur Build-Zeit nahtlos umgeleitet werden. Es sind keine Änderungen an den Quelldateien erforderlich.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// Sie können die aus next-i18next.config.js importierte i18n-Konfiguration entfernen
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer übernimmt das Next.js i18n-Routing im Hintergrund,
  // daher müssen Sie hier nicht mehr das i18n-Objekt übergeben.
};

export default withIntlayer(nextConfig);
```

> **Sie benötigen die Datei `next-i18next.config.js` nicht mehr.** Intlayer kompiliert alle Wörterbücher **zur Build-Zeit** und übernimmt Locale-Erkennung, Routing und das Laden von Wörterbüchern nahtlos.
>
> Bevorzugen Sie das einfache `withIntlayer` aus `next-intlayer/server`? Es kompiliert Ihre Wörterbücher, fügt jedoch **nicht** die Aliase für `next-i18next` / `react-i18next` / `i18next` hinzu — dann müssten Sie Importe manuell in `@intlayer/*` umbenennen (siehe Schritt 4).

</Step>

</Steps>

Das war's für die schnelle Migration. Ihre Next.js-App läuft nun auf Intlayer, während alle Aufrufe von `useTranslation`, `serverSideTranslations` und `appWithTranslation` intakt bleiben.

> **Typisierte Übersetzungsschlüssel — automatisch.** Sobald Intlayer Ihre Wörterbücher kompiliert hat, sind `useTranslation` und `getFixedT` typisiert gegen Ihre tatsächlichen Inhalte. Die Schlüssel werden in Ihrer IDE autovervollständigt und ungültige Pfade führen zu TypeScript-Fehlern zur Build-Zeit — ohne zusätzliche Konfiguration.
>
> ```tsx
> // Pages Router — 'about' ist ein registrierter Dictionary-Namespace
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autovervollständigt
> t("does.not.exist"); // ✗ TypeScript-Fehler
>
> // getStaticProps / getServerSideProps (i18next Instanz)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ typisiert
> ```

---

## Vollständige Migration

Die folgenden Schritte sind optional und können inkrementell durchgeführt werden. Sie schalten die volle Funktionalität von Intlayer frei: visueller Editor, CMS, typisierte Inhaltsdateien, KI-gestützte Übersetzung und mehr.

<Steps>

<Step number={4} title="Importe explizit umbenennen (Optional)" isOptional={true}>

Das Intlayer-Plugin kümmert sich bereits um das Aliasing auf Bundler-Ebene. Wenn Sie die Abhängigkeit in Ihren Quelldateien explizit machen möchten, können Sie die Importe manuell umbenennen:

| Vorher                                                                         | Nachher                                                           |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

Es handelt sich um **direkte Ersetzungen (Drop-in Replacements)** — Call-Signaturen, Argumente oder Rückgabetypen müssen nicht geändert werden.

</Step>

<Step number={5} title="Aktivieren der KI-gestützten Übersetzungsautomatisierung" isOptional={true}>

Sobald Intlayer konfiguriert ist, können Sie die CLI verwenden, um fehlende Übersetzungen automatisch aufzufüllen:

```bash packageManager="npm"
# Fehlende Übersetzungen testen (zu CI hinzufügen)
npx intlayer test

# Fehlende Übersetzungen mit KI auffüllen
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Fügen Sie die KI-Konfiguration zu `intlayer.config.ts` hinzu:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // default
    // model: "gpt-4o-mini",   // default
  },
};

export default config;
```

> Sehen Sie sich die [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) an, um alle verfügbaren Optionen zu erkunden.

</Step>

</Steps>

---

## Was Sie nach der Migration löschen können

Sobald der Kompatibilitätsadapter vorhanden ist, kann der folgende Standard-`next-i18next`-Code gelöscht werden:

| Datei / Muster                              | Warum er nicht mehr benötigt wird                                                                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                    | Intlayer verarbeitet Routing, das Laden von Wörterbüchern und Standard-Locales intern auf Basis von `intlayer.config.ts`.                                               |
| `next-i18next` in `package.json`            | Vollständig durch `@intlayer/next-i18next` und Aliase ersetzt.                                                                                                          |
| JSON-Sprachpakete (`public/locales/*.json`) | JSON-Pakete werden nur benötigt, wenn Sie weiterhin das `syncJSON`-Plugin verwenden. Sobald Sie zu `.content.ts`-Dateien migrieren, können Sie den JSON-Ordner löschen. |

Wenn Sie bereit sind, weiterzugehen, **erkennt Intlayer automatisch alle `.content.ts`- und `.content.json`-Dateien überall in Ihrer Codebasis** (standardmäßig überall innerhalb von `./src`). Sie können eine Datei `my-component.content.ts` direkt neben Ihrer `MyComponent.tsx` platzieren, und Intlayer wird sie zur Build-Zeit ohne zusätzliche Konfiguration erkennen — keine Importe, keine Registrierung, keine zentrale Index-Datei erforderlich. Dies macht die Kollokation von Übersetzungen mit Seiten und Komponenten völlig nahtlos.

---

## TypeScript einrichten

Intlayer nutzt Modul-Erweiterungen, um volles TypeScript-Intellisense für Ihre Übersetzungsschlüssel bereitzustellen. Stellen Sie sicher, dass Ihre `tsconfig.json` die automatisch generierten Typen enthält:

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Fügen Sie die automatisch generierten Typen hinzu
  ],
}
```

---

## Git-Konfiguration

Fügen Sie das von Intlayer generierte Verzeichnis zu Ihrer `.gitignore` hinzu:

```plaintext fileName=".gitignore"
# Intlayer-generierte Dateien ignorieren
.intlayer
```

---

## Weiterführende Themen

- **Visueller Editor** — Verwalten Sie Übersetzungen visuell in Ihrem Browser: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)
- **CMS** — Externalisieren und verwalten Sie Inhalte remote: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)
- **VS Code-Erweiterung** — Erhalten Sie Autovervollständigung und Fehlererkennung für Übersetzungen in Echtzeit: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)
- **CLI-Referenz** — Vollständige Liste der CLI-Befehle: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md)
- **Intlayer mit Next.js (Pages Router)** — Vollständige Einrichtungsanleitung für Next.js: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_page_router.md)
