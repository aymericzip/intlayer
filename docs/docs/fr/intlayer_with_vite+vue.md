---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Comment traduire votre Vite and Vue – guide i18n 2025
description: Découvrez comment rendre votre site Vite et Vue multilingue. Suivez la documentation pour internationaliser (i18n) et traduire votre site.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vue-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Traduire votre Vite and Vue avec Intlayer | Internationalisation (i18n)

Voir le [Modèle d'application](https://github.com/aymericzip/intlayer-vite-vue-template) sur GitHub.

## Qu'est-ce que Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier la prise en charge multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de la langue.

---

## Guide étape par étape pour configurer Intlayer dans une application Vite et Vue

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires avec npm :

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md), la transpilation, et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

- **vue-intlayer**
  Le package qui intègre Intlayer avec l'application Vue. Il fournit des fournisseurs de contexte et des composables pour l'internationalisation Vue.

- **vite-intlayer**
  Inclut le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi que le middleware pour détecter la locale préférée de l'utilisateur, gérer les cookies et gérer la redirection des URL.

### Étape 2 : Configuration de votre projet

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Configuration de l'internationalisation
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Configuration de l'internationalisation
const config = {
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

module.exports = config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, la redirection via middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et bien plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Vite

Ajoutez le plugin intlayer dans votre configuration.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer()],
});
```

> Le plugin Vite `intlayer()` est utilisé pour intégrer Intlayer avec Vite. Il assure la génération des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer dans l'application Vite. De plus, il fournit des alias pour optimiser les performances.

### Étape 4 : Déclarez Votre Contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      fr: "Guide d'extension des docs Vue",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
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
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      fr: "Guide de montée en puissance des docs Vue",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Découvrez ", es: "Compruebe " }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      fr: "Guide de montée en puissance des docs Vue",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
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
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "en": "Check out ",
        "fr": "Consultez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Vue Docs Scaling up Guide",
        "fr": "Guide d'évolution des docs Vue",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Pour plus de détails, référez-vous à la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

### Étape 5 : Utiliser Intlayer dans votre code

Pour utiliser les fonctionnalités d'internationalisation d'Intlayer dans toute votre application Vue, vous devez d'abord enregistrer l'instance singleton d'Intlayer dans votre fichier principal. Cette étape est cruciale car elle fournit le contexte d'internationalisation à tous les composants de votre application, rendant les traductions accessibles partout dans votre arbre de composants.

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

const {
  count,
  edit,
  checkOut,
  officialStarter,
  learnMore,
  vueDocs,
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
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, <officialStarter />
  </p>
  <p>
    <learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Accéder au contenu dans Intlayer

Intlayer propose différentes API pour accéder à votre contenu :

- **Syntaxe basée sur les composants** (recommandée) :
  Utilisez la syntaxe `<myContent />` ou `<Component :is="myContent" />` pour rendre le contenu en tant que nœud Intlayer. Cela s'intègre parfaitement avec l'[Éditeur Visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) et le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

- **Syntaxe basée sur les chaînes de caractères** :
  Utilisez `{{ myContent }}` pour afficher le contenu en texte brut, sans support de l'Éditeur Visuel.

- **Syntaxe HTML brute** :
  Utilisez `<div v-html="myContent" />` pour afficher le contenu en HTML brut, sans support de l'Éditeur Visuel.

- **Syntaxe de déstructuration** :
  Le composable `useIntlayer` retourne un Proxy avec le contenu. Ce proxy peut être déstructuré pour accéder au contenu tout en conservant la réactivité.
  - Utilisez `const content = useIntlayer("myContent");` et `{{ content.myContent }}` / `<content.myContent />`.
  - Ou utilisez `const { myContent } = useIntlayer("myContent");` et `{{ myContent }}` / `<myContent/>` pour déstructurer le contenu.

### (Optionnel) Étape 6 : Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par le composable `useLocale`. Cette fonction vous permet de définir la locale de l'application et de mettre à jour le contenu en conséquence.

Créez un composant pour changer de langue :

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

const content = useIntlayer("app"); // Créez le fichier de déclaration intlayer associé
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

Ajouter un routage localisé dans une application Vue implique généralement d'utiliser Vue Router avec des préfixes de locale. Cela crée des routes uniques pour chaque langue, ce qui est utile pour le SEO et des URLs optimisées pour le référencement.

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

Ensuite, créez une configuration de routeur qui gère le routage basé sur la locale :

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

// Obtenir la configuration d'internationalisation
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Déclarez les routes avec des chemins et des métadonnées spécifiques à la locale.
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

// Ajoutez un garde de navigation pour la gestion des locales
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Réutiliser la locale définie dans les métadonnées de la route
    client.setLocale(metaLocale);
    next();
  } else {
    // Repli : pas de locale dans les métadonnées, route possiblement non trouvée
    // Optionnel : gérer les erreurs 404 ou rediriger vers la locale par défaut
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> Le nom est utilisé pour identifier la route dans le routeur. Il doit être unique parmi toutes les routes pour éviter les conflits et assurer une navigation et un lien corrects.

Ensuite, enregistrez le routeur dans votre fichier main.js :

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Ajouter le routeur à l'application
app.use(router);

// Monter l'application
app.mount("#app");
```

