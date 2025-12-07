import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';

import { LocaleSwitcher } from '~/components/locale-switcher';
import { Navbar } from '~/components/navbar';

import type { Route } from './+types/($locale).about';

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
    <div className="grid h-screen place-items-center">
      <Navbar />
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-3xl underline">{about}</h1>
        <LocaleSwitcher />
      </div>
    </div>
  );
}
