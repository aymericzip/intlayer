---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von NGX-Translate zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Angular-Anwendung von ngx-translate zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von NGX-Translate zu Intlayer

Die Migration Ihrer Angular-Anwendung von `ngx-translate` zu Intlayer ist mit dem Compat-Adapter einfach und ermöglicht es Ihnen, die Notwendigkeit zu umgehen, alle Ihre Templates umzuschreiben.

## Was zu tun ist

Beginnen Sie mit der Ausführung von:

```bash
npx intlayer init
```

Dadurch wird die `intlayer.config.ts` eingerichtet. Ersetzen Sie Ihre `TranslateModule.forRoot()`-Setups und importieren Sie Aliase entsprechend, um auf `@intlayer/ngx-translate` zu verweisen.

## Was im Hintergrund geschieht

`ngx-translate` verwendet `TranslateService` (`instant`, `get`, `stream`) neben der `{{ 'KEY' | translate:params }}`-Pipe und der `[translate]`-Direktive.

Im Hintergrund:

- **Services:** `TranslateService` umhüllt `getIntlayer` und ein Locale-Observable und stellt genau dieselben Methoden bereit.
- **Pipes & Direktiven:** Neu implementiert, um direkt gegen Intlayer-Wörterbücher aufzulösen.
- **Loader:** `TranslateHttpLoader`-Setups werden in Warn-Stubs umgewandelt, da Intlayer Ihre Wörterbücher zur Build-Zeit (oder durch standardmäßige dynamische Imports) inhärent auflöst und bündelt und die Notwendigkeit von HTTP-Loadern vollständig eliminiert.
