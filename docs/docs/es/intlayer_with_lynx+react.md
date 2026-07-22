---
createdAt: 2025-03-09
updatedAt: 2026-05-31
title: "Lynx + React i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación Lynx + React multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
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
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Agregar comando init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
author: aymericzip
---

# Traduce tu Lynx and React mobile app con Intlayer | Internacionalización (i18n)

Consulta [Application Template](https://github.com/aymericzip/intlayer-lynx-template) en GitHub.

## ¿Por qué Intlayer en lugar de alternativas?

En comparación con soluciones principales como `react-native-localize` o `i18next`, Intlayer es una solución que viene con optimizaciones integradas como:

<AccordionGroup>

<Accordion header="Soporte completo de Lynx">

Intlayer está optimizado para funcionar perfectamente con Lynx y React al ofrecer **alcance del contenido a nivel de componente**, **compatibilidad con TypeScript** y todas las funciones necesarias para escalar la internacionalización (i18n).

</Accordion>

<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en sus páginas, cargue solo el contenido necesario. Intlayer ayuda a **reducir el tamaño de su bundle y de sus páginas hasta en un 50%**.

</Accordion>

<Accordion header="Mantenibilidad">

Determinar el alcance del contenido de su aplicación **facilita el mantenimiento** para aplicaciones a gran escala. Puede duplicar o eliminar una sola carpeta de funciones sin la carga mental de revisar todo el código base de contenido. Además, Intlayer está **completamente escrito** para garantizar la precisión de su contenido.

</Accordion>

<Accordion header="Agente de IA">

La ubicación conjunta de contenido **reduce el contexto necesario** para los modelos de lenguajes grandes (LLM). Intlayer también viene con un conjunto de herramientas, como una **CLI** para comprobar si faltan traducciones,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** y **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, para que la experiencia del desarrollador (DX) sea aún más fluida para los agentes de IA.

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

<Steps>

<Step number={1} title="Instalar dependencias">

Desde tu proyecto Lynx, instala los siguientes paquetes:

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
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
```

### Paquetes

- **intlayer**  
  Herramienta principal de i18n para la configuración, contenido de diccionarios, generación de tipos y comandos CLI.

- **react-intlayer**  
  Integración con React que provee los contextos y hooks de React que usarás en Lynx para obtener y cambiar el local.

- **lynx-intlayer**  
  Integración con Lynx que provee el plugin para usar Intlayer con el bundler de Lynx.

---

</Step>

<Step number={2} title="Crea un archivo de configuración de Intlayer">

En la raíz de tu proyecto (o en algún lugar conveniente), crea un archivo de configuración **Intlayer**. Por ejemplo:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

En esta configuración puedes:

- Configurar tu **lista de locales soportados**.
- Establecer un local **por defecto**.
- Más adelante, puedes añadir opciones más avanzadas (p. ej., logs, directorios de contenido personalizados, etc.).
- Consulta la [documentación de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para más información.

</Step>

<Step number={3} title="Agrega el plugin de Intlayer al bundler de Lynx">

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

</Step>

<Step number={4} title="Agrega el proveedor de Intlayer">

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

</Step>

<Step number={5} title="Declara tu contenido">

Crea archivos de **declaración de contenido** en cualquier lugar de tu proyecto (generalmente dentro de `src/`), usando cualquiera de las extensiones que soporta Intlayer:

- `.content.json`
- `.content.jsonc`
- `.content.json5`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`
- etc.

Ejemplo:

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Para más información sobre la declaración de contenido, consulta la [documentación de contenido de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

---

</Step>

<Step number={6} title="Usa Intlayer en tus componentes">

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

</Step>

<Step number={7} title="Cambiar el local de la aplicación" isOptional={true}>

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

</Step>

</Steps>

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

```bash
#  Ignora los archivos generados por Intlayer
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
- **Comandos CLI**: Explora el [CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para tareas como **extraer traducciones** o **comprobar claves faltantes**.

---
