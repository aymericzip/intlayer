import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H3 } from '@intlayer/design-system/headers';
import type { FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';

type ApplicationNotRunningViewProps = {
  applicationURL: string;
  errorMessage?: string;
  onRetry: () => void;
};

/** Replaces the application frame while the application URL is unreachable. */
export const ApplicationNotRunningView: FunctionComponent<
  ApplicationNotRunningViewProps
> = ({ applicationURL, errorMessage, onRetry }) => {
  const { title, description, configurationTip, retry } = useIntlayer(
    'application-not-running-view'
  );

  return (
    <div className="flex size-full items-center justify-center p-4">
      <Container
        className="flex max-w-xl flex-col gap-4 text-sm"
        padding="xl"
        roundedSize="3xl"
        border
        borderColor="neutral"
      >
        <H3 className="text-lg">{title}</H3>
        <p className="text-neutral">
          {description({
            applicationUrl: <strong>{applicationURL}</strong>,
          })}
        </p>
        {errorMessage && (
          <code className="rounded-lg border border-error p-2 text-neutral text-xs">
            {errorMessage}
          </code>
        )}
        <p className="text-neutral">{configurationTip}</p>
        <Button
          label={retry.value}
          onClick={onRetry}
          color="text"
          className="ms-auto"
        >
          {retry}
        </Button>
      </Container>
    </div>
  );
};
