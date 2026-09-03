---
createdAt: 2025-06-18
updatedAt: 2026-08-30
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Importar providers y hooks directamente desde react-native-intlayer; react-intlayer ya no se necesita como dependencia directa"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Agregar comando init"
  - version: 6.1.6
    date: 2025-10-02
    changes: "Agregar sección de depuración"
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
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
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

## Tabla de Contenidos

<TOC/>

## ¿Por qué Intlayer en lugar de alternativas?

En comparación con soluciones principales como `react-native-localize` o `i18next`, Intlayer es una solución que viene con optimizaciones integradas como:

<AccordionGroup>
<Accordion header="Cobertura nativa completa de React">

Intlayer está optimizado para funcionar perfectamente con React Native y Expo al ofrecer **alcance de contenido a nivel de componente**, **compatibilidad con TypeScript** y todas las funciones necesarias para escalar la internacionalización (i18n) en aplicaciones móviles.

</Accordion>

<Accordion header="Mantenibilidad">

Determinar el alcance del contenido de su aplicación **facilita el mantenimiento** para aplicaciones a gran escala. Puede duplicar o eliminar una sola carpeta de funciones sin la carga mental de revisar todo el código base de contenido. Además, Intlayer está **completamente tipado** para garantizar la precisión de su contenido.

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

Más que una simple solución i18n, Intlayer proporciona un **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** autohospedado y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** para ayudarle a administrar su contenido multilingüe en **tiempo real**, lo que facilita la colaboración con traductores, redactores y otros miembros del equipo. El contenido se puede almacenar de forma local y/o remota.

</Accordion>

<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en sus páginas, cargue solo el contenido necesario. Intlayer ayuda a **reducir el tamaño de su bundle y de sus vistas hasta en un 50%**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="Instalar dependencias">

Consulte [Plantilla de aplicación](https://github.com/aymericzip/intlayer-react-native-template) en GitHub.

Desde su proyecto React Native, instale los siguientes paquetes:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> La bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

```bash packageManager="npm"
npm install intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-native-intlayer
```

### Paquetes

- **intlayer**  
  El conjunto de herramientas principal de i18n para configuración, contenido de diccionarios, generación de tipos y comandos CLI.

- **react-native-intlayer**  
  Integración con React Native que proporciona los proveedores de contexto y hooks de React que usarás para obtener y cambiar configuraciones regionales, los polyfills de React Native y el plugin Metro para integrar Intlayer con el empaquetador de React Native. Re-exporta todo desde `react-intlayer`, por lo que solo necesitas este único paquete en una aplicación React Native.

</Step>

<Step number={2} title="Crear una Configuración de Intlayer">

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
- Consulta la [documentación de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) para más información.

</Step>

<Step number={3} title="Añadir el plugin de Metro">

Metro es un empaquetador para React Native. Es el empaquetador predeterminado para proyectos de React Native creados con el comando `react-native init`. Para usar Intlayer con Metro, necesitas añadir el plugin en tu archivo `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Nota: `configMetroIntlayer` es una función asíncrona. Usa `configMetroIntlayerSync` en su lugar si deseas usarlo de forma síncrona, o evitar IIFE (Expresión de función invocada inmediatamente).
> Nota: `configMetroIntlayerSync` no permite construir diccionarios de intlayer al iniciar el servidor

</Step>

<Step number={4} title="Añadir el proveedor de Intlayer">

Para mantener sincronizado el idioma del usuario en toda tu aplicación, necesitas envolver tu componente raíz con el componente `IntlayerProvider` de `react-native-intlayer`.

> Importa siempre desde `react-native-intlayer`. Su `IntlayerProvider` incluye polyfills para la API web usada por Intlayer, y el paquete re-exporta todos los hooks y utilidades de `react-intlayer`.

Además, necesitas agregar la función `intlayerPolyfill` a tu archivo `index.js` para garantizar que Intlayer pueda funcionar correctamente.

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

<Step number={5} title="Declara Tu Contenido">

Crea archivos de **declaración de contenido** en cualquier lugar de tu proyecto (comúnmente dentro de `src/`), usando cualquiera de los formatos de extensión que Intlayer soporta:

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

> **Expo Router (web): mantén los archivos `.content.*` fuera del directorio `app/`.** Expo Router trata cada archivo JavaScript/TypeScript dentro de `app/` como una ruta. En la web, su descubrimiento de rutas escanea el sistema de archivos directamente y **no** respeta el `resolver.blockList` de Metro, por lo que un `*.content.ts` co-ubicado se registra como una ruta. Un archivo como `app/(tabs)/_layout.content.ts` incluso se analiza como un diseño (la parte `.content` se lee como un sufijo de plataforma), lo que choca con el `_layout.tsx` real y lanza:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> Coloca tus declaraciones en un directorio fuera de `app/` (por ejemplo, `content/` o `src/content/`). Intlayer descubre los archivos `.content.*` en cualquier lugar del proyecto y los diccionarios se referencian por su `key`, por lo que no se necesitan cambios en las importaciones. En nativo esto no es necesario (el `blockList` de Metro ya los oculta), pero usar un directorio distinto de `app/` mantiene ambas plataformas funcionando.

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

> Para más detalles sobre las declaraciones de contenido, consulta [la documentación de contenido de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={6} title="Usa Intlayer en tus Componentes">

Usa el hook `useIntlayer` en componentes hijos para obtener contenido localizado.

### Ejemplo

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-native-intlayer";
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

> Si su aplicación ya existe, puede utilizar el [Compilador Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md), así como el [comando de extracción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md), para transformar miles de componentes en un segundo.

</Step>

<Step number={7} title="Cambiar la configuración regional de la aplicación" isOptional={true}>

Para cambiar la configuración regional desde dentro de tus componentes, puedes usar el método `setLocale` del hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-native-intlayer";

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

> Consulta la [documentación de `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) para más detalles.

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

