import { createFileRoute } from '@tanstack/react-router';
import { CliLoginFlow } from '#components/Auth/CliLogin/CliLoginFlow';

export const Route = createFileRoute('/{-$locale}/_other/auth/cli-login')({
  validateSearch: (search: Record<string, unknown>) => ({
    port:
      typeof search.port === 'string'
        ? search.port
        : typeof search.port === 'number'
          ? String(search.port)
          : undefined,
    state: typeof search.state === 'string' ? search.state : undefined,
    backendUrl:
      typeof search.backendUrl === 'string' ? search.backendUrl : undefined,
  }),
  component: CliLoginPage,
});

function CliLoginPage() {
  const { port, state, backendUrl } = Route.useSearch();

  return <CliLoginFlow port={port} state={state} backendUrl={backendUrl} />;
}
