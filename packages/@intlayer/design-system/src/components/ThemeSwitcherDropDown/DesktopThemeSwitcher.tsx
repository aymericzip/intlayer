'use client';

import { CircleDashed, Moon, Sun } from 'lucide-react';
import type { FC } from 'react';
import { Button, type ButtonProps } from '../Button';
import { Container } from '../Container';
import { DropDown } from '../DropDown';
import type { Modes } from './types';

const ButtonItem: FC<ButtonProps> = ({ Icon, children, ...props }) => (
  <div className="relative w-full p-0.5">
    <Button
      className="w-full cursor-pointer rounded-lg p-1 text-left hover:bg-text/10 focus:bg-text-opposite/20 focus:outline-hidden disabled:text-white/25"
      Icon={Icon}
      role="option"
      variant="none"
      {...props}
    >
      {children}
    </Button>
  </div>
);

type DesktopThemeSwitcherProps = {
  /** Preference currently persisted — `system` while following the OS. */
  theme: Modes;
  setTheme: (theme: Modes) => void;
};

export const DesktopThemeSwitcher: FC<DesktopThemeSwitcherProps> = ({
  theme,
  setTheme,
}) => {
  const panelIdentifier = 'theme-switcher';

  return (
    <DropDown identifier={panelIdentifier}>
      <DropDown.Trigger
        className="p-2"
        identifier={panelIdentifier}
        aria-label="Theme selector"
      >
        {theme === 'system' && <CircleDashed data-mode="system" />}
        {theme === 'light' && <Sun data-mode="light" />}
        {theme === 'dark' && <Moon data-mode="dark" />}
      </DropDown.Trigger>

      <DropDown.Panel identifier={panelIdentifier} isFocusable isOverable>
        <Container className="min-w-25 items-start p-1" separator="y">
          <ButtonItem
            Icon={CircleDashed}
            onClick={() => setTheme('system')}
            isActive={theme === 'system'}
            label="Restore to system mode"
          >
            System
          </ButtonItem>
          <ButtonItem
            Icon={Sun}
            onClick={() => setTheme('light')}
            isActive={theme === 'light'}
            label="Switch to light mode"
          >
            Light
          </ButtonItem>
          <ButtonItem
            Icon={Moon}
            onClick={() => setTheme('dark')}
            isActive={theme === 'dark'}
            label="Switch to dark mode"
          >
            Dark
          </ButtonItem>
        </Container>
      </DropDown.Panel>
    </DropDown>
  );
};
