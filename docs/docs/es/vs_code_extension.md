---
docName: vscode_extension
url: https://intlayer.org/doc/vs-code-extension
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md
createdAt: 2025-03-17
updatedAt: 2025-06-29
title: Extensión Oficial de VS Code
description: Aprende a usar la extensión Intlayer en VS Code para mejorar tu flujo de trabajo de desarrollo. Navega rápidamente entre contenido localizado y gestiona tus diccionarios de manera eficiente.
keywords:
  - Extensión VS Code
  - Intlayer
  - Localización
  - Herramientas de Desarrollo
  - React
  - Next.js
  - JavaScript
  - TypeScript
---

# Extensión Oficial de VS Code

## Resumen

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) es la extensión oficial de Visual Studio Code para **Intlayer**, diseñada para mejorar la experiencia del desarrollador al trabajar con contenido localizado en tus proyectos.

![Extensión Intlayer para VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Enlace de la extensión: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Funcionalidades

### Navegación Instantánea

**Soporte para Ir a la Definición** – Usa `Cmd+Click` (Mac) o `Ctrl+Click` (Windows/Linux) en una clave `useIntlayer` para abrir instantáneamente el archivo de contenido correspondiente.  
**Integración Perfecta** – Funciona sin esfuerzo con proyectos **react-intlayer** y **next-intlayer**.  
**Soporte Multilingüe** – Soporta contenido localizado en diferentes idiomas.  
**Integración con VS Code** – Se integra perfectamente con la navegación y la paleta de comandos de VS Code.

### Comandos para Gestión de Diccionarios

Gestiona tus diccionarios de contenido directamente desde VS Code:

- **Construir Diccionarios** (`extension.buildDictionaries`) – Genera archivos de contenido basados en la estructura de tu proyecto.
- **Subir Diccionarios** (`extension.pushDictionaries`) – Sube el contenido más reciente del diccionario a tu repositorio.
- **Descargar Diccionarios** (`extension.pullDictionaries`) – Sincroniza el contenido más reciente del diccionario desde tu repositorio a tu entorno local.

### Generador de Declaraciones de Contenido

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

Alternativamente, instálalo desde la línea de comandos:

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

3. **Comando-clic** (`⌘+Click` en macOS) o **Ctrl+Click** (en Windows/Linux) sobre la clave (por ejemplo, `"app"`).
4. VS Code abrirá automáticamente el archivo de diccionario correspondiente, por ejemplo, `src/app.content.ts`.

### Gestión de Diccionarios de Contenido

#### Construcción de Diccionarios

Genera todos los archivos de contenido del diccionario con:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Busca **Construir Diccionarios** y ejecuta el comando.

#### Enviar Diccionarios

Sube el contenido más reciente del diccionario:

1. Abre la **Paleta de Comandos**.
2. Busca **Enviar Diccionarios**.
3. Selecciona los diccionarios a enviar y confirma.

#### Descargar Diccionarios

Sincroniza el contenido más reciente del diccionario:

1. Abre la **Paleta de Comandos**.
2. Busca **Descargar Diccionarios**.
3. Elige los diccionarios a descargar.

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

### Ejecutar en Modo Desarrollo

1. Abre el proyecto en **VS Code**.
2. Presiona `F5` para lanzar una nueva ventana de **Host de Desarrollo de Extensión**.

### Enviar una Pull Request

Si mejoras la extensión, envía una PR en [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## Comentarios y Problemas

¿Encontraste un error o tienes una solicitud de función? Abre un issue en nuestro **repositorio de GitHub**:

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Licencia

Intlayer se publica bajo la **Licencia MIT**.

## Historial de Documentación

- 5.5.10 - 2025-06-29: Historial inicial
