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

## Étape 2 : Configurer votre Projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Pour voir tous les paramètres disponibles, consultez la [documentation de configuration ici](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_fr.md).

## Étape 3 : Intégrer Intlayer dans votre Configuration Next.js

Configurez votre installation Next.js pour utiliser Intlayer :

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

## Étape 4 : Configurer le Middleware pour la Détection de Langue

Mettez en place le middleware pour détecter la langue préférée de l'utilisateur :

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

## Étape 5 : Définir des Routes Dynamiques pour les Langues

Implémentez le routage dynamique pour le contenu localisé :

Changez `src/app/page.ts` en `src/app/[locale]/page.ts`

Ensuite, implémentez la fonction generateStaticParams dans votre Layout d'application.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Ligne à insérer

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Puis ajoutez un nouveau layout dans votre `[locale]` repertoire :

```tsx
// src/app/[locale]/layout.tsx

import { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = ({ children, params: { locale } }) => (
  <html lang={locale}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

## Étape 6 : Déclarer votre Contenu

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

> Note : Si votre fichier de contenu inclut du code TSX, vous devrez penser à importer `import React from "react";` dans votre fichier de contenu.

[Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration/get_started_fr.md).

## Étape 7 : Utiliser le Contenu dans votre Code

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

> Note: Si vous souhaitez utiliser un votre contenu dans un attribut de type `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, tel que :
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Pour une utilisation plus détaillée d'intlayer dans un composant Client ou Server, consultez l'[exemple nextJS ici](https://github.com/aypineau/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

## (Optionnel) Étape 8: Internationalisation de votre métadonnées

Dans le cas où vous souhaitez internationaliser vos métadonnées, tels que le titre de votre page, vous pouvez utiliser la fonction `generateMetadata` fournie par NextJS. À l'intérieur de la fonction, utilisez la fonction `getTranslationContent` pour traduire vos métadonnées.

```typescript
// src/app/[locale]/metadata.ts

import { type IConfigLocales, getTranslationContent } from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};
```

## (Optionnel) Étape 9: Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le `useLocale` hook. Cette fonction vous permet de définir la langue de l'application et de mettre à jour le contenu en conséquence.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Change Language</button>
  );
};
```

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
