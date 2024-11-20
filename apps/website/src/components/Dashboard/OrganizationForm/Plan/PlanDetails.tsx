import { Button, H3, useAuth, Tag } from '@intlayer/design-system';
import { ChevronsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type PlanDetailsProps = {};

export const PlanDetails: FC<PlanDetailsProps> = () => {
  const { session } = useAuth();
  const { title, upgradeButton } = useIntlayer('organization-plan');
  const plan = session?.organization?.plan;
  const router = useRouter();

  return (
    <div className="relative flex flex-col gap-2">
      <H3 className="mb-5">{title}</H3>

      <div className="absolute right-0 top-0 flex flex-row gap-2">
        <Tag
          color={plan?.type === 'FREE' ? 'warning' : 'success'}
          size="sm"
          border="none"
        >
          {plan?.type}
        </Tag>

        <Tag
          color={plan?.status === 'ACTIVE' ? 'success' : 'error'}
          size="sm"
          border="none"
        >
          {plan?.status}
        </Tag>
      </div>

      <Button
        label={upgradeButton.label.value}
        color="text"
        Icon={ChevronsUp}
        onClick={() => router.push(PagesRoutes.Pricing)}
      >
        {upgradeButton.text}
      </Button>
    </div>
  );
};
