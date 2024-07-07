'use client';

import { Moon, Sun, CircleDashed } from 'lucide-react';
import { useState, type FC } from 'react';
import { styled } from 'styled-components';
import tw, { type TwStyle } from 'twin.macro';
import { Modes } from './types';

type MobileThemeSwitcherProps = {
  theme: Modes;
  systemTheme: Modes;
  setTheme: (theme: Modes) => void;
};

type IconStyle = {
  isCurrentMode: boolean;
  isNextMode: boolean;
};
const getIconStyle = ({ isCurrentMode, isNextMode }: IconStyle): TwStyle[] => [
  tw`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
  tw`opacity-0 transition-opacity duration-300 ease-in-out`,
  isCurrentMode ? tw`opacity-100 group-hover:opacity-0` : tw``,
  isNextMode ? tw`group-hover:opacity-100` : tw``,
];

const StyledCircleDashed = styled(CircleDashed)<IconStyle>(getIconStyle);
const StyledMoon = styled(Moon)<IconStyle>(getIconStyle);
const StyledSun = styled(Sun)<IconStyle>(getIconStyle);
const StyledTrigger = tw.button`relative size-10`;

export const MobileThemeSwitcher: FC<MobileThemeSwitcherProps> = ({
  theme,
  systemTheme,
  setTheme,
}) => {
  const isThemeSystemTheme = systemTheme === theme;
  const defaultMode = isThemeSystemTheme ? Modes.system : theme;

  const [mode, setMode] = useState<Modes>(defaultMode);

  const nextMode =
    // Start loop
    // If mode is system, toggle the theme inverse of the system theme
    mode === Modes.system
      ? theme === Modes.dark
        ? Modes.light
        : Modes.dark
      : // Close loop
        // If current theme same as system theme, reset by toggle the system theme
        isThemeSystemTheme
        ? Modes.system
        : // Go to next step
          // Otherwise, toggle the remaining theme
          mode === Modes.light
          ? Modes.dark
          : Modes.light;

  const toggleMode = () => {
    if (nextMode === Modes.system) {
      setTheme(systemTheme ?? Modes.light);
    } else {
      setTheme(nextMode);
    }
    setMode(nextMode);
  };

  return (
    <StyledTrigger aria-label="Theme selector" className="group">
      <StyledCircleDashed
        onClick={toggleMode}
        data-mode="system"
        isCurrentMode={mode === Modes.system}
        isNextMode={nextMode === Modes.system}
      />

      <StyledMoon
        onClick={toggleMode}
        data-mode="light"
        isCurrentMode={mode === Modes.dark}
        isNextMode={nextMode === Modes.dark}
      />

      <StyledSun
        onClick={toggleMode}
        data-mode="dark"
        isCurrentMode={mode === Modes.light}
        isNextMode={nextMode === Modes.light}
      />
    </StyledTrigger>
  );
};
