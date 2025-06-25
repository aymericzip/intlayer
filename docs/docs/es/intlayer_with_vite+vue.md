---
docName: intlayer_with_vite_vue
url: https://intlayer.org/doc/environment/vite-and-vue
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+vue.md
createdAt: 2025-04-18
updatedAt: 2025-04-18
title: Traduce su sitio web Vite y Vue (i18n)
description: Descubre cómo hacer que tu sitio web con Vite y Vue sea multilingüe. Sigue la documentación para internacionalizarlo (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Vite
  - Vue
  - JavaScript
---

# Comenzando con la Internacionalización (i18n) con Intlayer, Vite y Vue

> Este paquete está en desarrollo. Consulte el [issue](https://github.com/aymericzip/intlayer/issues/113) para más información. Muestre su interés en Intlayer para Vue dando like al issue.

<!-- Consulte [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-vue-template) en GitHub. -->

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto de internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de características avanzadas**, como la detección dinámica de locales y el cambio entre ellos.

---

## Guía Paso a Paso para Configurar Intlayer en una Aplicación con Vite y Vue

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando npm:

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

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

- **vue-intlayer**
  El paquete que integra Intlayer con aplicaciones Vue. Proporciona proveedores de contexto y composables para la internacionalización en Vue.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar redirecciones de URL.

### Paso 2: Configuración de tu proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros locales
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
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros locales
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
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, deshabilitar los logs de Intlayer en la consola y más. Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### Paso 3: Integra Intlayer en tu Configuración de Vite

Añade el plugin de intlayer en tu configuración.

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

> El plugin `intlayerPlugin()` de Vite se utiliza para integrar Intlayer con Vite. Garantiza la construcción de archivos de declaración de contenido y los monitorea en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 4: Declara tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ es: "el recuento es ", en: "count is ", fr: "le compte est " }),
    edit: t({
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
    }),
    checkOut: t({ es: "Compruebe ", en: "Check out ", fr: "Vérifiez " }),
    officialStarter: t({
      es: ", el starter oficial Vue + Vite",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
    }),
    learnMore: t({
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
    }),
    vueDocs: t({
      es: "Vue Docs Scaling up Guide",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
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
    count: t({ es: "el recuento es ", en: "count is ", fr: "le compte est " }),
    edit: t({
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
    }),
    checkOut: t({ es: "Compruebe ", en: "Check out ", fr: "Vérifiez " }),
    officialStarter: t({
      es: "el starter oficial Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
    }),
    learnMore: t({
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
    }),
    vueDocs: t({
      es: "Vue Docs Scaling up Guide",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
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
    count: t({ es: "el recuento es ", en: "count is ", fr: "le compte est " }),
    edit: t({
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
    }),
    checkOut: t({ es: "Compruebe ", en: "Check out ", fr: "Vérifiez " }),
    officialStarter: t({
      es: "el starter oficial Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
    }),
    learnMore: t({
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
    }),
    vueDocs: t({
      es: "Vue Docs Scaling up Guide",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
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
        "es": "el recuento es ",
        "en": "count is ",
        "fr": "le compte est "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "es": "Compruebe ",
        "en": "Check out ",
        "fr": "Vérifiez "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "es": "el starter oficial Vue + Vite",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "es": "Aprenda más sobre el soporte IDE para Vue en el ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "es": "Vue Docs Scaling up Guide",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus"
      }
    }
  }
}
```

> Sus declaraciones de contenido pueden definirse en cualquier lugar de su aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulte la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md).

### Paso 5: Utilizar Intlayer en su Código

Para utilizar las funciones de internacionalización de Intlayer en toda su aplicación Vue, primero debe registrar la instancia singleton de Intlayer en su archivo principal. Este paso es crucial ya que proporciona el contexto de internacionalización a todos los componentes de su aplicación, haciendo que las traducciones sean accesibles en cualquier lugar de su árbol de componentes.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Inyectar el proveedor en el nivel superior
installIntlayer(app);

// Montar la aplicación
app.mount("#app");
```

Acceda a sus diccionarios de contenido en toda su aplicación creando un componente principal de Vue y utilizando los composables `useIntlayer`:

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

#### Accediendo al Contenido en Intlayer Intlayer ofrece diferentes API para

acceder a tu contenido:

- **Sintaxis basada en componentes** (recomendado): Usa
  la sintaxis `<miContenido />`, o `<Component :is="miContenido" />` para renderizar contenido como un Nodo de Intlayer. Esto se integra
  perfectamente con el [Editor
  Visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md)
  y el
  [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md).

- **Sintaxis basada en cadenas de texto**: Usa `{{ miContenido }}` para
  renderizar el contenido como texto plano, sin soporte para el Editor Visual.

- **Sintaxis de HTML crudo**: Usa `
  <div v-html="miContenido" />
  ` para renderizar el contenido como HTML crudo, sin soporte para el Editor
  Visual.

- **Sintaxis de desestructuración**: El composable `useIntlayer`
  devuelve un Proxy con el contenido. Este proxy se puede desestructurar para
  acceder al contenido manteniendo la reactividad.
  - Usa `const content = useIntlayer("miContenido");` y `{{ content.miContenido }}` / `<content.miContenido />`. - O usa `const { miContenido } = useIntlayer("miContenido");` y `{{ miContenido }}` / `<miContenido />` para desestructurar el contenido.

### (Opcional) Paso 6: Cambiar el idioma de su contenido

Para cambiar el idioma de su contenido, puede usar la función
`setLocale` proporcionada por el composable `useLocale`. Esta función le permite
establecer el idioma de la aplicación y actualizar el contenido en consecuencia.
Cree un componente para cambiar entre idiomas:

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

// Obtener información de idioma y función setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Rastrear el idioma seleccionado con un ref
const selectedLocale = ref(locale.value);

// Actualizar el idioma cuando cambie la selección
const changeLocale = () => setLocale(selectedLocale.value);

// Mantener el selectedLocale sincronizado con el idioma global
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Luego, use este componente en su App.vue:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Crear archivo de declaración de intlayer relacionado
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

### (Opcional) Paso 7: Agregar enrutamiento localizado a su aplicación

Agregar enrutamiento localizado en una aplicación Vue generalmente implica usar Vue Router con prefijos de idioma. Esto crea rutas únicas para cada idioma, lo cual es útil para SEO y URLs amigables para SEO.

Ejemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Primero, instala Vue Router:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

Luego, crea una configuración de enrutador que maneje el enrutamiento basado en locales:

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

// Obtener configuración de internacionalización
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Declarar las rutas con caminos y metadatos específicos del idioma.
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

// Crear la instancia del enrutador
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Agregar guardia de navegación para manejar el idioma
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Reutilizar el idioma definido en los metadatos de la ruta
    client.setLocale(metaLocale);
    next();
  } else {
    // Fallback: no hay idioma en los metadatos, posiblemente una ruta no coincidente
    // Opcional: manejar 404 o redirigir al idioma predeterminado
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> El nombre se utiliza para identificar la ruta en el enrutador. Debe ser único en todas las rutas para evitar conflictos y garantizar una navegación y vinculación adecuadas.

Luego, registra el enrutador en tu archivo main.js:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Agregar el enrutador a la aplicación
app.use(router);

// Montar la aplicación
app.mount("#app");
```

Luego actualiza tu archivo `App.vue` para renderizar el componente RouterView. Este componente mostrará el componente correspondiente a la ruta actual.

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

En paralelo, también puedes usar el `intLayerMiddlewarePlugin` para agregar enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente el idioma actual basado en la URL y establecerá la cookie de idioma correspondiente. Si no se especifica un idioma, el plugin determinará el idioma más apropiado basado en las preferencias del idioma del navegador del usuario. Si no se detecta ningún idioma, redirigirá al idioma predeterminado.

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

### (Opcional) Paso 8: Cambiar la URL cuando cambia el idioma

Para actualizar automáticamente la URL cuando el usuario cambia el idioma, puedes modificar el componente `LocaleSwitcher` para usar Vue Router:

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

// Obtener Vue Router
const router = useRouter();

// Obtener información del idioma y la función setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Obtener la ruta actual y crear una URL localizada
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Navegar a la ruta localizada sin recargar la página
    router.push(localizedPath);
  },
});

// Rastrear el idioma seleccionado con un ref
const selectedLocale = ref(locale.value);

// Actualizar el idioma cuando cambie la selección
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Mantener selectedLocale sincronizado con el idioma global
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Consejo: Para un mejor SEO y accesibilidad, usa etiquetas como `<a href="/fr/home" hreflang="fr">` para enlazar a páginas localizadas, como se muestra en el Paso 10. Esto permite que los motores de búsqueda descubran e indexen correctamente las URLs específicas de cada idioma. Para preservar el comportamiento SPA, puedes prevenir la navegación predeterminada con @click.prevent, cambiar el idioma usando useLocale y navegar programáticamente usando Vue Router.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Cambiar a Inglés"
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
      aria-label="Cambiar a Español"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span><span>Spanish</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Opcional) Paso 9: Cambiar los Atributos de Idioma y Dirección del HTML

Cuando tu aplicación soporta múltiples idiomas, es crucial actualizar los atributos `lang` y `dir` de la etiqueta `<html>` para que coincidan con el idioma actual. Hacer esto asegura:

- **Accesibilidad**: Los lectores de pantalla y tecnologías de asistencia dependen del atributo `lang` correcto para pronunciar e interpretar el contenido con precisión.
- **Renderizado de Texto**: El atributo `dir` (dirección) asegura que el texto se renderice en el orden correcto (por ejemplo, de izquierda a derecha para inglés, de derecha a izquierda para árabe, hebreo), lo cual es esencial para la legibilidad.
- **SEO**: Los motores de búsqueda usan el atributo `lang` para determinar el idioma de tu página, ayudando a servir el contenido localizado correcto en los resultados de búsqueda.

Al actualizar estos atributos dinámicamente cuando cambia el idioma, garantizas una experiencia consistente y accesible para los usuarios en todos los idiomas soportados.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable que actualiza los atributos `lang` y `dir` del elemento HTML <html>
 * basado en la configuración regional actual.
 *
 * @example
 * // En tu App.vue o un componente global
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // Actualizar los atributos HTML cada vez que cambie la configuración regional
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Actualizar el atributo de idioma
      document.documentElement.lang = newLocale;

      // Establecer la dirección del texto (ltr para la mayoría de idiomas, rtl para árabe, hebreo, etc.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
}
```

Usa este composable en tu `App.vue` o un componente global:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Aplicar los atributos HTML basados en la configuración regional actual
useI18nHTMLAttributes();
</script>

<template>
  <!-- Tu plantilla de la aplicación -->
</template>
```

### (Opcional) Paso 10: Crear un Componente de Enlace Localizado

Para garantizar que la navegación de tu aplicación respete la configuración regional actual, puedes crear un componente personalizado `Link`. Este componente automáticamente añade un prefijo a las URLs internas con el idioma actual, de modo que, por ejemplo, cuando un usuario francófono haga clic en un enlace a la página "Acerca de", sea redirigido a `/fr/about` en lugar de `/about`.

Este comportamiento es útil por varias razones:

- **SEO y Experiencia de Usuario**: Las URLs localizadas ayudan a los motores de búsqueda a indexar correctamente las páginas específicas de cada idioma y proporcionan a los usuarios contenido en su idioma preferido.
- **Consistencia**: Al usar un enlace localizado en toda tu aplicación, garantizas que la navegación se mantenga dentro de la configuración regional actual, evitando cambios inesperados de idioma.
- **Mantenibilidad**: Centralizar la lógica de localización en un único componente simplifica la gestión de URLs, haciendo que tu base de código sea más fácil de mantener y ampliar a medida que tu aplicación crezca.

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

// Verificar si el enlace es externo
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Crear un href localizado para enlaces internos
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Para usar con Vue Router, crea una versión específica para el router:

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

// Crear un to-prop localizado para router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Si 'to' es un objeto, localizar la propiedad path
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

Usa estos componentes en tu aplicación:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- Otros -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar los beneficios de TypeScript y fortalecer tu base de código.

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones existentes de TypeScript
  "include": [
    // ... Tus configuraciones existentes de TypeScript
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar que se incluyan en tu repositorio Git.

Para hacerlo, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión Oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Más Allá

## Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md).
