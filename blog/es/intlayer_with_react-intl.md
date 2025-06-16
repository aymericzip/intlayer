# React Internationalization (i18n) with **react-intl** y Intlayer

Esta guía muestra cómo integrar **Intlayer** con **react-intl** para gestionar traducciones en una aplicación React. Declararás tu contenido traducible con Intlayer y luego consumirás esos mensajes con **react-intl**, una biblioteca popular del ecosistema [FormatJS](https://formatjs.io/docs/react-intl).

## Visión General

- **Intlayer** te permite almacenar traducciones en archivos de declaración de contenido a **nivel de componente** (JSON, JS, TS, etc.) dentro de tu proyecto.
- **react-intl** proporciona componentes y hooks de React (como `<FormattedMessage>` y `useIntl()`) para mostrar cadenas localizadas.

Al configurar Intlayer para **exportar** traducciones en un formato **compatible con react-intl**, puedes **generar** y **actualizar** automáticamente los archivos de mensajes que requiere `<IntlProvider>` (de react-intl).

---

## ¿Por qué usar Intlayer con react-intl?

1. **Declaraciones de Contenido por Componente**  
   Los archivos de declaración de contenido de Intlayer pueden vivir junto a tus componentes de React, evitando traducciones “huérfanas” si los componentes se mueven o se eliminan. Por ejemplo:

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Declaración de contenido de Intlayer
               └── index.tsx          # Componente React
   ```

2. **Traducciones Centralizadas**  
   Cada archivo de declaración de contenido recopila todas las traducciones necesarias para un componente. Esto es particularmente útil en proyectos de TypeScript: las traducciones faltantes se pueden detectar en **tiempo de compilación**.

3. **Generación Automática y Regeneración**  
   Siempre que agregues o actualices traducciones, Intlayer regenerará los archivos JSON de mensajes. Luego puedes pasarlos al `<IntlProvider>` de react-intl.

---

## Instalación

En un proyecto típico de React, instala lo siguiente:

```bash
# con npm
npm install intlayer react-intl

# con yarn
yarn add intlayer react-intl

# con pnpm
pnpm add intlayer react-intl
```

### ¿Por qué estos paquetes?

- **intlayer**: CLI y biblioteca principal que escanea las declaraciones de contenido, las fusiona y construye salidas de diccionario.
- **react-intl**: La biblioteca principal de FormatJS que proporciona `<IntlProvider>`, `<FormattedMessage>`, `useIntl()` y otros elementos básicos de internacionalización.

> Si aún no tienes React instalado, también lo necesitarás (`react` y `react-dom`).

## Configurando Intlayer para Exportar Mensajes react-intl

En la raíz de tu proyecto, crea **`intlayer.config.ts`** (o `.js`, `.mjs`, `.cjs`) de la siguiente manera:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Agrega tantas locales como desees
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Indica a Intlayer que genere archivos de mensajes para react-intl
    dictionaryOutput: ["react-intl"],

    // El directorio donde Intlayer escribirá tus archivos JSON de mensajes
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **Nota**: Para otras extensiones de archivo (`.mjs`, `.cjs`, `.js`), consulta la [documentación de Intlayer](https://intlayer.org/es/doc/concept/configuration) para detalles de uso.

---

## Creando Tus Declaraciones de Contenido de Intlayer

Intlayer escanea tu base de código (por defecto, bajo `./src`) en busca de archivos que coincidan con `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`.  
Aquí hay un ejemplo de **TypeScript**:

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" se convierte en la clave de mensaje de nivel superior en tu archivo JSON de react-intl
  key: "my-component",

  content: {
    // Cada llamada a t() declara un campo traducible
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

Si prefieres JSON o diferentes sabores de JS (`.cjs`, `.mjs`), la estructura es en gran medida la misma, consulta [documentación de Intlayer sobre declaración de contenido](https://intlayer.org/es/doc/concept/content).

---

## Construyendo los Mensajes de react-intl

Para generar los archivos JSON de mensajes reales para **react-intl**, ejecuta:

```bash
# con npm
npx intlayer dictionaries build

# con yarn
yarn intlayer build

# con pnpm
pnpm intlayer build
```

Esto escanea todos los archivos `*.content.*`, los compila y escribe los resultados en el directorio especificado en tu **`intlayer.config.ts`** , en este ejemplo, `./react-intl/messages`.  
Una salida típica podría verse así:

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

Cada archivo es un objeto JSON cuyas **claves de nivel superior** corresponden a cada **`content.key`** de tus declaraciones. Las **sub-claves** (como `helloWorld`) reflejan las traducciones declaradas dentro de ese ítem de contenido.

Por ejemplo, el **en.json** podría verse así:

```json fileName="react-intl/messages/en/my-component.json"
{
  "helloWorld": "Hello World",
  "description": "This is a description"
}
```

---

## Inicializando react-intl en Tu Aplicación React

### 1. Cargar los Mensajes Generados

Donde configuras el componente raíz de tu aplicación (por ejemplo, `src/main.tsx` o `src/index.tsx`), deberás:

1. **Importar** los archivos de mensajes generados (ya sea de forma estática o dinámica).
2. **Proveer** estos a `<IntlProvider>` de `react-intl`.

Un enfoque simple es importarlos **estáticamente**:

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// Importa los archivos JSON de la salida de construcción.
// Alternativamente, puedes importar dinámicamente según la elección de idioma del usuario.
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// Si tienes un mecanismo para detectar el idioma del usuario, configúralo aquí.
// Para simplicidad, elijamos inglés.
const locale = "en";

// Reúne los mensajes en un objeto (o escógelos dinámicamente)
const messagesRecord: Record<string, Record<string, any>> = {
  en,
  fr,
  es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **Consejo**: Para proyectos reales, podrías:
>
> - Cargar dinámicamente los mensajes JSON en tiempo de ejecución.
> - Usar detección de local basado en el entorno, navegador o cuenta de usuario.

### 2. Usar `<FormattedMessage>` o `useIntl()`

Una vez que tus mensajes están cargados en `<IntlProvider>`, cualquier componente hijo puede usar react-intl para acceder a cadenas localizadas. Hay dos enfoques principales:

- **Componente `<FormattedMessage>`**
- **Hook `useIntl()`**

---

## Usando Traducciones en Componentes React

### Enfoque A: `<FormattedMessage>`

Para un uso rápido en línea:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “my-component.helloWorld” se refiere a la clave de en.json, fr.json, etc. */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> La prop **`id`** en `<FormattedMessage>` debe coincidir con la **clave de nivel superior** (`my-component`) más cualquier sub-clave (`helloWorld`).

### Enfoque B: `useIntl()`

Para un uso más dinámico:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

Cualquiera de los enfoques es válido: elige el estilo que mejor se adapte a tu aplicación.

---

## Actualizando o Agregando Nuevas Traducciones

1. **Agrega o modifica** contenido en cualquier archivo `*.content.*`.
2. Vuelve a ejecutar `intlayer build` para regenerar los archivos JSON en `./react-intl/messages`.
3. React (y react-intl) detectarán las actualizaciones la próxima vez que reconstruyas o recargues tu aplicación.

---

## Integración con TypeScript (Opcional)

Si estás usando TypeScript, Intlayer puede **generar definiciones de tipo** para tus traducciones.

- Asegúrate de que `tsconfig.json` incluya tu carpeta `types` (o cualquier carpeta de salida que genere Intlayer) en el arreglo `"include"`.

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

Los tipos generados pueden ayudar a detectar traducciones faltantes o claves inválidas en tus componentes de React en tiempo de compilación.

---

## Configuración de Git

Es común **excluir** los artefactos de construcción internos de Intlayer del control de versiones. En tu `.gitignore`, añade:

```plaintext
# Ignorar artefactos de construcción de intlayer
.intlayer
react-intl
```

Dependiendo de tu flujo de trabajo, también puede que desees ignorar o confirmar los diccionarios finales en `./react-intl/messages`. Si tu canal de CI/CD los regenera, puedes ignorarlos de forma segura; de lo contrario, confírmales si los necesitas para las implementaciones de producción.
