# Extensión VS Code Oficial para Intlayer

## Descripción General

**Intlayer** es la extensión oficial de Visual Studio Code para **Intlayer**, diseñada para mejorar la experiencia del desarrollador al trabajar con contenido localizado en proyectos de **React, Next.js y JavaScript**.

Con esta extensión, los desarrolladores pueden **navegar rápidamente** a sus diccionarios de contenido, gestionar archivos de localización y optimizar su flujo de trabajo con potentes comandos automatizados.

## Funcionalidades

### Navegación Instantánea

**Soporte para Ir a Definición** – Usa `Cmd+Click` (Mac) o `Ctrl+Click` (Windows/Linux) en una clave de `useIntlayer` para abrir instantáneamente el archivo de contenido correspondiente.  
**Integración Perfecta** – Funciona sin problemas con proyectos de **react-intlayer** y **next-intlayer**.  
**Soporte Multilenguaje** – Compatible con contenido localizado en diferentes idiomas.  
**Integración con VS Code** – Se integra perfectamente con la navegación y el paleta de comandos de VS Code.

### Comandos de Gestión de Diccionarios

Gestiona tus diccionarios de contenido directamente desde VS Code:

- **Construir Diccionarios** (`extension.buildDictionaries`) – Genera archivos de contenido basados en la estructura de tu proyecto.
- **Subir Diccionarios** (`extension.pushDictionaries`) – Sube el contenido más reciente del diccionario a tu repositorio.
- **Descargar Diccionarios** (`extension.pullDictionaries`) – Sincroniza el contenido más reciente del diccionario desde tu repositorio a tu entorno local.

### Generador de Declaración de Contenido

Genera fácilmente archivos de diccionario estructurados en diferentes formatos:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Instalación

Puedes instalar **Intlayer** directamente desde el Marketplace de VS Code:

1. Abre **VS Code**.
2. Ve al **Marketplace de Extensiones**.
3. Busca **"Intlayer"**.
4. Haz clic en **Instalar**.

Alternativamente, instálalo a través de la línea de comandos:

```sh
code --install-extension intlayer
```

## Uso

### Navegación Rápida

1. Abre un proyecto que use **react-intlayer**.
2. Localiza una llamada a `useIntlayer()`, como:

   ```tsx
   const content = useIntlayer("app");
   ```

3. Haz **Cmd+Click** (`⌘+Click` en macOS) o **Ctrl+Click** (en Windows/Linux) en la clave (por ejemplo, `"app"`).
4. VS Code abrirá automáticamente el archivo de diccionario correspondiente, por ejemplo, `src/app.content.ts`.

### Gestión de Diccionarios de Contenido

#### Construcción de Diccionarios

Genera todos los archivos de contenido del diccionario con:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Busca **Construir Diccionarios** y ejecuta el comando.

#### Subir Diccionarios

Sube el contenido más reciente del diccionario:

1. Abre la **Paleta de Comandos**.
2. Busca **Subir Diccionarios**.
3. Selecciona los diccionarios a subir y confirma.

#### Descargar Diccionarios

Sincroniza el contenido más reciente del diccionario:

1. Abre la **Paleta de Comandos**.
2. Busca **Descargar Diccionarios**.
3. Elige los diccionarios a descargar.

### Personalización de Rutas de Archivos de Diccionario

Por defecto, la extensión sigue la estructura estándar del proyecto **Intlayer**. Sin embargo, puedes configurar rutas personalizadas:

1. Abre **Configuración (`Cmd + ,` en macOS / `Ctrl + ,` en Windows/Linux)`**.
2. Busca `Intlayer`.
3. Ajusta la configuración de la ruta del archivo de contenido.

## Desarrollo y Contribución

¿Quieres contribuir? ¡Damos la bienvenida a las contribuciones de la comunidad!

URL del repositorio: https://github.com/aymericzip/intlayer-vs-code-extension

### Primeros Pasos

Clona el repositorio e instala las dependencias:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> Usa el gestor de paquetes `npm` para compatibilidad con el paquete `vsce` para construir y publicar la extensión.

### Ejecutar en Modo de Desarrollo

1. Abre el proyecto en **VS Code**.
2. Presiona `F5` para lanzar una nueva ventana de **Extension Development Host**.

### Enviar un Pull Request

Si mejoras la extensión, envía un PR en [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## Comentarios y Problemas

¿Encontraste un error o tienes una solicitud de funcionalidad? Abre un problema en nuestro **repositorio de GitHub**:

[Problemas en GitHub](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Licencia

Intlayer se publica bajo la **Licencia MIT**.
