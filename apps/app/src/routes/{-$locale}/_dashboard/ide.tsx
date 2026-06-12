import { useGithubToken, useSession } from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import {
  App_Dashboard,
  App_Dashboard_IDE,
  App_Dashboard_IDE_Path,
  Website_Domain,
} from '@intlayer/design-system/routes';
import { buildBreadcrumbsJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useEffect, useRef } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { useTheme } from '#/providers/ThemeProvider';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';

export const Route = createFileRoute('/{-$locale}/_dashboard/ide')({
  component: IDEPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Dashboard_IDE;
    const content = getIntlayer('ide-dashboard-page', locale);

    return {
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: content.metadata.title },
        {
          name: 'description',
          content: content.metadata.description,
        },
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildBreadcrumbsJsonLd({
              breadcrumbs: [
                {
                  name: 'Dashboard',
                  url: getLocalizedUrl(App_Dashboard, locale),
                },
                {
                  name: 'IDE',
                  url: getLocalizedUrl(App_Dashboard_IDE_Path, locale),
                },
              ],
              domain: Website_Domain,
            })
          ),
        },
      ],
    };
  },
});

function IDEPage() {
  const { title, noProject, noGithubRepo, iframeTitle } =
    useIntlayer('ide-dashboard-page');
  const { locale } = useLocale();
  const { resolvedTheme } = useTheme();
  const { session } = useSession();
  const { project } = session ?? {};

  const connectedRepository = project?.repository ?? null;
  const isGithub = connectedRepository?.provider === 'github';

  const { data: githubTokenData } = useGithubToken({
    enabled: isGithub && !connectedRepository?.token,
  });

  const token = connectedRepository?.token || githubTokenData?.data?.token;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (token && iframeRef.current) {
      const targetOrigin = import.meta.env.VITE_IDE_URL;
      iframeRef.current.contentWindow?.postMessage(
        { type: 'INTLAYER_SET_TOKEN', token },
        targetOrigin
      );
    }
  }, [token]);

  const handleLoad = () => {
    if (token && iframeRef.current) {
      const targetOrigin = import.meta.env.VITE_IDE_URL;
      iframeRef.current.contentWindow?.postMessage(
        { type: 'INTLAYER_SET_TOKEN', token },
        targetOrigin
      );
    }
  };

  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <DashboardContentLayout title={title}>
        <div className="flex w-full flex-1 flex-col items-center p-2">
          {!project ? (
            <div className="flex size-full items-center justify-center">
              <p className="text-lg text-neutral">{noProject}</p>
            </div>
          ) : !isGithub || !connectedRepository ? (
            <div className="flex size-full items-center justify-center">
              <p className="text-lg text-neutral">{noGithubRepo}</p>
            </div>
          ) : (
            <Container
              roundedSize="2xl"
              border
              borderColor="neutral"
              className="relative z-0 size-full min-h-0 flex-1 flex-col overflow-hidden rounded-t-xl bg-background"
            >
              <iframe
                ref={iframeRef}
                src={`${import.meta.env.VITE_IDE_URL}/${connectedRepository.owner}/${connectedRepository.repository}?file=${connectedRepository.configFilePath || 'intlayer.config.ts'}&theme=${resolvedTheme}`}
                title={`${iframeTitle} ${connectedRepository.owner}/${connectedRepository.repository}`}
                className="size-full"
                onLoad={handleLoad}
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                loading="lazy"
              />
            </Container>
          )}
        </div>
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}
