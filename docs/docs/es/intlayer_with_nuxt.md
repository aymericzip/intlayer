---
createdAt: 2025-06-18
updatedAt: 2025-12-07
title: Cómo traducir tu aplicación Nuxt y Vue – Guía i18n 2025
description: Descubre cómo hacer tu sitio web Nuxt y Vue multilingüe. Sigue la documentación para internacionalizar (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
youtubeVideo: https://www.youtube.com/watch?v=IE3XWkZ6a5U
history:
  - version: 7.3.11
    date: 2025-12-07
    changes: Actualización de LocaleSwitcher, SEO, metadatos
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Traduce tu sitio web Nuxt y Vue usando Intlayer | Internacionalización (i18n)

## Tabla de Contenidos

<TOC/>

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y cambio dinámico de locales.

---

## Guía paso a paso para configurar Intlayer en una aplicación Nuxt

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

### Paso 1: Instalar Dependencias

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="¿Cómo traducir tu aplicación Nuxt y Vue usando Intlayer? Descubre Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/IE3XWkZ6a5U?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Código" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-nuxt-4-template) en GitHub.

Instala los paquetes necesarios usando npm:

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

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **vue-intlayer**
  El paquete que integra Intlayer con aplicaciones Vue. Proporciona los composables para los componentes Vue.

- **nuxt-intlayer**
  El módulo de Nuxt que integra Intlayer con aplicaciones Nuxt. Proporciona configuración automática, middleware para la detección de locale, gestión de cookies y redirección de URL.

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

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección mediante middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integra Intlayer en tu Configuración de Nuxt

Agrega el módulo intlayer a tu configuración de Nuxt:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Tu configuración existente de Nuxt
  modules: ["nuxt-intlayer"],
});
```

> El módulo `nuxt-intlayer` maneja automáticamente la integración de Intlayer con Nuxt. Configura la construcción de las declaraciones de contenido, monitorea los archivos en modo desarrollo, proporciona middleware para la detección de la locale y gestiona el enrutamiento localizado.

### Paso 4: Declara tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat="typescript"
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

> Tus declaraciones de contenido pueden definirse en cualquier parte de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Utiliza Intlayer en tu Código

Accede a tus diccionarios de contenido en toda tu aplicación Nuxt usando el composable `useIntlayer`:

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

#### Accediendo al Contenido en Intlayer

Intlayer ofrece diferentes APIs para acceder a tu contenido:

- **Sintaxis basada en componentes** (recomendada):
  Usa la sintaxis `<myContent />`, o `<Component :is="myContent" />` para renderizar contenido como un Nodo de Intlayer. Esto se integra perfectamente con el [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) y el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

- **Sintaxis basada en cadenas**:
  Usa `{{ myContent }}` para renderizar el contenido como texto plano, sin soporte para el Editor Visual.

- **Sintaxis HTML sin procesar**:
  Usa `<div v-html="myContent" />` para renderizar el contenido como HTML sin procesar, sin soporte para el Editor Visual.

- **Sintaxis de desestructuración**:
  El composable `useIntlayer` devuelve un Proxy con el contenido. Este proxy puede ser desestructurado para acceder al contenido manteniendo la reactividad.
  - Usa `const content = useIntlayer("myContent");` y `{{ content.myContent }}` / `<content.myContent />`.
  - O usa `const { myContent } = useIntlayer("myContent");` y `{{ myContent}}` / `<myContent/>` para desestructurar el contenido.

### (Opcional) Paso 6: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes usar la función `setLocale` proporcionada por el composable `useLocale`. Esta función te permite establecer la configuración regional de la aplicación y actualizar el contenido en consecuencia.

Crea un componente para cambiar entre idiomas usando `NuxtLink`. **Usar enlaces en lugar de botones para cambiar de idioma es una buena práctica para SEO y la descubribilidad de la página**, ya que permite a los motores de búsqueda rastrear e indexar todas las versiones localizadas de tus páginas:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt importa automáticamente useRoute
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

> Usar `NuxtLink` con atributos `href` adecuados (a través de `getLocalizedUrl`) asegura que los motores de búsqueda puedan descubrir todas las variantes de idioma de tus páginas. Esto es preferible a cambiar el idioma solo con JavaScript, ya que los rastreadores de motores de búsqueda pueden no seguirlo.

Luego, configura tu `app.vue` para usar layouts:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### (Opcional) Paso 6b: Crear un Layout con Navegación

Los layouts de Nuxt te permiten definir una estructura común para tus páginas. Crea un layout por defecto que incluya el selector de idioma y la navegación:

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

    <Links href="/">Inicio</Links>
    <Links href="/about">Acerca de</Links>
  </div>
</template>
```

