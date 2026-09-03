---
createdAt: 2026-08-23
updatedAt: 2026-08-30
title: "Elysia i18n - Vollständiger Leitfaden zum Übersetzen deiner App"
description: "Kein i18next mehr. Der 2026er Leitfaden zum Erstellen einer mehrsprachigen (i18n) Elysia-App. Übersetze mit KI-Agenten und optimiere die Bundle-Größe, SEO und Leistung."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Richtet den Leitfaden am Elysia-Template aus (Context-Typisierung, Bun-Setup, Scripts)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Übersetzen Sie Ihre Elysia-Backend-Website mit Intlayer | Internationalisierung (i18n)

`elysia-intlayer` ist ein leistungsstarkes Internationalisierungs-(i18n-)Plugin für Elysia-Anwendungen, das Ihre Backend-Dienste global zugänglich macht, indem es lokalisierte Antworten basierend auf den Voreinstellungen des Clients bereitstellt.

> Siehe [Package-Implementierung auf GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer).

### Praktische Anwendungsfälle

- **Anzeige von Backend-Fehlern in der Sprache des Benutzers**: Wenn ein Fehler auftritt, verbessert die Anzeige von Meldungen in der Muttersprache des Benutzers das Verständnis und reduziert Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Frontend-Komponenten wie Toasts oder Modalen angezeigt werden könnten.
- **Abruf mehrsprachiger Inhalte**: Für Anwendungen, die Inhalte aus einer Datenbank abrufen, stellt Internationalisierung sicher, dass Sie diese Inhalte in mehreren Sprachen bereitstellen können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Benutzer bevorzugten Sprache anzeigen müssen.
- **Versand mehrsprachiger E-Mails**: Ob Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen – der Versand von E-Mails in der Sprache des Empfängers kann die Engagement- und Effektivitätsraten erheblich erhöhen.
- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen können Push-Benachrichtigungen in der bevorzugten Sprache des Benutzers die Interaktion und Bindung verbessern. Diese persönliche Note kann Benachrichtigungen relevanter und handlungsorientierter wirken lassen.
- **Weitere Kommunikationen**: Jede Form der Backend-Kommunikation, wie SMS-Nachrichten, Systembenachrichtigungen oder Benutzeroberflächen-Updates, profitiert davon, in der Sprache des Benutzers zu erfolgen, um Klarheit zu gewährleisten und das Gesamtbenutzererlebnis zu verbessern.

Durch die Internationalisierung des Backend respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern orientiert sich auch besser an globalen Marktanforderungen, was ein Schlüsselschritt bei der weltweiten Skalierung Ihrer Services ist.

