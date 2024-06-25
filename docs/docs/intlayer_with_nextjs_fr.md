# Commencer avec Intlayer et Next.js

Mettre en place Intlayer dans une application Next.js est simple :

## Étape 1 : Installer les Dépendances

Installez les paquets nécessaires en utilisant npm :

```bash
npm install intlayer next-intlayer
```

```bash
yarn install intlayer next-intlayer
```

```bash
pnpm install intlayer next-intlayer
```

## Étape 2 : Intégrer Intlayer dans votre Configuration Next.js

Configurez votre installation Next.js pour utiliser Intlayer :

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

const nextConfig = {};

export default withIntlayer(nextConfig);
```

## Étape 3 : Configurer le Middleware pour la Détection de Langue

Mettez en place le middleware pour détecter la langue préférée de l'utilisateur :

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from 'next-intlayer/middleware';

export const config = {
  matcher: '/((?!api|static|._\\.._|\_next).*),
};
```

## Étape 4 : Définir des Routes Dynamiques pour les Langues

Implémentez le routage dynamique pour le contenu localisé :

Changez `src/app/page.ts` en `src/app/[locale]/page.ts`

Ensuite, implémentez la fonction generateStaticParams dans votre Layout d'application.

```tsx
// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export { generateStaticParams } from "next-intlayer"; // Ligne à insérer

export const metadata: Metadata = {
  title: "Créer une Application Next",
  description: "Généré par créer une application Next",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
);

export default RootLayout;
```

## Étape 5 : Déclarer votre Contenu

Créez et gérez vos dictionnaires de contenu :

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent: DeclarationContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
};

export default pageContent;
```

[Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration/get_started_fr.md).

## Étape 6 : Utiliser le Contenu dans votre Code

Accédez à vos dictionnaires de contenu dans toute votre application :

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/components/ClientComponentExample";
import { LocaleSwitcher } from "@component/components/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/components/NestedServerComponentExample";
import { ServerComponentExample } from "@component/components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: NextPageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   IntlayerServerProvider est utilisé pour fournir la langue aux enfants côté serveur
       *   Ne fonctionne pas si défini dans le layout
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider est utilisé pour fournir la langue aux enfants côté client
       *   Peut être défini dans n'importe quel composant parent, y compris le layout
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Créez une déclaration de contenu associée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Créez une déclaration de contenu associée

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

Pour une utilisation plus détaillée d'intlayer dans un composant Client ou Server, consultez l'[exemple nextJS ici](https://github.com/aypineau/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

# Configuration de votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Pour voir tous les paramètres disponibles, consultez la [documentation de configuration ici](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_fr.md).

## Configurer TypeScript

Intlayer utilise l'augmentation de module pour tirer parti de TypeScript et renforcer votre base de code.

![alt text](https://github.com/aypineau/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aypineau/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5
// tsconfig.json

{
  // votre configuration personnalisée
  include: [
    "src",
    "types", // <- Inclure les types autogénérés
  ],
}
```
