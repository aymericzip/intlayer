import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import {
  useAcceptAffiliateInvitation,
  useGetAffiliateInvitation,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useDate } from 'react-intlayer/format';
import { AffiliateOnboarding } from '#components/AffiliatePage/AffiliateOnboarding';
import { CountrySelector } from './CountrySelector';

type AffiliateInvitationPageProps = {
  token: string;
};

const AffiliationContent: FC<AffiliateInvitationPageProps> = ({ token }) => {
  const content = useIntlayer('affiliate-invitation-page');

  const [accepted, setAccepted] = useState(false);
  const [country, setCountry] = useState('');

  const formatDate = useDate();
  const { data, isLoading } = useGetAffiliateInvitation(token);
  const invitation = data?.data ?? null;

  const {
    mutateAsync: acceptInvitation,
    isPending,
    error,
  } = useAcceptAffiliateInvitation();

  const handleAccept = async () => {
    await acceptInvitation({ token, country: country || undefined });
    setAccepted(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!invitation) {
    return (
      <Container roundedSize="2xl" padding="xl" border borderColor="neutral">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
          <p className="font-medium text-lg">{content.invitationNotFound}</p>
          <p className="max-w-md text-neutral/60 text-sm">
            {content.thisInvitationLinkIsInvalid}
          </p>
        </div>
      </Container>
    );
  }

  if (invitation.status === 'accepted' || accepted) {
    return (
      <Container roundedSize="2xl" padding="xl" border borderColor="neutral">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">
              {content.welcomeToTheAffiliateProgram}
            </h1>
            <p className="text-neutral/60 text-sm">
              {content.completeTheSetupBelowTo}
            </p>
          </div>
          <AffiliateOnboarding />
        </div>
      </Container>
    );
  }

  if (invitation.status === 'expired') {
    return (
      <Container roundedSize="2xl" padding="xl" border borderColor="neutral">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
          <p className="font-medium text-lg">{content.invitationExpired}</p>
          <p className="max-w-md text-neutral/60 text-sm">
            {content.thisInvitationLinkHasExpired}
          </p>
        </div>
      </Container>
    );
  }

  const expiresAt = new Date(invitation.expiresAt);
  const commissionLabel = `${invitation.commissionRate}% ${invitation.commissionType === 'recurring' ? '(recurring)' : '(one-time)'}`;

  return (
    <Container roundedSize="2xl" padding="xl" border borderColor="neutral">
      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl">
            {content.affiliateProgramInvitation}
          </h1>
          <p className="text-neutral/60 text-sm">
            {content.youveBeenInvitedToJoin}
          </p>
        </div>

        <Container
          background="none"
          border
          borderColor="neutral"
          roundedSize="xl"
          padding="md"
          className="flex flex-col gap-4 rounded-xl"
        >
          <div className="flex justify-between text-sm">
            <span className="text-text/40">{content.commission}</span>
            <span className="font-medium">{commissionLabel}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text/40">{content.invitationExpires}</span>
            <span className="font-medium">
              {formatDate(expiresAt, 'short')}
            </span>
          </div>
        </Container>

        <div className="flex flex-col gap-2">
          <label
            className="font-medium text-sm"
            htmlFor="dropdown-trigger-country-selector"
          >
            {content.country}
          </label>
          <CountrySelector
            value={country}
            onChange={setCountry}
            placeholder={content.selectYourCountry.value}
          />
        </div>

        {error && (
          <p className="text-error text-sm">
            {content.failedToAcceptInvitationPlease}
          </p>
        )}

        <Button
          label={content.acceptInvitationLabel.value}
          onClick={handleAccept}
          isLoading={isPending}
          disabled={!country}
          className="w-full"
        >
          {isPending ? content.accepting : content.acceptInvitation}
        </Button>
      </div>
    </Container>
  );
};

export const AffiliateInvitationPage: FC<AffiliateInvitationPageProps> = ({
  token,
}) => (
  <div className="flex flex-1 items-center justify-center">
    <AffiliationContent token={token} />
  </div>
);
