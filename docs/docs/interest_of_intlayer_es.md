# Intlayer: Una forma más cercana de traducir tu aplicación

**Intlayer** es una librería de internationalization diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de su contenido en cualquier lugar en su código. Convierte la declaración de su contenido multilingüe en diccionarios estructurados para facilitar la integración en su base de código. Utilizando TypeScript, **Intlayer** hace que el desarrollo sea más fuerte y eficiente.

## Ejemplo de uso

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

## ¿Por qué elegir Intlayer?

- **Gestión de Contenidos impulsada por JavaScript**: Aprovecha la flexibilidad de JavaScript para definir y gestionar tu contenido de manera eficiente.
- **Entorno Tipo-Seguro**: Utiliza TypeScript para asegurar que todas tus definiciones de contenido sean precisas y sin errores.
- **Archivos de Contenido Integrados**: Mantén tus traducciones cerca de sus respectivos componentes, mejorando la mantenibilidad y claridad.
- **Configuración Simplificada**: Ponte en marcha rápidamente con una configuración mínima, especialmente optimizada para proyectos Next.js.
- **Soporte para Componentes del Servidor**: Perfectamente adecuado para componentes del servidor de Next.js, asegurando una renderización del lado del servidor sin problemas.
- **Ruteo Mejorado**: Soporte completo para el ruteo de aplicaciones Next.js, adaptándose perfectamente a estructuras de aplicaciones complejas.
- **Interoperabilidad**: Permite la interoperabilidad con i18next. (beta)
