'use client';

import { Button, type ButtonProps, DropDown } from '@intlayer/design-system';
import { Moon, Sun, CircleDashed, Container } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import { useState, type FC } from 'react';
import { Modes } from './types';

const ButtonItem: FC<ButtonProps> = ({ Icon, ref, children, ...props }) => (
  <div className="border-neutral/50 w-full p-0.5">
    <Button
      Icon={Icon}
      data-role="dark-mode-switcher"
      data-mode="system"
      variant="list-item"
      {...props}
    >
      {children}
    </Button>
  </div>
);

export const DesktopThemeSwitcher: FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const content = useIntlayer('theme-switcher');

  const isThemeSystemTheme = systemTheme === theme;
  const defaultMode = isThemeSystemTheme ? Modes.system : (theme as Modes);

  const [mode, setMode] = useState<Modes>(defaultMode);

  const switchMode = (mode: Modes) => {
    if (mode === Modes.system) {
      setTheme(systemTheme ?? Modes.light);
    } else {
      setTheme(mode);
    }
    setMode(mode);
  };

  const panelIdentifier = 'theme-switcher';

  return (
    <DropDown.Trigger identifier={panelIdentifier}>
      <div
        className="p-2"
        data-role="dark-mode-switcher"
        role="button"
        aria-label={content.themeSwitcherLabel}
      >
        {mode === Modes.system && <CircleDashed data-mode="system" />}
        {mode === Modes.light && (
          <Sun data-role="dark-mode-switcher" data-mode="light" />
        )}
        {mode === Modes.dark && (
          <Moon data-role="dark-mode-switcher" data-mode="dark" />
        )}
      </div>
      <DropDown identifier={panelIdentifier}>
        <Container className="separator min-w-[100px] items-start divide-y divide-dashed p-1">
          <ButtonItem
            Icon={CircleDashed}
            onClick={() => switchMode(Modes.system)}
            isActive={mode === Modes.system}
            label={content.selectionButtonContent.system.label}
          >
            System
          </ButtonItem>

          <ButtonItem
            Icon={Sun}
            onClick={() => switchMode(Modes.light)}
            isActive={mode === Modes.light}
            label={content.selectionButtonContent.light.label}
          >
            Light
          </ButtonItem>

          <ButtonItem
            Icon={Moon}
            onClick={() => switchMode(Modes.dark)}
            isActive={mode === Modes.dark}
            label={content.selectionButtonContent.dark.label}
          >
            Dark
          </ButtonItem>
        </Container>
      </DropDown>
    </DropDown.Trigger>
  );
};
