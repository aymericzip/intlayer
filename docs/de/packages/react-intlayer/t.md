# Dokumentation: `t` Funktion in `react-intlayer`

Die `t` Funktion im `react-intlayer` Paket ist ein fundamentales Werkzeug für Inline-Internationalisierung innerhalb Ihrer React-Anwendung. Sie ermöglicht es Ihnen, Übersetzungen direkt innerhalb Ihrer Komponenten zu definieren, wodurch es einfach wird, lokalisierte Inhalte basierend auf der aktuellen Sprache anzuzeigen.

---

## Überblick

Die `t` Funktion wird verwendet, um Übersetzungen für verschiedene Sprachen direkt in Ihren Komponenten bereitzustellen. Durch das Übergeben eines Objekts, das Übersetzungen für jede unterstützte Sprache enthält, gibt `t` die entsprechende Übersetzung basierend auf dem aktuellen Sprachkontext in Ihrer React-Anwendung zurück.

---

## Hauptmerkmale

- **Inline-Übersetzungen**: Ideal für schnelle, inline Texte, die keine separate Inhaltsdeklaration erfordern.
- **Automatische Sprachauswahl**: Gibt automatisch die Übersetzung zurück, die der aktuellen Sprache entspricht.
- **TypeScript-Unterstützung**: Bietet Typsicherheit und Autovervollständigung bei Verwendung mit TypeScript.
- **Einfache Integration**: Funktioniert nahtlos innerhalb von React-Komponenten.

---

## Funktionssignatur

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameter

- `translations`: Ein Objekt, dessen Schlüssel Sprachcodes sind (z.B. `en`, `fr`, `es`) und dessen Werte die entsprechenden übersetzten Zeichenfolgen sind.

### Rückgabewert

- Eine Zeichenfolge, die den übersetzten Inhalt für die aktuelle Sprache darstellt.

---

## Anwendungsbeispiele

### Grundlegende Verwendung von `t` in einer Komponente

```tsx
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Inline-Übersetzungen in Attributen

Die `t` Funktion ist besonders nützlich für Inline-Übersetzungen in JSX-Attributen. Wenn Sie Attribute wie `alt`, `title`, `href` oder `aria-label` lokalisieren, können Sie `t` direkt innerhalb des Attributs verwenden.

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

Die `t` Funktion ist typsicher, wenn sie mit TypeScript verwendet wird, was sicherstellt, dass alle erforderlichen Sprachen bereitgestellt werden.

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Sprachenerkennung und Kontext

In `react-intlayer` wird die aktuelle Sprache durch den `IntlayerProvider` verwaltet. Stellen Sie sicher, dass dieser Provider Ihre Komponenten umschließt und das `locale` Prop korrekt übergeben wird.

#### Beispiel:

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ihre Komponenten hier */}
  </IntlayerProvider>
);
```

---

## Häufige Fehler und Fehlerbehebung

### `t` gibt undefinierte oder falsche Übersetzung zurück

- **Ursache**: Die aktuelle Sprache ist nicht korrekt eingestellt oder die Übersetzung für die aktuelle Sprache fehlt.
- **Lösung**:
  - Überprüfen Sie, ob der `IntlayerProvider` korrekt mit der entsprechenden `locale` eingerichtet ist.
  - Stellen Sie sicher, dass Ihr Übersetzungsobjekt alle erforderlichen Sprachen enthält.

### Fehlende Übersetzungen in TypeScript

- **Ursache**: Das Übersetzungsobjekt erfüllt nicht die erforderlichen Sprachen, was zu TypeScript-Fehlern führt.
- **Lösung**: Verwenden Sie den Typ `IConfigLocales`, um die Vollständigkeit Ihrer Übersetzungen durchzusetzen.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Fehlendes 'es' führt zu einem TypeScript-Fehler
};

const text = t(translations);
```

---

## Tipps für effektive Nutzung

1. **Verwenden Sie `t` für einfache Inline-Übersetzungen**: Ideal zum Übersetzen kleiner Textstücke direkt in Ihren Komponenten.
2. **Bevorzugen Sie `useIntlayer` für strukturierte Inhalte**: Für komplexere Übersetzungen und Inhaltswiederverwendungen definieren Sie Inhalte in Deklarationsdateien und verwenden Sie `useIntlayer`.
3. **Konsistente Sprachbereitstellung**: Stellen Sie sicher, dass Ihre Sprache über die `IntlayerProvider` konsistent in Ihrer Anwendung bereitgestellt wird.
4. **Nutzen Sie TypeScript**: Verwenden Sie TypeScript-Typen, um fehlende Übersetzungen zu erfassen und Typsicherheit zu gewährleisten.

---

## Fazit

Die `t` Funktion in `react-intlayer` ist ein leistungsstarkes und praktisches Werkzeug für das Management von Inline-Übersetzungen in Ihren React-Anwendungen. Durch eine effektive Integration verbessern Sie die Internationalisierungsfähigkeiten Ihrer App und bieten eine bessere Benutzererfahrung für Nutzer weltweit.

Für detailliertere Nutzung und erweiterte Funktionen verweisen Sie auf die [react-intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md).

---

**Hinweis**: Denken Sie daran, Ihren `IntlayerProvider` ordnungsgemäß einzurichten, um sicherzustellen, dass die aktuelle Sprache korrekt an Ihre Komponenten weitergegeben wird. Dies ist entscheidend dafür, dass die `t` Funktion die korrekten Übersetzungen zurückgibt.
