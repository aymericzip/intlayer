---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Cómo traducir tu Vite and Vue – guía i18n 2025
description: Descubre cómo hacer tu sitio web con Vite y Vue multilingüe. Sigue la documentación para internacionalizar (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
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
    changes: Historial inicial
---

# Traduce tu Vite and Vue con Intlayer | Internacionalización (i18n)

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-vite-vue-template) en GitHub.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y el cambio dinámico de locales.

---

## Guía paso a paso para configurar Intlayer en una aplicación Vite y Vue

### Paso 1: Instalar dependencias

Instala los paquetes necesarios usando npm:

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

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

- **vue-intlayer**
  El paquete que integra Intlayer con la aplicación Vue. Proporciona proveedores de contexto y composables para la internacionalización en Vue.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URL.

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
      // Tus otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Configuración para la internacionalización de la aplicación
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Configuración para la internacionalización de la aplicación
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integra Intlayer en tu configuración de Vite

Agrega el plugin de intlayer en tu configuración.

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

> El plugin `intlayer()` de Vite se utiliza para integrar Intlayer con Vite. Asegura la construcción de archivos de declaración de contenido y los supervisa en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 4: Declara Tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

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
      fr: "Vue Docs Scaling up Guide",
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
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Consulta " }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprende más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Guía de escalado de Vue Docs",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haz clic en los logotipos de Vite y Vue para obtener más información",
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
      fr: "Vue Docs Scaling up Guide",
      es: "Guía de escalado de Vue Docs",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
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
        "fr": "Vérifiez ",
        "es": "Consulta "
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
        "es": "Aprende más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Guía de escalado de la documentación de Vue"
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
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "en": "Check out ",
        "fr": "Vérifiez ",
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
        "fr": "Vue Docs Scaling up Guide",
        "es": "Guía de escalado de la documentación de Vue"
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

> Sus declaraciones de contenido pueden definirse en cualquier lugar de su aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulte la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

### Paso 5: Utilice Intlayer en su Código

Para utilizar las funciones de internacionalización de Intlayer en toda tu aplicación Vue, primero necesitas registrar la instancia singleton de Intlayer en tu archivo principal. Este paso es crucial ya que proporciona el contexto de internacionalización a todos los componentes de tu aplicación, haciendo que las traducciones sean accesibles en cualquier parte de tu árbol de componentes.

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

Accede a tus diccionarios de contenido en toda tu aplicación creando un componente principal de Vue y usando los composables `useIntlayer`:

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

#### Accediendo al contenido en Intlayer

Intlayer ofrece diferentes APIs para acceder a tu contenido:

- **Sintaxis basada en componentes** (recomendada):
  Usa la sintaxis `<myContent />`, o `<Component :is="myContent" />` para renderizar contenido como un Nodo de Intlayer. Esto se integra perfectamente con el [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) y el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

- **Sintaxis basada en cadenas**:
  Usa `{{ myContent }}` para renderizar el contenido como texto plano, sin soporte para el Editor Visual.

- **Sintaxis HTML sin procesar**:
  Use `<div v-html="myContent" />` para renderizar el contenido como HTML sin procesar, sin soporte para el Editor Visual.

- **Sintaxis de desestructuración**:
  El composable `useIntlayer` devuelve un Proxy con el contenido. Este proxy puede ser desestructurado para acceder al contenido manteniendo la reactividad.
  - Usa `const content = useIntlayer("myContent");` y `{{ content.myContent }}` / `<content.myContent />`.
  - O usa `const { myContent } = useIntlayer("myContent");` y `{{ myContent}}` / `<myContent/>` para desestructurar el contenido.

### (Opcional) Paso 6: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes usar la función `setLocale` proporcionada por el composable `useLocale`. Esta función te permite establecer la configuración regional de la aplicación y actualizar el contenido en consecuencia.

Crea un componente para cambiar entre idiomas:

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

// Obtener información del locale y la función setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Rastrear el locale seleccionado con un ref
const selectedLocale = ref(locale.value);

// Actualizar el locale cuando cambia la selección
const changeLocale = () => setLocale(selectedLocale.value);

// Mantener selectedLocale sincronizado con el locale global
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Luego, usa este componente en tu App.vue:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Crear archivo de declaración intlayer relacionado
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

