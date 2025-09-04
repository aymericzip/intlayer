import { useIntlayer } from 'react-intlayer';

import LocaleSwitcher from 'app/components/locale-switcher';
import LocalizedLink from 'app/components/localized-link';
import { useLocalizedNavigate } from '~/hooks/useLocalizedNavigate';

export default function Page() {
  const content = useIntlayer('page');
  const navigate = useLocalizedNavigate();

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-3xl font-bold underline">{content.greeting}</h1>
        <LocaleSwitcher />
        <div className="flex gap-2">
          <LocalizedLink to="/">{content.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.about}</LocalizedLink>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            {content.home} (navigate)
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate('/about')}
          >
            {content.about} (navigate)
          </button>
        </div>
      </div>
    </div>
  );
}
