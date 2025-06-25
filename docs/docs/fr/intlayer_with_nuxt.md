---
docName: intlayer_with_nuxt
url: https://intlayer.org/doc/environment/nuxt-and-vue
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nuxt.md
createdAt: 2025-06-18
updatedAt: 2025-06-18
title: Traduire votre site web Nuxt et Vue (i18n)
description: Découvrez comment rendre votre site web avec Nuxt et Vue multilingue. Suivez la documentation pour l'internationaliser (i18n) et le traduire.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
---

# Commencer avec l'internationalisation (i18n) avec Intlayer et Nuxt

Voir [Modèle d'application](https://github.com/aymericzip/intlayer-nuxt-template) sur GitHub.

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque open-source innovante d'internationalisation (i18n) conçue pour simplifier le support multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types autogénérés, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de langue.

---

## Guide étape par étape pour configurer Intlayer dans une application Nuxt

### Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant npm :

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

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion des configurations, les traductions, [la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

- **vue-intlayer**
  Le package qui intègre Intlayer avec une application Vue. Il fournit les composables pour les composants Vue.

- **nuxt-intlayer**
  Le module Nuxt qui intègre Intlayer avec les applications Nuxt. Il offre une configuration automatique, un middleware pour la détection de langue, la gestion des cookies et la redirection des URL.

### Étape 2 : Configuration de votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalisation: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalisation: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalisation: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres langues
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
  },
};

module.exports = config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer les URL localisées, la redirection via middleware, les noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Nuxt

Ajoutez le module intlayer à votre configuration Nuxt :

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Votre configuration Nuxt existante
  modules: ["nuxt-intlayer"],
});
```

> Le module `nuxt-intlayer` gère automatiquement l'intégration d'Intlayer avec Nuxt. Il configure la construction des déclarations de contenu, surveille les fichiers en mode développement, fournit un middleware pour la détection de langue et gère le routage localisé.

### Étape 4 : Déclarer votre contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ fr: "le compte est ", en: "count is ", es: "el recuento es " }),
    edit: t({
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ fr: "Vérifiez ", en: "Check out ", es: "Compruebe " }),
    nuxtIntlayer: t({
      fr: "Documentation de Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      fr: "En savoir plus sur Nuxt dans la ",
      en: "Learn more about Nuxt in the ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      fr: "Documentation Nuxt",
      en: "Nuxt Documentation",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      en: "Click on the Nuxt logo to learn more",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ fr: "le compte est ", en: "count is ", es: "el recuento es " }),
    edit: t({
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ fr: "Vérifiez ", en: "Check out ", es: "Compruebe " }),
    nuxtIntlayer: t({
      fr: "Documentation de Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      fr: "En savoir plus sur Nuxt dans la ",
      en: "Learn more about Nuxt in the ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      fr: "Documentation Nuxt",
      en: "Nuxt Documentation",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      en: "Click on the Nuxt logo to learn more",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ fr: "le compte est ", en: "count is ", es: "el recuento es " }),
    edit: t({
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ fr: "Vérifiez ", en: "Check out ", es: "Compruebe " }),
    nuxtIntlayer: t({
      fr: "Documentation de Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      fr: "En savoir plus sur Nuxt dans la ",
      en: "Learn more about Nuxt in the ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      fr: "Documentation Nuxt",
      en: "Nuxt Documentation",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      en: "Click on the Nuxt logo to learn more",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="components/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "fr": "le compte est ",
        "en": "count is ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "fr": "Vérifiez ",
        "en": "Check out ",
        "es": "Compruebe "
      }
    },
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "fr": "Documentation de Nuxt Intlayer",
        "en": "Nuxt Intlayer documentation",
        "es": "Documentación de Nuxt Intlayer"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "fr": "En savoir plus sur Nuxt dans la ",
        "en": "Learn more about Nuxt in the ",
        "es": "Aprenda más sobre Nuxt en la "
      }
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "fr": "Documentation Nuxt",
        "en": "Nuxt Documentation",
        "es": "Documentación de Nuxt"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "fr": "Cliquez sur le logo Nuxt pour en savoir plus",
        "en": "Click on the Nuxt logo to learn more",
        "es": "Haga clic en el logotipo de Nuxt para obtener más información"
      }
    }
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Pour plus de détails, consultez la [documentation sur les déclarations de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

### Étape 5 : Utiliser Intlayer dans votre code

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

#### Accéder au contenu dans Intlayer

Intlayer propose deux API pour accéder à votre contenu :

- **Syntaxe basée sur les composants** (recommandée) :
  Utilisez la syntaxe `<myContent />` ou `<Component :is="myContent" />` pour rendre le contenu en tant que nœud Intlayer. Cela s'intègre parfaitement avec l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) et le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

- **Syntaxe basée sur les chaînes** :
  Utilisez `{{ myContent }}` pour rendre le contenu sous forme de texte brut, sans support pour l'éditeur visuel.

- **Syntaxe HTML brute** :
  Utilisez `<div v-html="myContent" />` pour rendre le contenu en tant que HTML brut, sans support pour l'éditeur visuel.

- **Syntaxe de déstructuration** :
  Le composable `useIntlayer` retourne un Proxy avec le contenu. Ce proxy peut être déstructuré pour accéder au contenu tout en conservant la réactivité.
  - Utilisez `const content = useIntlayer("myContent");` et `{{ content.myContent }}` / `<content.myContent />`.
  - Ou utilisez `const { myContent } = useIntlayer("myContent");` et `{{ myContent }}` / `<myContent />` pour déstructurer le contenu.

### (Optionnel) Étape 6 : Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le composable `useLocale`. Cette fonction vous permet de définir la langue de l'application et de mettre à jour le contenu en conséquence.

Créez un composant pour basculer entre les langues :

```vue fileName="components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getLocaleName } from "intlayer";
import { useLocale } from "vue-intlayer";

