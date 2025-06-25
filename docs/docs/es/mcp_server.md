---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/mcp_server.md
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: Documentación del servidor MCP
description: Explore las características y la configuración del servidor MCP para optimizar la gestión y las operaciones de su servidor.
keywords:
  - Servidor MCP
  - Gestión de servidores
  - Optimización
  - Intlayer
  - Documentación
  - Configuración
  - Características
---

# Servidor Intlayer MCP

El **Servidor Intlayer MCP (Model Context Protocol)** proporciona asistencia IDE impulsada por IA adaptada al ecosistema de Intlayer. Diseñado para entornos de desarrollo modernos como **Cursor**, **GitHub Copilot workspace**, y cualquier IDE que soporte el protocolo MCP, este servidor te ofrece soporte contextual y en tiempo real basado en la configuración de tu proyecto.

## ¿Por qué usar el Servidor Intlayer MCP?

Al habilitar el Servidor Intlayer MCP en tu IDE, desbloqueas:

- **Integración Inteligente con CLI**
  Accede y ejecuta comandos de Intlayer CLI directamente desde la interfaz de tu IDE. Consulta la lista completa de comandos y opciones en la [documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

- **Documentación Contextual**
  El servidor MCP carga y expone la documentación que corresponde a la versión de Intlayer que estás utilizando en tu proyecto. Esto asegura que las sugerencias de código, opciones de comandos y explicaciones estén siempre actualizadas y sean relevantes.

- **Desarrollo Asistido por IA**
  Con sugerencias y autocompletado conscientes del proyecto, el asistente de IA puede explicar tu código, recomendar el uso de CLI o sugerir cómo usar características específicas de Intlayer basándose en tus archivos actuales.

- **Configuración Ligera e Instantánea**
  No se requiere mantenimiento del servidor ni instalaciones pesadas. Solo configura tu archivo `.cursor/mcp.json` o equivalente de configuración MCP y estarás listo para comenzar.

---

## Configuración en Cursor

En la raíz de tu proyecto, agrega el siguiente archivo de configuración `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

Esto indica a tu IDE que inicie el servidor Intlayer MCP usando `npx`, asegurando que siempre utilice la última versión disponible a menos que la fijes.

---

## Configuración en VS Code

Para usar el Servidor Intlayer MCP con VS Code, necesitas configurarlo en tu espacio de trabajo o en la configuración de usuario.

### Configuración del Espacio de Trabajo

Crea un archivo `.vscode/mcp.json` en la raíz de tu proyecto:

```json
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Usando el Servidor MCP en VS Code

1. **Habilitar el Modo Agente**: Abre la vista de Chat (⌃⌘I en Mac, Ctrl+Alt+I en Windows/Linux) y selecciona el modo **Agente** desde el menú desplegable.

2. **Acceder a Herramientas**: Haz clic en el botón **Herramientas** para ver las herramientas disponibles de Intlayer. Puedes seleccionar/deseleccionar herramientas específicas según sea necesario.

3. **Referencia Directa de Herramientas**: Referencia herramientas directamente en tus indicaciones escribiendo `#` seguido del nombre de la herramienta.

4. **Confirmación de Herramientas**: Por defecto, VS Code pedirá confirmación antes de ejecutar herramientas. Usa las opciones del botón **Continuar** para confirmar automáticamente herramientas para la sesión actual, espacio de trabajo o todas las invocaciones futuras.

### Gestión del Servidor

- Ejecuta **MCP: List Servers** desde el Paleta de Comandos para ver los servidores configurados.
- Inicia, detén o reinicia el servidor Intlayer MCP según sea necesario.
- Visualiza los registros del servidor para solucionar problemas seleccionando el servidor y eligiendo **Mostrar Salida**.

Para información más detallada sobre la integración MCP en VS Code, consulta la [documentación oficial de VS Code MCP](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Uso del Servidor MCP a través de CLI

También puedes ejecutar el servidor Intlayer MCP directamente desde la línea de comandos para pruebas, depuración o integración con otras herramientas.

### Instalar el Servidor MCP

Primero, instala el paquete del servidor MCP globalmente o úsalo a través de npx:

```bash
# Instalar globalmente
npm install -g @intlayer/mcp

# O usar directamente con npx (recomendado)
npx @intlayer/mcp
```

### Iniciar el Servidor

Para iniciar el servidor MCP con el inspector para depuración y pruebas:

```bash
# Usando el comando de inicio integrado
npm run start

# O directamente con npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

Esto lanzará el servidor MCP con una interfaz de inspector que te permite:

- Probar comunicaciones del protocolo MCP
- Depurar respuestas del servidor
- Validar implementaciones de herramientas y recursos
- Monitorear el rendimiento del servidor

### Uso en Desarrollo

Para propósitos de desarrollo y pruebas, puedes ejecutar el servidor en varios modos:

```bash
# Construir e iniciar en modo desarrollo
npm run dev

# Ejecutar con configuración personalizada
node dist/cjs/index.cjs

# Probar la funcionalidad del servidor
npm test
```

El servidor expondrá herramientas y recursos específicos de Intlayer que pueden ser consumidos por cualquier cliente compatible con MCP, no solo Cursor u otros IDEs.

---

## Resumen de Características

| Característica           | Descripción                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| Soporte CLI              | Ejecuta comandos `intlayer`, obtén sugerencias de uso y argumentos en línea                     |
| Documentación Versionada | Detecta automáticamente y carga la documentación que coincide con tu versión actual de Intlayer |
| Autocompletado           | Sugerencias inteligentes de comandos y configuraciones mientras escribes                        |
| Listo para Plugins       | Compatible con IDEs y herramientas que soportan el estándar MCP                                 |

---

## Enlaces Útiles

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)
- [Repositorio de Intlayer en GitHub](https://github.com/aymericzip/intlayer)
