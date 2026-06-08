import { createMCPClient, type MCPClient } from '@ai-sdk/mcp';

const main = async () => {
  const mcpServerURL = process.env.MCP_SERVER_URL ?? 'http://localhost:3000/';

  console.info(`Connecting to server - ${mcpServerURL}`);

  let mcpClient: MCPClient | undefined;
  try {
    mcpClient = await createMCPClient({
      transport: {
        type: 'http',
        url: mcpServerURL,
      },
    });
    console.info('Connected to MCP server');

    await new Promise<void>((resolve) => {
      process.once('SIGINT', resolve);
      process.once('SIGTERM', resolve);
    });
  } catch (error) {
    console.error('Failed to connect to MCP server: ', error);
    throw error;
  } finally {
    await mcpClient?.close();
    console.info('Connection closed.');
  }
};

main();
