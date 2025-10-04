import { Container, Loader } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const CheckingApplicationStatusView: FC = () => {
  const { checkingApplicationStatus } = useIntlayer(
    'checking-application-status-view'
  );
  return (
    <div className="flex flex-1 justify-center items-center">
      <Container className="flex max-w-xl rounded-2xl flex-col gap-4 p-6 justify-center items-center">
        <Loader />
        <span className="ml-2">{checkingApplicationStatus}</span>
      </Container>
    </div>
  );
};
