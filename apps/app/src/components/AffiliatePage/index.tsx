'use client';

import {
  useGetAffiliate,
  useGetAffiliateStats,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import type { FC } from 'react';
import { AffiliateOnboarding } from './AffiliateOnboarding';
import { AffiliateStatsPanel } from './AffiliateStats';
import { ReferralLink } from './ReferralLink';

export const AffiliatePage: FC = () => {
  const { data: affiliateData, isLoading: isLoadingAffiliate } =
    useGetAffiliate();
  const affiliate = affiliateData?.data ?? null;

  const { data: statsData, isLoading: isLoadingStats } = useGetAffiliateStats({
    enabled: Boolean(affiliate),
  });
  const stats = statsData?.data ?? null;

  if (isLoadingAffiliate) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!affiliate) {
    return (
      <div className="flex flex-col items-center gap-4 p-10 text-center">
        <p className="font-medium text-lg">Affiliate Program</p>
        <p className="max-w-md text-neutral/60 text-sm">
          You haven't been invited to the affiliate program yet. Contact us to
          apply.
        </p>
      </div>
    );
  }

  const needsOnboarding =
    affiliate.status === 'pending' || affiliate.status === 'onboarding';

  return (
    <div className="flex flex-col gap-8 p-8">
      {needsOnboarding && (
        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-base">Complete your setup</h2>
          <AffiliateOnboarding />
        </section>
      )}

      {!needsOnboarding && isLoadingStats && (
        <div className="flex flex-1 items-center justify-center">
          <Loader />
        </div>
      )}

      {!needsOnboarding && stats && (
        <>
          <section className="flex flex-col gap-4">
            <h2 className="font-semibold text-base">Your referral link</h2>
            <ReferralLink referralLink={stats.referralLink} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-semibold text-base">Performance</h2>
            <AffiliateStatsPanel stats={stats} />
          </section>
        </>
      )}
    </div>
  );
};
