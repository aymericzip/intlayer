# Intlayer: Descripción de Funcionalidades y Hoja de Ruta

Intlayer es una solución de gestión de contenido e internacionalización diseñada para optimizar cómo declaras, gestionas y actualizas contenido en tus aplicaciones. Ofrece potentes funcionalidades como declaración de contenido centralizada o distribuida, amplias opciones de internacionalización, soporte para Markdown, renderizado condicional, integración con TypeScript/JavaScript/JSON, y más. A continuación, se presenta una descripción completa de lo que Intlayer ofrece actualmente, seguida de las características futuras en la hoja de ruta.

---

## Funcionalidades Actuales

### 1. Declaración de Contenido

#### Centralizada o Distribuida

- **Centralizada**: Declara todo tu contenido en un único archivo grande en la base de tu aplicación, similar a i18next, para que puedas gestionarlo todo en un solo lugar.
- **Distribuida**: Alternativamente, divide tu contenido en archivos separados a nivel de componente o funcionalidad para un mejor mantenimiento. Esto mantiene tu contenido cerca del código relevante (componentes, pruebas, Storybook, etc.). Eliminar un componente asegura que cualquier contenido asociado también se elimine, evitando datos sobrantes que desordenen tu base de código.

### 2. Internacionalización

- Soporte para **230 idiomas y locales** (incluyendo variantes regionales como francés (Francia), inglés (Canadá), inglés (Reino Unido), portugués (Portugal), etc.).
- Gestiona fácilmente las traducciones para todos estos locales desde un solo lugar.

### 3. Soporte para Markdown

- Declara contenido usando **Markdown**, permitiéndote formatear texto automáticamente con párrafos, encabezados, enlaces y más.
- Ideal para publicaciones de blogs, artículos, páginas de documentación o cualquier escenario donde se necesite formato de texto enriquecido.

### 4. Renderizado Condicional

- Define contenido que se adapta según condiciones específicas, como el idioma del usuario, el estado de inicio de sesión del usuario o cualquier otra variable relacionada con el contexto.
- Ayuda a personalizar experiencias sin duplicar contenido en múltiples archivos.

### 5. Formatos de Declaración de Contenido

Intlayer soporta **TypeScript** (también JavaScript) y **JSON** para declarar contenido.

- **TypeScript**:

  - Asegura que la estructura de tu contenido sea correcta y que no falten traducciones.
  - Ofrece modos de validación estrictos o más flexibles.
  - Permite la obtención dinámica de datos desde variables, funciones o APIs externas.

- **JSON**:
  - Facilita la integración con herramientas externas (como editores visuales) debido a su formato estandarizado.

---

## Integración con Frameworks y Entornos

### 1. Next.js

#### a. Componentes del Servidor y Cliente

- Proporciona un **enfoque unificado de gestión de contenido** para componentes del servidor y cliente.
- Ofrece un contexto integrado para componentes del servidor, simplificando la implementación en comparación con otras soluciones.

#### b. Metadata, Sitemaps y robots.txt

- Obtén e inyecta contenido dinámicamente para generar metadata, sitemaps o archivos `robots.txt`.

#### c. Middleware

- Añade un middleware para **redirigir a los usuarios** al contenido basado en su idioma preferido.

#### d. Compatibilidad con Turbopack y Webpack

- Totalmente compatible con el nuevo Turbopack de Next.js, así como con el Webpack tradicional.

### 2. Vite

- Similar a Next.js, puedes integrar Intlayer con Vite y usar un **middleware** para redirigir a los usuarios al contenido basado en su idioma preferido.

### 3. Express

- Gestiona contenido e internacionaliza servicios backend construidos en Express.
- Personaliza correos electrónicos, mensajes de error, notificaciones push y más con texto localizado.

---

## Editores Visuales y CMS

### 1. Editor Visual Local

- Un **editor visual local gratuito** que te permite editar el contenido de tu aplicación seleccionando directamente elementos en la página.
- Integra funciones de IA para:
  - Generar o corregir traducciones
  - Verificar sintaxis y ortografía
  - Sugerir mejoras