// Obtenir les informations de langue et la fonction setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Suivre la langue sélectionnée avec une référence
const selectedLocale = ref(locale.value);

// Mettre à jour la langue lorsque la sélection change
const changeLocale = () => setLocale(selectedLocale.value);

// Garder selectedLocale synchronisé avec la langue globale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
</template>

<style scoped>
.locale-switcher {
  margin: 1rem 0;
}

select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
</style>
```

Ensuite, utilisez ce composant dans vos pages ou votre mise en page :

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // Créez un fichier de déclaration Intlayer associé
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
```

### (Optionnel) Étape 7 : Ajouter un routage localisé à votre application

Nuxt gère automatiquement le routage localisé lorsque vous utilisez le module `nuxt-intlayer`. Cela crée des routes pour chaque langue automatiquement en fonction de la structure de votre répertoire de pages.

Exemple :

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Pour créer une page localisée, créez simplement vos fichiers Vue dans le répertoire `pages/` :

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about");
</script>

<template>
  <div>
    <h1>{{ content.title }}</h1>
    <p>{{ content.description }}</p>
  </div>
</template>
```

Le module `nuxt-intlayer` effectuera automatiquement :

- La détection de la langue préférée de l'utilisateur
- La gestion du changement de langue via l'URL
- La définition de l'attribut `<html lang="">` approprié
- La gestion des cookies de langue
- La redirection des utilisateurs vers l'URL localisée appropriée

### (Optionnel) Étape 8 : Créer un composant de lien localisé

Pour garantir que la navigation de votre application respecte la langue actuelle, vous pouvez créer un composant `LocalizedLink` personnalisé. Ce composant préfixe automatiquement les URL internes avec la langue actuelle.

```vue fileName="components/LocalizedLink.vue"
<template>
  <NuxtLink :to="localizedHref" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Vérifiez si le lien est externe
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// Créez un href localisé pour les liens internes
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

Ensuite, utilisez ce composant dans toute votre application :

```vue fileName="pages/index.vue"
<template>
  <div>
    <LocalizedLink to="/about">
      {{ content.aboutLink }}
    </LocalizedLink>

      {{ content.contactLink }}
    </LocalizedLink>
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocalizedLink from "~/components/LocalizedLink.vue";

const content = useIntlayer("home");
</script>
```

### (Optionnel) Étape 9 : Gérer les Métadonnées et le SEO

Nuxt offre d'excellentes capacités SEO. Vous pouvez utiliser Intlayer pour gérer les métadonnées localisées :

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";
import { getIntlayer } from "intlayer";
import { useLocale } from "vue-intlayer";

const { locale } = useLocale();
const content = getIntlayer("about-meta", locale.value);

useSeoMeta({
  title: content.title,
  description: content.description,
});
</script>

<template>
  <div>
    <h1>{{ content.pageTitle }}</h1>
    <p>{{ content.pageContent }}</p>
  </div>
</template>
```

Créez la déclaration de contenu correspondante :

```typescript fileName="pages/about-meta.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      fr: "À Propos - Ma Société",
      en: "About Us - My Company",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      fr: "En savoir plus sur notre société et notre mission",
      en: "Learn more about our company and our mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
} satisfies Dictionary<Parameters<typeof useSeoMeta>[0]>;

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.js" contentDeclarationFormat="cjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

module.exports = aboutMetaContent;
```

```json fileName="pages/about-meta.content.json" contentDeclarationFormat="json"
{
  "key": "about-meta",
  "content": {
    "title": {
      "nodeType": "translation",
      "translations": {
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre base de code.

![texte alternatif](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texte alternatif](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les ajouter à votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'extension officielle **Intlayer VS Code Extension**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Aller Plus Loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).
