---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: Documentación del Servidor MCP
description: Explora las características y configuración del Servidor MCP para optimizar la gestión y operaciones de tu servidor.
keywords:
  - Servidor MCP
  - Gestión de Servidor
  - Optimización
  - Intlayer
  - Documentación
  - Configuración
  - Características
slugs:
  - doc
  - mcp-server
history:
  - version: 5.5.12
    date: 2025-07-11
    changes: Añadida configuración de ChatGPT
  - version: 5.5.12
    date: 2025-07-10
    changes: Añadida configuración de Claude Desktop
  - version: 5.5.12
    date: 2025-07-10
    changes: Añadido transporte SSE y servidor remoto
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Servidor MCP de Intlayer

El **Servidor MCP (Model Context Protocol) de Intlayer** proporciona asistencia para IDE potenciada por IA, adaptada al ecosistema Intlayer.

## ¿Dónde puedo usarlo?

- En entornos modernos de desarrollo como **Cursor**, **VS Code** y cualquier IDE que soporte el protocolo MCP.
- En tu asistente de IA favorito como **Claude Desktop**, **Gemini**, **ChatGPT**, etc.

## ¿Por qué usar el Servidor MCP de Intlayer?

Al habilitar el Servidor MCP de Intlayer en tu IDE, desbloqueas:

- **Documentación Contextualizada**
  El servidor MCP carga y expone la documentación de Intlayer. Para acelerar tu configuración, tus migraciones, etc.
  Esto asegura que las sugerencias de código, las opciones de comandos y las explicaciones estén siempre actualizadas y sean relevantes.

- **Integración Inteligente de CLI**
  Accede y ejecuta comandos de la CLI de Intlayer directamente desde la interfaz de tu IDE. Usando el servidor MCP, puedes permitir que tu asistente de IA ejecute comandos como `intlayer dictionaries build` para actualizar tus diccionarios, o `intlayer dictionaries fill` para completar tus traducciones faltantes.

  > Consulta la lista completa de comandos y opciones en la [documentación de la CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

## Servidor local (stdio) vs Servidor remoto (SSE)

El servidor MCP se puede usar de dos maneras:

- Servidor local (stdio)
- Servidor remoto (SSE)

### Servidor local (stdio) (recomendado)

Intlayer proporciona un paquete NPM que puede instalarse localmente en tu máquina. Puede instalarse en tu IDE favorito, como VS Code, Cursor, así como en tu aplicación de asistente local, como ChatGPT, Claude Desktop, etc.

Este servidor es la forma recomendada de usar el servidor MCP, ya que integra todas las funcionalidades del servidor MCP, incluyendo las herramientas CLI.

### Servidor remoto (SSE)

El servidor MCP también puede usarse de forma remota, utilizando el método de transporte SSE. Este servidor está alojado por Intlayer y está disponible en https://mcp.intlayer.org. Este servidor puede ser accedido públicamente, sin ninguna autenticación, y es gratuito para usar.

Ten en cuenta que el servidor remoto no integra herramientas CLI, autocompletado AI, etc. El servidor remoto es solo para la interacción con la documentación para ayudar a tu asistente AI con el ecosistema Intlayer.

> Debido a los costos de alojamiento del servidor, no se puede garantizar la disponibilidad del servidor remoto. Limitamos el número de conexiones simultáneas. Recomendamos usar el método de transporte del servidor local (stdio) para una experiencia más confiable.

---

## Configuración en Cursor

Sigue la [documentación oficial](https://docs.cursor.com/context/mcp) para configurar el servidor MCP en Cursor.

En la raíz de tu proyecto, agrega el siguiente archivo de configuración `.cursor/mcp.json`:

### Servidor local (stdio) (recomendado)

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Servidor remoto (SSE)

Para conectarte a un servidor Intlayer MCP remoto usando Server-Sent Events (SSE), puedes configurar tu cliente MCP para conectarse al servicio alojado.

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

Esto indica a tu IDE que inicie el servidor Intlayer MCP usando `npx`, asegurando que siempre utilice la versión más reciente disponible a menos que la fijes.

---

## Configuración en VS Code

Sigue la [documentación oficial](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) para configurar el servidor MCP en VS Code.

Para usar el servidor Intlayer MCP con VS Code, necesitas configurarlo en los ajustes de tu espacio de trabajo o usuario.

### Servidor local (stdio) (recomendado)

Crea un archivo `.vscode/mcp.json` en la raíz de tu proyecto:

```json fileName=".vscode/mcp.json"
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

### Servidor remoto (SSE)

Para conectarte a un servidor Intlayer MCP remoto usando Server-Sent Events (SSE), puedes configurar tu cliente MCP para conectarse al servicio alojado.

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## Configuración en ChatGPT

### Servidor remoto (SSE)

Sigue la [documentación oficial](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) para configurar el servidor MCP en ChatGPT.

1. Ve al [panel de prompts](https://platform.openai.com/prompts)
2. Haz clic en `+ Create`
3. Haz clic en `Tools (Create or +)`
4. Selecciona `MCP Server`
5. Haz clic en `Add new`
6. Rellena los siguientes campos:

   - URL: `https://mcp.intlayer.org`
   - Label: `Intlayer MCP Server`
   - Name: `intlayer-mcp-server`
   - Authentication: `None`

7. Haz clic en `Save`

---

## Configuración en Claude Desktop

Sigue la [documentación oficial](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) para configurar el servidor MCP en Claude Desktop.

Ruta del archivo de configuración:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Servidor local (stdio) (recomendado)

```json fileName="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## Uso del Servidor MCP vía CLI

También puedes ejecutar el servidor MCP de Intlayer directamente desde la línea de comandos para pruebas, depuración o integración con otras herramientas.

```bash
# Instalar globalmente
npm install -g @intlayer/mcp

# O usar directamente con npx (recomendado)
npx @intlayer/mcp
```

---
