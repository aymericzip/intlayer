# Traducción

## Definición de Traducciones

La función `t` en `intlayer` permite declarar contenido en múltiples idiomas. Esta función garantiza la seguridad de tipos, generando un error si faltan traducciones, lo cual es particularmente útil en entornos TypeScript.

### Usando TypeScript

Aquí hay un ejemplo de cómo declarar contenido con traducciones en un archivo TypeScript:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Usando Módulos ECMAScript

Si estás utilizando módulos ECMAScript, la declaración se ve así:

```javascript
import { t } from "intlayer";

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Usando Módulos CommonJS

En una configuración CommonJS, puedes declarar traducciones así:

```javascript
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Usando JSON

Para declaraciones basadas en JSON, puedes definir traducciones de la siguiente manera:

```json
{
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## Configuración para Locales

Para asegurar un manejo adecuado de las traducciones, puedes configurar los locales aceptados en `intlayer.config.ts`. Esta configuración te permite definir los idiomas que tu aplicación soporta:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## Usando Traducciones en Componentes de React

Con `react-intlayer`, puedes usar traducciones en componentes de React. Aquí hay un ejemplo:

```jsx
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

Este componente obtiene la traducción correspondiente basada en el locale actual establecido en tu aplicación.

## Objetos de Contenido Personalizados

`intlayer` soporta objetos de contenido personalizados para traducción, permitiéndote definir estructuras más complejas mientras aseguras la seguridad de tipos. Aquí hay un ejemplo con un objeto personalizado:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "Page Title",
        content: "Page Content",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
    }),
  },
} satisfies DeclarationContent;

export default customContent;
```
