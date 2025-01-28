# Next.js-Integration: `useIntlayerAsync` Hook-Dokumentation

Der `useIntlayerAsync`-Hook erweitert die Funktionalität von `useIntlayer`, indem er nicht nur vorgerenderte Wörterbücher zurückgibt, sondern auch Aktualisierungen asynchron abruft, was ihn ideal für Anwendungen macht, die ihre lokalisierten Inhalte häufig nach dem ersten Rendern aktualisieren.

## Übersicht

- **Asynchrone Wörterbuchladung:**  
  Auf der Client-Seite gibt `useIntlayerAsync` zuerst das vorgerenderte lokale Wörterbuch zurück (genau wie `useIntlayer`) und ruft dann asynchron alle neu verfügbaren Remote-Wörterbücher ab und fügt sie zusammen.
- **Zustandsverwaltung des Fortschritts:**  
  Der Hook bietet auch einen `isLoading`-Zustand, der angibt, wann ein Remote-Wörterbuch abgerufen wird. Dies ermöglicht Entwicklern, Ladeindikatoren oder Skeleton-Zustände anzuzeigen, um ein reibungsloseres Benutzererlebnis zu schaffen.

## Einrichtung der Umgebung

Intlayer bietet ein headless Content Source Management (CSM)-System, das Nicht-Entwicklern ermöglicht, Anwendungsinhalte nahtlos zu verwalten und zu aktualisieren. Mit Intlayers intuitivem Dashboard kann Ihr Team lokalisierten Text, Bilder und andere Ressourcen bearbeiten, ohne den Code direkt zu ändern. Dies vereinfacht den Prozess der Inhaltsverwaltung, fördert die Zusammenarbeit und stellt sicher, dass Updates schnell und einfach vorgenommen werden können.

Um mit Intlayer zu beginnen, müssen Sie sich zunächst registrieren und ein Zugriffstoken unter [https://intlayer.org/dashboard](https://intlayer.org/dashboard) erhalten. Sobald Sie Ihre Anmeldeinformationen haben, fügen Sie diese wie unten in Ihrer Konfigurationsdatei hinzu:

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

Nachdem Sie Ihre Anmeldeinformationen konfiguriert haben, können Sie ein neues lokales Wörterbuch zu Intlayer hinzufügen, indem Sie Folgendes ausführen:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Dieser Befehl lädt Ihre anfänglichen Inhaltswörterbücher hoch und macht sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar.

## Importieren von `useIntlayerAsync` in Next.js

Da `useIntlayerAsync` für **Client-seitige** Komponenten gedacht ist, importieren Sie es von demselben Client-Einstiegspunkt wie `useIntlayer`:

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

Stellen Sie sicher, dass die importierende Datei am Anfang mit `"use client"` annotiert ist, wenn Sie den Next.js-App-Router mit getrennten Server- und Client-Komponenten verwenden.

## Parameter

1. **`key`**:  
   **Typ**: `DictionaryKeys`  
   Der Wörterbuchschlüssel, der verwendet wird, um den lokalisierten Inhaltblock zu identifizieren. Dieser Schlüssel sollte in Ihren Inhaltsdeklarationsdateien definiert sein.

2. **`locale`** (optional):  
   **Typ**: `Locales`  
   Die spezifische Sprache, die Sie ansprechen möchten. Wenn weggelassen, verwendet der Hook die Sprache aus dem Client-Kontext.

3. **`isRenderEditor`** (optional, standardmäßig `true`):  
   **Typ**: `boolean`  
   Bestimmt, ob der Inhalt bereit für das Rendering mit dem Intlayer-Editor-Overlay sein soll. Wenn auf `false` gesetzt, werden die zurückgegebenen Wörterbuchdaten von editor-spezifischen Funktionen ausgeschlossen.

## Rückgabewert

Der Hook gibt ein Wörterbuchobjekt zurück, das lokalisierten Inhalt enthält, der nach `key` und `locale` indiziert ist. Es enthält auch einen `isLoading`-Boolean, der angibt, ob ein entferntes Wörterbuch gerade abgerufen wird.

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

**Wichtigste Punkte:**

- Bei der ersten Darstellung stammen `title` und `description` aus dem vorgerenderten lokalen Wörterbuch.
- Während `isLoading` `true` ist, wird im Hintergrund eine entfernte Anfrage gestellt, um ein aktualisiertes Wörterbuch abzurufen.
- Sobald der Abruf abgeschlossen ist, werden `title` und `description` mit dem neuesten Inhalt aktualisiert, und `isLoading` kehrt zu `false` zurück.

## Handhabung der Attributlokalisierung

Wie bei `useIntlayer` können Sie lokalisierten Attributwerte für verschiedene HTML-Eigenschaften (z. B. `alt`, `title`, `aria-label`) abrufen:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Inhaltsdeklarationsdateien

Alle Inhaltskeys müssen in Ihren Inhaltsdeklarationsdateien definiert sein, um Typsicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Diese Dateien ermöglichen TypeScript-Validierung, sodass Sie immer vorhandene Schlüssel und Sprachen referenzieren.

Anleitungen zur Einrichtung von Inhaltsdeklarationsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

## Weitere Informationen

- **Intlayer Visueller Editor:**  
  Integrieren Sie den Intlayer visuellen Editor zur Verwaltung und Bearbeitung von Inhalten direkt über die Benutzeroberfläche. Weitere Details finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

---

**Zusammenfassend** ist `useIntlayerAsync` ein leistungsstarker client-seitiger Hook, der entwickelt wurde, um das Benutzererlebnis zu verbessern und die Frische der Inhalte aufrechtzuerhalten, indem vorgerenderte Wörterbücher mit asynchronen Wörterbuchaktualisierungen kombiniert werden. Durch die Verwendung von `isLoading` und TypeScript-basierten Inhaltsdeklarationen können Sie dynamische, lokalisierte Inhalte nahtlos in Ihre Next.js-Anwendungen integrieren.
