import { installMCP, type MCPTransport } from '@intlayer/engine/cli';
import { ProgressLocation, window } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { formatResult } from '../utils/formatResult';
import {
  getPlatformQuickPickItems,
  type QuickPickItemWithValue,
} from '../utils/platformQuickPick';

const TRANSPORT_QUICK_PICK_ITEMS: QuickPickItemWithValue<MCPTransport>[] = [
  {
    value: 'stdio',
    label: 'Local server (stdio)',
    detail:
      'Recommended. Integrates all features including CLI tools. Directly uses npx.',
  },
  {
    value: 'sse',
    label: 'Remote server (SSE)',
    detail: 'Hosted by Intlayer. Focuses on documentation only.',
  },
];

export const initMCP = async () => {
  const projectDir = findProjectRoot();

  if (!projectDir) {
    await window.showErrorMessage('Could not find project root.');
    return;
  }

  const selectedPlatform = await window.showQuickPick(
    getPlatformQuickPickItems(),
    { placeHolder: 'Which platform are you using?' }
  );

  if (!selectedPlatform) return;

  const selectedTransport = await window.showQuickPick(
    TRANSPORT_QUICK_PICK_ITEMS,
    { placeHolder: 'Which transport method do you want to use?' }
  );

  if (!selectedTransport) return;

  await window.withProgress(
    {
      location: ProgressLocation.Notification,
      title: 'Configuring Intlayer MCP Server...',
    },
    async () => {
      try {
        const result = await installMCP(
          projectDir,
          selectedPlatform.value,
          selectedTransport.value
        );

        await window.showInformationMessage(
          `MCP Server configured successfully: ${formatResult(result)}`
        );
      } catch (error) {
        await window.showErrorMessage(
          `Failed to configure MCP Server: ${String(error)}`
        );
      }
    }
  );
};
