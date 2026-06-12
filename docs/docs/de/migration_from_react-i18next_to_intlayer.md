---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migration von react-i18next / i18next zu Intlayer | Internationalisierung (i18n)"
description: "Erfahren Sie, wie Sie Ihre React- oder Next.js-App von react-i18next oder i18next zu Intlayer migrieren — Schritt für Schritt, ohne Ihren bestehenden Code zu beeinträchtigen. Verwenden Sie die @intlayer/react-i18next- und @intlayer/i18next-Kompatibilitätsadapter für einen nahtlosen Übergang."
keywords:
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
  - react-i18next
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migration von react-i18next / i18next zu Intlayer

## Warum von react-i18next / i18next zu Intlayer migrieren?

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

Es gibt zwei ergänzende Strategien für die Migration von `react-i18next` / `i18next` zu Intlayer:

1. **Kompatibilitätsadapter (empfohlen für bestehende Apps)** — Installieren Sie `@intlayer/react-i18next` (für React-Komponenten) und/oder `@intlayer/i18next` (für die Kern-`i18n`-Instanz). Diese Pakete bieten **genau dieselbe API** wie `react-i18next` / `i18next`, delegieren jedoch die gesamte Übersetzungsarbeit an Intlayer. Sie behalten Ihre bestehenden Aufrufe für `useTranslation`, `Trans`, `withTranslation`, `i18next.t()` bei — die einzige Änderung ist der Importpfad.

2. **Vollständige Migration** — Ersetzen Sie schrittweise `react-i18next`-APIs durch native Intlayer-Hooks (`useIntlayer`, `IntlayerProvider`) und platzieren Sie Inhalte lokal in `.content.ts`-Dateien neben Ihren Komponenten.

Dieser Leitfaden behandelt zuerst **Strategie 1** (schneller Kompatibilitätsadapter) und geht dann auf die optionale vollständige Migration ein.

---

## Inhaltsverzeichnis

<TOC/>

---

## Schnelle Migration

Die folgenden Schritte sind das Minimum, das erforderlich ist, um Ihre bestehende `react-i18next`-App auf Intlayer laufen zu lassen, ohne Codeänderungen vornehmen zu müssen.

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die Intlayer-Kernpakete und die Kompatibilitätsadapter:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> Sie können `react-i18next` und `i18next` installiert lassen — die Kompatibilitätsadapter verwenden sie als optionale `devDependencies` / `peerDependencies` für TypeScript-Typen. Sie müssen keine Peers in der `package.json` ändern.

</Step>

<Step number={2} title="Intlayer konfigurieren">

Der Befehl `intlayer init` erstellt eine initiale Datei `intlayer.config.ts`. Aktualisieren Sie sie so, dass sie Ihren bestehenden Locales (Sprachen) entspricht, und verweisen Sie das `syncJSON`-Plugin auf Ihre Nachrichtendateien:

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
      // Entspricht der Platzhalter-Syntax von react-i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** ordnet ein Locale dem Dateipfad seiner JSON-Datei zu. **`location`** gibt dem Intlayer-Watcher an, welcher Ordner auf Änderungen überwacht werden soll. Die Option `format: 'i18next'` stellt sicher, dass Platzhalter wie `{{name}}` korrekt verarbeitet werden.

</Step>

<Step number={3} title="Das Intlayer-Plugin zu Ihrem Bundler hinzufügen">

Kapseln Sie Ihre bestehende Bundler-Konfiguration mit dem Kompatibilitäts-Plugin. Dieses integriert das Kern-Intlayer-Plugin, verbindet die Inhaltsüberwachung und — entscheidend — **injiziert Modul-Aliase**, sodass Ihre bestehenden Aufrufe für `import … from 'react-i18next'` (und `'i18next'`) zur Build-Zeit nahtlos auf `@intlayer/react-i18next` / `@intlayer/i18next` umgeleitet werden. Es sind keine Änderungen an den Quelldateien erforderlich.

