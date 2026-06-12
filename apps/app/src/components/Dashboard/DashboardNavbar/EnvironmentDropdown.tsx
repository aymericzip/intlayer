import { useSelectEnvironment, useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { DropDown } from '@intlayer/design-system/drop-down';
import { Tag } from '@intlayer/design-system/tag';
import { ChevronsUpDown } from 'lucide-react';
import type { ComponentProps, FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type EnvironmentDropdownProps = Partial<
  ComponentProps<typeof DropDown.Panel>
> & {
  align?: 'start' | 'end';
};

export const EnvironmentDropdown: FC<EnvironmentDropdownProps> = (props) => {
  const { session } = useSession();
  const { mutate: selectEnvironment, isPending } = useSelectEnvironment();
  const { environmentTrigger, switchEnvironment, defaultEnv, productionEnv } =
    useIntlayer('dashboard-navbar');

  const { project, environment } = session ?? {};

  const environments = project?.environments ?? [];

  if (environments.length <= 1) return null;

  const otherEnvironments = environments.filter(
    (e) => String(e.id) !== String(environment?.id)
  );

  return (
    <DropDown identifier="environment-dropdown">
      <DropDown.Trigger
        identifier="environment-dropdown"
        label={environmentTrigger.label.value}
        variant="hoverable"
        color="text"
        className="text-text/70"
        IconRight={ChevronsUpDown}
      >
        <span className="flex items-center gap-1.5">
          {environment?.name ?? productionEnv.value}

          {environment?.isDefault && (
            <Tag size="sm" color="neutral">
              {defaultEnv}
            </Tag>
          )}
        </span>
      </DropDown.Trigger>

      <DropDown.Panel isFocusable {...props} identifier="environment-dropdown">
        <Container
          padding="lg"
          transparency="none"
          roundedSize="2xl"
          className="gap-2 border border-text/10"
        >
          <div className="flex flex-col gap-3">
            <span className="font-bold text-sm">{switchEnvironment}</span>
            {otherEnvironments.map((env) => (
              <Button
                key={String(env.id)}
                variant="outline"
                color="text"
                label={env.name}
                onClick={() => selectEnvironment(String(env.id))}
                isLoading={isPending}
              >
                <span className="flex items-center gap-2">
                  {env.name}
                  {env.isDefault && (
                    <span className="rounded bg-text/10 px-1 py-0.5 text-xs">
                      {defaultEnv}
                    </span>
                  )}
                </span>
              </Button>
            ))}
          </div>
        </Container>
      </DropDown.Panel>
    </DropDown>
  );
};
