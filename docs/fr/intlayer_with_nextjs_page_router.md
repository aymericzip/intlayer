# Commencer l'internationalisation (i18n) avec Intlayer et Next.js en utilisant le Page Router

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) open-source innovante, conçue pour simplifier le support multilingue dans les applications web modernes. Intlayer s'intègre parfaitement avec le dernier framework **Next.js**, y compris son traditionnel **Page Router**.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer le support TypeScript** avec des types générés automatiquement, améliorant l'auto-complétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, telles que la détection et le changement dynamiques de la langue.

> Remarque : Intlayer est compatible avec Next.js 12, 13, 14 et 15. Si vous utilisez le Next.js App Router, référez-vous au [guide du App Router](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_14.md). Pour Next.js 15, suivez ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).

---

## Guide étape par étape pour installer Intlayer dans une application Next.js utilisant le Page Router

### Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant votre gestionnaire de paquets préféré :

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Étape 2 : Configurer votre projet

Créez un fichier de configuration pour définir les langues prises en charge par votre application :

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ajoutez vos autres langues ici
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Pour une liste complète des options de configuration disponibles, référez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer avec la configuration Next.js

Modifiez votre configuration Next.js pour incorporer Intlayer :

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Votre configuration Next.js existante
};

export default withIntlayer(nextConfig);
```

### Étape 4 : Configurer le Middleware pour la Détection de Langue

Mettez en place un middleware pour détecter automatiquement et gérer la langue préférée de l'utilisateur :

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Étape 5 : Définir des Routes de Langue Dynamiques

Implémentez le routage dynamique pour servir du contenu localisé en fonction de la langue de l'utilisateur.

1. **Créer des pages spécifiques à la langue :**

   Renommez votre fichier de page principal pour inclure le segment dynamique `[locale]`.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **Mettre à jour `_app.tsx` pour gérer la localisation :**

   Modifiez votre `_app.tsx` pour inclure les fournisseurs Intlayer.

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

3. **Configurer `getStaticPaths` et `getStaticProps` :**

   Dans votre `[locale]/index.tsx`, définissez les chemins et les propriétés pour gérer différentes langues.

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* Votre contenu ici */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // Ajoutez vos langues ici

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

### Étape 6 : Déclarer Votre Contenu

Créez et gérez vos dictionnaires de contenu pour stocker les traductions.

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

Pour plus d'informations sur la déclaration de contenu, référez-vous au [guide sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md).

### Étape 7 : Utiliser le Contenu dans Votre Code

Accédez à vos dictionnaires de contenu tout au long de votre application pour afficher le contenu traduit.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";
import { ComponentExample } from "@component/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Composants supplémentaires */}
    </div>
  );
};

// ... Reste du code, y compris getStaticPaths et getStaticProps

export default HomePage;
```

```tsx
// src/components/ComponentExample.tsx

import { useIntlayer } from "next-intlayer";

export const ComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Assurez-vous d'avoir une déclaration de contenu correspondante

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **Remarque :** Lorsque vous utilisez des traductions dans des attributs de `string` (ex. `alt`, `title`, `href`, `aria-label`), appelez la valeur de la fonction comme suit :

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

### (Facultatif) Étape 8 : Internationaliser Vos Métadonnées

Pour internationaliser les métadonnées telles que les titres et descriptions de page, utilisez la fonction `getStaticProps` en conjonction avec la fonction `getTranslationContent` d'Intlayer.

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
  // Les métadonnées peuvent être utilisées dans le head ou d'autres composants selon les besoins
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenu supplémentaire */}
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

// ... Reste du code y compris getStaticPaths
```

### (Facultatif) Étape 9 : Changer la Langue de Votre Contenu

Pour permettre aux utilisateurs de changer de langue dynamiquement, utilisez la fonction `setLocale` fournie par le hook `useLocale`.

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
      {/* Ajoutez plus de boutons pour d'autres langues */}
    </div>
  );
};

export default LanguageSwitcher;
```

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour améliorer les capacités de TypeScript, offrant une meilleure sécurité de type et auto-complétion.

1. **Assurez-vous que TypeScript inclut les types générés automatiquement :**

   Mettez à jour votre `tsconfig.json` pour inclure les types générés automatiquement.

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // Vos configurations TypeScript existantes
     },
     "include": [
       "src",
       "types" // Incluez les types auto-générés
     ]
   }
   ```

2. **Exemple des avantages de TypeScript :**

   ![Exemple d'auto-complétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Exemple d'erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Configuration de Git

Pour garder votre dépôt propre et éviter de commettre des fichiers générés, il est recommandé d'ignorer les fichiers créés par Intlayer.

1. **Mettre à jour `.gitignore` :**

   Ajoutez les lignes suivantes à votre fichier `.gitignore` :

   ```plaintext
   # Ignorer les fichiers générés par Intlayer
   .intlayer
   ```

## Ressources supplémentaires

- **Documentation Intlayer :** [Dépôt GitHub](https://github.com/aymericzip/intlayer)
- **Guide de déclaration de contenu :** [Déclaration de Contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md)
- **Documentation de configuration :** [Guide de Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md)

En suivant ce guide, vous pouvez intégrer efficacement Intlayer dans votre application Next.js en utilisant le Page Router, permettant un support d'internationalisation robuste et évolutif pour vos projets web.

---
