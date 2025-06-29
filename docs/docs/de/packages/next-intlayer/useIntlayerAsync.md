---
docName: package__next-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Dokumentation des useIntlayerAsync Hooks | next-intlayer
description: Erfahren Sie, wie Sie den useIntlayerAsync-Hook für das next-intlayer-Paket verwenden
keywords:
  - useIntlayerAsync
  - Wörterbuch
  - Schlüssel
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# Next.js Integration: `useIntlayerAsync` Hook Dokumentation

Der `useIntlayerAsync` Hook erweitert die Funktionalität von `useIntlayer`, indem er nicht nur vorgerenderte Wörterbücher zurückgibt, sondern auch Updates asynchron abruft. Dies macht ihn ideal für Anwendungen, die häufig aktualisierte lokalisierte Inhalte nach dem ersten Rendern benötigen.

## Überblick

- **Asynchrones Laden von Wörterbüchern:**  
  Auf der Client-Seite gibt `useIntlayerAsync` zunächst das vorgerenderte Sprachwörterbuch zurück (genau wie `useIntlayer`) und ruft dann asynchron alle neu verfügbaren entfernten Wörterbücher ab und fügt sie zusammen.
- **Verwaltung des Fortschrittsstatus:**  
  Der Hook bietet auch einen `isLoading`-Status, der anzeigt, wann ein entferntes Wörterbuch abgerufen wird. Dies ermöglicht es Entwicklern, Ladeindikatoren oder Skeleton-Zustände für eine reibungslosere Benutzererfahrung anzuzeigen.

## Einrichtung der Umgebung

Intlayer bietet ein Headless Content Source Management (CSM)-System, das es Nicht-Entwicklern ermöglicht, Anwendungsinhalte nahtlos zu verwalten und zu aktualisieren. Mit dem intuitiven Dashboard von Intlayer kann Ihr Team lokalisierte Texte, Bilder und andere Ressourcen bearbeiten, ohne den Code direkt zu ändern. Dies rationalisiert den Content-Management-Prozess, fördert die Zusammenarbeit und stellt sicher, dass Updates schnell und einfach vorgenommen werden können.

Um mit Intlayer zu beginnen, müssen Sie sich zunächst registrieren und ein Zugriffstoken unter [https://intlayer.org/dashboard](https://intlayer.org/dashboard) erhalten. Sobald Sie Ihre Anmeldedaten haben, fügen Sie diese wie unten gezeigt zu Ihrer Konfigurationsdatei hinzu:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

export default {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

Nach der Konfiguration Ihrer Anmeldedaten können Sie ein neues Sprachwörterbuch zu Intlayer hochladen, indem Sie den folgenden Befehl ausführen:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Dieser Befehl lädt Ihre anfänglichen Inhaltswörterbücher hoch und macht sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar.

## Importieren von `useIntlayerAsync` in Next.js

Da `useIntlayerAsync` für **Client-seitige** Komponenten gedacht ist, importieren Sie es aus dem gleichen Client-Einstiegspunkt wie `useIntlayer`:

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

Stellen Sie sicher, dass die importierende Datei oben mit `"use client"` annotiert ist, wenn Sie den Next.js App Router mit getrennten Server- und Client-Komponenten verwenden.

## Parameter

1. **`key`**:  
   **Typ**: `DictionaryKeys`  
   Der Wörterbuchschlüssel, der verwendet wird, um den lokalisierten Inhaltsblock zu identifizieren. Dieser Schlüssel sollte in Ihren Inhaltsdeklarationsdateien definiert sein.

2. **`locale`** (optional):  
   **Typ**: `Locales`  
   Die spezifische Sprache, die Sie anvisieren möchten. Wenn sie weggelassen wird, verwendet der Hook die Sprache aus dem Client-Kontext.

3. **`isRenderEditor`** (optional, Standardwert ist `true`):  
   **Typ**: `boolean`  
   Bestimmt, ob der Inhalt für das Rendern mit der Intlayer-Editor-Überlagerung bereit sein soll. Wenn auf `false` gesetzt, werden die zurückgegebenen Wörterbuchdaten editor-spezifische Funktionen ausschließen.

## Rückgabewert

Der Hook gibt ein Wörterbuchobjekt zurück, das lokalisierte Inhalte enthält, die nach `key` und `locale` geordnet sind. Es enthält auch ein `isLoading`-Boolean, das anzeigt, ob derzeit ein entferntes Wörterbuch abgerufen wird.

## Beispielverwendung in Next.js

### Beispiel für eine Client-seitige Komponente

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Inhalt wird geladen...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Inhalt wird geladen...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Inhalt wird geladen...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**Wichtige Punkte:**

- Beim ersten Rendern stammen `title` und `description` aus dem vorgerenderten Sprachwörterbuch.
- Während `isLoading` `true` ist, wird im Hintergrund eine entfernte Anfrage gestellt, um ein aktualisiertes Wörterbuch abzurufen.
- Sobald der Abruf abgeschlossen ist, werden `title` und `description` mit den neuesten Inhalten aktualisiert, und `isLoading` kehrt zu `false` zurück.

## Umgang mit Attribut-Lokalisierung

Wie bei `useIntlayer` können Sie lokalisierte Attributwerte für verschiedene HTML-Eigenschaften (z. B. `alt`, `title`, `aria-label`) abrufen:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Wörterbuchdateien

Alle Inhaltschlüssel müssen in Ihren Inhaltsdeklarationsdateien definiert sein, um Typsicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Diese Dateien ermöglichen die TypeScript-Validierung und stellen sicher, dass Sie immer auf vorhandene Schlüssel und Sprachen verweisen.

Anleitungen zur Einrichtung von Inhaltsdeklarationsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

## Weitere Informationen

- **Intlayer Visual Editor:**  
  Integrieren Sie den Intlayer Visual Editor, um Inhalte direkt über die Benutzeroberfläche zu verwalten und zu bearbeiten. Weitere Details [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

---

**Zusammenfassend** ist `useIntlayerAsync` ein leistungsstarker Client-seitiger Hook, der die Benutzererfahrung verbessert und die Aktualität der Inhalte durch die Kombination von vorgerenderten Wörterbüchern mit asynchronen Wörterbuch-Updates sicherstellt. Durch die Nutzung von `isLoading` und TypeScript-basierten Inhaltsdeklarationen können Sie dynamische, lokalisierte Inhalte nahtlos in Ihre Next.js-Anwendungen integrieren.
