import {
  App_Dashboard_Analytics,
  Website_Analytics_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync, getLocalizedUrl } from 'intlayer';
import { BarChart3, FlaskConical, Globe2 } from 'lucide-react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { AnalyticsPreview } from '~/components/AnalyticsLandingPage/AnalyticsPreview';
import { AnalyticsQuestions } from '~/components/AnalyticsLandingPage/AnalyticsQuestions';
import { PageFlowPreview } from '~/components/AnalyticsLandingPage/PageFlowPreview';
import { LandingList } from '~/components/LandingPage/HeroSection/LandingList';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

const AnalyticsPage = () => {
  const content = useIntlayer('analytics-landing');
  const { locale } = useLocale();
  return (
    <PageLayout mainClassName="relative mx-auto max-w-[1300px] border-neutral xl:border-x">
      <section className="px-6 pt-24 pb-16 text-center md:pt-36">
        <p className="mb-5 font-mono text-sm tracking-widest text-text/60 uppercase">
          {content.label}
        </p>
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-text/70">
          {content.description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            className="rounded-full bg-text px-7 py-3 font-semibold text-background"
            href={App_Dashboard_Analytics}
          >
            {content.openAnalytics}
          </a>
          <a
            className="rounded-full border border-neutral px-7 py-3 font-semibold"
            href={getLocalizedUrl('/doc/concept/analytics', locale)}
          >
            {content.documentation}
          </a>
        </div>
      </section>
      <AnalyticsPreview />
      <AnalyticsQuestions />
      <PageFlowPreview />
      <section className="grid gap-6 px-6 py-24 md:grid-cols-3 md:px-12">
        {[
          {
            icon: Globe2,
            title: content.audienceTitle,
            text: content.audienceText,
          },
          {
            icon: BarChart3,
            title: content.exposureTitle,
            text: content.exposureText,
          },
          {
            icon: FlaskConical,
            title: content.experimentsTitle,
            text: content.experimentsText,
          },
        ].map(({ icon: Icon, title, text }) => (
          <article
            key={title.value}
            className="rounded-3xl border border-neutral p-8"
          >
            <Icon className="mb-8 size-8" aria-hidden="true" />
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-4 leading-relaxed text-text/70">{text}</p>
          </article>
        ))}
      </section>
      <LandingList />
    </PageLayout>
  );
};

export const Route = createFileRoute('/{-$locale}/analytics')({
  loader: async ({ params }) => {
    const [landing] = await Promise.all([
      getIntlayerAsync('analytics-landing', params.locale ?? defaultLocale),
      getIntlayerAsync('analytics-questions', params.locale ?? defaultLocale),
    ]);
    return landing;
  },
  head: ({ params, loaderData }) => ({
    meta: [
      { title: loaderData?.metadataTitle },
      { name: 'description', content: loaderData?.metadataDescription },
      { property: 'og:title', content: loaderData?.metadataTitle },
      { property: 'og:description', content: loaderData?.metadataDescription },
      {
        property: 'og:url',
        content: getAbsoluteUrl(
          Website_Analytics_Path,
          params.locale ?? defaultLocale
        ),
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: getAbsoluteUrl(
          Website_Analytics_Path,
          params.locale ?? defaultLocale
        ),
      },
      ...getHreflangLinks(Website_Analytics_Path),
    ],
  }),
  component: AnalyticsPage,
});
