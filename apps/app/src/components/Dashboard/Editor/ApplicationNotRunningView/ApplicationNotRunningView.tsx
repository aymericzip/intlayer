import { Link } from '@components/Link/Link';
import { Container } from '@intlayer/design-system/container';
import { H3 } from '@intlayer/design-system/headers';
import { Website_Doc_IntlayerCMS } from '@intlayer/design-system/routes';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const ApplicationNotRunningView: FC = () => {
  const { title, description, tips, documentationLink } = useIntlayer(
    'application-not-running-view'
  );

  return (
    <div className="flex flex-1 items-center justify-center">
      <Container
        className="flex max-w-xl flex-col gap-2 text-sm"
        padding="xl"
        roundedSize="2xl"
      >
        <H3 className="mb-4 text-lg">{title}</H3>
        <p className="mb-4 block text-neutral">{description}</p>

        <div className="mb-4">
          <h4 className="mb-2 font-semibold">Tips:</h4>
          <ul className="list-inside list-disc space-y-2 pl-3">
            {tips.map((tip, index) => (
              <li key={index} className="text-neutral">
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <Link
          label={documentationLink.label.value}
          href={`${Website_Doc_IntlayerCMS}#configuration`}
          color="text"
          className="ml-auto underline"
        >
          {documentationLink.text}
        </Link>
      </Container>
    </div>
  );
};
