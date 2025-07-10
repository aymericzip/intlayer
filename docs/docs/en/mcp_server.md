---
createdAt: 2025-06-07
updatedAt: 2025-07-10
title: MCP Server Documentation
description: Explore the features and setup of the MCP Server to optimize your server management and operations.
keywords:
  - MCP Server
  - Server Management
  - Optimization
  - Intlayer
  - Documentation
  - Setup
  - Features
slugs:
  - doc
  - mcp-server
---

# Intlayer MCP Server

The **Intlayer MCP (Model Context Protocol) Server** provides AI-powered IDE assistance tailored for the Intlayer ecosystem.

## Where can I use it?

- On modern developer environments like **Cursor**, **VS Code**, and any IDE supporting the MCP protocol.
- On your favorite AI assistant like **Claude Desktop**, **Gemini**, **ChatGPT**, etc.

## Why Use the Intlayer MCP Server?

By enabling the Intlayer MCP Server in your IDE, you unlock:

- **Context-Aware Documentation**
  The MCP server loads and exposes the documentation of Intlayer. To speed up your set up, your migrations, etc.
  This ensures that code suggestions, command options, and explanations are always up to date and relevant.

- **Smart CLI Integration**
  Access and run Intlayer CLI commands directly from your IDE interface. Using the MCP server, you can let your AI assistant run commands like `intlayer dictionaries build` to update your dictionaries, or `intlayer dictionaries fill` to fill your missing translations.

  > View the full list of commands and options in the [Intlayer CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md).

---

## Setup in Cursor

Follow the [official documentation](https://docs.cursor.com/context/mcp) to configure the MCP server in Cursor.

In your project root, add the following `.cursor/mcp.json` configuration file:

### Local server (stdio) (recommended)

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

### Remote server (SSE)

For connecting to a remote Intlayer MCP server using Server-Sent Events (SSE), you can configure your MCP client to connect to the hosted service.

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "http://mcp.intlayer.com",
      "transport": "sse"
    }
  }
}
```

This tells your IDE to launch the Intlayer MCP server using `npx`, ensuring it always uses the latest available version unless you pin it.

---

## Setup in VS Code

Follow the [official documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) to configure the MCP server in VS Code.

To use the Intlayer MCP Server with VS Code, you need to configure it in your workspace or user settings.

### Local server (stdio) (recommended)

Create a `.vscode/mcp.json` file in your project root:

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

### Remote server (SSE)

For connecting to a remote Intlayer MCP server using Server-Sent Events (SSE), you can configure your MCP client to connect to the hosted service.

```json filename=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "http://mcp.intlayer.com",
      "type": "sse"
    }
  }
}
```

---

### Set Up in Claude Desktop

Follow the [official documentation](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) to configure the MCP server in Claude Desktop.

Path of the config file:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

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

## Using the MCP Server via CLI

You can also run the Intlayer MCP server directly from the command line for testing, debugging, or integration with other tools.

```bash
# Install globally
npm install -g @intlayer/mcp

# Or use directly with npx (recommended)
npx @intlayer/mcp
```

---

## Doc History

| Version | Date       | Changes                              |
| ------- | ---------- | ------------------------------------ |
| 5.5.12  | 2025-07-10 | Add set up of Claude Desktop         |
| 5.5.12  | 2025-07-10 | Add SSE transport and distant server |
| 5.5.10  | 2025-06-29 | Init history                         |
