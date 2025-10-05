import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';

import { LocaleSwitcher } from '~/components/locale-switcher';
import { Navbar } from '~/components/navbar';

import type { Route } from './+types/page';

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer('about-meta', params.locale);

  return [
    { title: content.title },
    { content: content.description, name: 'description' },
  ];
};

export default function Page() {
  const { about } = useIntlayer('about');

  return (
    <div className="grid place-items-center h-screen">
      <Navbar />
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-3xl font-bold underline">{about}</h1>
        <LocaleSwitcher />
      </div>
    </div>
  );
}
