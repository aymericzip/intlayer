---
createdAt: 2025-03-17
updatedAt: 2025-09-22
title: Offizielle VS Code Erweiterung
description: Erfahren Sie, wie Sie die Intlayer-Erweiterung in VS Code verwenden, um Ihren Entwicklungsworkflow zu verbessern. Navigieren Sie schnell zwischen lokalisierten Inhalten und verwalten Sie Ihre Wörterbücher effizient.
keywords:
  - VS Code Erweiterung
  - Intlayer
  - Lokalisierung
  - Entwicklungstools
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# Offizielle VS Code Erweiterung

## Übersicht

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) ist die offizielle Visual Studio Code Erweiterung für **Intlayer**, die darauf ausgelegt ist, die Entwicklererfahrung beim Arbeiten mit lokalisierten Inhalten in Ihren Projekten zu verbessern.

![Intlayer VS Code Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Erweiterungslink: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Funktionen

### Sofortige Navigation

**Unterstützung für "Gehe zu Definition"** – Verwenden Sie `⌘ + Klick` (Mac) oder `Ctrl + Klick` (Windows/Linux) auf einem `useIntlayer`-Schlüssel, um die entsprechende Inhaltsdatei sofort zu öffnen.  
**Nahtlose Integration** – Funktioniert mühelos mit **react-intlayer** und **next-intlayer** Projekten.  
**Mehrsprachige Unterstützung** – Unterstützt lokalisierte Inhalte in verschiedenen Sprachen.  
**VS Code Integration** – Integriert sich reibungslos in die Navigation und die Befehlspalette von VS Code.

### Befehle zur Verwaltung von Wörterbüchern

Verwalten Sie Ihre Inhaltswörterbücher direkt aus VS Code:

- **Wörterbücher erstellen** – Generieren Sie Inhaltsdateien basierend auf Ihrer Projektstruktur.
- **Wörterbücher hochladen** – Laden Sie die neuesten Wörterbuchinhalte in Ihr Repository hoch.
- **Wörterbücher herunterladen** – Synchronisieren Sie die neuesten Wörterbuchinhalte aus Ihrem Repository mit Ihrer lokalen Umgebung.
- **Wörterbücher füllen** – Füllen Sie Wörterbücher mit Inhalten aus Ihrem Projekt.
- **Wörterbücher testen** – Erkennen Sie fehlende oder unvollständige Übersetzungen.

### Generator für Inhaltsdeklarationen

Erstellen Sie einfach strukturierte Wörterbuchdateien in verschiedenen Formaten:

Wenn Sie gerade an einer Komponente arbeiten, wird die Datei `.content.{ts,tsx,js,jsx,mjs,cjs,json}` für Sie generiert.

Beispiel einer Komponente:

```tsx fileName="src/components/MyComponent/index.tsx"
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("my-component");

  return <span>{myTranslatedContent}</span>;
};
```

Generierte Datei im TypeScript-Format:

```tsx fileName="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "my-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

Verfügbare Formate:

- **TypeScript (`.ts`)**
- **ES Modul (`.esm`)**
- **CommonJS (`.cjs`)**
- **JSON (`.json`)**

### Intlayer-Tab (Aktivitätsleiste)

Öffnen Sie den Intlayer-Tab, indem Sie auf das Intlayer-Symbol in der VS Code-Aktivitätsleiste klicken. Er enthält zwei Ansichten:

- **Suche**: Eine Live-Suchleiste, um Wörterbücher und deren Inhalte schnell zu filtern. Das Tippen aktualisiert die Ergebnisse sofort.
- **Wörterbücher**: Eine Baumansicht Ihrer Umgebungen/Projekte, Wörterbuchschlüssel und der Dateien, die Einträge beitragen. Sie können:
  - Auf eine Datei klicken, um sie im Editor zu öffnen.
  - Die Symbolleiste verwenden, um Aktionen auszuführen: Build, Pull, Push, Fill, Refresh, Test und Create Dictionary File.
  - Das Kontextmenü für spezifische Aktionen verwenden:
    - Auf einem Wörterbuch: Pull oder Push
    - Auf einer Datei: Wörterbuch füllen
  - Beim Wechseln der Editoren zeigt der Baum die passende Datei an, wenn sie zu einem Wörterbuch gehört.

## Installation

Sie können **Intlayer** direkt aus dem VS Code Marketplace installieren:

1. Öffnen Sie **VS Code**.
2. Gehen Sie zum **Extensions Marketplace**.
3. Suchen Sie nach **"Intlayer"**.
4. Klicken Sie auf **Installieren**.

## Verwendung

### Schnelle Navigation

1. Öffnen Sie ein Projekt, das **react-intlayer** verwendet.
2. Suchen Sie einen Aufruf von `useIntlayer()`, zum Beispiel:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-Klick** (`⌘+Klick` auf macOS) oder **Strg-Klick** (unter Windows/Linux) auf den Schlüssel (z. B. `"app"`).
4. VS Code öffnet automatisch die entsprechende Wörterbuchdatei, z. B. `src/app.content.ts`.

### Verwaltung von Inhaltswörterbüchern

### Intlayer-Tab (Aktivitätsleiste)

Verwenden Sie den seitlichen Tab, um Wörterbücher zu durchsuchen und zu verwalten:

- Öffnen Sie das Intlayer-Symbol in der Aktivitätsleiste.
- Geben Sie in **Suche** ein, um Wörterbücher und Einträge in Echtzeit zu filtern.
- Durchsuchen Sie in **Wörterbücher** Umgebungen, Wörterbücher und Dateien. Verwenden Sie die Symbolleiste für Erstellen, Abrufen, Hochladen, Füllen, Aktualisieren, Testen und Wörterbuchdatei erstellen. Rechtsklicken Sie für Kontextaktionen (Abrufen/Hochladen bei Wörterbüchern, Füllen bei Dateien). Die aktuelle Editor-Datei wird im Baum automatisch angezeigt, wenn zutreffend.

#### Wörterbücher erstellen

Generieren Sie alle Wörterbuch-Inhaltsdateien mit:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Suchen Sie nach **Wörterbücher erstellen** und führen Sie den Befehl aus.

#### Wörterbücher hochladen

Laden Sie den neuesten Wörterbuchinhalt hoch:

1. Öffnen Sie die **Befehls-Palette**.
2. Suchen Sie nach **Wörterbücher hochladen**.
3. Wählen Sie die hochzuladenden Wörterbücher aus und bestätigen Sie.

#### Wörterbücher abrufen

Synchronisieren Sie die neuesten Wörterbuchinhalte:

1. Öffnen Sie die **Befehls-Palette**.
2. Suchen Sie nach **Wörterbücher abrufen**.
3. Wählen Sie die Wörterbücher aus, die abgerufen werden sollen.

#### Wörterbücher füllen

Füllen Sie Wörterbücher mit Inhalten aus Ihrem Projekt:

1. Öffnen Sie die **Befehls-Palette**.
2. Suchen Sie nach **Wörterbücher füllen**.
3. Führen Sie den Befehl aus, um die Wörterbücher zu befüllen.

#### Wörterbücher testen

Validieren Sie Wörterbücher und finden Sie fehlende Übersetzungen:

1. Öffnen Sie die **Befehls-Palette**.
2. Suchen Sie nach **Wörterbücher testen**.
3. Überprüfen Sie die gemeldeten Probleme und beheben Sie diese bei Bedarf.

## Dokumentationsverlauf

| Version | Datum      | Änderungen        |
| ------- | ---------- | ----------------- |
| 5.5.10  | 2025-06-29 | Verlauf initiiert |
