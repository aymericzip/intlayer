# Servidor Intlayer MCP

El **Servidor Intlayer MCP (Model Context Protocol)** proporciona asistencia IDE impulsada por IA, adaptada para el ecosistema de [Intlayer](https://github.com/aymericzip/intlayer). Diseñado para entornos de desarrollo modernos como **Cursor**, **Espacio de trabajo de GitHub Copilot**, y cualquier IDE que soporte el protocolo MCP, este servidor te ofrece soporte contextual y en tiempo real basado en la configuración de tu proyecto.

## ¿Por qué usar el Servidor Intlayer MCP?

Al habilitar el Servidor Intlayer MCP en tu IDE, desbloqueas:

- **Integración Inteligente con CLI**
  Accede y ejecuta comandos de Intlayer CLI directamente desde la interfaz de tu IDE. Consulta la lista completa de comandos y opciones en la [documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

- **Documentación Contextual**
  El servidor MCP carga y expone la documentación que corresponde a la versión de Intlayer que estás utilizando en tu proyecto. Esto asegura que las sugerencias de código, las opciones de comandos y las explicaciones estén siempre actualizadas y sean relevantes.

- **Desarrollo Asistido por IA**
  Con sugerencias y autocompletado conscientes del proyecto, el asistente de IA puede explicar tu código, recomendar el uso de CLI o sugerir cómo usar características específicas de Intlayer basándose en tus archivos actuales.

- **Configuración Ligera e Instantánea**
  Sin necesidad de mantenimiento de servidor o instalaciones pesadas. Simplemente configura tu archivo `.cursor/mcp.json` o el equivalente de configuración MCP y estarás listo para comenzar.

---

## Configurar Cursor

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

## 🛠 Resumen de Características

| Característica        | Descripción                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| 🧠 Soporte CLI        | Ejecuta comandos `intlayer`, obtén sugerencias de uso y argumentos en línea                     |
| 📘 Docs Versionadas   | Detecta automáticamente y carga la documentación que coincide con tu versión actual de Intlayer |
| 🛎 Autocompletado     | Sugerencias inteligentes de comandos y configuraciones mientras escribes                        |
| 🧩 Listo para Plugins | Compatible con IDEs y herramientas que soportan el estándar MCP                                 |

---

## 📎 Enlaces Útiles

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)
- [Repositorio de Intlayer en GitHub](https://github.com/aymericzip/intlayer)
