---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: Erste Schritte mit Intlayer in TanStack Start (React)
description: Fügen Sie Ihrer TanStack Start-App mit Intlayer i18n hinzu – komponentenlokale Wörterbücher, lokalisierte URLs und SEO-freundliche Metadaten.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - tanstack-start
---

# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer und TanStack Start (React)

## Was ist Intlayer?

**Intlayer** ist ein Open-Source-i18n-Toolkit für React-Apps. Es bietet Ihnen:

- **Komponentenlokale Wörterbücher** mit TypeScript-Sicherheit.
- **Dynamische Metadaten & Routen** (SEO-bereit).
- **Laufzeit-Sprachumschaltung** (und Hilfsmittel zum Erkennen/Speichern von Sprachen).
- **Vite-Plugin** für Build-Zeit-Transformationen + Entwicklererlebnis (DX).

Diese Anleitung zeigt, wie man Intlayer in ein **TanStack Start**-Projekt integriert (das unter der Haube Vite und TanStack Router für Routing/SSR verwendet).

---

## Schritt 1: Abhängigkeiten installieren

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**: Kern (Konfiguration, Wörterbücher, CLI/Transformationen).
- **react-intlayer**: `<IntlayerProvider>` + Hooks für React.
- **vite-intlayer**: Vite-Plugin, plus optionales Middleware für Spracherkennung/-weiterleitungen (funktioniert in Entwicklung & SSR/Vorschau; für Produktions-SSR in `dependencies` verschieben).

---

## Schritt 2: Intlayer konfigurieren

Erstellen Sie `intlayer.config.ts` im Stammverzeichnis Ihres Projekts:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // Sie können auch anpassen: contentDir, contentFileExtensions, Middleware-Optionen usw.
};

export default config;
```

CommonJS/ESM-Varianten sind identisch zu Ihrem Originaldokument, falls Sie `cjs`/`mjs` bevorzugen.

> Vollständige Konfigurationsreferenz: siehe Intlayers Konfigurationsdokumentation.

---

## Schritt 3: Fügen Sie das Vite-Plugin (und optional Middleware) hinzu

**TanStack Start verwendet Vite**, also fügen Sie Intlayers Plugin(s) zu Ihrer `vite.config.ts` hinzu:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // Optional, aber empfohlen für die Erkennung der Sprache, Cookies & Weiterleitungen:
    intLayerMiddlewarePlugin(),
  ],
});
```

> Wenn Sie SSR bereitstellen, verschieben Sie `vite-intlayer` zu den `dependencies`, damit die Middleware in der Produktion ausgeführt wird.

---

## Schritt 4: Deklarieren Sie Ihre Inhalte

Platzieren Sie Ihre Wörterbücher irgendwo unter `./src` (Standard `contentDir`). Beispiel:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      de: "Vite-Logo",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      de: "React-Logo",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),
    title: t({
      de: "TanStack Start + React",
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({
      de: "Zähler ist ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t<ReactNode>({
      de: (
        <>
          Bearbeite <code>src/routes/index.tsx</code> und speichere, um HMR zu
          testen
        </>
      ),
      en: (
        <>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      de: "Klicken Sie auf die Logos, um mehr zu erfahren",
      en: "Click the logos to learn more",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

JSON/ESM/CJS-Varianten funktionieren genauso wie in Ihrem Originaldokument.

> TSX-Inhalt? Vergessen Sie nicht `import React from "react"`, falls Ihr Setup dies benötigt.

---

## Schritt 5: TanStack Start mit Intlayer umschließen

Bei TanStack Start ist Ihre **Root-Route** der richtige Ort, um Provider zu setzen.

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // Beispiel für die Verwendung eines Wörterbuchs auf oberster Ebene:
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">Startseite</RouterLink>
        <RouterLink to="/about">Über</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

Dann verwenden Sie Ihre Inhalte in Seiten:

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> String-Attribute (`alt`, `title`, `aria-label`, …) benötigen `.value`:
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (Optional) Schritt 6: Sprachumschaltung (Client)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>Englisch</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Französisch</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Spanisch</button>
    </div>
  );
}
```

---

## (Optional) Schritt 7: Lokalisierte Routenführung (SEO-freundliche URLs)

Sie haben **zwei gute Muster** mit TanStack Start. Wählen Sie eines aus.

Erstellen Sie einen dynamischen Segmentordner `src/routes/$locale/`, sodass Ihre URLs `/:locale/...` sind. Validieren Sie im `$locale`-Layout den `params.locale`, setzen Sie `<IntlayerProvider locale=...>` und rendern Sie ein `<Outlet />`. Dieser Ansatz ist unkompliziert, aber Sie werden den Rest Ihrer Routen unterhalb von `$locale` mounten, und Sie benötigen einen zusätzlichen nicht-präfixierten Baum, wenn Sie _nicht_ möchten, dass die Standardsprache mit einem Präfix versehen wird.

---

## (Optional) Schritt 8: URL beim Wechseln der Sprache aktualisieren

Mit Muster A (Basis-Pfad) bedeutet das Wechseln der Sprache, **zu einem anderen Basis-Pfad zu navigieren**:

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // bewahrt die Historie
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>English</button>
      <button onClick={() => change(Locales.FRENCH)}>Français</button>
      <button onClick={() => change(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (Optional) Schritt 9: `<html lang>` und `dir` (TanStack Start Dokument)

TanStack Start stellt ein **Document** (HTML-Wurzel-Shell) bereit, das Sie anpassen können. Setzen Sie `lang` und `dir` für Barrierefreiheit/SEO:

```tsx fileName="src/routes/__root.tsx" {4,15}
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { IntlayerProvider } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      {/* Wenn Sie die Locale auf dem Server berechnen, übergeben Sie sie an Document; andernfalls korrigiert der Client dies nach der Hydrierung */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

Für eine clientseitige Korrektur können Sie auch Ihren kleinen Hook beibehalten:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

---

## (Optional) Schritt 10: Lokalisierte Link-Komponente

TanStack Router stellt ein `<Link/>` bereit, aber falls Sie jemals einen einfachen `<a>`-Tag benötigen, der interne URLs automatisch mit einem Präfix versieht:

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> Wenn Sie Muster A (basepath) verwenden, löst TanStacks `<Link to="/about" />` bereits über `basepath` zu `/fr/about` auf, daher ist ein benutzerdefinierter Link optional.

---

## TypeScript

Fügen Sie die von Intlayer generierten Typen ein:

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Ignorieren Sie die von Intlayer generierten Artefakte:

```gitignore
.intlayer
```

---

## VS Code Erweiterung

- **Intlayer VS Code Erweiterung** → Autovervollständigung, Fehler, Inline-Vorschauen, Schnellaktionen.
  Marketplace: `intlayer.intlayer-vs-code-extension`

---

## Weiterführende Themen

- Visueller Editor
- CMS-Modus
- Lokalerkennung am Edge / Adapter

---

## Dokumentationshistorie

| Version | Datum      | Änderungen                           |
| ------- | ---------- | ------------------------------------ |
| 1.0.0   | 2025-08-11 | TanStack Start-Anpassung hinzugefügt |
