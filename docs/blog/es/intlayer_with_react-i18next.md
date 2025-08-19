---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer y react-i18next
description: Comparar Intlayer con react-i18next para una aplicación React
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internacionalización
  - Blogumentación
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-react-i18next
---

# React Internationalization (i18n) con react-i18next y Intlayer

## Resumen

- **Intlayer** te ayuda a gestionar traducciones a través de archivos de declaración de contenido a **nivel de componente**.
- **react-i18next** es una integración popular de React para **i18next** que proporciona hooks como `useTranslation` para obtener cadenas localizadas en tus componentes.

Cuando se combinan, Intlayer puede **exportar** diccionarios en **JSON compatible con i18next**, de modo que react-i18next pueda **consumirlos** en tiempo de ejecución.

## ¿Por Qué Usar Intlayer con react-i18next?

Los archivos de declaración de contenido **Intlayer** ofrecen una mejor experiencia para desarrolladores porque son:

1. **Flexibles en la Ubicación de Archivos**  
   Coloca cada archivo de declaración de contenido justo al lado del componente que lo necesita. Esta estructura te permite mantener las traducciones co-localizadas, evitando traducciones huérfanas cuando los componentes se mueven o se eliminan.

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Archivo de declaración de contenido
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Archivo de declaración de contenido
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Archivo de declaración de contenido
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Archivo de declaración de contenido
               └── index.jsx
   ```

2. **Traducciones Centralizadas**  
   Un solo archivo de declaración de contenido recopila todas las traducciones necesarias para un componente, haciendo que las traducciones faltantes sean más fáciles de detectar.  
   Con TypeScript, incluso obtienes errores en tiempo de compilación si faltan traducciones.

## Instalación

En un proyecto de Create React App, instala estas dependencias:

```bash
# Con npm
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# Con yarn
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# Con pnpm
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### ¿Qué Son Estos Paquetes?

- **intlayer** – La CLI y biblioteca central para gestionar configuraciones de i18n, declaraciones de contenido y construir salidas de diccionario.
- **react-intlayer** – Integración específica de React para Intlayer, proporcionando notablemente algunos scripts para automatizar la construcción de diccionarios.
- **react-i18next** – Biblioteca de integración específica de React para i18next, incluyendo el hook `useTranslation`.
- **i18next** – El marco subyacente para el manejo de traducciones.
- **i18next-resources-to-backend** – Un backend de i18next que importa dinámicamente recursos JSON.

## Configurando Intlayer para Exportar Diccionarios de i18next

Crea (o actualiza) tu `intlayer.config.ts` en la raíz de tu proyecto:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Agrega tantos locales como desees
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Indica a Intlayer que cree JSON compatible con i18next
    dictionaryOutput: ["i18next"],

    // Elige un directorio de salida para los recursos generados
    // Esta carpeta se creará si no existe.
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **Nota**: Si no estás usando TypeScript, puedes crear este archivo de configuración como `.cjs`, `.mjs` o `.js` (consulta la [documentación de Intlayer](https://intlayer.org/en/doc/concept/configuration) para más detalles).

## Construyendo los Recursos de i18next

Una vez que tus declaraciones de contenido estén en su lugar (sección siguiente), ejecuta el **comando de construcción de Intlayer**:

```bash
# Con npm
npx run intlayer build
```

```bash
# Con yarn
yarn intlayer build
```

```bash
# Con pnpm
pnpm intlayer build
```

> Esto generará tus recursos de i18next dentro del directorio `./i18next/resources` por defecto.

Una salida típica podría verse así:

```bash
.
└── i18next
    └── resources
       ├── en
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

Donde cada clave de declaración de **Intlayer** se utiliza como un **espacio de nombres de i18next** (por ejemplo, `my-content.json`).

## Importando Diccionarios en tu Configuración de react-i18next

Para cargar dinámicamente estos recursos en tiempo de ejecución, utiliza [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend). Por ejemplo, crea un archivo `i18n.ts` (o `.js`) en tu proyecto:

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // plugin react-i18next
  .use(initReactI18next)
  // carga dinámicamente los recursos
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // Ajusta la ruta de importación a tu directorio de recursos
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // Inicializa i18next
  .init({
    // Localidad de respaldo
    fallbackLng: "en",

    // Puedes agregar otras opciones de configuración de i18next aquí, consulta:
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
  });

export default i18next;
```

Luego, en tu archivo **raíz** o **índice** (por ejemplo, `src/index.tsx`), importa esta configuración de `i18n` **antes** de renderizar la `App`:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// Inicializa i18n antes de cualquier otra cosa
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Creando y Gestionando Tus Declaraciones de Contenido

Intlayer extrae traducciones de "archivos de declaración de contenido" ubicados en cualquier lugar debajo de `./src` (por defecto).  
Aquí hay un ejemplo mínimo en TypeScript:

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // La "clave" será tu espacio de nombres de i18next (por ejemplo, "my-component")
  key: "my-component",
  content: {
    // Cada llamada "t" es un nodo de traducción separado
    heading: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    description: t({
      en: "My i18n description text...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

Si prefieres JSON, `.cjs` o `.mjs`, consulta la [documentación de Intlayer](https://intlayer.org/en/doc/concept/content).

> Por defecto, las declaraciones de contenido válidas coinciden con el patrón de extensión de archivo:

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## Usando las Traducciones en Componentes de React

Después de que hayas **construido** tus recursos de Intlayer y configurado react-i18next, puedes usar directamente el hook `useTranslation` de **react-i18next**.  
Por ejemplo:

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * El "espacio de nombres" de i18next es la `clave` de Intlayer de "MyComponent.content.ts"
 * así que pasaremos "my-component" a useTranslation().
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> Ten en cuenta que la función `t` hace referencia a **claves** dentro de tu JSON generado. Para una entrada de contenido de Intlayer llamada `heading`, usarás `t("heading")`.

## Opcional: Integrarse con Scripts de Create React App (CRACO)

**react-intlayer** proporciona un enfoque basado en CRACO para construcciones personalizadas y configuración del servidor de desarrollo. Si deseas que el paso de construcción de Intlayer se integre sin problemas, puedes:

1. **Instalar react-intlayer** (si no lo has hecho):
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **Ajustar tus scripts de `package.json`** para usar los scripts de `react-intlayer`:

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > Los scripts de `react-intlayer` se basan en [CRACO](https://craco.js.org/). También puedes implementar tu propia configuración basada en el plugin craco de intlayer. [Consulta un ejemplo aquí](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

Ahora, al ejecutar `npm run build`, `yarn build`, o `pnpm build` se activan las construcciones de Intlayer y CRA.

## Configuración de TypeScript

**Intlayer** proporciona **definiciones de tipo autogeneradas** para tu contenido. Para asegurarte de que TypeScript las reconozca, agrega **`types`** (o `types` si lo configuraste de otro modo) a tu arreglo **include** de `tsconfig.json`:

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> Esto permitirá que TypeScript infiera la estructura de tus traducciones para una mejor autocompletación y detección de errores.

## Configuración de Git

Se recomienda **ignorar** archivos y carpetas generados automáticamente por Intlayer. Agrega esta línea a tu `.gitignore`:

```plaintext
# Ignorar los archivos generados por Intlayer
.intlayer
i18next
```

Por lo general, no debes **comprometer** estos recursos o artefactos internos de construcción `.intlayer`, ya que pueden regenerarse en cada construcción.
