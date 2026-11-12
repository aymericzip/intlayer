import { MessageKey, useFocusUnmergedDictionary } from '@intlayer/editor-react';
import type { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

/** Hosts allowed to receive the editor state: IDE webviews (VS Code & forks). */
const TRUSTED_HOST_PROTOCOLS = ['vscode-webview:'];

/**
 * Origin of the frame embedding the editor, when it is a trusted IDE host.
 * `ancestorOrigins` is read rather than `document.referrer`, which the
 * embedding webview may strip.
 */
export const getTrustedHostOrigin = (): string | null => {
  if (typeof window === 'undefined' || window.parent === window) return null;

  const hostOrigin = window.location.ancestorOrigins?.[0];

  if (!hostOrigin) return null;

  const isTrusted = TRUSTED_HOST_PROTOCOLS.some((protocol) =>
    hostOrigin.startsWith(protocol)
  );

  return isTrusted ? hostOrigin : null;
};

/**
 * Relays the focused content to the IDE embedding the editor (e.g. the VS Code
 * extension panel), so it can open the declaring content file at the field.
 */
export const HostFrameBridge: FunctionComponent = () => {
  const { focusedContent } = useFocusUnmergedDictionary();

  useEffect(() => {
    const hostOrigin = getTrustedHostOrigin();

    if (!hostOrigin) return;

    window.parent.postMessage(
      {
        type: MessageKey.INTLAYER_FOCUSED_CONTENT_CHANGED,
        data: focusedContent,
      },
      hostOrigin
    );
  }, [focusedContent]);

  return null;
};
