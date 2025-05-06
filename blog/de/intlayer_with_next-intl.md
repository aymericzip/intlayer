# Next.js Internationalisierung (i18n) mit next-intl und Intlayer

Sowohl next-intl als auch Intlayer sind Open-Source-Internationalisierungsframeworks (i18n), die für Next.js-Anwendungen entwickelt wurden. Sie werden häufig für die Verwaltung von Übersetzungen, Lokalisierung und Sprachwechsel in Softwareprojekten eingesetzt.

Sie teilen drei Hauptkonzepte:

1. **Inhaltsdeklaration**: Die Methode zur Definition des übersetzbaren Inhalts Ihrer Anwendung.

   - Genannt `content declaration file` in Intlayer, welches eine JSON-, JS- oder TS-Datei sein kann, die die strukturierten Daten exportiert. Siehe [Intlayer-Dokumentation](https://intlayer.org/fr/doc/concept/content) für weitere Informationen.
   - Genannt `messages` oder `locale messages` in next-intl, normalerweise in JSON-Dateien. Siehe [next-intl-Dokumentation](https://github.com/amannn/next-intl) für weitere Informationen.

2. **Hilfsprogramme**: Werkzeuge zum Erstellen und Interpretieren von Inhaltsdeklarationen in der Anwendung, wie `useIntlayer()` oder `useLocale()` für Intlayer und `useTranslations()` für next-intl.

3. **Plugins und Middleware**: Funktionen zur Verwaltung von URL-Weiterleitungen, Optimierung der Bundles und mehr – z.B. `intlayerMiddleware` für Intlayer oder [`createMiddleware`](https://github.com/amannn/next-intl) für next-intl.

## Intlayer vs. next-intl: Wichtige Unterschiede

Für eine tiefere Analyse, wie Intlayer mit anderen i18n-Bibliotheken für Next.js (wie next-intl) verglichen wird, lesen Sie den [next-i18next vs. next-intl vs. Intlayer Blogbeitrag](https://github.com/aymericzip/intlayer/blob/main/blog/de/i18next_vs_next-intl_vs_intlayer.md).

## Wie man next-intl-Nachrichten mit Intlayer generiert

### Warum Intlayer mit next-intl verwenden?

Intlayer-Inhaltsdeklarationsdateien bieten im Allgemeinen eine bessere Entwicklererfahrung. Sie sind flexibler und wartbarer aufgrund zweier Hauptvorteile:

1. **Flexibele Platzierung**: Sie können eine Intlayer-Inhaltsdeklarationsdatei überall im Dateibaum Ihrer Anwendung platzieren. Das erleichtert das Umbenennen oder Löschen von Komponenten, ohne ungenutzte oder nicht mehr benötigte Nachrichten-Dateien zu hinterlassen.

   Beispiel-Dateistrukturen:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Inhaltsdeklarationsdatei
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Inhaltsdeklarationsdatei
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Inhaltsdeklarationsdatei
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Inhaltsdeklarationsdatei
               └── index.jsx
   ```

2. **Zentralisierte Übersetzungen**: Intlayer speichert alle Übersetzungen in einer einzigen Inhaltsdeklaration, sodass keine Übersetzung fehlt. In TypeScript-Projekten werden fehlende Übersetzungen automatisch als Typfehler markiert, was den Entwicklern sofortiges Feedback gibt.

### Installation

Um Intlayer und next-intl zusammen zu verwenden, installieren Sie beide Bibliotheken:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### Konfigurieren von Intlayer zur Ausgabe von next-intl-Nachrichten

> **Hinweis:** Die Ausgabe von Nachrichten von Intlayer für next-intl kann geringfügige Unterschiede in der Struktur mit sich bringen. Halten Sie, wenn möglich, einen nur Intlayer- oder nur next-intl-Workflow, um die Integration zu vereinfachen. Wenn Sie next-intl-Nachrichten von Intlayer generieren müssen, befolgen Sie die folgenden Schritte.

Erstellen oder aktualisieren Sie eine `intlayer.config.ts`-Datei (oder `.mjs` / `.cjs`) im Stammverzeichnis Ihres Projekts:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.GERMAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.GERMAN,
  },
  content: {
    dictionaryOutput: ["next-intl"], // Verwenden Sie die next-intl-Ausgabe
    nextIntlMessagesDir: "./intl/messages", // Wo die next-intl-Nachrichten gespeichert werden
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.GERMAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.GERMAN,
  },
  content: {
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.GERMAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.GERMAN,
  },
  content: {
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### Inhaltsdeklaration

Nachfolgend Beispiele für Inhaltsdeklarationsdateien in mehreren Formaten. Intlayer wird diese in Nachrichten-Dateien kompilieren, die next-intl konsumieren kann.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      de: "Hallo Welt",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      de: "Hallo Welt",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
      de: "Hallo Welt",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-component",
  "content": {
    "helloWorld": {
      "nodeType": "translation",
      "translation": {
        "de": "Hallo Welt",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Erstellen der next-intl-Nachrichten

Um die Nachrichten-Dateien für next-intl zu erstellen, führen Sie aus:

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Dies generiert Ressourcen im `./intl/messages`-Verzeichnis (wie in `intlayer.config.*` konfiguriert). Die erwartete Ausgabe:

```bash
.
└── intl
    └── messages
       └── de
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Jede Datei enthält kompilierte Nachrichten aus allen Intlayer-Inhaltsdeklarationen. Die obersten Schlüssel entsprechen typischerweise Ihren `content.key`-Feldern.

### Verwendung von next-intl in Ihrer Next.js-App

> Für weitere Details siehe die offiziellen [next-intl-Nutzungsdokumente](https://github.com/amannn/next-intl#readme).

1. **Middleware erstellen (optional):**  
   Wenn Sie die automatische Lokalisierung oder Weiterleitung verwalten möchten, verwenden Sie next-intls [createMiddleware](https://github.com/amannn/next-intl#createMiddleware).

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["de", "fr", "es"],
     defaultLocale: "de",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **Erstellen Sie eine `layout.tsx` oder `_app.tsx`, um Nachrichten zu laden:**  
   Wenn Sie den App-Router verwenden (Next.js 13+), erstellen Sie ein Layout:

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';

   export const dynamic = 'force-dynamic';

   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   Wenn Sie den Pages-Router verwenden (Next.js 12 oder früher), laden Sie die Nachrichten in `_app.tsx`:

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **Nachrichten serverseitig abrufen (Pages Router-Beispiel):**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### Verwendung von Inhalten in Next.js-Komponenten

Sobald die Nachrichten in next-intl geladen sind, können Sie sie in Ihren Komponenten über den `useTranslations()`-Hook verwenden:

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component' entspricht dem Inhaltskey in Intlayer

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**Das war's!** Jedes Mal, wenn Sie Intlayer-Inhaltsdeklarationsdateien aktualisieren oder hinzufügen, führen Sie den Befehl `intlayer build` erneut aus, um Ihre next-intl JSON-Nachrichten neu zu generieren. next-intl wird den aktualisierten Inhalt automatisch erkennen.
