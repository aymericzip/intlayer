import { getIntlayerAPI } from '@intlayer/api';
import type { Session } from '@intlayer/design-system/hooks';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { headers } from 'next/headers';
import type { NextPageIntlayer } from 'next-intlayer';
import { DashboardPageContent } from './pageContent';

const DashboardPage: NextPageIntlayer<{ session?: Session }> = async ({
  params,
}) => {
  const { session: sessionServer } = await params;
  const queryClient = new QueryClient();

  // Build API client with incoming request cookies so backend uses the user session
  const cookieHeader = (await headers()).get('cookie') ?? undefined;
  const api = getIntlayerAPI(
    cookieHeader
      ? {
          headers: {
            cookie: cookieHeader,
          },
        }
      : {}
  );

  // Prefetch in parallel based on session context
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['organizations', undefined],
      queryFn: () => api.organization.getOrganizations(undefined),
    }),
    sessionServer?.organization
      ? queryClient.prefetchQuery({
          queryKey: ['projects', undefined],
          queryFn: () => api.project.getProjects(undefined),
        })
      : Promise.resolve(),
    sessionServer?.organization && sessionServer?.project
      ? queryClient.prefetchQuery({
          queryKey: ['dictionaries', undefined],
          queryFn: () => api.dictionary.getDictionaries(undefined),
        })
      : Promise.resolve(),

    sessionServer?.organization
      ? queryClient.prefetchQuery({
          queryKey: ['tags', undefined],
          queryFn: () => api.tag.getTags(undefined),
        })
      : Promise.resolve(),

    sessionServer?.organization
      ? queryClient.prefetchQuery({
          queryKey: ['users', undefined],
          queryFn: () => api.user.getUsers(undefined),
        })
      : Promise.resolve(),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardPageContent sessionServer={sessionServer} />
    </HydrationBoundary>
  );
};

export default DashboardPage;
