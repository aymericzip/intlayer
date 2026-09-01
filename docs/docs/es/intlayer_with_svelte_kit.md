---
createdAt: 2025-11-20
updatedAt: 2026-08-30
title: "SvelteKit i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación SvelteKit multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
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
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Agregar comando init"
  - version: 7.1.10
    date: 2025-11-20
    changes: "Historial inicial"
author: aymericzip
---

# Traduce tu sitio web SvelteKit usando Intlayer | Internacionalización (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Tabla de Contenidos

<TOC/>

## ¿Por qué Intlayer en lugar de alternativas?

En comparación con soluciones principales como `svelte-i18n` o `i18next`, Intlayer es una solución que viene con optimizaciones integradas como:

<AccordionGroup>
<Accordion header="Soporte completo de SvelteKit">

Intlayer está optimizado para funcionar perfectamente con SvelteKit al ofrecer **enrutamiento multilingüe**, **soporte SSR** y todas las funciones necesarias para escalar la internacionalización (i18n).

</Accordion>

<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en sus páginas, cargue solo el contenido necesario. Intlayer ayuda a **reducir el tamaño de su bundle y de sus páginas hasta en un 50%**.

</Accordion>

<Accordion header="Mantenibilidad">

Determinar el alcance del contenido de su aplicación **facilita el mantenimiento** para aplicaciones a gran escala. Puede duplicar o eliminar una sola carpeta de funciones sin la carga mental de revisar todo el código base de contenido. Además, Intlayer está **completamente escrito** para garantizar la precisión de su contenido.

</Accordion>

<Accordion header="Agente de IA">

La ubicación conjunta de contenido **reduce el contexto necesario** para los modelos de lenguajes grandes (LLM). Intlayer también viene con un conjunto de herramientas, como una **CLI** para comprobar si faltan traducciones,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** y **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**, para que la experiencia del desarrollador (DX) sea aún más fluida para los agentes de IA.

</Accordion>

<Accordion header="Automatización">

Utilice la automatización para traducir su canal de CI/CD utilizando el LLM de su elección al costo de su proveedor de IA. Intlayer también ofrece un **compilador** para automatizar la extracción de contenido, así como una [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) para ayudar a **traducir en segundo plano**.

</Accordion>

<Accordion header="Actuación">

La conexión de archivos JSON masivos a componentes puede provocar problemas de rendimiento y reactividad. Intlayer optimiza la carga de su contenido en el momento de la compilación.

</Accordion>

<Accordion header="Escalando sin ningún desarrollador">

Más que una simple solución i18n, Intlayer proporciona un **[editor visual] autohospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** para ayudarle a administrar su contenido multilingüe en **tiempo real**, lo que facilita la colaboración con traductores, redactores y otros miembros del equipo. El contenido se puede almacenar de forma local y/o remota.

</Accordion>
</AccordionGroup>

---

## Guía paso a paso para configurar Intlayer en una aplicación SvelteKit

Ver [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-sveltekit-template) en GitHub.

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

<Steps>

<Step number={1} title="Instalar dependencias">

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> la bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

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

</Step>

<Step number={2} title="Configuración de tu proyecto">

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

</Step>

<Step number={3} title="Integra Intlayer en tu configuración de Vite">

Actualiza tu `vite.config.ts` para incluir el plugin de Intlayer. Este plugin se encarga de la transpilación de tus archivos de contenido.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // el orden importa, Intlayer debe ir antes que SvelteKit
});
```

</Step>

<Step number={4} title="Declara Tu Contenido">

Crea tus archivos de declaración de contenido en cualquier lugar dentro de tu carpeta `src` (por ejemplo, `src/lib/content` o junto a tus componentes). Estos archivos definen el contenido traducible para tu aplicación usando la función `t()` para cada locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

</Step>

<Step number={5} title="Utiliza Intlayer en Tus Componentes">

Ahora puedes usar la función `useIntlayer` en cualquier componente de Svelte. Devuelve un store reactivo que se actualiza automáticamente cuando cambia la configuración regional. La función respetará automáticamente la configuración regional actual (tanto durante SSR como durante la navegación del lado del cliente).

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
<h1>{@const Title = $content.title}<Title /></h1>
<!-- Para renderizar el contenido como una cadena -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="Configurar el enrutamiento" isOptional={true}>

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

</Step>

<Step number={7} title="Manejar la detección del locale en el servidor">

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

> `getLocaleFromStorage` verificará la localidad desde el encabezado o la cookie dependiendo de tu configuración. Consulta [Configuración](https://intlayer.org/doc/concept/configuration) para más detalles.

> La función `localeDetector` procesará el encabezado `Accept-Language` y devolverá la mejor coincidencia.

Si la localidad no está configurada, queremos devolver un error 404. Para facilitarlo, podemos crear una función `match` para verificar si la localidad es válida:

```ts fileName="/src/params/locale.ts"import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
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
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// Usa el tipo genérico Load
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Inicializar Intlayer con la locale de la ruta
  $effect(() => {
      setupIntlayer(data.locale);
  });
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
	import { useIntlayer } from "svelte-intlayer";

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

