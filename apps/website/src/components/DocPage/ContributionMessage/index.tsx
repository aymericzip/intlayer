import { Link } from '@components/Link/Link';
import { Container } from '@intlayer/design-system';
import { Edit } from 'lucide-react';
import { useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';

export const ContributionMessage: FC<{ githubUrl: string }> = ({
  githubUrl,
}) => {
  const { contribution } = useIntlayer('contribution-message');

  return (
    <Container
      roundedSize="md"
      transparency="full"
      border={true}
      padding="lg"
      borderColor="neutral"
      className="text-neutral mx-10 flex flex-row gap-6 text-xs"
    >
      <Edit className="ml-3 mt-1 size-5" size={24} />
      <div className="flex flex-1 flex-col gap-2">
        <p>{contribution.text}</p>
        <Link
          href={githubUrl}
          label={contribution.buttonLabel.value}
          target="_blank"
          rel="noreferrer"
          color="text"
        >
          {contribution.button}
        </Link>
      </div>
    </Container>
  );
};