- Puede alojarse localmente o desplegarse en un servidor remoto.

### 2. IntLayer CMS (Remoto)

- Una solución de **CMS alojado** que te permite gestionar el contenido de tu aplicación en línea, sin tocar tu base de código.
- Proporciona funciones asistidas por IA para declarar contenido, gestionar traducciones y corregir errores de sintaxis u ortografía.
- Interactúa con tu contenido a través de la interfaz de tu aplicación en vivo.

---

## IntLayer CLI

- **Auditoría y Generación de Traducciones**: Realiza auditorías en tus archivos de contenido para generar traducciones faltantes o identificar las no utilizadas.
- **Interacción Remota**: Publica tu contenido local en el CMS remoto o recupera contenido remoto para integrarlo en tu aplicación local.
- Útil para **pipelines CI/CD**, asegurando que tu contenido esté siempre sincronizado con tu código.

---

## Entornos

- Usa **variables de entorno** para configurar Intlayer de manera diferente en producción, pruebas y entornos locales.
- Define qué editor visual o proyecto de CMS remoto apuntar dependiendo de tu entorno.

---

## Actualizaciones de Contenido en Vivo

- Al usar diccionarios remotos y el CMS de Intlayer, puedes **actualizar el contenido de tu aplicación en tiempo real**, sin necesidad de redeploy.

---

# Hoja de Ruta: Funcionalidades Futuras

### 1. Pruebas A/B y Personalización

- **Pruebas Multivariantes**: Prueba diferentes versiones de un contenido para ver cuál funciona mejor (por ejemplo, mayor tasa de clics).
- **Personalización Basada en Datos**: Muestra contenido diferente basado en la demografía del usuario (género, edad, ubicación, etc.) u otros patrones de comportamiento.
- **Iteración Automatizada**: Permite que la IA pruebe automáticamente múltiples versiones y elija la mejor o recomiende opciones para la aprobación del administrador.

### 2. Versionado

- Restaura versiones anteriores de tu contenido con **versionado de contenido**.
- Rastrea cambios a lo largo del tiempo y vuelve a estados anteriores si es necesario.

### 3. Traducción Automática

- Para usuarios del CMS remoto, **generación de traducciones con un clic** para cualquier idioma soportado.
- El sistema generará traducciones en segundo plano y luego te pedirá validación o ediciones.

### 4. Mejoras SEO

- Herramientas para **analizar palabras clave**, intención de búsqueda del usuario y tendencias emergentes.
- Sugerir contenido mejorado para mejores rankings y rastrear el rendimiento a largo plazo.

### 5. Compatibilidad con Más Frameworks

- Se están realizando esfuerzos para soportar **Vue, Solid, Svelte, Angular**, y más.
- El objetivo es hacer que Intlayer sea compatible con **cualquier aplicación basada en JavaScript**.

### 6. Extensiones para IDE

- Extensiones para los principales IDEs para proporcionar una **interfaz gráfica** para gestionar traducciones locales y remotas.
- Las características podrían incluir la generación automática de archivos de declaración de contenido para componentes, integración directa con el CMS de Intlayer y validación en tiempo real.

---

## Conclusión

Intlayer aspira a ser una solución integral para la gestión de contenido e internacionalización. Se enfoca en la flexibilidad (archivos centralizados o distribuidos), soporte amplio de idiomas, fácil integración con frameworks modernos y empaquetadores, y potentes funciones impulsadas por IA. A medida que nuevas capacidades, como pruebas A/B, versionado y traducciones automáticas, estén disponibles, Intlayer continuará simplificando los flujos de trabajo de contenido y elevando las experiencias de usuario en diferentes plataformas.

Mantente atento a los próximos lanzamientos y no dudes en explorar las funcionalidades existentes para ver cómo Intlayer puede ayudarte a centralizar y optimizar tus procesos de gestión de contenido hoy mismo!
