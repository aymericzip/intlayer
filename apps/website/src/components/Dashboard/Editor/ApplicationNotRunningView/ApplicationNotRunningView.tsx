import { Link } from '@components/Link/Link';
import { Container } from '@intlayer/design-system/container';
import { H3 } from '@intlayer/design-system/headers';
import { Website_Doc_IntlayerCMS_Path } from '@intlayer/design-system/routes';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

type ApplicationNotRunningViewProps = {
  applicationUrl: string | undefined;
  editorUrl: string | undefined;
};

export const ApplicationNotRunningView: FC<ApplicationNotRunningViewProps> = ({
  applicationUrl,
  editorUrl,
}) => {
  const {
    title,
    description,
    urlLabel,
    urlLinkLabel,
    tipsTitle,
    tips,
    documentationLink,
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
              href={applicationUrl}
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

        <div className="mb-4">
          <h4 className="mb-2 font-semibold">{tipsTitle}</h4>
          <ul className="list-inside list-disc space-y-2 pl-3">
            {tips.map((tip, index) => (
              <li key={index} className="text-neutral">
                {tip({
                  editorUrl: (
                    <span className="font-bold">
                      {editorUrl ?? process.env.NEXT_PUBLIC_URL}
                    </span>
                  ),
                })}
              </li>
            ))}
          </ul>
        </div>

        <Link
          label={documentationLink.label.value}
          href={`${Website_Doc_IntlayerCMS_Path}#configuration`}
          color="text"
          className="ml-auto underline"
        >
          {documentationLink.text}
        </Link>
      </Container>
    </div>
  );
};
