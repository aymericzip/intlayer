# Bien démarrer l'internationalisation (i18n) avec Intlayer et Next.js 14 avec App Router

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque open-source innovante conçue pour simplifier la prise en charge multilingue dans les applications web modernes. Intlayer s'intègre parfaitement au dernier framework **Next.js 14**, y compris son puissant **App Router**. Elle est optimisée pour fonctionner avec les **Server Components** pour un rendu efficace et est entièrement compatible avec [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Accéder aux traductions dans les composants côté client et côté serveur**.
- **Assurer la prise en charge TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection dynamique de la langue et le changement de langue.

> **Note :** Intlayer est compatible avec Next.js 12, 13, 14 et 15. Si vous utilisez le **Page Router** de Next.js, veuillez consulter ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_page_router_fr.md). Pour Next.js 15 avec ou sans turbopack, consultez ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_15_fr.md).

---

## Guide étape par étape pour configurer Intlayer dans une application Next.js

### Étape 1 : Installer les dépendances

Installez les packages nécessaires avec npm :

```bash
npm install intlayer next-intlayer
```

ou avec yarn :

```bash
yarn add intlayer next-intlayer
```

ou avec pnpm :

```bash
pnpm add intlayer next-intlayer
```

---

### Étape 2 : Configurer votre projet

Créez un fichier de configuration pour définir les langues de votre application :

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

Pour voir tous les paramètres disponibles, consultez la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_fr.md).

---

### Étape 3 : Intégrer Intlayer dans la configuration de Next.js

Configurez votre setup Next.js pour utiliser Intlayer :

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

---

### Étape 4 : Configurer le middleware pour la détection de langue

Configurez un middleware pour détecter la langue préférée de l'utilisateur :

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

---

### Étape 5 : Définir des routes dynamiques localisées

Implémentez le routage dynamique pour le contenu localisé :

Renommez `src/app/page.ts` en `src/app/[locale]/page.ts`.

Ensuite, implémentez la fonction `generateStaticParams` dans votre layout principal :

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

Ajoutez ensuite un nouveau layout dans le répertoire `[locale]` :

```tsx
// src/app/[locale]/layout.tsx

import { type Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

---

### Étape 6 : Déclarer votre contenu

Créez et gérez vos dictionnaires de contenu :

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

[Consultez comment déclarer vos fichiers de contenu Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_fr.md).

---

### Étape 7 : Utiliser le contenu dans votre code

Accédez à vos dictionnaires de contenu dans votre application :

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

---

### Étape 8 (optionnelle) : Internationaliser vos métadonnées

Pour traduire des métadonnées comme le titre de vos pages, utilisez la fonction `generateMetadata` de Next.js :

```typescript
// src/app/[locale]/layout.tsx ou src/app/[locale]/page.tsx

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

---

### Étape 9 (optionnelle) : Changer la langue de votre contenu

Pour changer la langue de votre contenu, utilisez la fonction `setLocale` :

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

### Configuration de TypeScript

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement :

```json5
// tsconfig.json

{
  "include": ["src", "types"],
}
```

---

### Configuration Git

Ignorez les fichiers générés par Intlayer dans votre dépôt Git :

```gitignore
# Ignorer les fichiers générés par Intlayer
.intlayer
```
