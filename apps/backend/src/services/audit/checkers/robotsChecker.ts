import { analyzeRobots } from '../analysis/analyzeRobots';
import type { AuditEvent } from '../types';

export const checkRobots = async (
  origin: string,
  discoveredLocales: Set<string>,
  onEvent: (event: AuditEvent) => void
): Promise<void> => {
  const robotsData = await analyzeRobots(origin, discoveredLocales);

  onEvent({
    type: 'robots_robotsPresent',
    status: robotsData.robotsPresent ? 'success' : 'warning',
    data: {
      successDetails: robotsData.robotsPresent ? true : undefined,
      warningsDetails: robotsData.robotsPresent
        ? undefined
        : 'No robots.txt found',
      errorsDetails:
        robotsData.errors.length > 0 ? robotsData.errors : undefined,
    },
  });

  if (robotsData.robotsPresent) {
    onEvent({
      type: 'robots_noLocalizedUrlsForgotten',
      status: robotsData.noLocalizedUrlsForgotten ? 'success' : 'error',
      data: {
        successDetails: robotsData.noLocalizedUrlsForgotten ? true : undefined,
        errorsDetails: robotsData.noLocalizedUrlsForgotten
          ? undefined
          : robotsData.errors,
      },
    });
  }
};
