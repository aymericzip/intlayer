---
createdAt: 2025-06-18
updatedAt: 2026-08-30
title: "Nuxt i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application Nuxt multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 7.3.11
    date: 2025-12-07
    changes: "Mise à jour de LocaleSwitcher, SEO, métadonnées"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
author: aymericzip
---

# Traduisez votre site Nuxt et Vue avec Intlayer | Internationalisation (i18n)

## Table des matières

<TOC/>

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `@nuxtjs/i18n` ou `i18next`, Intlayer est une solution dotée d'optimisations intégrées telles que :

<AccordionGroup>
<Accordion header="Support complet de Nuxt">

Intlayer est optimisé pour fonctionner parfaitement avec Nuxt en offrant un **routage multilingue**, un **middleware pour la détection des paramètres régionaux**, un **plan du site** et toutes les fonctionnalités nécessaires à la mise à l'échelle de l'internationalisation (i18n).

</Accordion>

<Accordion header="Taille du bundle">

Au lieu de charger de lourds fichiers JSON dans vos pages, ne chargez que le contenu strictement nécessaire. Intlayer vous aide à **réduire la taille de votre bundle et de vos pages jusqu'à 50 %**.

</Accordion>

<Accordion header="Maintenabilité">

Déclarer le contenu directement au plus près de vos composants **facilite la maintenance** des applications de grande envergure. Vous pouvez dupliquer ou supprimer le dossier d'une fonctionnalité sans le fardeau mental de devoir passer en revue toute votre base de code de contenu. De plus, Intlayer est **entièrement typé** pour garantir l'exactitude de vos traductions.

</Accordion>

<Accordion header="Prêt pour les agents IA">

La colocalisation du contenu **réduit le contexte nécessaire** aux grands modèles de langage (LLM). Intlayer est également livré avec une suite d'outils, tels qu'une **CLI** pour vérifier les traductions manquantes, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)**, un **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** et des **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)**, afin de rendre l'expérience développeur (DX) encore plus fluide pour les agents IA.

</Accordion>

<Accordion header="Automatisation">

Automatisez les traductions dans votre pipeline CI/CD en utilisant le LLM de votre choix au coût de votre propre fournisseur d'IA. Intlayer propose également un **compilateur** pour automatiser l'extraction de contenu, ainsi qu'une [plateforme web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) pour vous aider à **traduire en arrière-plan**.

</Accordion>

<Accordion header="Performances">

Associer de gros fichiers JSON à vos composants peut ralentir les performances et impacter la réactivité. Intlayer optimise le chargement du contenu directement au moment du **build**.

</Accordion>

<Accordion header="Collaboration avec les non-développeurs">

Bien plus qu'une simple solution i18n, Intlayer propose un **[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)** auto-hébergé et un **[CMS complet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)** pour gérer votre contenu multilingue en **temps réel**. Cela rend la collaboration avec les traducteurs, concepteurs-rédacteurs et autres membres de l'équipe extrêmement simple. Le contenu peut être stocké localement et/ou à distance.

</Accordion>
</AccordionGroup>

---

## Guide étape par étape pour configurer Intlayer dans une application Nuxt

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">

<iframe title="Comment traduire votre application Nuxt et Vue avec Intlayer ? Découvrez Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-nuxt-4-template) sur GitHub.

<Steps>

<Step number={1} title="Installer les dépendances">

Installez les paquets nécessaires avec npm :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> l'indicateur `--interactive` est facultatif. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation, et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **vue-intlayer**
  Le package qui intègre Intlayer avec l'application Vue. Il fournit les composables pour les composants Vue.

- **nuxt-intlayer**
  Le module Nuxt qui intègre Intlayer avec les applications Nuxt. Il fournit une configuration automatique, un middleware pour la détection de la locale, la gestion des cookies, et la redirection des URL.

</Step>

<Step number={2} title="Configuration de votre projet">

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URLs localisées, la redirection via middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et bien plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={3} title="Intégrer Intlayer dans votre configuration Nuxt">

