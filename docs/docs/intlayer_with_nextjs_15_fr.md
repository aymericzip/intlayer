# Bien démarrer l'internationalisation (i18n) avec Intlayer et Next.js 15 avec App Router

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque open-source innovante d'internationalisation (i18n), conçue pour simplifier la gestion multilingue dans les applications web modernes. Intlayer s'intègre parfaitement avec le **Router App** puissant du framework **Next.js 15**. Elle est optimisée pour fonctionner avec les **Server Components** pour un rendu efficace et est entièrement compatible avec [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** à l'aide de dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Accéder aux traductions à la fois côté client et côté serveur**.
- **Bénéficier du support TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Profiter de fonctionnalités avancées**, telles que la détection et le changement dynamique de langue.

> Remarque : Intlayer est compatible avec Next.js 12, 13, 14 et 15. Si vous utilisez le Router Page de Next.js, consultez ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_page_router_en.md). Pour Next.js 12, 13, 14 avec le Router App, référez-vous à ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_12_13_14_en.md).

---

## Guide Étape par Étape pour Configurer Intlayer dans une Application Next.js

### Étape 1 : Installer les Dépendances

Installez les packages nécessaires avec npm :

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

---

### Étape 2 : Configurer votre Projet

Créez un fichier de configuration pour définir les langues de votre application :

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

Pour voir tous les paramètres disponibles, consultez la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_en.md).

---

### Étape 3 : Intégrer Intlayer à la Configuration de Next.js

Ajoutez Intlayer à la configuration de Next.js :

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

---

### Étape 4 : Configurer un Middleware pour la Détection de la Langue

Ajoutez un middleware pour détecter la langue préférée de l'utilisateur :

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

---

### Étape 5 : Définir des Routes Dynamiques par Langue

Configurez le routage dynamique pour le contenu localisé :

Renommez `src/app/page.ts` en `src/app/[locale]/page.ts`.

Ensuite, implémentez la fonction `generateStaticParams` dans le layout de votre application :

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

Ajoutez ensuite un nouveau layout dans votre répertoire `[locale]` :

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

---

### Étape 6 : Déclarer votre Contenu

Créez et gérez vos dictionnaires de contenu :

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

[Consultez comment déclarer vos fichiers de contenu Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_en.md).

---

### Étape 7 : Utiliser le Contenu dans votre Code

Accédez à vos dictionnaires de contenu dans toute votre application :

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       *   IntlayerServerProvider est utilisé pour fournir la langue aux enfants côté serveur
       *   Ne fonctionne pas si configuré dans le layout
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider est utilisé pour fournir la langue aux enfants côté client
       *   Peut être configuré dans n'importe quel composant parent, y compris le layout
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

... [**continuer la traduction complète**]

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Créez une déclaration de contenu associée

  return (
    <div>
      <h2>{content.title}</h2>
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
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **Remarque** : Si vous souhaitez utiliser votre contenu dans un attribut `string` tel que `alt`, `title`, `href`, ou `aria-label`, vous devez appeler la valeur de la fonction, comme :

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

Pour une utilisation plus détaillée d’Intlayer dans des composants client ou serveur, consultez l’[exemple Next.js ici](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

---

### (Optionnel) Étape 8 : Internationaliser vos Métadonnées

Si vous souhaitez internationaliser vos métadonnées, comme le titre de votre page, utilisez la fonction `generateMetadata` fournie par Next.js. À l'intérieur de cette fonction, utilisez `getTranslationContent` pour traduire vos métadonnées.

```typescript
// src/app/[locale]/layout.tsx ou src/app/[locale]/page.tsx

import { type IConfigLocales, getTranslationContent } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

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

---

### (Optionnel) Étape 9 : Changer la Langue de votre Contenu

Pour changer la langue de votre contenu, utilisez la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction permet de définir la langue de l’application et de mettre à jour le contenu en conséquence.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.FRENCH)}>Changer de langue</button>
  );
};
```

---

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour tirer parti de TypeScript et renforcer votre base de code.

![Autocomplétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5
// tsconfig.json

{
  // votre configuration personnalisée
  "include": [
    "src",
    "types", // <- Incluez les types générés automatiquement
  ],
}
```

---

### Configuration Git

Il est recommandé d’ignorer les fichiers générés par Intlayer pour éviter de les inclure dans votre dépôt Git.

Ajoutez les instructions suivantes à votre fichier `.gitignore` :

```gitignore
# Ignorer les fichiers générés par Intlayer
.intlayer
```
