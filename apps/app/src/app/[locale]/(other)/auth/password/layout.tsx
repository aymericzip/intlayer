import { LanguageBackground } from '@intlayer/design-system';
import type { FC, PropsWithChildren } from 'react';

const PasswordLayout: FC<PropsWithChildren> = ({ children }) => (
  <LanguageBackground>{children}</LanguageBackground>
);

export default PasswordLayout;
