---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: NestJS i18n - Wie Sie eine NestJS App übersetzen in 2026
description: Entdecken Sie, wie Sie Ihr NestJS-Backend mehrsprachig machen. Folgen Sie der Dokumentation, um es zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/aymericzip/intlayer-nestjs-template
author: AydinTheFirst
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzufügen"
  - version: 5.8.0
    date: 2025-09-09
    changes: "Erste Version der Dokumentation"
---

# Übersetzen Sie Ihre Nest backend mit Intlayer | Internationalisierung (i18n)

`express-intlayer` ist eine leistungsstarke Internationalisierungs-(i18n)-Middleware für Express-Anwendungen, die darauf ausgelegt ist, Ihre Backend-Dienste weltweit zugänglich zu machen, indem sie lokalisierte Antworten basierend auf den Präferenzen des Clients bereitstellt. Da NestJS auf Express aufbaut, können Sie `express-intlayer` nahtlos in Ihre NestJS-Anwendungen integrieren, um mehrsprachige Inhalte effektiv zu verwalten.

## Warum sollten Sie Ihr Backend internationalisieren?

Die Internationalisierung Ihres Backends ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

### Praktische Anwendungsfälle

- **Anzeige von Backend-Fehlermeldungen in der Sprache des Benutzers**: Wenn ein Fehler auftritt, verbessert die Anzeige von Nachrichten in der Muttersprache des Benutzers das Verständnis und reduziert Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Frontend-Komponenten wie Toasts oder Modals angezeigt werden können.

- **Abrufen mehrsprachiger Inhalte**: Für Anwendungen, die Inhalte aus einer Datenbank abrufen, stellt die Internationalisierung sicher, dass diese Inhalte in mehreren Sprachen bereitgestellt werden können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Benutzer bevorzugten Sprache anzeigen müssen.

- **Versand mehrsprachiger E-Mails**: Ob Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen – das Versenden von E-Mails in der Sprache des Empfängers kann die Engagement-Rate und Effektivität erheblich steigern.

- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen kann das Versenden von Push-Benachrichtigungen in der bevorzugten Sprache des Nutzers die Interaktion und Bindung verbessern. Diese persönliche Note lässt Benachrichtigungen relevanter und handlungsorientierter erscheinen.

- **Andere Kommunikationsformen**: Jegliche Kommunikation vom Backend, wie SMS-Nachrichten, Systemwarnungen oder Benutzeroberflächen-Updates, profitiert davon, in der Sprache des Nutzers zu erfolgen, was Klarheit schafft und das gesamte Benutzererlebnis verbessert.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern passt sich auch besser an die Bedürfnisse des globalen Marktes an, was einen wichtigen Schritt zur Skalierung Ihrer Dienste weltweit darstellt.

## Erste Schritte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nestjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-nestjs-template) on GitHub.

### Erstellen eines neuen NestJS-Projekts

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Installation

Um `express-intlayer` zu verwenden, installieren Sie das Paket mit npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer express-intlayer
bun x intlayer init
```

### Konfigurieren von tsconfig.json

Um Intlayer mit TypeScript zu verwenden, stellen Sie sicher, dass Ihre `tsconfig.json` so eingerichtet ist, dass ES-Module unterstützt werden. Dies erreichen Sie, indem Sie die Optionen `module` und `moduleResolution` auf `nodenext` setzen.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... andere Optionen
  },
}
```

### Einrichtung

Konfigurieren Sie die Internationalisierungseinstellungen, indem Sie eine `intlayer.config.ts` im Stammverzeichnis Ihres Projekts erstellen:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguration für die Internationalisierung
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Verfügbare Sprachen
    defaultLocale: Locales.ENGLISH, // Standardsprache
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguration für die Internationalisierung
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Verfügbare Sprachen
    defaultLocale: Locales.ENGLISH, // Standardsprache
  },
};

module.exports = config;
```

### Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` enthalten sind (standardmäßig `./src`). Und die Dateiendung der Inhaltsdeklaration entspricht (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Für weitere Details siehe die [Inhaltsdeklarationsdokumentation](/doc/concept/content).

### Express Middleware Einrichtung

Integrieren Sie die Middleware `express-intlayer` in Ihre NestJS-Anwendung, um die Internationalisierung zu verwalten:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Auf alle Routen anwenden
  }
}
```

### Verwenden Sie Übersetzungen in Ihren Services oder Controllern

Sie können nun die Funktion `getIntlayer` verwenden, um in Ihren Services oder Controllern auf Übersetzungen zuzugreifen:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet;
  }
}
```

### Kompatibilität

`express-intlayer` ist vollständig kompatibel mit:

- [`react-intlayer`](/doc/packages/react-intlayer) für React-Anwendungen
- [`next-intlayer`](/doc/packages/next-intlayer) für Next.js-Anwendungen
- [`vite-intlayer`](/doc/packages/vite-intlayer) für Vite-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung in verschiedenen Umgebungen, einschließlich Browsern und API-Anfragen. Sie können die Middleware anpassen, um die Locale über Header oder Cookies zu erkennen:

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

Standardmäßig interpretiert `express-intlayer` den `Accept-Language`-Header, um die bevorzugte Sprache des Clients zu bestimmen.

> Für weitere Informationen zur Konfiguration und zu fortgeschrittenen Themen besuchen Sie unsere [Dokumentation](/doc/concept/configuration).

### TypeScript konfigurieren

`express-intlayer` nutzt die leistungsstarken Funktionen von TypeScript, um den Internationalisierungsprozess zu verbessern. Die statische Typisierung von TypeScript stellt sicher, dass jeder Übersetzungsschlüssel berücksichtigt wird, wodurch das Risiko fehlender Übersetzungen verringert und die Wartbarkeit verbessert wird.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass die automatisch generierten Typen (standardmäßig unter ./types/intlayer.d.ts) in Ihrer tsconfig.json-Datei enthalten sind.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  include: [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Einschluss der automatisch generierten Typen
  ],
}
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Im VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Verwendung der Erweiterung lesen Sie die [Intlayer VS Code Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, diese versehentlich in Ihr Git-Repository zu übernehmen.

Um dies zu tun, können Sie die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzufügen:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```
