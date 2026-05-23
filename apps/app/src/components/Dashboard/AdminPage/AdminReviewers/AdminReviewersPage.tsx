'use client';

import type { ReviewerProfileAPI } from '@intlayer/backend';
import { Badge, BadgeColor, BadgeVariant } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import {
  useGetAdminReviewers,
  useValidateReviewerProfile,
} from '@intlayer/design-system/hooks';
import { getAppAdminReviewerRoute } from '@intlayer/design-system/routes';
import { Select } from '@intlayer/design-system/select';
import { CheckCircle, Globe } from 'lucide-react';
import { type FC, useState } from 'react';
import { Link } from '#components/Link/Link';

const STATUS_COLOR: Record<ReviewerProfileAPI['status'], BadgeColor> = {
  pending: BadgeColor.NEUTRAL,
  active: BadgeColor.SUCCESS,
  suspended: BadgeColor.DESTRUCTIVE,
};

export const AdminReviewersPage: FC = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('pending');

  const { data, isFetching, refetch } = useGetAdminReviewers({
    page,
    pageSize: 20,
    status: statusFilter === 'all' ? undefined : statusFilter || undefined,
  });

  const { mutate: validate, isPending: validating } =
    useValidateReviewerProfile();

  const reviewers = data?.data ?? [];
  const total = data?.totalItems ?? 0;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-bold text-2xl">Reviewers</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <Select.Trigger className="w-40">
            <Select.Value placeholder="All statuses" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">All</Select.Item>
            <Select.Item value="pending">Pending</Select.Item>
            <Select.Item value="active">Active</Select.Item>
            <Select.Item value="suspended">Suspended</Select.Item>
          </Select.Content>
        </Select>
      </div>

      <p className="text-neutral text-sm">{total} reviewer(s)</p>

      {isFetching && <p className="text-neutral text-sm">Loading…</p>}

      <div className="flex flex-col gap-3">
        {reviewers.map((t) => (
          <div
            key={t.id}
            className="flex items-start justify-between gap-4 rounded-2xl border border-neutral/20 p-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant={BadgeVariant.OUTLINE}
                  color={STATUS_COLOR[t.status] ?? BadgeColor.NEUTRAL}
                >
                  {t.status}
                </Badge>
                <span className="font-medium text-sm">
                  ${(t.pricePerHour / 100).toFixed(0)}/hr
                </span>
              </div>
              {t.bio && (
                <p className="line-clamp-2 text-neutral text-xs">{t.bio}</p>
              )}
              {t.languagePairs.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {t.languagePairs.map((p) => (
                    <span
                      key={`${p.from}-${p.to}`}
                      className="flex items-center gap-1 rounded-full border border-neutral/20 px-2 py-0.5 text-xs"
                    >
                      <Globe size={9} />
                      {p.from.toUpperCase()} → {p.to.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                to={getAppAdminReviewerRoute(t.id) as any}
                color="text"
                variant="hoverable"
                size="sm"
                label="View profile"
              >
                View
              </Link>
              {t.status === 'pending' && (
                <Button
                  type="button"
                  color="text"
                  size="sm"
                  Icon={CheckCircle}
                  label="Validate reviewer"
                  isLoading={validating}
                  onClick={() => validate(t.id, { onSuccess: () => refetch() })}
                >
                  Validate
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            color="text"
            variant="outline"
            size="sm"
            label="Previous page"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-neutral text-sm">
            {page} / {totalPages}
          </span>
          <Button
            type="button"
            color="text"
            variant="outline"
            size="sm"
            label="Next page"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
