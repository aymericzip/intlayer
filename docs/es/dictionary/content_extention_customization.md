# Personalización de Extensiones de Contenido

## Extensiones de Archivos de Contenido

Intlayer permite personalizar las extensiones para los archivos de declaración de contenido. Esta personalización proporciona flexibilidad en la gestión de proyectos a gran escala y ayuda a evitar conflictos con otros módulos.

### Extensiones Predeterminadas

Por defecto, Intlayer supervisa todos los archivos con las siguientes extensiones para declaraciones de contenido:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Estas extensiones predeterminadas son adecuadas para la mayoría de las aplicaciones. Sin embargo, cuando tienes necesidades específicas, puedes definir extensiones personalizadas para optimizar el proceso de construcción y reducir el riesgo de conflictos con otros componentes.

### Personalización de Extensiones de Contenido

Para personalizar las extensiones de archivo que Intlayer utiliza para identificar archivos de declaración de contenido, puedes especificarlas en el archivo de configuración de Intlayer. Este enfoque es beneficioso para proyectos a gran escala donde limitar el alcance del proceso de supervisión mejora el rendimiento de la construcción.

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

En este ejemplo, la configuración especifica dos extensiones personalizadas: `.my_content.ts` y `.my_content.tsx`. Intlayer solo supervisará archivos con estas extensiones para construir diccionarios.

### Beneficios de las Extensiones Personalizadas

- **Rendimiento de Construcción**: Reducir el alcance de los archivos supervisados puede mejorar significativamente el rendimiento de construcción en proyectos grandes.
- **Evitar Conflictos**: Las extensiones personalizadas ayudan a prevenir conflictos con otros archivos JavaScript o TypeScript en tu proyecto.
- **Organización**: Las extensiones personalizadas te permiten organizar tus archivos de declaración de contenido según las necesidades de tu proyecto.

### Directrices para Extensiones Personalizadas

Al personalizar las extensiones de archivos de contenido, ten en cuenta las siguientes directrices:

- **Unicidad**: Elige extensiones que sean únicas dentro de tu proyecto para evitar conflictos.
- **Nombres Consistentes**: Usa convenciones de nombres consistentes para una mejor legibilidad y mantenimiento del código.
- **Evitar Extensiones Comunes**: Evita usar extensiones comunes como `.ts` o `.js` para prevenir conflictos con otros módulos o bibliotecas.

## Conclusión

Personalizar las extensiones de archivos de contenido en Intlayer es una característica valiosa para optimizar el rendimiento y evitar conflictos en aplicaciones a gran escala. Siguiendo las directrices descritas en esta documentación, puedes gestionar eficazmente tus declaraciones de contenido y garantizar una integración fluida con otras partes de tu proyecto.
