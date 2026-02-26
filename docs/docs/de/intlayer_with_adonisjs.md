---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - So übersetzen Sie eine AdonisJS-App in 2026
description: Entdecken Sie, wie Sie Ihr AdonisJS-Backend mehrsprachig machen. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und Übersetzung.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Verlauf initialisieren
---

# Übersetzen Sie Ihr AdonisJS-Backend-Website mit Intlayer | Internationalisierung (i18n)

`adonis-intlayer` ist ein leistungsstarkes Internationalisierungs-Paket (i18n) für AdonisJS-Anwendungen, das entwickelt wurde, um Ihre Backend-Dienste weltweit zugänglich zu machen, indem es lokalisierte Antworten basierend auf den Präferenzen des Clients liefert.

### Praktische Anwendungsfälle

- **Anzeigen von Backend-Fehlern in der Sprache des Benutzers**: Wenn ein Fehler auftritt, verbessert das Anzeigen von Nachrichten in der Muttersprache des Benutzers das Verständnis und reduziert Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Front-End-Komponenten wie Toasts oder Modalen angezeigt werden könnten.

- **Abrufen mehrsprachiger Inhalte**: Für Anwendungen, die Inhalte aus einer Datenbank beziehen, stellt die Internationalisierung sicher, dass Sie diese Inhalte in mehreren Sprachen bereitstellen können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Benutzer bevorzugten Sprache anzeigen müssen.

- **Senden mehrsprachiger E-Mails**: Ob Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen – das Senden von E-Mails in der Sprache des Empfängers kann das Engagement und die Effektivität erheblich steigern.

- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen kann das Senden von Push-Benachrichtigungen in der bevorzugten Sprache eines Benutzers die Interaktion und Kundenbindung verbessern. Diese persönliche Note kann dazu führen, dass Benachrichtigungen relevanter und handlungsorientierter wirken.

- **Andere Kommunikationen**: Jede Form der Kommunikation vom Backend, wie SMS-Nachrichten, Systemwarnungen oder Aktualisierungen der Benutzeroberfläche, profitiert davon, in der Sprache des Benutzers zu sein, was Klarheit gewährleistet und das allgemeine Benutzererlebnis verbessert.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern passt sich auch besser an globale Marktanforderungen an, was ein wichtiger Schritt zur weltweiten Skalierung Ihrer Dienste ist.

## Erste Schritte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) on GitHub.

### Installation

Um `adonis-intlayer` zu verwenden, installieren Sie das Paket mit npm:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
bunx intlayer init
```

### Einrichtung

Konfigurieren Sie die Internationalisierungseinstellungen, indem Sie eine `intlayer.config.ts` in Ihrem Projektstammverzeichnis erstellen:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      de: "Beispiel für zurückgegebenen Inhalt auf Deutsch",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      de: "Beispiel für zurückgegebenen Inhalt auf Deutsch",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenu devuelto en español (España)",
      "es-MX": "Ejemplo de contenu devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "de": "Beispiel für zurückgegebenen Inhalt auf Deutsch",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können an beliebiger Stelle in Ihrer Anwendung definiert werden, sofern sie im Verzeichnis `contentDir` enthalten sind (standardmäßig `./src` oder `./app`) und mit der Dateierweiterung für Inhaltsdeklarationen übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Weitere Details finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### AdonisJS-Anwendungseinrichtung

Richten Sie Ihre AdonisJS-Anwendung für die Verwendung von `adonis-intlayer` ein.

#### Registrieren Sie die Middleware

Zuerst müssen Sie die `intlayer`-Middleware in Ihrer Anwendung registrieren.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Definieren Sie Ihre Routen

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    de: "Beispiel für zurückgegebenen Inhalt auf Deutsch",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Funktionen

`adonis-intlayer` exportiert mehrere Funktionen zur Handhabung der Internationalisierung in Ihrer Anwendung:

- `t(content, locale?)`: Grundlegende Übersetzungsfunktion.
- `getIntlayer(key, locale?)`: Ruft Inhalte per Schlüssel aus Ihren Wörterbüchern ab.
- `getDictionary(dictionary, locale?)`: Ruft Inhalte aus einem spezifischen Wörterbuchobjekt ab.
- `getLocale()`: Ruft die aktuelle Locale aus dem Anfragekontext ab.

#### Verwendung in Controllern

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        de: "Hallo vom Controller",
      })
    );
  }
}
```

### Kompatibilität

`adonis-intlayer` ist vollständig kompatibel mit:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) für React-Anwendungen
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md) für Next.js-Anwendungen
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/index.md) für Vite-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung über verschiedene Umgebungen hinweg, einschließlich Browsern und API-Anfragen. Sie können die Middleware anpassen, um die Locale über Header oder Cookies zu erkennen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Andere Konfigurationsoptionen
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

Standardmäßig interpretiert `adonis-intlayer` den `Accept-Language`-Header, um die bevorzugte Sprache des Clients zu bestimmen.

> Weitere Informationen zur Konfiguration und zu fortgeschrittenen Themen finden Sie in unserer [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### TypeScript konfigurieren

`adonis-intlayer` nutzt die robusten Fähigkeiten von TypeScript, um den Internationalisierungsprozess zu verbessern. Die statische Typisierung von TypeScript stellt sicher, dass jeder Übersetzungsschlüssel berücksichtigt wird, was das Risiko fehlender Übersetzungen verringert und die Wartbarkeit verbessert.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass die automatisch generierten Typen (standardmäßig unter ./types/intlayer.d.ts) in Ihrer tsconfig.json-Datei enthalten sind.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Schließen Sie die automatisch generierten Typen ein
  ],
}
```

### VS Code-Erweiterung

Um Ihr Entwicklungserlebnis mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code-Erweiterung** installieren.

[Vom VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code-Erweiterung](https://intlayer.org/de/doc/vs-code-extension).

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, dass sie in Ihr Git-Repository eingecheckt werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```
