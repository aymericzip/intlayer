---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Von react-intl (FormatJS) zu Intlayer migrieren"
description: "Migriere eine React-App Schritt für Schritt von react-intl zu Intlayer. useIntl, FormattedMessage und alle Formatted*-Komponenten funktionieren mit dem Compat Adapter @intlayer/react-intl weiter."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Von react-intl (FormatJS) zu Intlayer migrieren

## Warum von react-intl zu Intlayer migrieren?

<AccordionGroup>
<Accordion header="Bundle-Größe">

Mit react-intl werden alle Nachrichten der Locale an `IntlProvider` übergeben, sodass jede Seite den gesamten Katalog mitbringt. Intlayer liefert nur die Dictionaries, die jede Seite nutzt. Das **reduziert deine Bundle- und Seitengröße um bis zu 50 %**.

</Accordion>
<Accordion header="Wartbarkeit">

Nachrichten-IDs sind gegen deine Dictionaries **typisiert**: Ungültige IDs schlagen beim Build fehl. Content kann neben den Komponenten liegen, die ihn nutzen.

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

1. **Compat Adapter (empfohlen für bestehende Apps)**: Installiere `@intlayer/react-intl`. Er stellt dieselbe API wie `react-intl` bereit (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) und liefert die Nachrichten aus Intlayer-Dictionaries. ICU MessageFormat, Plurale, Selects und Rich-Text-Tags funktionieren wie bisher.
2. **Vollständige Migration**: Ersetze react-intl-Aufrufe schrittweise durch `useIntlayer` und `.content.ts`-Dateien neben deinen Komponenten.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> Lass `react-intl` installiert: Es liefert die TypeScript-Typen.

</Step>
<Step number={2} title="Intlayer konfigurieren">

Richte das `syncJSON`-Plugin auf deine bestehenden Nachrichtendateien aus. react-intl-Kataloge sind flache Maps aus IDs mit Punkten:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> Das erste Segment jeder ID (`home`) wird zu einem Intlayer-Dictionary, sodass jede Seite nur die Dictionaries lädt, die sie nutzt. Wenn Intlayer Übersetzungen zurückschreibt, behält die Datei ihre flache Struktur.

</Step>
<Step number={3} title="Das Vite-Plugin hinzufügen">

`reactIntlVitePlugin()` führt den Intlayer-Build aus und setzt einen Alias von `react-intl` auf `@intlayer/react-intl`, ohne Änderungen an deinen Quelldateien.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Du nutzt einen anderen Bundler? Benenne die Imports in `@intlayer/react-intl` um (siehe Schritt 5) und verwende das Intlayer-Plugin für deinen Bundler, zum Beispiel `withIntlayer` aus `next-intlayer` für Next.js.

</Step>
<Step number={4} title="Keine Nachrichten mehr an IntlProvider übergeben">

`IntlProvider` funktioniert weiter, aber die Nachrichten werden jetzt von Intlayer geladen. Entferne die Prop `messages` und den Katalog-Import:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> Wird `messages` weiterhin übergeben, wird es ignoriert und im Development eine Warnung ausgegeben.

</Step>
</Steps>

Deine Komponenten funktionieren unverändert weiter, mit typisierten IDs:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## Vollständige Migration

<Steps>
<Step number={5} title="Explizites Umbenennen der Imports (optional)" isOptional={true}>

Das Vite-Plugin übernimmt das Aliasing bereits. Um die Abhängigkeit explizit zu machen:

| Vorher                                          | Nachher                                                   |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Content in .content.ts-Dateien verschieben" isOptional={true}>

Neue Komponenten können nativen Intlayer-Content nutzen, parallel zu bestehenden react-intl-Aufrufen:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

Ergänzte Übersetzungen werden in deine JSON-Dateien zurückgeschrieben. Siehe die [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) für die KI-Konfiguration.

</Step>
</Steps>

## Was du nach der Migration löschen kannst

| Datei / Muster                               | Warum es nicht mehr benötigt wird                                                   |
| -------------------------------------------- | ----------------------------------------------------------------------------------- |
| Prop `messages` und Laden des Katalogs       | Die Dictionaries werden von Intlayer kompiliert und geladen.                        |
| Schritt `formatjs compile`                   | Intlayer parst ICU-Nachrichten direkt aus den JSON-Dateien.                         |
| ID-Generierung durch `babel-plugin-formatjs` | Verwende explizite IDs mit Punkten, damit jede ID einem Dictionary zugeordnet wird. |

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

- [react-intl Compat Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-intl.md)
- [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md)
- [Intlayer mit Vite und React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)
- [Migration von react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_react-i18next_to_intlayer.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)
