# Integración en React: Documentación del hook `useDictionary`

Esta sección proporciona una guía detallada para usar el hook `useDictionary` en aplicaciones React, permitiendo una gestión eficiente del contenido localizado sin necesidad de un editor visual.

## Importar `useDictionary` en React

El hook `useDictionary` puede integrarse en aplicaciones React importándolo según el contexto:

- **Componente Cliente:**

  ```javascript
  import { useDictionary } from "next-intlayer"; // Para usar en componentes React del lado cliente
  ```

- **Componente Servidor:**

  ```javascript
  import { useDictionary } from "next-intlayer/server"; // Para usar en componentes React del lado servidor
  ```

## Parámetros

El hook acepta dos parámetros:

1. **`dictionary`**: Un objeto de diccionario declarado que contiene contenido localizado para claves específicas.
2. **`locale`** (opcional): El idioma deseado. Si no se especifica, utiliza el idioma del contexto actual por defecto.

## Declaración del Contenido

Todos los objetos de diccionario deben declararse en archivos de contenido estructurados para garantizar la seguridad de tipos y evitar errores en tiempo de ejecución. Puedes encontrar las instrucciones de configuración [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_es.md). A continuación, un ejemplo de declaración de contenido:

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## Ejemplo de Uso en React

A continuación, un ejemplo de cómo usar el hook `useDictionary` en un componente React:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## Integración en el Servidor

Si utilizas el hook `useDictionary` fuera del `IntlayerServerProvider`, el idioma debe proporcionarse explícitamente como parámetro al renderizar el componente:

```tsx
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## Notas sobre los Atributos

A diferencia de las integraciones que usan editores visuales, atributos como `buttonTitle.value` no se aplican aquí. En su lugar, accede directamente a las cadenas localizadas tal como se declaran en tu contenido.

```tsx
<button title={content.title}>{content.content}</button>
```

## Consejos Adicionales

- **Seguridad de Tipos**: Utiliza siempre `DeclarationContent` para definir tus diccionarios y garantizar la seguridad de los tipos.
- **Actualizaciones de Localización**: Cuando actualices contenido, asegúrate de que todos los idiomas sean consistentes para evitar traducciones faltantes.

Esta documentación se centra en la integración del hook `useDictionary`, proporcionando un enfoque simplificado para gestionar contenido localizado sin depender de funcionalidades de editores visuales.
