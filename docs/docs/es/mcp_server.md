---
createdAt: 2025-06-07
updatedAt: 2025-07-10
title: Documentación del Servidor MCP
description: Explora las características y la configuración del Servidor MCP para optimizar la gestión y operaciones de tu servidor.
keywords:
  - Servidor MCP
  - Gestión de Servidores
  - Optimización
  - Intlayer
  - Documentación
  - Configuración
  - Características
slugs:
  - doc
  - mcp-server
---

# Servidor MCP de Intlayer

El **Servidor MCP (Protocolo de Contexto de Modelo) de Intlayer** proporciona asistencia para IDE impulsada por IA, adaptada al ecosistema Intlayer.

## ¿Dónde puedo usarlo?

- En entornos de desarrollo modernos como **Cursor**, **VS Code** y cualquier IDE que soporte el protocolo MCP.
- En tu asistente de IA favorito como **Claude Desktop**, **Gemini**, **ChatGPT**, etc.

## ¿Por qué usar el Servidor MCP de Intlayer?

Al habilitar el Servidor MCP de Intlayer en tu IDE, desbloqueas:

- **Documentación Contextualizada**
  El servidor MCP carga y expone la documentación de Intlayer para acelerar tu configuración, tus migraciones, etc.
  Esto garantiza que las sugerencias de código, las opciones de comandos y las explicaciones estén siempre actualizadas y sean relevantes.

- **Integración Inteligente con la CLI**
  Accede y ejecuta comandos de la CLI de Intlayer directamente desde la interfaz de tu IDE. Usando el servidor MCP, puedes permitir que tu asistente de IA ejecute comandos como `intlayer dictionaries build` para actualizar tus diccionarios, o `intlayer dictionaries fill` para completar tus traducciones faltantes.

  > Consulta la lista completa de comandos y opciones en la [documentación de la CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

---

## Configuración en Cursor

Sigue la [documentación oficial](https://docs.cursor.com/context/mcp) para configurar el servidor MCP en Cursor.

En la raíz de tu proyecto, añade el siguiente archivo de configuración `.cursor/mcp.json`:

### Servidor local (stdio) (recomendado)

```json filename=".cursor/mcp.json"
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

Para conectarte a un servidor MCP remoto de Intlayer usando Server-Sent Events (SSE), puedes configurar tu cliente MCP para conectarse al servicio alojado.

> **Nota:** El servidor remoto no integra herramientas CLI. El servidor distante es solo para documentación y contexto.

> **Nota:** Debido a los costos de alojamiento del servidor, no se puede garantizar la disponibilidad del servidor remoto. Recomendamos usar el método de transporte del servidor local (stdio) para una experiencia más confiable.

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

Esto indica a tu IDE que inicie el servidor Intlayer MCP usando `npx`, asegurando que siempre use la versión más reciente disponible a menos que la fijes.

---

## Configuración en VS Code

Sigue la [documentación oficial](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) para configurar el servidor MCP en VS Code.

Para usar el servidor Intlayer MCP con VS Code, necesitas configurarlo en los ajustes de tu espacio de trabajo o de usuario.

### Servidor local (stdio) (recomendado)

Crea un archivo `.vscode/mcp.json` en la raíz de tu proyecto:

```json filename=".vscode/mcp.json"
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

> **Nota:** El servidor remoto no integra herramientas CLI. El servidor distante es solo para documentación y contexto.

> **Nota:** Debido a los costos de alojamiento del servidor, no se puede garantizar la disponibilidad del servidor remoto. Recomendamos usar el método de transporte del servidor local (stdio) para una experiencia más confiable.

```json filename=".vscode/mcp.json"
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

1 - Ve al [panel de prompts](https://platform.openai.com/prompts)  
2 - Haz clic en "+ Crear"  
3 - Haz clic en "Herramientas (Crear o +)"  
4 - Selecciona "Servidor MCP"  
5 - Haz clic en "Agregar nuevo"  
6 - Completa los siguientes campos:

- URL: https://mcp.intlayer.org
- Etiqueta: Servidor MCP de Intlayer
- Nombre: intlayer-mcp-server
- Autenticación: Ninguna

7 - Haz clic en "Guardar"

> **Nota:** El servidor remoto no integra herramientas CLI. El servidor remoto es solo para documentación y contexto.

> **Nota:** Debido a los costos de alojamiento del servidor, no se puede garantizar la disponibilidad del servidor remoto. Recomendamos usar el método de transporte del servidor local (stdio) para una experiencia más confiable.

---

## Configuración en Claude Desktop

Sigue la [documentación oficial](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) para configurar el servidor MCP en Claude Desktop.

Ruta del archivo de configuración:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Servidor local (stdio) (recomendado)

```json filename="claude_desktop_config.json"
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

## Uso del servidor MCP vía CLI

También puedes ejecutar el servidor Intlayer MCP directamente desde la línea de comandos para pruebas, depuración o integración con otras herramientas.

```bash
# Instalar globalmente
npm install -g @intlayer/mcp

# O usar directamente con npx (recomendado)
npx @intlayer/mcp
```

---

## Historial de la documentación

| Versión | Fecha      | Cambios                                  |
| ------- | ---------- | ---------------------------------------- |
| 5.5.12  | 2025-07-11 | Añadida configuración de ChatGPT         |
| 5.5.12  | 2025-07-10 | Añadida configuración de Claude Desktop  |
| 5.5.12  | 2025-07-10 | Añadido transporte SSE y servidor remoto |
| 5.5.10  | 2025-06-29 | Historial inicial                        |
