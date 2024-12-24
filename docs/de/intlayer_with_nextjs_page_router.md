# Getting Started Internationalizing (i18n) with Intlayer and Next.js using Page Router

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek für Internationalisierung (i18n), die darauf abzielt, die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen. Intlayer integriert sich nahtlos mit dem neuesten **Next.js**-Framework, einschließlich des traditionellen **Page Router**.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mit deklarativen Wörterbüchern auf Komponentenebene.
- **Metadaten**, Routen und Inhalte dynamisch lokalisieren.
- **TypeScript-Unterstützung gewährleisten** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie z. B. dynamischer Lokalisierungserkennung und -wechsel.

> Hinweis: Intlayer ist kompatibel mit Next.js 12, 13, 14 und 15. Wenn Sie den Next.js App Router verwenden, beachten Sie bitte den [App Router-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_14.md). Für Next.js 15 folgen Sie diesem [Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung mit Page Router

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Schritt 2: Ihr Projekt konfigurieren

Erstellen Sie eine Konfigurationsdatei, um die von Ihrer Anwendung unterstützten Sprachen zu definieren:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Fügen Sie hier Ihre anderen Lokalisierungen hinzu
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Für eine vollständige Liste verfügbarer Konfigurationsoptionen beachten Sie bitte die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Intlayer mit der Next.js-Konfiguration integrieren

Ändern Sie Ihre Next.js-Konfiguration, um Intlayer zu integrieren:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ihre vorhandene Next.js-Konfiguration
};

export default withIntlayer(nextConfig);
```

### Schritt 4: Middleware zur Lokalisierungserkennung konfigurieren

Richten Sie Middleware ein, um automatisch die bevorzugte Sprache des Benutzers zu erkennen und zu handhaben:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Schritt 5: Dynamische Lokalisierungsrouten definieren

Implementieren Sie das dynamische Routing, um lokalisierte Inhalte basierend auf der Sprache des Benutzers bereitzustellen.

1. **Erstellen Sie spezifische Seiten für die Lokalisierung:**

   Benennen Sie Ihre Hauptseitendatei um, um das dynamische Segment `[locale]` einzuschließen.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **Aktualisieren Sie `_app.tsx`, um die Lokalisierung zu handhaben:**

   Ändern Sie Ihr `_app.tsx`, um Intlayer-Provider einzuschließen.

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **Richten Sie `getStaticPaths` und `getStaticProps` ein:**

   Definieren Sie in Ihrer `[locale]/index.tsx` die Pfade und Eigenschaften, um verschiedene Lokalisierungen zu handhaben.

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* Ihr Inhalt hier */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // Fügen Sie hier Ihre Lokalisierungen hinzu

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```

### Schritt 6: Ihren Inhalt deklarieren

Erstellen und verwalten Sie Ihre Inhaltswörterbücher, um Übersetzungen zu speichern.

```tsx
// src/pages/[locale]/home.content.ts
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
```

Für weitere Informationen zur Deklaration von Inhalten beachten Sie bitte den [Leitfaden zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

### Schritt 7: Inhalte in Ihrem Code nutzen

Greifen Sie auf Ihre Inhaltswörterbücher in Ihrer gesamten Anwendung zu, um übersetzte Inhalte anzuzeigen.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Zusätzliche Komponenten */}
    </div>
  );
};

// ... Rest des Codes, einschließlich getStaticPaths und getStaticProps

export default HomePage;
```

```tsx
// src/components/ComponentExample.tsx

import { useIntlayer } from "next-intlayer";

export const ComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Stellen Sie sicher, dass Sie eine entsprechende Inhaltsdeklaration haben

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **Hinweis:** Wenn Sie Übersetzungen in `string`-Attributen (z. B. `alt`, `title`, `href`, `aria-label`) verwenden, rufen Sie den Wert der Funktion wie folgt auf:

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

### (Optional) Schritt 8: Internationalisieren Sie Ihre Metadaten

Um Metadaten wie Seitentitel und -beschreibungen zu internationalisieren, verwenden Sie die Funktion `getStaticProps` in Verbindung mit der Funktion `getTranslationContent` von Intlayer.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // Metadaten können im Head oder in anderen Komponenten verwendet werden, wie benötigt
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Zusätzlicher Inhalt */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Rest des Codes einschließlich getStaticPaths
```

### (Optional) Schritt 9: Ändern Sie die Sprache Ihres Inhalts

Um Benutzern den dynamischen Sprachwechsel zu ermöglichen, verwenden Sie die Funktion `setLocale`, die von dem Hook `useLocale` bereitgestellt wird.

```tsx
// src/components/LanguageSwitcher.tsx

import { Locales } from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LanguageSwitcher = () => {
  const { setLocale } = useLocalePageRouter();

  return (
    <div>
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
      {/* Fügen Sie weitere Schaltflächen für zusätzliche Lokalisierungen hinzu */}
    </div>
  );
};

export default LanguageSwitcher;
```

### TypeScript konfigurieren

Intlayer verwendet die Modulaugmentation, um die Fähigkeiten von TypeScript zu verbessern und eine bessere Typensicherheit und Autovervollständigung zu bieten.

1. **Stellen Sie sicher, dass TypeScript automatisch generierte Typen einschließt:**

   Aktualisieren Sie Ihre `tsconfig.json`, um die automatisch generierten Typen einzuschließen.

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // Ihre vorhandenen TypeScript-Konfigurationen
     },
     "include": [
       "src",
       "types" // Fügen Sie die automatisch generierten Typen hinzu
     ]
   }
   ```

2. **Beispiel für die Vorteile von TypeScript:**

   ![Beispiel für Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Beispiel für Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Git-Konfiguration

Um Ihr Repository sauber zu halten und zu vermeiden, dass generierte Dateien eingegeben werden, wird empfohlen, Dateien zu ignorieren, die von Intlayer erstellt wurden.

1. **Aktualisieren Sie `.gitignore`:**

   Fügen Sie die folgenden Zeilen zu Ihrer `.gitignore`-Datei hinzu:

   ```plaintext
   # Ignorieren Sie die von Intlayer generierten Dateien
   .intlayer
   ```

## Zusätzliche Ressourcen

- **Intlayer-Dokumentation:** [GitHub-Repository](https://github.com/aymericzip/intlayer)
- **Leitfaden zur Inhaltsdeklaration:** [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md)
- **Konfigurationsdokumentation:** [Konfigurationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md)

Indem Sie diesem Leitfaden folgen, können Sie Intlayer effektiv in Ihre Next.js-Anwendung mit dem Page Router integrieren und eine robuste und skalierbare Internationalisierungsunterstützung für Ihre Webprojekte ermöglichen.
