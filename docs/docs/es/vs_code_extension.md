---
createdAt: 2025-03-17
updatedAt: 2025-09-22
title: Extensión Oficial de VS Code
description: Aprende a usar la extensión Intlayer en VS Code para mejorar tu flujo de trabajo de desarrollo. Navega rápidamente entre contenido localizado y gestiona tus diccionarios de manera eficiente.
keywords:
  - Extensión de VS Code
  - Intlayer
  - Localización
  - Herramientas de Desarrollo
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# Extensión Oficial de VS Code

## Visión General

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) es la extensión oficial de Visual Studio Code para **Intlayer**, diseñada para mejorar la experiencia del desarrollador al trabajar con contenido localizado en tus proyectos.

![Extensión Intlayer para VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Enlace de la extensión: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Funcionalidades

### Navegación Instantánea

**Soporte para Ir a la Definición** – Usa `⌘ + Click` (Mac) o `Ctrl + Click` (Windows/Linux) sobre una clave `useIntlayer` para abrir instantáneamente el archivo de contenido correspondiente.  
**Integración Perfecta** – Funciona sin problemas con proyectos **react-intlayer** y **next-intlayer**.  
**Soporte Multilingüe** – Soporta contenido localizado en diferentes idiomas.  
**Integración con VS Code** – Se integra de manera fluida con la navegación y la paleta de comandos de VS Code.

### Comandos para la Gestión de Diccionarios

Gestiona tus diccionarios de contenido directamente desde VS Code:

- **Construir Diccionarios** – Genera archivos de contenido basados en la estructura de tu proyecto.
- **Subir Diccionarios** – Sube el contenido más reciente del diccionario a tu repositorio.
- **Descargar Diccionarios** – Sincroniza el contenido más reciente del diccionario desde tu repositorio a tu entorno local.
- **Rellenar Diccionarios** – Llena los diccionarios con contenido de tu proyecto.
- **Probar Diccionarios** – Identifica traducciones faltantes o incompletas.

### Generador de Declaración de Contenido

Genera fácilmente archivos de diccionario estructurados en diferentes formatos:

Si estás trabajando actualmente en un componente, generará el archivo `.content.{ts,tsx,js,jsx,mjs,cjs,json}` para ti.

Ejemplo de componente:

```tsx fileName="src/components/MyComponent/index.tsx"
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("my-component");

  return <span>{myTranslatedContent}</span>;
};
```

Archivo generado en formato TypeScript:

```tsx fileName="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "my-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

Formatos disponibles:

- **TypeScript (`.ts`)**
- **Módulo ES (`.esm`)**
- **CommonJS (`.cjs`)**
- **JSON (`.json`)**

### Pestaña Intlayer (Barra de Actividad)

Abre la pestaña de Intlayer haciendo clic en el ícono de Intlayer en la Barra de Actividades de VS Code. Contiene dos vistas:

- **Buscar**: Una barra de búsqueda en vivo para filtrar rápidamente los diccionarios y su contenido. Al escribir, los resultados se actualizan instantáneamente.
- **Diccionarios**: Una vista en árbol de tus entornos/proyectos, claves de diccionario y los archivos que aportan entradas. Puedes:
  - Hacer clic en un archivo para abrirlo en el editor.
  - Usar la barra de herramientas para ejecutar acciones: Construir, Extraer (Pull), Enviar (Push), Rellenar, Actualizar, Probar y Crear Archivo de Diccionario.
  - Usar el menú contextual para acciones específicas del ítem:
    - En un diccionario: Extraer (Pull) o Enviar (Push)
    - En un archivo: Rellenar Diccionario
  - Cuando cambias de editor, el árbol revelará el archivo correspondiente si pertenece a un diccionario.

## Instalación

Puedes instalar **Intlayer** directamente desde el Marketplace de VS Code:

1. Abre **VS Code**.
2. Ve al **Marketplace de Extensiones**.
3. Busca **"Intlayer"**.
4. Haz clic en **Instalar**.

## Uso

### Navegación Rápida

1. Abre un proyecto que use **react-intlayer**.
2. Localiza una llamada a `useIntlayer()`, como:

   ```tsx
   const content = useIntlayer("app");
   ```

3. Haz **Command-click** (`⌘+Click` en macOS) o **Ctrl+Click** (en Windows/Linux) sobre la clave (por ejemplo, `"app"`).
4. VS Code abrirá automáticamente el archivo de diccionario correspondiente, por ejemplo, `src/app.content.ts`.

### Gestión de Diccionarios de Contenido

### Pestaña Intlayer (Barra de Actividades)

Usa la pestaña lateral para explorar y gestionar diccionarios:

- Abre el ícono de Intlayer en la Barra de Actividades.
- En **Buscar**, escribe para filtrar diccionarios y entradas en tiempo real.
- En **Diccionarios**, navega por entornos, diccionarios y archivos. Usa la barra de herramientas para Construir, Extraer, Enviar, Rellenar, Actualizar, Probar y Crear Archivo de Diccionario. Haz clic derecho para acciones contextuales (Extraer/Enviar en diccionarios, Rellenar en archivos). El archivo actual del editor se revela automáticamente en el árbol cuando es aplicable.

#### Construcción de Diccionarios

Genera todos los archivos de contenido del diccionario con:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Busca **Construir Diccionarios** y ejecuta el comando.

#### Envío de Diccionarios

Sube el contenido más reciente del diccionario:

1. Abre la **Paleta de Comandos**.
2. Busca **Enviar Diccionarios**.
3. Selecciona los diccionarios a enviar y confirma.

#### Extracción de Diccionarios

Sincroniza el contenido más reciente del diccionario:

1. Abre la **Paleta de Comandos**.
2. Busca **Extraer Diccionarios**.
3. Elige los diccionarios que deseas extraer.

#### Rellenar Diccionarios

Rellena los diccionarios con contenido de tu proyecto:

1. Abre la **Paleta de Comandos**.
2. Busca **Rellenar Diccionarios**.
3. Ejecuta el comando para poblar los diccionarios.

#### Probar Diccionarios

Valida los diccionarios y encuentra traducciones faltantes:

1. Abre la **Paleta de Comandos**.
2. Busca **Probar Diccionarios**.
3. Revisa los problemas reportados y corrígelos según sea necesario.

## Historial del Documento

| Versión | Fecha      | Cambios           |
| ------- | ---------- | ----------------- |
| 5.5.10  | 2025-06-29 | Historial inicial |
