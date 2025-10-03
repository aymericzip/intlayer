---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Erste Schritte mit Intlayer in Tanstack Start
description: Erfahren Sie, wie Sie Internationalisierung (i18n) zu Ihrer Tanstack Start-Anwendung mit Intlayer hinzufügen. Folgen Sie diesem umfassenden Leitfaden, um Ihre App mehrsprachig mit lokalisierungsbewusstem Routing zu machen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Lokalisierungsrouting
slugs:
  - doc
  - environment
  - vite-and-react
  - tanstack-start
applicationTemplate: https://github.com/AydinTheFirst/tanstack-start-intlayer
author: AydinTheFirst
---

# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer und Tanstack Start

Diese Anleitung zeigt, wie Sie **Intlayer** für nahtlose Internationalisierung in Tanstack Start-Projekten mit lokalisierungsbewusstem Routing, TypeScript-Unterstützung und modernen Entwicklungspraktiken integrieren.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von fortschrittlichen Funktionen profitieren**, wie dynamischer Spracherkennung und -umschaltung.
- **Lokalisierungsbewusstes Routing aktivieren** mit dem dateibasierten Routing-System von Tanstack Start.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Tanstack Start-Anwendung

### Schritt 1: Projekt erstellen

Beginnen Sie mit der Erstellung eines neuen TanStack Start-Projekts, indem Sie der Anleitung [Neues Projekt starten](https://tanstack.com/start/latest/docs/framework/react/quick-start) auf der TanStack Start-Website folgen.

### Schritt 2: Intlayer-Pakete installieren

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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **react-intlayer**

  Das Paket, das Intlayer in React-Anwendungen integriert. Es stellt Kontext-Provider und Hooks für die Internationalisierung in React bereit.

- **vite-intlayer**

  Beinhaltet das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Nutzers, Verwaltung von Cookies und Handhabung von URL-Weiterleitungen.

### Schritt 3: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachversionen
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachen
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachen
    ],
  },
};

module.exports = config;
```

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Protokolle in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter konsultieren Sie bitte die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 4: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

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

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer in Vite zu integrieren. Es sorgt für den Aufbau der Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

### Schritt 5: Erstellen Sie Layout-Komponenten

Richten Sie Ihr Root-Layout und lokalisierte Layouts ein:

#### Root-Layout

```tsx fileName="src/routes/{-$locale}/route.tsx" codeFormat="typescript"
// src/routes/{-$locale}/route.tsx
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Schritt 6: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/contents/page.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Startseite",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        en: "Dies ist ein Beispiel für die Verwendung von Intlayer mit TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      en: "Willkommen bei Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` aufgenommen werden (standardmäßig `./app`). Und sie müssen der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

### Schritt 7: Erstellen Sie lokalisierungsbewusste Komponenten und Hooks

Erstellen Sie eine `LocalizedLink`-Komponente für lokalisierungsbewusste Navigation:

```tsx fileName="src/components/localized-link.tsx" codeFormat="typescript"
// src/components/localized-link.tsx
// eslint-disable-next-line no-restricted-imports
import { Link, type LinkProps } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "reactintlayer";

type LocalizedLinkProps = {
  to: string;
} & Omit<LinkProps, "to">;

export function LocalizedLink(props: LocalizedLinkProps) {
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const to = isExternal(props.to)
    ? props.to
    : getLocalizedUrl(props.to, locale);

  return <Link {...props} to={to as LinkProps["to"]} />;
}
```

Erstellen Sie einen `useLocalizedNavigate` Hook für die programmatische Navigation:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx" codeFormat="typescript"
// src/hooks/useLocalizedNavigate.tsx
// eslint-disable-next-line no-restricted-imports
import { NavigateOptions, useNavigate } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedNavigateOptions = {
  to: string;
} & Omit<NavigateOptions, "to">;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const localizedNavigate = (options: LocalizedNavigateOptions) => {
    const to = isExternal(options.to)
      ? options.to
      : getLocalizedUrl(options.to, locale);

    navigate({ ...options, to: to as NavigateOptions["to"] });
  };

  return localizedNavigate;
};
```

### Schritt 8: Intlayer in Ihren Seiten verwenden

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

#### Root-Weiterleitungsseite

```tsx fileName="src/routes/page.tsx" codeFormat="typescript"
// src/routes/page.tsx
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### Lokalisierte Startseite

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-4 items-center text-center">
        {content.title}
        <LocaleSwitcher />
        <div className="flex gap-4">
          <a href="/">Index</a>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> Um mehr über den `useIntlayer` Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md).

### Schritt 9: Erstellen einer Sprachumschalter-Komponente

