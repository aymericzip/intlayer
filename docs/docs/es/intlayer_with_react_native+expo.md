---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Expo + React Native i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación Expo + React Native multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
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

# Traduce tu aplicación Expo y React Native | Internacionalización (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-react-native-template) en GitHub.

## ¿Por qué Intlayer en lugar de alternativas?

En comparación con soluciones principales como `react-native-localize` o `i18next`, Intlayer es una solución que viene con optimizaciones integradas como:

<AccordionGroup>

<Accordion header="Cobertura nativa completa de React">

Intlayer está optimizado para funcionar perfectamente con React Native y Expo al ofrecer **alcance de contenido a nivel de componente**, **compatibilidad con TypeScript** y todas las funciones necesarias para escalar la internacionalización (i18n) en aplicaciones móviles.

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

<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en sus páginas, cargue solo el contenido necesario. Intlayer ayuda a **reducir el tamaño de su bundle y de sus vistas hasta en un 50%**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="instalar dependencias">

Consulte [Plantilla de aplicación](https://github.com/aymericzip/intlayer-react-native-template) en GitHub.

Desde su proyecto React Native, instale los siguientes paquetes:

```paquete de bashManager="npm"
npm instala intlayer reaccionar-intlayer
instalación npm --save-dev reaccionar-nativo-intlayer
inicio de capa interna npx
```

```paquete de bashManager="pnpm"
pnpm agregar intlayer reaccionar-intlayer
pnpm agregar --save-dev reaccionar-nativo-intlayer
inicio de capa interna pnpm
```

```bash packageManager="hilo"
hilo agregar capa interna reaccionar-capa interna
hilo agregar --save-dev reaccionar-nativo-intlayer
inicio de capa interna de hilo
```

```bash packageManager="bun"
bollo agregar intlayer reaccionar-intlayer
agregar bollo --dev reaccionar-nativo-intlayer
inicio de capa intermedia x bun
```

### Paquetes

- **capa interna**  
  El conjunto de herramientas principal de i18n para configuración, contenido de diccionario, generación de tipos y comandos CLI.

- **reaccionar-intlayer**  
  Integración de React que proporciona los proveedores de contexto y los enlaces de React que usará en React Native para obtener y cambiar de configuración regional.

- **reaccionar-nativo-intlayer**  
  Integración de React Native que proporciona el complemento Metro para integrar Intlayer con el paquete React Native.

---

</Step>

<Step number={2} title="Instalar dependencias">

Desde tu proyecto React Native, instala los siguientes paquetes:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
bun x intlayer init
```

### Paquetes

- **intlayer**  
  El conjunto de herramientas principal de i18n para configuración, contenido de diccionarios, generación de tipos y comandos CLI.

- **react-intlayer**  
  Integración con React que proporciona los proveedores de contexto y hooks de React que usarás en React Native para obtener y cambiar configuraciones regionales.

- **react-native-intlayer**  
  Integración con React Native que proporciona el plugin Metro para integrar Intlayer con el empaquetador de React Native.

---

</Step>

<Step number={3} title="Crear una Configuración de Intlayer">

En la raíz de tu proyecto (o en cualquier lugar conveniente), crea un archivo de **configuración de Intlayer**. Podría verse así:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * Si los tipos de Locales no están disponibles, intenta configurar moduleResolution a "bundler" en tu tsconfig.json
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Agrega cualquier otra configuración regional que necesites
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Dentro de esta configuración, puedes:

- Configurar tu **lista de configuraciones regionales soportadas**.
- Establecer una configuración regional **predeterminada**.
- Más adelante, puedes agregar opciones más avanzadas (por ejemplo, registros, directorios de contenido personalizados, etc.).
- Consulta la [documentación de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para más información.

</Step>

<Step number={4} title="Añadir el plugin de Metro">

Metro es un empaquetador para React Native. Es el empaquetador predeterminado para proyectos de React Native creados con el comando `react-native init`. Para usar Intlayer con Metro, necesitas añadir el plugin en tu archivo `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

</Step>

<Step number={5} title="Añadir el proveedor de Intlayer">

Para mantener sincronizado el idioma del usuario en toda tu aplicación, necesitas envolver tu componente raíz con el componente `IntlayerProvider` de `react-intlayer-native`.

> Asegúrate de usar el proveedor de `react-native-intlayer` en lugar de `react-intlayer`. La exportación de `react-native-intlayer` incluye polyfills para la API web.

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="Declara Tu Contenido">

Crea archivos de **declaración de contenido** en cualquier lugar de tu proyecto (comúnmente dentro de `src/`), usando cualquiera de los formatos de extensión que Intlayer soporta:

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

Ejemplo (TypeScript con nodos TSX para React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Diccionario de contenido para nuestro dominio "app"
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> Para más detalles sobre las declaraciones de contenido, consulta [la documentación de contenido de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

---

</Step>

<Step number={7} title="Usa Intlayer en tus Componentes">

Usa el hook `useIntlayer` en componentes hijos para obtener contenido localizado.

### Ejemplo

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> Al usar `content.someKey` en propiedades basadas en cadenas (por ejemplo, el `title` de un botón o los `children` de un componente `Text`), **llama a `content.someKey.value`** para obtener la cadena real.

> Si su aplicación ya existe, puede utilizar el [Compilador Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md), así como el [comando de extracción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md), para transformar miles de componentes en un segundo.

---

</Step>

<Step number={8} title="Cambiar la configuración regional de la aplicación" isOptional={true}>

Para cambiar la configuración regional desde dentro de tus componentes, puedes usar el método `setLocale` del hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

Esto provoca una nueva renderización de todos los componentes que usan contenido de Intlayer, mostrando ahora las traducciones para la nueva configuración regional.

> Consulta la [documentación de `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md) para más detalles.

</Step>

</Steps>

## Configurar TypeScript (si usas TypeScript)

Intlayer genera definiciones de tipos en una carpeta oculta (por defecto `.intlayer`) para mejorar la autocompletación y detectar errores de traducción:

```json5
// tsconfig.json
{
  // ... tu configuración TS existente
  "include": [
    "src", // tu código fuente
    ".intlayer/types/**/*.ts", // <-- asegura que se incluyan los tipos generados automáticamente
    // ... cualquier otra cosa que ya incluyas
  ],
}
```

Esto habilita características como:

- **Autocompletado** para las claves de tu diccionario.
- **Verificación de tipos** que avisa si accedes a una clave inexistente o si hay un desajuste de tipo.

---

## Configuración de Git

Para evitar comprometer archivos generados automáticamente por Intlayer, añade lo siguiente a tu `.gitignore`:

```bash
#  Ignorar los archivos generados por Intlayer
.intlayer
```

---

### Extensión para VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ir Más Allá

- **Editor Visual**: Usa el [Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) para gestionar las traducciones visualmente.
- **Integración con CMS**: También puedes externalizar y obtener el contenido de tu diccionario desde un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
- **Comandos CLI**: Explora el [CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para tareas como **extraer traducciones** o **verificar claves faltantes**.

¡Disfruta construyendo tus aplicaciones **React Native** con i18n completamente potenciado a través de **Intlayer**!

---
