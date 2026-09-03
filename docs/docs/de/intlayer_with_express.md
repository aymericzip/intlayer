---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: "Express i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Express-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Express
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - express
applicationTemplate: https://github.com/aymericzip/intlayer-express-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzufügen"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initiale Historie"
author: aymericzip
---

# Übersetzen Sie Ihre Express backend mit Intlayer | Internationalisierung (i18n)

`express-intlayer` ist eine leistungsstarke Internationalisierungs-Middleware (i18n) für Express-Anwendungen, die entwickelt wurde, um Ihre Backend-Dienste global zugänglich zu machen, indem sie lokalisierte Antworten basierend auf den Präferenzen des Clients bereitstellt.

### Praktische Anwendungsfälle

- **Anzeige von Backend-Fehlern in der Sprache des Benutzers**: Wenn ein Fehler auftritt, verbessert die Anzeige von Nachrichten in der Muttersprache des Benutzers das Verständnis und reduziert Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Frontend-Komponenten wie Toasts oder Modals angezeigt werden könnten.

- **Abrufen von mehrsprachigen Inhalten**: Für Anwendungen, die Inhalte aus einer Datenbank abrufen, stellt die Internationalisierung sicher, dass Sie diese Inhalte in mehreren Sprachen bereitstellen können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Benutzer bevorzugten Sprache anzeigen müssen.
- **Versand von mehrsprachigen E-Mails**: Ob Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen – der Versand von E-Mails in der Sprache des Empfängers kann die Interaktion und Effektivität erheblich steigern.

- **Multilingual E-Mails versenden**: Ob es sich um Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen handelt, das Versenden von E-Mails in der Sprache des Empfängers kann die Engagement- und Effektivitätsquoten erheblich erhöhen.

- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen kann das Senden von Push-Benachrichtigungen in der bevorzugten Sprache eines Benutzers die Interaktion und Bindung verbessern. Diese persönliche Note kann Benachrichtigungen relevanter und handlungsorientierter machen.

- **Andere Kommunikationsformen**: Jede Form der Kommunikation vom Backend, wie SMS-Nachrichten, Systemwarnungen oder Benutzeroberflächen-Updates, profitiert davon, in der Sprache des Benutzers zu sein, was Klarheit gewährleistet und die allgemeine Benutzererfahrung verbessert.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern passt sich auch besser an die Bedürfnisse des globalen Marktes an, was sie zu einem entscheidenden Schritt bei der Skalierung Ihrer Dienste weltweit macht.

## Erste Schritte

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-express-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-express-template) on GitHub.

### Installation

Um `express-intlayer` zu verwenden, installieren Sie das Paket mit npm:

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

> Das Flag `--interactive` ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt Ihre Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
```

### Einrichtung

Konfigurieren Sie die Internationalisierungseinstellungen, indem Sie eine `intlayer.config.ts` in Ihrem Projektstammverzeichnis erstellen:

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

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

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
        "de": "Beispiel für zurückgegebenen Inhalt auf Deutsch",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie in das `contentDir`-Verzeichnis (standardmäßig `./src`) aufgenommen werden. Und sie müssen der Dateiendung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Express-Anwendungs-Setup

Richten Sie Ihre Express-Anwendung so ein, dass `express-intlayer` verwendet wird:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// Lade den Internationalisierungs-Request-Handler
app.use(intlayer());

// Routen
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      de: "Beispiel für zurückgegebenen Inhalt auf Deutsch",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Server starten
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Kompatibilität

`express-intlayer` ist vollständig kompatibel mit:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) für React-Anwendungen
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md) für Next.js-Anwendungen
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/index.md) für Vite-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung in verschiedenen Umgebungen, einschließlich Browsern und API-Anfragen. Sie können die Middleware anpassen, um die Locale über Header oder Cookies zu erkennen:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Andere Konfigurationsoptionen
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

Standardmäßig interpretiert `express-intlayer` den `Accept-Language`-Header, um die bevorzugte Sprache des Clients zu ermitteln.

> Für weitere Informationen zur Konfiguration und zu fortgeschrittenen Themen besuchen Sie unsere [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### TypeScript konfigurieren

`express-intlayer` nutzt die leistungsstarken Funktionen von TypeScript, um den Internationalisierungsprozess zu verbessern. Die statische Typisierung von TypeScript stellt sicher, dass jeder Übersetzungsschlüssel berücksichtigt wird, wodurch das Risiko fehlender Übersetzungen verringert und die Wartbarkeit verbessert wird.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass die automatisch generierten Typen (standardmäßig unter ./types/intlayer.d.ts) in Ihrer tsconfig.json-Datei enthalten sind.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Einschließen der automatisch generierten Typen
  ],
}
```

