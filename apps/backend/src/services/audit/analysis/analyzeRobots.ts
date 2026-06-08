export const analyzeRobots = async (
  origin: string,
  discoveredLocales: Set<string>
): Promise<{
  robotsPresent: boolean;
  robotsContent: string | null;
  noLocalizedUrlsForgotten: boolean;
  errors: string[];
}> => {
  const errors: string[] = [];
  let robotsPresent = false;
  let robotsContent: string | null = null;
  let noLocalizedUrlsForgotten = true;

  try {
    const robotsUrl = `${origin}/robots.txt`;
    const response = await fetch(robotsUrl, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0)' },
    });

    if (response.ok) {
      robotsPresent = true;
      robotsContent = await response.text();

      if (robotsContent && discoveredLocales.size > 0) {
        const disallowedPaths: string[] = [];
        const lines = robotsContent.split('\n');

        for (const line of lines) {
          const trimmed = line.trim().toLowerCase();
          if (trimmed.startsWith('disallow:')) {
            const path = trimmed.substring('disallow:'.length).trim();
            disallowedPaths.push(path);
          }
        }

        for (const locale of discoveredLocales) {
          for (const disallowedPath of disallowedPaths) {
            if (
              disallowedPath === `/${locale}` ||
              disallowedPath === `/${locale}/`
            ) {
              noLocalizedUrlsForgotten = false;
              errors.push(
                `Locale path "${locale}" appears to be blocked in robots.txt: ${disallowedPath}`
              );
            }
          }
        }
      }
    } else {
      errors.push(`robots.txt not found (HTTP ${response.status})`);
    }
  } catch (error) {
    errors.push(
      `Failed to fetch robots.txt: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  return {
    robotsPresent,
    robotsContent,
    noLocalizedUrlsForgotten,
    errors,
  };
};
