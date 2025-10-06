---
createdAt: 2025-09-04
updatedAt: 2025-10-03
title: Wie Sie Ihre React Router v7 übersetzen – i18n-Leitfaden 2025
description: Erfahren Sie, wie Sie Internationalisierung (i18n) zu Ihrer React Router v7-Anwendung mit Intlayer hinzufügen. Folgen Sie dieser umfassenden Anleitung, um Ihre App mehrsprachig mit lokalisierungsbewusstem Routing zu machen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Lokalisierungs-Routing
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
---

# Übersetzen Sie Ihre React Router v7 mit Intlayer | Internationalisierung (i18n)

Diese Anleitung zeigt, wie Sie **Intlayer** für nahtlose Internationalisierung in React Router v7-Projekten mit lokalisierungsbewusstem Routing, TypeScript-Unterstützung und modernen Entwicklungsmethoden integrieren.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Lokalerkennung und -umschaltung.
- **Aktivieren Sie lokalisierungsbewusstes Routing** mit dem konfigurationsbasierten Routing-System von React Router v7.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer React Router v7-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit Ihrem bevorzugten Paketmanager:

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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

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
    defaultLocale: Locales.ENGLISH, // Standard-Sprache
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Verfügbare Sprachen
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // Standard-Sprache
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Verfügbare Sprachen
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // Standardsprache
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Verfügbare Sprachen
  },
};

module.exports = config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einstellen, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter lesen Sie bitte die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es sorgt für den Aufbau der Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

### Schritt 4: Konfigurieren der React Router v7 Routen

Richten Sie Ihre Routing-Konfiguration mit sprachsensitiven Routen ein:

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/:lang?", "routes/page.tsx"), // Lokalisierte Startseite
    route("/:lang?/about", "routes/about/page.tsx"), // Lokalisierte Über-Seite
  ]),
] satisfies RouteConfig;
```

### Schritt 5: Layout-Komponenten erstellen

Richten Sie Ihr Root-Layout und sprachspezifische Layouts ein:

#### Root-Layout

```tsx fileName="app/routes/layout.tsx"
import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import type { Route } from "./+types/layout";

export default function RootLayout({ params }: Route.ComponentProps) {
  const { locale } = params;

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Schritt 6: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="app/routes/[lang]/page.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "Erfahren Sie mehr über uns",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      en: "Startseite",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` aufgenommen werden (standardmäßig `./app`). Und sie müssen der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

### Schritt 7: Erstellen Sie locale-bewusste Komponenten

Erstellen Sie eine `LocalizedLink`-Komponente für locale-bewusste Navigation:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// Prüft, ob der Link extern ist
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

// Lokalisierter Link-Komponenten für die Navigation
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

Falls Sie zu den lokalisierten Routen navigieren möchten, können Sie den `useLocalizedNavigate` Hook verwenden:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

### Schritt 8: Verwenden Sie Intlayer in Ihren Seiten

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

#### Lokalisierte Startseite

```tsx fileName="app/routes/[lang]/page.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

> Um mehr über den `useIntlayer` Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md).

### Schritt 9: Erstellen Sie eine Sprachumschalter-Komponente

Erstellen Sie eine Komponente, die es Benutzern ermöglicht, die Sprache zu wechseln:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { setLocaleCookie, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocaleCookie(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Gebietsschema - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache im eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache im aktuellen Gebietsschema - z.B. Francés mit aktuellem Gebietsschema auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. Französisch */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> Um mehr über den `useLocale` Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md).

### Schritt 10: HTML-Attribute-Verwaltung hinzufügen (Optional)

Erstellen Sie einen Hook, um die HTML-Attribute lang und dir zu verwalten:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
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

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // den Hook importieren

export default function RootLayout() {
  useI18nHTMLAttributes(); // den Hook aufrufen

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Schritt 11: Middleware hinzufügen (Optional)

Sie können auch das `intlayerMiddleware` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, erfolgt eine Weiterleitung zur Standard-Locale.

> Beachten Sie, dass Sie, um das `intlayerMiddleware` in der Produktion zu verwenden, das Paket `vite-intlayer` von `devDependencies` zu `dependencies` verschieben müssen.

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

---

## TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code stabiler zu machen.

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält:

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden Konfigurationen
  include: [
    // ... Ihre bestehenden Includes
    ".intlayer/**/*.ts", // Einschluss der automatisch generierten Typen
  ],
}
```

---

## Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, dass diese versehentlich in Ihr Git-Repository committet werden.

Fügen Sie dazu folgende Anweisungen in Ihre `.gitignore`-Datei ein:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

---

## VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Nutzung der Erweiterung lesen Sie die [Intlayer VS Code Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

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

| Version | Datum      | Änderungen                      |
| ------- | ---------- | ------------------------------- |
| 6.1.5   | 2025-10-03 | Dokumentation aktualisiert      |
| 5.8.2   | 2025-09-04 | Hinzugefügt für React Router v7 |
