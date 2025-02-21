import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import type { FC, PropsWithChildren } from 'react';

const PasswordLayout: FC<PropsWithChildren> = ({ children }) => (
  <LanguageBackground>{children}</LanguageBackground>
);

export default PasswordLayout;
