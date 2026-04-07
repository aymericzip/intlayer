import { createFileRoute } from '@tanstack/react-router';
import { CliLoginFlow } from '#components/Auth/CliLogin/CliLoginFlow';

export const Route = createFileRoute('/{-$locale}/_other/auth/cli-login')({
  validateSearch: (search: Record<string, unknown>) => ({
    port: typeof search.port === 'string' ? search.port : undefined,
    state: typeof search.state === 'string' ? search.state : undefined,
  }),
  component: CliLoginPage,
});

function CliLoginPage() {
  const { port, state } = Route.useSearch();
  return <CliLoginFlow port={port} state={state} />;
}
