import { Browser } from '@intlayer/design-system/browser';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { cn } from '@intlayer/design-system/utils';
import {
  useConfiguration,
  useCrossURLPathState,
  useEditorEnabled,
  useGetEditorEnabledState,
  useIframeClickMerger,
  usePostEditorEnabledState,
} from '@intlayer/editor-react';
import { type FC, type RefObject, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';
import { useEditedContentPersistence } from './useEditedContentPersistence';

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

  // Post - Allow to set the editor enabled state on the client side
  const postEditorEnabled = usePostEditorEnabledState();

  // Enable the editor depending of the configuration
  const enableEditor = () => postEditorEnabled(editor?.enabled ?? false);

  // State received from the client
  const { enabled } = useEditorEnabled();

  // Listen if the client ask if the editor is connected and send enable state
  useGetEditorEnabledState(enableEditor);

  useEditedContentPersistence();
  useIframeClickMerger();

  const [iframePath] = useCrossURLPathState(undefined, {
    receive: true,
    emit: false,
  });

  const [loading, setLoading] = useState(false);

  if (!editor?.applicationURL) {
    return (
      <Container className="max-w-xl" padding="xl" roundedSize="2xl">
        <NoApplicationURLView />
      </Container>
    );
  }

  return (
    <div className="contents size-full flex-1">
      <Loader isLoading={loading} />
      <Browser
        path={iframePath}
        initialUrl={editor.applicationURL}
        domainRestriction={editor.applicationURL}
        className={cn(
          'size-full flex-1 overflow-hidden rounded-lg',
          loading && 'hidden'
        )}
        sandbox={getApplicationSandbox(editor.applicationURL)}
        ref={iframeRef}
        onLoad={() => {
          setLoading(false);
          enableEditor();
        }}
      />
      {!enabled && (
        <div className="absolute right-4 bottom-4 z-20">
          <Button
            label={content.enableEditor.value}
            onClick={enableEditor}
            color="text"
          >
            {content.enableEditor}
          </Button>
        </div>
      )}
    </div>
  );
};
