# Introducción a la Internacionalización (i18n) con Intlayer y React Native

## ¿Qué es Intlayer?

**Intlayer** es una **biblioteca innovadora y de código abierto para la internacionalización (i18n)** que facilita el soporte multilingüe en aplicaciones modernas. Funciona en muchos entornos de JavaScript/TypeScript, **incluyendo React Native** (a través del paquete `react-intlayer`).

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** mediante diccionarios declarativos a nivel de componente.
- **Garantizar compatibilidad con TypeScript** con tipos autogenerados.
- **Localizar contenido dinámicamente**, incluyendo **cadenas de la interfaz de usuario** (y en React para web, también metadatos de HTML, etc.).
- **Aprovechar funciones avanzadas**, como la detección y cambio dinámico de idioma.

> **Importante**: En React Native, no cambiarás `<html lang="...">` ni dependerás de plugins de Vite. En su lugar, integrarás la API de `react-intlayer`, podrás coordinarte con [`I18nManager`](https://reactnative.dev/docs/i18nmanager) para soporte RTL y, si usas React Navigation, adaptar el router para reflejar cambios de idioma.

---

## Paso 1: Instalar dependencias

Desde tu proyecto de React Native, instala los siguientes paquetes:

```bash
npm install intlayer react-intlayer react-native-intlayer
```

```bash
pnpm add intlayer react-intlayer react-native-intlayer
```

```bash
yarn add intlayer react-intlayer react-native-intlayer
```

### Paquetes

- **intlayer**  
  La herramienta principal de i18n para configuración, contenido de diccionario, generación de tipos y comandos CLI.

- **react-intlayer**  
  Integración con React que proporciona proveedores de contexto y hooks para React Native para obtener y cambiar idiomas.

- **react-native-intlayer**  
  Integración con React Native que proporciona el plugin de Metro para integrar Intlayer con el empaquetador de React Native.

---

## Paso 2: Crear una configuración de Intlayer

En la raíz de tu proyecto (o en otra ubicación conveniente), crea un archivo de **configuración de Intlayer**. Puede verse así:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Dentro de esta configuración, puedes:

- Configurar tu **lista de idiomas soportados**.
- Establecer un idioma **predeterminado**.
- Más adelante, podrás agregar opciones avanzadas (por ejemplo, registros, directorios de contenido personalizados, etc.).
- Consulta la [documentación de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md) para más detalles.

## Paso 3: Agregar el plugin de Metro

Metro es el empaquetador por defecto para React Native. Para usar Intlayer con Metro, agrega el plugin a tu archivo `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

const getConfig = async () => {
  const defaultConfig = getDefaultConfig(__dirname);
  return await configMetroIntlayer(defaultConfig);
};
```

## Paso 4: Agregar el proveedor de Intlayer

Para sincronizar el idioma del usuario en toda la aplicación, debes envolver tu componente principal con `IntlayerProvider` de `react-intlayer`.

Además, agrega la función `intlayerPolyfill` en tu archivo `index.js` para garantizar que Intlayer funcione correctamente.

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";
import { type FC } from "react";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

---

## Paso 5: Declarar contenido

Crea archivos de **declaración de contenido** en cualquier lugar de tu proyecto (comúnmente dentro de `src/`), usando cualquiera de los formatos soportados por Intlayer:

Ejemplo (TypeScript con nodos TSX para React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "¡Bienvenido!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

> Para más detalles sobre declaraciones de contenido, consulta la [documentación de contenido de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md).

---

## (Opcional) Cambio de idioma en la app

Para cambiar el idioma dentro de tus componentes, usa el método `setLocale` del hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { Button } from "react-native";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="Cambiar a francés"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

Esto actualizará todos los componentes que usan contenido de Intlayer con el nuevo idioma.

---

## Continúa explorando

- **Editor visual**: Usa el [Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md).
- **Integración con CMS**: Aprende cómo conectar Intlayer con un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md).
- **Comandos CLI**: Descubre los comandos de la [CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

Disfruta creando aplicaciones **React Native** con i18n completo gracias a **Intlayer**!
