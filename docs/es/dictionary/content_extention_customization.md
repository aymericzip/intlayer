# Personalización de Extensiones de Contenido

## Extensiones de Archivo de Contenido

Intlayer te permite personalizar las extensiones para tus archivos de declaración de contenido. Esta personalización proporciona flexibilidad en la gestión de proyectos a gran escala y ayuda a evitar conflictos con otros módulos.

### Extensiones por Defecto

Por defecto, Intlayer observa todos los archivos con las siguientes extensiones para declaraciones de contenido:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Estas extensiones por defecto son adecuadas para la mayoría de las aplicaciones. Sin embargo, cuando tienes necesidades específicas, puedes definir extensiones personalizadas para agilizar el proceso de construcción y reducir el riesgo de conflictos con otros componentes.

### Personalizando Extensiones de Contenido

Para personalizar las extensiones de archivo que Intlayer utiliza para identificar archivos de declaración de contenido, puedes especificarlas en el archivo de configuración de Intlayer. Este enfoque es beneficioso para proyectos a gran escala donde limitar el alcance del proceso de observación mejora el rendimiento de construcción.

Aquí hay un ejemplo de cómo definir extensiones de contenido personalizadas en tu configuración:

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

En este ejemplo, la configuración especifica dos extensiones personalizadas: `.my_content.ts` y `.my_content.tsx`. Intlayer solo observará archivos con estas extensiones para construir diccionarios.

### Beneficios de las Extensiones Personalizadas

- **Rendimiento de Construcción**: Reducir el alcance de los archivos observados puede mejorar significativamente el rendimiento de construcción en proyectos grandes.
- **Evitar Conflictos**: Las extensiones personalizadas ayudan a prevenir conflictos con otros archivos de JavaScript o TypeScript en tu proyecto.
- **Organización**: Las extensiones personalizadas te permiten organizar tus archivos de declaración de contenido según las necesidades de tu proyecto.

### Pautas para Extensiones Personalizadas

Al personalizar las extensiones de archivo de contenido, ten en cuenta las siguientes pautas:

- **Unicidad**: Elige extensiones que sean únicas dentro de tu proyecto para evitar conflictos.
- **Nomenclatura Consistente**: Usa convenciones de nomenclatura consistentes para mejor legibilidad y mantenimiento del código.
- **Evitar Extensiones Comunes**: Evita usar extensiones comunes como `.ts` o `.js` para prevenir conflictos con otros módulos o bibliotecas.

## Conclusión

Personalizar las extensiones de archivo de contenido en Intlayer es una característica valiosa para optimizar el rendimiento y evitar conflictos en aplicaciones a gran escala. Siguiendo las pautas descritas en esta documentación, puedes gestionar eficazmente tus declaraciones de contenido y asegurar una integración fluida con otras partes de tu proyecto.