Ajoutez le module intlayer à votre configuration Nuxt :

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Votre configuration Nuxt existante
  modules: ["nuxt-intlayer"],
});
```

> Le module `nuxt-intlayer` gère automatiquement l'intégration d'Intlayer avec Nuxt. Il configure la construction des déclarations de contenu, surveille les fichiers en mode développement, fournit un middleware pour la détection de la locale, et gère le routage localisé.

</Step>

<Step number={4} title="Déclarez Votre Contenu">

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension des fichiers de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Pour plus de détails, consultez la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

</Step>

<Step number={5} title="Utilisez Intlayer dans votre code">

Accédez à vos dictionnaires de contenu dans toute votre application Nuxt en utilisant le composable `useIntlayer` :

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld");
const countRef = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <p>
    <checkOut />
    <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank"
      >Nuxt</a
    >, <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Accès au contenu dans Intlayer

Intlayer propose différentes API pour accéder à votre contenu :

- **Syntaxe basée sur les composants** (recommandée) :
  Utilisez la syntaxe `<myContent />`, ou `<Component :is="myContent" />` pour rendre le contenu en tant que nœud Intlayer. Cela s'intègre parfaitement avec l'[Éditeur Visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) et le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

- **Syntaxe basée sur les chaînes** :
  Utilisez `{{ myContent }}` pour afficher le contenu en texte brut, sans support de l'Éditeur Visuel.

- **Syntaxe HTML brute** :
  Utilisez `<div v-html="myContent" />` pour afficher le contenu en HTML brut, sans support de l'Éditeur Visuel.

- **Syntaxe de déstructuration** :
  Le composable `useIntlayer` retourne un Proxy contenant le contenu. Ce proxy peut être déstructuré pour accéder au contenu tout en conservant la réactivité.
  - Utilisez `const content = useIntlayer("myContent");` et `{{ content.myContent }}` / `<content.myContent />`.
  - Ou utilisez `const { myContent } = useIntlayer("myContent");` et `{{ myContent}}` / `<myContent/>` pour déstructurer le contenu.

</Step>

<Step number={6} title="Changer la langue de votre contenu" isOptional={true}>

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le composable `useLocale`. Cette fonction vous permet de définir la locale de l'application et de mettre à jour le contenu en conséquence.

Créez un composant pour basculer entre les langues en utilisant `NuxtLink`. **Utiliser des liens plutôt que des boutons pour le changement de locale est une bonne pratique pour le SEO et la découvrabilité des pages**, car cela permet aux moteurs de recherche d'explorer et d'indexer toutes les versions localisées de vos pages :

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt importe automatiquement useRoute
const route = useRoute();
const { locale, availableLocales, setLocale } = useLocale();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeEl in availableLocales"
      :key="localeEl"
      :to="getLocalizedUrl(route.fullPath, localeEl)"
      class="locale-link"
      :class="{ 'active-locale': localeEl === locale }"
      @click="setLocale(localeEl)"
    >
      {{ getLocaleName(localeEl) }}
    </NuxtLink>
  </nav>
</template>
```

> Utiliser `NuxtLink` avec des attributs `href` appropriés (via `getLocalizedUrl`) garantit que les moteurs de recherche peuvent découvrir toutes les variantes linguistiques de vos pages. Cela est préférable au changement de langue uniquement via JavaScript, que les robots des moteurs de recherche peuvent ne pas suivre.

Ensuite, configurez votre `app.vue` pour utiliser des layouts :

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</Step>

<Step number={7} title="Ajouter le routage localisé à votre application" isOptional={true}>

Nuxt gère automatiquement le routage localisé lorsqu'on utilise le module `nuxt-intlayer`. Cela crée des routes pour chaque langue automatiquement en fonction de la structure de votre répertoire pages.

Exemple :

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Pour créer des pages localisées, il suffit de créer vos fichiers Vue dans le répertoire `pages/`. Voici deux exemples de pages :

**Page d'accueil (`pages/index.vue`) :**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.raw,
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**Page À propos (`pages/about.vue`) :**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Utiliser .raw pour accéder à la chaîne primitive
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Utilisez .raw pour accéder à la chaîne primitive
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Remarque : `useHead` est importé automatiquement dans Nuxt. Vous pouvez accéder aux valeurs du contenu en utilisant soit `.value` (réactif) soit `.raw` (chaîne primitive) selon vos besoins.

Le module `nuxt-intlayer` fera automatiquement :

- Détecter la locale préférée de l'utilisateur
- Gérer le changement de locale via l'URL
- Définir l'attribut `<html lang="">` approprié
- Gérer les cookies de locale
- Rediriger les utilisateurs vers l'URL localisée appropriée

</Step>

<Step number={8} title="Création d'un composant de lien localisé" isOptional={true}>

Pour garantir que la navigation de votre application respecte la locale actuelle, vous pouvez créer un composant personnalisé `Links`. Ce composant préfixe automatiquement les URLs internes avec la langue courante, ce qui est essentiel pour le **SEO et la découvrabilité des pages**.

