---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Build-Fehler in CI/CD
description: Erfahren Sie, wie Sie Build-Fehler beheben, die in CI/CD-Umgebungen auftreten.
keywords:
  - build
  - fehler
  - ci
  - cd
  - pipeline
  - intlayer
  - wörterbücher
  - next.js
  - vorbuild
  - automatisierung
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# Fehler beim Build in CI/CD

Wenn Sie einen Fehler wie diesen in Next.js erhalten:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Hier einige Lösungen:

## 1. Fehlende Wörterbücher

Stellen Sie sicher, dass die Wörterbücher während der Build-Phase erstellt werden.

Es kommt häufig vor, dass der Build lokal funktioniert, aber nicht in CI/CD. Der Grund ist, dass lokal das Verzeichnis `.intlayer` vorhanden ist, in CI/CD jedoch nicht, da es vom Build ausgeschlossen ist.

Sie können dies beheben, indem Sie ein Prebuild-Skript in der `package.json` Ihres Projekts hinzufügen.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Wird vor dem Build ausgeführt
    "build": "next build",
  },
}
```

> Beachten Sie, dass wenn Sie die Funktion `withIntlayer` oder das entsprechende Bundler-Plugin für Ihr Framework verwenden, das Prebuild-Skript vor dem Build ausgeführt wird.

## 2. Fehlende Umgebungsvariablen zur Build- oder Laufzeit

In einem Container oder einer automatisch bereitgestellten Plattform wird empfohlen, die `.env`-Datei vom Build auszuschließen.

```text fileName=".gitignore oder .dockerignore"
# Umgebungsvariablen
.env
**/.env
.env.*
**/.env.*
```

Wenn Ihre Umgebungsvariablen zur Build-Zeit nicht verfügbar sind, wird ein Fehler ausgelöst.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

Dies hängt wahrscheinlich nicht mit Intlayer zusammen. Überprüfen Sie daher Ihre Umgebungsvariablen zur Build-Zeit auf Ihrer CI/CD-Plattform.
