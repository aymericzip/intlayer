import type { AffiliateAPI, PromoCodeAPI } from '@intlayer/backend';
import {
  useGetAffiliateById,
  useGetPromoCodes,
  useGetUserById,
  useUpdateAffiliateStatus,
  useUpdatePromoCode,
} from '@intlayer/design-system/api';
import { Badge, type BadgeColor } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { CopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { Loader } from '@intlayer/design-system/loader';
import { getAppAdminUserRoute } from '@intlayer/design-system/routes';
import { Select } from '@intlayer/design-system/select';
import { Unlink } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

const STATUS_COLOR: Record<AffiliateAPI['status'], BadgeColor> = {
  pending: 'neutral',
  onboarding: 'secondary',
  active: 'success',
  suspended: 'neutral',
};

const UserField: FC<{ userId: string }> = ({ userId }) => {
  const { data } = useGetUserById(userId);
  const user = data?.data;
  if (!user) return null;
  return (
    <Field label="User">
      <Link
        to={getAppAdminUserRoute(userId)}
        label={user.name ?? user.email}
        color="text"
        variant="hoverable"
      >
        {user.name ?? user.email}
      </Link>
    </Field>
  );
};

const Field: FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-neutral/60 text-xs uppercase tracking-wide">
      {label}
    </span>
    <div className="font-medium text-sm">{children}</div>
  </div>
);

