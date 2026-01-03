import { LanguageBackground } from '@intlayer/design-system';
import type { FC, PropsWithChildren } from 'react';

const NotFoundLayout: FC<PropsWithChildren> = ({ children }) => (
  <LanguageBackground>{children}</LanguageBackground>
);

export default NotFoundLayout;
