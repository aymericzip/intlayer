---
createdAt: 2025-11-20
updatedAt: 2025-11-20
title: Cómo traducir tu aplicación SvelteKit – Guía i18n 2025
description: Descubre cómo hacer que tu sitio web SvelteKit sea multilingüe. Sigue la documentación para internacionalizar (i18n) y traducir usando Server-Side Rendering (SSR).
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
history:
  - version: 7.1.10
    date: 2025-11-20
    changes: Historial inicial
---

# Traduce tu sitio web SvelteKit usando Intlayer | Internacionalización (i18n)

## Tabla de Contenidos

<TOC/>

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas. Funciona perfectamente con las capacidades de Server-Side Rendering (SSR) de **SvelteKit**.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar soporte para TypeScript** con tipos autogenerados.
- **Aprovechar el SSR de SvelteKit** para una internacionalización amigable con SEO.

---

## Guía paso a paso para configurar Intlayer en una aplicación SvelteKit

Para comenzar, crea un nuevo proyecto SvelteKit. Aquí está la estructura final que crearemos:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Paso 1: Instalar dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**: El paquete principal de i18n.
- **svelte-intlayer**: Proporciona context providers y stores para Svelte/SvelteKit.
- **vite-intlayer**: El plugin de Vite para integrar las declaraciones de contenido con el proceso de build.

### Paso 2: Configuración de tu proyecto

Crea un archivo de configuración en la raíz de tu proyecto:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Paso 3: Integra Intlayer en tu configuración de Vite

Actualiza tu `vite.config.ts` para incluir el plugin de Intlayer. Este plugin se encarga de la transpilación de tus archivos de contenido.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // el orden importa, Intlayer debe ir antes que SvelteKit
});
```

### Paso 4: Declara Tu Contenido

Crea tus archivos de declaración de contenido en cualquier lugar dentro de tu carpeta `src` (por ejemplo, `src/lib/content` o junto a tus componentes). Estos archivos definen el contenido traducible para tu aplicación usando la función `t()` para cada locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Paso 5: Utiliza Intlayer en Tus Componentes

Ahora puedes usar la función `useIntlayer` en cualquier componente Svelte. Esta devuelve una tienda reactiva que se actualiza automáticamente cuando cambia el locale. La función respetará automáticamente el locale actual (tanto durante SSR como en la navegación del lado del cliente).

> **Nota:** `useIntlayer` devuelve una tienda de Svelte, por lo que necesitas usar el prefijo `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: Cómo traducir tu aplicación SvelteKit – Guía i18n 2025
> description: Descubre cómo hacer que tu sitio web SvelteKit sea multilingüe. Sigue la documentación para internacionalizar (i18n) y traducir usando Server-Side Rendering (SSR).
> keywords:

- Internacionalización
- Documentación
- Intlayer
- SvelteKit
- JavaScript
- SSR
  slugs:
- doc
- environment
- sveltekit
  applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Historial inicial

---

# Traduce tu sitio web SvelteKit usando Intlayer | Internacionalización (i18n)

## Tabla de Contenidos

<TOC/>

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas. Funciona perfectamente con las capacidades de Server-Side Rendering (SSR) de **SvelteKit**.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar soporte para TypeScript** con tipos autogenerados.
- **Aprovechar el SSR de SvelteKit** para una internacionalización amigable con SEO.

---

## Guía paso a paso para configurar Intlayer en una aplicación SvelteKit

Para comenzar, crea un nuevo proyecto SvelteKit. Aquí está la estructura final que crearemos:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Paso 1: Instalar dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**: El paquete principal de i18n.
- **svelte-intlayer**: Proporciona context providers y stores para Svelte/SvelteKit.
- **vite-intlayer**: El plugin de Vite para integrar las declaraciones de contenido con el proceso de build.

### Paso 2: Configuración de tu proyecto

Crea un archivo de configuración en la raíz de tu proyecto:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Paso 3: Integra Intlayer en tu configuración de Vite

Actualiza tu `vite.config.ts` para incluir el plugin de Intlayer. Este plugin se encarga de la transpilación de tus archivos de contenido.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // el orden importa, Intlayer debe ir antes que SvelteKit
});
```

### Paso 4: Declara Tu Contenido

Crea tus archivos de declaración de contenido en cualquier lugar dentro de tu carpeta `src` (por ejemplo, `src/lib/content` o junto a tus componentes). Estos archivos definen el contenido traducible para tu aplicación usando la función `t()` para cada locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Paso 5: Utiliza Intlayer en Tus Componentes

para acceder a su valor reactivo (por ejemplo, `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" corresponde a la clave definida en el Paso 4
  const content = useIntlayer("hero-section");
</script>

