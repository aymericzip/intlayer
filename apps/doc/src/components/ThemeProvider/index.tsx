import type { FC, PropsWithChildren } from 'react';

// Theme is managed via THEME_INIT_SCRIPT in __root.tsx (localStorage key 'theme', CSS classes on documentElement).
// This provider is a pass-through wrapper kept for API compatibility.
export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <>{children}</>
);
