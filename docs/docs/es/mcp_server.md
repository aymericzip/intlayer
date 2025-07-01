---
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: Documentación del Servidor MCP
description: Explora las características y configuración del Servidor MCP para optimizar la gestión y operaciones de tu servidor.
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

El **Servidor MCP (Model Context Protocol) de Intlayer** proporciona asistencia en el IDE potenciada por IA, adaptada al ecosistema de Intlayer. Diseñado para entornos modernos de desarrollo como **Cursor**, **GitHub Copilot workspace** y cualquier IDE que soporte el protocolo MCP, este servidor te ofrece soporte contextual y en tiempo real basado en la configuración de tu proyecto.

## ¿Por qué usar el Servidor MCP de Intlayer?

Al habilitar el Servidor MCP de Intlayer en tu IDE, desbloqueas:

- **Integración inteligente con CLI**
  Accede y ejecuta comandos de la CLI de Intlayer directamente desde la interfaz de tu IDE. Consulta la lista completa de comandos y opciones en la [documentación de la CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

- **Documentación con conciencia contextual**
  El servidor MCP carga y expone la documentación que corresponde a la versión de Intlayer que estás utilizando en tu proyecto. Esto asegura que las sugerencias de código, opciones de comandos y explicaciones estén siempre actualizadas y sean relevantes.

- **Desarrollo asistido por IA**
  Con sugerencias y autocompletado conscientes del proyecto, el asistente de IA puede explicar tu código, recomendar el uso de la CLI o sugerir cómo usar características específicas de Intlayer basándose en tus archivos actuales.

- **Ligero y configuración instantánea**
  No se requiere mantenimiento del servidor ni instalaciones pesadas. Solo configura tu archivo `.cursor/mcp.json` o la configuración MCP equivalente y estarás listo para comenzar.

---

## Configurar Cursor

En la raíz de tu proyecto, añade el siguiente archivo de configuración `.cursor/mcp.json`:

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

Esto indica a tu IDE que inicie el servidor MCP de Intlayer usando `npx`, asegurando que siempre utilice la versión más reciente disponible a menos que la fijes.

---

## Configurar VS Code

Para usar el servidor MCP de Intlayer con VS Code, necesitas configurarlo en los ajustes de tu espacio de trabajo o de usuario.

### Configuración del espacio de trabajo

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

### Uso del servidor MCP en VS Code

1. **Habilitar el modo Agente**: Abre la vista de Chat (⌃⌘I en Mac, Ctrl+Alt+I en Windows/Linux) y selecciona el modo **Agente** en el menú desplegable.

2. **Acceder a las herramientas**: Haz clic en el botón **Herramientas** para ver las herramientas disponibles de Intlayer. Puedes seleccionar o deseleccionar herramientas específicas según sea necesario.

3. **Referencia directa de herramientas**: Referencia las herramientas directamente en tus indicaciones escribiendo `#` seguido del nombre de la herramienta.

4. **Confirmación de herramientas**: Por defecto, VS Code pedirá confirmación antes de ejecutar las herramientas. Usa las opciones del botón **Continuar** para confirmar automáticamente las herramientas para la sesión actual, el espacio de trabajo o todas las invocaciones futuras.

### Gestión del servidor

- Ejecuta **MCP: Listar servidores** desde la Paleta de Comandos para ver los servidores configurados
- Inicia, detén o reinicia el servidor MCP de Intlayer según sea necesario
- Visualiza los registros del servidor para solucionar problemas seleccionando el servidor y eligiendo **Mostrar salida**

Para obtener información más detallada sobre la integración de MCP en VS Code, consulta la [documentación oficial de MCP para VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Uso del servidor MCP vía CLI

También puedes ejecutar el servidor MCP de Intlayer directamente desde la línea de comandos para pruebas, depuración o integración con otras herramientas.

### Instalar el servidor MCP

Primero, instala el paquete del servidor MCP globalmente o úsalo mediante npx:

```bash
# Instalar globalmente
npm install -g @intlayer/mcp

# O usar directamente con npx (recomendado)
npx @intlayer/mcp
```

### Iniciar el servidor

Para iniciar el servidor MCP con el inspector para depuración y pruebas:

```bash
# Usando el comando start incorporado
npm run start

# O directamente con npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

Esto iniciará el servidor MCP con una interfaz de inspector que te permite:

- Probar las comunicaciones del protocolo MCP
- Depurar las respuestas del servidor
- Validar las implementaciones de herramientas y recursos
- Monitorizar el rendimiento del servidor

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

## Resumen de Funcionalidades

| Feature                  | Description                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| Soporte CLI              | Ejecuta comandos `intlayer`, obtiene sugerencias de uso y argumentos en línea                   |
| Documentación Versionada | Detecta y carga automáticamente la documentación que coincide con tu versión actual de Intlayer |
| Autocompletado           | Sugerencias inteligentes de comandos y configuraciones mientras escribes                        |
| Listo para Plugins       | Compatible con IDEs y herramientas que soportan el estándar MCP                                 |

---

## Enlaces Útiles

- [Documentación CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md)
- [Repositorio GitHub de Intlayer](https://github.com/aymericzip/intlayer)

---

## Historial de Documentación

- 5.5.10 - 2025-06-29: Historial inicial
