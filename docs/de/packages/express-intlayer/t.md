# Dokumentation: `t` Funktion in `express-intlayer`

Die `t` Funktion im `express-intlayer` Paket ist das zentrale Hilfsmittel zur Bereitstellung lokalisierter Antworten in Ihrer Express-Anwendung. Sie vereinfacht die Internationalisierung (i18n), indem sie Inhalte basierend auf der bevorzugten Sprache des Benutzers dynamisch auswählt.

---

## Übersicht

Die `t` Funktion wird verwendet, um Übersetzungen für eine gegebene Menge von Sprachen zu definieren und abzurufen. Sie bestimmt automatisch die passende Sprache, die basierend auf den Anforderungs-Einstellungen des Clients zurückgegeben werden soll, wie zum Beispiel dem `Accept-Language` Header. Wenn die bevorzugte Sprache nicht verfügbar ist, wird sie sanft auf die Standardlokalisierung zurückfallen, die in Ihrer Konfiguration angegeben ist.

---

## Hauptmerkmale

- **Dynamische Lokalisierung**: Wählt automatisch die passendste Übersetzung für den Client aus.
- **Rückfall auf Standardlokalisierung**: Fällt auf eine Standardlokalisierung zurück, wenn die bevorzugte Sprache des Clients nicht verfügbar ist, um die Kontinuität der Benutzererfahrung sicherzustellen.
- **Leichtgewichtig und schnell**: Entwickelt für Hochleistungsanwendungen, um minimalen Overhead zu gewährleisten.
- **Unterstützung des strengen Modus**: Erzwingt strikte Einhaltung der deklarierten Lokalisierungen für zuverlässiges Verhalten.

---

## Funktionssignatur

```typescript
t(translations: Record<string, string>): string;
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel die Lokalisierungscodes (z. B. `en`, `fr`, `es-MX`) und die Werte die entsprechenden übersetzten Zeichenfolgen sind.

### Rückgabewert

- Eine Zeichenfolge, die den Inhalt in der bevorzugten Sprache des Clients darstellt.

---

## Laden des Internationalisierungs-Anforderungshandlers

Um sicherzustellen, dass die von `express-intlayer` bereitgestellte Internationalisierungsfunktionalität korrekt funktioniert, **müssen** Sie die Internationalisierungs-Middleware zu Beginn Ihrer Express-Anwendung laden. Dies aktiviert die `t` Funktion und sorgt für die ordnungsgemäße Handhabung der Lokalisierungserkennung und Übersetzung.

### Erforderliche Middleware-Setup

```typescript
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Lade den Internationalisierungsanforderungs-Handler
app.use(intlayer());
```

### Platzierung in der Anwendung

Platzieren Sie die `app.use(intlayer())` Middleware **vor allen Routen** in Ihrer Anwendung, um sicherzustellen, dass alle Routen von der Internationalisierung profitieren:

```typescript
app.use(intlayer());

// Definiere deine Routen nach dem Laden der Middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Warum dies erforderlich ist

- **Lokalisierungserkennung**: Die `intlayer` Middleware verarbeitet eingehende Anfragen, um die bevorzugte Lokalisierung des Benutzers basierend auf Headern, Cookies oder anderen konfigurierten Methoden zu erkennen.
- **Übersetzungskontext**: Stellt den notwendigen Kontext für die korrekte Funktion der `t` Funktion bereit, um sicherzustellen, dass Übersetzungen in der richtigen Sprache zurückgegeben werden.
- **Fehlervermeidung**: Ohne diese Middleware führt die Verwendung der `t` Funktion zu Laufzeitfehlern, da die notwendige Lokalisierungsinformation nicht verfügbar sein wird.

---

## Nutzung Beispiele

### Grundbeispiel

Liefere lokalisierte Inhalte in verschiedenen Sprachen:

```typescript
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Client-Anfragen:**

- Ein Client mit `Accept-Language: fr` erhält `Bienvenue!`.
- Ein Client mit `Accept-Language: es` erhält `¡Bienvenido!`.
- Ein Client mit `Accept-Language: de` erhält `Welcome!` (Standardlokalisierung).

### Fehlerbehandlung

Gib Fehlermeldungen in mehreren Sprachen aus:

```typescript
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Verwendung von Lokalisierungsvarianten

Spezifiziere Übersetzungen für lokalisierungsspezifische Varianten:

```typescript
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Erweiterte Themen

### Rückfallmechanismus

Wenn eine bevorzugte Lokalisierung nicht verfügbar ist, wird die `t` Funktion auf die Standardlokalisierung zurückfallen, die in der Konfiguration definiert ist:

```typescript
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};
```

Beispielsweise:

- Wenn `defaultLocale` `Locales.CHINESE` ist und ein Client `Locales.DUTCH` anfordert, wird die zurückgegebene Übersetzung auf den Wert von `Locales.CHINESE` zurückfallen.
- Wenn `defaultLocale` nicht definiert ist, wird die `t` Funktion auf den Wert von `Locales.ENGLISH` zurückfallen.

---

### Durchsetzung des strengen Modus

Konfigurieren Sie die `t` Funktion, um eine strikte Einhaltung der deklarierten Lokalisierungen zu erzwingen:

| Modus           | Verhalten                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `strict`        | Alle deklarierten Lokalisierungen müssen vorhandene Übersetzungen haben. Fehlende Lokalisierungen führen zu Fehlern.            |
| `required_only` | Deklarierte Lokalisierungen müssen Übersetzungen haben. Fehlende Lokalisierungen lösen Warnungen aus, werden jedoch akzeptiert. |
| `loose`         | Jede vorhandene Lokalisierung wird akzeptiert, auch wenn sie nicht deklariert ist.                                              |

Konfigurationsbeispiel:

```typescript
const config = {
  internationalization: {
    strictMode: "strict", // Strengen Modus durchsetzen
  },
};
```

---

### TypeScript-Integration

Die `t` Funktion ist typensicher, wenn sie mit TypeScript verwendet wird. Definiere ein typensicheres Übersetzungsobjekt:

```typescript
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Häufige Fehler und Fehlersuche

| Problem                         | Grund                                              | Lösung                                                                      |
| ------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------- |
| `t` Funktion funktioniert nicht | Middleware nicht geladen                           | Stelle sicher, dass `app.use(intlayer())` vor den Routen hinzugefügt wurde. |
| Fehlende Übersetzungsfehler     | Strenger Modus aktiviert ohne alle Lokalisierungen | Stelle alle erforderlichen Übersetzungen bereit.                            |

---

## Tipps zur effektiven Nutzung

1. **Zentralisiere Übersetzungen**: Verwende ein zentrales Modul oder JSON-Dateien zur Verwaltung von Übersetzungen, um die Wartbarkeit zu verbessern.
2. **Validiere Übersetzungen**: Stelle sicher, dass jede Sprachvariante eine entsprechende Übersetzung hat, um unnötige Rückfälle zu vermeiden.
3. **Kombiniere mit Frontend-i18n**: Synchronisiere mit der Frontend-Internationalisierung für ein nahtloses Benutzererlebnis in der gesamten Anwendung.
4. **Benchmark-Leistung**: Teste die Antwortzeiten deiner Anwendung bei der Hinzufügung von Übersetzungen, um minimalen Einfluss zu gewährleisten.

---

## Fazit

Die `t` Funktion ist ein leistungsstarkes Werkzeug für die Backend-Internationalisierung. Durch die effektive Nutzung können Sie eine inklusivere und benutzerfreundlichere Anwendung für ein globales Publikum erstellen. Für erweiterte Nutzung und detaillierte Konfigurationsoptionen verweisen Sie auf die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).
