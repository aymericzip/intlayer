---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Extensión Oficial para VS Code
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
slugs:
  - doc
  - vs-code-extension
---

# Extensión Oficial para VS Code

## Descripción general

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) es la extensión oficial de Visual Studio Code para **Intlayer**, diseñada para mejorar la experiencia del desarrollador al trabajar con contenido localizado en tus proyectos.

![Extensión Intlayer para VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Enlace de la extensión: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Funcionalidades

![Rellenar diccionarios](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Navegación Instantánea** – Salta rápidamente al archivo de contenido correcto al hacer clic en una clave `useIntlayer`.
- **Rellenar Diccionarios** – Rellena los diccionarios con contenido de tu proyecto.

![Listar comandos](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Acceso fácil a los comandos de Intlayer** – Construye, envía, descarga, rellena y prueba diccionarios de contenido con facilidad.

![Crear archivo de contenido](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **Generador de declaración de contenido** – Crea archivos de contenido de diccionario en varios formatos (`.ts`, `.esm`, `.cjs`, `.json`).

![Probar diccionarios](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Probar diccionarios** – Prueba diccionarios para detectar traducciones faltantes.

![Reconstruir diccionario](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Mantén tus diccionarios actualizados** – Mantén tus diccionarios actualizados con el contenido más reciente de tu proyecto.

![Pestaña Intlayer (Barra de Actividad)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Pestaña Intlayer (Barra de Actividad)** – Navega y busca diccionarios desde una pestaña lateral dedicada con barra de herramientas y acciones contextuales (Construir, Descargar, Enviar, Rellenar, Actualizar, Probar, Crear Archivo).

## Uso

### Navegación rápida

1. Abre un proyecto que use **react-intlayer**.
2. Localiza una llamada a `useIntlayer()`, como:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Haz clic con comando** (`⌘+Click` en macOS) o **Ctrl+Click** (en Windows/Linux) sobre la clave (por ejemplo, `"app"`).
4. VS Code abrirá automáticamente el archivo de diccionario correspondiente, por ejemplo, `src/app.content.ts`.

### Pestaña Intlayer (Barra de Actividad)

Usa la pestaña lateral para navegar y gestionar diccionarios:

- Abre el ícono de Intlayer en la Barra de Actividad.
- En **Buscar**, escribe para filtrar diccionarios y entradas en tiempo real.
- En **Diccionarios**, navega por entornos, diccionarios y archivos. Usa la barra de herramientas para Construir, Extraer (Pull), Enviar (Push), Rellenar, Actualizar, Probar y Crear Archivo de Diccionario. Haz clic derecho para acciones contextuales (Extraer/Enviar en diccionarios, Rellenar en archivos). El archivo actual del editor se revela automáticamente en el árbol cuando es aplicable.

### Acceso a los comandos

Puedes acceder a los comandos desde la **Paleta de Comandos**.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Construir Diccionarios**
- **Enviar Diccionarios**
- **Obtener Diccionarios**
- **Rellenar Diccionarios**
- **Probar Diccionarios**
- **Crear Archivo de Diccionario**

### Carga de Variables de Entorno

Intlayer recomienda almacenar tus claves API de IA, así como el ID y secreto del cliente de Intlayer en variables de entorno.

La extensión puede cargar variables de entorno desde tu espacio de trabajo para ejecutar comandos de Intlayer con el contexto correcto.

- **Orden de carga (por prioridad)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **No destructivo**: los valores existentes en `process.env` no son sobrescritos.
- **Alcance**: los archivos se resuelven desde el directorio base configurado (por defecto la raíz del espacio de trabajo).

#### Selección del entorno activo

- **Paleta de Comandos**: abre la paleta y ejecuta `Intlayer: Select Environment`, luego elige el entorno (por ejemplo, `development`, `staging`, `production`). La extensión intentará cargar el primer archivo disponible en la lista de prioridad mencionada y mostrará una notificación como “Entorno cargado desde .env.<env>.local”.
- **Configuración**: ve a `Settings → Extensions → Intlayer`, y configura:
  - **Environment**: el nombre del entorno usado para resolver archivos `.env.<env>*`.
  - (Opcional) **Env File**: una ruta explícita a un archivo `.env`. Cuando se proporciona, tiene prioridad sobre la lista inferida.

#### Monorepos y directorios personalizados

Si tus archivos `.env` están fuera de la raíz del espacio de trabajo, configura el **Directorio Base** en `Configuración → Extensiones → Intlayer`. El cargador buscará los archivos `.env` relativos a ese directorio.

## Historial de Documentación

| Versión | Fecha      | Cambios                                       |
| ------- | ---------- | --------------------------------------------- |
| 6.1.5   | 2025-09-30 | Añadido gif de demostración                   |
| 6.1.0   | 2025-09-24 | Añadida sección de selección de entorno       |
| 6.0.0   | 2025-09-22 | Pestaña Intlayer / Comandos Rellenar y Probar |
| 5.5.10  | 2025-06-29 | Historial inicial                             |
