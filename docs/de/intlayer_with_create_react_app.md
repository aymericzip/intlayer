# Getting Started Internationalizing (i18n) with Intlayer and React Create App

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek für Internationalisierung (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten**, Routen und Inhalte dynamisch **lokalisieren**.
- **TypScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- Von **fortschrittlichen Funktionen** profitieren, wie dynamischer Lokalisierungserkennung und -wechsel.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer React-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die benötigten Pakete mit npm:

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Um alle verfügbaren Parameter zu sehen, siehe die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre CRA-Konfiguration integrieren

Ändern Sie Ihre Skripte, um react-intlayer zu verwenden

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

Hinweis: Die react-intlayer-Skripte basieren auf craco. Sie können auch Ihre eigene Einrichtung basierend auf dem Intlayer-craco-Plugin implementieren. [Siehe Beispiel hier](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Schritt 4: Erklären Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltswörterbücher:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Bearbeiten Sie <code>src/App.tsx</code> und speichern Sie, um neu zu
          laden
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

[Siehe, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

### Schritt 5: Nutzen Sie Intlayer in Ihrem Code

Greifen Sie auf Ihre Inhaltswörterbücher in Ihrer Anwendung zu:

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* Um den useIntlayer-Hook ordnungsgemäß zu verwenden, sollten Sie auf Ihre Daten in einer Kinderkomponente zugreifen */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerProvider>
  );
}

export default App;
```

> Hinweis: Wenn Sie Ihren Inhalt in einem `string`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, müssen Sie den Wert der Funktion aufrufen, wie:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die `setLocale`-Funktion verwenden, die vom `useLocale`-Hook bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Locale der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Sprache auf Englisch ändern
    </button>
  );
};
```

### (Optional) Schritt 7: Fügen Sie Ihrer Anwendung lokalisierte Routen hinzu

Ziel dieses Schrittes ist es, einzigartige Routen für jede Sprache zu erstellen. Dies ist nützlich für SEO und SEO-freundliche URLs.
Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Standardmäßig sind die Routen für die Standard-Sprache nicht vorangestellt. Wenn Sie die Standard-Sprache voranstellen möchten, können Sie die Option `middleware.prefixDefault` in Ihrer Konfiguration auf `true` setzen. Siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) für mehr Informationen.

Um lokalisierte Routen zu Ihrer Anwendung hinzuzufügen, können Sie eine `LocaleRouter`-Komponente erstellen, die die Routen Ihrer Anwendung umschließt und die lokalisierte Routenverarbeitung übernimmt. Hier ist ein Beispiel mit [React Router](https://reactrouter.com/home):

```tsx
// Notwendige Abhängigkeiten und Funktionen importieren
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Hilfsfunktionen und -typen von 'intlayer'
import { FC, PropsWithChildren } from "react"; // React-Typen für funktionale Komponenten und Props
import { IntlayerProvider } from "react-intlayer"; // Provider für den Internationalisierungs-Kontext
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Router-Komponenten zur Verwaltung der Navigation

// Konfiguration von Intlayer destrukturieren
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die die Lokalisierung verarbeitet und Kinder mit dem entsprechenden Locale-Kontext umschließt.
 * Sie verwaltet die locale-basierte URL-Erkennung und -Validierung.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Den aktuellen URL-Pfad erhalten
  const { locale } = useParams<{ locale: Locales }>(); // Das Locale-Parameter aus der URL extrahieren

  // Bestimmen Sie das aktuelle Locale, falls nicht angegeben, auf das Standardlocale zurückfallen
  const currentLocale = locale ?? defaultLocale;

  // Entfernen Sie die Locale-Präfix vom Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault true ist, sollte die Standard-Sprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren Sie das Locale
    if (!locale || !locales.includes(locale)) {
      // Weiterleiten auf die Standard-Sprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Den aktuellen Verlaufseintrag mit dem neuen ersetzen
        />
      );
    }

    // Umschließen Sie die Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Sprache
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault false ist, ist die Standard-Sprache nicht vorangestellt.
     * Stellen Sie sicher, dass die aktuelle Sprache gültig ist und nicht die Standard-Sprache ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Die Standard-Sprache ausschließen
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Sprache in der Liste der gültigen Sprachen ist
    ) {
      // Weiterleiten zum Pfad ohne Locale-Präfix
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Umschließen Sie die Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Sprache
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die locale-spezifische Routen einrichtet.
 * Sie verwendet React Router zur Verwaltung der Navigation und zum Rendern lokalisierter Komponenten.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Routenmuster, um die Sprache (z.B. /en/, /fr/) zu erfassen und alle nachfolgenden Pfade zuzuordnen
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Umschließt Kinder mit Lokalisierungsverwaltung
      />

      {
        // Wenn das Voranstellen der Standardsprache deaktiviert ist, die Kinder direkt am Stammpfad rendern
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Umschließt Kinder mit Lokalisierungsverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Optional) Schritt 8: Ändern Sie die URL, wenn das Locale wechselt

Um die URL zu ändern, wenn das Locale wechselt, können Sie das `onLocaleChange`-Prop verwenden, das vom `useLocale`-Hook bereitgestellt wird. Parallel dazu können Sie die Hooks `useLocation` und `useNavigate` von `react-router-dom` verwenden, um den URL-Pfad zu aktualisieren.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Den aktuellen URL-Pfad erhalten. Beispiel: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Die URL mit dem aktualisierten Locale erstellen
    // Beispiel: /es/about mit dem Locale auf Spanisch gesetzt
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Den URL-Pfad aktualisieren
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Sprache auf Englisch ändern
    </button>
  );
};
```

### TypeScript konfigurieren

Intlayer verwendet Modul-Augen zu den Vorteilen von TypeScript und macht Ihren Code stärker.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen umfasst.

```json5
// tsconfig.json

{
  // Ihre benutzerdefinierte Konfiguration
  "include": [
    "src",
    "types", // <- Die automatisch generierten Typen einbeziehen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, dass sie in Ihr Git-Repository eingeht.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```
