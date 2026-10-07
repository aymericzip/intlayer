'use client';

import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Button } from '../Button';
import { Container } from '../Container';
import { H3 } from '../Headers';

export type FrameConnectionErrorProps = {
  /** URL the frame tried to display. */
  applicationURL: string;
  /** Reloads the frame. */
  onRetry: () => void;
  /** Hides the message to show whatever the frame displays. */
  onDismiss: () => void;
};

/**
 * Overlay shown over an application frame whose client never connected to the
 * editor: blocked by the application's framing policy, or no editor client.
 */
/**
 * Origins the application must allow in `frame-ancestors`: the editor and
 * every frame embedding it (e.g. an IDE webview).
 */
const getFrameAncestorOrigins = (): string[] => [
  ...new Set([
    window.location.origin,
    ...Array.from(window.location.ancestorOrigins ?? []),
  ]),
];

export const FrameConnectionError: FC<FrameConnectionErrorProps> = ({
  applicationURL,
  onRetry,
  onDismiss,
}) => {
  const {
    title,
    description,
    framingCause,
    editorEnabledCause,
    providerCause,
    retry,
    dismiss,
  } = useIntlayer('frame-connection-error');

  return (
    // `m-auto` centers without clipping the top once the content overflows
    <div className="absolute inset-0 z-10 flex overflow-auto bg-background/90 p-2 sm:p-4">
      <Container
        className="m-auto flex w-full min-w-0 max-w-xl flex-col gap-3 px-4 py-4 text-sm sm:gap-4 sm:px-8 sm:py-6"
        roundedSize="3xl"
        border
        borderColor="neutral"
        role="alert"
      >
        <H3 className="text-base sm:text-lg">{title}</H3>
        <p className="wrap-anywhere text-neutral">
          {description({
            applicationUrl: <strong>{applicationURL}</strong>,
          })}
        </p>
        <ul className="wrap-anywhere list-outside list-disc space-y-2 ps-5 text-neutral">
          <li>
            {framingCause({
              editorOrigin: (
                <strong>{getFrameAncestorOrigins().join(', ')}</strong>
              ),
            })}
          </li>
          <li>{editorEnabledCause}</li>
          <li>{providerCause}</li>
        </ul>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            label={dismiss.value}
            onClick={onDismiss}
            variant="outline"
            color="text"
          >
            {dismiss}
          </Button>
          <Button label={retry.value} onClick={onRetry} color="text">
            {retry}
          </Button>
        </div>
      </Container>
    </div>
  );
};
