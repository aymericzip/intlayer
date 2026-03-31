---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: i18n Vanilla JS - Cómo traducir una aplicación Vanilla JS en 2026
description: Descubre cómo hacer que tu sitio web Vanilla JS sea multilingüe. Sigue la documentación para internacionalizarlo (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "Inicio del historial"
---

# Traduce tu sitio web Vanilla JS usando Intlayer | Internacionalización (i18n)

## Tabla de Contenidos

<TOC/>

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar el soporte de TypeScript** con tipos autogenerados, mejorando el autocompletado y la detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y el cambio dinámico de idioma.

Esta guía demuestra cómo usar Intlayer en una aplicación de Vanilla JavaScript **sin usar un gestor de paquetes o un empaquetador** (como Vite, Webpack, etc.).

Si tu aplicación usa un empaquetador (como Vite), te recomendamos seguir la [Guía de Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+vanilla.md) en su lugar.

Usando el paquete independiente (standalone), puedes importar Intlayer directamente en tus archivos HTML mediante un único archivo JavaScript, lo que lo hace perfecto para proyectos heredados o sitios estáticos simples.

---

## Guía paso a paso para configurar Intlayer en una aplicación Vanilla JS

### Paso 1: Instalar dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
# Generar un paquete independiente de intlayer y vanilla-intlayer
# Este archivo se importará en tu archivo HTML
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar intlayer con el archivo de configuración
npx intlayer init --no-gitignore

# Construir los diccionarios
npx intlayer build
```

```bash packageManager="pnpm"
# Generar un paquete independiente de intlayer y vanilla-intlayer
# Este archivo se importará en tu archivo HTML
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar intlayer con el archivo de configuración
pnpm intlayer init --no-gitignore

# Construir los diccionarios
pnpm intlayer build
```

```bash packageManager="yarn"
# Generar un paquete independiente de intlayer y vanilla-intlayer
# Este archivo se importará en tu archivo HTML
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar el archivo de configuración de intlayer, TypeScript si está configurado, variables de entorno
yarn intlayer init --no-gitignore

# Construir los diccionarios
yarn intlayer build
```

```bash packageManager="bun"
# Generar un paquete independiente de intlayer y vanilla-intlayer
# Este archivo se importará en tu archivo HTML
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar intlayer con el archivo de configuración
bun x intlayer init --no-gitignore

# Construir los diccionarios
bun x intlayer build
```

- **intlayer**
  El paquete principal que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos de CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **vanilla-intlayer**
  El paquete que integra Intlayer con aplicaciones puras de JavaScript / TypeScript. Proporciona un singleton de publicación/suscripción (`IntlayerClient`) y ayudantes basados en callbacks (`useIntlayer`, `useLocale`, etc.) para que cualquier parte de tu aplicación pueda reaccionar a los cambios de idioma sin depender de un framework de UI.

> La exportación de empaquetado (bundling) del CLI `intlayer standalone` produce una compilación optimizada mediante la eliminación de código muerto (tree-shaking) de paquetes no utilizados, idiomas y lógica no esencial (como redireccionamientos o prefijos) específica de su configuración.

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

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los registros de Intlayer en la consola y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Importar el paquete en tu HTML

Una vez que hayas generado el paquete `intlayer.js`, puedes importarlo en tu archivo HTML:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />

    <!-- Importar el paquete -->
    <script src="./intlayer.js" defer></script>
    <!-- Importar tu script principal -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

El paquete expone `Intlayer` y `VanillaIntlayer` como objetos globales en `window`.

### Paso 4: Inicializar Intlayer en tu punto de entrada

En tu `src/main.js`, llama a `installIntlayer()` **antes** de que se renderice cualquier contenido para que el singleton global de idioma esté listo.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Debe llamarse antes de renderizar cualquier contenido i18n.
installIntlayer();
```

Si también quieres usar el renderizador de markdown, llama a `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

### Paso 5: Declarar Tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 6: Usar Intlayer en tu JavaScript

El objeto `window.VanillaIntlayer` proporciona ayudantes de API: `useIntlayer(key, locale?)` devuelve el contenido traducido para una clave dada.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Obtener el contenido inicial para el idioma actual.
// Encadenar .onChange() para ser notificado cada vez que cambie el idioma.
const content = useIntlayer("app").onChange((newContent) => {
  // Volver a renderizar o parchear solo los nodos DOM afectados
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Renderizado inicial
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Accede a los valores finales como cadenas envolviéndolos en `String()`, que llama al método `toString()` del nodo y devuelve el texto traducido.
>
> Cuando necesites el valor para un atributo HTML nativo (por ejemplo, `alt`, `aria-label`), usa `.value` directamente:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

### (Opcional) Paso 7: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, usa la función `setLocale` expuesta por `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Idioma");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // Mantener el menú desplegable sincronizado cuando el idioma cambia desde otro lugar
  return subscribe((newLocale) => render(newLocale));
}
```

### (Opcional) Paso 8: Cambiar los atributos de idioma y dirección HTML

Actualiza los atributos `lang` y `dir` de la etiqueta `<html>` para que coincidan con la configuración regional actual para accesibilidad y SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (Opcional) Paso 9: Carga diferida de diccionarios por idioma

Si deseas cargar diferidamente diccionarios por idioma, puedes usar `useDictionaryDynamic`. Esto es útil si no deseas incluir todas las traducciones en el archivo inicial `intlayer.js`.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Nota: `useDictionaryDynamic` requiere que los diccionarios estén disponibles como archivos ESM separados. Este enfoque se usa típicamente si tienes un servidor web que sirve los diccionarios.

### Configurar TypeScript

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Market de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
