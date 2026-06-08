import {
  useAcceptAffiliateInvitation,
  useGetAffiliate,
  useGetAffiliateInvitation,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useDate } from 'react-intlayer/format';
import { AffiliateOnboarding } from '#components/AffiliatePage/AffiliateOnboarding';
import { CountrySelector } from './CountrySelector';

type StripeAccountType = 'express' | 'standard';

type AffiliateInvitationPageProps = {
  token: string;
  stripeReturn?: boolean;
};

const AffiliationContent: FC<AffiliateInvitationPageProps> = ({
  token,
  stripeReturn,
}) => {
  const content = useIntlayer('affiliate-invitation-page');

  const [accepted, setAccepted] = useState(false);
  const [country, setCountry] = useState('');
  const [stripeAccountType, setStripeAccountType] =
    useState<StripeAccountType>('express');

  const formatDate = useDate();
  const { data, isLoading } = useGetAffiliateInvitation(token);
  const invitation = data?.data ?? null;

  const {
    data: affiliateData,
    refetch: refetchAffiliate,
    isRefetching,
  } = useGetAffiliate({
    enabled: !!(invitation?.status === 'accepted' || accepted),
  });
  const affiliate = affiliateData?.data ?? null;

  const {
    mutateAsync: acceptInvitation,
    isPending,
    error,
  } = useAcceptAffiliateInvitation();

  const handleAccept = async () => {
    await acceptInvitation({
      token,
      stripeAccountType,
      country:
        stripeAccountType === 'express' ? country || undefined : undefined,
    });
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
    if (affiliate?.status === 'active') {
      return (
        <Container roundedSize="2xl" padding="xl" border borderColor="neutral">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-2xl">
                {content.accountActiveTitle}
              </h1>
              <p className="text-neutral/60 text-sm">
                {content.accountActiveDescription}
              </p>
            </div>
          </div>
        </Container>
      );
    }

    if (stripeReturn || affiliate?.stripeOnboardingInitiated) {
      const referralLink =
        affiliate?.referralCode &&
        (typeof window !== 'undefined'
          ? `${window.location.origin}/pricing?ref=${affiliate.referralCode}`
          : `/pricing?ref=${affiliate.referralCode}`);

      return (
        <AffiliateInvitationPending
          content={content}
          referralLink={referralLink || undefined}
          onRefresh={refetchAffiliate}
          isRefreshing={isRefetching}
        />
      );
    }

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
          <span className="font-medium text-sm">
            {content.stripeAccountType}
          </span>
          <SwitchSelector<StripeAccountType>
            choices={[
              {
                content: content.newAccountOption,
                value: 'express',
              },
              {
                content: content.existingAccountOption,
                value: 'standard',
              },
            ]}
            size="sm"
            color="text"
            value={stripeAccountType}
            onChange={setStripeAccountType}
            className="w-full"
          />
          {stripeAccountType === 'standard' && (
            <p className="text-neutral/60 text-xs">
              {content.existingAccountHint}
            </p>
          )}
        </div>

        {stripeAccountType === 'express' && (
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
        )}

        {error && (
          <p className="text-error text-sm">
            {content.failedToAcceptInvitationPlease}
          </p>
        )}

        <Button
          label={content.acceptInvitationLabel.value}
          onClick={handleAccept}
          isLoading={isPending}
          disabled={stripeAccountType === 'express' && !country}
          className="w-full"
        >
          {isPending ? content.accepting : content.acceptInvitation}
        </Button>
      </div>
    </Container>
  );
};

type AffiliateInvitationPendingProps = {
  content: ReturnType<typeof useIntlayer<'affiliate-invitation-page'>>;
  referralLink?: string;
  onRefresh: () => void;
  isRefreshing: boolean;
};

const AffiliateInvitationPending: FC<AffiliateInvitationPendingProps> = ({
  content,
  referralLink,
  onRefresh,
  isRefreshing,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [referralLink]);

  return (
    <Container roundedSize="2xl" padding="xl" border borderColor="neutral">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl">
            {content.stripeReturnPendingTitle}
          </h1>
          <p className="text-neutral/60 text-sm">
            {content.stripeReturnPendingDescription}
          </p>
        </div>

        {referralLink && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-sm">
                {content.yourReferralLink}
              </span>
              <p className="text-neutral/60 text-xs">
                {content.referralLinkDescription}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate rounded-lg bg-text/5 px-3 py-2 text-xs">
                {referralLink}
              </code>
              <Button
                label={content.copyLink.value}
                onClick={handleCopy}
                color="text"
                size="sm"
                className="shrink-0"
              >
                {copied ? content.linkCopied : content.copyLink}
              </Button>
            </div>
          </div>
        )}

        <Button
          label={content.refreshStatus.value}
          onClick={onRefresh}
          isLoading={isRefreshing}
          color="text"
          className="self-start"
        >
          {content.refreshStatus}
        </Button>
      </div>
    </Container>
  );
};

export const AffiliateInvitationPage: FC<AffiliateInvitationPageProps> = ({
  token,
  stripeReturn,
}) => (
  <div className="flex flex-1 items-center justify-center">
    <AffiliationContent token={token} stripeReturn={stripeReturn} />
  </div>
);
