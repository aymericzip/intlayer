# Documentación de Intlayer

¡Bienvenido a la **documentación oficial de Intlayer**! Aquí encontrarás todo lo que necesitas para integrar, configurar y dominar Intlayer para todas tus necesidades de internacionalización (i18n), ya sea que estés trabajando con **Next.js**, **React**, **Vite**, **Express**, o cualquier otro entorno de JavaScript.

Intlayer ofrece un enfoque flexible y moderno para traducir tu aplicación. Nuestra documentación te guiará desde la instalación y configuración hasta características avanzadas como **traducción impulsada por IA**, **definiciones de TypeScript**, y soporte para **componentes del servidor**, empoderándote para crear una experiencia multilingüe fluida.

---

## Comenzando

- **[Introducción](https://github.com/aymericzip/intlayer/blob/main/docs/es/introduction.md)**  
  Obtén una visión general de cómo funciona Intlayer, sus características clave y por qué es un cambio radical para i18n.

- **[Cómo Funciona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/how_works_intlayer.md)**  
  Profundiza en el diseño arquitectónico y aprende cómo Intlayer maneja todo, desde la declaración del contenido hasta la entrega de traducción.

- **[Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md)**  
  Personaliza Intlayer para adaptarse a las necesidades de tu proyecto. Explora opciones de middleware, estructuras de directorios y configuraciones avanzadas.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)**  
  Administra contenido y traducciones utilizando nuestra herramienta de línea de comandos. Descubre cómo subir y bajar contenido, automatizar traducciones y más.

- **[Editor de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md)**  
  Simplifica la colaboración con no desarrolladores y potencia tus traducciones con IA—directamente en nuestro CMS gratuito e intuitivo.

---

## Conceptos Clave

### Declaración de Contenido

Organiza tu contenido multilingüe cerca de tu código para mantener todo consistente y mantenible.

- **[Comenzar](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md)**  
  Aprende lo básico de declarar tu contenido en Intlayer.

- **[Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/translation.md)**  
  Entiende cómo se generan, almacenan y utilizan las traducciones en tu aplicación.

- **[Enumeración](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/enumeration.md)**  
  Maneja fácilmente conjuntos de datos repetidos o fijos a través de varios idiomas.

- **[Obtención de Funciones](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/function_fetching.md)**  
  Ve cómo obtener contenido dinámicamente con lógica personalizada para que coincida con el flujo de trabajo de tu proyecto.

---

## Entornos e Integraciones

Hemos construido Intlayer con flexibilidad en mente, ofreciendo una integración fluida a través de marcos y herramientas de construcción populares:

- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_express.md)**

Cada guía de integración incluye mejores prácticas para usar las características de Intlayer—como **renderizado del lado del servidor**, **enrutamiento dinámico**, o **renderizado del lado del cliente**—para que puedas mantener una aplicación rápida, amigable con SEO y altamente escalable.

---

## Paquetes

El diseño modular de Intlayer ofrece paquetes dedicados para entornos y necesidades específicas:

### `intlayer`

Funciones de utilidad central para configurar y gestionar tu configuración de i18n.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

Aprovecha Intlayer dentro de aplicaciones basadas en **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/express-intlayer/t.md)**  
  Un sencillo y minimalista ayudante de traducción para tus rutas y vistas del servidor.

### `react-intlayer`

Mejora tus aplicaciones **React** con potentes hooks:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Integra sin problemas con **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/next-intlayer/useLocale.md)**

---

## Recursos Adicionales

- **[Blog: Intlayer e i18next](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_i18next.md)**  
  Aprende cómo Intlayer complementa y se compara con la popular biblioteca **i18next**.

- **[Tutorial en Vivo en YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Mira una demostración completa y aprende cómo integrar Intlayer en tiempo real.

---

## Contribuciones y Comentarios

Valoramos el poder del código abierto y el desarrollo impulsado por la comunidad. Si deseas proponer mejoras, agregar una nueva guía o corregir algún problema en nuestra documentación, siéntete libre de enviar una Pull Request o abrir un issue en nuestro [repositorio de GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**¿Listo para traducir tu aplicación de manera más rápida y eficiente?** Sumérgete en nuestra documentación para comenzar a usar Intlayer hoy. Experimenta un enfoque robusto y simplificado hacia la internacionalización que mantiene tu contenido organizado y a tu equipo más productivo.

¡Feliz traducción!  
— El equipo de Intlayer
