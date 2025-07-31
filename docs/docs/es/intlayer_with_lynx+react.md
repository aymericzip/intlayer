---
createdAt: 2025-03-09
updatedAt: 2025-06-29
title: Traduce tu aplicación móvil Lynx y React (i18n)
description: Descubre cómo hacer que tu aplicación móvil Lynx y React sea multilingüe. Sigue la documentación para internacionalizar (i18n) y traducirla.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
---

# Comenzando con la internacionalización (i18n) usando Intlayer, Lynx y React

Consulta [Application Template](https://github.com/aymericzip/intlayer-lynx-template) en GitHub.

## ¿Qué es Intlayer?

**Intlayer** es una **librería innovadora y de código abierto para la internacionalización (i18n)** que simplifica el soporte multilingüe en aplicaciones modernas. Funciona en muchos entornos JavaScript/TypeScript, **incluido Lynx** (a través del paquete `react-intlayer`).

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Garantizar soporte para TypeScript** con tipos generados automáticamente.
- **Localizar contenido dinámicamente**, incluyendo **cadenas de la interfaz de usuario** (y en React para web, también puede localizar metadatos HTML, etc.).
- **Aprovechar funciones avanzadas**, como la detección y cambio dinámico de local.

---

## Paso 1: Instalar dependencias

Desde tu proyecto Lynx, instala los siguientes paquetes:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

### Paquetes

- **intlayer**  
  Herramienta principal de i18n para la configuración, contenido de diccionarios, generación de tipos y comandos CLI.

- **react-intlayer**  
  Integración con React que provee los contextos y hooks de React que usarás en Lynx para obtener y cambiar el local.

- **lynx-intlayer**  
  Integración con Lynx que provee el plugin para usar Intlayer con el bundler de Lynx.

---

## Paso 2: Crea un archivo de configuración de Intlayer

En la raíz de tu proyecto (o en algún lugar conveniente), crea un archivo de configuración **Intlayer**. Por ejemplo:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Agrega cualquier otro local que necesites
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Agrega cualquier otro local que necesites
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

En esta configuración puedes:

- Configurar tu **lista de locales soportados**.
- Establecer un local **por defecto**.
- Más adelante, puedes añadir opciones más avanzadas (p. ej., logs, directorios de contenido personalizados, etc.).
- Consulta la [documentación de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para más información.

## Paso 3: Agrega el plugin de Intlayer al bundler de Lynx

Para usar Intlayer con Lynx, debes añadir el plugin en tu archivo `lynx.config.ts`:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... otros plugins
    pluginIntlayerLynx(),
  ],
});
```

## Paso 4: Agrega el proveedor de Intlayer

Para mantener sincronizado el idioma del usuario en toda tu aplicación, debes envolver tu componente raíz con el componente `IntlayerProvider` de `react-intlayer`.

Además, necesitas añadir la función `intlayerPolyfill` para asegurar que Intlayer funcione correctamente.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## Paso 5: Declara tu contenido

Crea archivos de **declaración de contenido** en cualquier lugar de tu proyecto (generalmente dentro de `src/`), usando cualquiera de las extensiones que soporta Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- etc.

Ejemplo:

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Tap the logo and have fun!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "es": "Editar",
          "en": "Edit",
          "fr": "Modifier"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "es": "para ver actualizaciones!",
          "en": "to see updates!",
          "fr": "pour voir les mises à jour!"
        }
      }
    ]
  }
}
```

> Para más información sobre la declaración de contenido, consulta la [documentación de contenido de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

---

## Paso 4: Usa Intlayer en tus componentes

Utiliza el hook `useIntlayer` en los componentes hijos para obtener contenido localizado.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");
  const onTap = useCallback(() => {
    "background only";
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> Cuando utilices `content.someKey` en props basados en cadenas (por ejemplo, el `title` de un botón o los `children` de un componente `Text`), **usa `content.someKey.value`** para obtener la cadena real.

---

## (Opcional) Paso 5: Cambiar el local de la aplicación

Para cambiar de local desde tus componentes, puedes usar el método `setLocale` del hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

Esto provoca que se vuelvan a renderizar todos los componentes que usan contenido de Intlayer, mostrándose ahora las traducciones para el nuevo local.

> Consulta la [documentación de `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md) para más detalles.

## Configurar TypeScript (si usas TypeScript)

Intlayer genera definiciones de tipo en una carpeta oculta (por defecto `.intlayer`) para mejorar la autocompletación y detectar errores de traducción:

```json5
// tsconfig.json
{
  // ... tu configuración existente de TS
  "include": [
    "src", // tu código fuente
    ".intlayer/types/**/*.ts", // <-- asegura incluir los tipos generados automáticamente
    // ... cualquier otra carpeta que incluyas
  ],
}
```

Esto habilita características como:

- **Autocompletado** para las claves de tu diccionario.
- **Comprobación de tipos** que advierte si accedes a una clave inexistente o si hay discrepancias de tipo.

---

## Configuración de Git

Para evitar subir a tu repositorio los archivos generados automáticamente por Intlayer, añade lo siguiente a tu `.gitignore`:

```plaintext
# Ignora los archivos generados por Intlayer
.intlayer
```

---

### Extensión para VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la extensión oficial **Intlayer VS Code Extension**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión ofrece:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.
  Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Para profundizar

- **Editor visual**: Usa el [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) para administrar traducciones de forma visual.
- **Integración con CMS**: También puedes externalizar y obtener el contenido de tus diccionarios desde un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
- **Comandos CLI**: Explora el [CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md) para tareas como **extraer traducciones** o **comprobar claves faltantes**.

---

## Historial del documento

- 5.5.10 - 2025-06-29: Historial inicial
