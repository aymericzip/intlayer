---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migration von next-intl zu Intlayer | Internationalisierung (i18n)"
description: "Erfahren Sie, wie Sie Ihre Next.js-App von next-intl zu Intlayer migrieren — Schritt für Schritt, ohne Ihren bestehenden Code zu beeinträchtigen. Verwenden Sie den @intlayer/next-intl-Kompatibilitätsadapter für einen nahtlosen Übergang."
keywords:
  - next-intl
  - intlayer
  - Migration
  - Internationalisierung
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migration von next-intl zu Intlayer

## Warum von next-intl zu Intlayer migrieren?

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

## Migrationsstrategie

Der empfohlene Ansatz für bestehende Anwendungen ist der **Kompatibilitätsadapter**: Installieren Sie `@intlayer/next-intl`. Dieser Adapter bietet **genau dieselbe API** wie `next-intl`, delegiert jedoch die gesamte Übersetzungsarbeit im Hintergrund an Intlayer.

Sie behalten Ihre bestehenden `useTranslations`, `getTranslations`, `NextIntlClientProvider` und andere Komponenten bei — **die einzige Änderung ist der Importpfad**. Es ist kein Refactoring von Call-Signaturen, Props oder Komponentenstrukturen erforderlich.

Mit der Zeit können Sie optional einzelne Dateien in das reichhaltigere `.content.ts`-Format von Intlayer migrieren, um den visuellen Editor, das CMS und Inhalts-Scoping auf Komponentenebene freizuschalten — dieser Schritt ist jedoch völlig optional und kann schrittweise durchgeführt werden.

---

## Inhaltsverzeichnis

<TOC/>

---

## Schnelle Migration

Die folgenden Schritte sind das Minimum, das erforderlich ist, um Ihre bestehende `next-intl`-App auf Intlayer laufen zu lassen, ohne Codeänderungen vornehmen zu müssen.

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die Intlayer-Kernpakete und den Kompatibilitätsadapter `@intlayer/next-intl`:

```bash packageManager="npm"
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
bun x intlayer init
```

