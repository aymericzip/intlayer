'use client';

import { CircleDashed, Moon, Sun } from 'lucide-react';
import { type FC, useState } from 'react';
import { Button, type ButtonProps, ButtonVariant } from '../Button';
import { Container } from '../Container';
import { DropDown } from '../DropDown';
import { Modes } from './types';

const ButtonItem: FC<ButtonProps> = ({ Icon, children, ...props }) => (
  <div className="relative w-full p-0.5">
    <Button
      className="hover:bg-text/10 focus:bg-text-opposite/20 focus:outline-hidden w-full cursor-pointer rounded-lg p-1 text-left disabled:text-white/25"
      Icon={Icon}
      data-mode="system"
      role="option"
      variant={ButtonVariant.NONE}
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
  const defaultMode = isThemeSystemTheme ? Modes.system : theme;

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
    <DropDown identifier={panelIdentifier}>
      <DropDown.Trigger
        className="p-2"
        identifier={panelIdentifier}
        aria-label="Theme selector"
      >
        {mode === Modes.system && <CircleDashed data-mode="system" />}
        {mode === Modes.light && <Sun data-mode="light" />}
        {mode === Modes.dark && <Moon data-mode="dark" />}
      </DropDown.Trigger>

      <DropDown.Panel identifier={panelIdentifier} isFocusable isOverable>
        <Container className="min-w-[100px] items-start p-1" separator="y">
          <ButtonItem
            Icon={CircleDashed}
            onClick={() => switchMode(Modes.system)}
            isActive={mode === Modes.system}
            label="Restore to system mode"
          >
            System
          </ButtonItem>
          <ButtonItem
            Icon={Sun}
            onClick={() => switchMode(Modes.light)}
            isActive={mode === Modes.light}
            label="Switch to light mode"
          >
            Light
          </ButtonItem>
          <ButtonItem
            Icon={Moon}
            onClick={() => switchMode(Modes.dark)}
            isActive={mode === Modes.dark}
            label="Switch to dark mode"
          >
            Dark
          </ButtonItem>
        </Container>
      </DropDown.Panel>
    </DropDown>
  );
};
