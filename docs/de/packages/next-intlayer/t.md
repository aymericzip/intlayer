# Dokumentation: `t` Funktion in `next-intlayer`

Die `t` Funktion im `next-intlayer` Paket ist ein fundamentales Werkzeug für die Inline-Internationalisierung innerhalb Ihrer Next.js-Anwendung. Sie ermöglicht es Ihnen, Übersetzungen direkt innerhalb Ihrer Komponenten zu definieren, wodurch es einfach wird, lokalisierten Inhalt basierend auf der aktuellen Sprache anzuzeigen.

---

## Überblick

Die `t` Funktion wird verwendet, um Übersetzungen für verschiedene Sprachen direkt in Ihren Komponenten bereitzustellen. Durch das Übergeben eines Objekts, das Übersetzungen für jede unterstützte Sprache enthält, gibt `t` die passende Übersetzung basierend auf dem aktuellen Sprachkontext in Ihrer Next.js-Anwendung zurück.

---

## Hauptmerkmale

- **Inline-Übersetzungen**: ideal für schnelle, Inline-Texte, die keine separate Inhaltserklärung benötigen.
- **Automatische Sprachwahl**: Gibt automatisch die Übersetzung zurück, die der aktuellen Sprache entspricht.
- **TypeScript Unterstützung**: Bietet Typensicherheit und Autovervollständigung, wenn sie mit TypeScript verwendet wird.
- **Einfache Integration**: Funktioniert nahtlos innerhalb sowohl von Client- als auch von Serverkomponenten in Next.js.

---

## Funktionssignatur

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel die Sprachcodes sind (z. B. `en`, `fr`, `es`) und die Werte die entsprechenden übersetzten Strings sind.

### Rückgabe

- Ein String, der den übersetzten Inhalt für die aktuelle Sprache darstellt.

---

## Anwendungsbeispiele

### Verwendung von `t` in einer Client-Komponente

Stellen Sie sicher, dass Sie die `'use client';` Anweisung oben in Ihrer Komponenten-Datei einschließen, wenn Sie `t` in einer client-seitigen Komponente verwenden.

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a client component example",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido d un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### Verwendung von `t` in einer Server-Komponente

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a server component example",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### Inline-Übersetzungen in Attributen

Die `t` Funktion ist besonders nützlich für Inline-Übersetzungen in JSX-Attributen.
Beim Lokalisieren von Attributen wie `alt`, `title`, `href` oder `aria-label` können Sie `t` direkt im Attribut verwenden.

```tsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Fortgeschrittene Themen

### TypeScript-Integration

Die `t` Funktion ist typensicher, wenn sie mit TypeScript verwendet wird, und stellt sicher, dass alle erforderlichen Sprachen bereitgestellt werden.

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Sprachenerkennung und Kontext

In `next-intlayer` wird die aktuelle Sprache über Kontextanbieter verwaltet: `IntlayerClientProvider` und `IntlayerServerProvider`. Stellen Sie sicher, dass diese Anbieter Ihre Komponenten umschließen und die `locale`-Prop korrekt übergeben wird.

#### Beispiel:

```tsx
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Ihre Komponenten hier */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Häufige Fehler und Fehlersuche

### `t` Gibt Undefiniert oder Falsche Übersetzung Zurück

- **Ursache**: Die aktuelle Sprache ist nicht korrekt festgelegt, oder die Übersetzung für die aktuelle Sprache fehlt.
- **Lösung**:
  - Überprüfen Sie, ob der `IntlayerClientProvider` oder `IntlayerServerProvider` korrekt mit der entsprechenden `locale` eingerichtet ist.
  - Stellen Sie sicher, dass Ihr Übersetzungsobjekt alle erforderlichen Sprachen enthält.

### Fehlende Übersetzungen in TypeScript

- **Ursache**: Das Übersetzungsobjekt erfüllt nicht die erforderlichen Sprachen, was zu TypeScript-Fehlern führt.
- **Lösung**: Verwenden Sie den Typ `IConfigLocales`, um die Vollständigkeit Ihrer Übersetzungen sicherzustellen.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlende 'es' führt zu einem TypeScript-Fehler
};

const text = t(translations);
```

---

## Tipps für effektive Nutzung

1. **Verwenden Sie `t` für einfache Inline-Übersetzungen**: Ideal für die Übersetzung kleiner Textteile direkt innerhalb Ihrer Komponenten.
2. **Bevorzugen Sie `useIntlayer` für strukturierte Inhalte**: Für komplexere Übersetzungen und Inhaltserstellung definieren Sie Inhalte in Deklarationsdateien und verwenden Sie `useIntlayer`.
3. **Konsistente Bereitstellung der Sprache**: Stellen Sie sicher, dass Ihre Sprache konsequent über die entsprechenden Anbieter in Ihrer Anwendung bereitgestellt wird.
4. **Nutzen Sie TypeScript**: Verwenden Sie TypeScript-Typen, um fehlende Übersetzungen zu erkennen und Typensicherheit zu gewährleisten.

---

## Fazit

Die `t` Funktion in `next-intlayer` ist ein leistungsstarkes und praktisches Werkzeug zur Verwaltung von Inline-Übersetzungen in Ihren Next.js-Anwendungen. Durch eine effektive Integration verbessern Sie die Internationalisierungsfähigkeiten Ihrer App und bieten eine bessere Benutzererfahrung für Nutzer weltweit.

Für eine detailliertere Nutzung und erweiterte Funktionen verweist auf die [next-intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

---

**Hinweis**: Denken Sie daran, Ihren `IntlayerClientProvider` und `IntlayerServerProvider` korrekt einzurichten, um sicherzustellen, dass die aktuelle Sprache korrekt an Ihre Komponenten weitergegeben wird. Dies ist entscheidend, damit die `t` Funktion die richtigen Übersetzungen zurückgibt.
