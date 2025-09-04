---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: Iniziare con Intlayer in TanStack Start (React)
description: Aggiungi l'internazionalizzazione alla tua app TanStack Start usando Intlayer-dizionari a livello di componente, URL localizzati e metadati ottimizzati per SEO.
keywords:
  - Internazionalizzazione
  - Documentazione
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

# Iniziare con l'internazionalizzazione (i18n) usando Intlayer e TanStack Start (React)

## Cos'è Intlayer?

**Intlayer** è un toolkit open-source per l'internazionalizzazione (i18n) di app React. Ti offre:

- **Dizionari locali al componente** con sicurezza TypeScript.
- **Metadati e rotte dinamiche** (pronte per SEO).
- **Cambio della lingua a runtime** (e helper per rilevare/persistere le lingue).
- **Plugin Vite** per trasformazioni in fase di build + esperienza di sviluppo (DX).

Questa guida mostra come integrare Intlayer in un progetto **TanStack Start** (che utilizza Vite sotto il cofano e TanStack Router per il routing/SSR).

---

## Passo 1: Installare le dipendenze

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

- **intlayer**: core (configurazione, dizionari, CLI/trasformazioni).
- **react-intlayer**: `<IntlayerProvider>` + hook per React.
- **vite-intlayer**: plugin Vite, più middleware opzionale per il rilevamento/reindirizzamento della lingua (funziona in dev e SSR/preview; spostare in `dependencies` per SSR in produzione).

---

## Passo 2: Configurare Intlayer

Crea `intlayer.config.ts` nella root del tuo progetto:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // Puoi anche modificare: contentDir, contentFileExtensions, opzioni del middleware, ecc.
};

export default config;
```

Le varianti CommonJS/ESM sono identiche al tuo documento originale se preferisci `cjs`/`mjs`.

> Riferimento completo alla configurazione: vedi la documentazione di configurazione di Intlayer.

---

## Passo 3: Aggiungere il Plugin Vite (e middleware opzionale)

**TanStack Start usa Vite**, quindi aggiungi il/i plugin di Intlayer al tuo `vite.config.ts`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // Opzionale ma consigliato per il rilevamento della lingua, cookie e reindirizzamenti:
    intlayerMiddlewarePlugin(),
  ],
});
```

> Se distribuisci SSR, sposta `vite-intlayer` nelle `dependencies` affinché il middleware funzioni in produzione.

---

## Passo 4: Dichiara il tuo contenuto

Posiziona i tuoi dizionari ovunque sotto `./src` (default `contentDir`). Esempio:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      it: "Logo Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      it: "Logo React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),
    title: t({
      it: "TanStack Start + React",
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({
      it: "il conteggio è ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t<ReactNode>({
      it: (
        <>
          Modifica <code>src/routes/index.tsx</code> e salva per testare HMR
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
      it: "Clicca sui loghi per saperne di più",
      en: "Click the logos to learn more",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

Le varianti JSON/ESM/CJS funzionano allo stesso modo del tuo documento originale.

> Contenuto TSX? Non dimenticare `import React from "react"` se la tua configurazione lo richiede.

---

## Passo 5: Avvolgi TanStack Start con Intlayer

Con TanStack Start, la tua **root route** è il posto giusto per impostare i provider.

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // Esempio di utilizzo di un dizionario a livello superiore:
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">Informazioni</RouterLink>
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

Quindi usa i tuoi contenuti nelle pagine:

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

> Gli attributi stringa (`alt`, `title`, `aria-label`, …) necessitano di `.value`:
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (Opzionale) Passo 6: Cambio della lingua (Client)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>Inglese</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Francese</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Spagnolo</button>
    </div>
  );
}
```

---

## (Opzionale) Passo 7: Routing Localizzato (URL SEO-friendly)

Hai **due buoni modelli** con TanStack Start. Scegline uno.

Crea una cartella segmento dinamico `src/routes/$locale/` così i tuoi URL saranno `/:locale/...`. Nel layout `$locale`, valida `params.locale`, imposta `<IntlayerProvider locale=...>`, e renderizza un `<Outlet />`. Questo approccio è semplice, ma monterai il resto delle tue rotte sotto `$locale`, e avrai bisogno di un albero extra senza prefisso se _non_ vuoi il prefisso della locale di default.

---

## (Opzionale) Passo 8: Aggiornare l'URL quando si cambia lingua

Con il Pattern A (basepath), cambiare lingua significa **navigare verso un basepath differente**:

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
    await router.navigate({ to: nextPath }); // preserva la cronologia
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

## (Opzionale) Passo 9: `<html lang>` e `dir` (TanStack Start Document)

TanStack Start espone un **Document** (shell HTML radice) che puoi personalizzare. Imposta `lang` e `dir` per accessibilità/SEO:

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
      {/* Se calcoli la locale sul server, passala a Document; altrimenti il client correggerà dopo l'idratazione */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

Per la correzione lato client, puoi anche mantenere il tuo piccolo hook:

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

## (Opzionale) Passo 10: Componente Link localizzato

TanStack Router fornisce un `<Link/>`, ma se mai avessi bisogno di un semplice `<a>` che aggiunge automaticamente il prefisso alle URL interne:

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

> Se usi il Pattern A (basepath), il `<Link to="/about" />` di TanStack risolve già in `/fr/about` tramite `basepath`, quindi un link personalizzato è opzionale.

---

## TypeScript

Includi i tipi generati da Intlayer:

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Ignora gli artefatti generati da Intlayer:

```gitignore
.intlayer
```

---

## Estensione VS Code

- **Estensione Intlayer per VS Code** → completamento automatico, errori, anteprime inline, azioni rapide.
  Marketplace: `intlayer.intlayer-vs-code-extension`

---

## Approfondimenti

- Editor Visuale
- Modalità CMS
- Rilevamento della lingua al confine / adattatori

---

## Cronologia Documentazione

| Versione | Data       | Modifiche                             |
| -------- | ---------- | ------------------------------------- |
| 1.0.0    | 2025-08-11 | Aggiunta l'adattamento TanStack Start |