## Erste Schritte

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Siehe [Application Template](https://github.com/aymericzip/intlayer-elysia-template) auf GitHub.

### Installation

Um `elysia-intlayer` zu verwenden, installieren Sie das Paket mit npm:

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

> Das `--interactive` Flag ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt Ihre Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> Elysia zielt auf die **Bun**-Runtime ab. `elysia-intlayer` setzt auf `AsyncLocalStorage` (statt auf die von den Node-basierten Intlayer-Plugins verwendete `cls-hooked`-Library), gerade weil Bun `async_hooks.createHook` nicht implementiert.

### Setup

Konfigurieren Sie die Internationalisierungseinstellungen, indem Sie eine `intlayer.config.ts` in Ihrem Projektroot erstellen:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * Standard-Locale, die als Fallback verwendet wird, wenn die angeforderte Locale nicht gefunden wird.
     */
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Deklarieren Sie Ihren Content

Erstellen und verwalten Sie Ihre Content-Deklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      de: "Beispiel für zurückgegebene Inhalte auf Deutsch",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "de": "Beispiel für zurückgegebene Inhalte auf Deutsch",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es": "Ejemplo de contenido devuelto en español"
      }
    }
  }
}
```

> Ihre Content-Deklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir`-Verzeichnis enthalten sind (standardmäßig `./src`). Und der Content-Deklarationsdatei-Erweiterung entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Weitere Details finden Sie in der [Content-Deklarationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Elysia-Anwendungssetup

Richten Sie Ihre Elysia-Anwendung für die Verwendung von `elysia-intlayer` ein:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // Laden Sie das Internationalisierungs-Plugin
  .use(intlayer())
  // Routen
  .get("/", ({ intlayer }) => ({
    // Locale für diese Anfrage, `Accept-Language` verhandelt oder aus dem Speicher gelesen
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      de: "Hallo",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Das Plugin registriert seinen Context über ein **globales** `derive`, das Elysia als `Partial<{ intlayer: IntlayerContext }>` typisiert. Zur Laufzeit ist der Wert für alle nach `.use(intlayer())` registrierten Routen immer vorhanden — verwenden Sie daher die Non-Null-Assertion (`intlayer!.locale`) oder Optional Chaining, um TypeScript im `strict`-Modus zufriedenzustellen.

Der Route-Context stellt Folgendes bereit:

| Eigenschaft       | Beschreibung                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `locale`          | Die für diese Anfrage zu verwendende Locale, wobei `locale_storage` Vorrang vor `locale_detected` hat. |
| `locale_storage`  | Die vom Client über ein Cookie oder einen Header explizit angeforderte Locale.                         |
| `locale_detected` | Die aus den Request-Headern ausgehandelte Locale.                                                      |
| `defaultLocale`   | Die in `intlayer.config.ts` als Fallback konfigurierte Locale.                                         |
| `t`               | Eine Übersetzungsfunktion.                                                                             |
| `getIntlayer`     | Eine Funktion zum Abrufen von Wörterbüchern anhand ihres Schlüssels.                                   |
| `getDictionary`   | Eine Funktion zum Verarbeiten von Wörterbuchobjekten.                                                  |

Dieselben Helper werden auch als Standalone-Exports bereitgestellt. Sie lösen die aktuelle Anfrage über `AsyncLocalStorage` auf, sodass Sie sie ohne Destructuring des Contexts aufrufen können:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      de: "Beispiel für zurückgegebene Inhalte auf Deutsch",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> Der Request-Kontext wird freigegeben, sobald die Response gemappt wurde, sodass die eigenständigen Helper niemals gegen eine bereits beendete Anfrage auflösen. Werden sie außerhalb einer vom Plugin behandelten Anfrage aufgerufen, greifen sie auf die konfigurierte Standard-Locale zurück.

### Ihre Anwendung starten

Fügen Sie die Intlayer-Scripts zu Ihrer `package.json` hinzu. `intlayer build` kompiliert Ihre Content-Deklarationen in das Verzeichnis `.intlayer` und generiert die TypeScript-Typen:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Starten Sie anschließend den Server:

```bash
bun run dev
```

Testen Sie die Locale-Aushandlung mit `Accept-Language`:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `intlayer build` ist vor `bun run src/index.ts` nicht zwingend erforderlich: Das Plugin bereitet die Dictionaries auch beim Start der Elysia-Anwendung vor. Wenn Sie es vorab ausführen, bleiben die generierten Typen für Ihren Editor aktuell und die Build-Kosten fallen nicht bei der ersten Anfrage an.

### Kompatibilität

`elysia-intlayer` ist vollständig kompatibel mit:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) für React-Anwendungen
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md) für Next.js-Anwendungen
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/index.md) für Vite-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung in verschiedenen Umgebungen, einschließlich Browser und API-Anfragen.

Standardmäßig löst das Plugin die Locale in dieser Reihenfolge auf:

1. Das Cookie `INTLAYER_LOCALE`.
2. Der Header `x-intlayer-locale`.
3. Die Aushandlung über den `Accept-Language`-Header.

Sie können das Cookie und den Header anpassen, die für die Locale-Erkennung verwendet werden:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Weitere Konfigurationsoptionen
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Weitere Informationen zu Konfiguration und erweiterten Themen finden Sie in unserer [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### TypeScript konfigurieren

`elysia-intlayer` nutzt die robusten Funktionen von TypeScript, um den Internationalisierungsprozess zu verbessern. Die statische Typisierung von TypeScript stellt sicher, dass jeder Übersetzungsschlüssel berücksichtigt wird, wodurch das Risiko fehlender Übersetzungen reduziert und die Wartbarkeit verbessert wird.

Stellen Sie sicher, dass die automatisch generierten Typen (standardmäßig unter ./types/intlayer.d.ts) in Ihrer tsconfig.json-Datei enthalten sind.

```json5 fileName="tsconfig.json"
{
  // ... Ihre vorhandenen TypeScript-Konfigurationen
  "include": [
    // ... Ihre vorhandenen TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Die automatisch generierten Typen einschließen
  ],
}
```

### VS Code Extension

Um dein Entwicklungserlebnis mit Intlayer zu verbessern, kannst du die offizielle **Intlayer VS Code Extension** installieren.

[Aus dem VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Extension bietet:

- **Autocompletion** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschau** des übersetzten Inhalts.
- **Schnellaktionen** zum einfachen Erstellen und Aktualisieren von Übersetzungen.

Weitere Informationen zur Verwendung der Extension findest du in der [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, sie in Ihr Git-Repository zu committen.

Dazu können Sie die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzufügen:

```plaintext fileName=".gitignore"
# Von Intlayer generierte Dateien ignorieren
.intlayer
```

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um ein Elysia-Backend zu internationalisieren?">

Elysia hat keine eigene i18n-Ebene, sodass die Optionen eine generische Bibliothek wie `i18next` sind, die manuell in einen Hook eingebunden wird, oder `Intlayer` über `elysia-intlayer`, das das Plugin für Sie registriert, die Locale pro Anfrage auflöst und denselben typisierten Inhalt wie Ihr Frontend teilt.

Der Grund, das Backend überhaupt zu internationalisieren, ist, dass ein großer Teil des Textes, den ein Nutzer liest, nie durch das Frontend läuft: API-Fehlermeldungen, Transaktions-E-Mails, Push-Benachrichtigungen, SMS und PDF-Exporte. Diese brauchen die Sprache des Empfängers, aufgelöst pro Anfrage statt pro Sitzung.

Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).

</Question>

<Question title="Wie viel trägt i18n zur Bundle-Größe meines Elysia-Servers bei?">

Sehr wenig. Wörterbücher werden im Voraus kompiliert und nur die von Ihnen deklarierten Locales sind enthalten, sodass es beim Start kein Katalog-Laden und auf dem Anfragepfad keine Dateizugriffe gibt. Das zählt am meisten bei Serverless- und Edge-Deployments, wo die Bundle-Größe die Kaltstartzeit bestimmt. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md).

</Question>

<Question title="Kann ich von `i18next` migrieren, ohne meine Handler neu zu schreiben?">

Ja, und es gibt zwei Wege. Sie können die Inhalte schrittweise migrieren mit dem [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md). Oder Sie behalten Ihre aktuelle API vollständig bei: Die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) stellen genau dieselbe API wie `i18next` bereit, aber aus Intlayer-Wörterbüchern bedient, sodass sich Importe ändern und der Handler-Code nicht.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein. Führen Sie `npx intlayer extract` aus; Intlayer liest Ihre Quelldateien, zieht die für den Nutzer sichtbaren Strings heraus und schreibt neben jede eine `.content`-Datei, sodass Sie ein Diff prüfen, statt Strings einzeln in einen Katalog zu kopieren. Siehe den [extract-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md).

Auf der Frontend-Seite desselben Projekts geht der [Intlayer-Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) weiter und generiert die Wörterbücher zur Build-Zeit aus Ihrem JSX-, TSX-, Vue- oder Svelte-Quellcode, sodass die beiden Hälften der App eine Inhaltsebene teilen, ohne von Hand gepflegte Schlüssel.

</Question>

<Question title="Welches Editor- und KI-Agenten-Tooling ist verfügbar?">

Fünf Bausteine, alle optional:

- **[VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)**: von einem `useIntlayer`-Schlüssel zur Inhaltsdatei springen, die ihn deklariert, Inhalte aus einer Komponente extrahieren und build, fill, test, push und pull über die Befehlspalette oder einen eigenen Intlayer-Tab ausführen.
- **[LSP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**: dieselbe Wahrnehmung in jedem Editor, der LSP spricht, mit „Gehe zu Definition“, „Alle Referenzen suchen“, Hover-Vorschauen eines übersetzten Werts, Autovervollständigung von Schlüsseln und Feldern sowie einer Warnung, wenn ein Schlüssel nirgends deklariert ist. Es löst außerdem `i18next`-, `react-i18next`-, `next-intl`- und `use-intl`-Aufrufe auf, was bei der Migration hilft.
- **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)**: stellt die Intlayer-Dokumentation und -CLI für Cursor, VS Code, Claude Desktop, Claude Code und ChatGPT bereit, sodass ein Assistent aus der aktuellen Doku antwortet statt zu raten und Befehle wie `intlayer fill` selbst ausführen kann.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**: fokussierte Skills wie `intlayer-config`, `intlayer-cli` und `intlayer-content` sowie eines pro Framework, die einem Agenten Ihr Routing-Setup und die Inhaltsknoten-Typen beibringen.
- **[ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)**: `no-raw-text` markiert fest kodierte Strings, mit weiteren Regeln für statische Wörterbuchschlüssel und ungenutzte Inhalte.

</Question>

<Question title="Woher weiß Intlayer, in welcher Sprache es antworten soll?">

Standardmäßig liest `elysia-intlayer` den `Accept-Language`-Header der eingehenden Anfrage und wählt die am nächsten passende deklarierte Locale, mit Rückfall auf Ihre Standard-Locale. Sie können die Quelle mit `routing.storage` ändern, zum Beispiel ein benutzerdefinierter Header oder ein von Ihrem Frontend gesetztes Cookie, sodass die API in der Sprache antwortet, die der Nutzer tatsächlich gewählt hat, statt in der, die sein Browser meldet. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Ist die Locale pro Anfrage isoliert?">

Ja. Das Plugin begrenzt die aktive Locale auf die Anfrage, sodass zwei gleichzeitige Anfragen in verschiedenen Sprachen niemals die Locale der jeweils anderen lesen. Das macht `t()` und `getIntlayer()` sicher aufrufbar aus einem Service, ohne ein Locale-Argument durch jede Funktion zu reichen.

</Question>

<Question title="Wie versende ich Transaktions-E-Mails in der Sprache des Empfängers?">

Deklarieren Sie den E-Mail-Inhalt wie jeden anderen Inhalt in einer Inhaltsdatei und lösen Sie ihn dann mit `getIntlayer` für die gespeicherte Locale des Empfängers statt für die Anfrage-Locale auf. Das ist wichtig für Jobs und Queues, wo die Sprache zum Nutzerdatensatz gehört und es keine eingehende Anfrage gibt, aus der ein Header gelesen werden kann.

</Question>

<Question title="Wie lokalisiere ich API-Fehlermeldungen?">

Umschließen Sie die Nachricht an der Stelle, an der der Fehler erstellt wird, mit `t()`. Die aktive Anfrage-Locale löst sie auf, sodass der Client eine Nachricht erhält, die er direkt anzeigen kann, und Ihr Frontend keinen parallelen Katalog von Fehlercodes braucht.

</Question>

<Question title="Funktioniert es auf Bun und auf Edge-Runtimes?">

Elysia zielt zuerst auf Bun, und Intlayer löst Inhalte aus zur Build-Zeit kompilierten Wörterbüchern auf, statt zur Laufzeit Katalogdateien von der Festplatte zu lesen, was auf Edge-Runtimes üblicherweise bricht. Belassen Sie `dictionary.importMode` bei der Voreinstellung `"static"`, sodass der Inhalt mit dem Server gebündelt wird.

</Question>

<Question title="Behält das Plugin die durchgängige Typinferenz von Elysia bei?">

Ja. Das Plugin wird wie jedes andere Elysia-Plugin mit `.use()` registriert, sodass die verketteten Typen weiterfließen, und Ihre Wörterbuchschlüssel werden getrennt von der generierten `types/intlayer.d.ts` typisiert.

</Question>

<Question title="Wie übersetze ich die Backend-Inhalte automatisch mit KI?">

Führen Sie `npx intlayer fill` aus, das fehlende Übersetzungen mit dem LLM Ihrer Wahl unter Verwendung Ihres eigenen Anbieters und API-Schlüssels füllt. Fügen Sie `--git-diff` hinzu, um nur die im Branch geänderten Inhalte zu übersetzen. Siehe den [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und die [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

</Question>

<Question title="Unterstützt Intlayer Pluralformen, Genus und interpolierte Werte auf dem Server?">

Ja: [Pluralformen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/plurial.md), [genusbasierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md), Bedingungen, [Einfügungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md) für interpolierte Werte, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md) für E-Mail-Texte und [Formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) für Zahlen, Daten und Währungen.

</Question>

<Question title="Erhalte ich TypeScript-Autovervollständigung auf dem Server?">

Ja. Intlayer generiert die Typen Ihrer Wörterbücher nach `./types/intlayer.d.ts`, sodass ein Schlüssel, der nicht existiert, ein Compile-Fehler ist statt eines leeren Strings zur Laufzeit. Führen Sie `npx intlayer test` in der CI aus, um den Build fehlschlagen zu lassen, wenn einer deklarierten Locale Inhalt fehlt.

</Question>

<Question title="Können sich Frontend und Backend denselben Inhalt teilen?">

Ja, und das ist das übliche Setup. `elysia-intlayer` funktioniert zusammen mit `react-intlayer`, `next-intlayer` und `vite-intlayer` auf demselben deklarierten Inhalt, sodass ein Label, das sowohl in einer API-Antwort als auch auf einer Seite verwendet wird, nur einmal deklariert wird. Siehe [wie Intlayer funktioniert](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/how_works_intlayer.md).

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Das gehostete [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) ist ein optionaler kostenpflichtiger Dienst, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
