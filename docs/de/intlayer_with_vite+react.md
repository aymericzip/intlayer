# Getting Started Internationalizing (i18n) with Intlayer and Vite and React

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek für Internationalisierung (i18n), die darauf abzielt, die Unterstützung mehrsprachiger Inhalte in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten**, Routen und Inhalte dynamisch lokalisieren.
- **TypeScript-Unterstützung gewährleisten** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Lokalerkennung und -umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und React-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

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
      // Ihre anderen Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Um alle verfügbaren Parameter zu sehen, lesen Sie die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

### Schritt 4: Erklären Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltswörterbücher:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // Vergessen Sie nicht, React zu importieren, wenn Sie einen React-Knoten in Ihrem Inhalt verwenden
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

> Hinweis: Wenn Ihre Inhaltsdatei TSX-Code enthält, sollten Sie in Ihrer Inhaltsdatei `import React from "react";` in Betracht ziehen.

[Siehe, wie man seine Intlayer-Deklarationsdateien erklärt](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

### Schritt 5: Nutzen Sie Intlayer in Ihrem Code

Greifen Sie auf Ihre Inhaltswörterbücher in Ihrer gesamten Anwendung zu:

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> Hinweis: Wenn Sie Ihren Inhalt in einem `string`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, müssen Sie den Wert der Funktion aufrufen, z. B.:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die von dem `useLocale`-Hook bereitgestellte Funktion `setLocale` verwenden. Diese Funktion ermöglicht es Ihnen, die Sprache der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

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

### (Optional) Schritt 7: Fügen Sie lokalisierte Routen zu Ihrer Anwendung hinzu

Der Zweck dieses Schrittes ist es, eindeutige Routen für jede Sprache zu erstellen. Dies ist nützlich für SEO und SEO-freundliche URLs.
Beispiel:

```tsx
// /dashboard
// /es/dashboard
// /fr/dashboard
```

> Standardmäßig sind die Routen für die Standardsprache nicht vorausgesetzt. Wenn Sie die Standardsprache voranstellen möchten, können Sie die Option `middleware.prefixDefault` auf `true` in Ihrer Konfiguration setzen. Weitere Informationen finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

Um lokalisierte Routen in Ihre Anwendung zu integrieren, können Sie eine `LocaleRouter`-Komponente erstellen, die die Routen Ihrer Anwendung umschließt und die sprachspezifische Routenbearbeitung durchführt. Hier ist ein Beispiel mit [React Router](https://reactrouter.com/home):

```tsx
// Notwendige Abhängigkeiten und Funktionen importieren
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Hilfsfunktionen und Typen von 'intlayer'
import { FC, PropsWithChildren } from "react"; // React-Typen für Funktionskomponenten und Props
import { IntlayerProvider } from "react-intlayer"; // Provider für Internationalisierungs-Kontext
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
 * Eine Komponente, die die Lokalisierung behandelt und Kinder mit dem entsprechenden Sprachkontext umschließt.
 * Sie verwaltet die URL-basierte Lokalisierungserkennung und -validierung.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Den aktuellen URL-Pfad abrufen
  const { locale } = useParams<{ locale: Locales }>(); // Den Sprachparameter aus der URL extrahieren

  // Die aktuelle Sprache bestimmen, die Standard-Wenn nicht angegeben
  const currentLocale = locale ?? defaultLocale;

  // Den Sprach-Präfix vom Pfad entfernen, um einen Basis-Pfad zu erzeugen
  const pathWithoutLocale = getPathWithoutLocale(
    path // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault true ist, sollte die Standardsprache immer vorangestellt sein.
   */
  if (middleware.prefixDefault) {
    // Die Sprache überprüfen
    if (!locale || !locales.includes(locale)) {
      // Zu der Standardsprache mit dem aktualisierten Pfad umleiten
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Den aktuellen Verlaufseintrag durch den neuen ersetzen
        />
      );
    }

    // Kinder mit dem IntlayerProvider umschließen und die aktuelle Sprache festlegen
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault false ist, wird die Standardsprache nicht vorangestellt.
     * Sicherstellen, dass die aktuelle Sprache gültig ist und nicht die Standardsprache ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Die Standardsprache ausschließen
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Sprache in der Liste der gültigen Sprachen enthalten ist
    ) {
      // Zu dem Pfad ohne Sprachpräfix umleiten
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Kinder mit dem IntlayerProvider umschließen und die aktuelle Sprache festlegen
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die sprachspezifische Routen einrichtet.
 * Sie verwendet React Router zur Verwaltung der Navigation und zum Rendern lokalisierter Komponenten.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Routentyp, um die Sprache (z. B. /en/, /fr/) zu erfassen und alle nachfolgenden Pfade abzugleichen
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Umschließt Kinder mit Sprachverwaltung
      />

      {
        // Wenn das Voranstellen der Standardsprache deaktiviert ist, die Kinder direkt am Stamm-Pfad rendern
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Umschließt Kinder mit Sprachverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Gleichzeitig können Sie auch das `intLayerMiddlewarePlugin` verwenden, um serverseitige Routen in Ihre Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Sprache basierend auf der URL und setzt das entsprechende Sprach-Cookie. Wenn keine Sprache angegeben ist, bestimmt das Plugin die am besten geeignete Sprache basierend auf den Spracheinstellungen des Benutzers. Wenn keine Sprache erkannt wird, leitet es zur Standardsprache um.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optional) Schritt 8: Ändern Sie die URL, wenn sich die Sprache ändert

Um die URL zu ändern, wenn sich die Sprache ändert, können Sie die von dem `useLocale`-Hook bereitgestellte `onLocaleChange`-Eigenschaft verwenden. Gleichzeitig können Sie die `useLocation`- und `useNavigate`-Hooks von `react-router-dom` verwenden, um den URL-Pfad zu aktualisieren.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Den aktuellen URL-Pfad abrufen. Beispiel: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // URL mit der aktualisierten Sprache erstellen
    // Beispiel: /es/about mit der Sprache auf Spanisch gesetzt
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

Intlayer verwendet Modulaugmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code zu stärken.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5
// tsconfig.json

{
  // Ihre benutzerdefinierte Konfiguration
  include: [
    "src",
    "types", // <- Die automatisch generierten Typen einbeziehen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies verhindert, dass Sie sie in Ihr Git-Repository einfügen.

Dazu können Sie die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzufügen:

```gitignore
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```
