---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerAsync Hook Dokumentation | next-intlayer
description: Siehe, wie der useIntlayerAsync Hook für das next-intlayer Paket verwendet wird
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
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayerAsync
---

# Next.js Integration: `useIntlayerAsync` Hook Dokumentation

Der `useIntlayerAsync` Hook erweitert die Funktionalität von `useIntlayer`, indem er nicht nur vorgerenderte Wörterbücher zurückgibt, sondern auch Aktualisierungen asynchron abruft. Dadurch ist er ideal für Anwendungen, die ihre lokalisierten Inhalte nach dem ersten Rendern häufig aktualisieren.

## Überblick

- **Asynchrones Laden von Wörterbüchern:**  
  Auf der Client-Seite gibt `useIntlayerAsync` zunächst das vorgerenderte Lokalisierungswörterbuch zurück (genau wie `useIntlayer`) und ruft anschließend asynchron alle neu verfügbaren entfernten Wörterbücher ab und fügt sie zusammen.
- **Verwaltung des Ladezustands:**  
  Der Hook stellt außerdem einen `isLoading` Zustand bereit, der anzeigt, wann ein entferntes Wörterbuch abgerufen wird. Dies ermöglicht es Entwicklern, Ladeanzeigen oder Skeleton-Zustände für eine flüssigere Benutzererfahrung anzuzeigen.

## Einrichtung der Umgebung

Intlayer bietet ein kopfloses Content Source Management (CSM)-System, das es Nicht-Entwicklern ermöglicht, Anwendungsinhalte nahtlos zu verwalten und zu aktualisieren. Durch die Nutzung des intuitiven Dashboards von Intlayer kann Ihr Team lokalisierten Text, Bilder und andere Ressourcen bearbeiten, ohne den Code direkt ändern zu müssen. Dies vereinfacht den Content-Management-Prozess, fördert die Zusammenarbeit und stellt sicher, dass Aktualisierungen schnell und einfach vorgenommen werden können.

Um mit Intlayer zu beginnen, müssen Sie sich zunächst registrieren und einen Zugriffstoken im [Dashboard](https://intlayer.org/dashboard) erhalten. Sobald Sie Ihre Zugangsdaten haben, fügen Sie diese wie unten gezeigt in Ihre Konfigurationsdatei ein:

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
// Konfiguration für den Editor mit Client-ID und Client-Secret aus Umgebungsvariablen
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
// Konfiguration für den Editor mit Client-ID und Client-Secret aus Umgebungsvariablen
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

Nach der Konfiguration Ihrer Zugangsdaten können Sie ein neues Sprachwörterbuch zu Intlayer hochladen, indem Sie folgenden Befehl ausführen:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Dieser Befehl lädt Ihre initialen Inhaltswörterbücher hoch und macht sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar.

## Importieren von `useIntlayerAsync` in Next.js

Da `useIntlayerAsync` für **Client-seitige** Komponenten vorgesehen ist, importieren Sie es vom gleichen Client-Einstiegspunkt wie `useIntlayer`:

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
   Die spezifische Locale, die Sie ansprechen möchten. Wenn ausgelassen, verwendet der Hook die Locale aus dem Client-Kontext.

3. **`isRenderEditor`** (optional, Standardwert `true`):  
    **Typ**: `boolean`  
   Bestimmt, ob der Inhalt für die Darstellung mit der Intlayer-Editor-Overlay bereit sein soll. Wenn auf `false` gesetzt, enthält das zurückgegebene Wörterbuch keine editor-spezifischen Funktionen.

## Rückgabewert

Der Hook gibt ein Wörterbuchobjekt zurück, das lokalisierten Inhalt enthält, der durch `key` und `locale` indiziert ist. Es enthält außerdem ein `isLoading`-Boolean, das angibt, ob gerade ein entferntes Wörterbuch geladen wird.

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

- Beim ersten Rendern stammen `title` und `description` aus dem vorgerenderten Lokalisierungswörterbuch.
- Während `isLoading` auf `true` gesetzt ist, wird im Hintergrund eine Remote-Anfrage ausgeführt, um ein aktualisiertes Wörterbuch abzurufen.
- Sobald der Abruf abgeschlossen ist, werden `title` und `description` mit dem neuesten Inhalt aktualisiert, und `isLoading` wird wieder auf `false` gesetzt.

## Umgang mit der Attribut-Lokalisierung

Wie bei `useIntlayer` können Sie lokalisierte Attributwerte für verschiedene HTML-Eigenschaften abrufen (z. B. `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Wörterbuchdateien

Alle Inhalts-Schlüssel müssen in Ihren Inhaltsdeklarationsdateien definiert sein, um Typensicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Diese Dateien ermöglichen die TypeScript-Validierung, sodass Sie immer auf vorhandene Schlüssel und Sprachen verweisen.

- Während `isLoading` auf `true` gesetzt ist, wird im Hintergrund eine Remote-Anfrage ausgeführt, um ein aktualisiertes Wörterbuch abzurufen.
- Sobald der Abruf abgeschlossen ist, werden `title` und `description` mit dem neuesten Inhalt aktualisiert, und `isLoading` wird wieder auf `false` gesetzt.

## Umgang mit der Attribut-Lokalisierung

Wie bei `useIntlayer` können Sie lokalisierte Attributwerte für verschiedene HTML-Eigenschaften (z. B. `alt`, `title`, `aria-label`) abrufen:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Wörterbuchdateien

Alle Inhaltsschlüssel müssen in Ihren Inhaltsdeklarationsdateien definiert sein, um Typsicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Diese Dateien ermöglichen die TypeScript-Validierung, sodass Sie immer auf vorhandene Schlüssel und Sprachen verweisen.

Anleitungen zum Einrichten von Inhaltsdeklarationsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

## Weitere Informationen

- **Intlayer Visual Editor:**  
  Integration mit dem Intlayer Visual Editor zur Verwaltung und Bearbeitung von Inhalten direkt über die Benutzeroberfläche. Weitere Details [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

---

**Zusammenfassend** ist `useIntlayerAsync` ein leistungsstarker Client-seitiger Hook, der darauf ausgelegt ist, die Benutzererfahrung zu verbessern und die Aktualität der Inhalte zu gewährleisten, indem vorgerenderte Wörterbücher mit asynchronen Wörterbuchaktualisierungen kombiniert werden. Durch die Nutzung von `isLoading` und TypeScript-basierten Inhaltsdeklarationen können Sie dynamische, lokalisierte Inhalte nahtlos in Ihre Next.js-Anwendungen integrieren.

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie

---

**Zusammenfassung**, `useIntlayerAsync` ist ein leistungsstarker Client-seitiger Hook, der entwickelt wurde, um die Benutzererfahrung zu verbessern und die Aktualität der Inhalte zu gewährleisten, indem vorgerenderte Wörterbücher mit asynchronen Wörterbuch-Updates kombiniert werden. Durch die Nutzung von `isLoading` und TypeScript-basierten Inhaltsdeklarationen können Sie dynamische, lokalisierte Inhalte nahtlos in Ihre Next.js-Anwendungen integrieren.

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Historie initialisiert