- **Editor Visual**: Usa el [Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) para gestionar las traducciones visualmente.
- **Integración con CMS**: También puedes externalizar y obtener el contenido de tu diccionario desde un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
- **Comandos CLI**: Explora el [CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) para tareas como **extraer traducciones** o **verificar claves faltantes**.

¡Disfruta construyendo tus aplicaciones **React Native** con i18n completamente potenciado a través de **Intlayer**!

---

### Debug

React Native puede ser menos estable que React Web, por lo que debes prestar especial atención a la alineación de versiones.

Intlayer se orienta principalmente a la Web Intl API; en React Native debes incluir los polyfills apropiados.

Lista de verificación:

- Usa las últimas versiones de `intlayer` y `react-native-intlayer`.
- Habilita el polyfill de Intlayer.
- Si usas `getLocaleName` u otras utilidades basadas en Intl-API, importa estos polyfills temprano (por ejemplo en `index.js` o `App.tsx`):

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- Verifica tu configuración de Metro (resolver aliases, asset plugins, rutas de `tsconfig`) si los módulos no se resuelven.

---

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar una aplicación de React Native o Expo?">

- **`i18n-js`** junto con `expo-localization`: la combinación histórica, un objeto plano de mensajes sin tipado.
- **`react-i18next`**: el estándar del ecosistema de React, con espacios de nombres JSON cargados en tiempo de ejecución.
- **`Intlayer`**: contenido declarado junto a cada componente y compilado por el plugin de Metro en tiempo de compilación, totalmente tipado, con traducción con IA, un editor visual y un CMS.

En móvil el argumento del tamaño es más fuerte que en la web, porque todo se empaqueta en la aplicación en lugar de obtenerse por página. Compilar el contenido por componente mantiene fuera del bundle los idiomas y las claves que no se usan. Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md).

</Question>

<Question title="¿Cuánto añade la i18n al tamaño del bundle de mi aplicación?">

Mucho menos que un catálogo en tiempo de ejecución, lo cual importa más en móvil que en la web porque todo se empaqueta en la aplicación en lugar de obtenerse por página. El plugin de Metro resuelve las llamadas a `useIntlayer` a las entradas exactas que usa un componente, así que las claves sin usar y los idiomas sin usar nunca llegan al binario. Frente a las alternativas habituales, Intlayer reduce el tamaño del bundle hasta en un 50%. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md).

</Question>

