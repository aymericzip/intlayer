import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';

import { LocaleSwitcher } from '@/components/locale-switcher';
import { LocalizedLink } from '@/components/localized-link';
import { useLocalizedNavigate } from '@/hooks/useLocalizedNavigate';

export const Route = createFileRoute('/{-$locale}/')({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer('app', locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: 'description' },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer('app');
  const navigate = useLocalizedNavigate();

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-4 items-center text-center">
        {content.title}
        <LocaleSwitcher />
        <div className="flex gap-4">
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate({ to: '/' })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: '/about' })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
