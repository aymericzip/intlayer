---
docName: intlayer_with_vite_vue
url: https://intlayer.org/doc/environment/vite-and-vue
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md
createdAt: 2025-04-18
updatedAt: 2025-04-18
title: Traduire votre site web Vite et Vue (i18n)
description: Découvrez comment rendre votre site web avec Vite et Vue multilingue. Suivez la documentation pour l’internationaliser (i18n) et le traduire.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Vite
  - Vue
  - JavaScript
---

# Commencer avec l'internationalisation (i18n) avec Intlayer, Vite et Vue

> Ce package est en développement. Voir le [problème](https://github.com/aymericzip/intlayer/issues/113) pour plus d'informations. Montrez votre intérêt pour Intlayer pour Vue en aimant le problème.

<!-- Voir [Modèle d'application](https://github.com/aymericzip/intlayer-vue-template) sur GitHub. -->

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier la prise en charge multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de langue.

---

## Guide étape par étape pour configurer Intlayer dans une application Vite et Vue

### Étape 1 : Installer les dépendances

Installez les packages nécessaires en utilisant npm :

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion des configurations, les traductions, [la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

- **vue-intlayer**
  Le package qui intègre Intlayer avec l'application Vue. Il fournit des fournisseurs de contexte et des composables pour l'internationalisation Vue.

- **vite-intlayer**
  Inclut le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et gérer la redirection des URL.

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
};

module.exports = config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, la redirection middleware, les noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les journaux Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Vite

Ajoutez le plugin intlayer dans votre configuration.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

> Le plugin `intlayerPlugin()` de Vite est utilisé pour intégrer Intlayer avec Vite. Il garantit la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Vite. De plus, il fournit des alias pour optimiser les performances.

### Étape 4 : Déclarez votre contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
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
    officialStarter: t({
      fr: ", le starter officiel Vue + Vite",
      en: ", the official Vue + Vite starter",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      en: "Learn more about IDE Support for Vue in the ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      fr: "Vue Docs Scaling up Guide",
      en: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      en: "Click on the Vite and Vue logos to learn more",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.mjs" contentDeclarationFormat="esm"
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
    officialStarter: t({
      fr: "le starter officiel Vue + Vite",
      en: "the official Vue + Vite starter",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      en: "Learn more about IDE Support for Vue in the ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      fr: "Vue Docs Scaling up Guide",
      en: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      en: "Click on the Vite and Vue logos to learn more",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/* @type {import('intlayer').Dictionary} */ const appContent = {
  key: "helloworld",
  content: {
    count: t({ fr: "le compte est ", en: "count is ", es: "el recuento es " }),
    edit: t({
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ fr: "Vérifiez ", en: "Check out ", es: "Compruebe " }),
    officialStarter: t({
      fr: "le starter officiel Vue + Vite",
      en: "the official Vue + Vite starter",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      en: "Learn more about IDE Support for Vue in the ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      fr: "Vue Docs Scaling up Guide",
      en: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      en: "Click on the Vite and Vue logos to learn more",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
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
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "fr": "le starter officiel Vue + Vite",
        "en": "the official Vue + Vite starter",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "en": "Learn more about IDE Support for Vue in the ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "fr": "Vue Docs Scaling up Guide",
        "en": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "en": "Click on the Vite and Vue logos to learn more",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Pour plus de détails, consultez la [documentation sur les déclarations de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

### Étape 5 : Utiliser Intlayer dans votre code

Pour utiliser les fonctionnalités d'internationalisation d'Intlayer dans votre application Vue, vous devez d'abord enregistrer l'instance singleton Intlayer dans votre fichier principal. Cette étape est cruciale car elle fournit le contexte d'internationalisation à tous les composants de votre application, rendant les traductions accessibles partout dans votre arbre de composants.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Injecter le fournisseur au niveau supérieur
installIntlayer(app);

// Monter l'application
app.mount("#app");
```

Accédez à vos dictionnaires de contenu dans toute votre application en créant un composant Vue principal et en utilisant les composables `useIntlayer` :

```vue fileName="src/HelloWord.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const content = useIntlayer("helloworld");
const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">
      {{ content.count }}{{ count }}
    </button>
    <p v-html="content.edit.value"></p>
  </div>

  <p>
    {{ content.checkOut }}
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, {{ content.officialStarter }}
  </p>
  <p>
    {{ content.learnMore }}
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >{{ content.vueDocs }}</a
    >.
  </p>
  <p class="read-the-docs">{{ content.readTheDocs }}</p>
</template>
```

#### Accéder au contenu dans Intlayer Intlayer propose différentes API pour

accéder à votre contenu : - **Syntaxe basée sur les composants** (recommandé) :
Utilisez la syntaxe `<monContenu />`, ou `<Component :is="monContenu" />` pour rendre le contenu en tant que Nœud Intlayer. Cela s'intègre de manière
transparente avec l'[Éditeur
Visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)
et le
[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

- **Syntaxe basée sur les chaînes de caractères** : Utilisez `{{ monContenu }}`
  pour rendre le contenu en tant que texte brut, sans prise en charge de l'Éditeur
  Visuel.

- **Syntaxe HTML brute** : Utilisez `
<div v-html="monContenu" />
` pour rendre le contenu en tant que HTML brut, sans prise en charge de
l'Éditeur Visuel.

- **Syntaxe de déstructuration** : Le composable `useIntlayer`
  retourne un Proxy avec le contenu. Ce proxy peut être déstructuré pour accéder
  au contenu tout en conservant la réactivité.
- Utilisez `const content = useIntlayer("monContenu");` et `{{ content.monContenu }}` / `<content.monContenu />`.
- Ou utilisez `const { monContenu } = useIntlayer("monContenu");` et `{{ monContenu }}` / `<monContenu />` pour déstructurer le contenu.

### (Optionnel) Étape 6 : Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la
fonction `setLocale` fournie par le composable `useLocale`. Cette fonction vous
permet de définir la locale de l'application et de mettre à jour le contenu en
conséquence. Créez un composant pour basculer entre les langues :

```vue fileName="src/components/LocaleSwitcher.vue"
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

// Obtenir les informations de locale et la fonction setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Suivre la locale sélectionnée avec un ref
const selectedLocale = ref(locale.value);

// Mettre à jour la locale lorsque la sélection change
const changeLocale = () => setLocale(selectedLocale.value);

// Garder selectedLocale synchronisé avec la locale globale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Ensuite, utilisez ce composant dans votre App.vue :

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Créer le fichier de déclaration Intlayer correspondant
</script>

<template>
  <div>
    <LocaleSwitcher />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="content.viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" :alt="content.vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="content.title" />
</template>
```

### (Optionnel) Étape 7 : Ajouter un routage localisé à votre application

Ajouter un routage localisé dans une application Vue implique généralement d'utiliser Vue Router avec des préfixes de locale. Cela permet de créer des routes uniques pour chaque langue, ce qui est utile pour le SEO et des URLs conviviales pour les moteurs de recherche.

Exemple :

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Tout d'abord, installez Vue Router :

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

Ensuite, créez une configuration de routeur qui gère le routage basé sur les locales :

```js fileName="src/router/index.ts"
import {
  configuration,
  getPathWithoutLocale,
  localeFlatMap,
  type Locales,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

// Obtenez la configuration d'internationalisation
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Déclarez les routes avec des chemins et des métadonnées spécifiques aux locales.
 */
const routes = localeFlatMap((localizedData) => [
  {
    path: `${localizedData.urlPrefix}/`,
    name: `Root-${localizedData.locale}`,
    component: RootView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: `${localizedData.urlPrefix}/home`,
    name: `Home-${localizedData.locale}`,
    component: HomeView,
    meta: {
      locale: localizedData.locale,
    },
  },
]);

// Créez l'instance du routeur
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Ajoutez une garde de navigation pour gérer les locales
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Réutilisez la locale définie dans les métadonnées de la route
    client.setLocale(metaLocale);
    next();
  } else {
    // Alternative : aucune locale dans les métadonnées, route potentiellement non correspondante
    // Optionnel : gérer une 404 ou rediriger vers la locale par défaut
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> Le nom est utilisé pour identifier la route dans le routeur. Il doit être unique pour toutes les routes afin d'éviter les conflits et d'assurer une navigation et un lien corrects.

Ensuite, enregistrez le routeur dans votre fichier main.js :

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Ajoutez le routeur à l'application
app.use(router);

// Montez l'application
app.mount("#app");
```

Ensuite, mettez à jour votre fichier `App.vue` pour afficher le composant RouterView. Ce composant affichera le composant correspondant à la route actuelle.

```vue fileName="src/App.vue"
<script setup lang="ts">
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
</script>

<template>
  <nav>
    <LocaleSwitcher />
  </nav>
  <RouterView />
</template>
```

Parallèlement, vous pouvez également utiliser le `intLayerMiddlewarePlugin` pour ajouter un routage côté serveur à votre application. Ce plugin détectera automatiquement la locale actuelle en fonction de l'URL et définira le cookie de locale approprié. Si aucune locale n'est spécifiée, le plugin déterminera la locale la plus appropriée en fonction des préférences de langue du navigateur de l'utilisateur. Si aucune locale n'est détectée, il redirigera vers la locale par défaut.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optionnel) Étape 8 : Modifier l'URL lorsque la locale change

Pour mettre à jour automatiquement l'URL lorsque l'utilisateur change de langue, vous pouvez modifier le composant `LocaleSwitcher` pour utiliser Vue Router :

```vue fileName="src/components/LocaleSwitcher.vue"
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
import { useRouter } from "vue-router";
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Obtenez Vue Router
const router = useRouter();

// Obtenez les informations de locale et la fonction setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Obtenez la route actuelle et créez une URL localisée
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Naviguez vers la route localisée sans recharger la page
    router.push(localizedPath);
  },
});

// Suivez la locale sélectionnée avec une référence
const selectedLocale = ref(locale.value);

// Mettez à jour la locale lorsque la sélection change
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Gardez selectedLocale synchronisé avec la locale globale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Astuce : Pour un meilleur SEO et une meilleure accessibilité, utilisez des balises comme `<a href="/fr/home" hreflang="fr">` pour lier des pages localisées, comme indiqué à l'Étape 10. Cela permet aux moteurs de recherche de découvrir et d'indexer correctement les URL spécifiques à chaque langue. Pour préserver le comportement SPA, vous pouvez empêcher la navigation par défaut avec @click.prevent, changer la locale en utilisant useLocale, et naviguer de manière programmatique avec Vue Router.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Passer à l'anglais"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <div><span dir="ltr" lang="en">English</span><span>English</span></div>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Passer à l'espagnol"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span><span>Espagnol</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Optionnel) Étape 9 : Modifier les attributs de langue et de direction HTML

Lorsque votre application prend en charge plusieurs langues, il est crucial de mettre à jour les attributs `lang` et `dir` de la balise `<html>` pour correspondre à la locale actuelle. Cela garantit :

- **Accessibilité** : Les lecteurs d'écran et les technologies d'assistance s'appuient sur l'attribut `lang` correct pour prononcer et interpréter le contenu avec précision.
- **Rendu du texte** : L'attribut `dir` (direction) garantit que le texte est rendu dans le bon ordre (par exemple, de gauche à droite pour l'anglais, de droite à gauche pour l'arabe ou l'hébreu), ce qui est essentiel pour la lisibilité.
- **SEO** : Les moteurs de recherche utilisent l'attribut `lang` pour déterminer la langue de votre page, aidant à fournir le bon contenu localisé dans les résultats de recherche.

En mettant à jour ces attributs dynamiquement lorsque la locale change, vous garantissez une expérience cohérente et accessible pour les utilisateurs dans toutes les langues prises en charge.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable qui met à jour les attributs `lang` et `dir` de l'élément HTML <html>
 * en fonction de la locale actuelle.
 *
 * @example
 * // Dans votre App.vue ou un composant global
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // Met à jour les attributs HTML chaque fois que la locale change
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Met à jour l'attribut de langue
      document.documentElement.lang = newLocale;

      // Définit la direction du texte (ltr pour la plupart des langues, rtl pour l'arabe, l'hébreu, etc.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
}
```

Utilisez ce composable dans votre `App.vue` ou un composant global :

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Applique les attributs HTML en fonction de la locale actuelle
useI18nHTMLAttributes();
</script>

<template>
  <!-- Votre template d'application -->
</template>
```

### (Optionnel) Étape 10 : Création d'un composant de lien localisé

Pour garantir que la navigation de votre application respecte la locale actuelle, vous pouvez créer un composant `Link` personnalisé. Ce composant préfixe automatiquement les URL internes avec la langue actuelle. Par exemple, lorsqu'un utilisateur francophone clique sur un lien vers la page "À propos", il est redirigé vers `/fr/about` au lieu de `/about`.

Ce comportement est utile pour plusieurs raisons :

- **SEO et Expérience Utilisateur** : Les URL localisées aident les moteurs de recherche à indexer correctement les pages spécifiques à une langue et fournissent aux utilisateurs un contenu dans leur langue préférée.
- **Cohérence** : En utilisant un lien localisé dans toute votre application, vous garantissez que la navigation reste dans la locale actuelle, évitant ainsi des changements de langue inattendus.
- **Maintenabilité** : Centraliser la logique de localisation dans un seul composant simplifie la gestion des URL, rendant votre base de code plus facile à maintenir et à étendre à mesure que votre application se développe.

```vue fileName="src/components/Link.vue"
<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Vérifie si le lien est externe
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Crée un href localisé pour les liens internes
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Pour une utilisation avec Vue Router, créez une version spécifique au routeur :

```vue fileName="src/components/RouterLink.vue"
<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// Crée une propriété 'to' localisée pour router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Si 'to' est un objet, localise la propriété path
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

Utilisez ces composants dans votre application :

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router  -->
    <RouterLink to="/">Racine</RouterLink>
    <RouterLink to="/home">Accueil</RouterLink>
    <!-- Autres -->
    <Link href="/">Racine</Link>
    <Link href="/home">Accueil</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour tirer parti de TypeScript et renforcer votre base de code.

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

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'extension officielle **Intlayer VS Code Extension**.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement des traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

## Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).