El componente `Links` (mostrado a continuación) asegura que los enlaces de navegación interna se localicen automáticamente.

### (Opcional) Paso 7: Añadir enrutamiento localizado a tu aplicación

Nuxt maneja automáticamente el enrutamiento localizado cuando se usa el módulo `nuxt-intlayer`. Esto crea rutas para cada idioma automáticamente basándose en la estructura del directorio de tus páginas.

Ejemplo:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Para crear páginas localizadas, simplemente crea tus archivos Vue en el directorio `pages/`. Aquí tienes dos ejemplos de páginas:

**Página de inicio (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.value,
  meta: [
    {
      name: "description",
      content: content.metaDescription.value,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**Página Acerca de (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Usa .raw para acceso a cadena primitiva
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Usa .raw para acceder a la cadena primitiva
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Nota: `useHead` se importa automáticamente en Nuxt. Puedes acceder a los valores del contenido usando `.value` (reactivo) o `.raw` (cadena primitiva) según tus necesidades.

El módulo `nuxt-intlayer` hará automáticamente:

- Detectar la configuración regional preferida del usuario
- Gestionar el cambio de idioma vía URL
- Establecer el atributo `<html lang="">` apropiado
- Manejar las cookies de idioma
- Redirigir a los usuarios a la URL localizada correspondiente

### (Opcional) Paso 8: Crear un Componente de Enlace Localizado

Para asegurar que la navegación de tu aplicación respete la configuración regional actual, puedes crear un componente personalizado `Links`. Este componente antepone automáticamente a las URLs internas el idioma actual, lo cual es esencial para el **SEO y la descubribilidad de las páginas**.

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

// Calcular la ruta final
const finalPath = computed(() => {
  // 1. Verificar si el enlace es externo
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Si es externo, devolver tal cual (NuxtLink maneja la generación de la etiqueta <a>)
  if (isExternal) return props.href;

  // 3. Si es interno, localiza la URL
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

Luego usa este componente en toda tu aplicación:

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

    <Links href="/">Inicio</Links>
    <Links href="/about">Acerca de</Links>
  </div>
</template>
```

> Al usar `NuxtLink` con rutas localizadas, aseguras que:
>
> - Los motores de búsqueda puedan rastrear e indexar todas las versiones de idioma de tus páginas
> - Los usuarios puedan compartir URLs localizadas directamente
> - El historial del navegador funcione correctamente con URLs que tienen prefijos de locale

### (Opcional) Paso 9: Manejar Metadatos y SEO

Nuxt proporciona excelentes capacidades SEO a través del composable `useHead` (auto-importado). Puedes usar Intlayer para manejar metadatos localizados usando el accesor `.raw` o `.value` para obtener el valor primitivo de cadena:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead se auto-importa en Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Usa .raw para acceso a cadena primitiva
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Usar .raw para acceder al valor primitivo de cadena
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Alternativamente, puedes usar la función `import { getIntlayer } from "intlayer"` para obtener el contenido sin reactividad de Vue.

> **Accediendo a los valores del contenido:**
>
> - Usa `.raw` para obtener el valor primitivo de cadena (no reactivo)
> - Usa `.value` para obtener el valor reactivo
> - Usa la sintaxis de componente `<content.key />` para soporte del Editor Visual

Crea la declaración de contenido correspondiente:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="pages/about-page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default aboutPageContent;
```

```javascript fileName="pages/about-page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = aboutPageContent;
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

### Configurar TypeScript

Intlayer utiliza la ampliación de módulos para aprovechar las ventajas de TypeScript y fortalecer su base de código.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión para VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión ofrece:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
