# Comenzando con la Internacionalización (i18n) con Intlayer y Nuxt

Consulta [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-nuxt-template) en GitHub.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para la internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de características avanzadas**, como la detección y el cambio dinámico de locales.

---

## Guía Paso a Paso para Configurar Intlayer en una Aplicación Nuxt

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

- **vue-intlayer**
  El paquete que integra Intlayer con aplicaciones Vue. Proporciona composables para los componentes Vue.

- **nuxt-intlayer**
  El módulo de Nuxt que integra Intlayer con aplicaciones Nuxt. Proporciona configuración automática, middleware para la detección de locales, gestión de cookies y redirección de URLs.

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

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los registros de Intlayer en la consola y más. Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en tu Configuración de Nuxt

Agrega el módulo intlayer a tu configuración de Nuxt:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Tu configuración existente de Nuxt
  modules: ["nuxt-intlayer"],
});
```

> El módulo `nuxt-intlayer` maneja automáticamente la integración de Intlayer con Nuxt. Configura la construcción de declaraciones de contenido, monitorea archivos en modo de desarrollo, proporciona middleware para la detección de locales y gestiona el enrutamiento localizado.

### Paso 4: Declarar tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
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
    nuxtIntlayer: t({
      es: "Documentación de Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
    }),
    learnMore: t({
      es: "Aprenda más sobre Nuxt en la ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
    }),
    nuxtDocs: t({
      es: "Documentación de Nuxt",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
    }),
    readTheDocs: t({
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
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
    count: t({ es: "el recuento es ", en: "count is ", fr: "le compte est " }),
    edit: t({
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
    }),
    checkOut: t({ es: "Compruebe ", en: "Check out ", fr: "Vérifiez " }),
    nuxtIntlayer: t({
      es: "Documentación de Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
    }),
    learnMore: t({
      es: "Aprenda más sobre Nuxt en la ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
    }),
    nuxtDocs: t({
      es: "Documentación de Nuxt",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
    }),
    readTheDocs: t({
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
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
    count: t({ es: "el recuento es ", en: "count is ", fr: "le compte est " }),
    edit: t({
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
    }),
    checkOut: t({ es: "Compruebe ", en: "Check out ", fr: "Vérifiez " }),
    nuxtIntlayer: t({
      es: "Documentación de Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
    }),
    learnMore: t({
      es: "Aprenda más sobre Nuxt en la ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
    }),
    nuxtDocs: t({
      es: "Documentación de Nuxt",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
    }),
    readTheDocs: t({
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
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
        "es": "Compruebe "
      }
    },
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "en": "Nuxt Intlayer documentation",
        "fr": "Documentation de Nuxt Intlayer",
        "es": "Documentación de Nuxt Intlayer"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about Nuxt in the ",
        "fr": "En savoir plus sur Nuxt dans la ",
        "es": "Aprenda más sobre Nuxt en la "
      }
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Nuxt Documentation",
        "fr": "Documentation Nuxt",
        "es": "Documentación de Nuxt"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Nuxt logo to learn more",
        "fr": "Cliquez sur le logo Nuxt pour en savoir plus",
        "es": "Haga clic en el logotipo de Nuxt para obtener más información"
      }
    }
  }
}
```

> Sus declaraciones de contenido pueden definirse en cualquier lugar de su aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulte la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md).

### Paso 5: Utilice Intlayer en su código

Acceda a sus diccionarios de contenido en toda su aplicación Nuxt utilizando el composable `useIntlayer`:

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

#### Accediendo al contenido en Intlayer

Intlayer ofrece dos APIs para acceder a su contenido:

- **Sintaxis basada en componentes** (recomendada):  
  Use la sintaxis `<myContent />` para renderizar contenido como un Nodo de Intlayer. Esto se integra perfectamente con el [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) y el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md).

- **Sintaxis basada en cadenas**:  
  Use `{{ myContent }}` para renderizar el contenido como texto plano, sin interactividad.

### (Opcional) Paso 6: Cambiar el idioma de su contenido

Para cambiar el idioma de su contenido, puede usar la función `setLocale` proporcionada por el composable `useLocale`. Esta función le permite establecer la configuración regional de la aplicación y actualizar el contenido en consecuencia.

Cree un componente para cambiar entre idiomas:

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

// Obtener información de configuración regional y función setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Seguimiento de la configuración regional seleccionada con un ref
const selectedLocale = ref(locale.value);

// Actualizar la configuración regional cuando cambie la selección
const changeLocale = () => setLocale(selectedLocale.value);

// Mantener selectedLocale sincronizado con la configuración regional global
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

Luego, use este componente en sus páginas o diseño:

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // Crear archivo de declaración de intlayer relacionado
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

### (Opcional) Paso 7: Agregar enrutamiento localizado a su aplicación

Nuxt maneja automáticamente el enrutamiento localizado cuando se usa el módulo `nuxt-intlayer`. Esto crea rutas para cada idioma automáticamente según la estructura del directorio de sus páginas.

Ejemplo:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Para crear una página localizada, simplemente cree sus archivos Vue en el directorio `pages/`:

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

El módulo `nuxt-intlayer` automáticamente:

- Detecta la configuración regional preferida del usuario
- Maneja el cambio de configuración regional a través de la URL
- Establece el atributo `<html lang="">` apropiado
- Administra cookies de configuración regional
- Redirige a los usuarios a la URL localizada correspondiente

### (Opcional) Paso 8: Crear un componente de enlace localizado

Para garantizar que la navegación de su aplicación respete la configuración regional actual, puede crear un componente personalizado `LocalizedLink`. Este componente agrega automáticamente el prefijo de los URL internos con el idioma actual.

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

// Verificar si el enlace es externo
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// Crear un href localizado para enlaces internos
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

Luego use este componente en toda su aplicación:

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

### (Opcional) Paso 9: Manejar Metadatos y SEO

Nuxt proporciona excelentes capacidades de SEO. Puedes usar Intlayer para manejar metadatos localizados:

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

Crea la declaración de contenido correspondiente:

```typescript fileName="pages/about-meta.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      es: "Acerca de Nosotros - Mi Empresa",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
    }),
    description: t({
      es: "Conozca más sobre nuestra empresa y nuestra misión",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
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

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar los beneficios de TypeScript y fortalecer tu base de código.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

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

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
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

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) o externalizar tu contenido utilizando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md).