</Step>

<Step number={8} title="Enlaces internacionalizados" isOptional={true}>

Para SEO, se recomienda prefijar tus rutas con la locale (por ejemplo, `/en/about`, `/fr/about`). Este componente automáticamente prefija cualquier enlace con la locale actual.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

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

</Step>

<Step number={9} title="Selector de idioma" isOptional={true}>

Para permitir a los usuarios cambiar de idioma, actualiza la URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
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

</Step>

<Step number={10} title="Añadir proxy backend" isOptional={true}>

Para añadir un proxy backend a tu aplicación SvelteKit, puedes usar la función `intlayerProxy` proporcionada por el plugin `vite-intlayer`. Este plugin detectará automáticamente la mejor locale para el usuario basándose en la URL, cookies y preferencias de idioma del navegador.

> Desde Intlayer v9, `intlayerProxy()` está incluido directamente en el plugin `intlayer()` y habilitado por defecto a través de la opción `routing.enableProxy` (`true` por defecto). Registrarlo por separado como se muestra a continuación es ahora opcional — se mantiene para compatibilidad hacia atrás y para configuraciones que necesitan controlar el orden de los plugins. Establece `routing.enableProxy: false` para optar por no usarlo. Consulta las [notas de la versión v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/releases/v9.md).

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="Configurar el editor / CMS de intlayer" isOptional={true}>

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
  {@const Component = $content.component}<Component />
