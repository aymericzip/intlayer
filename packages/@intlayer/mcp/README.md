<div align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/572ae9c9acafb74307b81530c1931a8e98990aef/docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/intlayer" target="blank"><img
    align="center"
    alt="npm"
    src="https://img.shields.io/npm/v/intlayer.svg?labelColor=49516F&color=8994BC&style=for-the-badge"
    height="30" /></a>
  <a href="https://npmjs.org/package/intlayer" target="blank"><img
      align="center"
      src="https://img.shields.io/npm/dm/intlayer?labelColor=49516F&color=8994BC&style=for-the-badge"
      alt="monthly downloads"
      height="30"
    /></a>
  <a href="https://npmjs.org/package/intlayer" target="blank"><img
      align="center"
      src="https://img.shields.io/npm/types/intlayer?label=types%20included&labelColor=49516F&color=8994BC&style=for-the-badge"
      alt="types included"
      height="30"
    /></a>
</div>

<div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

# @intlayer/mcp: Intlayer MCP Server (Model Context Protocol)

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

  > View the full list of commands and options in the [Intlayer CLI documentation](https://intlayer.org/doc/concept/cli).

## Local server (stdio) vs Remote server (SSE)

The MCP server can be used in two ways:

- Local server (stdio)
- Remote server (SSE)

### Local server (stdio) (recommended)

Intlayer provides a NPM package that can be installed locally on your machine. It can be installed in your favorite IDE, as VS Code, Cursor, as well as your locale assistant application, as ChatGPT, Claude Desktop, etc.

This server is the recommended way to use the MCP server. As it integrates all the features of the MCP server, including the CLI tools.

### Remote server (SSE)

The MCP server can also be used remotely, using the SSE transport method. This server is hosted by Intlayer, and is available at https://mcp.intlayer.org. This server can be accessed publicly, without any authentication, and is free to use.

Note that the remote server does not integrate CLI tools, AI autocompletion, etc. The distant server is only for interaction with the documentation to help your AI assistant with the Intlayer ecosystem.

> Due to server hosting costs, the availability of the remote server cannot be guaranteed. We limit the number of simultaneous connections. We recommend using the local server (stdio) transport method for the most reliable experience.

---

## Setup in Cursor

Follow the [official documentation](https://docs.cursor.com/context/mcp) to configure the MCP server in Cursor.

In your project root, add the following `.cursor/mcp.json` configuration file:

### Local server (stdio) (recommended)

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

### Remote server (SSE)

For connecting to a remote Intlayer MCP server using Server-Sent Events (SSE), you can configure your MCP client to connect to the hosted service.

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

This tells your IDE to launch the Intlayer MCP server using `npx`, ensuring it always uses the latest available version unless you pin it.

---

## Setup in VS Code

Follow the [official documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) to configure the MCP server in VS Code.

To use the Intlayer MCP Server with VS Code, you need to configure it in your workspace or user settings.

### Local server (stdio) (recommended)

Create a `.vscode/mcp.json` file in your project root:

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

### Remote server (SSE)

For connecting to a remote Intlayer MCP server using Server-Sent Events (SSE), you can configure your MCP client to connect to the hosted service.

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

## Set Up in ChatGPT

### Remote server (SSE)

Follow the [official documentation](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) to configure the MCP server in ChatGPT.

1 - Go to the [promt dashboard](https://platform.openai.com/prompts)
2 - Click on "+ Create"
3 - Click on "Tools (Create or +)"
4 - Select "MCP Server"
5 - Click on "Add new"
6 - Fill the following fields:

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

## Using the MCP Server via CLI

You can also run the Intlayer MCP server directly from the command line for testing, debugging, or integration with other tools.

```bash
# Install globally
npm install -g @intlayer/mcp

# Or use directly with npx (recommended)
npx @intlayer/mcp
```
