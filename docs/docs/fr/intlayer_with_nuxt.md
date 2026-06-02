---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: Nuxt i18n - Guide complet pour traduire Nuxt
description: Meilleure solution pour la taille du bundle, le SEO, les performances & la maintenabilité. Rendez votre Nuxt and Vue site web multilingue en 2026, traduction LLM, Agent Skills & MCP.
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
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
bun x intlayer init
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

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension des fichiers de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

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

</Steps>

### (Optionnel) Étape 6b : Créer un layout avec navigation

Les layouts Nuxt vous permettent de définir une structure commune pour vos pages. Créez un layout par défaut qui inclut le sélecteur de langue et la navigation :

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

Le composant `Links` (montré ci-dessous) garantit que les liens de navigation internes sont automatiquement localisés.

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
