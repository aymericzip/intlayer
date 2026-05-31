import { Link } from '~/components/Link/Link';
import { Container } from '@intlayer/design-system/container';
import { H3 } from '@intlayer/design-system/headers';
import { Website_Doc_IntlayerCMS_Path } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

export type ApplicationNotRunningError =
  | { type: 'fetch'; status: number; statusText: string }
  | { type: 'connect'; message: string };

type ApplicationNotRunningViewProps = {
  applicationUrl: string | undefined;
  editorUrl: string | undefined;
  errors?: ApplicationNotRunningError[];
};

export const ApplicationNotRunningView: FC<ApplicationNotRunningViewProps> = ({
  applicationUrl,
  editorUrl,
  errors,
}) => {
  const {
    title,
    description,
    urlLabel,
    urlLinkLabel,
    tipsTitle,
    tips,
    documentationLink,
    connectionError,
    fetchError,
  } = useIntlayer('application-not-running-view');

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Container
        className="flex max-w-xl flex-col gap-2 text-sm"
        padding="xl"
        roundedSize="2xl"
        border
        borderColor="neutral"
      >
        <H3 className="mb-4 text-lg">{title}</H3>
        <span className="font-semibold text-xs">
          {urlLabel}
          {applicationUrl ? (
            <Link
              to={applicationUrl}
              className="ml-4 font-bold"
              label={urlLinkLabel.value}
              color="neutral"
            >
              {applicationUrl}
            </Link>
          ) : (
            <span className="ml-4 font-bold">-</span>
          )}
        </span>
        <p className="mb-4 block text-neutral">{description}</p>

        {(errors?.length ?? 0) > 0 && (
          <Container
            border
            borderColor="error"
            padding="md"
            background="none"
            className="mb-6 flex flex-col gap-1 pb-3 font-mono text-neutral text-xs"
          >
            {errors.map((error, index) => {
              if (error.type === 'connect') {
                return (
                  <p key={index}>
                    {connectionError({
                      applicationUrl: applicationUrl ?? '',
                      error: error.message,
                    })}
                  </p>
                );
              }
              if (error.type === 'fetch') {
                return (
                  <p key={index}>
                    {fetchError({
                      status: String(error.status),
                      statusText: error.statusText,
                    })}
                  </p>
                );
              }
              return null;
            })}
          </Container>
        )}

        <div className="mb-4">
          <h4 className="mb-2 font-semibold">{tipsTitle}</h4>
          <ul className="list-inside list-disc space-y-2 pl-3">
            {tips.map((tip, index) => (
              <li key={index} className="text-neutral">
                {tip({
                  editorUrl: (
                    <span className="font-bold">
                      {editorUrl ?? import.meta.env.VITE_URL}
                    </span>
                  ),
                  applicationUrl: (
                    <span className="font-bold">
                      {applicationUrl ?? 'http://localhost:3000'}
                    </span>
                  ),
                })}
              </li>
            ))}
          </ul>
        </div>

        <Link
          label={documentationLink.label.value}
          to={`${Website_Doc_IntlayerCMS_Path}#configuration`}
          color="text"
          className="ml-auto underline"
        >
          {documentationLink.text}
        </Link>
      </Container>
    </div>
  );
};