Mettez ensuite à jour votre fichier `App.vue` pour rendre le composant RouterView. Ce composant affichera le composant correspondant à la route actuelle.

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

Parallèlement, vous pouvez également utiliser le `intlayerMiddleware` pour ajouter un routage côté serveur à votre application. Ce plugin détectera automatiquement la locale actuelle en fonction de l'URL et définira le cookie de locale approprié. Si aucune locale n'est spécifiée, le plugin déterminera la locale la plus appropriée en fonction des préférences linguistiques du navigateur de l'utilisateur. Si aucune locale n'est détectée, il redirigera vers la locale par défaut.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerMiddleware } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddleware()],
});
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerMiddleware } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddleware()],
});
```

### (Optionnel) Étape 8 : Modifier l'URL lors du changement de langue

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

// Obtenir Vue Router
const router = useRouter();

// Obtenir les informations de locale et la fonction setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Obtenir la route actuelle et créer une URL localisée
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Naviguer vers la route localisée sans recharger la page
    router.push(localizedPath);
  },
});

// Suivre la locale sélectionnée avec un ref
const selectedLocale = ref(locale.value);

// Met à jour la locale lorsque la sélection change
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Synchronise selectedLocale avec la locale globale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Astuce : Pour un meilleur SEO et une meilleure accessibilité, utilisez des balises telles que `<a href="/fr/home" hreflang="fr">` pour lier les pages localisées, comme montré à l'étape 10. Cela permet aux moteurs de recherche de découvrir et d'indexer correctement les URL spécifiques à chaque langue. Pour préserver le comportement SPA, vous pouvez empêcher la navigation par défaut avec @click.prevent, changer la locale en utilisant useLocale, et naviguer de manière programmatique avec Vue Router.

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
        <span dir="ltr" lang="en">English</span>
        <span>Anglais</span>
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
        <span dir="ltr" lang="es">Español</span>
        <span>Espagnol</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Optionnel) Étape 9 : Modifier les attributs Lang et Dir du HTML

Lorsque votre application prend en charge plusieurs langues, il est crucial de mettre à jour les attributs `lang` et `dir` de la balise `<html>` pour qu'ils correspondent à la locale actuelle. Cela garantit :

- **Accessibilité** : Les lecteurs d'écran et les technologies d'assistance s'appuient sur l'attribut `lang` correct pour prononcer et interpréter le contenu avec précision.
- **Rendu du texte** : L'attribut `dir` (direction) garantit que le texte est affiché dans le bon ordre (par exemple, de gauche à droite pour l'anglais, de droite à gauche pour l'arabe ou l'hébreu), ce qui est essentiel pour la lisibilité.
- **SEO** : Les moteurs de recherche utilisent l'attribut `lang` pour déterminer la langue de votre page, aidant ainsi à proposer le contenu localisé approprié dans les résultats de recherche.

En mettant à jour ces attributs dynamiquement lorsque la locale change, vous garantissez une expérience cohérente et accessible pour les utilisateurs dans toutes les langues prises en charge.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable qui met à jour les attributs `lang` et `dir` de l'élément HTML <html>
 * en fonction de la locale courante.
 *
 * @example
 * // Dans votre App.vue ou un composant global
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Met à jour les attributs HTML à chaque changement de locale
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
};
```

