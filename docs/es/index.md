# Documentación de Intlayer

¡Bienvenido a la documentación oficial de **Intlayer**! Aquí encontrarás todo lo que necesitas para integrar, configurar y dominar Intlayer para todas tus necesidades de internacionalización (i18n), ya sea que estés trabajando con **Next.js**, **React**, **Vite**, **Express** u otro entorno de JavaScript.

Intlayer ofrece un enfoque flexible y moderno para traducir tu aplicación. Nuestra documentación te guiará desde la instalación y configuración hasta características avanzadas como **traducción impulsada por IA**, definiciones de **TypeScript** y soporte para **componentes del servidor**, permitiéndote crear una experiencia multilingüe perfecta.

---

## Comenzando

- **[Introducción](https://github.com/aymericzip/intlayer/blob/main/docs/es/introduction.md)**  
  Obtén una visión general de cómo funciona Intlayer, sus características principales y por qué es un cambio de juego para i18n.

- **[Cómo Funciona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/how_works_intlayer.md)**  
  Profundiza en el diseño arquitectónico y aprende cómo Intlayer maneja todo, desde la declaración de contenido hasta la entrega de traducciones.

- **[Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md)**  
  Personaliza Intlayer para adaptarlo a las necesidades de tu proyecto. Explora las opciones de middleware, estructuras de directorios y configuraciones avanzadas.

- **[CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)**  
  Administra contenido y traducciones usando nuestra herramienta de línea de comandos. Descubre cómo enviar y recibir contenido, automatizar traducciones y más.

- **[Editor de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md)**  
  Simplifica la colaboración con no desarrolladores y potencia tus traducciones con IA, directamente en nuestro CMS gratuito e intuitivo.

---

## Conceptos Básicos

### Diccionario

Organiza tu contenido multilingüe cerca de tu código para mantener todo consistente y manejable.

- **[Comenzar](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md)**  
  Aprende los conceptos básicos para declarar tu contenido en Intlayer.

- **[Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/translation.md)**  
  Comprende cómo se generan, almacenan y utilizan las traducciones en tu aplicación.

- **[Enumeración](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/enumeration.md)**  
  Gestiona fácilmente conjuntos de datos repetidos o fijos en varios idiomas.

- **[Obtención de Funciones](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/function_fetching.md)**  
  Descubre cómo obtener contenido dinámicamente con lógica personalizada para adaptarse al flujo de trabajo de tu proyecto.

---

## Entornos e Integraciones

Hemos diseñado Intlayer con flexibilidad en mente, ofreciendo integración fluida en los frameworks y herramientas de construcción más populares:

- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_express.md)**

Cada guía de integración incluye las mejores prácticas para usar las características de Intlayer, como **renderizado del lado del servidor**, **enrutamiento dinámico** o **renderizado del lado del cliente**, para que puedas mantener una aplicación rápida, optimizada para SEO y altamente escalable.

---

## Paquetes

El diseño modular de Intlayer ofrece paquetes dedicados para entornos y necesidades específicas:

### `intlayer`

Funciones utilitarias principales para configurar y gestionar tu configuración de i18n.

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
  Un asistente de traducción minimalista y directo para tus rutas y vistas del servidor.

### `react-intlayer`

Mejora tus aplicaciones de **React** con potentes hooks:

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

Valoramos el poder del desarrollo de código abierto y basado en la comunidad. Si deseas proponer mejoras, agregar una nueva guía o corregir cualquier problema en nuestra documentación, no dudes en enviar un Pull Request o abrir un issue en nuestro [repositorio de GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**¿Listo para traducir tu aplicación más rápido y eficientemente?** Sumérgete en nuestra documentación para comenzar a usar Intlayer hoy. Experimenta un enfoque robusto y optimizado para la internacionalización que mantiene tu contenido organizado y tu equipo más productivo.
