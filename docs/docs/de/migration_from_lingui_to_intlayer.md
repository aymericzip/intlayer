---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Von Lingui zu Intlayer migrieren"
description: "Migriere eine React-App Schritt für Schritt von Lingui zu Intlayer. Deine Lingui-Makros, useLingui und <Trans> funktionieren mit dem Compat Adapter @intlayer/lingui weiter."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Von Lingui zu Intlayer migrieren

## Warum von Lingui zu Intlayer migrieren?

<AccordionGroup>
<Accordion header="Bundle-Größe">

Lingui lädt pro Locale einen kompilierten Katalog mit allen Nachrichten der App. Intlayer teilt den Content pro Dictionary auf und liefert nur, was jede Seite nutzt. Das **reduziert deine Bundle- und Seitengröße um bis zu 50 %**.

</Accordion>
<Accordion header="Wartbarkeit">

Intlayer-Dictionaries sind **vollständig typisiert** und können neben den Komponenten liegen, die sie nutzen. Kein `extract`- / `compile`-Schritt mehr, an den man denken muss: Die Dictionaries werden vom Bundler-Plugin gebaut.

</Accordion>
<Accordion header="KI-Agent">

Co-lokalisierter Content **reduziert den nötigen Kontext** für LLMs. Intlayer liefert eine **CLI** zum Prüfen fehlender Übersetzungen, einen **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**, einen **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)** und **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**.

</Accordion>
<Accordion header="Automatisierung">

Übersetze fehlende Nachrichten in deiner CI/CD-Pipeline mit dem LLM deiner Wahl oder im Hintergrund mit der [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).

</Accordion>
<Accordion header="Skalieren mit Nicht-Entwicklern">

Intlayer bietet einen selbst gehosteten **[visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)**, damit Übersetzer und Texter Inhalte in Echtzeit bearbeiten können.

</Accordion>
</AccordionGroup>

> Um zu verstehen, woher diese Bibliotheken kommen, lies [die Geschichte von JavaScript-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md).

## Migrationsstrategien

1. **Compat Adapter (empfohlen für bestehende Apps)**: Installiere `@intlayer/lingui`. Er stellt dieselbe API wie `@lingui/core` und `@lingui/react` bereit (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) und liefert die Nachrichten aus Intlayer-Dictionaries. Deine Makros (`` t`…` ``, `<Trans>`, `msg`, `plural`) kompilieren genau wie vorher.
2. **Vollständige Migration**: Ersetze Lingui-Aufrufe schrittweise durch `useIntlayer` und `.content.ts`-Dateien neben deinen Komponenten.

## Inhaltsverzeichnis

<TOC/>

## Schnelle Migration

<Steps>
<Step number={1} title="Abhängigkeiten installieren">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> Das Flag `--interactive` ist optional. Verwende `intlayer-cli init`, wenn du ein KI-Agent bist.

Der Befehl erkennt deine Umgebung und installiert die benötigten Packages, zum Beispiel:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> Lass `@lingui/core`, `@lingui/react` und dein Makro-Plugin (`@lingui/babel-plugin-lingui-macro` oder `@lingui/swc-plugin`) installiert. Die Makros laufen weiterhin, und die Lingui-Packages liefern die TypeScript-Typen.

</Step>
<Step number={2} title="Intlayer konfigurieren">

Intlayer liest deine Lingui-Kataloge als Source of Truth. Mit der Standardstruktur von Lingui (`src/locales/{locale}/messages.po`) richtest du das `syncPO`-Plugin darauf aus:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="JSON-Kataloge verwenden">

Mit `@lingui/format-json` verwendest du `syncJSON` mit dem ICU-Format:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> Verwende explizite Nachrichten-IDs (`t({ id: "hero.title", message: "Welcome" })` oder `<Trans id="hero.title">`). Aus dem Quelltext generierte IDs werden nicht gegen die Kataloge aufgelöst.

</Step>
<Step number={3} title="Das Lingui-Vite-Plugin ersetzen">

Ersetze `@lingui/vite-plugin` durch `@intlayer/lingui/plugin`. Das Binding bleibt `lingui()`: Es führt den Intlayer-Build aus und setzt Aliase von `@lingui/core` und `@lingui/react` auf `@intlayer/lingui`, ohne Änderungen an deinen Quelldateien.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> Lass das Makro-Plugin im React-Plugin (Babel oder `@lingui/swc-plugin`), damit Makros zu `i18n._()`-Aufrufen kompiliert werden, bevor Intlayer sie auflöst.

</Step>
</Steps>

Deine Komponenten funktionieren unverändert weiter:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

Der Locale-Wechsel läuft weiterhin über `i18n.activate(locale)`, das jeden `useLingui()`-Consumer aktualisiert.

## Vollständige Migration

<Steps>
<Step number={4} title="Laden der Kataloge zur Laufzeit entfernen" isOptional={true}>

Die Nachrichten kommen jetzt aus Intlayer-Dictionaries, die beim Build kompiliert werden. Aufrufe von `i18n.load()` / `i18n.loadAndActivate()` dienen nur noch als Fallback und geben im Development eine Warnung aus. Ersetze sie durch `i18n.activate(locale)` und entferne den Schritt `lingui compile`. Behalte `lingui extract`, um neue Nachrichten-IDs zu sammeln.

</Step>
<Step number={5} title="Explizites Umbenennen der Imports (optional)" isOptional={true}>

Das Vite-Plugin übernimmt das Aliasing bereits. Um die Abhängigkeit explizit zu machen:

| Vorher                                             | Nachher                                               |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Content in .content.ts-Dateien verschieben" isOptional={true}>

Neue Komponenten können nativen Intlayer-Content nutzen, parallel zu bestehenden Lingui-Aufrufen:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

</Step>
<Step number={7} title="KI-gestützte Übersetzung aktivieren" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
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

Ergänzte Übersetzungen werden in deine Lingui-Kataloge zurückgeschrieben. Siehe die [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) für die KI-Konfiguration.

</Step>
</Steps>

## Was du nach der Migration löschen kannst

| Datei / Muster                                  | Warum es nicht mehr benötigt wird                            |
| ----------------------------------------------- | ------------------------------------------------------------ |
| `i18n.load()` / dynamische Katalog-Imports      | Die Dictionaries werden von Intlayer kompiliert und geladen. |
| `lingui compile` und kompilierte `.js`-Kataloge | Intlayer baut die Dictionaries direkt aus deinen Katalogen.  |
| `@lingui/vite-plugin`                           | Ersetzt durch `lingui()` aus `@intlayer/lingui/plugin`.      |

## TypeScript konfigurieren

Nimm die generierten Typen in deine `tsconfig.json` auf:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git-Konfiguration

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Lingui Compat Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui.md)
- [Sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md)
- [Intlayer mit Vite und React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md)