> Behalten Sie `next-intl` installiert — es wird weiterhin für **URL-Routing** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`) benötigt. Der Kompatibilitätsadapter ersetzt die Routing-Schicht **nicht**.

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
      // 'icu' entspricht der ICU-Platzhalter-Syntax von next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** ordnet ein Locale dem Dateipfad seiner JSON-Datei zu. **`location`** gibt dem Intlayer-Watcher an, welcher Ordner auf Änderungen überwacht werden soll. Die Option `format: 'icu'` stellt sicher, dass ICU-Platzhalter wie `{name}` und `{count, plural, one {# item} other {# items}}` korrekt verarbeitet werden.

> Eine vollständige Liste der Konfigurationsoptionen finden Sie in der [Konfigurations-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Step>

<Step number={3} title="Das Intlayer-Plugin in Next.js integrieren">

Kapseln Sie Ihre bestehende Next.js-Konfiguration mit `createNextIntlPlugin` aus `@intlayer/next-intl/plugin`. Dieser Wrapper wendet `withIntlayer` an **und** registriert den Alias `next-intl` → `@intlayer/next-intl` für Sie:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* Ihre bestehenden Konfigurationsoptionen */
};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` kapselt `withIntlayer`, erkennt automatisch **Webpack** oder **Turbopack**, verbindet die Inhaltsüberwachung, kompiliert die Wörterbücher und — entscheidend — **injiziert Modul-Aliase**, sodass Ihre bestehenden Aufrufe für `import … from 'next-intl'` zur Build-Zeit transparent auf `@intlayer/next-intl` umgeleitet werden. Der Routing-Einstiegspunkt `next-intl/routing` verweist weiterhin auf das eigentliche Paket. Es sind keine Änderungen an den Quelldateien erforderlich.
>
> Bevorzugen Sie das einfache `withIntlayer` aus `next-intlayer/server`? Es kompiliert Ihre Wörterbücher, fügt jedoch **nicht** die Aliase für `next-intl` hinzu — dann müssten Sie Importe manuell in `@intlayer/next-intl` umbenennen (siehe Schritt 4).

> **Sie benötigen `getRequestConfig` oder `loadMessages` nicht mehr.** Mit `next-intl` mussten Sie eine Datei `src/i18n.ts` schreiben, die JSON-Nachrichtenpakete bei jeder Anfrage über `getRequestConfig` lud. Intlayer kompiliert alle Wörterbücher **zur Build-Zeit**, daher entfällt das Laden zur Laufzeit. Sie können diese Datei vollständig löschen (oder nur die Routing-Teile behalten, falls Sie weiterhin `createNavigation` verwenden).

</Step>

</Steps>

Das war's für die schnelle Migration. Ihre App läuft nun auf Intlayer, während alle Importe und `next-intl`-APIs intakt bleiben.

> **Typisierte Übersetzungsschlüssel — automatisch.** Sobald Intlayer Ihre Wörterbücher kompiliert hat, sind `useTranslations` und `getTranslations` typisiert gegen Ihre tatsächlichen Inhalte. Die Schlüssel werden in Ihrer IDE autovervollständigt und ungültige Pfade führen zu TypeScript-Fehlern zur Build-Zeit — ohne zusätzliche Konfiguration.
>
> ```tsx
> // Client-Komponente — 'about' ist ein registrierter Dictionary-Schlüssel
> const t = useTranslations("about");
> t("counter.label"); // ✓ autovervollständigt
> t("does.not.exist"); // ✗ TypeScript-Fehler
>
> // Server-Komponente
> const t = await getTranslations("about");
> t("counter.label"); // ✓ typisiert
> ```

---

## Vollständige Migration

Die folgenden Schritte sind optional und können inkrementell durchgeführt werden. Sie schalten die volle Funktionalität von Intlayer frei: visueller Editor, CMS, typisierte Inhaltsdateien, KI-gestützte Übersetzung und mehr.

<Steps>

<Step number={4} title="Importe explizit umbenennen (Optional)" isOptional={true}>

Der `createNextIntlPlugin()`-Wrapper übernimmt bereits das Aliasing `next-intl` → `@intlayer/next-intl` auf Bundler-Ebene. Wenn Sie die Abhängigkeit in Ihren Quelldateien explizit machen möchten (und stattdessen das einfache `withIntlayer`-Plugin verwenden), können Sie die Importe manuell umbenennen:

| Vorher                                               | Nachher                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Behalten Sie immer die Routing-Importe aus dem echten `next-intl` bei — der Kompatibilitätsadapter ersetzt die URL-Routing-Schicht **nicht**:
>
> ```ts
> // ✅ Diese immer aus dem echten 'next-intl' importieren
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> Alternativ können Sie `defineRouting` aus `@intlayer/next-intl/routing` verwenden, welches Ihre in `intlayer.config.ts` definierten Locale-Einstellungen automatisch zusammenführt.

</Step>

<Step number={5} title="Aktivieren der KI-gestützten Übersetzungsautomatisierung" isOptional={true}>

Sobald Intlayer konfiguriert ist, können Sie die CLI verwenden, um fehlende Übersetzungen automatisch mithilfe des LLM Ihrer Wahl aufzufüllen:

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

Fügen Sie einen `OPENAI_API_KEY` (oder den Schlüssel Ihres bevorzugten Anbieters) zu Ihrer `.env`-Datei hinzu und erweitern Sie Ihre `intlayer.config.ts`:

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
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

Sobald `@intlayer/next-intl` eingerichtet ist, kann der folgende Standard-`next-intl`-Code gelöscht werden:

| Datei / Muster                                          | Warum er nicht mehr benötigt wird                                                                                                                                                                 |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getRequestConfig`-Export in `src/i18n.ts`              | Intlayer kompiliert die Wörterbücher zur Build-Zeit; es gibt kein Laden von Nachrichten pro Request. Behalten Sie die Datei nur, wenn sie auch Hilfsfunktionen für `createNavigation` exportiert. |
| Aufruf von `loadMessages()` / `getMessages()` im Layout | Der `NextIntlClientProvider` aus `@intlayer/next-intl` liest aus dem kompilierten Output; das `messages`-Prop ist nicht erforderlich.                                                             |
| Importe von `locales/{locale}/*.json` im Layout         | JSON-Pakete werden nur benötigt, wenn Sie weiterhin das `syncJSON`-Plugin verwenden. Sobald Sie zu `.content.ts`-Dateien migrieren, können Sie den JSON-Ordner löschen.                           |

Wenn Sie bereit sind, weiterzugehen, **erkennt Intlayer automatisch alle `.content.ts`- und `.content.json`-Dateien überall in Ihrer Codebasis** (standardmäßig überall innerhalb von `./src`). Sie können eine Datei `about.content.ts` direkt neben Ihrer `about/page.tsx` platzieren, und Intlayer wird sie zur Build-Zeit ohne zusätzliche Konfiguration erkennen — keine Importe, keine Registrierung, keine zentrale Index-Datei erforderlich. Dies macht die Kollokation von Übersetzungen mit Seiten und Komponenten völlig nahtlos.

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
- **Intlayer mit Next.js** — Vollständige Einrichtungsanleitung für Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)
