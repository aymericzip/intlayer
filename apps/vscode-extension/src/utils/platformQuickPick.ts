import {
  PLATFORMS,
  PLATFORMS_METADATA,
  type Platform,
} from '@intlayer/engine/cli';
import type { QuickPickItem } from 'vscode';

/** Quick pick item carrying the value it stands for. */
export type QuickPickItemWithValue<Value> = QuickPickItem & { value: Value };

/** One quick pick item per AI platform (`Cursor`, `VSCode`, …). */
export const getPlatformQuickPickItems =
  (): QuickPickItemWithValue<Platform>[] =>
    PLATFORMS.map((platform) => ({
      label: PLATFORMS_METADATA[platform].label,
      detail: `(${PLATFORMS_METADATA[platform].dir})`,
      value: platform,
      picked: platform === 'VSCode',
    }));
