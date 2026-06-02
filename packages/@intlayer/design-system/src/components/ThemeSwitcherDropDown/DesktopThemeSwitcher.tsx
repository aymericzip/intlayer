'use client';

import { CircleDashed, Moon, Sun } from 'lucide-react';
import { type FC, useState } from 'react';
import { Button, type ButtonProps } from '../Button';
import { Container } from '../Container';
import { DropDown } from '../DropDown';
import type { Modes } from './types';

const ButtonItem: FC<ButtonProps> = ({ Icon, children, ...props }) => (
  <div className="relative w-full p-0.5">
    <Button
      className="w-full cursor-pointer rounded-lg p-1 text-left hover:bg-text/10 focus:bg-text-opposite/20 focus:outline-hidden disabled:text-white/25"
      Icon={Icon}
      data-mode="system"
      role="option"
      variant="none"
      {...props}
    >
      {children}
    </Button>
  </div>
);

type DesktopThemeSwitcherProps = {
  theme: Modes;
  setTheme: (theme: Modes) => void;
  systemTheme: Modes;
};

export const DesktopThemeSwitcher: FC<DesktopThemeSwitcherProps> = ({
  theme,
  setTheme,
  systemTheme,
}) => {
  const isThemeSystemTheme = systemTheme === theme;
  const defaultMode = isThemeSystemTheme ? 'system' : theme;

  const [mode, setMode] = useState<Modes>(defaultMode);

  const switchMode = (mode: Modes) => {
    if (mode === 'system') {
      setTheme(systemTheme ?? 'light');
    } else {
      setTheme(mode);
    }
    setMode(mode);
  };

  const panelIdentifier = 'theme-switcher';

  return (
    <DropDown identifier={panelIdentifier}>
      <DropDown.Trigger
        className="p-2"
        identifier={panelIdentifier}
        aria-label="Theme selector"
      >
        {mode === 'system' && <CircleDashed data-mode="system" />}
        {mode === 'light' && <Sun data-mode="light" />}
        {mode === 'dark' && <Moon data-mode="dark" />}
      </DropDown.Trigger>

      <DropDown.Panel identifier={panelIdentifier} isFocusable isOverable>
        <Container className="min-w-[100px] items-start p-1" separator="y">
          <ButtonItem
            Icon={CircleDashed}
            onClick={() => switchMode('system')}
            isActive={mode === 'system'}
            label="Restore to system mode"
          >
            System
          </ButtonItem>
          <ButtonItem
            Icon={Sun}
            onClick={() => switchMode('light')}
            isActive={mode === 'light'}
            label="Switch to light mode"
          >
            Light
          </ButtonItem>
          <ButtonItem
            Icon={Moon}
            onClick={() => switchMode('dark')}
            isActive={mode === 'dark'}
            label="Switch to dark mode"
          >
            Dark
          </ButtonItem>
        </Container>
      </DropDown.Panel>
    </DropDown>
  );
};
