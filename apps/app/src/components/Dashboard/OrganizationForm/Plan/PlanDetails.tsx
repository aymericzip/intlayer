import type { PlanAPI } from '@intlayer/backend';
import { useCancelSubscription, useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Form, FormButton } from '@intlayer/design-system/form';
import { H3 } from '@intlayer/design-system/headers';
import { Modal } from '@intlayer/design-system/modal';
import { App_Pricing_Path } from '@intlayer/design-system/routes';
import { Tag } from '@intlayer/design-system/tag';
import { ChevronsUp, CircleX, CreditCard, RotateCcw } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { BillingModal } from './BillingModal';

type PlanDetailsProps = {};

const getIsFreePlan = (plan?: PlanAPI) => plan?.type === 'FREE';

const getStatusTagColor = (plan?: PlanAPI) => {
  switch (plan?.status) {
    case 'active':
      return 'success';

    default:
      return 'error';
  }
};

const getTypeTagColor = (plan?: PlanAPI) => {
  switch (plan?.type) {
    case 'PREMIUM':
      return 'success';
    case 'ENTERPRISE':
      return 'success';
    case 'FREE':
      return 'warning';
    default:
      return 'warning';
  }
};

export const PlanDetails: FC<PlanDetailsProps> = () => {
  const { session } = useSession();
  const isOrganizationAdmin = session?.roles?.includes('org_admin');
  const {
    title,
    upgradeButton,
    renewButton,
    cancelButton,
    cancelModal,
    billingButton,
  } = useIntlayer('organization-plan');
  const { mutate: cancelSubscription, isPending: isDeleting } =
    useCancelSubscription();
  const plan = session?.organization?.plan;
  const navigate = useLocalizedNavigate();
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);

  const handleCancelSubscription = () => {
    cancelSubscription(undefined, {
      onSuccess: () => {
        setIsCancellationModalOpen(false);
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={isCancellationModalOpen}
        onClose={() => setIsCancellationModalOpen(false)}
        size="lg"
        transparency="xs"
        padding="lg"
        title={cancelModal.title.value}
        hasCloseButton
      >
        <p className="text-neutral text-sm">{cancelModal.message}</p>
        <FormButton
          variant="outline"
          label={cancelModal.buttonLabel.value}
          color="error"
          isFullWidth={true}
          className="mt-10 w-auto"
          isLoading={isDeleting}
          onClick={() => handleCancelSubscription()}
        >
          {cancelModal.confirmText}
        </FormButton>
      </Modal>
      <div className="relative flex flex-col gap-2">
        <div className="mb-5 flex items-center gap-2">
          <CreditCard className="size-4" />
          <H3 className="mb-0">{title}</H3>
        </div>

        <div className="absolute top-0 right-0 flex flex-row gap-2">
          <Tag color={getTypeTagColor(plan)} size="xs" border="none">
            {plan?.type ?? 'FREE'}
          </Tag>
          {plan?.period && (
            <Tag color="text" size="xs" border="none">
              {plan?.period.toUpperCase()}
            </Tag>
          )}
          {plan?.status && (
            <Tag color={getStatusTagColor(plan)} size="xs" border="none">
              {plan?.status.toUpperCase()}
            </Tag>
          )}
        </div>
        {(!plan ||
          (plan?.type !== 'ENTERPRISE' && plan?.status === 'active')) && (
          <Button
            label={upgradeButton.label.value}
            color="text"
            Icon={ChevronsUp}
            onClick={() => navigate({ to: App_Pricing_Path })}
            disabled={!isOrganizationAdmin}
          >
            {upgradeButton.text}
          </Button>
        )}
        {plan && plan?.status !== 'active' && (
          <Button
            label={renewButton.label.value}
            color="text"
            Icon={RotateCcw}
            onClick={() => navigate({ to: App_Pricing_Path })}
            disabled={!isOrganizationAdmin}
          >
            {renewButton.text}
          </Button>
        )}
        {plan?.customerId && (
          <Button
            label={billingButton.label.value}
            color="text"
            variant="outline"
            Icon={CreditCard}
            onClick={() => setIsBillingModalOpen(true)}
            disabled={!isOrganizationAdmin}
          >
            {billingButton.text}
          </Button>
        )}
        {!getIsFreePlan(plan) && plan?.status === 'active' && (
          <Button
            label={cancelButton.label.value}
            color="error"
            variant="outline"
            Icon={CircleX}
            onClick={() => setIsCancellationModalOpen(true)}
            disabled={!isOrganizationAdmin}
          >
            {cancelButton.text}
          </Button>
        )}
      </div>
      {plan?.customerId && (
        <BillingModal
          isOpen={isBillingModalOpen}
          onClose={() => setIsBillingModalOpen(false)}
        />
      )}
    </>
  );
};
