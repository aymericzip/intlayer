# Introducción a la internacionalización (i18n) con Intlayer y Express

`express-intlayer` es un poderoso middleware de internacionalización (i18n) para aplicaciones Express, diseñado para hacer que tus servicios de backend sean globalmente accesibles proporcionando respuestas localizadas basadas en las preferencias del cliente.

## ¿Por qué Internacionalizar tu Backend?

Internacionalizar tu backend es esencial para servir eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación haciéndola más accesible y relevante para personas de diferentes contextos lingüísticos.

### Casos de Uso Prácticos

- **Mostrar Errores de Backend en el Idioma del Usuario**: Cuando ocurre un error, mostrar mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes de frontend como toasts o modales.

- **Recuperación de Contenido Multilingüe**: Para aplicaciones que extraen contenido de una base de datos, la internacionalización asegura que puedes servir este contenido en múltiples idiomas. Esto es crucial para plataformas como sitios de comercio electrónico o sistemas de gestión de contenido que necesitan mostrar descripciones de productos, artículos y otros contenidos en el idioma preferido del usuario.

- **Envío de Correos Electrónicos Multilingües**: Ya sea correos electrónicos transaccionales, campañas de marketing o notificaciones, enviar correos en el idioma del destinatario puede aumentar significativamente la participación y la eficacia.

- **Notificaciones Push Multilingües**: Para aplicaciones móviles, enviar notificaciones push en el idioma preferido del usuario puede mejorar la interacción y retención. Este toque personal puede hacer que las notificaciones sean más relevantes y accionables.

- **Otras Comunicaciones**: Cualquier forma de comunicación desde el backend, como mensajes SMS, alertas del sistema o actualizaciones de la interfaz de usuario, se beneficia de estar en el idioma del usuario, asegurando claridad y mejorando la experiencia general del usuario.

Al internacionalizar el backend, tu aplicación no solo respeta las diferencias culturales sino que también se alinea mejor con las necesidades del mercado global, convirtiéndolo en un paso clave para escalar tus servicios a nivel mundial.

## Primeros Pasos

### Instalación

Para comenzar a usar `express-intlayer`, instala el paquete usando npm:

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### Configuración

Configura los ajustes de internacionalización creando un `intlayer.config.ts` en la raíz de tu proyecto:

```typescript
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Configuración de la Aplicación Express

Configura tu aplicación Express para usar `express-intlayer`:

```typescript
// src/index.ts
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Carga el manejador de solicitudes de internacionalización
app.use(intlayer());

// Rutas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Ejemplo de contenido devuelto en inglés",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Ejemplo de contenido de error devuelto en inglés",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// Inicia el servidor
app.listen(3000, () => {
  console.info(`Escuchando en el puerto 3000`);
});
```

### Compatibilidad

`express-intlayer` es completamente compatible con:

- `react-intlayer` para aplicaciones React.
- `next-intlayer` para aplicaciones Next.js.

También funciona sin problemas con cualquier solución de internacionalización en diversos entornos, incluidos navegadores y solicitudes API. Puedes personalizar el middleware para detectar la localidad a través de cabeceras o cookies:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // Otras opciones de configuración
  middleware: {
    headerName: "mi-header-de-localidad",
    cookieName: "mi-cookie-de-localidad",
  },
};
```

> Para más información sobre la configuración y temas avanzados, visita nuestra [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

Por defecto, `express-intlayer` interpretará la cabecera `Accept-Language` para determinar el idioma preferido del cliente.

## Potenciado por TypeScript

`express-intlayer` aprovecha las robustas capacidades de TypeScript para mejorar el proceso de internacionalización. La tipificación estática de TypeScript asegura que se tenga en cuenta cada clave de traducción, reduciendo el riesgo de traducciones faltantes y mejorando el mantenimiento.

> Asegúrese de que los tipos generados (por defecto en ./types/intlayer.d.ts) estén incluidos en su archivo tsconfig.json.
