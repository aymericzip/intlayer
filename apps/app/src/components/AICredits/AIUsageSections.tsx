import type { AICreditBalance } from '@intlayer/backend-contract/ai';
import type { ProjectConfiguration } from '@intlayer/backend-contract/project';
import {
  usePushProjectConfiguration,
  useSession,
} from '@intlayer/design-system/api';
import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { cn } from '@intlayer/design-system/utils';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AIConfigurationDetails } from './AIConfigurationDetails';
import { AIModelUsageList } from './AIModelUsageList';

type AIUsageSectionProps = {
  title: ReactNode;
  /** Rendered at the end of the title row (e.g. a switch). */
  action?: ReactNode;
  children: ReactNode;
};

/** Titled block of the AI credits panels ("Plan", "Personal usage"). */
export const AIUsageSection: FC<AIUsageSectionProps> = ({
  title,
  action,
  children,
}) => (
  <section className="flex flex-col gap-3">
    <div className="flex items-center justify-between gap-3 border-b border-text/10 pb-1">
      <h3 className="text-xs font-semibold tracking-wide text-neutral uppercase">
        {title}
      </h3>
      {action}
    </div>
    {children}
  </section>
);

/** State of the session project's own AI key and the switch pausing it. */
export type ProjectOwnAIKeyState = {
  /** The project configured its own AI key. */
  hasOwnKey: boolean;
  /** AI calls run on the own key (missing flag means enabled). */
  isOwnKeyEnabled: boolean;
  /** The session may change the project configuration. */
  canToggleOwnKey: boolean;
  isUpdating: boolean;
  setOwnKeyEnabled: (isEnabled: boolean) => void;
};

/**
 * Reads and toggles `configuration.ai.isOwnAPIKeyEnabled` of the session
 * project. The stored key is preserved: the masked one is never sent back.
 */
export const useProjectOwnAIKey = (): ProjectOwnAIKeyState => {
  const { session } = useSession();
  const { mutate: pushProjectConfiguration, isPending: isUpdating } =
    usePushProjectConfiguration();

  const projectConfiguration = session?.project?.configuration as
    | ProjectConfiguration
    | undefined;
  const aiConfiguration = projectConfiguration?.ai;

  const setOwnKeyEnabled = (isEnabled: boolean) => {
    if (!projectConfiguration) return;

    pushProjectConfiguration({
      ...projectConfiguration,
      ai: {
        ...aiConfiguration,
        apiKey: undefined,
        isOwnAPIKeyEnabled: isEnabled,
      },
    });
  };

  return {
    hasOwnKey: Boolean(
      aiConfiguration?.apiKeyConfigured || aiConfiguration?.apiKey
    ),
    isOwnKeyEnabled: aiConfiguration?.isOwnAPIKeyEnabled !== false,
    canToggleOwnKey: Boolean(
      session?.roles?.includes('project_admin') ||
      session?.roles?.includes('admin')
    ),
    isUpdating,
    setOwnKeyEnabled,
  };
};

type PersonalAIUsageSectionProps = {
  balance: AICreditBalance;
  /**
   * Shows the switch pausing the own key. Only meaningful when plan credits
   * exist to fall back on.
   */
  isToggleVisible: boolean;
  ownAIKey: ProjectOwnAIKeyState;
};

/**
 * Project's own AI configuration and the usage billed on it, with an
 * optional switch to fall back on the plan credits.
 */
export const PersonalAIUsageSection: FC<PersonalAIUsageSectionProps> = ({
  balance,
  isToggleVisible,
  ownAIKey,
}) => {
  const {
    personalUsageTitle,
    personalUsageToggleLabel,
    personalUsageEnabledDescription,
    personalUsageDisabledDescription,
  } = useIntlayer('ai-usage-sections');

  const isOwnKeyActive = !isToggleVisible || ownAIKey.isOwnKeyEnabled;

  return (
    <AIUsageSection
      title={personalUsageTitle}
      action={
        isToggleVisible && (
          <span title={personalUsageToggleLabel.value}>
            <SwitchSelector
              value={ownAIKey.isOwnKeyEnabled}
              onChange={ownAIKey.setOwnKeyEnabled}
              disabled={!ownAIKey.canToggleOwnKey || ownAIKey.isUpdating}
              color="text"
              size="xs"
            />
          </span>
        )
      }
    >
      {isToggleVisible && (
        <p className="text-xs text-neutral">
          {ownAIKey.isOwnKeyEnabled
            ? personalUsageEnabledDescription
            : personalUsageDisabledDescription}
        </p>
      )}

      <div
        className={cn(
          'flex flex-col gap-4 transition-opacity',
          !isOwnKeyActive && 'opacity-50'
        )}
      >
        <AIConfigurationDetails />

        <AIModelUsageList balance={balance} keyFilter="own" />
      </div>
    </AIUsageSection>
  );
};
