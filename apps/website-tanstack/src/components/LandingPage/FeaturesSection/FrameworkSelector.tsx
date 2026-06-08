import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { TechLogo } from '@intlayer/design-system/tech-logo';
import { cn } from '@intlayer/design-system/utils';
import { type Framework, useFramework } from './FrameworkContext';

type FrameworkChoice = {
  content: React.ReactNode;
  value: Framework;
};

type FrameworkSelectorProps = {
  frameworks?: Framework[];
};

const allFrameworks: { value: Framework; logo: TechLogoName }[] = [
  { value: 'next', logo: 'nextjs' },
  { value: 'react', logo: 'react' },
  { value: 'vue', logo: 'vue' },
  { value: 'svelte', logo: 'svelte' },
  { value: 'lit', logo: 'lit' },
  { value: 'angular', logo: 'angular' },
  { value: 'preact', logo: 'preact' },
  { value: 'solid', logo: 'solid' },
  { value: 'vanilla', logo: 'vanilla' },
];

export const FrameworkSelector = ({ frameworks }: FrameworkSelectorProps) => {
  const { framework, setFramework } = useFramework();

  const filtered = frameworks
    ? allFrameworks.filter((f) => frameworks.includes(f.value))
    : allFrameworks;

  const choices: FrameworkChoice[] = filtered.map(({ value, logo }) => ({
    value,
    content: (
      <TechLogo
        name={logo}
        className={cn(
          'size-4',
          value === 'next' && 'text-text',
          framework !== value && 'opacity-60 grayscale-60'
        )}
      />
    ),
  }));

  return (
    <SwitchSelector
      choices={choices}
      value={framework}
      onChange={setFramework}
      size="sm"
      color="neutral"
    />
  );
};