export const AffiliateAdminDetailPage: FC<{ affiliateId: string }> = ({
  affiliateId,
}) => {
  const { data, isLoading } = useGetAffiliateById(affiliateId);
  const affiliate = (data?.data as AffiliateAPI | undefined) ?? null;
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateAffiliateStatus();
  const { data: attachedCodesData } = useGetPromoCodes({ affiliateId });
  const attachedCodes = (attachedCodesData?.data ?? []) as PromoCodeAPI[];
  const { data: allCodesData } = useGetPromoCodes({});
  const allCodes = (allCodesData?.data ?? []) as PromoCodeAPI[];
  const unattachedCodes = allCodes.filter((c) => c.active && !c.affiliateId);
  const { mutateAsync: updatePromoCode, isPending: isAttaching } =
    useUpdatePromoCode();
  const [selectKey, setSelectKey] = useState(0);

  const {
    affiliateDetailTitle,
    affiliateNotFound,
    id,
    referralCode,
    status,
    commissionRate,
    commissionType,
    stripeAccount,
    created,
    updated,
    promoCodes: promoCodesLabel,
    addPromoCode,
    noPromoCodesYet,
    detachPromoCode,
    enable,
    suspend,
  } = useIntlayer('affiliate-admin-detail-page');

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!affiliate) {
    return (
      <div className="flex flex-1 items-center justify-center p-10 text-center">
        <p className="text-neutral/60 text-sm">{affiliateNotFound}</p>
      </div>
    );
  }

  const canToggleStatus =
    affiliate.status === 'active' ||
    affiliate.status === 'onboarding' ||
    affiliate.status === 'suspended';

  return (
    <div className="m-auto flex w-full max-w-3xl flex-col gap-6 p-8">
      <h1 className="font-semibold text-2xl">{affiliateDetailTitle}</h1>

      <Container
        roundedSize="3xl"
        padding="xl"
        border
        borderColor="neutral"
        className="w-full"
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <Field label={id.value}>
            <CopyToClipboard text={affiliate.id} size={10}>
              <span className="font-mono">...{affiliate.id.slice(-8)}</span>
            </CopyToClipboard>
          </Field>

          {affiliate.userId && (
            <UserField userId={affiliate.userId as string} />
          )}

          <Field label={referralCode.value}>
            <CopyToClipboard text={affiliate.referralCode} size={10}>
              <span className="font-mono">{affiliate.referralCode}</span>
            </CopyToClipboard>
          </Field>

          <Field label={status.value}>
            <Badge
              variant="outline"
              className="capitalize"
              color={STATUS_COLOR[affiliate.status]}
            >
              {affiliate.status}
            </Badge>
          </Field>

          <Field label={commissionRate.value}>
            {affiliate.commissionRate}%
          </Field>

          <Field label={commissionType.value}>
            <span className="capitalize">
              {affiliate.commissionType.replace('_', ' ')}
            </span>
          </Field>

          {affiliate.stripeAccountId && (
            <Field label={stripeAccount.value}>
              <CopyToClipboard text={affiliate.stripeAccountId} size={10}>
                <span className="font-mono text-xs">
                  {affiliate.stripeAccountId}
                </span>
              </CopyToClipboard>
            </Field>
          )}

          <Field label={created.value}>
            {affiliate.createdAt
              ? new Date(affiliate.createdAt).toLocaleDateString()
              : '—'}
          </Field>

          <Field label={updated.value}>
            {affiliate.updatedAt
              ? new Date(affiliate.updatedAt).toLocaleDateString()
              : '—'}
          </Field>
        </div>
      </Container>

      <Container
        roundedSize="3xl"
        padding="xl"
        border
        borderColor="neutral"
        className="w-full"
      >
        <div className="flex flex-col gap-6">
          {canToggleStatus && (
            <div className="flex justify-end">
              {affiliate.status === 'suspended' ? (
                <Button
                  label={enable.value}
                  color="text"
                  isLoading={isUpdatingStatus}
                  onClick={() =>
                    updateStatus({ id: affiliateId, status: 'active' })
                  }
                >
                  {enable}
                </Button>
              ) : (
                <Button
                  label={suspend.value}
                  color="text"
                  variant="outline"
                  isLoading={isUpdatingStatus}
                  onClick={() =>
                    updateStatus({ id: affiliateId, status: 'suspended' })
                  }
                >
                  {suspend}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>

      <Container
        roundedSize="3xl"
        padding="xl"
        border
        borderColor="neutral"
        className="w-full"
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">{promoCodesLabel}</h2>

          <Select
            key={selectKey}
            disabled={isAttaching}
            onValueChange={async (promoId) => {
              await updatePromoCode({ id: promoId, affiliateId });
              setSelectKey((k) => k + 1);
            }}
          >
            <Select.Trigger>
              <Select.Value placeholder={addPromoCode.value} />
            </Select.Trigger>
            <Select.Content>
              {unattachedCodes.length === 0 ? (
                <Select.Item value="_none" disabled>
                  {noPromoCodesYet}
                </Select.Item>
              ) : (
                unattachedCodes.map((promo) => (
                  <Select.Item key={promo.id} value={promo.id}>
                    <span className="font-medium font-mono">{promo.code}</span>
                    <span className="ml-2 text-neutral/60 text-xs">
                      {promo.discountType === 'percentage'
                        ? `${promo.discountValue}%`
                        : `$${promo.discountValue}`}
                      {promo.expiresAt &&
                        ` · exp ${new Date(promo.expiresAt).toLocaleDateString()}`}
                    </span>
                  </Select.Item>
                ))
              )}
            </Select.Content>
          </Select>

          {attachedCodes.length === 0 ? (
            <p className="text-neutral/60 text-sm">{noPromoCodesYet}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {attachedCodes.map((promo) => (
                <div
                  key={promo.id}
                  className="flex items-center justify-between rounded-xl border border-neutral/20 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <CopyToClipboard text={promo.code} size={10}>
                      <span className="font-medium font-mono text-sm">
                        {promo.code}
                      </span>
                    </CopyToClipboard>
                    <Badge
                      variant="outline"
                      color={promo.active ? 'success' : 'neutral'}
                      className="text-xs"
                    >
                      {promo.discountType === 'percentage'
                        ? `${promo.discountValue}%`
                        : `$${promo.discountValue}`}
                    </Badge>
                    {promo.expiresAt && (
                      <span className="text-neutral/60 text-xs">
                        exp {new Date(promo.expiresAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <Button
                    label={detachPromoCode.value}
                    color="text"
                    variant="outline"
                    className="h-auto p-2"
                    onClick={() =>
                      updatePromoCode({ id: promo.id, affiliateId: null })
                    }
                  >
                    <Unlink className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
