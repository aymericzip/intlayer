import { getIntlayer, validatePrefix } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { data } from 'react-router';
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

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data('Locale not supported', { status: 404 });
  }
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