### VS Code Extension

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Extension** installieren.

[Im VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, diese versehentlich in Ihr Git-Repository zu committen.

Dazu können Sie folgende Anweisungen in Ihre `.gitignore`-Datei einfügen:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um ein Express-Backend zu internationalisieren?">

Die historische Option ist `i18next` mit `i18next-http-middleware`, das JSON-Kataloge pro Namespace lädt und die Locale an der Anfrage speichert. Die Alternative ist `Intlayer` über `express-intlayer`, das Inhalte in typisierten, mit Ihrem Frontend geteilten Dateien deklariert, die Locale pro Anfrage auflöst und KI-Übersetzung und ein CMS hinzufügt.

Der Grund, das Backend überhaupt zu internationalisieren, ist, dass ein großer Teil des Textes, den ein Nutzer liest, nie durch das Frontend läuft: API-Fehlermeldungen, Transaktions-E-Mails, Push-Benachrichtigungen, SMS und PDF-Exporte. Diese brauchen die Sprache des Empfängers, aufgelöst pro Anfrage statt pro Sitzung.

Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).

</Question>

<Question title="Wie viel trägt i18n zur Bundle-Größe meines Express-Servers bei?">

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

Standardmäßig liest `express-intlayer` den `Accept-Language`-Header der eingehenden Anfrage und wählt die am nächsten passende deklarierte Locale, mit Rückfall auf Ihre Standard-Locale. Sie können die Quelle mit `routing.storage` ändern, zum Beispiel ein benutzerdefinierter Header oder ein von Ihrem Frontend gesetztes Cookie, sodass die API in der Sprache antwortet, die der Nutzer tatsächlich gewählt hat, statt in der, die sein Browser meldet. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Ist die Locale pro Anfrage isoliert?">

Ja. Die Middleware begrenzt die aktive Locale auf die Anfrage, sodass zwei gleichzeitige Anfragen in verschiedenen Sprachen niemals die Locale der jeweils anderen lesen. Das macht `t()` und `getIntlayer()` sicher aufrufbar aus einem Service, ohne ein Locale-Argument durch jede Funktion zu reichen.

</Question>

<Question title="Wie versende ich Transaktions-E-Mails in der Sprache des Empfängers?">

Deklarieren Sie den E-Mail-Inhalt wie jeden anderen Inhalt in einer Inhaltsdatei und lösen Sie ihn dann mit `getIntlayer` für die gespeicherte Locale des Empfängers statt für die Anfrage-Locale auf. Das ist wichtig für Jobs und Queues, wo die Sprache zum Nutzerdatensatz gehört und es keine eingehende Anfrage gibt, aus der ein Header gelesen werden kann.

</Question>

<Question title="Wie lokalisiere ich API-Fehlermeldungen?">

Umschließen Sie die Nachricht an der Stelle, an der der Fehler erstellt wird, mit `t()`. Die aktive Anfrage-Locale löst sie auf, sodass der Client eine Nachricht erhält, die er direkt anzeigen kann, und Ihr Frontend keinen parallelen Katalog von Fehlercodes braucht.

</Question>

<Question title="Funktioniert es mit einer bestehenden Express-App und anderer Middleware?">

Ja. `express-intlayer` ist eine standardmäßige Express-Middleware, sodass sie sich mit Ihrem vorhandenen Stack zusammensetzen lässt. Registrieren Sie sie vor den Routen, die Inhalte lesen, sodass die Locale aufgelöst ist, wenn ein Handler `t()` oder `getIntlayer()` aufruft.

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

Ja, und das ist das übliche Setup. `express-intlayer` funktioniert zusammen mit `react-intlayer`, `next-intlayer` und `vite-intlayer` auf demselben deklarierten Inhalt, sodass ein Label, das sowohl in einer API-Antwort als auch auf einer Seite verwendet wird, nur einmal deklariert wird. Siehe [wie Intlayer funktioniert](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/how_works_intlayer.md).

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Das gehostete [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) ist ein optionaler kostenpflichtiger Dienst, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
