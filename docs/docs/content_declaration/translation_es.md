# Traducción

## Definición de Traducciones

La función `t` en `intlayer` te permite declarar contenido en múltiples idiomas. Esta función asegura la seguridad de tipos, generando un error si faltan traducciones, lo cual es particularmente útil en entornos de TypeScript.

### Usando TypeScript

Aquí tienes un ejemplo de cómo declarar contenido con traducciones en un archivo de TypeScript:

```typescript
import { t, type DeclarationContent } from "intlayer";

const multiLangContent: DeclarationContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

export default multiLangContent;
```

### Usando Módulos ECMAScript

Si estás usando módulos ECMAScript, la declaración se ve así:

```javascript
import { t } from "intlayer";

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

export default multiLangContent;
```

### Usando Módulos CommonJS

En una configuración CommonJS, puedes declarar traducciones de esta manera:

```javascript
const { t } = require("intlayer");

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre aplicación",
    es: "Bienvenido a nuestra aplicación",
  }),
};

module.exports = multiLangContent;
```

### Usando JSON

Para declaraciones basadas en JSON, puedes definir traducciones de la siguiente manera:

```json
{
  "id": "multi_lang",
  "welcomeMessage": {
    "nodeType": "translation",
    "en": "Welcome to our application",
    "fr": "Bienvenue dans notre application",
    "es": "Bienvenido a nuestra aplicación"
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

## Uso de Traducciones en Componentes React

Con `react-intlayer`, puedes usar traducciones en componentes React. Aquí tienes un ejemplo:

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

Este componente obtiene la traducción correspondiente basada en el local actual configurado en tu aplicación.

## Objetos de Contenido Personalizados

`intlayer` soporta objetos de contenido personalizados para traducción, permitiéndote definir estructuras más complejas mientras asegura la seguridad de tipos. Aquí tienes un ejemplo con un objeto personalizado:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent: DeclarationContent = {
  id: "custom_content",
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
};

export default customContent;
```
