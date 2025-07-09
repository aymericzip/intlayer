import { BackgroundLayout } from '@components/BackgroundLayout';
import { type NextLayoutIntlayer } from 'next-intlayer';
export { generateMetadata } from './metadata';

const DocChatLayout: NextLayoutIntlayer = ({ children }) => (
  <BackgroundLayout>{children}</BackgroundLayout>
);

export default DocChatLayout;
