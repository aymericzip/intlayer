import { BackgroundLayout } from '@components/BackgroundLayout';

export { generateMetadata } from './metadata';

const DocChatLayout = ({ children }) => (
  <BackgroundLayout>{children}</BackgroundLayout>
);

export default DocChatLayout;