```vue fileName="components/Links.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

interface Props {
  href: string;
  locale?: string;
}

const props = defineProps<Props>();

const { locale: currentLocale } = useLocale();

// Calculer le chemin final
const finalPath = computed(() => {
  // 1. Vérifier si le lien est externe
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Si externe, retourner tel quel (NuxtLink gère la génération de la balise <a>)
  if (isExternal) return props.href;

  // 3. Si le lien est interne, localiser l'URL
  const targetLocale = props.locale || currentLocale.value;
  return getLocalizedUrl(props.href, targetLocale);
});
</script>

<template>
  <NuxtLink :to="finalPath" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>
```

Ensuite, utilisez ce composant dans toute votre application :

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Accueil</Links>
    <Links href="/about">À propos</Links>
  </div>
</template>
```

> En utilisant `NuxtLink` avec des chemins localisés, vous vous assurez que :
>
> - Les moteurs de recherche peuvent explorer et indexer toutes les versions linguistiques de vos pages
> - Les utilisateurs peuvent partager directement des URLs localisées
> - L'historique du navigateur fonctionne correctement avec des URLs préfixées par la locale

</Step>

<Step number={9} title="Gérer les métadonnées et le SEO" isOptional={true}>

Nuxt offre d'excellentes capacités SEO via le composable `useHead` (auto-importé). Vous pouvez utiliser Intlayer pour gérer les métadonnées localisées en utilisant l'accesseur `.raw` ou `.value` pour obtenir la valeur primitive de chaîne :

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead est auto-importé dans Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Utilisez .raw pour accéder à la chaîne primitive
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Utilisez .raw pour accéder à la chaîne primitive
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Alternativement, vous pouvez utiliser la fonction `import { getIntlayer } from "intlayer"` pour obtenir le contenu sans la réactivité de Vue.

> **Accéder aux valeurs du contenu :**
>
> - Utilisez `.raw` pour obtenir la valeur primitive de la chaîne (non réactive)
> - Utilisez `.value` pour obtenir la valeur réactive
> - Utilisez la syntaxe composant `<content.key />` pour le support de l'éditeur visuel

Créez la déclaration de contenu correspondante :

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros"
      }
    }
  }
}
```

</Step>

<Step number="6b" title="Créer une mise en page avec Navigation" isOptional={true}>

Les layouts Nuxt vous permettent de définir une structure commune pour vos pages. Créez un layout par défaut qui inclut le sélecteur de locale et la navigation :

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Accueil</Links>
    <Links href="/about">À propos</Links>
  </div>