<!-- Renderizar contenido como contenido simple  -->
<h1>{$content.title}</h1>
<!-- Para renderizar el contenido editable usando el editor -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Para renderizar el contenido como una cadena -->
<div aria-label={$content.title.value}></div>
```

### (Opcional) Paso 6: Configurar el enrutamiento

Los siguientes pasos muestran cómo configurar el enrutamiento basado en el locale en SvelteKit. Esto permite que tus URLs incluyan el prefijo del locale (por ejemplo, `/en/about`, `/fr/about`) para mejorar el SEO y la experiencia del usuario.

```bash
.
└─── src
    ├── app.d.ts                  # Definir el tipo de locale
    ├── hooks.server.ts           # Gestionar el enrutamiento del locale
    ├── lib
    │   └── getLocale.ts          # Comprobar el locale desde el header, cookies
    ├── params
    │   └── locale.ts             # Definir el parámetro locale
    └── routes
        ├── [[locale=locale]]     # Envolver en un grupo de rutas para establecer el locale
        │   ├── +layout.svelte    # Diseño local para la ruta
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Diseño raíz para fuentes y estilos globales
```

### Paso 7: Manejar la detección del locale en el servidor (Hooks)

En SvelteKit, el servidor necesita conocer el locale del usuario para renderizar el contenido correcto durante SSR. Usamos `hooks.server.ts` para detectar el locale desde la URL o las cookies.

Crea o modifica `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Verifica si la ruta actual ya comienza con una locale (ej. /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // Si NO hay una locale presente en la URL (ej. el usuario visita "/"), redirígelo
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Redirección temporal
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Luego, crea un helper para obtener la locale del usuario desde el evento de la solicitud:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Obtiene la configuración regional del usuario a partir del evento de la solicitud.
 * Esta función se utiliza en el hook `handle` en `src/hooks.server.ts`.
 *
 * Primero intenta obtener la configuración regional desde el almacenamiento de Intlayer (cookies o encabezados personalizados).
 * Si no se encuentra la configuración regional, recurre a la negociación "Accept-Language" del navegador.
 *
 * @param event - El evento de solicitud de SvelteKit
 * @returns La configuración regional del usuario
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Intentar obtener la configuración regional desde el almacenamiento de Intlayer (Cookies o encabezados)
  const storedLocale = getLocaleFromStorage({
    // Acceso a cookies en SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // Acceso a headers en SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Recurso a la negociación "Accept-Language" del navegador
  const negotiatorHeaders: Record<string, string> = {};

  // Convertir el objeto Headers de SvelteKit a un Record<string, string> plano
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Comprobar la locale a partir del header `Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Devolver la locale por defecto si no se encuentra ninguna coincidencia
  return defaultLocale;
};
```

> `getLocaleFromStorage` verificará la localidad desde el encabezado o la cookie dependiendo de tu configuración. Consulta [Configuración](https://intlayer.org/doc/configuration) para más detalles.

> La función `localeDetector` procesará el encabezado `Accept-Language` y devolverá la mejor coincidencia.

Si la localidad no está configurada, queremos devolver un error 404. Para facilitarlo, podemos crear una función `match` para verificar si la localidad es válida:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
```

> **Nota:** Asegúrate de que tu `src/app.d.ts` incluya la definición de la localidad:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

Para el archivo `+layout.svelte`, podemos eliminar todo, para mantener solo contenido estático, no relacionado con i18n:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Luego, crea una nueva página y layout bajo el grupo `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Usa el tipo genérico Load
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Inicializar Intlayer con la locale de la ruta
	setupIntlayer(data.locale);

	// Usar el diccionario de contenido del layout
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from 'svelte-intlayer';

	// Usar el diccionario de contenido de la página principal
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

### (Opcional) Paso 8: Enlaces internacionalizados

Para SEO, se recomienda prefijar tus rutas con la locale (por ejemplo, `/en/about`, `/fr/about`). Este componente automáticamente prefija cualquier enlace con la locale actual.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Ayudante para prefijar la URL con la locale actual
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Si usas `goto` de SvelteKit, puedes usar la misma lógica con `getLocalizedUrl` para navegar a la URL localizada:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Navega a /en/about o /fr/about dependiendo del locale
```

### (Opcional) Paso 9: Selector de idioma

Para permitir a los usuarios cambiar de idioma, actualiza la URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Establecerá la locale en el store y activará onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

### (Opcional) Paso 10: Añadir proxy backend

Para añadir un proxy backend a tu aplicación SvelteKit, puedes usar la función `intlayerProxy` proporcionada por el plugin `vite-intlayer`. Este plugin detectará automáticamente la mejor locale para el usuario basándose en la URL, cookies y preferencias de idioma del navegador.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (Opcional) Paso 11: Configurar el editor / CMS de intlayer

Para configurar el editor de intlayer, debes seguir la [documentación del editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

Para configurar el CMS de intlayer, debes seguir la [documentación del CMS de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

Para poder visualizar el selector del editor intlayer, deberás usar la sintaxis de componente en tu contenido intlayer.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Renderizar contenido como contenido simple -->
  <h1>{$content.title}</h1>

  <!-- Renderizar contenido como un componente (requerido por el editor) -->
  <svelte:component this={$content.component} />
</div>
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer.

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

---

### Ir Más Allá

- **Editor Visual**: Integra el [Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) para editar las traducciones directamente desde la interfaz de usuario.
- **CMS**: Externaliza la gestión de tu contenido usando el [CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
