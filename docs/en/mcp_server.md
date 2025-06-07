# Intlayer MCP Server

The **Intlayer MCP (Model Context Protocol) Server** provides AI-powered IDE assistance tailored for the [Intlayer](https://github.com/aymericzip/intlayer) ecosystem. Designed for modern developer environments like **Cursor**, **GitHub Copilot workspace**, and any IDE supporting the MCP protocol, this server gives you contextual, real-time support based on your project’s setup.

## Why Use the Intlayer MCP Server?

By enabling the Intlayer MCP Server in your IDE, you unlock:

- **Smart CLI Integration**
  Access and run Intlayer CLI commands directly from your IDE interface. View the full list of commands and options in the [Intlayer CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md).

- **Context-Aware Documentation**
  The MCP server loads and exposes the documentation that corresponds to the version of Intlayer you're using in your project. This ensures that code suggestions, command options, and explanations are always up to date and relevant.

- **AI-Assisted Development**
  With project-aware suggestions and autocomplete, the AI assistant can explain your code, recommend CLI usage, or suggest how to use specific features of Intlayer based on your current files.

- **Lightweight & Instant Setup**
  No server maintenance or heavy install required. Just configure your `.cursor/mcp.json` or equivalent MCP config and you're ready to go.

---

## Setup Cursor

In your project root, add the following `.cursor/mcp.json` configuration file:

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

This tells your IDE to launch the Intlayer MCP server using `npx`, ensuring it always uses the latest available version unless you pin it.

---

## 🛠 Features Overview

| Feature           | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| 🧠 CLI Support    | Run `intlayer` commands, get usage hints and arguments inline                |
| 📘 Versioned Docs | Auto-detect and load documentation matching your current version of Intlayer |
| 🛎 Autocompletion | Intelligent command and config suggestions as you type                       |
| 🧩 Plugin-Ready   | Compatible with IDEs and tools that support the MCP standard                 |

---

## 📎 Useful Links

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md)
- [Intlayer GitHub Repository](https://github.com/aymericzip/intlayer)
