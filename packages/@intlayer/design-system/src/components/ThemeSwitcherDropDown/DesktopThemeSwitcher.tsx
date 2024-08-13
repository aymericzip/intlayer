'use client';

import { Moon, Sun, CircleDashed } from 'lucide-react';
import { useState, type FC } from 'react';
import tw from 'twin.macro';
import { type ButtonProps, Button } from '../Button';
import { Container } from '../Container';
import { DropDown } from '../DropDown';
import { Modes } from './types';

const StyledButtonContainer = tw.div`w-full relative p-0.5`;
const StyledButton = tw(
  Button
)`w-full cursor-pointer rounded-lg p-1 text-left hover:bg-text/10 dark:hover:bg-text-opposite/10 focus:bg-text-opposite/20 dark:focus:bg-text-opposite/20 focus:outline-none disabled:text-white/25`;

const ButtonItem: FC<ButtonProps> = ({ Icon, ref, children, ...props }) => (
  <StyledButtonContainer>
    <StyledButton Icon={Icon} data-mode="system" variant="none" {...props}>
      {children}
    </StyledButton>
  </StyledButtonContainer>
);

type DesktopThemeSwitcherProps = {
  theme: Modes;
  setTheme: (theme: Modes) => void;
  systemTheme: Modes;
};

const StyledTriggerButton = tw(DropDown.Trigger)`p-2`;
const StyledDropdownContent = tw(Container)`min-w-[100px] items-start p-1`;

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
      <StyledTriggerButton
        identifier={panelIdentifier}
        aria-label="Theme selector"
      >
        {mode === Modes.system && <CircleDashed data-mode="system" />}
        {mode === Modes.light && <Sun data-mode="light" />}
        {mode === Modes.dark && <Moon data-mode="dark" />}
      </StyledTriggerButton>

      <DropDown.Panel identifier={panelIdentifier} isFocusable isOverable>
        <StyledDropdownContent separator="y">
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
        </StyledDropdownContent>
      </DropDown.Panel>
    </DropDown>
  );
};
