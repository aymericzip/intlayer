---
createdAt: 2025-06-07
updatedAt: 2025-06-07
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

The **Intlayer MCP (Model Context Protocol) Server** provides AI-powered IDE assistance tailored for the Intlayer ecosystem. Designed for modern developer environments like **Cursor**, **GitHub Copilot workspace**, and any IDE supporting the MCP protocol, this server gives you contextual, real-time support based on your project's setup.

## Why Use the Intlayer MCP Server?

By enabling the Intlayer MCP Server in your IDE, you unlock:

- **Smart CLI Integration**
  Access and run Intlayer CLI commands directly from your IDE interface. View the full list of commands and options in the [Intlayer CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md).

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

## Setup VS Code

To use the Intlayer MCP Server with VS Code, you need to configure it in your workspace or user settings.

### Workspace Configuration

Create a `.vscode/mcp.json` file in your project root:

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

### Using the MCP Server in VS Code

1. **Enable Agent Mode**: Open the Chat view (⌃⌘I on Mac, Ctrl+Alt+I on Windows/Linux) and select **Agent** mode from the dropdown.

2. **Access Tools**: Click the **Tools** button to view available Intlayer tools. You can select/deselect specific tools as needed.

3. **Direct Tool Reference**: Reference tools directly in your prompts by typing `#` followed by the tool name.

4. **Tool Confirmation**: By default, VS Code will ask for confirmation before running tools. Use the **Continue** button options to automatically confirm tools for the current session, workspace, or all future invocations.

### Managing the Server

- Run **MCP: List Servers** from the Command Palette to view configured servers
- Start, stop, or restart the Intlayer MCP server as needed
- View server logs for troubleshooting by selecting the server and choosing **Show Output**

For more detailed information about VS Code MCP integration, see the [official VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Using the MCP Server via CLI

You can also run the Intlayer MCP server directly from the command line for testing, debugging, or integration with other tools.

### Install the MCP Server

First, install the MCP server package globally or use it via npx:

```bash
# Install globally
npm install -g @intlayer/mcp

# Or use directly with npx (recommended)
npx @intlayer/mcp
```

### Start the Server

To start the MCP server with the inspector for debugging and testing:

```bash
# Using the built-in start command
npm run start

# Or directly with npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

This will launch the MCP server with an inspector interface that allows you to:

- Test MCP protocol communications
- Debug server responses
- Validate tool and resource implementations
- Monitor server performance

### Development Usage

For development and testing purposes, you can run the server in various modes:

```bash
# Build and start in development mode
npm run dev

# Run with custom configuration
node dist/cjs/index.cjs

# Test the server functionality
npm test
```

The server will expose Intlayer-specific tools and resources that can be consumed by any MCP-compatible client, not just Cursor or other IDEs.

---

## Features Overview

| Feature        | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| CLI Support    | Run `intlayer` commands, get usage hints and arguments inline                |
| Versioned Docs | Auto-detect and load documentation matching your current version of Intlayer |
| Autocompletion | Intelligent command and config suggestions as you type                       |
| Plugin-Ready   | Compatible with IDEs and tools that support the MCP standard                 |

---

##Useful Links

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)
- [Intlayer GitHub Repository](https://github.com/aymericzip/intlayer)

---

## Doc History

- 5.5.10 - 2025-06-29: Init history
