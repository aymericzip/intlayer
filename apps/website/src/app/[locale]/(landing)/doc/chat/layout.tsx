import { BackgroundLayout } from '@components/BackgroundLayout';
import { type NextLayoutIntlayer } from 'next-intlayer';
export { generateMetadata } from './metadata';

export type DocProps = {
  doc: string[];
};

const DocChatLayout: NextLayoutIntlayer<DocProps> = ({ children }) => (
  <BackgroundLayout>{children}</BackgroundLayout>
);

export default DocChatLayout;
