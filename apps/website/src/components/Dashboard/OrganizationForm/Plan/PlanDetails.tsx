import { PagesRoutes } from '@/Routes';
import type { Plan } from '@intlayer/backend';
import { Button, Form, H3, Modal, Tag } from '@intlayer/design-system';
import { useAuth, useCancelSubscription } from '@intlayer/design-system/hooks';
import { ChevronsUp, CircleX, RotateCcw } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import { useState, type FC } from 'react';

type PlanDetailsProps = {};

const getIsFreePlan = (plan?: Plan) => plan?.type === 'FREE';

const getStatusTagColor = (plan?: Plan) => {
  switch (plan?.status) {
    case 'active':
      return 'success';

    default:
      return 'error';
  }
};

const getTypeTagColor = (plan?: Plan) => {
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
  const { session } = useAuth();
  const { title, upgradeButton, renewButton, cancelButton, cancelModal } =
    useIntlayer('organization-plan');
  const { cancelSubscription, isLoading: isDeleting } = useCancelSubscription();
  const plan = session?.organization?.plan;
  const router = useRouter();
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);

  const handleCancelSubscription = async () => {
    await cancelSubscription().then(() => setIsCancellationModalOpen(false));
  };

  return (
    <>
      <Modal
        isOpen={isCancellationModalOpen}
        onClose={() => setIsCancellationModalOpen(false)}
        size="lg"
        transparency="sm"
        title={cancelModal.title.value}
        hasCloseButton
      >
        <div className="p-3">
          <p className="text-neutral text-sm">{cancelModal.message}</p>
          <Form.Button
            variant="outline"
            label={cancelModal.buttonLabel.value}
            color="error"
            isFullWidth={true}
            className="mt-10 w-auto"
            isLoading={isDeleting}
            onClick={() => handleCancelSubscription()}
          >
            {cancelModal.confirmText}
          </Form.Button>
        </div>
      </Modal>
      <div className="relative flex flex-col gap-2">
        <H3 className="mb-5">{title}</H3>

        <div className="absolute right-0 top-0 flex flex-row gap-2">
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
            onClick={() => router.push(PagesRoutes.Pricing)}
          >
            {upgradeButton.text}
          </Button>
        )}
        {plan && plan?.status !== 'active' && (
          <Button
            label={renewButton.label.value}
            color="text"
            Icon={RotateCcw}
            onClick={() => router.push(PagesRoutes.Pricing)}
          >
            {renewButton.text}
          </Button>
        )}
        {!getIsFreePlan(plan) && plan?.status === 'active' && (
          <Button
            label={cancelButton.label.value}
            color="error"
            variant="outline"
            Icon={CircleX}
            onClick={() => setIsCancellationModalOpen(true)}
          >
            {cancelButton.text}
          </Button>
        )}
      </div>
    </>
  );
};
