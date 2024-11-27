# Documentación de Intlayer

Bienvenido a la Documentación de Intlayer. Esta guía proporciona una visión general de Intlayer, sus características principales y cómo utilizar eficazmente estos documentos para mejorar su experiencia de desarrollo.

## Introducción

### ¿Qué es Intlayer?

**Intlayer** es una librería de internationalization diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de su contenido en cualquier lugar en su código. Convierte la declaración de su contenido multilingüe en diccionarios estructurados para facilitar la integración en su base de código. Utilizando TypeScript, **Intlayer** hace que el desarrollo sea más fuerte y eficiente.

Intlayer también ofrece un editor visual opcional que le permite editar y gestionar su contenido fácilmente. Este editor es particularmente útil para desarrolladores que prefieren una interfaz visual para la gestión de contenido, o para equipos que generan contenido sin tener que preocuparse por el código.

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

### Características Principales

Intlayer ofrece una variedad de características adaptadas a las necesidades del desarrollo web moderno. A continuación, se destacan las características principales, con enlaces a documentación detallada para cada una:

- **Soporte de Internacionalización**: Mejore el alcance global de su aplicación con soporte incorporado para internacionalización. Aprenda más en nuestra [Guía de Internacionalización](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_i18next_es.md).
- **Editor Visual**: Mejore su flujo de trabajo de desarrollo con plugins de editor diseñados para Intlayer. Consulte la [Guía de Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_editor_es.md).
- **Flexibilidad de Configuración**: Personalice su configuración con opciones de configuración extensas detalladas en la [Guía de Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_es.md).
- **Herramientas CLI Avanzadas**: Gestione sus proyectos de manera eficiente utilizando la interfaz de línea de comandos de Intlayer. Explore las capacidades en la [Documentación de Herramientas CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_cli_es.md).
- **Compatibilidad con i18n**: Intlayer funciona de manera transparente con otras bibliotecas de internacionalización. Consulte la [Guía de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_i18next_es.md) para obtener más información.

### Plataformas Soportadas

Intlayer está diseñado para funcionar sin problemas con aplicaciones Next.js y React. También es compatible con Vite y Create React App.

- **Integración con Next.js**: Utilice el poder de Next.js dentro de Intlayer para renderizado del lado del servidor y generación de sitios estáticos. Los detalles están disponibles en nuestra [Guía de Integración con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_es.md).
- **Integración con Vite and React**: Aproveche Vite dentro de Intlayer para renderizado del lado del servidor y generación de sitios estáticos. Los detalles están disponibles en nuestra [Guía de Integración con Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_vite+react_es.md).
- **Integración con Create React App**: Utilice el poder de Create React App dentro de Intlayer para renderizado del lado del servidor y generación de sitios estáticos. Los detalles están disponibles en nuestra [Guía de Integración con Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_es.md).

### Cómo Utilizar Esta Documentación

Para sacar el máximo provecho de esta documentación:

1. **Navegue a las Secciones Relevantes**: Utilice los enlaces proporcionados arriba para ir directamente a las secciones que aborden sus necesidades.
2. **Ejemplos Interactivos**: Donde estén disponibles, utilice ejemplos interactivos para ver cómo funcionan las características en tiempo real.
3. **Comentarios y Contribuciones**: Sus comentarios son valiosos. Si tiene sugerencias o correcciones, considere contribuir a la documentación.
