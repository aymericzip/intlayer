# Getting Started internationalizing (i18n) with Intlayer und Express

`express-intlayer` ist eine leistungsstarke Middleware für internationale (i18n) Anwendungen von Express, die dafür entwickelt wurde, Ihre Backend-Dienste global zugänglich zu machen, indem sie lokalisierte Antworten basierend auf den Vorlieben des Clients bereitstellt.

## Warum Ihre Backend-Internationalisieren?

Die Internationalisierung Ihres Backends ist unerlässlich, um effektiv ein globales Publikum zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers zu liefern. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie zugänglicher und relevanter für Menschen aus verschiedenen Sprachhintergründen wird.

### Praktische Anwendungsfälle

- **Anzeige von Backend-Fehlern in der Sprache des Benutzers**: Wenn ein Fehler auftritt, verbessert die Anzeige von Nachrichten in der Muttersprache des Benutzers das Verständnis und reduziert die Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Frontend-Komponenten wie Toasts oder Modalen angezeigt werden könnten.

- **Abrufen mehrsprachiger Inhalte**: Für Anwendungen, die Inhalte aus einer Datenbank abrufen, stellt die Internationalisierung sicher, dass Sie diesen Inhalt in mehreren Sprachen bereitstellen können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Benutzer bevorzugten Sprache anzeigen müssen.

- **Versenden mehrsprachiger E-Mails**: Ob es sich um Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen handelt, das Versenden von E-Mails in der Sprache des Empfängers kann das Engagement und die Effektivität erheblich steigern.

- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen kann das Versenden von Push-Benachrichtigungen in der bevorzugten Sprache eines Benutzers die Interaktion und Bindung verbessern. Diese persönliche Note kann Benachrichtigungen relevanter und handlungsfähiger erscheinen lassen.

- **Andere Kommunikationen**: Jede Form der Kommunikation vom Backend, wie SMS-Nachrichten, Systemwarnungen oder Benutzeroberflächen-Updates, profitiert davon, in der Sprache des Benutzers verfasst zu sein, um Klarheit zu gewährleisten und die allgemeine Benutzererfahrung zu verbessern.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern passt sich auch besser an die Bedürfnisse des globalen Marktes an, was einen entscheidenden Schritt bei der Skalierung Ihrer Dienste weltweit darstellt.

## Getting Started

### Installation

Um `express-intlayer` zu verwenden, installieren Sie das Paket über npm:

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### Setup

Konfigurieren Sie die Internationalisierungseinstellungen, indem Sie eine `intlayer.config.ts` in Ihrem Projektstamm erstellen:

```typescript
// intlayer.config.ts
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

### Express-Anwendungs-Setup

Richten Sie Ihre Express-Anwendung so ein, dass sie `express-intlayer` verwendet:

```typescript
// src/index.ts
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Lade internationale Anforderungsbehandler
app.use(intlayer());

// Routen
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Example of returned error content in English",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// Server starten
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Kompatibilität

`express-intlayer` ist vollständig kompatibel mit:

- `react-intlayer` für React-Anwendungen
- `next-intlayer` für Next.js-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung in verschiedenen Umgebungen, einschließlich Browsern und API-Anfragen. Sie können die Middleware anpassen, um die Locale durch Header oder Cookies zu erkennen:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // Andere Konfigurationsoptionen
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};
```

Standardmäßig wird `express-intlayer` den `Accept-Language`-Header interpretieren, um die bevorzugte Sprache des Clients zu bestimmen.

> Für weitere Informationen zur Konfiguration und zu fortgeschrittenen Themen besuchen Sie unsere [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Angetrieben von TypeScript

`express-intlayer` nutzt die robusten Fähigkeiten von TypeScript, um den Internationalisierungsprozess zu verbessern. Die statische Typisierung von TypeScript stellt sicher, dass jeder Übersetzungsschlüssel erfasst wird, wodurch das Risiko fehlender Übersetzungen verringert und die Wartbarkeit verbessert wird.

> Stellen Sie sicher, dass die generierten Typen (standardmäßig unter ./types/intlayer.d.ts) in Ihrer tsconfig.json-Datei enthalten sind.
