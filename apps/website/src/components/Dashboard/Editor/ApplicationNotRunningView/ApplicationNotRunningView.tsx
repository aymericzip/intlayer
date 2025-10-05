import { Link } from '@components/Link/Link';
import { Container, H3 } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const ApplicationNotRunningView: FC = () => {
  const { title, description, tips, documentationLink } = useIntlayer(
    'application-not-running-view'
  );

  return (
    <div className="flex flex-1 items-center justify-center">
      <Container className="flex max-w-xl flex-col gap-2 rounded-2xl px-8 pt-2 pb-4 text-sm">
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
          href={`${PagesRoutes.Doc_IntlayerCMS}#configuration`}
          color="text"
          className="ml-auto underline"
        >
          {documentationLink.text}
        </Link>
      </Container>
    </div>
  );
};
