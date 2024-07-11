import { redirect } from 'next/navigation';
import type { NextPageIntlayer } from 'next-intlayer';
import type { DocProps } from './[...doc]/layout';
import { PagesRoutes } from '@/Routes';

const Page: NextPageIntlayer<DocProps> = () =>
  redirect(PagesRoutes.Doc_GetStarted);

export default Page;
