---
createdAt: 2025-06-18
updatedAt: 2025-12-30
title: Cómo traducir tu React Native and Expo – guía i18n 2026
description: Descubre cómo hacer que tu sitio web React Native y Expo sea multilingüe. Sigue la documentación para internacionalizar (i18n) y traducirlo.
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
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Agregar comando init
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Traduce tu React Native and Expo con Intlayer | Internacionalización (i18n)

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-react-native-template) en GitHub.

## ¿Qué es Intlayer?

**Intlayer** es una **biblioteca innovadora y de código abierto para la internacionalización (i18n)** que simplifica el soporte multilingüe en aplicaciones modernas. Funciona en muchos entornos de JavaScript/TypeScript, **incluyendo React Native** (a través del paquete `react-intlayer`).

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Garantizar soporte para TypeScript** con tipos autogenerados.
- **Localizar dinámicamente** contenido, incluyendo **cadenas de la interfaz de usuario** (y en React para web, también puede localizar metadatos HTML, etc.).
- **Beneficiarte de funciones avanzadas**, como la detección y cambio dinámico de la configuración regional.

---

## Paso 1: Instalar dependencias

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
bunx intlayer init
```

### Paquetes

- **intlayer**  
  El conjunto de herramientas principal de i18n para configuración, contenido de diccionarios, generación de tipos y comandos CLI.

- **react-intlayer**  
  Integración con React que proporciona los proveedores de contexto y hooks de React que usarás en React Native para obtener y cambiar configuraciones regionales.

- **react-native-intlayer**  
  Integración con React Native que proporciona el plugin Metro para integrar Intlayer con el empaquetador de React Native.

---

## Paso 2: Crear una Configuración de Intlayer

En la raíz de tu proyecto (o en cualquier lugar conveniente), crea un archivo de **configuración de Intlayer**. Podría verse así:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
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

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

Dentro de esta configuración, puedes:

- Configurar tu **lista de configuraciones regionales soportadas**.
- Establecer una configuración regional **predeterminada**.
- Más adelante, puedes agregar opciones más avanzadas (por ejemplo, registros, directorios de contenido personalizados, etc.).
- Consulta la [documentación de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para más información.

## Paso 3: Añadir el plugin de Metro

Metro es un empaquetador para React Native. Es el empaquetador predeterminado para proyectos de React Native creados con el comando `react-native init`. Para usar Intlayer con Metro, necesitas añadir el plugin en tu archivo `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Paso 4: Añadir el proveedor de Intlayer

Para mantener sincronizado el idioma del usuario en toda tu aplicación, necesitas envolver tu componente raíz con el componente `IntlayerProvider` de `react-intlayer-native`.

> Asegúrate de usar el proveedor de `react-native-intlayer` en lugar de `react-intlayer`. La exportación de `react-native-intlayer` incluye polyfills para la API web.

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
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

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
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

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProvider } = require("react-native-intlayer");

// Obtiene la configuración regional del dispositivo
const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

module.exports = RootLayout;
```

## Paso 5: Declara Tu Contenido

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

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
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

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";
import { ReactNode } from "react";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
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

> Para más detalles sobre las declaraciones de contenido, consulta [la documentación de contenido de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

---

## Paso 4: Usa Intlayer en tus Componentes

Usa el hook `useIntlayer` en componentes hijos para obtener contenido localizado.

### Ejemplo

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
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

```jsx fileName="app/(tabs)/index.content.msx" codeFormat="esm"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const HomeScreen = () => {
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

```jsx fileName="app/(tabs)/index.content.csx" codeFormat="commonjs"
const { Image, StyleSheet, Platform } = require("react-native");
const { useIntlayer } = require("intlayer");
const { HelloWave } = require("@/components/HelloWave");
const ParallaxScrollView = require("@/components/ParallaxScrollView");
const { ThemedText } = require("@/components/ThemedText");
const { ThemedView } = require("@/components/ThemedView");

const HomeScreen = () => {
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

module.exports = HomeScreen;
```

> Al usar `content.someKey` en propiedades basadas en cadenas (por ejemplo, el `title` de un botón o los `children` de un componente `Text`), **llama a `content.someKey.value`** para obtener la cadena real.

---

## (Opcional) Paso 5: Cambiar la configuración regional de la aplicación

Para cambiar la configuración regional desde dentro de tus componentes, puedes usar el método `setLocale` del hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher = () => {
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { View, Text, TouchableOpacity, StyleSheet } = require("react-native");
const { getLocaleName } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
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

```plaintext
# Ignorar los archivos generados por Intlayer
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
- **Comandos CLI**: Explora el [CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md) para tareas como **extraer traducciones** o **verificar claves faltantes**.

¡Disfruta construyendo tus aplicaciones **React Native** con i18n completamente potenciado a través de **Intlayer**!

---