### (Opcional) Paso 7: Añadir enrutamiento localizado a tu aplicación

Agregar enrutamiento localizado en una aplicación Vue generalmente implica usar Vue Router con prefijos de locales. Esto crea rutas únicas para cada idioma, lo cual es útil para SEO y URLs amigables para SEO.

Ejemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Primero, instala Vue Router:

```bash packageManager="npm"
npm install vue-router
```

```bash packageManager="pnpm"
pnpm add vue-router
```

```bash packageManager="yarn"
yarn add vue-router
```

Luego, crea una configuración de enrutador que maneje el enrutamiento basado en la localidad:

```js fileName="src/router/index.ts"
import {
  localeFlatMap,
  type Locale,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

/**
 * Declarar las rutas con rutas específicas por localidad y metadatos.
 */
const routes = localeFlatMap(({ urlPrefix, locale }) => [
  {
    path: `${urlPrefix}/`,
    name: `Root-${locale}`,
    component: RootView,
    meta: {
      locale,
    },
  },
  {
    path: `${urlPrefix}/home`,
    name: `Home-${locale}`,
    component: HomeView,
    meta: {
      locale,
    },
  },
]);

// Crear la instancia del router
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Añadir guardia de navegación para el manejo de locales
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locale;

  // Reutilizar el locale definido en los metadatos de la ruta
  client.setLocale(metaLocale);
  next();
});
```

> El nombre se usa para identificar la ruta en el router. Debe ser único entre todas las rutas para evitar conflictos y asegurar una navegación y enlaces adecuados.

Luego, registra el router en tu archivo main.js:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Añade el router a la aplicación
app.use(router);

// Monta la aplicación
app.mount("#app");
```

Luego actualice su archivo `App.vue` para renderizar el componente RouterView. Este componente mostrará el componente que coincide con la ruta actual.

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

Paralelamente, también puede usar el `intlayerProxy` para agregar enrutamiento del lado del servidor a su aplicación. Este plugin detectará automáticamente la configuración regional actual basada en la URL y establecerá la cookie de configuración regional correspondiente. Si no se especifica ninguna configuración regional, el plugin determinará la configuración regional más adecuada según las preferencias de idioma del navegador del usuario. Si no se detecta ninguna configuración regional, redirigirá a la configuración regional predeterminada.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

### (Opcional) Paso 8: Cambiar la URL cuando cambia la configuración regional

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
// Importa ref y watch desde Vue
import { ref, watch } from "vue";
// Importa useRouter desde vue-router
import { useRouter } from "vue-router";
// Importa Locales, getLocaleName y getLocalizedUrl desde intlayer
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
// Importa useLocale desde vue-intlayer
import { useLocale } from "vue-intlayer";

// Obtiene Vue Router
const router = useRouter();

// Obtiene la información de la localización y la función setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Obtiene la ruta actual y crea una URL localizada
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Navega a la ruta localizada sin recargar la página
    router.push(localizedPath);
  },
});

// Rastrea la localización seleccionada con un ref
const selectedLocale = ref(locale.value);

// Actualizar la configuración regional cuando cambie la selección
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Mantener selectedLocale sincronizado con la configuración regional global
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Consejo: Para un mejor SEO y accesibilidad, use etiquetas como `<a href="/fr/home" hreflang="fr">` para enlazar a páginas localizadas, como se muestra en el Paso 10. Esto permite que los motores de búsqueda descubran e indexen correctamente las URLs específicas por idioma. Para preservar el comportamiento SPA, puede prevenir la navegación predeterminada con @click.prevent, cambiar la configuración regional usando useLocale y navegar programáticamente usando Vue Router.

```html
<ol>
  <li>
    <a
      hreflang="x-default"
      aria-label="Cambiar a inglés"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>Inglés</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Cambiar a español"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>Español</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Opcional) Paso 9: Cambiar los atributos de idioma y dirección en HTML

Cuando tu aplicación soporta múltiples idiomas, es crucial actualizar los atributos `lang` y `dir` de la etiqueta `<html>` para que coincidan con la configuración regional actual. Hacer esto garantiza:

- **Accesibilidad**: Los lectores de pantalla y las tecnologías de asistencia dependen del atributo `lang` correcto para pronunciar e interpretar el contenido con precisión.
- **Renderizado de texto**: El atributo `dir` (dirección) asegura que el texto se muestre en el orden adecuado (por ejemplo, de izquierda a derecha para inglés, de derecha a izquierda para árabe o hebreo), lo cual es esencial para la legibilidad.
- **SEO**: Los motores de búsqueda utilizan el atributo `lang` para determinar el idioma de tu página, ayudando a mostrar el contenido localizado correcto en los resultados de búsqueda.

Al actualizar estos atributos dinámicamente cuando cambia la configuración regional, garantizas una experiencia coherente y accesible para los usuarios en todos los idiomas soportados.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable que actualiza los atributos `lang` y `dir` del elemento HTML <html>
 * basándose en la configuración regional actual.
 *
 * @example
 * // En tu App.vue o un componente global
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Actualiza los atributos HTML cada vez que cambia la configuración regional
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Actualiza el atributo de idioma
      document.documentElement.lang = newLocale;

      // Establece la dirección del texto (ltr para la mayoría de idiomas, rtl para árabe, hebreo, etc.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

Usa este composable en tu `App.vue` o en un componente global:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Aplica los atributos HTML basados en la configuración regional actual
useI18nHTMLAttributes();
</script>

<template>
  <!-- La plantilla de tu aplicación -->
</template>
```

### (Opcional) Paso 10: Crear un Componente de Enlace Localizado

Para garantizar que la navegación de su aplicación respete la configuración regional actual, puede crear un componente personalizado `Link`. Este componente antepone automáticamente a las URL internas el idioma actual. Por ejemplo, cuando un usuario francófono hace clic en un enlace a la página "Acerca de", es redirigido a `/fr/about` en lugar de `/about`.

Este comportamiento es útil por varias razones:

- **SEO y experiencia del usuario**: Las URL localizadas ayudan a los motores de búsqueda a indexar correctamente las páginas específicas de cada idioma y proporcionan a los usuarios contenido en su idioma preferido.
- **Consistencia**: Al usar un enlace localizado en toda su aplicación, garantiza que la navegación se mantenga dentro de la configuración regional actual, evitando cambios inesperados de idioma.
  /// **Mantenibilidad**: Centralizar la lógica de localización en un solo componente simplifica la gestión de URLs, haciendo que tu base de código sea más fácil de mantener y ampliar a medida que tu aplicación crece.

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

// Verifica si el enlace es externo
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Crea un href localizado para enlaces internos
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

// Crear la propiedad 'to' localizada para router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Si 'to' es un objeto, localiza la propiedad path
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
    <!-- Vue router  -->
    <RouterLink to="/">Raíz</RouterLink>
    <RouterLink to="/home">Inicio</RouterLink>
    <!-- Otros -->
    <Link href="/">Raíz</Link>
    <Link href="/home">Inicio</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### (Opcional) Paso 11: Renderizar Markdown

Intlayer soporta la renderización de contenido Markdown directamente en tu aplicación Vue. Por defecto, Markdown se trata como texto plano. Para convertir Markdown en HTML enriquecido, puedes integrar [markdown-it](https://github.com/markdown-it/markdown-it), un parser de Markdown.

Esto es particularmente útil cuando tus traducciones incluyen contenido formateado como listas, enlaces o énfasis.

Por defecto, Intlayer renderiza markdown como cadena. Pero Intlayer también proporciona una forma de renderizar markdown en HTML usando la función `installIntlayerMarkdown`.

> Para ver cómo declarar contenido markdown usando el paquete `intlayer`, consulta la [documentación de markdown](https://github.com/aymericzip/intlayer/tree/main/docs/es/dictionary/markdown.md).

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // permitir etiquetas HTML
  linkify: true, // auto-enlazar URLs
  typographer: true, // habilitar comillas inteligentes, guiones, etc.
});

// Indicar a Intlayer que use md.render() cada vez que necesite convertir markdown en HTML
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

Una vez registrado, puedes usar la sintaxis basada en componentes para mostrar el contenido Markdown directamente:

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

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar las ventajas de TypeScript y fortalecer tu base de código.

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

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacerlo, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Más Allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---
