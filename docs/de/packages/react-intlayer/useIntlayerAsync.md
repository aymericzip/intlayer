# React-Integration: `useIntlayerAsync` Hook Dokumentation

Der `useIntlayerAsync` Hook erweitert die Funktionalität von `useIntlayer`, indem er nicht nur vorgerenderte Wörterbücher zurückgibt, sondern auch Updates asynchron abruft, was ihn ideal für Anwendungen macht, die ihren lokalisierten Inhalt häufig nach dem ersten Rendern aktualisieren.

## Übersicht

- **Asynchrone Wörterbuchladung:**  
  Bei der ersten Initialisierung gibt `useIntlayerAsync` zuerst ein bereits vorab abgerufenes oder statisch gebündeltes Lokalisierungswörterbuch zurück (genau wie `useIntlayer` es tun würde) und ruft dann asynchron alle neu verfügbaren Remote-Wörterbücher ab und fügt diese zusammen.
- **Progress Statusverwaltung:**  
  Der Hook bietet auch einen `isLoading` Zustand, der anzeigt, wann ein Remote-Wörterbuch abgerufen wird. Dies ermöglicht es Entwicklern, Ladeindikatoren oder Platzhalterzustände anzuzeigen, um die Benutzererfahrung zu verbessern.

## Umgebungseinrichtung

Intlayer bietet ein headless Content Source Management (CSM) System, das Nicht-Entwicklern ermöglicht, Anwendungsinhalte nahtlos zu verwalten und zu aktualisieren. Durch die Verwendung von Intlayers intuitivem Dashboard kann Ihr Team lokalisierten Text, Bilder und andere Ressourcen bearbeiten, ohne den Code direkt ändern zu müssen. Dies optimiert den Prozess der Inhaltsverwaltung, fördert die Zusammenarbeit und stellt sicher, dass Aktualisierungen schnell und einfach durchgeführt werden können.

Um mit Intlayer zu beginnen:

1. **Registrieren Sie sich und erhalten Sie ein Zugriffstoken** unter [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Fügen Sie Anmeldeinformationen zu Ihrer Konfigurationsdatei hinzu:**  
   In Ihrem React-Projekt konfigurieren Sie den Intlayer-Client mit Ihren Anmeldeinformationen:

   ```typescript
   import { type IntlayerConfig } from 'intlayer';

   export default {
     ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies  IntlayerConfig
   ```

3. **Schieben Sie ein neues Lokalisierungswörterbuch zu Intlayer:**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   Dieser Befehl lädt Ihre initialen Inhaltswörterbücher hoch, sodass sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar sind.

## Importieren von `useIntlayerAsync` in React

Importieren Sie `useIntlayerAsync` in Ihren React-Komponenten:

```tsx
import { useIntlayerAsync } from "react-intlayer";
```

## Parameter

1. **`key`**:  
   **Typ**: `DictionaryKeys`  
   Der Wörterbuchschlüssel, der verwendet wird, um den lokalisierten Inhaltsblock zu identifizieren. Dieser Schlüssel sollte in Ihren Inhaltsdeklarationsdateien definiert sein.

2. **`locale`** (optional):  
   **Typ**: `Locales`  
   Die spezifische Sprache, die Sie anvisieren möchten. Wenn weggelassen, verwendet der Hook die Locale aus dem aktuellen Intlayer-Kontext.

3. **`isRenderEditor`** (optional, standardmäßig `true`):  
   **Typ**: `boolean`  
   Bestimmt, ob der Inhalt bereit für das Rendering mit der Intlayer-Editor-Überlagerung sein soll. Wenn auf `false` gesetzt, werden die zurückgegebenen Wörterbuchdaten keine editor-spezifischen Funktionen enthalten.

## Rückgabewert

Der Hook gibt ein Wörterbuchobjekt zurück, das lokalisierten Inhalt enthält, der nach `key` und `locale` geordnet ist. Es enthält auch ein `isLoading` Boolean, das angibt, ob ein Remote-Wörterbuch derzeit abgerufen wird.

## Beispielverwendung in einer React-Komponente

```tsx
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const AsyncClientComponentExample = () => {
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
          <p>Bitte warten, während sich der Inhalt aktualisiert.</p>
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

- Bei der ersten Darstellung stammen `title` und `description` aus dem vorab abgerufenen oder statisch eingebetteten Lokalisierungswörterbuch.
- Während `isLoading` `true` ist, wird eine Hintergrundanfrage ein aktualisiertes Wörterbuch abrufen.
- Sobald der Abruf abgeschlossen ist, werden `title` und `description` mit dem neuesten Inhalt aktualisiert, und `isLoading` kehrt zu `false` zurück.

## Umgang mit Attributlokalisierung

Sie können auch lokalisierte Attributwerte für verschiedene HTML-Eigenschaften (z. B. `alt`, `title`, `aria-label`) abrufen:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Inhaltsdeklarationsdateien

Alle Inhaltskeys müssen in Ihren Inhaltsdeklarationsdateien für Typensicherheit definiert werden, um Laufzeitfehler zu vermeiden. Diese Dateien ermöglichen TypeScript-Validierung, sodass Sie immer vorhandene Schlüssel und Locale referenzieren.

Anleitungen zum Einrichten von Inhaltsdeklarationsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

## Weitere Informationen

- **Intlayer Visual Editor:**  
  Integrieren Sie den Intlayer Visual Editor, um Inhalte direkt über die Benutzeroberfläche zu verwalten und zu bearbeiten. Weitere Details [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

---

**Zusammenfassend ist** `useIntlayerAsync` ein leistungsstarker React-Hook, der darauf ausgelegt ist, die Benutzererfahrung zu verbessern und die Frische des Inhalts aufrechtzuerhalten, indem vorgerenderte oder vorab abgerufene Wörterbücher mit asynchronen Wörterbuchupdates zusammengeführt werden. Durch die Nutzung von `isLoading` und TypeScript-basierten Inhaltsdeklarationen können Sie dynamische, lokalisierte Inhalte nahtlos in Ihre React-Anwendungen integrieren.
