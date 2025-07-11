---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: MCP Server Documentation
description: Explore the features and setup of the MCP Server to optimise your server management and operations.
keywords:
  - MCP Server
  - Server Management
  - Optimisation
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
- On your favourite AI assistant like **Claude Desktop**, **Gemini**, **ChatGPT**, etc.

## Why Use the Intlayer MCP Server?

By enabling the Intlayer MCP Server in your IDE, you unlock:

- **Context-Aware Documentation**
  The MCP server loads and exposes the documentation of Intlayer. To speed up your set-up, your migrations, etc.
  This ensures that code suggestions, command options, and explanations are always up to date and relevant.

- **Smart CLI Integration**
  Access and run Intlayer CLI commands directly from your IDE interface. Using the MCP server, you can let your AI assistant run commands like `intlayer dictionaries build` to update your dictionaries, or `intlayer dictionaries fill` to fill your missing translations.

  > View the full list of commands and options in the [Intlayer CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_cli.md).

## Local server (stdio) vs Remote server (SSE)

The MCP server can be used in two ways:

- Local server (stdio)
- Remote server (SSE)

### Local server (stdio) (recommended)

Intlayer provides an NPM package that can be installed locally on your machine. It can be installed in your favourite IDE, such as VS Code, Cursor, as well as your local assistant application, such as ChatGPT, Claude Desktop, etc.

This server is the recommended way to use the MCP server, as it integrates all the features of the MCP server, including the CLI tools.

### Remote server (SSE)

The MCP server can also be used remotely, using the SSE transport method. This server is hosted by Intlayer and is available at https://mcp.intlayer.org. This server can be accessed publicly, without any authentication, and is free to use.

Note that the remote server does not integrate CLI tools, AI autocompletion, etc. The remote server is only for interaction with the documentation to assist your AI assistant with the Intlayer ecosystem.

> Due to server hosting costs, the availability of the remote server cannot be guaranteed. We limit the number of simultaneous connections. We recommend using the local server (stdio) transport method for the most reliable experience.

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
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

This instructs your IDE to launch the Intlayer MCP server using `npx`, ensuring it always uses the latest available version unless you pin it.

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
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## Set Up in ChatGPT

### Remote server (SSE)

Follow the [official documentation](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) to configure the MCP server in ChatGPT.

1 - Go to the [prompt dashboard](https://platform.openai.com/prompts)  
2 - Click on "+ Create"  
3 - Click on "Tools (Create or +)"  
4 - Select "MCP Server"  
5 - Click on "Add new"  
6 - Fill in the following fields:

- URL: https://mcp.intlayer.org
- Label: Intlayer MCP Server
- Name: intlayer-mcp-server
- Authentication: None

7 - Click on "Save"

---

## Set Up in Claude Desktop

Follow the [official documentation](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) to configure the MCP server in Claude Desktop.

Path of the config file:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Local server (stdio) (recommended)

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
| 5.5.12  | 2025-07-11 | Add set up of ChatGPT                |
| 5.5.12  | 2025-07-10 | Add set up of Claude Desktop         |
| 5.5.12  | 2025-07-10 | Add SSE transport and distant server |
| 5.5.10  | 2025-06-29 | Initialise history                   |
