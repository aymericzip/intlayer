---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Dokumentation des useIntlayerAsync Hooks | react-intlayer
description: Erfahren Sie, wie Sie den useIntlayerAsync-Hook für das react-intlayer-Paket verwenden
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

Der `useIntlayerAsync` Hook erweitert die Funktionalität von `useIntlayer`, indem er nicht nur vorgerenderte Wörterbücher zurückgibt, sondern auch Updates asynchron abruft. Dies macht ihn ideal für Anwendungen, die ihren lokalisierten Inhalt nach dem ersten Rendern häufig aktualisieren.

## Übersicht

- **Asynchrones Laden von Wörterbüchern:**  
  Beim ersten Mount gibt `useIntlayerAsync` zunächst vorab abgerufene oder statisch gebündelte Wörterbücher zurück (ähnlich wie `useIntlayer`) und ruft dann asynchron neue verfügbare Wörterbücher ab und integriert diese.
- **Verwaltung des Ladezustands:**  
  Der Hook bietet auch einen `isLoading`-Status, der anzeigt, wann ein Wörterbuch abgerufen wird. Dies ermöglicht es Entwicklern, Ladeindikatoren oder Skeleton-Zustände für eine reibungslosere Benutzererfahrung anzuzeigen.

## Einrichtung der Umgebung

Intlayer bietet ein Headless Content Source Management (CSM)-System, das es Nicht-Entwicklern ermöglicht, Anwendungsinhalte nahtlos zu verwalten und zu aktualisieren. Mit dem intuitiven Dashboard von Intlayer kann Ihr Team lokalisierten Text, Bilder und andere Ressourcen bearbeiten, ohne den Code direkt zu ändern. Dies optimiert den Content-Management-Prozess, fördert die Zusammenarbeit und stellt sicher, dass Updates schnell und einfach durchgeführt werden können.

So starten Sie mit Intlayer:

1. **Registrieren Sie sich und erhalten Sie ein Zugriffstoken** unter [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Fügen Sie Anmeldeinformationen zu Ihrer Konfigurationsdatei hinzu:**  
   Konfigurieren Sie in Ihrem React-Projekt den Intlayer-Client mit Ihren Anmeldeinformationen:

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

3. **Laden Sie ein neues Wörterbuch zu Intlayer hoch:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   Dieser Befehl lädt Ihre anfänglichen Inhaltswörterbücher hoch, sodass sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar sind.

## Importieren von `useIntlayerAsync` in React

Importieren Sie `useIntlayerAsync` in Ihren React-Komponenten:

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
   Der Schlüssel des Wörterbuchs, der verwendet wird, um den lokalisierten Inhaltsblock zu identifizieren. Dieser Schlüssel sollte in Ihren Inhaltsdeklarationsdateien definiert sein.

2. **`locale`** (optional):  
   **Typ**: `Locales`  
   Die spezifische Sprache, die Sie anvisieren möchten. Wenn nicht angegeben, verwendet der Hook die Sprache aus dem aktuellen Intlayer-Kontext.

3. **`isRenderEditor`** (optional, Standardwert ist `true`):  
   **Typ**: `boolean`  
   Bestimmt, ob der Inhalt für die Darstellung mit der Intlayer-Editor-Overlay bereit sein soll. Wenn auf `false` gesetzt, werden editor-spezifische Funktionen aus den zurückgegebenen Wörterbuchdaten ausgeschlossen.

## Rückgabewert

Der Hook gibt ein Wörterbuchobjekt zurück, das lokalisierten Inhalt enthält, der nach `key` und `locale` geordnet ist. Es enthält auch ein `isLoading`-Boolean, das anzeigt, ob ein Wörterbuch gerade abgerufen wird.

## Beispielverwendung in einer React-Komponente

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
          <h1>Laden…</h1>
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
          <h1>Laden…</h1>
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
          <h1>Laden…</h1>
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

- Beim ersten Rendern stammen `title` und `description` aus dem vorab abgerufenen oder statisch eingebetteten Wörterbuch.
- Während `isLoading` `true` ist, wird im Hintergrund ein aktualisiertes Wörterbuch abgerufen.
- Sobald der Abruf abgeschlossen ist, werden `title` und `description` mit dem neuesten Inhalt aktualisiert, und `isLoading` kehrt zu `false` zurück.

## Umgang mit Attribut-Lokalisierung

Sie können auch lokalisierte Attributwerte für verschiedene HTML-Eigenschaften abrufen (z. B. `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Wörterbuchdateien

Alle Inhalts-Schlüssel müssen in Ihren Inhaltsdeklarationsdateien definiert sein, um Typsicherheit zu gewährleisten und Laufzeitfehler zu vermeiden. Diese Dateien ermöglichen die TypeScript-Validierung und stellen sicher, dass Sie immer auf vorhandene Schlüssel und Sprachen verweisen.

Anleitungen zur Einrichtung von Inhaltsdeklarationsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

## Weitere Informationen

- **Intlayer Visual Editor:**  
  Integrieren Sie den Intlayer Visual Editor, um Inhalte direkt über die Benutzeroberfläche zu verwalten und zu bearbeiten. Weitere Details [hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

---

**Zusammenfassend** ist `useIntlayerAsync` ein leistungsstarker React-Hook, der die Benutzererfahrung verbessert und die Aktualität der Inhalte durch die Kombination von vorgerenderten oder vorab abgerufenen Wörterbüchern mit asynchronen Wörterbuch-Updates sicherstellt. Durch die Nutzung von `isLoading` und auf TypeScript basierenden Inhaltsdeklarationen können Sie dynamische, lokalisierte Inhalte nahtlos in Ihre React-Anwendungen integrieren.