</template>
```

Le composant `Links` (montré ci-dessous) garantit que les liens de navigation interne sont automatiquement localisés.

</Step>

</Steps>

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les committer dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes dans votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l’**extension officielle Intlayer pour VS Code**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d’erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l’utilisation de l’extension, consultez la [documentation de l’extension Intlayer pour VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l’[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser une application Nuxt ?">

Deux options réalistes :

- **`@nuxtjs/i18n`** : le module établi, bâti sur `vue-i18n`, avec des fichiers de locale chargés par page et une large surface de configuration.
- **`Intlayer`** : contenu déclaré à côté de chaque composant et compilé au moment du build, entièrement typé, avec routage sensible à la locale, traduction par IA, un éditeur visuel et un CMS.

La différence est l'endroit où vit le contenu. `@nuxtjs/i18n` le centralise dans des fichiers `locales/*.json`, tandis qu'Intlayer le co-localise avec le composant qui l'affiche, si bien qu'une page ne livre que les entrées qu'elle utilise et qu'un dossier de fonctionnalité peut être déplacé ou supprimé d'un seul bloc. Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) et le [benchmark Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/vue.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle Nuxt ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Le balisage rendu côté serveur résout son contenu sur le serveur, et le compilateur au moment du build remplace les appels `useIntlayer` par les entrées de dictionnaire exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées sont éliminées, et les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/vue.md).

</Question>

<Question title="Puis-je migrer depuis `@nuxtjs/i18n` ou `vue-i18n` sans réécrire mes composants ?">

Oui, et il existe deux voies. Vous pouvez migrer le contenu progressivement avec le [guide de migration @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_nuxtjs_i18n_to_intlayer.md). Ou vous pouvez conserver entièrement votre API actuelle : les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) exposent exactement la même API que `vue-i18n`, mais servie par des dictionnaires Intlayer : seuls les imports changent, pas le code des composants.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non. Lancez `npx intlayer extract` et Intlayer lit vos fichiers source, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une. Voir la [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md).

Pour un pipeline entièrement automatisé, le [compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) fait la même chose au moment du build sur du code source JSX, TSX, Vue et Svelte, en générant les dictionnaires à chaque changement, de sorte qu'il n'y a aucune clé à maintenir à la main. Il fonctionne par analyse statique : les chaînes qui n'existent qu'à l'exécution restent hors de portée, et il a besoin de quelques annotations pour distinguer le texte destiné aux utilisateurs de la logique applicative.

</Question>

<Question title="Quels outils d'éditeur et d'agent IA sont disponibles ?">

Cinq éléments, tous optionnels :

- **[Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)** : passez d'une clé `useIntlayer` au fichier de contenu qui la déclare, extrayez du contenu depuis un composant, et lancez build, fill, test, push et pull depuis la palette de commandes ou un onglet Intlayer dédié.
- **[Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)** : la même connaissance dans tout éditeur qui parle LSP, avec aller à la définition, rechercher toutes les références, aperçus au survol d'une valeur traduite, autocomplétion des clés et des champs, et un avertissement lorsqu'une clé n'est déclarée nulle part. Il résout aussi les appels `i18next`, `react-i18next`, `next-intl` et `use-intl`, ce qui aide pendant la migration.
- **[Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** : expose la documentation et la CLI d'Intlayer à Cursor, VS Code, Claude Desktop, Claude Code et ChatGPT, afin qu'un assistant réponde à partir de la documentation actuelle au lieu de deviner, et puisse exécuter lui-même des commandes telles que `intlayer fill`.
- **[Compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)** : des compétences ciblées telles que `intlayer-config`, `intlayer-cli` et `intlayer-content`, plus une par framework, qui apprennent à un agent votre configuration de routage et les types de nœuds de contenu.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)** : `no-raw-text` signale les chaînes codées en dur, avec d'autres règles pour les clés de dictionnaire statiques et le contenu inutilisé.

</Question>

<Question title="Intlayer fonctionne-t-il avec le rendu côté serveur et la génération statique de Nuxt ?">

Oui. Le contenu se résout pendant le SSR et pendant `nuxt generate`, si bien que les pages prérendues contiennent le balisage traduit plutôt que de récupérer un catalogue sur le client. Le module `nuxt-intlayer` câble le provider et la détection de locale pour vous.

</Question>

<Question title="Dois-je mettre la locale dans l'URL ?">

Non. `routing.mode` accepte `"prefix-no-default"` (la valeur par défaut, `/about` et `/fr/about`), `"prefix-all"`, `"no-prefix"` et `"search-params"`, et `routing.domains` associe chaque locale à son propre domaine. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Comment gérer les métadonnées SEO et les balises hreflang dans Nuxt ?">

L'étape 9 de ce guide le couvre. Les métadonnées `useHead` localisées proviennent de vos dictionnaires, et `getMultilingualUrls` construit les alternates `hreflang` pour chaque locale déclarée, y compris `x-default`, ce qui alimente aussi un sitemap localisé.

</Question>

<Question title="Comment construire un sélecteur de langue qui conserve la page courante ?">

Utilisez `useLocale` pour la locale active et les locales disponibles, et le composant de lien localisé de l'étape 8 afin que la navigation reste dans la langue courante. `getLocalizedUrl` réécrit le chemin actuel dans la locale cible, si bien que le changement de langue garde le lecteur sur la même route.

</Question>

<Question title="Comment traduire une application Nuxt automatiquement avec l'IA ?">

Lancez `npx intlayer fill`. Les traductions manquantes sont remplies avec le LLM de votre choix en utilisant votre propre fournisseur et votre clé d'API, et `--git-diff` limite l'exécution au contenu modifié sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Intlayer prend-il en charge les pluriels, le genre et le texte enrichi dans les templates Vue ?">

Oui : les [formes plurielles](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md), le [contenu basé sur le genre](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md), les conditions, les [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md), le [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md) et les [formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) pour les nombres, les dates et les devises.

</Question>

<Question title="Comment les traducteurs peuvent-ils modifier le contenu sans toucher au code ?">

Via l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), qui tourne sur votre propre infrastructure et permet à quiconque de modifier le texte sur place sur l'application en cours d'exécution, ou le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), qui externalise le contenu afin qu'il puisse changer sans déploiement.

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le CMS hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
