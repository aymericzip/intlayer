# React Integration: `useIntlayerAsync` Hook Documentation

Der `useIntlayerAsync` Hook erweitert die Funktionalität von `useIntlayer`, indem er nicht nur vorgerenderte Wörterbücher zurückgibt, sondern auch Updates asynchron abruft, was ihn ideal für Anwendungen macht, die ihren lokalisierten Inhalt häufig nach dem ersten Rendern aktualisieren.

## Übersicht

- **Asynchrone Wörterbuchladung:**  
  Bei der ersten Installation gibt `useIntlayerAsync` zunächst jedes vorab abgerufene oder statisch gebündelte lokale Wörterbuch zurück (genau wie `useIntlayer`) und ruft dann asynchron neue verfügbare Remote-Wörterbücher ab und fügt sie zusammen.
- **Statusverwaltung für Fortschritt:**  
  Der Hook bietet auch einen `isLoading`-Status, der angibt, wann ein Remote-Wörterbuch abgerufen wird. Dies ermöglicht Entwicklern, Ladeanzeigen oder Skeletonzustände für ein reibungsloseres Benutzererlebnis anzuzeigen.

## Umgebungseinrichtung

Intlayer bietet ein headless Content Source Management (CSM) System, das es Nicht-Entwicklern ermöglicht, Anwendungsinhalte nahtlos zu verwalten und zu aktualisieren. Mit dem intuitiven Dashboard von Intlayer kann Ihr Team lokalisierten Text, Bilder und andere Ressourcen bearbeiten, ohne direkt den Code zu ändern. Dies optimiert den Inhaltmanagementprozess, fördert die Zusammenarbeit und sorgt dafür, dass Updates schnell und einfach vorgenommen werden können.

Um mit Intlayer zu beginnen:

1. **Registrieren und einen Zugriffstoken erhalten** unter [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Fügen Sie Anmeldeinformationen zu Ihrer Konfigurationsdatei hinzu:**  
   In Ihrem React-Projekt konfigurieren Sie den Intlayer-Client mit Ihren Anmeldeinformationen:

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

3. **Ein neues lokales Wörterbuch nach Intlayer hochladen:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   Dieser Befehl lädt Ihre initialen Inhaltswörterbücher hoch, sodass sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar sind.

## Importieren von `useIntlayerAsync` in React

In Ihren React-Komponenten importieren Sie `useIntlayerAsync`:

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
   Die spezifische Sprache, die Sie anvisieren möchten. Wenn weggelassen, verwendet der Hook die Sprache aus dem aktuellen Intlayer-Kontext.

3. **`isRenderEditor`** (optional, Standardwert `true`):  
   **Typ**: `boolean`  
   Bestimmt, ob der Inhalt bereit für das Rendern mit der Intlayer-Editor-Overlay sein soll. Wenn auf `false` gesetzt, werden die zurückgegebenen Wörterbuchdaten keine editor-spezifischen Funktionen enthalten.

## Rückgabewert

Der Hook gibt ein Wörterbuchobjekt zurück, das lokalisierten Inhalt enthält, der durch `key` und `locale` indiziert ist. Es enthält auch ein `isLoading` boolean, das angibt, ob ein REMOTE-Wörterbuch derzeit abgerufen wird.

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
          <p>Bitte warten, während der Inhalt aktualisiert wird.</p>
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
          <p>Bitte warten, während der Inhalt aktualisiert wird.</p>
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
          <p>Bitte warten, während der Inhalt aktualisiert wird.</p>
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

- Bei der ersten Anzeige stammen `title` und `description` aus dem vorab abgerufenen oder statisch eingebetteten lokalen Wörterbuch.
- Solange `isLoading` `true` ist, wird eine Hintergrundanfrage gestartet, um ein aktualisiertes Wörterbuch abzurufen.
- Sobald der Abruf abgeschlossen ist, werden `title` und `description` mit dem neuesten Inhalt aktualisiert, und `isLoading` gibt `false` zurück.

## Behandlung der Attributlokalisierung

Sie können auch lokalisierte Attributwerte für verschiedene HTML-Eigenschaften abrufen (z. B. `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Inhaltsdeklarationsdateien

Alle Inhalts-Schlüssel müssen in Ihren Inhaltsdeklarationsdateien definiert werden, um die Typensicherheit zu gewährleisten und um Laufzeitfehler zu vermeiden. Diese Dateien ermöglichen die TypeScript-Validierung und stellen sicher, dass Sie immer vorhandene Schlüssel und Sprachen referenzieren.

Anleitungen zur Einrichtung von Inhaltsdeklarationsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md).

## Weitere Informationen

- **Intlayer Visual Editor:**  
  Integrieren Sie den Intlayer Visuellen Editor für die Verwaltung und Bearbeitung von Inhalten direkt aus der Benutzeroberfläche. Weitere Details [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

---

**Zusammenfassend** ist `useIntlayerAsync` ein leistungsstarker React-Hook, der entwickelt wurde, um das Benutzererlebnis zu verbessern und die Frische des Inhalts aufrechtzuerhalten, indem vorgerenderte oder vorab abgerufene Wörterbücher mit asynchronen Wörterbuchupdates zusammengeführt werden. Durch die Nutzung von `isLoading` und TypeScript-basierten Inhaltsdeklarationen können Sie dynamische, lokalisierte Inhalte nahtlos in Ihre React-Anwendungen integrieren.
