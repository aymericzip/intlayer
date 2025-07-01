---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerAsync Hook Dokumentation | react-intlayer
description: Siehe, wie der useIntlayerAsync Hook für das react-intlayer Paket verwendet wird
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

# React-Integration: `useIntlayerAsync` Hook Dokumentation

Der `useIntlayerAsync` Hook erweitert die Funktionalität von `useIntlayer`, indem er nicht nur vorgerenderte Wörterbücher zurückgibt, sondern auch Updates asynchron abruft. Dadurch ist er ideal für Anwendungen, die ihren lokalisierten Inhalt nach dem ersten Rendern häufig aktualisieren.

## Überblick

- **Asynchrones Laden von Wörterbüchern:**  
  Beim ersten Mount gibt `useIntlayerAsync` zunächst ein vorab geladenes oder statisch eingebundenes lokales Wörterbuch zurück (genau wie `useIntlayer`) und lädt dann asynchron alle neu verfügbaren entfernten Wörterbücher nach und fügt sie zusammen.
- **Statusverwaltung des Ladevorgangs:**  
  Der Hook stellt außerdem einen `isLoading`-Status bereit, der anzeigt, wann ein entferntes Wörterbuch geladen wird. Dies ermöglicht es Entwicklern, Ladeanzeigen oder Skeleton-Zustände für eine flüssigere Benutzererfahrung anzuzeigen.

## Einrichtung der Umgebung

Intlayer bietet ein kopfloses Content Source Management (CSM)-System, das es Nicht-Entwicklern ermöglicht, Anwendungsinhalte nahtlos zu verwalten und zu aktualisieren. Durch die Verwendung des intuitiven Dashboards von Intlayer kann Ihr Team lokalisierten Text, Bilder und andere Ressourcen bearbeiten, ohne direkt den Code ändern zu müssen. Dies vereinfacht den Content-Management-Prozess, fördert die Zusammenarbeit und stellt sicher, dass Aktualisierungen schnell und einfach vorgenommen werden können.

Um mit Intlayer zu starten:

1. **Registrieren Sie sich und erhalten Sie einen Zugriffstoken** unter [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Fügen Sie die Zugangsdaten zu Ihrer Konfigurationsdatei hinzu:**  
   Konfigurieren Sie in Ihrem React-Projekt den Intlayer-Client mit Ihren Zugangsdaten:

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

3. **Schieben Sie ein neues Sprachwörterbuch zu Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   Dieser Befehl lädt Ihre anfänglichen Inhaltswörterbücher hoch und macht sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar.

## Importieren von `useIntlayerAsync` in React

Importieren Sie in Ihren React-Komponenten `useIntlayerAsync`:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## Parameter

1. **`key`**:
   **Typ**: `DictionaryKeys`
   Der Wörterbuchschlüssel, der verwendet wird, um den lokalisierten Inhaltsblock zu identifizieren. Dieser Schlüssel sollte in Ihren Inhaltsdeklarationsdateien definiert sein.

2. **`locale`** (optional):
   **Typ**: `Locales`
   Die spezifische Locale, auf die Sie abzielen möchten. Wenn ausgelassen, verwendet der Hook die Locale aus dem aktuellen Intlayer-Kontext.

3. **`isRenderEditor`** (optional, Standardwert `true`):
   **Typ**: `boolean`
   Bestimmt, ob der Inhalt für die Darstellung mit der Intlayer-Editor-Overlay bereit sein soll. Wenn auf `false` gesetzt, schließen die zurückgegebenen Wörterbuchdaten editor-spezifische Funktionen aus.

## Rückgabewert

Der Hook gibt ein Wörterbuchobjekt zurück, das lokalisierten Inhalt enthält, der durch `key` und `locale` indiziert ist. Es enthält außerdem ein `isLoading`-Boolean, das angibt, ob gerade ein entferntes Wörterbuch geladen wird.

## Beispielhafte Verwendung in einer React-Komponente

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Inhalt wird geladen...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Lädt…</h1>
          <p>Bitte warten Sie, während der Inhalt aktualisiert wird.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Inhalt wird geladen...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Lädt…</h1>
          <p>Bitte warten Sie, während der Inhalt aktualisiert wird.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Inhalt wird geladen...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Lädt…</h1>
          <p>Bitte warten Sie, während der Inhalt aktualisiert wird.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**Wichtige Punkte:**

- Beim ersten Rendern stammen `title` und `description` aus dem vorab geladenen oder statisch eingebetteten Lokalisierungswörterbuch.
- Solange `isLoading` auf `true` gesetzt ist, wird im Hintergrund eine Anfrage ausgeführt, um ein aktualisiertes Wörterbuch abzurufen.
- Sobald der Abruf abgeschlossen ist, werden `title` und `description` mit dem neuesten Inhalt aktualisiert, und `isLoading` wird wieder auf `false` gesetzt.

## Umgang mit der Attribut-Lokalisierung

Sie können auch lokalisierte Attributwerte für verschiedene HTML-Eigenschaften abrufen (z. B. `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Wörterbuchdateien

Alle Inhalts-Schlüssel müssen in Ihren Inhaltsdeklarationsdateien definiert sein, um Typensicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Diese Dateien ermöglichen die TypeScript-Validierung, sodass Sie immer auf vorhandene Schlüssel und Sprachen verweisen.

Anleitungen zum Einrichten von Inhaltsdeklarationsdateien sind [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md) verfügbar.

## Weitere Informationen

- **Intlayer Visual Editor:**
  Integration mit dem Intlayer Visual Editor zur Verwaltung und Bearbeitung von Inhalten direkt über die Benutzeroberfläche. Weitere Details [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

---

**Zusammenfassung**, `useIntlayerAsync` ist ein leistungsstarker React-Hook, der entwickelt wurde, um die Benutzererfahrung zu verbessern und die Aktualität der Inhalte zu gewährleisten, indem vorgerenderte oder vorab geladene Wörterbücher mit asynchronen Wörterbuchaktualisierungen zusammengeführt werden. Durch die Nutzung von `isLoading` und TypeScript-basierten Inhaltsdeklarationen können Sie dynamische, lokalisierte Inhalte nahtlos in Ihre React-Anwendungen integrieren.

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Historie initialisiert

```

```