<Question title="¿Puedo migrar desde `i18n-js` o `react-i18next` sin reescribir mis componentes?">

Sí, y hay dos caminos. Puedes migrar el contenido de forma progresiva con la [guía de migración de i18n-js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/i18n-js.md) o la [guía de migración de react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_react-i18next_to_intlayer.md). O puedes mantener tu API actual por completo: los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) exponen exactamente la misma API que `react-i18next` y `react-intl`, pero servida por diccionarios de Intlayer, así que cambian los imports y el código de los componentes no.

</Question>

<Question title="¿Puedo conservar mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para los catálogos gettext, y los [archivos por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar los idiomas en un solo archivo.

</Question>

<Question title="¿Tengo que trasladar mi contenido clave por clave?">

No. Ejecuta `npx intlayer extract` e Intlayer lee tus archivos fuente, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, así que revisas un diff en lugar de copiar cadenas a un catálogo una por una. Consulta el [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md).

Para una canalización totalmente automatizada, el [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) hace lo mismo en tiempo de compilación sobre código JSX, TSX, Vue y Svelte, generando los diccionarios en cada cambio para que no haya ninguna clave que mantener a mano. Funciona por análisis estático, así que las cadenas que solo existen en tiempo de ejecución quedan fuera de su alcance, y necesita unas pocas anotaciones para distinguir el texto visible para el usuario de la lógica de la aplicación.

</Question>

<Question title="¿Qué herramientas para editores y agentes de IA están disponibles?">

Cinco piezas, todas opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave `useIntlayer` al archivo de contenido que la declara, extrae contenido de un componente y ejecuta build, fill, test, push y pull desde la paleta de comandos o desde una pestaña de Intlayer dedicada.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: el mismo conocimiento en cualquier editor que hable LSP, con ir a la definición, buscar todas las referencias, vistas previas al pasar el cursor de un valor traducido, autocompletado de claves y campos, y un aviso cuando una clave no está declarada en ninguna parte. También resuelve las llamadas a `i18next`, `react-i18next`, `next-intl` y `use-intl`, lo que ayuda durante la migración.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación y la CLI de Intlayer a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT, para que un asistente responda a partir de la documentación actual en lugar de adivinar, y pueda ejecutar comandos como `intlayer fill` por sí mismo.
- **[Habilidades para agentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades específicas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, además de una por framework, que enseñan a un agente tu configuración de enrutamiento y los tipos de nodo de contenido.
- **[Plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca las cadenas codificadas de forma fija, con reglas adicionales para claves de diccionario estáticas y contenido sin usar.

</Question>

<Question title="¿Intlayer funciona con Expo y el empaquetador Metro?">

Sí. El paso 3 añade el plugin de Metro, que compila tus archivos `.content.ts` y regenera los tipos al guardar, así que Fast Refresh recoge las ediciones de contenido como cualquier otro cambio de código fuente. Funciona tanto en Expo Go como en las builds de desarrollo.

</Question>

<Question title="¿Cómo detecto el idioma del dispositivo?">

Léelo desde `expo-localization` y pásalo al proveedor de Intlayer como el idioma inicial, luego conserva la elección explícita del usuario. Intlayer recurre a tu idioma por defecto cuando el idioma del dispositivo no está entre los declarados, así que la aplicación nunca renderiza una cadena vacía.

</Question>

<Question title="¿Cómo cambio el idioma de la aplicación en tiempo de ejecución?">

Lo cubre el paso 7. `useLocale` expone el idioma activo, los idiomas declarados y un setter, y los componentes que leen contenido se vuelven a renderizar de inmediato, así que el idioma cambia sin reiniciar la aplicación.

</Question>

<Question title="¿Cómo doy soporte a idiomas de derecha a izquierda como el árabe o el hebreo?">

Usa `getHTMLTextDir` para saber si el idioma activo es de derecha a izquierda, y aplícalo a través del `I18nManager` de React Native. Ten en cuenta que React Native requiere una recarga para un cambio completo de la disposición RTL, así que la mayoría de las aplicaciones se lo preguntan al usuario una vez cuando selecciona un idioma RTL.

</Question>

<Question title="¿Cómo traduzco la aplicación automáticamente con IA?">

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
