import type { AffiliateStats } from '@intlayer/backend';
import type { FC } from 'react';

type AffiliateStatsProps = {
  stats: AffiliateStats;
};

const formatCents = (cents: number, currency = 'EUR'): string =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100);

export const AffiliateStatsPanel: FC<AffiliateStatsProps> = ({ stats }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    <StatCard label="Total referrals" value={stats.totalReferrals} />
    <StatCard label="Converted" value={stats.convertedReferrals} />
    <StatCard label="Pending" value={stats.pendingReferrals} />
    <StatCard
      label="Commission earned"
      value={formatCents(stats.totalCommissionEarned)}
    />
  </div>
);

const StatCard: FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="rounded-xl border border-neutral/20 bg-card p-4">
    <p className="text-neutral/60 text-xs">{label}</p>
    <p className="mt-1 font-semibold text-2xl">{value}</p>
  </div>
);
