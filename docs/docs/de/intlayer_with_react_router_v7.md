---
createdAt: 2025-09-04
updatedAt: 2025-09-04
title: Erste Schritte mit Intlayer in React Router v7
description: Erfahren Sie, wie Sie Internationalisierung (i18n) zu Ihrer React Router v7-Anwendung mit Intlayer hinzufügen. Folgen Sie dieser umfassenden Anleitung, um Ihre App mehrsprachig mit lokalisierungsbewusstem Routing zu gestalten.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Lokalisierungsrouting
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/AydinTheFirst/react-router-intlayer
author: AydinTheFirst
---

# Erste Schritte zur Internationalisierung (i18n) mit Intlayer und React Router v7

Diese Anleitung zeigt, wie Sie **Intlayer** nahtlos in React Router v7-Projekte mit lokalisierungsbewusstem Routing, TypeScript-Unterstützung und modernen Entwicklungsmethoden integrieren.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Lokalerkennung und Umschaltung.
- **Lokalisierungsbewusstes Routing aktivieren** mit dem konfigurationsbasierten Routing-System von React Router v7.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer React Router v7-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **react-intlayer**

  Das Paket, das Intlayer in React-Anwendungen integriert. Es stellt Kontext-Provider und Hooks für die Internationalisierung in React bereit.

- **vite-intlayer**

  Enthält das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und Handhabung von URL-Weiterleitungen.

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // Standardlocale in URLs immer voranstellen
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguration des Intlayer-Setups
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // Standard-Sprache
    locales: [Locales.ENGLISH, Locales.TURKISH], // Verfügbare Sprachen
  },
  middleware: {
    prefixDefault: true, // Standard-Sprache immer im URL-Pfad voranstellen
  },
};

module.exports = config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einstellen, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter konsultieren Sie bitte die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: React Router v7 Routen konfigurieren

Richten Sie Ihre Routing-Konfiguration mit sprachsensitiven Routen ein:

```typescript fileName="app/routes.ts" codeFormat="typescript"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // Startseite - leitet zur Sprache weiter
    route("/:lang", "routes/[lang]/page.tsx"), // Lokalisierte Startseite
    route("/:lang/about", "routes/[lang]/about/page.tsx"), // Lokalisierte Über-Seite
  ]),
] satisfies RouteConfig;
```

### Schritt 4: Intlayer in Ihre Vite-Konfiguration integrieren

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddleware, intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerMiddleware()],
});
```

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer in Vite zu integrieren. Es sorgt für den Aufbau von Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

### Schritt 5: Layout-Komponenten erstellen

Richten Sie Ihr Root-Layout und sprachspezifische Layouts ein:

#### Root-Layout

```tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