Utilisez ce composable dans votre `App.vue` ou un composant global :

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Appliquez les attributs HTML en fonction de la locale actuelle
useI18nHTMLAttributes();
</script>

<template>
  <!-- Le template de votre application -->
</template>
```

### (Optionnel) Étape 10 : Création d’un composant de lien localisé

Pour garantir que la navigation de votre application respecte la locale actuelle, vous pouvez créer un composant personnalisé `Link`. Ce composant préfixe automatiquement les URL internes avec la langue courante. Par exemple, lorsqu'un utilisateur francophone clique sur un lien vers la page "À propos", il est redirigé vers `/fr/about` au lieu de `/about`.

Ce comportement est utile pour plusieurs raisons :

- **SEO et expérience utilisateur** : Les URL localisées aident les moteurs de recherche à indexer correctement les pages spécifiques à une langue et fournissent aux utilisateurs du contenu dans leur langue préférée.
- **Cohérence** : En utilisant un lien localisé dans toute votre application, vous garantissez que la navigation reste dans la locale actuelle, évitant ainsi des changements de langue inattendus.
- **Maintenabilité** : Centraliser la logique de localisation dans un seul composant simplifie la gestion des URLs, rendant votre base de code plus facile à maintenir et à étendre à mesure que votre application grandit.

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

// Créez la propriété to localisée pour router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Si 'to' est un objet, localisez la propriété path
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

### (Optionnel) Étape 11 : Rendre du Markdown

Intlayer prend en charge le rendu du contenu Markdown directement dans votre application Vue. Par défaut, le Markdown est traité comme du texte brut. Pour convertir le Markdown en HTML enrichi, vous pouvez intégrer [markdown-it](https://github.com/markdown-it/markdown-it), un parseur Markdown.

Cela est particulièrement utile lorsque vos traductions incluent du contenu formaté comme des listes, des liens ou des emphases.

Par défaut, Intlayer rend le markdown sous forme de chaîne de caractères. Mais Intlayer fournit également un moyen de rendre le markdown en HTML en utilisant la fonction `installIntlayerMarkdown`.

> Pour voir comment déclarer du contenu markdown en utilisant le package `intlayer`, consultez la [documentation markdown](https://github.com/aymericzip/intlayer/tree/main/docs/fr/dictionary/markdown.md).

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // autoriser les balises HTML
  linkify: true, // transformer automatiquement les URL en liens
  typographer: true, // activer les guillemets typographiques, tirets, etc.
});

// Indiquer à Intlayer d'utiliser md.render() chaque fois qu'il doit convertir du markdown en HTML
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

Une fois enregistré, vous pouvez utiliser la syntaxe basée sur les composants pour afficher directement le contenu Markdown :

```vue
<template>
  <div>
    <myMarkdownContent />
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myMarkdownContent } = useIntlayer("my-component");
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

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commettre dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**extension officielle Intlayer pour VS Code**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Il est recommandé d’ignorer les fichiers générés par Intlayer. Cela vous permet d’éviter de les committer dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l’extension officielle **Intlayer VS Code Extension**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d’erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l’utilisation de l’extension, consultez la [documentation de l’extension VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l’[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

---
