import { useGetAICredits } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { DropDown } from '@intlayer/design-system/drop-down';
import {
  App_Dashboard_AI_Usage_Path,
  App_Pricing_Path,
} from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { BarChart3, ChevronsUp, Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import {
  AICreditGauge,
  getUsageRatio,
  WARNING_USAGE_RATIO,
} from './AICreditGauge';

const DROPDOWN_IDENTIFIER = 'ai-credits-quota';

/** Size (px) and stroke of the circular quota indicator of the trigger. */
const RING_SIZE = 16;
const RING_STROKE = 2;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type QuotaRingProps = {
  /** Share of the allowance already used, in `[0, 1]`. */
  usageRatio: number;
};

/** Circular gauge filled with the used share of the monthly allowance. */
const QuotaRing: FC<QuotaRingProps> = ({ usageRatio }) => (
  <svg
    width={RING_SIZE}
    height={RING_SIZE}
    viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
    className="-rotate-90"
    aria-hidden="true"
  >
    <circle
      cx={RING_SIZE / 2}
      cy={RING_SIZE / 2}
      r={RING_RADIUS}
      fill="none"
      strokeWidth={RING_STROKE}
      className="stroke-neutral/20"
    />
    <circle
      cx={RING_SIZE / 2}
      cy={RING_SIZE / 2}
      r={RING_RADIUS}
      fill="none"
      strokeWidth={RING_STROKE}
      strokeLinecap="round"
      strokeDasharray={RING_CIRCUMFERENCE}
      strokeDashoffset={RING_CIRCUMFERENCE * (1 - usageRatio)}
      className={cn(
        'transition-all duration-500',
        usageRatio >= 1
          ? 'stroke-error'
          : usageRatio >= WARNING_USAGE_RATIO
            ? 'stroke-warning'
            : 'stroke-success'
      )}
    />
  </svg>
);

/**
 * Navbar quota indicator: a usage ring; hovering it opens a
 * panel with the monthly gauge, an upgrade action and the usage page link.
 */
export const AICreditsQuotaDropdown: FC = () => {
  const { title, quotaTriggerLabel, upgradeButton, usageDetailsButton } =
    useIntlayer('organization-ai-credits');
  const { data: aiCreditsResponse } = useGetAICredits();
  const navigate = useLocalizedNavigate();

  const balance = aiCreditsResponse?.data;

  if (!balance) return null;

  const isTopPlan =
    balance.planType === 'ENTERPRISE' || balance.planType === 'LIFETIME';

  return (
    <DropDown identifier={DROPDOWN_IDENTIFIER}>
      <DropDown.Trigger
        identifier={DROPDOWN_IDENTIFIER}
        label={quotaTriggerLabel.value}
        variant="hoverable"
        color="text"
        size="icon-md"
      >
        <QuotaRing usageRatio={getUsageRatio(balance)} />
      </DropDown.Trigger>

      <DropDown.Panel
        identifier={DROPDOWN_IDENTIFIER}
        align="end"
        isOverable
        isFocusable
      >
        <Container
          padding="lg"
          transparency="none"
          roundedSize="2xl"
          className="w-80 max-w-[calc(100vw-2rem)] gap-4 border border-text/10"
        >
          <span className="flex items-center gap-2 font-semibold">
            <Sparkles className="size-4" />
            {title}
          </span>

          <AICreditGauge balance={balance} />

          <div className="flex flex-col gap-2">
            {!isTopPlan && (
              <Button
                label={upgradeButton.label.value}
                color="text"
                Icon={ChevronsUp}
                isFullWidth
                onClick={() => navigate({ to: App_Pricing_Path })}
              >
                {upgradeButton.text}
              </Button>
            )}
            <Button
              label={usageDetailsButton.label.value}
              color="text"
              variant="outline"
              Icon={BarChart3}
              isFullWidth
              onClick={() => navigate({ to: App_Dashboard_AI_Usage_Path })}
            >
              {usageDetailsButton.text}
            </Button>
          </div>
        </Container>
      </DropDown.Panel>
    </DropDown>
  );
};