</div>
```

</Step>

<Step number={12} title="Extraer el contenido de tus componentes" isOptional={true}>

Si tienes una base de código existente, transformar miles de archivos puede llevar mucho tiempo.

Para facilitar este proceso, Intlayer propone un [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) para transformar tus componentes y extraer el contenido.

Para configurarlo, puedes agregar una sección `compiler` en tu archivo `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto de tu configuración
  compiler: {
    /**
     * Indica si el compilador debe estar habilitado.
     */
    enabled: true,

    /**
     * Define la ruta de los archivos de salida
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica si los componentes deben guardarse después de ser transformados. De esa manera, el compilador se puede ejecutar solo una vez para transformar la aplicación y luego se puede eliminar.
     */
    saveComponents: false,

    /**
     * Prefijo de clave de diccionario
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Comando de extracción'>

Ejecuta el extractor para transformar tus componentes y extraer el contenido

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Compilador Babel'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Actualiza tu archivo `vite.config.ts` para incluir el plugin `intlayerCompiler` :

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # O npm run dev
```

```bash packageManager="pnpm"
pnpm run build # O pnpm run dev
```

```bash packageManager="yarn"
yarn build # O yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

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

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar una aplicación de SvelteKit?">

- **`svelte-i18n`** y **`typesafe-i18n`**: catálogos de mensajes basados en stores, conectados a las funciones de carga a mano.
- **`Paraglide`**: mensajes compilados con un buen enfoque de tipado, centrado únicamente en la capa de mensajes.
- **`Intlayer`**: contenido declarado junto a cada componente y compilado en tiempo de compilación, con enrutamiento por idioma, detección del idioma en el servidor, traducción con IA, un editor visual y un CMS.

En SvelteKit la diferencia se nota en las piezas del lado del servidor: la detección del idioma en los hooks, los enlaces localizados y la integración del editor vienen con la biblioteca en lugar de montarse por proyecto. Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) y el [benchmark de i18n de Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/svelte.md).

</Question>

<Question title="¿Cuánto añade la i18n al tamaño del bundle de mi aplicación SvelteKit?">

Mucho menos que una configuración basada en espacios de nombres, porque una página nunca descarga un catálogo que no renderiza. El marcado renderizado en el servidor resuelve su contenido en el servidor, y el compilador de tiempo de compilación reemplaza las llamadas a `useIntlayer` por las entradas de diccionario exactas que usa un componente, de modo que se descartan las claves sin usar y los idiomas sin usar, y los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) reparten el resto por idioma. Frente a las alternativas habituales, Intlayer reduce el tamaño del bundle y de la página hasta en un 50%. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/svelte.md).

</Question>

<Question title="¿Puedo migrar desde `svelte-i18n` o `typesafe-i18n` sin reescribir mis componentes?">

En gran medida. Sigue la [guía de migración de Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/svelte-i18n.md) para trasladar el contenido. También puedes migrar de forma gradual: el [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus catálogos JSON existentes como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, de modo que ambas capas se mantienen sincronizadas mientras trasladas los componentes uno a uno.

</Question>

<Question title="¿Puedo conservar mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para los catálogos gettext, y los [archivos por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar los idiomas en un solo archivo.

</Question>

<Question title="¿Tengo que trasladar mi contenido clave por clave?">

No. Ejecuta `npx intlayer extract` e Intlayer lee tus componentes, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, así que revisas un diff en lugar de copiar cadenas a un catálogo una por una. El paso 12 de esta guía lo explica paso a paso.

Para una canalización totalmente automatizada, el [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) hace lo mismo en tiempo de compilación: escanea tu código JSX, TSX, Vue y Svelte en cada cambio, genera los diccionarios y los mantiene sincronizados mediante el reemplazo de módulos en caliente, así que no hay ninguna clave que mantener a mano.

Conviene conocer dos límites antes de activar el compilador. Funciona por análisis estático, así que las cadenas que solo existen en tiempo de ejecución, como los códigos de error de la API o los campos del CMS, quedan fuera de su alcance. Y tiene que distinguir el texto visible para el usuario de la lógica de la aplicación, como `className="active"` o un código de estado, lo que requiere unas pocas anotaciones en una base de código grande. El [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) evita ambos manteniéndote en el proceso.

</Question>

<Question title="¿Qué herramientas para editores y agentes de IA están disponibles?">

Cinco piezas, todas opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave `useIntlayer` al archivo de contenido que la declara, extrae contenido de un componente y ejecuta build, fill, test, push y pull desde la paleta de comandos o desde una pestaña de Intlayer dedicada.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: el mismo conocimiento en cualquier editor que hable LSP, con ir a la definición, buscar todas las referencias, vistas previas al pasar el cursor de un valor traducido, autocompletado de claves y campos, y un aviso cuando una clave no está declarada en ninguna parte. También resuelve las llamadas a `i18next`, `react-i18next`, `next-intl` y `use-intl`, lo que ayuda durante la migración.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación y la CLI de Intlayer a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT, para que un asistente responda a partir de la documentación actual en lugar de adivinar, y pueda ejecutar comandos como `intlayer fill` por sí mismo.
- **[Habilidades para agentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades específicas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, además de una por framework, que enseñan a un agente tu configuración de enrutamiento y los tipos de nodo de contenido.
- **[Plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca las cadenas codificadas de forma fija, con reglas adicionales para claves de diccionario estáticas y contenido sin usar.

</Question>

<Question title="¿Intlayer funciona con el renderizado en el servidor y el prerenderizado de SvelteKit?">

Sí. El paso 7 cubre la detección del idioma en el servidor en `hooks.server.ts`, así que la primera respuesta HTML ya lleva el idioma correcto, que es lo que leen los motores de búsqueda y los rastreadores sociales. Las rutas prerenderizadas resuelven su contenido en tiempo de compilación.

</Question>

<Question title="¿Cómo configuro rutas localizadas y enlaces internacionalizados?">

Lo cubren los pasos 6 y 8. Un segmento de idioma en el árbol de rutas más `getLocalizedUrl` para los enlaces mantiene la navegación dentro del idioma activo, y `routing.mode` decide si el idioma por defecto lleva prefijo siquiera. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Question>

<Question title="¿Cómo creo un selector de idioma en Svelte?">

El paso 9 muestra el componente. `useLocale` expone el idioma activo, los idiomas declarados y un setter que conserva la elección en una cookie, mientras que `getLocalizedUrl` reescribe la ruta actual para que el lector permanezca en la misma página tras el cambio.

</Question>

<Question title="¿Cómo traduzco una aplicación SvelteKit automáticamente con IA?">

Ejecuta `npx intlayer fill`, que rellena las traducciones que faltan con el LLM de tu elección usando tu propio proveedor y tu clave de API, y `--git-diff` limita la ejecución al contenido modificado en la rama. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) y la [integración de CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

</Question>

<Question title="¿Intlayer admite plurales, género y texto enriquecido?">

Sí: [formas plurales](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/plurial.md), [contenido según el género](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender.md), condiciones, [inserciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md) y [formateadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md) para números, fechas y monedas.

</Question>

<Question title="¿Cómo pueden los traductores editar el contenido sin tocar el código?">

A través del [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md), que se ejecuta en tu propia infraestructura y permite que cualquiera edite texto en su sitio en la aplicación en ejecución, o del [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md), que externaliza el contenido para que pueda cambiar sin un despliegue.

</Question>

<Question title="¿Es Intlayer gratuito y de código abierto?">

Sí, bajo la licencia Apache 2.0, uso comercial incluido. El CMS alojado es un servicio de pago opcional que también puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
