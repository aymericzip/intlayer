---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Von svelte-i18n zu Intlayer migrieren"
description: "Migriere eine Svelte- oder SvelteKit-App Schritt für Schritt von svelte-i18n zu Intlayer. Die Stores $_, $date und $number funktionieren mit dem Compat Adapter @intlayer/svelte-i18n weiter."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Von svelte-i18n zu Intlayer migrieren

## Warum von svelte-i18n zu Intlayer migrieren?

<AccordionGroup>
<Accordion header="Bundle-Größe">

svelte-i18n registriert beim Start komplette Locale-Dateien. Intlayer liefert nur die Dictionaries, die jede Seite nutzt. Das **reduziert deine Bundle- und Seitengröße um bis zu 50 %**.

</Accordion>
<Accordion header="Wartbarkeit">

Keys sind gegen deine Dictionaries **typisiert**: Ungültige Keys schlagen beim Build fehl. Content kann neben den Komponenten liegen, die ihn nutzen.

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

1. **Compat Adapter (empfohlen für bestehende Apps)**: Installiere `@intlayer/svelte-i18n`. Er stellt dieselbe API wie `svelte-i18n` bereit (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) und liefert die Nachrichten aus Intlayer-Dictionaries. ICU MessageFormat funktioniert wie bisher.
2. **Vollständige Migration**: Ersetze svelte-i18n-Stores schrittweise durch `useIntlayer` aus `svelte-intlayer` und `.content.ts`-Dateien neben deinen Komponenten.

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
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> Lass `svelte-i18n` installiert: Es liefert die TypeScript-Typen.

</Step>
<Step number={2} title="Intlayer konfigurieren">

Richte das `syncJSON`-Plugin auf deine bestehenden Nachrichtendateien aus. Mit einer Datei pro Namespace (`src/locales/en/home.json`) wird jede Datei zu einem Dictionary:

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
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` wird zum Feld `title` des Dictionarys `home` aufgelöst. Wenn du eine einzige Datei pro Locale (`src/locales/en.json`) mit verschachtelten Namespaces nutzt, verwende stattdessen `source: ({ locale }) => \`./src/locales/${locale}.json\``: Jeder Top-Level-Key wird zu einem Dictionary.

</Step>
<Step number={3} title="Das Vite-Plugin hinzufügen">

`svelteI18nVitePlugin()` führt den Intlayer-Build aus und setzt einen Alias von `svelte-i18n` auf `@intlayer/svelte-i18n`, ohne Änderungen an deinen Quelldateien.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> Für SvelteKit füge `svelteI18nVitePlugin()` nach `sveltekit()` im selben `plugins`-Array hinzu.

</Step>
<Step number={4} title="Das i18n-Setup vereinfachen">

Behalte `init()`, entferne aber `register()` und `addMessages()`: Die Nachrichten kommen aus Intlayer-Dictionaries.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Deine Komponenten funktionieren unverändert weiter:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

`$locale = 'fr'` wechselt die Sprache sowohl für die svelte-i18n-Stores als auch für `useIntlayer`.

## Vollständige Migration

<Steps>
<Step number={5} title="Explizites Umbenennen der Imports (optional)" isOptional={true}>

Das Vite-Plugin übernimmt das Aliasing bereits. Um die Abhängigkeit explizit zu machen:

| Vorher                                       | Nachher                                                |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Content in .content.ts-Dateien verschieben" isOptional={true}>

Neue Komponenten können nativen Intlayer-Content nutzen, parallel zu bestehenden svelte-i18n-Aufrufen:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
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

| Datei / Muster                             | Warum es nicht mehr benötigt wird                              |
| ------------------------------------------ | -------------------------------------------------------------- |
| Aufrufe von `register()` / `addMessages()` | Die Dictionaries werden von Intlayer kompiliert und geladen.   |
| `waitLocale()` vor dem Rendern             | Die Nachrichten sind verfügbar, sobald die Locale gesetzt ist. |

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

- [svelte-i18n Compat Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/svelte-i18n.md)
- [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md)
- [Intlayer mit Vite und Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+svelte.md)
- [Intlayer mit SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_svelte_kit.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)
