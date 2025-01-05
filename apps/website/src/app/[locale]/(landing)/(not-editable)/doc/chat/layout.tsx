import { BackgroundLayout } from '@components/BackgroundLayout';
import { type Next14LayoutIntlayer } from 'next-intlayer';
export { generateMetadata } from './metadata';

export type DocProps = {
  doc: string[];
};

const DocChatLayout: Next14LayoutIntlayer<DocProps> = ({ children }) => (
  <BackgroundLayout>{children}</BackgroundLayout>
);

export default DocChatLayout;
