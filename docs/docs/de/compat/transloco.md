---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von Transloco zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Angular-Anwendung von Transloco zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - transloco
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von Transloco zu Intlayer

Wenn Ihre Angular-Anwendung derzeit `@jsverse/transloco` verwendet, können Sie mit unserem Compat-Adapter zu Intlayer migrieren. Dieser Übergang ermöglicht es Ihnen, Ihre bestehende Template-Syntax beizubehalten und gleichzeitig die leistungsstarke Wörterbuchstruktur von Intlayer zu nutzen.

## Was zu tun ist

Führen Sie einfach den Initialisierungsbefehl in Ihrem Projekt aus:

```bash
npx intlayer init
```

Dadurch wird die erforderliche `intlayer.config.ts`-Konfiguration generiert. Sie ersetzen dann Ihre Transloco-Imports durch `@intlayer/transloco`-Module oder verlassen sich auf die Build-Aliase.

## Was im Hintergrund geschieht

Transloco verwendet Scopes und einen `TranslocoService` (`translate`, `selectTranslate`) neben strukturellen Direktiven (`*transloco="let t"`) und Pipes (`| transloco`).

Im Hintergrund:

- **Scopes:** Ordnen sich natürlich den Intlayer-Wörterbuchschlüsseln zu und bieten eine hervorragende Bereinigungsgeschichte für die Bundle-Optimierung.
- **Service & Direktiven:** Der Angular-Adapter von Intlayer ersetzt die Provider nahtlos und ermöglicht es Ihren bestehenden Template-Pipes und -Direktiven, Zeichenketten gegen Intlayer-Wörterbücher aufzulösen.
- **Build-Zeit-Parsing:** Der TypeScript-Analyzer erkennt `instant/get`-Aufrufe, und Fallback-Bereinigung gewährleistet Korrektheit auch dann, wenn die Template-Nutzung nicht statisch verfolgbar ist.
