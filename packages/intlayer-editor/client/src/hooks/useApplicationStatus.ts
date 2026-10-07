import { useQuery } from '@tanstack/react-query';

/** Delay between two probes while the application is unreachable. */
const RETRY_INTERVAL_MS = 3_000;

type ApplicationProbeResult =
  | { isRunning: true }
  | { isRunning: false; errorMessage: string };

/**
 * Probes the application URL once, without reading the response.
 * `no-cors` resolves on any HTTP answer and only rejects on a network failure:
 * the editor origin is rarely in the application's CORS allowlist.
 */
export const probeApplication = async (
  applicationURL: string
): Promise<ApplicationProbeResult> => {
  try {
    await fetch(applicationURL, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
    });

    return { isRunning: true };
  } catch (error) {
    return {
      isRunning: false,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
};

/**
 * Checks the application is reachable before it is framed, so an offline dev
 * server shows a guidance view instead of the browser's "refused to connect"
 * page (and the editor does not post messages to an error page).
 * Polls while unreachable so the editor attaches as soon as the app starts;
 * once running, the result is kept to never unmount the editor mid-edition.
 */
export const useApplicationStatus = (applicationURL: string | undefined) => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ['application-status', applicationURL],
    queryFn: () => probeApplication(applicationURL!),
    enabled: Boolean(applicationURL),
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchInterval: (query) =>
      query.state.data?.isRunning === false ? RETRY_INTERVAL_MS : false,
  });

  return {
    isChecking: isPending,
    isRunning: data?.isRunning === true,
    errorMessage: data?.isRunning === false ? data.errorMessage : undefined,
    retry: refetch,
  };
};
