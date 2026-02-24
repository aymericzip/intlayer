---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite y React i18n - Transforma una aplicación existente en una aplicación multilingüe (guía i18n 2026)
description: Descubre cómo hacer que tu aplicación Vite y React existente sea multilingüe utilizando Intlayer Compiler. Sigue la documentación para internacionalizar (i18n) y traducirla con IA.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Vite
  - React
  - Compilador
  - IA
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
  - AI
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Lanzamiento inicial
---

# Cómo hacer multilingüe (i18n) una aplicación Vite y React existente a posteriori (guía i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">
  
<iframe title="¿La mejor solución i18n para Vite y React? Descubre Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Ver [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-vite-react-template) en GitHub.

## Tabla de Contenidos

<TOC/>

## ¿Por qué es difícil internacionalizar una aplicación existente?

Si alguna vez has intentado añadir varios idiomas a una aplicación que fue construida para uno solo, conoces el dolor. No es solo "difícil", es tedioso. Tienes que peinar cada archivo, cazar cada cadena de texto y moverlas a archivos de diccionario separados.

Luego viene la parte arriesgada: reemplazar todo ese texto con ganchos de código sin romper tu diseño o lógica. Es el tipo de trabajo que detiene el desarrollo de nuevas funciones durante semanas y se siente como una refactorización interminable.

## ¿Qué es el Compilador de Intlayer?

El **Compilador de Intlayer** fue construido para saltarse ese trabajo manual pesado. En lugar de extraer las cadenas manualmente, el compilador lo hace por ti. Escanea tu código, encuentra el texto y utiliza IA para generar los diccionarios en segundo plano.
Luego, modifica tu código durante la construcción para inyectar los ganchos i18n necesarios. Básicamente, sigues escribiendo tu aplicación como si fuera de un solo idioma, y el compilador se encarga de la transformación multilingüe automáticamente.

> Documentación del Compilador: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md

### Limitaciones

Debido a que el compilador realiza el análisis y la transformación del código (insertando ganchos y generando diccionarios) en el **momento de la compilación**, puede **ralentizar el proceso de construcción** de tu aplicación.

Para mitigar este impacto durante el desarrollo, puedes configurar el compilador para que se ejecute en modo [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) o desactivarlo cuando no sea necesario.

---

## Guía paso a paso para configurar Intlayer en una aplicación Vite y React

### Paso 1: Instalar dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **react-intlayer**
  El paquete que integra Intlayer con la aplicación React. Proporciona proveedores de contexto y ganchos para la internacionalización de React.

- **vite-intlayer**
  Incluye el complemento de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como el middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URL.

### Paso 2: Configura tu proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true, // Puede establecerse en 'build-only' para limitar el impacto en el modo dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Sin prefijo comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Esta aplicación es una aplicación de mapas", // Nota: puedes personalizar esta descripción de la aplicación
  },
};

export default config;
```

> **Nota**: Asegúrate de tener tu `OPEN_AI_API_KEY` configurada en tus variables de entorno.

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los registros de Intlayer en la consola y más. Para obtener una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integra Intlayer en tu configuración de Vite

Añade el complemento de intlayer en tu configuración.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> El complemento Vite `intlayer()` se utiliza para integrar Intlayer con Vite. Garantiza la construcción de archivos de declaración de contenido y los supervisa en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

> El complemento Vite `intlayerCompiler()` se utiliza para extraer contenido del componente y escribir archivos `.content`.

### Paso 4: Compila tu código

Simplemente escribe tus componentes con cadenas codificadas en tu idioma predeterminado. El compilador se encarga del resto.

Ejemplo de cómo podría verse tu página:

<Tabs>
 <Tab value="Código">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Salida">

```ts fileName="i18n/app-content.content.tsx"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      es: {
        viteLogo: "Logotipo de Vite",
        reactLogo: "Logotipo de React",
        title: "Vite + React",
        countButton: "la cuenta es",
        editMessage: "Edita",
        hmrMessage: "y guarda para probar HMR",
        readTheDocs: "Haz clic en los logotipos de Vite y React para saber más",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** se utiliza para proporcionar el idioma a los componentes anidados.

### (Opcional) Paso 6: Cambiar el idioma de tu contenido

Para cambiar el idioma de tu contenido, puedes usar la función `setLocale` proporcionada por el gancho `useLocale`. Esta función te permite establecer el idioma de la aplicación y actualizar el contenido en consecuencia.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.SPANISH)}>
      Cambiar idioma a español
    </button>
  );
};
```

> Para obtener más información sobre el gancho `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md).

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar enviarlos a tu repositorio de Git.

Para hacer esto, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión de VS Code de Intlayer](https://intlayer.org/doc/vs-code-extension).

### Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido utilizando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
