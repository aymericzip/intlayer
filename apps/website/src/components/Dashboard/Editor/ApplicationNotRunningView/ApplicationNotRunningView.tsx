import { PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';
import { Container, H3 } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { type FC } from 'react';

export const ApplicationNotRunningView: FC = () => {
  const { title, description, tips, documentationLink } = useIntlayer(
    'application-not-running-view'
  );

  return (
    <Container className="flex flex-col text-sm gap-2 px-6 pt-2 pb-4 rounded-2xl">
      <H3 className="mb-4 text-lg">{title}</H3>
      <p className="text-neutral block mb-4">{description}</p>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Tips:</h4>
        <ul className="list-disc list-inside space-y-2 pl-3">
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
      >
        {documentationLink.text}
      </Link>
    </Container>
  );
};
