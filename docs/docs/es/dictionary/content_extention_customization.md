---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Personalización de Extensiones de Contenido
description: Aprende cómo personalizar las extensiones para tus archivos de declaración de contenido. Sigue esta documentación para implementar condiciones de manera eficiente en tu proyecto.
keywords:
  - Personalización de Extensiones de Contenido
  - Documentación
  - Intlayer
slugs:
  - doc
  - concept
  - content
---

# Personalización de Extensiones de Contenido

## Extensiones de Archivos de Contenido

Intlayer te permite personalizar las extensiones para tus archivos de declaración de contenido. Esta personalización proporciona flexibilidad en la gestión de proyectos a gran escala y ayuda a evitar conflictos con otros módulos.

### Extensiones Predeterminadas

Por defecto, Intlayer vigila todos los archivos con las siguientes extensiones para declaraciones de contenido:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Estas extensiones predeterminadas son adecuadas para la mayoría de las aplicaciones. Sin embargo, cuando tienes necesidades específicas, puedes definir extensiones personalizadas para optimizar el proceso de compilación y reducir el riesgo de conflictos con otros componentes.

### Personalización de Extensiones de Contenido

Para personalizar las extensiones de archivo que Intlayer utiliza para identificar los archivos de declaración de contenido, puedes especificarlas en el archivo de configuración de Intlayer. Este enfoque es beneficioso para proyectos a gran escala donde limitar el alcance del proceso de vigilancia mejora el rendimiento de la compilación.

Aquí tienes un ejemplo de cómo definir extensiones de contenido personalizadas en tu configuración:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Tus extensiones personalizadas
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // Tus extensiones personalizadas
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // Tus extensiones personalizadas
  },
};

module.exports = config;
```

En este ejemplo, la configuración especifica dos extensiones personalizadas: `.my_content.ts` y `.my_content.tsx`. Intlayer solo observará archivos con estas extensiones para construir los diccionarios.

### Beneficios de las Extensiones Personalizadas

- **Rendimiento de la Compilación**: Reducir el alcance de los archivos observados puede mejorar significativamente el rendimiento de la compilación en proyectos grandes.
- **Evitar conflictos**: Las extensiones personalizadas ayudan a prevenir conflictos con otros archivos JavaScript o TypeScript en tu proyecto.
- **Organización**: Las extensiones personalizadas te permiten organizar tus archivos de declaración de contenido según las necesidades de tu proyecto.

### Directrices para Extensiones Personalizadas

Al personalizar las extensiones de los archivos de contenido, ten en cuenta las siguientes directrices:

- **Unicidad**: Elige extensiones que sean únicas dentro de tu proyecto para evitar conflictos.
- **Nomenclatura Consistente**: Usa convenciones de nombres consistentes para mejorar la legibilidad y el mantenimiento del código.
- **Evitar Extensiones Comunes**: Evita usar extensiones comunes como `.ts` o `.js` para prevenir conflictos con otros módulos o librerías.

## Conclusión

Personalizar las extensiones de los archivos de contenido en Intlayer es una característica valiosa para optimizar el rendimiento y evitar conflictos en aplicaciones a gran escala. Siguiendo las directrices descritas en esta documentación, puedes gestionar eficazmente tus declaraciones de contenido y asegurar una integración fluida con otras partes de tu proyecto.

## Historial del Documento

- 5.5.10 - 2025-06-29: Historial inicial
