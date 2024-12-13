# Personalización de Extensiones de Contenido

## Extensiones de Archivos de Contenido

Intlayer te permite personalizar las extensiones para tus archivos de declaración de contenido. Esta personalización proporciona flexibilidad en la gestión de proyectos a gran escala y ayuda a evitar conflictos con otros módulos.

### Extensiones Predeterminadas

Por defecto, Intlayer observa todos los archivos con las siguientes extensiones para declaraciones de contenido:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Estas extensiones predeterminadas son adecuadas para la mayoría de las aplicaciones. Sin embargo, cuando tienes necesidades específicas, puedes definir extensiones personalizadas para optimizar el proceso de construcción y reducir el riesgo de conflictos con otros componentes.

### Personalización de Extensiones de Contenido

Para personalizar las extensiones de archivos que Intlayer utiliza para identificar archivos de declaración de contenido, puedes especificarlas en el archivo de configuración de Intlayer. Este enfoque es beneficioso para proyectos a gran escala donde limitar el alcance del proceso de observación mejora el rendimiento de la construcción.

Aquí tienes un ejemplo de cómo definir extensiones de contenido personalizadas en tu configuración:

```typescript
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".mi_contenido.ts", ".mi_contenido.tsx"], // Tus extensiones personalizadas
  },
};

export default config;
```

En este ejemplo, la configuración especifica dos extensiones personalizadas: `.mi_contenido.ts` y `.mi_contenido.tsx`. Intlayer solo observará archivos con estas extensiones para construir diccionarios.

### Beneficios de las Extensiones Personalizadas

- **Rendimiento de Construcción**: Reducir el alcance de los archivos observados puede mejorar significativamente el rendimiento de la construcción en proyectos grandes.
- **Evitación de Conflictos**: Las extensiones personalizadas ayudan a prevenir conflictos con otros archivos JavaScript o TypeScript en tu proyecto.
- **Organización**: Las extensiones personalizadas te permiten organizar tus archivos de declaración de contenido según las necesidades de tu proyecto.

### Directrices para Extensiones Personalizadas

Al personalizar las extensiones de archivos de contenido, ten en cuenta las siguientes directrices:

- **Unicidad**: Elige extensiones que sean únicas dentro de tu proyecto para evitar conflictos.
- **Nomenclatura Consistente**: Utiliza convenciones de nomenclatura consistentes para una mejor legibilidad y mantenimiento del código.
- **Evitar Extensiones Comunes**: Evita usar extensiones comunes como `.ts` o `.js` para prevenir conflictos con otros módulos o bibliotecas.

## Conclusión

Personalizar las extensiones de archivos de contenido en Intlayer es una característica valiosa para optimizar el rendimiento y evitar conflictos en aplicaciones a gran escala. Siguiendo las directrices descritas en esta documentación, puedes gestionar eficazmente tus declaraciones de contenido y asegurar una integración fluida con otras partes de tu proyecto.