Erstellen Sie eine Komponente, die es Benutzern ermöglicht, die Sprache zu wechseln:

```tsx fileName="src/components/locale-switcher.tsx" codeFormat="typescript"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";

export default function LocaleSwitcher() {
  const { pathname, searchStr } = useLocation();
  const content = useIntlayer("locale-switcher");

  const { availableLocales, locale, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(pathname + searchStr, newLocale);
      location.replace(pathWithLocale);
    },
  });

  return (
    <select
      aria-label={content.label.toString()}
      onChange={(e) => setLocale(e.target.value)}
      value={locale}
    >
      {availableLocales.map((localeItem) => (
        <option
          dir={getHTMLTextDir(localeItem)}
          key={localeItem}
          lang={localeItem}
          value={localeItem}
        >
          {/* Beispiel: Français (Französisch) */}
          {getLocaleName(localeItem, locale)} (
          {getLocaleName(localeItem, Locales.ENGLISH)})
        </option>
      ))}
    </select>
  );
}
```

> Um mehr über den `useLocale` Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md).

### Schritt 10: HTML-Attribute-Verwaltung hinzufügen (Optional)

Erstellen Sie einen Hook zur Verwaltung der HTML-Attribute lang und dir:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// src/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Dann verwenden Sie es in Ihrer Root-Komponente:

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // importiere den Hook

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // diese Zeile hinzufügen

  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Schritt 11: Erstellen und Ausführen Ihrer Anwendung

Erstellen Sie die Inhaltswörterbücher und starten Sie Ihre Anwendung:

```bash packageManager="npm"
# Intlayer-Wörterbücher erstellen
npm run intlayer:build

# Entwicklungsserver starten
npm run dev
```

```bash packageManager="pnpm"
# Intlayer-Wörterbücher erstellen
pnpm intlayer:build

# Entwicklungsserver starten
pnpm dev
```

```bash packageManager="yarn"
# Intlayer-Wörterbücher erstellen
yarn intlayer:build

# Entwicklungsserver starten
yarn dev
```

### Schritt 12: TypeScript konfigurieren (optional)

Intlayer verwendet Modulaugmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code stabiler zu machen.

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen einschließt:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... Ihre bestehenden TypeScript-Konfigurationen
  },
  include: [
    // ... Ihre bestehenden Includes
    ".intlayer/**/*.ts", // Einschluss der automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, dass diese Dateien in Ihr Git-Repository committet werden.

Fügen Sie dazu folgende Anweisungen in Ihre `.gitignore`-Datei ein:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

---

### Schritt 13: Weiterleitung erstellen (Optional)

```typescript fileName="src/routes/{-$locale}/rotue.tsx" codeFormat="typescript"
function LayoutComponent() {
  useI18nHTMLAttributes();

  const { locale } = Route.useParams();
  const { locale: selectedLocale } = useLocale();
  const { defaultLocale } = configuration.internationalization;
  const { prefixDefault } = configuration.middleware;

  // Weiterleitung zur Standardsprache, wenn keine Sprache in der URL vorhanden ist und prefixDefault wahr ist
  if (selectedLocale === defaultLocale && !locale && prefixDefault) {
    return <Navigate replace to={defaultLocale} />;
  }

  // Weiterleitung zur ausgewählten Sprache, wenn die Sprache in der URL nicht mit der ausgewählten Sprache übereinstimmt
  if (selectedLocale !== defaultLocale && !locale) {
    return <Navigate replace to={selectedLocale} />;
  }

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

## Produktionsbereitstellung

Beim Bereitstellen Ihrer Anwendung:

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
- **Sprachbewusstes Routing** mit Tanstack Start
- **TypeScript-Unterstützung** mit automatisch generierten Typen
- **Server-seitiges Rendering** mit korrekter Sprachbehandlung

## VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Verwendung der Erweiterung lesen Sie bitte die [Intlayer VS Code Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

---

## Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---

## Dokumentationsverweise

- [Intlayer Dokumentation](https://intlayer.org)
- [Tanstack Start Dokumentation](https://reactrouter.com/)
- [useIntlayer Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md)
- [useLocale Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md)
- [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md)
- [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

Dieser umfassende Leitfaden bietet alles, was Sie benötigen, um Intlayer mit Tanstack Start für eine vollständig internationalisierte Anwendung mit lokalisierungsbewusstem Routing und TypeScript-Unterstützung zu integrieren.

## Dokumentationshistorie

| Version | Datum      | Änderungen                     |
| ------- | ---------- | ------------------------------ |
| 5.8.1   | 2025-09-09 | Für Tanstack Start hinzugefügt |
