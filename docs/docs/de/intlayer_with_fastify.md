---
createdAt: 2025-12-30
updatedAt: 2026-08-30
title: "Fastify i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Fastify-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Init-Befehl hinzugefügt"
  - version: 7.6.0
    date: 2025-12-31
    changes: "History initialisiert"
author: aymericzip
---

# Übersetzen Sie Ihre Fastify-Backend-Website mit Intlayer | Internationalisierung (i18n)

`fastify-intlayer` ist ein leistungsfähiges Internationalisierungs-Plugin (i18n) für Fastify-Anwendungen, das entwickelt wurde, um Ihre Backend-Services global zugänglich zu machen, indem es lokalisierte Antworten basierend auf den Präferenzen des Clients bereitstellt.

> Siehe Paketimplementierung auf GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### Praktische Anwendungsfälle

- **Anzeige von Backend-Fehlern in der Sprache des Nutzers**: Wenn ein Fehler auftritt, verbessert die Anzeige von Meldungen in der Muttersprache des Nutzers das Verständnis und reduziert Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Frontend-Komponenten wie Toasts oder Modals angezeigt werden können.
- **Abrufen mehrsprachiger Inhalte**: Für Anwendungen, die Inhalte aus einer Datenbank abrufen, stellt Internationalisierung sicher, dass Sie diese Inhalte in mehreren Sprachen bereitstellen können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Nutzer bevorzugten Sprache anzeigen müssen.
- **Versenden mehrsprachiger E-Mails**: Ob Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen – das Versenden von E-Mails in der Sprache des Empfängers kann das Engagement und die Effektivität deutlich steigern.
- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen können Push-Benachrichtigungen in der bevorzugten Sprache des Nutzers die Interaktion und Bindung verbessern. Diese persönliche Note kann Benachrichtigungen relevanter erscheinen lassen und eher zu konkreten Aktionen anregen.
- **Andere Kommunikation**: Jede Form der Kommunikation vom Backend, wie SMS-Nachrichten, Systemwarnungen oder Benutzeroberflächen-Aktualisierungen, profitiert davon, in der Sprache des Nutzers verfügbar zu sein. Dies sorgt für Klarheit und verbessert das gesamte Benutzererlebnis.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern passt sich auch besser den Anforderungen des globalen Marktes an und wird so zu einem wichtigen Schritt beim weltweiten Skalieren Ihrer Dienste.

## Erste Schritte

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Wie Sie Ihre Anwendung mit Intlayer internationalisieren"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-fastify-template) auf GitHub.

### Installation

Um `fastify-intlayer` zu verwenden, installieren Sie das Paket mit npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> Das Flag `--interactive` ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt Ihre Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### Einrichtung

Konfigurieren Sie die Internationalisierungseinstellungen, indem Sie eine `intlayer.config.ts` im Stammverzeichnis Ihres Projekts erstellen:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Content-Deklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
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
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ihre Content-Deklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` (standardmäßig `./src`) enthalten sind. Und die Dateiendung der Content-Deklaration muss übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Für weitere Details siehe die [Dokumentation zur Content-Deklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Fastify-Anwendung einrichten

Konfigurieren Sie Ihre Fastify-Anwendung, um `fastify-intlayer` zu verwenden:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Internationalisierungs-Plugin laden
await fastify.register(intlayer);

// Routen
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Server starten
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Kompatibilität

`fastify-intlayer` ist vollständig kompatibel mit:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) für React-Anwendungen
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md) für Next.js-Anwendungen
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/index.md) für Vite-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung in verschiedenen Umgebungen, einschließlich Browsern und API-Anfragen. Sie können die Middleware anpassen, um die Locale über Header oder Cookies zu erkennen:

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

Standardmäßig interpretiert `fastify-intlayer` den `Accept-Language`-Header, um die bevorzugte Sprache des Clients zu bestimmen.

> Für weitere Informationen zur Konfiguration und zu erweiterten Themen, besuchen Sie unsere [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### TypeScript konfigurieren

`fastify-intlayer` nutzt die leistungsstarken Möglichkeiten von TypeScript, um den Internationalisierungsprozess zu verbessern. Die statische Typisierung von TypeScript stellt sicher, dass jeder Übersetzungsschlüssel berücksichtigt wird, reduziert das Risiko fehlender Übersetzungen und verbessert die Wartbarkeit.

Stellen Sie sicher, dass die automatisch generierten Typen (standardmäßig unter ./types/intlayer.d.ts) in Ihrer tsconfig.json-Datei enthalten sind.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Automatisch generierte Typen einbeziehen
  ],
}
```

### VS Code-Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code-Erweiterung** installieren.

[Installieren im VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Dokumentation der Intlayer VS Code-Erweiterung](https://intlayer.org/doc/vs-code-extension).

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, diese in Ihr Git-Repository zu committen.

Dazu können Sie die folgenden Einträge in Ihre `.gitignore`-Datei aufnehmen:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer

```

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um ein Fastify-Backend zu internationalisieren?">

Die generische Option ist `i18next` mit `fastify-i18next` oder einem handgeschriebenen Hook, das JSON-Kataloge pro Namespace lädt und die Locale an der Anfrage speichert. Die Alternative ist `Intlayer` über `fastify-intlayer`, das das Plugin für Sie registriert, die Locale pro Anfrage auflöst und denselben typisierten Inhalt wie Ihr Frontend teilt.

Der Grund, das Backend überhaupt zu internationalisieren, ist, dass ein großer Teil des Textes, den ein Nutzer liest, nie durch das Frontend läuft: API-Fehlermeldungen, Transaktions-E-Mails, Push-Benachrichtigungen, SMS und PDF-Exporte. Diese brauchen die Sprache des Empfängers, aufgelöst pro Anfrage statt pro Sitzung.

Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).

</Question>

<Question title="Wie viel trägt i18n zur Bundle-Größe meines Fastify-Servers bei?">

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

Standardmäßig liest `fastify-intlayer` den `Accept-Language`-Header der eingehenden Anfrage und wählt die am nächsten passende deklarierte Locale, mit Rückfall auf Ihre Standard-Locale. Sie können die Quelle mit `routing.storage` ändern, zum Beispiel ein benutzerdefinierter Header oder ein von Ihrem Frontend gesetztes Cookie, sodass die API in der Sprache antwortet, die der Nutzer tatsächlich gewählt hat, statt in der, die sein Browser meldet. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

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

<Question title="Funktioniert es mit dem Plugin-Lebenszyklus und der Kapselung von Fastify?">

Ja. `fastify-intlayer` registriert sich als standardmäßiges Fastify-Plugin, sodass es den üblichen Kapselungsregeln folgt. Registrieren Sie es an der Wurzel oder innerhalb des Scopes, der es benötigt, vor den Routen, die Inhalte lesen.

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

Ja, und das ist das übliche Setup. `fastify-intlayer` funktioniert zusammen mit `react-intlayer`, `next-intlayer` und `vite-intlayer` auf demselben deklarierten Inhalt, sodass ein Label, das sowohl in einer API-Antwort als auch auf einer Seite verwendet wird, nur einmal deklariert wird. Siehe [wie Intlayer funktioniert](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/how_works_intlayer.md).

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Das gehostete [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) ist ein optionaler kostenpflichtiger Dienst, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
