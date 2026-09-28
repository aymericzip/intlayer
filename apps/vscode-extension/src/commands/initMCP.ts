import {
  installMCP,
  type MCPTransport,
  PLATFORMS,
  PLATFORMS_METADATA,
  type Platform,
} from '@intlayer/engine/cli';
import { type QuickPickItem, window } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { formatResult } from '../utils/formatResult';

interface QuickPickItemWithValue<T> extends QuickPickItem {
  value: T;
}

export const PLATFORM_OPTIONS: Array<{
  value: Platform;
  label: string;
  hint: string;
}> = PLATFORMS.map((platform) => ({
  value: platform,
  label: PLATFORMS_METADATA[platform].label,
  hint: `(${PLATFORMS_METADATA[platform].dir})`,
}));

export const initMCP = async () => {
  const root = findProjectRoot();

  if (!root) {
    await window.showErrorMessage('Could not find project root.');
    return;
  }

  const selectedPlatform = await window.showQuickPick<
    QuickPickItemWithValue<Platform>
  >(
    PLATFORM_OPTIONS.map((platform) => ({
      label: platform.label,
      detail: platform.hint,
      value: platform.value,
    })),
    {
      placeHolder: 'Which platform are you using?',
      canPickMany: false,
    }
  );

  if (!selectedPlatform) {
    return;
  }

  const selectedTransport = await window.showQuickPick<
    QuickPickItemWithValue<MCPTransport>
  >(
    [
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
    ],
    {
      placeHolder: 'Which transport method do you want to use?',
      canPickMany: false,
    }
  );

  if (!selectedTransport) {
    return;
  }

  // Call installMCP
  await window.withProgress(
    {
      location: 15, // Notification
      title: 'Configuring Intlayer MCP Server...',
      cancellable: false,
    },
    async () => {
      try {
        const result = await installMCP(
          root,
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
