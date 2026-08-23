import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { type Mode, useFramework } from './FrameworkContext';

const modeSwitchChoices: { content: string; value: Mode }[] = [
  { content: 'Per-component', value: 'per-component' },
  { content: 'Centralized', value: 'centralized' },
];

export const ModeSelector = () => {
  const { mode, setMode } = useFramework();

  return (
    <SwitchSelector
      choices={modeSwitchChoices}
      value={mode}
      onChange={setMode}
      size="sm"
      color="foreground"
      itemClassName="text-nowrap"
    />
  );
};
