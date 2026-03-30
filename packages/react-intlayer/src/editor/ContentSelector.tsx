'use client';

import type { NodeProps } from '@intlayer/core/interpreter';
import { isEnabled } from '@intlayer/editor/isEnabled';
import { createElement, type FC, type HTMLAttributes } from 'react';

export type ContentSelectorProps = NodeProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the editor is explicitly disabled at build time.
 */
const TREE_SHAKE_EDITOR = process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

export const ContentSelector: FC<ContentSelectorProps> = ({
  children,
  dictionaryKey,
  keyPath,
}) => {
  if (TREE_SHAKE_EDITOR || !isEnabled) {
    return children;
  }

  return createElement(
    'intlayer-content-selector-wrapper',
    {
      'key-path': JSON.stringify(keyPath),
      'dictionary-key': dictionaryKey,
    },
    children
  );
};
