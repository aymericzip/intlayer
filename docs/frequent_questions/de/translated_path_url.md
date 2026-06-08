---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: Kann ich den URL-Pfad übersetzen?
description: Erfahren Sie, wie Sie den URL-Pfad übersetzen.
keywords:
  - array
  - content
  - declaration
  - intlayer
  - middleware
  - proxy
  - rewrite
  - prefix
  - locale
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# Ist es möglich, URLs zu übersetzen?

Ja! Intlayer unterstützt benutzerdefinierte URL-Rewrites, mit denen Sie gebietsschemaspezifische Pfade definieren können. Zum Beispiel:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

Um dies zu implementieren, können Sie den Abschnitt `routing` in Ihrer `intlayer.config.ts`-Datei konfigurieren.

Weitere Informationen zur Implementierung dieser Funktion finden Sie in der [Dokumentation zu benutzerdefinierten URL-Rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md).

Sie können auch die Funktionen `getMultilingualUrl` und `getLocalizedUrl` verwenden, um diese URLs programmatisch zu generieren, und sie werden Ihre Rewrite-Regeln berücksichtigen.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (falls konfiguriert)
```
