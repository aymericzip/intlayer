import { Browser } from '@intlayer/design-system/browser';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditedContentPersistence,
  useEditorEnabled,
  useEditorPingClient,
} from '@intlayer/editor-react';
import type { FC, RefObject } from 'react';
import { useIntlayer } from 'react-intlayer';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';

/**
 * Sandbox applied to the framed application. Dropped for same-origin embeds —
 * the playground frames the website's own `/demo` page, where `allow-scripts`
 * together with `allow-same-origin` isolates nothing (the frame can reach
 * `window.parent` and remove the attribute) and browsers warn about it. Only
 * the third-party applications the dashboard embeds gain anything from it.
 */
const getApplicationSandbox = (applicationURL: string): string | null => {
  if (typeof window === 'undefined') return 'allow-scripts allow-same-origin';

  try {
    const isSameOrigin =
      new URL(applicationURL, window.location.origin).origin ===
      window.location.origin;

    return isSameOrigin ? null : 'allow-scripts allow-same-origin';
  } catch {
    return 'allow-scripts allow-same-origin';
  }
};

export const IframeController: FC<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
}> = ({ iframeRef }) => {
  const content = useIntlayer('iframe-controller');

  const { editor } = useConfiguration() ?? {};

  // Driven by the CLIENT_READY → EDITOR_ACTIVATE handshake
  const { enabled } = useEditorEnabled();
  const pingClient = useEditorPingClient();

  useEditedContentPersistence();

  const iframePath = useCrossURLPathState();

  if (!editor?.applicationURL) {
    return (
      <Container className="max-w-xl" padding="xl" roundedSize="2xl">
        <NoApplicationURLView />
      </Container>
    );
  }

  return (
    <div className="contents size-full flex-1">
      <Browser
        path={iframePath}
        initialUrl={editor.applicationURL}
        domainRestriction={editor.applicationURL}
        className="size-full flex-1 overflow-hidden rounded-lg"
        sandbox={getApplicationSandbox(editor.applicationURL)}
        ref={iframeRef}
        onLoad={pingClient}
      />
      {!enabled && (
        <div className="absolute inset-e-4 bottom-4 z-20">
          <Button
            label={content.enableEditor.value}
            onClick={pingClient}
            color="text"
          >
            {content.enableEditor}
          </Button>
        </div>
      )}
    </div>
  );
};
