import { Container, Loader } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const CheckingApplicationStatusView: FC = () => {
  const { checkingApplicationStatus } = useIntlayer(
    'checking-application-status-view'
  );
  return (
    <div className="flex flex-1 items-center justify-center">
      <Container className="flex max-w-xl flex-col items-center justify-center gap-4 rounded-2xl p-6">
        <Loader />
        <span className="ml-2">{checkingApplicationStatus}</span>
      </Container>
    </div>
  );
};
