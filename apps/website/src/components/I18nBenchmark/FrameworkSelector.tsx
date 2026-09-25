import { VerticalSwitchSelector } from '@intlayer/design-system/switch-selector';
import { TechLogo, type TechLogoName } from '@intlayer/design-system/tech-logo';
import type { FC, ReactNode } from 'react';
import type { FrameworkKey } from './constants';

const FRAMEWORK_LOGOS: Record<FrameworkKey, TechLogoName> = {
  nextjs: 'nextjs',
  tanstack: 'tanstack',
  'vite-vue': 'vue',
  'vite-solid': 'solid',
  'vite-svelte': 'svelte',
};

type FrameworkSelectorProps = {
  value: FrameworkKey;
  onChange: (framework: FrameworkKey) => void;
  labels: Record<FrameworkKey, ReactNode>;
};

export const FrameworkSelector: FC<FrameworkSelectorProps> = ({
  value,
  onChange,
  labels,
}) => (
  <VerticalSwitchSelector<FrameworkKey>
    size="sm"
    choices={(Object.keys(FRAMEWORK_LOGOS) as FrameworkKey[]).map(
      (framework) => ({
        value: framework,
        content: (
          <span className="flex items-center justify-center gap-1.5 px-1">
            <TechLogo name={FRAMEWORK_LOGOS[framework]} className="size-3.5" />
            {labels[framework]}
          </span>
        ),
      })
    )}
    value={value}
    onChange={onChange}
    className="w-full"
    color="text"
  />
);
