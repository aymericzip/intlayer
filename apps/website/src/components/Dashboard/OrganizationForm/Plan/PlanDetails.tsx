import { PagesRoutes } from '@/Routes';
import { Button, H3, Label, useAuth, Tag } from '@intlayer/design-system';
import { ChevronsUp } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

type PlanDetailsProps = {};

export const PlanDetails: FC<PlanDetailsProps> = () => {
  const { session } = useAuth();
  const { title, upgradeButton } = useIntlayer('organization-plan');
  const plan = session?.organization?.plan;
  const router = useRouter();

  return (
    <div className="relative flex flex-col gap-2">
      <H3 className="mb-5">{title}</H3>

      <Tag
        color={plan?.type === 'FREE' ? 'warning' : 'success'}
        className="absolute right-0 top-0 flex flex-col gap-2"
      >
        {plan?.type}
      </Tag>

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
