# Next.js Integration: `useIntlayerAsync` Hook Dokumentation

Der `useIntlayerAsync` Hook erweitert die Funktionalität von `useIntlayer`, indem er nicht nur vorgerenderte Wörterbücher zurückgibt, sondern auch Updates asynchron abruft, wodurch er ideal für Anwendungen ist, die häufig ihren lokalisierten Inhalt nach dem ursprünglichen Rendern aktualisieren.

## Übersicht

- **Asynchrone Wörterbuchladung:**  
  Auf der Client-Seite gibt `useIntlayerAsync` zuerst das vorgerenderte lokale Wörterbuch zurück (genauso wie `useIntlayer`) und ruft dann asynchron alle neu verfügbaren entfernten Wörterbücher ab und fügt sie zusammen.
- **Verwaltung des Ladezustands:**  
  Der Hook bietet auch einen `isLoading` Zustand, der angibt, wann ein entferntes Wörterbuch abgerufen wird. Dies ermöglicht es Entwicklern, Ladeindikatoren oder Skeleton-Zustände für eine reibungslosere Benutzererfahrung anzuzeigen.

## Umgebungssetup

Intlayer bietet ein headless Content Source Management (CSM) System, das Nicht-Entwicklern ermöglicht, Anwendungsinhalte nahtlos zu verwalten und zu aktualisieren. Durch die Verwendung des intuitiven Dashboards von Intlayer kann Ihr Team lokalisierten Text, Bilder und andere Ressourcen bearbeiten, ohne den Code direkt zu ändern. Dies vereinfacht den Content-Management-Prozess, fördert die Zusammenarbeit und stellt sicher, dass Aktualisierungen schnell und einfach vorgenommen werden können.

Um mit Intlayer zu beginnen, müssen Sie sich zuerst registrieren und ein Zugriffstoken unter [https://intlayer.org/dashboard](https://intlayer.org/dashboard) erhalten. Sobald Sie Ihre Anmeldeinformationen haben, fügen Sie diese in Ihre Konfigurationsdatei wie unten gezeigt ein:

```typescript
import { type IntlayerConfig } from 'intlayer';

export default {
  ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

Nachdem Sie Ihre Anmeldeinformationen konfiguriert haben, können Sie ein neues lokales Wörterbuch an Intlayer über den folgenden Befehl pushen:

```bash
npm intlayer push -d my-first-dictionary-key
```

Dieser Befehl lädt Ihre ursprünglichen Inhaltswörterbücher hoch und macht sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar.

## Importieren von `useIntlayerAsync` in Next.js

Da `useIntlayerAsync` für **clientseitige** Komponenten vorgesehen ist, importieren Sie es aus dem gleichen Client-Einstiegspunkt wie `useIntlayer`:

```tsx
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

Stellen Sie sicher, dass die importierende Datei mit `"use client"` oben annotiert ist, wenn Sie den Next.js App Router mit getrennten Server- und Client-Komponenten verwenden.

## Parameter

1. **`key`**:  
   **Typ**: `DictionaryKeys`  
   Der Wörterbuchschlüssel, der verwendet wird, um den lokalisierten Inhaltsblock zu identifizieren. Dieser Schlüssel sollte in Ihren Inhaltsdeklarationsdateien definiert werden.

2. **`locale`** (optional):  
   **Typ**: `Locales`  
   Die spezifische Locale, die Sie anvisieren möchten. Wenn weggelassen, verwendet der Hook die Locale aus dem Client-Kontext.

3. **`isRenderEditor`** (optional, standardmäßig `true`):  
   **Typ**: `boolean`  
   Bestimmt, ob der Inhalt bereit ist zum Rendern mit dem Intlayer-Editor-Overlay. Wenn auf `false` gesetzt, werden die zurückgegebenen Wörterbuchdaten editor-spezifische Funktionen ausschließen.

## Rückgabewert

Der Hook gibt ein Wörterbuchobjekt zurück, das lokalisierten Inhalt enthält, der nach `key` und `locale` zugeordnet ist. Es enthält auch ein `isLoading` Boolean, das angibt, ob ein entferntes Wörterbuch derzeit abgerufen wird.

## Beispielverwendung in Next.js

### Beispiel für eine Client-Seitenkomponente

```tsx
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample = () => {
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

- Bei der ersten Darstellung stammen `title` und `description` aus dem vorgerenderten lokalen Wörterbuch.
- Während `isLoading` `true` ist, wird im Hintergrund eine entfernte Anfrage gestellt, um ein aktualisiertes Wörterbuch abzurufen.
- Sobald der Abruf abgeschlossen ist, werden `title` und `description` mit dem neuesten Inhalt aktualisiert, und `isLoading` kehrt zu `false` zurück.

## Behandlung der Attributlokalisierung

Wie bei `useIntlayer` können Sie lokalisierte Attributwerte für verschiedene HTML-Eigenschaften (z. B. `alt`, `title`, `aria-label`) abrufen:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Inhaltsdeklarationsdateien

Alle Inhaltskeys müssen in Ihren Inhaltsdeklarationsdateien für Typ-Sicherheit definiert sein, um Laufzeitfehler zu vermeiden. Diese Dateien ermöglichen eine TypeScript-Validierung und stellen sicher, dass Sie immer auf vorhandene Keys und Locales verweisen.

Anleitungen zum Einrichten von Inhaltsdeklarationsdateien finden Sie [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

## Weitere Informationen

- **Intlayer Visual Editor:**  
  Integrieren Sie mit dem Intlayer Visual Editor, um Inhalte direkt über die Benutzeroberfläche zu verwalten und zu bearbeiten. Weitere Informationen [hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

---

**Zusammenfassend** ist `useIntlayerAsync` ein leistungsstarker clientseitiger Hook, der darauf abzielt, die Benutzererfahrung zu verbessern und die Frische des Inhalts aufrechtzuerhalten, indem vorgerenderte Wörterbücher mit asynchronen Wörterbuchupdates verknüpft werden. Durch die Nutzung von `isLoading` und TypeScript-basierten Inhaltsdeklarationen können Sie dynamische, lokalisierte Inhalte nahtlos in Ihre Next.js-Anwendungen integrieren.
