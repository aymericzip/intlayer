import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer, getLocalizedUrl } from 'intlayer';
import { SubmitProjectForm } from '@/components/SubmitProjectForm/SubmitProjectForm';
import { SITE_URL } from '@/lib/site';

export const Route = createFileRoute('/{-$locale}/submit')({
  component: SubmitProjectForm,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('app', locale);
    const canonicalUrl = `${SITE_URL}${getLocalizedUrl('/submit', locale)}`;

    return {
      meta: [
        { title: content.submitPage.metadata.title },
        {
          name: 'description',
          content: content.submitPage.metadata.description,
        },
        { property: 'og:title', content: content.submitPage.metadata.title },
        {
          property: 'og:description',
          content: content.submitPage.metadata.description,
        },
        { property: 'og:url', content: canonicalUrl },
        { name: 'twitter:title', content: content.submitPage.metadata.title },
        {
          name: 'twitter:description',
          content: content.submitPage.metadata.description,
        },
      ],
      links: [{ rel: 'canonical', href: canonicalUrl }],
    };
  },
});
