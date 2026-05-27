---
createdAt: 2025-04-18
updatedAt: 2026-05-06
title: Angular i18n - Cómo traducir una aplicación Angular 21 (Vite) en 2026
description: Descubre cómo hacer que tu sitio web en Angular sea multilingüe. Sigue la documentación para internacionalizarlo (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-21-template
applicationShowcase: https://intlayer-angular-21-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid al acceso directo a propiedades"
  - version: 8.0.0
    date: 2026-01-26
    changes: "Lanzamiento de versión estable"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Añadir comando init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
---

# Traduce tu sitio Angular 21 (Vite) usando Intlayer | Internacionalización (i18n)

## Tabla de Contenidos

<TOC/>

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora de internacionalización (i18n) de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar el soporte de TypeScript** con tipos autogenerados, mejorando el autocompletado y la detección de errores.
- **Beneficiarte de características avanzadas**, como la detección y cambio dinámico de idioma.

---

## Guía Paso a Paso para Configurar Intlayer en una Aplicación Angular

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo Internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Ver la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-angular-21-template) en GitHub.

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
bun x intlayer init
```

- **intlayer**

  El paquete central que proporciona herramientas de internacionalización para la gestión de configuraciones, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **angular-intlayer**
  El paquete que integra Intlayer con la aplicación Angular. Proporciona proveedores de contexto y hooks para la internacionalización en Angular.

- **@angular-builders/custom-esbuild**
  Requerido para personalizar la configuración esbuild de Angular CLI.

### Paso 2: Configuración de tu proyecto

Crea un archivo de configuración para establecer los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> A través de este archivo de configuración, puedes establecer URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola y más. Para obtener una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en tu Configuración Angular

Para integrar Intlayer con la CLI de Angular, necesitas usar un constructor (builder) personalizado. Esta guía asume que estás usando Vite/esbuild (por defecto para proyectos Angular 21).

Primero, modifica tu `angular.json` para usar el constructor esbuild personalizado. Actualiza las configuraciones `build` y `serve`:

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application", // replace "@angular/build:application"
          "options": {
            "define": {
              "process.env": "{}",
            },
            "plugins": ["./esbuild.plugins.ts"],
            "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-esbuild:dev-server", // replace "@angular/build:dev-server"
          "options": {
            "prebundle": {
              "exclude": [
                "intlayer",
                "angular-intlayer",
                "@intlayer/config/built",
                "@intlayer/core"
              ]
          },
        },
      },
    },
  },
}
```

> Asegúrate de reemplazar `your-app-name` con el nombre real de tu proyecto en `angular.json`.

Luego, crea un archivo `esbuild.plugins.ts` en la raíz de tu proyecto:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> La función `intlayerEsbuildPlugin` configura esbuild con Intlayer. Inyecta el plugin para manejar los archivos de declaración de contenido y establece las configuraciones para un rendimiento óptimo.

> **Usuarios de NX**: Los constructores de Angular de NX cargan archivos de complementos a través de la resolución ESM nativa de Node y no compilan archivos de complementos de TypeScript sobre la marcha. Use un archivo `.mjs` en su lugar y actualice la referencia de `plugins` en `angular.json` en consecuencia:
>
> ```javascript fileName="esbuild.plugins.mjs"
> import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";
>
> export default [intlayerEsbuildPlugin()];
> ```
>
> Luego, en `angular.json`, apunte a `"./esbuild.plugins.mjs"` en lugar de `"./esbuild.plugins.ts"`.

### Paso 4: Declara tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar las traducciones:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y que coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Utiliza Intlayer en tu Código

Para utilizar las características de internacionalización de Intlayer en toda tu aplicación Angular, necesitas proveer Intlayer en la configuración de tu aplicación.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Añade el proveedor de Intlayer aquí
  ],
};
```

Luego, puedes usar la función `useIntlayer` dentro de cualquier componente.

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

Y en tu plantilla:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

El contenido de Intlayer se devuelve como una Señal (`Signal`), por lo que accedes a los valores llamando a la señal: `content().title`.

### (Opcional) Paso 6: Cambia el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes usar la función `setLocale` proporcionada por la función `useLocale`. Esto te permite establecer el idioma de la aplicación y actualizar el contenido en consecuencia.

Crea un componente para cambiar entre idiomas:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Luego, usa este componente en tu `app.component.ts`:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "./locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

### Configurar TypeScript

Intlayer utiliza el aumento de módulos para aprovechar los beneficios de TypeScript y hacer que tu base de código sea más sólida.

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

### Configuración Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar subirlos a tu repositorio de Git.

Para hacer esto, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```bash
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
- **Acciones rápidas** para crear y actualizar fácilmente las traducciones.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de VS Code de Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---