**Für Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` kapselt das Plugin `intlayer()` von `vite-intlayer` und fügt automatisch die Aliase für `react-i18next` / `i18next` hinzu. Wenn Sie das normale `intlayer()`-Plugin von `vite-intlayer` verwenden, werden die Wörterbücher zwar kompiliert, die Aliase jedoch **nicht** hinzugefügt — dann müssten Sie Importe manuell in `@intlayer/*` umbenennen (siehe Schritt 4).

**Für Next.js:**

Wenn Sie `next-i18next` (Pages Router-Integration) verwenden, installieren Sie `@intlayer/next-i18next` und `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Fügen Sie dann das Kompatibilitäts-Plugin zu Ihrer `next.config.ts` hinzu (es injiziert die Aliase für `next-i18next` / `react-i18next` / `i18next`):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  /* Ihre Optionen */
};

export default withIntlayer(nextConfig);
```

> **Sie benötigen `i18next.init()` oder manuelles Provider-Bootstrapping nicht mehr.** Intlayer kompiliert alle Wörterbücher **zur Build-Zeit**, daher entfällt das Laden zur Laufzeit. Der aliasierte Provider übernimmt die Initialisierung für Sie.

</Step>

</Steps>

Das war's für die schnelle Migration. Ihre App läuft nun auf Intlayer, während alle Importe und `react-i18next`-APIs intakt bleiben.

> **Typisierte Übersetzungsschlüssel — automatisch.** Sobald Intlayer Ihre Wörterbücher kompiliert hat, sind `useTranslation` und `getFixedT` typisiert gegen Ihre tatsächlichen Inhalte. Die Schlüssel werden in Ihrer IDE autovervollständigt und ungültige Pfade führen zu TypeScript-Fehlern zur Build-Zeit — ohne zusätzliche Konfiguration.
>
> ```tsx
> // 'about' ist ein registrierter Dictionary-Schlüssel → t() akzeptiert nur gültige Pfade
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autovervollständigt
> t("does.not.exist"); // ✗ TypeScript-Fehler
>
> // Serverseite (i18next Instanz)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ typisiert
> ```

---

## Vollständige Migration

Die folgenden Schritte sind optional und können inkrementell durchgeführt werden. Sie schalten die volle Funktionalität von Intlayer frei: visueller Editor, CMS, typisierte Inhaltsdateien, KI-gestützte Übersetzung und mehr.

<Steps>

<Step number={4} title="Importe explizit umbenennen (Optional)" isOptional={true}>

Die Intlayer-Plugins kümmern sich bereits um das Aliasing auf Bundler-Ebene. Wenn Sie die Abhängigkeit in Ihren Quelldateien explizit machen möchten, können Sie die Importe manuell umbenennen:

| Vorher                                             | Nachher                                                      |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Für Next.js (`next-i18next`):

| Vorher                                                                         | Nachher                                                           |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

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
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
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

Sobald die Kompatibilitätsadapter vorhanden sind, kann der folgende Standard-`react-i18next` / `i18next`-Code gelöscht werden:

| Datei / Muster                         | Warum er nicht mehr benötigt wird                                                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aufrufe von `i18next.init()`           | Der Intlayer-Provider initialisiert alles automatisch; es gibt keinen Ladeschritt zur Laufzeit.                                                                         |
| `I18nextProvider` / `initReactI18next` | Das Intlayer-Plugin verarbeitet Injection und Bootstrapping intern.                                                                                                     |
| JSON-Sprachpakete (`locales/*.json`)   | JSON-Pakete werden nur benötigt, wenn Sie weiterhin das `syncJSON`-Plugin verwenden. Sobald Sie zu `.content.ts`-Dateien migrieren, können Sie den JSON-Ordner löschen. |

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
- **Intlayer mit React** — Vollständige Einrichtungsanleitung für React: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)
- **Intlayer mit Next.js** — Vollständige Einrichtungsanleitung für Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)