export default function RootLayout() {
  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Schritt 6: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="app/routes/[lang]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      tr: "React Router v7 + Intlayer'a Hoş Geldiniz",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      tr: "React Router v7 ve Intlayer kullanarak kolayca çok dilli uygulamalar geliştirin.",
    }),
    aboutLink: t({
      en: "Erfahren Sie mehr über uns",
      tr: "Hakkımızda Öğrenin",
    }),
    homeLink: t({
      en: "Startseite",
      tr: "Ana Sayfa",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` (standardmäßig `./app`) aufgenommen werden. Und sie müssen der Dateiendung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details lesen Sie bitte die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

### Schritt 7: Erstellen Sie sprachspezifische Komponenten

Erstellen Sie eine `LocalizedLink`-Komponente für lokalisierungsbewusste Navigation:

```tsx fileName="app/components/localized-link.tsx" codeFormat="typescript"
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import React from "react";
import { Link, useLocation } from "react-router";

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale();
  const location = useLocation();

  const isExternal = (path: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:");

  if (typeof to === "string") {
    if (to.startsWith("/") && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === "object") {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith("/") && !isExternal(pathname)) {
      return (
        <Link
          to={{ ...to, pathname: getLocalizedUrl(pathname, locale) }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
```

### Schritt 8: Verwenden Sie Intlayer in Ihren Seiten

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltsverzeichnisse zu:

#### Root-Weiterleitungsseite

```tsx fileName="app/routes/page.tsx" codeFormat="typescript"
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### Lokalisierte Startseite

```tsx fileName="app/routes/[lang]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <nav style={{ marginTop: "2rem" }}>
        <LocalizedLink
          to="/about"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          {content.aboutLink}
        </LocalizedLink>
      </nav>
    </div>
  );
}
```

> Um mehr über den `useIntlayer` Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md).

### Schritt 9: Erstellen Sie eine Sprachumschalter-Komponente

Erstellen Sie eine Komponente, die es Benutzern ermöglicht, die Sprache zu wechseln:

```tsx fileName="app/components/locale-switcher.tsx" codeFormat="typescript"
import { getLocalizedUrl, getLocaleName } from "intlayer";
import { useLocale } from "intlayer";
import { useLocation, useNavigate } from "react-router";

export default function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const localizedUrl = getLocalizedUrl(
      location.pathname + location.search,
      newLocale
    );
    setLocale(newLocale);
    navigate(localizedUrl);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="locale-select">Sprache wählen: </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{ padding: "0.25rem", marginLeft: "0.5rem" }}
      >
        {availableLocales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {getLocaleName(availableLocale)}
          </option>
        ))}
      </select>
    </div>
  );
}
```

> Um mehr über den `useLocale` Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md).

### Schritt 10: HTML-Attribute-Verwaltung hinzufügen (Optional)

Erstellen Sie einen Hook, um die HTML-Attribute lang und dir zu verwalten:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// app/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Verwenden Sie es dann in Ihrer Root-Komponente:

```tsx fileName="app/root.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // Hook importieren

export default function RootLayout() {
  useI18nHTMLAttributes(); // Hook aufrufen

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Schritt 11: Erstellen und Starten Sie Ihre Anwendung

Baue die Inhaltswörterbücher und starte deine Anwendung:

```bash packageManager="npm"
# Baue Intlayer-Wörterbücher
npm run intlayer:build

# Starte den Entwicklungsserver
npm run dev
```

```bash packageManager="pnpm"
# Baue Intlayer-Wörterbücher
pnpm intlayer:build

# Starte den Entwicklungsserver
pnpm dev
```

```bash packageManager="yarn"
# Baue Intlayer-Wörterbücher
yarn intlayer:build

# Starte den Entwicklungsserver
yarn dev
```

### Schritt 12: TypeScript konfigurieren (Optional)

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und deinen Code robuster zu machen.

Stelle sicher, dass deine TypeScript-Konfiguration die automatisch generierten Typen einschließt:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... deine bestehenden TypeScript-Konfigurationen
  },
  include: [
    // ... Ihre bestehenden Includes
    ".intlayer/**/*.ts", // Einschließen der automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, dass diese in Ihr Git-Repository übernommen werden.

Fügen Sie dazu die folgenden Anweisungen in Ihre `.gitignore`-Datei ein:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

---

## Produktionsbereitstellung

Beim Deployment Ihrer Anwendung:

1. **Bauen Sie Ihre Anwendung:**

   ```bash
   npm run build
   ```

2. **Bauen Sie die Intlayer-Wörterbücher:**

   ```bash
   npm run intlayer:build
   ```

3. **Verschieben Sie `vite-intlayer` in die Abhängigkeiten**, wenn Sie Middleware in der Produktion verwenden:
   ```bash
   npm install vite-intlayer --save
   ```

Ihre Anwendung unterstützt nun:

- **URL-Struktur**: `/en`, `/en/about`, `/tr`, `/tr/about`
- **Automatische Spracherkennung** basierend auf den Browsereinstellungen
- **Sprachbewusstes Routing** mit React Router v7
- **TypeScript-Unterstützung** mit automatisch generierten Typen
- **Server-seitiges Rendering** mit korrekter Sprachbehandlung

## VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** der übersetzten Inhalte.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Verwendung der Erweiterung siehe die [Intlayer VS Code Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

---

## Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---

## Dokumentationsverweise

- [Intlayer Dokumentation](https://intlayer.org)
- [React Router v7 Dokumentation](https://reactrouter.com/)
- [useIntlayer Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md)
- [useLocale Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md)
- [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md)
- [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

Dieser umfassende Leitfaden bietet alles, was Sie benötigen, um Intlayer mit React Router v7 für eine vollständig internationalisierte Anwendung mit lokalisierungsbewusstem Routing und TypeScript-Unterstützung zu integrieren.

## Dokumentationsverlauf

| Version | Datum     | Änderungen                      |
| ------- | --------- | ------------------------------- |
| 5.8.2   | 2025-09-4 | Hinzugefügt für React Router v7 |
