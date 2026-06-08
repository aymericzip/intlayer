import type { PromoCodeAPI } from '@intlayer/backend';
import {
  useDeletePromoCode,
  useGetPromoCodeById,
  useUpdatePromoCode,
} from '@intlayer/design-system/api';
import { Badge } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { CopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { Loader } from '@intlayer/design-system/loader';
import {
  App_Admin_PromoCodes_Path,
  getAppAdminAffiliateRoute,
} from '@intlayer/design-system/routes';
import { Trash2 } from 'lucide-react';
import type { FC } from 'react';
import { Link } from '#components/Link/Link';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

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

export const PromoCodeAdminDetailPage: FC<{ promoCodeId: string }> = ({
  promoCodeId,
}) => {
  const navigate = useLocalizedNavigate();
  const { data, isLoading } = useGetPromoCodeById(promoCodeId);
  const promoCode = (data?.data as PromoCodeAPI | undefined) ?? null;
  const { mutateAsync: updatePromoCode } = useUpdatePromoCode();
  const { mutateAsync: deletePromoCode, isPending: isDeleting } =
    useDeletePromoCode();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!promoCode) {
    return (
      <div className="flex flex-1 items-center justify-center p-10 text-center">
        <p className="text-neutral/60 text-sm">Promo code not found.</p>
      </div>
    );
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this promo code?')) {
      await deletePromoCode({ id: promoCodeId });
      navigate({ to: App_Admin_PromoCodes_Path });
    }
  };

  return (
    <div className="m-auto flex w-full max-w-3xl flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-mono font-semibold text-2xl">{promoCode.code}</h1>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            color={promoCode.active ? 'success' : 'neutral'}
            className="cursor-pointer capitalize"
            onClick={() =>
              updatePromoCode({ id: promoCodeId, active: !promoCode.active })
            }
          >
            {promoCode.active ? 'Active' : 'Inactive'}
          </Badge>
          <Button
            label="Delete promo code"
            color="text"
            variant="outline"
            className="h-auto p-2"
            isLoading={isDeleting}
            onClick={handleDelete}
          >
            <Trash2 className="size-4 text-error" />
          </Button>
        </div>
      </div>

      <Container
        roundedSize="3xl"
        padding="xl"
        border
        borderColor="neutral"
        className="w-full"
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <Field label="ID">
            <CopyToClipboard text={promoCode.id} size={10}>
              <span className="font-mono">...{promoCode.id.slice(-8)}</span>
            </CopyToClipboard>
          </Field>

          <Field label="Code">
            <CopyToClipboard text={promoCode.code} size={10}>
              <span className="font-bold font-mono">{promoCode.code}</span>
            </CopyToClipboard>
          </Field>

          <Field label="Discount">
            <span className="font-semibold">
              {promoCode.discountType === 'percentage'
                ? `${promoCode.discountValue}%`
                : `$${promoCode.discountValue.toFixed(2)}`}
            </span>
          </Field>

          <Field label="Type">
            <span className="capitalize">{promoCode.discountType}</span>
          </Field>

          {promoCode.currency && (
            <Field label="Currency">
              <span className="uppercase">{promoCode.currency}</span>
            </Field>
          )}

          <Field label="Times Redeemed">
            <span>
              {promoCode.timesRedeemed}
              {promoCode.maxRedemptions != null
                ? ` / ${promoCode.maxRedemptions}`
                : ''}
            </span>
          </Field>

          <Field label="Expires At">
            {promoCode.expiresAt
              ? new Date(promoCode.expiresAt).toLocaleDateString()
              : '—'}
          </Field>

          <Field label="Created">
            {promoCode.createdAt
              ? new Date(promoCode.createdAt).toLocaleDateString()
              : '—'}
          </Field>

          <Field label="Updated">
            {promoCode.updatedAt
              ? new Date(promoCode.updatedAt).toLocaleDateString()
              : '—'}
          </Field>
        </div>
      </Container>

      {(promoCode.stripeCouponId || promoCode.stripePromotionCodeId) && (
        <Container
          roundedSize="3xl"
          padding="xl"
          border
          borderColor="neutral"
          className="w-full"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {promoCode.stripeCouponId && (
              <Field label="Stripe Coupon ID">
                <CopyToClipboard text={promoCode.stripeCouponId} size={10}>
                  <span className="font-mono text-xs">
                    {promoCode.stripeCouponId}
                  </span>
                </CopyToClipboard>
              </Field>
            )}
            {promoCode.stripePromotionCodeId && (
              <Field label="Stripe Promotion Code ID">
                <CopyToClipboard
                  text={promoCode.stripePromotionCodeId}
                  size={10}
                >
                  <span className="font-mono text-xs">
                    {promoCode.stripePromotionCodeId}
                  </span>
                </CopyToClipboard>
              </Field>
            )}
          </div>
        </Container>
      )}

      {promoCode.affiliateId && (
        <Container
          roundedSize="3xl"
          padding="xl"
          border
          borderColor="neutral"
          className="w-full"
        >
          <Field label="Linked Affiliate">
            <Link
              to={getAppAdminAffiliateRoute(promoCode.affiliateId as string)}
              label="View affiliate"
              color="text"
              variant="hoverable"
            >
              <span className="font-mono">
                ...{(promoCode.affiliateId as string).slice(-8)}
              </span>
            </Link>
          </Field>
        </Container>
      )}
    </div>
  );
};
