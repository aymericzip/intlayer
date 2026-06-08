import type { IntlayerAPIProxy } from '@intlayer/api';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Selects the CMS project environment that matches `environmentName`.
 *
 * Convention: session.activeEnvironmentId = null means "production" (default).
 * When the target environment is the project's default, we reset the session to
 * null instead of storing the env's ObjectId — so no API call is needed.
 *
 * No-op when `environmentName` is undefined.
 */
export const selectCmsEnvironment = async (
  environmentName: string | undefined,
  intlayerAPI: IntlayerAPIProxy,
  config: IntlayerConfig
): Promise<void> => {
  if (!environmentName) return;

  const appLogger = getAppLogger(config);

  try {
    const sessionResult = await intlayerAPI.oAuth.getCliSessionMe();
    const project = sessionResult.data?.project;

    if (!project) {
      appLogger(
        `Cannot resolve environment "${environmentName}": no project selected in session.`,
        { level: 'warn' }
      );
      return;
    }

    const projectEnvironments: any[] = (project as any).environments ?? [];

    if (projectEnvironments.length === 0) {
      // No environments stored — everything is implicitly production; nothing to select
      return;
    }

    const targetEnvironment = projectEnvironments.find(
      (environment: any) =>
        environment.name.toLowerCase() === environmentName.toLowerCase() ||
        String(environment.id) === environmentName
    );

    if (!targetEnvironment) {
      const availableNames = projectEnvironments
        .map((environment: any) => environment.name)
        .join(', ');
      appLogger(
        `Environment "${environmentName}" not found in project. Available: ${colorize(availableNames, ANSIColors.BLUE)}.`,
        { level: 'error' }
      );
      return;
    }

    // Production / default env → null convention; no API call needed
    if (targetEnvironment.isDefault) {
      appLogger(
        `Using environment: ${colorize(targetEnvironment.name, ANSIColors.CYAN)} (default)`
      );
      return;
    }

    await intlayerAPI.project.selectEnvironment(String(targetEnvironment.id));

    appLogger(
      `Using environment: ${colorize(targetEnvironment.name, ANSIColors.CYAN)}`
    );
  } catch (error) {
    appLogger(`Failed to select environment "${environmentName}": ${error}`, {
      level: 'warn',
    });
  }
};
